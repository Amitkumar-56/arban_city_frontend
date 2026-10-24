import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Download } from 'lucide-react';
import heroSkyline from '../assets/hero_skyline.webp';
import gallery1 from '../assets/gallery1_min.webp';
import gallery2 from '../assets/gallery2_min.webp';
import gallery3 from '../assets/gallery3_min.webp';

export default function ElevationGallery({ data, onOpenModal, projectTitle = 'Arban City Sector 0' }) {
  const defaultItems = [
    { id: 'def-1', title: 'Grand Elevation Tower View', image_url: gallery1 },
    { id: 'def-2', title: 'Skyline & Podium Architecture', image_url: gallery2 },
    { id: 'def-3', title: 'Landscape Gardens & Clubhouse', image_url: gallery3 },
    { id: 'def-4', title: 'Sunset Silhouette Tower View', image_url: heroSkyline },
  ];

  const rawList = Array.isArray(data?.items) ? data.items : [];
  const validItems = rawList.filter((item) => item && typeof item.image_url === 'string' && item.image_url.trim().length > 0);
  const items = validItems.length > 0 ? validItems : defaultItems;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused || items.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev >= items.length - 1 ? 0 : prev + 1));
    }, 3800);
    return () => clearInterval(interval);
  }, [isPaused, items.length]);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev <= 0 ? items.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev >= items.length - 1 ? 0 : prev + 1));
  };

  const safeIndex = items.length > 0 ? ((currentIndex % items.length) + items.length) % items.length : 0;
  const currentItem = items[safeIndex] || items[0] || defaultItems[0];

  return (
    <section id="gallery" className="scroll-mt-20 bg-white rounded-none border-l-0 border-y border-r border-gray-200/80 shadow-2xs p-5 sm:p-8 mb-4">
      {/* Top Header Row matching Kohinoor */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-5">
        <h2 className="text-xl sm:text-2xl font-black text-gray-900 tracking-tight">
          Gallery Of {projectTitle}
        </h2>
        <button
          type="button"
          onClick={() => onOpenModal && onOpenModal('Download Complete Gallery & Lookbook')}
          className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-[#8f7635] hover:bg-[#7a642b] text-white font-extrabold text-xs sm:text-sm rounded-md transition-all cursor-pointer shadow-xs uppercase tracking-wide shrink-0 self-start sm:self-auto"
        >
          <Download size={16} />
          <span>Download Gallery</span>
        </button>
      </div>

      {/* Main Image Slider with prev/next arrows */}
      <div
        className="relative rounded-md overflow-hidden bg-slate-900 aspect-[16/9] max-w-4xl mx-auto shadow-2xs group"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <img
          src={currentItem?.image_url || heroSkyline}
          alt={currentItem?.title || 'Elevation Image'}
          data-caption={currentItem?.title || 'Arban City Elevation View'}
          className="w-full h-full object-cover object-center transition-all duration-300"
        />

        {/* Circular Prev/Next Controls */}
        <button
          type="button"
          onClick={prevSlide}
          aria-label="Previous Slide"
          className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-black/60 hover:bg-[#8f7635] text-white flex items-center justify-center transition-all cursor-pointer shadow-md"
        >
          <ChevronLeft size={22} />
        </button>
        <button
          type="button"
          onClick={nextSlide}
          aria-label="Next Slide"
          className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-black/60 hover:bg-[#8f7635] text-white flex items-center justify-center transition-all cursor-pointer shadow-md"
        >
          <ChevronRight size={22} />
        </button>

        {/* Bottom Caption Overlay */}
        <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-3 sm:p-4 text-white text-xs sm:text-sm font-bold flex justify-between items-center">
          <span>{currentItem?.title || 'Elevation View'}</span>
          <span className="text-[11px] text-white/80 font-normal">
            {safeIndex + 1} / {items.length}
          </span>
        </div>
      </div>

      {/* Thumbnail Bar */}
      {items.length > 1 && (
        <div className="flex items-center justify-center gap-2.5 mt-4 overflow-x-auto py-1">
          {items.map((item, idx) => (
            <button
              key={item.id || idx}
              type="button"
              onClick={() => setCurrentIndex(idx)}
              className={`w-16 h-12 rounded-sm overflow-hidden border-2 transition-all cursor-pointer shrink-0 ${
                idx === safeIndex ? 'border-[#8f7635] scale-105' : 'border-gray-200 opacity-60 hover:opacity-100'
              }`}
            >
              <img
                src={item.image_url || heroSkyline}
                alt={item.title || `Thumbnail ${idx + 1}`}
                data-caption={item.title || `Thumbnail ${idx + 1}`}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </section>
  );
}
