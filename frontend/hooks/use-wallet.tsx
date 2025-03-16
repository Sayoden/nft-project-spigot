// hooks/use-wallet.tsx
"use client";

import { useState, useEffect, createContext, useContext } from 'react';
import web3Service from '../lib/web3Service';

interface WalletContextType {
  address: string | null;
  isConnected: boolean;
  isConnecting: boolean;
  error: string | null;
  balance: string | null;
  connect: (walletType: string) => Promise<void>;
  disconnect: () => void;
  switchAccount: () => Promise<void>;
}

const WalletContext = createContext<WalletContextType>({
  address: null,
  isConnected: false,
  isConnecting: false,
  error: null,
  balance: null,
  connect: async () => {},
  disconnect: () => {},
  switchAccount: async () => {},
});

export const WalletProvider = ({ children }: { children: React.ReactNode }) => {
  const [address, setAddress] = useState<string | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [balance, setBalance] = useState<string | null>(null);
  
  // Vérifier si le wallet est déjà connecté au chargement
  useEffect(() => {
    const checkConnection = async () => {
      try {
        // Vérifier si MetaMask est installé
        if (web3Service.isMetaMaskInstalled()) {
          // Vérifier si déjà connecté
          const accounts = await window.ethereum.request({ method: 'eth_accounts' });
          if (accounts && accounts.length > 0) {
            setAddress(accounts[0]);
            setIsConnected(true);
            
            // Récupérer le solde
            const balanceResult = await web3Service.getBalance(accounts[0]);
            if (balanceResult.success) {
              setBalance(balanceResult.balance);
            }
          }
        }
      } catch (err) {
        console.error('Erreur lors de la vérification de la connexion:', err);
      }
    };
    
    checkConnection();
  }, []);
  
  // Écouter les changements de compte MetaMask
  useEffect(() => {
    if (web3Service.isMetaMaskInstalled()) {
      const handleAccountsChanged = async (accounts: string[]) => {
        if (accounts.length === 0) {
          // L'utilisateur s'est déconnecté
          setAddress(null);
          setIsConnected(false);
          setBalance(null);
        } else {
          // Changement de compte
          setAddress(accounts[0]);
          setIsConnected(true);
          
          // Mettre à jour le solde
          const balanceResult = await web3Service.getBalance(accounts[0]);
          if (balanceResult.success) {
            setBalance(balanceResult.balance);
          }
        }
      };
      
      window.ethereum.on('accountsChanged', handleAccountsChanged);
      
      return () => {
        window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
      };
    }
  }, []);
  
  const connect = async (walletType: string) => {
    setError(null);
    setIsConnecting(true);
    
    // Pour l'instant, seul MetaMask est supporté
    if (walletType !== 'metamask') {
      setError(`Le wallet ${walletType} n'est pas encore supporté`);
      setIsConnecting(false);
      return;
    }
    
    try {
      const result = await web3Service.connectWallet();
      
      if (result.success) {
        setAddress(result.address);
        setIsConnected(true);
        
        // Récupérer le solde
        const balanceResult = await web3Service.getBalance(result.address);
        if (balanceResult.success) {
          setBalance(balanceResult.balance);
        }
      } else {
        setError(result.error?.message || 'Erreur de connexion');
      }
    } catch (err: any) {
      console.error('Erreur de connexion:', err);
      setError(err.message || 'Erreur de connexion');
    } finally {
      setIsConnecting(false);
    }
  };
  
  const disconnect = () => {
    // Réinitialiser l'état local
    setAddress(null);
    setIsConnected(false);
    setBalance(null);
    setError(null);
    
    console.log("Déconnecté du portefeuille local. Notez que votre portefeuille MetaMask reste connecté.");
  };
  
  // Fonction pour explicitement demander à changer de compte
  // Fonction pour explicitement demander à changer de compte
  const switchAccount = async () => {
    try {
      setIsConnecting(true);
      setError(null);
      
      if (!web3Service.isMetaMaskInstalled()) {
        setError("MetaMask n'est pas installé");
        return;
      }
      
      // Forcer l'affichage du sélecteur de comptes directement
      console.log("Tentative de changement de compte...");
      const accounts = await window.ethereum.request({
        method: 'wallet_requestPermissions',
        params: [{ eth_accounts: {} }]
      }).then(() => window.ethereum.request({
        method: 'eth_requestAccounts'
      }));
      
      if (accounts && accounts.length > 0) {
        const newAddress = accounts[0];
        console.log("Nouveau compte sélectionné:", newAddress);
        
        if (newAddress !== address) {
          setAddress(newAddress);
          
          // Récupérer le solde du nouveau compte
          const balanceResult = await web3Service.getBalance(newAddress);
          if (balanceResult.success) {
            setBalance(balanceResult.balance);
          }
        }
      }
    } catch (error: any) {
      console.error("Erreur lors du changement de compte:", error);
      setError(error.message || 'Erreur lors du changement de compte');
    } finally {
      setIsConnecting(false);
    }
  };
  
  return (
    <WalletContext.Provider
    value={{
      address,
      isConnected,
      isConnecting,
      error,
      balance,
      connect,
      disconnect,
      switchAccount,
    }}
    >
    {children}
    </WalletContext.Provider>
  );
};

export const useWallet = () => useContext(WalletContext);
export default useWallet;