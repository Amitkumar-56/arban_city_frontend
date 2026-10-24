import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import heroSkyline from '../assets/hero_skyline.webp';
import banner1 from '../assets/banner1_min.webp';
import banner2 from '../assets/banner2_min.webp';
import banner3 from '../assets/banner3_min.webp';

export default function Hero({ data, onOpenModal }) {
  const title = data?.title || 'Arban City Sector 0';
  const location = data?.location || 'At Airoli, Navi Mumbai';
  const developer = data?.developer || 'Delta & Tricity Group';
  const areaVal = data?.area_val || data?.areaValue || '5.5 Acre';
  const areaLbl = data?.area_lbl || data?.areaLabel || 'Land Area';
  const towersVal = data?.towers_val || data?.towersValue || '3';
  const towersLbl = data?.towers_lbl || data?.towersLabel || 'Towers';
  const storeyVal = data?.storey_val || data?.storeyValue || 'G+35 Floors';
  const storeyLbl = data?.storey_lbl || data?.storeyLabel || 'Storeys';
  const configText = data?.config_text || data?.configText || 'Grand 1, 2 & 3 BHK Luxury Residences';
  const priceText = data?.price_text || data?.priceText || '₹ 89 Lacs';
  const priceSubtext = data?.price_subtext || data?.priceSubtext || 'Onwards';

  const defaultBanners = [banner1, banner2, banner3, heroSkyline];
  const customBanners = Array.isArray(data?.banners) ? data.banners.filter(Boolean) : [];
  const banners = customBanners.length > 0 ? customBanners : (data?.hero_image ? [data.hero_image, banner1, banner2, banner3] : defaultBanners);

  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused || banners.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % banners.length);
    }, 4500);
    return () => clearInterval(interval);
  }, [isPaused, banners.length]);

  const prevBanner = () => {
    setCurrentSlide((prev) => (prev <= 0 ? banners.length - 1 : prev - 1));
  };

  const nextBanner = () => {
    setCurrentSlide((prev) => (prev >= banners.length - 1 ? 0 : prev + 1));
  };

  return (
    <section
      className="relative w-full overflow-hidden mb-4 bg-slate-900 rounded-none border-b border-gray-200 group"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Background Hero Banner Slider */}
      <div className="relative min-h-[580px] lg:min-h-[540px] w-full flex items-center">
        {banners.map((img, idx) => (
          <img
            key={idx}
            src={img}
            alt={`${title} Slide ${idx + 1}`}
            className={`absolute inset-0 w-full h-full object-cover object-center brightness-90 transition-opacity duration-1000 ${
              idx === currentSlide ? 'opacity-100 z-0' : 'opacity-0 pointer-events-none'
            }`}
          />
        ))}
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-black/20 z-0" />

        {/* Prev / Next Controls */}
        {banners.length > 1 && (
          <>
            <button
              type="button"
              onClick={prevBanner}
              aria-label="Previous Slide"
              className="absolute left-2 top-1/2 -translate-y-1/2 z-20 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-black/40 hover:bg-[#8f7635] text-white flex items-center justify-center transition-all cursor-pointer shadow-md opacity-0 group-hover:opacity-100"
            >
              <ChevronLeft size={22} />
            </button>
            <button
              type="button"
              onClick={nextBanner}
              aria-label="Next Slide"
              className="absolute right-2 top-1/2 -translate-y-1/2 z-20 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-black/40 hover:bg-[#8f7635] text-white flex items-center justify-center transition-all cursor-pointer shadow-md opacity-0 group-hover:opacity-100"
            >
              <ChevronRight size={22} />
            </button>
          </>
        )}

        {/* Kohinoor Floating Overlay Card on Left Side */}
        <div className="relative z-10 w-full max-w-[400px] m-2.5 sm:m-4 lg:ml-3 my-4">
          <div className="rounded-md overflow-hidden shadow-2xl border border-white/30 bg-white">
            {/* Top Strip */}
            <div className="bg-[#483f27] text-white text-xs font-bold py-2 px-3 text-center tracking-wider uppercase">
              Booking Open: Limited Time Only
            </div>

            {/* Card Content */}
            <div className="p-5 sm:p-6 space-y-4">
              <div className="text-center">
                {/* Single Line H1 Project Name as Requested */}
                <h1 className="text-xl sm:text-2xl font-black text-gray-900 tracking-tight leading-snug whitespace-nowrap overflow-hidden text-ellipsis">
                  {title}
                </h1>
                <p className="text-xs sm:text-sm font-semibold text-gray-600 mt-1">
                  {location} By <strong className="text-gray-900 font-bold">{developer}</strong>
                </p>
              </div>

              {/* Quick Facts Row */}
              <div className="flex items-center justify-around py-2.5 px-3 bg-slate-50 border border-slate-200/80 rounded-xl text-center">
                <div>
                  <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider block">
                    {areaLbl}
                  </span>
                  <span className="text-xs sm:text-sm font-extrabold text-[#0f2444]">
                    {areaVal}
                  </span>
                </div>
                <div className="h-6 w-px bg-slate-200"></div>
                <div>
                  <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider block">
                    {towersLbl}
                  </span>
                  <span className="text-xs sm:text-sm font-extrabold text-[#0f2444]">
                    {towersVal} Iconic
                  </span>
                </div>
                <div className="h-6 w-px bg-slate-200"></div>
                <div>
                  <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider block">
                    {storeyLbl}
                  </span>
                  <span className="text-xs sm:text-sm font-extrabold text-[#0f2444]">
                    {storeyVal}
                  </span>
                </div>
              </div>

              {/* Kohinoor Dashed Highlight Box */}
              <div className="bg-[#453c24] border border-dashed border-[#c5a967] rounded-xl p-3.5 text-center text-white space-y-1 shadow-inner">
                <p className="text-xs sm:text-[13px] font-bold text-[#fef08a] leading-tight">
                  Nature-Rich Living In Airoli's Heart
                </p>
                <p className="text-[11px] sm:text-xs text-white/95 font-medium">
                  {towersVal} Towers With {storeyVal}
                </p>
                <p className="text-[11px] sm:text-xs text-white/90 font-medium">
                  Get Early Bird &amp; On Spot Offers
                </p>
                <p className="text-[11px] sm:text-xs text-[#fde047] font-semibold">
                  Avail Flexible Payment Plans
                </p>
              </div>

              {/* Pricing Section */}
              <div className="text-center pt-1">
                <span className="text-[11px] font-semibold text-gray-600 block">
                  {configText} Starts From
                </span>
                <div className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight mt-0.5">
                  {priceText} <span className="text-xs sm:text-sm font-bold text-gray-600">{priceSubtext}</span>
                </div>
              </div>

              {/* Book a Site Visit Button */}
              <button
                type="button"
                onClick={() => onOpenModal && onOpenModal('Book a Site Visit')}
                className="w-full text-white font-black py-3.5 px-4 rounded-xl text-xs sm:text-sm uppercase tracking-widest cursor-pointer shadow-md hover:shadow-xl btn-animated-pulse"
              >
                Book a Site Visit
              </button>
            </div>
          </div>
        </div>

        {/* Carousel indicator dots at bottom center */}
        {banners.length > 1 && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 z-20">
            {banners.map((_, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setCurrentSlide(idx)}
                aria-label={`Go to slide ${idx + 1}`}
                className={`h-2 rounded-full transition-all cursor-pointer ${
                  idx === currentSlide ? 'w-8 bg-[#8f7635]' : 'w-2.5 bg-white/60 hover:bg-white'
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
