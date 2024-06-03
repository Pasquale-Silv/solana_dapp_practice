import { Connection, PublicKey, clusterApiUrl } from "@solana/web3.js";
import { getKeypairFromEnvironment } from "@solana-developers/helpers";
import { getOrCreateAssociatedTokenAccount, transfer } from "@solana/spl-token";


require('dotenv').config();
const keypair = getKeypairFromEnvironment("SECRET_KEY");

// npx esrun .\04_token_program_spl\06_transfer_tokens.ts

const connection = new Connection(clusterApiUrl("devnet"));

const mintAccountPubKey = "6Ry6TFKLnXVw55iRLvMmzsjtZb9jGoKEn48ybcUpWMBE";
const mint = new PublicKey(mintAccountPubKey);

// ATA src
const srcAssociatedTokenAccount = await getOrCreateAssociatedTokenAccount(
    connection,
    keypair,             // Signer/Payer
    mint,                // Mint: Mint associated with the account to set or verify
    keypair.publicKey,   // Owner: Owner of the account to set or verify
);

const dst_address = process.env.SECOND_PUBLIC_ADDRESS!;
const dst_pubkey = new PublicKey(dst_address);
// ATA dst
const dstAssociatedTokenAccount = await getOrCreateAssociatedTokenAccount(
    connection,
    keypair,             // Signer/Payer
    mint,                // Mint: Mint associated with the account to set or verify
    dst_pubkey,          // Owner: Owner of the account to set or verify
);

let amount = 33;

/*
Transfer Tokens
SPL Token transfers require both the sender and receiver to have token accounts for the mint of the tokens being transferred.
The tokens are transferred from the sender’s token account to the receiver’s token account.

You can use getOrCreateAssociatedTokenAccount when obtaining the receiver's associated token account
to ensure their token account exists before the transfer. If the account doesn't exist already,
this function will create it and the payer on the transaction will be debited the lamports required for the account creation.

Once you know the receiver's token account address, you transfer tokens using the spl-token library's transfer function.
The transfer function returns a TransactionSignature that can be viewed on the Solana Explorer.
*/
const transactionSignature = await transfer(
    connection,                         // connection: the JSON-RPC connection to the cluster
    keypair,                            // payer: the account of the payer for the transaction
    srcAssociatedTokenAccount.address,  // source (src): the token account sending tokens
    dstAssociatedTokenAccount.address,  // destination (dst): the token account receiving tokens
    keypair,                            // owner: the account of the owner of the source token account
    amount                              // amount: the number of tokens to transfer
);

console.log(`Transferred ${amount} tokens from ${srcAssociatedTokenAccount.address} (${srcAssociatedTokenAccount.owner}) to ${dstAssociatedTokenAccount.address} (${dstAssociatedTokenAccount.owner})`);
console.log(`Transaction Signature: https://explorer.solana.com/tx/${transactionSignature}?cluster=devnet`);
