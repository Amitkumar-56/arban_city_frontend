import React, { useState } from 'react';
import { saveOverviewList, resolveAssetUrl, uploadFile } from './api';
import {
  Save,
  CheckCircle,
  Plus,
  Trash2,
  Upload,
  Loader2,
  X,
  LayoutGrid,
} from 'lucide-react';
import { ICON_MAP } from '../components/Overview';

const ICON_OPTIONS = [
  { id: 'land', label: 'Land / Trees' },
  { id: 'building', label: 'Towers / Building' },
  { id: 'layers', label: 'Floors / Layers' },
  { id: 'home', label: 'Home / Typology' },
  { id: 'area', label: 'Area / Carpet' },
  { id: 'price', label: 'Price (₹)' },
  { id: 'location', label: 'Location Pin' },
  { id: 'calendar', label: 'Calendar / Possession' },
  { id: 'shield', label: 'Shield / RERA' },
  { id: 'verified', label: 'Check / Verified' },
  { id: 'compass', label: 'Compass / Direction' },
  { id: 'sparkles', label: 'Luxury / Sparkles' },
  { id: 'apartment', label: 'Google: apartment' },
  { id: 'pool', label: 'Google: pool (Swimming)' },
  { id: 'fitness_center', label: 'Google: fitness_center (Gym)' },
  { id: 'park', label: 'Google: park (Garden)' },
  { id: 'directions_car', label: 'Google: directions_car (Parking)' },
  { id: 'security', label: 'Google: security' },
  { id: 'local_fire_department', label: 'Google: fire_safety' },
  { id: 'elevator', label: 'Google: elevator / Lift' },
  { id: 'deck', label: 'Google: deck / Balcony' },
  { id: 'solar_power', label: 'Google: solar_power' },
  { id: 'wb_sunny', label: 'Google: sunny / Daylight' },
  { id: 'water_drop', label: 'Google: water_drop' },
  { id: 'sports_tennis', label: 'Google: sports_tennis' },
  { id: 'sports_golf', label: 'Google: sports_golf' },
  { id: 'child_care', label: 'Google: child_care' },
  { id: 'wifi', label: 'Google: wifi' },
  { id: 'local_hospital', label: 'Google: hospital' },
  { id: 'school', label: 'Google: school' },
  { id: 'train', label: 'Google: train / Metro' },
  { id: 'flight', label: 'Google: flight / Airport' },
];

