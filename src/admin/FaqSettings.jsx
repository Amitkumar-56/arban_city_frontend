import React, { useState } from 'react';
import { saveFaqsList } from './api';
import { Save, CheckCircle, Plus, Trash2, HelpCircle } from 'lucide-react';

export default function FaqSettings({ data, onRefresh }) {
  const initialFaqs = (data || []).map((f, idx) => ({
    id: f.id || idx + 1,
    question: f.question || f.q || '',
    answer: f.answer || f.a || '',
  }));

  const [faqs, setFaqs] = useState(
    initialFaqs.length > 0
      ? initialFaqs
      : [
          {
            id: 1,
            question: 'What is the possession timeline for Arban City?',
            answer:
              'The expected possession date for Arban City Sector 0 is scheduled for December 2028* as per MahaRERA registration.',
          },
          {
            id: 2,
            question: 'How far is Arban City from Airoli Railway Station?',
            answer: 'The project is conveniently located just 7-10 minutes from Airoli Railway Station.',
          },
          {
            id: 3,
            question: 'Are there schools and hospitals nearby?',
            answer: 'Yes, leading hospitals and schools are within a 2-3 km radius.',
          },
          {
            id: 4,
            question: 'Does Arban City offer covered parking?',
            answer: 'Yes, dedicated covered parking is provided for residents.',
          },
          {
            id: 5,
            question: 'What configurations are available in the project?',
            answer: 'Arban City offers 1, 2 and 3 BHK residential apartments.',
          },
        ]
  );
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  const handleChange = (id, field, value) => {
    setFaqs((prev) =>
      prev.map((faq) => (faq.id === id ? { ...faq, [field]: value } : faq))
    );
  };

  const handleAdd = () => {
    const newFaq = {
      id: Date.now(),
      question: 'New Question',
      answer: 'Answer description...',
    };
    setFaqs([...faqs, newFaq]);
  };

  const handleDelete = (id) => {
    setFaqs(faqs.filter((f) => f.id !== id));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMessage('');
    try {
      await saveFaqsList(faqs);
      setMessage('Frequently Asked Questions updated successfully in MySQL!');
      if (onRefresh) onRefresh();
    } catch (err) {
      alert('Error updating FAQs: ' + err.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-6 sm:p-8 max-w-5xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-5 mb-7">
        <div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2.5">
            <HelpCircle size={26} className="text-[#0f2444]" />
            <span>Frequently Asked Questions Manager</span>
          </h2>
          <p className="text-sm text-slate-500 mt-1">
            Add, edit, or remove customer buyer questions and detailed developer answers.
          </p>
        </div>
        <button
          type="button"
          onClick={handleAdd}
          className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-bold px-4 py-2.5 rounded-xl shadow-xs transition-all cursor-pointer shrink-0"
        >
          <Plus size={18} />
          <span>Add Question</span>
        </button>
      </div>

      {message && (
        <div className="mb-6 p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-sm font-semibold flex items-center gap-2.5">
          <CheckCircle size={18} className="text-emerald-600 shrink-0" />
          <span>{message}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-5">
          {faqs.map((faq) => (
            <div
              key={faq.id}
              className="p-5 border border-slate-200 rounded-2xl space-y-3 bg-slate-50/70 relative shadow-2xs"
            >
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-slate-600 uppercase tracking-wider">Question</label>
                <button
                  type="button"
                  onClick={() => handleDelete(faq.id)}
                  className="px-2.5 py-1 text-red-500 hover:bg-red-50 rounded-lg cursor-pointer transition-colors"
                >
                  <Trash2 size={18} />
                </button>
              </div>

              <input
                type="text"
                required
                value={faq.question}
                onChange={(e) => handleChange(faq.id, 'question', e.target.value)}
                className="w-full px-4 py-2.5 text-sm font-bold text-slate-900 border border-slate-300 rounded-xl bg-white outline-none focus:border-[#e2572b]"
              />

              <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mt-2">Answer</label>
              <textarea
                rows={3}
                required
                value={faq.answer}
                onChange={(e) => handleChange(faq.id, 'answer', e.target.value)}
                className="w-full px-4 py-2.5 text-sm font-medium text-slate-800 leading-relaxed border border-slate-300 rounded-xl bg-white outline-none focus:border-[#e2572b]"
              />
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
            <span>{saving ? 'Saving...' : 'Save FAQs'}</span>
          </button>
        </div>
      </form>
    </div>
  );
}
