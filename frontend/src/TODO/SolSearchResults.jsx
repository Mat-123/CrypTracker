import { useLocation, Link } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';

function SolSearchResults() {
    const location = useLocation();
    const results = location.state?.results || [];
    const initialNftlWallet = location.state?.userNftWallet || [];
    const [userNftWallet, setUserNftWallet] = useState(initialNftlWallet);

    const isNftInWallet = (nft) => {
        return userNftWallet.some(existing => existing.slug_nft === nft.symbol);
    };

    const formatSlug = (slug) => {
        return slug
            .split(/[_-]/)
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
    };

    const AddToWallet = async (nft) => {
        const formattedSlug = formatSlug(nft.slug_nft);
        try {
            const response = await axios.post('/api/v1/nftwallet', {
                slug_nft: nft.slug_nft,
                nft_name: formattedSlug,
                chain: 'Solana',

            }, {
                headers: {
                'X-CSRF-TOKEN': window.csrfToken
            }
        });
        setUserNftWallet([...userNftWallet, nft]);
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
                            <li key={result.slug} className={`list-group-item ${isNftInWallet(result) ? 'list-group-item-secondary' : ''}`}>
                            <strong>{result.name_crypto}</strong> ({result.slug_nft}) - 
                            {result.floorPrice !== null ? ` Valore: ${result.floorPrice}` : ' Valore non disponibile'} - 
                            {isNftInWallet(result) ? (
                                <Link to={`/transactions/${result.slug_nft}`}>
                                        <button className="btn btn-secondary btn-sm ms-2">Manage</button>
                                    </Link>                            ) : (
                                <button className="btn btn-primary btn-sm ms-2" onClick={() => AddToWallet(result)}>Aggiungi al wallet</button>
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

    )
}

export default SolSearchResults;