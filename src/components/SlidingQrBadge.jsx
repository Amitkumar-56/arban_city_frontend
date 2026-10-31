import { useState } from 'react';
import reraQrImg from '../assets/rera_qr.webp';
import { resolveAssetUrl } from '../admin/api';

export default function SlidingQrBadge({ data }) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState(0);

  const projectRera = data?.developer?.project_rera || 'PR1331012500415';
  const agentRera = data?.developer?.digipace_rera || data?.developer?.agent_rera || 'A51700026634';
  const projectQr = data?.developer?.project_qr || data?.developer?.qr_image || reraQrImg;
  const digipaceQr = data?.developer?.digipace_qr || reraQrImg;

  return (
    <div
      className="hidden lg:block fixed right-0 top-[40%] -translate-y-1/2 z-40 transition-transform duration-300 ease-out"
      style={{ transform: isOpen ? 'translateX(0)' : 'translateX(calc(100% - 38px))' }}
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <div className="flex items-stretch shadow-2xl rounded-l-2xl overflow-hidden border border-slate-200/90 bg-white">
        {/* Sliding Trigger Tab */}
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="w-[38px] bg-[#111D46] hover:bg-[#F26635] text-white flex flex-col items-center justify-center py-4 px-1 gap-2 cursor-pointer transition-colors select-none"
          aria-label="Toggle MahaRERA QR Code"
        >
          {/* QR Icon */}
          <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="3" y="3" width="7" height="7" rx="1" />
            <rect x="14" y="3" width="7" height="7" rx="1" />
            <rect x="14" y="14" width="7" height="7" rx="1" />
            <rect x="3" y="14" width="7" height="7" rx="1" />
            <line x1="7" y1="7" x2="7.01" y2="7" />
            <line x1="17" y1="7" x2="17.01" y2="7" />
            <line x1="7" y1="17" x2="7.01" y2="17" />
            <line x1="17" y1="17" x2="17.01" y2="17" />
          </svg>
          <span className="[writing-mode:vertical-rl] font-['Manrope',sans-serif] font-extrabold text-[11px] tracking-wider uppercase text-white/95">
            MahaRERA QR
          </span>
        </button>

        {/* Sliding Content Drawer */}
        <div className="w-[240px] p-3.5 bg-gradient-to-b from-[#FBFCFE] to-white text-center flex flex-col items-center justify-between">
          <div className="w-full pb-2 border-b border-slate-100 flex items-center justify-between">
            <span className="font-['Manrope',sans-serif] font-extrabold text-xs text-[#111D46]">MahaRERA Verify</span>
            <a
              href="https://maharera.maharashtra.gov.in/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[10px] text-[#F26635] font-bold hover:underline"
            >
              Verify Portal ↗
            </a>
          </div>

          {/* Tab Selector */}
          <div className="flex w-full bg-slate-100 p-0.5 rounded-lg my-2">
            <button
              type="button"
              onClick={() => setActiveTab(0)}
              className={`flex-1 py-1 text-[10.5px] font-bold rounded-md transition-all cursor-pointer ${
                activeTab === 0 ? 'bg-white text-[#111D46] shadow-xs' : 'text-[#67748A] hover:text-[#111D46]'
              }`}
            >
              Project QR
            </button>
            <button
              type="button"
              onClick={() => setActiveTab(1)}
              className={`flex-1 py-1 text-[10.5px] font-bold rounded-md transition-all cursor-pointer ${
                activeTab === 1 ? 'bg-white text-[#111D46] shadow-xs' : 'text-[#67748A] hover:text-[#111D46]'
              }`}
            >
              DigiPace QR
            </button>
          </div>

          {/* QR Display */}
          <div className="p-2 bg-white rounded-xl border border-slate-200 shadow-2xs">
            <a href="https://maharera.maharashtra.gov.in/" target="_blank" rel="noopener noreferrer">
              <img
                src={resolveAssetUrl(activeTab === 0 ? projectQr : digipaceQr)}
                alt={activeTab === 0 ? 'Project MahaRERA QR' : 'DigiPace MahaRERA QR'}
                className="w-[88px] h-[88px] object-contain"
              />
            </a>
          </div>

          <div className="mt-2 text-center">
            <span className="text-[10px] text-[#67748A] block">
              {activeTab === 0 ? 'Project MahaRERA No.' : 'DigiPace Agent MahaRERA No.'}
            </span>
            <b className="text-xs text-[#111D46] font-extrabold tracking-wide">
              {activeTab === 0 ? projectRera : agentRera}
            </b>
            <span className="block text-[9px] text-[#F26635] font-semibold mt-0.5">Scan with phone camera</span>
          </div>
        </div>
      </div>
    </div>
  );
}
