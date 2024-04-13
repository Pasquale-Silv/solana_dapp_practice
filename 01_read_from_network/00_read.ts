import { Connection, clusterApiUrl } from "@solana/web3.js";

// npx esrun solana1.ts --> Run .ts

// Connect to the Network
const connection = new Connection(clusterApiUrl("devnet"));
console.log(`✅ Connected!`)
