import React, { useState } from 'react';
import { saveFloorPlansList } from './api';
import { Save, CheckCircle, Plus, Trash2 } from 'lucide-react';
import FileUpload from './FileUpload';

export default function FloorPlanSettings({ data, onRefresh }) {
  const initialPlans = (data || []).map((p, idx) => ({
    id: p.id || idx + 1,
    unit_type: p.unit_type || p.type || '1 BHK',
    carpet_area: p.carpet_area || p.carpet || '413 Sq.ft',
    price: p.price || '₹89 Lakhs*',
    image_url: p.image_url || '',
  }));

  const [plans, setPlans] = useState(
    initialPlans.length > 0
      ? initialPlans
      : [
          { id: 1, unit_type: '1 BHK', carpet_area: '413 Sq.ft', price: '₹89 Lakhs*', image_url: '' },
          { id: 2, unit_type: '2 BHK', carpet_area: '633 Sq.ft', price: '₹91 Lakhs*', image_url: '' },
          { id: 3, unit_type: '3 BHK', carpet_area: '871 Sq.ft', price: '₹1.78 Cr*', image_url: '' },
          { id: 4, unit_type: '3 BHK', carpet_area: '962 Sq.ft', price: '₹1.95 Cr*', image_url: '' },
        ]
  );
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  const handleChange = (id, field, value) => {
    setPlans((prev) =>
      prev.map((item) => (item.id === id ? { ...item, [field]: value } : item))
    );
  };

  const handleAdd = () => {
    const newPlan = {
      id: Date.now(),
      unit_type: '2.5 BHK',
      carpet_area: '750 Sq.ft',
      price: '₹1.55 Cr*',
      image_url: '',
    };
    setPlans([...plans, newPlan]);
  };

  const handleDelete = (id) => {
    setPlans(plans.filter((p) => p.id !== id));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMessage('');
    try {
      await saveFloorPlansList(plans);
      setMessage('Floor plans updated successfully in MySQL!');
      if (onRefresh) onRefresh();
    } catch (err) {
      alert('Error updating floor plans: ' + err.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-6 sm:p-8 max-w-5xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-5 mb-7">
        <div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
            Floor Plans Settings
          </h2>
          <p className="text-sm text-slate-500 mt-1">
            Manage interactive apartment unit typologies, carpet areas, starting prices, and layout blueprints.
          </p>
        </div>
        <button
          type="button"
          onClick={handleAdd}
          className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-bold px-4 py-2.5 rounded-xl shadow-xs transition-all cursor-pointer shrink-0"
        >
          <Plus size={18} />
          <span>Add Floor Plan</span>
        </button>
      </div>

      {message && (
        <div className="mb-6 p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-sm font-semibold flex items-center gap-2.5">
          <CheckCircle size={18} className="text-emerald-600 shrink-0" />
          <span>{message}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-6">
          {plans.map((item) => (
            <div
              key={item.id}
              className="p-5 sm:p-6 border border-slate-200 rounded-2xl space-y-4 bg-slate-50/70 relative shadow-2xs"
            >
              <div className="flex items-center justify-between">
                <span className="text-sm font-extrabold text-[#0f2444] uppercase tracking-wide">
                  Plan #{item.id}: {item.unit_type}
                </span>
                <button
                  type="button"
                  onClick={() => handleDelete(item.id)}
                  className="px-3 py-1.5 text-red-600 hover:bg-red-50 rounded-lg cursor-pointer flex items-center gap-1.5 text-xs font-bold transition-colors"
                >
                  <Trash2 size={16} />
                  <span>Delete</span>
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-600 uppercase mb-1">Unit Typology</label>
                  <input
                    type="text"
                    required
                    value={item.unit_type}
                    onChange={(e) => handleChange(item.id, 'unit_type', e.target.value)}
                    className="w-full px-3.5 py-2.5 text-sm font-bold text-slate-900 bg-white border border-slate-300 rounded-xl outline-none focus:border-[#e2572b]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-600 uppercase mb-1">Carpet Area</label>
                  <input
                    type="text"
                    required
                    value={item.carpet_area}
                    onChange={(e) => handleChange(item.id, 'carpet_area', e.target.value)}
                    className="w-full px-3.5 py-2.5 text-sm font-medium text-slate-900 bg-white border border-slate-300 rounded-xl outline-none focus:border-[#e2572b]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-600 uppercase mb-1">Starting Price</label>
                  <input
                    type="text"
                    required
                    value={item.price}
                    onChange={(e) => handleChange(item.id, 'price', e.target.value)}
                    className="w-full px-3.5 py-2.5 text-sm font-bold text-[#e2572b] bg-white border border-slate-300 rounded-xl outline-none focus:border-[#e2572b]"
                  />
                </div>
              </div>

              <div>
                <FileUpload
                  label="Floor Plan Architecture Graphic / Blueprint"
                  value={item.image_url || ''}
                  onChange={(url) => handleChange(item.id, 'image_url', url)}
                />
              </div>
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
            <span>{saving ? 'Saving...' : 'Save Floor Plans'}</span>
          </button>
        </div>
      </form>
    </div>
  );
}
