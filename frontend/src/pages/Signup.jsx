// src/pages/Signup.jsx
import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { FaUser, FaEnvelope, FaPhone, FaCity, FaLock, FaEye, FaEyeSlash } from 'react-icons/fa';

function Signup() {
  const [form, setForm] = useState({
    name: '',
    lastName: '',
    email: '',
    phone: '',
    city: '',
    password: '',
    confirmPassword: '',
  });

  const [message, setMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    if (form.password !== form.confirmPassword) {
      setMessage('Passwords do not match!');
      return;
    }

    try {
      const res = await axios.post('/api/register', {
        name: form.name + ' ' + form.lastName,
        email: form.email,
        phone: form.phone,
        city: form.city,
        password: form.password,
      });
      setMessage(res.data.message);
      navigate('/login');
    } catch (err) {
      setMessage(err.response?.data?.message || 'Registration failed');
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
            maxWidth: '500px',
            textAlign: 'center',
            color: '#fff'
        }}>
            <h2 style={{
                fontSize: '1.8em',
                marginBottom: '10px',
                color: '#C2883A'
            }}>Create account</h2>
            <p style={{
                color: '#ccc',
                marginBottom: '30px',
                fontSize: '0.95em'
            }}>Enter your information to create your account</p>

            <form onSubmit={handleSubmit} style={{ textAlign: 'left' }}>
                <div style={{ display: 'flex', gap: '20px', marginBottom: '20px' }}>
                    <div style={{ position: 'relative', flex: 1 }}>
                        <FaUser style={{
                            position: 'absolute',
                            left: '15px',
                            top: '50%',
                            transform: 'translateY(-50%)',
                            color: '#C2883A'
                        }} />
                        <input
                            type="text"
                            name="name"
                            placeholder="First name"
                            value={form.name}
                            onChange={handleChange}
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
                    <div style={{ position: 'relative', flex: 1 }}>
                        <FaUser style={{
                            position: 'absolute',
                            left: '15px',
                            top: '50%',
                            transform: 'translateY(-50%)',
                            color: '#C2883A'
                        }} />
                        <input
                            type="text"
                            name="lastName"
                            placeholder="Last name"
                            value={form.lastName}
                            onChange={handleChange}
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
                </div>

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
                        name="email"
                        placeholder="Enter your email"
                        value={form.email}
                        onChange={handleChange}
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

                <div style={{ marginBottom: '20px', position: 'relative' }}>
                    <FaPhone style={{
                        position: 'absolute',
                        left: '15px',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        color: '#C2883A'
                    }} />
                    <input
                        type="text"
                        name="phone"
                        placeholder="Phone number"
                        value={form.phone}
                        onChange={handleChange}
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

                <div style={{ marginBottom: '20px', position: 'relative' }}>
                    <FaCity style={{
                        position: 'absolute',
                        left: '15px',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        color: '#C2883A'
                    }} />
                    <input
                        type="text"
                        name="city"
                        placeholder="City"
                        value={form.city}
                        onChange={handleChange}
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

                <div style={{ marginBottom: '20px', position: 'relative' }}>
                    <FaLock style={{
                        position: 'absolute',
                        left: '15px',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        color: '#C2883A'
                    }} />
                    <input
                        type={showPassword ? 'text' : 'password'}
                        name="password"
                        placeholder="Create a password"
                        value={form.password}
                        onChange={handleChange}
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
                    <span
                        onClick={() => setShowPassword(!showPassword)}
                        style={{
                            position: 'absolute',
                            right: '15px',
                            top: '50%',
                            transform: 'translateY(-50%)',
                            cursor: 'pointer',
                            color: '#C2883A'
                        }}
                    >
                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </span>
                </div>

                <div style={{ marginBottom: '30px', position: 'relative' }}>
                    <FaLock style={{
                        position: 'absolute',
                        left: '15px',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        color: '#C2883A'
                    }} />
                    <input
                        type={showConfirmPassword ? 'text' : 'password'}
                        name="confirmPassword"
                        placeholder="Confirm your password"
                        value={form.confirmPassword}
                        onChange={handleChange}
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
                    <span
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        style={{
                            position: 'absolute',
                            right: '15px',
                            top: '50%',
                            transform: 'translateY(-50%)',
                            cursor: 'pointer',
                            color: '#C2883A'
                        }}
                    >
                        {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                    </span>
                </div>

                {message && <p style={{ color: message.includes('match') || message.includes('failed') ? 'red' : 'green', marginBottom: '15px' }}>{message}</p>}

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
                    onMouseOver={(e) => e.target.style.backgroundColor = '#A8702A'}
                    onMouseOut={(e) => e.target.style.backgroundColor = '#C2883A'}
                >
                    Create account
                </button>
            </form>

            <div style={{ marginTop: '25px', fontSize: '0.95em', color: '#ccc' }}>
                Already have an account? <Link to="/login" style={{
                    color: '#C2883A',
                    textDecoration: 'none',
                    transition: 'color 0.3s'
                }}
                onMouseOver={(e) => e.target.style.color = '#A8702A'}
                onMouseOut={(e) => e.target.style.color = '#C2883A'}
                >Sign in</Link>
            </div>
        </div>
    </div>
  );
}

export default Signup;
