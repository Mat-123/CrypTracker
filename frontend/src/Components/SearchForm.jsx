import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function SearchForm() {
    const [query, setQuery] = useState('');
    const navigate = useNavigate();
    const [error, setError] = useState('');
    const [userWallet, setUserWallet] = useState([]);
    const [trendingCryptos, setTrendingCryptos] = useState([]);

    useEffect(() => {
        const fetchUserWallet = async () => {
            try {
                const response = await axios.get('/api/v1/wallet');
                setUserWallet(response.data);
            } catch (error) {
                setError('Error, please try again later');
            }
        };

        fetchUserWallet();
    }, []);

    useEffect(() => {
        const fetchTrendingCryptos = async () => {
            try {
                const response = await axios.get('/api/v1/trending');
                const formattedCryptos = response.data.map(crypto => ({
                    ...crypto,
                    percent_change_24h: formatNumber(crypto.percent_change_24h),
                    percent_change_7d: formatNumber(crypto.percent_change_7d),
                    last_value: formatNumber(crypto.last_value),
                    volume_24h: formatNumber(crypto.volume_24h),
                }));
                setTrendingCryptos(formattedCryptos);
            } catch (error) {
                console.error('Error fetching trending cryptos:', error);
            }
        };

        fetchTrendingCryptos();
    }, []);

    const formatNumber = (number) => {
        if (number === null || number === undefined) {
            return 'Not Available';
        }

        const parsedNumber = parseFloat(number);
        if (parsedNumber === 0) {
            return '0';
        } else if (parsedNumber.toFixed(2) === parsedNumber.toString()) {
            return parsedNumber.toFixed(2);
        } else {
            return parsedNumber.toString();
        }
    };

    const getColorClass = (change) => {
        if (parseFloat(change) > 0) {
            return 'text-success';
        } else if (parseFloat(change) < 0) {
            return 'text-danger';
        } else {
            return '';
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!query) {
            setError('Inserisci una query di ricerca.');
            return;
        }

        setError('');

        try {
            const response = await axios.get(`/api/v1/crypto?query=${query}`);
            navigate('/results', { state: { results: response.data.data, userWallet } });
        } catch (error) {
            console.error('Errore nella ricerca:', error);
            navigate('/results', { state: { results: [] } });
        }
    };

    return (
        <>
            <div className="col-2"></div>
            <div className="col-8">
                <div className="card card-bg-color rounded-4 text-white mt-5">
                    <div className="card-body">
                        <form onSubmit={handleSubmit} className="mb-4">
                            <div className="form-group mt-5">
                                <input
                                    type="text"
                                    className="form-control card-bg-color text-white"
                                    placeholder="Search crypto..."
                                    value={query}
                                    onChange={(e) => setQuery(e.target.value)}
                                />
                                {error && <div className="text-danger mt-2">{error}</div>}
                            </div>
                            <button type="submit" className="btn manage-btn mt-3">
                                Search
                            </button>
                        </form>
                    </div>
                </div>
                <div className="row mt-4">
                    <div className="col-12">
                    <div className="card card-bg-color text-white rounded-4">
                        <div className="card-body">
                            <h4>Latest Trending Cryptocurrencies by MarketCap</h4>
                        </div>
                        </div>
                    </div>
                </div>

                <div className="row mt-4">
                    {trendingCryptos.map((crypto) => (
                        <div key={crypto.id_crypto} className="col-md-4 mb-4">
                            <div className="card card-bg-color text-white rounded-4">
                                <div className="card-body text-start">
                                    <h5 className="card-title">{crypto.name_crypto} - {crypto.symbol}</h5>
                                    <p className="card-text">Last Value: {crypto.last_value} USD</p>
                                    <p className="card-text">Volume (24h): {crypto.volume_24h} USD</p>
                                    <p className={`card-text ${getColorClass(crypto.percent_change_24h)}`}>
                                        Change (24h): {crypto.percent_change_24h}%
                                    </p>
                                    <p className={`card-text ${getColorClass(crypto.percent_change_7d)}`}>
                                        Change (7d): {crypto.percent_change_7d}%
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}

export default SearchForm;
