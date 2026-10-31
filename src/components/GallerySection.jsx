import { useState } from 'react';
import gallery1 from '../assets/gallery1_min.webp';
import gallery2 from '../assets/gallery2_min.webp';
import gallery3 from '../assets/gallery3_min.webp';
import banner2 from '../assets/banner2_min.webp';
import banner3 from '../assets/banner3_min.webp';
import heroSkyline from '../assets/hero_skyline.webp';
import { resolveAssetUrl } from '../admin/api';

const DEFAULT_DESCRIPTION =
  'Discover the photo gallery of {{PROJECT_NAME}} in {{LOCALITY}}, {{CITY}}. View apartment interiors, project views, and architectural highlights to get a closer look at the development.';

export default function GallerySection({
  data,
  projectTitle = 'Aveon City Sector Zero',
  locality = 'Airoli',
  city = 'Navi Mumbai',
  onOpenModal,
}) {
  const defaultProjectPhotos = [
    { img: banner2, cap: 'Grand Clubhouse & Infinity Pool Deck' },
    { img: heroSkyline, cap: 'Panoramic Skyline & Green Surrounds' },
    { img: gallery1, cap: 'Landscaped Central Park & Walking Trail' },
  ];

  const defaultFlatPhotos = [
    { img: gallery2, cap: 'Spacious Master Bedroom with Large Windows' },
    { img: banner3, cap: 'Designer Living & Dining Room with Balcony' },
    { img: gallery3, cap: 'Modern Modular Kitchen Platform Layout' },
  ];

  const [projIdx, setProjIdx] = useState(0);
  const [flatIdx, setFlatIdx] = useState(0);
  const configuredProjectPhotos = Array.isArray(data?.project_items)
    ? data.project_items.map((item, index) => ({
        img: item.img || item.image_url || item.image || '',
        cap: item.title || `Project Image ${index + 1}`,
      })).filter((item) => item.img)
    : [];
  const configuredFlatPhotos = Array.isArray(data?.flat_items)
    ? data.flat_items.map((item, index) => ({
        img: item.img || item.image_url || item.image || '',
        cap: item.title || `Sample Flat Image ${index + 1}`,
      })).filter((item) => item.img)
    : [];
  const projectPhotos = configuredProjectPhotos.length > 0 ? configuredProjectPhotos : defaultProjectPhotos;
  const flatPhotos = configuredFlatPhotos.length > 0 ? configuredFlatPhotos : defaultFlatPhotos;
  const projectIndex = projIdx % projectPhotos.length;
  const flatIndex = flatIdx % flatPhotos.length;
  const galleryDescription = (data?.gallery_description || DEFAULT_DESCRIPTION).replace(
    /\{\{(PROJECT_NAME|LOCALITY|CITY)\}\}/g,
    (_, key) => ({
      PROJECT_NAME: projectTitle,
      LOCALITY: locality,
      CITY: city,
    })[key]
  );

  const prevProj = () => setProjIdx((p) => (p <= 0 ? projectPhotos.length - 1 : p - 1));
  const nextProj = () => setProjIdx((p) => (p >= projectPhotos.length - 1 ? 0 : p + 1));

  const prevFlat = () => setFlatIdx((f) => (f <= 0 ? flatPhotos.length - 1 : f - 1));
  const nextFlat = () => setFlatIdx((f) => (f >= flatPhotos.length - 1 ? 0 : f + 1));

  return (
    <section className="section-card" id="gallery">
      <h2 className="section-h2">{projectTitle} Project Gallery</h2>
      <p className="section-intro" style={{ maxWidth: 780 }}>
        {galleryDescription}
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-5">
        {/* Slider 1: Project & Lifestyle Views */}
        <div className="relative">
          <h3 className="font-['Manrope',sans-serif] text-base md:text-[17px] font-bold text-[#111D46] text-center mb-2.5">
            Project &amp; Lifestyle Views
          </h3>
          <div className="relative rounded-xl overflow-hidden shadow-sm group">
            <button
              className="border-0 p-0 w-full block cursor-zoom-in bg-[#dde3ec]"
              type="button"
              onClick={() => onOpenModal && onOpenModal(`Gallery - ${projectPhotos[projectIndex].cap}`)}
            >
              <img
                src={resolveAssetUrl(projectPhotos[projectIndex].img)}
                alt={projectPhotos[projectIndex].cap}
                className="w-full h-[180px] md:h-[260px] object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </button>
            <button
              className="absolute left-2.5 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full border-0 bg-[#111D46]/85 text-white font-bold text-lg flex items-center justify-center cursor-pointer shadow-md z-10 hover:bg-[#111D46] transition-colors"
              type="button"
              aria-label="Previous image"
              onClick={prevProj}
            >
              ‹
            </button>
            <button
              className="absolute right-2.5 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full border-0 bg-[#111D46]/85 text-white font-bold text-lg flex items-center justify-center cursor-pointer shadow-md z-10 hover:bg-[#111D46] transition-colors"
              type="button"
              aria-label="Next image"
              onClick={nextProj}
            >
              ›
            </button>
          </div>
          <div className="text-center font-semibold text-xs text-[#111D46] mt-2">
            {projectPhotos[projectIndex].cap}
          </div>
          <div className="flex justify-center gap-1.5 mt-2.5">
            {projectPhotos.map((_, i) => (
              <button
                key={i}
                type="button"
                className={`w-2 h-2 rounded-full border-0 p-0 transition-all cursor-pointer ${
                  projIdx === i ? 'bg-[#F26635]' : 'bg-[#C9D3CD]'
                }`}
                onClick={() => setProjIdx(i)}
                aria-label={`Project image ${i + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Slider 2: Sample Flat Photos */}
        <div className="relative">
          <h3 className="font-['Manrope',sans-serif] text-base md:text-[17px] font-bold text-[#111D46] text-center mb-2.5">
            Sample Flat Photos
          </h3>
          <div className="relative rounded-xl overflow-hidden shadow-sm group">
            <button
              className="border-0 p-0 w-full block cursor-zoom-in bg-[#dde3ec]"
              type="button"
              onClick={() => onOpenModal && onOpenModal(`Sample Flat - ${flatPhotos[flatIndex].cap}`)}
            >
              <img
                src={resolveAssetUrl(flatPhotos[flatIndex].img)}
                alt={flatPhotos[flatIndex].cap}
                className="w-full h-[180px] md:h-[260px] object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </button>
            <button
              className="absolute left-2.5 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full border-0 bg-[#111D46]/85 text-white font-bold text-lg flex items-center justify-center cursor-pointer shadow-md z-10 hover:bg-[#111D46] transition-colors"
              type="button"
              aria-label="Previous image"
              onClick={prevFlat}
            >
              ‹
            </button>
            <button
              className="absolute right-2.5 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full border-0 bg-[#111D46]/85 text-white font-bold text-lg flex items-center justify-center cursor-pointer shadow-md z-10 hover:bg-[#111D46] transition-colors"
              type="button"
              aria-label="Next image"
              onClick={nextFlat}
            >
              ›
            </button>
          </div>
          <div className="text-center font-semibold text-xs text-[#111D46] mt-2">
            {flatPhotos[flatIndex].cap}
          </div>
          <div className="flex justify-center gap-1.5 mt-2.5">
            {flatPhotos.map((_, i) => (
              <button
                key={i}
                type="button"
                className={`w-2 h-2 rounded-full border-0 p-0 transition-all cursor-pointer ${
                  flatIdx === i ? 'bg-[#F26635]' : 'bg-[#C9D3CD]'
                }`}
                onClick={() => setFlatIdx(i)}
                aria-label={`Flat image ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>

    </section>
  );
}
