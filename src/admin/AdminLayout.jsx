import React, { useState, useEffect } from 'react';
import {
  Sliders,
  Type,
  Layout,
  Table,
  Home,
  Sparkles,
  MapPin,
  HelpCircle,
  Users,
  ExternalLink,
  ShieldCheck,
  CheckCircle2,
  Globe,
  Images,
  Video,
  HardHat,
  Menu,
  X,
  LogOut,
  ChevronRight,
  User,
  Activity,
  Layers,
  FileText,
  Shield,
  ListChecks,
} from 'lucide-react';
import HeaderSettings from './HeaderSettings';
import MetaSettings from './MetaSettings';
import HeroSettings from './HeroSettings';
import AboutSettings from './AboutSettings';
import OverviewSettings from './OverviewSettings';
import SpecificationsSettings from './SpecificationsSettings';
import PricingSettings from './PricingSettings';
import FloorPlanSettings from './FloorPlanSettings';
import AmenitiesSettings from './AmenitiesSettings';
import GallerySettings from './GallerySettings';
import VideoSettings from './VideoSettings';
import DeveloperSettings from './DeveloperSettings';
import LocationSettings from './LocationSettings';
import ConstructionSettings from './ConstructionSettings';
import FaqSettings from './FaqSettings';
import LeadsManager from './LeadsManager';
import AdminLogin from './AdminLogin';
import PrivacyPolicySettings from './PrivacyPolicySettings';
import AdminProfileSettings from './AdminProfileSettings';
import { fetchAllData, fetchLeads } from './api';

