import React from 'react';

export default function About({ data, onOpenModal, projectTitle = 'Aveon City Sector Zero' }) {
  const title = data?.title || `About ${projectTitle}`;
  const p1 = data?.description || (
    <>
      <b className="text-[#111D46] font-bold">{projectTitle}</b> is a residential project in Airoli, Navi Mumbai, by Delta Tricity. Spread across approximately 5.5 acres, the project offers 1, 2 and 3 BHK residences across three residential towers with heights of 35+ storeys.
    </>
  );

  return (
    <section className="section-card" id="about">
      <h2 className="section-h2">{title}</h2>
      <p className="text-[14px] md:text-[14px] leading-[1.85] text-[#535F73] mt-3">
        {p1}
      </p>
      <p className="text-[14px] md:text-[14px] leading-[1.85] text-[#535F73] mt-3">
        The project is positioned in Airoli, with access to the wider Navi Mumbai and Thane areas. Explore the available configurations, indicative carpet areas, floor plans, project gallery and amenities on this page to understand the development.
      </p>
      <p className="text-[14px] md:text-[14px] leading-[1.85] text-[#535F73] mt-3">
        For the latest availability, final pricing, possession schedule and RERA documentation, request verified details from the sales team before making a decision.
      </p>
      <button
        className="flex mx-auto mt-5 items-center justify-center gap-2 h-11 px-6 border-0 rounded-lg font-['Manrope',sans-serif] font-extrabold text-sm text-white cursor-pointer fxGrad fxScale"
        type="button"
        onClick={() => onOpenModal && onOpenModal('Download Brochure')}
      >
        <span className="inline-block overflow-hidden h-[18px]" aria-hidden="true">
          <i className="block not-italic slideDownEffect">⬇</i>
        </span>
        Download Brochure
      </button>
    </section>
  );
}
