import React, { useEffect, useState } from 'react';
import { ArrowLeft, ShieldCheck, Clock, Phone, Mail, Printer } from 'lucide-react';
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

  const handlePrint = () => {
    window.print();
  };

  const title = policyData?.title || 'Privacy Policy';
  const lastUpdated = policyData?.last_updated || 'October 2026';
  const overview = policyData?.overview || '';
  const sections = Array.isArray(policyData?.sections) ? policyData.sections : [];

  if (loading && !policyData) {
    return (
      <div className="min-h-screen bg-[#f8fafc] flex items-center justify-center">
        <div className="text-center">
          <div className="w-9 h-9 border-3 border-slate-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-3"></div>
          <p className="text-sm font-semibold text-slate-600">Loading Privacy Policy...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-900 font-sans flex flex-col">
      <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <button
            onClick={onBackToSite}
            className="inline-flex items-center gap-2 text-sm font-semibold text-slate-700 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 px-3.5 py-1.5 rounded-xl transition-all cursor-pointer"
          >
            <ArrowLeft size={16} />
            <span>Back to Home</span>
          </button>

          <div className="flex items-center gap-2">
            <span className="font-extrabold text-base tracking-tight text-slate-900">
              Arban <span className="text-[#e2572b]">City</span>
            </span>
            <span className="text-xs text-slate-400 font-medium">| Official Document</span>
          </div>

          <button
            onClick={handlePrint}
            title="Print or Save as PDF"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 border border-slate-200 px-3 py-1.5 rounded-xl transition-colors cursor-pointer"
          >
            <Printer size={15} />
            <span className="hidden sm:inline">Print / PDF</span>
          </button>
        </div>
      </header>

      <main className="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <div className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-10 shadow-xs mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200 mb-4">
            <ShieldCheck size={14} />
            <span>RERA Registered &bull; PR1260002501680</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            {title}
          </h1>

          <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-500 font-medium mt-3">
            <Clock size={15} />
            <span>Last Updated: {lastUpdated}</span>
            <span>&bull;</span>
            <span>Sector 0, Airoli, Navi Mumbai</span>
          </div>

          {overview && (
            <p className="mt-5 text-sm sm:text-base text-slate-600 leading-relaxed font-normal border-t border-slate-100 pt-5">
              {overview}
            </p>
          )}
        </div>

        <div className="space-y-5">
          {sections.map((section, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl border border-slate-200/80 p-6 sm:p-7 shadow-xs hover:border-slate-300 transition-all"
            >
              <h2 className="text-base sm:text-lg font-bold text-slate-900 mb-2.5 flex items-center gap-2">
                <span className="w-1.5 h-5 bg-[#e2572b] rounded-full inline-block"></span>
                <span>{section.heading}</span>
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {section.body}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-8 bg-slate-900 text-white rounded-3xl p-6 sm:p-8">
          <h3 className="text-lg font-bold text-white mb-2">
            Have Questions About Your Privacy?
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-6">
            If you have any questions about this Privacy Policy, your personal information, or wish to opt out of marketing communications, our dedicated relationship and compliance team is here to assist you.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <a
              href="tel:+918100000080"
              className="flex items-center gap-3 bg-white/10 hover:bg-white/15 p-3.5 rounded-2xl transition-colors border border-white/10"
            >
              <div className="p-2 rounded-xl bg-[#e2572b] text-white">
                <Phone size={16} />
              </div>
              <div>
                <div className="text-xs text-slate-300 font-medium">Direct Line</div>
                <div className="text-sm font-bold text-white">+91 81000 00080</div>
              </div>
            </a>

            <a
              href="mailto:info@arban-city.com"
              className="flex items-center gap-3 bg-white/10 hover:bg-white/15 p-3.5 rounded-2xl transition-colors border border-white/10"
            >
              <div className="p-2 rounded-xl bg-blue-600 text-white">
                <Mail size={16} />
              </div>
              <div>
                <div className="text-xs text-slate-300 font-medium">Compliance Email</div>
                <div className="text-sm font-bold text-white">info@arban-city.com</div>
              </div>
            </a>
          </div>

          <div className="mt-6 pt-5 border-t border-slate-800 text-center sm:text-left text-xs text-slate-400">
            Arban City Sector 0 &bull; MahaRERA: PR1260002501680 &bull; Delta Tricity Project
          </div>
        </div>

        <div className="mt-8 text-center">
          <button
            onClick={onBackToSite}
            className="inline-flex items-center gap-2 text-sm font-bold text-slate-700 hover:text-slate-900 bg-white border border-slate-300 px-5 py-2.5 rounded-2xl shadow-xs transition-all cursor-pointer"
          >
            <ArrowLeft size={16} />
            <span>Return to Arban City Website</span>
          </button>
        </div>
      </main>

      <footer className="bg-white border-t border-slate-200 py-6 text-center text-xs text-slate-500 font-medium mt-12">
        <p>&copy; 2026 Arban City. All Rights Reserved. Managed by DigiPACE.</p>
      </footer>
    </div>
  );
}
