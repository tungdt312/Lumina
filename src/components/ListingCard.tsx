import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MdLocationOn, MdHotel, MdBathtub, MdSquareFoot } from 'react-icons/md';

export interface Listing {
  id: string;
  title: string;
  location: string;
  price: string;
  beds: number;
  baths: number;
  sqft: number;
  image: string;
  isExclusive?: boolean;
}

export const RANDOM_IMAGES = [
  'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&q=80&w=800',
  'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=800',
  'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=800',
  'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=800',
  'https://images.unsplash.com/photo-1600607687940-4e2a09695d51?auto=format&fit=crop&q=80&w=800',
  'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&q=80&w=800',
  'https://images.unsplash.com/photo-1600585154542-637190ec3741?auto=format&fit=crop&q=80&w=800',
  'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&q=80&w=800',
];

const ListingCard: React.FC<{ listing: Listing }> = ({ listing }) => {
  const navigate = useNavigate();
  return (
    <div 
      onClick={() => navigate(`/properties/${listing.id}`)}
      className="group relative h-[420px] rounded-[2rem] bg-white overflow-hidden transition-all duration-700 hover:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.3)] hover:-translate-y-3 cursor-pointer"
      role="link"
      tabIndex={0}
      onKeyPress={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          navigate(`/properties/${listing.id}`);
        }
      }}
      aria-label={`View ${listing.title} in ${listing.location} for ${listing.price}`}
    >
      {/* Hero Image */}
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        <img
          className="w-full h-full object-cover transition-transform duration-[1.5s] group-hover:scale-110"
          alt="" 
          src={listing.image}
        />
        {/* Sophisticated Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500"></div>
      </div>

      {/* Top Bar: Badges & Price */}
      <div className="absolute top-6 left-6 right-6 flex justify-between items-start z-10">
        <div className="flex flex-wrap gap-2">
          {listing.isExclusive && (
            <span className="px-3 py-1.5 rounded-full bg-emerald-500 text-white text-[9px] font-black uppercase tracking-[0.15em] shadow-lg shadow-emerald-500/30">
              Exclusive
            </span>
          )}
          <span className="px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-[9px] font-black uppercase tracking-[0.15em]">
            New
          </span>
        </div>
        
        <div className="px-4 py-2 rounded-2xl bg-white text-slate-950 shadow-2xl">
          <span className="text-sm font-black tracking-tight">{listing.price}</span>
        </div>
      </div>

      {/* Bottom Content: Title & Stats */}
      <div className="absolute bottom-0 left-0 w-full p-8 z-20">
        <div className="flex flex-col gap-4 transform transition-transform duration-500 group-hover:-translate-y-2">
          <div className="flex items-center gap-2 text-white/60 text-[10px] font-bold uppercase tracking-[0.2em]">
            <MdLocationOn className="text-emerald-400" size={14} />
            <span className="truncate">{listing.location}</span>
          </div>

          <h3 className="text-2xl md:text-3xl font-black text-white leading-[1.1] tracking-tighter">
            {listing.title}
          </h3>

          {/* Stats Bar (Elegant Style) */}
          <div className="flex items-center gap-6 mt-2">
            <div className="flex items-center gap-2.5">
              <MdHotel className="text-emerald-400" size={18} />
              <div className="flex flex-col -gap-1">
                <span className="text-white text-sm font-black">{listing.beds}</span>
                <span className="text-white/40 text-[8px] font-black uppercase tracking-tighter">Beds</span>
              </div>
            </div>
            
            <div className="flex items-center gap-2.5">
              <MdBathtub className="text-emerald-400" size={18} />
              <div className="flex flex-col -gap-1">
                <span className="text-white text-sm font-black">{listing.baths}</span>
                <span className="text-white/40 text-[8px] font-black uppercase tracking-tighter">Baths</span>
              </div>
            </div>

            <div className="flex items-center gap-2.5">
              <MdSquareFoot className="text-emerald-400" size={18} />
              <div className="flex flex-col -gap-1">
                <span className="text-white text-sm font-black">{listing.sqft}</span>
                <span className="text-white/40 text-[8px] font-black uppercase tracking-tighter">Sq.Ft</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Hover Interaction Layer */}
      <div className="absolute inset-0 border-[6px] border-white/0 group-hover:border-white/10 transition-all duration-500 rounded-[2rem] pointer-events-none"></div>
    </div>
  );
};

export default ListingCard;
