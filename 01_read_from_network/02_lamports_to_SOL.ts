import { Connection, PublicKey, clusterApiUrl, LAMPORTS_PER_SOL } from "@solana/web3.js";

const connection = new Connection(clusterApiUrl("devnet"));
const address = new PublicKey('CenYq6bDRB7p73EjsPEpiYN7uveyPUTdXkDkgUduboaN');
const balance = await connection.getBalance(address);
console.log(`Balance: ${balance} Lamports`);
console.log(`LAMPORTS_PER_SOL: ${LAMPORTS_PER_SOL}`);
const balanceInSol = balance / LAMPORTS_PER_SOL;

console.log(`The balance of the account at "${address}" is ${balanceInSol} SOL`); 
console.log(`✅ Finished!`)
