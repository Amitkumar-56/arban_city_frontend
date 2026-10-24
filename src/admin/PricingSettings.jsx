import React, { useState } from 'react';
import { savePricingList } from './api';
import { Save, CheckCircle, Plus, Trash2 } from 'lucide-react';

export default function PricingSettings({ data, onRefresh }) {
  const initialPlans = (data || []).map((p, idx) => ({
    id: p.id || idx + 1,
    unit_type: p.unit_type || p.type || '1 BHK',
    carpet_area: p.carpet_area || p.carpet || '433 Sq.ft',
    price: p.price || '₹89 Lakhs*',
  }));

  const [plans, setPlans] = useState(
    initialPlans.length > 0
      ? initialPlans
      : [
          { id: 1, unit_type: '1 BHK', carpet_area: '433 Sq.ft', price: '₹89 Lakhs*' },
          { id: 2, unit_type: '1 BHK', carpet_area: '435 Sq.ft', price: '₹91 Lakhs*' },
          { id: 3, unit_type: '2 BHK', carpet_area: '633 Sq.ft', price: '₹1.32 Cr*' },
          { id: 4, unit_type: '2 BHK', carpet_area: '692 Sq.ft', price: '₹1.38 Cr*' },
          { id: 5, unit_type: '3 BHK', carpet_area: '871 Sq.ft', price: '₹1.78 Cr*' },
          { id: 6, unit_type: '3 BHK', carpet_area: '962 Sq.ft', price: '₹1.95 Cr*' },
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
      unit_type: '2 BHK',
      carpet_area: '650 Sq.ft',
      price: '₹1.35 Cr*',
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
      await savePricingList(plans);
      setMessage('Configuration & Pricing updated successfully in MySQL!');
      if (onRefresh) onRefresh();
    } catch (err) {
      alert('Error updating pricing: ' + err.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-6 sm:p-8 max-w-5xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-5 mb-7">
        <div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
            Configuration &amp; Pricing Table
          </h2>
          <p className="text-sm text-slate-500 mt-1">
            Manage real-time inventory pricing, carpet dimensions, and unit typologies.
          </p>
        </div>
        <button
          type="button"
          onClick={handleAdd}
          className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-bold px-4 py-2.5 rounded-xl shadow-xs transition-all cursor-pointer shrink-0"
        >
          <Plus size={18} />
          <span>Add Price Row</span>
        </button>
      </div>

      {message && (
        <div className="mb-6 p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-sm font-semibold flex items-center gap-2.5">
          <CheckCircle size={18} className="text-emerald-600 shrink-0" />
          <span>{message}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="overflow-x-auto border border-slate-200 rounded-xl shadow-xs">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-600">
              <tr>
                <th className="py-3.5 px-4 font-bold text-xs uppercase tracking-wider">Configuration Type</th>
                <th className="py-3.5 px-4 font-bold text-xs uppercase tracking-wider">Carpet Area</th>
                <th className="py-3.5 px-4 font-bold text-xs uppercase tracking-wider">Price (Display)</th>
                <th className="py-3.5 px-4 font-bold text-xs uppercase tracking-wider text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {plans.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-3 px-4">
                    <input
                      type="text"
                      required
                      value={item.unit_type}
                      onChange={(e) => handleChange(item.id, 'unit_type', e.target.value)}
                      className="w-full px-3 py-2 text-sm font-bold text-slate-900 border border-slate-300 rounded-lg outline-none focus:border-[#e2572b] focus:ring-1 focus:ring-[#e2572b]"
                    />
                  </td>
                  <td className="py-3 px-4">
                    <input
                      type="text"
                      required
                      value={item.carpet_area}
                      onChange={(e) => handleChange(item.id, 'carpet_area', e.target.value)}
                      className="w-full px-3 py-2 text-sm font-medium text-slate-800 border border-slate-300 rounded-lg outline-none focus:border-[#e2572b] focus:ring-1 focus:ring-[#e2572b]"
                    />
                  </td>
                  <td className="py-3 px-4">
                    <input
                      type="text"
                      required
                      value={item.price}
                      onChange={(e) => handleChange(item.id, 'price', e.target.value)}
                      className="w-full px-3 py-2 text-sm font-bold text-[#e2572b] border border-slate-300 rounded-lg outline-none focus:border-[#e2572b] focus:ring-1 focus:ring-[#e2572b]"
                    />
                  </td>
                  <td className="py-3 px-4 text-center">
                    <button
                      type="button"
                      onClick={() => handleDelete(item.id)}
                      className="p-2 text-red-500 hover:bg-red-50 rounded-lg cursor-pointer transition-colors"
                      title="Delete row"
                    >
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="pt-5 border-t border-slate-100 flex justify-end">
          <button
            type="submit"
            disabled={saving}
            className="inline-flex items-center gap-2 bg-[#0f2444] hover:bg-[#1a3867] text-white text-sm font-bold px-6 py-3 rounded-xl shadow-md hover:shadow-lg transition-all cursor-pointer"
          >
            <Save size={16} />
            <span>{saving ? 'Saving...' : 'Save Pricing Changes'}</span>
          </button>
        </div>
      </form>
    </div>
  );
}
