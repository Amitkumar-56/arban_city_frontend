import React, { useState } from 'react';
import {
  Building,
  UserCheck,
  MapPin,
  Home,
  SlidersHorizontal,
  Calendar,
  Maximize,
  Building2,
  Layers,
  Download,
} from 'lucide-react';

const getOverviewIcon = (label, index) => {
  const l = (label || '').toLowerCase();
  if (l.includes('name') || l.includes('project')) return <Building className="w-5 h-5 text-[#8f7635]" />;
  if (l.includes('developer')) return <UserCheck className="w-5 h-5 text-[#8f7635]" />;
  if (l.includes('location')) return <MapPin className="w-5 h-5 text-[#8f7635]" />;
  if (l.includes('type')) return <Home className="w-5 h-5 text-[#8f7635]" />;
  if (l.includes('config')) return <SlidersHorizontal className="w-5 h-5 text-[#8f7635]" />;
  if (l.includes('possession')) return <Calendar className="w-5 h-5 text-[#8f7635]" />;
  if (l.includes('area')) return <Maximize className="w-5 h-5 text-[#8f7635]" />;
  if (l.includes('tower')) return <Building2 className="w-5 h-5 text-[#8f7635]" />;
  if (l.includes('storey') || l.includes('floor')) return <Layers className="w-5 h-5 text-[#8f7635]" />;
  const icons = [
    <Building key={1} className="w-5 h-5 text-[#8f7635]" />,
    <Building2 key={2} className="w-5 h-5 text-[#8f7635]" />,
    <Layers key={3} className="w-5 h-5 text-[#8f7635]" />,
    <Home key={4} className="w-5 h-5 text-[#8f7635]" />,
  ];
  return icons[index % icons.length];
};

export default function Overview({ data, aboutData, onOpenModal, projectTitle = 'Arban City Sector 0' }) {
  const [expanded, setExpanded] = useState(false);
  const specs = Array.isArray(data) ? data : [];

  const mainDescription = aboutData?.description ||
    `${projectTitle} is a premium residential township located in Airoli, Navi Mumbai, developed by Delta & Tricity Group. Spread across 5.5 acres, the project features 3 towers rising up to 35+ floors and offers 1 BHK, 2 BHK, 3 BHK homes and exclusive residences with deck views. The residences range from 433 to 962 sq. ft. carpet area and start from ₹89 Lacs onwards. Designed around an urban lifestyle concept, the project combines green boulevards, landscaped podiums, and sky terraces with more than 35 curated amenities.`;

  const extraDescription =
    `Strategically positioned off Thane-Belapur Road, ${projectTitle} provides seamless access to major commercial hubs, Airoli Railway Station, Mindspace IT Park, and the Eastern Express Highway. Situated on a prime plot, the project offers residents unparalleled connectivity to top schools, healthcare centers, and lifestyle shopping destinations.`;

  return (
    <section id="overview" className="scroll-mt-20 bg-white rounded-none border-l-0 border-y border-r border-gray-200/80 shadow-2xs p-5 sm:p-8 mb-4">
      {/* Title matching Image 2 */}
      <h2 className="text-xl sm:text-2xl font-black text-gray-900 tracking-tight mb-4">
        Welcome To {projectTitle}
      </h2>

      {/* Description text matching Image 2 */}
      <div className="text-gray-700 text-sm leading-relaxed space-y-3 font-normal">
        <p>{mainDescription}</p>
        {expanded && <p className="animate-in fade-in duration-200">{extraDescription}</p>}
        <button
          type="button"
          onClick={() => setExpanded(!expanded)}
          className="text-gray-900 font-bold underline cursor-pointer text-xs uppercase tracking-wider hover:text-[#8f7635] inline-block"
        >
          {expanded ? 'Read less' : 'Read more'}
        </button>
      </div>

      {/* Download Brochure Button at bottom of text matching Image 2 */}
      <div className="mt-5">
        <button
          type="button"
          onClick={() => onOpenModal && onOpenModal('Download Project Brochure')}
          className="inline-flex items-center gap-2 px-6 py-2.5 text-white font-extrabold text-xs sm:text-sm rounded-md cursor-pointer shadow-md uppercase tracking-wider btn-animated-gradient"
        >
          <Download size={16} />
          <span>Download Brochure</span>
        </button>
      </div>

      {/* Quick Specs Grid */}
      {specs.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 pt-6 mt-6 border-t border-gray-100">
          {specs.map((item, index) => (
            <div
              key={item.id || index}
              className="flex items-start gap-2.5 p-3 rounded-md bg-gray-50/80 border border-gray-100"
            >
              <div className="p-1.5 rounded-md bg-white border border-gray-200 shrink-0">
                {getOverviewIcon(item.label, index)}
              </div>
              <div className="min-w-0 flex-1">
                <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider block truncate">
                  {item.label}
                </span>
                <span className="text-xs sm:text-sm font-extrabold text-gray-900 mt-0.5 block truncate">
                  {item.value}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
