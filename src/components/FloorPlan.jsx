import floorPlanImg from '../assets/floor_plan.webp';
import { resolveAssetUrl } from '../admin/api';

export default function FloorPlan({ data, onOpenModal, projectTitle = 'Arban City Sector 0' }) {
  const floorPlans = Array.isArray(data) ? data : [];
  if (floorPlans.length === 0) return null;

  return (
    <section id="floor-plan" className="scroll-mt-20 bg-white rounded-none border-l-0 border-y border-r border-gray-200/80 shadow-2xs p-5 sm:p-8 mb-4">
      <div className="mb-5">
        <h2 className="text-xl sm:text-2xl font-black text-gray-900 tracking-tight">
          Site &amp; Floor Plan Of {projectTitle}
        </h2>
        <p className="text-sm text-[#475569] mt-1.5">
          Explore master layouts and unit configurations with carpet areas. Click on any plan to view detailed specifications.
        </p>
      </div>

      {/* Grid of Floor Plan Cards */}
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
                  src={resolveAssetUrl(image)}
                  alt={item.alt || `${unitType} Floor Plan Layout`}
                  title={item.title || `${unitType} - ${projectTitle} Floor Plan`}
                  loading={item.loading || "lazy"}
                  decoding={item.decoding || "async"}
                  width={item.width || undefined}
                  height={item.height || undefined}
                  data-caption={`${unitType} Floor Plan`}
                  className="w-full h-full object-contain transition-all duration-300 group-hover:scale-105"
                  onError={(e) => {
                    if (e.target.src !== floorPlanImg) {
                      e.target.src = floorPlanImg;
                    }
                  }}
                />
                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 flex items-center justify-center transition-all opacity-0 group-hover:opacity-100">
                  <span className="bg-[#111D46] text-white text-xs font-bold px-3 py-1.5 rounded shadow">
                    View Plan
                  </span>
                </div>
              </div>

              {/* Bottom dark banner with unit title and details */}
              <div className="bg-[#2b2619] group-hover:bg-[#8f7635] text-white py-2.5 px-4 text-center transition-colors">
                <div className="font-extrabold text-sm tracking-wide">{unitType}</div>
                {item.carpet_area && (
                  <div className="text-[11px] text-gray-200 mt-0.5">{item.carpet_area} {item.price ? `· ${item.price}` : ''}</div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
