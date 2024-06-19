import axios from 'axios';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { LOGOUT } from '../redux/actions';
import ExpiryModal from './ExpiryModal';

const Navbar = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const user = useSelector((state) => state.user);
    const [showModal, setShowModal] = useState(false);
    const [daysLeft, setDaysLeft] = useState(0);

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

    useEffect(() => {
        if (user && user.role === 'premium') {
            const today = new Date();
            const expiryDate = new Date(user.premium_expiry);
            const timeDiff = expiryDate - today;
            const daysDiff = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));

            if (daysDiff <= 3) {
                setDaysLeft(daysDiff);
                setShowModal(true);
            }
        }
    }, [user]);

    return (
        <nav className="navbar navbar-expand-lg bg-dark main-bg-color d-block d-md-none" data-bs-theme="dark">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">Cryptracker</Link>
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
                            <Link className="nav-link" aria-current="page" to="/wallet">Wallet</Link>
                        </li>
                        {user && user.role === 'premium' && (
                            <li className="nav-item">
                                <Link className="nav-link" aria-current="page" to="/analysis">Analysis</Link>
                            </li>
                        )}
                    </ul>
                    {user ? (
                        <>
                            <div className="dropdown">
                                <Link className="btn btn-dark dropdown-toggle me-3 main-bg-color" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    {user.name}
                                </Link>
                                <ul className="dropdown-menu dropdown-menu-end main-bg-color">
                                    <li><Link className="dropdown-item" to="/profile">Settings</Link></li>
                                    <li><Link className="dropdown-item" aria-current="page" to="/faq">FAQ</Link></li>
                                    <li><Link className="dropdown-item" aria-current="page" to="/contact-us">Contact Us</Link></li>
                                    <li><hr className="dropdown-divider" /></li>
                                    <li>
                                        <button
                                            className="dropdown-item btn btn-link"
                                            onClick={logout}
                                        >
                                            Logout
                                        </button>
                                    </li>
                                </ul>
                            </div>
                        </>
                    ) : (
                        <>
                            <Link className="btn manage-btn rounded-3 me-3" to="/login">Login</Link>
                            <Link className="btn manage-btn rounded-3" to="/register">Register</Link>
                        </>
                    )}
                </div>
            </div>
            {/* {user && (
                <ExpiryModal 
                    show={showModal} 
                    daysLeft={daysLeft} 
                    onHide={() => setShowModal(false)} 
                />
            )} */}
        </nav>
    );
};

export default Navbar;
