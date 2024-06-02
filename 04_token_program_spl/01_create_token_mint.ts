import { Connection, clusterApiUrl } from "@solana/web3.js";
import { getKeypairFromEnvironment } from "@solana-developers/helpers";
import { createMint } from "@solana/spl-token";


require('dotenv').config();
const public_address: string | undefined = process.env.PUBLIC_ADDRESS;
const keypair = getKeypairFromEnvironment("SECRET_KEY");

// npx esrun .\04_token_program_spl\01_create_token_mint.ts

const connection = new Connection(clusterApiUrl("devnet"));

// The createMint function returns the publicKey of the new token mint
const tokenMint = await createMint(
    connection,
    keypair,              // Signer
    keypair.publicKey,    // Mint Authority
    null,                 // Freeze Authority
    0                     // Decimal
);

console.log(`Creato nuovo Mint Account: '${tokenMint}'`);
console.log(`Token Mint: https://explorer.solana.com/address/${tokenMint}?cluster=devnet`);
