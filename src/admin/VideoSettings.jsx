import { useState, useEffect } from 'react';
import { updateVideo } from './api';
import { Save, CheckCircle, Video as VideoIcon } from 'lucide-react';
import FileUpload from './FileUpload';

export default function VideoSettings({ data, onRefresh }) {
  const [formData, setFormData] = useState({
    title: data?.title ?? '',
    description: data?.description ?? '',
    video_url: data?.video_url || '',
    video_thumbnail: data?.video_thumbnail || '',
    video_thumbnail_alt: data?.video_thumbnail_alt || '',
    video_thumbnail_title: data?.video_thumbnail_title || '',
    video_thumbnail_loading: data?.video_thumbnail_loading || 'lazy',
    video_thumbnail_decoding: data?.video_thumbnail_decoding || 'async',
    video_thumbnail_width: data?.video_thumbnail_width || '',
    video_thumbnail_height: data?.video_thumbnail_height || '',
    sample_flat_image: data?.sample_flat_image || '',
    sample_flat_image_alt: data?.sample_flat_image_alt || '',
    sample_flat_image_title: data?.sample_flat_image_title || '',
    sample_flat_image_loading: data?.sample_flat_image_loading || 'lazy',
    sample_flat_image_decoding: data?.sample_flat_image_decoding || 'async',
    sample_flat_image_width: data?.sample_flat_image_width || '',
    sample_flat_image_height: data?.sample_flat_image_height || '',
  });

  useEffect(() => {
    if (data && typeof data === 'object') {
      setFormData({
        title: data.title ?? '',
        description: data.description ?? '',
        video_url: data.video_url || '',
        video_thumbnail: data.video_thumbnail || '',
        video_thumbnail_alt: data.video_thumbnail_alt || '',
        video_thumbnail_title: data.video_thumbnail_title || '',
        video_thumbnail_loading: data.video_thumbnail_loading || 'lazy',
        video_thumbnail_decoding: data.video_thumbnail_decoding || 'async',
        video_thumbnail_width: data.video_thumbnail_width || '',
        video_thumbnail_height: data.video_thumbnail_height || '',
        sample_flat_image: data.sample_flat_image || '',
        sample_flat_image_alt: data.sample_flat_image_alt || '',
        sample_flat_image_title: data.sample_flat_image_title || '',
        sample_flat_image_loading: data.sample_flat_image_loading || 'lazy',
        sample_flat_image_decoding: data.sample_flat_image_decoding || 'async',
        sample_flat_image_width: data.sample_flat_image_width || '',
        sample_flat_image_height: data.sample_flat_image_height || '',
      });
    }
  }, [data]);
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
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
            <label className="block text-sm font-bold text-slate-800 mb-1">
              YouTube Video URL or Video ID (Direct Iframe Display)
            </label>
            <p className="text-xs text-slate-500 mb-2">
              Enter full YouTube URL (e.g. <code>https://www.youtube.com/watch?v=VIDEO_ID</code>, <code>https://youtu.be/VIDEO_ID</code>) or just the <code>VIDEO_ID</code>. YouTube automatically provides its official thumbnail and play button.
            </p>
            <input
              type="text"
              placeholder="e.g. https://www.youtube.com/watch?v=dQw4w9WgXcQ or dQw4w9WgXcQ"
              value={formData.video_url || ''}
              onChange={(e) => setFormData({ ...formData, video_url: e.target.value })}
              className="w-full px-4 py-2.5 border border-slate-300 rounded-xl text-sm font-medium text-slate-900 focus:outline-none focus:border-[#e2572b] focus:ring-2 focus:ring-[#e2572b]/20 transition-all bg-white"
            />
          </div>

          <div>
            <FileUpload
              label="Or Upload Direct Video File (.mp4, .webm) if not using YouTube"
              accept="video/*"
              isVideo={true}
              value={formData.video_url && !formData.video_url.includes('youtu') ? formData.video_url : ''}
              onChange={(url) => setFormData({ ...formData, video_url: url })}
            />
          </div>

          <div>
            <FileUpload
              label="Upload Video Poster Thumbnail (Optional)"
              accept="image/*"
              category="video-thumbnails"
              value={formData.video_thumbnail || ''}
              onChange={(url) => setFormData({ ...formData, video_thumbnail: url })}
              alt={formData.video_thumbnail_alt}
              onAltChange={(val) => setFormData((prev) => ({ ...prev, video_thumbnail_alt: val }))}
              title={formData.video_thumbnail_title}
              onTitleChange={(val) => setFormData((prev) => ({ ...prev, video_thumbnail_title: val }))}
              loading={formData.video_thumbnail_loading}
              onLoadingChange={(val) => setFormData((prev) => ({ ...prev, video_thumbnail_loading: val }))}
              decoding={formData.video_thumbnail_decoding}
              onDecodingChange={(val) => setFormData((prev) => ({ ...prev, video_thumbnail_decoding: val }))}
              width={formData.video_thumbnail_width}
              onWidthChange={(val) => setFormData((prev) => ({ ...prev, video_thumbnail_width: val }))}
              height={formData.video_thumbnail_height}
              onHeightChange={(val) => setFormData((prev) => ({ ...prev, video_thumbnail_height: val }))}
            />
          </div>
          <div>
            <FileUpload
              label="Sample Flat Tour Image"
              accept="image/*"
              category="video-thumbnails"
              value={formData.sample_flat_image || ''}
              onChange={(url) => setFormData({ ...formData, sample_flat_image: url })}
              alt={formData.sample_flat_image_alt}
              onAltChange={(val) => setFormData((prev) => ({ ...prev, sample_flat_image_alt: val }))}
              title={formData.sample_flat_image_title}
              onTitleChange={(val) => setFormData((prev) => ({ ...prev, sample_flat_image_title: val }))}
              loading={formData.sample_flat_image_loading}
              onLoadingChange={(val) => setFormData((prev) => ({ ...prev, sample_flat_image_loading: val }))}
              decoding={formData.sample_flat_image_decoding}
              onDecodingChange={(val) => setFormData((prev) => ({ ...prev, sample_flat_image_decoding: val }))}
              width={formData.sample_flat_image_width}
              onWidthChange={(val) => setFormData((prev) => ({ ...prev, sample_flat_image_width: val }))}
              height={formData.sample_flat_image_height}
              onHeightChange={(val) => setFormData((prev) => ({ ...prev, sample_flat_image_height: val }))}
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
