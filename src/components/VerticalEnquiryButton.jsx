import React from 'react';
import { MessageSquareText } from 'lucide-react';

export default function VerticalEnquiryButton({ onOpenModal }) {
  return (
    <button
      type="button"
      onClick={() => onOpenModal && onOpenModal('Quick Enquiry')}
      aria-label="Enquire Now"
      className="hidden sm:flex fixed right-0 top-1/2 -translate-y-1/2 z-40 bg-[#8f7635] hover:bg-[#7a642b] text-white py-3.5 px-2 rounded-l-md shadow-2xl border-2 border-r-0 border-[#d4af37] cursor-pointer flex-col items-center gap-2 transition-all transform hover:-translate-x-1"
    >
      <MessageSquareText size={17} />
      <span
        className="text-[11px] font-black tracking-widest uppercase select-none"
        style={{ writingMode: 'vertical-rl', textOrientation: 'mixed' }}
      >
        ENQUIRE NOW
      </span>
    </button>
  );
}
