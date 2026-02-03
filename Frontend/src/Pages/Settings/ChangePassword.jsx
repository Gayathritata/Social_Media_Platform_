import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Lock, Save } from 'lucide-react';
import './ChangePassword.css';

export default function ChangePassword() {
    const navigate = useNavigate();
    const [passwords, setPasswords] = useState({
        oldPassword: '',
        newPassword: '',
        confirmPassword: ''
    });

    const handleChange = (e) => {
        setPasswords({ ...passwords, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (passwords.newPassword !== passwords.confirmPassword) {
            alert("Passwords do not match!");
            return;
        }
        alert("Password updated successfully!");
        navigate('/settings');
    };

    return (
        <div className="change-password-page">
            <div className="cp-header">
                <ArrowLeft className="back-arrow" size={24} onClick={() => navigate('/settings')} />
                <h2 className="page-title">Change Password</h2>
            </div>

            <form className="cp-form" onSubmit={handleSubmit}>
                <div className="input-group">
                    <label><Lock size={18} /> Current Password</label>
                    <input
                        type="password"
                        name="oldPassword"
                        placeholder="Enter current password"
                        value={passwords.oldPassword}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="input-group">
                    <label><Lock size={18} /> New Password</label>
                    <input
                        type="password"
                        name="newPassword"
                        placeholder="Enter new password"
                        value={passwords.newPassword}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="input-group">
                    <label><Lock size={18} /> Confirm New Password</label>
                    <input
                        type="password"
                        name="confirmPassword"
                        placeholder="Confirm new password"
                        value={passwords.confirmPassword}
                        onChange={handleChange}
                        required
                    />
                </div>

                <button type="submit" className="save-btn">
                    <Save size={20} /> Update Password
                </button>
            </form>
        </div>
    );
}
