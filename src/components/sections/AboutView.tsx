import React from 'react';
import { 
  Building, 
  Users, 
  ShieldCheck, 
  Award, 
  Wrench, 
  Maximize2
} from 'lucide-react';
import CertificationBadge from '../CertificationBadge';
import { toPersianNumber } from '../../utils/persian';

export default function AboutView() {
  const timelineEvents = [
    {
      year: '۱۳۸۰',
      title: 'تاسیس هلدینگ اَپکس',
      desc: 'بنیان‌گذاری توسط استاد ارشد کارگاه آرتور پندلتون. آغاز فعالیت با اجرای بتن‌ریزی‌های عمیق تراز بالا و گودبرداری‌های خاص.'
    },
    {
      year: '۱۳۸۷',
      title: 'خرید ماشین‌آلات سنگین اختصاصی',
      desc: 'تهیه ناوگان بزرگ لودر، بیل مکانیکی و جرثقیل ملکی جهت از بین بردن وابستگی به نرخ و برنامه‌های زمانی پیمانکاران فرعی.'
    },
    {
      year: '۱۳۹۵',
      title: 'توسعه دپارتمان پیمانکاری تجاری',
      desc: 'راه‌اندازی ناوگان مجهز سازه‌های تمام‌فلز، ساخت برج‌های بلندمرتبه و شیشه‌های کرتن‌وال عایق مقاوم.'
    },
    {
      year: '۱۴۰۲',
      title: 'دستیابی به استانداردهای پایایی اتمسفر',
      desc: 'احداث پارک فناوری با بالاترین تاییدیه‌های بهینه‌سازی انرژی سبز. یکپارچه‌سازی پمپ‌های حرارت زمین‌گرمایی با موفقیت کامل.'
    }
  ];

  const leadership = [
    {
      name: 'مهندس آرتور پندلتون',
      role: 'بنیان‌گذار و سوپراینتندنت ارشد اجرایی',
      bio: 'بیش از ۴۰ سال سابقه مدیریت پروژه‌های عمرانی کلان. ناظر ارشد و امضاکننده بیش از ۲۵۰ کارنامه بی نقص ساخت برج و مجتمع‌های لجستیک.',
      avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=300&q=80'
    },
    {
      name: 'دکتر مایکل ونس',
      role: 'معاون برآورد بها و مهندسی ارزش',
      bio: 'کارشناس ارشد برآورد هزینه‌ها از دانشگاه تگزاس آستین. متخصص در مدل‌سازی‌های مگاپروژه‌ای و بهینه‌سازی مخارج اولیه ساخت.',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=300&q=80'
    },
    {
      name: 'مهندس اولین استرلینگ',
      role: 'مدیر نظارت فنی، ایمنی و بهداشت محیط',
      bio: 'ناظر و کارشناس ارشد ایمنی سایت‌های معدنی و تجاری. تاییدکننده نهایی تمامی روندهای ترافیکی ابزارها و تراز ایمنی بی نقص.',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80'
    }
  ];

  const certifications = [
    { id: 'safety', name: 'مهندسین ایمنی پایه ارشد HSE', issuer: 'سازمان نظام مهندسی و نظارت کاربری', year: '۱۳۸۱' },
    { id: 'leed', name: 'شرکت سازنده تایید صلاحیت سبز', issuer: 'انجمن مدیریت مصرف انرژی و متریال پایدار', year: '۱۳۹۳' },
    { id: 'agc', name: 'عضو طلایی انجمن پیمانکاران عمومی', issuer: 'وزارت راه و شهرسازی رتبه‌بندی کیفی', year: '۱۳۸۴' }
  ];

  const heavyMachinery = [
    { name: 'بیل زنجیری سنگین کاترپیلار ۳۳۶', type: 'عملیات خاکی زبر', spec: 'تجهیز دنده اتوماتیک لیزری لایكا ژئوسیستمز' },
    { name: 'گریدر جاده‌ای جان‌دیر جی۱۵۰', type: 'تسطیح تراز بستر', spec: 'سیستم موقعیت‌یابی سه بعدی دقیق جی‌پی‌اس و رادیویی' },
    { name: 'غلتک ویبره کوبش سنگین دایناپاک', type: 'کوبش متراکم لایه‌ها', spec: 'تضمین دانسیته تراکم پروکتور خاک تا تراز ۹۸٪' },
    { name: 'دکل حفاری عمیق صخره ساندویک', type: 'کاشت انکربولت صخره', spec: 'مخصوص حفاری بستر صخره‌های شیب‌دار کوهستانی' }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-12 space-y-20 animate-fadeIn text-right" id="about-section-container">
      
      {/* Overview Intro banner */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-12 xl:col-span-7 space-y-6">
          <span className="text-xs font-bold text-[#F2C94C] bg-stone-100 dark:bg-neutral-900 border dark:border-neutral-850 border-neutral-300 px-3 py-1 rounded inline-block">
            تاسیس از سال ۱۳۸۰ خورشیدی
          </span>
          <h1 className="text-2xl md:text-4xl lg:text-5xl font-black text-neutral-900 dark:text-white leading-tight">
            مبداء مهندسی سازه‌های مقاوم و برتری ناوگان عمرانی
          </h1>
          <p className="dark:text-neutral-300 text-neutral-700 text-sm md:text-base leading-relaxed">
            گروه ساختمانی اپکس نقشه فکری و محاسباتی مراجع بزرگ کارفرمایی را به واقعیت بتنی و استحکام برتر سازه پیوند می‌زند. ما با تکیه بر ناوگان ابزار سنگین غول‌آسای ملکی خود و استقرار فنی تیم‌های بتن‌ریزی صیقلی، جوشکاران سازه‌های فضایی و حفاران چاه، درصد خطا و وابستگی به بازار پیمانکاری متفرقه را به صفر رسانده‌ایم.
          </p>
          <p className="dark:text-neutral-400 text-neutral-500 text-xs md:text-sm leading-relaxed">
            تک تک پروژه‌های تحت نظر اپکس با گارانتی‌های محضری اتمام کار، بیمه‌نامه‌های سقف کامل عمرانی و آمیزه‌ای از فناوری‌های مهندسی برتر بنا می‌شوند. تکیه‌گاه ما کیفیت همیشگی متریال‌ها، پایش مداوم ایمنی کارگران و پایداری تعهد در قبال سرمایه‌گذاران است.
          </p>
        </div>

        <div className="lg:col-span-12 xl:col-span-5 relative h-[360px] rounded-xl overflow-hidden border dark:border-neutral-800 border-neutral-350 hidden xl:block">
          <img
            src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=85"
            alt="Welders putting steel framework together"
            className="w-full h-full object-cover grayscale opacity-55"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t dark:from-[#0b0b0b] from-[#f4f3ef] via-transparent to-transparent"></div>
        </div>
      </div>

      {/* Corporate Certifications trust row */}
      <div className="pt-8 border-t dark:border-neutral-800 border-neutral-200 space-y-6">
        <h3 className="text-xs font-bold text-center dark:text-neutral-400 text-neutral-500">
          مجوزهای رسمی کارآمدی و استانداردهای اخذ شده
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {certifications.map((cert) => (
            <CertificationBadge 
              key={cert.id}
              id={cert.id}
              name={cert.name}
              issuer={cert.issuer}
              year={cert.year}
            />
          ))}
        </div>
      </div>

      {/* Safety Score Section card */}
      <div className="p-8 md:p-12 rounded-xl bg-gradient-to-r dark:from-neutral-900 dark:to-neutral-950 from-stone-100 to-stone-50 border dark:border-neutral-800 border-neutral-200 grid grid-cols-1 md:grid-cols-12 gap-8 items-center text-right">
        <div className="md:col-span-3 text-center md:text-right space-y-1">
          <div className="text-5xl md:text-6xl font-black text-[#F2C94C] font-mono">{toPersianNumber('0.72')}</div>
          <p className="text-[10px] dark:text-neutral-400 text-neutral-500 font-bold tracking-wider">شاخص بین‌المللی سلامت کارگاه (Safety EMR)</p>
        </div>
        <div className="md:col-span-9 space-y-3">
          <h3 className="text-lg md:text-xl font-black dark:text-white text-neutral-950">
            تعهد به کارگاه ایمن و بدون حادثه
          </h3>
          <p className="dark:text-neutral-300 text-neutral-700 text-xs md:text-sm leading-relaxed">
            کسب رتبه ایمنی ممتاز به صورت متوالی نتیجه فرهنگ‌سازی جامع بر موازین HSE است. در تیم تحت تکفل مهندس استرلینگ، روزانه چک‌لیست‌های پیشرفته ایمنی حفاری، معاینات دقیق مهار جک سقف‌ها و بررسی گواهی تایید صلاحیت مهارتی رانندگان جرثقیل ثبت و بایگانی می‌شود.
          </p>
        </div>
      </div>

      {/* Historical timeline */}
      <div className="space-y-10">
        <div className="text-center space-y-1">
          <span className="text-xs font-bold dark:text-neutral-400 text-neutral-500">مرور نقاط عطف ساخت</span>
          <h2 className="text-2xl md:text-3xl font-black dark:text-white text-neutral-900">سیر توسعه و رشد اَپکس</h2>
        </div>

        <div className="relative border-r dark:border-neutral-800 border-neutral-200 max-w-3xl mx-auto pr-6 md:pr-10 space-y-10 my-4 text-right">
          {timelineEvents.map((evt, idx) => (
            <div key={idx} className="relative">
              {/* Year Label */}
              <div className="absolute -right-[38px] md:-right-[46px] top-1 bg-[#F2C94C] text-black font-semibold text-xs px-2.5 py-1 rounded shadow">
                {evt.year}
              </div>
              <div className="pt-7 md:pt-1 pr-6">
                <h4 className="text-base font-black dark:text-white text-neutral-900 tracking-tight">{evt.title}</h4>
                <p className="text-xs md:text-sm dark:text-neutral-400 text-neutral-600 mt-1.5 leading-relaxed">{evt.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Executive Team Bios */}
      <div className="space-y-10">
        <div className="text-center space-y-1">
          <span className="text-xs font-bold dark:text-neutral-400 text-neutral-500">مدیریت عالی ارشد</span>
          <h2 className="text-2xl md:text-3xl font-black dark:text-white text-neutral-900">ناظرین و مدیران مهندسی</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {leadership.map((member, idx) => (
            <div 
              key={idx}
              className="dark:bg-neutral-900 bg-white border dark:border-neutral-800 border-neutral-200 hover:border-[#F2C94C] transition-colors p-6 rounded-xl flex flex-col justify-between"
              id={`team-leader-${idx}`}
            >
              <div className="space-y-4">
                <div className="h-64 rounded-lg overflow-hidden dark:bg-neutral-950 bg-stone-100 border dark:border-neutral-800 border-neutral-200">
                  <img
                    src={member.avatar}
                    alt={member.name}
                    className="w-full h-full object-cover grayscale opacity-80"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div>
                  <h4 className="font-bold dark:text-white text-neutral-900 text-base leading-tight">{member.name}</h4>
                  <p className="text-[#F2C94C] text-[10px] uppercase font-bold tracking-wider mt-1">{member.role}</p>
                  <p className="dark:text-neutral-400 text-neutral-550 text-xs mt-3 leading-relaxed">
                    {member.bio}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Machinery Pool highlights */}
      <div className="p-8 rounded-xl dark:bg-neutral-900 bg-white border dark:border-neutral-800 border-neutral-200 space-y-6">
        <div>
          <span className="text-xs font-bold text-[#F2C94C]">مجهز به ماشین‌آلات ملکی</span>
          <h3 className="text-xl md:text-2xl font-black dark:text-white text-neutral-900 mt-1">گزیده‌ای از ناوگان سنگین اَپکس</h3>
          <p className="dark:text-neutral-400 text-neutral-500 text-xs mt-1">تامین ۱۰۰٪ ماشین‌آلات از دارایی‌های ثبت‌شده شرکت بدون هدر رفت زمان اجاره.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {heavyMachinery.map((mach, idx) => (
            <div key={idx} className="dark:bg-neutral-950 bg-stone-100 border dark:border-neutral-800 border-neutral-200 p-4 rounded-lg shadow-inner">
              <div className="p-1 rounded bg-[#2e2313] border border-yellow-500/10 inline-block text-[10px] text-[#F2C94C] font-semibold mb-2">
                {mach.type}
              </div>
              <h5 className="font-bold dark:text-white text-neutral-900 text-sm leading-snug">{mach.name}</h5>
              <p className="dark:text-neutral-400 text-neutral-500 text-xs mt-1 leading-relaxed">{mach.spec}</p>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
