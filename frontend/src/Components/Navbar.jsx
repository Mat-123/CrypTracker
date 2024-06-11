import axios from 'axios';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { LOGOUT } from '../redux/actions';


const Navbar = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const user = useSelector((state) => state.user);

    const logout = () => {
        axios
            .post('/logout')
            .then(() => dispatch({ type: LOGOUT }))
            .then(() => navigate('/login'));
    };

    useEffect(() => {
        const responseInterceptor = axios.interceptors.response.use(
          response => response,
          error => {
            if (error.response && error.response.status === 401) {
              // Token scaduto o errore di autenticazione, redirigi alla pagina di login
              navigate("/login");
            }
            return Promise.reject(error);
          }
        );
    
        // Pulizia dell'interceptor quando il componente viene smontato
        return () => {
          axios.interceptors.response.eject(responseInterceptor);
        };
      }, [navigate]);

    return (
        <nav className="navbar navbar-expand-lg bg-dark" data-bs-theme="dark">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">
                    Cryptracker
                </Link>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarSupportedContent"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div
                    className="collapse navbar-collapse"
                    id="navbarSupportedContent"
                >
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                    <li className="nav-item">
                        <Link className="nav-link" aria-current="page" to="/crypto">Crypto</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" aria-current="page" to="/nft">NFT</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" aria-current="page" to="/wallet">Wallet</Link>
                    </li>
                    </ul>

                    {user ? (
                        <>
                        <div className="dropdown">
                            <Link className="btn btn-dark dropdown-toggle me-3" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                {user.name}
                            </Link>

                            <ul className="dropdown-menu">
                                <li><Link className="dropdown-item" to="/profile">Settings</Link></li>
                                <li><Link className="dropdown-item" aria-current="page" to="/faq">FAQ</Link></li>
                            </ul>
                        </div>
                            
                            <button
                                className="btn btn-primary"
                                onClick={logout}
                            >
                                Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <Link className="btn btn-primary me-2" to="/login">
                                Login
                            </Link>
                            <Link className="btn btn-primary" to="/register">
                                Register
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;