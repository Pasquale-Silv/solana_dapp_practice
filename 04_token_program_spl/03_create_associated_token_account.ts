import { Connection, PublicKey, clusterApiUrl } from "@solana/web3.js";
import { getKeypairFromEnvironment } from "@solana-developers/helpers";
import { createAssociatedTokenAccount } from "@solana/spl-token";


require('dotenv').config();
const keypair = getKeypairFromEnvironment("SECRET_KEY");

// npx esrun .\04_token_program_spl\03_create_associated_token_account.ts

const connection = new Connection(clusterApiUrl("devnet"));

const mintAccountPubKey = "7Kcigj3rmVoAHGiayhG9w6EeYLFttQqEXvbZkTnwFwqx";
const mint = new PublicKey(mintAccountPubKey);

/*
An Associated Token Account stores tokens in an address made from the owner's public key and the token mint.
Associated Token Accounts (ATA) provide a deterministic way to find the Token Account owned by a specific Public Key for a specific token.
*/
const associatedTokenAccount = await createAssociatedTokenAccount(
    connection,
    keypair,             // Signer/Payer
    mint,                // Mint: the token mint that the new token account is associated with
    keypair.publicKey,   // Owner: the account of the owner of the new token account
);

console.log(`Creato nuovo Associated Token Account: '${associatedTokenAccount}'`);
console.log(`Associated Token Account: https://explorer.solana.com/address/${associatedTokenAccount}?cluster=devnet`);
