import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { Doughnut } from 'react-chartjs-2';
import 'chart.js/auto';
import ChartModal from "../Components/ChartModal";

const Wallet = () => {
  const [cryptos, setCryptos] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('/api/v1/wallet')
      .then(res => setCryptos(res.data))
      .catch(error => {
        if (error.response && error.response.status === 401) {
          navigate('/login');
        } else if (error.response && error.response.status === 405) {
          navigate('/login');
        } else {
          console.error('An error occurred:', error);
        }
      });
  }, [navigate]);

  const calculateCryptoQuantities = (cryptos) => {
    const cryptoQuantities = {};
    const cryptoInfo = {}; // Store additional info like symbol
    const transactionCounts = {}; // Store the number of transactions

    cryptos.forEach(wallet => {
      const { id_crypto, name_crypto, transactions, symbol } = wallet;

      if (!cryptoQuantities[id_crypto]) {
        cryptoQuantities[id_crypto] = 0;
        cryptoInfo[id_crypto] = {
          name: name_crypto,
          symbol: symbol // Store the symbol of the crypto
        };
        transactionCounts[id_crypto] = 0;
      }

      let buyQuantity = 0;
      let sellQuantity = 0;

      transactions.forEach(transaction => {
        const quantity = parseFloat(transaction.quantity);
        if (!isNaN(quantity)) {
          if (transaction.transaction_type === 0) { // Buy
            buyQuantity += quantity;
          } else if (transaction.transaction_type === 1) { // Sell
            sellQuantity += quantity;
          }
          transactionCounts[id_crypto]++;
        }
      });

      // Calculate net quantity
      cryptoQuantities[id_crypto] = buyQuantity - sellQuantity;
    });

    return { cryptoQuantities, cryptoInfo, transactionCounts };
  };

  const calculateTotalValues = (cryptos, cryptoQuantities) => {
    const totalValues = {};

    cryptos.forEach(wallet => {
      const { id_crypto, last_value } = wallet;
      const totalValue = cryptoQuantities[id_crypto] * last_value;
      totalValues[id_crypto] = totalValue.toFixed(2); // Round to 2 decimal places
    });

    return totalValues;
  };

  const calculateTotalSum = (totalValues) => {
    const total = Object.values(totalValues).reduce((acc, value) => acc + parseFloat(value), 0);
    return total.toFixed(2); // Round to 2 decimal places
  };

  const formatCurrency = (value) => {
    return parseFloat(value).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  };

  const { cryptoQuantities, cryptoInfo, transactionCounts } = calculateCryptoQuantities(cryptos);
  const totalValues = calculateTotalValues(cryptos, cryptoQuantities);
  const totalSum = calculateTotalSum(totalValues);

  const chartData = {
    labels: Object.values(cryptoInfo).map(info => info.name),
    datasets: [
      {
        data: Object.values(totalValues),
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'],
        hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF']
      }
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    aspectRatio: 1.5,
    plugins: {
      legend: {
        position: 'right',
        labels: {
          color: '#FFFFFF',
          font: {
            size: 16
          }
        }
      }
    },
  };

  return (
    <>
      <div className="row mt-5">
        <div className="col-8 mx-auto">
          <div className="card card-bg-color text-white rounded-4">
            <h2 className="text-white py-2">My Crypto Wallet</h2>
          </div>
        </div>
      </div>
      <div className="row mt-5">
        <div className="col-8 mx-auto">
          <div className="card card-bg-color text-white rounded-4">
            <div className="row">
              <div className="col-6">
                <div className="chart-container my-3 mx-3" onClick={() => setShowModal(true)}>
                  <Doughnut data={chartData} options={chartOptions} />
                </div>
              </div>
              <div className="col-6 text-start">
                <h4 className="mt-4">My Portfolio</h4>
                <h3>{formatCurrency(totalSum)} USD</h3>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row mt-5">
        <div className="col-2"></div>
        <div className="col-8">
          <div className="text-white mt-3">
            {Object.entries(cryptoQuantities).map(([id_crypto, quantity]) => (
              <div className="card card-bg-color text-white mb-3 rounded-4" key={id_crypto}>
                <div className="card-body d-flex justify-content-between align-items-center">
                  <div>
                    {cryptoInfo[id_crypto].name}: {quantity} {cryptoInfo[id_crypto].symbol} - Total Value: {formatCurrency(totalValues[id_crypto])} USD - Total Transactions: {transactionCounts[id_crypto]}
                  </div>
                  <div>
                    <Link to={`/transactions/${id_crypto}`}>
                      <button className="btn manage-btn rounded-3">Manage</button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <ChartModal show={showModal} onClose={() => setShowModal(false)} chartData={chartData} options={chartOptions} />
    </>
  );
}

export default Wallet;
