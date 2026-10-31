import { useState, useEffect } from 'react';
import reraQrImg from '../assets/rera_qr.webp';
import { resolveAssetUrl } from '../admin/api';

export default function DeveloperAndRera({ data, projectTitle = 'Aveon City Sector Zero' }) {
  const devName = data?.company_name || data?.name || 'Delta Tricity';
  const desc = data?.description || (
    <>
      <b className="text-[#111D46] font-bold">{devName}</b> presents {projectTitle} in Airoli, Navi Mumbai — planned residential towers, a range of apartment configurations and shared lifestyle facilities, designed for families who want city access with open, green surroundings.
    </>
  );

  const rawProjectQr = data?.qr_image || data?.project_qr;
  const projectQr = (rawProjectQr && typeof rawProjectQr === 'string' && rawProjectQr.trim() !== '')
    ? rawProjectQr.trim()
    : (reraQrImg || '/rera_qr.webp');

  const rawDigipaceQr = data?.digipace_qr;
  const digipaceQr = (rawDigipaceQr && typeof rawDigipaceQr === 'string' && rawDigipaceQr.trim() !== '')
    ? rawDigipaceQr.trim()
    : (reraQrImg || '/rera_qr.webp');
  const devLogo = data?.developer_logo;
  const projectRera = data?.project_rera || 'PR1260002501680';
  const agentRera = data?.digipace_rera || data?.agent_rera || 'A51700026634';

  const [activeQrSlide, setActiveQrSlide] = useState(0);

  // Auto-slide between Project QR and DigiPace QR
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveQrSlide((prev) => (prev === 0 ? 1 : 0));
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="section-card" id="developer">
      <div className="grid grid-cols-1 md:grid-cols-[1.12fr_1fr] gap-6.5 items-center">
        {/* Left Column: About Developer */}
        <div>
          <div className="flex items-center gap-3.5 mb-2">
            {devLogo && (
              <img
                src={resolveAssetUrl(devLogo)}
                alt={`${devName} Logo`}
                className="h-10 md:h-12 max-w-[120px] object-contain rounded p-1 border border-[#E2E7EE] bg-white shadow-xs"
              />
            )}
            <h2 className="section-h2 text-center md:text-left m-0">About Developer</h2>
          </div>
          <p className="text-xs md:text-sm leading-relaxed text-[#535F73] mt-2">{desc}</p>
          <div className="flex gap-2.5 justify-center md:justify-start mt-4">
            {/* Facebook */}
            <a
              href={data?.social_facebook || undefined}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="w-9 h-9 rounded-full border-[1.5px] border-[#C9D1DE] flex items-center justify-center text-[#111D46] hover:border-[#F26635] hover:text-[#F26635] hover:-translate-y-0.5 transition-all shadow-xs"
            >
              <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current">
                <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
              </svg>
            </a>
            {/* Instagram */}
            <a
              href={data?.social_instagram || undefined}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="w-9 h-9 rounded-full border-[1.5px] border-[#C9D1DE] flex items-center justify-center text-[#111D46] hover:border-[#F26635] hover:text-[#F26635] hover:-translate-y-0.5 transition-all shadow-xs"
            >
              <svg viewBox="0 0 24 24" className="w-4 h-4">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" fill="none" stroke="currentColor" strokeWidth="2" />
                <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" fill="none" stroke="currentColor" strokeWidth="2" />
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </a>
            {/* LinkedIn */}
            <a
              href={data?.social_linkedin || undefined}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="w-9 h-9 rounded-full border-[1.5px] border-[#C9D1DE] flex items-center justify-center text-[#111D46] hover:border-[#F26635] hover:text-[#F26635] hover:-translate-y-0.5 transition-all shadow-xs"
            >
              <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current">
                <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z" />
                <circle cx="4" cy="4" r="2" />
              </svg>
            </a>
            {/* YouTube */}
            <a
              href={data?.social_youtube || undefined}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="YouTube"
              className="w-9 h-9 rounded-full border-[1.5px] border-[#C9D1DE] flex items-center justify-center text-[#111D46] hover:border-[#F26635] hover:text-[#F26635] hover:-translate-y-0.5 transition-all shadow-xs"
            >
              <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current">
                <path d="M22.54 6.42a2.78 2.78 0 00-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 00-1.94 2A29 29 0 001 11.75a29 29 0 00.46 5.33A2.78 2.78 0 003.4 19.1c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 001.94-2 29 29 0 00.46-5.25 29 29 0 00-.46-5.43z" />
                <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" fill="#fff" />
              </svg>
            </a>
          </div>
        </div>

        {/* Right Column: Sliding MahaRERA Panel */}
        <div className="bg-[#FBFCFE] border border-[#E2E7EE] rounded-xl p-5 md:p-5.5 grid grid-cols-1 sm:grid-cols-[42px_minmax(0,1fr)_82px] lg:grid-cols-[42px_minmax(0,1fr)_108px] gap-3 items-center text-center sm:text-left shadow-xs overflow-hidden relative">
          <div className="w-10.5 h-10.5 rounded-full bg-[#EEF2FA] flex items-center justify-center mx-auto sm:mx-0 shrink-0">
            <svg viewBox="0 0 24 24" className="w-5.5 h-5.5 stroke-[#111D46] fill-none stroke-[1.6]">
              <path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z" />
              <path d="M8.5 12l2.5 2.5 4.5-5" />
            </svg>
          </div>
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2 justify-center sm:justify-start">
              <span className="text-xs md:text-sm font-bold text-[#111D46]">
                {activeQrSlide === 0 ? 'Project MahaRERA' : 'DigiPace MahaRERA'}
              </span>
            </div>
            <b className="block text-xs md:text-sm text-[#111D46] tracking-wide mt-1">
              {activeQrSlide === 0 ? projectRera : agentRera}
            </b>

            {/* Slide switch indicator dots */}
            <div className="flex gap-1.5 mt-1 justify-center sm:justify-start">
              <button
                type="button"
                onClick={() => setActiveQrSlide(0)}
                className={`h-1.5 rounded-full transition-all border-0 cursor-pointer ${activeQrSlide === 0 ? 'w-4 bg-[#F26635]' : 'w-2 bg-[#D1D5DB]'}`}
                aria-label="View Project MahaRERA"
              />
              <button
                type="button"
                onClick={() => setActiveQrSlide(1)}
                className={`h-1.5 rounded-full transition-all border-0 cursor-pointer ${activeQrSlide === 1 ? 'w-4 bg-[#F26635]' : 'w-2 bg-[#D1D5DB]'}`}
                aria-label="View DigiPace MahaRERA"
              />
            </div>
          </div>

          {/* Sliding QR Box */}
          <div className="mx-auto sm:mx-0 shrink-0 relative w-[82px] h-[82px] lg:w-[108px] lg:h-[108px] overflow-hidden rounded-md border border-[#E2E7EE] bg-white p-1 shadow-2xs">
            <div
              className={`flex transition-transform duration-500 ease-in-out w-[148px] lg:w-[200px] h-full ${activeQrSlide === 1 ? '-translate-x-[74px] lg:-translate-x-[100px]' : 'translate-x-0'}`}
            >
              <div
                className="w-[74px] lg:w-[100px] h-full flex flex-col items-center justify-center shrink-0"
              >
                <img
                  src={resolveAssetUrl(projectQr)}
                  alt="Project MahaRERA QR"
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = '/rera_qr.webp';
                  }}
                  className="w-[68px] h-[68px] lg:w-[94px] lg:h-[94px] object-contain"
                />
              </div>
              <div
                className="w-[74px] lg:w-[100px] h-full flex flex-col items-center justify-center shrink-0"
              >
                <img
                  src={resolveAssetUrl(digipaceQr)}
                  alt="DigiPace MahaRERA QR"
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = '/rera_qr.webp';
                  }}
                  className="w-[68px] h-[68px] lg:w-[94px] lg:h-[94px] object-contain"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
