import React, { useState, useEffect, useRef, useCallback } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import SidebarEnquiry from './components/SidebarEnquiry';
import VerticalEnquiryButton from './components/VerticalEnquiryButton';
import MobileBottomBar from './components/MobileBottomBar';
import MobileEnquiry from './components/MobileEnquiry';
import { fetchAllData } from './admin/api';

const About = React.lazy(() => import('./components/About'));
const Overview = React.lazy(() => import('./components/Overview'));
const PropertySpecification = React.lazy(() => import('./components/PropertySpecification'));
const PricingTable = React.lazy(() => import('./components/PricingTable'));
const ElevationGallery = React.lazy(() => import('./components/ElevationGallery'));
const Amenities = React.lazy(() => import('./components/Amenities'));
const GallerySection = React.lazy(() => import('./components/GallerySection'));
const VideoTour = React.lazy(() => import('./components/VideoTour'));
const Location = React.lazy(() => import('./components/Location'));
const SalesOffice = React.lazy(() => import('./components/SalesOffice'));
const DeveloperAndRera = React.lazy(() => import('./components/DeveloperAndRera'));
const FaqSection = React.lazy(() => import('./components/FaqSection'));
const ConstructionSection = React.lazy(() => import('./components/ConstructionSection'));
const Footer = React.lazy(() => import('./components/Footer'));
const EnquiryModal = React.lazy(() => import('./components/EnquiryModal'));
const AdminLayout = React.lazy(() => import('./admin/AdminLayout'));
const PrivacyPolicyPage = React.lazy(() => import('./components/PrivacyPolicyPage'));

class SectionErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Section Error caught:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return null;
    }
    return this.props.children;
  }
}

function DeferredSection({ children, anchorIds = [], minHeight = 280 }) {
  const sectionRef = useRef(null);
  const [isNearViewport, setIsNearViewport] = useState(
    () => (
      !('IntersectionObserver' in window)
      || anchorIds.includes(decodeURIComponent(window.location.hash.slice(1)))
    ),
  );

  useEffect(() => {
    if (isNearViewport) return undefined;
    const section = sectionRef.current;
    if (!section || !('IntersectionObserver' in window)) {
      setIsNearViewport(true);
      return undefined;
    }

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsNearViewport(true);
        observer.disconnect();
      }
    }, { rootMargin: '600px 0px' });

    observer.observe(section);
    return () => observer.disconnect();
  }, [isNearViewport]);

  return (
    <div
      ref={sectionRef}
      className="relative w-full"
      style={isNearViewport ? undefined : { minHeight }}
    >
      {anchorIds.map((id) => (
        <span key={id} id={id} className="absolute -top-20" aria-hidden="true" />
      ))}
      {isNearViewport && (
        <SectionErrorBoundary>
          <React.Suspense fallback={<div className="w-full bg-white/50 animate-pulse rounded-lg" style={{ minHeight }} />}>
            {children}
          </React.Suspense>
        </SectionErrorBoundary>
      )}
    </div>
  );
}

const isAdminRoute = () => {
  const path = window.location.pathname.toLowerCase();
  const hash = window.location.hash.toLowerCase();
  return path === '/admin' || path.startsWith('/admin/') || hash === '#admin' || hash.startsWith('#/admin');
};

const isPrivacyRoute = () => {
  const path = window.location.pathname.toLowerCase();
  const hash = window.location.hash.toLowerCase();
  return path === '/privacy-policy' || path === '/privacy' || hash === '#privacy-policy' || hash === '#privacy';
};

