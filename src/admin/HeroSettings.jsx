import { useState } from 'react';
import { updateHero } from './api';
import { Save, CheckCircle, Plus, Trash2 } from 'lucide-react';
import FileUpload from './FileUpload';

export default function HeroSettings({ data, onRefresh }) {
  // If data.banners is empty or missing, provide default banners so first image is never blank
  const initialBanners = Array.isArray(data?.banners) && data.banners.length > 0
    ? data.banners.map((b) => (typeof b === 'string' ? { img: b, title: '', sub: '' } : b))
    : [
        { img: data?.hero_image || '/assets/banner1_min.webp', title: data?.title || 'Arban City', sub: 'Elevation' },
        { img: '/assets/banner2_min.webp', title: 'Grand Towers', sub: 'Architecture' },
        { img: '/assets/banner3_min.webp', title: 'Luxury Living', sub: 'Amenities' },
      ];

  const [formData, setFormData] = useState({
    title: data?.title ?? '',
    location: data?.location ?? '',
    developer: data?.developer ?? '',
    area_val: data?.area_val ?? data?.areaValue ?? '',
    area_lbl: data?.area_lbl ?? data?.areaLabel ?? '',
    towers_val: data?.towers_val ?? data?.towersValue ?? '',
    towers_lbl: data?.towers_lbl ?? data?.towersLabel ?? '',
    storey_val: data?.storey_val ?? data?.storeyValue ?? '',
    storey_lbl: data?.storey_lbl ?? data?.storeyLabel ?? '',
    config_text: data?.config_text ?? data?.configText ?? '',
    price_text: data?.price_text ?? data?.priceText ?? '',
    price_subtext: data?.price_subtext ?? data?.priceSubtext ?? '',
    hero_image: data?.hero_image || initialBanners[0]?.img || '',
    hero_image_alt: data?.hero_image_alt ?? '',
    hero_image_title: data?.hero_image_title ?? '',
    hero_image_loading: data?.hero_image_loading ?? 'eager',
    hero_image_decoding: data?.hero_image_decoding ?? 'sync',
    hero_image_width: data?.hero_image_width ?? '',
    hero_image_height: data?.hero_image_height ?? '',
    banners: initialBanners,
  });
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  const updateBanner = (index, field, value) => {
    setFormData((previous) => ({
      ...previous,
      banners: previous.banners.map((banner, currentIndex) =>
        currentIndex === index ? { ...banner, [field]: value } : banner
      ),
    }));
  };

  const addBanner = () => {
    setFormData((previous) => ({
      ...previous,
      banners: [...previous.banners, { img: '', title: '', sub: '' }],
    }));
  };

  const removeBanner = (index) => {
    setFormData((previous) => ({
      ...previous,
      banners: previous.banners.filter((_, currentIndex) => currentIndex !== index),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMessage('');
    try {
      await updateHero({
        ...formData,
        banners: formData.banners.filter((banner) => (banner.img || banner.image_url || '').trim()),
      });
      setMessage('Hero section updated successfully!');
      if (onRefresh) onRefresh();
    } catch (err) {
      alert('Error updating hero: ' + err.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-6 sm:p-8 max-w-4xl">
      <div className="border-b border-slate-100 pb-5 mb-7">
        <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
          Hero Section Settings
        </h2>
        <p className="text-sm text-slate-500 mt-1">
          Edit project headline, prime location subtitle, developer credentials, and key highlight badges.
        </p>
      </div>

      {message && (
        <div className="mb-6 p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-sm font-semibold flex items-center gap-2.5">
          <CheckCircle size={18} className="text-emerald-600 shrink-0" />
          <span>{message}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-bold text-slate-700 mb-1.5">Project Headline / Title</label>
          <input
            type="text"
            required
            value={formData.title || ''}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            className="w-full px-4 py-2.5 sm:py-3 border border-slate-300 rounded-xl text-sm font-medium text-slate-900 focus:outline-none focus:border-[#e2572b] focus:ring-2 focus:ring-[#e2572b]/20 transition-all"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-1.5">Location Subtitle</label>
            <input
              type="text"
              required
              value={formData.location || ''}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              className="w-full px-4 py-2.5 sm:py-3 border border-slate-300 rounded-xl text-sm font-medium text-slate-900 focus:outline-none focus:border-[#e2572b] focus:ring-2 focus:ring-[#e2572b]/20 transition-all"
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-slate-700 mb-1.5">Developer Name</label>
            <input
              type="text"
              required
              value={formData.developer || ''}
              onChange={(e) => setFormData({ ...formData, developer: e.target.value })}
              className="w-full px-4 py-2.5 sm:py-3 border border-slate-300 rounded-xl text-sm font-medium text-slate-900 focus:outline-none focus:border-[#e2572b] focus:ring-2 focus:ring-[#e2572b]/20 transition-all"
            />
          </div>
        </div>

        <div className="p-5 bg-slate-50 border border-slate-200 rounded-2xl">
          <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider mb-3.5">
            Key Metric Highlights
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-600 mb-1">Land Parcel (e.g. 5.5 Acre)</label>
              <input
                type="text"
                value={formData.area_val || ''}
                onChange={(e) => setFormData({ ...formData, area_val: e.target.value })}
                className="w-full px-3.5 py-2.5 border border-slate-300 rounded-xl text-sm font-semibold text-slate-900 bg-white outline-none focus:border-[#e2572b]"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-600 mb-1">Number of Towers (e.g. 3)</label>
              <input
                type="text"
                value={formData.towers_val || ''}
                onChange={(e) => setFormData({ ...formData, towers_val: e.target.value })}
                className="w-full px-3.5 py-2.5 border border-slate-300 rounded-xl text-sm font-semibold text-slate-900 bg-white outline-none focus:border-[#e2572b]"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-600 mb-1">Storey Height (e.g. 35+)</label>
              <input
                type="text"
                value={formData.storey_val || ''}
                onChange={(e) => setFormData({ ...formData, storey_val: e.target.value })}
                className="w-full px-3.5 py-2.5 border border-slate-300 rounded-xl text-sm font-semibold text-slate-900 bg-white outline-none focus:border-[#e2572b]"
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-1.5">Configuration Summary</label>
            <input
              type="text"
              value={formData.config_text || ''}
              onChange={(e) => setFormData({ ...formData, config_text: e.target.value })}
              className="w-full px-4 py-2.5 sm:py-3 border border-slate-300 rounded-xl text-sm font-medium text-slate-900 focus:outline-none focus:border-[#e2572b] focus:ring-2 focus:ring-[#e2572b]/20 transition-all"
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-slate-700 mb-1.5">Starting Price (Highlight)</label>
            <input
              type="text"
              value={formData.price_text || ''}
              onChange={(e) => setFormData({ ...formData, price_text: e.target.value })}
              className="w-full px-4 py-2.5 sm:py-3 border border-slate-300 rounded-xl text-sm font-medium text-slate-900 focus:outline-none focus:border-[#e2572b] focus:ring-2 focus:ring-[#e2572b]/20 transition-all"
            />
          </div>
        </div>

        <div>
          <FileUpload
            label="Fallback Hero Background (used when no slides are configured)"
            category="hero"
            value={formData.hero_image || ''}
            onChange={(url) => setFormData((prev) => ({ ...prev, hero_image: url }))}
            alt={formData.hero_image_alt || ''}
            onAltChange={(val) => setFormData((prev) => ({ ...prev, hero_image_alt: val }))}
            title={formData.hero_image_title || ''}
            onTitleChange={(val) => setFormData((prev) => ({ ...prev, hero_image_title: val }))}
            loading={formData.hero_image_loading || 'eager'}
            onLoadingChange={(val) => setFormData((prev) => ({ ...prev, hero_image_loading: val }))}
            decoding={formData.hero_image_decoding || 'sync'}
            onDecodingChange={(val) => setFormData((prev) => ({ ...prev, hero_image_decoding: val }))}
            width={formData.hero_image_width || ''}
            onWidthChange={(val) => setFormData((prev) => ({ ...prev, hero_image_width: val }))}
            height={formData.hero_image_height || ''}
            onHeightChange={(val) => setFormData((prev) => ({ ...prev, hero_image_height: val }))}
          />
        </div>

        <div className="space-y-4 border-t border-slate-100 pt-5">
          <div className="flex items-center justify-between gap-3">
            <div>
              <h3 className="text-sm font-bold text-slate-800">Hero Slider Images</h3>
              <p className="text-xs text-slate-500 mt-1">Upload, caption, and reorder the images shown in the hero slider.</p>
            </div>
            <button type="button" onClick={addBanner} className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-600 px-3 py-2 text-xs font-bold text-white cursor-pointer">
              <Plus size={15} /> Add slide
            </button>
          </div>
          {formData.banners.map((banner, index) => (
            <div key={index} className="rounded-xl border border-slate-200 bg-slate-50 p-4 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wide text-slate-600">Slide {index + 1}</span>
                <button type="button" onClick={() => removeBanner(index)} aria-label={`Remove slide ${index + 1}`} className="rounded-lg p-2 text-red-600 hover:bg-red-50 cursor-pointer">
                  <Trash2 size={16} />
                </button>
              </div>
              <FileUpload
                label="Slide Image"
                category="hero"
                value={banner.img || banner.image_url || ''}
                onChange={(url) => updateBanner(index, 'img', url)}
                alt={banner.sub || banner.alt || ''}
                onAltChange={(val) => {
                  updateBanner(index, 'sub', val);
                  updateBanner(index, 'alt', val);
                }}
                title={banner.title || ''}
                onTitleChange={(val) => updateBanner(index, 'title', val)}
                loading={banner.loading || (index === 0 ? 'eager' : 'lazy')}
                onLoadingChange={(val) => updateBanner(index, 'loading', val)}
                decoding={banner.decoding || 'async'}
                onDecodingChange={(val) => updateBanner(index, 'decoding', val)}
                width={banner.width || ''}
                onWidthChange={(val) => updateBanner(index, 'width', val)}
                height={banner.height || ''}
                onHeightChange={(val) => updateBanner(index, 'height', val)}
              />
            </div>
          ))}
        </div>

        <div className="pt-5 border-t border-slate-100 flex justify-end">
          <button
            type="submit"
            disabled={saving}
            className="inline-flex items-center gap-2 bg-[#0f2444] hover:bg-[#1a3867] text-white text-sm font-bold px-6 py-3 rounded-xl shadow-md hover:shadow-lg transition-all cursor-pointer"
          >
            <Save size={16} />
            <span>{saving ? 'Saving...' : 'Save Hero Changes'}</span>
          </button>
        </div>
      </form>
    </div>
  );
}
