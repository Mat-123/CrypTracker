
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const Transactions = ({ match }) => {
  const { id_crypto } = useParams();
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    axios.get(`/api/v1/transaction/${id_crypto}`).then(res => setTransactions(res.data));
  }, [id_crypto]);

  return (
    <div>
      <h2>Transactions for Crypto ID: {id_crypto}</h2>
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