import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Overview from './components/Overview';
import PropertySpecification from './components/PropertySpecification';
import PricingTable from './components/PricingTable';
import FloorPlan from './components/FloorPlan';
import Amenities from './components/Amenities';
import ElevationGallery from './components/ElevationGallery';
import VideoTour from './components/VideoTour';
import Location from './components/Location';
import DeveloperAndRera from './components/DeveloperAndRera';
import ConstructionSection from './components/ConstructionSection';
import FaqSection from './components/FaqSection';
import SidebarEnquiry from './components/SidebarEnquiry';
import Footer from './components/Footer';
import EnquiryModal from './components/EnquiryModal';
import MobileBottomBar from './components/MobileBottomBar';
import VerticalEnquiryButton from './components/VerticalEnquiryButton';
import { fetchAllData } from './admin/api';

const AdminLayout = React.lazy(() => import('./admin/AdminLayout'));
const PrivacyPolicyPage = React.lazy(() => import('./components/PrivacyPolicyPage'));

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
  const [siteData, setSiteData] = useState(null);
  const [loading, setLoading] = useState(true);

  const handleOpenModal = (title = 'Register Your Interest') => {
    setModalTitle(title);
    setModalOpen(true);
  };

  const applyMetaTags = (meta) => {
    if (!meta) return;

    if (meta.meta_title) {
      document.title = meta.meta_title;
    }

    const setMeta = (attr, key, val) => {
      if (!val) return;
      let el = document.querySelector(`meta[${attr}="${key}"]`);
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute(attr, key);
        document.head.appendChild(el);
      }
      el.setAttribute('content', val);
    };

    const setLink = (rel, href, extraAttr = {}) => {
      if (!href) return;
      let selector = `link[rel="${rel}"]`;
      if (extraAttr.name && extraAttr.val) {
        selector += `[${extraAttr.name}="${extraAttr.val}"]`;
      }
      let el = document.querySelector(selector);
      if (!el) {
        el = document.createElement('link');
        el.setAttribute('rel', rel);
        if (extraAttr.name && extraAttr.val) {
          el.setAttribute(extraAttr.name, extraAttr.val);
        }
        document.head.appendChild(el);
      }
      el.setAttribute('href', href);
    };

    setMeta('name', 'description', meta.meta_description);
    setMeta('name', 'keywords', meta.meta_keywords);
    setMeta('name', 'author', meta.author);
    setMeta('name', 'robots', meta.robots);
    setMeta('name', 'googlebot', meta.robots);
    setMeta('name', 'bingbot', meta.robots);
    setMeta('name', 'theme-color', meta.theme_color);
    setMeta('name', 'msapplication-TileColor', meta.theme_color);

    if (meta.canonical_url) {
      setLink('canonical', meta.canonical_url);
      setLink('alternate', meta.canonical_url, { name: 'hreflang', val: 'x-default' });
    }

    setMeta('property', 'og:type', meta.og_type || 'website');
    setMeta('property', 'og:site_name', meta.og_site_name);
    setMeta('property', 'og:title', meta.og_title || meta.meta_title);
    setMeta('property', 'og:description', meta.og_description || meta.meta_description);
    setMeta('property', 'og:url', meta.og_url || meta.canonical_url);
    setMeta('property', 'og:image', meta.og_image);
    setMeta('property', 'og:image:secure_url', meta.og_image);
    setMeta('property', 'og:locale', meta.og_locale || 'en_US');

    setMeta('name', 'twitter:card', meta.twitter_card || 'summary_large_image');
    setMeta('name', 'twitter:title', meta.twitter_title || meta.meta_title);
    setMeta('name', 'twitter:description', meta.twitter_description || meta.meta_description);
    setMeta('name', 'twitter:image', meta.twitter_image || meta.og_image);
    setMeta('name', 'twitter:site', meta.twitter_site);
    setMeta('name', 'twitter:creator', meta.twitter_site);

    if (meta.google_verification) setMeta('name', 'google-site-verification', meta.google_verification);
    if (meta.bing_verification) setMeta('name', 'msvalidate.01', meta.bing_verification);
    if (meta.facebook_verification) setMeta('name', 'facebook-domain-verification', meta.facebook_verification);
    if (meta.pinterest_verification) setMeta('name', 'p:domain_verify', meta.pinterest_verification);

    if (meta.social_facebook) setLink('me', meta.social_facebook, { name: 'data-type', val: 'facebook' });
    if (meta.social_instagram) setLink('me', meta.social_instagram, { name: 'data-type', val: 'instagram' });
    if (meta.social_linkedin) setLink('me', meta.social_linkedin, { name: 'data-type', val: 'linkedin' });

    if (meta.header_scripts && meta.header_scripts.trim()) {
      let scriptContainer = document.getElementById('dynamic-header-scripts');
      if (!scriptContainer) {
        scriptContainer = document.createElement('div');
        scriptContainer.id = 'dynamic-header-scripts';
        scriptContainer.style.display = 'none';
        document.head.appendChild(scriptContainer);
      }
      scriptContainer.innerHTML = meta.header_scripts;
    }
  };

  const loadData = async () => {
    try {
      const data = await fetchAllData();
      setSiteData(data);
      if (data?.meta) {
        applyMetaTags(data.meta);
      }
    } catch (err) {
      console.log('Error fetching database data:', err);
    } finally {
      setLoading(false);
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

  const handleOpenPrivacy = () => {
    window.location.hash = '#privacy-policy';
    setView('privacy');
    window.scrollTo(0, 0);
  };

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
      <React.Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-[#f8fafc]"><div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div></div>}>
        <AdminLayout onBackToSite={handleBackToSite} />
      </React.Suspense>
    );
  }

  if (view === 'privacy') {
    return (
      <React.Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-[#f8fafc]"><div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div></div>}>
        <PrivacyPolicyPage
          initialData={siteData?.privacy}
          onBackToSite={handleBackToSite}
        />
      </React.Suspense>
    );
  }

  if (loading && !siteData && view === 'website') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f8fafc]">
        <div className="text-center">
          <div className="w-10 h-10 border-4 border-slate-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-600 font-semibold text-sm">Loading from Database...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#f5f7fa] text-[#1e293b]">
      <Navbar
        data={siteData?.header}
        onOpenModal={handleOpenModal}
      />

      <main className="flex-1 w-full pl-0 pr-2 sm:pr-4 lg:pr-5 py-0">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-5">
          {/* Main Left Column (Touching left edge seamlessly) */}
          <div className="lg:col-span-9 space-y-4">
            <Hero data={siteData?.hero} onOpenModal={handleOpenModal} />
            <Overview
              data={siteData?.overview}
              aboutData={siteData?.about}
              onOpenModal={handleOpenModal}
              projectTitle={siteData?.hero?.title || 'Arban City Sector 0'}
            />
            <PropertySpecification data={siteData?.specifications} />
            <PricingTable data={siteData?.pricing} onOpenModal={handleOpenModal} projectTitle={siteData?.hero?.title || 'Arban City Sector 0'} />
            <FloorPlan data={siteData?.floorplans || siteData?.floorPlans} onOpenModal={handleOpenModal} projectTitle={siteData?.hero?.title || 'Arban City Sector 0'} />
            <Amenities data={siteData?.amenities} onOpenModal={handleOpenModal} projectTitle={siteData?.hero?.title || 'Arban City Sector 0'} />
            <ElevationGallery data={siteData?.gallery} onOpenModal={handleOpenModal} projectTitle={siteData?.hero?.title || 'Arban City Sector 0'} />
            <VideoTour data={siteData?.video} onOpenModal={handleOpenModal} />
            <Location data={siteData?.location} onOpenModal={handleOpenModal} projectTitle={siteData?.hero?.title || 'Arban City Sector 0'} />
            <DeveloperAndRera data={siteData?.developer} />
            <ConstructionSection data={siteData?.construction} />
            <FaqSection data={siteData?.faqs} projectTitle={siteData?.hero?.title || 'Arban City Sector 0'} />

            {/* Mobile View: Visible Enquiry Form (Item 18) */}
            <div className="lg:hidden mt-6">
              <SidebarEnquiry data={siteData} onOpenModal={handleOpenModal} />
            </div>
          </div>

          {/* Desktop Right Sidebar: Fixed Form with Consent (Item 15) */}
          <div className="lg:col-span-3 hidden lg:block">
            <div className="sticky top-[80px] z-30">
              <SidebarEnquiry data={siteData} onOpenModal={handleOpenModal} />
            </div>
          </div>
        </div>
      </main>

      <Footer
        data={siteData?.header}
        developerData={siteData?.developer}
        onOpenModal={handleOpenModal}
        onOpenPrivacy={handleOpenPrivacy}
      />

      {/* Floating Vertical Enquiry Button with Highlighted Border (Item 19) */}
      <VerticalEnquiryButton onOpenModal={handleOpenModal} />

      <MobileBottomBar
        onOpenModal={handleOpenModal}
        phone={siteData?.header?.phone || siteData?.hero?.phone}
        whatsapp={siteData?.header?.whatsapp}
      />

      <EnquiryModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={modalTitle}
      />
    </div>
  );
}
