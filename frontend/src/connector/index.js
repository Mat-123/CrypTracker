// File: connector/index.js

import { InjectedConnector } from '@web3-react/injected-connector';
import { ethers } from 'ethers';  // Importa ethers correttamente

// Creazione del connettore InjectedConnector per MetaMask
export const injected = new InjectedConnector({
  supportedChainIds: [1, 137, 42161, 10] // Ethereum Mainnet, Polygon, Arbitrum, Optimism
});

// Funzione per ottenere l'istanza di Web3Provider da un provider
export const getLibrary = (provider) => {
  return new ethers.providers.Web3Provider(provider);
};
