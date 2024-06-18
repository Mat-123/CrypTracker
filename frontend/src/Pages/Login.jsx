import axios from 'axios';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { LOGIN } from '../redux/actions';
import { Link } from 'react-router-dom';

const Login = () => {
    const dispatch = useDispatch();

    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const [error, setError] = useState('');

    const updateInputValue = (ev) => {
        setFormData((oldFormData) => ({
            ...oldFormData,
            [ev.target.name]: ev.target.value,
        }));
    };

    const submitLogin = (ev) => {
        ev.preventDefault();
        axios
            .get('/sanctum/csrf-cookie')
            .then(() => axios.post('/login', formData))
            .then(() => axios.get('/api/user'))
            .then((res) => {
                dispatch({
                    type: LOGIN,
                    payload: res.data,
                });
            }).catch((error) => {
                if (error.response && error.response.status === 422) {
                    setError('Incorrect email or password');
                } else {
                    console.error('An error occurred:', error);
                }
            });

    };

    return (
        <>
    <div className="col-8">
        <div className="card card-bg-color rounded-4 text-white mt-5">
            <div className="card-body">
        <form onSubmit={(ev) => submitLogin(ev)} noValidate>
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
                {error && <div className="text-danger mt-2">{error}</div>}
            </div>
            <button type="submit" className="btn manage-btn rounded-3">
                Login
            </button>
            <div className='mt-3'>
                <Link className='link-light' to="/forgot-password">
                Forgot Passoword?
                </Link>
            </div>
        </form>
        </div>
        </div>
        </div>
    </>
    );

}

export default Login;