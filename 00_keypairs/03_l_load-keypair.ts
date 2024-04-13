// import 'dotenv/config'
import { getKeypairFromEnvironment } from "@solana-developers/helpers";

require('dotenv').config()
// console.log(process.env)

// npx esrun 03_l_load-keypair.ts
const public_address: string | undefined = process.env.PUBLIC_ADDRESS
console.log(`Loading secret key for address "${public_address}"...\n`)
const keypair = getKeypairFromEnvironment("SECRET_KEY");

console.log(
  `✅ Finished! We've loaded our secret key securely, using a ".env" file!`
);
