import React, { useState } from 'react';

export default function FaqSection({ data, projectTitle = 'Arban City Sector 0' }) {
  const faqs = Array.isArray(data) ? data : [];
  if (faqs.length === 0) return null;
  const [openIdx, setOpenIdx] = useState(0);

  const toggle = (idx) => {
    setOpenIdx((prev) => (prev === idx ? null : idx));
  };

  return (
    <section className="section-card" id="faq">
      <div className="text-center font-bold text-[11px] tracking-[1.6px] uppercase text-[#F26635] mb-1">
        Answers you need
      </div>
      <h2 className="section-h2">Frequently asked questions</h2>

      <div className="max-w-[820px] mx-auto mt-4 divide-y divide-[#E8ECF2]">
        {faqs.map((faq, idx) => {
          const isOpen = openIdx === idx;
          return (
            <div key={idx} className="border-b border-[#E8ECF2]">
              <button
                type="button"
                className="w-full flex justify-between gap-4 items-center py-2.5 px-0.5 bg-transparent border-0 text-left font-['Manrope',sans-serif] font-bold text-sm md:text-[14.5px] text-[#111D46] cursor-pointer hover:text-[#F26635] transition-colors"
                onClick={() => toggle(idx)}
              >
                <span>{faq.q || faq.question}</span>
                <span className="shrink-0 w-6 h-6 rounded-full bg-[#F1F4F9] flex items-center justify-center font-bold text-sm leading-none text-[#F26635]">
                  {isOpen ? '−' : '+'}
                </span>
              </button>
              <div
                className={`grid transition-all duration-300 ease-in-out ${
                  isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                }`}
              >
                <div className="overflow-hidden text-[#535F73] text-xs md:text-sm leading-relaxed pr-6 pb-2.5 pt-0.5">
                  {faq.a || faq.answer}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
