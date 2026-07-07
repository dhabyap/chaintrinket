#![no_std]
use soroban_sdk::{contract, contractimpl, contracttype, log, vec, Env, String, Address, Vec, symbol_short, Symbol};

#[contracttype]
#[derive(Clone, Debug, Eq, PartialEq)]
pub struct Product {
    pub id: u64,
    pub name: String,
    pub metadata_uri: String,
    pub price: i128,
    pub owner: Address,
    pub status: ProductStatus,
    pub created_at: u64,
}

#[contracttype]
#[derive(Clone, Debug, Eq, PartialEq)]
pub enum ProductStatus {
    Available,
    Sold,
}

#[contracttype]
pub enum DataKey {
    Product(u64),
    TotalSupply,
    Admin,
}

#[contract]
pub struct TrinketTokenContract;

#[contractimpl]
impl TrinketTokenContract {
    pub fn init(env: Env, admin: Address) {
        admin.require_auth();
        env.storage().instance().set(&DataKey::Admin, &admin);
        env.storage().instance().set(&DataKey::TotalSupply, &0u64);
        log!(&env, "Contract initialized with admin: {}", admin);
    }

    pub fn mint(
        env: Env,
        admin: Address,
        name: String,
        metadata_uri: String,
        price: i128,
    ) -> u64 {
        admin.require_auth();

        let stored_admin: Address = env.storage().instance().get(&DataKey::Admin).unwrap();
        if admin != stored_admin {
            panic!("only admin can mint");
        }

        let mut total: u64 = env.storage().instance().get(&DataKey::TotalSupply).unwrap();
        total += 1;

        let product = Product {
            id: total,
            name,
            metadata_uri,
            price,
            owner: admin.clone(),
            status: ProductStatus::Available,
            created_at: env.ledger().timestamp(),
        };

        env.storage().persistent().set(&DataKey::Product(total), &product);
        env.storage().instance().set(&DataKey::TotalSupply, &total);

        env.events().publish(
            (Symbol::new(&env, "trinket"), Symbol::new(&env, "mint")),
            (total, admin),
        );

        log!(&env, "Minted token #{}: {}", total, product.name);

        total
    }

    pub fn transfer(env: Env, from: Address, to: Address, token_id: u64) {
        from.require_auth();

        let mut product: Product = env.storage().persistent().get(&DataKey::Product(token_id)).unwrap();

        if product.owner != from {
            panic!("not the owner");
        }

        if product.status == ProductStatus::Sold {
            panic!("already sold");
        }

        product.owner = to.clone();
        product.status = ProductStatus::Sold;

        env.storage().persistent().set(&DataKey::Product(token_id), &product);

        env.events().publish(
            (Symbol::new(&env, "trinket"), Symbol::new(&env, "transfer")),
            (token_id, from.clone(), to.clone()),
        );

        log!(&env, "Token #{} transferred from {} to {}", token_id, from, to);
    }

    pub fn verify(env: Env, token_id: u64) -> Address {
        let product: Product = env.storage().persistent().get(&DataKey::Product(token_id)).unwrap();
        product.owner
    }

    pub fn get_info(env: Env, token_id: u64) -> Product {
        env.storage().persistent().get(&DataKey::Product(token_id)).unwrap()
    }

    pub fn total_supply(env: Env) -> u64 {
        env.storage().instance().get(&DataKey::TotalSupply).unwrap()
    }

    pub fn get_admin(env: Env) -> Address {
        env.storage().instance().get(&DataKey::Admin).unwrap()
    }
}

#[cfg(test)]
mod test {
    use super::*;
    use soroban_sdk::{testutils::Address as _, Env};

    #[test]
    fn test_mint() {
        let env = Env::default();
        env.mock_all_auths();
        let contract_id = env.register_contract(None, TrinketTokenContract);
        let client = TrinketTokenContractClient::new(&env, &contract_id);

        let admin = Address::generate(&env);
        client.init(&admin);

        let name = String::from_str(&env, "Gelang Manik Biru");
        let uri = String::from_str(&env, "ipfs://QmXyZ123");
        let price: i128 = 5_000_000;

        let token_id = client.mint(&admin, &name, &uri, &price);
        assert_eq!(token_id, 1);

        let owner = client.verify(&1);
        assert_eq!(owner, admin);

        assert_eq!(client.total_supply(), 1);
    }

    #[test]
    fn test_transfer() {
        let env = Env::default();
        env.mock_all_auths();
        let contract_id = env.register_contract(None, TrinketTokenContract);
        let client = TrinketTokenContractClient::new(&env, &contract_id);

        let admin = Address::generate(&env);
        let buyer = Address::generate(&env);

        client.init(&admin);

        let name = String::from_str(&env, "Gelang Manik Biru");
        let uri = String::from_str(&env, "ipfs://QmXyZ123");
        let price: i128 = 5_000_000;

        client.mint(&admin, &name, &uri, &price);

        client.transfer(&admin, &buyer, &1);

        let owner = client.verify(&1);
        assert_eq!(owner, buyer);
    }

    #[test]
    #[should_panic(expected = "only admin can mint")]
    fn test_non_admin_cannot_mint() {
        let env = Env::default();
        env.mock_all_auths();
        let contract_id = env.register_contract(None, TrinketTokenContract);
        let client = TrinketTokenContractClient::new(&env, &contract_id);

        let admin = Address::generate(&env);
        let non_admin = Address::generate(&env);

        client.init(&admin);

        let name = String::from_str(&env, "Gelang Palsu");
        let uri = String::from_str(&env, "ipfs://QmFake");
        let price: i128 = 1_000_000;

        client.mint(&non_admin, &name, &uri, &price);
    }

    #[test]
    fn test_get_info() {
        let env = Env::default();
        env.mock_all_auths();
        let contract_id = env.register_contract(None, TrinketTokenContract);
        let client = TrinketTokenContractClient::new(&env, &contract_id);

        let admin = Address::generate(&env);
        client.init(&admin);

        let name = String::from_str(&env, "Kalung Rantai Emas");
        let uri = String::from_str(&env, "ipfs://QmGold");
        let price: i128 = 7_500_000;

        client.mint(&admin, &name, &uri, &price);

        let info = client.get_info(&1);
        assert_eq!(info.name, String::from_str(&env, "Kalung Rantai Emas"));
        assert_eq!(info.price, 7_500_000);
        assert_eq!(info.id, 1);
        assert_eq!(info.status, ProductStatus::Available);
    }

    #[test]
    #[should_panic(expected = "already sold")]
    fn test_cannot_transfer_twice() {
        let env = Env::default();
        env.mock_all_auths();
        let contract_id = env.register_contract(None, TrinketTokenContract);
        let client = TrinketTokenContractClient::new(&env, &contract_id);

        let admin = Address::generate(&env);
        let buyer1 = Address::generate(&env);
        let buyer2 = Address::generate(&env);

        client.init(&admin);

        let name = String::from_str(&env, "Gelang Manik Biru");
        let uri = String::from_str(&env, "ipfs://QmXyZ123");
        let price: i128 = 5_000_000;

        client.mint(&admin, &name, &uri, &price);
        client.transfer(&admin, &buyer1, &1);
        client.transfer(&buyer1, &buyer2, &1);
    }
}
