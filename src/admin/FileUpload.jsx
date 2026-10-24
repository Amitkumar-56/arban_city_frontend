import React, { useState, useRef } from 'react';
import { Upload, X, Loader2, Image as ImageIcon, Video as VideoIcon } from 'lucide-react';
import { uploadFile } from './api';

export default function FileUpload({ value, onChange, accept = 'image/*', label, isVideo = false }) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const fileInputRef = useRef(null);

  const handleFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setError('');

    try {
      const res = await uploadFile(file);
      if (res.url) {
        onChange(res.url);
      } else {
        setError('Upload failed');
      }
    } catch (err) {
      setError(err.message || 'Error uploading file');
    } finally {
      setUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleRemove = () => {
    onChange('');
    setError('');
  };

  return (
    <div className="space-y-2">
      {label && <label className="block text-sm font-bold text-slate-700">{label}</label>}

      <input
        ref={fileInputRef}
        type="file"
        accept={accept}
        onChange={handleFileChange}
        className="hidden"
      />

      {value ? (
        <div className="relative inline-block border border-slate-200 rounded-xl p-3 bg-slate-50 max-w-md shadow-xs">
          {isVideo ? (
            <video
              src={value}
              controls
              className="max-h-48 max-w-full rounded-lg object-contain bg-black"
            />
          ) : (
            <img
              src={value}
              alt="Uploaded file preview"
              className="max-h-36 max-w-full rounded-lg object-contain"
              onError={(e) => {
                e.target.style.display = 'none';
              }}
            />
          )}

          <div className="flex items-center justify-between gap-3 mt-2.5 pt-2 border-t border-slate-200 text-xs">
            <span className="text-slate-500 font-medium truncate max-w-[200px]">{value.split('/').pop()}</span>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                disabled={uploading}
                className="text-blue-600 hover:text-blue-800 font-bold cursor-pointer"
              >
                Change
              </button>
              <span className="text-slate-300">|</span>
              <button
                type="button"
                onClick={handleRemove}
                className="text-red-600 hover:text-red-800 font-bold cursor-pointer"
              >
                Remove
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div
          onClick={() => fileInputRef.current?.click()}
          className="border-2 border-dashed border-slate-300 hover:border-[#e2572b] rounded-xl p-5 text-center cursor-pointer transition-all bg-slate-50/70 hover:bg-orange-50/20 group"
        >
          {uploading ? (
            <div className="flex flex-col items-center justify-center py-2 text-sm text-slate-600 gap-2 font-medium">
              <Loader2 size={24} className="animate-spin text-[#e2572b]" />
              <span>Uploading file to server...</span>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center gap-2 text-sm text-slate-600">
              <div className="w-10 h-10 rounded-xl bg-orange-100 text-[#e2572b] flex items-center justify-center group-hover:scale-110 transition-transform">
                {isVideo ? <VideoIcon size={20} /> : <Upload size={20} />}
              </div>
              <span className="font-bold text-slate-800">
                Click to browse and upload {isVideo ? 'video' : 'image'}
              </span>
              <span className="text-xs text-slate-500">
                Direct file upload from your computer (storage on backend/uploads)
              </span>
            </div>
          )}
        </div>
      )}

      {error && <p className="text-xs text-red-600 font-bold">{error}</p>}
    </div>
  );
}
