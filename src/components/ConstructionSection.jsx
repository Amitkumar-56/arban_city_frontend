import { useRef } from 'react';
import constructionImg from '../assets/construction.webp';
import banner1 from '../assets/banner1_min.webp';
import banner2 from '../assets/banner2_min.webp';
import heroSkyline from '../assets/hero_skyline.webp';
import { resolveAssetUrl } from '../admin/api';

const DEFAULT_CONSTRUCTION_CARDS = [
  { img: constructionImg, title: 'Tower 1 — Oct 2026' },
  { img: banner1, title: 'Tower 2 — Oct 2026' },
  { img: banner2, title: 'Tower 3 — Oct 2026' },
  { img: heroSkyline, title: 'Overall Site — Oct 2026' },
];

export default function ConstructionSection({
  data,
  onOpenModal,
  projectName = 'Arban City Sector 0',
  location = 'Airoli, Navi Mumbai',
}) {
  const trackRef = useRef(null);
  const currentMonthYear = new Intl.DateTimeFormat('en', { month: 'long', year: 'numeric' }).format(new Date());

  const title = data?.title || 'Construction Status';
  const subtitle = data?.description
    ? data.description.replace(
        /\{\{(CURRENT_MONTH_YEAR|PROJECT_NAME|LOCATION)\}\}/g,
        (_, key) => ({
          CURRENT_MONTH_YEAR: currentMonthYear,
          PROJECT_NAME: projectName,
          LOCATION: location,
        })[key]
      )
    : `Latest site progress · ${currentMonthYear}`;

  const rawCards = Array.isArray(data?.images) && data.images.length > 0
    ? data.images
    : Array.isArray(data?.cards) && data.cards.length > 0
      ? data.cards
      : [];

  const cards = rawCards.length > 0
    ? rawCards.map((card, index) => {
        const fallback = DEFAULT_CONSTRUCTION_CARDS[index % DEFAULT_CONSTRUCTION_CARDS.length];
        if (typeof card === 'string') {
          return { img: card, title: fallback.title };
        }
        const imgVal = card?.img || card?.image_url || card?.imageUrl || card?.image || card?.url || card?.src;
        return {
          ...card,
          img: imgVal && typeof imgVal === 'string' && imgVal.trim() !== '' ? imgVal : fallback.img,
          title: card.title || fallback.title,
        };
      })
    : DEFAULT_CONSTRUCTION_CARDS;

  const scrollLeft = () => {
    if (trackRef.current) {
      trackRef.current.scrollBy({ left: -320, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (trackRef.current) {
      trackRef.current.scrollBy({ left: 320, behavior: 'smooth' });
    }
  };

  return (
    <section
      id="construction"
      className="section-card scroll-mt-24"
    >
      {/* Centered Heading & Subtitle matching Screenshot */}
      <div className="text-center mb-6">
        <h2 className="section-h2">
          {title}
        </h2>
        <p className="section-intro !text-slate-500 mt-1.5" style={{ maxWidth: 900 }}>
          {subtitle}
        </p>
      </div>

      {/* Slider / Responsive Grid Stage */}
      <div className="relative group">
        {cards.length > 4 && (
          <>
            <button
              onClick={scrollLeft}
              className="hidden md:flex absolute -left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-[#111D46] text-white items-center justify-center font-bold text-lg shadow-lg z-10 hover:bg-[#1d2a4a] transition-all cursor-pointer"
              type="button"
              aria-label="Previous construction updates"
            >
              ‹
            </button>
            <button
              onClick={scrollRight}
              className="hidden md:flex absolute -right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-[#111D46] text-white items-center justify-center font-bold text-lg shadow-lg z-10 hover:bg-[#1d2a4a] transition-all cursor-pointer"
              type="button"
              aria-label="Next construction updates"
            >
              ›
            </button>
          </>
        )}

        <div
          ref={trackRef}
          className={`grid ${
            cards.length <= 4
              ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5'
              : 'grid-flow-col auto-cols-[82%] sm:auto-cols-[45%] lg:auto-cols-[23.5%] gap-4 sm:gap-5 overflow-x-auto scroll-smooth pb-2 snap-x snap-mandatory [scrollbar-width:none] [&::-webkit-scrollbar]:hidden'
          }`}
        >
          {cards.map((c, index) => (
            <figure
              key={c.id || index}
              className="m-0 snap-start flex flex-col group cursor-pointer"
              onClick={() => onOpenModal && onOpenModal(`Construction Status - ${c.title}`)}
            >
              <div className="rounded-xl sm:rounded-2xl overflow-hidden shadow-2xs hover:shadow-md transition-all bg-slate-100 aspect-[4/3] relative">
                <img
                  src={resolveAssetUrl(c.img)}
                  alt={c.alt || `${c.title} - ${projectName} Construction Status`}
                  title={c.title || `${projectName} Construction Status`}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  onError={(e) => {
                    const currentSrc = e.currentTarget.src;
                    if (currentSrc.includes('/backend/public/images/')) {
                      e.currentTarget.src = currentSrc.replace('/backend/public/images/', '/images/');
                    } else if (currentSrc.includes('/backend/public/')) {
                      e.currentTarget.src = currentSrc.replace('/backend/public/', '/');
                    } else if (!currentSrc.includes('/assets/')) {
                      e.currentTarget.src = DEFAULT_CONSTRUCTION_CARDS[index % DEFAULT_CONSTRUCTION_CARDS.length].img;
                    }
                  }}
                />
              </div>
              <figcaption className="text-center font-bold text-xs sm:text-[13px] text-[#111D46] mt-3 leading-snug">
                {c.title}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>

      {cards.length > 4 && (
        <p className="block md:hidden text-center font-medium text-xs text-slate-500 mt-3">
          Swipe to view more site progress →
        </p>
      )}
    </section>
  );
}
