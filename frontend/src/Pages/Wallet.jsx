import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Transactions from "./Transactions";


const Wallet = () => {
    const [cryptos, setCryptos] = useState([]);
    useEffect(() => {
    axios.get('/api/v1/wallet').then(res => setCryptos(res.data))
    }, []);

    const calculateCryptoQuantities = (cryptos) => {
        const cryptoQuantities = {};
        const cryptoNames = {};
    
        cryptos.forEach(wallet => {
          const { id_crypto, name_crypto, transactions } = wallet;
    
          if (!cryptoQuantities[id_crypto]) {
            cryptoQuantities[id_crypto] = 0;
            cryptoNames[id_crypto] = name_crypto; // Store the name of the crypto
          }
    
          transactions.forEach(transaction => {
            const quantity = parseFloat(transaction.quantity);
            if (!isNaN(quantity)) {
              cryptoQuantities[id_crypto] += quantity;
            }
          });
        });
    
        return { cryptoQuantities, cryptoNames };
      };

        const { cryptoQuantities, cryptoNames } = calculateCryptoQuantities(cryptos);


    return (

            <div>
      <h1>Crypto Wallet</h1>
      <ul>
      {Object.entries(cryptoQuantities).map(([id_crypto, quantity]) => (
          <li key={id_crypto} className="mb-3">
            {cryptoNames[id_crypto]}: {quantity}
            <Link to={`/transactions/${id_crypto}`}>
            <button className="btn btn-primary ms-5">Manage</button>
          </Link>

          </li>
        ))}
      </ul>
    </div>

    )
}

export default Wallet;