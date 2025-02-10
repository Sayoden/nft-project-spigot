# Init Hardhat project
- npm install -g hardhat
- npx hardhat 

# Run Hardhat node
- npx hardhat node

## Don't forget to cp the /scripts and /contracts folder into your hardhat folder

# Deploy and get contract address
- npx hardhat run scripts/deploy.js --network localhost

---

Put this config into your hardhat.config.js
```js
import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import dotenv from "dotenv";

dotenv.config();

const config: HardhatUserConfig = {
    solidity: "0.8.20",
    networks: {
        sepolia: {
            url: process.env.ALCHEMY_API_URL || "",
            accounts: process.env.PRIVATE_KEY ? [process.env.PRIVATE_KEY] : [],
        }
    }
};

export default config;
```

---
# Deploy contract on testnet

- npm install dotenv
- Create .env file with the following content
```shell
ALCHEMY_API_URL="https://eth-sepolia.alchemyapi.io/v2/VOTRE_API_KEY"
PRIVATE_KEY="0xVOTRE_CLE_PRIVEE"
```
- Then push your contract on sepolia network: 
```shell
npx hardhat run scripts/deploy.js --network sepolia
```