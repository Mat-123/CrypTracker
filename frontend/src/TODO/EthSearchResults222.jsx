import { useLocation, Link } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';

function EthSearchResults() {
    const location = useLocation();
    const collections = location.state?.collections || []; // Utilizziamo collections invece di results
    const initialWallet = location.state?.userNftWallet || [];
    const [userNftWallet, setUserNftWallet] = useState(initialWallet);

    const isNftInWallet = (nft) => {
        return userNftWallet.some(existing => existing.slug === nft.slug);
    };

    const addToWallet = async (nft) => {
        try {
            const response = await axios.post('/api/v1/nftwallet', {
                slug_nft: nft.slug,
                nft_name: nft.name,
                chain: 'Ethereum',
            }, {
                headers: {
                    'X-CSRF-TOKEN': window.csrfToken
                }
            });
            console.log('Criptovaluta aggiunta al wallet:', response.data);
            setUserNftWallet([...userNftWallet, nft]);
        } catch (error) {
            console.error('Errore durante l\'aggiunta della criptovaluta al wallet:', error);
        }
    };

    return (
        <div>
            <h1 className="my-4">Risultati della Ricerca</h1>
            <div className="results">
                {collections.length > 0 ? (
                    <ul className="list-group">
                        {collections.map((collections) => ( // Modifica il nome della variabile da result a collection
                            <li key={collections.slug} className={`list-group-item ${isNftInWallet(collections) ? 'list-group-item-secondary' : ''}`}>
                                <strong>{collections.name}</strong> ({collections.slug}) - 
                                {collections.floorAsk.price.amount.decimal !== null ? ` Valore: ${collections.floorAsk.price.amount.decimal} ETH` : ' Valore non disponibile'} - 
                                {isNftInWallet(collections) ? (
                                    <Link to={`/nfttransactions/${collections.slug}`}>
                                        <button className="btn btn-secondary btn-sm ms-2">Manage</button>
                                    </Link>
                                ) : (
                                    <button className="btn btn-primary btn-sm ms-2" onClick={() => addToWallet(collections)}>Aggiungi al wallet</button>
                                )}
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>Nessun risultato trovato.</p>
                )}
            </div>
            <Link to="/nft" className="btn btn-secondary mt-4">Torna alla ricerca</Link>
        </div>
    );
}

export default EthSearchResults;
