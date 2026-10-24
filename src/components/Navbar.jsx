import React, { useState } from 'react';
import { Menu, X, User } from 'lucide-react';
import brandLogo from '../assets/logo.webp';
import partnerLogoImg from '../assets/partner_logo.webp';

export default function Navbar({ data, onOpenModal }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const logoType = data?.logo_type || data?.logoType || 'image';
  const logoText = data?.logo_text || data?.logoPart1 || 'Kohinoor';
  const logoHighlight = data?.logo_highlight || data?.logoPart2 || 'Central Park';
  const logoImage = data?.logo_image || data?.logoImage || '';
  const partnerBadge = data?.partner_badge || data?.partnerBadge || 'DigiPACE';
  const partnerLogo = data?.partner_logo || '';
  const whatsappNumber = data?.whatsapp || '919228170794';

  const navLinks = [
    { name: 'Floor Plan', href: '#floor-plan' },
    { name: 'Price', href: '#price' },
    { name: 'Amenities', href: '#amenities' },
    { name: 'Elevation Images', href: '#gallery' },
    { name: 'Video', href: '#video' },
    { name: 'About', href: '#about' },
    { name: 'Overview', href: '#overview' },
    { name: 'Location', href: '#location' },
    { name: 'Developer', href: '#developer' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-xs">
      <div className="w-full px-3 sm:px-5 lg:px-6">
        <div className="flex items-center justify-between h-18">
          {/* Brand & Partner Logo matching Kohinoor Central Park */}
          <div className="flex items-center gap-2 sm:gap-4 shrink-0">
            <a href="#" className="flex items-center gap-2 group shrink-0">
              <img
                src={logoType === 'image' && logoImage ? logoImage : brandLogo}
                alt={`${logoText} ${logoHighlight}`}
                className="h-9 sm:h-11 w-auto max-w-[210px] sm:max-w-[275px] object-contain"
              />
            </a>

            <div className="h-6 w-px bg-slate-300 hidden md:block"></div>

            {partnerLogo ? (
              <img src={partnerLogo} alt={partnerBadge} className="h-7 max-w-[130px] object-contain hidden sm:block" />
            ) : (
              <img
                src={partnerLogoImg}
                alt="Authorized Channel Partner"
                className="h-8 sm:h-10 max-w-[140px] sm:max-w-[160px] object-contain hidden sm:block"
              />
            )}
          </div>

          {/* Navigation Menu (Preserved Completely as requested) */}
          <nav className="hidden xl:flex items-center space-x-4 lg:space-x-5 text-sm font-semibold text-gray-700">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="hover:text-[#8f7635] transition-colors whitespace-nowrap cursor-pointer py-1"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Right Header Box matching Kohinoor Central Park */}
          <div className="hidden lg:flex items-center gap-2 shrink-0">
            {/* Pre Register Dark Button */}
            <button
              type="button"
              onClick={() => onOpenModal && onOpenModal('Pre-Register Here for Site Visit')}
              className="flex items-center gap-2 bg-[#0d1624] hover:bg-[#1a2638] text-white px-3.5 py-2 rounded-md font-bold text-xs sm:text-sm transition-all cursor-pointer shadow-xs"
            >
              <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center text-white">
                <User size={13} />
              </div>
              <span>Pre Register</span>
            </button>

            {/* WhatsApp Green Icon Button */}
            <a
              href={`https://wa.me/${whatsappNumber}?text=Hi,%20I%20am%20interested%20in%20learning%20more%20about%20the%20project.`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Chat on WhatsApp"
              className="w-10 h-10 rounded-md bg-[#25D366] hover:bg-[#20ba59] flex items-center justify-center text-white shadow-xs transition-transform hover:scale-105"
            >
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.842-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
              </svg>
            </a>
          </div>

          {/* Mobile Toggle Button only (Enquire moved inside toggle drawer as requested) */}
          <div className="flex xl:hidden items-center">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle Menu"
              className="p-2 border border-gray-300 rounded-md text-gray-700 hover:text-gray-900 focus:outline-none cursor-pointer"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-white border-b border-gray-200 px-5 pt-3 pb-6 space-y-1.5 shadow-xl">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3.5 py-2 text-sm font-semibold text-gray-800 hover:text-[#8f7635] hover:bg-slate-50 rounded-md"
            >
              {link.name}
            </a>
          ))}
          <div className="pt-3 border-t border-gray-100 flex items-center justify-between gap-3">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenModal('Pre-Register Here for Site Visit');
              }}
              className="flex-1 text-center text-xs font-bold bg-[#8f7635] text-white px-4 py-2.5 rounded-md shadow-xs"
            >
              Pre Register
            </button>
            <a
              href={`https://wa.me/${whatsappNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-md bg-[#25D366] flex items-center justify-center text-white shrink-0"
            >
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.842-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
              </svg>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
