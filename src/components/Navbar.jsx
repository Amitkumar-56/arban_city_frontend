import { useState, useEffect } from 'react';
import PartnerLogo from './PartnerLogo';
import { resolveAssetUrl } from '../admin/api';

const NAV_LINKS = [
  { id: 'home', label: 'Home', shortLabel: 'Home', href: '#home' },
  { id: 'about', label: 'About', shortLabel: 'About', href: '#about' },
  { id: 'overview', label: 'Overview', shortLabel: 'Overview', href: '#overview' },
  { id: 'price', label: 'Configuration & Price', shortLabel: 'Price', href: '#price' },
  { id: 'floor-plan', label: 'Floor Plan', shortLabel: 'Floor Plan', href: '#floor-plan' },
  { id: 'elevation', label: 'Elevation Images', shortLabel: 'Elevation', href: '#elevation' },
  { id: 'gallery', label: 'Gallery', shortLabel: 'Gallery', href: '#gallery' },
  { id: 'video', label: 'Video', shortLabel: 'Video', href: '#video' },
  { id: 'location', label: 'Location', shortLabel: 'Location', href: '#location' },
];

export default function Navbar({ data }) {
  const [activeSection, setActiveSection] = useState('home');
  const [activeQuickTab, setActiveQuickTab] = useState('price');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [failedLogoImage, setFailedLogoImage] = useState('');
  const [failedPartnerLogo, setFailedPartnerLogo] = useState('');

  const logoType = data?.logo_type || 'text';
  const logoImage = data?.logo_image;
  const titlePart1 = data?.logo_text || data?.title_part1 || 'Arban';
  const titlePart2 = data?.logo_highlight || data?.title_part2 || 'City';
  const subtitle = data?.subtitle || 'SECTOR ZERO';

  // Mobile links kept completely intact
  // Mobile Menu Rows - exactly matching reference design layout
  const mobileMenuRows = [
    [
      { href: '#home', label: 'Home' },
      { href: '#about', label: 'About' },
    ],
    [
      { href: '#overview', label: 'Overview' },
      { href: '#price', label: 'Configuration & Price' },
    ],
    [
      { href: '#elevation', label: 'Elevation' },
      { href: '#amenities', label: 'Amenities' },
    ],
    [
      { href: '#video', label: 'Video' },
      { href: '#gallery', label: 'Gallery' },
    ],
    [
      { href: '#location', label: 'Location' },
      { href: '#sales-office', label: 'Sales Office' },
    ],
    [
      { href: '#developer', label: 'Developer' },
      { href: '#faq', label: 'FAQs' },
    ],
    [
      { href: '#construction', label: 'Construction' },
    ],
  ];

  const handleMobileNavClick = (e, href) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const targetId = href.replace('#', '');
    const el = document.getElementById(targetId);
    if (el) {
      const topOffset = el.getBoundingClientRect().top + window.pageYOffset - 120;
      window.scrollTo({ top: topOffset, behavior: 'smooth' });
    }
  };

  const handleQuickTabClick = (e, tabId) => {
    e.preventDefault();
    setActiveQuickTab(tabId);
    const el = document.getElementById(tabId);
    if (el) {
      const topOffset = el.getBoundingClientRect().top + window.pageYOffset - 120;
      window.scrollTo({ top: topOffset, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + 120;
      for (let i = NAV_LINKS.length - 1; i >= 0; i--) {
        const el = document.getElementById(NAV_LINKS[i].id);
        if (el && el.offsetTop <= scrollPos) {
          setActiveSection(NAV_LINKS[i].id);
          break;
        }
      }

      const quickTargets = ['floor-plan', 'price', 'gallery'];
      for (let i = quickTargets.length - 1; i >= 0; i--) {
        const el = document.getElementById(quickTargets[i]);
        if (el && el.offsetTop - 140 <= window.scrollY) {
          setActiveQuickTab(quickTargets[i]);
          break;
        }
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <header
        className="grid grid-cols-[1fr_auto_1fr] md:flex sticky top-0 z-40 h-[65px] md:h-[70px] bg-white shadow-[0_2px_20px_rgba(21,35,73,0.05)] items-center justify-between px-3 md:px-4 2xl:px-5 rounded-b-none md:rounded-b-2xl overflow-hidden"
        id="top"
      >
        <div className="contents md:flex md:items-center md:gap-1.5 xl:gap-2 md:shrink-0">
          {/* Boxed Logo with Orange Border on desktop */}
          <a
            className="col-start-1 row-start-1 justify-self-start md:col-auto md:row-auto md:justify-self-auto md:border-[1.5px] md:border-[#F26635] md:px-1.5 md:py-0.5 xl:px-2 xl:py-1 font-['Manrope',sans-serif] font-extrabold text-[13px] md:text-[13.5px] xl:text-[14.5px] leading-tight text-[#111D46] tracking-normal whitespace-nowrap bg-white flex flex-col justify-center select-none shrink-0"
            href="#home"
            aria-label={`${titlePart1} ${titlePart2} home`}
          >
            {logoType === 'image' && logoImage && failedLogoImage !== logoImage ? (
              <img
                src={resolveAssetUrl(logoImage)}
                alt={`${titlePart1} ${titlePart2}`}
                className="h-6.5 md:h-7.5 max-w-[120px] object-contain"
                onError={() => setFailedLogoImage(logoImage)}
              />
            ) : (
              <>
                <div>
                  {titlePart1}{' '}
                  <span className="text-[#F26635] not-italic">{titlePart2}</span>
                </div>
                <small className="block font-bold text-[6px] md:text-[6.5px] xl:text-[7px] tracking-[1.5px] xl:tracking-[2px] text-[#67748A] mt-0.5 uppercase">
                  {subtitle}
                </small>
              </>
            )}
          </a>
          <span className="hidden md:block w-px h-[20px] bg-[#DDE2EC]" aria-hidden="true"></span>
          <a
            className="col-start-3 row-start-1 justify-self-end flex items-center w-[76px] h-6 md:w-[90px] md:h-7 shrink-0"
            href="#home"
            aria-label="DigiPace"
          >
            {data?.partner_logo && failedPartnerLogo !== data.partner_logo ? (
              <img
                src={resolveAssetUrl(data.partner_logo)}
                alt="Partner logo"
                className="w-full h-7 object-contain"
                onError={() => setFailedPartnerLogo(data.partner_logo)}
              />
            ) : data?.partner_badge && data.partner_badge !== 'DigiPACE' ? (
              <span className="w-full text-right font-extrabold text-[11px] text-[#111D46]">{data.partner_badge}</span>
            ) : (
              <PartnerLogo className="w-full h-7 object-contain" />
            )}
          </a>
        </div>

        {/* Desktop Navigation Links - Fitted cleanly with zero overflow */}
        <nav className="hidden md:flex items-center gap-1 xl:gap-1.5 2xl:gap-3 shrink-0" id="nav" aria-label="Main navigation">
          {NAV_LINKS.map((link) => (
            <a
              key={link.id}
              href={link.href}
              className={`font-semibold text-[13px] 2xl:text-[14px] tracking-tight whitespace-nowrap py-5 px-1 lg:px-1.5 2xl:px-2 border-b-[3px] transition-colors ${activeSection === link.id
                ? 'text-[#F26635] border-[#F26635]'
                : 'text-[#4A5877] border-transparent hover:text-[#F26635] hover:border-[#F26635]'
                }`}
              onClick={() => setActiveSection(link.id)}
            >
              {link.id === 'price' ? (
                <>
                  <span className="hidden 2xl:inline">Configuration &amp; </span>Price
                </>
              ) : link.id === 'elevation' ? (
                <>
                  Elevation<span className="hidden 2xl:inline"> Images</span>
                </>
              ) : (
                link.label
              )}
            </a>
          ))}
        </nav>

        {/* Mobile Hamburger Button */}
        <button
          type="button"
          className="md:hidden col-start-2 row-start-1 justify-self-center flex items-center justify-center w-[42px] h-[40px] border border-[#d8e0ea] bg-white rounded-lg cursor-pointer self-center shrink-0 active:scale-95 transition-transform"
          id="mHamburger"
          aria-label="Toggle menu"
          aria-expanded={mobileMenuOpen}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <div className="flex flex-col gap-1.5 justify-center items-center w-5">
            <span className="w-5 h-[2px] bg-[#111D46] rounded-full"></span>
            <span className="w-5 h-[2px] bg-[#111D46] rounded-full"></span>
            <span className="w-5 h-[2px] bg-[#111D46] rounded-full"></span>
          </div>
        </button>
      </header>

      {/* Mobile Quick Navigation Tabs (Floor Plan · Price · Gallery) */}
      <nav
        aria-label="Quick project navigation"
        className="mobileQuickTabs md:hidden sticky top-[65px] z-40 grid grid-cols-3 h-[47px] w-full bg-white border-b border-[#e5e9f0] shadow-[0_3px_10px_rgba(17,29,70,0.07)]"
        id="mobileQuickTabs"
      >
        <a
          className={`flex items-center justify-center min-w-0 no-underline font-semibold text-[13px] border-b-[3px] pt-1 transition-colors ${activeQuickTab === 'floor-plan'
            ? 'text-[#f26635] border-[#f26635] active'
            : 'text-[#37445c] border-transparent hover:text-[#f26635]'
            }`}
          data-quick-tab="floor-plan"
          href="#floor-plan"
          onClick={(e) => handleQuickTabClick(e, 'floor-plan')}
        >
          Floor Plan
        </a>
        <a
          className={`flex items-center justify-center min-w-0 no-underline font-semibold text-[13px] border-b-[3px] pt-1 transition-colors ${activeQuickTab === 'price'
            ? 'text-[#f26635] border-[#f26635] active'
            : 'text-[#37445c] border-transparent hover:text-[#f26635]'
            }`}
          data-quick-tab="price"
          href="#price"
          onClick={(e) => handleQuickTabClick(e, 'price')}
        >
          Price
        </a>
        <a
          className={`flex items-center justify-center min-w-0 no-underline font-semibold text-[13px] border-b-[3px] pt-1 transition-colors ${activeQuickTab === 'gallery'
            ? 'text-[#f26635] border-[#f26635] active'
            : 'text-[#37445c] border-transparent hover:text-[#f26635]'
            }`}
          data-quick-tab="gallery"
          href="#gallery"
          onClick={(e) => handleQuickTabClick(e, 'gallery')}
        >
          Gallery
        </a>
      </nav>

      {/* Mobile Navigation Dropdown Menu Backdrop */}
      {mobileMenuOpen && (
        <div
          className="md:hidden fixed inset-0 z-40 bg-black/25"
          onClick={() => setMobileMenuOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Mobile Navigation Dropdown Menu Card - Compact height with bottom safe clearance */}
      {mobileMenuOpen && (
        <div
          className="md:hidden fixed top-[112px] inset-x-3 z-50 bg-white shadow-[0_12px_36px_rgba(17,29,70,0.18)] border border-[#E2E8F0] rounded-2xl px-4 sm:px-5 py-2 max-h-[calc(100vh-180px)] overflow-y-auto scrollbar-thin animatePop"
          id="mMenu"
          aria-label="Mobile navigation"
        >
          <div className="flex flex-col">
            {mobileMenuRows.map((row, rowIdx) => (
              <div
                key={rowIdx}
                className="grid grid-cols-2 gap-3 sm:gap-4 py-2 sm:py-2.5 border-b border-[#F0F2F6] items-center"
              >
                {row.map((item, itemIdx) => (
                  <a
                    key={itemIdx}
                    href={item.href}
                    className="text-[#18243E] no-underline font-medium text-[13.5px] sm:text-[14px] leading-tight hover:text-[#F26635] active:text-[#F26635] transition-colors py-0.5"
                    onClick={(e) => handleMobileNavClick(e, item.href)}
                  >
                    {item.label}
                  </a>
                ))}
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
