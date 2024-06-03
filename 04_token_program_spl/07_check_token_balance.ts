import { Connection, PublicKey, clusterApiUrl } from "@solana/web3.js";
import { getKeypairFromEnvironment } from "@solana-developers/helpers";
import { getOrCreateAssociatedTokenAccount } from "@solana/spl-token";


require('dotenv').config();
const keypair = getKeypairFromEnvironment("SECRET_KEY");

const second_address = process.env.SECOND_PUBLIC_ADDRESS!;
const second_pubkey = new PublicKey(second_address);

// npx esrun .\04_token_program_spl\07_check_token_balance.ts

const connection = new Connection(clusterApiUrl("devnet"));

// Token Mint for a specific Token
const mintAccountPubKey = "6Ry6TFKLnXVw55iRLvMmzsjtZb9jGoKEn48ybcUpWMBE";
const mint = new PublicKey(mintAccountPubKey);

const get_token_balance = async (pubkey_to_check: PublicKey, mint_to_check: PublicKey) => {
    const associatedTokenAccount = await getOrCreateAssociatedTokenAccount(
        connection,
        keypair,             // Signer/Payer
        mint_to_check,       // Mint: Token Mint associated with the account to set or verify
        pubkey_to_check,     // Owner: Owner of the account to set or verify
    );

    console.log(`Balance for ${associatedTokenAccount.address} (${associatedTokenAccount.owner}): ${associatedTokenAccount.amount} for Token Mint '${mint_to_check}'`);
};

get_token_balance(keypair.publicKey, mint);
get_token_balance(second_pubkey, mint);
