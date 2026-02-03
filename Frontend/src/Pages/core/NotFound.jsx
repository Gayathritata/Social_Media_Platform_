import React from 'react';
import { Link } from 'react-router-dom';
import AppLayout from '../../Components/global/AppLayout';

export default function NotFound() {
    return (
        <AppLayout>
            <div style={{ textAlign: 'center', padding: '100px 20px' }}>
                <h1 style={{ fontSize: '72px', color: '#3b82f6' }}>404</h1>
                <h2>Page Not Found</h2>
                <p style={{ color: '#64748b', margin: '20px 0' }}>The page you are looking for doesn't exist or has been moved.</p>
                <Link to="/home" style={{
                    padding: '12px 24px',
                    backgroundColor: '#3b82f6',
                    color: 'white',
                    textDecoration: 'none',
                    borderRadius: '8px',
                    fontWeight: '600'
                }}>
                    Return Home
                </Link>
            </div>
        </AppLayout>
    );
}
