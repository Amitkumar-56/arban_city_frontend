import { useState } from 'react';
import banner1 from '../assets/banner1_min.webp';
import banner3 from '../assets/banner3_min.webp';
import { resolveAssetUrl } from '../admin/api';
import { X } from 'lucide-react';

function getYouTubeEmbedUrl(url) {
  if (!url || typeof url !== 'string') return '';
  const trimmed = url.trim();
  if (trimmed.includes('youtube.com/embed/')) return trimmed;
  const matchWatch = trimmed.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([\w-]{11})/);
  if (matchWatch && matchWatch[1]) {
    return `https://www.youtube.com/embed/${matchWatch[1]}`;
  }
  if (/^[\w-]{11}$/.test(trimmed)) {
    return `https://www.youtube.com/embed/${trimmed}`;
  }
  return '';
}

export default function VideoTour({ data, onOpenModal, projectTitle = 'Arban City Sector 0' }) {
  const [videoOpen, setVideoOpen] = useState(false);

  const videoHeading = data?.title || `${projectTitle} Walkthrough Video`;
  const youtubeEmbedUrl = getYouTubeEmbedUrl(data?.video_url);

  return (
    <section className="section-card project-video text-center" id="video">
      <h2 className="section-h2 !text-[20px] text-center font-bold text-[#111D46]">
        {videoHeading}
      </h2>

      <p className="section-intro mx-auto text-center text-[#55637D] text-xs sm:text-sm mt-1" style={{ maxWidth: 880 }}>
        {data?.description || `Take a virtual tour of ${projectTitle} and experience the spaces, amenities and lifestyle it has to offer.`}
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-5 text-left">
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
              alt={data?.video_thumbnail_alt || `${projectTitle} Walkthrough Video Preview`}
              title={data?.video_thumbnail_title || `${projectTitle} Project Walkthrough Video`}
              loading="lazy"
              decoding="async"
              className="w-full h-full object-cover brightness-[0.6] saturate-[0.8] transition-transform duration-500 group-hover:scale-105"
            />
            {/* Exactly the Orange Circle Play Button from screenshot */}
            <span
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full bg-[#EA5824] flex items-center justify-center shadow-[0_0_0_8px_rgba(234,88,36,0.3)] group-hover:scale-110 transition-transform cursor-pointer"
              aria-label="Play video"
            >
              <span className="w-0 h-0 border-l-[18px] border-l-white border-t-[11px] border-t-transparent border-b-[11px] border-b-transparent ml-1" />
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
              alt={data?.sample_flat_image_alt || `${projectTitle} Sample Flat Video Tour Preview`}
              title={data?.sample_flat_image_title || `${projectTitle} Sample Flat Video Tour`}
              loading="lazy"
              decoding="async"
              className="w-full h-full object-cover brightness-[0.6] saturate-[0.8] transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#0d162a]/85 backdrop-blur-xs border border-white/10 rounded-xl py-3 px-5 text-center text-white whitespace-nowrap shadow-xl">
              <b className="block font-['Manrope',sans-serif] font-black text-lg md:text-xl tracking-wider">
                COMING SOON
              </b>
              <span className="text-[11px] text-white/80">Sample Flat Tour under production</span>
            </div>
          </button>
          <figcaption className="text-center font-bold text-xs md:text-[13px] leading-snug text-[#111D46] mt-2.5">
            Sample Flat Tour
          </figcaption>
        </figure>
      </div>

      {/* Video Popup Modal with YouTube Iframe or Video file */}
      {videoOpen && (
        <div
          className="fixed inset-0 z-[120] flex items-center justify-center bg-black/85 p-4"
          role="dialog"
          aria-modal="true"
          aria-label="Walkthrough video"
          onClick={() => setVideoOpen(false)}
        >
          <div className="relative w-full max-w-4xl aspect-video rounded-2xl overflow-hidden bg-black shadow-2xl" onClick={(event) => event.stopPropagation()}>
            <button
              type="button"
              onClick={() => setVideoOpen(false)}
              aria-label="Close walkthrough video"
              className="absolute top-3 right-3 z-20 flex h-9 w-9 items-center justify-center rounded-full border-0 bg-white/90 hover:bg-white text-slate-900 cursor-pointer shadow-md transition-all"
            >
              <X size={20} />
            </button>
            {youtubeEmbedUrl ? (
              <iframe
                src={`${youtubeEmbedUrl}?autoplay=1&rel=0`}
                title={videoHeading}
                width="1280"
                height="720"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="w-full h-full border-0"
              />
            ) : data?.video_url ? (
              <video
                src={resolveAssetUrl(data?.video_url)}
                controls
                autoPlay
                className="w-full h-full object-contain bg-black"
              />
            ) : null}
          </div>
        </div>
      )}
    </section>
  );
}
