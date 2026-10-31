import React from 'react';

export default function VerticalEnquiryButton({ onOpenModal }) {
  return (
    <button
      className="vTab vTab-border-animation lg:hidden fixed top-[70%] -translate-y-1/2 right-0 z-75 [writing-mode:vertical-rl] border-0 rounded-l-[10px] py-[13px] px-[9px] font-['Manrope',sans-serif] font-bold text-[13px] text-white bg-[#f26635] shadow-[0_8px_22px_rgba(0,0,0,0.25)] cursor-pointer tracking-[0.08em] select-none uppercase"
      type="button"
      onClick={() => onOpenModal && onOpenModal('Enquire Now')}
      aria-label="Enquire Now"
    >
      Enquire Now
    </button>
  );
}
