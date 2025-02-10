# Hardhat Development with Docker

## 🚀 Setup & Initialization
With Docker, Hardhat is now fully containerized, making setup and deployment seamless.

### **Start the Hardhat Environment**
```sh
# Build and start the services in detached mode
docker compose up -d
```

### **Deploy a Contract Locally**
```sh
docker compose exec hardhat npx hardhat run scripts/deploy.js --network localhost
```

---
## 🌍 Deploying on a Testnet (Sepolia)

### **1️⃣ Add Environment Variables**
Create a `.env` file in the Hardhat folder with the following content:
```sh
ALCHEMY_API_URL="https://eth-sepolia.alchemyapi.io/v2/YOUR_API_KEY"
PRIVATE_KEY="0xYOUR_PRIVATE_KEY"
```

### **2️⃣ Deploy to Sepolia**
```sh
docker compose exec hardhat npx hardhat run scripts/deploy.js --network sepolia
```

---
## ⚙️ Hardhat Configuration
Ensure your `hardhat.config.ts` is properly set up:
```ts
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