import { useState } from 'react';
import { resolveAssetUrl, updateHeader } from './api';
import { Save, CheckCircle, Image, Type, Plus, Trash2 } from 'lucide-react';
import FileUpload from './FileUpload';
import PartnerLogo from '../components/PartnerLogo';

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
    } catch {
      console.error('Invalid footer bullet data; using default footer bullets.');
    }
  }

  const [formData, setFormData] = useState({
    site_title: data?.site_title ?? '',
    logo_type: data?.logo_type || 'text',
    logo_text: data?.logo_text ?? '',
    logo_highlight: data?.logo_highlight ?? '',
    subtitle: data?.subtitle ?? '',
    logo_image: data?.logo_image || '',
    logo_alt: data?.logo_alt ?? '',
    logo_title: data?.logo_title ?? '',
    logo_loading: data?.logo_loading || 'eager',
    logo_decoding: data?.logo_decoding || 'async',
    logo_width: data?.logo_width ?? '',
    logo_height: data?.logo_height ?? '',
    partner_badge: data?.partner_badge ?? '',
    partner_logo: data?.partner_logo || '',
    partner_logo_alt: data?.partner_logo_alt ?? '',
    partner_logo_title: data?.partner_logo_title ?? '',
    partner_logo_loading: data?.partner_logo_loading || 'eager',
    partner_logo_decoding: data?.partner_logo_decoding || 'async',
    partner_logo_width: data?.partner_logo_width ?? '',
    partner_logo_height: data?.partner_logo_height ?? '',
    phone: data?.phone ?? '',
    email: data?.email ?? '',
    footer_disclaimer: data?.footer_disclaimer ?? '',
  });

  const [bullets, setBullets] = useState(initialBullets);
  const [failedLogoImage, setFailedLogoImage] = useState('');
  const [failedPartnerLogo, setFailedPartnerLogo] = useState('');
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

      {/* Live Logo Preview Box */}
      <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl">
        <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-2">Live Header Logo Preview</span>
        <div className="inline-flex items-center gap-3 bg-white p-2.5 border border-slate-200 rounded-lg shadow-xs">
          {formData.logo_image && failedLogoImage !== formData.logo_image ? (
            <img
              src={resolveAssetUrl(formData.logo_image)}
              alt={formData.logo_alt || "Logo Preview"}
              title={formData.logo_title || ""}
              className="h-9 max-w-[140px] object-contain"
              onError={() => setFailedLogoImage(formData.logo_image)}
            />
          ) : (
            <div className="border border-dashed border-slate-300 px-3 py-1.5 text-xs text-slate-400 font-semibold rounded">
              No Logo Uploaded Yet
            </div>
          )}
          <span className="w-px h-6 bg-slate-200"></span>
          {formData.partner_logo && failedPartnerLogo !== formData.partner_logo ? (
            <img
              src={resolveAssetUrl(formData.partner_logo)}
              alt="Partner Logo Preview"
              className="h-7 max-w-[90px] object-contain"
              onError={() => setFailedPartnerLogo(formData.partner_logo)}
            />
          ) : formData.partner_badge && formData.partner_badge !== 'DigiPACE' ? (
            <span className="w-[90px] text-right text-xs font-extrabold text-[#111D46]">{formData.partner_badge}</span>
          ) : (
            <PartnerLogo className="h-7 w-[90px] object-contain" />
          )}
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Project Logo Upload (Pure Image Only) */}
        <div className="p-5 bg-orange-50/40 border border-orange-200/70 rounded-2xl space-y-4">
          <div>
            <h3 className="text-sm font-bold text-slate-900">
              Project Logo (Main Header Brand Logo)
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Upload project brand logo and configure its Alt Tag, Title, Loading, and Dimensions.
            </p>
          </div>

          <FileUpload
            label="Project Logo Image"
            category="logos"
            value={formData.logo_image || ''}
            onChange={(url) => setFormData((prev) => ({ ...prev, logo_image: url, logo_type: 'image' }))}
            alt={formData.logo_alt}
            onAltChange={(val) => setFormData((prev) => ({ ...prev, logo_alt: val }))}
            title={formData.logo_title}
            onTitleChange={(val) => setFormData((prev) => ({ ...prev, logo_title: val }))}
            loading={formData.logo_loading}
            onLoadingChange={(val) => setFormData((prev) => ({ ...prev, logo_loading: val }))}
            decoding={formData.logo_decoding}
            onDecodingChange={(val) => setFormData((prev) => ({ ...prev, logo_decoding: val }))}
            width={formData.logo_width}
            onWidthChange={(val) => setFormData((prev) => ({ ...prev, logo_width: val }))}
            height={formData.logo_height}
            onHeightChange={(val) => setFormData((prev) => ({ ...prev, logo_height: val }))}
          />
        </div>

        {/* Digipace Partner Branding (Positioned right beside Project Logo) */}
        <div className="p-5 bg-blue-50/60 border border-blue-200/80 rounded-2xl space-y-4">
          <div>
            <h3 className="text-sm font-bold text-blue-900">
              Partner Branding (Appears beside Project Logo in Navbar)
            </h3>
            <p className="text-xs text-blue-700 mt-0.5">
              Upload DigiPACE or Partner logo and configure its separate Alt Tag, Title, Loading, and Dimensions.
            </p>
          </div>

          <div>
            <FileUpload
              label="Partner Graphic Logo Image"
              category="logos"
              value={formData.partner_logo || ''}
              onChange={(url) => setFormData((prev) => ({ ...prev, partner_logo: url }))}
              alt={formData.partner_logo_alt}
              onAltChange={(val) => setFormData((prev) => ({ ...prev, partner_logo_alt: val }))}
              title={formData.partner_logo_title}
              onTitleChange={(val) => setFormData((prev) => ({ ...prev, partner_logo_title: val }))}
              loading={formData.partner_logo_loading}
              onLoadingChange={(val) => setFormData((prev) => ({ ...prev, partner_logo_loading: val }))}
              decoding={formData.partner_logo_decoding}
              onDecodingChange={(val) => setFormData((prev) => ({ ...prev, partner_logo_decoding: val }))}
              width={formData.partner_logo_width}
              onWidthChange={(val) => setFormData((prev) => ({ ...prev, partner_logo_width: val }))}
              height={formData.partner_logo_height}
              onHeightChange={(val) => setFormData((prev) => ({ ...prev, partner_logo_height: val }))}
            />
          </div>
        </div>

        {/* Contact Info */}
        <div>
          <label className="block text-sm font-bold text-slate-700 mb-1.5">Official Phone Number</label>
          <input
            type="text"
            value={formData.phone || ''}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            className="w-full px-4 py-2.5 border border-slate-300 rounded-xl text-sm font-medium focus:outline-none focus:border-[#e2572b]"
            placeholder="+91 81000 00080"
          />
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
