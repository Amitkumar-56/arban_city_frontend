import { useState } from 'react';
import { resolveAssetUrl } from '../admin/api';

const DEFAULT_TOWERS = [
  {
    id: 'ab',
    name: 'Wing A & B',
    subtitle: 'Horizon',
    plans: [
      { type: '1 BHK', carpet: '413', price: '₹89 Lacs*', title: '1 BHK Floor Plan', details: '413 sq.ft Carpet Area · ₹89 Lacs*' },
      { type: '1 BHK', carpet: '435-513', price: '₹91 Lacs*', title: '1 BHK Luxury Floor Plan', details: '435-513 sq.ft Carpet Area · ₹91 Lacs*' },
      { type: '2 BHK', carpet: '625-725', price: '₹1.35 Cr*', title: '2 BHK Floor Plan', details: '625-725 sq.ft Carpet Area · ₹1.35 Cr*' },
    ],
  },
  {
    id: 'c',
    name: 'Wing C',
    subtitle: 'Oasis',
    plans: [
      { type: '2 BHK', carpet: '650-710', price: '₹1.38 Cr*', title: '2 BHK Floor Plan', details: '650-710 sq.ft Carpet Area · ₹1.38 Cr*' },
      { type: '3 BHK', carpet: '890-950', price: '₹1.88 Cr*', title: '3 BHK Floor Plan', details: '890-950 sq.ft Carpet Area · ₹1.88 Cr*' },
    ],
  },
  {
    id: 'd',
    name: 'Wing D',
    subtitle: '',
    plans: [
      { type: '2 BHK', carpet: '640-700', price: '₹1.36 Cr*', title: '2 BHK Floor Plan', details: '640-700 sq.ft Carpet Area · ₹1.36 Cr*' },
      { type: '3 BHK', carpet: '920-990', price: '₹1.92 Cr*', title: '3 BHK Floor Plan', details: '920-990 sq.ft Carpet Area · ₹1.92 Cr*' },
    ],
  },
  {
    id: 'e',
    name: 'Wing E',
    subtitle: 'Summit',
    plans: [
      { type: '1 BHK', carpet: '425-480', price: '₹90 Lacs*', title: '1 BHK Floor Plan', details: '425-480 sq.ft Carpet Area · ₹90 Lacs*' },
      { type: '2 BHK', carpet: '660-740', price: '₹1.40 Cr*', title: '2 BHK Floor Plan', details: '660-740 sq.ft Carpet Area · ₹1.40 Cr*' },
    ],
  },
  {
    id: 'mn',
    name: 'Wing M & N',
    subtitle: 'Glade',
    plans: [
      { type: '2 BHK', carpet: '675-730', price: '₹1.42 Cr*', title: '2 BHK Floor Plan', details: '675-730 sq.ft Carpet Area · ₹1.42 Cr*' },
      { type: '3 BHK', carpet: '950-1020', price: '₹1.98 Cr*', title: '3 BHK Floor Plan', details: '950-1020 sq.ft Carpet Area · ₹1.98 Cr*' },
    ],
  },
  {
    id: 'kl',
    name: 'Wing K & L',
    subtitle: 'Delta',
    plans: [
      { type: '3 BHK', carpet: '980-1060', price: '₹2.05 Cr*', title: '3 BHK Floor Plan', details: '980-1060 sq.ft Carpet Area · ₹2.05 Cr*' },
      { type: '4 BHK', carpet: '1350-1450', price: '₹2.95 Cr*', title: '4 BHK Floor Plan', details: '1350-1450 sq.ft Carpet Area · ₹2.95 Cr*' },
    ],
  },
];

