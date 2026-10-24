import React, { useState } from 'react';
import { Play } from 'lucide-react';
import heroSkyline from '../assets/hero_skyline.webp';

export default function AmenitiesAndVideo({ data, videoData, onOpenModal }) {
  const [isPlaying, setIsPlaying] = useState(false);

  const externalAmenities = Array.isArray(data?.external) ? data.external : [];
  const internalAmenities = Array.isArray(data?.internal) ? data.internal : [];

  const videoTitle = videoData?.title || 'Walkthrough Video';
  const videoDesc = videoData?.description || '';
  const videoUrl = videoData?.video_url || '';
  const videoThumb = videoData?.video_thumbnail || heroSkyline;

  return (
    <div id="amenities" className="scroll-mt-20 grid grid-cols-1 lg:grid-cols-12 gap-6 mb-6">
      <div className="lg:col-span-7 bg-white rounded-2xl border border-gray-200 shadow-sm p-6 sm:p-9 flex flex-col justify-between overflow-hidden">
        <div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0f2444] break-words tracking-tight">
            Amenities
          </h2>
          <p className="text-sm sm:text-base text-gray-600 mt-2 mb-7 break-words leading-relaxed font-medium">
            Enjoy a host of modern lifestyle amenities designed to elevate your living experience and provide ultimate comfort.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-7">
            {externalAmenities.length > 0 && (
              <div className="min-w-0">
                <h3 className="text-sm font-bold text-gray-800 uppercase tracking-wider mb-3.5">
                  External Amenities
                </h3>
                <ul className="space-y-2.5 text-sm sm:text-[15px] font-medium text-gray-700">
                  {externalAmenities.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2.5">
                      <span className="w-2 h-2 rounded-full bg-[#e2572b] mt-1.5 shrink-0" />
                      <span className="break-words min-w-0">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {internalAmenities.length > 0 && (
              <div className="min-w-0">
                <h3 className="text-sm font-bold text-gray-800 uppercase tracking-wider mb-3.5">
                  Internal Amenities
                </h3>
                <ul className="space-y-2.5 text-sm sm:text-[15px] font-medium text-gray-700">
                  {internalAmenities.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2.5">
                      <span className="w-2 h-2 rounded-full bg-gray-400 mt-1.5 shrink-0" />
                      <span className="break-words min-w-0">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>

      <div id="video" className="scroll-mt-20 lg:col-span-5 bg-white rounded-2xl border border-gray-200 shadow-sm p-6 sm:p-9 flex flex-col justify-between overflow-hidden">
        <div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0f2444] break-words tracking-tight">
            {videoTitle}
          </h2>
          {videoDesc && (
            <p className="text-sm sm:text-base text-gray-600 mt-2 mb-6 break-words leading-relaxed font-medium">
              {videoDesc}
            </p>
          )}
        </div>

        <div className="relative rounded-xl overflow-hidden aspect-[16/9] bg-gray-900 shadow-2xs group flex items-center justify-center">
          {isPlaying && videoUrl ? (
            <iframe
              src={videoUrl.includes('embed') ? videoUrl : `https://www.youtube.com/embed/${videoUrl.split('v=')[1] || videoUrl.split('/').pop()}`}
              title={videoTitle}
              className="w-full h-full border-0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          ) : (
            <>
              <img
                src={videoThumb}
                alt={videoTitle}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors" />
              <button
                type="button"
                onClick={() => {
                  if (videoUrl) {
                    setIsPlaying(true);
                  } else if (onOpenModal) {
                    onOpenModal('Video Tour Request');
                  }
                }}
                className="relative z-10 w-14 h-14 rounded-full bg-[#e2572b] hover:bg-[#ea580c] text-white flex items-center justify-center shadow-lg transition-transform hover:scale-110 cursor-pointer"
                aria-label="Play video"
              >
                <Play className="w-6 h-6 fill-white ml-0.5" />
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
