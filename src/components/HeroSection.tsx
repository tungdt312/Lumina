import React, { useState } from 'react';

const HeroSection: React.FC = () => {
  const [location, setLocation] = useState('');
  const [propertyType, setPropertyType] = useState('Residential');

  const handleSearch = () => {
    console.log('Search:', { location, propertyType });
  };

  return (
    <section className="relative h-[870px] flex items-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img
          className="w-full h-full object-cover"
          alt="Modern minimalist architectural villa with large windows"
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuDm5KDB-4q6mH8YnxS2h5Mn_sK13osjVWZzqgzsN2ys_vvNWvrC_dX1BCAbvVtU-MCXHT_6xfcGK5xQXaUw91dOiK8dN9wx09OruPEzaQuiCe44JDsDOfrtcmmAWKGw1ZUQvVkLaZNQ38-pYbEJ3MZS9siJxYAb2yYztxZglXoqKWrw1sYOw-4DeGnvMIyZmAkkDkIF_mD4478W-svIxP1VTZrfZBhSCOmCDgURrRne3uwm34BPAvfO-WRP1vaEYZLBxihbE1rDcvIW"
        />
        <div className="absolute inset-0 bg-slate-900/40 mix-blend-multiply"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent"></div>
      </div>
      <div className="relative z-10 max-w-screen-2xl mx-auto px-6 w-full">
        <div className="max-w-3xl">
          <h1 className="text-white font-black text-5xl md:text-7xl tracking-tighter leading-[0.9] mb-6">
            ARCHITECTURAL
            <br />
            PRECISION.
          </h1>
          <p className="text-white/80 text-xl md:text-2xl font-light mb-10 max-w-xl">
            Curating exceptional living spaces for those who value structure, light, and legacy.
          </p>
          {/* Search Bar */}
          <div className="bg-white p-2 rounded-lg shadow-xl max-w-2xl flex flex-col md:flex-row items-center gap-2">
            <div className="flex-1 flex items-center px-4 gap-3 w-full border-b md:border-b-0 md:border-r border-slate-100 py-3">
              <span className="material-symbols-outlined text-slate-500" data-icon="location_on">
                location_on
              </span>
              <input
                className="w-full border-none focus:ring-0 text-slate-900 font-medium placeholder:text-slate-500"
                placeholder="Search by city or neighborhood"
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>
            <div className="flex-1 flex items-center px-4 gap-3 w-full py-3">
              <span className="material-symbols-outlined text-slate-500" data-icon="home_work">
                home_work
              </span>
              <select
                className="w-full border-none focus:ring-0 text-slate-900 font-medium appearance-none"
                value={propertyType}
                onChange={(e) => setPropertyType(e.target.value)}
              >
                <option>Residential</option>
                <option>Commercial</option>
                <option>Industrial</option>
              </select>
            </div>
            <button
              className="bg-slate-900 text-white px-8 py-4 rounded-lg font-bold hover:bg-slate-800 transition-all w-full md:w-auto active:scale-95"
              onClick={handleSearch}
            >
              Search
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
