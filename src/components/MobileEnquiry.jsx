import { useState } from 'react';
import { submitLead } from '../admin/api';
import CountryCodeSelect from './CountryCodeSelect';

export default function MobileEnquiry({ showToast }) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [countryCode, setCountryCode] = useState('+91');
  const [consent, setConsent] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim()) {
      alert('Please enter your name.');
      return;
    }
    const phoneDigits = phone.replace(/\D/g, '');
    const countryDigits = countryCode.replace(/\D/g, '');
    if (phoneDigits.length < 4 || phoneDigits.length + countryDigits.length > 15) {
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
        phone: `${countryCode.replace(/\s/g, '')}${phoneDigits}`,
        source: 'Mobile Quick Enquiry Form',
      });
    } catch (err) {
      console.error('Mobile enquiry submission failed:', err);
      setIsSubmitting(false);
      alert('Unable to submit your enquiry. Please try again.');
      return;
    }

    setIsSubmitting(false);
    if (showToast) {
      showToast('Thank you! Your enquiry has been received. Our sales team will connect with you shortly.');
    } else {
      alert('Thank you! Your enquiry has been received. Our sales team will connect with you shortly.');
    }
    setName('');
    setPhone('');
  };

  return (
    <section
      className="md:hidden bg-white border border-[#e8ecf2] rounded-2xl shadow-[0_4px_18px_rgba(21,35,73,0.07)] mx-2.5 mt-3 p-4 scroll-mt-20"
      id="mobile-enquiry"
      aria-label="Quick enquiry"
    >
      <h2 className="text-lg font-bold font-['Manrope',sans-serif] text-[#111D46] mb-2 text-center">
        Enquire Now
      </h2>

      <form className="grid gap-2.5" onSubmit={handleSubmit}>
        <input
          name="name"
          type="text"
          placeholder="Name*"
          autoComplete="name"
          required
          minLength={2}
          aria-label="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full min-w-0 h-11 border border-[#dce3ed] rounded-lg px-3 text-sm font-['DM_Sans',sans-serif] text-[#18243E] focus:outline-none focus:border-[#F26635] focus:ring-1 focus:ring-[#F26635]"
        />
        <div className="grid grid-cols-[minmax(0,1fr)_minmax(0,2fr)] gap-2">
          <CountryCodeSelect
            value={countryCode}
            onChange={setCountryCode}
            className="w-full min-w-0 h-11 border border-[#dce3ed] rounded-lg px-1 text-[10px] font-['DM_Sans',sans-serif] text-[#67748A] bg-[#F7F8FA] font-bold"
          />
          <input
            name="phone"
            type="tel"
            inputMode="numeric"
            maxLength={15}
            placeholder="Mobile Number*"
            autoComplete="tel-national"
            required
            aria-label="Mobile Number"
            value={phone}
            onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
            className="w-full min-w-0 h-11 border border-[#dce3ed] rounded-lg px-3 text-sm font-['DM_Sans',sans-serif] text-[#18243E] focus:outline-none focus:border-[#F26635] focus:ring-1 focus:ring-[#F26635]"
          />
        </div>
        <label className="text-[10px] text-[#66748A] leading-relaxed flex gap-2 items-start">
          <input
            type="checkbox"
            required
            checked={consent}
            onChange={(e) => setConsent(e.target.checked)}
            className="w-3.5 h-3.5 mt-0.5 shrink-0 accent-[#F26635]"
          />
          <span className="consent-copy text-[10px]">
            I Consent to The Processing of Provided Data According To Privacy Policy | Terms &amp; Conditions, I Authorize Digipace Consulting (OPC) Private Limited and its representatives to Call, SMS, Email or WhatsApp Me About Its Products and Offers. This Consent Overrides Any Registration For DNC/NDNC.
          </span>
        </label>
        <button
          className="h-11 border-0 rounded-lg bg-[#111D46] text-white font-['Manrope',sans-serif] font-extrabold text-sm cursor-pointer hover:bg-[#1d2a4a] transition-colors"
          type="submit"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Submitting...' : 'Submit'}
        </button>
      </form>
    </section>
  );
}
