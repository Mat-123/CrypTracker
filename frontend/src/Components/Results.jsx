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
                name_crypto: crypto.name_crypto,
                symbol: crypto.symbol
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
        <>
        <div className='row card card-bg-color text-white rounded-4 mt-5'>
            <h2 className='py-2'>Search Results:</h2>
            </div>
            <div className="row mt-5">
                {results.length > 0 ? (
                    <>
                        {results.map((result) => (
                            <div key={result.id_crypto} className="card card-bg-color text-white mb-3 rounded-4">
                                <div className="card-body d-flex justify-content-between align-items-center">
                                <div>
                            <strong>{result.name_crypto}</strong> ({result.slug_crypto}) - 
                            {result.last_value !== null ? ` Valore: ${result.last_value}` : ' Valore non disponibile'}
                            </div>
                            
                            <div>
                            {isCryptoInWallet(result) ? (
                                <Link to={`/transactions/${result.id_crypto}`}>
                                        <button className="btn manage-btn">Manage</button>
                                    </Link>                            ) : (
                                <button className="btn manage-btn" onClick={() => handleAddToWallet(result)}>Add to Wallet</button>
                            )}
                            </div>
                            </div>
                        </div>
                        ))}
                        </>
                ) : (
                    <p>No results found.</p>
                )}
            </div>
            <Link to="/crypto" className="btn manage-btn mt-4">Back to Search</Link>

        </>
    );
}

export default Results;
