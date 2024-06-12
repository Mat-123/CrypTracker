import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function NftSearchForm() {
    const [query, setQuery] = useState('');
    const navigate = useNavigate();
    const [chain, setChain] = useState('');
    const [error, setError] = useState('');
    const [userNftWallet, setUserNftWallet] = useState([]);

    useEffect(() => {
        const fetchUserWallet = async () => {
            try {
                const response = await axios.get('/api/v1/nftwallet');
                setUserNftWallet(response.data);
            } catch (error) {
                setError('Error, please try again later');
            }
        };

        fetchUserWallet();
    }, []);

    const handleSubmit = async (e) => {
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

        try {
            const response = await axios.get(endpoint);
            const data = response.data;
            const navigatePath = chain === '1' ? '/ethsearchresults' : '/solsearchresults';
            navigate(navigatePath, { state: { results: data, userNftWallet } });
        } catch (error) {
            console.error('Errore nella ricerca:', error);
            navigate(chain === '1' ? '/ethsearchresults' : '/solsearchresults', { state: { results: [], userNftWallet } });
        }
    };

    return (
        <form onSubmit={handleSubmit} className="mb-4">
            <div className="form-group mt-5">
                <div>
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
                </div>
                <div>
                    <input
                        type="text"
                        className="form-control mt-3"
                        placeholder={chain === '1' ? 'Search by name...' : 'Search by slug...'}
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                    />
                    {error && <div className="text-danger mt-2">{error}</div>}
                </div>
            </div>
            <button type="submit" className="btn btn-primary mt-3">Cerca</button>
        </form>
    );
}

export default NftSearchForm;
