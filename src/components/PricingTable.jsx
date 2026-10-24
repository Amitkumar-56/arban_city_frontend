import React from 'react';
import costSheetSample from '../assets/floor_plan.webp';

export default function PricingTable({ data, onOpenModal, projectTitle = 'Arban City Sector 0' }) {
  const plans = Array.isArray(data) ? data : [];
  if (plans.length === 0) return null;

  return (
    <section id="price" className="scroll-mt-20 bg-white rounded-none border-l-0 border-y border-r border-gray-200/80 shadow-2xs p-3.5 sm:p-8 mb-4">
      <div className="mb-4 sm:mb-6 text-center sm:text-left">
        <h2 className="text-xl sm:text-2xl font-black text-gray-900 tracking-tight capitalize">
          Price Of {projectTitle}
        </h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6 items-start">
        {/* Left Side: Mobile Stacked Alternating Cards (< md) & Desktop Table (>= md) */}
        <div className="lg:col-span-7 xl:col-span-8">
          {/* Mobile View: Exact Kohinoor Alternating Striped Cards */}
          <div className="block md:hidden border border-gray-300 rounded-sm overflow-hidden shadow-2xs">
            {plans.map((item, idx) => {
              const rawPrice = (item.price || '').replace(/^₹\s*/, '').replace(/\s*Onwards/i, '').trim();
              const displayPrice = rawPrice ? `₹ ${rawPrice} Onwards` : 'Price on Request';
              const carpetText = item.carpet_area || item.carpet || '';
              const carpetDisplay = carpetText.toLowerCase().includes('carpet')
                ? carpetText
                : `${carpetText} (Carpet Area)`;

              return (
                <div
                  key={item.id || idx}
                  className={`py-5 px-3 text-center border-b last:border-b-0 border-gray-200 transition-colors ${
                    idx % 2 === 0 ? 'bg-[#ebebeb]' : 'bg-white'
                  }`}
                >
                  <h3 className="text-xl font-black text-gray-900 tracking-tight mb-1">
                    {item.unit_type || item.type}
                  </h3>
                  <p className="text-sm text-gray-700 font-semibold mb-1">
                    {carpetDisplay}
                  </p>
                  <div className="text-base font-black text-gray-900 mb-3">
                    {displayPrice}
                  </div>
                  <div>
                    <button
                      type="button"
                      onClick={() => onOpenModal && onOpenModal(`Price Breakup - ${item.unit_type || item.type}`)}
                      className="inline-block px-6 py-2 rounded text-sm font-bold bg-[#8f7635] hover:bg-[#7a642b] text-white tracking-wide transition-all cursor-pointer shadow-xs uppercase active:scale-95"
                    >
                      Price Breakup
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Desktop & Tablet View (>= md): Clean Table */}
          <div className="hidden md:block overflow-x-auto rounded-sm border border-gray-300 shadow-2xs">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-gray-300 text-gray-800 text-xs sm:text-sm font-bold">
                  <th className="py-3 px-3 sm:px-4 border-r border-gray-200">Type</th>
                  <th className="py-3 px-3 sm:px-4 border-r border-gray-200">Carpet Area</th>
                  <th className="py-3 px-3 sm:px-4 border-r border-gray-200">Price</th>
                  <th className="py-3 px-3 sm:px-4 text-center">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 text-xs sm:text-sm">
                {plans.map((item, idx) => (
                  <tr
                    key={item.id || idx}
                    className={`transition-colors ${idx % 2 === 0 ? 'bg-white' : 'bg-slate-50/60'} hover:bg-amber-50/40`}
                  >
                    <td className="py-3.5 px-3 sm:px-4 font-bold text-gray-900 border-r border-gray-200">
                      {item.unit_type || item.type}
                    </td>
                    <td className="py-3.5 px-3 sm:px-4 text-gray-700 font-medium border-r border-gray-200">
                      {item.carpet_area || item.carpet}
                    </td>
                    <td className="py-3.5 px-3 sm:px-4 font-extrabold text-gray-900 border-r border-gray-200">
                      {item.price}
                    </td>
                    <td className="py-3.5 px-3 sm:px-4 text-center">
                      <button
                        type="button"
                        onClick={() => onOpenModal && onOpenModal(`Price Breakup - ${item.unit_type || item.type}`)}
                        className="px-4 py-1.5 rounded text-xs font-bold bg-[#8f7635] hover:bg-[#7a642b] text-white transition-all cursor-pointer whitespace-nowrap shadow-2xs active:scale-95"
                      >
                        Price Breakup
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right Side: Complete Costing Detail Preview Card matching Kohinoor */}
        <div className="lg:col-span-5 xl:col-span-4 bg-white rounded-sm border-2 border-[#8f7635] p-2 flex flex-col items-center shadow-xs">
          <div
            className="w-full aspect-[16/10] bg-slate-100 rounded-xs overflow-hidden border border-gray-200 relative group cursor-pointer"
            onClick={() => onOpenModal && onOpenModal('Complete Costing Detail')}
          >
            <img
              src={costSheetSample}
              alt="Complete Costing Detail Sheet"
              className="w-full h-full object-cover filter blur-[1.5px] group-hover:blur-0 transition-all duration-300"
            />
            <div className="absolute inset-0 bg-black/25 flex items-center justify-center text-white text-xs font-bold text-center px-2">
              <span className="bg-black/60 px-3 py-1.5 rounded backdrop-blur-xs">Click to Unlock Full Cost Sheet</span>
            </div>
          </div>
          <button
            type="button"
            onClick={() => onOpenModal && onOpenModal('Complete Costing Detail')}
            className="w-full mt-2 py-2.5 px-4 bg-[#8f7635] hover:bg-[#7a642b] text-white font-extrabold text-xs sm:text-sm rounded-xs uppercase tracking-wide transition-colors cursor-pointer text-center active:scale-95"
          >
            Complete Costing Detail
          </button>
        </div>
      </div>
    </section>
  );
}
