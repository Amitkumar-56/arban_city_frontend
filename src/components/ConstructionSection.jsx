import { useRef } from 'react';
import constructionImg from '../assets/construction.webp';
import banner1 from '../assets/banner1_min.webp';
import banner2 from '../assets/banner2_min.webp';
import heroSkyline from '../assets/hero_skyline.webp';
import { resolveAssetUrl } from '../admin/api';

const DEFAULT_DESCRIPTION =
  'View real-time {{CURRENT_MONTH_YEAR}} construction status for {{PROJECT_NAME}} in {{LOCATION}}.';
const LEGACY_DEFAULT_DESCRIPTION =
  'Real progress. Real pictures. Your future home is taking shape, one milestone at a time.';

export default function ConstructionSection({
  data,
  onOpenModal,
  projectName = 'Aveon City Sector Zero',
  location = 'Airoli, Navi Mumbai',
}) {
  const trackRef = useRef(null);
  const month = new Intl.DateTimeFormat('en', { month: 'long', year: 'numeric' }).format(new Date());
  const descriptionTemplate = data?.description && data.description !== LEGACY_DEFAULT_DESCRIPTION
    ? data.description
    : DEFAULT_DESCRIPTION;
  const description = descriptionTemplate.replace(
    /\{\{(CURRENT_MONTH_YEAR|PROJECT_NAME|LOCATION)\}\}/g,
    (_, key) => ({
      CURRENT_MONTH_YEAR: month,
      PROJECT_NAME: projectName,
      LOCATION: location,
    })[key]
  );
  const title = data?.title || 'Construction Status';

  const defaultCards = [
    {
      img: constructionImg,
      title: 'Tower A Piling & Raft Completed',
    },
    {
      img: banner1,
      title: 'Tower B Podium Slab Work in Full Swing',
    },
    {
      img: banner2,
      title: 'Tower C Excavation & Foundation Shoring',
    },
    {
      img: heroSkyline,
      title: 'Main Access Road & Boundary Infrastructure',
    },
  ];

  const configuredCards = Array.isArray(data?.cards) && data.cards.length > 0
    ? data.cards
    : Array.isArray(data?.images) && data.images.length > 0
      ? data.images
      : [];
  const cards = configuredCards.length > 0
    ? configuredCards.map((card, index) => (
        typeof card === 'string'
          ? { img: card, title: `Construction Update ${index + 1}` }
          : { ...card, img: card.img || card.image_url || card.image || constructionImg }
      ))
    : defaultCards;

  const scrollLeft = () => {
    if (trackRef.current) {
      trackRef.current.scrollBy({ left: -260, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (trackRef.current) {
      trackRef.current.scrollBy({ left: 260, behavior: 'smooth' });
    }
  };

  return (
    <section className="section-card" id="construction">
      <h2 className="section-h2">{projectName} {title}</h2>
      <p className="section-intro">
        {description}
      </p>

      <div className="relative mt-5">
        {cards.length > 3 && (
          <button
            className="hidden md:flex absolute -left-3.5 top-[100px] -translate-y-1/2 w-9.5 h-9.5 rounded-full border-0 bg-[#111D46] text-white font-bold text-lg items-center justify-center z-10 shadow-lg cursor-pointer hover:bg-[#1d2a4a] transition-colors"
            type="button"
            aria-label="Previous photo"
            onClick={scrollLeft}
          >
            ‹
          </button>
        )}

        <div
          className={`flex gap-3.5 overflow-x-auto scroll-smooth pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden snap-x snap-mandatory ${
            cards.length <= 2 ? 'justify-center' : ''
          }`}
          ref={trackRef}
        >
          {cards.map((c, idx) => (
            <figure
              key={idx}
              className="flex-[0_0_82%] sm:flex-[0_0_calc((100%-28px)/3)] lg:flex-[0_0_calc((100%-42px)/4)] snap-start m-0 group shrink-0"
            >
              <button
                type="button"
                className="border-0 p-0 w-full rounded-xl overflow-hidden cursor-zoom-in block bg-[#dde3ec] shadow-sm"
                onClick={() => onOpenModal && onOpenModal(`Construction Progress - ${c.title}`)}
              >
                <img
                  src={resolveAssetUrl(c.img || c.image || constructionImg)}
                  alt={c.title}
                  className="w-full h-[190px] md:h-[200px] object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </button>
              <figcaption className="text-center font-bold text-xs text-[#111D46] mt-2 leading-snug">
                {c.title}
              </figcaption>
            </figure>
          ))}
        </div>

        {cards.length > 3 && (
          <button
            className="hidden md:flex absolute -right-3.5 top-[100px] -translate-y-1/2 w-9.5 h-9.5 rounded-full border-0 bg-[#111D46] text-white font-bold text-lg items-center justify-center z-10 shadow-lg cursor-pointer hover:bg-[#1d2a4a] transition-colors"
            type="button"
            aria-label="Next photo"
            onClick={scrollRight}
          >
            ›
          </button>
        )}
      </div>

      <p className="block md:hidden text-center font-medium text-xs text-[#5b6678] mt-3">
        Swipe to see more updates →
      </p>
    </section>
  );
}
