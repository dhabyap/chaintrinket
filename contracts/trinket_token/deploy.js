const sdk = require('@stellar/stellar-sdk');
const crypto = require('crypto');

async function main() {
  const server = new sdk.rpc.Server('https://soroban-testnet.stellar.org');
  const admin = 'GAJ5AG7JPSJIVGGZXCZHPG3UUHHV4ECABRIQHVY7II4WTDDDNHXXFEOU';
  const NET = 'Test SDF Network ; September 2015';

  // WASM already installed on testnet
  const wasmHash = '12b104072b510de401dd8b035facb666a768b2c3ae881ca461802169488a8d8e';
  const hashBuf = Buffer.from(wasmHash, 'hex');
  const salt = crypto.randomBytes(32);

  const contractId = sdk.StrKey.encodeContract(
    sdk.hash(Buffer.concat([
      sdk.hash(salt),
      sdk.StrKey.decodeEd25519PublicKey(admin)
    ]))
  );

  console.log('WASM Hash:', wasmHash);
  console.log('Contract ID (prediksi):', contractId);
  console.log('Salt (hex):', salt.toString('hex'));
  console.log('');
  console.log('Jalankan ini di terminal:');
  console.log('');
  console.log(`soroban contract deploy --wasm-hash ${wasmHash} --salt ${salt.toString('hex')} --source ${admin} --rpc-url https://soroban-testnet.stellar.org --network-passphrase "${NET}"`);
}

main().catch(console.error);
