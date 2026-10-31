import { useState } from 'react';

export default function Location({ projectTitle = 'Aveon City Sector Zero' }) {
  const [activeTab, setActiveTab] = useState('connectivity');

  const tabs = [
    { id: 'connectivity', label: 'Connectivity' },
    { id: 'schools', label: 'Schools' },
    { id: 'hospitals', label: 'Hospitals' },
    { id: 'shopping', label: 'Shopping' },
  ];

  const placesData = {
    connectivity: [
      { name: 'Airoli Railway Station', dist: '5 Mins · 1.8 Km' },
      { name: 'Thane–Belapur Road', dist: '3 Mins · 1.0 Km' },
      { name: 'Eastern Express Highway', dist: '12 Mins · 6.5 Km' },
      { name: 'Mulund–Airoli Bridge', dist: '8 Mins · 3.9 Km' },
      { name: 'Upcoming Navi Mumbai Airport', dist: '35 Mins · 24 Km' },
    ],
    schools: [
      { name: 'EuroSchool Airoli', dist: '4 Mins · 1.2 Km' },
      { name: 'VIBGYOR High School', dist: '6 Mins · 2.1 Km' },
      { name: 'Datta Meghe College of Engg.', dist: '7 Mins · 2.4 Km' },
      { name: 'DAV Public School', dist: '8 Mins · 2.8 Km' },
      { name: 'New Horizon Scholars School', dist: '10 Mins · 3.5 Km' },
    ],
    hospitals: [
      { name: 'Fortis Hospital Mulund', dist: '14 Mins · 7.0 Km' },
      { name: 'Indravati Hospital Airoli', dist: '5 Mins · 1.6 Km' },
      { name: 'Criticare Multispeciality Hospital', dist: '6 Mins · 2.2 Km' },
      { name: 'Apollo Hospitals CBD Belapur', dist: '25 Mins · 18 Km' },
    ],
    shopping: [
      { name: 'Mindspace IT Park Airoli', dist: '4 Mins · 1.5 Km' },
      { name: 'D-Mart Airoli', dist: '6 Mins · 2.0 Km' },
      { name: 'R-Mall Mulund', dist: '15 Mins · 7.2 Km' },
      { name: 'Viviana Mall Thane', dist: '18 Mins · 9.5 Km' },
      { name: 'Inorbit Mall Vashi', dist: '20 Mins · 14 Km' },
    ],
  };

  const currentPlaces = placesData[activeTab] || placesData.connectivity;

  return (
    <section className="section-card" id="location">
      <h2 className="section-h2">Location</h2>
      <p className="section-intro">
        Strategically located in <b className="text-[#111D46] font-bold">Airoli, Navi Mumbai</b>, with connectivity to business hubs, schools, hospitals, shopping and public transport.
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-[1.03fr_1fr] gap-6 mt-5 items-stretch">
        {/* Left Side: Map */}
        <div className="relative min-h-[280px] md:min-h-[445px] rounded-xl overflow-hidden border border-[#E8ECF2] bg-[#E9EEF2] shadow-sm">
          <svg viewBox="0 0 500 460" preserveAspectRatio="xMidYMid slice" aria-label="Map of Airoli, Navi Mumbai" className="absolute inset-0 w-full h-full">
            <rect width="500" height="460" fill="#E9EEF2" />
            <path d="M0 330 C120 300 160 380 260 350 S420 300 500 330 V460 H0Z" fill="#CFE3F1" />
            <rect x="40" y="60" width="120" height="90" rx="10" fill="#DCEBD9" />
            <rect x="330" y="150" width="130" height="80" rx="10" fill="#DCEBD9" />
            <path d="M0 210 L500 170" stroke="#fff" strokeWidth="14" />
            <path d="M0 210 L500 170" stroke="#F7D57A" strokeWidth="6" />
            <path d="M210 0 L250 460" stroke="#fff" strokeWidth="10" />
            <path d="M90 0 L140 460 M380 0 L360 460 M0 100 L500 80 M0 280 L500 265" stroke="#fff" strokeWidth="5" />
            <path d="M0 240 L500 205" stroke="#8C97A8" strokeWidth="3" strokeDasharray="10 6" />
            <text x="300" y="160" fontFamily="DM Sans, sans-serif" fontSize="12" fill="#6B7689" fontWeight="700">
              Thane–Belapur Rd
            </text>
            <text x="40" y="232" fontFamily="DM Sans, sans-serif" fontSize="11" fill="#6B7689">
              Railway line
            </text>
            <circle cx="232" cy="190" r="34" fill="rgba(242,102,53,.15)" />
            <path
              d="M232 160c-11 0-20 9-20 20 0 15 20 33 20 33s20-18 20-33c0-11-9-20-20-20z"
              fill="#F26635"
            />
            <circle cx="232" cy="180" r="7" fill="#fff" />
            <rect x="252" y="214" width="160" height="26" rx="6" fill="#fff" />
            <text x="262" y="231" fontFamily="Manrope, sans-serif" fontSize="12" fontWeight="800" fill="#111D46">
              {projectTitle}
            </text>
          </svg>

          <a
            className="absolute left-3.5 bottom-3.5 bg-white text-[#111D46] rounded-lg py-2 px-3.5 font-bold text-xs shadow-md z-10 hover:-translate-y-0.5 transition-transform inline-flex items-center gap-1.5"
            href="https://www.google.com/maps/search/?api=1&query=Sector+Zero+Airoli+Navi+Mumbai"
            target="_blank"
            rel="noopener noreferrer"
          >
            ↗ Open in Google Maps
          </a>
        </div>

        {/* Right Side: 4 Tabs & Places List */}
        <div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2" role="tablist">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                type="button"
                className={`h-10 border rounded-lg font-bold text-xs md:text-[13px] px-2 whitespace-nowrap flex items-center justify-center cursor-pointer transition-colors ${
                  activeTab === tab.id
                    ? 'bg-[#164E3B] border-[#164E3B] text-white shadow-sm'
                    : 'bg-white border-[#D9E0DC] text-[#111D46] hover:bg-[#F6F8FC]'
                }`}
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <ul className="list-none m-0 my-3 p-0 divide-y divide-[#E8ECF2]">
            {currentPlaces.map((pl, idx) => (
              <li key={idx}>
                <a
                  className="flex gap-3 items-start py-2.5 px-1 no-underline group hover:text-[#F26635] transition-colors"
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(pl.name + ' Airoli')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <svg viewBox="0 0 24 24" className="shrink-0 w-4.5 h-4.5 mt-0.5 fill-[#F26635]">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 110-5 2.5 2.5 0 010 5z" />
                  </svg>
                  <div>
                    <b className="block text-xs md:text-sm text-[#111D46] group-hover:text-[#F26635] transition-colors">
                      {pl.name}
                    </b>
                    <span className="text-xs text-[#67748A]">{pl.dist}</span>
                  </div>
                </a>
              </li>
            ))}
          </ul>

          <p className="text-[11px] text-[#67748A] text-center mt-2">
            Sample places and travel times for the demo.
          </p>
        </div>
      </div>
    </section>
  );
}
