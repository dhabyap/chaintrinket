# ChainTrinket
Aksesoris fisik dengan bukti kepemilikan digital di Stellar Soroban.

## Cara Menjalankan

### 1. Persiapan
- **Freighter Wallet** — Install extension [Freighter](https://www.freighter.app/) di browser Chrome/Edge/Firefox.
- **Akun Testnet** — Buka Freighter → Settings → Network → pilih **Testnet**. Isi saldo lewat [Friendbot](https://friendbot.stellar.org/) (ketik alamat wallet di URL, enter).
- **Wallet Admin** — Pastikan wallet yang dipake admin punya saldo XLM testnet. Contract di-deploy dengan address `GAJ5AG7JPSJIVGGZXCZHPG3UUHHV4ECABRIQHVY7II4WTDDDNHXXFEOU` sebagai admin.

### 2. Jalankan Website
Buka file HTML langsung di browser (cukup double-click):

| File | Fungsi |
|---|---|
| `home.html` | Landing page ChainTrinket |
| `catalog.html` | Katalog semua produk |
| `product.html?id=1` | Detail produk (bisa dari scan QR) |
| `admin.html` | Dashboard admin — mint produk, lihat stok, cetak QR |
| `deployer.html` | Deploy ulang contract (kalo perlu) |

### 3. Admin — Init Contract (Pertama Kali)
1. Buka `admin.html`
2. Klik **Connect Freighter** — pilih wallet admin
3. Akan muncul banner **Init Contract** — klik tombolnya
4. Konfirmasi transaksi di Freighter
5. Banner hilang → dashboard siap

### 4. Admin — Mint Produk Baru
1. Klik **+ Produk baru**
2. Isi nama produk & harga (XLM)
3. Klik **Mint & generate QR**
4. Konfirmasi di Freighter
5. QR muncul — bisa dicetak (4×4 cm)

### 5. Pembeli — Cek Produk via QR
1. Scan QR di barang → buka `product.html?id=<token_id>`
2. Lihat foto, harga, status (Tersedia / Terjual)

### 6. Admin — Jual / Transfer
1. Di dashboard, klik **Jual** di baris produk
2. Masukkan alamat wallet Stellar pembeli
3. Klik **Transfer token** — konfirmasi di Freighter
4. Status berubah jadi **Terjual**

---

## Struktur File
```
site/
├── home.html          Landing page
├── catalog.html       Katalog produk
├── product.html       Detail produk (scan QR)
├── admin.html         Dashboard admin
├── deployer.html      Deploy ulang contract
├── js/
│   └── ct.js          Core library (Stellar SDK wrapper)
└── README.md          File ini
```

## Tech Stack
- **Blockchain** — Stellar Soroban (Testnet)
- **Smart Contract** — Rust (`soroban-sdk` v21)
- **Frontend** — HTML/JS (static files, no build step)
- **Wallet** — Freighter (`@stellar/freighter-api`)
- **SDK** — `@stellar/stellar-sdk` v16 (via CDN)
- **Contract ID** — `CAFLM7AZ2HFJ3FX6SRYNYELAMPIPRVJULNVV4HYJN6TLQFUORCK57ECS`
