import React, { useState } from 'react';

export default function Contact() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('');
    setLoading(true);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, message })
      });
      const data = await res.json();
      if (res.ok) {
        setStatus('Your message has been sent successfully!');
        setName(''); setEmail(''); setMessage('');
      } else {
        setStatus(data.message || 'Failed to send message.');
      }
    } catch (err) {
      setStatus('Failed to send message. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ fontFamily: 'Arial', background: '#111', minHeight: '100vh', color: '#fff' }}>
      {/* Gold Header */}
      <div style={{ background: '#222', color: '#C2883A', padding: '40px 0', textAlign: 'center' }}>
        <h2 style={{ fontSize: '2.5em', margin: 0 }}>Contact Us</h2>
        <p style={{ fontSize: '1.2em', marginTop: '10px', color: '#fff' }}>
          Have questions about our products or services? Our team is here to help you.
        </p>
      </div>

      {/* Contact Information Section */}
      <div style={{ maxWidth: 1000, margin: '40px auto 0', background: '#181818', borderRadius: 12, boxShadow: '0 2px 8px rgba(0,0,0,0.15)', padding: '40px 30px', color: '#fff' }}>
        <h3 style={{ textAlign: 'center', marginBottom: 30, fontSize: '1.7em', color: '#C2883A' }}>Contact Information</h3>
        <div style={{ display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap', gap: 30 }}>
          {/* Location */}
          <div style={{ flex: '1 1 250px', textAlign: 'center' }}>
            <div style={{ fontSize: '2em', marginBottom: 10 }}>📍</div>
            <div style={{ fontWeight: 'bold', marginBottom: 5, color: '#C2883A' }}>Our Location</div>
            <div>123 Fashion Avenue<br/>New York, NY 10001<br/>United States</div>
          </div>
          {/* Email */}
          <div style={{ flex: '1 1 250px', textAlign: 'center' }}>
            <div style={{ fontSize: '2em', marginBottom: 10 }}>✉️</div>
            <div style={{ fontWeight: 'bold', marginBottom: 5, color: '#C2883A' }}>Email Us</div>
            <div>support@bogartfashion.com<br/>sales@bogartfashion.com</div>
          </div>
          {/* Phone */}
          <div style={{ flex: '1 1 250px', textAlign: 'center' }}>
            <div style={{ fontSize: '2em', marginBottom: 10 }}>📞</div>
            <div style={{ fontWeight: 'bold', marginBottom: 5, color: '#C2883A' }}>Call Us</div>
            <div>Customer Support: (223) 456-7890<br/>Sales Inquiries: (712) 654-7891</div>
          </div>
        </div>
      </div>

      {/* Contact Form */}
      <form onSubmit={handleSubmit} style={{ maxWidth: '500px', margin: '40px auto', background: '#181818', borderRadius: 12, boxShadow: '0 2px 8px rgba(0,0,0,0.15)', padding: '30px 25px', color: '#fff' }}>
        <h3 style={{ textAlign: 'center', marginBottom: 20, color: '#C2883A' }}>Send Us a Message</h3>
        <input
          placeholder="Your Name"
          value={name}
          onChange={e => setName(e.target.value)}
          style={{ width: '100%', padding: '10px', marginBottom: '10px', borderRadius: 6, border: '1px solid #444', background: '#222', color: '#fff' }}
          required
        />
        <input
          placeholder="Email"
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          style={{ width: '100%', padding: '10px', marginBottom: '10px', borderRadius: 6, border: '1px solid #444', background: '#222', color: '#fff' }}
          required
        />
        <textarea
          placeholder="Message"
          rows="5"
          value={message}
          onChange={e => setMessage(e.target.value)}
          style={{ width: '100%', padding: '10px', borderRadius: 6, border: '1px solid #444', background: '#222', color: '#fff' }}
          required
        ></textarea>
        <button
          type="submit"
          style={{ marginTop: '10px', padding: '10px 20px', backgroundColor: '#C2883A', color: '#fff', border: 'none', borderRadius: 6, width: '100%', fontWeight: 'bold', fontSize: '1em', transition: 'background 0.2s' }}
          disabled={loading}
        >
          {loading ? 'Sending...' : 'Send'}
        </button>
        {status && <div style={{ marginTop: 15, color: status.includes('successfully') ? '#C2883A' : 'red', textAlign: 'center' }}>{status}</div>}
      </form>
    </div>
  );
}