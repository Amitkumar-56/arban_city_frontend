import React, { useState } from 'react';
import { updateVideo } from './api';
import { Save, CheckCircle, Video as VideoIcon } from 'lucide-react';
import FileUpload from './FileUpload';

export default function VideoSettings({ data, onRefresh }) {
  const [formData, setFormData] = useState({
    title: data?.title || 'Walkthrough Video',
    description:
      data?.description ||
      'Take a virtual tour of Arban City and experience the spaces, amenities and lifestyle it has to offer.',
    video_url: data?.video_url || '',
    video_thumbnail: data?.video_thumbnail || '',
  });
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMessage('');
    try {
      await updateVideo(formData);
      setMessage('Walkthrough Video settings updated successfully in MySQL!');
      if (onRefresh) onRefresh();
    } catch (err) {
      alert('Error updating video: ' + err.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-6 sm:p-8 max-w-4xl">
      <div className="border-b border-slate-100 pb-5 mb-7">
        <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2.5">
          <VideoIcon size={26} className="text-[#0f2444]" />
          <span>Walkthrough Video Settings</span>
        </h2>
        <p className="text-sm text-slate-500 mt-1">
          Upload your project walkthrough video and poster thumbnail directly from your computer.
        </p>
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
          <label className="block text-sm font-bold text-slate-700 mb-1.5">Section Description</label>
          <textarea
            rows={3}
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="w-full px-4 py-3 border border-slate-300 rounded-xl text-sm font-medium text-slate-900 leading-relaxed focus:outline-none focus:border-[#e2572b] focus:ring-2 focus:ring-[#e2572b]/20 transition-all"
          />
        </div>

        <div className="space-y-5">
          <div>
            <FileUpload
              label="Upload Walkthrough Video File (.mp4, .webm, .mov)"
              accept="video/*"
              isVideo={true}
              value={formData.video_url || ''}
              onChange={(url) => setFormData({ ...formData, video_url: url })}
            />
          </div>

          <div>
            <FileUpload
              label="Upload Video Poster Thumbnail (Optional)"
              accept="image/*"
              value={formData.video_thumbnail || ''}
              onChange={(url) => setFormData({ ...formData, video_thumbnail: url })}
            />
          </div>
        </div>

        <div className="pt-5 border-t border-slate-100 flex justify-end">
          <button
            type="submit"
            disabled={saving}
            className="inline-flex items-center gap-2 bg-[#0f2444] hover:bg-[#1a3867] text-white text-sm font-bold px-6 py-3 rounded-xl shadow-md hover:shadow-lg transition-all cursor-pointer"
          >
            <Save size={16} />
            <span>{saving ? 'Saving...' : 'Save Video Settings'}</span>
          </button>
        </div>
      </form>
    </div>
  );
}
