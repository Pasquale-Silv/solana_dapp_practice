import { Connection, LAMPORTS_PER_SOL, PublicKey } from "@solana/web3.js";

// The script loads the public key, connects to DevNet, and checks the balance
// >>> npx esrun check-balance.ts
const addressToCheck = "2sCqpRRaG9NgpMn6Ma3bGKbYk5SNxUdAaVY4uzzArZEC";
const publicKey = new PublicKey(addressToCheck);

const connection = new Connection("https://api.devnet.solana.com", "confirmed");

const balanceInLamports = await connection.getBalance(publicKey);

const balanceInSOL = balanceInLamports / LAMPORTS_PER_SOL;

console.log(
  `💰 Finished! The balance for the wallet at address "${publicKey}" is ${balanceInSOL}!`
);
