
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
        if (!confirmDelete) return; // Annulla l'eliminazione se l'utente ha cliccato "Annulla" nel messaggio di conferma
      
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
            // Ora elimina la crittovaluta stessa
            await axios.delete(`/api/v1/wallet/${id_crypto}`);
    
            console.log("Crypto and related transactions deleted successfully");
    
            navigate("/wallet");
            // Se necessario, aggiorna lo stato o esegui altre azioni necessarie dopo l'eliminazione
        } catch (error) {
            console.error("Error deleting crypto and related transactions:", error);
        }
    }

  useEffect(() => {
    axios.get(`/api/v1/transaction/${id_crypto}`).then(res => setTransactions(res.data));
  }, [id_crypto]);

  return (
    <div>
      <h2>Transactions for Crypto ID: {id_crypto}</h2>
      <button onClick={openModal}>Create Transaction</button>
            <AddTransaction isOpen={isModalOpen} onClose={closeModal} id_crypto={id_crypto}/>
            <EditTransaction isOpen={isEditModalOpen} onClose={closeEditModal} transaction={selectedTransaction} />
            <button onClick={handleDeleteCrypto}>Remove Crypto</button>

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