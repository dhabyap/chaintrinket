# ChainTrinket

Physical accessories with digital ownership proof on Stellar Soroban.

[🌏 **English**](#chaintrinket) · [🌏 **Bahasa Indonesia**](#chaintrinket---indonesia)

---

![ChainTrinket Homepage](https://raw.githubusercontent.com/dhabyap/chaintrinket/main/screenshots/home.png)

## Pages

| Page | Screenshot | Description |
|------|-----------|-------------|
| **Home** | ![Home](https://raw.githubusercontent.com/dhabyap/chaintrinket/main/screenshots/home.png) | Landing — hero, how-to-buy, stats |
| **Catalog** | ![Catalog](https://raw.githubusercontent.com/dhabyap/chaintrinket/main/screenshots/catalog.png) | Product grid with filter + skeleton loading |
| **Product Detail** | ![Product](https://raw.githubusercontent.com/dhabyap/chaintrinket/main/screenshots/product.png) | Token detail, owner history, buy (QRIS / Wallet) |
| **My Items** | ![My Items](https://raw.githubusercontent.com/dhabyap/chaintrinket/main/screenshots/my-items.png) | React-based — wallet connect, owned tokens, transfer |
| **Admin** | ![Admin](https://raw.githubusercontent.com/dhabyap/chaintrinket/main/screenshots/admin.png) | Dashboard — mint, sell, QR print, token list |

## Quick Start

### Prerequisites
- **Freighter Wallet** — Install [Freighter](https://www.freighter.app/) browser extension (Chrome/Edge/Firefox).
- **Testnet Account** — Open Freighter → Settings → Network → **Testnet**. Fund via [Friendbot](https://friendbot.stellar.org/) (paste address in URL, hit enter).
- **Admin Wallet** — Must have XLM testnet balance.

### Run Locally
Open files directly in browser (double-click) or serve via Python:

```bash
cd site
python -m http.server 8000
# → http://127.0.0.1:8000/home.html
```

| File | Purpose |
|------|---------|
| `home.html` | Landing page |
| `catalog.html` | Product catalog |
| `product.html?id=N` | Product detail (from QR scan) |
| `my-items.html` | My Items — wallet connect + transfer |
| `admin.html` | Admin dashboard — mint, stock, QR |
| `deployer.html` | Redeploy contract |

### Init Contract (First Time)
1. Open `admin.html`
2. Click **Connect Freighter** → select admin wallet
3. **Init Contract** banner appears → click it
4. Confirm in Freighter
5. Banner gone → dashboard ready

### Mint a New Product
1. Click **+ New product**
2. Enter name & price (XLM)
3. Click **Mint & generate QR**
4. Confirm in Freighter
5. QR ready to print (4×4 cm)

### Buy (Offline Booth)
**QRIS (casual):**
- Scan QR → pay via QRIS (GoPay/OVO/Dana)
- Show proof to seller

**Wallet (crypto):**
- Connect Freighter → tap **Buy Now**
- Pay XLM directly to admin
- Show proof to seller

Seller transfers token in admin → status becomes **Sold**.

### My Items (React)
- Connect wallet → see all your tokens
- **Transfer** button → send token to another address
- Language toggle (ID/EN)

---

## File Structure
```
site/
├── home.html          Landing page
├── catalog.html       Product catalog
├── product.html       Product detail (QR scan)
├── my-items.html      My Items — React CDN
├── admin.html         Admin dashboard
├── deployer.html      Redeploy contract
├── js/
│   ├── ct.js          Core library (Stellar SDK wrapper)
│   └── i18n.js        Bilingual ID/EN
└── README.md          This file
```

## Tech Stack
- **Blockchain** — Stellar Soroban (Testnet)
- **Smart Contract** — Rust (`soroban-sdk` v21)
- **Frontend** — HTML/JS + React 18 via CDN (my-items.html)
- **Wallet** — Freighter (`@stellar/freighter-api`)
- **SDK** — `@stellar/stellar-sdk` v16 (CDN)
- **i18n** — Custom lightweight (ID/EN, localStorage)
- **Contract ID** — `CAFLM7AZ2HFJ3FX6SRYNYELAMPIPRVJULNVV4HYJN6TLQFUORCK57ECS`

---

## ChainTrinket — Indonesia

Aksesoris fisik dengan bukti kepemilikan digital di Stellar Soroban.

![Beranda](https://raw.githubusercontent.com/dhabyap/chaintrinket/main/screenshots/home.png)

### Halaman

| Halaman | Gambar | Deskripsi |
|---------|--------|-----------|
| **Beranda** | ![Beranda](https://raw.githubusercontent.com/dhabyap/chaintrinket/main/screenshots/home.png) | Hero, cara belanja, statistik |
| **Katalog** | ![Katalog](https://raw.githubusercontent.com/dhabyap/chaintrinket/main/screenshots/catalog.png) | Grid produk + filter + skeleton loading |
| **Detail Produk** | ![Detail](https://raw.githubusercontent.com/dhabyap/chaintrinket/main/screenshots/product.png) | Detail token, riwayat pemilik, beli (QRIS/Wallet) |
| **Barang Saya** | ![Barang Saya](https://raw.githubusercontent.com/dhabyap/chaintrinket/main/screenshots/my-items.png) | React — connect wallet, token milikmu, transfer |
| **Admin** | ![Admin](https://raw.githubusercontent.com/dhabyap/chaintrinket/main/screenshots/admin.png) | Dashboard — mint, jual, cetak QR |

### Persiapan
- **Freighter Wallet** — Install [Freighter](https://www.freighter.app/) di Chrome/Edge/Firefox.
- **Akun Testnet** — Freighter → Settings → Network → **Testnet**. Isi saldo lewat [Friendbot](https://friendbot.stellar.org/).
- **Wallet Admin** — Pastikan punya saldo XLM testnet.

### Cara Pakai
1. Buka file HTML langsung di browser atau `python -m http.server 8000`
2. Buka `admin.html` → Connect Freighter → Init Contract
3. Klik **+ Produk baru** → isi nama & harga → Mint
4. Cetak QR, tempel di barang
5. Pembeli scan QR → bayar QRIS atau Wallet crypto
6. Seller transfer token di admin → otomatis Sold

### Struktur File
```
site/
├── home.html          Beranda
├── catalog.html       Katalog produk
├── product.html       Detail produk (scan QR)
├── my-items.html      Barang Saya — React CDN
├── admin.html         Dashboard admin
├── deployer.html      Deploy ulang contract
├── js/
│   ├── ct.js          Library inti (wrapper Stellar SDK)
│   └── i18n.js        Bilingual ID/EN
└── README.md          File ini
```

### Tech Stack
- **Blockchain** — Stellar Soroban (Testnet)
- **Smart Contract** — Rust (`soroban-sdk` v21)
- **Frontend** — HTML/JS + React 18 via CDN (my-items.html)
- **Wallet** — Freighter (`@stellar/freighter-api`)
- **SDK** — `@stellar/stellar-sdk` v16 (CDN)
- **i18n** — Custom ringan (ID/EN, localStorage)
- **Contract ID** — `CAFLM7AZ2HFJ3FX6SRYNYELAMPIPRVJULNVV4HYJN6TLQFUORCK57ECS`
