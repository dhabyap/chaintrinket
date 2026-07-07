# ChainTrinket — Startup Track Idea Submission

## 1. Problem Statement

**The Problem:** In Indonesia, the market for second-hand accessories (bracelets, necklaces, rings) at offline events lacks trust. Buyers have no reliable way to verify authenticity or ownership history. For small-scale sellers like myself, there is no standardized system to differentiate genuine items from imitations.

**The Result:** Low buyer trust, diminished resale value, and quality items failing to sell.

**The Solution:** ChainTrinket — a real-world asset (RWA) tokenization platform built on Stellar Soroban. Each physical item is represented by a unique token on-chain. Buyers scan a QR code attached to the item to instantly verify ownership history and authenticity.

---

## 2. Why Stellar?

| Advantage | Benefit |
|---|---|
| **Low Gas Fees** | Soroban transactions cost < 0.001 XLM — perfect for items priced at $2-10 USD |
| **Speed & Finality** | 3-5 second settlement — ideal for offline event transactions |
| **Soroban Smart Contracts** | Enables NFT-like ownership tokens, moving beyond simple payments |
| **Ecosystem & Anchors** | Future-ready for on/off-ramp integration and larger-scale commerce |
| **StellarWalletsKit** | Multi-wallet support (Freighter, Lobstr, xBull) — crypto-native friendly |
| **Free Development** | Testnet access allows for rapid, cost-free iteration |

Stellar aligns with our mission of financial inclusion and RWA, bridging the gap between physical Indonesian artisans and the global blockchain economy.

---

## 3. Target Users

| Segment | Profile | Needs |
|---|---|---|
| **Non-Crypto Buyers** | 17-35, event-goers, no crypto wallet | Familiar QRIS/local payments, scan-to-verify, authenticity trust |
| **Crypto Enthusiasts** | Familiar with Stellar/XLM, use Freighter/Lobstr | Proof of ownership, on-chain experience, physical item utility |
| **Micro-Sellers** | Local artisans, event vendors | Inventory tracking, proof of provenance, brand differentiation |

Our **dual-payment model** (QRIS for beginners + XLM/USDC for crypto) removes the friction for mass adoption.

---

## 4. Technical Architecture

```
Frontend (Next.js / GitHub Pages)
├── home.html — Landing page
├── catalog.html — Product showcase
├── product.html — QR scan detail page
└── admin.html — Seller dashboard
        │
        ▼
StellarWalletsKit (Freighter / Lobstr / xBull)
        │
        ▼
Soroban Contract — trinket_token (Rust)
├── fn mint(admin, name, metadata_uri, price) → u64
├── fn transfer(from, to, token_id)
├── fn verify(token_id) → Address
├── fn get_info(token_id) → Product
└── fn get_history(token_id) → Vec<Event>
        │
        ▼
Stellar Testnet (Future: Mainnet)
```

**Data Flow:**
1. Seller mints product → Token ID + QR generated.
2. QR label is attached to the physical item.
3. Buyer scans QR → Landing page fetches metadata from the contract.
4. Payment (QRIS/Wallet) → Triggers automatic token transfer to buyer.
5. Ownership is immutably recorded on-chain.

---

## 5. Complexity Evaluation

| Challenge | Reason | Mitigation |
|---|---|---|
| **Dual Payment** | Bridging fiat (QRIS) + crypto | Stage 1: Wallet-first. Stage 2: QRIS integrated via payment gateway |
| **Physical QR uniqueness** | Scalable, reusable QR per unit | Token ID mapped to deterministic QR. QR links to product page |
| **Non-crypto onboarding** | Wallet/gas/address complexity | Custodial-like UX + familiar QRIS payment flows |
| **Contract Upgradability** | Physical items last forever | Data URIs for flexible off-chain metadata storage |
| **Offline Verification** | Scanning at events with spotty internet | QR stores token ID; frontend caches static info, chain verify on-demand |

---

## 6. Roadmap

### MVP (Weeks 1-2)
- [ ] Deploy `trinket_token` contract on Testnet — mint, transfer, verify
- [ ] Frontend: Landing, Catalog, Product, Admin (✅ Done)
- [ ] Wallet integration: Freighter/Lobstr/xBull connect & pay
- [ ] QR generator implementation
- [ ] QRIS simulation flow
- [ ] GitHub Pages deployment

### User Acquisition (Weeks 3-4)
- [ ] Real-world pilot at a crypto event (10+ items)
- [ ] User feedback gathering (beginners & crypto users)
- [ ] UX iteration based on pilot metrics
- [ ] Social proof creation: real item photos & scan-to-verify videos

### Mainnet Vision (Post-Hackathon)
- [ ] Mainnet deployment
- [ ] Real QRIS payment gateway integration
- [ ] Non-custodial claims for beginners
- [ ] Secondary market for tokenized collectibles
- [ ] Anchor integration for broader on/off-ramp access

---

## Why this is a Startup, not just a project

ChainTrinket is a **validated business model** based on actual vending experiences at crypto events.

- **Revenue:** Margins on physical goods (QRIS + XLM/USDC).
- **Unit Economics:** Every item sold generates direct revenue; near-zero per-transaction gas fees.
- **Scalability:** From 10 items to thousands; from one vendor to a community of micro-sellers.
- **Defensibility:** Network effect — the more items tokenized, the higher the ecosystem value.

**Goal:** Become the industry standard for on-chain proof-of-ownership for physical lifestyle products in Indonesia.
