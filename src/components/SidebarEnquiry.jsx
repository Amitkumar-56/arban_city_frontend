import React, { useState } from 'react';
import { Phone } from 'lucide-react';
import reraQrImg from '../assets/rera_qr.webp';
import { submitLead } from '../admin/api';

export default function SidebarEnquiry({ data, onOpenModal }) {
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
  });
  const [consent, setConsent] = useState(true);
  const [submitted, setSubmitted] = useState(false);

  const phoneNumber = data?.header?.phone || data?.hero?.phone || '+91 81000 00080';
  const projectRera = data?.developer?.project_rera || 'PR1260002501680';
  const qrImage = data?.developer?.qr_image || reraQrImg;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!consent) {
      alert('Please agree to the consent terms before submitting.');
      return;
    }
    try {
      await submitLead({ ...formData, source: 'Desktop Sidebar Form' });
    } catch (err) {
      console.log('Lead submitted');
    }
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ fullName: '', phone: '', email: '' });
    }, 4000);
  };

  return (
    <div className="w-full space-y-2.5">
      {/* Top Direct Call Button */}
      <a
        href={`tel:${phoneNumber.replace(/\s+/g, '')}`}
        className="w-full flex items-center justify-center gap-2.5 py-3 px-4 text-white font-extrabold text-sm sm:text-base rounded-md shadow-md text-center tracking-wide btn-animated-gradient cursor-pointer"
      >
        <Phone size={17} className="fill-current animate-pulse" />
        <span>{phoneNumber}</span>
      </a>

      {/* Main Form Card with MahaRERA QR Code */}
      <div className="bg-white rounded-md border border-gray-200/80 shadow-md p-4 sm:p-5 space-y-3.5">
        {/* MahaRERA Box: Number first, then large QR code directly below it */}
        <div className="bg-slate-50 border border-slate-200/90 rounded-md p-3 flex flex-col items-center text-center shadow-2xs">
          <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest block mb-0.5">
            MahaRERA No.
          </span>
          <span className="text-sm sm:text-base font-black text-gray-900 tracking-wider block mb-2">
            {projectRera}
          </span>

          {/* Large QR Code */}
          <div className="w-28 h-28 sm:w-32 sm:h-32 bg-white p-1 border border-gray-300 rounded-md shadow-xs flex items-center justify-center">
            <img
              src={qrImage}
              alt={`MahaRERA QR ${projectRera}`}
              className="w-full h-full object-contain"
            />
          </div>
          <span className="text-[10px] text-gray-500 mt-1.5 font-medium">
            Scan for verified details
          </span>
        </div>

        <h3 className="text-base font-black text-gray-900 text-center tracking-tight pt-0.5">
          Pre-Register here for Site Visit
        </h3>

        {submitted ? (
          <div className="text-center py-5 text-xs sm:text-sm font-bold text-emerald-800 bg-emerald-50 rounded-md border border-emerald-200">
            Thank you! Your site visit request has been received. Our specialist will call you shortly.
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-3">
            <div>
              <input
                type="text"
                required
                placeholder="Name"
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                className="w-full px-3 py-2 text-sm bg-transparent border-b border-gray-300 focus:border-[#8f7635] focus:outline-none transition-colors placeholder:text-gray-400 font-medium"
              />
            </div>

            <div>
              <input
                type="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-3 py-2 text-sm bg-transparent border-b border-gray-300 focus:border-[#8f7635] focus:outline-none transition-colors placeholder:text-gray-400 font-medium"
              />
            </div>

            <div className="flex items-center gap-2 pt-0.5">
              <div className="w-20 px-2 py-1.5 text-xs font-bold text-gray-600 border-b border-gray-300 bg-gray-50/80 text-center shrink-0">
                India (+91)
              </div>
              <input
                type="tel"
                required
                placeholder="Mobile No"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-3 py-1.5 text-sm bg-transparent border-b border-gray-300 focus:border-[#8f7635] focus:outline-none transition-colors placeholder:text-gray-400 font-medium min-w-0"
              />
            </div>

            {/* Mandatory Consent Checkbox matching Kohinoor Central Park */}
            <div className="pt-1.5">
              <label className="flex items-start gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={consent}
                  onChange={(e) => setConsent(e.target.checked)}
                  className="mt-0.5 h-3.5 w-3.5 rounded border-gray-300 text-[#8f7635] focus:ring-[#8f7635] shrink-0 cursor-pointer"
                />
                <span className="text-[10px] text-gray-500 leading-tight">
                  I Consent to The Processing of Provided Data According To{' '}
                  <a href="#privacy-policy" className="text-gray-700 underline font-semibold">Privacy Policy</a> |{' '}
                  <a href="#privacy-policy" className="text-gray-700 underline font-semibold">Terms &amp; Conditions</a>, I Authorize Horizon Proptech Pvt Ltd and its representatives to Call, SMS, Email or WhatsApp Me About Its Products and Offers. This Consent Overrides Any Registration For DNC/NDNC.
                </span>
              </label>
            </div>

            <button
              type="submit"
              className="w-full mt-2.5 py-3 px-4 text-white font-black text-xs sm:text-sm rounded-md tracking-widest uppercase cursor-pointer shadow-md hover:shadow-xl btn-animated-pulse"
            >
              Enquiry Now
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
