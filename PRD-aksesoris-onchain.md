# ChainTrinket — Aksesoris Fisik dengan Bukti Kepemilikan Digital
## Hackathon Project — Stellar / Soroban

---

| Metadata | |
|---|---|
| **Project Name** | ChainTrinket |
| **Tagline** | Aksesoris on-chain — tiap barang punya bukti kepemilikan digital |
| **Hackathon** | Stellar — Build on Stellar |
| **Track** | RWA (Real World Assets) |
| **Stack** | Soroban (Rust) + Next.js + StellarWalletsKit |
| **Seller** | Saya sendiri — jualan aksesoris di event crypto |
| **Pembeli** | Orang awam (QRIS) + crypto enthusiast (wallet) |

---

## 1. Executive Summary

ChainTrinket buat saya jualan aksesoris (gelang, kalung, cincin) di event crypto. Setiap barang fisik punya 1 token unik di Soroban sebagai bukti kepemilikan. Pembeli awam bayar QRIS tanpa perlu wallet. Pembeli crypto bayar pake XLM/USDC lewat Freighter/Lobstr/xBull. Token otomatis pindah pas laku. Dashboard admin cuma buat saya sendiri — bukan platform untuk orang lain.

---

## 2. Problem Statement

| Problem | Dampak |
|---|---|
| Barang aksesoris saya gak punya bukti kepemilikan digital | Pembeli ragu soal keaslian |
| Belum ada cara bedain barang saya dengan tiruan | Brand value turun |
| Pembeli crypto pengen experience on-chain | Gap antara fisik & digital |
| Pembeli awam males ribet wallet | Mereka cuma mau scan & bayar |

---

## 3. Proposed Solution

- Tiap barang saya → 1 token NFT-like di Soroban (token kepemilikan, bukan gambar)
- QR unik ditempel di tiap barang — scan langsung lihat info + status
- Dua cara bayar: QRIS (awam) atau wallet Stellar (crypto)
- Token otomatis pindah pas pembayaran sukses
- Dashboard admin cuma buat saya — mint produk, lihat stok, cetak QR

---

## 4. Target Pengguna

### Pembeli Awam (Non-Crypto)
| Karakteristik | Detail |
|---|---|
| Usia | 17-35 tahun |
| Crypto? | Nol — gak punya wallet |
| Bayar | QRIS, GoPay, OVO |
| Motivasi | Suka aksesoris unik — gak peduli blockchain |

### Pembeli Crypto (Enthusiast)
| Karakteristik | Detail |
|---|---|
| Usia | 20-40 tahun |
| Crypto? | Paham — punya wallet Stellar |
| Bayar | XLM/USDC via Freighter, Lobstr, xBull |
| Motivasi | Punya barang fisik + on-chain proof of ownership |

---

## 5. User Flow

### Flow Pembeli Awam
```
Lihat barang di lapak → Scan QR di tag → Landing page (foto, harga, status)
→ Klik "Beli via QRIS" → Bayar Rp X → Dapat notif "barang milik kamu"
→ Ambil barang langsung
```

### Flow Pembeli Crypto
```
Lihat barang di lapak → Scan QR → Landing page
→ Klik "Beli via Wallet" → Connect Freighter/Lobstr/xBull
→ Konfirmasi bayar XLM/USDC → Token masuk wallet buyer
→ Tunjukin bukti → ambil barang langsung
```

### Alur Saya (Seller)
```
Sebelum event:
  Buka dashboard → tambah produk (foto, nama, harga) → klik Mint
  System generate QR → cetak, laminasi, tempel di barang

Saat event:
  Pembeli scan QR → bayar → notif masuk ke HP saya
  Token otomatis pindah → serah barang

Setelah event:
  Dashboard lihat sisa stok + riwayat transaksi
```

---

## 6. Core Features

| # | Fitur | Untuk Siapa |
|---|---|---|
| 1 | **Mint token produk** — tiap barang jadi 1 token di Soroban | Saya (admin) |
| 2 | **QR unik per produk** — cetak & tempel di barang | Saya |
| 3 | **Landing page hasil scan** — foto, harga, status, pemilik | Pembeli |
| 4 | **Beli via QRIS** — bayar familiar tanpa wallet | Pembeli awam |
| 5 | **Beli via wallet Stellar** — Freighter/Lobstr/xBull | Pembeli crypto |
| 6 | **Verifikasi kepemilikan** — cek pemilik tanpa login | Semua |
| 7 | **Transfer kepemilikan** — token pindah otomatis pas laku | Otomatis |

---

## 7. Smart Contract — `trinket_token`

```rust
pub struct Product {
    pub id: u64,
    pub name: String,
    pub metadata_uri: String,
    pub price: i128,         // dalam stroops
    pub owner: Address,
    pub status: ProductStatus,
    pub created_at: u64,
}
```

| Function | Fungsi |
|---|---|
| `mint` | Saya daftarin produk baru |
| `transfer` | Pindah kepemilikan ke buyer |
| `verify` | Cek pemilik saat ini |
| `get_info` | Detail produk |
| `get_history` | Riwayat kepemilikan |

---

## 8. Tech Stack

| Layer | Pilihan |
|---|---|
| Smart Contract | Soroban (Rust) |
| Frontend | Next.js + TypeScript |
| Wallet Kit | @creit.tech/stellar-wallets-kit |
| Wallet Support | Freighter, Lobstr, xBull |
| Network | Stellar Testnet |
| Deploy | Vercel (free) |

---

## 9. Submission Checklist

- [ ] Contract deployed di Stellar Testnet
- [ ] Address contract di README
- [ ] Transaction hash contract call
- [ ] QR generator per produk
- [ ] Landing page — scan QR lihat info produk
- [ ] Bayar via wallet Stellar (XLM/USDC)
- [ ] Bayar via QRIS (simulasi)
- [ ] Public GitHub repo
- [ ] README: setup, screenshot, contract address

---

## 10. Kesimpulan

✅ **Nama:** ChainTrinket
✅ **Track:** RWA (Real World Assets)
✅ **Seller:** Saya sendiri — dashboard pribadi
✅ **Mint:** Khusus admin, bukan untuk umum
✅ **Pembeli awam:** QRIS, no wallet needed
✅ **Pembeli crypto:** Wallet Stellar + ambil barang langsung di event
✅ **Timeline:** 14 hari
