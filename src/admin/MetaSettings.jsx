import React, { useState } from 'react';
import { updateMeta, uploadFile } from './api';
import {
  Globe,
  Save,
  CheckCircle,
  Search,
  Share2,
  ShieldCheck,
  Code,
  Upload,
  Link as LinkIcon,
  Eye,
  AlertCircle,
} from 'lucide-react';

const TwitterIcon = ({ size = 16, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

export default function MetaSettings({ data, onRefresh }) {
  const [activeSubTab, setActiveSubTab] = useState('basic');
  const [formData, setFormData] = useState(
    data || {
      meta_title: 'Arban City Sector 0 | Luxury 1, 2 & 3 BHK in Airoli, Navi Mumbai',
      meta_description:
        'Arban City Sector 0 at Airoli, Navi Mumbai by Delta Tricity. Spread across 5.5 acres featuring 3 high-rise towers with 35+ storeys offering luxury 1, 2 & 3 BHK residences starting at 89 Lakhs.',
      meta_keywords: 'arban city, airoli flats, luxury apartments navi mumbai, delta tricity',
      author: 'Delta Tricity',
      canonical_url: 'https://arban-city.com/',
      robots: 'index, follow',
      theme_color: '#0f172a',
      og_title: 'Arban City Sector 0 | Luxury 1, 2 & 3 BHK in Airoli',
      og_description:
        'Arban City Sector 0 at Airoli, Navi Mumbai by Delta Tricity. Luxury 1, 2 & 3 BHK residences starting at 89 Lakhs.',
      og_image: '',
      og_url: 'https://arban-city.com/',
      og_site_name: 'Arban City',
      og_type: 'website',
      og_locale: 'en_US',
      twitter_card: 'summary_large_image',
      twitter_title: 'Arban City Sector 0 | Luxury 1, 2 & 3 BHK in Airoli',
      twitter_description:
        'Arban City Sector 0 at Airoli, Navi Mumbai by Delta Tricity. Luxury 1, 2 & 3 BHK residences starting at 89 Lakhs.',
      twitter_image: '',
      twitter_site: '@ArbanCity',
      google_verification: '',
      bing_verification: '',
      facebook_verification: '',
      pinterest_verification: '',
      social_facebook: '',
      social_instagram: '',
      social_linkedin: '',
      header_scripts: '',
    }
  );

  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleImageUpload = async (e, fieldName) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const res = await uploadFile(file);
      if (res.url) {
        handleChange(fieldName, res.url);
      }
    } catch (err) {
      setError('Image upload failed: ' + err.message);
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMessage('');
    setError('');

    try {
      await updateMeta(formData);
      setMessage('All SEO, OpenGraph, Twitter and verification tags saved to database successfully!');
      if (onRefresh) onRefresh();
      setTimeout(() => setMessage(''), 4000);
    } catch (err) {
      setError('Failed to update meta tags: ' + err.message);
    } finally {
      setSaving(false);
    }
  };

  const subTabs = [
    { id: 'basic', label: '1. Basic SEO', icon: <Search size={16} /> },
    { id: 'og', label: '2. Open Graph / WhatsApp', icon: <Share2 size={16} /> },
    { id: 'twitter', label: '3. Twitter / X Card', icon: <TwitterIcon size={16} /> },
    { id: 'verification', label: '4. Webmaster Verification', icon: <ShieldCheck size={16} /> },
    { id: 'social', label: '5. Social Profiles', icon: <LinkIcon size={16} /> },
    { id: 'scripts', label: '6. Header Scripts / GTM', icon: <Code size={16} /> },
  ];

  return (
    <div className="space-y-6 max-w-5xl">
      {/* Top Header Card */}
      <div className="bg-white/95 backdrop-blur-md rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs sticky top-0 z-20">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-blue-50 text-blue-600 rounded-xl">
              <Globe size={26} />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
                Complete SEO &amp; Meta Tags Manager
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                Manage search engine ranking, social previews (WhatsApp/FB/Twitter), verification tokens and analytics
              </p>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex flex-wrap gap-2 mt-6 pt-5 border-t border-slate-100">
          {subTabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveSubTab(tab.id)}
              className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                activeSubTab === tab.id
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900'
              }`}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      {message && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-sm font-semibold flex items-center gap-2.5 shadow-xs">
          <CheckCircle size={18} className="text-emerald-600 shrink-0" />
          <span>{message}</span>
        </div>
      )}

      {error && (
        <div className="p-4 bg-red-50 border border-red-200 text-red-800 rounded-xl text-sm font-semibold flex items-center gap-2.5 shadow-xs">
          <AlertCircle size={18} className="text-red-600 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* TAB 1: BASIC SEO */}
        {activeSubTab === 'basic' && (
          <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-5">
            <h3 className="text-base font-bold text-slate-900 pb-3 border-b border-slate-100">
              Search Engine Optimization (Google, Bing, Yahoo)
            </h3>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Meta Title &lt;title&gt;
                </label>
                <span className="text-xs text-slate-400 font-medium">
                  {formData.meta_title?.length || 0} / 60 characters
                </span>
              </div>
              <input
                type="text"
                required
                value={formData.meta_title || ''}
                onChange={(e) => handleChange('meta_title', e.target.value)}
                placeholder="e.g. Arban City Sector 0 | Luxury 1, 2 & 3 BHK in Airoli"
                className="w-full px-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none font-medium"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Meta Description &lt;meta name="description"&gt;
                </label>
                <span className="text-xs text-slate-400 font-medium">
                  {formData.meta_description?.length || 0} / 160 characters
                </span>
              </div>
              <textarea
                rows={3}
                required
                value={formData.meta_description || ''}
                onChange={(e) => handleChange('meta_description', e.target.value)}
                placeholder="Detailed summary displayed under the link in Google SERP results..."
                className="w-full px-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none font-medium leading-relaxed"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Meta Keywords &lt;meta name="keywords"&gt;
              </label>
              <input
                type="text"
                value={formData.meta_keywords || ''}
                onChange={(e) => handleChange('meta_keywords', e.target.value)}
                placeholder="arban city, airoli flats, luxury apartments navi mumbai, delta tricity"
                className="w-full px-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none font-medium"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Canonical URL &lt;link rel="canonical"&gt;
                </label>
                <input
                  type="url"
                  value={formData.canonical_url || ''}
                  onChange={(e) => handleChange('canonical_url', e.target.value)}
                  placeholder="https://arban-city.com/"
                  className="w-full px-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none font-medium"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Author &lt;meta name="author"&gt;
                </label>
                <input
                  type="text"
                  value={formData.author || ''}
                  onChange={(e) => handleChange('author', e.target.value)}
                  placeholder="Delta Tricity"
                  className="w-full px-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none font-medium"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Search Robots Directive &lt;meta name="robots"&gt;
                </label>
                <select
                  value={formData.robots || 'index, follow'}
                  onChange={(e) => handleChange('robots', e.target.value)}
                  className="w-full px-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none font-medium"
                >
                  <option value="index, follow">index, follow (Allow Google indexing &amp; link crawling)</option>
                  <option value="noindex, follow">noindex, follow (Do not show on Google, crawl links)</option>
                  <option value="index, nofollow">index, nofollow (Index on Google, don't follow links)</option>
                  <option value="noindex, nofollow">noindex, nofollow (Block all crawlers completely)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Browser Theme Color &lt;meta name="theme-color"&gt;
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={formData.theme_color || '#0f172a'}
                    onChange={(e) => handleChange('theme_color', e.target.value)}
                    className="w-10 h-10 p-1 bg-white border border-slate-200 rounded-xl cursor-pointer"
                  />
                  <input
                    type="text"
                    value={formData.theme_color || '#0f172a'}
                    onChange={(e) => handleChange('theme_color', e.target.value)}
                    placeholder="#0f172a"
                    className="flex-1 px-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none font-medium"
                  />
                </div>
              </div>
            </div>

            {/* Google SERP Live Simulation */}
            <div className="mt-6 pt-4 border-t border-slate-100">
              <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <Eye size={15} />
                <span>Google Search Preview (Live Simulation)</span>
              </div>
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-1">
                <div className="text-xs text-emerald-700 font-medium">
                  {formData.canonical_url || 'https://arban-city.com/'}
                </div>
                <div className="text-base sm:text-lg text-blue-700 hover:underline font-semibold cursor-pointer line-clamp-1">
                  {formData.meta_title || 'Website Title'}
                </div>
                <div className="text-xs sm:text-sm text-slate-600 line-clamp-2 leading-relaxed">
                  {formData.meta_description || 'Website description will be shown here in search results.'}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: OPEN GRAPH / WHATSAPP / FACEBOOK */}
        {activeSubTab === 'og' && (
          <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-5">
            <h3 className="text-base font-bold text-slate-900 pb-3 border-b border-slate-100">
              Open Graph Tags (WhatsApp, Facebook, LinkedIn Link Previews)
            </h3>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                OG Title &lt;meta property="og:title"&gt;
              </label>
              <input
                type="text"
                value={formData.og_title || ''}
                onChange={(e) => handleChange('og_title', e.target.value)}
                placeholder="Title shown when link is shared on WhatsApp or Facebook"
                className="w-full px-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none font-medium"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                OG Description &lt;meta property="og:description"&gt;
              </label>
              <textarea
                rows={3}
                value={formData.og_description || ''}
                onChange={(e) => handleChange('og_description', e.target.value)}
                placeholder="Description preview for WhatsApp and social cards..."
                className="w-full px-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none font-medium leading-relaxed"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                OG Preview Image URL &lt;meta property="og:image"&gt;
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={formData.og_image || ''}
                  onChange={(e) => handleChange('og_image', e.target.value)}
                  placeholder="https://example.com/images/social-share.jpg (1200x630 recommended)"
                  className="flex-1 px-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none font-medium"
                />
                <label className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold cursor-pointer transition-colors border border-slate-200 shrink-0">
                  <Upload size={14} />
                  <span>{uploading ? 'Uploading...' : 'Upload Image'}</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleImageUpload(e, 'og_image')}
                    className="hidden"
                  />
                </label>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Site Name &lt;og:site_name&gt;
                </label>
                <input
                  type="text"
                  value={formData.og_site_name || 'Arban City'}
                  onChange={(e) => handleChange('og_site_name', e.target.value)}
                  placeholder="Arban City"
                  className="w-full px-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none font-medium"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  OG Type &lt;og:type&gt;
                </label>
                <select
                  value={formData.og_type || 'website'}
                  onChange={(e) => handleChange('og_type', e.target.value)}
                  className="w-full px-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none font-medium"
                >
                  <option value="website">website</option>
                  <option value="article">article</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  OG Locale &lt;og:locale&gt;
                </label>
                <input
                  type="text"
                  value={formData.og_locale || 'en_US'}
                  onChange={(e) => handleChange('og_locale', e.target.value)}
                  placeholder="en_US"
                  className="w-full px-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none font-medium"
                />
              </div>
            </div>

            {/* Social Share Preview Card */}
            <div className="mt-6 pt-4 border-t border-slate-100">
              <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <Share2 size={15} />
                <span>WhatsApp / Facebook Preview Simulation</span>
              </div>
              <div className="max-w-md bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-xs">
                {formData.og_image ? (
                  <div className="aspect-[16/9] bg-slate-100 overflow-hidden">
                    <img src={formData.og_image} alt="OG Preview" className="w-full h-full object-cover" />
                  </div>
                ) : (
                  <div className="aspect-[16/9] bg-slate-100 flex items-center justify-center text-slate-400 text-xs">
                    No preview image uploaded
                  </div>
                )}
                <div className="p-3 bg-slate-50 space-y-0.5">
                  <div className="text-[11px] uppercase tracking-wide text-slate-400 font-semibold">
                    {formData.og_site_name || 'arban-city.com'}
                  </div>
                  <div className="text-sm font-bold text-slate-900 line-clamp-1">
                    {formData.og_title || formData.meta_title || 'Arban City'}
                  </div>
                  <div className="text-xs text-slate-500 line-clamp-2">
                    {formData.og_description || formData.meta_description || 'Luxury 1, 2 & 3 BHK residences'}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: TWITTER / X CARD */}
        {activeSubTab === 'twitter' && (
          <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-5">
            <h3 className="text-base font-bold text-slate-900 pb-3 border-b border-slate-100">
              Twitter / X Card Configuration
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Twitter Card Type &lt;meta name="twitter:card"&gt;
                </label>
                <select
                  value={formData.twitter_card || 'summary_large_image'}
                  onChange={(e) => handleChange('twitter_card', e.target.value)}
                  className="w-full px-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none font-medium"
                >
                  <option value="summary_large_image">summary_large_image (Large preview photo)</option>
                  <option value="summary">summary (Small square thumbnail)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Twitter Site Handle &lt;meta name="twitter:site"&gt;
                </label>
                <input
                  type="text"
                  value={formData.twitter_site || ''}
                  onChange={(e) => handleChange('twitter_site', e.target.value)}
                  placeholder="@ArbanCity"
                  className="w-full px-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none font-medium"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Twitter Title &lt;meta name="twitter:title"&gt;
              </label>
              <input
                type="text"
                value={formData.twitter_title || ''}
                onChange={(e) => handleChange('twitter_title', e.target.value)}
                placeholder="Arban City Sector 0 | Luxury Residences"
                className="w-full px-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none font-medium"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Twitter Description &lt;meta name="twitter:description"&gt;
              </label>
              <textarea
                rows={3}
                value={formData.twitter_description || ''}
                onChange={(e) => handleChange('twitter_description', e.target.value)}
                placeholder="Brief text shown in Twitter tweet preview cards..."
                className="w-full px-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none font-medium leading-relaxed"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Twitter Card Image URL &lt;meta name="twitter:image"&gt;
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={formData.twitter_image || ''}
                  onChange={(e) => handleChange('twitter_image', e.target.value)}
                  placeholder="https://example.com/images/twitter-card.jpg"
                  className="flex-1 px-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none font-medium"
                />
                <label className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold cursor-pointer transition-colors border border-slate-200 shrink-0">
                  <Upload size={14} />
                  <span>Upload</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleImageUpload(e, 'twitter_image')}
                    className="hidden"
                  />
                </label>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: WEBMASTER & DOMAIN VERIFICATION */}
        {activeSubTab === 'verification' && (
          <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-5">
            <h3 className="text-base font-bold text-slate-900 pb-3 border-b border-slate-100">
              Webmaster Tools &amp; Domain Verification Codes
            </h3>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Google Search Console &lt;meta name="google-site-verification"&gt;
              </label>
              <input
                type="text"
                value={formData.google_verification || ''}
                onChange={(e) => handleChange('google_verification', e.target.value)}
                placeholder="e.g. AbC123D-eF456G_hI789jK"
                className="w-full px-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Bing Webmaster Tools &lt;meta name="msvalidate.01"&gt;
              </label>
              <input
                type="text"
                value={formData.bing_verification || ''}
                onChange={(e) => handleChange('bing_verification', e.target.value)}
                placeholder="e.g. 7A8B9C0D1E2F3A4B5C6D7E8F9A0B1C2D"
                className="w-full px-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Facebook Domain Verification &lt;meta name="facebook-domain-verification"&gt;
              </label>
              <input
                type="text"
                value={formData.facebook_verification || ''}
                onChange={(e) => handleChange('facebook_verification', e.target.value)}
                placeholder="e.g. 1a2b3c4d5e6f7g8h9i0j"
                className="w-full px-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Pinterest Domain Verification &lt;meta name="p:domain_verify"&gt;
              </label>
              <input
                type="text"
                value={formData.pinterest_verification || ''}
                onChange={(e) => handleChange('pinterest_verification', e.target.value)}
                placeholder="e.g. 9876543210abcdef"
                className="w-full px-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none font-mono"
              />
            </div>
          </div>
        )}

        {/* TAB 5: SOCIAL PROFILES */}
        {activeSubTab === 'social' && (
          <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-5">
            <h3 className="text-base font-bold text-slate-900 pb-3 border-b border-slate-100">
              Social Media Account Links &lt;link rel="me"&gt;
            </h3>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Facebook Page URL
              </label>
              <input
                type="url"
                value={formData.social_facebook || ''}
                onChange={(e) => handleChange('social_facebook', e.target.value)}
                placeholder="https://www.facebook.com/yourbrand/"
                className="w-full px-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none font-medium"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Instagram Profile URL
              </label>
              <input
                type="url"
                value={formData.social_instagram || ''}
                onChange={(e) => handleChange('social_instagram', e.target.value)}
                placeholder="https://www.instagram.com/yourbrand/"
                className="w-full px-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none font-medium"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                LinkedIn Company URL
              </label>
              <input
                type="url"
                value={formData.social_linkedin || ''}
                onChange={(e) => handleChange('social_linkedin', e.target.value)}
                placeholder="https://www.linkedin.com/company/yourbrand/"
                className="w-full px-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none font-medium"
              />
            </div>
          </div>
        )}

        {/* TAB 6: HEADER SCRIPTS & GTM */}
        {activeSubTab === 'scripts' && (
          <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-5">
            <h3 className="text-base font-bold text-slate-900 pb-3 border-b border-slate-100">
              Custom Header Scripts &amp; Tracking Codes
            </h3>
            <p className="text-xs text-slate-500">
              Insert Google Tag Manager (GTM), Google Analytics (gtag.js), Facebook Pixel, or other custom &lt;script&gt; and &lt;link&gt; tags to be placed inside the &lt;head&gt; element.
            </p>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Custom Header HTML / Script Tags
              </label>
              <textarea
                rows={8}
                value={formData.header_scripts || ''}
                onChange={(e) => handleChange('header_scripts', e.target.value)}
                placeholder={`<!-- Google Analytics -->\n<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXX"></script>\n<script>\n  window.dataLayer = window.dataLayer || [];\n  function gtag(){dataLayer.push(arguments);}\n  gtag('js', new Date());\n  gtag('config', 'G-XXXXX');\n</script>`}
                className="w-full px-4 py-3 text-xs sm:text-sm bg-slate-900 text-slate-100 rounded-xl font-mono focus:ring-2 focus:ring-blue-500 outline-none leading-relaxed"
              />
            </div>
          </div>
        )}

        {/* Save Button */}
        <div className="flex items-center justify-between pt-2">
          <span className="text-xs text-slate-400 font-medium">
            All meta tags and verification codes are dynamically stored in MySQL
          </span>
          <button
            type="submit"
            disabled={saving}
            className="inline-flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm px-7 py-3 rounded-xl transition-all shadow-sm cursor-pointer disabled:opacity-50"
          >
            <Save size={16} />
            <span>{saving ? 'Saving Changes...' : 'Save All SEO Settings'}</span>
          </button>
        </div>
      </form>
    </div>
  );
}
