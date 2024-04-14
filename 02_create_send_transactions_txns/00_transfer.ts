import { Connection, Transaction, SystemProgram, sendAndConfirmTransaction, PublicKey } from "@solana/web3.js";
// import "dotenv/config"
import { getKeypairFromEnvironment } from "@solana-developers/helpers";

require('dotenv').config()

// npx esrun transfer.ts <(destination wallet address)>
// npx esrun .\02_create_send_transactions_txns\00_transfer.ts 7bTyR6EJmtrEDddizTyntZKznBTgoin7cdX9utEe3a77


// Take the PubKey from the CLI...
const suppliedToPubkey = process.argv[2] || null;

if (!suppliedToPubkey) {
    console.log(`Please provide a public key to send to`);
    process.exit(1);
}

// Or take a PubKey from the Env...
// const suppliedToPubkey: string = process.env.SECOND_PUBLIC_ADDRESS!;

const senderKeypair = getKeypairFromEnvironment("SECRET_KEY");

console.log(`suppliedToPubkey: ${suppliedToPubkey}`);

const toPubkey = new PublicKey(suppliedToPubkey);

const connection = new Connection("https://api.devnet.solana.com", "confirmed");

console.log(
    `✅ Loaded our own keypair, the destination public key, and connected to Solana`
);

// Create and send the transaction
const transaction = new Transaction();
  
const LAMPORTS_TO_SEND = 5000;
  
const sendSolInstruction = SystemProgram.transfer({
    fromPubkey: senderKeypair.publicKey,
    toPubkey,
    lamports: LAMPORTS_TO_SEND,
});
  
transaction.add(sendSolInstruction);
  
const signature = await sendAndConfirmTransaction(
    connection,
    transaction,
    [senderKeypair]
);
  
console.log(
    `💸 Finished! Sent ${LAMPORTS_TO_SEND} to the address ${toPubkey}. `
);
console.log(`Transaction signature is ${signature}!`);
