import React from 'react';
import { Download, ChevronRight } from 'lucide-react';

export default function Amenities({ data, onOpenModal, projectTitle = 'Arban City Sector 0' }) {
  const externalAmenities = Array.isArray(data?.external) && data.external.length > 0
    ? data.external
    : ['Dual Luxury Clubhouses', 'Elevated Nature Walk', 'Reflexology Walking Trail', 'Eco-Smart Sustainable Systems', 'Spa, Sauna & Jacuzzi', 'Kids’ Pool & Mini Theatre'];

  const internalAmenities = Array.isArray(data?.internal) && data.internal.length > 0
    ? data.internal
    : ['Grand Banquet Hall', 'Rooftop Infinity Edge Pool', 'Squash & Badminton Arena', 'High-Speed Automated Elevators', 'EV Charging Infrastructure', 'Multi-Tier 24x7 Security'];

  const allAmenities = [...externalAmenities, ...internalAmenities];

  return (
    <section id="amenities" className="scroll-mt-20 bg-white rounded-none border-l-0 border-y border-r border-gray-200/80 shadow-2xs p-5 sm:p-8 mb-4">
      {/* Top Header Row matching Kohinoor */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-5">
        <h2 className="text-xl sm:text-2xl font-black text-gray-900 tracking-tight">
          Amenities Of {projectTitle}
        </h2>
        <button
          type="button"
          onClick={() => onOpenModal && onOpenModal('Download Amenities Brochure')}
          className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-[#8f7635] hover:bg-[#7a642b] text-white font-extrabold text-xs sm:text-sm rounded-md transition-all cursor-pointer shadow-xs uppercase tracking-wide shrink-0 self-start sm:self-auto"
        >
          <Download size={16} />
          <span>Download Amenities</span>
        </button>
      </div>

      {/* Clean Boxed Amenity List matching Kohinoor */}
      <div className="bg-slate-50/60 rounded-md border border-gray-200 p-5 sm:p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-x-8 gap-y-3.5">
          {allAmenities.map((amenity, idx) => (
            <div key={idx} className="flex items-center gap-2.5 text-gray-800 text-xs sm:text-sm font-bold">
              <span className="w-4 h-4 rounded bg-[#8f7635] text-white flex items-center justify-center shrink-0">
                <ChevronRight size={13} className="stroke-[3]" />
              </span>
              <span className="truncate">{amenity}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
