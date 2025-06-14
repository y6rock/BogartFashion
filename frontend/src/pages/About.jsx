import React from 'react';
import { FaShieldAlt, FaDollarSign } from 'react-icons/fa'; // Assuming you have react-icons installed
import laptopsImage from '../assets/images/laptops.jpeg'; // Import the laptops image

const About = () => {
  return (
    <div style={{ fontFamily: 'Arial, sans-serif', backgroundColor: '#111', color: '#fff' }}>
      {/* Hero Section */}
      <section style={{
        background: '#222',
        color: '#fff',
        textAlign: 'center',
        padding: '60px 20px',
        marginBottom: '40px',
        boxShadow: '0 4px 10px rgba(0,0,0,0.1)'
      }}>
        <h1 style={{ fontSize: '2.5em', marginBottom: '10px', fontWeight: 'bold', color: '#C2883A' }}>About BogartFashion</h1>
        <p style={{ fontSize: '1.1em', maxWidth: '700px', margin: '0 auto', color: '#fff' }}>
          Welcome to BogartFashion, your destination for premium style and timeless elegance. We curate the latest trends and classic essentials, ensuring every piece reflects sophistication, quality, and innovation in fashion. Discover collections designed to empower your individuality and elevate your wardrobe.
        </p>
      </section>

      {/* Our Story Section */}
      <section style={{ maxWidth: '1200px', margin: '0 auto 60px auto', padding: '0 20px' }}>
        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '40px' }}>
          <div style={{ flex: 1 }}>
            <h2 style={{ fontSize: '2em', marginBottom: '20px', color: '#C2883A' }}>Our Story</h2>
            <p style={{ lineHeight: '1.8', marginBottom: '15px' }}>
              Founded in 2018, BogartFashion began with a vision: to bring timeless elegance and modern style to fashion lovers everywhere. Our journey started with a passion for quality fabrics, unique designs, and empowering self-expression through clothing.
            </p>
            <p style={{ lineHeight: '1.8', marginBottom: '15px' }}>
              What started as a small online boutique has blossomed into a trusted destination for premium fashion, serving style-conscious customers nationwide. Our commitment to craftsmanship and customer satisfaction is woven into every collection we create.
            </p>
            <p style={{ lineHeight: '1.8' }}>
              Today, BogartFashion offers a carefully curated selection of apparel and accessories for every occasion. Each piece is chosen for its quality, versatility, and ability to inspire confidence and individuality.
            </p>
          </div>
          <div style={{ flex: 2, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            {/* Replace with a fashion-related image */}
            <div style={{ width: '320px', height: '220px', background: '#222', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#C2883A', fontSize: '1.2em', fontStyle: 'italic' }}>
              Fashion Image
            </div>
          </div>
        </div>
      </section>

      {/* Our Values Section */}
      <section style={{ backgroundColor: '#181818', padding: '60px 20px', textAlign: 'center' }}>
        <h2 style={{ fontSize: '2em', marginBottom: '40px', color: '#C2883A' }}>Our Values</h2>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '30px', flexWrap: 'wrap' }}>
          {/* Quality Card */}
          <div style={{
            backgroundColor: '#222',
            padding: '30px',
            borderRadius: '10px',
            boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
            flexBasis: '300px',
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}>
            <FaShieldAlt size={40} color="#C2883A" style={{ marginBottom: '20px' }} />
            <h3 style={{ fontSize: '1.5em', marginBottom: '10px', color: '#fff' }}>Quality</h3>
            <p style={{ lineHeight: '1.6', color: '#ccc' }}>
              Every garment is crafted with meticulous attention to detail, using only the finest materials. We believe in delivering fashion that stands the test of time.
            </p>
          </div>
          {/* Value Card */}
          <div style={{
            backgroundColor: '#222',
            padding: '30px',
            borderRadius: '10px',
            boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
            flexBasis: '300px',
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}>
            <FaDollarSign size={40} color="#C2883A" style={{ marginBottom: '20px' }} />
            <h3 style={{ fontSize: '1.5em', marginBottom: '10px', color: '#fff' }}>Individuality</h3>
            <p style={{ lineHeight: '1.6', color: '#ccc' }}>
              Fashion is personal. Our collections are designed to empower you to express your unique style, with versatile pieces for every occasion.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;