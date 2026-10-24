import React from 'react';
import floorPlanImg from '../assets/floor_plan.webp';

export default function FloorPlan({ data, onOpenModal, projectTitle = 'Arban City Sector 0' }) {
  const floorPlans = Array.isArray(data) ? data : [];
  if (floorPlans.length === 0) return null;

  return (
    <section id="floor-plan" className="scroll-mt-20 bg-white rounded-none border-l-0 border-y border-r border-gray-200/80 shadow-2xs p-5 sm:p-8 mb-4">
      <div className="mb-5">
        <h2 className="text-xl sm:text-2xl font-black text-gray-900 tracking-tight">
          Site &amp; Floor Plan Of {projectTitle}
        </h2>
      </div>

      {/* Grid of 3 Floor Plan Cards matching Kohinoor */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {floorPlans.map((item, index) => {
          const unitType = item.unit_type || item.type || `Unit Layout ${index + 1}`;
          const image = item.image_url || floorPlanImg;

          return (
            <div
              key={item.id || index}
              onClick={() => onOpenModal && onOpenModal(`Floor Plan - ${unitType}`)}
              className="bg-white rounded-md border border-gray-200 overflow-hidden shadow-2xs hover:shadow-md transition-all cursor-pointer group flex flex-col"
            >
              <div className="relative aspect-[4/3] bg-slate-50 flex items-center justify-center p-3 overflow-hidden">
                <img
                  src={image}
                  alt={`${unitType} Floor Plan`}
                  data-caption={`${unitType} Floor Plan`}
                  className="w-full h-full object-contain filter blur-[1px] group-hover:blur-0 transition-all duration-300"
                />
                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/25 flex items-center justify-center transition-all opacity-0 group-hover:opacity-100">
                  <span className="bg-[#8f7635] text-white text-xs font-bold px-3 py-1.5 rounded shadow">
                    Unlock Plan
                  </span>
                </div>
              </div>

              {/* Bottom dark banner with unit title */}
              <div className="bg-[#2b2619] group-hover:bg-[#8f7635] text-white py-2.5 px-4 text-center font-extrabold text-sm tracking-wide transition-colors">
                {unitType}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
