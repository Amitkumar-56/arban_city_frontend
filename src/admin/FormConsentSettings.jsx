import React, { useState, useEffect } from 'react';
import { FileText, Save, CheckCircle2, AlertCircle, Sparkles, Bold, Italic, Link2, Code } from 'lucide-react';
import { fetchPrivacy, updatePrivacy } from './api';

export default function FormConsentSettings({ onRefresh }) {
  const [privacyPayload, setPrivacyPayload] = useState({});
  const [consentHtml, setConsentHtml] = useState(
    'I Consent to The Processing of Provided Data According To <a href="#privacy-policy" target="_blank" rel="noopener noreferrer" class="underline font-semibold text-[#F26635]">Privacy Policy &amp; Terms</a>, I Authorize Digipace Consulting (OPC) Private Limited and its representatives to Call, SMS, Email or WhatsApp Me About Its Products and Offers. This Consent Overrides Any Registration For DNC/NDNC.'
  );
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchPrivacy()
      .then((res) => {
        if (res) {
          setPrivacyPayload(res);
          if (res.consent_text) {
            setConsentHtml(res.consent_text);
          }
        }
      })
      .catch((err) => {
        console.error('Failed to load consent text:', err);
      });
  }, []);

  const handleInsertTag = (tag) => {
    if (tag === 'bold') {
      setConsentHtml((prev) => `${prev} <strong>Important</strong>`);
    } else if (tag === 'link') {
      setConsentHtml((prev) => `${prev} <a href="#privacy-policy" target="_blank" class="underline font-semibold">Privacy Policy</a>`);
    } else if (tag === 'italic') {
      setConsentHtml((prev) => `${prev} <em>note</em>`);
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    setSuccess(false);
    setError(null);

    try {
      await updatePrivacy({
        ...privacyPayload,
        consent_text: consentHtml,
      });
      setSuccess(true);
      if (onRefresh) onRefresh();
      setTimeout(() => setSuccess(false), 4000);
    } catch (err) {
      setError('Failed to update consent text: ' + err.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6 max-w-5xl">
      {/* Top Header Card */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-6 sm:p-7 shadow-xs">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-xl bg-orange-50 text-[#F26635] flex items-center justify-center shrink-0">
              <FileText size={24} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                  Form Consent &amp; Disclaimer Editor
                </h1>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 uppercase tracking-wide">
                  Live on All Forms
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                Customize the legal consent disclaimer text displayed below every lead and enquiry form on the website.
              </p>
            </div>
          </div>
        </div>
      </div>

      {success && (
        <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-sm font-semibold flex items-center gap-2.5">
          <CheckCircle2 size={18} className="shrink-0 text-emerald-600" />
          <span>Form Consent text updated successfully! All forms on the site are now live with this text.</span>
        </div>
      )}

      {error && (
        <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-800 text-sm font-semibold flex items-center gap-2.5">
          <AlertCircle size={18} className="shrink-0 text-red-600" />
          <span>{error}</span>
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-6">
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-5">
          <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-100">
            <div>
              <h3 className="text-base font-bold text-slate-900">
                Consent Editor
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Supports full HTML formatting, links, bold, company name, and policy anchors.
              </p>
            </div>

            {/* Quick helper toolbar */}
            <div className="flex items-center gap-1.5 bg-slate-50 p-1.5 rounded-xl border border-slate-200">
              <button
                type="button"
                onClick={() => handleInsertTag('bold')}
                className="px-2.5 py-1 text-xs font-bold text-slate-700 hover:bg-white rounded-lg transition-colors flex items-center gap-1 border border-transparent hover:border-slate-200 cursor-pointer"
                title="Insert Bold Text"
              >
                <Bold size={13} />
                <span>Bold</span>
              </button>
              <button
                type="button"
                onClick={() => handleInsertTag('italic')}
                className="px-2.5 py-1 text-xs font-bold text-slate-700 hover:bg-white rounded-lg transition-colors flex items-center gap-1 border border-transparent hover:border-slate-200 cursor-pointer"
                title="Insert Italic Text"
              >
                <Italic size={13} />
                <span>Italic</span>
              </button>
              <button
                type="button"
                onClick={() => handleInsertTag('link')}
                className="px-2.5 py-1 text-xs font-bold text-slate-700 hover:bg-white rounded-lg transition-colors flex items-center gap-1 border border-transparent hover:border-slate-200 cursor-pointer"
                title="Insert Privacy Policy Link"
              >
                <Link2 size={13} />
                <span>Policy Link</span>
              </button>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              Consent HTML Content
            </label>
            <textarea
              rows={5}
              required
              value={consentHtml}
              onChange={(e) => setConsentHtml(e.target.value)}
              placeholder="I Consent to The Processing of Provided Data..."
              className="w-full px-4 py-3 text-sm bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:bg-white focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all font-mono leading-relaxed"
            />
          </div>

          {/* Live Preview Box */}
          <div className="pt-2">
            <div className="text-xs font-bold text-slate-600 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <Sparkles size={14} className="text-[#F26635]" />
              <span>Live Form Simulation (Exactly How Users See It)</span>
            </div>
            <div className="bg-[#FAFBFD] p-4 sm:p-5 rounded-xl border border-slate-200 flex items-start gap-2.5">
              <input
                type="checkbox"
                defaultChecked
                readOnly
                className="mt-0.5 shrink-0 accent-[#F26635] w-3.5 h-3.5 cursor-pointer"
              />
              <div
                className="text-[11px] sm:text-xs text-slate-600 leading-relaxed font-normal [&_a]:text-[#F26635] [&_a]:underline [&_a]:font-semibold"
                dangerouslySetInnerHTML={{ __html: consentHtml }}
              />
            </div>
          </div>
        </div>

        {/* Action Button */}
        <div className="flex justify-end pt-2">
          <button
            type="submit"
            disabled={saving}
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#F26635] hover:bg-[#d9542b] text-white font-bold text-sm rounded-xl transition-all shadow-md hover:shadow-lg disabled:opacity-50 cursor-pointer"
          >
            <Save size={16} />
            <span>{saving ? 'Saving...' : 'Save Consent Text'}</span>
          </button>
        </div>
      </form>
    </div>
  );
}

