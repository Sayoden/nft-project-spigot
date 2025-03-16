// lib/web3Service.ts
import { ethers } from 'ethers';
import NFTMarketplaceABI from './NFTMarketplaceABI';

const MARKETPLACE_CONTRACT_ADDRESS = '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266';

declare global {
    interface Window {
        ethereum?: any;
    }
}

export class Web3Service {
    // Méthode pour vérifier si MetaMask est installé
    isMetaMaskInstalled() {
        return typeof window !== 'undefined' && window.ethereum !== undefined;
    }
    
    // Méthode pour se connecter à MetaMask
    // lib/web3Service.ts
    async connectWallet() {
        if (!this.isMetaMaskInstalled()) {
            return { 
                success: false, 
                error: new Error("MetaMask n'est pas installé") 
            };
        }
        
        try {
            // Forcer l'affichage de l'interface de sélection de compte, même si déjà connecté
            const accounts = await window.ethereum.request({
                method: 'eth_requestAccounts',
                params: [] // Paramètres vides pour forcer l'ouverture de l'UI
            });
            
            // Initialiser le provider et le signer
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();
            
            // Récupérer l'adresse du wallet connecté
            const address = accounts[0] || await signer.getAddress();
            
            return { 
                success: true, 
                address,
                provider,
                signer
            };
        } catch (error) {
            console.error('Erreur lors de la connexion au wallet:', error);
            return { 
                success: false, 
                error: error instanceof Error ? error : new Error(String(error))
            };
        }
    }
    
    // Méthode pour obtenir le solde ETH
    async getBalance(address: string) {
        if (!this.isMetaMaskInstalled()) {
            return { success: false, error: new Error("MetaMask n'est pas installé") };
        }
        
        try {
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const balance = await provider.getBalance(address);
            // Convertir le solde de wei en ether
            const etherBalance = ethers.utils.formatEther(balance);
            
            return { 
                success: true, 
                balance: etherBalance
            };
        } catch (error) {
            console.error('Erreur lors de la récupération du solde:', error);
            return { success: false, error: error instanceof Error ? error : new Error(String(error)) };
        }
    }
    
    // Nouvelle méthode pour récupérer une instance du contrat NFTMarketplace
    getContract() {
        if (!this.isMetaMaskInstalled()) {
            throw new Error("MetaMask n'est pas installé");
        }
        
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        return new ethers.Contract(
            MARKETPLACE_CONTRACT_ADDRESS,
            NFTMarketplaceABI,
            signer
        );
    }
    
    // Méthode pour récupérer tous les NFT d'un joueur
    async getPlayerNFTs(address: string) {
        try {
            const contract = this.getContract();
            
            // Appeler getPlayerNFTData pour obtenir les IDs des tokens
            const tokenIds = await contract.getPlayerNFTData(address);
            
            // Formater les IDs (de BigNumber à string)
            const formattedTokenIds = tokenIds.map((id: ethers.BigNumber) => id.toString());
            
            // Récupérer les métadonnées de chaque NFT
            const nfts = await Promise.all(formattedTokenIds.map(async (tokenId: string) => {
                // Récupérer les données du NFT depuis l'API
                const metadata = await this.getNFTMetadata(tokenId);
                return {
                    id: tokenId,
                    ...metadata
                };
            }));
            
            return { success: true, nfts };
        } catch (error) {
            console.error('Erreur lors de la récupération des NFTs du joueur:', error);
            return { 
                success: false, 
                error: error instanceof Error ? error : new Error(String(error))
            };
        }
    }
    
    // Méthode pour récupérer les NFT en vente
    async getListedNFTs() {
        try {
            const contract = this.getContract();
            
            // Appeler getAllListedNFTs pour obtenir les NFT en vente
            const [tokenIds, sellers, prices] = await contract.getAllListedNFTs();
            
            // Formater les données
            const listedNFTs = await Promise.all(tokenIds.map(async (id: ethers.BigNumber, index: number) => {
                const tokenId = id.toString();
                const metadata = await this.getNFTMetadata(tokenId);
                return {
                    id: tokenId,
                    seller: sellers[index],
                    price: ethers.utils.formatEther(prices[index]),
                    ...metadata
                };
            }));
            
            return { success: true, nfts: listedNFTs };
        } catch (error) {
            console.error('Erreur lors de la récupération des NFTs en vente:', error);
            return { 
                success: false, 
                error: error instanceof Error ? error : new Error(String(error))
            };
        }
    }
    
    // Méthode pour récupérer les métadonnées d'un NFT
    async getNFTMetadata(tokenId: string) {
        try {
            // Appeler l'API pour récupérer les métadonnées
            const response = await fetch(`/api/nft/${tokenId}`);
            if (!response.ok) {
                throw new Error(`Erreur HTTP: ${response.status}`);
            }
            return await response.json();
        } catch (error) {
            console.error('Erreur lors de la récupération des métadonnées du NFT:', error);
            // Retourner des données par défaut en cas d'erreur
            return {
                name: `NFT #${tokenId}`,
                description: "Un objet Minecraft tokenisé",
                type: "Inconnu",
                rarity: "Commun",
                image: "/placeholder.svg"
            };
        }
    }
}

// Exporter une instance unique du service
const web3Service = new Web3Service();
export default web3Service;