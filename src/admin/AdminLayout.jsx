import { useState, useEffect } from 'react';
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
  Globe,
  Images,
  Video,
  HardHat,
  Menu,
  X,
  LogOut,
  ChevronRight,
  User,
  Layers,
  FileText,
  ListChecks,
  LayoutDashboard,
  RefreshCw,
  ArrowUpRight,
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
    } catch {
      return {};
    }
  });

  const [activeTab, setActiveTab] = useState('dashboard');
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [leadCount, setLeadCount] = useState(0);
  const [loadError, setLoadError] = useState('');
  const [leadsError, setLeadsError] = useState('');

  const loadData = async () => {
    try {
      const res = await fetchAllData();
      setData(res);
      setLeadsError('');
      try {
        const leads = await fetchLeads();
        if (Array.isArray(leads)) setLeadCount(leads.length);
      } catch (err) {
        setLeadsError(err.message || 'Unable to load customer leads.');
      }
    } catch (err) {
      console.error('Error fetching data for admin:', err);
      setLoadError(err.message || 'Unable to load admin content.');
    } finally {
      setLoading(false);
    }
  };
  const refreshData = () => {
    setLoading(true);
    setLoadError('');
    loadData();
  };

  useEffect(() => {
    if (!isAuthenticated) return undefined;
    const timer = window.setTimeout(() => loadData(), 0);
    return () => window.clearTimeout(timer);
  }, [isAuthenticated]);

  const handleLoginSuccess = (user) => {
    setCurrentUser(user);
    setLoading(true);
    setLoadError('');
    setIsAuthenticated(true);
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
      group: 'Workspace',
      items: [
        { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard size={18} /> },
      ],
    },
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
  const contentItems = navGroups
    .flatMap((group) => group.items)
    .filter((item) => !['dashboard', 'leads', 'profile'].includes(item.id));
  const mediaCount = [
    data?.hero?.banners?.length || 0,
    data?.gallery?.items?.length || 0,
    data?.gallery?.project_items?.length || 0,
    data?.gallery?.flat_items?.length || 0,
    data?.floorplans?.length || data?.floorPlans?.length || 0,
    data?.construction?.images?.length || 0,
  ].reduce((total, count) => total + count, 0);
  const quickLinks = contentItems.filter((item) =>
    ['header', 'hero', 'pricing', 'floorPlans', 'gallery', 'construction'].includes(item.id)
  );

  return (
    <div className="admin-layout h-screen flex flex-col bg-[#F4F6FA] font-sans antialiased overflow-hidden">
      <header className="h-[68px] shrink-0 bg-white text-[#111D46] px-4 sm:px-6 lg:px-8 flex items-center justify-between z-30 border-b border-slate-200 shadow-[0_2px_12px_rgba(17,29,70,0.04)]">
        <div className="flex items-center gap-3 sm:gap-4">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="md:hidden p-2 rounded-xl text-slate-600 hover:text-[#111D46] hover:bg-slate-100 transition-colors cursor-pointer"
            aria-label="Toggle Navigation Sidebar"
          >
            {sidebarOpen ? <X size={22} /> : <Menu size={22} />}
          </button>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#F26635] to-[#C94821] flex items-center justify-center font-extrabold text-white text-base shadow-sm">
              A
            </div>
            <div>
              <div className="font-extrabold text-base sm:text-lg tracking-tight leading-none text-[#111D46]">
                Arban City <span className="text-[#F26635] font-bold">Admin</span>
              </div>
              <div className="text-[11px] text-slate-500 font-medium hidden sm:block mt-1">
                Content &amp; Lead Management Portal
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={() => setActiveTab('profile')}
            title="Click to view and edit Admin Profile"
            className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border text-xs sm:text-sm font-medium transition-all cursor-pointer ${
              activeTab === 'profile'
                ? 'bg-[#111D46] text-white border-[#111D46]'
                : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200'
            }`}
          >
            <User size={15} className={activeTab === 'profile' ? 'text-white' : 'text-[#F26635]'} />
            <span className="truncate max-w-[140px] sm:max-w-[180px]">
              {currentUser.name || currentUser.email || 'Admin'}
            </span>
          </button>

          <button
            type="button"
            onClick={refreshData}
            title="Refresh admin content"
            className="inline-flex items-center justify-center w-9 h-9 rounded-xl border border-slate-200 bg-white text-slate-600 hover:text-[#111D46] hover:bg-slate-50 transition-colors cursor-pointer"
          >
            <RefreshCw size={15} />
          </button>

          <button
            onClick={onBackToSite}
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold bg-[#111D46] hover:bg-[#263A69] text-white px-3.5 py-2 rounded-xl transition-all cursor-pointer border border-[#111D46]"
          >
            <span>Website</span>
            <ExternalLink size={14} />
          </button>

          <button
            onClick={handleLogout}
            title="Logout from Admin Panel"
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold bg-rose-50 hover:bg-rose-100 text-rose-700 px-3 py-2 rounded-xl transition-all cursor-pointer border border-rose-200"
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

        {/* Sidebar */}
        <aside
          className={`fixed inset-y-0 left-0 top-[68px] z-30 w-72 bg-[#111D46] border-r border-[#26365F] p-4 transition-transform duration-200 md:static md:translate-x-0 h-[calc(100vh-4.25rem)] overflow-y-auto shrink-0 select-none ${
            sidebarOpen ? 'translate-x-0 shadow-2xl' : '-translate-x-full md:translate-x-0'
          }`}
        >
          <div className="space-y-6 pb-6">
            {navGroups.map((group, gIdx) => (
              <div key={gIdx}>
                <div className="text-[10px] font-extrabold text-slate-400 uppercase tracking-[0.14em] mb-2 px-3">
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
                            ? 'bg-white text-[#111D46] shadow-sm font-bold'
                            : 'text-slate-300 hover:bg-white/10 hover:text-white'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <span className={isActive ? 'text-[#F26635]' : 'text-slate-400'}>
                            {item.icon}
                          </span>
                          <span className="tracking-tight">{item.label}</span>
                        </div>
                        {item.badge && (
                          <span
                            className={`text-xs px-2 py-0.5 rounded-full font-bold ${
                              isActive
                                ? 'bg-[#F26635] text-white'
                                : 'bg-[#F26635] text-white'
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
        <main className="flex-1 h-[calc(100vh-4.25rem)] overflow-y-auto p-4 sm:p-6 lg:p-8 bg-[#F4F6FA]">
          <div className="max-w-7xl mx-auto space-y-6 pb-12">
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-500 font-medium">
                <span>Admin Portal</span>
                <ChevronRight size={14} className="text-slate-400" />
                <span className="font-bold text-slate-900">{currentTabLabel}</span>
              </div>
              <span className="hidden sm:inline-flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-[11px] font-bold text-emerald-700">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                Admin workspace
              </span>
            </div>

            {loadError && (
              <div className="flex flex-col gap-3 rounded-2xl border border-rose-200 bg-rose-50 p-4 text-sm text-rose-800 sm:flex-row sm:items-center sm:justify-between">
                <span>Could not load website settings: {loadError}</span>
                <button type="button" onClick={refreshData} className="inline-flex items-center gap-2 self-start rounded-lg bg-rose-700 px-3 py-2 text-xs font-bold text-white cursor-pointer sm:self-auto">
                  <RefreshCw size={14} /> Retry
                </button>
              </div>
            )}
            {leadsError && (
              <div className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-xs font-medium text-amber-800">
                Website content loaded, but customer leads could not be fetched: {leadsError}
              </div>
            )}

            {loading ? (
              <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center shadow-sm">
                <div className="inline-block animate-spin w-8 h-8 border-3 border-slate-200 border-t-[#F26635] rounded-full mb-3"></div>
                <p className="text-sm font-semibold text-slate-600">Loading settings...</p>
              </div>
            ) : (
              <div className="space-y-6">
                {activeTab === 'dashboard' && (
                  <div className="space-y-6">
                    <section className="relative overflow-hidden rounded-[26px] bg-gradient-to-br from-[#111D46] via-[#1B2C58] to-[#263B68] p-6 text-white shadow-[0_16px_40px_rgba(17,29,70,0.18)] sm:p-9">
                      <div className="absolute -right-10 -top-20 h-64 w-64 rounded-full border-[34px] border-white/5" />
                      <div className="relative max-w-2xl">
                        <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-[10px] font-extrabold uppercase tracking-[0.16em] text-orange-200">
                          <LayoutDashboard size={13} /> Project control center
                        </span>
                        <h1 className="mt-4 text-2xl font-extrabold tracking-tight sm:text-3xl">
                          Welcome back, {currentUser.name || 'Admin'}
                        </h1>
                        <p className="mt-2 max-w-xl text-sm leading-relaxed text-slate-200">
                          Manage the website brand, project content, media, pricing, and customer enquiries from one place.
                        </p>
                        <button
                          type="button"
                          onClick={() => setActiveTab('header')}
                          className="mt-5 inline-flex items-center gap-2 rounded-xl bg-[#F26635] px-4 py-2.5 text-sm font-bold text-white shadow-lg shadow-black/10 transition hover:bg-[#d9542b] cursor-pointer"
                        >
                          Manage website <ArrowUpRight size={16} />
                        </button>
                      </div>
                    </section>

                    <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                      {[
                        { label: 'Editable sections', value: contentItems.length, icon: <Layers size={19} />, hint: 'Content and settings' },
                        { label: 'Managed media', value: mediaCount, icon: <Images size={19} />, hint: 'Images and floor plans' },
                        { label: 'Price configurations', value: data?.pricing?.length || 0, icon: <Table size={19} />, hint: 'Editable pricing rows' },
                        { label: 'Customer enquiries', value: leadCount, icon: <Users size={19} />, hint: 'Leads in the inbox' },
                      ].map((stat) => (
                        <article key={stat.label} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_5px_18px_rgba(17,29,70,0.04)]">
                          <div className="flex items-start justify-between gap-3">
                            <div>
                              <p className="text-xs font-semibold text-slate-500">{stat.label}</p>
                              <p className="mt-2 text-3xl font-extrabold tracking-tight text-[#111D46]">{stat.value}</p>
                              <p className="mt-1 text-[11px] text-slate-500">{stat.hint}</p>
                            </div>
                            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-50 text-[#F26635]">{stat.icon}</span>
                          </div>
                        </article>
                      ))}
                    </section>

                    <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_5px_18px_rgba(17,29,70,0.04)] sm:p-6">
                      <div className="mb-4 flex items-end justify-between gap-3">
                        <div>
                          <h2 className="text-base font-extrabold text-[#111D46]">Quick actions</h2>
                          <p className="mt-1 text-xs text-slate-500">Go directly to common updates.</p>
                        </div>
                        <span className="text-[11px] font-semibold text-slate-400">{contentItems.length} content areas</span>
                      </div>
                      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
                        {quickLinks.map((item) => (
                          <button
                            key={item.id}
                            type="button"
                            onClick={() => setActiveTab(item.id)}
                            className="group flex items-center justify-between rounded-xl border border-slate-200 bg-[#FAFBFD] p-4 text-left transition hover:border-orange-200 hover:bg-orange-50/50 cursor-pointer"
                          >
                            <span className="flex items-center gap-3">
                              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-white text-[#F26635] shadow-sm">{item.icon}</span>
                              <span className="text-sm font-bold text-slate-800">{item.label}</span>
                            </span>
                            <ArrowUpRight size={16} className="text-slate-400 transition group-hover:text-[#F26635]" />
                          </button>
                        ))}
                      </div>
                      <p className="mt-5 rounded-xl bg-slate-50 px-4 py-3 text-xs leading-relaxed text-slate-600">
                        Logo: <b>Header &amp; Logo</b>. Hero slides: <b>Hero Section</b>. Elevation and project gallery images: <b>Elevation Gallery</b>. Floor-plan images: <b>Floor Plans</b>. QR codes: <b>Developer &amp; RERA</b>.
                      </p>
                    </section>
                  </div>
                )}
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
