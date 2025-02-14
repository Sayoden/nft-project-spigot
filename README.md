# 🏰 Minecraft NFT Marketplace
An integrated NFT marketplace platform for Minecraft, allowing players to buy, sell, and manage NFTs both in-game and through a web interface.

## 🎮 Features

### 🌐 Web Interface
- **🔑 Authentication**
  - 🔗 Login with Minecraft account
  - 🔒 Automated wallet management
  - 🏠 Personalized dashboard

- **🎨 NFTs**
  - 🔍 Browse all available NFTs
  - ✨ Create and list NFTs for sale
  - 💰 Purchase NFTs with MCoins
  - 🖼️ Personal NFT gallery

- **💳 Transactions**
  - 📜 Complete transaction history
  - 📊 Details: ID, from, to, amount, date, status
  - 🔎 Transaction filtering and search

- **👤 Player Profiles**
  - 🏆 Active players list
  - 📈 Detailed stats: level, balance, blocks placed
  - 🟢 Real-time status (online/offline)
  - ⏳ Last connection time

### ⛏️ Minecraft Plugin
- **💬 In-Game Commands**
  - 📜 `/nft list` - View available NFTs
  - 🛒 `/nft buy <id>` - Purchase an NFT
  - 💵 `/nft sell <id> <price>` - List NFT for sale
  - 💰 `/mcoin balance` - Check balance
  - 🔄 `/mcoin send <player> <amount>` - Send MCoins

- **🎮 In-Game Interface**
  - 🏪 GUI marketplace menu
  - 🎒 Personal NFT inventory
  - 🏗️ 3D NFT visualization
  - 🔔 Real-time notifications

### 💰 Economic System
- **🪙 MCoin (ERC20 Token)**
  - 🏦 Native virtual currency
  - 🎁 Distribution to active players
  - 🎮 In-game action rewards
  - 🔄 Player-to-player trading

- **📜 NFTs (ERC721)**
  - ✅ Unique, verifiable items
  - 📂 IPFS-stored metadata
  - 🔐 On-chain ownership proof
  - 🔄 Secure transfers

### 🚀 Additional Features
- **🔗 Cross-Platform Integration**
  - 🔄 Seamless sync between web and Minecraft interfaces
  - 📡 Real-time updates across platforms
  - 🎛️ Unified wallet management
  - 🖥️ Consistent UI/UX design

- **📈 Advanced Trading Features**
  - 📊 NFT price history tracking
  - 📉 Market trends visualization
  - 🔥 Popular items highlighting
  - ⚡ Batch operations support

- **🏆 Player Engagement**
  - 🏅 Achievement system for marketplace activities
  - 📜 Trading leaderboards
  - 💬 Social features (favorite sellers, watchlist)
  - 🔔 Custom notifications settings

- **🛡️ Security Features**
  - 🔏 Multi-signature support for high-value trades
  - 🚦 Transaction limits and cooling periods
  - 🤖 Automated fraud detection
  - ⏸️ Emergency pause functionality

### ⚙️ Smart Contract Architecture
- **🛠️ Modular Design**
  - 🔄 Upgradeable contracts
  - 🔑 Role-based access control
  - 📨 Event-driven architecture
  - ⚡ Gas optimization

- **📂 Data Management**
  - 📡 IPFS integration for metadata
  - 💾 Efficient on-chain storage
  - 🔄 Automated backups
  - 🛡️ Data integrity verification


## 🔧 Technical Stack
- **Frontend**: Next.js, TailwindCSS, shadcn/ui
- **Blockchain**: Hardhat, Solidity, OpenZeppelin
- **Game Integration**: Spigot API, Web3j
- **Infrastructure**: Docker, IPFS

