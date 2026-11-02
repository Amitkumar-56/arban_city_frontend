import React, { useEffect, useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { fetchPrivacy } from '../admin/api';

export default function PrivacyPolicyPage({ onBackToSite, initialData }) {
  const [policyData, setPolicyData] = useState(initialData || null);
  const [loading, setLoading] = useState(!initialData);

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchPrivacy()
      .then((data) => {
        if (data) setPolicyData(data);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const title = policyData?.title || 'Privacy Policy & Terms';
  const overview = policyData?.overview || '';
  const sections = Array.isArray(policyData?.sections) ? policyData.sections : [];

  if (loading && !policyData) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <p className="text-sm font-semibold text-gray-500">Loading Privacy Policy...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-gray-800">
      {/* Clean Top Navigation Bar */}
      <div className="border-b border-gray-200 bg-white">
        <div className="max-w-4xl mx-auto px-4 py-3.5 flex items-center justify-between">
          <button
            onClick={onBackToSite}
            type="button"
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-gray-700 hover:text-black cursor-pointer bg-transparent border-0 p-0"
          >
            <ArrowLeft size={16} />
            <span>Back to Home</span>
          </button>
          <span className="font-extrabold text-sm sm:text-base text-gray-900 tracking-tight">
            Arban City Sector 0
          </span>
        </div>
      </div>

      {/* Main Clean Document */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mb-6 pb-4 border-b border-gray-200">
          {title}
        </h1>

        {overview && (
          <p className="text-sm sm:text-[15px] leading-relaxed text-gray-700 mb-6">
            {overview}
          </p>
        )}

        {sections.length > 0 ? (
          <div className="space-y-6">
            {sections.map((section, idx) => (
              <div key={idx}>
                <h2 className="text-base sm:text-lg font-bold text-gray-900 mb-2">
                  {section.heading}
                </h2>
                <p className="text-sm sm:text-[14.5px] leading-relaxed text-gray-600">
                  {section.body}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-4 text-sm sm:text-[14.5px] leading-relaxed text-gray-600">
            <p>
              We value your trust and are committed to protecting your personal information. Any information collected through this website—such as your name, phone number, and email address—is used solely to respond to your inquiries, schedule project visits, and provide verified information regarding Arban City Sector 0.
            </p>
            <p>
              We do not sell, rent, or trade your personal data to third parties. All communication is conducted in accordance with RERA guidelines and telecom standards.
            </p>
            <p>
              By submitting an enquiry form on this website, you authorize our sales and client relationship representatives to contact you via Call, SMS, WhatsApp, or Email regarding project details, pricing, and availability.
            </p>
          </div>
        )}

        <div className="mt-12 pt-6 border-t border-gray-200 flex justify-between items-center text-xs text-gray-500">
          <span>&copy; {new Date().getFullYear()} Arban City Sector 0. All rights reserved.</span>
          <button
            onClick={onBackToSite}
            type="button"
            className="text-gray-700 hover:text-black font-bold underline cursor-pointer bg-transparent border-0"
          >
            Back to Home
          </button>
        </div>
      </main>
    </div>
  );
}
