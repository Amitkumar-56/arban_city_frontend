import React, { useState } from 'react';
import { updateLocation } from './api';
import { Save, CheckCircle, Plus, Trash2, MapPin } from 'lucide-react';

export default function LocationSettings({ data, onRefresh }) {
  const [formData, setFormData] = useState({
    description:
      data?.description ||
      'Strategically located in Airoli, Navi Mumbai, Arban City offers excellent connectivity to key destinations and daily necessities.',
    office_title: data?.office_title || data?.officeTitle || 'Balaji Tricity Sector Zero Navi Mumbai',
    office_subtitle:
      data?.office_subtitle || data?.officeSubtitle || 'Sales Gallery / Office Address & Experience Center',
    office_address:
      data?.office_address ||
      data?.officeAddress ||
      'Balaji Tricity Delta Arban City, Thane - Belapur Road, Airoli, Navi Mumbai - 400708',
    landmarks: (data?.landmarks || [
      { id: 1, name: 'Satyam Hospital', travel_time: '5 Mins' },
      { id: 2, name: 'Flower Hospital', travel_time: '7 Mins' },
      { id: 3, name: 'Lifeline Hospital', travel_time: '10 Mins' },
      { id: 4, name: 'Bharti Hospital', travel_time: '15 Mins' },
    ]).map((l) => ({
      id: l.id,
      name: l.name,
      travel_time: l.travel_time || l.time || '5 Mins',
    })),
  });
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  const handleLandmarkChange = (id, field, value) => {
    setFormData((prev) => ({
      ...prev,
      landmarks: prev.landmarks.map((l) =>
        l.id === id ? { ...l, [field]: value } : l
      ),
    }));
  };

  const addLandmark = () => {
    const newL = {
      id: Date.now(),
      name: 'New Destination',
      travel_time: '10 Mins',
    };
    setFormData((prev) => ({
      ...prev,
      landmarks: [...prev.landmarks, newL],
    }));
  };

  const removeLandmark = (id) => {
    setFormData((prev) => ({
      ...prev,
      landmarks: prev.landmarks.filter((l) => l.id !== id),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMessage('');
    try {
      await updateLocation(formData);
      setMessage('Location and landmarks updated successfully in MySQL!');
      if (onRefresh) onRefresh();
    } catch (err) {
      alert('Error updating location: ' + err.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-6 sm:p-8 max-w-5xl">
      <div className="border-b border-slate-100 pb-5 mb-7">
        <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2.5">
          <MapPin size={26} className="text-[#0f2444]" />
          <span>Location &amp; Landmarks Settings</span>
        </h2>
        <p className="text-sm text-slate-500 mt-1">
          Edit neighborhood connectivity distances, travel times to hospitals/hubs, and site experience gallery address.
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
          <label className="block text-sm font-bold text-slate-700 mb-1.5">Location Overview Text</label>
          <textarea
            rows={3}
            value={formData.description || ''}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="w-full px-4 py-3 border border-slate-300 rounded-xl text-sm font-medium text-slate-900 leading-relaxed focus:outline-none focus:border-[#e2572b] focus:ring-2 focus:ring-[#e2572b]/20 transition-all"
          />
        </div>

        <div className="p-5 sm:p-6 bg-slate-50 border border-slate-200 rounded-2xl">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider">
              Landmarks &amp; Travel Times
            </h3>
            <button
              type="button"
              onClick={addLandmark}
              className="inline-flex items-center gap-1.5 text-sm text-emerald-600 hover:text-emerald-700 font-bold cursor-pointer"
            >
              <Plus size={18} />
              <span>Add Landmark</span>
            </button>
          </div>

          <div className="space-y-3">
            {formData.landmarks.map((l) => (
              <div key={l.id} className="flex flex-col sm:flex-row items-center gap-3 bg-white p-3.5 rounded-xl border border-slate-200 shadow-2xs">
                <input
                  type="text"
                  required
                  placeholder="Landmark name (e.g. Satyam Hospital)"
                  value={l.name}
                  onChange={(e) => handleLandmarkChange(l.id, 'name', e.target.value)}
                  className="flex-1 w-full sm:w-auto px-3.5 py-2 text-sm font-medium border border-slate-300 rounded-lg outline-none focus:border-[#e2572b]"
                />
                <input
                  type="text"
                  required
                  placeholder="Travel time (e.g. 5 Mins)"
                  value={l.travel_time}
                  onChange={(e) => handleLandmarkChange(l.id, 'travel_time', e.target.value)}
                  className="w-full sm:w-36 px-3.5 py-2 text-sm font-bold text-[#e2572b] border border-slate-300 rounded-lg outline-none focus:border-[#e2572b]"
                />
                <button
                  type="button"
                  onClick={() => removeLandmark(l.id)}
                  className="p-2 text-red-500 hover:bg-red-50 rounded-lg cursor-pointer transition-colors self-end sm:self-center"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider">
            Sales Gallery &amp; Site Experience Center Address
          </h3>
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-1.5">Building / Office Name</label>
            <input
              type="text"
              value={formData.office_title || ''}
              onChange={(e) => setFormData({ ...formData, office_title: e.target.value })}
              className="w-full px-4 py-2.5 sm:py-3 border border-slate-300 rounded-xl text-sm font-medium text-slate-900 focus:outline-none focus:border-[#e2572b] focus:ring-2 focus:ring-[#e2572b]/20 transition-all"
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-1.5">Office Subtitle / Tagline</label>
            <input
              type="text"
              value={formData.office_subtitle || ''}
              onChange={(e) => setFormData({ ...formData, office_subtitle: e.target.value })}
              className="w-full px-4 py-2.5 sm:py-3 border border-slate-300 rounded-xl text-sm font-medium text-slate-900 focus:outline-none focus:border-[#e2572b] focus:ring-2 focus:ring-[#e2572b]/20 transition-all"
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-1.5">Full Detailed Physical Address</label>
            <input
              type="text"
              value={formData.office_address || ''}
              onChange={(e) => setFormData({ ...formData, office_address: e.target.value })}
              className="w-full px-4 py-2.5 sm:py-3 border border-slate-300 rounded-xl text-sm font-medium text-slate-900 focus:outline-none focus:border-[#e2572b] focus:ring-2 focus:ring-[#e2572b]/20 transition-all"
            />
          </div>
        </div>

        <div className="pt-5 border-t border-slate-100 flex justify-end">
          <button
            type="submit"
            disabled={saving}
            className="inline-flex items-center gap-2 bg-[#0f2444] hover:bg-[#1a3867] text-white text-sm font-bold px-6 py-3 rounded-xl shadow-md hover:shadow-lg transition-all cursor-pointer"
          >
            <Save size={16} />
            <span>{saving ? 'Saving...' : 'Save Location Changes'}</span>
          </button>
        </div>
      </form>
    </div>
  );
}
