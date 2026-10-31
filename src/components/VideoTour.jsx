import { useState } from 'react';
import banner1 from '../assets/banner1_min.webp';
import banner3 from '../assets/banner3_min.webp';
import { resolveAssetUrl } from '../admin/api';
import { X } from 'lucide-react';

export default function VideoTour({ data, onOpenModal, projectTitle = 'Arban City Sector 0' }) {
  const [videoOpen, setVideoOpen] = useState(false);

  return (
    <section className="section-card" id="video">
      <h2 className="section-h2 !text-[20px]">
        {data?.title && data.title !== 'Walkthrough Video' ? data.title : `${projectTitle} Walkthrough Video`}
      </h2>
      <p className="section-intro" style={{ maxWidth: 880 }}>
        {data?.description || `Watch the official walkthrough video of ${projectTitle} to explore the thoughtfully designed residences, world-class amenities, and modern architecture.`}
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-5">
        {/* Video 1: Walkthrough Video */}
        <figure className="m-0">
          <button
            className="relative h-[185px] md:h-[240px] rounded-xl overflow-hidden border-0 p-0 w-full block bg-[#0f1730] cursor-pointer group shadow-sm"
            type="button"
            onClick={() => {
              if (data?.video_url) setVideoOpen(true);
              else if (onOpenModal) onOpenModal('Request Walkthrough Video');
            }}
          >
            <img
              src={resolveAssetUrl(data?.video_thumbnail || data?.poster || banner1)}
              alt="Walkthrough Video"
              className="w-full h-full object-cover brightness-[0.55] saturate-[0.8] transition-transform duration-500 group-hover:scale-105"
            />
            <span
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full bg-[#F26635] flex items-center justify-center shadow-[0_0_0_8px_rgba(242,102,53,0.25)] group-hover:scale-110 transition-transform"
              aria-label="Play video"
            >
              <span className="w-0 h-0 border-l-[19px] border-l-white border-t-[12px] border-t-transparent border-b-[12px] border-b-transparent ml-1" />
            </span>
          </button>
          <figcaption className="text-center font-bold text-xs md:text-[13px] leading-snug text-[#111D46] mt-2.5">
            Walkthrough Video
          </figcaption>
        </figure>

        {/* Video 2: Sample Flat Video (Coming Soon) */}
        <figure className="m-0">
          <button
            className="relative h-[185px] md:h-[240px] rounded-xl overflow-hidden border-0 p-0 w-full block bg-[#0f1730] cursor-pointer group shadow-sm"
            type="button"
            onClick={() => onOpenModal && onOpenModal('Notify when Sample Flat Video is ready')}
          >
            <img
              src={resolveAssetUrl(data?.sample_flat_image || banner3)}
              alt="Sample Flat Video"
              className="w-full h-full object-cover brightness-[0.55] saturate-[0.8] transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#080e20]/75 backdrop-blur-xs border border-white/20 rounded-xl py-3 px-5 text-center text-white whitespace-nowrap shadow-xl">
              <b className="block font-['Manrope',sans-serif] font-black text-2xl md:text-3xl tracking-wider">
                COMING SOON
              </b>
              <span className="text-xs text-white/80">Sample Flat Tour under production</span>
            </div>
          </button>
          <figcaption className="text-center font-bold text-xs md:text-[13px] leading-snug text-[#111D46] mt-2.5">
            Sample Flat Tour
          </figcaption>
        </figure>
      </div>
      {videoOpen && (
        <div
          className="fixed inset-0 z-[120] flex items-center justify-center bg-black/80 p-4"
          role="dialog"
          aria-modal="true"
          aria-label="Walkthrough video"
          onClick={() => setVideoOpen(false)}
        >
          <div className="relative w-full max-w-4xl" onClick={(event) => event.stopPropagation()}>
            <button
              type="button"
              onClick={() => setVideoOpen(false)}
              aria-label="Close walkthrough video"
              className="absolute -top-11 right-0 flex h-9 w-9 items-center justify-center rounded-full border-0 bg-white text-slate-900 cursor-pointer"
            >
              <X size={20} />
            </button>
            <video
              src={resolveAssetUrl(data.video_url)}
              controls
              autoPlay
              className="max-h-[80vh] w-full rounded-xl bg-black"
            />
          </div>
        </div>
      )}
    </section>
  );
}
