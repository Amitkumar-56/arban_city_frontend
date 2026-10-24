import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

export default function FaqSection({ data, projectTitle = 'Arban City Sector 0' }) {
  const defaultFaqs = [
    { question: `Where is ${projectTitle} located?`, answer: `${projectTitle} is strategically located in Airoli, Navi Mumbai, right off Thane-Belapur Road with immediate connectivity to Airoli Railway Station and Eastern Express Highway.` },
    { question: `What is the configuration of apartments in ${projectTitle}?`, answer: `The project offers lavish 1 BHK, 2 BHK, and 3 BHK luxury residences designed with deck views and efficient layouts.` },
    { question: `What is the starting price of apartments in ${projectTitle}?`, answer: `Residences start from ₹ 89 Lakhs* onwards. Detailed pricing sheets, floor-wise cost breakups and flexible payment schedules are available on request.` },
    { question: `What is the land area of the ${projectTitle} project?`, answer: `The township is spread across 5.5 acres of prime land featuring 3 iconic towers rising up to 35+ storeys.` },
    { question: `What schools, malls, and hospitals are near ${projectTitle}?`, answer: `Leading institutions including EuroSchool, Mindspace IT Park, D-Mart, and Reliance Hospital are located within a 5 to 15 minute drive.` },
  ];

  const faqs = Array.isArray(data) && data.length > 0 ? data : defaultFaqs;
  const [openFaq, setOpenFaq] = useState(0);

  return (
    <section id="faqs" className="scroll-mt-20 bg-white rounded-none border-l-0 border-y border-r border-gray-200/80 shadow-2xs p-5 sm:p-8 mb-4">
      <div className="mb-5">
        <h2 className="text-xl sm:text-2xl font-black text-gray-900 tracking-tight">
          FAQs - {projectTitle}
        </h2>
      </div>

      <div className="space-y-2.5">
        {faqs.map((faq, index) => {
          const isOpen = openFaq === index;
          const qText = faq.question || faq.q || '';
          const aText = faq.answer || faq.a || '';

          return (
            <div
              key={faq.id || index}
              className="border border-gray-200 rounded-md overflow-hidden bg-slate-50/50"
            >
              <button
                type="button"
                onClick={() => setOpenFaq(isOpen ? null : index)}
                className="w-full py-3.5 px-4 sm:px-5 flex items-center justify-between text-left text-xs sm:text-sm font-bold text-gray-900 cursor-pointer gap-3 hover:bg-slate-100/70 transition-colors"
              >
                <span className="min-w-0">{qText}</span>
                <span className="text-gray-500 shrink-0">
                  {isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                </span>
              </button>

              {isOpen && (
                <div className="px-4 sm:px-5 pb-4 pt-1 text-xs sm:text-sm text-gray-700 leading-relaxed font-normal border-t border-gray-200/60 bg-white">
                  {aText}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
