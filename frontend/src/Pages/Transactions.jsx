import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import AddTransaction from "../Components/AddTransaction";
import EditTransaction from "../Components/EditTransaction";

const Transactions = () => {
  const { id_crypto } = useParams();
  const navigate = useNavigate();
  const [cryptoData, setCryptoData] = useState({
    id: null,
    user_id: null,
    id_crypto: null,
    last_value: null,
    name: '',
    symbol: '',
    transactions: []
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState(null);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const openEditModal = (transaction) => {
    setSelectedTransaction(transaction);
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    setSelectedTransaction(null);
    setIsEditModalOpen(false);
  };

  const handleDeleteTransaction = async (transactionIndex) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this transaction? This action cannot be undone.");
    if (!confirmDelete) return;

    try {
      const transactionId = cryptoData.transactions[transactionIndex].id;
      await axios.delete(`/api/v1/transaction/${transactionId}`);
      const updatedTransactions = [...cryptoData.transactions];
      updatedTransactions.splice(transactionIndex, 1);
      setCryptoData({ ...cryptoData, transactions: updatedTransactions });
      console.log("Transaction deleted successfully");
    } catch (error) {
      console.error("Error deleting transaction:", error);
    }
  };

  const handleDeleteCrypto = async () => {
    const confirmDelete = window.confirm("Are you sure you want to remove this crypto? This action will remove also all the related transactions and cannot be undone.");
    if (!confirmDelete) return;

    try {
      await axios.delete(`/api/v1/wallet/${id_crypto}`);
      console.log("Crypto and related transactions deleted successfully");
      navigate("/wallet");
    } catch (error) {
      console.error("Error deleting crypto and related transactions:", error);
    }
  };

  const fetchTransactions = async () => {
    try {
      const res = await axios.get(`/api/v1/transaction/${id_crypto}`);
      const formattedTransactions = res.data.transactions.map(transaction => ({
        ...transaction,
        quantity: parseFloat(transaction.quantity).toString(),
        transaction_price: parseFloat(transaction.transaction_price).toString(),
      }));
      setCryptoData({
        id: res.data.id,
        user_id: res.data.user_id,
        id_crypto: res.data.id_crypto,
        last_value: res.data.last_value ? parseFloat(res.data.last_value).toString() : null,
        name: res.data.name,
        symbol: res.data.symbol,
        transactions: formattedTransactions
      });
    } catch (error) {
      console.error("Error fetching transactions:", error);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, [id_crypto]);

  const calculateMetrics = () => {
    let totalBuyQuantity = 0;
    let totalSellQuantity = 0;
    let totalSpent = 0;
    let realizedPnl = 0;

    cryptoData.transactions.forEach(transaction => {
      if (transaction.transaction_type === 0) { // BUY
        totalBuyQuantity += parseFloat(transaction.quantity);
        totalSpent += parseFloat(transaction.quantity) * parseFloat(transaction.transaction_price);
      } else { // SELL
        totalSellQuantity += parseFloat(transaction.quantity);
        realizedPnl += parseFloat(transaction.quantity) * parseFloat(transaction.transaction_price);
      }
    });

    const holdings = totalBuyQuantity - totalSellQuantity;
    const lastValue = cryptoData.last_value ? parseFloat(cryptoData.last_value) : 0;
    const holdingsValue = holdings * lastValue;
    const unrealizedPnl = holdingsValue - totalSpent;
    const totalPnl = realizedPnl + unrealizedPnl;
    const averageNetCost = totalBuyQuantity > 0 ? totalSpent / totalBuyQuantity : null;

    return {
      holdings,
      holdingsValue,
      totalSpent,
      averageNetCost,
      totalPnl,
      realizedPnl,
      unrealizedPnl,
    };
  };

  const formatCurrency = (value) => {
    return parseFloat(value).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  };

  const {
    holdings,
    holdingsValue,
    totalSpent,
    averageNetCost,
    totalPnl,
    realizedPnl,
    unrealizedPnl,
  } = calculateMetrics();

  return (
    <>
      <div className="col-2">
      </div>
      <div className="col-8">
        <div className="text-white mt-5">
          <h2 className="my-3">Transactions for Crypto: {cryptoData.name} ({cryptoData.symbol})</h2>
          <div className="card card-bg-color text-white rounded-4">
            <div className="card-body container">
              <div className="row">
                <div className="col-4 text-start">
                  <p className="display-value">Holdings:</p><p> {holdings} {cryptoData.symbol}</p>
                  <p className="display-value">Holdings Value:</p><p> {formatCurrency(holdingsValue)} USD</p>
                </div>
                <div className="col-4 text-start">
                  <p className="display-value">Total Cost:</p><p> {formatCurrency(totalSpent)} USD</p>
                  <p className="display-value">Average Net Cost:</p><p> {averageNetCost !== null ? formatCurrency(averageNetCost) : 'N/A'} USD</p>
                </div>
                <div className="col-4 text-start">
                  <p className="display-value">Total PNL:</p>
                  <p className={totalPnl >= 0 ? 'text-success' : 'text-danger'}>
                    {formatCurrency(totalPnl)} USD
                  </p>
                  <p className="display-value">Realized PNL:</p>
                  <p className={realizedPnl >= 0 ? 'text-success' : 'text-danger'}>
                    {formatCurrency(realizedPnl)} USD
                  </p>
                  <p className="display-value">Unrealized PNL:</p>
                  <p className={unrealizedPnl >= 0 ? 'text-success' : 'text-danger'}>
                    {formatCurrency(unrealizedPnl)} USD
                  </p>
                </div>
              </div>
            </div>
          </div>
          <button className="btn btn-success rounded-3 me-3 my-3" onClick={openModal}>Create Transaction</button>
          <AddTransaction isOpen={isModalOpen} onClose={closeModal} id_crypto={id_crypto} onCreateTransaction={fetchTransactions} />
          <EditTransaction isOpen={isEditModalOpen} onClose={closeEditModal} transaction={selectedTransaction} />
          <button className="btn btn-danger rounded-3 ms-3" onClick={handleDeleteCrypto}>Remove Crypto</button>
          <div className="card card-bg-color text-white my-3 rounded-4">
            <ul className="list-group list-group-flush rounded-4">
              {cryptoData.transactions.map((transaction, index) => (
                <li className="list-group-item card-bg-color text-white d-flex justify-content-between align-items-center" key={index}>
                  <div className="row w-100">
                    <div className="col d-flex align-items-center">
                      <span className={`badge ${transaction.transaction_type === 0 ? 'bg-success' : 'bg-danger'} me-2 flex-shrink-0`}>
                        {transaction.transaction_type === 0 ? 'BUY' : 'SELL'}
                      </span>
                      <span>Quantity: {parseFloat(transaction.quantity).toString()}</span>
                    </div>
                    <div className="col d-flex align-items-center">
                      <span>Transaction Price: {formatCurrency(transaction.transaction_price)} USD</span>
                    </div>
                    <div className="col d-flex justify-content-end align-items-center">
                      <button className="btn manage-btn rounded-3 me-3" onClick={() => openEditModal(transaction)}>Edit</button>
                      <button className="btn btn-danger rounded-3" onClick={() => handleDeleteTransaction(index)}>Delete</button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default Transactions;

