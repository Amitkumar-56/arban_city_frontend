import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, HardHat } from 'lucide-react';
import constructionImg from '../assets/construction.webp';

export default function ConstructionSection({ data }) {
  const rawUploaded = Array.isArray(data?.images) ? data.images : [];
  const validPhotos = rawUploaded.filter(Boolean);
  const constructionPhotos = validPhotos.length > 0 ? validPhotos : [constructionImg];
  const [currentPhoto, setCurrentPhoto] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused || constructionPhotos.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentPhoto((prev) => (prev >= constructionPhotos.length - 1 ? 0 : prev + 1));
    }, 4000);
    return () => clearInterval(interval);
  }, [isPaused, constructionPhotos.length]);

  const title = data?.title || 'Construction Status';
  const description =
    data?.description ||
    'Real progress. Real pictures. Your future home is taking shape, one milestone at a time.';

  const prevPhoto = () => {
    setCurrentPhoto((prev) => (prev === 0 ? constructionPhotos.length - 1 : prev - 1));
  };

  const nextPhoto = () => {
    setCurrentPhoto((prev) => (prev === constructionPhotos.length - 1 ? 0 : prev + 1));
  };

  const safeIndex = constructionPhotos.length > 0 ? Math.abs(currentPhoto) % constructionPhotos.length : 0;
  const currentPhotoUrl = constructionPhotos[safeIndex] || constructionImg;

  return (
    <section id="construction" className="scroll-mt-20 bg-white rounded-none border-l-0 border-y border-r border-gray-200/80 shadow-2xs p-5 sm:p-8 mb-4 overflow-hidden">
      <div className="text-center mb-7 max-w-2xl mx-auto">
        <div className="inline-block px-3 py-1 rounded-full bg-amber-50 text-amber-700 text-xs font-bold uppercase tracking-wider mb-2">
          On-Site Development
        </div>
        <h2 className="text-2xl sm:text-3xl font-black text-[#0f2444] tracking-tight">
          {title}
        </h2>
        {description && (
          <p className="text-sm sm:text-base text-gray-600 mt-2 font-medium">
            {description}
          </p>
        )}
      </div>

      <div
        className="relative max-w-3xl mx-auto rounded-2xl overflow-hidden aspect-[16/9] bg-slate-900 shadow-md group"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <img
          src={currentPhotoUrl}
          alt={title}
          data-caption="Arban City Live Construction Status"
          className="w-full h-full object-cover object-center transition-all duration-500"
        />

        <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-4 flex items-center justify-between text-white">
          <div className="flex items-center gap-2">
            <HardHat size={18} className="text-amber-400" />
            <span className="text-xs sm:text-sm font-bold">
              Site Progress Snapshot {currentPhoto + 1}
            </span>
          </div>
          <span className="text-xs bg-white/20 px-2.5 py-1 rounded-md backdrop-blur-xs font-semibold">
            {currentPhoto + 1} / {constructionPhotos.length}
          </span>
        </div>

        {constructionPhotos.length > 1 && (
          <>
            <button
              onClick={prevPhoto}
              className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/95 hover:bg-white text-gray-800 shadow-md flex items-center justify-center cursor-pointer transition-transform hover:scale-105"
              aria-label="Previous Photo"
            >
              <ChevronLeft size={22} />
            </button>
            <button
              onClick={nextPhoto}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/95 hover:bg-white text-gray-800 shadow-md flex items-center justify-center cursor-pointer transition-transform hover:scale-105"
              aria-label="Next Photo"
            >
              <ChevronRight size={22} />
            </button>
          </>
        )}
      </div>
    </section>
  );
}
