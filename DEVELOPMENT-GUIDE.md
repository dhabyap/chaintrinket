# ChainTrinket — Development Guide
## Panduan Pengerjaan untuk Developer

---

## Persiapan Awal

Setup environment:

```bash
# 1. Clone repo
git clone https://github.com/dhabyap/chaintrinket.git
cd chaintrinket

# 2. Install Rust (kalo belum ada)
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh

# 3. Install Soroban CLI
cargo install soroban-cli --features opt

# 4. Install Node.js (kalo belum ada)
# Download dari https://nodejs.org/ (LTS version)

# 5. Verifikasi
rustc --version    # harus > 1.70
soroban --version  # harus muncul
node --version     # harus > 18
```

---

## Step 1: Setup Project Soroban (Contract)

Buat workspace contract:

```bash
# 1.1 Buat folder contract
mkdir -p contracts/trinket_token
cd contracts/trinket_token

# 1.2 Init project Rust
cargo init --lib

# 1.3 Edit Cargo.toml — tambah dependensi soroban-sdk
```

**Cargo.toml:**

```toml
[package]
name = "trinket_token"
version = "0.1.0"
edition = "2021"

[lib]
crate-type = ["cdylib"]

[dependencies]
soroban-sdk = "21.0.0"

[features]
testutils = ["soroban-sdk/testutils"]
```

---

## Step 2: Tulis Smart Contract

**File: `contracts/trinket_token/src/lib.rs`**

Buat struktur data dan fungsi berikut:

### Struct Product
```rust
#[contracttype]
pub struct Product {
    pub id: u64,
    pub name: String,
    pub metadata_uri: String,   // IPFS/Arweave URL
    pub price: i128,            // dalam stroops (1 XLM = 10_000_000 stroops)
    pub owner: Address,
    pub status: ProductStatus,
    pub created_at: u64,
}

#[contracttype]
pub enum ProductStatus {
    Available,
    Sold,
}

#[contracttype]
pub enum DataKey {
    Product(u64),
    TotalSupply,
    Owner(Address),   // list token ID milik address
    TokenOfOwner(Address, u64),
}
```

### Fungsi Wajib

```rust
#[contractimpl]
impl TrinketTokenContract {

    // 1. Mint — daftarin produk baru (hanya admin)
    pub fn mint(
        env: Env,
        admin: Address,
        name: String,
        metadata_uri: String,
        price: i128,
    ) -> u64 { ... }

    // 2. Transfer — pindah kepemilikan
    pub fn transfer(
        env: Env,
        from: Address,
        to: Address,
        token_id: u64,
    ) { ... }

    // 3. Verify — cek pemilik
    pub fn verify(env: Env, token_id: u64) -> Address { ... }

    // 4. Get Info — detail produk
    pub fn get_info(env: Env, token_id: u64) -> Product { ... }

    // 5. Total Supply
    pub fn total_supply(env: Env) -> u64 { ... }
}
```

### Detail Implementasi

```rust
// Contoh implementasi mint
pub fn mint(
    env: Env,
    admin: Address,
    name: String,
    metadata_uri: String,
    price: i128,
) -> u64 {
    // Validasi: cuma admin yang bisa mint
    admin.require_auth();

    // Ambil total supply + increment
    let mut total = Self::total_supply(&env);
    total += 1;

    // Buat product baru
    let product = Product {
        id: total,
        name,
        metadata_uri,
        price,
        owner: admin.clone(),
        status: ProductStatus::Available,
        created_at: env.ledger().timestamp(),
    };

    // Simpan ke storage
    env.storage().persistent().set(&DataKey::Product(total), &product);
    env.storage().persistent().set(&DataKey::TotalSupply, &total);

    // Event log
    env.events().publish(("trinket", "mint"), (admin, total));

    total
}
```

### Unit Test

