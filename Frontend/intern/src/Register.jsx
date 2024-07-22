import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import '@fortawesome/fontawesome-free/css/all.min.css';
import './register.css'; // Ensure this file contains appropriate styling

const Register = () => {
  const [nam, setNam] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [age, setAge] = useState('');
  const [dob, setDob] = useState('');
  const [image, setImage] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    const userData = { nam, email, password, age, dob, image };
    try {
      const response = await fetch('http://localhost:3001/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });
      const data = await response.json();
      if (response.ok) {
        console.log(data);
        navigate('/login');
      } else {
        console.error('Registration error:', data);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="containerr-fluid">
      <div className="login-page">
        <div className="login-container">
          <h2 className="login-title">Create Your Account</h2>
          <p className="login-description">Please fill in the details to create your account. If you already have an account, you can log in.</p>
          <form className="login-form" onSubmit={handleRegister}>
            <div className="login-input-group">
              <i className="fas fa-user login-icon"></i>
              <input 
                type="text" 
                placeholder="Username" 
                value={nam} 
                onChange={(e) => setNam(e.target.value)} 
                className="login-input"
                required
              />
            </div>
            <div className="login-input-group">
              <i className="fas fa-envelope login-icon"></i>
              <input 
                type="email" 
                placeholder="Email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                className="login-input"
                required
              />
            </div>
            <div className="login-input-group">
              <i className="fas fa-lock login-icon"></i>
              <input 
                type="password" 
                placeholder="Password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                className="login-input"
                required
              />
            </div>
            <div className="login-input-group">
              <i className="fas fa-calendar login-icon"></i>
              <input 
                type="number" 
                placeholder="Age" 
                value={age} 
                onChange={(e) => setAge(e.target.value)} 
                className="login-input"
              />
            </div>
            <div className="login-input-group">
              <i className="fas fa-calendar-day login-icon"></i>
              <input 
                type="date" 
                placeholder="Date of Birth" 
                value={dob} 
                onChange={(e) => setDob(e.target.value)} 
                className="login-input"
              />
            </div>
            <div className="login-input-group">
              <i className="fas fa-image login-icon"></i>
              <input 
                type="text" 
                placeholder="Image URL" 
                value={image} 
                onChange={(e) => setImage(e.target.value)} 
                className="login-input"
              />
            </div>
            <button type="submit" className="login-btn">
              <i className="fas fa-user-plus"></i> Register
            </button>
          </form>
          <p className="login-footer">
            Already have an account? <Link to="/login">Sign in here</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
