import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function NftSearchForm() {
    const [query, setQuery] = useState('');
    const navigate = useNavigate();
    const [chain, setChain] = useState('');
    const [error, setError] = useState('');
    const [userWallet, setUserWallet] = useState([]);

useEffect(() => {
    const SearchNft = async () => {
        try {
            const response = await fetch('/api/v1/nftwallet');
            const data = await response.json();
            setUserWallet(data);
        } catch (error) {
            setError('Error, please try again later');
        }
    };

    SearchNft();
}, []);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!query) {
            setError('Inserisci una query di ricerca.');
            return;
        }

        if (!chain) {
            setError('Seleziona una chain.');
            return;
        }

        setError('');


        const endpoint = chain === '1' 
            ? `https://api-mainnet.magiceden.dev/v3/rtp/ethereum/collections/v7?name=${query}`
            : `https://api-mainnet.magiceden.dev/v2/collections/${query}/stats`;

        fetch(endpoint)
            .then((response) => response.json())
            .then((data) => {
                navigate('/nftresults', { state: { results: data.data, userWallet } });
            })
            .catch((error) => {
                console.error('Errore nella ricerca:', error);
                navigate('/nftresults', { state: { results: [] } });
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
                <select
                    className="form-select mt-2"
                    aria-label="Default select example"
                    value={chain}
                    onChange={(e) => setChain(e.target.value)}
                >
                    <option value="" selected>Select the chain</option>
                    <option value="1">Ethereum</option>
                    <option value="2">Solana</option>
                </select>
                {error && <div className="text-danger mt-2">{error}</div>}
            </div>
            <button type="submit" className="btn btn-primary mt-3">Cerca</button>
        </form>
    );
}

export default NftSearchForm;