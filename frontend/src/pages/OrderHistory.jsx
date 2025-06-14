import React, { useState, useEffect } from 'react';
import { useSettings } from '../context/SettingsContext';
import { useNavigate } from 'react-router-dom';

const OrderHistory = ({ userId, hideTitle }) => {
  const { user_id: contextUserId, loadingSettings } = useSettings();
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loadingOrders, setLoadingOrders] = useState(true);
  const [error, setError] = useState(null);

  // Use the userId prop if provided, otherwise fallback to contextUserId
  const currentUserId = userId || contextUserId;

  useEffect(() => {
    if (loadingSettings) {
      // Still loading settings, wait for user_id to be available
      return;
    }
    if (!currentUserId) {
      // If not logged in, redirect to login page (only if not getting userId via prop)
      if (!userId) { // Only navigate if this is the top-level OrderHistory page
        alert('Please log in to view your order history.');
        navigate('/login');
      }
      return;
    }

    const fetchOrders = async () => {
      setLoadingOrders(true);
      setError(null);
      try {
        const token = localStorage.getItem('token');
        // Always call /api/orders, no query param
        const response = await fetch(`/api/orders`, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({ message: 'Failed to parse error response.' }));
          throw new Error(errorData.message || 'Failed to fetch orders.');
        }
        const data = await response.json();
        setOrders(Array.isArray(data) ? data : []);
        console.log('Fetched orders:', data);
      } catch (err) {
        console.error('Error fetching orders:', err);
        setError(`Failed to load orders: ${err.message}`);
        setOrders([]); // Defensive: always set to array
      } finally {
        setLoadingOrders(false);
      }
    };

    fetchOrders();
  }, [currentUserId, loadingSettings, navigate, userId]);

  if (loadingOrders) {
    return <div style={{ textAlign: 'center', padding: '50px' }}>Loading order history...</div>;
  }

  if (error) {
    return <div style={{ textAlign: 'center', padding: '50px', color: 'red' }}>{error}</div>;
  }

  // Defensive: only map if orders is an array
  if (!Array.isArray(orders)) {
    return <div style={{ textAlign: 'center', padding: '50px', color: 'red' }}>Failed to load orders: Unexpected response format.</div>;
  }

  return (
    <div style={{
      maxWidth: '100%',
      margin: '0',
      padding: '0',
      backgroundColor: '#181818',
      boxShadow: 'none',
      color: '#fff'
    }}>
      {!hideTitle && (
        <h1 style={{ fontSize: '2em', marginBottom: '20px', textAlign: 'center', color: '#C2883A' }}>Your Order History</h1>
      )}

      {orders.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '50px', color: '#888' }}>
          <p style={{ fontSize: '1.2em', marginBottom: '20px' }}>You haven't placed any orders yet.</p>
        </div>
      ) : (
        <div>
          {orders.map(order => (
            <div key={order.order_id} style={{ marginBottom: '30px', border: '1px solid #333', borderRadius: '8px', padding: '20px', boxShadow: '0 1px 5px rgba(0,0,0,0.15)', backgroundColor: '#222' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px', paddingBottom: '15px', borderBottom: '1px solid #333' }}>
                <span style={{ fontSize: '1.1em', fontWeight: 'bold', color: '#C2883A' }}>Order #{order.order_id}</span>
                <span style={{ fontSize: '1.1em', fontWeight: 'bold', color: '#fff' }}>Total: ${parseFloat(order.total_price).toFixed(2)}</span>
              </div>
              <p style={{ margin: '0 0 10px 0', color: '#888' }}>Date: {new Date(order.date).toLocaleDateString()} {new Date(order.date).toLocaleTimeString()}</p>
              <p style={{ margin: '0 0 15px 0', color: '#888' }}>Status: <span style={{ color: order.status === 'pending' ? '#ffc107' : '#28a745', fontWeight: 'bold', textTransform: 'capitalize' }}>{order.status}</span></p>

              <h3 style={{ fontSize: '1.2em', marginBottom: '10px', color: '#C2883A' }}>Items:</h3>
              <ul style={{ listStyle: 'none', padding: '0' }}>
                {(Array.isArray(order.products) ? order.products : []).map(item => (
                  <li key={item.product_id} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px dashed #333', color: '#fff' }}>
                    <span>{item.name} (x{item.quantity})</span>
                    <span>${(parseFloat(item.price_at_order) * item.quantity).toFixed(2)}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrderHistory; 