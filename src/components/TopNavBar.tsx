import React from 'react';

const TopNavBar: React.FC = () => {
  return (
    <nav className="bg-white/80 dark:bg-slate-950/80 backdrop-blur-md sticky top-0 z-50 border-b border-slate-200/50 dark:border-slate-800/50 shadow-sm">
      <div className="flex justify-between items-center w-full px-6 py-4 max-w-screen-2xl mx-auto">
        <div className="text-xl font-black tracking-tighter text-slate-900 dark:text-slate-50">
          Lumina Realty
        </div>
        <div className="hidden md:flex items-center gap-8 text-sm font-semibold tracking-tight">
          <a
            className="text-slate-900 dark:white border-b-2 border-slate-900 dark:border-white pb-1"
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
          <a
            className="text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 transition-colors"
            href="#"
          >
            Schedule
          </a>
        </div>
        <div className="flex items-center gap-4">
          <button className="p-2 text-slate-900 dark:text-slate-50 hover:bg-slate-50 dark:hover:bg-slate-900 transition-all duration-200 active:scale-95">
            <span className="material-symbols-outlined" data-icon="notifications">
              notifications
            </span>
          </button>
          <button className="p-2 text-slate-900 dark:text-slate-50 hover:bg-slate-50 dark:hover:bg-slate-900 transition-all duration-200 active:scale-95">
            <span className="material-symbols-outlined" data-icon="account_circle">
              account_circle
            </span>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default TopNavBar;
