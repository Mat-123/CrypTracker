import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import axios from 'axios';
import SearchForm from './Components/SearchForm';
import Results from './Components/Results';
import GuestRoutes from './Pages/GuestRoutes';
import Login from './Pages/Login';
import { LOGIN } from './redux/actions';
import Register from './Pages/Register';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './Components/Navbar';


function App() {
  axios.defaults.withCredentials = true;
  axios.defaults.withXSRFToken = true;

  const dispatch = useDispatch();
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
      axios('/api/user')
          .then((res) =>
              dispatch({
                  type: LOGIN,
                  payload: res.data,
              })
          )
          .catch((err) => console.log(err))
          .finally(() => setLoaded(true));
  }, [dispatch]);

    return (
      loaded && (
        <BrowserRouter>
        <Navbar />
        <div className="App">
          <div className="container">
          <div className="row">
          <div className="col-8 mx-auto">
          <Routes>
          
                  <Route path="/crypto" element={<SearchForm />} />
                  <Route path="/results" element={<Results />} />

                  <Route element={<GuestRoutes />}>
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                  </Route>
                  
          </Routes>
           </div>
                  </div>
                  </div>
        </div>
        </BrowserRouter>
        )
    );
}

export default App;
