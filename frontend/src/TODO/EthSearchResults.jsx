import { Link } from 'react-router-dom';

function EthSearchResults({ collections, userNftWallet }) {
    const isInUserWallet = (tokenId) => {
        return userNftWallet.includes(tokenId);
    };

    const handleButtonClick = (collectionId) => {
        if (isInUserWallet(collectionId)) {
            console.log('Gestione del token nel wallet');
        } else {
            console.log('Aggiunta del token al wallet');
        }
    };

    return (
        <div>
            <h2>Risultati della ricerca</h2>
            <ul>
                {collections.map(collection => (
                    <li key={collection.id}>
                        <img src={collection.image} alt={collection.name} />
                        <h3>{collection.name}</h3>
                        <p>{collection.description}</p>
                        <button onClick={() => handleButtonClick(collection.id)}>
                            {isInUserWallet(collection.id) ? 'Manage' : 'Aggiungi al wallet'}
                        </button>
                    </li>
                ))}
            </ul>
            <Link to="/nft">Torna alla ricerca</Link>
        </div>
    );
}

export default EthSearchResults;
