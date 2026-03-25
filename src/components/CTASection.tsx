import React from 'react';

const CTASection: React.FC = () => {
  return (
    <section className="py-24 bg-slate-900 text-white">
      <div className="max-w-screen-2xl mx-auto px-6 text-center">
        <h2 className="text-3xl md:text-5xl font-black tracking-tighter mb-8">
          Ready to discover excellence?
        </h2>
        <p className="text-white/60 text-lg mb-12 max-w-2xl mx-auto">
          Join our private network for early access to off-market architectural masterpieces and investment
          insights.
        </p>
        <div className="flex flex-col md:flex-row justify-center gap-4">
          <button className="bg-white text-slate-900 px-10 py-4 rounded-lg font-bold text-lg hover:bg-slate-100 transition-all active:scale-95">
            Browse Inventory
          </button>
          <button className="bg-transparent border-2 border-white/20 text-white px-10 py-4 rounded-lg font-bold text-lg hover:bg-white/10 transition-all active:scale-95">
            Speak with an Agent
          </button>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
