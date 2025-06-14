import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaEnvelope } from 'react-icons/fa'; // Assuming you have react-icons installed

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');
        setError('');

        if (!email) {
            setError('Please enter your email address.');
            return;
        }

        try {
            // Placeholder for API call to send reset link
            // const response = await fetch('/api/forgot-password', {
            //     method: 'POST',
            //     headers: {
            //         'Content-Type': 'application/json',
            //     },
            //     body: JSON.stringify({ email }),
            // });

            // const data = await response.json();

            // if (response.ok) {
            //     setMessage(data.message || 'If an account with that email exists, a password reset link has been sent.');
            // } else {
            //     setError(data.message || 'Failed to send reset link. Please try again.');
            // }
            setMessage('If an account with that email exists, a password reset link has been sent.');
        } catch (err) {
            console.error('Forgot password error:', err);
            setError('An unexpected error occurred. Please try again later.');
        }
    };

    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '100vh',
            background: '#111',
            padding: '20px',
            boxSizing: 'border-box'
        }}>
            <div style={{
                background: '#222',
                padding: '40px',
                borderRadius: '8px',
                boxShadow: '0 4px 15px rgba(0, 0, 0, 0.3)',
                width: '100%',
                maxWidth: '400px',
                textAlign: 'center',
                color: '#fff'
            }}>
                <h2 style={{
                    fontSize: '1.8em',
                    marginBottom: '10px',
                    color: '#C2883A'
                }}>Forgot password?</h2>
                <p style={{
                    color: '#ccc',
                    marginBottom: '30px',
                    fontSize: '0.95em'
                }}>Enter your email address and we'll send you a link to reset your password</p>

                <form onSubmit={handleSubmit} style={{ textAlign: 'left' }}>
                    <div style={{ marginBottom: '20px', position: 'relative' }}>
                        <FaEnvelope style={{
                            position: 'absolute',
                            left: '15px',
                            top: '50%',
                            transform: 'translateY(-50%)',
                            color: '#C2883A'
                        }} />
                        <input
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            style={{
                                width: 'calc(100% - 30px)',
                                padding: '12px 15px 12px 45px',
                                border: '1px solid #444',
                                background: '#181818',
                                color: '#fff',
                                borderRadius: '5px',
                                fontSize: '1em',
                                boxSizing: 'border-box',
                                transition: 'border-color 0.3s'
                            }}
                            onFocus={(e) => e.target.style.borderColor = '#C2883A'}
                            onBlur={(e) => e.target.style.borderColor = '#444'}
                            required
                        />
                    </div>

                    {message && <p style={{ color: '#C2883A', marginBottom: '15px' }}>{message}</p>}
                    {error && <p style={{ color: 'red', marginBottom: '15px' }}>{error}</p>}

                    <button
                        type="submit"
                        style={{
                            width: '100%',
                            padding: '12px',
                            background: '#C2883A',
                            color: '#fff',
                            border: 'none',
                            borderRadius: '5px',
                            fontSize: '1.1em',
                            cursor: 'pointer',
                            transition: 'background-color 0.3s',
                            boxSizing: 'border-box'
                        }}
                        onMouseOver={(e) => e.target.style.backgroundColor = '#a06a28'}
                        onMouseOut={(e) => e.target.style.backgroundColor = '#C2883A'}
                    >
                        Send reset link
                    </button>
                </form>

                <div style={{ marginTop: '25px' }}>
                    <Link to="/login" style={{
                        color: '#C2883A',
                        textDecoration: 'none',
                        fontSize: '0.95em',
                        transition: 'color 0.3s'
                    }}
                    onMouseOver={(e) => e.target.style.color = '#fff'}
                    onMouseOut={(e) => e.target.style.color = '#C2883A'}
                    >
                        ← Back to sign in
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default ForgotPassword; 