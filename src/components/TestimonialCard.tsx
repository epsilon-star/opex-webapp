import React from 'react';
import { Star, Quote } from 'lucide-react';
import { Testimonial } from '../types';

interface TestimonialCardProps {
  testimonial: Testimonial;
  onProjectClick?: (projectId: string) => void;
  key?: any;
}

export default function TestimonialCard({ testimonial, onProjectClick }: TestimonialCardProps) {
  return (
    <div 
      className="relative flex flex-col justify-between p-6 md:p-8 rounded-xl dark:bg-neutral-900 bg-white border dark:border-neutral-800 border-neutral-200 hover:border-[#F2C94C] transition-all shadow-lg"
      id={`testimonial-card-${testimonial.id}`}
    >
      {/* Decorative large quoting emblem */}
      <div className="absolute top-4 left-4 text-gray-500 opacity-15">
        <Quote className="h-10 w-10 stroke-[3] transform scale-x-[-1]" />
      </div>

      <div>
        {/* Rating stars */}
        <div className="flex gap-1 mb-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star 
              key={i} 
              className={`h-4 w-4 ${i < testimonial.rating ? 'text-[#F2C94C] fill-[#F2C94C]' : 'dark:text-neutral-700 text-neutral-300'}`} 
            />
          ))}
        </div>

        {/* content */}
        <p className="dark:text-neutral-300 text-neutral-700 text-sm md:text-base italic leading-relaxed mb-6 font-sans">
          "{testimonial.content}"
        </p>
      </div>

      {/* Author and contextual project block */}
      <div className="flex flex-col gap-4 pt-4 dark:border-neutral-800 border-neutral-200 mt-auto">
        <div className="flex items-center gap-3">
          {testimonial.avatar ? (
            <img 
              src={testimonial.avatar} 
              alt={testimonial.author} 
              className="h-12 w-12 rounded-full object-cover border dark:border-neutral-700 border-neutral-200"
              referrerPolicy="no-referrer"
            />
          ) : (
            <div className="h-12 w-12 rounded-full dark:bg-neutral-800 bg-stone-200 flex items-center justify-center font-bold dark:text-white text-neutral-900 uppercase text-sm">
              {testimonial.author.slice(0, 2)}
            </div>
          )}
          <div>
            <h5 className="font-bold dark:text-white text-neutral-900 text-sm md:text-base leading-none">{testimonial.author}</h5>
            <p className="text-xs dark:text-neutral-400 text-netral-500 mt-1">{testimonial.role}، <span className="dark:text-neutral-200 text-neutral-800 font-semibold">{testimonial.company}</span></p>
          </div>
        </div>

        {testimonial.projectTitle && testimonial.projectId && (
          <button
            onClick={() => onProjectClick?.(testimonial.projectId!)}
            className="self-start text-xs font-semibold text-[#F2C94C] hover:text-white transition-colors dark:bg-neutral-800 bg-stone-100 hover:bg-stone-200 dark:hover:bg-neutral-700 py-1.5 px-3 rounded-md flex items-center gap-1.5 border dark:border-neutral-700 border-neutral-200 cursor-pointer"
          >
            <span>پروژه ارجاعی: {testimonial.projectTitle}</span>
          </button>
        )}
      </div>
    </div>
  );
}
