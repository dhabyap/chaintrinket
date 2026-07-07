const CT = (() => {
  const CONFIG = {
    contractId: 'CAFLM7AZ2HFJ3FX6SRYNYELAMPIPRVJULNVV4HYJN6TLQFUORCK57ECS',
    rpcUrl: 'https://soroban-testnet.stellar.org',
    networkPassphrase: 'Test SDF Network ; September 2015',
    admin: 'GAJ5AG7JPSJIVGGZXCZHPG3UUHHV4ECABRIQHVY7II4WTDDDNHXXFEOU'
  };
  const sv = new StellarSdk.rpc.Server(CONFIG.rpcUrl);
  const c = new StellarSdk.Contract(CONFIG.contractId);
  /** Build address ScVal manually — bypass Address class toScVal/toScAddress bug */
  const addrScVal = a => {
    const pk = StellarSdk.xdr.PublicKey.publicKeyTypeEd25519(StellarSdk.StrKey.decodeEd25519PublicKey(a));
    return StellarSdk.xdr.ScVal.scvAddress(StellarSdk.xdr.ScAddress.scAddressTypeAccount(pk));
  };

  const shortAddr = a => a ? a.slice(0, 4) + '…' + a.slice(-4) : '';
  const formatPrice = p => (Number(p) / 10_000_000).toFixed(2) + ' XLM';
  const formatRp = p => 'Rp ' + Math.round(Number(p) / 10_000_000 * 17500).toLocaleString('id-ID');

  async function _sim(method, args) {
    const acc = await sv.getAccount(CONFIG.admin);
    const tx = new StellarSdk.TransactionBuilder(acc, { fee: '1000', networkPassphrase: CONFIG.networkPassphrase })
      .addOperation(c.call(method, ...args)).setTimeout(30).build();
    const sim = await sv.simulateTransaction(tx);
    if (!sim.result?.retval) throw new Error('Simulate failed: ' + (sim.error || 'no retval'));
    return StellarSdk.scValToNative(sim.result.retval);
  }

  /** Check Freighter extension installed */
  async function freighterAvailable() {
    return !!window.freighterApi;
  }

  /** Connect Freighter — request access, return pubkey */
  async function connectFreighter() {
    const avail = await freighterAvailable();
    if (!avail) throw new Error('Freighter tidak terinstall');

    // request access first
    const { address, error: reqErr } = await window.freighterApi.requestAccess();
    if (reqErr) throw new Error('Gagal akses Freighter: ' + reqErr.message);
    if (!address) throw new Error('Freighter tidak memberikan akses');

    return address;
  }

  /** Get connected Freighter address (no prompt if already allowed) */
  async function getFreighterAddress() {
    const { address, error } = await window.freighterApi.getAddress();
    if (error) throw new Error('Gagal baca alamat: ' + error.message);
    return address;
  }

  /** Sign & send transaction using whichever Freighter address matches `signer` */
  async function signAndSend(tx, signer) {
    const xdr = tx.toXDR();
    const { signedTxXdr, error: signErr } = await window.freighterApi.signTransaction(xdr, {
      networkPassphrase: CONFIG.networkPassphrase,
      address: signer
    });
    if (signErr) throw new Error('Gagal tanda tangan: ' + signErr.message);
    if (!signedTxXdr) throw new Error('Freighter tidak mengembalikan signed XDR');
    const signedTx = StellarSdk.TransactionBuilder.fromXDR(signedTxXdr, CONFIG.networkPassphrase);
    return await sv.sendTransaction(signedTx);
  }

  /** Init contract — panggil sekali setelah deploy */
  async function initContract(adminKey) {
    const acc = await sv.getAccount(adminKey);
    const tx = new StellarSdk.TransactionBuilder(acc, { fee: '1000', networkPassphrase: CONFIG.networkPassphrase })
      .addOperation(c.call('init', addrScVal(adminKey)))
      .setTimeout(30).build();
    const prep = await sv.prepareTransaction(tx);
    return await signAndSend(prep, adminKey);
  }

  return {
    initContract,
    _sim,
    getInfo: async id => {
      const r = await _sim('get_info', [StellarSdk.nativeToScVal(Number(id), { type: 'u64' })]);
      if(!r) return null;
      const rawStatus = r.status?.tag ?? r.status ?? '';
      console.log('getInfo #%d raw status:', id, rawStatus, '(type:', typeof rawStatus, ')');
      const isSold = String(rawStatus).toLowerCase() === 'sold';
      return { id: Number(r.id), name: String(r.name), price: r.price, owner: String(r.owner), status: isSold ? 'sold' : 'available', created_at: Number(r.created_at) };
    },
    totalSupply: async () => Number(await _sim('total_supply', [])),
    getAllTokens: async () => {
      const n = await CT.totalSupply();
      const tokens = [];
      for (let i = 1; i <= n; i++) {
        try { const t = await CT.getInfo(i); if (t) tokens.push(t); } catch(e) {}
      }
      return tokens;
    },
    mint: async (adminKey, name, metadataUri, price) => {
      const acc = await sv.getAccount(adminKey);
      const tx = new StellarSdk.TransactionBuilder(acc, { fee: '1000', networkPassphrase: CONFIG.networkPassphrase })
        .addOperation(c.call('mint',
          addrScVal(adminKey),
          StellarSdk.nativeToScVal(name, { type: 'string' }),
          StellarSdk.nativeToScVal(metadataUri, { type: 'string' }),
          StellarSdk.nativeToScVal(BigInt(price), { type: 'i128' })
        )).setTimeout(30).build();
      const prep = await sv.prepareTransaction(tx);
      return await signAndSend(prep, adminKey);
    },
    transfer: async (from, to, id) => {
      const acc = await sv.getAccount(from);
      const tx = new StellarSdk.TransactionBuilder(acc, { fee: '1000', networkPassphrase: CONFIG.networkPassphrase })
        .addOperation(c.call('transfer',
          addrScVal(from),
          addrScVal(to),
          StellarSdk.nativeToScVal(Number(id), { type: 'u64' })
        )).setTimeout(30).build();
      const prep = await sv.prepareTransaction(tx);
      return await signAndSend(prep, from);
    },
    connectFreighter,
    getFreighterAddress,
    freighterAvailable,
    shortAddr, formatPrice, formatRp, CONFIG
  };
})();
window.CT = CT;
