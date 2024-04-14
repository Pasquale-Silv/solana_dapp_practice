import { Connection, LAMPORTS_PER_SOL, PublicKey } from "@solana/web3.js";

require('dotenv').config()


const public_address: string = process.env.PUBLIC_ADDRESS!;

async function getBalance(address: string, connectionUrl: string = "https://api.devnet.solana.com"): Promise<void> {
    const publicKey = new PublicKey(address);

    const connection = new Connection(connectionUrl, "confirmed");
    const balanceInLamports = await connection.getBalance(publicKey);
    const balanceInSOL = balanceInLamports / LAMPORTS_PER_SOL;

    console.log(`Solana Network "${connectionUrl}"...`);
    console.log(`The balance for the wallet at address "${publicKey}" is ${balanceInSOL}!\n`);
}


getBalance("CenYq6bDRB7p73EjsPEpiYN7uveyPUTdXkDkgUduboaN");
getBalance(public_address);
