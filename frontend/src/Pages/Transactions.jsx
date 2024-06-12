import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import AddTransaction from "../Components/AddTransaction";
import EditTransaction from "../Components/EditTransaction";

const Transactions = () => {
  const { id_crypto } = useParams();
  const navigate = useNavigate();
  const [transactions, setTransactions] = useState([]);
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

  const handleDeleteTransaction = async (transactionId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this transaction? This action cannot be undone.");
    if (!confirmDelete) return;

    try {
      await axios.delete(`/api/v1/transaction/${transactionId}`);
      setTransactions(transactions.filter((t) => t.id !== transactionId));
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
      const formattedTransactions = res.data.map(transaction => ({
        ...transaction,
        quantity: parseFloat(transaction.quantity).toString(),
        transaction_price: parseFloat(transaction.transaction_price).toString(),
      }));
      setTransactions(formattedTransactions);
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

    transactions.forEach(transaction => {
      if (transaction.transaction_type === 0) { // BUY
        totalBuyQuantity += transaction.quantity;
        totalSpent += transaction.quantity * transaction.transaction_price;
      } else { // SELL
        totalSellQuantity += transaction.quantity;
      }
    });

    const holdings = totalBuyQuantity - totalSellQuantity;
    const lastValue = transactions[0]?.last_value || 0;
    const holdingsValue = holdings * lastValue;
    const averageNetCost = totalSpent / (totalBuyQuantity || 1);
    const pnl = holdingsValue - averageNetCost;
    const pnlPercentage = (pnl / averageNetCost) * 100;

    return {
      holdings,
      holdingsValue,
      totalSpent,
      averageNetCost,
      pnl,
      pnlPercentage,
    };
  };

  const {
    holdings,
    holdingsValue,
    totalSpent,
    averageNetCost,
    pnl,
    pnlPercentage,
  } = calculateMetrics();

  return (
    <>
    <div className="col-2">

    </div>
    <div className="col-8">
    <div className="text-white mt-5">
      <h2 className="my-3">Transactions for Crypto ID: {id_crypto}</h2>
      <div className="card card-bg-color text-white rounded-4">
        <div className="card-body container">
          <div className="row">
          <div className="col-4 text-start">
              <p>Holdings: {holdings}</p>
              <p>Holdings Value: {holdingsValue.toFixed(2)}</p>
            </div>
            <div className="col-4 text-start">
              <p>Total Cost: {totalSpent.toFixed(2)}</p>
              <p>Average Net Cost: {averageNetCost.toFixed(2)}</p>
            </div>
            <div className="col-4 text-start">
              <p className={pnl >= 0 ? 'text-success' : 'text-danger'}>
                PNL: {pnl.toFixed(2)} ({pnlPercentage.toFixed(2)}%)
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
      <ul className="list-group list-group-flush">
        {transactions.map((transaction) => (
          <li className="list-group-item card-bg-color text-white d-flex justify-content-between align-items-center" key={transaction.id}>
          <div className="row w-100">
            <div className="col d-flex align-items-center">
              <span className={`badge ${transaction.transaction_type === 0 ? 'bg-success' : 'bg-danger'} me-2 flex-shrink-0`}>
                {transaction.transaction_type === 0 ? 'BUY' : 'SELL'}
              </span>
              <span>Quantity: {parseFloat(transaction.quantity).toString()}</span>
            </div>
            <div className="col d-flex align-items-center">
              <span>Transaction Price: {parseFloat(transaction.transaction_price).toString()}</span>
            </div>
            <div className="col d-flex justify-content-end align-items-center">
              <button className="btn manage-btn rounded-3 me-3" onClick={() => openEditModal(transaction)}>Edit</button>
              <button className="btn btn-danger rounded-3" onClick={() => handleDeleteTransaction(transaction.id)}>Delete</button>
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
