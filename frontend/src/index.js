import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router, useLocation } from 'react-router-dom';
import { SettingsProvider } from './context/SettingsContext';
import { CartProvider } from './context/CartContext';

// New component to handle useLocation within Router context and pass down props
function RootWrapper() {
  const location = useLocation();
  const isManagerRoute = location.pathname.startsWith('/manager');

  console.log('RootWrapper - location.pathname:', location.pathname);
  console.log('RootWrapper - isManagerRoute:', isManagerRoute);

  return (
    <SettingsProvider>
      <CartProvider>
        <App isManagerRoute={isManagerRoute} />
      </CartProvider>
    </SettingsProvider>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <RootWrapper />
    </Router>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
