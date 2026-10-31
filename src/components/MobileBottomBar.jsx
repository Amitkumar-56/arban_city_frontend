import React from 'react';

export default function MobileBottomBar({ onOpenModal, phone = '+91 81000 00000', whatsapp = '918100000000' }) {
  const cleanPhone = phone.replace(/\s+/g, '');

  return (
    <div className="mBottom md:hidden grid grid-cols-3 fixed bottom-0 left-0 w-full pb-[env(safe-area-inset-bottom)] bg-white border-t border-[#dce2ed] z-70 shadow-[0_-6px_18px_rgba(17,29,70,0.1)] divide-x divide-[#e2e7ee]">
      <a
        href={`tel:${cleanPhone}`}
        className="h-[50px] bg-white border-0 grid place-items-center no-underline text-[#111d46] font-bold text-[14px] hover:text-[#F26635] active:bg-[#F6F8FC] transition-colors"
      >
        ☎ Call
      </a>
      <a
        href={`https://wa.me/${whatsapp}?text=Hi,%20I%20am%20interested%20in%20learning%20more%20about%20Aveon%20City%20Sector%20Zero`}
        target="_blank"
        rel="noopener noreferrer"
        className="h-[50px] bg-white border-0 grid place-items-center no-underline text-[#111d46] font-bold text-[14px] hover:text-[#F26635] active:bg-[#F6F8FC] transition-colors"
      >
        WhatsApp
      </a>
      <button
        type="button"
        id="mBottomEnquire"
        onClick={() => onOpenModal && onOpenModal('Enquire Now')}
        className="h-[50px] bg-white border-0 grid place-items-center no-underline text-[#111d46] font-bold text-[14px] cursor-pointer hover:text-[#F26635] active:bg-[#F6F8FC] transition-colors"
      >
        ✉ Enquire
      </button>
    </div>
  );
}
