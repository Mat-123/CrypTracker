const Transactions = ({ transactions }) => {

    return (
        <div>
          <h2>Transactions</h2>
          <ul>
            {transactions.map(transaction => (
              <li key={transaction.id}>
                {transaction.quantity} - {transaction.transaction_price} - {transaction.transaction_date}
              </li>
            ))}
          </ul>
        </div>
      );
}


export default Transactions;