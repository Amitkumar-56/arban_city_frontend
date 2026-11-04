import React, { useState, useEffect } from 'react';
import { ShieldCheck, Save, CheckCircle2, AlertCircle, FileText, ExternalLink } from 'lucide-react';
import { fetchPrivacy, updatePrivacy } from './api';

export default function PrivacyPolicySettings({ onRefresh }) {
  const [title, setTitle] = useState('Privacy Policy & Terms');
  const [content, setContent] = useState('');
  const [consentText, setConsentText] = useState(
    'I Consent to The Processing of Provided Data According To <a href="#privacy-policy" target="_blank" rel="noopener noreferrer" class="underline font-semibold text-[#F26635]">Privacy Policy &amp; Terms</a>, I Authorize Digipace Consulting (OPC) Private Limited and its representatives to Call, SMS, Email or WhatsApp Me About Its Products and Offers. This Consent Overrides Any Registration For DNC/NDNC.'
  );

  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchPrivacy()
      .then((data) => {
        if (data) {
          if (data.title) setTitle(data.title);
          if (data.consent_text) setConsentText(data.consent_text);

          if (data.content && typeof data.content === 'string') {
            setContent(data.content);
          } else if (Array.isArray(data.sections) && data.sections.length > 0) {
            // Convert older clauses into continuous plain text
            const text = data.sections
              .map((s) => (s.heading ? `${s.heading}\n${s.body || ''}` : s.body || ''))
              .join('\n\n');
            setContent(text);
          } else if (data.overview) {
            setContent(data.overview);
          }
        }
      })
      .catch(() => {});
  }, []);

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    setSuccess(false);
    setError(null);

    try {
      const payload = {
        title,
        content,
        // Also save empty sections array so legacy sections don't override
        sections: [],
      };
      if (consentText) {
        payload.consent_text = consentText;
      }
      await updatePrivacy(payload);
      setSuccess(true);
      if (onRefresh) onRefresh();
      setTimeout(() => setSuccess(false), 4000);
    } catch (err) {
      setError(err.message || 'Failed to save privacy policy');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6 max-w-5xl">
      {/* Header Info */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-blue-50 text-blue-700 rounded-xl">
              <ShieldCheck size={24} />
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-900">Privacy Policy Manager</h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                Directly write or paste your full Privacy Policy text without any separate headings or sections
              </p>
            </div>
          </div>
          <a
            href="#privacy-policy"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 bg-blue-50 hover:bg-blue-100 px-3.5 py-2 rounded-xl transition-colors shrink-0"
          >
            <span>View Live Page</span>
            <ExternalLink size={14} />
          </a>
        </div>
      </div>

      {success && (
        <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-sm font-semibold flex items-center gap-2.5">
          <CheckCircle2 size={18} className="shrink-0 text-emerald-600" />
          <span>Privacy policy updated successfully! Changes are live on the website.</span>
        </div>
      )}

      {error && (
        <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-800 text-sm font-semibold flex items-center gap-2.5">
          <AlertCircle size={18} className="shrink-0 text-red-600" />
          <span>{error}</span>
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-6">
        {/* Full Document Plain/HTML Text Editor */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <h3 className="text-base font-bold text-slate-900">Privacy Policy Document Text</h3>
              <p className="text-xs text-slate-500">
                Pura text yahan direct likhein ya paste karein. Koi separate heading ya clauses banane ki zaroorat nahi hai.
              </p>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              Page Main Title
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Privacy Policy & Terms"
              className="w-full px-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all font-medium"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              Privacy Policy Full Content (Direct Text / Paragraphs)
            </label>
            <textarea
              rows={16}
              required
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Yahan apna pura privacy policy ka text likhein ya paste karein..."
              className="w-full px-4 py-3 text-sm bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all font-sans leading-relaxed whitespace-pre-wrap"
            />
            <p className="text-[11px] text-slate-400 mt-1.5">
              Line breaks (Enter) automatic new paragraph banenge. Aap direct raw text ya HTML dono likh sakte hain.
            </p>
          </div>
        </div>

        {/* Save Bar */}
        <div className="sticky bottom-4 z-20 bg-white/95 backdrop-blur-md p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-xl flex items-center justify-between">
          <p className="text-xs text-slate-500 hidden sm:block">
            Save karne par ye turant bina kisi heading ke live website par update ho jayega.
          </p>
          <button
            type="submit"
            disabled={saving}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#111D46] hover:bg-[#1C2C5E] disabled:opacity-50 text-white font-bold text-sm px-7 py-3 rounded-xl shadow-md transition-all cursor-pointer"
          >
            <Save size={18} />
            <span>{saving ? 'Saving...' : 'Save Privacy Policy'}</span>
          </button>
        </div>
      </form>
    </div>
  );
}