export default function AdminLayout({ onBackToSite }) {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return Boolean(localStorage.getItem('adminToken'));
  });
  const [currentUser, setCurrentUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('adminUser') || '{}');
    } catch (e) {
      return {};
    }
  });

  const [activeTab, setActiveTab] = useState('header');
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [leadCount, setLeadCount] = useState(0);

  const loadData = async () => {
    try {
      const res = await fetchAllData();
      setData(res);
      const leads = await fetchLeads().catch(() => []);
      if (Array.isArray(leads)) setLeadCount(leads.length);
    } catch (err) {
      console.error('Error fetching data for admin:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      loadData();
    }
  }, [isAuthenticated]);

  const handleLoginSuccess = (user) => {
    setCurrentUser(user);
    setIsAuthenticated(true);
    loadData();
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminUser');
    setIsAuthenticated(false);
  };

  if (!isAuthenticated) {
    return (
      <AdminLogin
        onLoginSuccess={handleLoginSuccess}
        onBackToSite={onBackToSite}
      />
    );
  }

  const navGroups = [
    {
      group: 'Brand & Legal',
      items: [
        { id: 'header', label: 'Header & Logo', icon: <Sliders size={18} /> },
        { id: 'meta', label: 'SEO & Meta Tags', icon: <Globe size={18} /> },
        { id: 'developer', label: 'Developer & RERA', icon: <ShieldCheck size={18} /> },
        { id: 'privacy', label: 'Privacy Policy', icon: <FileText size={18} /> },
      ],
    },
    {
      group: 'Page Content',
      items: [
        { id: 'hero', label: 'Hero Section', icon: <Layout size={18} /> },
        { id: 'about', label: 'About Project', icon: <Type size={18} /> },
        { id: 'overview', label: 'Overview Specs', icon: <Home size={18} /> },
        { id: 'specifications', label: 'Property Specifications', icon: <ListChecks size={18} /> },
        { id: 'pricing', label: 'Pricing Table', icon: <Table size={18} /> },
        { id: 'floorPlans', label: 'Floor Plans', icon: <Layers size={18} /> },
        { id: 'location', label: 'Location & Map', icon: <MapPin size={18} /> },
      ],
    },
    {
      group: 'Media & Features',
      items: [
        { id: 'amenities', label: 'Amenities', icon: <Sparkles size={18} /> },
        { id: 'gallery', label: 'Elevation Gallery', icon: <Images size={18} /> },
        { id: 'video', label: 'Walkthrough Video', icon: <Video size={18} /> },
        { id: 'construction', label: 'Construction Status', icon: <HardHat size={18} /> },
        { id: 'faqs', label: 'FAQ Manager', icon: <HelpCircle size={18} /> },
      ],
    },
    {
      group: 'Account & Management',
      items: [
        {
          id: 'leads',
          label: 'Customer Leads',
          icon: <Users size={18} />,
          badge: leadCount > 0 ? leadCount : null,
        },
        {
          id: 'profile',
          label: 'Admin Profile',
          icon: <User size={18} />,
        },
      ],
    },
  ];

  const currentTabLabel =
    navGroups
      .flatMap((g) => g.items)
      .find((item) => item.id === activeTab)?.label || 'Dashboard';

  return (
    <div className="h-screen flex flex-col bg-[#f8fafc] font-sans antialiased overflow-hidden">
      {/* Top Header - Fixed & Clean Simple Colors */}
      <header className="h-16 shrink-0 bg-[#0f172a] text-white px-4 sm:px-6 lg:px-8 flex items-center justify-between z-30 border-b border-slate-800">
        <div className="flex items-center gap-3 sm:gap-4">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="md:hidden p-2 rounded-xl text-slate-300 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
            aria-label="Toggle Navigation Sidebar"
          >
            {sidebarOpen ? <X size={22} /> : <Menu size={22} />}
          </button>

          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center font-bold text-white text-base shadow-sm">
              A
            </div>
            <div>
              <div className="font-bold text-base sm:text-lg tracking-tight leading-none text-white">
                Arban City <span className="text-blue-400 font-semibold">Admin</span>
              </div>
              <div className="text-[11px] text-slate-400 font-medium hidden sm:block mt-1">
                Content &amp; Lead Management Portal
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          {/* Admin Profile Quick Shortcut */}
          <button
            onClick={() => setActiveTab('profile')}
            title="Click to view and edit Admin Profile"
            className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border text-xs sm:text-sm font-medium transition-all cursor-pointer ${
              activeTab === 'profile'
                ? 'bg-blue-600 text-white border-blue-500'
                : 'bg-slate-800/90 hover:bg-slate-800 text-slate-200 border-slate-700'
            }`}
          >
            <User size={15} className={activeTab === 'profile' ? 'text-white' : 'text-blue-400'} />
            <span className="truncate max-w-[140px] sm:max-w-[180px]">
              {currentUser.name || currentUser.email || 'Admin'}
            </span>
          </button>

          {/* View Website Button */}
          <button
            onClick={onBackToSite}
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold bg-white/10 hover:bg-white/15 text-white px-3.5 py-1.5 rounded-xl transition-all cursor-pointer border border-white/10"
          >
            <span>Website</span>
            <ExternalLink size={14} />
          </button>

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            title="Logout from Admin Panel"
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold bg-red-500/10 hover:bg-red-500/20 text-red-300 hover:text-red-200 px-3 py-1.5 rounded-xl transition-all cursor-pointer border border-red-500/20"
          >
            <LogOut size={15} />
            <span className="hidden sm:inline">Logout</span>
          </button>
        </div>
      </header>

      {/* Main Body Layout with Independent Scrolling */}
      <div className="flex-1 flex w-full overflow-hidden">
        {/* Mobile Backdrop */}
        {sidebarOpen && (
          <div
            onClick={() => setSidebarOpen(false)}
            className="fixed inset-0 bg-black/50 backdrop-blur-xs z-20 md:hidden"
          />
        )}

        {/* Sidebar - Independent Scroll */}
        <aside
          className={`fixed inset-y-0 left-0 top-16 z-30 w-72 bg-[#1e293b] border-r border-slate-800/80 p-4 transition-transform duration-200 md:static md:translate-x-0 h-[calc(100vh-4rem)] overflow-y-auto shrink-0 select-none ${
            sidebarOpen ? 'translate-x-0 shadow-2xl' : '-translate-x-full md:translate-x-0'
          }`}
        >
          <div className="space-y-6 pb-6">
            {navGroups.map((group, gIdx) => (
              <div key={gIdx}>
                <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2 px-3">
                  {group.group}
                </div>
                <nav className="space-y-1">
                  {group.items.map((item) => {
                    const isActive = activeTab === item.id;
                    return (
                      <button
                        key={item.id}
                        onClick={() => {
                          setActiveTab(item.id);
                          setSidebarOpen(false);
                        }}
                        className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-sm font-medium transition-all cursor-pointer text-left ${
                          isActive
                            ? 'bg-blue-600 text-white shadow-xs font-semibold'
                            : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <span className={isActive ? 'text-white' : 'text-slate-400'}>
                            {item.icon}
                          </span>
                          <span className="tracking-tight">{item.label}</span>
                        </div>
                        {item.badge && (
                          <span
                            className={`text-xs px-2 py-0.5 rounded-full font-bold ${
                              isActive
                                ? 'bg-white text-blue-600'
                                : 'bg-red-500 text-white'
                            }`}
                          >
                            {item.badge}
                          </span>
                        )}
                      </button>
                    );
                  })}
                </nav>
              </div>
            ))}
          </div>
        </aside>

        {/* Main Content Area - Independent Scroll */}
        <main className="flex-1 h-[calc(100vh-4rem)] overflow-y-auto p-4 sm:p-6 lg:p-8 bg-[#f8fafc]">
          <div className="max-w-6xl mx-auto space-y-6 pb-12">
            {/* Breadcrumb Header */}
            <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-500 font-medium">
              <span>Admin Portal</span>
              <ChevronRight size={14} className="text-slate-400" />
              <span className="font-bold text-slate-900">{currentTabLabel}</span>
            </div>

            {loading ? (
              <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center shadow-xs">
                <div className="inline-block animate-spin w-8 h-8 border-3 border-slate-200 border-t-blue-600 rounded-full mb-3"></div>
                <p className="text-sm font-semibold text-slate-600">Loading settings...</p>
              </div>
            ) : (
              <div className="space-y-6">
                {activeTab === 'header' && (
                  <HeaderSettings data={data?.header} onRefresh={loadData} />
                )}
                {activeTab === 'meta' && (
                  <MetaSettings data={data?.meta} onRefresh={loadData} />
                )}
                {activeTab === 'developer' && (
                  <DeveloperSettings data={data?.developer} onRefresh={loadData} />
                )}
                {activeTab === 'privacy' && (
                  <PrivacyPolicySettings onRefresh={loadData} />
                )}
                {activeTab === 'hero' && (
                  <HeroSettings data={data?.hero} onRefresh={loadData} />
                )}
                {activeTab === 'about' && (
                  <AboutSettings data={data?.about} onRefresh={loadData} />
                )}
                {activeTab === 'overview' && (
                  <OverviewSettings data={data?.overview} onRefresh={loadData} />
                )}
                {activeTab === 'specifications' && (
                  <SpecificationsSettings onRefresh={loadData} />
                )}
                {activeTab === 'pricing' && (
                  <PricingSettings data={data?.pricing} onRefresh={loadData} />
                )}
                {activeTab === 'floorPlans' && (
                  <FloorPlanSettings data={data?.floorplans || data?.floorPlans} onRefresh={loadData} />
                )}
                {activeTab === 'amenities' && (
                  <AmenitiesSettings data={data?.amenities} onRefresh={loadData} />
                )}
                {activeTab === 'gallery' && (
                  <GallerySettings data={data?.gallery} onRefresh={loadData} />
                )}
                {activeTab === 'video' && (
                  <VideoSettings data={data?.video} onRefresh={loadData} />
                )}
                {activeTab === 'location' && (
                  <LocationSettings data={data?.location} onRefresh={loadData} />
                )}
                {activeTab === 'construction' && (
                  <ConstructionSettings data={data?.construction} onRefresh={loadData} />
                )}
                {activeTab === 'faqs' && (
                  <FaqSettings data={data?.faqs} onRefresh={loadData} />
                )}
                {activeTab === 'leads' && <LeadsManager />}
                {activeTab === 'profile' && (
                  <AdminProfileSettings
                    currentUser={currentUser}
                    onProfileUpdated={(updated) => setCurrentUser(updated)}
                  />
                )}
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
