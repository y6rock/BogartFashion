import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Sidebar = () => {
    const location = useLocation();

    const linkStyle = (path) => ({
        display: 'block',
        padding: '10px 20px',
        color: location.pathname === path ? '#C2883A' : '#fff',
        textDecoration: 'none',
        fontWeight: location.pathname === path ? 'bold' : 'normal',
        backgroundColor: location.pathname === path ? '#181818' : 'transparent',
        borderRadius: '5px',
        marginBottom: '5px',
        transition: 'all 0.2s ease-in-out',
    });

    return (
        <div style={{
            width: '220px',
            backgroundColor: '#111',
            padding: '20px',
            borderRight: '1px solid #333',
            position: 'fixed',
            height: '100%',
            overflowY: 'auto',
            boxShadow: '2px 0 5px rgba(0,0,0,0.15)',
        }}>
            <h3 style={{ marginTop: '0', marginBottom: '20px', color: '#C2883A' }}>Admin Panel</h3>
            <nav>
                <Link to="/manager/dashboard" style={linkStyle('/manager/dashboard')}>Dashboard</Link>
                <Link to="/manager/products" style={linkStyle('/manager/products')}>Products</Link>
                <Link to="/manager/customers" style={linkStyle('/manager/customers')}>Customers</Link>
                <Link to="/manager/categories" style={linkStyle('/manager/categories')}>Categories</Link>
                <Link to="/manager/suppliers" style={linkStyle('/manager/suppliers')}>Suppliers</Link>
                <Link to="/manager/settings" style={linkStyle('/manager/settings')}>Settings</Link>
            </nav>
        </div>
    );
};

export default Sidebar; 