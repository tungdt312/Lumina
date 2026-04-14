import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import apiClient from '../services/api';
import './AuthPages.css';
import registerBg from '../assets/register_bg.png';

const LuminaLogo: React.FC = () => (
  <svg className="auth-logo-icon" fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path clipRule="evenodd" d="M24 18.4228L42 11.475V34.3663C42 34.7796 41.7457 35.1504 41.3601 35.2992L24 42V18.4228Z" fill="white" fillRule="evenodd"/>
    <path clipRule="evenodd" d="M24 8.18819L33.4123 11.574L24 15.2071L14.5877 11.574L24 8.18819ZM9 15.8487L21 20.4805V37.6263L9 32.9945V15.8487ZM27 37.6263V20.4805L39 15.8487V32.9945L27 37.6263ZM25.354 2.29885C24.4788 1.98402 23.5212 1.98402 22.646 2.29885L4.98454 8.65208C3.7939 9.08038 3 10.2097 3 11.475V34.3663C3 36.0196 4.01719 37.5026 5.55962 38.098L22.9197 44.7987C23.6149 45.0671 24.3851 45.0671 25.0803 44.7987L42.4404 38.098C43.9828 37.5026 45 36.0196 45 34.3663V11.475C45 10.2097 44.2061 9.08038 43.0155 8.65208L25.354 2.29885Z" fill="white" fillRule="evenodd"/>
  </svg>
);

const RegisterPage: React.FC = () => {
  const [fullName, setFullName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage(null);
    setSuccessMessage(null);

    try {
      await apiClient.post('/api/v1/auth/register', {
        username,
        password,
        email,
        fullName,
        phoneNumber: phone.replace(/\D/g, ''),
      });

      setSuccessMessage('Registration Successful! Redirecting to login...');
      setTimeout(() => navigate('/login'), 2000);
    } catch (error) {
      console.error('Registration error:', error);
      setErrorMessage('Registration failed. Please check your information.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-split-screen">
      <div className="auth-left-panel">
        <div
          className="auth-bg-image"
          style={{
            backgroundImage: `url(${registerBg})`,
          }}
          role="img"
          aria-label="Luxury architectural villa"
        />
        <div className="auth-overlay" />
        <div className="auth-left-content">
          <Link to="/" className="auth-brand" style={{ textDecoration: 'none' }}>
            <div className="auth-brand-logo-wrap">
              <LuminaLogo />
            </div>
            <span className="auth-brand-name">Lumina Realty</span>
          </Link>
          <h2 className="auth-left-headline">Join our premium community.</h2>
          <p className="auth-left-subtext">
            Experience the most innovative property projects in Vietnam.
          </p>
        </div>
      </div>

      <div className="auth-right-panel">
        <div className="auth-header-actions">
          <Link to="/" className="auth-mobile-brand" style={{ textDecoration: 'none', marginBottom: 0 }}>
            <div className="auth-mobile-brand-logo">
              <LuminaLogo />
            </div>
            <span className="auth-mobile-brand-name">Lumina Realty</span>
          </Link>

          <Link to="/" className="auth-back-home">
            <span className="material-symbols-outlined">arrow_back</span>
            <span>Back to Home</span>
          </Link>
        </div>

        <div className="auth-form-container">
          <div className="auth-form-header">
            <h1 className="auth-form-title">Join Lumina</h1>
            <p className="auth-form-subtitle">Register for exclusive property access and market updates.</p>
          </div>

          {errorMessage && <div className="auth-alert auth-alert--error">{errorMessage}</div>}
          {successMessage && <div className="auth-alert auth-alert--success">{successMessage}</div>}

          <form className="auth-form" onSubmit={handleSubmit} noValidate>
            <div className="auth-fields-grid">
              <div className="auth-field-group">
                <label className="auth-label">Full Name</label>
                <input
                  type="text"
                  className="auth-input"
                  placeholder="e.g. Nguyen Van A"
                  value={fullName}
                  onChange={e => setFullName(e.target.value)}
                  disabled={isLoading}
                  required
                />
              </div>

              <div className="auth-field-group">
                <label className="auth-label">Account Username</label>
                <input
                  type="text"
                  className="auth-input"
                  placeholder="nguyenan001"
                  value={username}
                  onChange={e => setUsername(e.target.value)}
                  disabled={isLoading}
                  required
                />
              </div>

              <div className="auth-field-group auth-field-group--full">
                <label className="auth-label">Email Address</label>
                <input
                  type="email"
                  className="auth-input"
                  placeholder="nguyenan@example.com"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  disabled={isLoading}
                  required
                />
              </div>

              <div className="auth-field-group auth-field-group--full">
                <label className="auth-label">Mobile Number</label>
                <input
                  type="tel"
                  className="auth-input"
                  placeholder="09xx xxx xxx"
                  value={phone}
                  onChange={e => setPhone(e.target.value)}
                  disabled={isLoading}
                />
              </div>

              <div className="auth-field-group auth-field-group--full">
                <label className="auth-label">Secure Password</label>
                <input
                  type="password"
                  className="auth-input"
                  placeholder="••••••••••••"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  disabled={isLoading}
                  required
                />
              </div>
            </div>

            <button type="submit" className="auth-btn-primary" disabled={isLoading}>
              {isLoading ? 'Processing...' : 'Register Now'}
            </button>
          </form>

          <footer className="auth-footer">
            <p className="auth-footer-text">
              Already a Member?
              <Link to="/login" className="auth-footer-link">Log In</Link>
            </p>
          </footer>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
