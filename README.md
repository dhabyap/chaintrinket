# ChainTrinket

[![GitHub Pages](https://img.shields.io/badge/hosted-GitHub%20Pages-222?logo=github&logoColor=white)](https://dhabyap.github.io/chaintrinket/)
[![Stellar](https://img.shields.io/badge/blockchain-Stellar-7b1fa2?logo=stellar&logoColor=white)](https://stellar.org)
[![License](https://img.shields.io/badge/license-MIT-green)](LICENSE)

**Physical accessories with digital ownership proof on Stellar Soroban.**  
Bracelets, rings, necklaces — each item has one token on-chain. Scan the tag, see the owner, take it home. No crypto knowledge needed to buy.

---

## Screenshots

| Page | Screenshot |
|------|-----------|
| **Home** | ![Home](https://raw.githubusercontent.com/dhabyap/chaintrinket/main/screenshots/home.png) |
| **Catalog** | ![Catalog](https://raw.githubusercontent.com/dhabyap/chaintrinket/main/screenshots/catalog.png) |
| **Product Detail** | ![Product](https://raw.githubusercontent.com/dhabyap/chaintrinket/main/screenshots/product.png) |
| **My Items** | ![My Items](https://raw.githubusercontent.com/dhabyap/chaintrinket/main/screenshots/my-items.png) |
| **Admin** | ![Admin](https://raw.githubusercontent.com/dhabyap/chaintrinket/main/screenshots/admin.png) |

## Features

- **Browse catalog** — filter by price, search by name, skeleton loading
- **Product detail** — tag-card UI, owner history, social proof ("6 viewing now")
- **Purchase** — QRIS (GoPay/OVO/Dana) or connect Freighter wallet
- **Ownership proof** — receipt overlay with QR code, shareable
- **My Items** — connect wallet, view owned tokens, transfer to others
- **Admin dashboard** — mint new products, generate QR tags, mark sold
- **Bilingual** — toggle between English and Indonesian
- **PWA** — service worker, installable on mobile

## How It Works

1. **Mint** — Admin creates a product (name + price), system generates a unique token + QR tag
2. **Display** — Hang the physical tag on the item at events
3. **Buy** — Scan QR → pay via QRIS or connect wallet → token transfers on-chain
4. **Verify** — Anyone can scan the tag to see the current owner and full history

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | HTML/CSS/JS CDN (no build step) |
| Smart Contract | Rust (Soroban SDK) |
| Blockchain | Stellar Soroban (Testnet) |
| Wallet | Freighter, Lobstr, xBull |
| SDK | `@stellar/stellar-sdk` v16 CDN |
| i18n | Custom lightweight (ID/EN, localStorage) |
| Hosting | GitHub Pages (free, global CDN) |

## Getting Started

```
git clone https://github.com/dhabyap/chaintrinket.git
cd chaintrinket/site
python -m http.server 8000
# open http://127.0.0.1:8000/home.html
```

Or open files directly in browser (double-click `home.html`).

### Prerequisites

- **Freighter Wallet** — Install [Freighter](https://www.freighter.app/) browser extension
- **Testnet Account** — Set network to Testnet in Freighter, fund via [Friendbot](https://friendbot.stellar.org/)
- **Admin Wallet** — Must have XLM testnet balance

### Quick Admin Start

1. Open `admin.html` → **Connect Freighter** → Init Contract
2. Click **+ New product** → enter name & price → Mint & generate QR
3. Print the QR tag (4×4 cm), attach to physical item
4. Buyers scan → pay → you transfer token → status becomes Sold

## File Structure

```
site/
├── home.html          Landing page
├── catalog.html       Product catalog
├── product.html       Product detail (QR scan → detail)
├── my-items.html      My Items — React CDN
├── admin.html         Admin dashboard — mint, stock, QR
├── deployer.html      Redeploy contract
├── js/
│   ├── ct.js          Core library (Stellar SDK wrapper)
│   └── i18n.js        Bilingual ID/EN
└── README.md          This file
```

---

## ChainTrinket — Indonesia

Aksesoris fisik dengan bukti kepemilikan digital di Stellar Soroban. Gelang, cincin, kalung — setiap item terhubung ke satu token di Stellar. Scan tag, lihat pemilik, bawa pulang. Tidak perlu paham crypto untuk membeli.

### Cara Pakai

1. Buka file HTML langsung di browser atau `python -m http.server 8000`
2. Buka `admin.html` → Connect Freighter → Init Contract
3. Klik **+ Produk baru** → isi nama & harga → Mint
4. Cetak QR, tempel di barang
5. Pembeli scan QR → bayar QRIS atau Wallet crypto
6. Seller transfer token di admin → otomatis Sold

---

## License

MIT
