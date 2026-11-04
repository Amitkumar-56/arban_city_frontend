import { useState } from 'react';
import { resolveAssetUrl } from '../admin/api';
import gallery1 from '../assets/gallery1_min.webp';
import gallery2 from '../assets/gallery2_min.webp';
import gallery3 from '../assets/gallery3_min.webp';
import banner2 from '../assets/banner2_min.webp';
import banner3 from '../assets/banner3_min.webp';

const DEFAULT_DESCRIPTION =
  'Discover the photo gallery of {{PROJECT_NAME}} in {{LOCALITY}}, {{CITY}}. View apartment interiors, project views, and architectural highlights to get a closer look at the development.';

const DEFAULT_PROJECT_PHOTOS = [
  { img: gallery1, cap: 'Grand Clubhouse & Podium Garden' },
  { img: gallery2, cap: 'Infinity Swimming Pool' },
  { img: gallery3, cap: 'Fitness Center & Gymnasium' },
];

const DEFAULT_FLAT_PHOTOS = [
  { img: banner2, cap: 'Master Bedroom Suite' },
  { img: banner3, cap: 'Living & Dining Area' },
  { img: gallery1, cap: 'Modular Kitchen Layout' },
];

export default function GallerySection({
  data,
  projectTitle = 'Arban City Sector 0',
  locality = 'Airoli',
  city = 'Navi Mumbai',
  onOpenModal,
}) {
  const [projIdx, setProjIdx] = useState(0);
  const [flatIdx, setFlatIdx] = useState(0);

  const rawProject = Array.isArray(data?.project_items) && data.project_items.length > 0
    ? data.project_items
    : (Array.isArray(data?.items) && data.items.length > 0 ? data.items : []);
  const rawFlat = Array.isArray(data?.flat_items) && data.flat_items.length > 0 ? data.flat_items : [];

  const fallbackProj = [gallery1, gallery2, gallery3];
  const fallbackFlat = [banner2, banner3, gallery1];

  const projectPhotos = rawProject.length > 0
    ? rawProject.map((item, idx) => ({
        img: item.image_url || item.img || fallbackProj[idx % fallbackProj.length],
        cap: item.title || item.cap || `Project View ${idx + 1}`,
        alt: item.alt,
        title: item.title,
      }))
    : DEFAULT_PROJECT_PHOTOS;

  const flatPhotos = rawFlat.length > 0
    ? rawFlat.map((item, idx) => ({
        img: item.image_url || item.img || fallbackFlat[idx % fallbackFlat.length],
        cap: item.title || item.cap || `Sample Flat ${idx + 1}`,
        alt: item.alt,
        title: item.title,
      }))
    : DEFAULT_FLAT_PHOTOS;

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
        {projectPhotos.length > 0 && (
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
                  alt={projectPhotos[projectIndex].alt || `${projectPhotos[projectIndex].cap} - ${projectTitle}`}
                  title={projectPhotos[projectIndex].title || `${projectTitle} - ${projectPhotos[projectIndex].cap}`}
                  loading="lazy"
                  decoding="async"
                  width={projectPhotos[projectIndex].width || undefined}
                  height={projectPhotos[projectIndex].height || undefined}
                  className="w-full h-[180px] md:h-[260px] object-cover transition-transform duration-500 group-hover:scale-105"
                  onError={(e) => {
                    const currentSrc = e.currentTarget.src;
                    if (currentSrc.includes('/backend/public/')) {
                      e.currentTarget.src = currentSrc.replace('/backend/public/', '/');
                    } else {
                      e.currentTarget.src = gallery1;
                    }
                  }}
                />
              </button>
              {projectPhotos.length > 1 && (
                <>
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
                </>
              )}
            </div>
            <div className="text-center font-semibold text-xs text-[#111D46] mt-2">
              {projectPhotos[projectIndex].cap}
            </div>
            {projectPhotos.length > 1 && (
              <div className="flex justify-center gap-1.5 mt-2.5">
                {projectPhotos.map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    className={`w-2 h-2 rounded-full border-0 p-0 transition-all cursor-pointer ${
                      projectIndex === i ? 'bg-[#F26635]' : 'bg-[#C9D3CD]'
                    }`}
                    onClick={() => setProjIdx(i)}
                    aria-label={`Project image ${i + 1}`}
                  />
                ))}
              </div>
            )}
          </div>
        )}

        {/* Slider 2: Sample Flat Photos */}
        {flatPhotos.length > 0 && (
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
                  alt={flatPhotos[flatIndex].alt || `${flatPhotos[flatIndex].cap} - ${projectTitle} Sample Flat`}
                  title={flatPhotos[flatIndex].title || `${projectTitle} Sample Flat - ${flatPhotos[flatIndex].cap}`}
                  loading={flatPhotos[flatIndex].loading || "lazy"}
                  decoding={flatPhotos[flatIndex].decoding || "async"}
                  width={flatPhotos[flatIndex].width || undefined}
                  height={flatPhotos[flatIndex].height || undefined}
                  className="w-full h-[180px] md:h-[260px] object-cover transition-transform duration-500 group-hover:scale-105"
                  onError={(e) => {
                    const currentSrc = e.currentTarget.src;
                    if (currentSrc.includes('/backend/public/')) {
                      e.currentTarget.src = currentSrc.replace('/backend/public/', '/');
                    } else {
                      e.currentTarget.src = banner2;
                    }
                  }}
                />
              </button>
              {flatPhotos.length > 1 && (
                <>
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
                </>
              )}
            </div>
            <div className="text-center font-semibold text-xs text-[#111D46] mt-2">
              {flatPhotos[flatIndex].cap}
            </div>
            {flatPhotos.length > 1 && (
              <div className="flex justify-center gap-1.5 mt-2.5">
                {flatPhotos.map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    className={`w-2 h-2 rounded-full border-0 p-0 transition-all cursor-pointer ${
                      flatIndex === i ? 'bg-[#F26635]' : 'bg-[#C9D3CD]'
                    }`}
                    onClick={() => setFlatIdx(i)}
                    aria-label={`Flat image ${i + 1}`}
                  />
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
