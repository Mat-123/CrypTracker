
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import AddTransaction from "../Components/AddTransaction";
import EditTransaction from "../Components/EditTransaction";

const Transactions = () => {
  const { id_crypto } = useParams();
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
        const confirmDelete = window.confirm("Are you sure you want to delete this transaction?");
        if (!confirmDelete) return; // Annulla l'eliminazione se l'utente ha cliccato "Annulla" nel messaggio di conferma
      
        try {
          await axios.delete(`/api/v1/transaction/${transactionId}`);
          setTransactions(transactions.filter((t) => t.id !== transactionId));
          console.log("Transaction deleted successfully");
        } catch (error) {
          console.error("Error deleting transaction:", error);
        }
      };

  useEffect(() => {
    axios.get(`/api/v1/transaction/${id_crypto}`).then(res => setTransactions(res.data));
  }, [id_crypto]);

  return (
    <div>
      <h2>Transactions for Crypto ID: {id_crypto}</h2>
      <button onClick={openModal}>Create Transaction</button>
            <AddTransaction isOpen={isModalOpen} onClose={closeModal} id_crypto={id_crypto}/>
            <EditTransaction isOpen={isEditModalOpen} onClose={closeEditModal} transaction={selectedTransaction} />

      <ul>
        {transactions.map(transaction => (
          <li key={transaction.id}>
            Quantity: {transaction.quantity}, Transaction Price: {transaction.transaction_price}
            <button onClick={() => openEditModal(transaction)}>Modifica</button>
            <button onClick={() => handleDeleteTransaction(transaction.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Transactions;