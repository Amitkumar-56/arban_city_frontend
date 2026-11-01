import React, { useState } from 'react';
import { savePricingList } from './api';
import { Save, CheckCircle, Plus, Trash2, Building2 } from 'lucide-react';

const DEFAULT_TOWERS = [
  {
    id: 'ab',
    name: 'Wing A & B',
    subtitle: 'Horizon',
    plans: [
      { type: '1 BHK', carpet: '413', price: '₹89 Lacs*', title: '1 BHK Floor Plan', details: '413 sq.ft Carpet Area · ₹89 Lacs*' },
      { type: '1 BHK', carpet: '435-513', price: '₹91 Lacs*', title: '1 BHK Luxury Floor Plan', details: '435-513 sq.ft Carpet Area · ₹91 Lacs*' },
      { type: '2 BHK', carpet: '625-725', price: '₹1.35 Cr*', title: '2 BHK Floor Plan', details: '625-725 sq.ft Carpet Area · ₹1.35 Cr*' },
    ],
  },
  {
    id: 'c',
    name: 'Wing C',
    subtitle: 'Oasis',
    plans: [
      { type: '2 BHK', carpet: '650-710', price: '₹1.38 Cr*', title: '2 BHK Floor Plan', details: '650-710 sq.ft Carpet Area · ₹1.38 Cr*' },
      { type: '3 BHK', carpet: '890-950', price: '₹1.88 Cr*', title: '3 BHK Floor Plan', details: '890-950 sq.ft Carpet Area · ₹1.88 Cr*' },
    ],
  },
  {
    id: 'd',
    name: 'Wing D',
    subtitle: '',
    plans: [
      { type: '2 BHK', carpet: '640-700', price: '₹1.36 Cr*', title: '2 BHK Floor Plan', details: '640-700 sq.ft Carpet Area · ₹1.36 Cr*' },
      { type: '3 BHK', carpet: '920-990', price: '₹1.92 Cr*', title: '3 BHK Floor Plan', details: '920-990 sq.ft Carpet Area · ₹1.92 Cr*' },
    ],
  },
  {
    id: 'e',
    name: 'Wing E',
    subtitle: 'Summit',
    plans: [
      { type: '1 BHK', carpet: '425-480', price: '₹90 Lacs*', title: '1 BHK Floor Plan', details: '425-480 sq.ft Carpet Area · ₹90 Lacs*' },
      { type: '2 BHK', carpet: '660-740', price: '₹1.40 Cr*', title: '2 BHK Floor Plan', details: '660-740 sq.ft Carpet Area · ₹1.40 Cr*' },
    ],
  },
  {
    id: 'mn',
    name: 'Wing M & N',
    subtitle: 'Glade',
    plans: [
      { type: '2 BHK', carpet: '675-730', price: '₹1.42 Cr*', title: '2 BHK Floor Plan', details: '675-730 sq.ft Carpet Area · ₹1.42 Cr*' },
      { type: '3 BHK', carpet: '950-1020', price: '₹1.98 Cr*', title: '3 BHK Floor Plan', details: '950-1020 sq.ft Carpet Area · ₹1.98 Cr*' },
    ],
  },
  {
    id: 'kl',
    name: 'Wing K & L',
    subtitle: 'Delta',
    plans: [
      { type: '3 BHK', carpet: '980-1060', price: '₹2.05 Cr*', title: '3 BHK Floor Plan', details: '980-1060 sq.ft Carpet Area · ₹2.05 Cr*' },
      { type: '4 BHK', carpet: '1350-1450', price: '₹2.95 Cr*', title: '4 BHK Floor Plan', details: '1350-1450 sq.ft Carpet Area · ₹2.95 Cr*' },
    ],
  },
];

