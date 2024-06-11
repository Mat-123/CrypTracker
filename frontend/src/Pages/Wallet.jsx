import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";



const Wallet = () => {
    const [cryptos, setCryptos] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
      axios.get('/api/v1/wallet')
      .then(res => setCryptos(res.data))
      .catch(error => {
          if (error.response && error.response.status === 401) {
              navigate('/login');
          } else if (error.response && error.response.status === 405) {
            navigate('/login');
          }
            else {
              console.error('An error occurred:', error);
          }
      });
}, [navigate]);

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