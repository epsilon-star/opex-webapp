import { useState, useEffect } from 'react';
import { 
  Menu, 
  X, 
  PhoneCall, 
  ShieldCheck, 
  ChevronRight, 
  ArrowLeft,
  ArrowRight,
  HardHat,
  Home as HomeIcon,
  Building2,
  Hammer,
  FileText,
  Sun,
  Moon,
  FolderLock,
  UserCheck
} from 'lucide-react';

import HomeView from './components/sections/HomeView';
import ServicesView from './components/sections/ServicesView';
import GalleryGrid from './components/gallery/GalleryGrid';
import AboutView from './components/sections/AboutView';
import ContactView from './components/sections/ContactView';
import QuoteForm from './components/forms/QuoteForm';
import CmsView from './components/sections/CmsView';
import ProfileView from './components/sections/ProfileView';
import { toPersianNumber } from './utils/persian';

type ActiveView = 'home' | 'services' | 'service-detail' | 'gallery' | 'about' | 'contact' | 'quote' | 'cms' | 'profile';

export default function App() {
  const [currentView, setCurrentView] = useState<ActiveView>('home');
  const [selectedServiceId, setSelectedServiceId] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [galleryCategory, setGalleryCategory] = useState<string>('all');
  
  // Theme state supporting dark / light transitions
  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    const saved = localStorage.getItem('apex_theme');
    return (saved as 'dark' | 'light') || 'dark';
  });

  useEffect(() => {
    localStorage.setItem('apex_theme', theme);
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  // Lift view state triggers for seamless linkage across sections
  const handleNavigate = (page: string, params?: any) => {
    setIsMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });

    if (page === 'service-detail') {
      setSelectedServiceId(params?.id || null);
      setCurrentView('service-detail');
    } else if (page === 'services') {
      setSelectedServiceId(null);
      setCurrentView('services');
    } else {
      setCurrentView(page as ActiveView);
    }
  };

  const handleProjectClick = (projectId: string) => {
    let categoryFilter = 'all';
    if (projectId === 'proj-1' || projectId === 'proj-5') categoryFilter = 'commercial-construction';
    else if (projectId === 'proj-2') categoryFilter = 'residential-construction';
    else if (projectId === 'proj-3') categoryFilter = 'industrial-development';
    else if (projectId === 'proj-4') categoryFilter = 'site-preparation';
    
    setGalleryCategory(categoryFilter);
    setCurrentView('gallery');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleServiceQuoteTrigger = (serviceId: string) => {
    setSelectedServiceId(serviceId);
    setCurrentView('quote');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Close mobile drawer on resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="min-h-screen dark:bg-neutral-950 bg-stone-50 dark:text-[#e5e5e5] text-neutral-800 flex flex-col justify-between selection:bg-[#F2C94C] selection:text-black font-sans relative pb-16 lg:pb-0" id="apex-main-root">
      
      {/* 1. HEADER (High-Contrast Industrial layout with absolute contact hooks) */}
      <header className="sticky top-0 z-40 w-full dark:bg-neutral-900/90 bg-white/95 backdrop-blur-md border-b dark:border-neutral-800 border-neutral-200 transition-all" id="header-nav">
        <div className="max-w-7xl mx-auto px-4 md:px-8 h-20 flex items-center justify-between">
          
          {/* Brand Logo & Title */}
          <button 
            onClick={() => handleNavigate('home')}
            className="flex items-center gap-2.5 group cursor-pointer text-right select-none"
          >
            <div className="p-2 bg-[#F2C94C] text-black rounded font-black text-sm flex items-center justify-center">
              <HardHat className="h-5 w-5 stroke-[2.5]" />
            </div>
            <div>
              <span className="block font-black dark:text-white text-neutral-900 text-base md:text-lg tracking-wide leading-none">
                هلدینگ ساختمانی اَپکس
              </span>
              <span className="block text-[9px] font-mono font-bold tracking-widest text-[#F2C94C] uppercase mt-1 leading-none">
                APEX CONSTRUCTION GROUP • ۲001
              </span>
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 text-xs font-bold font-mono">
            <button
              onClick={() => handleNavigate('home')}
              className={`px-3 py-2 cursor-pointer transition-colors ${currentView === 'home' ? 'text-[#F2C94C]' : 'dark:text-neutral-300 text-neutral-600 hover:text-[#F2C94C] dark:hover:text-white'}`}
            >
              خانه
            </button>
            <button
              onClick={() => handleNavigate('services')}
              className={`px-3 py-2 cursor-pointer transition-colors ${(currentView === 'services' || currentView === 'service-detail') ? 'text-[#F2C94C]' : 'dark:text-neutral-300 text-neutral-600 hover:text-[#F2C94C] dark:hover:text-white'}`}
            >
              بخش‌های فنی
            </button>
            <button
              onClick={() => handleNavigate('gallery')}
              className={`px-3 py-2 cursor-pointer transition-colors ${currentView === 'gallery' ? 'text-[#F2C94C]' : 'dark:text-neutral-300 text-neutral-600 hover:text-[#F2C94C] dark:hover:text-white'}`}
            >
              گالری پروژه‌ها
            </button>
            <button
              onClick={() => handleNavigate('about')}
              className={`px-3 py-2 cursor-pointer transition-colors ${currentView === 'about' ? 'text-[#F2C94C]' : 'dark:text-neutral-300 text-neutral-600 hover:text-[#F2C94C] dark:hover:text-white'}`}
            >
              درباره ما
            </button>
            <button
              onClick={() => handleNavigate('contact')}
              className={`px-3 py-2 cursor-pointer transition-colors ${currentView === 'contact' ? 'text-[#F2C94C]' : 'dark:text-neutral-300 text-neutral-600 hover:text-[#F2C94C] dark:hover:text-white'}`}
            >
              تماس با ما
            </button>
            
            {/* Divider */}
            <span className="h-4 w-[1px] dark:bg-neutral-800 bg-neutral-200 mx-1"></span>

            <button
              onClick={() => handleNavigate('profile')}
              className={`px-3 py-2 cursor-pointer transition-colors flex items-center gap-1 ${currentView === 'profile' ? 'text-[#F2C94C]' : 'dark:text-neutral-300 text-neutral-600 hover:text-[#F2C94C] dark:hover:text-white'}`}
              title="پروفایل مهندسی کاربری"
            >
              <UserCheck className="h-3.5 w-3.5" />
              <span>پروفایل کارفرما</span>
            </button>

            <button
              onClick={() => handleNavigate('cms')}
              className={`px-3 py-2 cursor-pointer transition-colors flex items-center gap-1 ${currentView === 'cms' ? 'text-[#F2C94C]' : 'dark:text-neutral-300 text-neutral-600 hover:text-[#F2C94C] dark:hover:text-white'}`}
              title="پنل مدیریت پورتفولیو و استعلام ها"
            >
              <FolderLock className="h-3.5 w-3.5" />
              <span>پنل مدیریت CMS</span>
            </button>
          </nav>

          {/* Right Header Hotline Callout & CTA Button */}
          <div className="hidden lg:flex items-center gap-4">
            
            {/* Quick Sun/Moon Toggle Button */}
            <button
              onClick={toggleTheme}
              className="p-2 cursor-pointer dark:text-neutral-400 text-neutral-500 hover:text-[#F2C94C] transition-colors rounded-full"
              title={theme === 'dark' ? 'حالت روزکار (روشن)' : 'حالت شب‌کار (تیره)'}
            >
              {theme === 'dark' ? <Sun className="h-5 w-5 text-amber-500" /> : <Moon className="h-5 w-5 text-sky-600" />}
            </button>

            <a 
              href="tel:02188223344" 
              className="flex items-center gap-1.5 text-xs font-bold text-[#F2C94C] hover:text-yellow-600 transition-colors direction-ltr"
            >
              <PhoneCall className="h-4 w-4" />
              <span>۰۲۱-۸۸۲۲۳۳۴۴</span>
            </a>

            <button
              onClick={() => handleNavigate('quote')}
              className="px-5 py-2.5 bg-[#F2C94C] hover:bg-yellow-500 text-black text-xs font-bold uppercase rounded transition-all cursor-pointer shadow-lg"
            >
              استعلام فوری بها
            </button>
          </div>

          {/* Toggle Mobile Menu Button */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={toggleTheme}
              className="p-2 cursor-pointer dark:text-neutral-400 text-neutral-500 hover:text-[#F2C94C] transition-colors"
            >
              {theme === 'dark' ? <Sun className="h-5 w-5 text-amber-500" /> : <Moon className="h-5 w-5 text-sky-600" />}
            </button>

            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded dark:text-neutral-400 text-neutral-600 hover:text-[#F2C94C] focus:outline-none cursor-pointer"
              aria-label="Toggle Navigation Drawer"
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

        </div>
      </header>

      {/* 2. MOBILE DRAWER OVERLAY (Responsive slide-down) */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 top-20 z-30 dark:bg-neutral-950/95 bg-white/98 backdrop-blur-md lg:hidden animate-fadeIn text-right" id="mobile-navigation-overlay">
          <div className="flex flex-col p-6 space-y-4 text-sm font-bold">
            <button
              onClick={() => handleNavigate('home')}
              className={`py-3 border-b dark:border-neutral-800 border-neutral-200 cursor-pointer ${currentView === 'home' ? 'text-[#F2C94C]' : 'dark:text-neutral-300 text-neutral-700'}`}
            >
              خانه
            </button>
            <button
              onClick={() => handleNavigate('services')}
              className={`py-3 border-b dark:border-neutral-800 border-neutral-200 cursor-pointer ${(currentView === 'services' || currentView === 'service-detail') ? 'text-[#F2C94C]' : 'dark:text-neutral-300 text-neutral-700'}`}
            >
              دپارتمان‌های ساخت
            </button>
            <button
              onClick={() => handleNavigate('gallery')}
              className={`py-3 border-b dark:border-neutral-800 border-neutral-200 cursor-pointer ${currentView === 'gallery' ? 'text-[#F2C94C]' : 'dark:text-neutral-300 text-neutral-700'}`}
            >
              گالری پروژه‌ها
            </button>
            <button
              onClick={() => handleNavigate('about')}
              className={`py-3 border-b dark:border-neutral-800 border-neutral-200 cursor-pointer ${currentView === 'about' ? 'text-[#F2C94C]' : 'dark:text-neutral-300 text-neutral-700'}`}
            >
              درباره شرکت اَپکس
            </button>
            <button
              onClick={() => handleNavigate('contact')}
              className={`py-3 border-b dark:border-neutral-800 border-neutral-200 cursor-pointer ${currentView === 'contact' ? 'text-[#F2C94C]' : 'dark:text-neutral-300 text-neutral-700'}`}
            >
              تماس با دفتر مرکزی
            </button>

            <button
              onClick={() => handleNavigate('profile')}
              className={`py-3 border-b dark:border-neutral-800 border-neutral-200 cursor-pointer ${currentView === 'profile' ? 'text-[#F2C94C]' : 'dark:text-neutral-300 text-neutral-700'}`}
            >
              پروفایل کاربری و پروانه اشتغال
            </button>

            <button
              onClick={() => handleNavigate('cms')}
              className={`py-3 border-b dark:border-neutral-800 border-neutral-200 cursor-pointer ${currentView === 'cms' ? 'text-[#F2C94C]' : 'dark:text-neutral-300 text-neutral-700'}`}
            >
              پنل مدیریت و استعلام‌ها (CMS)
            </button>
            
            <button
              onClick={() => handleNavigate('quote')}
              className="py-4 bg-[#F2C94C] text-black hover:bg-yellow-500 rounded text-center cursor-pointer font-bold select-none"
            >
              استعلام آنلاین گام‌به‌گام قیمت ساخت
            </button>

            <a 
              href="tel:02188223344" 
              className="flex items-center justify-center gap-2 py-3 text-xs text-[#F2C94C] font-mono mt-4 direction-ltr"
            >
              <PhoneCall className="h-4 w-4" />
              <span>۰۲۱-۸۸۲۲۳۳۴۴</span>
            </a>
          </div>
        </div>
      )}

      {/* 3. MAIN CONTENTS SECTION (Active route renderer) */}
      <main className="flex-grow dark:bg-neutral-950 bg-stone-50 transition-colors">
        {currentView === 'home' && (
          <HomeView 
            onNavigate={handleNavigate}
            onProjectClick={handleProjectClick}
          />
        )}

        {currentView === 'services' && (
          <ServicesView 
            selectedServiceId={null}
            onNavigateToQuote={handleServiceQuoteTrigger}
            onNavigateToProject={handleProjectClick}
          />
        )}

        {currentView === 'service-detail' && (
          <ServicesView 
            selectedServiceId={selectedServiceId}
            onNavigateToQuote={handleServiceQuoteTrigger}
            onNavigateToProject={handleProjectClick}
          />
        )}

        {currentView === 'gallery' && (
          <div className="max-w-7xl mx-auto px-4 md:px-8 py-12 space-y-8 animate-fadeIn text-right">
            <div className="text-center space-y-2 max-w-2xl mx-auto mb-10">
              <span className="text-xs font-bold text-[#F2C94C] uppercase tracking-widest dark:bg-[#181818] bg-[#fffbeb] border dark:border-neutral-800 border-amber-200 px-3 py-1.5 rounded-md">
                آلبوم مستندات و شناسنامه فنی مگاپروژه‌ها
              </span>
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-black dark:text-white text-neutral-900 pt-2">
                کاتالوگ پروژه‌های عمرانی انجام شده
              </h1>
              <p className="dark:text-neutral-400 text-neutral-500 text-xs md:text-sm leading-relaxed">
                جستجو و فیلتر بر اساس دپارتمان‌های تجاری، مسکونی، لجستیکی و پایدارسازی خاک. برای بررسی چالش‌ها و راه حل‌های فنی هر سازه روی آن ضربه بزنید.
              </p>
            </div>
            <GalleryGrid 
              initialCategory={galleryCategory}
              onSelectProject={handleProjectClick}
            />
          </div>
        )}

        {currentView === 'about' && <AboutView />}

        {currentView === 'contact' && <ContactView />}

        {currentView === 'profile' && <ProfileView theme={theme} onThemeToggle={toggleTheme} />}

        {currentView === 'cms' && <CmsView />}

        {currentView === 'quote' && (
          <div className="max-w-7xl mx-auto px-4 md:px-8 py-12 space-y-8 animate-fadeIn text-right">
            <div className="text-center space-y-2 max-w-2xl mx-auto mb-10">
              <span className="text-xs font-bold text-[#F2C94C] uppercase tracking-widest dark:bg-[#181818] bg-[#fffbeb] border dark:border-neutral-800 border-amber-250 px-3 py-1.5 rounded-md">
                سامانه هوشمند تخمین ارزش ساختمانی
              </span>
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-black dark:text-white text-neutral-950 pt-2">
                برآورد آنلاین و متره گام‌به‌گام بها
              </h1>
              <p className="dark:text-neutral-400 text-neutral-500 text-xs md:text-sm leading-relaxed">
                با تکمیل اطلاعات ذیل، جزئیات متراژ، کاربری، موانع خاکی و پروانه‌های ساختمانی را مشخص نمایید تا گزارش فنی ظرف ۲۴ ساعت برای شما ایمیل شود.
              </p>
            </div>
            
            <QuoteForm initialServiceId={selectedServiceId || ''} />
          </div>
        )}
      </main>

      {/* 4. FOOTER (High-fidelity detailed corporate layout) */}
      <footer className="w-full dark:bg-neutral-950 bg-stone-100 border-t dark:border-neutral-800 border-neutral-250 pt-16 pb-8 text-right" id="apex-footer">
        <div className="max-w-7xl mx-auto px-4 md:px-8 grid grid-cols-1 md:grid-cols-12 gap-10 border-b dark:border-neutral-850 border-neutral-200 pb-16">
          
          {/* Brand/Credentials statement column */}
          <div className="md:col-span-5 space-y-6">
            <div className="flex items-center gap-2.5">
              <div className="p-2 bg-[#F2C94C] text-black font-mono font-black text-sm rounded">
                <HardHat className="h-5 w-5 stroke-[2.5]" />
              </div>
              <span className="font-black dark:text-white text-neutral-900 text-base md:text-lg tracking-wider uppercase">
                هلدینگ مهندسی و ساختمانی اَپکس
              </span>
            </div>
            <p className="dark:text-neutral-400 text-neutral-600 text-xs md:text-sm max-w-md leading-relaxed">
              طراح و مجری برج‌های مسکونی مجلل، مجتمع‌های انبارداری چندمنظوره صنعتی، پایدارسازی نیلینگ دیواره‌های گود و ابنیه اداری لوکس در ایران. پایبندی به برنامه زمان‌بندی و انضباط کامل برآورد مالی پروژه‌ها از سال ۱۳۸۰.
            </p>
            
            {/* Safety index seal footer tag */}
            <div className="inline-flex items-center gap-2 py-1.5 px-3 rounded-md dark:bg-neutral-900 bg-white border dark:border-neutral-800 border-neutral-200 text-xs font-mono">
              <ShieldCheck className="h-4 w-4 text-[#F2C94C]" />
              <span className="dark:text-gray-300 text-neutral-700">شاخص سلامت و ایمنی کارگاه (HSE): <span className="text-[#F2C94C] font-semibold">{toPersianNumber('۰.۷۲')} - استاندارد طلا</span></span>
            </div>
          </div>

          {/* Divisions Navigation Column */}
          <div className="md:col-span-3 space-y-4">
            <h4 className="text-xs font-bold dark:text-white text-neutral-950 uppercase tracking-widest">تخصص‌های مهندسی</h4>
            <ul className="text-xs dark:text-neutral-400 text-neutral-600 space-y-2.5 font-bold">
              <li>
                <button onClick={() => handleNavigate('services')} className="hover:text-[#F2C94C] transition-colors cursor-pointer">
                  <span>ساختمان‌های لوکس مسکونی و ویلایی</span>
                </button>
              </li>
              <li>
                <button onClick={() => handleNavigate('services')} className="hover:text-[#F2C94C] transition-colors cursor-pointer">
                  <span>پایدارسازی و مهار گودهای عمیق</span>
                </button>
              </li>
              <li>
                <button onClick={() => handleNavigate('services')} className="hover:text-[#F2C94C] transition-colors cursor-pointer">
                  <span>سوله‌های لجستیکی و انبارداری صنعتی</span>
                </button>
              </li>
              <li>
                <button onClick={() => handleNavigate('services')} className="hover:text-[#F2C94C] transition-colors cursor-pointer">
                  <span>ابنیه مگا تجاری و هتل‌های پنج ستاره</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Quick links & regulatory column */}
          <div className="md:col-span-4 space-y-4">
            <h4 className="text-xs font-bold dark:text-white text-neutral-950 uppercase tracking-widest font-mono">ارتباط مستقیم مدیریت کارگاه</h4>
            <div className="text-xs dark:text-neutral-400 text-neutral-600 space-y-2">
              <p>شماره تلفن واحد هماهنگی و دیسپچ مرکزی: <a href="tel:02188223344" className="text-[#F2C94C] font-bold hover:underline">۰۲۱-۸۸۲۲۳۳۴۴</a></p>
              <p>پست الکترونیکی مرکزی: <a href="mailto:office@apexgroup.fa" className="dark:text-gray-300 text-neutral-700 hover:underline">office@apexgroup.fa</a></p>
              <p>دفتر مرکزی: تهران، پاسداران، میدان هروی، خ وفامنش، شرکت مهندسی اَپکس</p>
            </div>
          </div>

        </div>

        {/* copyright sub-footer */}
        <div className="max-w-7xl mx-auto px-4 md:px-8 mt-8 flex flex-col md:flex-row justify-between text-[11px] text-stone-500 font-mono gap-4 md:gap-0">
          <span>© ۱۴۰۵ تمامی حقوق مالکیت مادی و معنوی پورتال برای هلدینگ ساختمانی اَپکس محفوظ است. پروانه نظام مهندسی شماره GC-8452-901A.</span>
          <div className="flex gap-4">
            <span className="hover:text-black dark:hover:text-white cursor-pointer select-none">شرایط رضایت کارفرمایان</span>
            <span>•</span>
            <span className="hover:text-black dark:hover:text-white cursor-pointer select-none">دستورالعمل‌های ایمنی کارگاه</span>
          </div>
        </div>
      </footer>

      {/* 5. PERSISTENT MOBILE STICKY BID BAR (Super responsive conversion widget) */}
      <div 
        className="fixed bottom-0 left-0 right-0 z-40 dark:bg-neutral-900 bg-white border-t dark:border-neutral-800 border-neutral-200 py-3.5 px-4 flex items-center justify-between lg:hidden"
        id="sticky-mobile-conversion-bar"
      >
        <a 
          href="tel:02188223344" 
          className="flex-1 flex items-center justify-center gap-2 py-3 dark:bg-neutral-950 bg-stone-100 dark:text-white text-neutral-900 hover:bg-stone-200 font-bold text-xs rounded border dark:border-neutral-805 border-neutral-200 transition-colors text-center"
        >
          <PhoneCall className="h-4 w-4 text-[#F2C94C]" />
          <span>تماس با دفتر</span>
        </a>

        <div className="w-3"></div>

        <button
          onClick={() => handleNavigate('quote')}
          className="flex-[2] flex items-center justify-center gap-1.5 py-3 bg-[#F2C94C] hover:bg-yellow-500 text-black font-black text-xs uppercase tracking-wide rounded shadow-md transition-transform shrink-0"
        >
          <span>استعلام قیمت آنلاین</span>
          <ArrowLeft className="h-3.5 w-3.5" />
        </button>
      </div>

    </div>
  );
}
