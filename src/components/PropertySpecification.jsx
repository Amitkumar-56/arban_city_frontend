export default function PropertySpecification({ data, projectTitle = 'Aveon City Sector Zero' }) {
  const defaultSpecs = [
    `${projectTitle} is a residential development by Delta Tricity`,
    'Located in Airoli, Navi Mumbai',
    'Planned across approximately 5.5 acres of land',
    'Planned with 3 towers rising 35+ storeys',
    'Configurations include 1, 2 & 3 BHK residences',
    'Indicative prices start from ₹89 Lakhs*',
  ];

  const specs = Array.isArray(data) && data.length > 0 ? data : defaultSpecs;

  return (
    <section className="section-card" id="specifications">
      <h2 className="section-h2 !text-[20px]">{projectTitle} Property Specifications</h2>
      <div className="border border-[#CFD3D8] mt-4 md:mx-4 divide-y divide-[#E5E5E5]">
        {specs.map((item, idx) => (
          <div
            key={idx}
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
