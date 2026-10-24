import React from 'react';
import { CheckCircle2, ChevronRight } from 'lucide-react';

export default function PropertySpecification({ data }) {
  const defaultSpecs = [
    'Sprawled Over 5.5 Acres of Premium Land',
    'Over 35 High-End Amenities on Podium & Rooftop',
    '3 Luxurious Towers Rising 35+ Floors',
    'Seamless Travel – 5 Mins to Railway Station',
    'Prime Frontage on Thane–Belapur Road',
    'Just 10 Mins to Prominent IT Parks',
  ];

  const specsList = Array.isArray(data) && data.length > 0
    ? data.map((item) => (typeof item === 'string' ? item : item.text))
    : defaultSpecs;

  return (
    <section id="specifications" className="scroll-mt-20 bg-white rounded-none border-l-0 border-y border-r border-gray-200/80 shadow-2xs p-5 sm:p-8 mb-4 overflow-hidden">
      <div className="mb-6">
        <div className="inline-block px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold uppercase tracking-wider mb-2">
          Key Features & Highlights
        </div>
        <h2 className="text-2xl sm:text-3xl font-black text-[#0f2444] tracking-tight">
          Property Specifications
        </h2>
        <p className="text-sm sm:text-base text-gray-600 mt-1 font-medium">
          Thoughtfully curated architectural highlights and location advantages
        </p>
      </div>

      <div className="border border-slate-200 rounded-2xl overflow-hidden shadow-2xs divide-y divide-slate-100 bg-slate-50/50">
        {specsList.map((spec, index) => (
          <div
            key={index}
            className="flex items-center gap-3.5 px-4 sm:px-6 py-3.5 sm:py-4 bg-white hover:bg-slate-50 transition-colors"
          >
            <div className="w-7 h-7 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
              <ChevronRight size={18} className="stroke-[2.5]" />
            </div>
            <span className="text-sm sm:text-base font-bold text-slate-800 tracking-tight">
              {spec}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
