import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800">
      <div className="flex flex-col md:flex-row justify-between items-center px-8 py-12 w-full max-w-screen-2xl mx-auto">
        <div className="mb-8 md:mb-0">
          <p className="text-xs uppercase tracking-widest font-bold text-slate-400 dark:text-slate-500">
            © 2024 Lumina Realty. Architectural Excellence.
          </p>
        </div>
        <div className="flex flex-wrap justify-center gap-8">
          <a
            className="text-xs uppercase tracking-widest font-bold text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300"
            href="#"
          >
            Privacy Policy
          </a>
          <a
            className="text-xs uppercase tracking-widest font-bold text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300"
            href="#"
          >
            Terms of Service
          </a>
          <a
            className="text-xs uppercase tracking-widest font-bold text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300"
            href="#"
          >
            Accessibility
          </a>
          <a
            className="text-xs uppercase tracking-widest font-bold text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300"
            href="#"
          >
            Contact
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
