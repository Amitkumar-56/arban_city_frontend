import React from 'react';
import { MapPin, Navigation, Map } from 'lucide-react';

export default function Location({ data, onOpenModal, projectTitle = 'Arban City Sector 0' }) {
  const landmarks = Array.isArray(data?.landmarks) ? data.landmarks : [];
  const officeAddress = data?.office_address || data?.officeAddress || 'Sector 0, Off Thane-Belapur Road, Airoli, Navi Mumbai - 400708';

  return (
    <section id="location" className="scroll-mt-20 bg-white rounded-none border-l-0 border-y border-r border-gray-200/80 shadow-2xs p-5 sm:p-8 mb-4">
      {/* Top Header Row matching Kohinoor */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-5">
        <h2 className="text-xl sm:text-2xl font-black text-gray-900 tracking-tight">
          Address Of {projectTitle}
        </h2>
        <button
          type="button"
          onClick={() => onOpenModal && onOpenModal('Get Detailed Location Map & Driving Directions')}
          className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-[#8f7635] hover:bg-[#7a642b] text-white font-extrabold text-xs sm:text-sm rounded-md transition-all cursor-pointer shadow-xs uppercase tracking-wide shrink-0 self-start sm:self-auto"
        >
          <Navigation size={15} />
          <span>Get Locations</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Map View Card on Left */}
        <div className="lg:col-span-5 bg-slate-100 rounded-md h-64 relative flex flex-col items-center justify-center border-2 border-[#8f7635] overflow-hidden p-4 text-center">
          <MapPin size={36} className="text-[#8f7635] mx-auto mb-2" />
          <h4 className="text-sm font-bold text-gray-900 mb-1">Map View</h4>
          <p className="text-xs text-gray-600 px-4 leading-relaxed font-medium">
            {officeAddress}
          </p>
          <button
            type="button"
            onClick={() => onOpenModal && onOpenModal('View Live Map Location')}
            className="mt-3 inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#8f7635] text-white text-xs font-bold rounded shadow-2xs hover:bg-[#7a642b]"
          >
            <Map size={13} />
            <span>Open in Google Maps</span>
          </button>
        </div>

        {/* Near By Location Landmarks on Right */}
        <div className="lg:col-span-7 bg-slate-50/70 rounded-md border border-gray-200 p-5">
          <h3 className="text-sm sm:text-base font-black text-gray-900 mb-3 pb-2 border-b border-gray-200">
            Near By Location
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2.5">
            {landmarks.map((loc, idx) => (
              <div
                key={loc.id || idx}
                className="flex items-center justify-between text-xs sm:text-sm text-gray-700 py-1 border-b border-gray-100"
              >
                <span className="font-semibold">{loc.name}</span>
                <span className="font-extrabold text-[#8f7635]">{loc.travel_time || loc.time}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
