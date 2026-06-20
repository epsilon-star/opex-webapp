import React from 'react';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Map
} from 'lucide-react';
import { toPersianNumber } from '../../utils/persian';

export default function ContactView() {
  const serviceAreas = [
    { name: 'تهران و حومه (البرز/بومهن)', status: 'آماده‌باش کامل', zip: 'دفتر مرکزی' },
    { name: 'منطقه ویژه اقتصادی عسلویه', status: 'پایگاه خدمات صنعتی', zip: 'هاب جنوب کشور' },
    { name: 'بندرعباس و جزایر جنوب', status: 'پایگاه لجستیک خلیج‌فارس', zip: 'هاب دریایی' },
    { name: 'حوزه شمال کشور (مازندران/گیلان)', status: 'پایگاه پایدارسازی بستر شیب‌دار', zip: 'هاب شمال' }
  ];

  const channels = [
    {
      title: 'بخش مهندسی ارزش و برآورد فنی',
      person: 'دکتر مایکل ونس، مدیریت برآورد بهای پروژه‌ها',
      phone: '۰۲۱-۸۸۲۲۳۳۴۴',
      ext: 'داخلی ۱۰۲',
      email: 'controls@apexgroup.com'
    },
    {
      title: 'مدیریت هماهنگی کارگاه‌ها و مأموریت‌ها',
      person: 'مهندس اولین استرلینگ، فرماندهی عملیات میدانی',
      phone: '۰۲۱-۸۸۲۲۳۳۴۴',
      ext: 'داخلی ۲۰۴',
      email: 'dispatch@apexgroup.com'
    },
    {
      title: 'همکاری و استخدام پیمانکاران فرعی زبده',
      person: 'هسته شناسایی استعدادهای مهارتی',
      phone: '۰۲۱-۸۸۲۲۳۳۴۴',
      ext: 'داخلی ۴۰۱',
      email: 'guilds@apexgroup.com'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-12 space-y-16 animate-fadeIn text-right" id="contact-view-container">
      
      {/* 2-Column top overview */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-12 xl:col-span-6 space-y-6">
          <span className="text-xs font-bold text-[#F2C94C] bg-stone-100 dark:bg-neutral-900 border dark:border-neutral-800 border-neutral-250 px-3 py-1 rounded inline-block">
            امروز پروژه خود را کلید بزنید
          </span>
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-black dark:text-white text-neutral-900 leading-snug">
            ارتباط مستقیم با مدیر ارشد پروژه‌های اَپکس
          </h1>
          <p className="dark:text-neutral-300 text-neutral-700 text-sm md:text-base leading-relaxed animate-fadeIn">
            تمامی برآوردها و محاسبه مقادیر توسط مهندسین ارشد متره انجام می‌شود تا تضمین‌کننده تراز مالی دقیق با خطای کمتر از ۳٪ برای همکاران و کارفرمایان گرامی باشد.
          </p>

          <div className="space-y-6 pt-4 border-t dark:border-neutral-800 border-neutral-200">
            {/* Contact Details List */}
            <div className="flex gap-4">
              <div className="p-3 dark:bg-neutral-900 bg-white border dark:border-neutral-805 border-neutral-200 text-[#F2C94C] rounded-md shrink-0 self-start">
                <MapPin className="h-5 w-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold dark:text-neutral-400 text-neutral-500">آدرس دفتر مرکزی و هلدینگ</h4>
                <p className="text-sm font-bold dark:text-white text-neutral-900 mt-1 leading-relaxed">
                  بلوار نلسون ماندلا (جردن)، انتهای خیابان گلفام<br/>
                  ساختمان دیپلمات اَپکس، طبقه ۵، واحد ۱۰
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="p-3 dark:bg-neutral-905 bg-white border dark:border-neutral-800 border-neutral-200 text-[#F2C94C] rounded-md shrink-0 self-start">
                <Clock className="h-5 w-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold dark:text-neutral-400 text-neutral-500">ساعات ارتباط مهندسی</h4>
                <p className="text-sm font-bold dark:text-white text-neutral-900 mt-1 leading-relaxed">
                  شنبه تا چهارشنبه: {toPersianNumber('۰۸:۰۰')} الی {toPersianNumber('۱۷:۰۰')} خورشیدی<br/>
                  خطوط مخابرات بی‌سیم رانندگان ناوگان و اعزام اضطراری به صورت ۲۴ ساعته فعال است.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Channels layout */}
        <div className="lg:col-span-12 xl:col-span-6 space-y-6">
          <div className="p-6 md:p-8 rounded-xl dark:bg-neutral-900 bg-white border dark:border-neutral-800 border-neutral-200 space-y-6 shadow-xl text-right">
            <h3 className="text-base font-black dark:text-white text-neutral-900 border-b dark:border-neutral-800 border-neutral-200 pb-2">
              راه‌های ارتباط مستقیم دپارتمان‌ها
            </h3>

            <div className="space-y-4 divide-y dark:divide-neutral-800 divide-neutral-200">
              {channels.map((chan, idx) => (
                <div key={idx} className={`pt-4 first:pt-0`}>
                  <h4 className="text-sm font-bold dark:text-white text-neutral-900">{chan.title}</h4>
                  <p className="text-xs dark:text-neutral-400 text-neutral-500 mt-0.5">{chan.person}</p>
                  
                  <div className="flex flex-col sm:flex-row justify-between text-xs dark:text-neutral-300 text-neutral-800 mt-2.5 gap-2">
                    <a href={`tel:${chan.phone}`} className="hover:text-[#F2C94C] transition-colors flex items-center gap-1.5 direction-ltr">
                      <Phone className="h-3.5 w-3.5" /> <span>{toPersianNumber(chan.phone)}</span> <span className="text-[10px] text-gray-500">({chan.ext})</span>
                    </a>
                    <a href={`mailto:${chan.email}`} className="hover:text-[#F2C94C] transition-colors flex items-center gap-1.5">
                      <Mail className="h-3.5 w-3.5" /> <span>{chan.email}</span>
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Stylized area SVG map and service details */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-8 border-t dark:border-neutral-800 border-neutral-200 items-center">
        {/* Territory cards */}
        <div className="lg:col-span-12 xl:col-span-5 space-y-6 order-2 lg:order-1">
          <div>
            <span className="text-[10px] font-bold text-[#F2C94C]">شعاع خدمت‌رسانی عمرانی</span>
            <h3 className="text-xl md:text-2xl font-black dark:text-white text-neutral-950 mt-1 font-display">پایگاه‌های اجرایی فعال کشور</h3>
            <p className="dark:text-neutral-400 text-neutral-500 text-xs mt-1 leading-relaxed">
              ما ماشین‌آلات سنگین خود را به هر نقطه‌ای اعزام می‌کنیم. مدیران پروژه اَپکس بر تمامی گستره‌های فعال احاطه عملیاتی دارند.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {serviceAreas.map((area, idx) => (
              <div key={idx} className="dark:bg-neutral-900 bg-white border dark:border-neutral-800 border-neutral-200 p-4 rounded-lg flex flex-col justify-between text-right">
                <div>
                  <span className="text-[10px] text-[#F2C94C] font-bold">{area.zip}</span>
                  <h5 className="font-bold dark:text-white text-neutral-900 text-sm mt-1">{area.name}</h5>
                </div>
                <span className="text-[10px] text-emerald-500 font-bold flex items-center gap-1.5 mt-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> {area.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Geometric inline map */}
        <div className="lg:col-span-12 xl:col-span-7 dark:bg-neutral-950 bg-stone-100 border dark:border-neutral-800 border-neutral-200 rounded-2xl p-6 md:p-8 flex items-center justify-center order-1 lg:order-2 h-[340px]">
          <div className="w-full h-full relative flex items-center justify-center overflow-hidden">
            
            {/* Inline stylized vector representing active grid coordinates */}
            <svg viewBox="0 0 500 300" className="w-full h-full opacity-60 text-gray-500 stroke-[1.5]">
              <defs>
                <pattern id="dotGrid" width="30" height="30" patternUnits="userSpaceOnUse">
                  <circle cx="2" cy="2" r="1" fill="#444" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#dotGrid)" />

              {/* Service ranges circles */}
              <circle cx="250" cy="120" r="45" className="fill-yellow-500/5 stroke-yellow-500/20" />
              <circle cx="150" cy="220" r="35" className="fill-emerald-500/5 stroke-emerald-500/20" />
              <circle cx="350" cy="210" r="55" className="fill-sky-500/5 stroke-sky-500/20" />

              {/* Connection corridors */}
              <line x1="250" y1="120" x2="150" y2="220" className="stroke-stone-300 dark:stroke-[#2d2d2d] stroke-dasharray-[3]" />
              <line x1="250" y1="120" x2="350" y2="210" className="stroke-stone-300 dark:stroke-[#2d2d2d] stroke-dasharray-[3]" />

              {/* Range pins indicators */}
              <g transform="translate(250,120)">
                <circle r="4" fill="#F2C94C" />
                <text y="-8" fontSize="10" fill="#db7c14" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">هاب مرکزی تهران</text>
              </g>

              <g transform="translate(150,220)">
                <circle r="4" fill="#10B981" />
                <text y="-8" fontSize="10" fill="#10B981" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">پروژه گودبرداری شمال</text>
              </g>

              <g transform="translate(350,210)">
                <circle r="4" fill="#0EA5E9" />
                <text y="-8" fontSize="10" fill="#0EA5E9" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">پایگاه صنعتی جنوب</text>
              </g>
            </svg>

            {/* Float visual HUD details */}
            <div className="absolute top-4 right-4 dark:bg-black/90 bg-white/95 border dark:border-neutral-800 border-neutral-300 p-3.5 text-[10px] text-right font-bold dark:text-neutral-400 text-neutral-600 space-y-1 rounded shadow-lg">
              <span className="block text-[#F2C94C]">مختصات پایش ترافیکی مأموریت‌ها:</span>
              <span>- مرکز تهران: پایگاه آماده‌با‌ش گلفام</span>
              <span>- عسلویه: بتن‌ریزی فونداسیون سنگین</span>
              <span>- بندرعباس: انتقال تجهیزات راه‌سازی</span>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
