import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import apiClient from '../services/api';
import TopNavBar from '../components/TopNavBar';
import Footer from '../components/Footer';
import { 
  MdLocationOn, 
  MdHotel, 
  MdBathtub, 
  MdSquareFoot, 
  MdArrowBack,
  MdLayers,
  MdStraighten,
  MdExplore,
  MdChair,
  MdInfo
} from 'react-icons/md';
import './PropertyDetail.css';

const RANDOM_IMAGES = [
  'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&q=80&w=1200',
  'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=1200',
  'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=1200',
  'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=1200',
];

const PropertyDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [property, setProperty] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchProperty();
  }, [id]);

  const fetchProperty = async () => {
    setIsLoading(true);
    try {
      const response = await apiClient.get(`/api/v1/properties/${id}`);
      setProperty(response.data?.data);
    } catch (err) {
      console.error('Failed to fetch property details', err);
      setError('Could not load property details. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="property-detail-wrapper">
        <TopNavBar />
        <div className="loading-state">
          <div className="spinner"></div>
          <p>Gathering Architectural Details...</p>
        </div>
        <Footer />
      </div>
    );
  }

  if (error || !property) {
    return (
      <div className="property-detail-wrapper">
        <TopNavBar />
        <div className="error-state">
          <h2>Oops!</h2>
          <p>{error || 'Property not found.'}</p>
          <Link to="/" className="btn-back">Return to Collections</Link>
        </div>
        <Footer />
      </div>
    );
  }

  const randomImage = RANDOM_IMAGES[parseInt(id || '0') % RANDOM_IMAGES.length];

  return (
    <div className="property-detail-wrapper">
      <TopNavBar />
      
      <main className="detail-main">
        {/* Full-Bleed Hero Section */}
        <section className="hero-section">
          <img src={randomImage} alt={property.title} className="hero-image" />
          <div className="hero-overlay"></div>
          
          <div className="hero-content">
            <Link to="/" className="back-btn-glass" aria-label="Back to Collection">
              <MdArrowBack /> Back to Collection
            </Link>
            
            <div className="hero-header-card">
              <div className="header-top">
                <span className="premium-badge">Featured Property</span>
                <div className="price-glass">
                  {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(property.price)}
                </div>
              </div>
              
              <h1 className="hero-title">{property.title}</h1>
              
              <div className="hero-meta">
                <div className="meta-item">
                  <MdLocationOn className="text-emerald-400" />
                  <span>{property.lineAddress || 'Premium Global Location'}</span>
                </div>
                <span className="meta-separator">|</span>
                <span className="meta-type">{property.type}</span>
              </div>
            </div>
          </div>
        </section>

        {/* Floating Stats Dashboard */}
        <section className="stats-dashboard-container">
          <div className="stats-dashboard">
            <div className="dashboard-item">
              <div className="item-icon"><MdHotel /></div>
              <div className="item-info">
                <span className="item-value">{property.bedrooms || 0}</span>
                <span className="item-label">Bedrooms</span>
              </div>
            </div>
            <div className="dashboard-divider"></div>
            <div className="dashboard-item">
              <div className="item-icon"><MdBathtub /></div>
              <div className="item-info">
                <span className="item-value">{property.bathrooms || 0}</span>
                <span className="item-label">Bathrooms</span>
              </div>
            </div>
            <div className="dashboard-divider"></div>
            <div className="dashboard-item">
              <div className="item-icon"><MdSquareFoot /></div>
              <div className="item-info">
                <span className="item-value">{property.landArea || 0}</span>
                <span className="item-label">Sq. Feet</span>
              </div>
            </div>
            <div className="dashboard-divider"></div>
            <div className="dashboard-item">
              <div className="item-icon"><MdLayers /></div>
              <div className="item-info">
                <span className="item-value">{property.floors || 1}</span>
                <span className="item-label">Floors</span>
              </div>
            </div>
          </div>
        </section>

        <div className="main-content-layout">
          <div className="content-body">
            {/* Description Section */}
            <section className="detail-section">
              <div className="section-title-premium">
                <span className="title-line"></span>
                <h3>The Narrative</h3>
              </div>
              
              <div className="narrative-container">
                <p className="narrative-lead">
                  {property.description?.split('.')[0]}.
                </p>
                <div className="narrative-body">
                  <p className="narrative-text">
                    {property.description?.split('.').slice(1).join('.') || 'Experience the pinnacle of modern living in this architectural masterpiece. Designed for those who appreciate the finer details, this property offers a seamless blend of luxury, comfort, and state-of-the-art features. Every corner of this residence has been meticulously crafted to provide an unparalleled lifestyle experience, merging bold contemporary lines with warm, inviting spaces.'}
                  </p>
                  
                  <div className="narrative-highlights">
                    <div className="highlight-item">
                      <span className="highlight-dot"></span>
                      <span>Architecturally Significant Design</span>
                    </div>
                    <div className="highlight-item">
                      <span className="highlight-dot"></span>
                      <span>Premium Interior Finishings</span>
                    </div>
                    <div className="highlight-item">
                      <span className="highlight-dot"></span>
                      <span>Smart Home Integration</span>
                    </div>
                    <div className="highlight-item">
                      <span className="highlight-dot"></span>
                      <span>Sustainable Energy Features</span>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Technical Specifications */}
            <section className="detail-section">
              <div className="section-title-premium">
                <span className="title-line"></span>
                <h3>Architectural Specs</h3>
              </div>
              <div className="specs-grid-premium">
                <div className="spec-card">
                  <MdStraighten className="spec-card-icon" />
                  <span className="spec-card-label">Road Width</span>
                  <span className="spec-card-value">{property.entranceRoadWidth ? `${property.entranceRoadWidth}m` : 'N/A'}</span>
                </div>
                <div className="spec-card">
                  <MdExplore className="spec-card-icon" />
                  <span className="spec-card-label">Orientation</span>
                  <span className="spec-card-value">{property.direction || 'North Facing'}</span>
                </div>
                <div className="spec-card">
                  <MdExplore className="spec-card-icon" />
                  <span className="spec-card-label">Balcony</span>
                  <span className="spec-card-value">{property.balconyDirection || 'South Facing'}</span>
                </div>
                <div className="spec-card">
                  <MdChair className="spec-card-icon" />
                  <span className="spec-card-label">Interior</span>
                  <span className="spec-card-value">{property.interior || 'Fully Furnished'}</span>
                </div>
              </div>
            </section>
          </div>

          {/* Luxury Sidebar */}
          <aside className="content-sidebar-premium">
            <div className="inquiry-card-premium">
              <h4>Request an <br/>Exclusive Viewing</h4>
              <p>Connect with our architectural consultants for a private tour of this residence.</p>
              
              <div className="inquiry-actions">
                <button className="btn-primary-premium" aria-label="Book a private tour">Book a Private Tour</button>
                <button className="btn-secondary-premium" aria-label="Contact concierge">Contact Concierge</button>
              </div>

              <div className="inquiry-footer">
                <MdInfo className="text-emerald-400" />
                <span>Reference ID: LUM-{property.id}</span>
              </div>
            </div>
            
            <div className="status-indicator">
              <div className="status-dot"></div>
              <span>Currently {property.status || 'AVAILABLE'}</span>
            </div>
          </aside>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default PropertyDetailPage;
