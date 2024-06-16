import React, { useState } from 'react';
import { ethers } from 'ethers';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import PaymentProcessorABI from '../contracts/PaymentProcessorABI.json';

const PaymentCheck = ({ selectedNetwork, selectedToken, provider, signer }) => {
  const [awaitingConfirmation, setAwaitingConfirmation] = useState(false);
  const [registeringPayment, setRegisteringPayment] = useState(false);
  const navigate = useNavigate();

  const contractAddress = '0xYourSmartContractAddress';

  const handleTransaction = async () => {
    if (!signer) return;

    try {
      setAwaitingConfirmation(true);

      const contract = new ethers.Contract(contractAddress, PaymentProcessorABI, signer);
      const amount = ethers.utils.parseUnits('5', 6); // 5 USDT/USDC with 6 decimals
      const tx = await contract.receivePayment(selectedNetwork, selectedToken, 'txHashPlaceholder', {
        value: amount,
      });

      await tx.wait();

      await axios.post('/api/v1/process-payment', {
        selectedNetwork,
        selectedToken,
        txHash: tx.hash,
      });

      setAwaitingConfirmation(false);
      setRegisteringPayment(true);

      setTimeout(() => {
        navigate('/profile');
      }, 3000);
    } catch (error) {
      console.error('Transaction error:', error);
    }
  };

  return (
    <>
    <div className="col-2"></div>
    <div className="col-8">
      <div className="card mt-5 card-bg-color text-white">
        <div className="card-header">
          <h2>Buy Premium</h2>
          {awaitingConfirmation && (
            <p>
              <i className="fa fa-spinner fa-spin"></i> Awaiting payment confirmation...
            </p>
          )}
          {registeringPayment && (
            <p>
              <i className="fa fa-spinner fa-spin"></i> Registering payment on our database...
            </p>
          )}
          {!awaitingConfirmation && !registeringPayment && (
            <button onClick={handleTransaction}>Send Transaction</button>
          )}
        </div>
      </div>
    </div>
    </>
  );
};

export default PaymentCheck;
