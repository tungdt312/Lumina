import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import apiClient from '../services/api';
import TopNavBar from '../components/TopNavBar';
import Footer from '../components/Footer';
import { 
  MdSearch, 
  MdAdd, 
  MdRealEstateAgent, 
  MdImage, 
  MdLocationOn, 
  MdBed, 
  MdShower, 
  MdSquareFoot, 
  MdEdit, 
  MdDelete 
} from 'react-icons/md';
import './MyProperties.css';

interface PropertySummary {
  id: number;
  title: string;
  price: number;
  type: string;
  lineAddress: string;
  landArea: number;
  bedrooms: number;
  bathrooms: number;
  status: string;
}

const MyPropertiesPage: React.FC = () => {
  const [properties, setProperties] = useState<PropertySummary[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchMyProperties();
  }, []);

  const fetchMyProperties = async (search = searchTerm) => {
    setIsLoading(true);
    setError(null);
    try {
      const meResponse = await apiClient.get('/api/v1/auth/me');
      const username = meResponse.data?.data?.username;

      // Construct RSQL filter
      let filterQuery = `createdBy=='${username}'`;
      if (search.trim()) {
        const term = encodeURIComponent(search.trim());
        filterQuery += ` and (title=='*${term}*' or lineAddress=='*${term}*')`;
      }

      let response;
      try {
        response = await apiClient.get(`/api/v1/properties?filter=${filterQuery}&size=100`);
      } catch (err) {
        // Fallback if the specific RSQL query fails
        response = await apiClient.get(`/api/v1/properties?size=100`);
      }
      
      const content = response?.data?.data?.content || [];
      setProperties(content);
    } catch (err: any) {
      console.error('Failed to fetch properties', err);
      setError('Failed to load your properties. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchMyProperties(searchTerm);
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm('Are you sure you want to delete this property?')) return;
    try {
      await apiClient.delete(`/api/v1/properties/${id}`);
      setProperties((prev) => prev.filter((p) => p.id !== id));
    } catch (err) {
      console.error('Delete failed', err);
      alert('Failed to delete property.');
    }
  };

  return (
    <div className="page-wrapper">
      <TopNavBar />
      <main className="my-properties-main">
        <div className="properties-header">
          <div className="header-content">
            <h1>My Properties</h1>
            <p>Manage your real estate listings</p>
          </div>
          <div className="header-actions">
            <form className="search-form" onSubmit={handleSearchSubmit}>
              <MdSearch className="search-icon" size={20} />
              <input 
                type="text" 
                placeholder="Search properties..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
              />
              <button type="submit" className="btn-search">Search</button>
            </form>
            <button 
              className="btn-create"
              onClick={() => navigate('/my-properties/new')}
            >
              <MdAdd size={20} />
              Add Property
            </button>
          </div>
        </div>

        {error && (
          <div className="error-alert">
            {error}
          </div>
        )}

        {isLoading ? (
          <div className="loading-state">
            <div className="spinner"></div>
            <p>Loading your properties...</p>
          </div>
        ) : properties.length === 0 ? (
          <div className="empty-state">
            <MdRealEstateAgent className="empty-icon" size={64} />
            <h2>No Properties Found</h2>
            <p>You haven't listed any properties yet. Start by adding your first listing.</p>
            <button 
              className="btn-primary"
              onClick={() => navigate('/my-properties/new')}
            >
              Add Your First Property
            </button>
          </div>
        ) : (
          <div className="properties-grid">
            {properties.map((property) => (
              <div key={property.id} className="property-card">
                <div className="card-image-placeholder">
                  <MdImage size={48} color="var(--text)" style={{ opacity: 0.3 }} />
                  <span className="status-badge" data-status={property.status}>{property.status}</span>
                </div>
                <div className="card-content">
                  <h3 className="property-title">{property.title}</h3>
                  <p className="property-price">
                    ${property.price ? property.price.toLocaleString() : '0'}
                  </p>
                  <p className="property-address">
                    <MdLocationOn size={16} style={{ opacity: 0.7 }} />
                    {property.lineAddress || 'No address provided'}
                  </p>
                  <div className="property-features">
                    <span title="Bedrooms"><MdBed size={18} /> {property.bedrooms || 0}</span>
                    <span title="Bathrooms"><MdShower size={18} /> {property.bathrooms || 0}</span>
                    <span title="Area"><MdSquareFoot size={18} /> {property.landArea || 0} sqm</span>
                  </div>
                </div>
                <div className="card-actions">
                  <button 
                    className="action-btn edit-btn"
                    onClick={() => navigate(`/my-properties/${property.id}/edit`)}
                  >
                    <MdEdit size={18} />
                    Edit
                  </button>
                  <button 
                    className="action-btn delete-btn"
                    onClick={() => handleDelete(property.id)}
                  >
                    <MdDelete size={18} />
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default MyPropertiesPage;
