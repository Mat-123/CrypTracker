import { useState } from 'react';
import PaymentCheck from '../Components/PaymentCheck';

const NetworkTokenSelection = () => {
  const [selectedNetwork, setSelectedNetwork] = useState('mainnet');
  const [selectedToken, setSelectedToken] = useState('eth');
  const [paymentStarted, setPaymentStarted] = useState(false);

  const handleStartPayment = () => {
    setPaymentStarted(true);
  };

  return (
    <>
    <div className="col-2">

</div>
<div className="col-8">
    <div className="card mt-5 card-bg-color text-white">
      {!paymentStarted && (
        <>
          <label>Select Network:</label>
          <select onChange={(e) => setSelectedNetwork(e.target.value)} value={selectedNetwork}>
            <option value="mainnet">Ethereum Mainnet</option>
            <option value="polygon">Polygon</option>
            <option value="arbitrum">Arbitrum</option>
            <option value="optimism">Optimism</option>
          </select>
          <label>Select Token:</label>
          <select onChange={(e) => setSelectedToken(e.target.value)} value={selectedToken}>
            <option value="eth">ETH</option>
            <option value="usdt">USDT</option>
            <option value="usdc">USDC</option>
          </select>
          <button onClick={handleStartPayment}>Start Payment</button>
        </>
      )}
      {paymentStarted && <PaymentCheck selectedNetwork={selectedNetwork} selectedToken={selectedToken} />}
      </div>
      </div>
    </>
  );
};

export default NetworkTokenSelection;


