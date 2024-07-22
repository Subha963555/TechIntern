import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';

const Dashboard = () => {
  const [user, setUser] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch('http://localhost:3001/profile', {
          method: 'GET',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          }
        });

        if (response.ok) {
          const data = await response.json();
          setUser(data);
        } else if (response.status === 401) {
          // Unauthorized, navigate to login
          navigate('/login');
        } else {
          console.error('Failed to fetch profile');
          // Handle other potential errors or fallback
        }
      } catch (error) {
        console.error('Error fetching profile:', error);
        navigate('/login');
      }
    };

    fetchProfile();
  }, [navigate]);

  return (
    <div className="dashboard-page">
      <header className="dashboard-header">
        <h1 className="header-title">Dashboard</h1>
        <p className="header-subtitle">Manage your personal details</p>
      </header>

      <main className="main-content">
        <section className="profile-section">
          <h2 className="section-title">Personal Details</h2>
          <div className="profile-details">
            <div className="profile-info">
              <strong>Username:</strong> {user.nam || 'N/A'}
            </div>
            <div className="profile-info">
              <strong>Email:</strong> {user.email || 'N/A'}
            </div>
            <div className="profile-info">
              <strong>Age:</strong> {user.age || 'N/A'}
            </div>
            <div className="profile-info">
              <strong>Date of Birth:</strong> {user.dob ? new Date(user.dob).toLocaleDateString() : 'N/A'}
            </div>
            <div className="profile-info">
              <strong>Image URL:</strong> 
              {user.image ? (
                <img src={user.image} alt="Profile" className="profile-image" />
              ) : (
                'N/A'
              )}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Dashboard;
