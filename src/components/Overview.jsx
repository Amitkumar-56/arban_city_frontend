import React from 'react';

export default function Overview({ data, projectTitle = 'Aveon City Sector Zero' }) {
  const defaultItems = [
    {
      label: 'Land Parcel',
      val: '5.5 Acres',
      icon: (
        <svg viewBox="0 0 24 24" className="w-7 h-7 stroke-[#273954] fill-none stroke-[1.5] stroke-linecap-round stroke-linejoin-round">
          <path d="M3 21h18M3 10h18M5 6l7-3 7 3M4 10v11m16-11v11M8 14v4m4-4v4m4-4v4" />
        </svg>
      ),
    },
    {
      label: 'Towers',
      val: '3 High Rise',
      icon: (
        <svg viewBox="0 0 24 24" className="w-7 h-7 stroke-[#273954] fill-none stroke-[1.5] stroke-linecap-round stroke-linejoin-round">
          <rect x="4" y="2" width="7" height="20" rx="1" />
          <rect x="13" y="7" width="7" height="15" rx="1" />
          <path d="M7 6h1m-1 4h1m-1 4h1m-1 4h1m9-6h1m-1 4h1m-1 4h1" />
        </svg>
      ),
    },
    {
      label: 'Floors',
      val: '35+ Storeys',
      icon: (
        <svg viewBox="0 0 24 24" className="w-7 h-7 stroke-[#273954] fill-none stroke-[1.5] stroke-linecap-round stroke-linejoin-round">
          <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
        </svg>
      ),
    },
    {
      label: 'Typology',
      val: '1, 2 & 3 BHK',
      icon: (
        <svg viewBox="0 0 24 24" className="w-7 h-7 stroke-[#273954] fill-none stroke-[1.5] stroke-linecap-round stroke-linejoin-round">
          <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
          <path d="M9 22V12h6v10" />
        </svg>
      ),
    },
    {
      label: 'Carpet Area',
      val: '413 - 930 sq.ft',
      icon: (
        <svg viewBox="0 0 24 24" className="w-7 h-7 stroke-[#273954] fill-none stroke-[1.5] stroke-linecap-round stroke-linejoin-round">
          <rect x="3" y="3" width="18" height="18" rx="2" />
          <path d="M3 9h18M9 21V9" />
        </svg>
      ),
    },
    {
      label: 'Starting Price',
      val: '₹89 Lacs*',
      icon: (
        <svg viewBox="0 0 24 24" className="w-7 h-7 stroke-[#273954] fill-none stroke-[1.5] stroke-linecap-round stroke-linejoin-round">
          <path d="M6 3h12M6 8h12M6 13l8.5 8M6 13h5a4 4 0 000-8" />
        </svg>
      ),
    },
    {
      label: 'Location',
      val: 'Airoli, Navi Mumbai',
      icon: (
        <svg viewBox="0 0 24 24" className="w-7 h-7 stroke-[#273954] fill-none stroke-[1.5] stroke-linecap-round stroke-linejoin-round">
          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
          <circle cx="12" cy="10" r="3" />
        </svg>
      ),
    },
    {
      label: 'Possession',
      val: 'Dec 2029',
      icon: (
        <svg viewBox="0 0 24 24" className="w-7 h-7 stroke-[#273954] fill-none stroke-[1.5] stroke-linecap-round stroke-linejoin-round">
          <rect x="3" y="4" width="18" height="18" rx="2" />
          <path d="M16 2v4M8 2v4M3 10h18M8 14h.01M12 14h.01M16 14h.01M8 18h.01M12 18h.01" />
        </svg>
      ),
    },
    {
      label: 'RERA Status',
      val: 'Registered',
      icon: (
        <svg viewBox="0 0 24 24" className="w-7 h-7 stroke-[#273954] fill-none stroke-[1.5] stroke-linecap-round stroke-linejoin-round">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          <path d="M9 12l2 2 4-4" />
        </svg>
      ),
    },
  ];

  const items = Array.isArray(data) && data.length > 0
    ? data.map((d, i) => ({
        label: d.label || defaultItems[i % defaultItems.length].label,
        val: d.val || d.value || defaultItems[i % defaultItems.length].val,
        icon: defaultItems[i % defaultItems.length].icon,
      }))
    : defaultItems;

  return (
    <section className="section-card" id="overview">
      <h2 className="section-h2">{projectTitle} Overview</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 gap-3 mt-5">
        {items.map((item, idx) => (
          <div
            key={idx}
            className="min-h-[132px] text-center py-4 px-2.5 rounded-xl bg-[#FAFBFD] border border-[#EEF1F6] flex flex-col items-center justify-center transition-all hover:border-[#F26635]/30 hover:shadow-sm"
          >
            {item.icon}
            <small className="block text-[14px] text-[#67748A] leading-tight mt-2">
              {item.label}
            </small>
            <b className="block text-[14px] font-extrabold text-[#111D46] leading-snug mt-1 break-words">
              {item.val}
            </b>
          </div>
        ))}
      </div>
    </section>
  );
}
