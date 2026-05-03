import React from 'react';
import { MdPublic, MdVerified } from 'react-icons/md';

interface Location {
  id: string;
  name: string;
  properties: number;
  image: string;
}

const PopularLocations: React.FC = () => {
  const locations: Location[] = [
    {
      id: '1',
      name: 'Paris',
      properties: 24,
      image:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuCVflZCCn7D_q1q6f-eqw-v_Sod8Dep5EPVruIIsF4PABcVwAEIPFrIrgiOaFXsU49Nhj7bv9wbcF8f-JFedK3HMu1VKUnkgjZu9EBGib-cNJmbQorCHsC9m6wpczH0pvXBWjUUupFbMYyNL7LuCX6IaR1gBs5wegkBGhOVLaFOb5pWvcK50pFSfGQsHGjRAz3Xu3zvGD-YOsUrP3q5DG-yNYuWFNjt2wl63FdF2J0PFlPimzthgn3FZlyJ8sFzq2ZerroWp1b00Jwx',
    },
    {
      id: '2',
      name: 'New York',
      properties: 86,
      image:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuAZLdgTDIv-z8sjlFbTos4qbTl_bE9dtbXnPQIG1shrNb8kx6unDAP_4cujuZFop8JdCv_Axgo2jfLowZM6NI1hu_3ViQtFG_9thriwduDgR81MLtyCoASKIbiCxIVdKg77E68xmk3viq70ALyElpwMOpw9YvtGuzUPq3Tc1Tqjl4kmFgOT6-qgRpUHjHuzyxyftnIr6L3IPgHHgu24b7j-DnJtB2n7R_-RdEtYnkklWM8x-XtTlnaVhuK_0XdGy8v1Wr514n6wl8sG',
    },
    {
      id: '3',
      name: 'Dubai',
      properties: 42,
      image:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuBOVcBqmYGunkN2uA0seQJo4uHMzvf7VP1pw_F5WWnKw17eZJE_B1BUEhUk09fvI2PYRXrL90hmSU7rx91F_mA2wPoQUjVqeTCaoxCOBroevqksesrfRXa5rH2fu7XJ5MD3A5Mn-JCBb4lqwDWHUs8UVZZXY1kIPeOnfWjSg-cqE4MFFctfdICTMTjo3ST02mLFjupEHgWTSk6FIUz5Dt1egvpUmZfyTa6Vtc7331S3FYoGAwCp_Z43sxI87re5QyxbBowhnTOe3ofq',
    },
    {
      id: '4',
      name: 'Sydney',
      properties: 19,
      image:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuCn6JvvXBRbhovNXBwWu7KalbaVW9PFFBJzKHKLe6azCynF6ruQnntafIBOHr72wWK41gbao2aCP20srJICEAlKGqsgg9xaMKzlkzWeB_ps0SaVhn1b7t1mMvINNTsVhnPm_W4P3GW--g3jjVJoALf6iAVrflaDmDd3j3yow59X9l6RhRsOLn0hOVGp1MajPmcuVTWH15dnNfbiK-V53D8WXxSL2J4nZGZanKF83QqRR4dkL7LOqDKFzrGyblXjxppRmaieTKE7G9C_',
    },
  ];

  return (
    <section className="py-24 bg-slate-50">
      <div className="max-w-screen-2xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div className="order-2 md:order-1">
            <div className="grid grid-cols-2 gap-4">
              <div className="pt-12">
                <div className="bg-white p-4 rounded-lg shadow-md mb-4 group cursor-pointer transition-all hover:-translate-y-1">
                  <img className="w-full h-40 object-cover rounded mb-4" alt={locations[0].name} src={locations[0].image} />
                  <h5 className="font-bold text-slate-900">{locations[0].name}</h5>
                  <p className="text-xs text-slate-500">{locations[0].properties} Properties</p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-md group cursor-pointer transition-all hover:-translate-y-1">
                  <img className="w-full h-64 object-cover rounded mb-4" alt={locations[1].name} src={locations[1].image} />
                  <h5 className="font-bold text-slate-900">{locations[1].name}</h5>
                  <p className="text-xs text-slate-500">{locations[1].properties} Properties</p>
                </div>
              </div>
              <div>
                <div className="bg-white p-4 rounded-lg shadow-md mb-4 group cursor-pointer transition-all hover:-translate-y-1">
                  <img className="w-full h-64 object-cover rounded mb-4" alt={locations[2].name} src={locations[2].image} />
                  <h5 className="font-bold text-slate-900">{locations[2].name}</h5>
                  <p className="text-xs text-slate-500">{locations[2].properties} Properties</p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-md group cursor-pointer transition-all hover:-translate-y-1">
                  <img className="w-full h-40 object-cover rounded mb-4" alt={locations[3].name} src={locations[3].image} />
                  <h5 className="font-bold text-slate-900">{locations[3].name}</h5>
                  <p className="text-xs text-slate-500">{locations[3].properties} Properties</p>
                </div>
              </div>
            </div>
          </div>
          <div className="order-1 md:order-2">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-slate-500 mb-4 block">
              Global Presence
            </span>
            <h2 className="text-4xl md:text-5xl font-black tracking-tighter text-slate-900 mb-8">
              Popular Locations
            </h2>
            <p className="text-slate-600 text-lg leading-relaxed mb-8">
              We bridge the gap between architectural aspiration and reality. Our portfolio spans the most
              significant design capitals of the world, offering unparalleled access to homes that are themselves
              works of art.
            </p>
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-2 bg-white px-6 py-3 rounded-lg border border-slate-200 shadow-sm">
                <MdPublic className="text-slate-900" size={20} />
                <span className="font-bold text-sm">International Reach</span>
              </div>
              <div className="flex items-center gap-2 bg-white px-6 py-3 rounded-lg border border-slate-200 shadow-sm">
                <MdVerified className="text-slate-900" size={20} />
                <span className="font-bold text-sm">Curated Selection</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PopularLocations;
