import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { FaEnvelope, FaLock, FaEye, FaEyeSlash } from 'react-icons/fa'; // Import icons

function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [message, setMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false); // State for password visibility
  const navigate = useNavigate();

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setMessage(''); // Clear previous messages
    try {
      const res = await axios.post('/api/login', form);
      localStorage.setItem('token', res.data.token);
      
      // Dispatch a storage event to notify other components
      window.dispatchEvent(new Event('storage'));

      setMessage(res.data.message);
      navigate('/manager/dashboard'); // ✅ ניתוב אוטומטי לדשבורד
    } catch (err) {
      setMessage(err.response?.data?.message || 'Login failed');
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
            }}>Sign in</h2>
            <p style={{
                color: '#ccc',
                marginBottom: '30px',
                fontSize: '0.95em'
            }}>Enter your email and password to access your account</p>

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

                <div style={{ marginBottom: '10px', position: 'relative' }}>
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
                        placeholder="Enter your password"
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

                <div style={{ textAlign: 'right', marginBottom: '20px' }}>
                    <Link to="/forgot-password" style={{
                        color: '#C2883A',
                        textDecoration: 'none',
                        fontSize: '0.9em',
                        transition: 'color 0.3s'
                    }}
                    onMouseOver={(e) => e.target.style.color = '#fff'}
                    onMouseOut={(e) => e.target.style.color = '#C2883A'}
                    >
                        Forgot your password?
                    </Link>
                </div>

                {message && <p style={{ color: message.includes('failed') ? 'red' : '#C2883A', marginBottom: '15px' }}>{message}</p>}

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
                    Sign in
                </button>
            </form>

            <div style={{ marginTop: '25px', fontSize: '0.95em', color: '#ccc' }}>
                Don't have an account? <Link to="/register" style={{
                    color: '#C2883A',
                    textDecoration: 'none',
                    transition: 'color 0.3s'
                }}
                onMouseOver={(e) => e.target.style.color = '#fff'}
                onMouseOut={(e) => e.target.style.color = '#C2883A'}
                >Sign up</Link>
            </div>
        </div>
    </div>
  );
}

export default Login;
