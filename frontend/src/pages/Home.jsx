import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

// Import category images
import laptopsImage from '../assets/images/laptops.jpeg';
import smartphonesImage from '../assets/images/smartphones.jpg';
import desktopsImage from '../assets/images/desktops.jpeg';
import gamingMouseImage from '../assets/images/gaming_mouse.jpg';
import keyboardsImage from '../assets/images/keyboards.jpg';
import monitorsImage from '../assets/images/monitors.jpeg';

// Import fashion images or use placeholders
const dressesImage = 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=600&q=80';
const shoesImage = 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=600&q=80';
const accessoriesImage = 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=600&q=80';
const outerwearImage = 'https://images.unsplash.com/photo-1469398715555-76331a6c7c9b?auto=format&fit=crop&w=600&q=80';
const handbagsImage = 'https://images.unsplash.com/photo-1514995669114-d1c1b7a83a48?auto=format&fit=crop&w=600&q=80';
const jewelryImage = 'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=600&q=80';

const Home = () => {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const categoriesRes = await axios.get('/api/categories');
        const productsRes = await axios.get('/api/products');
        
        setCategories(categoriesRes.data);
        setProducts(productsRes.data);
      } catch (err) {
        console.error('Error fetching data for home page:', err);
        setError('Failed to load content. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return <div style={{ textAlign: 'center', padding: '50px' }}>Loading content...</div>;
  }

  if (error) {
    return <div style={{ textAlign: 'center', padding: '50px', color: 'red' }}>{error}</div>;
  }

  // Group products by category for display
  const productsByCategory = categories.reduce((acc, category) => {
    acc[category.name] = products.filter(product => product.category_id === category.category_id);
    return acc;
  }, {});

  // Dummy data for categories that might not have products or for display purposes
  const displayCategories = [
    { name: 'Dresses', description: 'Elegant and trendy dresses for every occasion, from casual daywear to glamorous evening looks.', imageUrl: dressesImage },
    { name: 'Shoes', description: 'Step out in style with our curated collection of fashionable shoes, including heels, boots, and sneakers.', imageUrl: shoesImage },
    { name: 'Accessories', description: 'Complete your outfit with statement accessories: scarves, hats, belts, and more.', imageUrl: accessoriesImage },
    { name: 'Outerwear', description: 'Stay chic and warm with our selection of coats, jackets, and blazers for all seasons.', imageUrl: outerwearImage },
    { name: 'Handbags', description: 'Discover designer handbags and purses to elevate your everyday and special occasion looks.', imageUrl: handbagsImage },
    { name: 'Jewelry', description: 'Add a touch of sparkle with our range of necklaces, earrings, bracelets, and rings.', imageUrl: jewelryImage },
  ];

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', backgroundColor: '#111' }}>
      {/* Hero Section */}
      <section style={{
        background: '#222',
        color: '#fff',
        textAlign: 'center',
        padding: '80px 20px',
        borderRadius: '0 0 15px 15px',
        marginBottom: '40px',
        boxShadow: '0 4px 10px rgba(0,0,0,0.1)'
      }}>
        <h1 style={{ fontSize: '3.5em', marginBottom: '15px', fontWeight: 'bold', color: '#C2883A' }}>Fashion for Every Story</h1>
        <p style={{ fontSize: '1.2em', marginBottom: '30px', maxWidth: '600px', margin: '0 auto 30px auto', color: '#fff' }}>Discover the latest trends, timeless classics, and must-have pieces to express your unique style.</p>
        <Link to="/products" style={{
          display: 'inline-block',
          padding: '12px 30px',
          backgroundColor: '#C2883A',
          color: '#fff',
          textDecoration: 'none',
          borderRadius: '5px',
          fontWeight: 'bold',
          transition: 'background-color 0.3s ease, color 0.3s ease',
          boxShadow: '0 2px 5px rgba(0,0,0,0.2)'
        }}
        onMouseOver={(e) => e.target.style.backgroundColor = '#a06a28'}
        onMouseOut={(e) => e.target.style.backgroundColor = '#C2883A'}
        >
          Shop Fashion
        </Link>
      </section>

      {/* Product Categories Section */}
      <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
        {displayCategories.map((category, index) => (
          <div key={category.name} style={{
            display: 'flex',
            flexDirection: index % 2 === 0 ? 'row' : 'row-reverse', // Alternate image/text order
            alignItems: 'center',
            marginBottom: '60px',
            backgroundColor: '#fff',
            borderRadius: '10px',
            boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
            overflow: 'hidden',
            padding: '20px'
          }}>
            <div style={{
              flex: 1,
              padding: '30px',
              textAlign: index % 2 === 0 ? 'left' : 'right'
            }}>
              <h2 style={{ fontSize: '2em', marginBottom: '10px', color: '#333' }}>{category.name}</h2>
              <p style={{ color: '#666', marginBottom: '20px', lineHeight: '1.6' }}>{category.description}</p>
              <Link to={`/products?category=${category.name}`} style={{
                display: 'inline-block',
                padding: '10px 20px',
                backgroundColor: '#ff9900',
                color: '#fff',
                textDecoration: 'none',
                borderRadius: '5px',
                fontWeight: 'bold',
                transition: 'background-color 0.3s ease',
              }}
              onMouseOver={(e) => e.target.style.backgroundColor = '#e68a00'}
              onMouseOut={(e) => e.target.style.backgroundColor = '#ff9900'}
              >
                Explore {category.name.split(' ')[0]}
              </Link>
            </div>
            <div style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <img src={category.imageUrl} alt={category.name} style={{ maxWidth: '100%', height: 'auto', borderRadius: '8px' }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;