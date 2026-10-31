import { useState, useEffect } from 'react';
import banner1 from '../assets/banner1_min.webp';
import banner2 from '../assets/banner2_min.webp';
import banner3 from '../assets/banner3_min.webp';
import heroSkyline from '../assets/hero_skyline.webp';
import reraQrImg from '../assets/rera_qr.webp';
import { resolveAssetUrl } from '../admin/api';

export default function Hero({ data, developerData, onOpenModal }) {
  const projectName = data?.title || 'Aveon City Sector Zero';
  const location = data?.location || 'Airoli, Navi Mumbai';
  const developer = data?.developer || 'Delta Tricity';
  const tag = data?.tag || 'NAVI MUMBAI · AIROLI';

  const defaultStats = [
    { label: data?.area_lbl || 'Land Parcel', value: data?.area_val || '5.5 Acres' },
    { label: data?.towers_lbl || 'Towers', value: data?.towers_val || '3 High Rise' },
    { label: data?.storey_lbl || 'Structure', value: data?.storey_val || '35+ Storeys' },
  ];

  const stats = data?.stats || defaultStats;
  const configText = data?.config_text || '1, 2 & 3 BHK Residences';
  const price = data?.price_text || '₹89 Lacs';
  const priceSub = data?.price_subtext || '* onwards';

  const defaultBanners = [
    { img: banner1, title: 'Grand Elevation View', sub: '3 High-Rise Luxury Towers' },
    { img: banner2, title: 'Podium & Amenities', sub: '35+ Modern Lifestyle Features' },
    { img: banner3, title: 'Sample Flat Living', sub: 'Spacious 1, 2 & 3 BHK Layouts' },
    { img: heroSkyline, title: 'Aerial Project View', sub: '5.5 Acres Prime Residential Parcel' },
  ];

  const slides = Array.isArray(data?.banners) && data.banners.length > 0
    ? data.banners.map((b) => (typeof b === 'string' ? { img: b, title: 'Project Showcase', sub: '' } : b))
    : data?.hero_image
      ? [{ img: data.hero_image, title: projectName, sub: location }]
      : defaultBanners;

  const [activeSlide, setActiveSlide] = useState(0);
  const [activeQrSlide, setActiveQrSlide] = useState(0);
  const projectRera = developerData?.project_rera || 'PR1260002501680';
  const agentRera = developerData?.digipace_rera || developerData?.agent_rera || 'A51700026634';
  const projectQr = developerData?.project_qr || developerData?.qr_image || reraQrImg;
  const digipaceQr = developerData?.digipace_qr || reraQrImg;

  useEffect(() => {
    if (slides.length <= 1) return;
    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % slides.length);
    }, 4500);
    return () => clearInterval(interval);
  }, [slides.length]);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveQrSlide((prev) => (prev === 0 ? 1 : 0));
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section
      className="hero relative min-h-[495px] rounded-[17px] overflow-hidden mt-4 flex items-center scroll-mt-24 bg-[#1d2a4a] max-md:flex max-md:flex-col max-md:mt-2.5 max-md:min-h-0 max-md:rounded-[14px] max-md:bg-white shadow-[0_4px_22px_rgba(25,41,74,0.07)] isolation-auto"
      id="home"
      aria-label={projectName}
    >
      {/* Slideshow background */}
      <div className="slides absolute inset-0 max-md:relative max-md:w-full max-md:h-[245px] max-md:shrink-0 max-md:inset-auto overflow-hidden">
        {slides.map((s, idx) => (
          <div
            key={idx}
            className={`slide absolute inset-0 transition-opacity duration-700 ease-in-out ${
              activeSlide === idx ? 'opacity-100 z-1' : 'opacity-0 z-0 pointer-events-none'
            }`}
          >
            <img
              src={resolveAssetUrl(s.img)}
              alt={`${projectName} Slide ${idx + 1}`}
              className="w-full h-full object-cover max-md:h-[245px]"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#051025]/40 via-transparent to-transparent max-md:bg-gradient-to-t max-md:from-[#051025]/25" />
            {s.title && (
              <div className="hidden md:block absolute right-5.5 bottom-10 z-10 text-right text-white drop-shadow">
                <b className="block font-['Manrope',sans-serif] font-extrabold text-[14px]">{s.title}</b>
                {s.sub && <span className="text-[14px] text-white/80">{s.sub}</span>}
              </div>
            )}
          </div>
        ))}

        {/* Top-Left Location Badge */}
        <span className="locTag absolute top-4.5 right-4.5 max-md:top-3 max-md:left-3 max-md:right-auto z-10 bg-white text-[#111D46] rounded-full px-3.5 py-1.5 max-md:px-3 max-md:py-1 font-extrabold text-[11px] max-md:text-[9px] tracking-wider shadow-md max-md:max-w-[calc(100%-100px)] whitespace-nowrap">
          {tag}
        </span>

        {/* MahaRERA QR Badge (Mobile Only, Hidden on Desktop) */}
        <div className="heroReraQr hidden max-md:flex absolute top-3 right-3 z-12 flex-col items-center justify-center gap-0.5 w-[88px] p-[5px] border border-[#e8ebf0] rounded-[9px] bg-white/98 shadow-[0_4px_14px_#12223d38] leading-tight">
          <span className="heroQrLabel text-[#111D46] font-bold text-[8px] text-center leading-tight">
            {activeQrSlide === 0 ? 'Project MahaRERA' : 'DigiPace MahaRERA'}
          </span>
          <img
            alt={activeQrSlide === 0 ? 'Project MahaRERA QR code' : 'DigiPace MahaRERA QR code'}
            src={resolveAssetUrl(activeQrSlide === 0 ? projectQr : digipaceQr)}
            onError={(event) => {
              event.currentTarget.onerror = null;
              event.currentTarget.src = reraQrImg;
            }}
            className="block w-[64px] h-[64px] object-contain bg-white my-0.5"
          />
          <span className="heroQrCaption w-full max-w-full break-all text-[#56627A] font-semibold text-[8px] text-center leading-tight">
            {activeQrSlide === 0 ? projectRera : agentRera}
          </span>
          <div className="flex justify-center gap-1 mt-1">
            {[0, 1].map((slide) => (
              <button
                key={slide}
                type="button"
                onClick={() => setActiveQrSlide(slide)}
                aria-label={`Show ${slide === 0 ? 'Project' : 'DigiPace'} MahaRERA QR`}
                className={`h-1 rounded-full border-0 p-0 ${
                  activeQrSlide === slide ? 'w-3 bg-[#F26635]' : 'w-1 bg-[#D1D5DB]'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Slide Indicators */}
        <div className="heroDots absolute bottom-4 inset-x-0 flex justify-center gap-1.5 z-10 max-md:top-[224px] max-md:bottom-auto">
          {slides.map((_, idx) => (
            <button
              key={idx}
              type="button"
              className={`h-2 rounded-full border-0 p-0 transition-all cursor-pointer ${
                activeSlide === idx ? 'w-5.5 bg-white' : 'w-2 bg-white/55'
              }`}
              onClick={() => setActiveSlide(idx)}
              aria-label={`Slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Hero Card */}
      <div className="heroCard relative z-20 ml-5.5 max-md:ml-0 w-[335px] max-w-[calc(100%-44px)] max-md:max-w-full max-md:w-full bg-white rounded-xl max-md:rounded-none p-7 max-md:p-4.5 max-md:pt-5 max-md:pb-5.5 shadow-[0_15px_38px_rgba(10,16,35,0.27)] max-md:shadow-none text-center">
        <h1 className="font-['Manrope',sans-serif] text-[24px] font-extrabold tracking-tight text-[#111D46] leading-tight">
          {projectName}
        </h1>
        <div className="text-[14px] text-[#67748A] mt-1.5">
          At <span>{location}</span> · By <b className="text-[#B96533]">{developer}</b>
        </div>

        {/* 3 Metric Stats */}
        <div className="grid grid-cols-3 my-3.5 bg-[#F6F7F9] border border-[#ECEEF2] rounded-lg divide-x divide-[#E1E4EA]">
          {stats.map((st, i) => (
            <div key={i} className="py-2 px-1">
              <small className="block text-[14px] text-[#67748A] leading-tight">{st.label}</small>
              <b className="font-['Manrope',sans-serif] font-extrabold text-[14px] text-[#111D46] tabular-nums leading-snug">
                {st.value}
              </b>
            </div>
          ))}
        </div>

        {/* Highlight Offers */}
        <div className="grid gap-1.5 mb-3">
          <span className="block py-1.5 px-2 rounded font-bold text-[14px] leading-snug fxGrad fxBounce">
            Booking Open · Prime Location
          </span>
          <span className="block py-1.5 px-2 rounded font-bold text-[14px] leading-snug fxGrad fxBounce">
            35+ Lifestyle Amenities
          </span>
          <span className="block py-1.5 px-2 rounded font-bold text-[14px] leading-snug fxGrad fxBounce">
            Near Airoli Station &amp; Mindspace IT Park
          </span>
        </div>

        <div className="font-['Manrope',sans-serif] font-extrabold text-[14px] text-[#111D46]">
          {configText}
        </div>
        <div className="text-xs text-[#67748A] mt-1.5">Starting at</div>
        <div className="font-['Manrope',sans-serif] font-extrabold text-[15px] text-[#111D46] leading-snug">
          {price} <span className="font-extrabold">{priceSub}</span>
        </div>

        <button
          className="mt-3.5 min-w-[178px] h-11 px-5 border-0 rounded-lg text-white font-extrabold text-sm font-['Manrope',sans-serif] cursor-pointer fxGrad fxScale shadow-md inline-flex items-center justify-center"
          type="button"
          onClick={() => onOpenModal && onOpenModal('Book a Site Visit')}
        >
          Book a Site Visit
        </button>
      </div>
    </section>
  );
}
