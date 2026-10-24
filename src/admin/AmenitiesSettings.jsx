import React, { useState } from 'react';
import { saveAmenitiesList } from './api';
import { Save, CheckCircle, Plus, Trash2, Sparkles } from 'lucide-react';

export default function AmenitiesSettings({ data, onRefresh }) {
  const [amenities, setAmenities] = useState(
    data || {
      external: [
        'Swimming Pool',
        'Kids Play Area',
        'Mini Golf',
        'Event Lawn / Amphitheatre',
        'Multipurpose Court',
        'Open Gym',
      ],
      internal: [
        'Flush Doors In All Rooms',
        'Exhaust Fans In Kitchen & Washroom',
        'Stainless Steel Sink',
        'Vitrified Flooring',
        'Anti Skid Flooring In Balcony & Washroom',
        'Wide Windows',
      ],
    }
  );

  const [newExt, setNewExt] = useState('');
  const [newInt, setNewInt] = useState('');
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  const addExternal = () => {
    if (!newExt.trim()) return;
    setAmenities({ ...amenities, external: [...amenities.external, newExt.trim()] });
    setNewExt('');
  };

  const removeExternal = (index) => {
    setAmenities({
      ...amenities,
      external: amenities.external.filter((_, i) => i !== index),
    });
  };

  const addInternal = () => {
    if (!newInt.trim()) return;
    setAmenities({ ...amenities, internal: [...amenities.internal, newInt.trim()] });
    setNewInt('');
  };

  const removeInternal = (index) => {
    setAmenities({
      ...amenities,
      internal: amenities.internal.filter((_, i) => i !== index),
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMessage('');
    try {
      await saveAmenitiesList(amenities);
      setMessage('Amenities updated successfully in MySQL!');
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
          Manage internal fitment features and external club lifestyle amenities.
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
          <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 shadow-2xs">
            <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider mb-3.5">
              External / Club Amenities
            </h3>
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
                className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2.5 rounded-xl text-sm font-bold cursor-pointer transition-all shadow-xs"
              >
                Add
              </button>
            </div>
            <ul className="space-y-2.5">
              {amenities.external.map((item, idx) => (
                <li
                  key={idx}
                  className="flex items-center justify-between text-sm font-medium bg-white px-4 py-3 rounded-xl border border-slate-200 shadow-2xs"
                >
                  <span className="text-slate-800">{item}</span>
                  <button
                    type="button"
                    onClick={() => removeExternal(idx)}
                    className="text-red-500 hover:text-red-700 p-1 cursor-pointer transition-colors"
                  >
                    <Trash2 size={16} />
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 shadow-2xs">
            <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider mb-3.5">
              Internal Residence Amenities
            </h3>
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
                className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2.5 rounded-xl text-sm font-bold cursor-pointer transition-all shadow-xs"
              >
                Add
              </button>
            </div>
            <ul className="space-y-2.5">
              {amenities.internal.map((item, idx) => (
                <li
                  key={idx}
                  className="flex items-center justify-between text-sm font-medium bg-white px-4 py-3 rounded-xl border border-slate-200 shadow-2xs"
                >
                  <span className="text-slate-800">{item}</span>
                  <button
                    type="button"
                    onClick={() => removeInternal(idx)}
                    className="text-red-500 hover:text-red-700 p-1 cursor-pointer transition-colors"
                  >
                    <Trash2 size={16} />
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="pt-5 border-t border-slate-100 flex justify-end">
          <button
            type="submit"
            disabled={saving}
            className="inline-flex items-center gap-2 bg-[#0f2444] hover:bg-[#1a3867] text-white text-sm font-bold px-6 py-3 rounded-xl shadow-md hover:shadow-lg transition-all cursor-pointer"
          >
            <Save size={16} />
            <span>{saving ? 'Saving...' : 'Save Amenities Changes'}</span>
          </button>
        </div>
      </form>
    </div>
  );
}
