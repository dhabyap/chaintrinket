# ChainTrinket — Hackathon Demo Script ⏱ 3 min

## Opening (30s)
*"Physical accessories with on-chain proof. Bracelets, rings, necklaces — each item linked to a Stellar token. No crypto knowledge needed to buy."*

Tap **Browse Catalog** on home page.

---

## Flow 1: Browse Catalog (30s)
1. Scroll product grid — 5 items visible
2. Filter **Under 5 XLM** → shows affordable items
3. Search "gold" → narrows to Gold Chain
4. Click **Gold Chain Necklace**

---

## Flow 2: Product Detail (30s)
1. Point to tag card — unique art + QR + name
2. Scroll down — **"6 viewing now"** green dot + activity feed
3. Show owner address + mint history
4. *"Social proof — visitors see others buying right now"*

---

## Flow 3: Purchase (45s)
1. Click **Connect Wallet** → Freighter popup
2. Click **Pay with Wallet** → confirm tx in Freighter
3. → **"Purchase Complete!"** receipt (item name, token ID, price, QR)
4. Click **Share Proof** → native share sheet
5. *"Receipt is shareable — proves ownership instantly"*

---

## Flow 4: My Items (30s)
1. Navigate → **My Items**
2. Wallet auto-connected → owned tokens list
3. Click **Share** on any item → receipt modal with QR
4. Click **Transfer** → enter address → send token
5. *"Users manage & transfer tokens without any blockchain knowledge"*

---

## Closing (15s)
*"Proof of ownership at events. No app download. Works offline. Built on Stellar Soroban."*

---

## Tech Stack (for Q&A)
| Layer | Tech |
|---|---|
| Frontend | HTML/CSS/JS CDN (no build step) |
| Smart Contract | Stellar Soroban (Rust) |
| Wallet | Freighter + Lobstr |
| Hosting | GitHub Pages (free, global CDN) |
| i18n | Custom, EN/ID bilingual |
| Total page size | <200KB per page |

## Common Questions
- **"Why Stellar?"** — Fast (3-5s finality), cheap (<0.001 XLM/tx), Soroban smart contracts are Rust-based
- **"How is fraud prevented?"** — Token transfer only via signed Horizon transaction; admin marks sold manually after verifying payment
- **"Is this live?"** — Testnet working; ready for mainnet with 1+ XLM in contract
- **"Who's the target user?"** — Event-goers, collectors, crypto-curious who buy physical accessories
- **"What makes it unique?"** — No gas fees for users, offline QR verification, bilingual EN/ID, social proof FOMO
