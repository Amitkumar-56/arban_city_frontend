import { useState } from 'react';
import { updateConstruction } from './api';
import { Save, CheckCircle, Plus, Trash2, HardHat } from 'lucide-react';
import FileUpload from './FileUpload';

const DEFAULT_DESCRIPTION =
  'View real-time {{CURRENT_MONTH_YEAR}} construction status for {{PROJECT_NAME}} in {{LOCATION}}.';
const LEGACY_DEFAULT_DESCRIPTION =
  'Real progress. Real pictures. Your future home is taking shape, one milestone at a time.';

export default function ConstructionSettings({ data, onRefresh }) {
  const [formData, setFormData] = useState({
    title: data?.title ?? '',
    description: data?.description ?? '',
    images: (data?.images || data?.cards || []).map((image, index) => (
      typeof image === 'string'
        ? { img: image, title: `Construction Update ${index + 1}` }
        : { ...image, img: image.img || image.image_url || '' }
    )),
  });
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  const handleAddImage = () => {
    setFormData({
      ...formData,
      images: [...formData.images, { img: '', title: `Construction Update ${formData.images.length + 1}` }],
    });
  };

  const handleImageChange = (index, url) => {
    const updated = [...formData.images];
    updated[index] = { ...updated[index], img: url };
    setFormData({ ...formData, images: updated });
  };

  const handleRemoveImage = (index) => {
    setFormData({
      ...formData,
      images: formData.images.filter((_, i) => i !== index),
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMessage('');
    try {
      await updateConstruction(formData);
      setMessage('Construction status updated successfully in MySQL!');
      if (onRefresh) onRefresh();
    } catch (err) {
      alert('Error updating construction: ' + err.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-6 sm:p-8 max-w-5xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-5 mb-7">
        <div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2.5">
            <HardHat size={26} className="text-[#0f2444]" />
            <span>Construction Status Settings</span>
          </h2>
          <p className="text-sm text-slate-500 mt-1">
            Upload on-ground civil construction progress photographs and development updates.
          </p>
        </div>
        <button
          type="button"
          onClick={handleAddImage}
          className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-bold px-4 py-2.5 rounded-xl shadow-xs transition-all cursor-pointer shrink-0"
        >
          <Plus size={18} />
          <span>Add Site Photo</span>
        </button>
      </div>

      {message && (
        <div className="mb-6 p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-sm font-semibold flex items-center gap-2.5">
          <CheckCircle size={18} className="text-emerald-600 shrink-0" />
          <span>{message}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-bold text-slate-700 mb-1.5">Section Title</label>
          <input
            type="text"
            required
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            className="w-full px-4 py-2.5 sm:py-3 border border-slate-300 rounded-xl text-sm font-medium text-slate-900 focus:outline-none focus:border-[#e2572b] focus:ring-2 focus:ring-[#e2572b]/20 transition-all"
          />
        </div>

        <div>
          <label className="block text-sm font-bold text-slate-700 mb-1.5">Status Description</label>
          <p className="text-xs text-slate-500 mb-2">
            Tokens {'{{CURRENT_MONTH_YEAR}}'}, {'{{PROJECT_NAME}}'}, and {'{{LOCATION}}'} are filled automatically.
          </p>
          <textarea
            rows={3}
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="w-full px-4 py-3 border border-slate-300 rounded-xl text-sm font-medium text-slate-900 leading-relaxed focus:outline-none focus:border-[#e2572b] focus:ring-2 focus:ring-[#e2572b]/20 transition-all"
          />
        </div>

        <div className="border-t border-slate-100 pt-5">
          <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider mb-4">
            Site Progress Photos
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {formData.images.map((imgUrl, index) => (
              <div key={index} className="p-4 sm:p-5 border border-slate-200 rounded-2xl bg-slate-50/70 space-y-3 relative shadow-2xs">
                <div className="flex items-center justify-between text-sm font-bold text-slate-700">
                  <span>Photo #{index + 1}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveImage(index)}
                    className="p-2 text-red-500 hover:bg-red-50 rounded-lg cursor-pointer transition-colors"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>

                <input
                  type="text"
                  value={typeof imgUrl === 'string' ? '' : imgUrl.title || ''}
                  placeholder="Photo caption"
                  onChange={(event) => {
                    const updated = [...formData.images];
                    updated[index] = { ...updated[index], title: event.target.value };
                    setFormData({ ...formData, images: updated });
                  }}
                  className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm"
                />
                <FileUpload
                  category="construction"
                  value={typeof imgUrl === 'string' ? imgUrl : imgUrl.img || ''}
                  onChange={(url) => handleImageChange(index, url)}
                  alt={typeof imgUrl === 'object' ? imgUrl.alt : ''}
                  onAltChange={(val) => {
                    const updated = [...formData.images];
                    updated[index] = { ...updated[index], alt: val };
                    setFormData({ ...formData, images: updated });
                  }}
                  title={typeof imgUrl === 'object' ? imgUrl.title : ''}
                  onTitleChange={(val) => {
                    const updated = [...formData.images];
                    updated[index] = { ...updated[index], title: val };
                    setFormData({ ...formData, images: updated });
                  }}
                  loading={typeof imgUrl === 'object' ? imgUrl.loading : 'lazy'}
                  onLoadingChange={(val) => {
                    const updated = [...formData.images];
                    updated[index] = { ...updated[index], loading: val };
                    setFormData({ ...formData, images: updated });
                  }}
                  decoding={typeof imgUrl === 'object' ? imgUrl.decoding : 'async'}
                  onDecodingChange={(val) => {
                    const updated = [...formData.images];
                    updated[index] = { ...updated[index], decoding: val };
                    setFormData({ ...formData, images: updated });
                  }}
                  width={typeof imgUrl === 'object' ? imgUrl.width : ''}
                  onWidthChange={(val) => {
                    const updated = [...formData.images];
                    updated[index] = { ...updated[index], width: val };
                    setFormData({ ...formData, images: updated });
                  }}
                  height={typeof imgUrl === 'object' ? imgUrl.height : ''}
                  onHeightChange={(val) => {
                    const updated = [...formData.images];
                    updated[index] = { ...updated[index], height: val };
                    setFormData({ ...formData, images: updated });
                  }}
                />
              </div>
            ))}
          </div>
        </div>

        <div className="pt-5 border-t border-slate-100 flex justify-end">
          <button
            type="submit"
            disabled={saving}
            className="inline-flex items-center gap-2 bg-[#0f2444] hover:bg-[#1a3867] text-white text-sm font-bold px-6 py-3 rounded-xl shadow-md hover:shadow-lg transition-all cursor-pointer"
          >
            <Save size={16} />
            <span>{saving ? 'Saving...' : 'Save Construction Status'}</span>
          </button>
        </div>
      </form>
    </div>
  );
}
