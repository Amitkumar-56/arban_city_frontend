import React, { useState, useEffect } from 'react';
import {
  fetchSpecifications,
  createSpecification,
  updateSpecification,
  deleteSpecification,
} from './api';
import { Plus, Edit2, Trash2, CheckCircle, ListChecks, Save, X } from 'lucide-react';

export default function SpecificationsSettings({ onRefresh }) {
  const [specs, setSpecs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newText, setNewText] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editingText, setEditingText] = useState('');
  const [message, setMessage] = useState('');

  const loadSpecs = async () => {
    try {
      setLoading(true);
      const data = await fetchSpecifications();
      setSpecs(data);
    } catch (err) {
      console.log('Error loading specifications:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadSpecs();
  }, []);

  const handleCreate = async (e) => {
    e.preventDefault();
    if (!newText.trim()) return;
    try {
      await createSpecification({ text: newText.trim(), sort_order: specs.length + 1 });
      setNewText('');
      setMessage('Specification added successfully!');
      loadSpecs();
      if (onRefresh) onRefresh();
      setTimeout(() => setMessage(''), 4000);
    } catch (err) {
      alert('Failed to add specification: ' + err.message);
    }
  };

  const handleUpdate = async (id) => {
    if (!editingText.trim()) return;
    try {
      await updateSpecification(id, { text: editingText.trim() });
      setEditingId(null);
      setMessage('Specification updated successfully!');
      loadSpecs();
      if (onRefresh) onRefresh();
      setTimeout(() => setMessage(''), 4000);
    } catch (err) {
      alert('Failed to update: ' + err.message);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this specification?')) return;
    try {
      await deleteSpecification(id);
      setMessage('Specification deleted successfully!');
      loadSpecs();
      if (onRefresh) onRefresh();
      setTimeout(() => setMessage(''), 4000);
    } catch (err) {
      alert('Failed to delete: ' + err.message);
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-6 sm:p-8 max-w-4xl space-y-7">
      <div className="border-b border-slate-100 pb-5">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl">
            <ListChecks size={26} />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
              Property Specifications Manager
            </h2>
            <p className="text-sm text-slate-500 mt-0.5">
              Manage architectural specifications and project highlights displayed right below Overview (Sector Zero style).
            </p>
          </div>
        </div>
      </div>

      {message && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-sm font-semibold flex items-center gap-2.5">
          <CheckCircle size={18} className="text-emerald-600 shrink-0" />
          <span>{message}</span>
        </div>
      )}

      {/* Add New Specification Form */}
      <form onSubmit={handleCreate} className="p-4 sm:p-5 bg-slate-50 rounded-2xl border border-slate-200 flex flex-col sm:flex-row gap-3 items-center">
        <input
          type="text"
          required
          placeholder="e.g. Sprawled Over 5.5 Acres of Premium Land"
          value={newText}
          onChange={(e) => setNewText(e.target.value)}
          className="flex-1 w-full px-4 py-2.5 bg-white border border-slate-300 rounded-xl text-sm font-medium focus:outline-none focus:border-emerald-600"
        />
        <button
          type="submit"
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm rounded-xl shadow-xs transition-colors shrink-0 cursor-pointer"
        >
          <Plus size={16} />
          <span>Add Highlight</span>
        </button>
      </form>

      {/* Existing List */}
      <div className="space-y-3">
        <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
          Current Specifications ({specs.length})
        </span>

        {loading ? (
          <div className="p-8 text-center text-slate-400 font-semibold text-sm">Loading specifications...</div>
        ) : specs.length === 0 ? (
          <div className="p-8 text-center text-slate-400 font-semibold text-sm">No specifications added yet.</div>
        ) : (
          <div className="border border-slate-200 rounded-2xl divide-y divide-slate-100 overflow-hidden shadow-2xs">
            {specs.map((item, idx) => (
              <div
                key={item.id || idx}
                className="p-4 flex items-center justify-between gap-4 bg-white hover:bg-slate-50/60 transition-colors"
              >
                {editingId === item.id ? (
                  <div className="flex-1 flex items-center gap-2">
                    <input
                      type="text"
                      value={editingText}
                      onChange={(e) => setEditingText(e.target.value)}
                      className="flex-1 px-3 py-1.5 border border-slate-300 rounded-lg text-sm font-medium"
                    />
                    <button
                      type="button"
                      onClick={() => handleUpdate(item.id)}
                      className="p-2 text-emerald-600 hover:bg-emerald-50 rounded-lg cursor-pointer"
                      title="Save"
                    >
                      <Save size={16} />
                    </button>
                    <button
                      type="button"
                      onClick={() => setEditingId(null)}
                      className="p-2 text-slate-400 hover:bg-slate-100 rounded-lg cursor-pointer"
                      title="Cancel"
                    >
                      <X size={16} />
                    </button>
                  </div>
                ) : (
                  <>
                    <span className="text-sm font-bold text-slate-800 flex-1">
                      {idx + 1}. {item.text}
                    </span>
                    <div className="flex items-center gap-1 shrink-0">
                      <button
                        type="button"
                        onClick={() => {
                          setEditingId(item.id);
                          setEditingText(item.text);
                        }}
                        className="p-2 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-lg cursor-pointer"
                        title="Edit"
                      >
                        <Edit2 size={16} />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDelete(item.id)}
                        className="p-2 text-red-500 hover:bg-red-50 rounded-lg cursor-pointer"
                        title="Delete"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
