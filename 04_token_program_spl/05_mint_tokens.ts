import { Connection, PublicKey, clusterApiUrl } from "@solana/web3.js";
import { getKeypairFromEnvironment } from "@solana-developers/helpers";
import { getOrCreateAssociatedTokenAccount, mintTo } from "@solana/spl-token";


require('dotenv').config();
const keypair = getKeypairFromEnvironment("SECRET_KEY");

// npx esrun .\04_token_program_spl\05_mint_tokens.ts

const connection = new Connection(clusterApiUrl("devnet"));

const mintAccountPubKey = "6Ry6TFKLnXVw55iRLvMmzsjtZb9jGoKEn48ybcUpWMBE";
const mint = new PublicKey(mintAccountPubKey);

const associatedTokenAccount = await getOrCreateAssociatedTokenAccount(
    connection,
    keypair,             // Signer/Payer
    mint,                // Mint: Mint associated with the account to set or verify
    keypair.publicKey,   // Owner: Owner of the account to set or verify
);
let amount = 10333;

/*
Mint Tokens
Minting tokens is the process of issuing new tokens into circulation.
When you mint tokens, you increase the supply of the token mint and deposit the newly minted tokens into a token account.
Only the mint authority of a token mint is allowed to mint new tokens.
The mintTo function returns a TransactionSignature that can be viewed on the Solana Explorer.
*/
const transactionSignature = await mintTo(
    connection,                      // connection: the JSON-RPC connection to the cluster
    keypair,                         // Signer/Payer
    mint,                            // mint: the token mint that the new token account is associated with
    associatedTokenAccount.address,  // destination: the token account that tokens will be minted to
    keypair,                         // authority: the account authorized to mint tokens
    amount                           // amount: the raw amount of tokens to mint outside of decimals, e.g. if Scrooge Coin mint's decimals property was set to 2 then to get 1 full Scrooge Coin you would need to set this property to 100
);

/*
IMPORTANT
It's not uncommon to update the mint authority on a token mint to null after the tokens have been minted.
This would set a maximum supply and ensure no tokens can be minted in the future.
Conversely, minting authority could be granted to a program so tokens could be automatically minted at regular intervals
or according to programmable conditions.
*/

console.log(`Minted '${amount}' tokens... to '${keypair.publicKey}'`);
console.log(`ATA: '${associatedTokenAccount.address}'\n`);

console.log(`Transaction Signature: '${transactionSignature}'`);
console.log(`Transaction Signature: https://explorer.solana.com/tx/${transactionSignature}?cluster=devnet`);

// Refetching ATA for displaying the correct amount of tokens
const associatedTokenAccountRefetched = await getOrCreateAssociatedTokenAccount(
    connection,
    keypair,             // Signer/Payer
    mint,                // Mint: Mint associated with the account to set or verify
    keypair.publicKey,   // Owner: Owner of the account to set or verify
);
console.log(`\nToken Balance: ${associatedTokenAccountRefetched.amount}`);
