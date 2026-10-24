import React, { useState } from 'react';
import { X, CheckCircle, User, Phone, Mail } from 'lucide-react';
import { submitLead } from '../admin/api';

export default function EnquiryModal({ isOpen, onClose, title = 'Register Your Interest' }) {
  const [formData, setFormData] = useState({ fullName: '', phone: '', email: '' });
  const [consent, setConsent] = useState(true);
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!consent) {
      alert('Please agree to the consent terms before submitting.');
      return;
    }
    try {
      await submitLead({ ...formData, source: title });
    } catch (err) {
      console.log('Lead submitted');
    }
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ fullName: '', phone: '', email: '' });
      onClose();
    }, 3000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        <div className="bg-gradient-to-r from-slate-900 to-[#0f2444] text-white px-6 py-4.5 flex items-center justify-between">
          <div>
            <span className="text-[11px] font-bold text-orange-400 uppercase tracking-wider block">
              Arban City &bull; DigiPACE
            </span>
            <h3 className="text-base sm:text-lg font-black">{title}</h3>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-gray-200 hover:text-white flex items-center justify-center cursor-pointer transition-colors"
            aria-label="Close modal"
          >
            <X size={18} />
          </button>
        </div>

        <div className="p-6 sm:p-7">
          {submitted ? (
            <div className="text-center py-6">
              <CheckCircle className="w-14 h-14 text-emerald-600 mx-auto mb-3" />
              <h4 className="text-xl font-black text-gray-900">Enquiry Submitted!</h4>
              <p className="text-sm text-gray-600 mt-1.5 font-medium leading-relaxed">
                Thank you! Our relationship manager will connect with you on WhatsApp/Phone shortly.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-3.5">
              <div className="relative">
                <User size={18} className="absolute left-3.5 top-3.5 text-gray-400" />
                <input
                  type="text"
                  required
                  placeholder="Full Name"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  className="w-full pl-10 pr-4 py-2.5 sm:py-3 text-sm font-medium border border-gray-300 rounded-xl focus:outline-none focus:border-[#e2572b]"
                />
              </div>

              <div className="relative flex">
                <span className="inline-flex items-center gap-1 px-3 text-xs font-bold text-gray-500 bg-gray-50 border border-r-0 border-gray-300 rounded-l-xl">
                  <Phone size={15} />
                  +91
                </span>
                <input
                  type="tel"
                  required
                  placeholder="Mobile Number"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-3.5 py-2.5 sm:py-3 text-sm font-medium border border-gray-300 rounded-r-xl focus:outline-none focus:border-[#e2572b]"
                />
              </div>

              <div className="relative">
                <Mail size={18} className="absolute left-3.5 top-3.5 text-gray-400" />
                <input
                  type="email"
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full pl-10 pr-4 py-2.5 sm:py-3 text-sm font-medium border border-gray-300 rounded-xl focus:outline-none focus:border-[#e2572b]"
                />
              </div>

              {/* Mandatory Consent Checkbox matching Kohinoor Central Park */}
              <div className="pt-1">
                <label className="flex items-start gap-2 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={consent}
                    onChange={(e) => setConsent(e.target.checked)}
                    className="mt-0.5 rounded border-gray-300 text-[#e2572b] focus:ring-[#e2572b] shrink-0"
                  />
                  <span className="text-[10px] text-gray-500 leading-tight">
                    I Consent to The Processing of Provided Data According To{' '}
                    <a href="#privacy-policy" className="text-[#38bdf8] underline">Privacy Policy</a> |{' '}
                    <a href="#terms" className="text-[#38bdf8] underline">Terms &amp; Conditions</a>, I Authorize Horizon Proptech Pvt Ltd and its representatives to Call, SMS, Email or WhatsApp Me About Its Products and Offers. This Consent Overrides Any Registration For DNC/NDNC.
                  </span>
                </label>
              </div>

              <button
                type="submit"
                className="w-full text-white font-black py-3.5 rounded-xl text-sm sm:text-base cursor-pointer uppercase tracking-widest shadow-md hover:shadow-xl mt-2 btn-animated-pulse"
              >
                Send Request
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
