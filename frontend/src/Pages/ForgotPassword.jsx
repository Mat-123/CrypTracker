import axios from 'axios';
import { useState } from 'react';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (ev) => {
        ev.preventDefault();
        axios.post('/password/email', { email })
            .then(response => {
                setMessage('Reset link sent to your email');
                setError('');
            })
            .catch(error => {
                setError('Error sending reset link');
                setMessage('');
            });
    };

    return (
        <div className="col-8">
            <div className="card card-bg-color rounded-4 text-white mt-5">
                <div className="card-body">
                    <h2>Forgot Password</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">Email address</label>
                            <input
                                type="email"
                                className="form-control card-bg-color text-white"
                                id="email"
                                name="email"
                                onChange={(ev) => setEmail(ev.target.value)}
                                value={email}
                            />
                        </div>
                        {message && <div className="text-success mt-2">{message}</div>}
                        {error && <div className="text-danger mt-2">{error}</div>}
                        <button type="submit" className="btn manage-btn rounded-3">Send Reset Link</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ForgotPassword;
