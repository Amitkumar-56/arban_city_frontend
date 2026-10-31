import { useState } from 'react';
import { submitLead } from '../admin/api';
import CountryCodeSelect from './CountryCodeSelect';
import PrivacyPolicyModal from './PrivacyPolicyModal';

export default function EnquiryModal({ isOpen, onClose, title = 'Enquire Now', showToast, privacyData }) {
  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');
  const [countryCode, setCountryCode] = useState('+91');
  const [consent, setConsent] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [privacyOpen, setPrivacyOpen] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim()) {
      alert('Please enter your full name.');
      return;
    }
    const mobileDigits = mobile.replace(/\D/g, '');
    const countryDigits = countryCode.replace(/\D/g, '');
    if (mobileDigits.length < 4 || mobileDigits.length + countryDigits.length > 15) {
      alert('Please enter a valid mobile number.');
      return;
    }
    if (!consent) {
      alert('Please agree to the authorization consent.');
      return;
    }

    setIsSubmitting(true);
    try {
      await submitLead({
        fullName: name,
        phone: `${countryCode.replace(/\s/g, '')}${mobileDigits}`,
        source: `Popup Modal: ${title}`,
      });
    } catch (err) {
      console.error('Popup enquiry submission failed:', err);
      setIsSubmitting(false);
      alert('Unable to submit your enquiry. Please try again.');
      return;
    }

    setIsSubmitting(false);
    onClose();
    if (showToast) {
      showToast(`Thank you! Request for "${title}" has been received. Our team will contact you shortly.`);
    } else {
      alert(`Thank you! Request for "${title}" has been received. Our team will contact you shortly.`);
    }
    setName('');
    setMobile('');
  };

  return (
    <div
      className="fixed inset-0 z-[100] bg-[#0c173b]/80 flex items-center justify-center p-3 md:p-4 backdrop-blur-2xs"
      onClick={onClose}
    >
      <div
        className="relative w-[460px] max-w-full max-h-[92vh] max-md:w-[min(320px,calc(100vw-32px))] max-md:max-h-[calc(100dvh-24px)] overflow-y-auto overflow-x-hidden max-md:[scrollbar-width:none] max-md:[&::-webkit-scrollbar]:hidden bg-white rounded-2xl max-md:rounded-[13px] p-6 max-md:p-3.5 shadow-2xl animatePop"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
      >
        <button
          className="absolute top-3.5 right-3.5 max-md:top-2 max-md:right-2 w-8.5 h-8.5 max-md:w-7 max-md:h-7 rounded-full border-0 bg-[#F1F3F7] text-[#111D46] text-lg flex items-center justify-center cursor-pointer hover:bg-[#E2E7EE] transition-colors z-10"
          type="button"
          aria-label="Close"
          onClick={onClose}
        >
          ×
        </button>

        <div className="font-bold text-[10px] max-md:text-[9px] tracking-wider uppercase text-[#F26635]">
          Aveon City · DigiPace
        </div>
        <h3 className="text-left font-['Manrope',sans-serif] text-xl md:text-2xl max-md:text-base font-extrabold text-[#111D46] mt-1 mb-3.5 max-md:mb-2.5 max-md:mr-6">
          {title}
        </h3>

        <form onSubmit={handleSubmit} noValidate>
          <div className="flex flex-col gap-1 mb-3 max-md:mb-2">
            <label htmlFor="mName" className="text-xs max-md:text-[10px] font-bold text-[#111D46]">
              Full name*
            </label>
            <input
              id="mName"
              type="text"
              placeholder="Your Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="h-11 max-md:h-9 border border-[#DCE1EA] rounded-lg px-3 text-sm max-md:text-xs text-[#18243E] bg-white w-full focus:outline-none focus:border-[#F26635] focus:ring-2 focus:ring-[#F26635]/15 transition-all"
              required
            />
          </div>

          <div className="flex flex-col gap-1 mb-3 max-md:mb-2">
            <label htmlFor="mMob" className="text-xs max-md:text-[10px] font-bold text-[#111D46]">
              Mobile number*
            </label>
            <div className="flex min-w-0 gap-2">
              <CountryCodeSelect
                value={countryCode}
                onChange={setCountryCode}
                className="shrink-0 w-[116px] h-11 max-md:h-9 border border-[#DCE1EA] rounded-lg px-1.5 text-[#67748A] bg-[#F7F8FA] font-bold"
              />
              <input
                id="mMob"
                type="tel"
                placeholder="Mobile number"
                maxLength={15}
                value={mobile}
                onChange={(e) => setMobile(e.target.value.replace(/\D/g, ''))}
                className="h-11 max-md:h-9 min-w-0 border border-[#DCE1EA] rounded-lg px-3 text-sm max-md:text-xs text-[#18243E] bg-white flex-1 focus:outline-none focus:border-[#F26635] focus:ring-2 focus:ring-[#F26635]/15 transition-all"
                required
              />
            </div>
          </div>

          <label className="flex gap-2 items-start text-left text-[10px] max-md:text-[9px] text-[#67748A] leading-normal my-2">
            <input
              type="checkbox"
              checked={consent}
              onChange={(e) => setConsent(e.target.checked)}
              required
              className="mt-0.5 shrink-0 accent-[#F26635]"
            />
            <span className="consent-copy text-[10px]">
              I Consent to The Processing of Provided Data According To{' '}
              <button
                type="button"
                onClick={() => setPrivacyOpen(true)}
                className="underline text-[#F26635] bg-transparent border-0 p-0 cursor-pointer font-semibold"
              >
                Privacy Policy &amp; Terms
              </button>
              , I Authorize Digipace Consulting (OPC) Private Limited and its representatives to Call, SMS, Email or WhatsApp Me About Its Products and Offers. This Consent Overrides Any Registration For DNC/NDNC.
            </span>
          </label>

          <button
            className="w-full h-11.5 max-md:h-9 border-0 rounded-lg text-white font-['Manrope',sans-serif] font-extrabold text-sm max-md:text-xs fxGrad fxRock cursor-pointer shadow-md mt-1"
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Submitting...' : 'Submit'}
          </button>
        </form>
      </div>
      <PrivacyPolicyModal
        isOpen={privacyOpen}
        onClose={() => setPrivacyOpen(false)}
        privacyData={privacyData}
      />
    </div>
  );
}
