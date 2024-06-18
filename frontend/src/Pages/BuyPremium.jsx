import { useState } from 'react';
import PaymentCheck from '../Components/PaymentCheck';
import { BrowserProvider } from 'ethers';

const NetworkTokenSelection = () => {
  const [selectedNetwork, setSelectedNetwork] = useState('mainnet');
  const [selectedToken, setSelectedToken] = useState('usdt');
  const [walletConnected, setWalletConnected] = useState(false);
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);

  const handleConnectWallet = async () => {
    try {
      const web3Provider = new BrowserProvider(window.ethereum);
      await web3Provider.send("eth_requestAccounts", []);
      const signer = await web3Provider.getSigner();
      setProvider(web3Provider);
      setSigner(signer);
      setWalletConnected(true);
    } catch (error) {
      console.error('Error connecting to wallet:', error);
    }
  };

  return (
    <div className="col-8">
    <div className="card mt-5 card-bg-color text-white" data-bs-theme="dark">
    <div className="card-body">
      <div className="mb-3">
        <label htmlFor="selectNetwork" className="form-label">Select Network:</label>
        <select className="form-select" onChange={(e) => setSelectedNetwork(e.target.value)} value={selectedNetwork}>
          <option value="mainnet">Ethereum Mainnet</option>
          <option value="polygon">Polygon</option>
          <option value="arbitrum">Arbitrum</option>
          <option value="optimism">Optimism</option>
        </select>
      </div>
      <div className="mb-3">
        <label className="form-label">Select Token:</label>
        <select className="form-select" onChange={(e) => setSelectedToken(e.target.value)} value={selectedToken}>
          <option value="usdt">USDT</option>
          <option value="usdc">USDC</option>
        </select>
      </div>
      <button className="btn manage-btn" onClick={handleConnectWallet} disabled={walletConnected}>
        {walletConnected ? 'Wallet Connected' : 'Connect Wallet'}
      </button>
      {walletConnected && (
        <PaymentCheck
          selectedNetwork={selectedNetwork}
          selectedToken={selectedToken}
          provider={provider}
          signer={signer}
        />
      )}
    </div>
  </div>
  </div>
  );
};

export default NetworkTokenSelection;

