import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import apiClient from '../services/api';
import TopNavBar from '../components/TopNavBar';
import Footer from '../components/Footer';
import { 
  MdArrowBack, 
  MdInfo, 
  MdLocationOn, 
  MdHomeWork, 
  MdDescription, 
  MdSave,
  MdAttachMoney,
  MdLayers,
  MdMeetingRoom,
  MdBathtub,
  MdSquareFoot,
  MdStraighten,
  MdExplore,
  MdChair
} from 'react-icons/md';
import './PropertyForm.css';

interface Province {
  id: number;
  name: string;
}

interface Ward {
  id: number;
  name: string;
}

const PropertyFormPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const isEditing = !!id;
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(isEditing);
  const [error, setError] = useState<string | null>(null);

  // Reference data
  const [provinces, setProvinces] = useState<Province[]>([]);
  const [wards, setWards] = useState<Ward[]>([]);
  const [selectedProvinceId, setSelectedProvinceId] = useState<string>('');

  const [formData, setFormData] = useState({
    title: '',
    purpose: 'SELL',
    type: 'APARTMENT',
    price: '',
    lineAddress: '',
    wardId: '',
    landArea: '',
    floorArea: '',
    floors: '',
    floorNumber: '',
    bedrooms: '',
    bathrooms: '',
    entranceRoadWidth: '',
    direction: '',
    balconyDirection: '',
    interior: '',
    status: 'AVAILABLE',
    description: '',
  });

  useEffect(() => {
    fetchProvinces();
    if (isEditing) {
      fetchProperty();
    }
  }, [id]);

  const fetchProvinces = async () => {
    try {
      const response = await apiClient.get('/api/v1/provinces?all=true');
      setProvinces(response.data?.data?.content || []);
    } catch (err) {
      console.error('Failed to fetch provinces', err);
    }
  };

  const fetchWards = async (provinceId: string) => {
    if (!provinceId) {
      setWards([]);
      return;
    }
    try {
      const response = await apiClient.get(`/api/v1/wards?filter=province.id==${provinceId}&all=true&sort=name,asc`);
      setWards(response.data?.data?.content || []);
    } catch (err) {
      console.error('Failed to fetch wards', err);
    }
  };

  const fetchProperty = async () => {
    try {
      const response = await apiClient.get(`/api/v1/properties/${id}`);
      const data = response.data.data;
      
      setFormData({
        title: data.title || '',
        purpose: data.purpose || 'SELL',
        type: data.type || 'APARTMENT',
        price: data.price?.toString() || '',
        lineAddress: data.lineAddress || '',
        wardId: data.wardId?.toString() || '',
        landArea: data.landArea?.toString() || '',
        floorArea: data.floorArea?.toString() || '',
        floors: data.floors?.toString() || '',
        floorNumber: data.floorNumber?.toString() || '',
        bedrooms: data.bedrooms?.toString() || '',
        bathrooms: data.bathrooms?.toString() || '',
        entranceRoadWidth: data.entranceRoadWidth?.toString() || '',
        direction: data.direction || '',
        balconyDirection: data.balconyDirection || '',
        interior: data.interior || '',
        status: data.status || 'AVAILABLE',
        description: data.description || '',
      });

      // If we have a wardId, we might need to find its province
      // This part depends on if the ward response contains provinceId
      if (data.wardId) {
        try {
          const wardRes = await apiClient.get(`/api/v1/wards/${data.wardId}`);
          const provinceId = wardRes.data?.data?.provinceId?.toString();
          if (provinceId) {
            setSelectedProvinceId(provinceId);
            fetchWards(provinceId);
          }
        } catch (e) {
          console.error("Failed to fetch ward details for province mapping", e);
        }
      }
    } catch (err) {
      console.error('Failed to fetch property details', err);
      setError('Failed to load property details.');
    } finally {
      setIsFetching(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleProvinceChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const provinceId = e.target.value;
    setSelectedProvinceId(provinceId);
    setFormData(prev => ({ ...prev, wardId: '' }));
    fetchWards(provinceId);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    const payload = {
      ...formData,
      price: parseFloat(formData.price) || 0,
      wardId: formData.wardId ? parseInt(formData.wardId) : undefined,
      landArea: formData.landArea ? parseFloat(formData.landArea) : undefined,
      floorArea: formData.floorArea ? parseFloat(formData.floorArea) : undefined,
      floors: formData.floors ? parseInt(formData.floors) : undefined,
      floorNumber: formData.floorNumber ? parseInt(formData.floorNumber) : undefined,
      bedrooms: formData.bedrooms ? parseInt(formData.bedrooms) : undefined,
      bathrooms: formData.bathrooms ? parseInt(formData.bathrooms) : undefined,
      entranceRoadWidth: formData.entranceRoadWidth ? parseFloat(formData.entranceRoadWidth) : undefined,
    };

    try {
      if (isEditing) {
        await apiClient.put(`/api/v1/properties/${id}`, payload);
      } else {
        await apiClient.post('/api/v1/properties', payload);
      }
      navigate('/my-properties');
    } catch (err: any) {
      console.error('Failed to save property', err);
      setError(err.response?.data?.message || 'Failed to save property. Please check your inputs.');
    } finally {
      setIsLoading(false);
    }
  };

  if (isFetching) {
    return (
      <div className="property-form-wrapper">
        <TopNavBar />
        <div className="loading-overlay">
          <div className="spinner"></div>
          <p>Loading property details...</p>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="property-form-wrapper">
      <TopNavBar />
      
      <main className="form-container">
        <header className="form-header">
          <Link to="/my-properties" className="back-link">
            <MdArrowBack size={18} />
            Back to Dashboard
          </Link>
          <h1>{isEditing ? 'Edit Listing' : 'Create Listing'}</h1>
          <p>{isEditing ? 'Enhance and update your property details.' : 'Start listing your property to reach thousands of buyers.'}</p>
        </header>

        {error && (
          <div className="error-message">
            <MdInfo size={24} />
            {error}
          </div>
        )}

        <form className="premium-form-card" onSubmit={handleSubmit}>
          {/* Section 1: Basic Info */}
          <section className="form-section">
            <div className="section-title">
              <div className="section-icon"><MdInfo size={20} /></div>
              <h2>Basic Information</h2>
            </div>
            
            <div className="form-grid">
              <div className="input-group grid-full">
                <label>Property Title *</label>
                <div className="input-wrapper">
                  <input 
                    type="text" 
                    name="title" 
                    className="form-input"
                    value={formData.title} 
                    onChange={handleChange} 
                    required 
                    placeholder="e.g. Stunning 3-Bedroom Penthouse with Ocean View"
                  />
                </div>
              </div>

              <div className="input-group">
                <label>Price ($) *</label>
                <div className="input-wrapper has-icon">
                  <MdAttachMoney className="input-icon" size={20} />
                  <input 
                    type="number" 
                    name="price" 
                    className="form-input"
                    value={formData.price} 
                    onChange={handleChange} 
                    required 
                    min="0"
                    step="0.01"
                    placeholder="e.g. 250000"
                  />
                </div>
              </div>

              <div className="input-group">
                <label>Status *</label>
                <select name="status" className="form-select" value={formData.status} onChange={handleChange} required>
                  <option value="AVAILABLE">Available</option>
                  <option value="PENDING">Pending</option>
                  <option value="SOLD">Sold</option>
                  <option value="RENTED">Rented</option>
                  <option value="OFF_MARKET">Off Market</option>
                </select>
              </div>

              <div className="input-group">
                <label>Purpose</label>
                <select name="purpose" className="form-select" value={formData.purpose} onChange={handleChange}>
                  <option value="SELL">For Sale</option>
                  <option value="RENT">For Rent</option>
                </select>
              </div>

              <div className="input-group">
                <label>Property Type</label>
                <select name="type" className="form-select" value={formData.type} onChange={handleChange}>
                  <option value="APARTMENT">Apartment</option>
                  <option value="HOUSE">House</option>
                  <option value="VILLA">Villa</option>
                  <option value="COMMERCIAL">Commercial</option>
                  <option value="LAND">Land</option>
                </select>
              </div>
            </div>
          </section>

          {/* Section 2: Location */}
          <section className="form-section">
            <div className="section-title">
              <div className="section-icon"><MdLocationOn size={20} /></div>
              <h2>Location Details</h2>
            </div>
            
            <div className="form-grid">
              <div className="input-group grid-full">
                <label>Street Address</label>
                <input 
                  type="text" 
                  name="lineAddress" 
                  className="form-input"
                  value={formData.lineAddress} 
                  onChange={handleChange} 
                  placeholder="e.g. 123 Luxury Way"
                />
              </div>

              <div className="input-group">
                <label>Province / City</label>
                <select 
                  className="form-select" 
                  value={selectedProvinceId} 
                  onChange={handleProvinceChange}
                >
                  <option value="">Select Province</option>
                  {provinces.map(p => (
                    <option key={p.id} value={p.id}>{p.name}</option>
                  ))}
                </select>
              </div>

              <div className="input-group">
                <label>Ward / District</label>
                <select 
                  name="wardId" 
                  className="form-select" 
                  value={formData.wardId} 
                  onChange={handleChange}
                  disabled={!selectedProvinceId}
                >
                  <option value="">Select Ward</option>
                  {wards.map(w => (
                    <option key={w.id} value={w.id}>{w.name}</option>
                  ))}
                </select>
              </div>
            </div>
          </section>

          {/* Section 3: Property Features */}
          <section className="form-section">
            <div className="section-title">
              <div className="section-icon"><MdHomeWork size={20} /></div>
              <h2>Property Features</h2>
            </div>
            
            <div className="form-grid grid-3">
              <div className="input-group">
                <label>Land Area (m²)</label>
                <div className="input-wrapper has-icon">
                  <MdSquareFoot className="input-icon" size={18} />
                  <input type="number" name="landArea" className="form-input" value={formData.landArea} onChange={handleChange} min="0" />
                </div>
              </div>
              <div className="input-group">
                <label>Floor Area (m²)</label>
                <div className="input-wrapper has-icon">
                  <MdLayers className="input-icon" size={18} />
                  <input type="number" name="floorArea" className="form-input" value={formData.floorArea} onChange={handleChange} min="0" />
                </div>
              </div>
              <div className="input-group">
                <label>Road Width (m)</label>
                <div className="input-wrapper has-icon">
                  <MdStraighten className="input-icon" size={18} />
                  <input type="number" name="entranceRoadWidth" className="form-input" value={formData.entranceRoadWidth} onChange={handleChange} min="0" />
                </div>
              </div>
              <div className="input-group">
                <label>Bedrooms</label>
                <div className="input-wrapper has-icon">
                  <MdMeetingRoom className="input-icon" size={18} />
                  <input type="number" name="bedrooms" className="form-input" value={formData.bedrooms} onChange={handleChange} min="0" />
                </div>
              </div>
              <div className="input-group">
                <label>Bathrooms</label>
                <div className="input-wrapper has-icon">
                  <MdBathtub className="input-icon" size={18} />
                  <input type="number" name="bathrooms" className="form-input" value={formData.bathrooms} onChange={handleChange} min="0" />
                </div>
              </div>
              <div className="input-group">
                <label>Total Floors</label>
                <input type="number" name="floors" className="form-input" value={formData.floors} onChange={handleChange} min="0" />
              </div>

              <div className="input-group">
                <label>House Direction</label>
                <div className="input-wrapper has-icon">
                  <MdExplore className="input-icon" size={18} />
                  <input type="text" name="direction" className="form-input" value={formData.direction} onChange={handleChange} placeholder="e.g. North" />
                </div>
              </div>
              <div className="input-group">
                <label>Balcony Direction</label>
                <div className="input-wrapper has-icon">
                  <MdExplore className="input-icon" size={18} />
                  <input type="text" name="balconyDirection" className="form-input" value={formData.balconyDirection} onChange={handleChange} placeholder="e.g. East" />
                </div>
              </div>
              <div className="input-group">
                <label>Interior</label>
                <div className="input-wrapper has-icon">
                  <MdChair className="input-icon" size={18} />
                  <input type="text" name="interior" className="form-input" value={formData.interior} onChange={handleChange} placeholder="e.g. Full" />
                </div>
              </div>
            </div>
          </section>

          {/* Section 4: Description */}
          <section className="form-section">
            <div className="section-title">
              <div className="section-icon"><MdDescription size={20} /></div>
              <h2>Detailed Description</h2>
            </div>
            
            <div className="input-group grid-full">
              <textarea 
                name="description" 
                className="form-textarea"
                value={formData.description} 
                onChange={handleChange} 
                placeholder="Describe your property in detail. Mention highlights, renovations, neighborhood, etc..."
              ></textarea>
            </div>
          </section>

          {/* Form Actions */}
          <div className="form-actions">
            <button type="button" className="btn btn-secondary" onClick={() => navigate('/my-properties')} disabled={isLoading}>
              Discard Changes
            </button>
            <button type="submit" className="btn btn-primary" disabled={isLoading}>
              {isLoading ? (
                <>
                  <div className="spinner" style={{ width: '18px', height: '18px', borderWidth: '2px' }}></div>
                  Processing...
                </>
              ) : (
                <>
                  <MdSave size={20} />
                  {isEditing ? 'Update Property' : 'Publish Property'}
                </>
              )}
            </button>
          </div>
        </form>
      </main>

      {isLoading && (
        <div className="loading-overlay">
          <div className="spinner"></div>
          <p>{isEditing ? 'Updating your listing...' : 'Publishing your listing...'}</p>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default PropertyFormPage;