```rust
#[cfg(test)]
mod test {
    use super::*;
    use soroban_sdk::{vec, Env, String, Symbol};

    #[test]
    fn test_mint_and_verify() {
        let env = Env::default();
        let contract_id = env.register_contract(None, TrinketTokenContract);
        let client = TrinketTokenContractClient::new(&env, &contract_id);

        let admin = Address::random(&env);
        let name = String::from_str(&env, "Gelang Manik Biru");
        let uri = String::from_str(&env, "ipfs://QmX...");
        let price: i128 = 5_000_000; // 0.5 XLM

        client.mint(&admin, &name, &uri, &price);
        let owner = client.verify(&1);

        assert_eq!(owner, admin);
    }
}
```

---

## Step 3: Build & Test Contract

```bash
# 3.1 Build contract
cd contracts/trinket_token
cargo build --target wasm32-unknown-unknown --release

# 3.2 Run unit tests
cargo test

# 3.3 Optimize WASM
soroban contract optimize --wasm target/wasm32-unknown-unknown/release/trinket_token.wasm

# Output: trinket_token.optimized.wasm
```

---

## Step 4: Deploy ke Stellar Testnet

```bash
# 4.1 Setup testnet
soroban network add \
  --global testnet \
  --rpc-url https://soroban-testnet.stellar.org \
  --network-passphrase "Test SDF Network ; September 2015"

# 4.2 Buat identity admin
soroban keys generate --global admin

# 4.3 Fund admin dengan testnet XLM
# Buka https://friendbot.stellar.org/?addr=<admin_pubkey>
# Atau pake curl:
curl "https://friendbot.stellar.org?addr=$(soroban keys address admin)"

# 4.4 Deploy contract
soroban contract deploy \
  --network testnet \
  --source admin \
  --wasm target/wasm32-unknown-unknown/release/trinket_token.optimized.wasm

# Simpan contract ID yang muncul — contoh: CC2KZM7P7QH3L2XJF...

# 4.5 Export contract ID ke env variable
export CONTRACT_ID="CC2KZM7P7QH3L2XJF..."
```

---

## Step 5: Test Contract di Testnet

```bash
# 5.1 Mint produk
soroban contract invoke \
  --network testnet \
  --source admin \
  --id $CONTRACT_ID \
  -- \
  mint \
  --admin $(soroban keys address admin) \
  --name "Gelang Manik Biru" \
  --metadata_uri "ipfs://QmX..." \
  --price 5000000

# 5.2 Verify kepemilikan
soroban contract invoke \
  --network testnet \
  --id $CONTRACT_ID \
  -- \
  verify \
  --token_id 1

# 5.3 Get info produk
soroban contract invoke \
  --network testnet \
  --id $CONTRACT_ID \
  -- \
  get_info \
  --token_id 1
```

---

## Step 6: Integrasi Frontend dengan Wallet

**File: `site/product.html`**

### 6.1 Install StellarWalletsKit

```html
<!-- Tambah di head -->
<script src="https://cdn.jsdelivr.net/npm/@creit.tech/stellar-wallets-kit@1.0.0/dist/index.umd.min.js"></script>
```

### 6.2 Init Wallet

```javascript
const kit = new StellarWalletsKit.StellarWalletsKit({
    network: StellarWalletsKit.Networks.TESTNET,
    selectedWalletId: StellarWalletsKit.AVAILABLE_WALLETS.FREIGHTER.id,
});

async function connectWallet() {
    const { address } = await kit.openModal();
    console.log("Connected:", address);
    return address;
}
```

### 6.3 Call Contract dari Frontend

```javascript
import { SorobanRpc, Contract, xdr, Address } from '@stellar/stellar-sdk';

const rpc = new SorobanRpc.Server('https://soroban-testnet.stellar.org');
const contract = new Contract('CC2KZM7P7QH3L2XJF...');

async function getProductInfo(tokenId) {
    const result = await rpc.simulateContract(
        contract.call('get_info', new Address(tokenId))
    );
    return result;
}

async function buyProduct(tokenId, buyerAddress) {
    // 1. Parse product info
    const product = await getProductInfo(tokenId);

    // 2. Build transaction
    const tx = contract.call('transfer', buyerAddress, tokenId);

    // 3. Sign & submit via wallet kit
    const { signedTx } = await kit.signTransaction(tx.toXDR());
    const result = await rpc.sendTransaction(signedTx);

    return result;
}
```