## 📊 System Architecture
[![System Architecture](https://mermaid.ink/img/pako:eNqFVdtuEzEQ_ZXRSrw1QrR9ChJSLk2a0rRpU-jF6YOzO9lY3bUj25sqIvwBQgh44wG-APFpfAJje5NsIKj7ZO-eGZ-ZOcf7LopVglE9SjWfTeGq_XIkgZ4GG2R8gRpiJSXG1oBV0Be01Hxi76FWewVNNoy5hItLaFEOuOZZhrYV8PchTdMBl5doCy0NHNkpaixy4Emi0ZgltNg6JwyyIhUSUqTDSkCZpeWzNIxRseAW15_hUdgpzDzRJbTZMOfaEhlpNY8t9KRFtxBKUqKQ6tkzuMZx-DThMfoV1e5AAXHNHKCjKQvKJFR6w06V43Y-c7gVrRtPa1NAI45VIe0SbtkQ9Zya9xa1mIiYlxQ2QVu9WsIdawtNK2hmKn6Ip5zOomybDtx6Gu2wuVttwtYU4zC8UfT7-5cPMFDGiHGG1frNKApg97R9_BFrTTF-gLPOFZw_StRmKmb3f6M6rFksng8xyxzwn89dNhSphD4x5SnCRGloFHb6D65Pg24p30EMzV5VRj3eWci3H55ZtYPVGo582mPWRSccr9TGlmbcc-xBPVb22Ul4LcG54E4JBycVfM_jT9gl8gS2xVRBnXjUaxZU7VmeCmOfqOfzL4-80jwRMq2W0vH5TleGM5h5vzm0kLWU51g5_DS0kwQmE5dMmjBgV9t_Gfd90Bmr4uc8EwmZKQHajNeyq0Sd-ahz5ohYFzlBrQlPJwXLPVHx109eCyjtjvl1ffLBumhSkYG8lJG3dbBIhc_Ah1x4xXFqPcLci4MojRfUNue4CvzCwy9Z8BEQL2kD-41jt4L-O7mPELQ7XBiLebWKfqtU94vSTE2ecRlXB7aG7IeZ-VRmF-CAHXHS00SrnMxvxVxYgTuRh86UTiBPmejjT7oEal2SEHTQ92zrIuh1WfdNj9wri3DP9bov_Lh7ck5jU3oBbWHcsKsm6ZbQfeeTrGYFZa8q683M6crsCjkob4GyTXAtknRrxmvkIetz_YCWDidcU6tHUx1UtBflqHMuEvp1vXOvRxFJLcdRVKdlghNeZNbV-p6gvLBquJBxVLe6wL1IqyKdRvUJzwztCs-3LTj1LV-_nXF5p9Rq__4PnixDFg)](https://mermaid-js.github.io/mermaid-live-editor/edit#pako:eNqFVdtuEzEQ_ZXRSrw1QrR9ChJSLk2a0rRpU-jF6YOzO9lY3bUj25sqIvwBQgh44wG-APFpfAJje5NsIKj7ZO-eGZ-ZOcf7LopVglE9SjWfTeGq_XIkgZ4GG2R8gRpiJSXG1oBV0Be01Hxi76FWewVNNoy5hItLaFEOuOZZhrYV8PchTdMBl5doCy0NHNkpaixy4Emi0ZgltNg6JwyyIhUSUqTDSkCZpeWzNIxRseAW15_hUdgpzDzRJbTZMOfaEhlpNY8t9KRFtxBKUqKQ6tkzuMZx-DThMfoV1e5AAXHNHKCjKQvKJFR6w06V43Y-c7gVrRtPa1NAI45VIe0SbtkQ9Zya9xa1mIiYlxQ2QVu9WsIdawtNK2hmKn6Ip5zOomybDtx6Gu2wuVttwtYU4zC8UfT7-5cPMFDGiHGG1frNKApg97R9_BFrTTF-gLPOFZw_StRmKmb3f6M6rFksng8xyxzwn89dNhSphD4x5SnCRGloFHb6D65Pg24p30EMzV5VRj3eWci3H55ZtYPVGo582mPWRSccr9TGlmbcc-xBPVb22Ul4LcG54E4JBycVfM_jT9gl8gS2xVRBnXjUaxZU7VmeCmOfqOfzL4-80jwRMq2W0vH5TleGM5h5vzm0kLWU51g5_DS0kwQmE5dMmjBgV9t_Gfd90Bmr4uc8EwmZKQHajNeyq0Sd-ahz5ohYFzlBrQlPJwXLPVHx109eCyjtjvl1ffLBumhSkYG8lJG3dbBIhc_Ah1x4xXFqPcLci4MojRfUNue4CvzCwy9Z8BEQL2kD-41jt4L-O7mPELQ7XBiLebWKfqtU94vSTE2ecRlXB7aG7IeZ-VRmF-CAHXHS00SrnMxvxVxYgTuRh86UTiBPmejjT7oEal2SEHTQ92zrIuh1WfdNj9wri3DP9bov_Lh7ck5jU3oBbWHcsKsm6ZbQfeeTrGYFZa8q683M6crsCjkob4GyTXAtknRrxmvkIetz_YCWDidcU6tHUx1UtBflqHMuEvp1vXOvRxFJLcdRVKdlghNeZNbV-p6gvLBquJBxVLe6wL1IqyKdRvUJzwztCs-3LTj1LV-_nXF5p9Rq__4PnixDFg)

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