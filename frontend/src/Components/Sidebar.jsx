import axios from 'axios';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { LOGOUT } from '../redux/actions';
import ExpiryModal from './ExpiryModal';


const Sidebar = () => {
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
        <div className="card card-bg-color rounded-4 text-white mt-5 d-none d-md-block">
            <div className="card-body d-flex flex-column">
            <Link className="navbar-brand text-start fs-3 mb-3" to="/">
                    Cryptracker
                </Link>
                {user ? (
                    <>
                <h5 className='my-3'>Welcome {user.name}</h5>
                <div className="container">
                    <div className="row mb-3 d-flex flex-row">
                    <hr />
                <Link className="nav-link text-start fs-5 d-flex align-items-center" aria-current="page" to="/crypto"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#F0BB6C" className="bi bi-search me-2" viewBox="0 0 16 16">
                        <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"/>
                        </svg>Crypto</Link>
                </div>
                <div className="row mb-3 d-flex flex-row">
                <Link className="nav-link text-start fs-5 d-flex align-items-center" aria-current="page" to="/wallet">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#F0BB6C" className="bi bi-wallet2 me-2" viewBox="0 0 16 16">
                <path d="M12.136.326A1.5 1.5 0 0 1 14 1.78V3h.5A1.5 1.5 0 0 1 16 4.5v9a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 0 13.5v-9a1.5 1.5 0 0 1 1.432-1.499zM5.562 3H13V1.78a.5.5 0 0 0-.621-.484zM1.5 4a.5.5 0 0 0-.5.5v9a.5.5 0 0 0 .5.5h13a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5z"/>
                </svg>
                Wallet</Link>
                </div>
                {user && user.role === 'premium' ? (
                    <div className="row mb-3 d-flex flex-row">
                    <Link className="nav-link text-start fs-5 d-flex align-items-center" aria-current="page" to="/analysis">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#F0BB6C" className="bi bi-graph-up me-2" viewBox="0 0 16 16">
                    <path fillRule="evenodd" d="M0 0h1v15h15v1H0zm14.817 3.113a.5.5 0 0 1 .07.704l-4.5 5.5a.5.5 0 0 1-.74.037L7.06 6.767l-3.656 5.027a.5.5 0 0 1-.808-.588l4-5.5a.5.5 0 0 1 .758-.06l2.609 2.61 4.15-5.073a.5.5 0 0 1 .704-.07"/>
                    </svg>
                    Analysis</Link>
                    </div>
                ) : (<div className="row mb-3 d-flex flex-row">
                    <Link className="nav-link text-start fs-5 d-flex align-items-center" aria-current="page" to="/buypremium">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#F0BB6C" className="bi bi-cart3 me-2" viewBox="0 0 16 16">
                    <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .49.598l-1 5a.5.5 0 0 1-.465.401l-9.397.472L4.415 11H13a.5.5 0 0 1 0 1H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5M3.102 4l.84 4.479 9.144-.459L13.89 4zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4m7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4m-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2m7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2"/>
                    </svg>
                    Buy Premium</Link>
                    </div>)}

                    {user && user.role === 'admin' && (
                      <div className="row mb-3 d-flex flex-row">
                        
                    <Link className="nav-link text-start fs-5 d-flex align-items-center" aria-current="page" to="/adminpanel">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#F0BB6C" className="bi bi-person-gear me-2" viewBox="0 0 16 16">
                        <path d="M11 5a3 3 0 1 1-6 0 3 3 0 0 1 6 0M8 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4m.256 7a4.5 4.5 0 0 1-.229-1.004H3c.001-.246.154-.986.832-1.664C4.484 10.68 5.711 10 8 10q.39 0 .74.025c.226-.341.496-.65.804-.918Q8.844 9.002 8 9c-5 0-6 3-6 4s1 1 1 1zm3.63-4.54c.18-.613 1.048-.613 1.229 0l.043.148a.64.64 0 0 0 .921.382l.136-.074c.561-.306 1.175.308.87.869l-.075.136a.64.64 0 0 0 .382.92l.149.045c.612.18.612 1.048 0 1.229l-.15.043a.64.64 0 0 0-.38.921l.074.136c.305.561-.309 1.175-.87.87l-.136-.075a.64.64 0 0 0-.92.382l-.045.149c-.18.612-1.048.612-1.229 0l-.043-.15a.64.64 0 0 0-.921-.38l-.136.074c-.561.305-1.175-.309-.87-.87l.075-.136a.64.64 0 0 0-.382-.92l-.148-.045c-.613-.18-.613-1.048 0-1.229l.148-.043a.64.64 0 0 0 .382-.921l-.074-.136c-.306-.561.308-1.175.869-.87l.136.075a.64.64 0 0 0 .92-.382zM14 12.5a1.5 1.5 0 1 0-3 0 1.5 1.5 0 0 0 3 0"/>
                        </svg>Admin Panel
                    </Link>
                    </div>
                    )}
                
                    <div className="row mb-3 d-flex flex-row">
                <Link className="nav-link text-start fs-5 d-flex align-items-center" to="/profile">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#F0BB6C" className="bi bi-gear me-2" viewBox="0 0 16 16">
                <path d="M8 4.754a3.246 3.246 0 1 0 0 6.492 3.246 3.246 0 0 0 0-6.492M5.754 8a2.246 2.246 0 1 1 4.492 0 2.246 2.246 0 0 1-4.492 0"/>
                <path d="M9.796 1.343c-.527-1.79-3.065-1.79-3.592 0l-.094.319a.873.873 0 0 1-1.255.52l-.292-.16c-1.64-.892-3.433.902-2.54 2.541l.159.292a.873.873 0 0 1-.52 1.255l-.319.094c-1.79.527-1.79 3.065 0 3.592l.319.094a.873.873 0 0 1 .52 1.255l-.16.292c-.892 1.64.901 3.434 2.541 2.54l.292-.159a.873.873 0 0 1 1.255.52l.094.319c.527 1.79 3.065 1.79 3.592 0l.094-.319a.873.873 0 0 1 1.255-.52l.292.16c1.64.893 3.434-.902 2.54-2.541l-.159-.292a.873.873 0 0 1 .52-1.255l.319-.094c1.79-.527 1.79-3.065 0-3.592l-.319-.094a.873.873 0 0 1-.52-1.255l.16-.292c.893-1.64-.902-3.433-2.541-2.54l-.292.159a.873.873 0 0 1-1.255-.52zm-2.633.283c.246-.835 1.428-.835 1.674 0l.094.319a1.873 1.873 0 0 0 2.693 1.115l.291-.16c.764-.415 1.6.42 1.184 1.185l-.159.292a1.873 1.873 0 0 0 1.116 2.692l.318.094c.835.246.835 1.428 0 1.674l-.319.094a1.873 1.873 0 0 0-1.115 2.693l.16.291c.415.764-.42 1.6-1.185 1.184l-.291-.159a1.873 1.873 0 0 0-2.693 1.116l-.094.318c-.246.835-1.428.835-1.674 0l-.094-.319a1.873 1.873 0 0 0-2.692-1.115l-.292.16c-.764.415-1.6-.42-1.184-1.185l.159-.291A1.873 1.873 0 0 0 1.945 8.93l-.319-.094c-.835-.246-.835-1.428 0-1.674l.319-.094A1.873 1.873 0 0 0 3.06 4.377l-.16-.292c-.415-.764.42-1.6 1.185-1.184l.292.159a1.873 1.873 0 0 0 2.692-1.115z"/>
                </svg>
                Settings</Link>
                </div>
                <div className="row mb-3 d-flex flex-row">
                <Link className="nav-link text-start fs-5 d-flex align-items-center" aria-current="page" to="/faq">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#F0BB6C" className="bi bi-question-lg me-2" viewBox="0 0 16 16">
                <path fillRule="evenodd" d="M4.475 5.458c-.284 0-.514-.237-.47-.517C4.28 3.24 5.576 2 7.825 2c2.25 0 3.767 1.36 3.767 3.215 0 1.344-.665 2.288-1.79 2.973-1.1.659-1.414 1.118-1.414 2.01v.03a.5.5 0 0 1-.5.5h-.77a.5.5 0 0 1-.5-.495l-.003-.2c-.043-1.221.477-2.001 1.645-2.712 1.03-.632 1.397-1.135 1.397-2.028 0-.979-.758-1.698-1.926-1.698-1.009 0-1.71.529-1.938 1.402-.066.254-.278.461-.54.461h-.777ZM7.496 14c.622 0 1.095-.474 1.095-1.09 0-.618-.473-1.092-1.095-1.092-.606 0-1.087.474-1.087 1.091S6.89 14 7.496 14"/>
                </svg>
                FAQ</Link>
                </div>
                <div className="row mb-3 d-flex flex-row">
                <Link className="nav-link text-start fs-5 d-flex align-items-center" aria-current="page" to="/contact-us">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#F0BB6C" className="bi bi-envelope-at me-2" viewBox="0 0 16 16">
                  <path d="M2 2a2 2 0 0 0-2 2v8.01A2 2 0 0 0 2 14h5.5a.5.5 0 0 0 0-1H2a1 1 0 0 1-.966-.741l5.64-3.471L8 9.583l7-4.2V8.5a.5.5 0 0 0 1 0V4a2 2 0 0 0-2-2zm3.708 6.208L1 11.105V5.383zM1 4.217V4a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v.217l-7 4.2z"/>
                  <path d="M14.247 14.269c1.01 0 1.587-.857 1.587-2.025v-.21C15.834 10.43 14.64 9 12.52 9h-.035C10.42 9 9 10.36 9 12.432v.214C9 14.82 10.438 16 12.358 16h.044c.594 0 1.018-.074 1.237-.175v-.73c-.245.11-.673.18-1.18.18h-.044c-1.334 0-2.571-.788-2.571-2.655v-.157c0-1.657 1.058-2.724 2.64-2.724h.04c1.535 0 2.484 1.05 2.484 2.326v.118c0 .975-.324 1.39-.639 1.39-.232 0-.41-.148-.41-.42v-2.19h-.906v.569h-.03c-.084-.298-.368-.63-.954-.63-.778 0-1.259.555-1.259 1.4v.528c0 .892.49 1.434 1.26 1.434.471 0 .896-.227 1.014-.643h.043c.118.42.617.648 1.12.648m-2.453-1.588v-.227c0-.546.227-.791.573-.791.297 0 .572.192.572.708v.367c0 .573-.253.744-.564.744-.354 0-.581-.215-.581-.8Z"/>
                </svg>
                Contact Us</Link>
                </div>
                <div className="row mb-3 d-flex flex-row">
                <hr />
                <button
                className="dropdown-item btn btn-link"
                onClick={logout}
                >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#F0BB6C" className="bi bi-box-arrow-right me-2" viewBox="0 0 16 16">
                <path fillRule="evenodd" d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0z"/>
                <path fillRule="evenodd" d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708z"/>
                </svg>
                Logout
                </button>
                </div>
                </div>
                </>
            ) : (
                <>
                <div className="container">
                    <div className="row mb-3 d-flex flex-row">
                    <hr />
                <Link className="nav-link text-start fs-5 d-flex align-items-center" aria-current="page" to="/login">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#F0BB6C" className="bi bi-box-arrow-in-right me-2" viewBox="0 0 16 16">
                <path fillRule="evenodd" d="M6 3.5a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-2a.5.5 0 0 0-1 0v2A1.5 1.5 0 0 0 6.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-8A1.5 1.5 0 0 0 5 3.5v2a.5.5 0 0 0 1 0z"/>
                <path fillRule="evenodd" d="M11.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H1.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708z"/>
                </svg>
                                Login
                            </Link>
                            </div>
                            <div className="row mb-3 d-flex flex-row">
                            <Link className="nav-link text-start fs-5 d-flex align-items-center" aria-current="page" to="/register">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#F0BB6C" className="bi bi-pencil-square me-2" viewBox="0 0 16 16">
  <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
  <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"/>
</svg>
                                Register
                            </Link>
                            </div>
                            </div>
                            </>
                    )}
                    
            </div>
            {/* {user && (
                <ExpiryModal 
                    show={showModal} 
                    daysLeft={daysLeft} 
                    onHide={() => setShowModal(false)} 
                />
            )} */}
        </div>
      );
    };
    
    export default Sidebar;