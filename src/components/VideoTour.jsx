import React, { useState } from 'react';
import { Play, Video, Clock, Bell } from 'lucide-react';
import heroSkyline from '../assets/hero_skyline.webp';

export default function VideoTour({ data, onOpenModal }) {
  const [isPlaying, setIsPlaying] = useState(false);

  const videoTitle = data?.title || 'Project Walkthrough Video';
  const videoDesc =
    data?.description ||
    'Take a virtual cinematic tour of Arban City and explore the architectural grandeur, modern layouts, and ambient surroundings.';
  const videoUrl = data?.video_url || '';
  const videoThumb = data?.video_thumbnail || heroSkyline;

  const getEmbedUrl = (url) => {
    if (!url) return '';
    if (url.includes('embed')) return url;
    if (url.includes('youtube.com/watch?v=')) {
      return `https://www.youtube.com/embed/${url.split('v=')[1]?.split('&')[0]}`;
    }
    if (url.includes('youtu.be/')) {
      return `https://www.youtube.com/embed/${url.split('youtu.be/')[1]?.split('?')[0]}`;
    }
    return url;
  };

  const embedUrl = getEmbedUrl(videoUrl);

  return (
    <section id="video" className="scroll-mt-20 bg-white rounded-none border-l-0 border-y border-r border-gray-200/80 shadow-2xs p-5 sm:p-8 mb-4 overflow-hidden">
      <div className="text-center mb-8 max-w-2xl mx-auto">
        <div className="inline-block px-3 py-1 rounded-full bg-red-50 text-red-600 text-xs font-bold uppercase tracking-wider mb-2">
          Experience the Lifestyle
        </div>
        <h2 className="text-2xl sm:text-3xl font-black text-[#0f2444] tracking-tight">
          {videoTitle}
        </h2>
        {videoDesc && (
          <p className="text-sm sm:text-base text-gray-600 mt-2 font-medium">
            {videoDesc}
          </p>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch max-w-5xl mx-auto">
        {/* Main Video Box */}
        <div className="lg:col-span-8 bg-slate-900 rounded-2xl overflow-hidden shadow-md flex items-center justify-center min-h-[300px] sm:min-h-[380px] relative group">
          {isPlaying && embedUrl ? (
            <iframe
              src={`${embedUrl}?autoplay=1`}
              title={videoTitle}
              className="w-full h-full min-h-[340px] sm:min-h-[400px] border-0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          ) : (
            <div className="relative w-full h-full min-h-[320px] sm:min-h-[380px] flex items-center justify-center">
              <img
                src={videoThumb}
                alt={videoTitle}
                data-caption={videoTitle}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 brightness-75"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

              <button
                type="button"
                onClick={() => {
                  if (embedUrl) {
                    setIsPlaying(true);
                  } else if (onOpenModal) {
                    onOpenModal('Video Tour Request');
                  }
                }}
                className="relative z-10 w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#e2572b] hover:bg-[#ea580c] text-white flex items-center justify-center shadow-2xl transition-all cursor-pointer transform hover:scale-110"
                aria-label="Play Walkthrough Video"
              >
                <Play size={32} className="ml-1 fill-white" />
              </button>

              <div className="absolute bottom-4 left-4 right-4 z-10 text-white flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-orange-400 block">
                    Official Walkthrough Tour
                  </span>
                  <span className="text-sm sm:text-base font-extrabold">{videoTitle}</span>
                </div>
                <span className="text-xs bg-black/60 px-2.5 py-1 rounded-md backdrop-blur-xs font-bold">
                  HD 1080p
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Coming Soon Companion Card - Perfectly eliminates blank space! */}
        <div className="lg:col-span-4 bg-gradient-to-br from-slate-900 to-[#0f2444] rounded-2xl p-6 text-white flex flex-col justify-between shadow-md border border-slate-800">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400/20 text-amber-300 text-xs font-extrabold uppercase tracking-wider mb-4">
              <Clock size={13} />
              <span>Coming Soon</span>
            </div>

            <h3 className="text-lg sm:text-xl font-black text-white tracking-tight mb-2">
              Virtual Sample Flat &amp; Drone Aerial Tour
            </h3>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-medium">
              360° immersive walkthrough of 2 BHK &amp; 3 BHK show residences and live construction drone footage is under production.
            </p>
          </div>

          <div className="pt-6 space-y-3">
            <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 text-xs text-slate-300">
              <strong className="text-white block font-bold mb-0.5">Be the first to see it!</strong>
              Get the video link sent straight to your WhatsApp as soon as it premieres.
            </div>

            <button
              type="button"
              onClick={() => onOpenModal && onOpenModal('Walkthrough Tour Notification')}
              className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 bg-[#e2572b] hover:bg-[#ea580c] text-white font-extrabold text-xs uppercase tracking-wider rounded-xl transition-all cursor-pointer shadow-sm"
            >
              <Bell size={15} />
              <span>Notify Me on WhatsApp</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
