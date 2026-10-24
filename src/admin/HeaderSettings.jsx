import React, { useState } from 'react';
import { updateHeader } from './api';
import { Save, CheckCircle, Image, Type, Plus, Trash2 } from 'lucide-react';
import FileUpload from './FileUpload';

export default function HeaderSettings({ data, onRefresh }) {
  let initialBullets = [
    'Project Registered under Government of India RERA Act 2016 | maharera.maharashtra.gov.in',
    'Government RERA Authorised Advertiser: Digipace Consulting (OPC) Pvt Ltd | RERA No: A51700026634',
    'Site Address: Arban City Sector 0, Thane - Belapur Road, Airoli, Navi Mumbai - 400708',
    'Project MahaRERA Registration No.: PR1331012500415',
  ];

  if (data?.footer_bullets_json) {
    try {
      const parsed = typeof data.footer_bullets_json === 'string'
        ? JSON.parse(data.footer_bullets_json)
        : data.footer_bullets_json;
      if (Array.isArray(parsed) && parsed.length > 0) {
        initialBullets = parsed;
      }
    } catch (e) {}
  }

  const [formData, setFormData] = useState({
    site_title: data?.site_title || 'Arban City',
    logo_type: data?.logo_type || 'text',
    logo_text: data?.logo_text || 'Arban',
    logo_highlight: data?.logo_highlight || 'City',
    logo_image: data?.logo_image || '',
    partner_badge: data?.partner_badge || 'DigiPACE',
    partner_logo: data?.partner_logo || '',
    phone: data?.phone || '+91 81000 00080',
    email: data?.email || 'info@arban-city.com',
    footer_disclaimer:
      data?.footer_disclaimer ||
      'The information provided on this website is intended exclusively for informational purposes and should not be construed as an offer of services. This site is managed by a RERA authorized real estate agent namely Digipace Consulting (OPC) Private Limited (Registered Agent bearing RERA No: A51700026634).',
  });

  const [bullets, setBullets] = useState(initialBullets);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  const handleAddBullet = () => {
    setBullets([...bullets, 'New regulatory or compliance detail point']);
  };

  const handleRemoveBullet = (index) => {
    setBullets(bullets.filter((_, i) => i !== index));
  };

  const handleBulletChange = (index, val) => {
    const updated = [...bullets];
    updated[index] = val;
    setBullets(updated);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMessage('');
    try {
      await updateHeader({
        ...formData,
        footer_bullets_json: bullets,
      });
      setMessage('Header, Brand & Footer settings saved successfully!');
      if (onRefresh) onRefresh();
      setTimeout(() => setMessage(''), 4000);
    } catch (err) {
      alert('Error updating header: ' + err.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-6 sm:p-8 max-w-4xl space-y-7">
      <div className="border-b border-slate-100 pb-5">
        <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
          Header, Brand &amp; Footer Settings
        </h2>
        <p className="text-sm text-slate-500 mt-1">
          Customize website logo, Digipace partner branding beside logo, contacts, and footer disclaimers.
        </p>
      </div>

      {message && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-sm font-semibold flex items-center gap-2.5">
          <CheckCircle size={18} className="text-emerald-600 shrink-0" />
          <span>{message}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Project Logo Selection */}
        <div>
          <label className="block text-sm font-bold text-slate-700 mb-2">Project Logo Display Type</label>
          <div className="flex flex-wrap items-center gap-6 p-3.5 bg-slate-50 border border-slate-200 rounded-xl">
            <label className="flex items-center gap-2.5 text-sm font-semibold text-slate-700 cursor-pointer">
              <input
                type="radio"
                name="logo_type"
                value="text"
                checked={formData.logo_type === 'text'}
                onChange={() => setFormData({ ...formData, logo_type: 'text' })}
                className="w-4 h-4 text-[#e2572b]"
              />
              <Type size={16} className="text-[#0f2444]" />
              <span>Styled Text Logo (e.g. Arban City)</span>
            </label>
            <label className="flex items-center gap-2.5 text-sm font-semibold text-slate-700 cursor-pointer">
              <input
                type="radio"
                name="logo_type"
                value="image"
                checked={formData.logo_type === 'image'}
                onChange={() => setFormData({ ...formData, logo_type: 'image' })}
                className="w-4 h-4 text-[#e2572b]"
              />
              <Image size={16} className="text-[#e2572b]" />
              <span>Upload Image / Graphic Logo</span>
            </label>
          </div>
        </div>

        {formData.logo_type === 'image' ? (
          <div>
            <FileUpload
              label="Upload Project Logo Image"
              value={formData.logo_image || ''}
              onChange={(url) => setFormData({ ...formData, logo_image: url })}
            />
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-1.5">Primary Logo Text</label>
              <input
                type="text"
                required
                value={formData.logo_text || ''}
                onChange={(e) => setFormData({ ...formData, logo_text: e.target.value })}
                className="w-full px-4 py-2.5 border border-slate-300 rounded-xl text-sm font-medium focus:outline-none focus:border-[#e2572b]"
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-700 mb-1.5">Highlight Logo Text (Orange)</label>
              <input
                type="text"
                required
                value={formData.logo_highlight || ''}
                onChange={(e) => setFormData({ ...formData, logo_highlight: e.target.value })}
                className="w-full px-4 py-2.5 border border-slate-300 rounded-xl text-sm font-medium focus:outline-none focus:border-[#e2572b]"
              />
            </div>
          </div>
        )}

        {/* Digipace Partner Branding (Positioned right beside Project Logo) */}
        <div className="p-5 bg-blue-50/60 border border-blue-200/80 rounded-2xl space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-blue-900">
                Partner Branding (Appears beside Project Logo in Navbar)
              </h3>
              <p className="text-xs text-blue-700 mt-0.5">
                Displays DigiPACE branding beside the project logo as requested.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Partner Text Badge</label>
              <input
                type="text"
                value={formData.partner_badge || ''}
                onChange={(e) => setFormData({ ...formData, partner_badge: e.target.value })}
                placeholder="DigiPACE"
                className="w-full px-3.5 py-2 border border-slate-300 rounded-lg text-sm bg-white"
              />
            </div>

            <div>
              <FileUpload
                label="Partner Graphic Logo (Optional)"
                value={formData.partner_logo || ''}
                onChange={(url) => setFormData({ ...formData, partner_logo: url })}
              />
            </div>
          </div>
        </div>

        {/* Contact Info */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-1.5">Official Phone Number</label>
            <input
              type="text"
              value={formData.phone || ''}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="w-full px-4 py-2.5 border border-slate-300 rounded-xl text-sm font-medium"
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-slate-700 mb-1.5">Official Email Address</label>
            <input
              type="email"
              value={formData.email || ''}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-4 py-2.5 border border-slate-300 rounded-xl text-sm font-medium"
            />
          </div>
        </div>

        {/* Footer Section Settings (Item 14) */}
        <div className="pt-6 border-t border-slate-100 space-y-4">
          <h3 className="text-base font-bold text-slate-900">
            Footer Disclaimers &amp; Regulatory Bullets (Refer: Sector Zero &amp; Kohinoor)
          </h3>

          <div>
            <label className="block text-sm font-bold text-slate-700 mb-1.5">
              1st Paragraph (Legal &amp; RERA Agency Overview)
            </label>
            <textarea
              rows={3}
              value={formData.footer_disclaimer || ''}
              onChange={(e) => setFormData({ ...formData, footer_disclaimer: e.target.value })}
              className="w-full px-4 py-2.5 border border-slate-300 rounded-xl text-sm font-medium focus:outline-none focus:border-[#e2572b]"
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-sm font-bold text-slate-700">
                Compliance Bullet Points (Kohinoor Style)
              </label>
              <button
                type="button"
                onClick={handleAddBullet}
                className="inline-flex items-center gap-1 text-xs font-bold text-blue-600 hover:text-blue-800 cursor-pointer"
              >
                <Plus size={14} />
                <span>Add Bullet Point</span>
              </button>
            </div>

            <div className="space-y-2.5">
              {bullets.map((bullet, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <input
                    type="text"
                    value={bullet}
                    onChange={(e) => handleBulletChange(idx, e.target.value)}
                    className="flex-1 px-3.5 py-2 border border-slate-300 rounded-lg text-sm"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveBullet(idx)}
                    className="p-2 text-red-500 hover:bg-red-50 rounded-lg cursor-pointer"
                    aria-label="Delete Bullet Point"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
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
            <span>{saving ? 'Saving...' : 'Save Brand & Footer Changes'}</span>
          </button>
        </div>
      </form>
    </div>
  );
}
