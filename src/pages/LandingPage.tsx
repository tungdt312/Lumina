import React from 'react';
import './LandingPage.css';
import TopNavBar from '../components/TopNavBar';
import HeroSection from '../components/HeroSection';
import FeaturedListings from '../components/FeaturedListings';
import PopularLocations from '../components/PopularLocations';
import CTASection from '../components/CTASection';
import Footer from '../components/Footer';

const LandingPage: React.FC = () => {
  return (
    <div className="landing-page">
      <TopNavBar />
      <main>
        <HeroSection />
        <FeaturedListings />
        <PopularLocations />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
};

export default LandingPage;
