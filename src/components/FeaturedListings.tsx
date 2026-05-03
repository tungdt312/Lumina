import React from 'react';
import { MdArrowForward } from 'react-icons/md';

interface Listing {
  id: string;
  title: string;
  location: string;
  price: string;
  beds: number;
  baths: number;
  sqft: number;
  image: string;
  isLarge?: boolean;
  isExclusive?: boolean;
}

const FeaturedListings: React.FC = () => {
  const listings: Listing[] = [
    {
      id: '1',
      title: 'The Obsidian Pavilion',
      location: 'Beverly Hills, CA',
      price: '$12,450,000',
      beds: 5,
      baths: 6,
      sqft: 8200,
      image:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuCWPH31hietsOzRFm-iH8KO_5JLnXsukN1cVeBJIe9mPyhpkUiL5j3AivcMtSIPxr4jDm695QvK8AgTd23h3OZ0f1SmugieioOHtA69o1m6w0tuc7VeyM50NdeYWUsnnjvswPv1JvXe2197KdE0DCBzEZEkb-2bm9_Ep8tV3AV99eZDw-k1JmVtygNJ4b6vvPRqlKZt3dgcwqDl9vW8rkZFkl55U_q0Hn3LcFxf-DhHZc733XgvXRBlu8oB1gCd1Jv1tKs1lnSMbmRg',
      isLarge: true,
      isExclusive: true,
    },
    {
      id: '2',
      title: 'Azure Lofts',
      location: 'Miami, FL',
      price: '$2,100,000',
      beds: 3,
      baths: 2,
      sqft: 1800,
      image:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuDEFoVn9YaRnaAVgInUsF6hAs2rK-AcWn7inzTkcDo0AuSGyOpUXqeE8kSAlLg0Ru1YL_sXoNw0PJQB77_wkZJ9v8eYHotE7f0hyQ6NSm2fQRa9iwF0h2pj_mcFT1_p5NHHddomOw4_IaUdtbWligqv8grsy39IhTmiiF6GFaupG3SOk-wsSf14NLIfTMJao4VZQuII3WNoAp64m7cHmORYTsIgcE3-xVNE6V-MQrlbk3aCfyFgV8sV4AxnbuHTMUBsSQYZj_2Eqke4',
    },
    {
      id: '3',
      title: 'Nordic Sanctuary',
      location: 'Aspen, CO',
      price: '$4,850,000',
      beds: 4,
      baths: 3,
      sqft: 3200,
      image:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuDG5Br8EFva8swHs2cLUao2OjX4el3DFboEDk4BEFGZ_NplM_2ij7ZFryaQwzuDDNrZfw1PeasqwKUMDp7w_wXsW7jKV5DYGDPdZu-6aG71vadvdW8-G4dXw6D2DFNHtFbd2ARQOFiclSpMmd8aE0-5bAQ3FhUES93kPAiXO1gY6UknXf55sIL9qElZoa-9gFYcwxDg9-v6McKdt9qvLNe_Ym-59qyhebRRiaX-ss90I8tsJiCzEaOU2dqyB9-HwZT3fX993tXNVNHV',
    },
  ];

  return (
    <section className="py-24 bg-white px-6">
      <div className="max-w-screen-2xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-slate-500 mb-4 block">
              Current Collections
            </span>
            <h2 className="text-4xl md:text-5xl font-black tracking-tighter text-slate-900">
              Featured Listings
            </h2>
          </div>
          <a
            className="group flex items-center gap-2 text-slate-900 font-bold border-b-2 border-slate-900 pb-1"
            href="#"
          >
            View All Properties
            <MdArrowForward className="group-hover:translate-x-1 transition-transform" size={20} />
          </a>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 h-auto md:h-[800px]">
          {/* Large Card */}
          <div className="md:col-span-8 group relative overflow-hidden rounded-lg bg-slate-100">
            <img
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              alt={listings[0].title}
              src={listings[0].image}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
            <div className="absolute bottom-0 left-0 p-8 w-full">
              <div className="flex justify-between items-end">
                <div>
                  {listings[0].isExclusive && (
                    <span className="bg-white/20 backdrop-blur-md text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider mb-4 inline-block">
                      Exclusive
                    </span>
                  )}
                  <h3 className="text-white text-3xl font-bold mb-2">{listings[0].title}</h3>
                  <p className="text-white/80 font-medium">{listings[0].location}</p>
                </div>
                <div className="text-white text-right">
                  <p className="text-2xl font-black">{listings[0].price}</p>
                  <div className="flex gap-4 mt-2 text-sm opacity-80">
                    <span>{listings[0].beds} Bed</span>
                    <span>{listings[0].baths} Bath</span>
                    <span>{listings[0].sqft} sqft</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Side Grid Column */}
          <div className="md:col-span-4 grid grid-rows-2 gap-6">
            {listings.slice(1).map((listing) => (
              <div key={listing.id} className="group relative overflow-hidden rounded-lg bg-slate-100">
                <img
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  alt={listing.title}
                  src={listing.image}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-0 left-0 p-6">
                  <h4 className="text-white text-xl font-bold">{listing.title}</h4>
                  <p className="text-white/80 text-sm">{listing.price}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedListings;
