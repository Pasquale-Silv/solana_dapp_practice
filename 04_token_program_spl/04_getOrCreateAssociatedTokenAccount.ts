import { Connection, PublicKey, clusterApiUrl } from "@solana/web3.js";
import { getKeypairFromEnvironment } from "@solana-developers/helpers";
import { getOrCreateAssociatedTokenAccount } from "@solana/spl-token";


require('dotenv').config();
const keypair = getKeypairFromEnvironment("SECRET_KEY");

// npx esrun .\04_token_program_spl\04_getOrCreateAssociatedTokenAccount.ts

const connection = new Connection(clusterApiUrl("devnet"));

const mintAccountPubKey = "6Ry6TFKLnXVw55iRLvMmzsjtZb9jGoKEn48ybcUpWMBE";
const mint = new PublicKey(mintAccountPubKey);

/*
You can also use getOrCreateAssociatedTokenAccount to get the Token Account associated with a given address or create it if it doesn't exist.
For example, if you were writing code to airdrop tokens to a given user,
you'd likely use this function to ensure that the token account associated with the given user gets created if it doesn't already exist.
*/
const associatedTokenAccount = await getOrCreateAssociatedTokenAccount(
    connection,
    keypair,             // Signer/Payer
    mint,                // Mint: the token mint that the new token account is associated with
    keypair.publicKey,   // Owner: the account of the owner of the new token account
);

console.log(associatedTokenAccount);
console.log(`ATA Address: ${associatedTokenAccount.address}`);
console.log(`Owner Address: ${associatedTokenAccount.owner}`);
console.log(`Mint Address: ${associatedTokenAccount.mint}`);
console.log(`Amount: ${associatedTokenAccount.amount}\n`);

console.log(`getOrCreateAssociatedTokenAccount: '${associatedTokenAccount.address}'`);
console.log(`getOrCreateAssociatedTokenAccount: https://explorer.solana.com/address/${associatedTokenAccount.address}?cluster=devnet`);
