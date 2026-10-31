import React, { useState } from 'react';

export default function Amenities({ data, projectTitle = 'Aveon City Sector Zero' }) {
  const [extOpen, setExtOpen] = useState(false);
  const [intOpen, setIntOpen] = useState(false);

  const defaultExternal = [
    'Swimming Pool & Kids Pool',
    'Grand Clubhouse with Lounge',
    'Fully Equipped Modern Gymnasium',
    'Landscaped Podium Garden & Lawns',
    'Children’s Dedicated Play Area',
    'Jogging & Walking Track',
    'Yoga & Meditation Deck',
    'Multipurpose Sports Court',
    'Senior Citizens Gazebo Seating',
    'Indoor Games Arena (Table Tennis, Carrom, Chess)',
    'Rooftop Stargazing Deck',
    'Grand Entrance Lobby with High Ceilings',
  ];

  const defaultInternal = [
    'Vitrified Tile Flooring in All Rooms',
    'Granite Kitchen Platform with SS Sink',
    'Branded Sanitary Ware & CP Bath Fittings',
    'Video Door Phone & Intercom Facility',
    'Concealed Copper Wiring with Modular Switches',
    'Powder-Coated Aluminium Sliding Windows',
    'Provision for Inverter & Water Purifier',
    'Anti-skid Ceramic Tiles in Bathrooms & Balconies',
    'Laminated Flush Doors with Premium Hardware',
    'AC Points Provision in Living & Bedrooms',
  ];

  const externalList = Array.isArray(data?.external) && data.external.length > 0 ? data.external : defaultExternal;
  const internalList = Array.isArray(data?.internal) && data.internal.length > 0 ? data.internal : defaultInternal;

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
