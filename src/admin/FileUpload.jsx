import { useState, useRef } from 'react';
import { Upload, Loader2, Video as VideoIcon, Sliders, ChevronDown, ChevronUp } from 'lucide-react';
import { resolveAssetUrl, uploadFile } from './api';

export default function FileUpload({
  value,
  onChange,
  accept = 'image/*',
  label,
  category = 'general',
  isVideo = false,
  // SEO Image Attributes support
  alt = '',
  onAltChange,
  title = '',
  onTitleChange,
  loading = 'lazy',
  onLoadingChange,
  decoding = 'async',
  onDecodingChange,
  width = '',
  onWidthChange,
  height = '',
  onHeightChange,
  showSeoAttributes = true,
}) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const [showAdvanced, setShowAdvanced] = useState(true);
  const fileInputRef = useRef(null);

  // Auto-detect object structure if value is an object { img/image_url, alt, title, loading, decoding, width, height }
  const isObjectValue = typeof value === 'object' && value !== null;
  const currentUrl = isObjectValue ? (value.img || value.image_url || value.url || '') : (value || '');
  const currentAlt = onAltChange ? alt : (isObjectValue ? value.alt : alt);
  const currentTitle = onTitleChange ? title : (isObjectValue ? value.title : title);
  const currentLoading = onLoadingChange ? loading : (isObjectValue ? value.loading : loading);
  const currentDecoding = onDecodingChange ? decoding : (isObjectValue ? value.decoding : decoding);
  const currentWidth = onWidthChange ? width : (isObjectValue ? value.width : width);
  const currentHeight = onHeightChange ? height : (isObjectValue ? value.height : height);

  const handleFieldChange = (field, newVal) => {
    if (field === 'alt' && onAltChange) return onAltChange(newVal);
    if (field === 'title' && onTitleChange) return onTitleChange(newVal);
    if (field === 'loading' && onLoadingChange) return onLoadingChange(newVal);
    if (field === 'decoding' && onDecodingChange) return onDecodingChange(newVal);
    if (field === 'width' && onWidthChange) return onWidthChange(newVal);
    if (field === 'height' && onHeightChange) return onHeightChange(newVal);

    if (isObjectValue) {
      onChange({ ...value, [field]: newVal });
    }
  };

  const handleFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setError('');

    try {
      const res = await uploadFile(file, category);
      if (res.url) {
        if (isObjectValue) {
          const imgKey = 'image_url' in value ? 'image_url' : 'img';
          onChange({ ...value, [imgKey]: res.url });
        } else {
          onChange(res.url);
        }
      } else {
        setError('Upload failed');
      }
    } catch (err) {
      setError(err.message || 'Error uploading file');
    } finally {
      setUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleRemove = () => {
    if (isObjectValue) {
      const imgKey = 'image_url' in value ? 'image_url' : 'img';
      onChange({ ...value, [imgKey]: '' });
    } else {
      onChange('');
    }
    setError('');
  };

  const hasSeoControls = !isVideo && showSeoAttributes;

  return (
    <div className="space-y-2">
      {label && <label className="block text-sm font-bold text-slate-700">{label}</label>}

      <input
        ref={fileInputRef}
        type="file"
        accept={accept}
        onChange={handleFileChange}
        className="hidden"
      />

      {currentUrl ? (
        <div className="border border-slate-200 rounded-xl p-3 bg-slate-50 shadow-xs space-y-3">
          <div className="flex flex-col sm:flex-row items-center gap-3">
            <div className="relative shrink-0 bg-white border border-slate-200 rounded-lg p-1.5 flex items-center justify-center">
              {isVideo ? (
                <video
                  src={resolveAssetUrl(currentUrl)}
                  controls
                  className="max-h-28 max-w-[140px] rounded object-contain bg-black"
                />
              ) : (
                <img
                  src={resolveAssetUrl(currentUrl)}
                  alt={currentAlt || 'Uploaded file preview'}
                  title={currentTitle || ''}
                  className="max-h-24 max-w-[140px] rounded object-contain"
                  onError={(e) => {
                    e.target.style.display = 'none';
                  }}
                />
              )}
            </div>

            <div className="flex-1 min-w-0 w-full space-y-1">
              <span className="text-xs text-slate-600 font-semibold truncate block">
                {String(currentUrl).split('/').pop()}
              </span>
              <div className="flex items-center gap-2 pt-1 text-xs">
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={uploading}
                  className="text-blue-600 hover:text-blue-800 font-bold cursor-pointer"
                >
                  Change File
                </button>
                <span className="text-slate-300">|</span>
                <button
                  type="button"
                  onClick={handleRemove}
                  className="text-red-600 hover:text-red-800 font-bold cursor-pointer"
                >
                  Remove
                </button>
              </div>
            </div>
          </div>

          {/* Dynamic Image SEO Attributes Block: Alt, Title, Loading, Decoding, Width, Height */}
          {hasSeoControls && (
            <div className="pt-2.5 border-t border-slate-200 space-y-2.5">
              <div className="flex items-center justify-between text-xs font-bold text-slate-700">
                <span className="flex items-center gap-1.5 text-slate-700">
                  <Sliders size={13} className="text-[#e2572b]" />
                  <span>Image SEO &amp; Loading Attributes</span>
                </span>
                <button
                  type="button"
                  onClick={() => setShowAdvanced(!showAdvanced)}
                  className="text-slate-500 hover:text-slate-800 flex items-center gap-1 text-[11px] font-semibold cursor-pointer"
                >
                  {showAdvanced ? 'Hide' : 'Edit'}
                  {showAdvanced ? <ChevronUp size={13} /> : <ChevronDown size={13} />}
                </button>
              </div>

              {showAdvanced && (
                <div className="space-y-2 bg-white p-3 rounded-lg border border-slate-200 text-xs">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-600 mb-1">
                      Alt Tag <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={currentAlt || ''}
                      onChange={(e) => handleFieldChange('alt', e.target.value)}
                      placeholder="e.g. Project Elevation View / Floor Plan Layout"
                      className="w-full px-3 py-1.5 border border-slate-300 rounded-lg text-xs font-medium text-slate-900 focus:outline-none focus:border-[#e2572b]"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <div>
                      <label className="block text-[11px] font-bold text-slate-600 mb-1">Title</label>
                      <input
                        type="text"
                        value={currentTitle || ''}
                        onChange={(e) => handleFieldChange('title', e.target.value)}
                        placeholder="e.g. Project Architecture View"
                        className="w-full px-3 py-1.5 border border-slate-300 rounded-lg text-xs font-medium text-slate-900 focus:outline-none focus:border-[#e2572b]"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-slate-600 mb-1">Loading</label>
                      <select
                        value={currentLoading || 'lazy'}
                        onChange={(e) => handleFieldChange('loading', e.target.value)}
                        className="w-full px-3 py-1.5 border border-slate-300 rounded-lg text-xs font-medium text-slate-900 focus:outline-none focus:border-[#e2572b] bg-white cursor-pointer"
                      >
                        <option value="lazy">Loading: Lazy</option>
                        <option value="eager">Loading: Eager</option>
                        <option value="auto">Loading: Auto</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-2">
                    <div className="col-span-1">
                      <label className="block text-[11px] font-bold text-slate-600 mb-1">Decoding</label>
                      <select
                        value={currentDecoding || 'async'}
                        onChange={(e) => handleFieldChange('decoding', e.target.value)}
                        className="w-full px-2 py-1.5 border border-slate-300 rounded-lg text-xs font-medium text-slate-900 focus:outline-none focus:border-[#e2572b] bg-white cursor-pointer"
                      >
                        <option value="async">Decoding: Async</option>
                        <option value="sync">Decoding: Sync</option>
                        <option value="auto">Decoding: Auto</option>
                      </select>
                    </div>

                    <div className="col-span-1">
                      <label className="block text-[11px] font-bold text-slate-600 mb-1">Width</label>
                      <input
                        type="text"
                        value={currentWidth || ''}
                        onChange={(e) => handleFieldChange('width', e.target.value)}
                        placeholder="auto / 800"
                        className="w-full px-2 py-1.5 border border-slate-300 rounded-lg text-xs font-medium text-slate-900 focus:outline-none focus:border-[#e2572b]"
                      />
                    </div>

                    <div className="col-span-1">
                      <label className="block text-[11px] font-bold text-slate-600 mb-1">Height</label>
                      <input
                        type="text"
                        value={currentHeight || ''}
                        onChange={(e) => handleFieldChange('height', e.target.value)}
                        placeholder="auto / 600"
                        className="w-full px-2 py-1.5 border border-slate-300 rounded-lg text-xs font-medium text-slate-900 focus:outline-none focus:border-[#e2572b]"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      ) : (
        <div className="space-y-3">
          <div
            onClick={() => fileInputRef.current?.click()}
            className="border-2 border-dashed border-slate-300 hover:border-[#e2572b] rounded-xl p-5 text-center cursor-pointer transition-all bg-slate-50/70 hover:bg-orange-50/20 group"
          >
            {uploading ? (
              <div className="flex flex-col items-center justify-center py-2 text-sm text-slate-600 gap-2 font-medium">
                <Loader2 size={24} className="animate-spin text-[#e2572b]" />
                <span>Uploading file to server...</span>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center gap-2 text-sm text-slate-600">
                <div className="w-10 h-10 rounded-xl bg-orange-100 text-[#e2572b] flex items-center justify-center group-hover:scale-110 transition-transform">
                  {isVideo ? <VideoIcon size={20} /> : <Upload size={20} />}
                </div>
                <span className="font-bold text-slate-800">
                  Click to browse and upload {isVideo ? 'video' : 'image'}
                </span>
                <span className="text-xs text-slate-500">
                  JPG, PNG, WEBP — Max 5MB
                </span>
              </div>
            )}
          </div>

          {/* Always show Image SEO Attributes input fields even before uploading or when pre-configuring */}
          {hasSeoControls && (
            <div className="p-3.5 bg-slate-50/80 rounded-xl border border-slate-200 space-y-2.5">
              <div className="flex items-center justify-between text-xs font-bold text-slate-700">
                <span className="flex items-center gap-1.5 text-slate-700">
                  <Sliders size={13} className="text-[#e2572b]" />
                  <span>Image SEO &amp; Loading Attributes</span>
                </span>
                <button
                  type="button"
                  onClick={() => setShowAdvanced(!showAdvanced)}
                  className="text-slate-500 hover:text-slate-800 flex items-center gap-1 text-[11px] font-semibold cursor-pointer"
                >
                  {showAdvanced ? 'Hide' : 'Edit'}
                  {showAdvanced ? <ChevronUp size={13} /> : <ChevronDown size={13} />}
                </button>
              </div>

              {showAdvanced && (
                <div className="space-y-2 bg-white p-3 rounded-lg border border-slate-200 text-xs">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-600 mb-1">
                      Alt Tag <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={currentAlt || ''}
                      onChange={(e) => handleFieldChange('alt', e.target.value)}
                      placeholder="e.g. Partner Logo / DigiPACE Authorized Real Estate Partner"
                      className="w-full px-3 py-1.5 border border-slate-300 rounded-lg text-xs font-medium text-slate-900 focus:outline-none focus:border-[#e2572b]"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <div>
                      <label className="block text-[11px] font-bold text-slate-600 mb-1">Title</label>
                      <input
                        type="text"
                        value={currentTitle || ''}
                        onChange={(e) => handleFieldChange('title', e.target.value)}
                        placeholder="e.g. DigiPACE Real Estate Partner"
                        className="w-full px-3 py-1.5 border border-slate-300 rounded-lg text-xs font-medium text-slate-900 focus:outline-none focus:border-[#e2572b]"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-slate-600 mb-1">Loading</label>
                      <select
                        value={currentLoading || 'lazy'}
                        onChange={(e) => handleFieldChange('loading', e.target.value)}
                        className="w-full px-3 py-1.5 border border-slate-300 rounded-lg text-xs font-medium text-slate-900 focus:outline-none focus:border-[#e2572b] bg-white cursor-pointer"
                      >
                        <option value="lazy">Loading: Lazy</option>
                        <option value="eager">Loading: Eager</option>
                        <option value="auto">Loading: Auto</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-2">
                    <div className="col-span-1">
                      <label className="block text-[11px] font-bold text-slate-600 mb-1">Decoding</label>
                      <select
                        value={currentDecoding || 'async'}
                        onChange={(e) => handleFieldChange('decoding', e.target.value)}
                        className="w-full px-2 py-1.5 border border-slate-300 rounded-lg text-xs font-medium text-slate-900 focus:outline-none focus:border-[#e2572b] bg-white cursor-pointer"
                      >
                        <option value="async">Decoding: Async</option>
                        <option value="sync">Decoding: Sync</option>
                        <option value="auto">Decoding: Auto</option>
                      </select>
                    </div>

                    <div className="col-span-1">
                      <label className="block text-[11px] font-bold text-slate-600 mb-1">Width</label>
                      <input
                        type="text"
                        value={currentWidth || ''}
                        onChange={(e) => handleFieldChange('width', e.target.value)}
                        placeholder="auto / 90"
                        className="w-full px-2 py-1.5 border border-slate-300 rounded-lg text-xs font-medium text-slate-900 focus:outline-none focus:border-[#e2572b]"
                      />
                    </div>

                    <div className="col-span-1">
                      <label className="block text-[11px] font-bold text-slate-600 mb-1">Height</label>
                      <input
                        type="text"
                        value={currentHeight || ''}
                        onChange={(e) => handleFieldChange('height', e.target.value)}
                        placeholder="auto / 28"
                        className="w-full px-2 py-1.5 border border-slate-300 rounded-lg text-xs font-medium text-slate-900 focus:outline-none focus:border-[#e2572b]"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {error && <p className="text-xs text-red-600 font-bold">{error}</p>}
    </div>
  );
}