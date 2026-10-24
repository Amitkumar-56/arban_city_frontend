import React, { useState } from 'react';
import { saveOverviewList } from './api';
import { Save, CheckCircle, Plus, Trash2 } from 'lucide-react';

export default function OverviewSettings({ data, onRefresh }) {
  const [items, setItems] = useState(
    data || [
      { id: 1, label: 'Project Name', value: 'Arban City Sector 0' },
      { id: 2, label: 'Developer', value: 'Delta Tricity' },
      { id: 3, label: 'Location', value: 'Airoli, Navi Mumbai' },
      { id: 4, label: 'Project Type', value: 'Residential' },
      { id: 5, label: 'Configuration', value: '1, 2 & 3 BHK' },
      { id: 6, label: 'Possession', value: 'Dec 2028*' },
      { id: 7, label: 'Area', value: '5.5 Acre' },
      { id: 8, label: 'Towers', value: '3' },
      { id: 9, label: 'Storey', value: '35+' },
    ]
  );
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  const handleChange = (id, field, value) => {
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, [field]: value } : item))
    );
  };

  const handleAdd = () => {
    const newItem = {
      id: Date.now(),
      label: 'New Spec',
      value: 'Value',
    };
    setItems([...items, newItem]);
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
    } catch (err) {
      alert('Error updating overview: ' + err.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-6 sm:p-8 max-w-5xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-5 mb-7">
        <div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
            Overview Specification Cards
          </h2>
          <p className="text-sm text-slate-500 mt-1">
            Edit, add, or remove key specification cards presented in the project overview grid.
          </p>
        </div>
        <button
          type="button"
          onClick={handleAdd}
          className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-bold px-4 py-2.5 rounded-xl shadow-xs transition-all cursor-pointer shrink-0"
        >
          <Plus size={18} />
          <span>Add Spec Card</span>
        </button>
      </div>

      {message && (
        <div className="mb-6 p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-sm font-semibold flex items-center gap-2.5">
          <CheckCircle size={18} className="text-emerald-600 shrink-0" />
          <span>{message}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {items.map((item) => (
            <div
              key={item.id}
              className="p-4 border border-slate-200 rounded-xl flex items-center gap-4 bg-slate-50/70 hover:bg-white transition-all shadow-2xs"
            >
              <div className="flex-1 space-y-2">
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Specification Label</label>
                  <input
                    type="text"
                    required
                    value={item.label}
                    onChange={(e) => handleChange(item.id, 'label', e.target.value)}
                    className="w-full px-3 py-2 text-sm font-medium border border-slate-300 rounded-lg bg-white outline-none focus:border-[#e2572b]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Value / Content</label>
                  <input
                    type="text"
                    required
                    value={item.value}
                    onChange={(e) => handleChange(item.id, 'value', e.target.value)}
                    className="w-full px-3 py-2 text-sm font-bold text-slate-900 border border-slate-300 rounded-lg bg-white outline-none focus:border-[#e2572b]"
                  />
                </div>
              </div>
              <button
                type="button"
                onClick={() => handleDelete(item.id)}
                className="p-2 text-red-500 hover:bg-red-50 rounded-lg cursor-pointer transition-colors"
                title="Delete Card"
              >
                <Trash2 size={18} />
              </button>
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
            <span>{saving ? 'Saving...' : 'Save Overview Cards'}</span>
          </button>
        </div>
      </form>
    </div>
  );
}
