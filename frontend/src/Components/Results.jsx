import { useLocation, Link } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';

function Results() {
    const location = useLocation();
    const results = location.state?.results || [];
    const initialWallet = location.state?.userWallet || [];
    const [userWallet, setUserWallet] = useState(initialWallet);

    const isCryptoInWallet = (crypto) => {
        return userWallet.some(existing => existing.id_crypto === crypto.id_crypto);
    };

    const handleAddToWallet = async (crypto) => {
        try {
            const response = await axios.post('/api/v1/wallet', {
                id_crypto: crypto.id_crypto,
                name_crypto: crypto.name_crypto
            }, {
                headers: {
                    'X-CSRF-TOKEN': window.csrfToken
                }
            });
            console.log('Criptovaluta aggiunta al wallet:', response.data);

            // Aggiungi la criptovaluta al wallet locale e aggiorna lo stato
            setUserWallet([...userWallet, crypto]);

        } catch (error) {
            console.error('Errore durante l\'aggiunta della criptovaluta al wallet:', error);
        }
    };

    return (
        <div>
            <h1 className="my-4">Risultati della Ricerca</h1>
            <div className="results">
                {results.length > 0 ? (
                    <ul className="list-group">
                        {results.map((result) => (
                            <li key={result.id_crypto} className={`list-group-item ${isCryptoInWallet(result) ? 'list-group-item-secondary' : ''}`}>
                            <strong>{result.name_crypto}</strong> ({result.slug_crypto}) - 
                            {result.last_value !== null ? ` Valore: ${result.last_value}` : ' Valore non disponibile'} - 
                            Prezzo Fetch: {result.fetch_price}
                            {isCryptoInWallet(result) ? (
                                <Link to={`/transactions/${result.id_crypto}`}>
                                        <button className="btn btn-secondary btn-sm ms-2">Manage</button>
                                    </Link>                            ) : (
                                <button className="btn btn-primary btn-sm ms-2" onClick={() => handleAddToWallet(result)}>Aggiungi al wallet</button>
                            )}
                        </li>
                        ))}
                    </ul>
                ) : (
                    <p>Nessun risultato trovato.</p>
                )}
            </div>
            <Link to="/crypto" className="btn btn-secondary mt-4">Torna alla ricerca</Link>
        </div>
    );
}

export default Results;
