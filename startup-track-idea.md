# ChainTrinket — Startup Track Idea Submission

## 1. Problem Statement

**Masalah:** Di Indonesia, pasar aksesoris second-hand (gelang, kalung, cincin) di event-event offline susah dipercaya. Pembeli gak punya cara buat verifikasi keaslian atau riwayat kepemilikan barang. Penjual kecil kayak saya juga gak punya sistem buat bedain barang asli vs tiruan.

Akibatnya: trust rendah, harga jual turun, barang bagus jadi gak laku.

**Solusi:** ChainTrinket — tokenisasi aksesoris fisik pakai Stellar Soroban. Tiap barang dikasih 1 token unik. Kepemilikan tercatat di chain. Pembeli scan QR di barang, langsung lihat pemilik sekarang dan riwayat lengkap.

---

## 2. Why Stellar?

| Alasan | Detail |
|---|---|
| **Biaya gas rendah** | Transaksi Soroban < 0.001 XLM — cocok buat barang harga Rp 20k-100k |
| **Cepat & final** | 3-5 detik settlement — pas buat transaksi offline di event |
| **Soroban smart contract** | NFT-like token untuk RWA, bukan cuma payment |
| **Ekosistem Anchor** | Nanti bisa integrasi on/off ramp buat jualan lebih gede |
| **StellarWalletsKit** | Multi-wallet (Freighter, Lobstr, xBull) — user crypto friendly |
| **Testnet gratis** | Bisa develop tanpa biaya |

Stellar cocok karena fokus ke **financial inclusion** dan **RWA** — persis kayak yang kita lakuin: aksesoris fisik orang Indonesia di-chain.

---

## 3. Target Users

| Segmen | Siapa | Kebutuhan |
|---|---|---|
| **Pembeli awam (non-crypto)** | Anak muda 17-35, belanja di event, gak punya wallet | Bayar QRIS, scan QR, trust keaslian |
| **Crypto enthusiast** | Paham Stellar/XLM, punya Freighter/Lobstr | Ingin barang fisik + experience on-chain |
| **Seller mikro (saya & teman)** | Jualan aksesoris di event crypto & offline | Track stok, bukti kepemilikan, bedain barang asli |

Model **dual payment** (QRIS untuk awam + XLM/USDC untuk crypto) bikin gap-nya jembatan.

---

## 4. Technical Architecture

```
Frontend (Next.js / GitHub Pages)
├── home.html — Landing page
├── catalog.html — Katalog produk
├── product.html — Detail produk (scan QR)
└── admin.html — Dashboard mint & stok
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

**Alur data:**
1. Admin mint produk → token ID + QR di-generate
2. QR ditempel di barang fisik
3. Pembeli scan QR → landing page ambil data dari contract
4. Pembayaran QRIS/wallet → trigger transfer token
5. Kepemilikan tercatat on-chain

---

## 5. Complexity Evaluation

| Tantangan | Kenapa Sulit | Mitigasi |
|---|---|---|
| **Dual payment** | QRIS fiat + XLM crypto perlu bridging | Stage 1: wallet dulu. Stage 2: QRIS via payment gateway |
| **QR generation + cetak fisik** | QR harus unik per barang, bisa dipake ulang | Token ID → deterministic QR. Kalo barang laku, QR tetap指向 product page |
| **User onboarding non-crypto** | Mereka gak ngerti wallet, gas, address | Custodial wallet + QRIS. Mereka cuma lihat "scan → bayar → punya" |
| **Contract upgrade** | Produk sifatnya permanen di chain | Gunakan data URI untuk metadata fleksibel |
| **Verifikasi offline** | Di event, orang scan QR tanpa internet? | QR simpan token ID — halaman cache-able. Tapi chain tetap perlu online buat verify |

**Teknis:** Rust Soroban masih cukup baru. Dokumentasi terbatas. Tapi basic contract (mint, transfer, verify) sudah teruji di banyak proyek.

---

## 6. Roadmap

### MVP (Minggu 1-2)
- [ ] Contract `trinket_token` di Testnet — mint, transfer, verify
- [ ] Frontend: landing, catalog, product, admin (✅ done)
- [ ] Integrasi wallet: Freighter/Lobstr/xBull connect & pay
- [ ] QR generator per token
- [ ] Flow QRIS simulasi
- [ ] Deploy GitHub Pages

### User Acquisition (Minggu 3-4)
- [ ] Pake di event crypto terdekat — 10 produk real
- [ ] Kumpulin feedback dari pembeli awam & crypto
- [ ] Iterasi UX berdasarkan real usage
- [ ] Bikin social proof: foto barang + QR di Instagram

### Mainnet Vision (Post-Hackathon)
- [ ] Deploy ke Stellar Mainnet
- [ ] Integrasi payment gateway beneran (Midtrans/QRIS)
- [ ] Wallet non-custodial untuk pembeli awam (bisa claim token)
- [ ] Second-hand marketplace: jual token kepemilikan
- [ ] Anchor integration buat on/off ramp

---

## Kenapa ini Startup, Bukan Sekadar Project?

ChainTrinket bukan cuma technical demo. Ini **bisnis nyata**: saya sendiri jualan aksesoris di event crypto. Modelnya:

- **Revenue:** Margin jualan aksesoris (QRIS + XLM)
- **Unit ekonomi:** Per barang terjual = revenue. Gas cost hampir 0
- **Scalability:** Dari 10 barang → ratusan. Dari 1 seller → komunitas seller mikro
- **Defensibility:** Network effect — makin banyak barang tertoken, makin valuable ekosistemnya

**Target:** Jadi standar "proof of ownership" buat aksesoris fisik di event crypto Indonesia.
