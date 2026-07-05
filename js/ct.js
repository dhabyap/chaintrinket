const CT = (() => {
  const CONFIG = {
    contractId: 'CATZRF3HW437XOCX42NWDWZ6WRZ2IHFWBQSGMQPX3EGCKGE4B765XIEP',
    rpcUrl: 'https://soroban-testnet.stellar.org',
    networkPassphrase: 'Test SDF Network ; September 2015',
    admin: 'GA7FSHWRJ2MJ5Y6MKPMORFSDMOWKQTPEREEAQ4AVSJO5ROS3CCEGBJ7X'
  };
  const sv = new StellarSdk.rpc.Server(CONFIG.rpcUrl);
  const c = new StellarSdk.Contract(CONFIG.contractId);
  const shortAddr = a => a ? a.slice(0, 4) + '…' + a.slice(-4) : '';
  const formatPrice = p => (Number(p) / 10_000_000).toFixed(2) + ' XLM';
  const formatRp = p => 'Rp ' + Math.round(Number(p) / 10_000_000 * 17500).toLocaleString('id-ID');

  async function _sim(method, args) {
    const acc = await sv.getAccount(CONFIG.admin);
    const tx = new StellarSdk.TransactionBuilder(acc, { fee: '1000', networkPassphrase: CONFIG.networkPassphrase })
      .addOperation(c.call(method, ...args)).setTimeout(30).build();
    const sim = await sv.simulateTransaction(tx);
    if (!sim.result?.retval) throw new Error('Simulate failed');
    return StellarSdk.scValToNative(sim.result.retval);
  }

  return {
    getInfo: async id => {
      const r = await _sim('get_info', [StellarSdk.nativeToScVal(Number(id), { type: 'u64' })]);
      if(!r) return null;
      return { id: Number(r.id), name: String(r.name), price: r.price, owner: String(r.owner), status: Number(r.status) === 0 ? 'available' : 'sold', created_at: Number(r.created_at) };
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
          new StellarSdk.Address(adminKey).toScVal(),
          StellarSdk.nativeToScVal(name, { type: 'symbol' }),
          StellarSdk.nativeToScVal(metadataUri, { type: 'string' }),
          StellarSdk.nativeToScVal(BigInt(price), { type: 'i128' })
        )).setTimeout(30).build();
      const prep = await sv.prepareTransaction(tx);
      const signed = await window.freighter.signTransaction(prep.toXDR(), { networkPassphrase: CONFIG.networkPassphrase });
      return await sv.sendTransaction(StellarSdk.TransactionBuilder.fromXDR(signed, CONFIG.networkPassphrase));
    },
    transfer: async (from, to, id) => {
      const acc = await sv.getAccount(from);
      const tx = new StellarSdk.TransactionBuilder(acc, { fee: '1000', networkPassphrase: CONFIG.networkPassphrase })
        .addOperation(c.call('transfer', new StellarSdk.Address(from).toScVal(), new StellarSdk.Address(to).toScVal(), StellarSdk.nativeToScVal(Number(id), { type: 'u64' })))
        .setTimeout(30).build();
      const prep = await sv.prepareTransaction(tx);
      const signed = await window.freighter.signTransaction(prep.toXDR(), { networkPassphrase: CONFIG.networkPassphrase });
      return await sv.sendTransaction(StellarSdk.TransactionBuilder.fromXDR(signed, CONFIG.networkPassphrase));
    },
    connectFreighter: async () => window.freighter.getPublicKey(),
    shortAddr, formatPrice, formatRp, CONFIG
  };
})();
window.CT = CT;