export default function App() {
  const [view, setView] = useState(() => {
    if (isAdminRoute()) return 'admin';
    if (isPrivacyRoute()) return 'privacy';
    return 'website';
  });

  const [modalOpen, setModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState('Register Your Interest');
  const [toastMessage, setToastMessage] = useState('');
  const [siteData, setSiteData] = useState(null);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage('');
    }, 4500);
  };

  const handleOpenModal = (title = 'Register Your Interest') => {
    setModalTitle(title);
    setModalOpen(true);
  };

  const loadData = async () => {
    try {
      const data = await fetchAllData();
      if (data && typeof data === 'object') {
        setSiteData(data);
      }
    } catch {
      // Backend offline or fallback to demo defaults
    }
  };

  useEffect(() => {
    loadData();

    const handleLocationChange = () => {
      if (isAdminRoute()) {
        setView('admin');
      } else if (isPrivacyRoute()) {
        setView('privacy');
      } else {
        setView('website');
      }
    };

    window.addEventListener('popstate', handleLocationChange);
    window.addEventListener('hashchange', handleLocationChange);

    return () => {
      window.removeEventListener('popstate', handleLocationChange);
      window.removeEventListener('hashchange', handleLocationChange);
    };
  }, []);

  // 5-second auto popup trigger with session persistence
  useEffect(() => {
    if (view === 'website') {
      const timer = setTimeout(() => {
        const alreadyShown = sessionStorage.getItem('popup_shown_session');
        if (!alreadyShown) {
          handleOpenModal('Book a Site Visit & Unlock Special Pricing');
          sessionStorage.setItem('popup_shown_session', 'true');
        }
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [view]);

  const handleBackToSite = () => {
    if (window.location.pathname !== '/') {
      window.history.pushState({}, '', '/');
    }
    window.location.hash = '';
    setView('website');
    loadData();
  };

  if (view === 'admin') {
    return (
      <React.Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-[#F6F8FC]"><div className="w-8 h-8 border-4 border-[#111D46] border-t-transparent rounded-full animate-spin"></div></div>}>
        <AdminLayout onBackToSite={handleBackToSite} />
      </React.Suspense>
    );
  }

  if (view === 'privacy') {
    return (
      <React.Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-[#F6F8FC]"><div className="w-8 h-8 border-4 border-[#111D46] border-t-transparent rounded-full animate-spin"></div></div>}>
        <PrivacyPolicyPage
          initialData={siteData?.privacy}
          onBackToSite={handleBackToSite}
        />
      </React.Suspense>
    );
  }

  const projectTitle = siteData?.hero?.title || (siteData?.header?.logo_text ? `${siteData.header.logo_text} ${siteData.header.logo_highlight || ''}`.trim() : 'Arban City Sector 0');
  const locationParts = (siteData?.hero?.location || 'Airoli, Navi Mumbai')
    .replace(/^At\s+/i, '')
    .split(',')
    .map((part) => part.trim())
    .filter(Boolean);
  const projectType = siteData?.overview?.find((item) => item.label?.toLowerCase() === 'project type')?.value || 'Residential';
  const builderName = siteData?.hero?.developer || siteData?.developer?.company_name || siteData?.developer?.name || 'Delta Tricity';

  return (
    <>
      <div className="page max-w-[1510px] mx-auto grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_328px] gap-4 pl-0 md:pl-6 max-md:block max-md:max-w-[430px] max-md:w-full max-md:px-2.5 max-md:mx-auto" id="page">
        <main className="min-w-0 pb-8 max-md:contents">
          {/* Sticky Header over content column only */}
          <Navbar data={siteData?.header} onOpenModal={handleOpenModal} />

          {/* Hero Section */}
          <Hero data={siteData?.hero} developerData={siteData?.developer} onOpenModal={handleOpenModal} />

          {/* Dedicated In-stream Mobile Enquiry Form */}
          <MobileEnquiry showToast={showToast} />

          {/* Main Card Sections */}
          <div className="flex flex-col gap-4.5 mt-4 max-md:gap-3 max-md:px-2.5 max-md:pb-20">
            <DeferredSection anchorIds={['about']}>
              <About data={siteData?.about} onOpenModal={handleOpenModal} projectTitle={projectTitle} />
            </DeferredSection>
            <DeferredSection anchorIds={['overview']}>
              <Overview data={siteData?.overview} projectTitle={projectTitle} />
            </DeferredSection>
            <DeferredSection anchorIds={['specifications']}>
              <PropertySpecification data={siteData?.specifications} projectTitle={projectTitle} />
            </DeferredSection>
            <DeferredSection anchorIds={['elevation']}>
              <ElevationGallery
                data={siteData?.gallery}
                onOpenModal={handleOpenModal}
                projectName={projectTitle}
                builderName={builderName}
                projectType={projectType}
                locality={locationParts[0] || 'Airoli'}
                city={locationParts[1] || 'Navi Mumbai'}
              />
            </DeferredSection>
            <DeferredSection anchorIds={['price', 'floor-plan']} minHeight={440}>
              <PricingTable
                data={siteData?.pricing}
                floorPlans={siteData?.floorplans || siteData?.floorPlans}
                onOpenModal={handleOpenModal}
              />
            </DeferredSection>
            <DeferredSection anchorIds={['amenities']}>
              <Amenities data={siteData?.amenities} projectTitle={projectTitle} />
            </DeferredSection>
            <DeferredSection anchorIds={['gallery']}>
              <GallerySection
                data={siteData?.gallery}
                projectTitle={projectTitle}
                locality={locationParts[0] || 'Airoli'}
                city={locationParts[1] || 'Navi Mumbai'}
                onOpenModal={handleOpenModal}
              />
            </DeferredSection>
            <DeferredSection anchorIds={['video']}>
              <VideoTour data={siteData?.video} onOpenModal={handleOpenModal} projectTitle={projectTitle} />
            </DeferredSection>
            <DeferredSection anchorIds={['location']}>
              <Location data={siteData?.location} projectTitle={projectTitle} />
            </DeferredSection>
            <DeferredSection anchorIds={['sales-office']}>
              <SalesOffice data={siteData?.location} projectTitle={projectTitle} phone={siteData?.header?.phone || '+91 81000 00000'} />
            </DeferredSection>
            <DeferredSection anchorIds={['developer']}>
              <DeveloperAndRera data={siteData?.developer} projectTitle={projectTitle} />
            </DeferredSection>
            <DeferredSection anchorIds={['faq']}>
              <FaqSection data={siteData?.faqs} projectTitle={projectTitle} />
            </DeferredSection>
            <DeferredSection anchorIds={['construction']}>
              <ConstructionSection
                data={siteData?.construction}
                onOpenModal={handleOpenModal}
                projectName={projectTitle}
                location={`${locationParts[0] || 'Airoli'}, ${locationParts[1] || 'Navi Mumbai'}`}
              />
            </DeferredSection>
          </div>
        </main>

        {/* 328px Sticky Right Enquiry Rail */}
        <SidebarEnquiry data={siteData} onOpenModal={handleOpenModal} showToast={showToast} />
      </div>

      {/* Footer */}
      <DeferredSection minHeight={260}>
        <Footer
          developerData={siteData?.developer}
          privacyData={siteData?.privacy}
          headerData={siteData?.header}
        />
      </DeferredSection>

      {/* Floating Vertical "Enquire Now" tab on mobile */}
      <VerticalEnquiryButton onOpenModal={handleOpenModal} />

      {/* Mobile Sticky Bottom Bar */}
      <MobileBottomBar
        onOpenModal={handleOpenModal}
        phone={siteData?.header?.phone || siteData?.hero?.phone || '+91 81000 00000'}
        whatsapp={siteData?.header?.whatsapp || '918100000000'}
      />

      {/* Enquiry Popup Modal */}
      {modalOpen && (
        <React.Suspense fallback={null}>
          <EnquiryModal
            isOpen={modalOpen}
            onClose={() => setModalOpen(false)}
            title={modalTitle}
            showToast={showToast}
            privacyData={siteData?.privacy}
          />
        </React.Suspense>
      )}

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed left-1/2 bottom-7 -translate-x-1/2 z-[120] bg-[#1F7A4D] text-white font-bold text-xs md:text-sm py-3 px-5 rounded-xl shadow-2xl animatePop" role="status">
          {toastMessage}
        </div>
      )}
    </>
  );
}
