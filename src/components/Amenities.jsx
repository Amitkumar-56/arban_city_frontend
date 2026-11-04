import React, { useState } from 'react';

export default function Amenities({ data, projectTitle = 'Arban City Sector 0' }) {
  const [extOpen, setExtOpen] = useState(false);
  const [intOpen, setIntOpen] = useState(false);

  const externalList = Array.isArray(data?.external) ? data.external : [];
  const internalList = Array.isArray(data?.internal) ? data.internal : [];
  if (externalList.length === 0 && internalList.length === 0) return null;

  return (
    <section className="section-card" id="amenities">
      <h2 className="section-h2">Amenities &amp; Internal Features</h2>
      <p className="section-intro text=[14px]" style={{ maxWidth: 920 }}>
        Elevate your lifestyle at {projectTitle} with over <b className="text-[#111D46] font-bold">35+ premium amenities</b>, from a <b className="text-[#111D46] font-bold">Swimming Pool</b> to a fully equipped <b className="text-[#111D46] font-bold">Gymnasium</b>, focused on wellness, recreation and relaxation.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6 mt-5">
        {/* External Amenities */}
        <div>
          <h3 className="font-['Manrope',sans-serif] text-lg md:text-xl font-bold text-[#111D46] text-center mb-2.5">
            External Amenities
          </h3>
          <div className="border border-[#D5D9DF] rounded-xl p-3.5 md:p-5 bg-white min-h-[207px] max-md:min-h-0">
            <ul className="m-0 pl-5 text-xs md:text-[14px] leading-relaxed md:leading-[1.85] text-[#18243E] list-disc space-y-1">
              {externalList.map((item, idx) => {
                if (idx >= 6 && !extOpen) return null;
                return <li key={idx}>{item}</li>;
              })}
            </ul>
            {externalList.length > 6 && (
              <button
                className="block mx-auto mt-2.5 border-0 bg-transparent text-[#C16C46] font-bold text-xs md:text-[13px] cursor-pointer hover:underline"
                type="button"
                onClick={() => setExtOpen(!extOpen)}
              >
                {extOpen ? 'Show Less ↑' : 'Read More ↓'}
              </button>
            )}
          </div>
        </div>

        {/* Internal Features */}
        <div>
          <h3 className="font-['Manrope',sans-serif] text-lg md:text-xl font-bold text-[#111D46] text-center mb-2.5">
            Internal Features
          </h3>
          <div className="border border-[#D5D9DF] rounded-xl p-3.5 md:p-5 bg-white min-h-[207px] max-md:min-h-0">
            <ul className="m-0 pl-5 text-xs md:text-[14px] leading-relaxed md:leading-[1.85] text-[#18243E] list-disc space-y-1">
              {internalList.map((item, idx) => {
                if (idx >= 6 && !intOpen) return null;
                return <li key={idx}>{item}</li>;
              })}
            </ul>
            {internalList.length > 6 && (
              <button
                className="block mx-auto mt-2.5 border-0 bg-transparent text-[#C16C46] font-bold text-xs md:text-[14px] cursor-pointer hover:underline"
                type="button"
                onClick={() => setIntOpen(!intOpen)}
              >
                {intOpen ? 'Show Less ↑' : 'Read More ↓'}
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
