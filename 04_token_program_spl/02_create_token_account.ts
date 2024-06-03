import { Connection, PublicKey, clusterApiUrl } from "@solana/web3.js";
import { getKeypairFromEnvironment } from "@solana-developers/helpers";
import { createAccount } from "@solana/spl-token";


require('dotenv').config();
const keypair = getKeypairFromEnvironment("SECRET_KEY");

// npx esrun .\04_token_program_spl\02_create_token_account.ts

const connection = new Connection(clusterApiUrl("devnet"));

const mintAccountPubKey = "GN6tTUZUSn7mxw2TiYaZkdiPpSNufDk52SsiY9Wwidgh";
const mint = new PublicKey(mintAccountPubKey);

/*
Before you can mint tokens (issue new supply), you need a Token Account to hold the newly issued tokens.
A Token Account holds tokens of a specific "mint" and has a specified "owner" of the account.
Only the owner is authorized to decrease the Token Account balance (transfer, burn, etc...)
while anyone can send tokens to the Token Account to increase its balance.
The createAccount function returns the Public Key of the new token account.
*/
const tokenAccount = await createAccount(
    connection,
    keypair,             // Signer/Payer
    mint,                // Mint: the token mint that the new token account is associated with
    keypair.publicKey,   // Owner: the account of the owner of the new token account
    //keypair              // keypair: this is an optional parameter for specifying the new token account address. If no keypair is provided, the createAccount function defaults to a derivation from the associated mint and owner accounts.
);

console.log(`Creato nuovo Token Account: '${tokenAccount}'`);
console.log(`Token Account: https://explorer.solana.com/address/${tokenAccount}?cluster=devnet`);
