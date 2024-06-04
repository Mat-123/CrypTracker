
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import AddTransaction from "../Components/AddTransaction";

const Transactions = () => {
  const { id_crypto } = useParams();
  const [transactions, setTransactions] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

  useEffect(() => {
    axios.get(`/api/v1/transaction/${id_crypto}`).then(res => setTransactions(res.data));
  }, [id_crypto]);

  return (
    <div>
      <h2>Transactions for Crypto ID: {id_crypto}</h2>
      <button onClick={openModal}>Create Transaction</button>
            <AddTransaction isOpen={isModalOpen} onClose={closeModal} id_crypto={id_crypto}/>
      <ul>
        {transactions.map(transaction => (
          <li key={transaction.id}>
            Quantity: {transaction.quantity}, Transaction Price: {transaction.transaction_price}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Transactions;