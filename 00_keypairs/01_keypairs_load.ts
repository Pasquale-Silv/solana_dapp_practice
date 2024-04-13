import "dotenv/config";
import { getKeypairFromEnvironment } from "@solana-developers/helpers";

// Keep your secret key private
//     - To use an .env file use getKeypairFromEnvironment()
//     - To use a Solana CLI file use getKeypairFromFile()

const keypair = getKeypairFromEnvironment("SECRET_KEY");
