import React, { useState, useEffect } from 'react';
import { ShieldCheck, Plus, Trash2, Save, CheckCircle2, AlertCircle, FileText, ArrowUp, ArrowDown } from 'lucide-react';
import { fetchPrivacy, updatePrivacy } from './api';

export default function PrivacyPolicySettings({ onRefresh }) {
  const [title, setTitle] = useState('Privacy Policy');
  const [lastUpdated, setLastUpdated] = useState('October 2026');
  const [overview, setOverview] = useState(
    'At Arban City (Sector 0, Airoli, Navi Mumbai), we are deeply committed to safeguarding the privacy and personal data of our prospective homebuyers, investors, and website visitors. This Privacy Policy details how we collect, use, store, and protect your information.'
  );
  const [sections, setSections] = useState([
    {
      heading: '1. Information We Collect',
      body: 'When you submit enquiry forms, request project brochures, schedule a site visit, or contact our sales team, we may collect information including your full name, phone/mobile number, email address, preferred apartment configuration (1, 2, or 3 BHK), budget range, and location preference.'
    },
    {
      heading: '2. Purpose of Information Collection',
      body: 'The collected information is solely utilized to provide you with comprehensive information regarding Arban City floor plans, pricing sheets, project progress updates, construction milestones, and to facilitate seamless site visits with our authorized relationship managers.'
    },
    {
      heading: '3. Data Security & Storage',
      body: 'We implement rigorous administrative, technical, and physical security measures to protect your personal information against unauthorized access, disclosure, alteration, or misuse. Access to your contact information is restricted strictly to authorized sales personnel.'
    },
    {
      heading: '4. Non-Disclosure & Third Parties',
      body: 'We adhere to a strict policy against selling, trading, renting, or leasing your personal information to third-party marketing companies. Data is only shared with authorized project sales affiliates and partner real estate marketing agents under strict confidentiality agreements.'
    },
    {
      heading: '5. Cookies & Automated Analytics',
      body: 'Our website may use standard cookies and analytics tracking technologies to understand visitor browsing patterns, optimize page load speeds, and improve user interface experience. You can choose to disable cookies via your browser settings at any time.'
    },
    {
      heading: '6. RERA Compliance & Legal Disclosures',
      body: 'This website is managed in compliance with Real Estate (Regulation and Development) Act (RERA) standards under Project RERA No. PR1260002501680. We may disclose personal data if required by law, court order, or governmental authorities to comply with statutory legal procedures.'
    },
    {
      heading: '7. Your Rights & Opt-Out',
      body: 'You have full rights to request verification, modification, or complete deletion of your contact details from our sales database. To unsubscribe from SMS alerts, WhatsApp project updates, or phone communications, you can reach out to us at info@arban-city.com.'
    },
    {
      heading: '8. Contact & Grievance Redressal',
      body: 'If you have questions, feedback, or grievance regarding this Privacy Policy or your personal information, please contact our Compliance Officer at info@arban-city.com or call +91 81000 00080.'
    }
  ]);

  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchPrivacy()
      .then((data) => {
        if (data) {
          if (data.title) setTitle(data.title);
          if (data.last_updated) setLastUpdated(data.last_updated);
          if (data.overview) setOverview(data.overview);
          if (Array.isArray(data.sections) && data.sections.length > 0) {
            setSections(data.sections);
          }
        }
      })
      .catch(() => {});
  }, []);

  const handleSectionChange = (index, field, value) => {
    const updated = [...sections];
    updated[index] = { ...updated[index], [field]: value };
    setSections(updated);
  };

  const addSection = () => {
    setSections([
      ...sections,
      {
        heading: `${sections.length + 1}. New Policy Clause`,
        body: 'Details and terms regarding this policy clause.',
      },
    ]);
  };

  const removeSection = (index) => {
    if (sections.length <= 1) return;
    setSections(sections.filter((_, i) => i !== index));
  };

  const moveSection = (index, direction) => {
    const newIndex = index + direction;
    if (newIndex < 0 || newIndex >= sections.length) return;
    const updated = [...sections];
    const temp = updated[index];
    updated[index] = updated[newIndex];
    updated[newIndex] = temp;
    setSections(updated);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    setSuccess(false);
    setError(null);

    try {
      await updatePrivacy({
        title,
        last_updated: lastUpdated,
        overview,
        sections,
      });
      setSuccess(true);
      if (onRefresh) onRefresh();
      setTimeout(() => setSuccess(false), 4000);
    } catch (err) {
      setError(err.message || 'Failed to save privacy policy');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Info */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-blue-50 text-blue-700 rounded-xl">
              <ShieldCheck size={24} />
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-900">Privacy Policy Manager</h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                Manage the legal privacy policy content displayed to website visitors and buyers
              </p>
            </div>
          </div>
          <a
            href="#privacy-policy"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-600 hover:text-blue-700 bg-blue-50 px-3 py-1.5 rounded-lg border border-blue-200"
          >
            <FileText size={14} />
            <span>Preview Live Page</span>
          </a>
        </div>
      </div>

      {success && (
        <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-sm font-semibold flex items-center gap-2.5">
          <CheckCircle2 size={18} className="shrink-0 text-emerald-600" />
          <span>Privacy policy updated successfully! Changes are live on the website.</span>
        </div>
      )}

      {error && (
        <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-800 text-sm font-semibold flex items-center gap-2.5">
          <AlertCircle size={18} className="shrink-0 text-red-600" />
          <span>{error}</span>
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-6">
        {/* Basic Details */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-5">
          <h3 className="text-base font-bold text-slate-900 pb-3 border-b border-slate-100">
            Page Title &amp; Last Update Date
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                Policy Document Title
              </label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Privacy Policy"
                className="w-full px-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all font-medium"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                Effective / Last Updated Date
              </label>
              <input
                type="text"
                required
                value={lastUpdated}
                onChange={(e) => setLastUpdated(e.target.value)}
                placeholder="e.g. October 2026"
                className="w-full px-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all font-medium"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              Introductory Overview
            </label>
            <textarea
              rows={3}
              required
              value={overview}
              onChange={(e) => setOverview(e.target.value)}
              placeholder="Overview statement regarding user privacy and commitments..."
              className="w-full px-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all font-medium"
            />
          </div>
        </div>

        {/* Section Clauses */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <h3 className="text-base font-bold text-slate-900">Policy Clauses &amp; Sections</h3>
              <p className="text-xs text-slate-500">Edit, add, reorder, or remove specific policy sections</p>
            </div>
            <button
              type="button"
              onClick={addSection}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-700 bg-blue-50 hover:bg-blue-100 border border-blue-200 px-3.5 py-2 rounded-xl transition-colors cursor-pointer"
            >
              <Plus size={15} />
              <span>Add Clause</span>
            </button>
          </div>

          <div className="space-y-4">
            {sections.map((sec, idx) => (
              <div
                key={idx}
                className="p-4 sm:p-5 rounded-xl border border-slate-200 bg-slate-50/70 space-y-3 hover:border-slate-300 transition-colors"
              >
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2 flex-1">
                    <span className="w-6 h-6 rounded-lg bg-slate-200 text-slate-700 flex items-center justify-center font-bold text-xs shrink-0">
                      {idx + 1}
                    </span>
                    <input
                      type="text"
                      required
                      value={sec.heading}
                      onChange={(e) => handleSectionChange(idx, 'heading', e.target.value)}
                      placeholder="Clause Heading (e.g. 1. Information We Collect)"
                      className="w-full px-3 py-1.5 text-sm font-semibold bg-white border border-slate-200 rounded-lg text-slate-900 focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                  </div>

                  <div className="flex items-center gap-1 shrink-0">
                    <button
                      type="button"
                      disabled={idx === 0}
                      onClick={() => moveSection(idx, -1)}
                      title="Move Up"
                      className="p-1.5 text-slate-400 hover:text-slate-700 disabled:opacity-30 cursor-pointer"
                    >
                      <ArrowUp size={16} />
                    </button>
                    <button
                      type="button"
                      disabled={idx === sections.length - 1}
                      onClick={() => moveSection(idx, 1)}
                      title="Move Down"
                      className="p-1.5 text-slate-400 hover:text-slate-700 disabled:opacity-30 cursor-pointer"
                    >
                      <ArrowDown size={16} />
                    </button>
                    <button
                      type="button"
                      onClick={() => removeSection(idx)}
                      title="Delete Clause"
                      disabled={sections.length <= 1}
                      className="p-1.5 text-red-500 hover:text-red-700 disabled:opacity-30 cursor-pointer ml-1"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>

                <div>
                  <textarea
                    rows={3}
                    required
                    value={sec.body}
                    onChange={(e) => handleSectionChange(idx, 'body', e.target.value)}
                    placeholder="Describe the policy clause in full detail..."
                    className="w-full px-3 py-2 text-sm bg-white border border-slate-200 rounded-lg text-slate-800 focus:ring-2 focus:ring-blue-500 outline-none leading-relaxed"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Submit */}
        <div className="flex items-center justify-between pt-2">
          <button
            type="button"
            onClick={addSection}
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-slate-600 hover:text-slate-900 bg-white border border-slate-300 px-4 py-2.5 rounded-xl transition-all cursor-pointer shadow-xs"
          >
            <Plus size={16} />
            <span>Add Another Section</span>
          </button>

          <button
            type="submit"
            disabled={saving}
            className="inline-flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white font-semibold text-sm px-6 py-3 rounded-xl transition-all shadow-sm cursor-pointer disabled:opacity-50"
          >
            <Save size={16} />
            <span>{saving ? 'Saving...' : 'Save Privacy Policy'}</span>
          </button>
        </div>
      </form>
    </div>
  );
}
