import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function SearchForm() {
    const [query, setQuery] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        fetch(`/api/v1/crypto?query=${query}`)
            .then((response) => response.json())
            .then((data) => {
                navigate('/results', { state: { results: data.data } }); // Naviga alla pagina dei risultati con i dati della ricerca
            })
            .catch((error) => {
                console.error('Errore nella ricerca:', error);
                navigate('/results', { state: { results: [] } }); // Naviga alla pagina dei risultati con un array vuoto in caso di errore
            });
    };

    return (
        <form onSubmit={handleSubmit} className="mb-4">
            <div className="form-group mt-5">
                <input
                    type="text"
                    className="form-control"
                    placeholder="Cerca..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                />
            </div>
            <button type="submit" className="btn btn-primary mt-3">Cerca</button>
        </form>
    );
}

export default SearchForm;
