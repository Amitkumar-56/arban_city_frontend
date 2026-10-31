import { useState } from 'react';
import { updateGallery } from './api';
import { Save, CheckCircle, Plus, Trash2, Images } from 'lucide-react';
import FileUpload from './FileUpload';

const DEFAULT_DESCRIPTION =
  'Explore the latest elevation images of {{PROJECT_NAME}}, showcasing the architectural design and development planned by {{BUILDER_NAME}}. The project is designed to offer a premium {{PROJECT_TYPE}} lifestyle in {{LOCALITY}}, {{CITY}}, combining modern aesthetics with functional living spaces.';
const LEGACY_DEFAULT_DESCRIPTION =
  'Arban City offers a striking skyline with modern architecture and thoughtfully designed towers that blend luxury with comfort.';
const DEFAULT_GALLERY_DESCRIPTION =
  'Discover the photo gallery of {{PROJECT_NAME}} in {{LOCALITY}}, {{CITY}}. View apartment interiors, project views, and architectural highlights to get a closer look at the development.';

export default function GallerySettings({ data, onRefresh }) {
  const [formData, setFormData] = useState({
    title: data?.title || 'Elevation Images',
    description:
      data?.description && data.description !== LEGACY_DEFAULT_DESCRIPTION
        ? data.description
        : DEFAULT_DESCRIPTION,
    gallery_description: data?.gallery_description || DEFAULT_GALLERY_DESCRIPTION,
    items: data?.items || [
      { id: 1, title: 'Elevation 1', image_url: '' },
      { id: 2, title: 'Elevation 2', image_url: '' },
      { id: 3, title: 'Skyline View', image_url: '' },
    ],
  });
  const [projectItems, setProjectItems] = useState(
    Array.isArray(data?.project_items) ? data.project_items : []
  );
  const [flatItems, setFlatItems] = useState(
    Array.isArray(data?.flat_items) ? data.flat_items : []
  );
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  const handleItemChange = (index, field, value) => {
    const updated = [...formData.items];
    updated[index] = { ...updated[index], [field]: value };
    setFormData({ ...formData, items: updated });
  };

  const handleAddItem = () => {
    setFormData({
      ...formData,
      items: [
        ...formData.items,
        { id: Date.now(), title: `Elevation ${formData.items.length + 1}`, image_url: '' },
      ],
    });
  };

  const handleRemoveItem = (index) => {
    setFormData({
      ...formData,
      items: formData.items.filter((_, i) => i !== index),
    });
  };

  const updatePhoto = (group, index, field, value) => {
    const setItems = group === 'project' ? setProjectItems : setFlatItems;
    setItems((previous) => previous.map((item, currentIndex) =>
      currentIndex === index ? { ...item, [field]: value } : item
    ));
  };

  const addPhoto = (group) => {
    const setItems = group === 'project' ? setProjectItems : setFlatItems;
    setItems((previous) => [...previous, { title: '', image_url: '' }]);
  };

  const removePhoto = (group, index) => {
    const setItems = group === 'project' ? setProjectItems : setFlatItems;
    setItems((previous) => previous.filter((_, currentIndex) => currentIndex !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMessage('');
    try {
      await updateGallery({
        ...formData,
        project_items: projectItems.filter((item) => (item.image_url || item.img || '').trim()),
        flat_items: flatItems.filter((item) => (item.image_url || item.img || '').trim()),
      });
      setMessage('Elevation Gallery updated successfully in MySQL!');
      if (onRefresh) onRefresh();
    } catch (err) {
      alert('Error updating gallery: ' + err.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-6 sm:p-8 max-w-5xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-5 mb-7">
        <div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2.5">
            <Images size={26} className="text-[#0f2444]" />
            <span>Elevation Gallery Settings</span>
          </h2>
          <p className="text-sm text-slate-500 mt-1">
            Upload tower exterior elevation renders, architectural captures, and landscape views.
          </p>
        </div>
        <button
          type="button"
          onClick={handleAddItem}
          className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-bold px-4 py-2.5 rounded-xl shadow-xs transition-all cursor-pointer shrink-0"
        >
          <Plus size={18} />
          <span>Add Gallery Image</span>
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
          <label className="block text-sm font-bold text-slate-700 mb-1.5">Section Subtitle / Description</label>
          <p className="text-xs text-slate-500 mb-2">
            This text appears below the Elevation Gallery title. Tokens such as {'{{PROJECT_NAME}}'} are filled from your project settings automatically.
          </p>
          <textarea
            rows={3}
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="w-full px-4 py-3 border border-slate-300 rounded-xl text-sm font-medium text-slate-900 leading-relaxed focus:outline-none focus:border-[#e2572b] focus:ring-2 focus:ring-[#e2572b]/20 transition-all"
          />
        </div>

        <div>
          <label className="block text-sm font-bold text-slate-700 mb-1.5">Project Gallery Description</label>
          <p className="text-xs text-slate-500 mb-2">
            This text appears below the Project Gallery title. {'{{PROJECT_NAME}}'}, {'{{LOCALITY}}'}, and {'{{CITY}}'} are filled automatically.
          </p>
          <textarea
            rows={3}
            value={formData.gallery_description}
            onChange={(e) => setFormData({ ...formData, gallery_description: e.target.value })}
            className="w-full px-4 py-3 border border-slate-300 rounded-xl text-sm font-medium text-slate-900 leading-relaxed focus:outline-none focus:border-[#e2572b] focus:ring-2 focus:ring-[#e2572b]/20 transition-all"
          />
        </div>

        <div className="border-t border-slate-100 pt-5">
          <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider mb-4">
            Gallery Elevation Items
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {formData.items.map((item, index) => (
              <div key={item.id || index} className="p-4 sm:p-5 border border-slate-200 rounded-2xl bg-slate-50/70 space-y-3 relative shadow-2xs">
                <div className="flex items-center justify-between gap-3">
                  <input
                    type="text"
                    value={item.title || ''}
                    placeholder="Photo caption (e.g. Tower Front)"
                    onChange={(e) => handleItemChange(index, 'title', e.target.value)}
                    className="flex-1 px-3.5 py-2 text-sm font-bold text-slate-900 border border-slate-300 rounded-lg bg-white outline-none focus:border-[#e2572b]"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveItem(index)}
                    className="p-2 text-red-500 hover:bg-red-50 rounded-lg cursor-pointer transition-colors"
                    title="Remove Image"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>

                <FileUpload
                  value={item.image_url || ''}
                  onChange={(url) => handleItemChange(index, 'image_url', url)}
                />
              </div>
            ))}
          </div>
        </div>

        {[
          { key: 'project', title: 'Project & Lifestyle Images', items: projectItems },
          { key: 'flat', title: 'Sample Flat Images', items: flatItems },
        ].map((group) => (
          <div key={group.key} className="border-t border-slate-100 pt-5">
            <div className="mb-4 flex items-center justify-between gap-3">
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-800">{group.title}</h3>
              <button type="button" onClick={() => addPhoto(group.key)} className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-600 px-3 py-2 text-xs font-bold text-white cursor-pointer">
                <Plus size={15} /> Add image
              </button>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {group.items.map((item, index) => (
                <div key={`${group.key}-${index}`} className="space-y-3 rounded-xl border border-slate-200 bg-slate-50 p-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wide text-slate-600">Image {index + 1}</span>
                    <button type="button" onClick={() => removePhoto(group.key, index)} aria-label={`Remove ${group.title} image ${index + 1}`} className="rounded-lg p-2 text-red-600 hover:bg-red-50 cursor-pointer">
                      <Trash2 size={16} />
                    </button>
                  </div>
                  <input
                    value={item.title || ''}
                    placeholder="Image caption"
                    onChange={(e) => updatePhoto(group.key, index, 'title', e.target.value)}
                    className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm"
                  />
                  <FileUpload
                    label="Image"
                    value={item.image_url || item.img || ''}
                    onChange={(url) => updatePhoto(group.key, index, 'image_url', url)}
                  />
                </div>
              ))}
            </div>
          </div>
        ))}

        <div className="pt-5 border-t border-slate-100 flex justify-end">
          <button
            type="submit"
            disabled={saving}
            className="inline-flex items-center gap-2 bg-[#0f2444] hover:bg-[#1a3867] text-white text-sm font-bold px-6 py-3 rounded-xl shadow-md hover:shadow-lg transition-all cursor-pointer"
          >
            <Save size={16} />
            <span>{saving ? 'Saving...' : 'Save Gallery Changes'}</span>
          </button>
        </div>
      </form>
    </div>
  );
}