export default function PricingTable({ data, floorPlans = [], onOpenModal }) {
  const [layoutMode, setLayoutMode] = useState('multiple'); // 'multiple' | 'single'
  const [selectedTowerIdx, setSelectedTowerIdx] = useState(0);
  const [selectedPlanIdx, setSelectedPlanIdx] = useState(0);

  // If backend provided flat pricing data, use it; otherwise use full tower data
  const hasCustomData = Array.isArray(data) && data.length > 0;

  const parsedCustomPlans = hasCustomData
    ? data.map((d, i) => ({
      type: d.type || d.unit_type || `Unit ${i + 1}`,
      carpet: (d.carpet || d.carpet_area || '').toString().replace(/sq\.?ft/i, '').trim(),
      price: d.price || 'Price on Request',
      title: `${d.type || d.unit_type || 'Apartment'} Floor Plan`,
      details: `${d.carpet || d.carpet_area || ''} Carpet Area · ${d.price || ''}`,
    }))
    : null;

  const currentTower = DEFAULT_TOWERS[selectedTowerIdx] || DEFAULT_TOWERS[0];
  const activePlans = layoutMode === 'single'
    ? (parsedCustomPlans || DEFAULT_TOWERS[0].plans)
    : (parsedCustomPlans ? parsedCustomPlans : currentTower.plans);

  const safePlanIdx = selectedPlanIdx >= activePlans.length ? 0 : selectedPlanIdx;
  const currentPlan = activePlans[safePlanIdx] || activePlans[0];

  const planArea = currentPlan?.details?.match(/[\d,.]+/)?.[0];
  const selectedFloorPlan = Array.isArray(floorPlans) && floorPlans.length > 0
    ? floorPlans.find((plan) =>
      (plan.unit_type || plan.type) === currentPlan?.type
      && (plan.carpet_area || plan.carpet || '').toString().match(/[\d,.]+/)?.[0] === planArea
    ) || floorPlans.find((plan) => (plan.unit_type || plan.type) === currentPlan?.type)
    || floorPlans[safePlanIdx % floorPlans.length]
    : null;

  const handlePrev = () => {
    setSelectedPlanIdx((prev) => (prev <= 0 ? activePlans.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setSelectedPlanIdx((prev) => (prev >= activePlans.length - 1 ? 0 : prev + 1));
  };

  const handleTowerSelect = (idx) => {
    setSelectedTowerIdx(idx);
    setSelectedPlanIdx(0);
  };

  return (
    <section className="bg-white rounded-none border-l-0 border-y border-r border-gray-200/80 shadow-2xs p-5 sm:p-8 mb-4" id="price">
      {/* Title & Intro Header matching Screenshot */}
      <div className="text-center mb-6">
        <h2 className="text-2xl sm:text-[26px] font-black text-[#111D46] tracking-tight">
          Arban City Sector 0   Configuration and Price
        </h2>
        <p className="text-sm text-[#475569] mt-1.5 max-w-[790px] mx-auto">
          Compare apartment configurations, carpet areas and indicative prices. Select a row to see its floor plan.
        </p>
      </div>

      {/* Tower Cards (Only visible in Multiple Towers mode) */}
      {layoutMode === 'multiple' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3.5 mb-5">
          {DEFAULT_TOWERS.map((tower, idx) => {
            const isSelected = selectedTowerIdx === idx;
            return (
              <button
                key={tower.id}
                type="button"
                onClick={() => handleTowerSelect(idx)}
                className={`py-3 px-4 rounded-xl border text-center transition-all cursor-pointer ${isSelected
                  ? 'border-[#2d2217] bg-[#f8f5f1] ring-1 ring-[#2d2217] shadow-xs'
                  : 'border-[#E2E8F0] bg-white hover:border-gray-400 hover:bg-gray-50/70'
                  }`}
              >
                <div className="font-extrabold text-[15px] text-[#1E293B]">
                  {tower.name}
                </div>
                {tower.subtitle && (
                  <div className="text-xs text-[#64748B] mt-0.5 font-medium">
                    {tower.subtitle}
                  </div>
                )}
              </button>
            );
          })}
        </div>
      )}

      {/* Single Tower Label (Visible in Single Tower mode) */}
      {layoutMode === 'single' && (
        <div className="mb-4 text-center">
          <span className="inline-block px-5 py-2 rounded-lg bg-[#F8FAFC] border border-[#E2E8F0] font-bold text-sm text-[#1E293B]">
            All Wings / Single Tower Overview
          </span>
        </div>
      )}

      {/* Layout Demo Switcher: Multiple towers / Single tower */}
      <div className="flex items-center justify-end gap-2 mb-4 text-xs">
        <span className="text-[#64748B]">Layout demo:</span>
        <div className="inline-flex rounded-md border border-gray-200 bg-white p-0.5">
          <button
            type="button"
            onClick={() => setLayoutMode('multiple')}
            className={`px-2.5 py-1 rounded text-xs font-semibold cursor-pointer transition-colors ${layoutMode === 'multiple'
              ? 'bg-[#212529] text-white shadow-xs'
              : 'text-gray-600 hover:text-black'
              }`}
          >
            Multiple towers
          </button>
          <button
            type="button"
            onClick={() => setLayoutMode('single')}
            className={`px-2.5 py-1 rounded text-xs font-semibold cursor-pointer transition-colors ${layoutMode === 'single'
              ? 'bg-[#212529] text-white shadow-xs'
              : 'text-gray-600 hover:text-black'
              }`}
          >
            Single tower
          </button>
        </div>
      </div>

      {/* 2-Column Grid: Left (Table + Download Btn), Right (Floor Plan Stage) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
        {/* Left Column: Price Table */}
        <div className="w-full min-w-0">
          <div className="border border-[#E2E8F0] rounded-xl overflow-x-auto shadow-xs">
            <table className="w-full min-w-full border-collapse text-[12px] sm:text-[13px] tabular-nums">
              <thead>
                <tr className="bg-[#3D3025] text-white text-left">
                  <th className="price-th py-3 px-2.5 sm:px-4 font-bold tracking-wider text-[11px] !text-[11px] whitespace-nowrap">Type</th>
                  <th className="price-th py-3 px-2.5 sm:px-4 text-center font-bold tracking-wider text-[11px] !text-[11px] whitespace-nowrap">Carpet Area (sq.ft)</th>
                  <th className="price-th py-3 px-2.5 sm:px-4 text-right sm:text-left font-bold tracking-wider text-[11px] !text-[11px] whitespace-nowrap">Price</th>
                </tr>
              </thead>
              <tbody>
                {activePlans.map((p, idx) => {
                  const isRowSelected = safePlanIdx === idx;
                  return (
                    <tr
                      key={idx}
                      onClick={() => setSelectedPlanIdx(idx)}
                      className={`cursor-pointer transition-colors ${isRowSelected
                        ? 'bg-[#F9EDE4] border-l-4 border-l-[#3D3025]'
                        : idx % 2 === 1
                          ? 'bg-[#FAFBFB] hover:bg-[#F1F5F9]'
                          : 'bg-white hover:bg-[#F1F5F9]'
                        } border-t border-[#EEF2F6]`}
                    >
                      <td className="price-td py-3 px-2.5 sm:px-4 font-bold text-[#1E293B] text-[12.5px] sm:text-[13px] whitespace-nowrap">
                        {p.type}
                      </td>
                      <td className="price-td py-3 px-2.5 sm:px-4 text-center text-[#334155] font-medium text-[12.5px] sm:text-[13px] whitespace-nowrap">
                        {p.carpet}
                      </td>
                      <td className="price-td py-3 px-2.5 sm:px-4 text-right sm:text-left font-extrabold text-[#1E293B] text-[12.5px] sm:text-[13px] whitespace-nowrap">
                        {p.price}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <div className="flex flex-col items-center mt-5">
            <button
              type="button"
              onClick={() => onOpenModal && onOpenModal('Download Price Sheet')}
              className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-lg bg-[#533923] hover:bg-[#402B19] text-white font-extrabold text-sm shadow-md transition-all hover:scale-102 cursor-pointer"
            >
              ↓ Download Price Sheet
            </button>
            <p className="text-[11px] text-[#64748B] text-center mt-2">
              *Indicative prices. Confirm actual pricing and availability with the project team.
            </p>
          </div>
        </div>

        {/* Right Column: Floor Plan Stage */}
        <div id="floor-plan" className="scroll-mt-24">
          <div className="relative min-h-[300px] sm:min-h-[350px] bg-[#F4F4ED] border border-[#E2E2D6] rounded-xl flex items-center justify-center p-6 overflow-hidden">
            {/* Previous Arrow Button */}
            <button
              type="button"
              aria-label="Previous plan"
              onClick={handlePrev}
              className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-[#184E38] hover:bg-[#123E2C] text-white font-bold text-lg flex items-center justify-center z-10 shadow-md cursor-pointer transition-all"
            >
              ‹
            </button>

            {/* Architectural SVG Floor Plan Representation */}
            {selectedFloorPlan?.image_url ? (
              <img
                src={resolveAssetUrl(selectedFloorPlan.image_url)}
                alt={currentPlan?.title}
                className="w-full max-w-[430px] h-auto max-h-[280px] object-contain drop-shadow-sm"
              />
            ) : (
              <svg
                viewBox="0 0 430 300"
                aria-label={currentPlan?.title}
                className="w-full max-w-[430px] h-auto max-h-[270px] object-contain drop-shadow-xs"
              >
                <rect x="15" y="15" width="400" height="270" fill="#FCFCF9" stroke="#334155" strokeWidth="4" rx="4" />
                {/* Master Bedroom */}
                <rect x="25" y="25" width="160" height="130" fill="#F1F5F9" stroke="#64748B" strokeWidth="2" />
                <text x="50" y="85" fontFamily="Manrope, sans-serif" fontSize="13" fontWeight="800" fill="#1E293B">MASTER BED</text>
                <text x="50" y="105" fontFamily="DM Sans, sans-serif" fontSize="11" fill="#64748B">11'0" x 12'0"</text>

                {/* Living & Dining Room */}
                <rect x="195" y="25" width="210" height="175" fill="#F8FAFC" stroke="#64748B" strokeWidth="2" />
                <text x="245" y="105" fontFamily="Manrope, sans-serif" fontSize="14" fontWeight="800" fill="#1E293B">LIVING / DINING</text>
                <text x="265" y="125" fontFamily="DM Sans, sans-serif" fontSize="11" fill="#64748B">16'0" x 11'6"</text>

                {/* Balcony */}
                <rect x="195" y="205" width="210" height="70" fill="#E2E8F0" stroke="#64748B" strokeWidth="2" strokeDasharray="4 2" />
                <text x="260" y="245" fontFamily="Manrope, sans-serif" fontSize="12" fontWeight="700" fill="#334155">BALCONY</text>

                {/* Kitchen */}
                <rect x="25" y="165" width="105" height="110" fill="#F1F5F9" stroke="#64748B" strokeWidth="2" />
                <text x="45" y="225" fontFamily="Manrope, sans-serif" fontSize="12" fontWeight="700" fill="#1E293B">KITCHEN</text>

                {/* Bath */}
                <rect x="135" y="165" width="50" height="110" fill="#E2E8F0" stroke="#64748B" strokeWidth="2" />
                <text x="142" y="225" fontFamily="Manrope, sans-serif" fontSize="11" fontWeight="700" fill="#475569">BATH</text>
              </svg>
            )}

            {/* Next Arrow Button */}
            <button
              type="button"
              aria-label="Next plan"
              onClick={handleNext}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-[#184E38] hover:bg-[#123E2C] text-white font-bold text-lg flex items-center justify-center z-10 shadow-md cursor-pointer transition-all"
            >
              ›
            </button>
          </div>

          {/* Plan Caption */}
          <div className="flex flex-col items-center text-center mt-3">
            <b className="font-extrabold text-base sm:text-[17px] text-[#111D46]">
              {currentPlan?.title}
            </b>
            <span className="text-[13px] text-[#475569] mt-0.5">
              {currentPlan?.details}
            </span>
            <small className="text-[10px] text-[#94A3B8] mt-0.5">Artistic impression</small>

            <button
              type="button"
              onClick={() => onOpenModal && onOpenModal(`Floor Plan - ${currentPlan?.type}`)}
              className="mt-2.5 inline-flex items-center gap-1.5 border border-[#184E38] text-[#184E38] hover:bg-[#184E38] hover:text-white font-bold text-xs py-1.5 px-3.5 rounded-lg transition-colors cursor-pointer"
            >
              <span>Download Detailed Floor Plan</span>
            </button>
          </div>

          {/* Pagination Dots */}
          <div className="flex justify-center gap-1.5 mt-3">
            {activePlans.map((_, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setSelectedPlanIdx(idx)}
                aria-label={`Plan ${idx + 1}`}
                className={`h-2 rounded-full border-0 p-0 transition-all cursor-pointer ${safePlanIdx === idx ? 'w-5 bg-[#184E38]' : 'w-2 bg-[#CBD5E1]'
                  }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
