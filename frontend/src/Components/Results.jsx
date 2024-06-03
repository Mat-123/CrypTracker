import React from 'react';
import { useLocation, Link } from 'react-router-dom';

function Results() {
    const location = useLocation();
    const results = location.state?.results || [];

    return (
        <div>
            <h1 className="my-4">Risultati della Ricerca</h1>
            <div className="results">
                {results.length > 0 ? (
                    <ul className="list-group">
                        {results.map((result) => (
                            <li key={result.id_crypto} className="list-group-item">
                                <strong>{result.name_crypto}</strong> ({result.slug_crypto}) - 
                                {result.last_value !== null ? ` Valore: ${result.last_value}` : ' Valore non disponibile'} - 
                                Prezzo Fetch: {result.fetch_price}
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
