import React, { useState, useEffect } from 'react';
import { 
  X, 
  ChevronLeft, 
  ChevronRight, 
  ZoomIn, 
  MapPin, 
  Layers, 
  Maximize2,
  Minimize2,
  CheckCircle,
  Clock,
  Briefcase
} from 'lucide-react';
import { Project } from '../../types';
import { projectsData } from '../../data/projects';
import { toPersianNumber } from '../../utils/persian';

interface GalleryGridProps {
  initialCategory?: string;
  onSelectProject?: (id: string) => void;
  projectsList?: Project[]; // Allow custom dynamic projects from CMS!
}

export default function GalleryGrid({ initialCategory = 'all', onSelectProject, projectsList }: GalleryGridProps) {
  const [filter, setFilter] = useState(initialCategory);
  const [activeProjectIndex, setActiveProjectIndex] = useState<number | null>(null);
  const [activeProjectImageIndex, setActiveProjectImageIndex] = useState<number>(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  // Fallback to imported static projects if no custom list is provided
  const sourceProjects = projectsList || projectsData;

  // Sync category filter with prop
  useEffect(() => {
    setFilter(initialCategory);
  }, [initialCategory]);

  const categories = [
    { id: 'all', title: 'همه پروژه‌ها' },
    { id: 'commercial-construction', title: 'تجاری و اداری' },
    { id: 'residential-construction', title: 'مسکونی و ویلایی' },
    { id: 'industrial-development', title: 'صنعتی و انبار' },
    { id: 'site-preparation', title: 'خاکبرداری و پایدارسازی' }
  ];

  const filteredProjects = sourceProjects.filter(proj => {
    if (filter === 'all') return true;
    return proj.category === filter;
  });

  const openLightbox = (idx: number) => {
    setActiveProjectIndex(idx);
    setActiveProjectImageIndex(0); // reset to cover image
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
    setActiveProjectIndex(null);
  };

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (activeProjectIndex === null) return;
    
    const currentProject = filteredProjects[activeProjectIndex];
    const totalImages = 1 + (currentProject.gallery?.length || 0);
    
    if (activeProjectImageIndex > 0) {
      setActiveProjectImageIndex(activeProjectImageIndex - 1);
    } else {
      // Loop back to last image
      setActiveProjectImageIndex(totalImages - 1);
    }
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (activeProjectIndex === null) return;
    
    const currentProject = filteredProjects[activeProjectIndex];
    const totalImages = 1 + (currentProject.gallery?.length || 0);

    if (activeProjectImageIndex < totalImages - 1) {
      setActiveProjectImageIndex(activeProjectImageIndex + 1);
    } else {
      // Loop back to start
      setActiveProjectImageIndex(0);
    }
  };

  // Keyboard navigation for accessible premium feel
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!lightboxOpen) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') {
        if (activeProjectIndex === null) return;
        const currentProject = filteredProjects[activeProjectIndex];
        const totalImages = 1 + (currentProject.gallery?.length || 0);
        // Left is next in RTL context
        setActiveProjectImageIndex(prev => (prev < totalImages - 1 ? prev + 1 : 0));
      }
      if (e.key === 'ArrowRight') {
        if (activeProjectIndex === null) return;
        const currentProject = filteredProjects[activeProjectIndex];
        const totalImages = 1 + (currentProject.gallery?.length || 0);
        // Right is prev in RTL context
        setActiveProjectImageIndex(prev => (prev > 0 ? prev - 1 : totalImages - 1));
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxOpen, activeProjectIndex, filteredProjects]);

  return (
    <div className="space-y-8" id="projects-gallery-module">
      
      {/* Filters selectors Row */}
      <div className="flex flex-wrap items-center justify-center gap-2 border-b dark:border-neutral-800 border-neutral-200 pb-6">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setFilter(cat.id)}
            className={`px-5 py-3 text-xs font-bold transition-all border rounded cursor-pointer ${
              filter === cat.id
                ? 'bg-[#F2C94C] text-black border-transparent shadow'
                : 'dark:bg-neutral-900 bg-white dark:text-neutral-300 text-neutral-600 dark:border-neutral-800 border-neutral-200 hover:border-[#F2C94C] hover:text-neutral-950 dark:hover:text-white'
            }`}
          >
            {cat.title}
          </button>
        ))}
      </div>

      {/* Grid displays */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.map((project, idx) => (
          <div
            key={project.id}
            onClick={() => openLightbox(idx)}
            className="group relative dark:bg-neutral-900 bg-white border dark:border-neutral-800 border-neutral-200 hover:border-[#F2C94C] overflow-hidden rounded-xl transition-all h-[440px] flex flex-col justify-between cursor-pointer shadow-lg animate-fadeIn text-right"
            id={`gallery-item-${project.id}`}
          >
            {/* Visual Image container */}
            <div className="relative w-full h-[240px] overflow-hidden bg-neutral-100 dark:bg-neutral-900 border-b dark:border-neutral-800 border-neutral-200">
              <img
                src={project.image || 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=600&q=85'}
                alt={project.title}
                loading="lazy"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
              <div className="absolute top-4 left-4 bg-black/80 backdrop-blur-md text-xs font-semibold py-1.5 px-3 text-[#F2C94C] rounded border border-yellow-500/20">
                {project.status === 'Completed' ? (
                  <span className="flex items-center gap-1.5 direction-ltr">
                    <CheckCircle className="h-3.5 w-3.5 text-[#F2C94C]" />
                    <span>تکمیل شده</span>
                  </span>
                ) : (
                  <span className="flex items-center gap-1.5 direction-ltr">
                    <Clock className="h-3.5 w-3.5 text-sky-450 animate-pulse" />
                    <span>در حال اجرا</span>
                  </span>
                )}
              </div>
              
              {/* Overlay magnifier */}
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <div className="p-3 bg-[#F2C94C] text-black rounded-full shadow-xl">
                  <ZoomIn className="h-6 w-6 stroke-[2.5]" />
                </div>
              </div>
            </div>

            {/* Content text */}
            <div className="p-5 flex-1 flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#F2C94C]">
                  {toPersianNumber(project.size)}
                </span>
                <h4 className="text-base font-black dark:text-white text-neutral-900 uppercase tracking-tight mt-1 group-hover:text-[#F2C94C] transition-colors leading-snug">
                  {project.title}
                </h4>
                <p className="dark:text-neutral-400 text-neutral-500 text-xs mt-2 line-clamp-2 leading-relaxed">
                  {project.description}
                </p>
              </div>

              {/* Geographic marker stats */}
              <div className="flex items-center justify-between pt-4 border-t dark:border-neutral-800 border-neutral-200 mt-4 text-[11px] dark:text-neutral-400 text-neutral-500 font-mono">
                <span className="flex items-center gap-1">
                  <MapPin className="h-3.5 w-3.5 text-stone-500" />
                  {project.location}
                </span>
                <span className="flex items-center gap-1">
                  <span>سال {toPersianNumber(project.year)} • بازه {toPersianNumber(project.timeline)}</span>
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredProjects.length === 0 && (
        <div className="text-center py-16 border border-dashed dark:border-neutral-800 border-neutral-300 rounded-lg">
          <Layers className="mx-auto h-12 w-12 text-stone-400 mb-3" />
          <p className="dark:text-neutral-400 text-neutral-500 text-sm">هیچ نمونه کار فعالی در این بخش یافت نشد.</p>
        </div>
      )}

      {/* LIGHTBOX MODAL */}
      {lightboxOpen && activeProjectIndex !== null && (() => {
        const currentProject = filteredProjects[activeProjectIndex];
        const allImages = [currentProject.image, ...(currentProject.gallery || [])];
        const currentImageUrl = allImages[activeProjectImageIndex];

        return (
          <div 
            className="fixed inset-0 z-50 overflow-y-auto bg-black/95 backdrop-blur-lg flex items-center justify-center p-4 md:p-8 animate-fadeIn"
            id="gallery-lightbox"
            onClick={closeLightbox}
          >
            <div 
              className="relative w-full max-w-6xl dark:bg-neutral-950 bg-stone-50 border dark:border-neutral-800 border-neutral-300 rounded-2xl overflow-hidden shadow-2xl flex flex-col lg:flex-row h-auto max-h-[90vh] lg:h-[75vh] text-right"
              onClick={(e) => e.stopPropagation()} // halt bubbling
            >
              
              {/* Close Button top-left */}
              <button
                onClick={closeLightbox}
                className="absolute top-4 left-4 z-10 p-2.5 rounded-full bg-black/60 text-white hover:bg-neutral-800 transition-colors border border-neutral-700/50 cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>

              {/* LEFT COLUMN: Visual Carousel Frame (in RTL, it is visual frame) */}
              <div className="relative w-full lg:w-3/5 bg-black flex items-center justify-center border-b lg:border-b-0 lg:border-l dark:border-neutral-800 border-neutral-200 h-[40vh] lg:h-full">
                <img
                  src={currentImageUrl || 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=85'}
                  alt={`${currentProject.title} frame`}
                  className="w-full h-full object-contain"
                  referrerPolicy="no-referrer"
                />

                {/* Left Arrow (Previous) */}
                <button
                  onClick={handlePrev}
                  className="absolute left-4 p-3 rounded-full bg-black/60 text-white hover:bg-[#F2C94C] hover:text-black transition-colors border border-neutral-700/50 cursor-pointer"
                >
                  <ChevronLeft className="h-6 w-6 stroke-[2.5]" />
                </button>

                {/* Right Arrow (Next) */}
                <button
                  onClick={handleNext}
                  className="absolute right-4 p-3 rounded-full bg-black/60 text-white hover:bg-[#F2C94C] hover:text-black transition-colors border border-neutral-700/50 cursor-pointer"
                >
                  <ChevronRight className="h-6 w-6 stroke-[2.5]" />
                </button>

                {/* Carousel Image trackers */}
                <div className="absolute bottom-4 flex gap-1.5 bg-black/60 backdrop-blur-md py-1.5 px-3 rounded-full border border-neutral-800">
                  {allImages.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveProjectImageIndex(i)}
                      className={`w-2.5 h-2.5 rounded-full transition-colors ${i === activeProjectImageIndex ? 'bg-[#F2C94C]' : 'bg-gray-600'}`}
                    ></button>
                  ))}
                </div>
              </div>

              {/* RIGHT COLUMN: Rich Spec Project Details */}
              <div className="w-full lg:w-2/5 p-6 md:p-8 overflow-y-auto flex flex-col justify-between h-auto lg:h-full dark:bg-neutral-900 bg-white">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] tracking-widest text-[#F2C94C] font-bold uppercase bg-[#1e1a11] border border-yellow-500/20 px-2.5 py-0.5 rounded">
                      {toPersianNumber(currentProject.size)}
                    </span>
                    <span className="text-xs dark:text-neutral-400 text-neutral-500 font-mono">{currentProject.location}</span>
                  </div>

                  <h3 className="text-xl md:text-2.5xl font-black dark:text-white text-neutral-900 uppercase tracking-tight mt-3">
                    {currentProject.title}
                  </h3>

                  {/* General Overview */}
                  <p className="dark:text-neutral-300 text-neutral-700 text-xs md:text-sm mt-3 leading-relaxed">
                    {currentProject.description}
                  </p>

                  {/* Before/After Scope challenge logs */}
                  <div className="mt-6 space-y-4 pt-5 border-t dark:border-neutral-800 border-neutral-200">
                    <div className="space-y-1">
                      <span className="text-[10px] font-mono font-bold text-rose-400 uppercase tracking-wider flex items-center gap-1.5">
                        <Maximize2 className="h-3 w-3" /> چالش زمین و مهندسی پروژه
                      </span>
                      <p className="text-xs dark:text-stone-400 text-neutral-600 leading-relaxed dark:bg-[#201515] bg-[#fff5f5] p-3 rounded border dark:border-rose-950/20 border-rose-100">
                        {currentProject.challenge}
                      </p>
                    </div>

                    <div className="space-y-1">
                      <span className="text-[10px] font-mono font-bold text-emerald-405 uppercase tracking-wider flex items-center gap-1.5">
                        <Minimize2 className="h-3 w-3" /> راهکار مهندسی اَپکس
                      </span>
                      <p className="text-xs dark:text-stone-300 text-neutral-700 leading-relaxed dark:bg-[#141c16] bg-[#f5fff6] p-3 rounded border dark:border-emerald-950/20 border-emerald-100">
                        {currentProject.solution}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Foot Specs */}
                <div className="mt-8 pt-4 border-t dark:border-neutral-800 border-neutral-200 text-xs space-y-2">
                  {currentProject.client && (
                    <div className="flex justify-between">
                      <span className="text-neutral-500 flex items-center gap-1">
                        <Briefcase className="h-3.5 w-3.5 shrink-0" /> کارفرما / سرمایه‌گذار:
                      </span>
                      <span className="dark:text-white text-neutral-900 font-bold">{currentProject.client}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span className="text-neutral-500 font-medium">زمان انجام پروژه:</span>
                    <span className="text-[#F2C94C] font-bold uppercase">{toPersianNumber(currentProject.timeline)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-500 font-medium font-mono">سال اتمام عملیات:</span>
                    <span className="dark:text-neutral-300 text-neutral-700 font-bold">{toPersianNumber(currentProject.year)}</span>
                  </div>
                </div>

              </div>

            </div>
          </div>
        );
      })()}

    </div>
  );
}
