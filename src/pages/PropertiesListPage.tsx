import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import apiClient from '../services/api';
import TopNavBar from '../components/TopNavBar';
import Footer from '../components/Footer';
import ListingCard, { RANDOM_IMAGES } from '../components/ListingCard';
import type { Listing } from '../components/ListingCard';
import { MdSearch, MdFilterList, MdArrowForward } from 'react-icons/md';
import './PropertiesList.css';

const PropertiesListPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [listings, setListings] = useState<Listing[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState(searchParams.get('search') || '');
  const [totalElements, setTotalElements] = useState(0);
  const [page, setPage] = useState(0);

  useEffect(() => {
    fetchProperties(0, true);
  }, [searchParams]);

  const fetchProperties = async (pageNum: number, reset: boolean = false) => {
    setIsLoading(true);
    try {
      const search = searchParams.get('search') || '';
      let filterQuery = '';
      if (search.trim()) {
        const term = encodeURIComponent(search.trim());
        filterQuery = `filter=title=='*${term}*' or lineAddress=='*${term}*'`;
      }

      const response = await apiClient.get(`/api/v1/properties?${filterQuery}&page=${pageNum}&size=9&sort=createdAt,desc`);
      const apiData = response.data?.data?.content || [];
      const total = response.data?.data?.totalElements || 0;

      const mappedListings: Listing[] = apiData.map((prop: any, index: number) => ({
        id: prop.id.toString(),
        title: prop.title,
        location: prop.lineAddress || 'Global Location',
        price: new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(prop.price),
        beds: prop.bedrooms || 0,
        baths: prop.bathrooms || 0,
        sqft: prop.landArea || 0,
        image: RANDOM_IMAGES[(pageNum * 9 + index) % RANDOM_IMAGES.length],
        isExclusive: (pageNum * 9 + index) % 5 === 0
      }));

      if (reset) {
        setListings(mappedListings);
      } else {
        setListings(prev => [...prev, ...mappedListings]);
      }
      setTotalElements(total);
      setPage(pageNum);
    } catch (err) {
      console.error('Failed to fetch properties', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchParams({ search: searchTerm });
  };

  const handleLoadMore = () => {
    fetchProperties(page + 1);
  };

  return (
    <div className="properties-list-wrapper">
      <TopNavBar />
      
      <header className="list-header">
        <div className="max-w-screen-2xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="header-text">
              <h1 className="text-4xl md:text-6xl font-black tracking-tighter text-slate-900 mb-4">
                Explore <span className="text-slate-300">Collections</span>
              </h1>
              <p className="text-slate-500 font-medium">Discover architectural marvels tailored to your legacy.</p>
            </div>
            
            <form onSubmit={handleSearchSubmit} className="search-box-premium">
              <MdSearch className="search-icon" size={24} />
              <input 
                type="text" 
                placeholder="Search by title or address..."
                aria-label="Search properties by title or address"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button type="submit">Search</button>
            </form>
          </div>
        </div>
      </header>

      <main className="max-w-screen-2xl mx-auto px-6 py-16">
        <div className="results-info mb-8 flex justify-between items-center">
          <p className="text-slate-500 font-bold uppercase tracking-widest text-xs">
            {totalElements} Properties Found
          </p>
          <button aria-label="Filter properties" className="flex items-center gap-2 text-slate-900 font-black text-xs uppercase tracking-widest border-b-2 border-slate-900 pb-1">
            <MdFilterList size={18} />
            Filters
          </button>
        </div>

        {listings.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {listings.map((listing) => (
                <ListingCard key={listing.id} listing={listing} />
              ))}
            </div>

            {listings.length < totalElements && (
              <div className="flex justify-center mt-20">
                <button 
                  onClick={handleLoadMore}
                  disabled={isLoading}
                  aria-label="Load more properties"
                  className="group flex items-center gap-4 bg-slate-900 text-white px-10 py-5 rounded-2xl font-black uppercase tracking-widest text-sm hover:bg-slate-800 transition-all active:scale-95 disabled:opacity-50"
                >
                  {isLoading ? 'Loading...' : 'Discover More'}
                  <MdArrowForward className="group-hover:translate-x-2 transition-transform" size={20} />
                </button>
              </div>
            )}
          </>
        ) : !isLoading && (
          <div className="empty-results">
            <h2 className="text-3xl font-black text-slate-900 mb-4">No Properties Found</h2>
            <p className="text-slate-500 mb-8">Try adjusting your search terms or filters to find what you're looking for.</p>
            <button 
              onClick={() => { setSearchTerm(''); setSearchParams({}); }}
              aria-label="Clear search filters"
              className="px-8 py-4 bg-slate-900 text-white rounded-xl font-bold"
            >
              Clear Search
            </button>
          </div>
        )}

        {isLoading && listings.length === 0 && (
          <div className="flex justify-center items-center h-[400px]">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-slate-900"></div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default PropertiesListPage;
