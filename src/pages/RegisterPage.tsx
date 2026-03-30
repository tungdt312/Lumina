import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import apiClient from '../services/api';
import './AuthPages.css';

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
  const [showPassword, setShowPassword] = useState(false);
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
        phoneNumber: phone.replace(/\D/g, ''), // Basic cleaning to match pattern if needed
      });

      console.log('Registration successful');
      setSuccessMessage('Account created successfully! Redirecting to login...');
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } catch (error: any) {
      console.error('Registration error:', error);
      const message = 
        error.response?.data?.message || 
        error.response?.data?.errors?.[0] ||
        'Registration failed. Please ensure all fields are correct and try again.';
      setErrorMessage(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-split-screen">
      {/* Left Panel: Architectural Image with Dark Gradient Overlay */}
      <div className="auth-left-panel">
        <div
          className="auth-bg-image"
          style={{
            backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuBpR6ZK5l5P0bA2wPLPWBdMk-L2qh1hqGej1vrbny_UDakS9CaVFpxIGYFcXeDKz7AsL7_bO27mCr-JmnC5mEAY3hdtfU6gXQWyRZODlAiri3pMyTATNuGe76WZo2A5ObD16EC5QlPGIg45o15m_El9979ctLzldo4NenTmynbqBDMAKJtx3RVR5h6uiAqZND-lXbsSfUqaJ8KRNy73V3sSgyY-gdTjOxLJmRjdwubGehoxqJF-HuhyyY2VGEsp1qKzz0y1kuoKncv3')`,
          }}
          role="img"
          aria-label="Luxury architectural interior"
        />
        <div className="auth-overlay" />
        <div className="auth-left-content">
          <div className="auth-brand">
            <div className="auth-brand-logo-wrap">
              <LuminaLogo />
            </div>
            <span className="auth-brand-name">Lumina Realty</span>
          </div>
          <h2 className="auth-left-headline">Elevate your living experience.</h2>
          <p className="auth-left-subtext">
            Join an exclusive circle of visionary homeowners and architectural enthusiasts.
            Your journey to premium living begins here.
          </p>
        </div>
      </div>

      {/* Right Panel: Form Section */}
      <div className="auth-right-panel">
        <div className="auth-form-container">
          <div className="auth-form-header">
            <h1 className="auth-form-title">Create Account</h1>
            <p className="auth-form-subtitle">Become a member of the Lumina Realty ecosystem.</p>
          </div>

          {errorMessage && (
            <div className="auth-alert auth-alert--error" role="alert">
              <svg width="20" height="20" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              {errorMessage}
            </div>
          )}

          {successMessage && (
            <div className="auth-alert auth-alert--success" role="alert">
              <svg width="20" height="20" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              {successMessage}
            </div>
          )}

          {isLoading && !errorMessage && !successMessage && (
            <div className="auth-alert" style={{ backgroundColor: 'var(--auth-bg-light)', borderColor: 'var(--auth-border)', color: 'var(--auth-text-muted)' }}>
              <span className="auth-spinner" />
              Creating your Lumina account...
            </div>
          )}

          <form className="auth-form" onSubmit={handleSubmit} noValidate>
            <div className="auth-fields-grid">
              <div className="auth-field-group">
                <label className="auth-label">Full Name</label>
                <input
                  type="text"
                  className="auth-input"
                  placeholder="John Doe"
                  value={fullName}
                  onChange={e => setFullName(e.target.value)}
                  disabled={isLoading}
                  required
                />
              </div>

              <div className="auth-field-group">
                <label className="auth-label">Username</label>
                <input
                  type="text"
                  className="auth-input"
                  placeholder="johndoe_123"
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
                  placeholder="john@example.com"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  disabled={isLoading}
                  required
                />
              </div>

              <div className="auth-field-group auth-field-group--full">
                <label className="auth-label">Phone Number (Optional)</label>
                <input
                  type="tel"
                  className="auth-input"
                  placeholder="0987654321"
                  value={phone}
                  onChange={e => setPhone(e.target.value)}
                  disabled={isLoading}
                />
              </div>

              <div className="auth-field-group auth-field-group--full">
                <div className="auth-label-row" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <label className="auth-label">Secure Password</label>
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    style={{ background: 'none', border: 'none', fontSize: '0.75rem', fontWeight: 700, color: 'var(--auth-primary)', cursor: 'pointer' }}
                  >
                    {showPassword ? 'HIDE' : 'SHOW'}
                  </button>
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
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
              {isLoading ? 'Creating Account...' : 'Sign Up Now'}
            </button>
          </form>

          <footer className="auth-footer">
            <p className="auth-footer-text">
              Already have an account?
              <Link to="/login" className="auth-footer-link">Sign In</Link>
            </p>
          </footer>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
