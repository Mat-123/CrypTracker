import React, { useState } from 'react';

function SearchForm({ onResults }) {
    const [query, setQuery] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        fetch(`http://localhost:8000/api/v1/crypto?query=${query}`)
            .then((response) => response.json())
            .then((data) => {
                onResults(data.results); // Passa i risultati alla funzione onResults
            })
            .catch((error) => {
                console.error('Errore nella ricerca:', error);
                onResults([]); // Passa un array vuoto in caso di errore
            });
    };

    return (
        <form onSubmit={handleSubmit} className="mb-4">
            <div className="form-group">
                <input
                    type="text"
                    className="form-control"
                    placeholder="Cerca..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                />
            </div>
            <button type="submit" className="btn btn-primary">Cerca</button>
        </form>
    );
}

export default SearchForm;
