import { Connection, PublicKey, clusterApiUrl } from "@solana/web3.js";

// Read from the Network: To read the balance of an account
const connection = new Connection(clusterApiUrl("devnet"));
const address = new PublicKey('CenYq6bDRB7p73EjsPEpiYN7uveyPUTdXkDkgUduboaN');
const balance = await connection.getBalance(address);

console.log(`The balance of the account at "${address}" is ${balance} lamports`); 
console.log(`✅ Finished!`)
