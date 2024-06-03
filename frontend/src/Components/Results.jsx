import React from 'react';

function Results({ results, onBack }) {
    return (
        <div className="results">
            {results.length > 0 ? (
                <ul className="list-group">
                    {results.map((result, index) => (
                        <li key={index} className="list-group-item">
                            {result}
                        </li>
                    ))}
                </ul>
            ) : (
                <p>Nessun risultato trovato.</p>
            )}
            <button className="btn btn-secondary mt-4" onClick={onBack}>
                Torna alla ricerca
            </button>
        </div>
    );
}

export default Results;
