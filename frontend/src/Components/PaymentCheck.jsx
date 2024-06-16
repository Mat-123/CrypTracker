import React, { useEffect, useState } from 'react';
import { providers, tokenContracts } from '../Config/web3Config';
import axios from 'axios';
import ERC20_ABI from '../abi/ERC20.json';
import { useNavigate } from 'react-router-dom';

const PaymentCheck = ({ selectedNetwork, selectedToken }) => {
  const [pollingInterval, setPollingInterval] = useState(null);
  const [awaitingConfirmation, setAwaitingConfirmation] = useState(true);
  const [registeringPayment, setRegisteringPayment] = useState(false);
  const navigate = useNavigate();

  const walletAddresses = {
    eth: {
      mainnet: '0xe58577ad8297F66093dCB88DBe64D902e01E4228',
      polygon: '0xe58577ad8297F66093dCB88DBe64D902e01E4228',
      arbitrum: '0xe58577ad8297F66093dCB88DBe64D902e01E4228',
      optimism: '0xe58577ad8297F66093dCB88DBe64D902e01E4228'
    },
    usdt: {
      mainnet: '0xe58577ad8297F66093dCB88DBe64D902e01E4228',
      polygon: '0xe58577ad8297F66093dCB88DBe64D902e01E4228',
      arbitrum: '0xe58577ad8297F66093dCB88DBe64D902e01E4228',
      optimism: '0xe58577ad8297F66093dCB88DBe64D902e01E4228'
    },
    usdc: {
      mainnet: '0xe58577ad8297F66093dCB88DBe64D902e01E4228',
      polygon: '0xe58577ad8297F66093dCB88DBe64D902e01E4228',
      arbitrum: '0xe58577ad8297F66093dCB88DBe64D902e01E4228',
      optimism: '0xe58577ad8297F66093dCB88DBe64D902e01E4228'
    }
  };

  const expectedAmount = {
    eth: providers.mainnet.utils.toWei('0.1', 'ether'),
    usdt: '1000000', // 1 USDT in 6 decimali
    usdc: '1000000' // 1 USDC in 6 decimali
  };

  useEffect(() => {
    const pollTransactions = async () => {
      const web3 = providers[selectedNetwork];
      const walletAddress = walletAddresses[selectedToken][selectedNetwork];
      const tokenContractAddress = selectedToken !== 'eth' ? tokenContracts[selectedNetwork][selectedToken] : null;

      const interval = setInterval(async () => {
        try {
          const latestBlock = await web3.eth.getBlockNumber();
          const fromBlock = latestBlock - 1000; // Puoi regolare il numero di blocchi a cui guardare

          const contract = new web3.eth.Contract(ERC20_ABI, tokenContractAddress);

          const logs = await contract.getPastEvents('Transfer', {
            filter: { to: walletAddress },
            fromBlock,
            toBlock: 'latest'
          });

          for (let log of logs) {
            const { returnValues, transactionHash } = log;
            const { from, value } = returnValues;

            if (
              from.toLowerCase() === walletAddress.toLowerCase() &&
              value.toString() === expectedAmount[selectedToken]
            ) {
              console.log(`${selectedToken.toUpperCase()} Transaction detected:`, log);
              await handleTransactionConfirmation(transactionHash);
              clearInterval(interval);
            }
          }
        } catch (error) {
          console.error('Error polling transactions:', error);
        }
      }, 30000);

      setPollingInterval(interval);
    };

    const handleTransactionConfirmation = async (txHash) => {
      try {
        setAwaitingConfirmation(false);
        setRegisteringPayment(true);
        const response = await axios.put('/api/v1/update-user-role', {
          role: 'premium',
          tx_hash: txHash
        });
        console.log('User role updated successfully:', response.data);

        setRegisteringPayment(false);

        setTimeout(() => {
          navigate('/profile');
        }, 3000);
      } catch (error) {
        console.error('Error updating user role:', error);
      }
    };

    if (selectedNetwork && selectedToken) {
      pollTransactions();
    }

    return () => {
      clearInterval(pollingInterval);
    };
  }, [selectedNetwork, selectedToken, navigate]);

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
              <p>Payment confirmed and registered successfully!</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default PaymentCheck;
