/**
 * ChainTrinket i18n — lightweight bilingual (ID/EN) support
 * Default language: English. Toggle persists via localStorage.
 */
const I18N = (() => {
  const STORAGE_KEY = 'ct_lang';

  const strings = {
    /* ─── shared ─── */
    'nav.catalog':      { id: 'Katalog',      en: 'Catalog' },
    'nav.admin':        { id: 'Admin',        en: 'Admin' },
    'nav.how':          { id: 'Cara belanja →', en: 'How to buy →' },
    'nav.backHome':     { id: 'Kembali',      en: 'Back' },
    'net.testnet':      { id: 'Stellar Testnet', en: 'Stellar Testnet' },
    'status.available': { id: 'Tersedia',     en: 'Available' },
    'status.sold':      { id: 'Terjual',      en: 'Sold' },
    'btn.detail':       { id: 'Detail',       en: 'Details' },
    'btn.copy':         { id: 'Salin',        en: 'Copy' },
    'btn.close':        { id: 'Tutup',        en: 'Close' },
    'btn.cancel':       { id: 'Batal',        en: 'Cancel' },
    'btn.retry':        { id: 'Coba lagi',    en: 'Try again' },
    'loading':          { id: 'Memuat...',    en: 'Loading...' },
    'loading.sub':      { id: 'Tunggu sebentar', en: 'Please wait' },
    'error.load':       { id: 'Gagal muat',   en: 'Failed to load' },
    'error.network':    { id: 'Tidak dapat terhubung ke Soroban', en: 'Cannot connect to Soroban' },
    'error.notFound':   { id: 'Token tidak ditemukan', en: 'Token not found' },
    'empty.title':      { id: 'Gak ada produk', en: 'No products' },
    'empty.sub':        { id: 'Tidak ada produk dengan filter ini', en: 'No products match this filter' },
    'token.of':         { id: 'Token #{{i}} / {{n}}', en: 'Token #{{i}} / {{n}}' },
    'contract.powered': { id: 'Powered by Soroban', en: 'Powered by Soroban' },

    /* ─── home.html ─── */
    'home.hero.badge':   { id: 'Live di event crypto · Stellar Testnet', en: 'Live at crypto events · Stellar Testnet' },
    'home.hero.h1a':     { id: 'Aksesoris fisik,', en: 'Physical accessories,' },
    'home.hero.h1b':     { id: 'bukti kepemilikan', en: 'ownership proof' },
    'home.hero.h1c':     { id: 'on-chain.', en: 'on-chain.' },
    'home.hero.sub':     { id: 'Gelang, kalung, cincin — tiap barang punya satu token di Stellar. Scan tag-nya, lihat siapa pemiliknya, dan bawa pulang langsung dari lapak. Gak perlu paham crypto buat mulai.', en: 'Bracelets, necklaces, rings — each item has one token on Stellar. Scan the tag, see the owner, and take it home from the booth. No crypto knowledge needed to start.' },
    'home.hero.cta1':    { id: 'Lihat cara belanja', en: 'See how to buy' },
    'home.hero.cta2':    { id: 'Lihat katalog', en: 'Browse catalog' },
    'home.hero.tag':     { id: 'Gelang Manik Biru', en: 'Blue Bead Bracelet' },
    'home.hero.stamp':   { id: '✓ Verified · #3/10', en: '✓ Verified · #3/10' },

    'home.why.kicker':   { id: 'Kenapa ChainTrinket', en: 'Why ChainTrinket' },
    'home.why.h2':       { id: 'Barang second di event susah dipercaya —\nsekarang ada buktinya.', en: 'Second-hand items at events are hard to trust —\nnow there\'s proof.' },

    'home.before':       { id: 'Sebelum', en: 'Before' },
    'home.after':        { id: 'Sesudah', en: 'After' },

    'home.card1h':       { id: 'Gak ada cara verifikasi keaslian', en: 'No way to verify authenticity' },
    'home.card1p':       { id: 'Pembeli ragu beli aksesoris second karena gak ada riwayat kepemilikan yang bisa dicek.', en: 'Buyers hesitate on second-hand accessories because there\'s no ownership history to verify.' },
    'home.card2h':       { id: 'Riwayat tercatat, bisa dicek siapa saja', en: 'History recorded, verifiable by anyone' },
    'home.card2p':       { id: 'Scan QR di barang → langsung lihat pemilik saat ini dan riwayat lengkapnya di chain.', en: 'Scan QR on the item → instantly see the current owner and full history on-chain.' },
    'home.card3h':       { id: 'Penjual mikro gak punya sistem kepemilikan', en: 'Micro-sellers lack ownership systems' },
    'home.card3p':       { id: 'Sulit bangun trust ke pembeli tanpa sistem pencatatan yang kredibel.', en: 'Hard to build buyer trust without a credible recording system.' },
    'home.card4h':       { id: 'Mint sekali, token urus sisanya', en: 'Mint once, the token handles the rest' },
    'home.card4p':       { id: 'Upload foto & harga, sistem generate QR — kepemilikan pindah otomatis pas terjual.', en: 'Upload photo & price, system generates QR — ownership transfers automatically when sold.' },

    'home.how.kicker':   { id: 'Cara belanja', en: 'How to buy' },
    'home.how.h2':       { id: 'Dua jalur — sama-sama 4 langkah.', en: 'Two paths — both 4 steps.' },
    'home.tab.casual':   { id: 'Pembeli awam · QRIS', en: 'Casual buyers · QRIS' },
    'home.tab.crypto':   { id: 'Pembeli crypto · Wallet', en: 'Crypto buyers · Wallet' },

    'home.step1a.title': { id: 'Scan tag', en: 'Scan the tag' },
    'home.step1a.desc':  { id: 'Pakai kamera HP, gak perlu install apa-apa.', en: 'Use your phone camera, no installation needed.' },
    'home.step2a.title': { id: 'Lihat detail', en: 'See details' },
    'home.step2a.desc':  { id: 'Foto, harga, dan status barang muncul langsung.', en: 'Photo, price, and item status appear instantly.' },
    'home.step3a.title': { id: 'Bayar QRIS', en: 'Pay with QRIS' },
    'home.step3a.desc':  { id: 'GoPay, OVO, Dana, atau m-banking — seperti biasa.', en: 'GoPay, OVO, Dana, or mobile banking — as usual.' },
    'home.step4a.title': { id: 'Ambil barang', en: 'Pick up item' },
    'home.step4a.desc':  { id: 'Notif kepemilikan masuk, tunjukin ke seller, bawa pulang.', en: 'Ownership notification received, show the seller, take it home.' },

    'home.step1b.title': { id: 'Scan tag', en: 'Scan the tag' },
    'home.step1b.desc':  { id: 'Atau buka link dari story/social media event.', en: 'Or open a link from event stories/social media.' },
    'home.step2b.title': { id: 'Connect wallet', en: 'Connect wallet' },
    'home.step2b.desc':  { id: 'Freighter, Lobstr, atau xBull — pilih salah satu.', en: 'Freighter, Lobstr, or xBull — pick one.' },
    'home.step3b.title': { id: 'Konfirmasi XLM', en: 'Confirm XLM' },
    'home.step3b.desc':  { id: 'Bayar dengan XLM atau USDC langsung dari wallet.', en: 'Pay with XLM or USDC directly from your wallet.' },
    'home.step4b.title': { id: 'Token masuk wallet', en: 'Token enters wallet' },
    'home.step4b.desc':  { id: 'Tunjukin bukti di HP, ambil barang di tempat — gak perlu kirim.', en: 'Show proof on your phone, pick up the item — no shipping needed.' },

    'home.how.foot':     { id: 'Token pindah otomatis di kontrak trinket_token begitu pembayaran terverifikasi.', en: 'Tokens transfer automatically in the trinket_token contract once payment is verified.' },

    'home.stat.tokens':  { id: 'Token diterbitkan', en: 'Tokens issued' },
    'home.stat.qris':    { id: 'Waktu bayar QRIS', en: 'QRIS payment time' },
    'home.stat.gas':     { id: 'XLM gas per transaksi', en: 'XLM gas per transaction' },
    'home.stat.history': { id: 'Riwayat on-chain', en: 'On-chain history' },

    'home.footer.sub':   { id: 'Fashion on-chain', en: 'Fashion on-chain' },

    /* ─── catalog.html ─── */
    'catalog.title':     { id: 'Koleksi', en: 'Collection' },
    'catalog.sub':       { id: 'Semua produk ChainTrinket — tokenisasi aksesoris di Stellar Soroban', en: 'All ChainTrinket products — accessory tokenization on Stellar Soroban' },
    'catalog.filter.all':     { id: 'Semua',     en: 'All' },
    'catalog.filter.avail':   { id: 'Tersedia',  en: 'Available' },
    'catalog.filter.sold':    { id: 'Terjual',   en: 'Sold' },
    'catalog.items':     { id: 'produk',       en: 'products' },

    /* ─── product.html ─── */
    'product.supply':    { id: 'Hasil scan tag · Token #{{i}} / {{n}}', en: 'Tag scan result · Token #{{i}} / {{n}}' },
    'product.rating':    { id: '★ 4.8 · 12 terjual di event', en: '★ 4.8 · 12 sold at events' },
    'product.tokenId':   { id: 'trinket_token · id #{{i}}', en: 'trinket_token · id #{{i}}' },
    'product.owner':       { id: 'Pemilik saat ini',  en: 'Current owner' },
    'product.viewing':     { id: 'sedang lihat sekarang', en: 'viewing now' },
    'product.history.mint': { id: 'Diterbitkan ke {{addr}} (mint)', en: 'Issued to {{addr}} (mint)' },
    'product.buy.qris':  { id: 'Bayar dengan QRIS', en: 'Pay with QRIS' },
    'product.buy.wallet':{ id: 'Sambungkan Wallet', en: 'Connect Wallet' },
    'product.foot.token':{ id: 'Token pindah otomatis · tercatat selamanya on-chain', en: 'Token transfers automatically · permanently recorded on-chain' },
    'product.contract':  { id: 'Contract {{addr}} di Stellar Explorer', en: 'Contract {{addr}} on Stellar Explorer' },

    'product.qris.title':  { id: 'Bayar via QRIS', en: 'Pay via QRIS' },
    'product.qris.sub':    { id: 'Scan pakai kamera HP kamu — GoPay, OVO, Dana, semua bank support QRIS.', en: 'Scan with your phone camera — GoPay, OVO, Dana, all banks support QRIS.' },

    'product.wallet.title':{ id: 'Sambungkan wallet', en: 'Connect wallet' },
    'product.wallet.freighter.sub': { id: 'Ekstensi browser', en: 'Browser extension' },
    'product.wallet.lobstr.sub':   { id: 'Wallet mobile',   en: 'Mobile wallet' },
    'product.wallet.xbull.sub':    { id: 'Ekstensi & mobile', en: 'Extension & mobile' },

    'product.error.offline': { id: 'Error<br>Offline', en: 'Error<br>Offline' },

    'confirm.title': { id:'Pembelian Berhasil!', en:'Purchase Complete!' },
    'confirm.share': { id:'Bagikan Bukti', en:'Share Proof' },

    /* ─── admin.html ─── */
    'admin.title':       { id: 'Produk kamu', en: 'Your products' },
    'admin.sub':         { id: 'trinket_token · mint, cetak QR, dan pantau status penjualan', en: 'trinket_token · mint, print QR, and monitor sales status' },
    'admin.btnNew':      { id: '+ Produk baru', en: '+ New product' },
    'admin.stat.total':  { id: 'Total Item', en: 'Total Items' },
    'admin.stat.sold':   { id: 'Terjual',     en: 'Sold' },
    'admin.stat.revenue':{ id: 'Pendapatan', en: 'Revenue (XLM)' },
    'admin.stat.owners': { id: 'Pemilik', en: 'Owners' },
    'admin.ledger':      { id: 'Daftar token', en: 'Token list' },
    'admin.search':      { id: 'Cari produk...', en: 'Search products...' },
    'admin.th.product':  { id: 'Produk',      en: 'Product' },
    'admin.th.price':    { id: 'Harga',       en: 'Price' },
    'admin.th.status':   { id: 'Status',      en: 'Status' },
    'admin.th.owner':    { id: 'Pemilik',     en: 'Owner' },
    'admin.noTokens':    { id: 'Belum ada token', en: 'No tokens yet' },
    'admin.sell':        { id: 'Jual',        en: 'Sell' },

    'admin.mint.title':  { id: 'Produk baru',  en: 'New product' },
    'admin.mint.photo':  { id: 'Foto produk',  en: 'Product photo' },
    'admin.mint.upload': { id: 'Klik untuk upload foto · JPG/PNG', en: 'Click to upload photo · JPG/PNG' },
    'admin.mint.name':   { id: 'Nama produk',  en: 'Product name' },
    'admin.mint.price':  { id: 'Harga (XLM)',  en: 'Price (XLM)' },
    'admin.mint.go':     { id: 'Mint & generate QR', en: 'Mint & generate QR' },

    'admin.qr.title':    { id: 'QR siap cetak', en: 'QR ready to print' },
    'admin.qr.print':    { id: 'Cetak (4×4 cm)', en: 'Print (4×4 cm)' },

    'admin.sell.title':  { id: 'Transfer token ke buyer', en: 'Transfer token to buyer' },
    'admin.sell.desc':   { id: 'Masukkan alamat wallet Stellar pembeli.<br>Token akan dikirim dan otomatis ditandai <strong>Terjual</strong>.', en: 'Enter buyer\'s Stellar wallet address.<br>Token will be sent and automatically marked as <strong>Sold</strong>.' },
    'admin.sell.tokenId':{ id: 'Token ID',     en: 'Token ID' },
    'admin.sell.buyerAddr': { id: 'Alamat wallet buyer', en: 'Buyer wallet address' },
    'admin.sell.go':     { id: 'Transfer token', en: 'Transfer token' },
    'admin.sell.preparing': { id: 'Menyiapkan transaksi...', en: 'Preparing transaction...' },
    'admin.sell.confirm': { id: 'Konfirmasi di Freighter...', en: 'Confirm in Freighter...' },
    'admin.sell.adminOnly': { id: 'Hanya admin yang bisa transfer. Pastikan wallet admin terhubung.', en: 'Only admin can transfer. Make sure admin wallet is connected.' },
    'admin.sell.success': { id: 'Token #{{id}} berhasil ditransfer ke buyer!', en: 'Token #{{id}} transferred to buyer successfully!' },
    'admin.sell.processing': { id: 'Memproses...', en: 'Processing...' },

    'admin.alert.nameReq': { id: 'Nama produk wajib', en: 'Product name is required' },
    'admin.alert.priceReq': { id: 'Harga XLM wajib', en: 'XLM price is required' },
    'admin.alert.adminOnly': { id: 'Hanya admin yang bisa mint', en: 'Only admin can mint' },
    'admin.alert.mintFail': { id: 'Gagal: ', en: 'Failed: ' },
    'admin.alert.mintSuccess': { id: 'Mint berhasil!', en: 'Mint successful!' },
    'admin.alert.sellSuccess': { id: 'Token #{{id}} berhasil dijual!', en: 'Token #{{id}} sold successfully!' },
    'admin.alert.buyerAddrReq': { id: 'Masukkan alamat wallet buyer', en: 'Enter buyer wallet address' },
    'admin.alert.addrInvalid': { id: 'Alamat tidak valid — harus dimulai dengan G atau C', en: 'Invalid address — must start with G or C' },
    'admin.alert.addrShort': { id: 'Alamat tidak valid — terlalu pendek', en: 'Invalid address — too short' },
    'admin.alert.txFail': { id: 'Transaksi gagal', en: 'Transaction failed' },
    'admin.toast.minted': { id: 'Token berhasil di-mint', en: 'Token minted successfully' },

    'admin.init.banner': { id: 'Contract belum di-init', en: 'Contract not yet initialized' },
    'admin.init.desc':   { id: 'Klik tombol di bawah untuk inisialisasi contract dengan wallet admin kamu.', en: 'Click the button below to initialize the contract with your admin wallet.' },
    'admin.init.btn':    { id: 'Init Contract', en: 'Initialize Contract' },
    'admin.init.success': { id: 'Contract berhasil di-init!', en: 'Contract initialized successfully!' },
    'admin.init.fail':   { id: 'Gagal init: ', en: 'Init failed: ' },

    /* ─── deployer.html ─── */
    'deployer.title':    { id: 'Deploy ulang', en: 'Redeploy' },
    'deployer.sub':      { id: 'Contract lama pake admin address beda. Deploy baru biar admin = wallet kamu.', en: 'Old contract uses a different admin address. Deploy a new one so admin = your wallet.' },
    'deployer.wasm':     { id: 'trinket_token.optimized', en: 'trinket_token.optimized' },
    'deployer.walletLabel': { id: 'WALLET ADMIN (FREIGHTER)', en: 'ADMIN WALLET (FREIGHTER)' },
    'deployer.walletPlaceholder': { id: 'Klik tombol Connect di bawah', en: 'Click Connect button below' },
    'deployer.btn.connect': { id: '1. Connect Freighter', en: '1. Connect Freighter' },
    'deployer.btn.connectOk': { id: '✓ Freighter tersambung', en: '✓ Freighter connected' },
    'deployer.btn.deploy': { id: '2. Deploy contract baru', en: '2. Deploy new contract' },
    'deployer.btn.processing': { id: 'Memproses...', en: 'Processing...' },
    'deployer.btn.tryAgain': { id: 'Coba lagi', en: 'Try again' },

    'deployer.status.checkSeq': { id: 'Cek sequence account...', en: 'Checking account sequence...' },
    'deployer.status.building': { id: 'Bikin transaksi deploy...', en: 'Building deploy transaction...' },
    'deployer.status.simulating': { id: 'Simulasi transaksi...', en: 'Simulating transaction...' },
    'deployer.status.confirming': { id: 'Konfirmasi di Freighter...', en: 'Confirm in Freighter...' },
    'deployer.status.submitting': { id: 'Submit ke network...', en: 'Submitting to network...' },
    'deployer.status.waiting': { id: 'Nunggu konfirmasi...', en: 'Waiting for confirmation...' },

    'deployer.success.title': { id: 'Contract deployed!', en: 'Contract deployed!' },
    'deployer.success.done': { id: 'Berhasil!', en: 'Success!' },
    'deployer.success.id': { id: 'Contract ID:', en: 'Contract ID:' },
    'deployer.success.note': { id: 'Contract sudah deploy + init dengan admin wallet kamu.<br>Buka <strong>admin.html</strong> untuk mulai mint produk.', en: 'Contract deployed and initialized with your admin wallet.<br>Open <strong>admin.html</strong> to start minting products.' },

    'deployer.error.nofreighter': { id: 'Freighter tidak terinstall', en: 'Freighter not installed' },
    'deployer.error.noAccount': { id: 'Account tidak ditemukan di testnet. Isi dulu via friendbot.', en: 'Account not found on testnet. Fund it via friendbot first.' },
    'deployer.error.txFailed': { id: 'Transaksi gagal. Cek kontrak.', en: 'Transaction failed. Check the contract.' },
    'deployer.error.timeout': { id: 'Timeout nunggu konfirmasi.', en: 'Timeout waiting for confirmation.' },
    'deployer.error.generic': { id: 'Gagal: ', en: 'Failed: ' },

    /* ─── my-items.html ─── */
    'nav.myItems':      { id: 'Barang Saya', en: 'My Items' },
    'myItems.title':    { id: 'Barang Saya', en: 'My Items' },
    'myItems.sub':      { id: 'Koleksi trinket_token kamu di Stellar Soroban', en: 'Your trinket_token collection on Stellar Soroban' },
    'myItems.connect':  { id: 'Sambungkan wallet untuk lihat barang kamu', en: 'Connect wallet to see your items' },
    'myItems.empty':    { id: 'Belum punya barang', en: 'No items yet' },
    'myItems.emptySub': { id: 'Barang yang kamu beli akan muncul di sini', en: 'Items you buy will appear here' },
    'myItems.transfer':   { id: 'Transfer',     en: 'Transfer' },
    'myItems.share':      { id: 'Bagikan',      en: 'Share' },
    'myItems.receipt.item':   { id: 'Barang',   en: 'Item' },
    'myItems.receipt.id':     { id: 'ID Token', en: 'Token ID' },
    'myItems.receipt.price':  { id: 'Harga',    en: 'Price' },
    'myItems.receipt.owner':  { id: 'Pemilik',  en: 'Owner' },
    'myItems.receipt.title':  { id: 'Bukti Kepemilikan', en: 'Ownership Receipt' },
    'myItems.receipt.share':  { id: 'Bagikan',  en: 'Share' },
    'myItems.receipt.dl':     { id: 'Simpan',   en: 'Save' },
    'myItems.receipt.copied': { id: 'Tautan disalin!', en: 'Link copied!' },
    'footer.built': { id: 'Dibangun di atas', en: 'Built on' },
  };

  let current = localStorage.getItem(STORAGE_KEY) || 'en';

  function t(key, params) {
    const entry = strings[key];
    if (!entry) return key;
    let val = entry[current] || entry.en || key;
    if (params) {
      Object.keys(params).forEach(k => {
        val = val.replace(new RegExp('\\{\\{' + k + '\\}\\}', 'g'), params[k]);
      });
    }
    return val;
  }

  /** Walk DOM and replace textContent of [data-i18n] elements */
  function apply() {
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      const params = el.getAttribute('data-i18n-params');
      el.textContent = t(key, params ? JSON.parse(params) : undefined);
    });
    document.querySelectorAll('[data-i18n-html]').forEach(el => {
      el.innerHTML = t(el.getAttribute('data-i18n-html'));
    });
    document.documentElement.lang = current;
    // Update toggle buttons
    document.querySelectorAll('#langToggle, .lang-toggle').forEach(btn => {
      btn.textContent = current === 'id' ? 'EN' : 'ID';
    });
  }

  function toggle() {
    current = current === 'id' ? 'en' : 'id';
    localStorage.setItem(STORAGE_KEY, current);
    apply();
    // Re-render dynamic content if render functions exist
    if (typeof render === 'function') render();
    if (typeof loadDashboard === 'function') loadDashboard();
    // Trigger React re-render for my-items.html & any React page
    window.dispatchEvent(new CustomEvent('i18n-changed', { detail: { lang: current } }));
  }

  function lang() { return current; }

  // Set active nav link based on current page
  function setActiveNav() {
    const page = window.location.pathname.split('/').pop() || 'home.html';
    document.querySelectorAll('.nav-links a, .topbar-right a, .mobile-drawer a').forEach(a => {
      const href = a.getAttribute('href');
      if (href && href === page) a.classList.add('active');
    });
  }

  // Global active nav style
  (function injectNavStyle() {
    const s = document.createElement('style');
    s.textContent = '.nav-links a.active, .topbar-right a.active, .mobile-drawer a.active { color: var(--gold-light) !important; background: rgba(201,162,39,0.12) !important; }';
    document.head.appendChild(s);
  })();

  // Run on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', setActiveNav);
  } else {
    setActiveNav();
  }

  return { t, apply, toggle, lang, setActiveNav };
})();
window.T = I18N.t;
window.I18N = I18N;
