import { useEffect, useRef, useState } from 'react';
import banner1 from '../assets/banner1_min.webp';
import banner2 from '../assets/banner2_min.webp';
import banner3 from '../assets/banner3_min.webp';
import heroSkyline from '../assets/hero_skyline.webp';
import { resolveAssetUrl } from '../admin/api';

const DEFAULT_DESCRIPTION =
  'Explore the latest elevation images of {{PROJECT_NAME}}, showcasing the architectural design and development planned by {{BUILDER_NAME}}. The project is designed to offer a premium {{PROJECT_TYPE}} lifestyle in {{LOCALITY}}, {{CITY}}, combining modern aesthetics with functional living spaces.';
const LEGACY_DEFAULT_DESCRIPTION =
  'Arban City offers a striking skyline with modern architecture and thoughtfully designed towers that blend luxury with comfort.';

export default function ElevationGallery({
  data,
  onOpenModal,
  projectName = 'Arban City Sector 0',
  builderName = 'Delta Tricity',
  projectType = 'Residential',
  locality = 'Airoli',
  city = 'Navi Mumbai',
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const touchStartX = useRef(null);

  const defaultElevations = [
    {
      img: banner1,
      title: 'Tower Elevation',
      sub: 'Front view from main access road',
    },
    {
      img: banner2,
      title: 'Podium & Landscape View',
      sub: 'Landscaped amenity deck and recreational spaces',
    },
    {
      img: banner3,
      title: 'Sample Flat View',
      sub: 'Interior design and living spaces',
    },
    {
      img: heroSkyline,
      title: 'Project Skyline',
      sub: 'Panoramic view of the development',
    },
  ];

  const items = Array.isArray(data?.items) && data.items.length > 0
    ? data.items
    : Array.isArray(data) && data.length > 0
      ? data
      : defaultElevations;
  const rawTitle = data?.title ? data.title.trim() : 'Elevation Images';
  const title = rawTitle.toLowerCase().includes('arban city sector 0')
    ? rawTitle
    : `Arban City Sector 0 ${rawTitle.replace(/^Elevation Images$/i, 'Elevation Images')}`;
  const adminDescription = typeof data?.description === 'string' ? data.description.trim() : '';
  const descriptionTemplate = adminDescription && adminDescription !== LEGACY_DEFAULT_DESCRIPTION
    ? adminDescription
    : DEFAULT_DESCRIPTION;
  const description = descriptionTemplate.replace(
    /\{\{(PROJECT_NAME|BUILDER_NAME|PROJECT_TYPE|LOCALITY|CITY)\}\}/g,
    (_, key) => ({
      PROJECT_NAME: projectName,
      BUILDER_NAME: builderName,
      PROJECT_TYPE: projectType,
      LOCALITY: locality,
      CITY: city,
    })[key]
  );
  useEffect(() => {
    if (items.length < 2) return undefined;
    const timer = window.setInterval(() => {
      setActiveIndex((index) => (index + 1) % items.length);
    }, 3500);
    return () => window.clearInterval(timer);
  }, [items.length]);

  if (items.length === 0) return null;

  const activeItem = items[activeIndex % items.length];
  const desktopItems = Array.from({ length: Math.min(2, items.length) }, (_, offset) => {
    const index = (activeIndex + offset) % items.length;
    return { item: items[index], index };
  });
  const showPrevious = () => setActiveIndex((index) => (index - 1 + items.length) % items.length);
  const showNext = () => setActiveIndex((index) => (index + 1) % items.length);
  const getImageUrl = (item, index) => resolveAssetUrl(
    item.img || item.image_url || item.imageUrl || item.image || item.url || item.src
    || defaultElevations[index % defaultElevations.length].img
  );
  const showFallbackImage = (event, index) => {
    event.currentTarget.onerror = null;
    event.currentTarget.src = defaultElevations[index % defaultElevations.length].img;
  };

  return (
    <section className="section-card" id="elevation">
      <h2 className="section-h2">{title}</h2>
      {description && (
        <p className="section-intro" style={{ maxWidth: 900 }}>
          {description}
        </p>
      )}

      <div className="mt-5">
        <div className="relative hidden md:block">
          <div className="grid grid-cols-2 gap-4">
            {desktopItems.map(({ item, index }) => (
              <figure key={item.id || index} className="m-0 group">
                <button
                  className="relative rounded-xl overflow-hidden cursor-zoom-in border-0 p-0 w-full block bg-[#dde3ec] shadow-sm"
                  type="button"
                  onClick={() => onOpenModal && onOpenModal(`Elevation View - ${item.title || 'Tower'}`)}
                >
                  <img
                    src={getImageUrl(item, index)}
                    alt={item.title || 'Elevation Image'}
                    className="w-full h-[300px] object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                    loading="lazy"
                    onError={(event) => showFallbackImage(event, index)}
                  />
                  <span className="absolute right-2.5 bottom-2.5 bg-[#0a1023]/80 text-white font-bold text-[11px] px-2.5 py-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                    View Larger ↗
                  </span>
                </button>
                <figcaption className="text-center font-bold text-xs md:text-[13px] leading-snug text-[#111D46] mt-2.5">
                  {item.title}
                  {item.sub && <span className="block text-[11px] text-[#67748A] font-normal mt-0.5">{item.sub}</span>}
                </figcaption>
              </figure>
            ))}
          </div>
          {items.length > 1 && (
            <>
              <button
                type="button"
                onClick={showPrevious}
                aria-label="Previous elevation images"
                className="absolute left-2 top-[150px] -translate-y-1/2 w-10 h-10 rounded-full border-0 bg-[#111D46]/90 text-white font-bold text-xl flex items-center justify-center shadow-md cursor-pointer hover:bg-[#111D46] transition-colors"
              >
                ‹
              </button>
              <button
                type="button"
                onClick={showNext}
                aria-label="Next elevation images"
                className="absolute right-2 top-[150px] -translate-y-1/2 w-10 h-10 rounded-full border-0 bg-[#111D46]/90 text-white font-bold text-xl flex items-center justify-center shadow-md cursor-pointer hover:bg-[#111D46] transition-colors"
              >
                ›
              </button>
            </>
          )}
        </div>

        <div
          className="relative mx-auto w-full max-w-[900px] md:hidden"
          onTouchStart={(event) => {
            touchStartX.current = event.touches[0].clientX;
          }}
          onTouchEnd={(event) => {
            if (touchStartX.current === null) return;
            const swipeDistance = event.changedTouches[0].clientX - touchStartX.current;
            if (Math.abs(swipeDistance) > 40) {
              if (swipeDistance > 0) showPrevious();
              else showNext();
            }
            touchStartX.current = null;
          }}
        >
          <figure className="m-0 group">
            <div className="relative rounded-xl overflow-hidden shadow-sm">
              <button
                className="cursor-zoom-in border-0 p-0 w-full block bg-[#dde3ec]"
                type="button"
                onClick={() => onOpenModal && onOpenModal(`Elevation View - ${activeItem.title || 'Tower'}`)}
              >
                <img
                  src={getImageUrl(activeItem, activeIndex)}
                  alt={activeItem.title || 'Elevation Image'}
                  className="w-full h-[190px] object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                  onError={(event) => showFallbackImage(event, activeIndex)}
                />
              </button>
              {items.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={showPrevious}
                    aria-label="Previous elevation image"
                    className="absolute left-2.5 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full border-0 bg-[#111D46]/85 text-white font-bold text-lg flex items-center justify-center shadow-md cursor-pointer"
                  >
                    ‹
                  </button>
                  <button
                    type="button"
                    onClick={showNext}
                    aria-label="Next elevation image"
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full border-0 bg-[#111D46]/85 text-white font-bold text-lg flex items-center justify-center shadow-md cursor-pointer"
                  >
                    ›
                  </button>
                </>
              )}
            </div>
            <figcaption className="text-center font-bold text-xs leading-snug text-[#111D46] mt-2.5">
              {activeItem.title}
              {activeItem.sub && <span className="block text-[11px] text-[#67748A] font-normal mt-0.5">{activeItem.sub}</span>}
            </figcaption>
          </figure>
          {items.length > 1 && (
            <div className="flex justify-center gap-1.5 mt-2.5">
              {items.map((item, index) => (
                <button
                  key={item.id || index}
                  type="button"
                  className={`w-2 h-2 rounded-full border-0 p-0 transition-all cursor-pointer ${activeIndex === index ? 'bg-[#F26635]' : 'bg-[#C9D3CD]'
                    }`}
                  onClick={() => setActiveIndex(index)}
                  aria-label={`Show elevation image ${index + 1}`}
                  aria-current={activeIndex === index ? 'true' : undefined}
                />
              ))}
            </div>
          )}
        </div>
      </div>

    </section>
  );
}
