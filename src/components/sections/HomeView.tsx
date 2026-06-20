import React from 'react';
import { ArrowLeft, Drill, ShieldAlert, Award, FileSpreadsheet, PlayCircle, Star, Sparkles } from 'lucide-react';
import { servicesData } from '../../data/services';
import { projectsData } from '../../data/projects';
import { testimonialsData } from '../../data/testimonials';
import { statsData } from '../../data/stats';
import StatCounter from '../StatCounter';
import TestimonialCard from '../TestimonialCard';
import TrustBar from '../TrustBar';
import { toPersianNumber } from '../../utils/persian';

interface HomeViewProps {
  onNavigate: (page: string, params?: any) => void;
  onProjectClick: (projectId: string) => void;
}

export default function HomeView({ onNavigate, onProjectClick }: HomeViewProps) {
  const featuredProjects = projectsData.slice(0, 3);
  const quickTestimonials = testimonialsData.slice(0, 3);

  return (
    <div className="space-y-0 animate-fadeIn text-right" id="home-view-container">
      
      {/* 1. HERO SECTION (Photography-led with heavy industrial overlay) */}
      <section 
        className="relative w-full h-[85vh] flex items-center justify-start bg-black overflow-hidden border-b dark:border-[#2d2d2d] border-stone-200"
        id="hero-section"
      >
        {/* Background Visual Banner */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=2000&q=90" 
            alt="Construction Crane Structure" 
            className="w-full h-full object-cover opacity-45"
            referrerPolicy="no-referrer"
          />
          {/* Moody industrial gradients */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0b0b0b] via-[#0b0b0b]/60 to-[#0b0b0b]/30"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-[#0b0b0b] via-[#0b0b0b]/40 to-transparent"></div>
        </div>

        {/* Content Box */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8 w-full mt-12 pr-4 md:pr-8">
          <div className="max-w-3xl space-y-6">
            
            {/* Safety Indicator Badge */}
            <div className="inline-flex items-center gap-1.5 py-1.5 px-3 bg-[#111111]/90 backdrop-blur-md rounded-full border border-yellow-500/30 text-white text-[10px] md:text-xs font-bold uppercase tracking-widest shadow-lg">
              <span className="w-2 h-2 rounded-full bg-[#F2C94C] animate-ping shrink-0"></span>
              <span>رتبه ایمنی: {toPersianNumber('۰.۷۲')} در تمامی سایت‌های فعال</span>
            </div>

            <h1 className="text-3xl md:text-5xl lg:text-6xl font-black uppercase text-white leading-tight">
              مهندسی برتر سازه سنگین.<br/>
              <span className="text-[#F2C94C] relative inline-block pt-1">
                تضمین مطلق بودجه و تراز مالی.
              </span>
            </h1>

            <p className="text-gray-300 text-sm md:text-base lg:text-lg max-w-xl leading-relaxed">
              هلدینگ پارسی اَپکس با تکیه بر ناوگان ابزارآلات فوق سنگین ملکی، ساخت مجتمع‌های پایدار لجستیکی، برج‌های مسکونی لوکس و بسترپروری عمیق پروژه‌ها را طبق برنامه بحرانی زمان‌بندی مدیریت می‌کند.
            </p>

            {/* CTAs Button Row */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button
                onClick={() => onNavigate('quote')}
                className="flex items-center justify-center gap-2 px-8 py-4 text-xs md:text-sm font-bold bg-[#F2C94C] hover:bg-yellow-500 text-black transition-all cursor-pointer border border-transparent shadow-[0_4px_20px_rgba(242,201,76,0.15)] rounded"
                id="hero-cta-quote"
              >
                <span>استعلام آنلاین بها و قیمت کل</span>
                <ArrowLeft className="h-4 w-4" />
              </button>

              <button
                onClick={() => onNavigate('services')}
                className="flex items-center justify-center gap-2 px-8 py-4 text-xs md:text-sm font-bold bg-[#161616]/80 backdrop-blur-md hover:bg-stone-900 border border-neutral-700 hover:border-[#F2C94C] text-white transition-all cursor-pointer rounded"
                id="hero-cta-portfolio"
              >
                <span>بررسی بخش‌های فنی مهندسی</span>
              </button>
            </div>

          </div>
        </div>
      </section>

      {/* 2. STATS BAR (Verifiable metrics, scroll triggered counter) */}
      <section className="dark:bg-neutral-900 bg-white border-b dark:border-neutral-800 border-neutral-200" id="stats-section">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-4 divide-y lg:divide-y-0 lg:divide-x dark:divide-neutral-800 divide-neutral-200">
            {statsData.map((stat) => (
              <StatCounter 
                key={stat.id}
                value={stat.number}
                label={stat.label}
                suffix={stat.suffix}
              />
            ))}
          </div>
        </div>
      </section>

      {/* 3. SAFETY & ASSOCIATION LOGOS (Trust Signals Stripe) */}
      <section className="bg-stone-50 dark:bg-neutral-950" id="trustsignals-section">
        <TrustBar />
      </section>

      {/* 4. CORE SERVICES (Bento-style Grid) */}
      <section className="py-20 md:py-28 max-w-7xl mx-auto px-4 md:px-8" id="services-grid-section">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-16">
          <div className="space-y-2">
            <span className="text-xs font-bold text-[#F2C94C] uppercase tracking-widest bg-stone-100 dark:bg-neutral-900 px-3 py-1 rounded">
              فعالیت‌های مهندسی اَپکس
            </span>
            <h2 className="text-2xl md:text-4xl font-black dark:text-white text-neutral-900 leading-snug">
              دپارتمان‌های ساخت و ساز عمرانی
            </h2>
          </div>
          <p className="dark:text-neutral-400 text-neutral-500 text-xs md:text-sm max-w-md leading-relaxed">
            بهره‌گیری از چند بازوی فعال و مستقل جهت پایش تراز، گودبرداری زبر، مهار خاک، بتن صیقلی سازه و عایق‌های اتمسفری نوین ساختمان.
          </p>
        </div>

        {/* Bento Service Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {servicesData.map((service) => {
            return (
              <div 
                key={service.id}
                className="group relative dark:bg-neutral-900 bg-white border dark:border-neutral-805 border-neutral-200 hover:border-[#F2C94C] rounded-xl overflow-hidden shadow-lg transition-all flex flex-col justify-between h-[360px]"
                id={`home-service-card-${service.id}`}
              >
                {/* Visual Image overlay background */}
                <div className="absolute inset-0 z-0 opacity-20 group-hover:opacity-30 transition-opacity">
                  <img 
                    src={service.image} 
                    alt={service.title} 
                    className="w-full h-full object-cover grayscale group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t dark:from-neutral-900 from-white via-transparent to-transparent"></div>
                </div>

                <div className="relative z-10 p-8 space-y-4">
                  <span className="text-[10px] font-bold text-[#F2C94C] dark:bg-neutral-800 bg-amber-50 border dark:border-neutral-700 border-amber-250 px-2.5 py-1 rounded">
                    {service.tags[0]}
                  </span>
                  
                  <h3 className="text-lg md:text-xl font-black dark:text-white text-neutral-900 group-hover:text-[#F2C94C] transition-colors pt-2">
                    {service.title}
                  </h3>

                  <p className="dark:text-neutral-300 text-neutral-750 text-xs md:text-sm leading-relaxed max-w-md">
                    {service.shortDescription}
                  </p>
                </div>

                {/* Card controls */}
                <div className="relative z-10 p-8 pt-0 flex justify-between items-center mt-auto">
                  <button
                    onClick={() => onNavigate('service-detail', { id: service.id })}
                    className="text-xs font-bold dark:text-stone-300 text-neutral-700 group-hover:text-[#F2C94C] transition-colors flex items-center gap-1.5 cursor-pointer"
                  >
                    <span>بررسی ساختار فعالیت</span>
                    <ArrowLeft className="h-4 w-4 shrink-0 transition-transform group-hover:translate-x-[-4px]" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 5. FEATURED PROJECTS SPOTLIGHT (Photography heavy) */}
      <section className="py-20 md:py-28 dark:bg-neutral-950 bg-stone-50 border-y dark:border-neutral-800 border-neutral-200" id="featured-projects-section">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-16">
            <div className="space-y-2">
              <span className="text-xs font-bold text-[#F2C94C]">
                نمونه کارهای شاخص فعال
              </span>
              <h2 className="text-2xl md:text-4xl font-black dark:text-white text-neutral-905">
                مگاپروژه‌های اخیر اَپکس
              </h2>
            </div>
            <button
              onClick={() => onNavigate('gallery')}
              className="px-6 py-3 border dark:border-neutral-800 border-neutral-300 hover:border-[#F2C94C] text-xs font-bold dark:text-white text-neutral-800 transition-all dark:bg-neutral-900 bg-white rounded cursor-pointer"
            >
              مشاهده تمامی پروژه‌ها
            </button>
          </div>

          {/* Cards Stack */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredProjects.map((project) => (
              <div 
                key={project.id}
                onClick={() => onProjectClick(project.id)}
                className="group relative dark:bg-neutral-900 bg-white border dark:border-neutral-800 border-neutral-200 hover:border-[#F2C94C] rounded-xl overflow-hidden cursor-pointer shadow-lg transition-all"
                id={`home-project-card-${project.id}`}
              >
                <div className="relative h-[220px] overflow-hidden bg-neutral-950">
                  <img 
                    src={project.image} 
                    alt={project.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t dark:from-neutral-900 from-white/20 to-transparent"></div>
                  
                  <div className="absolute top-4 right-4 bg-black/90 text-[10px] text-[#F2C94C] font-semibold px-2.5 py-1 rounded border border-yellow-500/20">
                    {project.location}
                  </div>
                </div>

                <div className="p-6 space-y-2">
                  <span className="text-[10px] font-bold text-[#F2C94C] uppercase">
                    مساحت: {toPersianNumber(project.size)}
                  </span>
                  <h4 className="text-base font-black dark:text-white text-neutral-900 group-hover:text-[#F2C94C] transition-colors leading-snug mt-1">
                    {project.title}
                  </h4>
                  <p className="dark:text-neutral-400 text-neutral-500 text-xs mt-2 line-clamp-2 leading-relaxed">
                    {project.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. CLIENT TESTIMONIALS */}
      <section className="py-20 md:py-28 max-w-7xl mx-auto px-4 md:px-8" id="testimonials-section">
        <div className="text-center space-y-2 mb-16">
          <span className="text-xs font-bold text-[#F2C94C]">
            نظرات کافرمایان گرامی
          </span>
          <h2 className="text-2xl md:text-4xl font-black dark:text-white text-neutral-950">
            میزان رضایت‌مندی کارفرمایان
          </h2>
          <p className="dark:text-neutral-400 text-neutral-500 text-xs md:text-sm max-w-md mx-auto leading-relaxed pt-2">
            دیدگاه‌های شرکای سرمایه‌گذاری و مدیران عامل هلدینگ‌ها پیرامون صحت برآورد هزینه‌ها و تطابق زمان‌بندی.
          </p>
        </div>

        {/* Carousel Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {quickTestimonials.map((testimonial) => (
            <TestimonialCard 
              key={testimonial.id}
              testimonial={testimonial}
              onProjectClick={onProjectClick}
            />
          ))}
        </div>
      </section>

      {/* 7. SECONDARY ESTIMATOR TEASER / CTA */}
      <section className="py-16 md:py-24 dark:bg-neutral-950 bg-[#fffdf5] border-t dark:border-neutral-800 border-neutral-250 text-center" id="prefooter-cta-section">
        <div className="max-w-4xl mx-auto px-4 space-y-6">
          <span className="inline-flex items-center gap-1.5 py-1 px-3 text-[10px] font-bold text-[#F2C94C] dark:bg-neutral-900 bg-amber-100 border dark:border-neutral-800 border-amber-200 rounded">
            سامانه تخصصی استعلام محاسبات متره
          </span>
          
          <h2 className="text-2xl md:text-4xl font-black dark:text-white text-neutral-950 leading-snug">
            برای مهار گود یا ساخت سازه بزرگ خود آماده‌اید؟
          </h2>

          <p className="dark:text-neutral-305 text-neutral-600 text-sm md:text-base max-w-xl mx-auto leading-relaxed">
            مکانیزم هوشمند و دقیق مهندسی اپکس، فایل طرح یا توصیف شما را تحلیل نموده و ظرف ۲۴ ساعت برآورد تقریبی بودجه لازم را تقدیم تان خواهد کرد.
          </p>

          <div className="pt-4 flex flex-col sm:flex-row justify-center gap-4">
            <button
              onClick={() => onNavigate('quote')}
              className="px-8 py-4 bg-[#F2C94C] hover:bg-yellow-500 text-black text-xs md:text-sm font-bold rounded transition-all cursor-pointer shadow-lg inline-flex items-center justify-center gap-2"
            >
              <span>آغاز فرآیند استعلام گام‌به‌گام هزینه ساخت</span>
              <ArrowLeft className="h-4 w-4" />
            </button>

            <a
              href="tel:02188223344"
              className="px-8 py-4 border dark:border-neutral-800 border-neutral-300 hover:border-[#F2C94C] dark:text-white text-neutral-800 text-xs md:text-sm font-bold rounded transition-all flex items-center justify-center gap-2 cursor-pointer dark:bg-neutral-900 bg-white"
            >
              <span>گفتگو با مسئول ارشد تخمین بها</span>
            </a>
          </div>
        </div>
      </section>

    </div>
  );
}
