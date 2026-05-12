import React, { useEffect, useState } from 'react';
import apiClient from '../services/api';
import ListingCard, { RANDOM_IMAGES } from './ListingCard';
import type { Listing } from './ListingCard';
import {MdArrowForward} from "react-icons/md";

const FAKE_LISTINGS: Listing[] = [
  {
    id: 'fake-1',
    title: 'The Obsidian Pavilion',
    location: 'Beverly Hills, CA',
    price: '$12,450,000',
    beds: 5,
    baths: 6,
    sqft: 8200,
    image: RANDOM_IMAGES[0],
    isExclusive: true,
  },
  {
    id: 'fake-2',
    title: 'Azure Glass Penthouse',
    location: 'Miami Beach, FL',
    price: '$4,200,000',
    beds: 3,
    baths: 3,
    sqft: 2400,
    image: RANDOM_IMAGES[1],
  },
  {
    id: 'fake-3',
    title: 'Minimalist Alpine Villa',
    location: 'Aspen, CO',
    price: '$7,850,000',
    beds: 4,
    baths: 4,
    sqft: 4500,
    image: RANDOM_IMAGES[2],
  },
];

const FeaturedListings: React.FC = () => {
  const [listings, setListings] = useState<Listing[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchProperties();
  }, []);

  const fetchProperties = async () => {
    try {
      const response = await apiClient.get('/api/v1/properties?size=6&sort=createdAt,desc');
      const apiData = response.data?.data?.content || [];
      
      if (apiData.length > 0) {
        const mappedListings: Listing[] = apiData.map((prop: any, index: number) => ({
          id: prop.id.toString(),
          title: prop.title,
          location: prop.lineAddress || 'Global Location',
          price: new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(prop.price),
          beds: prop.bedrooms || 0,
          baths: prop.bathrooms || 0,
          sqft: prop.landArea || 0,
          image: RANDOM_IMAGES[index % RANDOM_IMAGES.length],
          isExclusive: index % 3 === 0
        }));
        setListings(mappedListings);
      } else {
        setListings(FAKE_LISTINGS);
      }
    } catch (err) {
      console.error('Failed to fetch properties', err);
      setListings(FAKE_LISTINGS);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <section className="py-24 bg-white px-6">
        <div className="max-w-screen-2xl mx-auto flex justify-center items-center h-[400px]">
          <div className="flex flex-col items-center gap-4">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-slate-900"></div>
            <p className="text-slate-400 font-bold uppercase tracking-widest text-[10px]">Curating Excellence...</p>
          </div>
        </div>
      </section>
    );
  }

  if (listings.length === 0) return null;

  return (
    <section className="py-32 bg-slate-50 px-6 overflow-hidden">
      <div className="max-w-screen-2xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 mb-6">
              <span className="w-12 h-[1px] bg-emerald-500"></span>
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-emerald-600">
                Exclusive Portfolio
              </span>
            </div>
            <h2 aria-label={"Featured Architecture"} className="text-4xl md:text-5xl font-black tracking-tighter text-slate-950 mb-4 leading-none">
              Featured <span className="text-slate-300">Architecture</span>
            </h2>
            <p className="text-slate-500 text-base font-medium max-w-lg leading-relaxed">
              Explore our hand-selected collection of world-class properties that redefine the boundaries of luxury living and modern design.
            </p>
          </div>
          <a
            className="group flex items-center gap-4 text-slate-950 font-black text-sm uppercase tracking-widest border-b-2 border-slate-950 pb-2 transition-all hover:gap-6"
            href="/properties"
          >
            Explore All
            <MdArrowForward className="group-hover:translate-x-1 transition-transform" size={24} />
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {listings.slice(0, 3).map((listing) => (
            <ListingCard key={listing.id} listing={listing} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedListings;
