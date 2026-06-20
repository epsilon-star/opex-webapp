import React, { useState, useEffect } from 'react';
import { 
  ArrowRight, 
  ChevronDown, 
  HelpCircle, 
  Hammer, 
  ShieldCheck, 
  ArrowRight as ArrowRightIcon,
  ArrowLeft,
  Building2,
  Home as HomeIcon,
  HardHat
} from 'lucide-react';
import { Service } from '../../types';
import { servicesData } from '../../data/services';
import { projectsData } from '../../data/projects';
import { toPersianNumber } from '../../utils/persian';

interface ServicesViewProps {
  selectedServiceId?: string | null;
  onNavigateToQuote: (serviceId: string) => void;
  onNavigateToProject: (projectId: string) => void;
}

export default function ServicesView({ selectedServiceId = null, onNavigateToQuote, onNavigateToProject }: ServicesViewProps) {
  const [activeService, setActiveService] = useState<Service | null>(null);
  const [openFaqIdx, setOpenFaqIdx] = useState<number | null>(null);

  useEffect(() => {
    if (selectedServiceId) {
      const match = servicesData.find(s => s.id === selectedServiceId);
      if (match) {
        setActiveService(match);
        setOpenFaqIdx(null);
        window.scrollTo(0, 0);
      }
    } else {
      setActiveService(null);
    }
  }, [selectedServiceId]);

  const toggleFaq = (idx: number) => {
    setOpenFaqIdx(openFaqIdx === idx ? null : idx);
  };

  const renderIcon = (iconName: string) => {
    switch (iconName) {
      case 'Building2':
        return <Building2 className="h-6 w-6 text-[#F2C94C]" />;
      case 'Home':
        return <HomeIcon className="h-6 w-6 text-[#F2C94C]" />;
      case 'HardHat':
        return <HardHat className="h-6 w-6 text-[#F2C94C]" />;
      default:
        return <Hammer className="h-6 w-6 text-[#F2C94C]" />;
    }
  };

  if (activeService) {
    const associatedProjects = projectsData.filter(p => p.category === activeService.id || p.category === activeService.slug);

    return (
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-12 space-y-16 animate-fadeIn text-right" id="service-detail-container">
        
        {/* Back Link Control */}
        <button
          onClick={() => setActiveService(null)}
          className="flex items-center gap-2 text-sm dark:text-neutral-400 text-neutral-500 hover:text-neutral-900 dark:hover:text-white transition-colors font-bold cursor-pointer"
        >
          <ArrowRight className="h-4 w-4 transform rotate-180" />
          <span>بازگشت به فهرست دپارتمان‌ها</span>
        </button>

        {/* 1. Header Hero Panel */}
        <div className="relative h-[45vh] w-full rounded-2xl overflow-hidden border dark:border-neutral-800 border-neutral-200 bg-black">
          <img
            src={activeService.image}
            alt={activeService.title}
            className="w-full h-full object-cover opacity-50"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>
          
          <div className="absolute bottom-6 right-6 md:bottom-10 md:right-10 max-w-2xl space-y-3">
            <span className="text-xs font-mono font-bold text-[#F2C94C] tracking-widest uppercase bg-black/80 px-2.5 py-1 rounded border border-yellow-500/25 inline-block">
              دپارتمان تخصصی ساختمانی اَپکس
            </span>
            <h1 className="text-2xl md:text-4xl lg:text-5xl font-black text-white uppercase tracking-tight">
              {activeService.title}
            </h1>
          </div>
        </div>

        {/* 2. Structured Description & Division Benefits */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pt-6">
          <div className="lg:col-span-7 space-y-6">
            <h2 className="text-xl md:text-2xl font-black uppercase tracking-tight dark:text-white text-neutral-900 border-b dark:border-neutral-800 border-neutral-200 pb-3">
              شرح خدمات تخصصی
            </h2>
            <p className="dark:text-neutral-300 text-neutral-700 text-sm md:text-base leading-relaxed">
              {activeService.fullDescription}
            </p>

            {/* Structured process steps */}
            <div className="pt-8 space-y-8">
              <h3 className="text-lg font-black dark:text-white text-neutral-900">
                مراحل طراحی و اجرای پروژه
              </h3>
              
              <div className="relative border-r dark:border-neutral-800 border-neutral-200 mr-4 pr-6 space-y-8 text-right">
                {activeService.process.map((step, idx) => (
                  <div key={idx} className="relative group">
                    {/* Circle Indicator */}
                    <div className="absolute -right-[35px] top-1 w-6 h-6 rounded-full dark:bg-neutral-900 bg-white border-2 dark:border-neutral-800 border-neutral-300 flex items-center justify-center group-hover:border-[#F2C94C] transition-colors">
                      <span className="text-[10px] font-bold text-stone-500 group-hover:text-neutral-950 dark:group-hover:text-white transition-colors">{toPersianNumber(idx + 1)}</span>
                    </div>
                    <div>
                      <h4 className="text-sm font-bold dark:text-white text-neutral-900 group-hover:text-[#F2C94C] transition-colors">
                        {step.title}
                      </h4>
                      <p className="text-xs md:text-sm dark:text-neutral-400 text-neutral-500 mt-1 leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

          <div className="lg:col-span-5 space-y-8">
            {/* Benefits Bento box */}
            <div className="p-6 md:p-8 rounded-xl dark:bg-neutral-900 bg-white border dark:border-neutral-800 border-neutral-200 space-y-6 text-right">
              <h3 className="text-base font-black dark:text-white text-neutral-900 flex items-center gap-2">
                <ShieldCheck className="h-5 w-5 text-[#F2C94C]" /> ضمانت دپارتمان اَپکس
              </h3>
              
              <ul className="space-y-4">
                {activeService.benefits.map((benefit, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#F2C94C] shrink-0" />
                    <span className="text-xs md:text-sm dark:text-neutral-300 text-neutral-700 leading-snug">{benefit}</span>
                  </li>
                ))}
              </ul>

              {/* Specific CTA route button */}
              <button
                onClick={() => onNavigateToQuote(activeService!.id)}
                className="w-full flex items-center justify-center gap-2 py-4 text-xs font-bold bg-[#F2C94C] hover:bg-yellow-500 text-black transition-all cursor-pointer rounded shadow"
              >
                <span>استعلام بها و برآورد هزینه {activeService.title}</span>
                <ArrowRightIcon className="h-4 w-4 transform rotate-180" />
              </button>
            </div>

            {/* Division Tags detail */}
            <div className="p-6 rounded-xl dark:bg-neutral-950 bg-stone-100 border dark:border-neutral-800 border-neutral-200 text-xs space-y-3">
              <span className="block dark:text-neutral-500 text-neutral-500 font-bold">بخش‌های تحت پوشش این دپارتمان</span>
              <div className="flex flex-wrap gap-1.5">
                {activeService.tags.map((tag, idx) => (
                  <span key={idx} className="dark:bg-neutral-900 bg-white border dark:border-neutral-800 border-neutral-200 dark:text-neutral-300 text-neutral-700 px-2.5 py-1 rounded font-bold">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* 3. Divisional Completed Tracks (Associated Projects) */}
        {associatedProjects.length > 0 && (
          <div className="pt-8 border-t dark:border-neutral-800 border-neutral-200 space-y-8">
            <div>
              <span className="text-xs font-bold text-[#F2C94C] uppercase tracking-widest">
                کارنامه اجرایی
              </span>
              <h3 className="text-xl md:text-2xl font-black dark:text-white text-neutral-900 mt-1">
                پروژه‌های تحویل‌شده این دپارتمان
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {associatedProjects.map((project) => (
                <div
                  key={project.id}
                  onClick={() => onNavigateToProject(project.id)}
                  className="group relative flex flex-col md:flex-row dark:bg-neutral-900 bg-white border dark:border-neutral-800 border-neutral-200 hover:border-[#F2C94C] rounded-xl overflow-hidden cursor-pointer text-right"
                >
                  <div className="relative w-full md:w-2/5 h-[160px] md:h-full overflow-hidden bg-zinc-950">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div className="w-full md:w-3/5 p-5 flex flex-col justify-between">
                    <div>
                      <span className="text-[10px] dark:text-neutral-400 text-neutral-500">{project.location} • سال {toPersianNumber(project.year)}</span>
                      <h4 className="text-sm md:text-base font-black dark:text-white text-neutral-900 uppercase tracking-tight mt-1 group-hover:text-[#F2C94C] transition-colors leading-tight">
                        {project.title}
                      </h4>
                      <p className="dark:text-neutral-400 text-neutral-500 text-xs mt-1.5 line-clamp-2 leading-relaxed">
                        {project.description}
                      </p>
                    </div>
                    <span className="text-[10px] font-bold text-[#F2C94C] mt-4">
                      زیربنا: {toPersianNumber(project.size)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 4. Service Accordion FAQs */}
        <div className="pt-12 border-t dark:border-neutral-800 border-neutral-200 max-w-4xl mx-auto space-y-6">
          <h3 className="text-xl md:text-2xl font-black dark:text-white text-neutral-900 tracking-tight text-center">
            سوالات متداول کارفرمایان
          </h3>
          
          <div className="space-y-4">
            {activeService.faq.map((item, idx) => {
              const isOpen = openFaqIdx === idx;
              return (
                <div 
                  key={idx}
                  className="border dark:border-neutral-800 border-neutral-200 rounded-lg dark:bg-neutral-900 bg-white overflow-hidden transition-all duration-300 text-right"
                >
                  <button
                    onClick={() => toggleFaq(idx)}
                    className="w-full flex items-center justify-between p-5 font-bold dark:text-white text-neutral-950 hover:text-[#F2C94C] transition-colors text-xs md:text-sm dark:bg-neutral-950 bg-stone-50 cursor-pointer"
                  >
                    <span className="flex items-center gap-2">
                      <HelpCircle className="h-4 w-4 text-stone-500 shrink-0" />
                      {item.question}
                    </span>
                    <ChevronDown className={`h-4 w-4 shrink-0 transition-transform ${isOpen ? 'rotate-180 text-[#F2C94C]' : 'text-stone-500'}`} />
                  </button>

                  <div 
                    className={`transition-all duration-300 ease-in-out ${
                      isOpen ? 'max-h-[500px] border-t dark:border-neutral-800 border-neutral-200 p-5' : 'max-h-0 overflow-hidden'
                    }`}
                  >
                    <p className="text-xs md:text-sm dark:text-neutral-300 text-neutral-700 leading-relaxed font-sans">
                      {item.answer}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-12 space-y-12 animate-fadeIn text-right" id="services-grid-container">
      <div className="text-center space-y-2 max-w-2xl mx-auto">
        <span className="text-xs font-mono font-bold text-[#F2C94C] uppercase tracking-widest bg-stone-100 dark:bg-neutral-900 border dark:border-neutral-800 border-neutral-300 px-3 py-1 rounded">
          دپارتمان‌های فنی مهندسی
        </span>
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-black uppercase tracking-tight dark:text-white text-neutral-900 pt-2">
          بخش‌های مهندسی اَپکس
        </h1>
        <p className="dark:text-neutral-400 text-neutral-500 text-sm md:text-base leading-relaxed">
          ما فرآیندهای گوناگون ساخت را در دپارتمان‌های متمایز و مجهز به جدیدترین ابزارها مدیریت می‌کنیم تا ایمنی، تراز مالی و استانداردهای جهانی را تضمین کنیم.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6">
        {servicesData.map((service) => (
          <div 
            key={service.id}
            className="group flex flex-col justify-between dark:bg-neutral-900 bg-white border dark:border-neutral-800 border-neutral-200 hover:border-[#F2C94C] rounded-xl overflow-hidden h-[400px] shadow-lg transition-all"
            id={`service-catalog-card-${service.id}`}
          >
            <div className="relative h-[180px] overflow-hidden bg-neutral-900 border-b dark:border-neutral-800 border-neutral-200">
              <img 
                src={service.image} 
                alt={service.title} 
                className="w-full h-full object-cover group-hover:scale-105 duration-500 transition-transform"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              
              <div className="absolute top-4 right-4 p-2.5 rounded-md bg-black/80 border border-neutral-800 shadow">
                {renderIcon(service.icon)}
              </div>
            </div>

            <div className="p-6 flex-1 flex flex-col justify-between">
              <div className="space-y-2">
                <h3 className="text-base md:text-lg font-black dark:text-white text-neutral-900 group-hover:text-[#F2C94C] transition-colors leading-tight">
                  {service.title}
                </h3>
                <p className="dark:text-neutral-400 text-neutral-500 text-xs mt-1.5 line-clamp-2 leading-relaxed">
                  {service.shortDescription}
                </p>
              </div>

              <div className="flex justify-between items-center pt-4 border-t dark:border-neutral-800 border-neutral-200 mt-4">
                <button
                  onClick={() => setActiveService(service)}
                  className="text-xs font-bold text-[#F2C94C] group-hover:text-amber-500 dark:group-hover:text-white transition-colors flex items-center gap-1 cursor-pointer"
                >
                  <span>بررسی مشخصات فنی و مراحل</span>
                  <ChevronDown className="h-4 w-4 transform -rotate-90" />
                </button>
                
                <button
                  onClick={() => onNavigateToQuote(service.id)}
                  className="text-[10px] font-bold tracking-wider dark:text-neutral-300 text-neutral-700 bg-stone-100 dark:bg-neutral-800 border dark:border-neutral-700 border-neutral-300 px-3 py-1.5 rounded cursor-pointer hover:bg-[#F2C94C] hover:text-black hover:border-transparent transition-colors"
                >
                  استعلام بها
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
