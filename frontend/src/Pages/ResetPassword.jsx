import axios from 'axios';
import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const ResetPassword = () => {
    const { token } = useParams();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        password_confirmation: ''
    });
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const updateInputValue = (ev) => {
        setFormData((oldFormData) => ({
            ...oldFormData,
            [ev.target.name]: ev.target.value,
        }));
    };

    const handleSubmit = (ev) => {
        ev.preventDefault();
        axios.post('/password/reset', {
            ...formData,
            token
        })
            .then(response => {
                setMessage('Password reset successful');
                setError('');
                navigate.push('/login');
            })
            .catch(error => {
                setError('Error resetting password');
                setMessage('');
            });
    };

    return (
        <div className="col-8">
            <div className="card card-bg-color rounded-4 text-white mt-5">
                <div className="card-body">
                    <h2>Reset Password</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">Email address</label>
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
                            <label htmlFor="password" className="form-label">New Password</label>
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
                            <label htmlFor="password_confirmation" className="form-label">Confirm New Password</label>
                            <input
                                type="password"
                                className="form-control card-bg-color text-white"
                                id="password_confirmation"
                                name="password_confirmation"
                                onChange={(ev) => updateInputValue(ev)}
                                value={formData.password_confirmation}
                            />
                        </div>
                        {message && <div className="text-success mt-2">{message}</div>}
                        {error && <div className="text-danger mt-2">{error}</div>}
                        <button type="submit" className="btn manage-btn rounded-3">Reset Password</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ResetPassword;
