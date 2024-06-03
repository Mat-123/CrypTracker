import React, { useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SearchForm from './Components/SearchForm';
import Results from './Components/Results';

function App() {
    const [results, setResults] = useState([]);
    const [showResults, setShowResults] = useState(false);

    const handleSearch = (searchResults) => {
        setResults(searchResults);
        setShowResults(true);
    };

    const handleBack = () => {
        setShowResults(false);
    };

    return (
        <Router>
            <div className="App">
                <Routes>
                <Route path="/crypto" element={<SearchForm />} />
                    <Route path="/results" element={<Results />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