export default function PricingSettings({ data, onRefresh }) {
  const rawItems = Array.isArray(data) ? data : (data?.items || []);
  const initialMode = (data && !Array.isArray(data) && data.pricing_mode) ? data.pricing_mode : 'multiple';
  const initialTowers = (data && !Array.isArray(data) && Array.isArray(data.towers) && data.towers.length > 0)
    ? data.towers
    : DEFAULT_TOWERS;

  const [pricingMode, setPricingMode] = useState(initialMode);
  const [towers, setTowers] = useState(initialTowers);
  const [activeTowerIdx, setActiveTowerIdx] = useState(0);

  const [singlePlans, setSinglePlans] = useState(
    rawItems.length > 0
      ? rawItems.map((p, idx) => ({
          id: p.id || idx + 1,
          unit_type: p.unit_type || p.type || '1 BHK',
          carpet_area: p.carpet_area || p.carpet || '433 Sq.ft',
          price: p.price || '₹89 Lakhs*',
        }))
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

  // Handle single tower plans
  const handleSingleChange = (id, field, value) => {
    setSinglePlans((prev) =>
      prev.map((item) => (item.id === id ? { ...item, [field]: value } : item))
    );
  };

  const handleAddSingleRow = () => {
    setSinglePlans([
      ...singlePlans,
      { id: Date.now(), unit_type: '2 BHK', carpet_area: '650 Sq.ft', price: '₹1.35 Cr*' },
    ]);
  };

  const handleDeleteSingleRow = (id) => {
    setSinglePlans(singlePlans.filter((p) => p.id !== id));
  };

  // Handle Multiple Tower Wings
  const handleTowerInfoChange = (idx, field, value) => {
    const updated = [...towers];
    updated[idx] = { ...updated[idx], [field]: value };
    setTowers(updated);
  };

  const handleAddTower = () => {
    const newTower = {
      id: `wing_${Date.now()}`,
      name: `Wing ${String.fromCharCode(65 + towers.length)}`,
      subtitle: 'New Wing',
      plans: [
        { type: '1 BHK', carpet: '420', price: '₹89 Lacs*', title: '1 BHK Floor Plan', details: '420 sq.ft Carpet Area · ₹89 Lacs*' },
        { type: '2 BHK', carpet: '650', price: '₹1.35 Cr*', title: '2 BHK Floor Plan', details: '650 sq.ft Carpet Area · ₹1.35 Cr*' },
      ],
    };
    setTowers([...towers, newTower]);
    setActiveTowerIdx(towers.length);
  };

  const handleDeleteTower = (idx) => {
    if (towers.length <= 1) {
      alert('Kam se kam 1 tower/wing hona zaroori hai.');
      return;
    }
    const filtered = towers.filter((_, i) => i !== idx);
    setTowers(filtered);
    setActiveTowerIdx(0);
  };

  // Tower specific plan change
  const handleTowerPlanChange = (tIdx, pIdx, field, value) => {
    const updated = [...towers];
    const towerPlans = [...updated[tIdx].plans];
    const target = { ...towerPlans[pIdx], [field]: value };
    target.title = `${target.type || 'Unit'} Floor Plan`;
    target.details = `${target.carpet || ''} sq.ft Carpet Area · ${target.price || ''}`;
    towerPlans[pIdx] = target;
    updated[tIdx] = { ...updated[tIdx], plans: towerPlans };
    setTowers(updated);
  };

  const handleAddTowerPlan = (tIdx) => {
    const updated = [...towers];
    const newP = {
      type: '2 BHK',
      carpet: '650',
      price: '₹1.35 Cr*',
      title: '2 BHK Floor Plan',
      details: '650 sq.ft Carpet Area · ₹1.35 Cr*',
    };
    updated[tIdx] = { ...updated[tIdx], plans: [...updated[tIdx].plans, newP] };
    setTowers(updated);
  };

  const handleDeleteTowerPlan = (tIdx, pIdx) => {
    const updated = [...towers];
    updated[tIdx] = {
      ...updated[tIdx],
      plans: updated[tIdx].plans.filter((_, i) => i !== pIdx),
    };
    setTowers(updated);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMessage('');
    try {
      const payload = {
        pricing_mode: pricingMode,
        items: singlePlans,
        towers: towers,
      };
      await savePricingList(payload);
      setMessage('Configuration, Pricing & Wings successfully updated in MySQL!');
      if (onRefresh) onRefresh();
    } catch (err) {
      alert('Error updating pricing: ' + err.message);
    } finally {
      setSaving(false);
    }
  };

  const currentActiveTower = towers[activeTowerIdx] || towers[0];

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-6 sm:p-8 max-w-5xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-5 mb-7">
        <div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
            Configuration &amp; Pricing Manager
          </h2>
          <p className="text-sm text-slate-500 mt-1">
            Manage real-time inventory pricing, carpet dimensions, Wings/Towers, and layout display modes.
          </p>
        </div>
      </div>

      {message && (
        <div className="mb-6 p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-sm font-semibold flex items-center gap-2.5">
          <CheckCircle size={18} className="text-emerald-600 shrink-0" />
          <span>{message}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-7">
        {/* Layout Display Mode Selector */}
        <div className="p-5 bg-slate-50 border border-slate-200 rounded-2xl">
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
            Default Website Display Mode
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => setPricingMode('multiple')}
              className={`p-4 rounded-xl border text-left transition-all cursor-pointer ${
                pricingMode === 'multiple'
                  ? 'border-[#3D3025] bg-white ring-2 ring-[#3D3025] shadow-sm'
                  : 'border-slate-200 bg-white/70 hover:bg-white text-slate-600'
              }`}
            >
              <div className="font-bold text-sm text-slate-900 flex items-center gap-2">
                <Building2 size={16} className="text-[#3D3025]" />
                <span>Multiple Towers / Wings</span>
              </div>
              <p className="text-xs text-slate-500 mt-1">
                Show wing selector cards (Wing A &amp; B, Wing C, etc.) with specific layouts for each wing.
              </p>
            </button>

            <button
              type="button"
              onClick={() => setPricingMode('single')}
              className={`p-4 rounded-xl border text-left transition-all cursor-pointer ${
                pricingMode === 'single'
                  ? 'border-[#3D3025] bg-white ring-2 ring-[#3D3025] shadow-sm'
                  : 'border-slate-200 bg-white/70 hover:bg-white text-slate-600'
              }`}
            >
              <div className="font-bold text-sm text-slate-900 flex items-center gap-2">
                <Building2 size={16} className="text-[#3D3025]" />
                <span>Single Tower Overview</span>
              </div>
              <p className="text-xs text-slate-500 mt-1">
                Hide wing selector cards and show one direct master table for the entire project.
              </p>
            </button>
          </div>
        </div>

        {/* Dynamic Multiple Towers Section */}
        <div className="p-5 bg-slate-50 border border-slate-200 rounded-2xl space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 pb-3">
            <div>
              <h3 className="font-extrabold text-sm text-slate-900 uppercase tracking-wider">
                Wings &amp; Towers Configuration
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Add wings and configure pricing rows specifically for each wing.
              </p>
            </div>
            <button
              type="button"
              onClick={handleAddTower}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 bg-emerald-100 hover:bg-emerald-200 px-3 py-2 rounded-lg cursor-pointer"
            >
              <Plus size={15} />
              <span>Add New Wing</span>
            </button>
          </div>

          {/* Tower Selector Pills */}
          <div className="flex flex-wrap gap-2 pt-1">
            {towers.map((tw, idx) => (
              <button
                key={tw.id || idx}
                type="button"
                onClick={() => setActiveTowerIdx(idx)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-bold cursor-pointer transition-colors ${
                  activeTowerIdx === idx
                    ? 'bg-[#3D3025] text-white shadow-xs'
                    : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100'
                }`}
              >
                {tw.name}
              </button>
            ))}
          </div>

          {/* Active Tower Edit Area */}
          {currentActiveTower && (
            <div className="bg-white p-4 rounded-xl border border-slate-200 space-y-4 mt-3">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">
                    Wing Name (e.g. Wing A &amp; B)
                  </label>
                  <input
                    type="text"
                    value={currentActiveTower.name || ''}
                    onChange={(e) => handleTowerInfoChange(activeTowerIdx, 'name', e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs font-bold text-slate-900"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">
                    Subtitle (e.g. Horizon, Oasis)
                  </label>
                  <input
                    type="text"
                    value={currentActiveTower.subtitle || ''}
                    onChange={(e) => handleTowerInfoChange(activeTowerIdx, 'subtitle', e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs font-medium text-slate-700"
                  />
                </div>
                <div className="flex items-end">
                  <button
                    type="button"
                    onClick={() => handleDeleteTower(activeTowerIdx)}
                    className="inline-flex items-center gap-1.5 text-xs text-red-600 hover:text-red-700 font-bold py-2 cursor-pointer"
                  >
                    <Trash2 size={15} />
                    <span>Delete This Wing</span>
                  </button>
                </div>
              </div>

              {/* Wing Pricing Rows Table */}
              <div className="border border-slate-200 rounded-xl overflow-hidden mt-3">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 text-slate-600 border-b border-slate-200">
                    <tr>
                      <th className="py-2.5 px-3 font-bold uppercase">Type</th>
                      <th className="py-2.5 px-3 font-bold uppercase">Carpet Area (sq.ft)</th>
                      <th className="py-2.5 px-3 font-bold uppercase">Price</th>
                      <th className="py-2.5 px-3 font-bold uppercase text-center">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {(currentActiveTower.plans || []).map((pl, pIdx) => (
                      <tr key={pIdx}>
                        <td className="p-2.5">
                          <input
                            type="text"
                            value={pl.type}
                            onChange={(e) => handleTowerPlanChange(activeTowerIdx, pIdx, 'type', e.target.value)}
                            className="w-full px-2.5 py-1.5 border border-slate-200 rounded text-xs font-bold"
                          />
                        </td>
                        <td className="p-2.5">
                          <input
                            type="text"
                            value={pl.carpet}
                            onChange={(e) => handleTowerPlanChange(activeTowerIdx, pIdx, 'carpet', e.target.value)}
                            className="w-full px-2.5 py-1.5 border border-slate-200 rounded text-xs"
                          />
                        </td>
                        <td className="p-2.5">
                          <input
                            type="text"
                            value={pl.price}
                            onChange={(e) => handleTowerPlanChange(activeTowerIdx, pIdx, 'price', e.target.value)}
                            className="w-full px-2.5 py-1.5 border border-slate-200 rounded text-xs font-bold text-[#e2572b]"
                          />
                        </td>
                        <td className="p-2.5 text-center">
                          <button
                            type="button"
                            onClick={() => handleDeleteTowerPlan(activeTowerIdx, pIdx)}
                            className="text-red-500 hover:text-red-700 p-1 cursor-pointer"
                          >
                            <Trash2 size={15} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <button
                type="button"
                onClick={() => handleAddTowerPlan(activeTowerIdx)}
                className="inline-flex items-center gap-1.5 text-xs text-emerald-600 hover:text-emerald-700 font-bold cursor-pointer pt-1"
              >
                <Plus size={15} />
                <span>Add Row to {currentActiveTower.name}</span>
              </button>
            </div>
          )}
        </div>

        {/* Master Single Tower Table Section */}
        <div className="p-5 bg-slate-50 border border-slate-200 rounded-2xl space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-extrabold text-sm text-slate-900 uppercase tracking-wider">
                Single Tower / Master Pricing Table
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Used when layout mode is set to "Single tower" or as fallback overview.
              </p>
            </div>
            <button
              type="button"
              onClick={handleAddSingleRow}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 bg-emerald-100 hover:bg-emerald-200 px-3 py-2 rounded-lg cursor-pointer"
            >
              <Plus size={15} />
              <span>Add Master Row</span>
            </button>
          </div>

          <div className="overflow-x-auto border border-slate-200 rounded-xl shadow-2xs bg-white">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-600">
                <tr>
                  <th className="py-2.5 px-3 font-bold uppercase">Configuration Type</th>
                  <th className="py-2.5 px-3 font-bold uppercase">Carpet Area</th>
                  <th className="py-2.5 px-3 font-bold uppercase">Price (Display)</th>
                  <th className="py-2.5 px-3 font-bold uppercase text-center">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {singlePlans.map((plan) => (
                  <tr key={plan.id}>
                    <td className="p-2.5">
                      <input
                        type="text"
                        value={plan.unit_type}
                        onChange={(e) => handleSingleChange(plan.id, 'unit_type', e.target.value)}
                        className="w-full px-2.5 py-1.5 border border-slate-200 rounded text-xs font-bold"
                      />
                    </td>
                    <td className="p-2.5">
                      <input
                        type="text"
                        value={plan.carpet_area}
                        onChange={(e) => handleSingleChange(plan.id, 'carpet_area', e.target.value)}
                        className="w-full px-2.5 py-1.5 border border-slate-200 rounded text-xs"
                      />
                    </td>
                    <td className="p-2.5">
                      <input
                        type="text"
                        value={plan.price}
                        onChange={(e) => handleSingleChange(plan.id, 'price', e.target.value)}
                        className="w-full px-2.5 py-1.5 border border-slate-200 rounded text-xs font-bold text-[#e2572b]"
                      />
                    </td>
                    <td className="p-2.5 text-center">
                      <button
                        type="button"
                        onClick={() => handleDeleteSingleRow(plan.id)}
                        className="text-red-500 hover:text-red-700 p-1 cursor-pointer"
                      >
                        <Trash2 size={15} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="flex justify-end pt-4 border-t border-slate-200">
          <button
            type="submit"
            disabled={saving}
            className="inline-flex items-center gap-2 bg-[#3D3025] hover:bg-[#251D16] text-white text-sm font-bold px-6 py-3 rounded-xl shadow-md transition-all cursor-pointer disabled:opacity-50"
          >
            <Save size={18} />
            <span>{saving ? 'Saving Changes...' : 'Save All Pricing & Towers'}</span>
          </button>
        </div>
      </form>
    </div>
  );
}
