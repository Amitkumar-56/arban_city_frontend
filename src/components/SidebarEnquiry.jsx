import { useState, useEffect } from 'react';
import reraQrImg from '../assets/rera_qr.webp';
import { resolveAssetUrl, submitLead } from '../admin/api';
import CountryCodeSelect from './CountryCodeSelect';

export default function SidebarEnquiry({ data, onOpenModal, showToast }) {
  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');
  const [countryCode, setCountryCode] = useState('+91');
  const [consent, setConsent] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [qrSlide, setQrSlide] = useState(0);
  const [isQrHovered, setIsQrHovered] = useState(false);

  const phone = data?.header?.phone || data?.hero?.phone || '+91 81000 00000';
  const whatsapp = (data?.header?.whatsapp || '918100000000').replace(/\D/g, '');
  const projectRera = data?.developer?.project_rera || 'PR1331012500415';
  const agentRera = data?.developer?.digipace_rera || data?.developer?.agent_rera || 'A51700026634';
  const rawProjectQr = data?.developer?.project_qr || data?.developer?.qr_image;
  const projectQr = (rawProjectQr && typeof rawProjectQr === 'string' && rawProjectQr.trim() !== '')
    ? rawProjectQr.trim()
    : (reraQrImg || '/rera_qr.webp');

  const rawDigipaceQr = data?.developer?.digipace_qr;
  const digipaceQr = (rawDigipaceQr && typeof rawDigipaceQr === 'string' && rawDigipaceQr.trim() !== '')
    ? rawDigipaceQr.trim()
    : (reraQrImg || '/rera_qr.webp');

  // Auto-slide QR code every 3.5s unless hovered
  useEffect(() => {
    if (isQrHovered) return;
    const interval = setInterval(() => {
      setQrSlide((prev) => (prev === 0 ? 1 : 0));
    }, 3500);
    return () => clearInterval(interval);
  }, [isQrHovered]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim()) {
      alert('Please enter your name.');
      return;
    }
    const mobileDigits = mobile.replace(/\D/g, '');
    const countryDigits = countryCode.replace(/\D/g, '');
    if (mobileDigits.length < 4 || mobileDigits.length + countryDigits.length > 15) {
      alert('Please enter a valid mobile number.');
      return;
    }
    if (!consent) {
      alert('Please check the authorization consent before submitting.');
      return;
    }

    setIsSubmitting(true);
    try {
      await submitLead({
        fullName: name,
        phone: `${countryCode.replace(/\s/g, '')}${mobileDigits}`,
        source: 'Desktop Sidebar Rail',
      });
    } catch (err) {
      console.error('Sidebar enquiry submission failed:', err);
      setIsSubmitting(false);
      alert('Unable to submit your enquiry. Please try again.');
      return;
    }

    setIsSubmitting(false);
    if (showToast) {
      showToast('Thank you! Your enquiry has been received. Our sales team will connect shortly.');
    } else {
      alert('Thank you! Your enquiry has been received. Our sales team will connect shortly.');
    }
    setName('');
    setMobile('');
  };

  return (
    <aside
      className="hidden lg:flex sticky top-0 self-start h-screen max-h-screen overflow-y-auto bg-white rounded-l-2xl shadow-[0_9px_32px_rgba(21,35,67,0.13)] p-3 2xl:p-4 flex-col items-center gap-2 2xl:gap-2.5 scrollbar-thin shrink-0 w-[310px] 2xl:w-[328px] [&_h2]:text-[20px] [&_h3]:text-[18px] [&_h4]:text-[16px]"
      aria-label="Enquiry"
    >
      {/* Download strip */}
      <div className="w-[calc(100%+24px)] 2xl:w-[calc(100%+32px)] -mx-3 2xl:-mx-4 -mt-3 2xl:-mt-4 px-1.5 pb-1.5 bg-gradient-to-b from-white to-[#F1F1F1] grid grid-cols-2 shrink-0">
        <button
          type="button"
          className="flex items-center justify-center gap-1.5 border-0 bg-gradient-to-r from-[#444] to-[#1A1A1A] text-white text-left font-bold text-[11px] leading-tight py-1.5 px-2 rounded-bl-xl border-r border-[#DBE4E9] hover:brightness-125 transition-all cursor-pointer"
          onClick={() => onOpenModal && onOpenModal('Download Brochure')}
        >
          <svg className="w-6 h-7 shrink-0 pdfBounceEffect" viewBox="0 0 26 30" aria-hidden="true">
            <path d="M3 1h14l7 7v19a2 2 0 01-2 2H3a2 2 0 01-2-2V3a2 2 0 012-2z" fill="#fff" />
            <path d="M17 1v7h7" fill="#F3C7C0" />
            <rect x="0" y="14" width="20" height="10" rx="2" fill="#E2231A" />
            <text className="pdf-icon-label" x="10" y="21.6" textAnchor="middle" fontFamily="Arial" fontSize="6.8" fontWeight="700" fill="#fff">
              PDF
            </text>
          </svg>
          <span className="!text-[12px] leading-tight">
            Download
            <br />
            Brochure
          </span>
        </button>

        <button
          type="button"
          className="flex items-center justify-center gap-1.5 border-0 bg-gradient-to-r from-[#444] to-[#1A1A1A] text-white text-left font-bold text-[11px] leading-tight py-1.5 px-2 rounded-br-xl hover:brightness-125 transition-all cursor-pointer"
          onClick={() => onOpenModal && onOpenModal('Download Price Sheet')}
        >
          <svg className="w-6 h-7 shrink-0 pdfBounceEffect" viewBox="0 0 26 30" aria-hidden="true">
            <path d="M3 1h14l7 7v19a2 2 0 01-2 2H3a2 2 0 01-2-2V3a2 2 0 012-2z" fill="#fff" />
            <path d="M17 1v7h7" fill="#F3C7C0" />
            <rect x="0" y="14" width="20" height="10" rx="2" fill="#E2231A" />
            <text className="pdf-icon-label" x="10" y="21.6" textAnchor="middle" fontFamily="Arial" fontSize="6.8" fontWeight="700" fill="#fff">
              PDF
            </text>
          </svg>
          <span className="!text-[12px] leading-tight">
            Download
            <br />
            Price Sheet
          </span>
        </button>
      </div>

      {/* Call & WhatsApp Row */}
      <div className="flex gap-1.5 w-full shrink-0">
        <a
          href={`tel:${phone.replace(/\s+/g, '')}`}
          className="flex-1 h-9.5 bg-[#3D3125] text-white rounded-lg flex items-center justify-center gap-1.5 font-['Manrope',sans-serif] font-bold text-[13px] tracking-wide no-underline select-all hover:brightness-95 transition-all"
        >
          ☎ <span>{phone}</span>
        </a>
        <a
          className="shrink-0 w-12 h-9.5 rounded-lg bg-[#25D366] grid place-items-center text-white no-underline hover:brightness-95 transition-all"
          href={`https://wa.me/${whatsapp}?text=Hi,%20I%20am%20interested%20in%20Aveon%20City%20Sector%20Zero.`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="WhatsApp"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="#fff">
            <path d="M12 2a10 10 0 00-8.6 15.1L2 22l5-1.3A10 10 0 1012 2zm0 18.2a8.2 8.2 0 01-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1112 20.2zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8s-.4-.1-.6.1-.7.8-.8 1-.3.2-.5.1a6.7 6.7 0 01-3.3-2.9c-.3-.4.3-.4.7-1.3a.5.5 0 000-.5l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 00-.7.3 3 3 0 00-.9 2.2 5.2 5.2 0 001.1 2.7 11.8 11.8 0 004.5 4c1.7.7 2.3.8 3.2.6a2.7 2.7 0 001.8-1.2 2.2 2.2 0 00.1-1.2c0-.1-.2-.2-.5-.3z" />
          </svg>
        </a>
      </div>

      {/* Sliding MahaRERA QR Card */}
      <div
        className="w-full border border-[#E2E7EE] bg-[#FBFCFE] rounded-xl p-2 text-center shadow-xs relative overflow-hidden shrink-0"
        onMouseEnter={() => setIsQrHovered(true)}
        onMouseLeave={() => setIsQrHovered(false)}
      >
        {/* Sliding QR Stage */}
        <div
          className="relative overflow-hidden w-full border-t border-[#EDF1F7] pt-1"
          style={{ minHeight: '170px', height: '170px' }}
        >
          {/* Previous / Next slide buttons */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setQrSlide((prev) => (prev === 0 ? 1 : 0));
            }}
            className="absolute left-0.5 top-[38%] -translate-y-1/2 z-20 w-5 h-5 rounded-full bg-white/95 border border-slate-200 shadow-md text-[10px] font-bold text-slate-700 hover:text-[#F26635] flex items-center justify-center cursor-pointer transition-colors"
            aria-label="Previous QR slide"
          >
            ‹
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setQrSlide((prev) => (prev === 0 ? 1 : 0));
            }}
            className="absolute right-0.5 top-[38%] -translate-y-1/2 z-20 w-5 h-5 rounded-full bg-white/95 border border-slate-200 shadow-md text-[10px] font-bold text-slate-700 hover:text-[#F26635] flex items-center justify-center cursor-pointer transition-colors"
            aria-label="Next QR slide"
          >
            ›
          </button>

          {/* Continuous Right-to-Left Slider Track */}
          <div
            className="h-full flex"
            style={{
              width: '200%',
              transform: qrSlide === 0 ? 'translateX(0%)' : 'translateX(-50%)',
              transition: 'transform 500ms ease-in-out',
            }}
          >
            {/* Slide 1: Project MahaRERA */}
            <div className="w-1/2 shrink-0 flex flex-col items-center justify-center px-2">
              <img
                src={resolveAssetUrl(projectQr)}
                alt="Project MahaRERA QR code"
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = '/rera_qr.webp';
                }}
                className="w-[120px] h-[120px] min-w-[120px] min-h-[120px] p-1 border border-white shadow-[0_0_0_1px_#E2E7EE] rounded-md object-contain bg-white mx-auto block"
              />
              <div className="text-[9.5px] text-[#67748A] mt-0.5 font-semibold leading-tight">
                Project MahaRERA (1/2)
              </div>
              <div className="font-['Manrope',sans-serif] font-bold text-[11px] text-[#111D46] tracking-tight whitespace-nowrap">
                {projectRera}
              </div>
            </div>

            {/* Slide 2: DigiPace Agent MahaRERA */}
            <div className="w-1/2 shrink-0 flex flex-col items-center justify-center px-2">
              <img
                src={resolveAssetUrl(digipaceQr)}
                alt="DigiPace MahaRERA QR code"
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = '/rera_qr.webp';
                }}
                className="w-[120px] h-[120px] min-w-[120px] min-h-[120px] p-1 border border-white shadow-[0_0_0_1px_#E2E7EE] rounded-md object-contain bg-white mx-auto block"
              />
              <div className="text-[9.5px] text-[#67748A] mt-0.5 font-semibold leading-tight">
                DigiPace MahaRERA (2/2)
              </div>
              <div className="font-['Manrope',sans-serif] font-bold text-[11px] text-[#111D46] tracking-tight whitespace-nowrap">
                {agentRera}
              </div>
            </div>
          </div>
        </div>

        {/* Slide Pagination Dots */}
        <div className="flex justify-center gap-1 mt-1">
          <button
            type="button"
            onClick={() => setQrSlide(0)}
            className={`h-1 rounded-full transition-all border-0 cursor-pointer ${
              qrSlide === 0 ? 'w-4 bg-[#F26635]' : 'w-1.5 bg-[#D1D5DB]'
            }`}
            aria-label="Project QR Slide"
          />
          <button
            type="button"
            onClick={() => setQrSlide(1)}
            className={`h-1 rounded-full transition-all border-0 cursor-pointer ${
              qrSlide === 1 ? 'w-4 bg-[#F26635]' : 'w-1.5 bg-[#D1D5DB]'
            }`}
            aria-label="DigiPace QR Slide"
          />
        </div>
      </div>

      {/* Get Instant Call Back Button */}
      <button
        className="w-full h-8.5 border-0 rounded-lg text-white font-['Manrope',sans-serif] font-bold text-xs fxGrad fxScale callbackGlow cursor-pointer shadow-xs shrink-0"
        type="button"
        onClick={() => onOpenModal && onOpenModal('Instant Call Back')}
      >
        ☎ Get Instant Call Back
      </button>

      {/* Enquire Now Form */}
      <form className="w-full flex flex-col gap-1.5 2xl:gap-2 shrink-0" onSubmit={handleSubmit} noValidate>
        <h3 className="font-['Manrope',sans-serif] font-bold text-[18px] text-center text-[#111D46] -mb-0.5">
          Enquire Now
        </h3>
        <input
          className="border-0 border-b border-[#DCDFE5] bg-transparent py-1 px-0.5 text-xs font-['DM_Sans',sans-serif] text-[#18243E] w-full rounded-none focus:outline-none focus:border-b-[#F26635] transition-colors"
          type="text"
          placeholder="Name*"
          aria-label="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <div className="flex gap-2">
          <CountryCodeSelect
            value={countryCode}
            onChange={setCountryCode}
            className="w-[105px] shrink-0 border-0 border-b border-[#DCDFE5] bg-transparent py-1 px-0.5 text-[10px] font-['DM_Sans',sans-serif] text-[#67748A] rounded-none focus:outline-none"
          />
          <input
            className="border-0 border-b border-[#DCDFE5] bg-transparent py-1 px-0.5 text-xs font-['DM_Sans',sans-serif] text-[#18243E] flex-1 rounded-none focus:outline-none focus:border-b-[#F26635] transition-colors"
            type="tel"
            placeholder="Mobile*"
            aria-label="Mobile number"
            value={mobile}
            onChange={(e) => setMobile(e.target.value.replace(/\D/g, ''))}
            required
          />
        </div>
        <label className="flex gap-1.5 items-start text-[8.5px] leading-tight text-[#67748A] text-left mt-0.5">
          <input
            type="checkbox"
            checked={consent}
            onChange={(e) => setConsent(e.target.checked)}
            required
            className="mt-0.5 shrink-0 accent-[#F26635] w-3 h-3"
          />
          <span className='!text-[10px] '>
            I Consent to The Processing of Provided Data According To{' '}
            <a href="#privacy-policy" target="_blank" rel="noopener noreferrer" className="underline text-[#F26635] font-semibold">
              Privacy Policy &amp; Terms
            </a>
            , I Authorize Digipace Consulting (OPC) Private Limited and its representatives to Call, SMS, Email or WhatsApp Me About Its Products and Offers. This Consent Overrides Any Registration For DNC/NDNC.
          </span>
        </label>
        <button
          className="self-center w-[150px] h-8 border-0 rounded-lg text-white font-['Manrope',sans-serif] font-bold text-xs fxGrad fxRock cursor-pointer shadow-xs mt-0.5"
          type="submit"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Submitting...' : 'Submit'}
        </button>
      </form>
    </aside>
  );
}
