import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import apiClient from '../services/api';
import './AuthPages.css';

const GoogleIcon: React.FC = () => (
  <svg className="auth-social-icon" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.66l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
  </svg>
);

const LuminaLogo: React.FC = () => (
  <svg className="auth-logo-icon" fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path clipRule="evenodd" d="M24 18.4228L42 11.475V34.3663C42 34.7796 41.7457 35.1504 41.3601 35.2992L24 42V18.4228Z" fill="white" fillRule="evenodd"/>
    <path clipRule="evenodd" d="M24 8.18819L33.4123 11.574L24 15.2071L14.5877 11.574L24 8.18819ZM9 15.8487L21 20.4805V37.6263L9 32.9945V15.8487ZM27 37.6263V20.4805L39 15.8487V32.9945L27 37.6263ZM25.354 2.29885C24.4788 1.98402 23.5212 1.98402 22.646 2.29885L4.98454 8.65208C3.7939 9.08038 3 10.2097 3 11.475V34.3663C3 36.0196 4.01719 37.5026 5.55962 38.098L22.9197 44.7987C23.6149 45.0671 24.3851 45.0671 25.0803 44.7987L42.4404 38.098C43.9828 37.5026 45 36.0196 45 34.3663V11.475C45 10.2097 44.2061 9.08038 43.0155 8.65208L25.354 2.29885Z" fill="white" fillRule="evenodd"/>
  </svg>
);

const LoginPage: React.FC = () => {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage(null);

    try {
      const response = await apiClient.post('/api/v1/auth/login', {
        credential: identifier,
        password: password,
      });

      const { accessToken, refreshToken } = response.data.data;

      // Save tokens in localStorage
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);

      console.log('Login successful');
      navigate('/'); // Redirect to landing or dashboard
    } catch (error: any) {
      console.error('Login error:', error);
      const message = 
        error.response?.data?.message || 
        error.response?.data?.errors?.[0] ||
        (error.response?.data && typeof error.response.data === 'string' ? error.response.data : null) ||
        'Authentication failed. Please check your credentials and try again.';
      setErrorMessage(message);
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
            backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuDJNEIrwdSnuWGLUuD5lcDVYlwik2KBZTOm-qiMH2st0iBqHgQSkYCQeu6Q2yz1rUrkbnL-LBdokkyjKgB3sImb6MajlA1cIwaCCdW06v2lJs6gwaqoWrR7fUQyz-RZe4EifRH7Sghn8_RQO16avuhjfBKAf5X3jCGx19WRH_DTCBmInS5ihwJQEsHbjLoOTQnOQzljQ0INVuYo9BpLvoxIpnS-mBhID5faHzy7uVYWk1g9HagaHl3WNVW_Y4nOksbVUEomCnirARFA')`,
          }}
          role="img"
          aria-label="Modern building architecture"
        />
        <div className="auth-overlay" />
        <div className="auth-left-content">
          <div className="auth-brand">
            <div className="auth-brand-logo-wrap">
              <LuminaLogo />
            </div>
            <span className="auth-brand-name">Lumina Realty</span>
          </div>
          <h2 className="auth-left-headline">Discover the future of high-fidelity living.</h2>
          <p className="auth-left-subtext">
            Log in to access your dashboard, manage your properties, and stay connected with the Lumina ecosystem.
          </p>
        </div>
      </div>

      <div className="auth-right-panel">
        <div className="auth-form-container">
          <div className="auth-form-header">
            <h1 className="auth-form-title">Welcome Back</h1>
            <p className="auth-form-subtitle">Please sign in to your Lumina account.</p>
          </div>

          {errorMessage && (
            <div className="auth-alert auth-alert--error" role="alert">
              <svg width="20" height="20" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              {errorMessage}
            </div>
          )}

          {isLoading && !errorMessage && (
            <div className="auth-alert auth-alert--success" style={{ backgroundColor: 'var(--auth-bg-light)', borderColor: 'var(--auth-border)', color: 'var(--auth-text-muted)' }}>
              <span className="auth-spinner" />
              Authenticating with Lumina Secure...
            </div>
          )}

          <form className="auth-form" onSubmit={handleSubmit} noValidate>
            <div className="auth-fields-grid">
              <div className="auth-field-group auth-field-group--full">
                <label className="auth-label">Email or Username</label>
                <input
                  type="text"
                  className="auth-input"
                  placeholder="Enter your email or username"
                  value={identifier}
                  onChange={e => setIdentifier(e.target.value)}
                  disabled={isLoading}
                  required
                />
              </div>

              <div className="auth-field-group auth-field-group--full">
                <div className="auth-label-row">
                  <label className="auth-label">Password</label>
                  <a href="#" className="auth-forgot-link">Forgot?</a>
                </div>
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
              {isLoading ? 'Signing In...' : 'Log In'}
            </button>
          </form>

          <div className="auth-divider">
            <div className="auth-divider-line" />
            <span className="auth-divider-text">OR SIGN IN WITH</span>
            <div className="auth-divider-line" />
          </div>

          <div className="auth-social-grid">
            <button type="button" className="auth-social-btn" disabled={isLoading}>
              <GoogleIcon />
              Google
            </button>
            <button type="button" className="auth-social-btn" disabled={isLoading}>
              <span style={{ fontSize: '1.25rem', fontWeight: 500 }}></span>
              Apple
            </button>
          </div>

          <footer className="auth-footer">
            <p className="auth-footer-text">
              New to Lumina?
              <Link to="/register" className="auth-footer-link">Create Account</Link>
            </p>
          </footer>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
