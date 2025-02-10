const fs = require("fs");
const hre = require("hardhat");

async function main() {
    const [deployer] = await hre.ethers.getSigners();
    console.log("Déploiement avec l'adresse :", deployer.address);

    const NFTMarketplace = await hre.ethers.getContractFactory("NFTMarketplace");
    const marketplace = await NFTMarketplace.deploy();
    await marketplace.waitForDeployment();

    const contractAddress = await marketplace.getAddress();
    console.log("Marketplace NFT déployée à :", contractAddress);

    fs.writeFileSync("deployed_contract.json", JSON.stringify({ contractAddress }, null, 2));
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
