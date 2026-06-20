import React from 'react';
import { Shield, ShieldCheck, FileCheck, Landmark } from 'lucide-react';
import { toPersianNumber } from '../utils/persian';

export default function TrustBar() {
  const trustSignals = [
    {
      icon: <Shield className="h-5 w-5 text-[#F2C94C]" />,
      title: 'پیمانکاری عمومی دارای پروانه ارشد رتبه ۱',
      desc: `پروانه نظام مهندسی فعال به شماره ${toPersianNumber('GC-8452-901A')}`,
    },
    {
      icon: <ShieldCheck className="h-5 w-5 text-[#F2C94C]" />,
      title: 'ضمانت‌نامه تعهد حسن کار و بیمه تمام‌مسئولیت',
      desc: 'بیمه مسئولیت مهندسی و حوادث کارگاهی تا سقف حداکثری قانونی',
    },
    {
      icon: <FileCheck className="h-5 w-5 text-[#F2C94C]" />,
      title: 'رتبه ممتاز رضایت کارفرمایان صنعت',
      desc: `دارای رضایت‌نامه رسمی ممتاز از بیش از ${toPersianNumber(180)} کارفرمای دولتی و خصوصی`,
    },
    {
      icon: <Landmark className="h-5 w-5 text-[#F2C94C]" />,
      title: 'عضو فعال سندیکای شرکت‌های ساختمانی کشور',
      desc: 'پایبند به الزامات فنی مباحث ۲۲ گانه مقررات ملی ساختمان ایران',
    }
  ];

  return (
    <div className="w-full dark:bg-neutral-950 bg-stone-100 border-y dark:border-neutral-800 border-neutral-200 py-6" id="trust-bar">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {trustSignals.map((signal, index) => (
            <div 
              key={index}
              className="flex items-start gap-3.5 p-3 rounded-lg border border-transparent hover:border-neutral-200 dark:hover:border-neutral-800 transition-all text-right"
            >
              <div className="p-2.5 rounded-md dark:bg-neutral-900 bg-white border dark:border-neutral-800 border-neutral-200 flex-shrink-0">
                {signal.icon}
              </div>
              <div className="flex flex-col">
                <h4 className="text-sm font-bold dark:text-white text-neutral-900 tracking-wide">{signal.title}</h4>
                <p className="text-xs dark:text-neutral-400 text-neutral-500 mt-0.5 font-medium">{signal.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