export default function OverviewSettings({ data, onRefresh }) {
  const [items, setItems] = useState(
    Array.isArray(data) && data.length > 0
      ? data.map((d, idx) => ({
          id: d.id || idx + 1,
          label: d.label || '',
          value: d.value || d.val || '',
          icon: d.icon || 'building',
          image: d.image || d.image_url || '',
        }))
      : [
          { id: 1, label: 'Land Parcel', value: '5.5 Acres', icon: 'land', image: '' },
          { id: 2, label: 'Towers', value: '3 High Rise', icon: 'building', image: '' },
          { id: 3, label: 'Floors', value: '35+ Storeys', icon: 'layers', image: '' },
          { id: 4, label: 'Typology', value: '1, 2 & 3 BHK', icon: 'home', image: '' },
          { id: 5, label: 'Carpet Area', value: '413 - 930 sq.ft', icon: 'area', image: '' },
          { id: 6, label: 'Starting Price', value: '₹89 Lacs*', icon: 'price', image: '' },
          { id: 7, label: 'Location', value: 'Airoli, Navi Mumbai', icon: 'location', image: '' },
          { id: 8, label: 'Possession', value: 'Dec 2029', icon: 'calendar', image: '' },
          { id: 9, label: 'RERA Status', value: 'Registered', icon: 'shield', image: '' },
        ]
  );

  React.useEffect(() => {
    if (Array.isArray(data) && data.length > 0) {
      setItems(
        data.map((d, idx) => ({
          id: d.id || idx + 1,
          label: d.label || '',
          value: d.value || d.val || '',
          icon: d.icon || 'building',
          image: d.image || d.image_url || '',
        }))
      );
    }
  }, [data]);
  const [uploadingId, setUploadingId] = useState(null);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  const handleChange = (id, field, value) => {
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, [field]: value } : item))
    );
  };

  const handleCustomIconUpload = async (id, file) => {
    if (!file) return;
    setUploadingId(id);
    try {
      const res = await uploadFile(file, 'amenities');
      if (res.url) {
        handleChange(id, 'image', res.url);
      }
    } catch (err) {
      alert('Failed to upload icon: ' + err.message);
    } finally {
      setUploadingId(null);
    }
  };

  const handleAdd = async () => {
    const newItem = {
      id: Date.now(),
      label: 'New Spec',
      value: 'Specification Value',
      icon: 'building',
      image: '',
    };
    const updated = [...items, newItem];
    setItems(updated);
    setSaving(true);
    try {
      await saveOverviewList(updated);
      setMessage('New overview card added and saved into MySQL!');
      if (onRefresh) onRefresh();
      setTimeout(() => setMessage(''), 4000);
    } catch (err) {
      alert('Error saving overview: ' + err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = (id) => {
    setItems(items.filter((item) => item.id !== id));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMessage('');
    try {
      await saveOverviewList(items);
      setMessage('Overview items updated successfully in MySQL!');
      if (onRefresh) onRefresh();
      setTimeout(() => setMessage(''), 4000);
    } catch (err) {
      alert('Error updating overview: ' + err.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8 max-w-5xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-5 mb-7">
        <div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2.5">
            <LayoutGrid size={24} className="text-[#e2572b]" />
            <span>Overview Specification Cards</span>
          </h2>
          <p className="text-sm text-slate-500 mt-1">
            Configure the highlight cards shown in the Overview section of the homepage.
          </p>
        </div>
        <button
          type="button"
          onClick={handleAdd}
          className="inline-flex items-center gap-2 bg-[#0f2444] hover:bg-[#1a3867] text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-xs transition-all cursor-pointer shrink-0"
        >
          <Plus size={16} />
          <span>Add New Card</span>
        </button>
      </div>

      {message && (
        <div className="mb-6 p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-sm font-semibold flex items-center gap-2.5">
          <CheckCircle size={18} className="text-emerald-600 shrink-0" />
          <span>{message}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {items.map((item, index) => {
            const IconComp = ICON_MAP[item.icon] || ICON_MAP.building;
            const hasCustomImage = Boolean(item.image);

            return (
              <div
                key={item.id || index}
                className="bg-white rounded-xl border border-slate-200 hover:border-slate-300 shadow-xs hover:shadow-md transition-all flex flex-col overflow-hidden"
              >
                {/* Card Header with Live Icon Preview & Delete */}
                <div className="p-4 bg-slate-50 border-b border-slate-100 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-11 h-11 rounded-xl bg-white border border-slate-200 shadow-2xs flex items-center justify-center shrink-0 text-[#0f2444] overflow-hidden p-1.5">
                      {hasCustomImage ? (
                        <img
                          src={resolveAssetUrl(item.image)}
                          alt="Custom icon"
                          className="w-full h-full object-contain"
                          onError={(e) => {
                            e.currentTarget.style.display = 'none';
                          }}
                        />
                      ) : (
                        <IconComp size={22} className="stroke-[1.8]" />
                      )}
                    </div>
                    <div className="min-w-0">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
                        Card #{index + 1}
                      </span>
                      <b className="text-sm font-extrabold text-slate-900 truncate block">
                        {item.label || 'Card ' + (index + 1)}
                      </b>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleDelete(item.id)}
                    className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg cursor-pointer transition-colors"
                    title="Delete Card"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>

                {/* Card Fields */}
                <div className="p-4 space-y-3.5 flex-1 flex flex-col justify-between">
                  <div className="space-y-3">
                    <div>
                      <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-600 mb-1">
                        Card Title / Label
                      </label>
                      <input
                        type="text"
                        required
                        value={item.label}
                        onChange={(e) => handleChange(item.id, 'label', e.target.value)}
                        placeholder="e.g. Land Parcel"
                        className="w-full px-3 py-2 text-xs font-semibold border border-slate-300 rounded-lg bg-white outline-none focus:border-[#e2572b]"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-600 mb-1">
                        Specification Value
                      </label>
                      <input
                        type="text"
                        required
                        value={item.value}
                        onChange={(e) => handleChange(item.id, 'value', e.target.value)}
                        placeholder="e.g. 5.5 Acres"
                        className="w-full px-3 py-2 text-xs font-extrabold text-[#0f2444] border border-slate-300 rounded-lg bg-white outline-none focus:border-[#e2572b]"
                      />
                    </div>

                    {/* Icon Selection & Custom Upload */}
                    <div className="pt-2 border-t border-slate-100 space-y-2">
                      <div className="flex items-center justify-between">
                        <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-600">
                          Icon Selection
                        </label>
                        <a
                          href="https://fonts.google.com/icons?icon.set=Material+Symbols"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[10px] text-blue-600 hover:underline font-semibold flex items-center gap-1"
                        >
                          Browse Google Icons ↗
                        </a>
                      </div>
                      
                      <div className="grid grid-cols-1 gap-2">
                        <select
                          value={ICON_OPTIONS.some((opt) => opt.id === item.icon) ? item.icon : 'custom_input'}
                          onChange={(e) => {
                            if (e.target.value !== 'custom_input') {
                              handleChange(item.id, 'icon', e.target.value);
                            }
                          }}
                          className="w-full px-2.5 py-1.5 text-xs font-medium border border-slate-300 rounded-lg bg-white outline-none focus:border-[#e2572b] cursor-pointer"
                        >
                          {ICON_OPTIONS.map((opt) => (
                            <option key={opt.id} value={opt.id}>
                              {opt.label}
                            </option>
                          ))}
                          <option value="custom_input">Custom Google Icon Name...</option>
                        </select>

                        {/* Google Icon Name Direct Input */}
                        <div className="flex items-center gap-2">
                          <input
                            type="text"
                            value={item.icon || ''}
                            onChange={(e) => handleChange(item.id, 'icon', e.target.value.toLowerCase().trim())}
                            placeholder="Type Google Icon name (e.g. apartment, pool, gym)"
                            className="flex-1 min-w-0 px-2.5 py-1.5 text-xs font-mono border border-slate-300 rounded-lg bg-white outline-none focus:border-[#e2572b]"
                          />
                          <div className="w-8 h-8 rounded-lg bg-slate-100 border border-slate-200 flex items-center justify-center shrink-0">
                            {ICON_MAP[item.icon] ? (
                              React.createElement(ICON_MAP[item.icon], { size: 18, className: "text-[#0f2444]" })
                            ) : (
                              <span
                                className="material-symbols-outlined text-[20px] text-[#0f2444] select-none"
                                style={{ fontFamily: "'Material Symbols Outlined' !important" }}
                              >
                                {item.icon || 'help'}
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Custom Image Upload Pill */}
                        <div className="flex items-center gap-2">
                          <label className="flex-1 inline-flex items-center justify-center gap-1.5 py-1.5 px-2.5 border border-dashed border-slate-300 hover:border-[#e2572b] rounded-lg text-[11px] font-semibold text-slate-600 hover:text-[#e2572b] bg-slate-50/50 hover:bg-orange-50/20 cursor-pointer transition-colors">
                            {uploadingId === item.id ? (
                              <>
                                <Loader2 size={13} className="animate-spin text-[#e2572b]" />
                                <span>Uploading...</span>
                              </>
                            ) : (
                              <>
                                <Upload size={13} />
                                <span>{hasCustomImage ? 'Change Custom Icon' : 'Upload Custom Icon SVG/PNG'}</span>
                              </>
                            )}
                            <input
                              type="file"
                              accept="image/*,.svg"
                              className="hidden"
                              onChange={(e) => handleCustomIconUpload(item.id, e.target.files?.[0])}
                            />
                          </label>

                          {hasCustomImage && (
                            <button
                              type="button"
                              onClick={() => handleChange(item.id, 'image', '')}
                              className="p-1.5 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg cursor-pointer"
                              title="Reset to Vector Icon"
                            >
                              <X size={14} />
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="pt-5 border-t border-slate-100 flex justify-end">
          <button
            type="submit"
            disabled={saving}
            className="inline-flex items-center gap-2 bg-[#0f2444] hover:bg-[#1a3867] text-white text-sm font-bold px-6 py-3 rounded-xl shadow-md hover:shadow-lg transition-all cursor-pointer"
          >
            <Save size={16} />
            <span>{saving ? 'Saving...' : 'Save Overview Cards'}</span>
          </button>
        </div>
      </form>
    </div>
  );
}