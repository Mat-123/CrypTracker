import Web3 from 'web3';

const infuraProjectId = 'fb96e0b0fa1344d9863648b537ff7e3d';

// Configura i provider Infura per diverse reti
const providers = {
    mainnet: new Web3(`https://mainnet.infura.io/v3/${infuraProjectId}`),
    polygon: new Web3(`https://polygon-mainnet.infura.io/v3/${infuraProjectId}`),
    arbitrum: new Web3(`https://arbitrum-mainnet.infura.io/v3/${infuraProjectId}`),
    optimism: new Web3(`https://optimism-mainnet.infura.io/v3/${infuraProjectId}`)
  };
  
  // Indirizzi dei contratti USDT e USDC per diverse reti
  const tokenContracts = {
    mainnet: {
      usdt: '0xdAC17F958D2ee523a2206206994597C13D831ec7',
      usdc: '0xA0b86991c6218b36c1d19D4a2e9EB0CE3606EB48'
    },
    polygon: {
      usdt: '0x3813e82e6f7098b9583FC0F33a962D02018B6803',
      usdc: '0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174'
    },
    arbitrum: {
      usdt: '0xFD086BC7CD5C481DCC9c85eD989e1bFF02e83B6E',
      usdc: '0xFF970A61A04b1CA14834A43f5DE4533EBDB5CC8A'
    },
    optimism: {
      usdt: '0x7F5c764cBc14f9669B88837ca1490cCa17c31607',
      usdc: '0x7F5c764cBc14f9669B88837ca1490cCa17c31607'
    }
  };
  
  export { providers, tokenContracts };
