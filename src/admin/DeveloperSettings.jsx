import React, { useState } from 'react';
import { updateDeveloper } from './api';
import { Save, CheckCircle, ShieldCheck, Share2 } from 'lucide-react';
import FileUpload from './FileUpload';

export default function DeveloperSettings({ data, onRefresh }) {
  const [formData, setFormData] = useState({
    company_name: data?.company_name || data?.name || 'Delta & Tricity Group',
    description:
      data?.description ||
      'Delta & Tricity Group is a renowned real estate developer delivering premium residential projects with quality construction, timely delivery and customer satisfaction.',
    channel_partner_rera: data?.channel_partner_rera || 'A09000021404',
    project_rera: data?.project_rera || 'PR1331012500415',
    qr_image: data?.qr_image || '',
    digipace_rera: data?.digipace_rera || 'A51700026634',
    digipace_qr: data?.digipace_qr || '',
    maharera_website: data?.maharera_website || 'https://maharera.maharashtra.gov.in/',
    social_facebook: data?.social_facebook || '',
    social_instagram: data?.social_instagram || '',
    social_linkedin: data?.social_linkedin || '',
    social_youtube: data?.social_youtube || '',
    social_website: data?.social_website || '',
  });
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMessage('');
    try {
      await updateDeveloper(formData);
      setMessage('Developer profile and dual MahaRERA credentials updated successfully in MySQL!');
      if (onRefresh) onRefresh();
      setTimeout(() => setMessage(''), 4000);
    } catch (err) {
      alert('Error updating developer info: ' + err.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-6 sm:p-8 max-w-4xl space-y-7">
      <div className="border-b border-slate-100 pb-5">
        <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
          Developer &amp; MahaRERA Compliance Manager
        </h2>
        <p className="text-sm text-slate-500 mt-1">
          Manage developer profile, Project MahaRERA, Digipace Agent MahaRERA credentials, and social media links.
        </p>
      </div>

      {message && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-sm font-semibold flex items-center gap-2.5">
          <CheckCircle size={18} className="text-emerald-600 shrink-0" />
          <span>{message}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Section 1: Developer Information */}
        <div className="space-y-4">
          <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <span>1. Developer Profile</span>
          </h3>
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-1.5">Developer Company Name</label>
            <input
              type="text"
              required
              value={formData.company_name || ''}
              onChange={(e) => setFormData({ ...formData, company_name: e.target.value })}
              className="w-full px-4 py-2.5 border border-slate-300 rounded-xl text-sm font-medium focus:outline-none focus:border-[#e2572b]"
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-slate-700 mb-1.5">Developer Description</label>
            <textarea
              rows={4}
              required
              value={formData.description || ''}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-4 py-2.5 border border-slate-300 rounded-xl text-sm font-medium focus:outline-none focus:border-[#e2572b]"
            />
          </div>
        </div>

        {/* Section 2: Dual MahaRERA Compliance (Sector Zero Style) */}
        <div className="pt-6 border-t border-slate-100 space-y-5">
          <div className="flex items-center gap-2">
            <ShieldCheck size={20} className="text-[#24686d]" />
            <h3 className="text-base font-bold text-slate-900">
              2. MahaRERA Verification &amp; QR Codes (Sector Zero Airoli Layout)
            </h3>
          </div>

          <div>
            <label className="block text-sm font-bold text-slate-700 mb-1.5">Official MahaRERA Website URL</label>
            <input
              type="url"
              required
              value={formData.maharera_website || ''}
              onChange={(e) => setFormData({ ...formData, maharera_website: e.target.value })}
              className="w-full px-4 py-2.5 border border-slate-300 rounded-xl text-sm font-medium focus:outline-none focus:border-[#e2572b]"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-5 bg-slate-50/70 border border-slate-200 rounded-2xl">
            {/* Box 1: Project MahaRERA */}
            <div className="space-y-4 bg-white p-4 rounded-xl border border-slate-200">
              <span className="text-xs font-black uppercase text-[#0f2444] tracking-wider block">
                Project MahaRERA Box
              </span>
              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1">Project MahaRERA No.</label>
                <input
                  type="text"
                  required
                  value={formData.project_rera || ''}
                  onChange={(e) => setFormData({ ...formData, project_rera: e.target.value })}
                  className="w-full px-3.5 py-2 border border-slate-300 rounded-lg text-sm font-bold text-[#0f2444]"
                />
              </div>

              <FileUpload
                label="Project MahaRERA QR Code (Image)"
                value={formData.qr_image || ''}
                onChange={(url) => setFormData({ ...formData, qr_image: url })}
              />
            </div>

            {/* Box 2: Digipace MahaRERA */}
            <div className="space-y-4 bg-white p-4 rounded-xl border border-slate-200">
              <span className="text-xs font-black uppercase text-[#2563eb] tracking-wider block">
                Digipace MahaRERA Box
              </span>
              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1">Digipace MahaRERA No.</label>
                <input
                  type="text"
                  required
                  value={formData.digipace_rera || ''}
                  onChange={(e) => setFormData({ ...formData, digipace_rera: e.target.value })}
                  className="w-full px-3.5 py-2 border border-slate-300 rounded-lg text-sm font-bold text-[#0f2444]"
                />
              </div>

              <FileUpload
                label="Digipace Agent MahaRERA QR Code (Image)"
                value={formData.digipace_qr || ''}
                onChange={(url) => setFormData({ ...formData, digipace_qr: url })}
              />
            </div>
          </div>
        </div>

        {/* Section 3: Social Media Links */}
        <div className="pt-6 border-t border-slate-100 space-y-4">
          <div className="flex items-center gap-2">
            <Share2 size={18} className="text-slate-600" />
            <h3 className="text-base font-bold text-slate-900">
              3. Social Media Links
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-600 mb-1">Facebook Profile URL</label>
              <input
                type="url"
                placeholder="https://facebook.com/..."
                value={formData.social_facebook || ''}
                onChange={(e) => setFormData({ ...formData, social_facebook: e.target.value })}
                className="w-full px-3.5 py-2 border border-slate-300 rounded-lg text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-600 mb-1">Instagram Profile URL</label>
              <input
                type="url"
                placeholder="https://instagram.com/..."
                value={formData.social_instagram || ''}
                onChange={(e) => setFormData({ ...formData, social_instagram: e.target.value })}
                className="w-full px-3.5 py-2 border border-slate-300 rounded-lg text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-600 mb-1">LinkedIn Profile URL</label>
              <input
                type="url"
                placeholder="https://linkedin.com/company/..."
                value={formData.social_linkedin || ''}
                onChange={(e) => setFormData({ ...formData, social_linkedin: e.target.value })}
                className="w-full px-3.5 py-2 border border-slate-300 rounded-lg text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-600 mb-1">YouTube Channel URL</label>
              <input
                type="url"
                placeholder="https://youtube.com/..."
                value={formData.social_youtube || ''}
                onChange={(e) => setFormData({ ...formData, social_youtube: e.target.value })}
                className="w-full px-3.5 py-2 border border-slate-300 rounded-lg text-sm"
              />
            </div>
          </div>
        </div>

        <div className="pt-5 border-t border-slate-100 flex justify-end">
          <button
            type="submit"
            disabled={saving}
            className="inline-flex items-center gap-2 bg-[#0f2444] hover:bg-[#1a3867] text-white text-sm font-bold px-6 py-3 rounded-xl shadow-md transition-all cursor-pointer"
          >
            <Save size={16} />
            <span>{saving ? 'Saving...' : 'Save Developer & RERA Settings'}</span>
          </button>
        </div>
      </form>
    </div>
  );
}
