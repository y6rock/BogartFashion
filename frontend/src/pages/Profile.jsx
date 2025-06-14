import React, { useState, useEffect } from 'react';
import { useSettings } from '../context/SettingsContext';
import { useNavigate } from 'react-router-dom';
import OrderHistory from './OrderHistory'; // Import OrderHistory component
import { FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt, FaCamera } from 'react-icons/fa'; // Import icons
import axios from 'axios';

const Profile = () => {
  const { user_id, username, loadingSettings } = useSettings();
  const navigate = useNavigate();
  const [profileData, setProfileData] = useState({
    name: username || '',
    email: '', // Will fetch from backend
    phone: '', // Will fetch from backend
    address: '', // Will fetch from backend
    profilePic: 'https://via.placeholder.com/150' // Default placeholder
  });
  const [loadingProfile, setLoadingProfile] = useState(true);
  const [profileError, setProfileError] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const [activeTab, setActiveTab] = useState('profile');

  useEffect(() => {
    if (loadingSettings) {
      return; // Wait for settings to load
    }
    if (!user_id) {
      alert('Please log in to view your profile.');
      navigate('/login');
      return;
    }

    const fetchProfileData = async () => {
      setLoadingProfile(true);
      setProfileError(null);
      try {
        const token = localStorage.getItem('token');
        const response = await fetch(`/api/profile/${user_id}`, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({ message: 'Failed to parse error response.' }));
          throw new Error(errorData.message || 'Failed to fetch profile data.');
        }
        const data = await response.json();
        console.log('Fetched profile data:', data);
        setProfileData(prev => ({
          ...prev,
          name: data.name || prev.name,
          email: data.email || '',
          phone: data.phone || '',
          address: data.city || '', // Assuming 'city' from DB maps to 'address' for simplicity
          profilePic: data.profile_image || prev.profilePic
        }));
      } catch (err) {
        console.error('Error fetching profile data:', err);
        setProfileError(`Failed to load profile: ${err.message}`);
      } finally {
        setLoadingProfile(false);
      }
    };

    fetchProfileData();
  }, [user_id, loadingSettings, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageFileChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
    if (file) {
      setImagePreview(URL.createObjectURL(file));
    } else {
      setImagePreview('');
    }
  };

  const handleUpdateProfile = async () => {
    try {
      let profile_image = profileData.profilePic;
      if (imageFile) {
        const data = new FormData();
        data.append('image', imageFile);
        const token = localStorage.getItem('token');
        const uploadRes = await axios.post('/api/upload-image', data, {
          headers: { 'Content-Type': 'multipart/form-data', Authorization: `Bearer ${token}` }
        });
        profile_image = uploadRes.data.imageUrl;
        setProfileData(prev => ({ ...prev, profilePic: profile_image }));
        setImageFile(null);
        setImagePreview('');
      }
      const token = localStorage.getItem('token');
      await axios.put(`/api/profile/${user_id}`, {
        name: profileData.name,
        phone: profileData.phone,
        city: profileData.address,
        profile_image
      }, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      alert('Profile updated successfully!');
    } catch (error) {
      console.error('Error updating profile:', error);
      alert(`Error updating profile: ${error.response?.data?.message || error.message}`);
    }
  };

  // Helper to get the correct profile image URL
  const getProfilePicUrl = (pic) => {
    if (!pic) return 'https://via.placeholder.com/150';
    if (pic.startsWith('/uploads')) return `http://localhost:3001${pic}`;
    return pic;
  };

  if (loadingProfile || loadingSettings) {
    return <div style={{ textAlign: 'center', padding: '50px' }}>Loading profile...</div>;
  }

  if (profileError) {
    return <div style={{ textAlign: 'center', padding: '50px', color: 'red' }}>{profileError}</div>;
  }

  return (
    <div style={{ maxWidth: '1200px', margin: '20px auto', padding: '20px 8px', backgroundColor: '#181818', borderRadius: '8px', boxShadow: '0 4px 15px rgba(0,0,0,0.3)' }}>
      {/* Tab Navigation */}
      <div style={{ display: 'flex', justifyContent: 'center', borderBottom: '2px solid #333', marginBottom: '24px', background: '#181818' }}>
        <div style={{ display: 'flex', gap: '0', background: '#181818', borderRadius: '8px 8px 0 0', boxShadow: '0 1px 4px rgba(0,0,0,0.15)', maxWidth: '420px', width: '100%' }}>
          <button
            onClick={() => setActiveTab('profile')}
            style={{
              padding: '16px 36px',
              background: activeTab === 'profile' ? '#222' : 'transparent',
              border: 'none',
              borderBottom: activeTab === 'profile' ? '3px solid #C2883A' : '3px solid transparent',
              color: activeTab === 'profile' ? '#C2883A' : '#fff',
              fontWeight: 'bold',
              fontSize: '1.1em',
              cursor: 'pointer',
              outline: 'none',
              transition: 'all 0.2s',
              borderRadius: '8px 8px 0 0',
              marginRight: '2px',
              minWidth: '120px',
            }}
          >Profile</button>
          <button
            onClick={() => setActiveTab('orders')}
            style={{
              padding: '16px 36px',
              background: activeTab === 'orders' ? '#222' : 'transparent',
              border: 'none',
              borderBottom: activeTab === 'orders' ? '3px solid #C2883A' : '3px solid transparent',
              color: activeTab === 'orders' ? '#C2883A' : '#fff',
              fontWeight: 'bold',
              fontSize: '1.1em',
              cursor: 'pointer',
              outline: 'none',
              transition: 'all 0.2s',
              borderRadius: '8px 8px 0 0',
              minWidth: '120px',
            }}
          >Order History</button>
        </div>
      </div>
      {/* Tab Content */}
      {activeTab === 'profile' && (
        <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap', minWidth: 0, justifyContent: 'center', maxWidth: '900px', width: '100%', margin: '0 auto' }}>
          {/* Profile Picture Section */}
          <div style={{ flex: '1 1 340px', maxWidth: '400px', backgroundColor: '#222', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 5px rgba(0,0,0,0.15)', textAlign: 'center', margin: '0 8px', boxSizing: 'border-box', minWidth: '220px', border: '1px solid #333', color: '#fff' }}>
            <h2 style={{ fontSize: '1.5em', marginBottom: '20px', color: '#C2883A' }}><FaCamera style={{ marginRight: '10px' }} />Profile Picture</h2>
            <div style={{ width: '150px', height: '150px', borderRadius: '50%', overflow: 'hidden', margin: '0 auto 20px auto', border: '3px solid #C2883A', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#181818' }}>
              <img src={getProfilePicUrl(imagePreview || profileData.profilePic)} alt="Profile" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
            <input type="file" accept="image/*" onChange={handleImageFileChange} style={{ margin: '10px 0', color: '#fff' }} />
            <h3 style={{ margin: '10px 0 5px 0', fontSize: '1.2em', color: '#fff' }}>{profileData.name}</h3>
            <p style={{ margin: '0', color: '#C2883A', fontSize: '0.9em' }}>{profileData.email}</p>
          </div>
          {/* Personal Information Section */}
          <div style={{
            flex: '1 1 340px',
            maxWidth: '400px',
            backgroundColor: '#222',
            padding: '32px',
            borderRadius: '12px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
            margin: '0 8px 20px 8px',
            minWidth: '220px',
            border: '1px solid #333',
            color: '#fff',
            display: 'flex',
            flexDirection: 'column',
            gap: '18px'
          }}>
            <h2 style={{ fontSize: '1.5em', marginBottom: '20px', color: '#C2883A', display: 'flex', alignItems: 'center' }}><FaUser style={{ marginRight: '10px' }} />Personal Information</h2>
            <label style={{ color: '#C2883A', fontWeight: 'bold', marginBottom: '5px' }}>Full Name</label>
            <div style={{ position: 'relative', marginBottom: '10px' }}>
              <FaUser style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#C2883A' }} />
              <input name="name" value={profileData.name} onChange={handleChange} style={{ width: '100%', padding: '10px 10px 10px 38px', border: '1px solid #444', borderRadius: '5px', background: '#181818', color: '#fff' }} />
            </div>
            <label style={{ color: '#C2883A', fontWeight: 'bold', marginBottom: '5px' }}>Email Address</label>
            <div style={{ position: 'relative', marginBottom: '10px' }}>
              <FaEnvelope style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#C2883A' }} />
              <input name="email" value={profileData.email} disabled style={{ width: '100%', padding: '10px 10px 10px 38px', border: '1px solid #444', borderRadius: '5px', background: '#181818', color: '#fff' }} />
            </div>
            <label style={{ color: '#C2883A', fontWeight: 'bold', marginBottom: '5px' }}>Phone Number</label>
            <div style={{ position: 'relative', marginBottom: '10px' }}>
              <FaPhone style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#C2883A' }} />
              <input name="phone" value={profileData.phone} onChange={handleChange} style={{ width: '100%', padding: '10px 10px 10px 38px', border: '1px solid #444', borderRadius: '5px', background: '#181818', color: '#fff' }} />
            </div>
            <label style={{ color: '#C2883A', fontWeight: 'bold', marginBottom: '5px' }}>Address</label>
            <div style={{ position: 'relative', marginBottom: '10px' }}>
              <FaMapMarkerAlt style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#C2883A' }} />
              <input name="address" value={profileData.address} onChange={handleChange} style={{ width: '100%', padding: '10px 10px 10px 38px', border: '1px solid #444', borderRadius: '5px', background: '#181818', color: '#fff' }} />
            </div>
            <button onClick={handleUpdateProfile} style={{ padding: '14px', backgroundColor: '#C2883A', color: '#fff', border: 'none', borderRadius: '6px', fontWeight: 'bold', fontSize: '1.1em', marginTop: '10px', cursor: 'pointer' }}>Update Profile</button>
          </div>
        </div>
      )}
      {activeTab === 'orders' && (
        <div style={{ background: '#181818', padding: '32px', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.15)', border: '1px solid #333', color: '#fff', maxWidth: '900px', width: '100%', margin: '0 auto' }}>
          <OrderHistory hideTitle />
        </div>
      )}
    </div>
  );
};

export default Profile; 