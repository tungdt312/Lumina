import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import apiClient from '../services/api';
import './TopNavBar.css';

const TopNavBar: React.FC = () => {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [displayName, setDisplayName] = useState<string>('');
  const popoverRef = useRef<HTMLDivElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    const storedName = localStorage.getItem('displayName');
    setIsAuthenticated(!!accessToken);
    setDisplayName(storedName || '');
  }, []);

  // Close popover on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (popoverRef.current && !popoverRef.current.contains(event.target as Node)) {
        setIsPopoverOpen(false);
      }
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target as Node)) {
        setIsMobileMenuOpen(false);
      }
    };
    if (isPopoverOpen || isMobileMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isPopoverOpen, isMobileMenuOpen]);

  const handleLogout = async () => {
    const refreshToken = localStorage.getItem('refreshToken');
    try {
      if (refreshToken) {
        await apiClient.post('/api/v1/auth/logout', { refreshToken });
      }
    } catch {
      // Proceed
    } finally {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('displayName');
      setIsAuthenticated(false);
      setDisplayName('');
      setIsPopoverOpen(false);
      setIsMobileMenuOpen(false);
      navigate('/login');
    }
  };

  const handleNavigate = (path: string) => {
    navigate(path);
    setIsPopoverOpen(false);
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className="top-nav">
      <div className="nav-container">
        <div className="nav-content">

          {/* Left: Mobile Menu + Logo */}
          <div className="nav-left">
            {/* Hamburger (Mobile only) */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="hamburger"
              aria-label="Toggle Navigation"
            >
              <span className="material-symbols-outlined">
                {isMobileMenuOpen ? 'close' : 'menu'}
              </span>
            </button>

            {/* Logo */}
            <div 
              onClick={() => handleNavigate('/')}
              className="nav-logo"
            >
              Lumina<span className="logo-dot">.</span>
            </div>
          </div>

          {/* Center: Desktop Nav links */}
          <div className="nav-links">
            {['Projects', 'Booking', 'Insights'].map((link) => (
              <a 
                key={link}
                className="nav-link"
                href="#"
              >
                {link}
              </a>
            ))}
          </div>

          {/* Right side – conditional on auth state */}
          <div className="nav-right">
            {isAuthenticated ? (
              /* ── LOGGED IN ── */
              <div ref={popoverRef} className="auth-section">
                {/* Greeting (Responsive) */}
                <span className="greeting">
                  <span className="wave">👋</span> Hello,
                  <span className="display-name">
                    {displayName.split(' ')[0] || 'User'}
                  </span>
                </span>

                {/* Account icon button */}
                <button
                  onClick={() => setIsPopoverOpen(prev => !prev)}
                  className="account-btn"
                  aria-label="Account menu"
                  aria-expanded={isPopoverOpen}
                >
                  <span className="material-symbols-outlined" data-icon="account_circle">
                    account_circle
                  </span>
                </button>

                {/* Dropdown popover */}
                {isPopoverOpen && (
                  <div className="dropdown-menu" role="menu">
                    <div className="dropdown-header">
                      <p className="dropdown-label">Member Access</p>
                      <p className="dropdown-username">{displayName || 'Lumina Partner'}</p>
                    </div>

                    <div className="dropdown-actions">
                       <button
                        onClick={handleLogout}
                        role="menuitem"
                        className="signout-btn"
                      >
                        <span className="material-symbols-outlined">logout</span>
                        Sign out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              /* ── GUEST ── */
              <div className="auth-section">
                <button
                  onClick={() => handleNavigate('/login')}
                  className="login-link"
                >
                  Log in
                </button>
                <button
                  onClick={() => handleNavigate('/register')}
                  className="register-btn"
                >
                  Join Now
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div ref={mobileMenuRef} className="mobile-menu">
            {['Projects', 'Booking', 'Insights'].map((link) => (
              <a
                key={link}
                href="#"
                className="mobile-nav-link"
              >
                {link}
              </a>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
};

export default TopNavBar;
