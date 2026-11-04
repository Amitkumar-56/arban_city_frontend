import React, { useState, useEffect, useRef, useCallback } from 'react';
import SEO from './components/SEO';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import SidebarEnquiry from './components/SidebarEnquiry';
import VerticalEnquiryButton from './components/VerticalEnquiryButton';
import MobileBottomBar from './components/MobileBottomBar';
import MobileEnquiry from './components/MobileEnquiry';
import { fetchAllData } from './admin/api';

import About from './components/About';
import Overview from './components/Overview';
import PropertySpecification from './components/PropertySpecification';
import PricingTable from './components/PricingTable';
import ElevationGallery from './components/ElevationGallery';
import Amenities from './components/Amenities';
import GallerySection from './components/GallerySection';
import VideoTour from './components/VideoTour';
import Location from './components/Location';
import SalesOffice from './components/SalesOffice';
import DeveloperAndRera from './components/DeveloperAndRera';
import FaqSection from './components/FaqSection';
import ConstructionSection from './components/ConstructionSection';
import Footer from './components/Footer';
import EnquiryModal from './components/EnquiryModal';
const AdminLayout = React.lazy(() => import('./admin/AdminLayout'));
const PrivacyPolicyPage = React.lazy(() => import('./components/PrivacyPolicyPage'));

class SectionErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: false };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Section Error caught:', error, errorInfo);
  }

  render() {
    return this.props.children;
  }
}

function DeferredSection({ children, anchorIds = [] }) {
  return (
    <div className="relative w-full">
      {anchorIds.map((id) => (
        <span key={id} id={id} className="absolute -top-20" aria-hidden="true" />
      ))}
      <SectionErrorBoundary>
        {children}
      </SectionErrorBoundary>
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

  // Dynamically update document title, favicon, and SEO meta tags from Database
  useEffect(() => {
    if (!siteData?.meta) return;
    const meta = siteData.meta;

    // Document Title
    if (meta.meta_title) {
      document.title = meta.meta_title;
    }

    const setMetaTag = (nameOrProperty, value, isProperty = false) => {
      if (!value) return;
      const selector = isProperty ? `meta[property="${nameOrProperty}"]` : `meta[name="${nameOrProperty}"]`;
      let tag = document.querySelector(selector);
      if (!tag) {
        tag = document.createElement('meta');
        if (isProperty) tag.setAttribute('property', nameOrProperty);
        else tag.setAttribute('name', nameOrProperty);
        document.head.appendChild(tag);
      }
      tag.setAttribute('content', value);
    };

    // Standard SEO Meta Tags
    setMetaTag('description', meta.meta_description);
    setMetaTag('keywords', meta.meta_keywords);
    setMetaTag('author', meta.author);
    setMetaTag('robots', meta.robots);
    setMetaTag('theme-color', meta.theme_color);

    // Canonical link
    if (meta.canonical_url) {
      let canonical = document.querySelector('link[rel="canonical"]');
      if (!canonical) {
        canonical = document.createElement('link');
        canonical.setAttribute('rel', 'canonical');
        document.head.appendChild(canonical);
      }
      canonical.setAttribute('href', meta.canonical_url);
    }

    // OpenGraph
    const ogImgUrl = meta.og_image ? (meta.og_image.startsWith('http') ? meta.og_image : `${window.location.origin}${meta.og_image}`) : '';
    setMetaTag('og:title', meta.og_title || meta.meta_title, true);
    setMetaTag('og:description', meta.og_description || meta.meta_description, true);
    setMetaTag('og:type', meta.og_type || 'website', true);
    setMetaTag('og:site_name', meta.og_site_name || 'Arban City', true);
    setMetaTag('og:url', meta.og_url || meta.canonical_url || window.location.href, true);
    setMetaTag('og:locale', meta.og_locale || 'en_IN', true);
    if (ogImgUrl) setMetaTag('og:image', ogImgUrl, true);

    // Twitter Card
    setMetaTag('twitter:card', meta.twitter_card || 'summary_large_image');
    setMetaTag('twitter:title', meta.twitter_title || meta.og_title || meta.meta_title);
    setMetaTag('twitter:description', meta.twitter_description || meta.og_description || meta.meta_description);
    setMetaTag('twitter:site', meta.twitter_site);
    if (ogImgUrl || meta.twitter_image) {
      const twImg = meta.twitter_image ? (meta.twitter_image.startsWith('http') ? meta.twitter_image : `${window.location.origin}${meta.twitter_image}`) : ogImgUrl;
      setMetaTag('twitter:image', twImg);
    }

    // Search Console Verifications
    setMetaTag('google-site-verification', meta.google_verification);
    setMetaTag('msvalidate.01', meta.bing_verification);
    setMetaTag('facebook-domain-verification', meta.facebook_verification);
    setMetaTag('p:domain_verify', meta.pinterest_verification);

    // Dynamic Header Scripts (e.g. Google Analytics / Meta Pixel from Admin)
    if (meta.header_scripts && !document.getElementById('custom-header-scripts')) {
      try {
        const scriptContainer = document.createElement('div');
        scriptContainer.id = 'custom-header-scripts';
        scriptContainer.innerHTML = meta.header_scripts;
        Array.from(scriptContainer.querySelectorAll('script')).forEach((oldScript) => {
          const newScript = document.createElement('script');
          Array.from(oldScript.attributes).forEach((attr) => newScript.setAttribute(attr.name, attr.value));
          newScript.appendChild(document.createTextNode(oldScript.innerHTML));
          document.head.appendChild(newScript);
        });
      } catch (scriptErr) {
        console.error('Custom script insertion error:', scriptErr);
      }
    }
  }, [siteData]);

  useEffect(() => {
    loadData();

    // Auto-refresh when tab gains focus / user switches back to website
    const handleFocus = () => {
      loadData();
    };
    window.addEventListener('focus', handleFocus);

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
      window.removeEventListener('focus', handleFocus);
      window.removeEventListener('popstate', handleLocationChange);
      window.removeEventListener('hashchange', handleLocationChange);
    };
  }, []);

  // Auto popup trigger on page load (1.5 seconds)
  useEffect(() => {
    if (view === 'website') {
      const timer = setTimeout(() => {
        handleOpenModal('Book a Site Visit & Unlock Special Pricing');
      }, 1500);
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
      <SEO data={siteData?.meta} />
      <div className="page max-w-[1510px] mx-auto grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_328px] gap-4 pl-0 md:pl-6 max-md:block max-md:max-w-[430px] max-md:w-full max-md:px-2.5 max-md:mx-auto" id="page">
        <main className="min-w-0 pb-8 max-md:contents">
          {/* Sticky Header over content column only */}
          <Navbar data={siteData?.header} onOpenModal={handleOpenModal} />

          {/* Hero Section */}
          <Hero data={siteData?.hero} developerData={siteData?.developer} onOpenModal={handleOpenModal} />

          {/* Dedicated In-stream Mobile Enquiry Form */}
          <MobileEnquiry showToast={showToast} privacyData={siteData?.privacy} />

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
                projectTitle={projectTitle}
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
            <DeferredSection anchorIds={['construction']} minHeight={280}>
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
        <EnquiryModal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          title={modalTitle}
          showToast={showToast}
          privacyData={siteData?.privacy}
        />
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
