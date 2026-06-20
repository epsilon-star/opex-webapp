import React, { useState, useEffect } from 'react';
import { 
  Plus, 
  Trash2, 
  Edit, 
  Settings, 
  FolderGit2, 
  Layers, 
  User, 
  Briefcase, 
  MapPin, 
  Calendar, 
  Check, 
  X,
  FileSpreadsheet,
  RefreshCw,
  Mail,
  Phone,
  Clock,
  ExternalLink
} from 'lucide-react';
import { Project } from '../../types';
import { projectsData as staticProjects } from '../../data/projects';
import { toPersianNumber } from '../../utils/persian';

interface CmsViewProps {
  onProjectsUpdate?: (updatedList: Project[]) => void;
}

export default function CmsView({ onProjectsUpdate }: CmsViewProps) {
  const [activeTab, setActiveTab] = useState<'quotes' | 'projects'>('quotes');
  const [quotes, setQuotes] = useState<any[]>([]);
  const [projectsList, setProjectsList] = useState<Project[]>([]);
  
  // Modal / Form state for Project editing/creation
  const [isProjectFormOpen, setIsProjectFormOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [projectForm, setProjectForm] = useState<Partial<Project>>({
    title: '',
    category: 'commercial-construction',
    size: '۲,۵۰۰ متر مربع',
    location: 'تهران، جردن',
    year: 1402,
    description: '',
    challenge: '',
    solution: '',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=600&q=80',
    gallery: [],
    timeline: '۱۲ ماه',
    status: 'Completed'
  });

  const [message, setMessage] = useState<string | null>(null);

  // Load quotes and projects from localStorage
  useEffect(() => {
    loadQuotes();
    loadProjects();
  }, []);

  const loadQuotes = () => {
    const stored = localStorage.getItem('apex_quotes');
    if (stored) {
      setQuotes(JSON.parse(stored));
    } else {
      // Seed some starter quotes for demo completeness if empty
      const starterQuotes = [
        {
          id: 'APX-759201',
          projectType: 'commercial-construction',
          scopeSize: '۵,۰۰۰ متر مربع',
          timeline: 'medium',
          contactName: 'مهندس حسام راد',
          contactEmail: 'rad@mana-holding.ir',
          contactPhone: '۰۹۱۲۲۳۳۴۴۵۵',
          description: 'احداث اسکلت بتنی مجتمع لجستیکی در شهرک صنعتی شمس‌آباد با سقف‌های پیش‌تنیده و زمان فشرده قبل از فصل پاییز',
          siteAddress: 'کیلومتر ۳۵ اتوبان تهران-قم، شهرک صنعتی شمس‌آباد ری',
          hasPlans: 'yes',
          createdAt: new Date(Date.now() - 3600000 * 4).toISOString(),
          status: 'Pending'
        },
        {
          id: 'APX-418290',
          projectType: 'residential-construction',
          scopeSize: '۸۰۰ متر مربع زیربنا',
          timeline: 'short',
          contactName: 'آقای شریفی',
          contactEmail: 'sharifi@sharif-villas.ir',
          contactPhone: '۰۹۱۲۱۱۱۰۰۹۹',
          description: 'پی‌ریزی و خاکبرداری تراز عمیق برای کاخ ویلای تریپلکس در کلاردشت، دارای زمین صخره‌ای آبرفتی مرطوب شیب‌دار متحرک',
          siteAddress: 'مازندران، کلاردشت، دشت حسن‌کیف',
          hasPlans: 'no',
          createdAt: new Date(Date.now() - 3600000 * 24).toISOString(),
          status: 'Reviewed'
        }
      ];
      localStorage.setItem('apex_quotes', JSON.stringify(starterQuotes));
      setQuotes(starterQuotes);
    }
  };

  const loadProjects = () => {
    const customStored = localStorage.getItem('apex_custom_projects');
    let loaded: Project[] = [];
    if (customStored) {
      loaded = JSON.parse(customStored);
    } else {
      loaded = [...staticProjects];
      localStorage.setItem('apex_custom_projects', JSON.stringify(loaded));
    }
    setProjectsList(loaded);
    onProjectsUpdate?.(loaded);
  };

  const syncProjectsToStorage = (updated: Project[]) => {
    localStorage.setItem('apex_custom_projects', JSON.stringify(updated));
    setProjectsList(updated);
    onProjectsUpdate?.(updated);
  };

  // Change request status
  const updateQuoteStatus = (idx: number, newStatus: string) => {
    const updated = [...quotes];
    updated[idx].status = newStatus;
    localStorage.setItem('apex_quotes', JSON.stringify(updated));
    setQuotes(updated);
    showNotice('وضعیت استعلام با موفقیت ویرایش شد');
  };

  // Delete quote
  const deleteQuote = (id: string) => {
    const updated = quotes.filter(q => q.id !== id);
    localStorage.setItem('apex_quotes', JSON.stringify(updated));
    setQuotes(updated);
    showNotice('استعلام پیگیری با موفقیت حذف گردید');
  };

  // Reset local lists to factory settings
  const factoryResetAll = () => {
    localStorage.removeItem('apex_custom_projects');
    localStorage.removeItem('apex_quotes');
    loadQuotes();
    loadProjects();
    showNotice('پایگاه داده به حالت اولیه بازگردانی شد');
  };

  const showNotice = (msg: string) => {
    setMessage(msg);
    setTimeout(() => setMessage(null), 3000);
  };

  // Project item operations
  const handleOpenNewProject = () => {
    setEditingProject(null);
    setProjectForm({
      title: '',
      category: 'commercial-construction',
      size: '۲,۵۰۰ متر مربع',
      location: 'تهران، زعفرانیه',
      year: 1402,
      description: '',
      challenge: '',
      solution: '',
      image: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=600&q=80',
      gallery: [],
      timeline: '۱۲ ماه',
      status: 'Completed'
    });
    setIsProjectFormOpen(true);
  };

  const handleOpenEditProject = (proj: Project) => {
    setEditingProject(proj);
    setProjectForm({ ...proj });
    setIsProjectFormOpen(true);
  };

  const handleDeleteProject = (id: string) => {
    const updated = projectsList.filter(p => p.id !== id);
    syncProjectsToStorage(updated);
    showNotice('پروژه با موفقیت از پورتفولیو حذف شد');
  };

  const handleSaveProjectForm = (e: React.FormEvent) => {
    e.preventDefault();
    if (!projectForm.title || !projectForm.description) {
      showNotice('خطا: لطفا عنوان و شرح کامل سازه را وارد کنید');
      return;
    }

    let updatedList = [...projectsList];

    if (editingProject) {
      // update
      updatedList = updatedList.map(p => p.id === editingProject.id ? (projectForm as Project) : p);
      showNotice('بروزرسانی کاتالوگ پروژه با موفقیت اعمال گشت');
    } else {
      // create new
      const newProj: Project = {
        id: `proj-custom-${Date.now()}`,
        title: projectForm.title || 'سازه جدید اَپکس',
        category: projectForm.category || 'commercial-construction',
        size: projectForm.size || '۱۰,۰۰۰ متر مربع',
        location: projectForm.location || 'تهران',
        year: Number(projectForm.year) || 1402,
        description: projectForm.description || '',
        challenge: projectForm.challenge || 'عدم دسترسی روان به معابر گود',
        solution: projectForm.solution || 'تثبیت سازه نگهبان خرپایی اَپکس',
        image: projectForm.image || 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=600&q=80',
        gallery: [],
        timeline: projectForm.timeline || '۱۲ ماه',
        status: projectForm.status as 'Completed' | 'In Progress' | 'Pre-Construction' || 'Completed'
      };
      updatedList.unshift(newProj);
      showNotice('پروژه جدید اَپکس با موفقیت به گالری و تارنما پیوست شد');
    }

    syncProjectsToStorage(updatedList);
    setIsProjectFormOpen(false);
    setEditingProject(null);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-12 text-right animate-fadeIn" id="cms-dashboard">
      
      {/* Top Section Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b dark:border-neutral-800 border-neutral-200 pb-6 mb-10 gap-4">
        <div>
          <span className="text-xs font-bold text-[#F2C94C] bg-stone-100 dark:bg-neutral-900 px-3 py-1.5 rounded-md border dark:border-neutral-800 border-neutral-250">
            پنل یکپارچه مدیریت محتوا و استعلام‌ها (CMS)
          </span>
          <h1 className="text-2xl md:text-3xl font-black dark:text-white text-neutral-905 mt-2.5">
            میز کار نظارت فنی مهندسی اَپکس
          </h1>
          <p className="dark:text-neutral-400 text-neutral-500 text-xs md:text-sm mt-1">
            ویرایش پروژه‌های فعال پورتفولیو، پایش استعلام‌های دریافتی از کارفرمایان و بازنشانی منابع آفلاین.
          </p>
        </div>

        <div className="flex gap-3">
          <button
            onClick={factoryResetAll}
            className="px-4 py-2 text-xs font-bold bg-neutral-100 dark:bg-neutral-800 text-rose-500 hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors border dark:border-neutral-700 border-neutral-300 rounded cursor-pointer"
          >
            پاکسازی و بازنشانی داده‌ها
          </button>
        </div>
      </div>

      {/* Messages Alerts */}
      {message && (
        <div className="bg-[#1e1a11] border border-[#F2C94C] text-[#F2C94C] p-4 rounded-lg mb-6 text-xs font-bold flex items-center gap-2 animate-fadeIn">
          <Check className="h-4 w-4" />
          <span>{message}</span>
        </div>
      )}

      {/* Primary Navigator Tabs */}
      <div className="flex gap-3 mb-8 border-b dark:border-neutral-800 border-neutral-200 pb-4">
        <button
          onClick={() => setActiveTab('quotes')}
          className={`px-5 py-3 text-xs font-bold tracking-wide transition-all border rounded cursor-pointer ${
            activeTab === 'quotes'
              ? 'bg-[#F2C94C] text-black border-transparent'
              : 'dark:bg-neutral-900 bg-white dark:text-neutral-300 text-neutral-700 dark:border-neutral-800 border-neutral-200 hover:border-[#F2C94C]'
          }`}
        >
          درخواست‌های استعلام واصل شده ({toPersianNumber(quotes.length)})
        </button>

        <button
          onClick={() => setActiveTab('projects')}
          className={`px-5 py-3 text-xs font-bold tracking-wide transition-all border rounded cursor-pointer ${
            activeTab === 'projects'
              ? 'bg-[#F2C94C] text-black border-transparent'
              : 'dark:bg-neutral-900 bg-white dark:text-neutral-300 text-neutral-700 dark:border-neutral-800 border-neutral-200 hover:border-[#F2C94C]'
          }`}
        >
          مدیریت گالری و نمونه کارها ({toPersianNumber(projectsList.length)})
        </button>
      </div>

      {/* TAB 1: LIST QUOTES LEADS */}
      {activeTab === 'quotes' && (
        <div className="space-y-6">
          {quotes.length === 0 ? (
            <div className="text-center py-16 border border-dashed dark:border-neutral-800 border-neutral-300 rounded-lg">
              <FileSpreadsheet className="mx-auto h-12 w-12 text-stone-400 mb-2" />
              <p className="dark:text-neutral-400 text-neutral-500 text-sm font-bold">هیچ درخواستی در سامانه ثبت نشده است.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6">
              {quotes.map((quote, idx) => (
                <div 
                  key={quote.id}
                  className="p-6 rounded-xl dark:bg-neutral-900 bg-white border dark:border-neutral-800 border-neutral-200 shadow space-y-4"
                >
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center pb-3 border-b dark:border-neutral-800 border-neutral-200 gap-2">
                    <div className="flex items-center gap-2.5">
                      <span className="p-1 px-2.5 bg-neutral-100 dark:bg-neutral-950 dark:text-neutral-350 text-neutral-700 rounded text-[10px] font-mono font-bold border dark:border-neutral-800">
                        کد پیگیری: {toPersianNumber(quote.id)}
                      </span>
                      <span className={`px-2.5 py-0.5 rounded text-[10px] font-bold ${
                        quote.status === 'Pending' 
                          ? 'bg-amber-500/10 text-amber-500' 
                          : quote.status === 'Reviewed' 
                          ? 'bg-sky-500/10 text-sky-500' 
                          : 'bg-emerald-500/10 text-emerald-500'
                      }`}>
                        {quote.status === 'Pending' && 'در انتظار بررسی اولیه'}
                        {quote.status === 'Reviewed' && 'تحت محاسبات متره'}
                        {quote.status === 'Contacted' && 'ارتباط برقرار شده'}
                      </span>
                    </div>

                    <div className="text-xs dark:text-neutral-400 text-neutral-500 font-mono">
                      ثبت در: {toPersianNumber(new Date(quote.createdAt).toLocaleDateString('fa-IR', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      }))}
                    </div>
                  </div>

                  {/* Core details */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                    <div>
                      <span className="font-bold block dark:text-stone-400 text-stone-605">شاخه پروژه:</span>
                      <span className="dark:text-white text-neutral-900 font-bold block mt-1.5 bg-neutral-50 dark:bg-neutral-950 p-2 rounded">
                        {quote.projectType === 'commercial-construction' && 'دپارتمان تجاری و اداری'}
                        {quote.projectType === 'residential-construction' && 'دپارتمان مسکونی و ویلایی'}
                        {quote.projectType === 'industrial-development' && 'دپارتمان صنعتی و انبارداری'}
                        {quote.projectType === 'site-preparation' && 'دپارتمان خاکبرداری و بسترپرور'}
                        {!['commercial-construction', 'residential-construction', 'industrial-development', 'site-preparation'].includes(quote.projectType) && quote.projectType}
                      </span>
                    </div>
                    <div>
                      <span className="font-bold block dark:text-stone-400 text-stone-605">کارفرما / متقاضی:</span>
                      <span className="dark:text-white text-neutral-900 font-bold block mt-1.5 p-2 bg-neutral-50 dark:bg-neutral-950 rounded">
                        {quote.contactName}
                      </span>
                    </div>
                    <div>
                      <span className="font-bold block dark:text-stone-400 text-stone-605">زیربنا و مقیاس:</span>
                      <span className="dark:text-white text-neutral-900 font-bold block mt-1.5 p-2 bg-neutral-50 dark:bg-neutral-950 rounded">
                        {toPersianNumber(quote.scopeSize)}
                      </span>
                    </div>
                  </div>

                  {/* Contact channels */}
                  <div className="flex flex-wrap gap-4 text-xs text-stone-500 dark:text-stone-400 pt-2 pb-2">
                    <span className="flex items-center gap-1">
                      <Mail className="h-3.5 w-3.5 text-stone-400" />
                      <span>{quote.contactEmail}</span>
                    </span>
                    <span className="flex items-center gap-1">
                      <Phone className="h-3.5 w-3.5 text-stone-400" />
                      <span>{toPersianNumber(quote.contactPhone)}</span>
                    </span>
                    {quote.siteAddress && (
                      <span className="flex items-center gap-1">
                        <MapPin className="h-3.5 w-3.5 text-stone-400" />
                        <span>آدرس: {quote.siteAddress}</span>
                      </span>
                    )}
                  </div>

                  {/* Brief description */}
                  <div className="p-3 rounded-lg dark:bg-neutral-950 bg-stone-50 border dark:border-neutral-800 border-neutral-200">
                    <span className="text-[10px] font-bold block dark:text-neutral-450 text-stone-500 mb-1.5">خلاصه فنی توصیف وضعیت:</span>
                    <p className="text-xs leading-relaxed dark:text-stone-300 text-neutral-700">{quote.description}</p>
                  </div>

                  {/* Operational buttons */}
                  <div className="flex justify-between items-center pt-3 border-t dark:border-neutral-800 border-neutral-200 mt-2">
                    <div className="flex gap-2">
                      <button
                        onClick={() => updateQuoteStatus(idx, 'Reviewed')}
                        className={`px-3 py-1.5 text-[10px] font-bold rounded cursor-pointer ${
                          quote.status === 'Reviewed' 
                            ? 'bg-sky-500 text-white' 
                            : 'dark:bg-neutral-850 bg-stone-100 hover:bg-stone-200 dark:text-white text-neutral-850'
                        }`}
                      >
                        قرار دادن در متره و برآورد
                      </button>

                      <button
                        onClick={() => updateQuoteStatus(idx, 'Contacted')}
                        className={`px-3 py-1.5 text-[10px] font-bold rounded cursor-pointer ${
                          quote.status === 'Contacted' 
                            ? 'bg-emerald-500 text-white' 
                            : 'dark:bg-neutral-850 bg-stone-100 hover:bg-stone-200 dark:text-white text-neutral-850'
                        }`}
                      >
                        ثبت تماس و ارتباط نهایی
                      </button>
                    </div>

                    <button
                      onClick={() => deleteQuote(quote.id)}
                      className="p-2 text-rose-500 hover:bg-rose-500/10 rounded cursor-pointer"
                      title="حذف متقاضی"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* TAB 2: PORTFOLIO WORKS */}
      {activeTab === 'projects' && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-base font-black dark:text-white text-neutral-900">
              ویرایش گالری و کاتالوگ مگا ساختمان‌ها
            </h3>
            
            <button
              onClick={handleOpenNewProject}
              className="px-4 py-2 bg-[#F2C94C] text-black text-xs font-bold rounded flex items-center gap-1.5 cursor-pointer shadow"
            >
              <Plus className="h-4 w-4" />
              <span>افزودن نمونه‌کار جدید</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projectsList.map((proj) => (
              <div 
                key={proj.id}
                className="rounded-xl dark:bg-neutral-900 bg-white border dark:border-neutral-800 border-neutral-200 overflow-hidden shadow flex flex-col justify-between"
              >
                <div className="relative h-44 bg-zinc-950 border-b dark:border-neutral-800 border-neutral-200">
                  <img src={proj.image} alt={proj.title} className="w-full h-full object-cover opacity-80" referrerPolicy="no-referrer" />
                  <span className="absolute bottom-2.5 right-2.5 text-[10px] bg-[#F2C94C] text-black font-bold px-2 py-0.5 rounded">
                    {proj.category === 'commercial-construction' && 'تجاری و اداری'}
                    {proj.category === 'residential-construction' && 'مسکونی-ویلایی'}
                    {proj.category === 'industrial-development' && 'صنعتی و انبار'}
                    {proj.category === 'site-preparation' && 'خاکبرداری بستر'}
                    {!['commercial-construction', 'residential-construction', 'industrial-development', 'site-preparation'].includes(proj.category) && proj.category}
                  </span>
                </div>

                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <h4 className="font-bold dark:text-white text-neutral-950 text-sm leading-tight line-clamp-1">{proj.title}</h4>
                    <p className="text-[10px] dark:text-neutral-500 text-neutral-450 mt-1">{proj.location} • خاتمه {toPersianNumber(proj.year)}</p>
                    <p className="text-xs dark:text-neutral-400 text-neutral-600 mt-2 line-clamp-2 leading-relaxed">{proj.description}</p>
                  </div>

                  <div className="flex justify-between items-center pt-3 border-t dark:border-neutral-800 border-neutral-200">
                    <span className="text-[10px] text-[#F2C94C] font-mono">{toPersianNumber(proj.size)}</span>
                    
                    <div className="flex gap-1.5">
                      <button
                        onClick={() => handleOpenEditProject(proj)}
                        className="p-1.5 dark:bg-neutral-800 bg-stone-100 hover:bg-[#F2C94C] hover:text-black rounded dark:text-white text-neutral-700 transition-colors cursor-pointer"
                        title="ویرایش پروژه"
                      >
                        <Edit className="h-3.5 w-3.5" />
                      </button>
                      
                      <button
                        onClick={() => handleDeleteProject(proj.id)}
                        className="p-1.5 dark:bg-neutral-800 bg-stone-100 hover:bg-rose-500 hover:text-white rounded text-rose-500 transition-colors cursor-pointer"
                        title="حذف نمونه‌کار"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* PROJECT ACTION EDIT/CREATE MODAL */}
      {isProjectFormOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-md flex items-center justify-center p-4 md:p-8 animate-fadeIn">
          <div 
            className="w-full max-w-2xl dark:bg-neutral-900 bg-white border dark:border-neutral-850 border-neutral-300 rounded-2xl overflow-hidden p-6 md:p-8 text-right shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center pb-4 border-b dark:border-neutral-800 border-neutral-200 mb-6">
              <h3 className="text-lg md:text-xl font-black dark:text-white text-neutral-950">
                {editingProject ? 'ویرایش اطلاعات مگاپروژه' : 'ثبت بنای نمونه‌کار جدید'}
              </h3>
              <button 
                onClick={() => setIsProjectFormOpen(false)}
                className="p-1.5 hover:bg-stone-100 dark:hover:bg-neutral-800 rounded cursor-pointer"
              >
                <X className="h-5 w-5 dark:text-white text-neutral-950" />
              </button>
            </div>

            <form onSubmit={handleSaveProjectForm} className="space-y-4 text-xs md:text-sm">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                
                <div className="space-y-1.5">
                  <label className="block dark:text-stone-300 text-neutral-700 font-bold">اسم مگاپروژه <span className="text-rose-500">*</span></label>
                  <input
                    type="text"
                    value={projectForm.title || ''}
                    onChange={(e) => setProjectForm({ ...projectForm, title: e.target.value })}
                    className="w-full dark:bg-neutral-950 bg-stone-50 border dark:border-neutral-800 border-neutral-250 rounded p-2.5 focus:outline-none focus:border-[#F2C94C] dark:text-white text-neutral-950"
                    placeholder="مثال: برج مگا سنتر الهیه"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block dark:text-stone-300 text-neutral-700 font-bold">بخش فنی دپارتمان</label>
                  <select
                    value={projectForm.category || ''}
                    onChange={(e) => setProjectForm({ ...projectForm, category: e.target.value })}
                    className="w-full dark:bg-neutral-950 bg-stone-50 border dark:border-neutral-800 border-neutral-250 rounded p-2.5 focus:outline-none focus:border-[#F2C94C] dark:text-white text-neutral-955"
                  >
                    <option value="commercial-construction">دپارتمان تجاری و اداری</option>
                    <option value="residential-construction">دپارتمان مسکونی و ویلایی</option>
                    <option value="industrial-development">دپارتمان صنعتی و انبارداری</option>
                    <option value="site-preparation">دپارتمان خاکبرداری و پایدارسازی</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="block dark:text-stone-300 text-neutral-700 font-bold">زیربنا و مقیاس متره</label>
                  <input
                    type="text"
                    value={projectForm.size || ''}
                    onChange={(e) => setProjectForm({ ...projectForm, size: e.target.value })}
                    className="w-full dark:bg-neutral-950 bg-stone-50 border dark:border-neutral-800 border-neutral-250 rounded p-2.5 focus:outline-none focus:border-[#F2C94C] dark:text-white text-neutral-950"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block dark:text-stone-300 text-neutral-700 font-bold">موقعیت جغرافیایی</label>
                  <input
                    type="text"
                    value={projectForm.location || ''}
                    onChange={(e) => setProjectForm({ ...projectForm, location: e.target.value })}
                    className="w-full dark:bg-neutral-950 bg-stone-50 border dark:border-neutral-800 border-neutral-250 rounded p-2.5 focus:outline-none focus:border-[#F2C94C] dark:text-white text-neutral-905"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block dark:text-stone-300 text-neutral-700 font-bold">بازه زمانی اجرا</label>
                  <input
                    type="text"
                    value={projectForm.timeline || ''}
                    onChange={(e) => setProjectForm({ ...projectForm, timeline: e.target.value })}
                    className="w-full dark:bg-neutral-950 bg-stone-50 border dark:border-neutral-800 border-neutral-250 rounded p-2.5 focus:outline-none focus:border-[#F2C94C] dark:text-white text-neutral-905"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block dark:text-stone-300 text-neutral-700 font-bold">سال بهره‌برداری خورشیدی</label>
                  <input
                    type="number"
                    value={projectForm.year || 1402}
                    onChange={(e) => setProjectForm({ ...projectForm, year: Number(e.target.value) })}
                    className="w-full dark:bg-neutral-950 bg-stone-50 border dark:border-neutral-800 border-neutral-250 rounded p-2.5 focus:outline-none focus:border-[#F2C94C] dark:text-white text-neutral-955"
                  />
                </div>

                <div className="space-y-1.5 md:col-span-2">
                  <label className="block dark:text-stone-300 text-neutral-700 font-bold">نشانی لینک تصویر شاخص</label>
                  <input
                    type="text"
                    value={projectForm.image || ''}
                    onChange={(e) => setProjectForm({ ...projectForm, image: e.target.value })}
                    className="w-full dark:bg-neutral-950 bg-stone-50 border dark:border-neutral-800 border-neutral-250 rounded p-2.5 focus:outline-none focus:border-[#F2C94C] dark:text-white text-neutral-905"
                  />
                </div>

                <div className="space-y-1.5 md:col-span-2">
                  <label className="block dark:text-stone-300 text-neutral-700 font-bold">شرح خلاصه پروژه</label>
                  <textarea
                    rows={2}
                    value={projectForm.description || ''}
                    onChange={(e) => setProjectForm({ ...projectForm, description: e.target.value })}
                    className="w-full dark:bg-neutral-950 bg-stone-50 border dark:border-neutral-800 border-neutral-250 rounded p-2.5 focus:outline-none focus:border-[#F2C94C] dark:text-white text-neutral-905"
                  ></textarea>
                </div>

                <div className="space-y-1.5 md:col-span-2">
                  <label className="block dark:text-stone-305 text-neutral-700 font-bold text-rose-500">چالش زمینی یا مهندسی پروژه</label>
                  <textarea
                    rows={2}
                    value={projectForm.challenge || ''}
                    onChange={(e) => setProjectForm({ ...projectForm, challenge: e.target.value })}
                    className="w-full dark:bg-neutral-950 bg-stone-50 border dark:border-neutral-800 border-neutral-250 rounded p-2.5 focus:outline-none focus:border-[#F2C94C] dark:text-white text-neutral-905"
                  ></textarea>
                </div>

                <div className="space-y-1.5 md:col-span-2">
                  <label className="block dark:text-stone-300 text-neutral-700 font-bold text-emerald-500">راهکار به کار گرفته شده اپکس</label>
                  <textarea
                    rows={2}
                    value={projectForm.solution || ''}
                    onChange={(e) => setProjectForm({ ...projectForm, solution: e.target.value })}
                    className="w-full dark:bg-neutral-950 bg-stone-50 border dark:border-neutral-800 border-neutral-250 rounded p-2.5 focus:outline-none focus:border-[#F2C94C] dark:text-white text-neutral-905"
                  ></textarea>
                </div>

              </div>

              <div className="flex justify-end gap-3 pt-4 border-t dark:border-neutral-800 border-neutral-200">
                <button
                  type="button"
                  onClick={() => setIsProjectFormOpen(false)}
                  className="px-5 py-2.5 bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-750 dark:text-white text-neutral-905 rounded transition-transform cursor-pointer"
                >
                  انصراف
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-[#F2C94C] hover:bg-yellow-500 text-black font-bold rounded transition-transform cursor-pointer shadow"
                >
                  {editingProject ? 'ثبت تغییرات مگاهولدینگ' : 'تایید و ذخیره‌سازی بنا'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
