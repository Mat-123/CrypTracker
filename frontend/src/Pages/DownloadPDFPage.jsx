import { useState, useEffect } from 'react';
import axios from 'axios';
import "../Style/index.css";

const DownloadPDFPage = () => {
    const [years, setYears] = useState([]);
    const [selectedYear, setSelectedYear] = useState('');

    useEffect(() => {
        axios.get(`/api/v1/transactions-years`, { withCredentials: true })
            .then((response) => {
                const sortedYears = response.data.sort((a, b) => b - a); 
                setYears(sortedYears);
                if (sortedYears.length > 0) {
                    setSelectedYear(sortedYears[0]);
                }
            })
            .catch((error) => {
                console.error('Error fetching years:', error);
            });
    }, []);

    const handleYearChange = (event) => {
        setSelectedYear(event.target.value);
    };

    const downloadPDF = (event) => {
        event.preventDefault();
        window.location.href = `/api/v1/transactions/download-pdf/${selectedYear}.pdf`;
    };

    return (
        <div className="card card-bg-color text-white rounded-4 mt-5">
            <div className="card-body container">
                <div className="row">
                    <h2 className="my-3">Scarica Report Transazioni</h2>
                    {years.length > 0 ? (
                        <form onSubmit={downloadPDF}>
                            <div className="mb-3">
                                <label htmlFor="yearSelect" className="form-label">Seleziona l'anno:</label>
                                <select
                                    id="yearSelect"
                                    className="form-select"
                                    value={selectedYear}
                                    onChange={handleYearChange}
                                >
                                    {years.map((year) => (
                                        <option key={year} value={year}>{year}</option>
                                    ))}
                                </select>
                            </div>
                            <button type='submit' className="btn manage-btn mt-3 rounded-3">
                                Scarica PDF
                            </button>
                        </form>
                    ) : (
                        <p>Nessuna transazione disponibile.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default DownloadPDFPage;



