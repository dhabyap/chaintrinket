const s = require('@stellar/stellar-sdk');
const ops = Object.keys(s.Operation || {});
const contractOps = ops.filter(o => /contract|deploy|host|invoke|create/i.test(o));
console.log('contract ops:', contractOps.join(', '));
console.log('---');
// Check what deploy options exist
Object.entries(s).forEach(([k,v]) => {
  if (/contract|deploy/i.test(k) && typeof v === 'function') console.log('s.'+k+': function');
  else if (/contract|deploy/i.test(k) && typeof v === 'object') console.log('s.'+k+':', Object.keys(v).slice(0,10));
});
