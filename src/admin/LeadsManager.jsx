import React, { useState, useEffect } from 'react';
import { fetchLeads, deleteLead } from './api';
import { RefreshCw, Trash2, Phone, Mail, Clock, Download, Users } from 'lucide-react';

export default function LeadsManager() {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadLeads = async () => {
    setLoading(true);
    try {
      const data = await fetchLeads();
      setLeads(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadLeads();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this enquiry?')) return;
    try {
      await deleteLead(id);
      setLeads(leads.filter((l) => l.id !== id));
    } catch (err) {
      alert('Error deleting lead: ' + err.message);
    }
  };

  const exportCSV = () => {
    if (leads.length === 0) return alert('No leads to export');
    const headers = 'ID,Full Name,Phone,Email,Source,Created At\n';
    const rows = leads
      .map(
        (l) =>
          `"${l.id}","${l.full_name || l.fullName}","${l.phone}","${l.email || ''}","${l.source || ''}","${l.created_at || ''}"`
      )
      .join('\n');
    const blob = new Blob([headers + rows], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `arban_city_leads_${Date.now()}.csv`;
    a.click();
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-6 sm:p-8 max-w-6xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-5 mb-7">
        <div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2.5">
            <Users size={26} className="text-[#0f2444]" />
            <span>Customer Inquiries &amp; Leads ({leads.length})</span>
          </h2>
          <p className="text-sm text-slate-500 mt-1">
            All customer leads submitted via website enquiry forms, modal popups, and sidebar call-to-actions.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={loadLeads}
            className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl cursor-pointer transition-colors"
          >
            <RefreshCw size={16} className={loading ? 'animate-spin' : ''} />
            <span>Refresh</span>
          </button>
          <button
            type="button"
            onClick={exportCSV}
            className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl cursor-pointer transition-colors shadow-xs"
          >
            <Download size={16} />
            <span>Export CSV</span>
          </button>
        </div>
      </div>

      {loading ? (
        <div className="text-center py-16 text-sm text-slate-500 font-medium">Loading customer leads...</div>
      ) : leads.length === 0 ? (
        <div className="text-center py-16 text-sm text-slate-500 bg-slate-50 rounded-2xl border-2 border-dashed border-slate-200">
          No customer enquiries submitted yet. When visitors submit enquiry forms, they will show up here in real-time.
        </div>
      ) : (
        <div className="overflow-x-auto border border-slate-200 rounded-xl shadow-xs">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-600">
              <tr>
                <th className="py-3.5 px-4 font-bold text-xs uppercase tracking-wider">Prospect Name</th>
                <th className="py-3.5 px-4 font-bold text-xs uppercase tracking-wider">Contact Details</th>
                <th className="py-3.5 px-4 font-bold text-xs uppercase tracking-wider">Enquiry Source</th>
                <th className="py-3.5 px-4 font-bold text-xs uppercase tracking-wider">Submitted On</th>
                <th className="py-3.5 px-4 font-bold text-xs uppercase tracking-wider text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {leads.map((lead) => (
                <tr key={lead.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-3.5 px-4 font-bold text-slate-900 text-base">{lead.full_name || lead.fullName}</td>
                  <td className="py-3.5 px-4 space-y-1">
                    <div className="flex items-center gap-1.5 text-slate-800 font-semibold">
                      <Phone size={14} className="text-[#e2572b]" />
                      <a href={`tel:${lead.phone}`} className="hover:underline">
                        +91 {lead.phone}
                      </a>
                    </div>
                    {lead.email && (
                      <div className="flex items-center gap-1.5 text-slate-500 text-xs">
                        <Mail size={13} className="text-slate-400" />
                        <a href={`mailto:${lead.email}`} className="hover:underline">
                          {lead.email}
                        </a>
                      </div>
                    )}
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="px-3 py-1 rounded-full bg-slate-100 text-xs font-bold text-slate-700 border border-slate-200">
                      {lead.source || 'Website'}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-slate-500 text-xs font-medium">
                    <div className="flex items-center gap-1.5">
                      <Clock size={14} className="text-slate-400" />
                      <span>{new Date(lead.created_at).toLocaleString()}</span>
                    </div>
                  </td>
                  <td className="py-3.5 px-4 text-center">
                    <button
                      type="button"
                      onClick={() => handleDelete(lead.id)}
                      className="p-2 text-red-500 hover:bg-red-50 rounded-lg cursor-pointer transition-colors"
                      title="Delete"
                    >
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
