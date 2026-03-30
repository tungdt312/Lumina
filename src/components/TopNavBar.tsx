import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const TopNavBar: React.FC = () => {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const popoverRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if access token exists in localStorage
    const accessToken = localStorage.getItem('accessToken');
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsAuthenticated(!!accessToken);
  }, []);

  useEffect(() => {
    // Close popover when clicking outside
    const handleClickOutside = (event: MouseEvent) => {
      if (popoverRef.current && !popoverRef.current.contains(event.target as Node)) {
        setIsPopoverOpen(false);
      }
    };

    if (isPopoverOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isPopoverOpen]);

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    setIsAuthenticated(false);
    setIsPopoverOpen(false);
    navigate('/login');
  };

  const handleNavigate = (path: string) => {
    navigate(path);
    setIsPopoverOpen(false);
  };

  return (
    <nav className="bg-white/80 dark:bg-slate-950/80 backdrop-blur-md sticky top-0 z-50 border-b border-slate-200/50 dark:border-slate-800/50 shadow-sm">
      <div className="flex justify-between items-center w-full px-6 py-4 max-w-screen-2xl mx-auto">
        <div className="text-xl font-black tracking-tighter text-slate-900 dark:text-slate-50">
          Lumina Realty
        </div>
        <div className="hidden md:flex items-center gap-8 text-sm font-semibold tracking-tight">
          <a
              className="text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 transition-colors"
            href="#"
          >
            Properties
          </a>
          <a
            className="text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 transition-colors"
            href="#"
          >
            Dashboard
          </a>
          <a
            className="text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 transition-colors"
            href="#"
          >
            Insights
          </a>

        </div>
        <div className="flex items-center gap-4 relative">
          <div ref={popoverRef}>
            <button 
              onClick={() => setIsPopoverOpen(!isPopoverOpen)}
              className="p-2 text-slate-900 dark:text-slate-50 hover:bg-slate-50 dark:hover:bg-slate-900 transition-all duration-200 active:scale-95"
            >
              <span className="material-symbols-outlined" data-icon="account_circle">
                account_circle
              </span>
            </button>
            
            {/* Popover Menu */}
            {isPopoverOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-slate-900 rounded-lg shadow-lg border border-slate-200 dark:border-slate-700 z-50">
                {isAuthenticated ? (
                  <div className="py-2">
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                    >
                      Logout
                    </button>
                  </div>
                ) : (
                  <div className="py-2">
                    <button
                      onClick={() => handleNavigate('/login')}
                      className="w-full text-left px-4 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                    >
                      Login
                    </button>
                    <button
                      onClick={() => handleNavigate('/register')}
                      className="w-full text-left px-4 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                    >
                      Register
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default TopNavBar;