---

## Step 7: QR Generator

**File: `site/admin.html`**

```javascript
function generateQR(tokenId, productName) {
    // URL landing page product
    const url = `https://dhabyap.github.io/chaintrinket/product.html?id=${tokenId}`;

    // Generate QR code (pake qrcode.js library)
    const qr = new QRCode(document.getElementById('qrContainer'), {
        text: url,
        width: 200,
        height: 200,
    });

    // Simpan data untuk cetak
    return {
        url: url,
        qrImage: qr._el.toDataURL(),
        label: `★ ChainTrinket\n${productName}\nToken #${tokenId}`
    };
}
```

**Tambah library QR di head:**
```html
<script src="https://cdn.jsdelivr.net/npm/qrcodejs@1.0.0/qrcode.min.js"></script>
```

---

## Step 8: Flow QRIS (Simulasi)

**File: `site/product.html`**

```javascript
async function processQrisPayment(tokenId, amount) {
    // 1. Tampilkan QR code QRIS
    showQrisCode(amount);

    // 2. Polling status pembayaran manual (simulasi)
    // Di production: webhook dari payment gateway
    await waitForPayment();

    // 3. Trigger transfer token
    // (sementara manual via admin wallet)
    showToast("Pembayaran diterima! Token #" + tokenId + " milik kamu");

    // 4. Update status UI
    updateStamp('sold');
}
```

---

## Step 9: Push + Deploy ke GitHub Pages

```bash
# 9.1 Update semua file
git status
git add .
git commit -m "Integrasi contract + wallet + QR"

# 9.2 Push ke main
git push origin main

# 9.3 GitHub Pages auto-deploy
# URL: https://dhabyap.github.io/chaintrinket/
```

---

## Step 10: Testing After Deploy

```bash
# Test semuanya:
# 1. Buka https://dhabyap.github.io/chaintrinket/
# 2. Verifikasi home page muncul
# 3. Klik Katalog → lihat grid produk
# 4. Klik produk → landing page detail
# 5. Klik "Connect Wallet" → connect Freighter/Lobstr
# 6. Klik "Bayar" → sign transaction
# 7. Cek contract verify buat konfirmasi kepemilikan
# 8. Buka admin → mint produk baru → QR muncul
```

---

## Checklist Final

| Item | Status |
|---|---|
| Rust + Soroban CLI terinstall | [ ] |
| Contract `trinket_token` selesai | [ ] |
| Unit test passing | [ ] |
| Deploy ke Testnet | [ ] |
| Mint produk via CLI | [ ] |
| Verify produk via CLI | [ ] |
| Wallet connect di frontend | [ ] |
| QR generator jalan | [ ] |
| GitHub Pages deploy | [ ] |
| Testing all flow | [ ] |

---

## File Structure Final

```
chaintrinket/
├── contracts/
│   └── trinket_token/
│       ├── Cargo.toml
│       └── src/
│           └── lib.rs
├── site/
│   ├── index.html
│   ├── home.html
│   ├── catalog.html
│   ├── product.html
│   └── admin.html
├── README.md
└── startup-track-idea.md
```

---

## Referensi

- [Soroban Docs](https://soroban.stellar.org/docs)
- [StellarWalletsKit](https://github.com/creit-tech/stellar-wallets-kit)
- [Soroban CLI Guide](https://soroban.stellar.org/docs/reference/soroban-cli)
- [GitHub Pages](https://pages.github.com/)

---

*Dibuat untuk ChainTrinket — Hackathon Stellar 2026*
