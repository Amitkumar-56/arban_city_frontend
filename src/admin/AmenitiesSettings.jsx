import React, { useState, useEffect } from 'react';
import { fetchAmenities, saveAmenitiesList } from './api';
import { Save, CheckCircle, Plus, Sparkles, Eye, EyeOff } from 'lucide-react';

export default function AmenitiesSettings({ data, onRefresh }) {
  // Normalize incoming data: convert string items to { name: string, is_visible: boolean }
  const normalizeList = (list) => {
    if (!Array.isArray(list)) return [];
    return list.map((item) => {
      if (typeof item === 'string') {
        return { name: item, is_visible: true };
      }
      // Agar item object hai:
      const val = item?.is_visible;
      const isVisible = (val === true || val === 1 || val === '1' || val === 'true');
      return {
        name: item?.name || '',
        is_visible: isVisible,
      };
    });
  };

  const [amenities, setAmenities] = useState({
    external: [],
    internal: [],
  });

  // Direct fetch from /api/amenities to guarantee all unchecked items are always fetched from DB
  const loadFullAmenities = async () => {
    try {
      const res = await fetchAmenities();
      if (res && (Array.isArray(res.external) || Array.isArray(res.internal))) {
        setAmenities({
          external: normalizeList(res.external),
          internal: normalizeList(res.internal),
        });
      }
    } catch (err) {
      console.error('Failed to load full amenities:', err);
    }
  };

  useEffect(() => {
    loadFullAmenities();
  }, []);

  // Sync ONLY when parent data has full all_external or all_internal objects
  useEffect(() => {
    if (Array.isArray(data?.all_external) || Array.isArray(data?.all_internal)) {
      setAmenities({
        external: normalizeList(data.all_external),
        internal: normalizeList(data.all_internal),
      });
    }
  }, [data?.all_external, data?.all_internal]);

  const [newExt, setNewExt] = useState('');
  const [newInt, setNewInt] = useState('');
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  const addExternal = async () => {
    if (!newExt.trim()) return;
    const itemToAdd = { name: newExt.trim(), is_visible: true };
    const updated = {
      ...amenities,
      external: [...(amenities.external || []), itemToAdd],
    };
    setAmenities(updated);
    setNewExt('');
    setSaving(true);
    try {
      await saveAmenitiesList(updated);
      setMessage('New amenity inserted and saved into MySQL!');
      await loadFullAmenities();
      if (onRefresh) onRefresh();
    } catch (err) {
      alert('Error inserting amenity: ' + err.message);
    } finally {
      setSaving(false);
    }
  };

  const toggleExternalVisibility = async (index) => {
    const updatedList = [...(amenities.external || [])];
    updatedList[index] = { ...updatedList[index], is_visible: !updatedList[index].is_visible };
    const updated = { ...amenities, external: updatedList };
    setAmenities(updated);
    try {
      await saveAmenitiesList(updated);
      await loadFullAmenities();
      if (onRefresh) onRefresh();
    } catch (err) {
      console.error('Error toggling visibility:', err);
    }
  };

  const addInternal = async () => {
    if (!newInt.trim()) return;
    const itemToAdd = { name: newInt.trim(), is_visible: true };
    const updated = {
      ...amenities,
      internal: [...(amenities.internal || []), itemToAdd],
    };
    setAmenities(updated);
    setNewInt('');
    setSaving(true);
    try {
      await saveAmenitiesList(updated);
      setMessage('New amenity inserted and saved into MySQL!');
      await loadFullAmenities();
      if (onRefresh) onRefresh();
    } catch (err) {
      alert('Error inserting amenity: ' + err.message);
    } finally {
      setSaving(false);
    }
  };

  const toggleInternalVisibility = async (index) => {
    const updatedList = [...(amenities.internal || [])];
    updatedList[index] = { ...updatedList[index], is_visible: !updatedList[index].is_visible };
    const updated = { ...amenities, internal: updatedList };
    setAmenities(updated);
    try {
      await saveAmenitiesList(updated);
      await loadFullAmenities();
      if (onRefresh) onRefresh();
    } catch (err) {
      console.error('Error toggling visibility:', err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMessage('');
    try {
      await saveAmenitiesList(amenities);
      setMessage('Amenities updated successfully in MySQL!');
      await loadFullAmenities();
      if (onRefresh) onRefresh();
    } catch (err) {
      alert('Error updating amenities: ' + err.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-6 sm:p-8 max-w-5xl">
      <div className="border-b border-slate-100 pb-5 mb-7">
        <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2.5">
          <Sparkles size={26} className="text-[#0f2444]" />
          <span>Amenities Settings</span>
        </h2>
        <p className="text-sm text-slate-500 mt-1">
          Manage internal and external amenities. Amenities are permanent in the database — simply check or uncheck to show or hide them on the website.
        </p>
      </div>

      {message && (
        <div className="mb-6 p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-sm font-semibold flex items-center gap-2.5">
          <CheckCircle size={18} className="text-emerald-600 shrink-0" />
          <span>{message}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* External / Club Amenities */}
          <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 shadow-2xs">
            <div className="flex items-center justify-between mb-3.5">
              <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider">
                External / Club Amenities
              </h3>
              <span className="text-[11px] font-semibold text-slate-500 bg-white px-2 py-0.5 rounded border border-slate-200">
                {(amenities.external || []).filter(item => item.is_visible).length} / {(amenities.external || []).length} Visible
              </span>
            </div>

            <div className="flex gap-2.5 mb-4">
              <input
                type="text"
                placeholder="New external amenity..."
                value={newExt}
                onChange={(e) => setNewExt(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    addExternal();
                  }
                }}
                className="flex-1 px-3.5 py-2.5 text-sm font-medium border border-slate-300 rounded-xl bg-white outline-none focus:border-[#e2572b]"
              />
              <button
                type="button"
                onClick={addExternal}
                className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2.5 rounded-xl text-sm font-bold cursor-pointer transition-all shadow-xs flex items-center gap-1.5"
              >
                <Plus size={16} />
                <span>Add</span>
              </button>
            </div>

            <ul className="space-y-2.5">
              {(amenities.external || []).map((item, idx) => (
                <li
                  key={idx}
                  className={`flex items-center justify-between text-sm font-medium px-4 py-3 rounded-xl border transition-all ${
                    item.is_visible
                      ? 'bg-white border-slate-200 shadow-2xs text-slate-800'
                      : 'bg-white border-slate-200 shadow-2xs text-slate-700'
                  }`}
                >
                  <label className="flex items-center gap-3 cursor-pointer select-none flex-1 min-w-0 pr-2">
                    <input
                      type="checkbox"
                      checked={!!item.is_visible}
                      onChange={() => toggleExternalVisibility(idx)}
                      className="w-4 h-4 rounded text-[#e2572b] focus:ring-[#e2572b] border-slate-300 cursor-pointer accent-[#e2572b]"
                    />
                    <span className="break-words truncate text-slate-800 font-medium">
                      {item.name}
                    </span>
                    {!item.is_visible && (
                      <span className="text-[10px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                        Hidden from UI
                      </span>
                    )}
                  </label>

                  <div className="flex items-center gap-1 shrink-0">
                    <button
                      type="button"
                      onClick={() => toggleExternalVisibility(idx)}
                      title={item.is_visible ? "Hide from website" : "Show on website"}
                      className={`p-1.5 rounded-lg cursor-pointer transition-colors ${
                        item.is_visible
                          ? 'text-slate-500 hover:text-slate-700 hover:bg-slate-100'
                          : 'text-amber-600 hover:text-amber-800 hover:bg-amber-100'
                      }`}
                    >
                      {item.is_visible ? <Eye size={16} /> : <EyeOff size={16} />}
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Internal Residence Amenities */}
          <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 shadow-2xs">
            <div className="flex items-center justify-between mb-3.5">
              <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider">
                Internal Residence Amenities
              </h3>
              <span className="text-[11px] font-semibold text-slate-500 bg-white px-2 py-0.5 rounded border border-slate-200">
                {(amenities.internal || []).filter(item => item.is_visible).length} / {(amenities.internal || []).length} Visible
              </span>
            </div>

            <div className="flex gap-2.5 mb-4">
              <input
                type="text"
                placeholder="New internal amenity..."
                value={newInt}
                onChange={(e) => setNewInt(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    addInternal();
                  }
                }}
                className="flex-1 px-3.5 py-2.5 text-sm font-medium border border-slate-300 rounded-xl bg-white outline-none focus:border-[#e2572b]"
              />
              <button
                type="button"
                onClick={addInternal}
                className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2.5 rounded-xl text-sm font-bold cursor-pointer transition-all shadow-xs flex items-center gap-1.5"
              >
                <Plus size={16} />
                <span>Add</span>
              </button>
            </div>

            <ul className="space-y-2.5">
              {(amenities.internal || []).map((item, idx) => (
                <li
                  key={idx}
                  className={`flex items-center justify-between text-sm font-medium px-4 py-3 rounded-xl border transition-all ${
                    item.is_visible
                      ? 'bg-white border-slate-200 shadow-2xs text-slate-800'
                      : 'bg-white border-slate-200 shadow-2xs text-slate-700'
                  }`}
                >
                  <label className="flex items-center gap-3 cursor-pointer select-none flex-1 min-w-0 pr-2">
                    <input
                      type="checkbox"
                      checked={!!item.is_visible}
                      onChange={() => toggleInternalVisibility(idx)}
                      className="w-4 h-4 rounded text-[#e2572b] focus:ring-[#e2572b] border-slate-300 cursor-pointer accent-[#e2572b]"
                    />
                    <span className="break-words truncate text-slate-800 font-medium">
                      {item.name}
                    </span>
                    {!item.is_visible && (
                      <span className="text-[10px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                        Hidden from UI
                      </span>
                    )}
                  </label>

                  <div className="flex items-center gap-1 shrink-0">
                    <button
                      type="button"
                      onClick={() => toggleInternalVisibility(idx)}
                      title={item.is_visible ? "Hide from website" : "Show on website"}
                      className={`p-1.5 rounded-lg cursor-pointer transition-colors ${
                        item.is_visible
                          ? 'text-slate-500 hover:text-slate-700 hover:bg-slate-100'
                          : 'text-amber-600 hover:text-amber-800 hover:bg-amber-100'
                      }`}
                    >
                      {item.is_visible ? <Eye size={16} /> : <EyeOff size={16} />}
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex justify-end pt-4 border-t border-slate-100">
          <button
            type="submit"
            disabled={saving}
            className="inline-flex items-center gap-2 bg-[#0f2444] hover:bg-[#1a3860] text-white text-sm font-bold px-7 py-3.5 rounded-xl shadow-md transition-all cursor-pointer disabled:opacity-50"
          >
            <Save size={18} />
            <span>{saving ? 'Saving...' : 'Save All Amenities'}</span>
          </button>
        </div>
      </form>
    </div>
  );
}
