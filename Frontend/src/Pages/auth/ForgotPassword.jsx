import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import socialLogo from '../../assets/social-logo.png';
import './Login.css'; // Reusing login styles for consistency

export default function ForgotPassword() {
    const [email, setEmail] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        alert("Reset link sent to " + email);
        navigate('/login');
    };

    return (
        <div className="login-container">
            <div className="auth-box" style={{ margin: '100px auto', maxWidth: '400px' }}>
                <div className="auth-header" style={{ textAlign: 'center' }}>
                    <img src={socialLogo} alt="Logo" style={{ width: '50px', marginBottom: '20px' }} />
                    <h2>Reset Password</h2>
                    <p>Enter your email to receive a reset link</p>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="form-group" style={{ marginBottom: '20px' }}>
                        <label>Email Address</label>
                        <input
                            type="email"
                            className="form-control"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="btn-primary" style={{ width: '100%' }}>Send Reset Link</button>
                </form>

                <div className="auth-footer" style={{ textAlign: 'center', marginTop: '20px' }}>
                    <p>
                        Remembered your password? <Link to="/login">Log In</Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
