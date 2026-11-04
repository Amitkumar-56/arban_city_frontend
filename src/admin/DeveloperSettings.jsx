import React, { useState } from 'react';
import { updateDeveloper } from './api';
import { Save, CheckCircle, ShieldCheck, Share2 } from 'lucide-react';
import FileUpload from './FileUpload';

export default function DeveloperSettings({ data, onRefresh }) {
  const [formData, setFormData] = useState({
    company_name: data?.company_name || data?.name || '',
    description: data?.description ?? '',
    channel_partner_rera: data?.channel_partner_rera ?? '',
    project_rera: data?.project_rera ?? '',
    qr_image: data?.qr_image || '',
    developer_logo: data?.developer_logo || '',
    developer_logo_alt: data?.developer_logo_alt || '',
    developer_logo_title: data?.developer_logo_title || '',
    developer_logo_loading: data?.developer_logo_loading || 'lazy',
    developer_logo_decoding: data?.developer_logo_decoding || 'async',
    developer_logo_width: data?.developer_logo_width || '',
    developer_logo_height: data?.developer_logo_height || '',
    qr_image: data?.qr_image || '',
    qr_image_alt: data?.qr_image_alt || '',
    qr_image_title: data?.qr_image_title || '',
    qr_image_loading: data?.qr_image_loading || 'lazy',
    qr_image_decoding: data?.qr_image_decoding || 'async',
    qr_image_width: data?.qr_image_width || '',
    qr_image_height: data?.qr_image_height || '',
    digipace_rera: data?.digipace_rera ?? '',
    digipace_qr: data?.digipace_qr || '',
    digipace_qr_alt: data?.digipace_qr_alt || '',
    digipace_qr_title: data?.digipace_qr_title || '',
    digipace_qr_loading: data?.digipace_qr_loading || 'lazy',
    digipace_qr_decoding: data?.digipace_qr_decoding || 'async',
    digipace_qr_width: data?.digipace_qr_width || '',
    digipace_qr_height: data?.digipace_qr_height || '',
    maharera_website: data?.maharera_website ?? '',
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
          Manage developer profile, Project MahaRERA, and Digipace Agent MahaRERA credentials.
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
                category="rera"
                value={formData.qr_image || ''}
                onChange={(url) => setFormData({ ...formData, qr_image: url })}
                alt={formData.qr_image_alt}
                onAltChange={(val) => setFormData((prev) => ({ ...prev, qr_image_alt: val }))}
                title={formData.qr_image_title}
                onTitleChange={(val) => setFormData((prev) => ({ ...prev, qr_image_title: val }))}
                loading={formData.qr_image_loading}
                onLoadingChange={(val) => setFormData((prev) => ({ ...prev, qr_image_loading: val }))}
                decoding={formData.qr_image_decoding}
                onDecodingChange={(val) => setFormData((prev) => ({ ...prev, qr_image_decoding: val }))}
                width={formData.qr_image_width}
                onWidthChange={(val) => setFormData((prev) => ({ ...prev, qr_image_width: val }))}
                height={formData.qr_image_height}
                onHeightChange={(val) => setFormData((prev) => ({ ...prev, qr_image_height: val }))}
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
                category="rera"
                value={formData.digipace_qr || ''}
                onChange={(url) => setFormData({ ...formData, digipace_qr: url })}
                alt={formData.digipace_qr_alt}
                onAltChange={(val) => setFormData((prev) => ({ ...prev, digipace_qr_alt: val }))}
                title={formData.digipace_qr_title}
                onTitleChange={(val) => setFormData((prev) => ({ ...prev, digipace_qr_title: val }))}
                loading={formData.digipace_qr_loading}
                onLoadingChange={(val) => setFormData((prev) => ({ ...prev, digipace_qr_loading: val }))}
                decoding={formData.digipace_qr_decoding}
                onDecodingChange={(val) => setFormData((prev) => ({ ...prev, digipace_qr_decoding: val }))}
                width={formData.digipace_qr_width}
                onWidthChange={(val) => setFormData((prev) => ({ ...prev, digipace_qr_width: val }))}
                height={formData.digipace_qr_height}
                onHeightChange={(val) => setFormData((prev) => ({ ...prev, digipace_qr_height: val }))}
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
