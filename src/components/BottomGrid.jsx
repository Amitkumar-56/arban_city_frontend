import React, { useState } from 'react';
import { Plus, Minus, ChevronLeft, ChevronRight, User, Phone, Mail } from 'lucide-react';
import constructionImg from '../assets/construction.webp';
import { submitLead } from '../admin/api';

export default function BottomGrid({ data }) {
  const [openFaq, setOpenFaq] = useState(null);

  const faqs = Array.isArray(data?.faqs) ? data.faqs : [];

  const [formData, setFormData] = useState({ fullName: '', phone: '', email: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await submitLead({ ...formData, source: 'Contact Form' });
    } catch (err) {}
    setSubmitted(true);
  };

  const uploadedPhotos = data?.construction?.images || [];
  const constructionPhotos = uploadedPhotos.length > 0 ? uploadedPhotos : [constructionImg];
  const [currentPhoto, setCurrentPhoto] = useState(0);

  const constructionTitle = data?.construction?.title || 'Construction Status';
  const constructionDesc = data?.construction?.description || '';

  return (
    <section id="contact" className="scroll-mt-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6 mb-6">
      {faqs.length > 0 && (
        <div className="md:col-span-2 lg:col-span-5 bg-white rounded-2xl border border-gray-200 shadow-sm p-6 flex flex-col justify-between overflow-hidden">
          <div>
            <h2 className="text-lg sm:text-xl font-extrabold text-[#0f2444] mb-4 break-words">
              Frequently Asked Questions
            </h2>
            <div className="space-y-2.5">
              {faqs.map((faq, index) => {
                const isOpen = openFaq === index;
                const qText = faq.question || faq.q || '';
                const aText = faq.answer || faq.a || '';
                return (
                  <div key={faq.id || index} className="border border-gray-200 rounded-xl overflow-hidden shadow-2xs">
                    <button
                      onClick={() => setOpenFaq(isOpen ? null : index)}
                      className="w-full py-3 px-4 flex items-center justify-between text-left text-sm sm:text-[15px] font-bold text-gray-800 cursor-pointer gap-2 hover:bg-gray-50 transition-colors"
                    >
                      <span className="break-words min-w-0">{qText}</span>
                      <span className="text-gray-400 shrink-0">
                        {isOpen ? <Minus size={16} /> : <Plus size={16} />}
                      </span>
                    </button>
                    {isOpen && (
                      <div className="px-4 pb-3.5 text-xs sm:text-sm text-gray-600 break-words leading-relaxed font-medium">
                        {aText}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      <div className="md:col-span-1 lg:col-span-3 bg-white rounded-2xl border border-gray-200 shadow-sm p-6 flex flex-col justify-between overflow-hidden">
        <div>
          <h2 className="text-lg sm:text-xl font-extrabold text-[#0f2444] mb-4 break-words">
            Contact Us
          </h2>
          {submitted ? (
            <div className="text-sm text-emerald-700 font-bold py-6 text-center bg-emerald-50 rounded-xl border border-emerald-200">
              Thank you! We will get in touch shortly.
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-3.5">
              <div className="relative">
                <User size={16} className="absolute left-3 top-3 text-gray-400 shrink-0" />
                <input
                  type="text"
                  required
                  placeholder="Full Name"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  className="w-full pl-9 pr-3 py-2.5 text-sm font-medium border border-gray-300 rounded-xl focus:outline-none focus:border-[#e2572b]"
                />
              </div>

              <div className="relative flex">
                <span className="inline-flex items-center gap-1 px-2.5 text-xs font-bold text-gray-500 bg-gray-50 border border-r-0 border-gray-300 rounded-l-xl shrink-0">
                  <Phone size={14} />
                  +91
                </span>
                <input
                  type="tel"
                  required
                  placeholder="Mobile Number"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-3 py-2.5 text-sm font-medium border border-gray-300 rounded-r-xl focus:outline-none focus:border-[#e2572b] min-w-0"
                />
              </div>

              <div className="relative">
                <Mail size={16} className="absolute left-3 top-3 text-gray-400 shrink-0" />
                <input
                  type="email"
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full pl-9 pr-3 py-2.5 text-sm font-medium border border-gray-300 rounded-xl focus:outline-none focus:border-[#e2572b]"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-[#0a1a36] hover:bg-[#152e59] text-white py-3 rounded-xl text-sm font-bold cursor-pointer transition-colors shadow-xs"
              >
                Submit Enquiry
              </button>
            </form>
          )}
        </div>
      </div>

      <div className="md:col-span-1 lg:col-span-4 bg-white rounded-2xl border border-gray-200 shadow-sm p-6 flex flex-col justify-between overflow-hidden">
        <div>
          <h2 className="text-lg sm:text-xl font-extrabold text-[#0f2444] mb-1 break-words">
            {constructionTitle}
          </h2>
          {constructionDesc && (
            <p className="text-xs sm:text-sm text-gray-600 mb-3.5 break-words leading-relaxed font-medium">
              {constructionDesc}
            </p>
          )}
        </div>

        <div className="relative rounded-xl overflow-hidden aspect-[16/10] bg-gray-900 shadow-2xs">
          <img
            src={constructionPhotos[currentPhoto % constructionPhotos.length]}
            alt={constructionTitle}
            className="w-full h-full object-cover"
          />

          {constructionPhotos.length > 1 && (
            <>
              <button
                onClick={() => setCurrentPhoto((p) => (p === 0 ? constructionPhotos.length - 1 : p - 1))}
                className="absolute left-2 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-white/90 flex items-center justify-center text-gray-700 cursor-pointer hover:bg-white"
              >
                <ChevronLeft size={16} />
              </button>
              <button
                onClick={() => setCurrentPhoto((p) => (p === constructionPhotos.length - 1 ? 0 : p + 1))}
                className="absolute right-2 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-white/90 flex items-center justify-center text-gray-700 cursor-pointer hover:bg-white"
              >
                <ChevronRight size={16} />
              </button>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
