import { resolveAssetUrl } from '../admin/api';

export default function PropertySpecification({ data, projectTitle = 'Arban City Sector 0' }) {
  const specs = Array.isArray(data) ? data : [];
  if (specs.length === 0) return null;

  return (
    <section className="section-card" id="specifications">
      <h2 className="section-h2 !text-[20px]">{projectTitle} Property Specifications</h2>
      <div className="border border-[#CFD3D8] mt-4 md:mx-4 divide-y divide-[#E5E5E5]">
        {specs.map((item, idx) => (
          <div
            key={item.id || idx}
            className={`flex items-center gap-2.5 min-h-10 px-3.5 py-2 text-xs md:text-sm leading-normal ${
              idx % 2 === 0 ? 'bg-[#F2F2F2]' : 'bg-white'
            }`}
          >
            <i className="shrink-0 w-4 h-4 rounded-full bg-[#32363A] text-white flex items-center justify-center font-bold text-[11px] leading-none not-italic pb-0.5">
              ›
            </i>
            <span className="text-[#18243E]">
              {typeof item === 'string' ? item : item.text || item.title || item.name || item.value}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
