import { useState } from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
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
    <BrowserRouter>
      {/* <Navbar /> */}
      <Routes>
        <Route path='/crypto'>
        {!showResults ? (
                            <SearchForm onResults={handleSearch} />
                        ) : (
                            <Results results={results} onBack={handleBack} />
                        )}
        </Route>
      </Routes>

      {/* <Footer /> */}
    </BrowserRouter>
  );
}

export default App;
