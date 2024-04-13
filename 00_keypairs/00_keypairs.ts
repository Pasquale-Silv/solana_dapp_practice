import { Keypair } from "@solana/web3.js";

// npm i @solana/web3.js
// npm i @solana-developers/helpers
const keypair = Keypair.generate();

console.log(`The public key is: `, keypair.publicKey.toBase58());
console.log(`The secret key is: `, keypair.secretKey);
