import axios from 'axios';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { LOGIN } from '../redux/actions';
import { Link } from 'react-router-dom';

const Register = () => {
    const dispatch = useDispatch();
    
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
        profile_img: '',
    });

    const [errors, setErrors] = useState(null);

    const updateInputValue = (ev) => {
        setFormData((oldFormData) => ({
            ...oldFormData,
            [ev.target.name]: ev.target.value,
        }));
    };



    const submitLogin = (ev) => {
        ev.preventDefault();
        // gli indirizzi relativi, con il proxy attivo fanno la richiesta a http://localhost:8000/login mascherandolo come indirizzo nello stesso host di react (che nel nostro caso è http://localhost:3000/login)
        axios
            .get('/sanctum/csrf-cookie')
            .then(() => {
                const body = new FormData();
                body.append('name', formData.name);
                body.append('email', formData.email);
                body.append('password', formData.password);
                body.append(
                    'password_confirmation',
                    formData.password_confirmation
                );
                return axios.post('/register', body);
            })
            .then(() => axios.get('/api/user'))
            .then((res) => {
                // salvare i dati dello user nel Redux state
                dispatch({
                    type: LOGIN,
                    payload: res.data,
                });
            });
    };

    return (
        <>
    <div className="col-2">

    </div>
    <div className="col-8">
        <div class="card card-bg-color rounded-4 text-white mt-5">
            <div class="card-body">
        <form onSubmit={(ev) => submitLogin(ev)} noValidate>
            <div className="mb-3">
                <label htmlFor="name" className="form-label">
                    Name
                </label>
                <input
                    type="text"
                    className="form-control card-bg-color text-white"
                    id="name"
                    name="name"
                    onChange={(ev) => updateInputValue(ev)}
                    value={formData.name}
                />
            </div>
            <div className="mb-3">
                <label htmlFor="email" className="form-label">
                    Email address
                </label>
                <input
                    type="email"
                    className="form-control card-bg-color text-white"
                    id="email"
                    name="email"
                    onChange={(ev) => updateInputValue(ev)}
                    value={formData.email}
                />
            </div>
            <div className="mb-3">
                <label htmlFor="password" className="form-label">
                    Password
                </label>
                <input
                    type="password"
                    className="form-control card-bg-color text-white"
                    id="password"
                    name="password"
                    onChange={(ev) => updateInputValue(ev)}
                    value={formData.password}
                />
            </div>
            <div className="mb-3">
                <label htmlFor="password_confirmation" className="form-label">
                    Conferma password
                </label>
                <input
                    type="password"
                    className="form-control card-bg-color text-white"
                    id="password_confirmation"
                    name="password_confirmation"
                    onChange={(ev) => updateInputValue(ev)}
                    value={formData.password_confirmation}
                />
            </div>
            <button type="submit" className="btn manage-btn rounded-3">
                Register
            </button>
        </form>
        <div className='mt-3'> Already registered? <Link className='link-light' to="/login">Log in</Link></div>
        </div>
        </div>
        </div>
    </>
    );
};

export default Register;