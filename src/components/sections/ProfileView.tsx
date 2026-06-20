import React, { useState, useEffect } from 'react';
import { 
  User, 
  MapPin, 
  Check, 
  ShieldAlert, 
  HardHat, 
  Settings, 
  Award, 
  Building,
  KeyRound,
  FileBadge,
  Moon,
  Sun
} from 'lucide-react';
import { toPersianNumber } from '../../utils/persian';

interface ProfileViewProps {
  theme: 'dark' | 'light';
  onThemeToggle: () => void;
}

export default function ProfileView({ theme, onThemeToggle }: ProfileViewProps) {
  const [profile, setProfile] = useState({
    name: 'مهندس محمدرضا علیزاده',
    title: 'سرپرست ارشد کارگاه و دفتر فنی پیمانکاری',
    company: 'شرکت مهندسی و مدیریت ساخت پارسی اَپکس',
    email: 'm.alizadeh@apexconstruct.fa',
    phone: '۰۹۱۲۳۴۵۶۷۸۹',
    license: 'پ-۸۴۵۲-۹۰۱',
    grade: 'پایه یک طراحی و نظارت نظام مهندسی کشور',
    emergencyContact: '۰۲۱-۸۸۲۲۳۳۴۴'
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editedProfile, setEditedProfile] = useState({ ...profile });
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem('apex_user_profile');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setProfile(parsed);
        setEditedProfile(parsed);
      } catch (e) {
        console.error("Failed to parse user profile from local storage", e);
      }
    }
  }, []);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setProfile(editedProfile);
    localStorage.setItem('apex_user_profile', JSON.stringify(editedProfile));
    setIsEditing(false);
    setMessage('تغییرات هویتی و پروانه اشتغال با موفقیت در مرورگر ذخیره شد');
    setTimeout(() => setMessage(null), 3000);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 md:px-8 py-12 text-right animate-fadeIn" id="profile-container">
      
      {/* Visual background card */}
      <div className="dark:bg-neutral-900 bg-white border dark:border-neutral-800 border-neutral-200 rounded-2xl overflow-hidden shadow-2xl">
        
        {/* Banner with heavy industrial gradient */}
        <div className="h-36 bg-gradient-to-r from-amber-500 via-[#F2C94C] to-stone-900 relative">
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="absolute bottom-4 right-6 flex items-center gap-4">
            <div className="w-20 h-20 rounded-full border-4 dark:border-neutral-900 border-white bg-amber-50 dark:bg-neutral-800 flex items-center justify-center text-stone-700 dark:text-[#F2C94C] shadow-lg">
              <HardHat className="h-10 w-10 stroke-[2]" />
            </div>
          </div>
        </div>

        <div className="p-6 md:p-8 pt-10">
          
          {/* Header Row */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b dark:border-neutral-800 border-neutral-200 pb-5 mb-6 gap-3">
            <div>
              <h1 className="text-xl md:text-2xl font-black dark:text-white text-neutral-950">{profile.name}</h1>
              <p className="dark:text-neutral-400 text-neutral-500 text-xs mt-1">{profile.title}</p>
            </div>

            <button
              onClick={() => {
                if (isEditing) {
                  setEditedProfile({ ...profile });
                }
                setIsEditing(!isEditing);
              }}
              className="px-4 py-2 border dark:border-neutral-750 border-neutral-300 dark:text-white text-neutral-750 text-xs font-bold rounded hover:border-[#F2C94C] transition-all cursor-pointer"
            >
              {isEditing ? 'انصراف' : 'ویرایش پروفایل'}
            </button>
          </div>

          {message && (
            <div className="bg-emerald-500/10 border border-emerald-500 text-emerald-500 p-4 rounded-lg mb-6 text-xs font-bold flex items-center gap-2">
              <Check className="h-4 w-4" />
              <span>{message}</span>
            </div>
          )}

          {/* EDITING FORM */}
          {isEditing ? (
            <form onSubmit={handleSave} className="space-y-6 text-xs md:text-sm">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                
                <div className="space-y-1.5">
                  <label className="block dark:text-stone-300 text-neutral-700 font-bold">نام و نام خانوادگی مسئول</label>
                  <input
                    type="text"
                    value={editedProfile.name}
                    onChange={(e) => setEditedProfile({ ...editedProfile, name: e.target.value })}
                    className="w-full dark:bg-neutral-950 bg-stone-50 border dark:border-neutral-800 border-neutral-250 p-2.5 rounded focus:outline-none focus:border-[#F2C94C] dark:text-white text-stone-900"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block dark:text-stone-300 text-neutral-700 font-bold">عنوان مهندسی سمت دفتر</label>
                  <input
                    type="text"
                    value={editedProfile.title}
                    onChange={(e) => setEditedProfile({ ...editedProfile, title: e.target.value })}
                    className="w-full dark:bg-neutral-950 bg-stone-50 border dark:border-neutral-800 border-neutral-250 p-2.5 rounded focus:outline-none focus:border-[#F2C94C] dark:text-white text-stone-900"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block dark:text-stone-300 text-neutral-700 font-bold">هلدینگ / شرکت وابسته</label>
                  <input
                    type="text"
                    value={editedProfile.company}
                    onChange={(e) => setEditedProfile({ ...editedProfile, company: e.target.value })}
                    className="w-full dark:bg-neutral-950 bg-stone-50 border dark:border-neutral-800 border-neutral-250 p-2.5 rounded focus:outline-none focus:border-[#F2C94C] dark:text-white text-stone-900"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block dark:text-stone-300 text-neutral-700 font-bold">پست الکترونیکی پرسنلی</label>
                  <input
                    type="email"
                    value={editedProfile.email}
                    onChange={(e) => setEditedProfile({ ...editedProfile, email: e.target.value })}
                    className="w-full dark:bg-neutral-950 bg-stone-50 border dark:border-neutral-800 border-neutral-250 p-2.5 rounded focus:outline-none focus:border-[#F2C94C] dark:text-white text-stone-900"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block dark:text-stone-300 text-neutral-700 font-bold">تلفن همراه مستقیم کارفرما</label>
                  <input
                    type="text"
                    value={editedProfile.phone}
                    onChange={(e) => setEditedProfile({ ...editedProfile, phone: e.target.value })}
                    className="w-full dark:bg-neutral-950 bg-stone-50 border dark:border-neutral-800 border-neutral-250 p-2.5 rounded focus:outline-none focus:border-[#F2C94C] dark:text-white text-stone-900"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block dark:text-stone-300 text-neutral-700 font-bold">شماره پروانه اشتغال به کار نظام مهندسی</label>
                  <input
                    type="text"
                    value={editedProfile.license}
                    onChange={(e) => setEditedProfile({ ...editedProfile, license: e.target.value })}
                    className="w-full dark:bg-neutral-950 bg-stone-50 border dark:border-neutral-800 border-neutral-250 p-2.5 rounded focus:outline-none focus:border-[#F2C94C] dark:text-white text-stone-900"
                  />
                </div>

              </div>

              <div className="flex justify-end gap-3 pt-4 border-t dark:border-neutral-800 border-neutral-200">
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="px-4 py-2 bg-neutral-100 dark:bg-neutral-800 dark:text-white text-neutral-800 rounded cursor-pointer"
                >
                  لغو
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#F2C94C] hover:bg-yellow-500 text-black font-bold rounded cursor-pointer"
                >
                  ذخیره پروانه اشتغال هویتی
                </button>
              </div>
            </form>
          ) : (
            /* VIEW CARD DETAILS */
            <div className="space-y-8">
              
              {/* Detailed parameters grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs md:text-sm">
                
                <div className="p-4 rounded-xl dark:bg-neutral-950 bg-stone-50 border dark:border-neutral-805 border-neutral-200 flex items-start gap-3">
                  <Building className="h-5 w-5 text-[#F2C94C] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold block dark:text-neutral-400 text-neutral-550">شرکت و سازمان تابعه:</span>
                    <span className="dark:text-white text-neutral-900 font-bold block mt-1">{profile.company}</span>
                  </div>
                </div>

                <div className="p-4 rounded-xl dark:bg-neutral-950 bg-stone-50 border dark:border-neutral-805 border-neutral-200 flex items-start gap-3">
                  <FileBadge className="h-5 w-5 text-[#F2C94C] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold block dark:text-neutral-400 text-neutral-550">سطح صلاحیت نظام مهندسی:</span>
                    <span className="dark:text-white text-neutral-900 font-bold block mt-1">{profile.grade}</span>
                  </div>
                </div>

                <div className="p-4 rounded-xl dark:bg-neutral-950 bg-stone-50 border dark:border-neutral-805 border-neutral-200 flex items-start gap-3">
                  <KeyRound className="h-5 w-5 text-[#F2C94C] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold block dark:text-neutral-400 text-neutral-550">شماره مجوزی صنفی پروانه:</span>
                    <span className="dark:text-white text-neutral-900 font-mono font-bold block mt-1">{toPersianNumber(profile.license)}</span>
                  </div>
                </div>

                <div className="p-4 rounded-xl dark:bg-neutral-950 bg-stone-50 border dark:border-neutral-805 border-neutral-200 flex items-start gap-3">
                  <User className="h-5 w-5 text-[#F2C94C] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold block dark:text-neutral-400 text-neutral-550">شماره شناسایی پرسنلی:</span>
                    <span className="dark:text-white text-neutral-900 font-mono font-bold block mt-1">{toPersianNumber('APX-EMP-8452')}</span>
                  </div>
                </div>

              </div>

              {/* Theme Settings Panel Component */}
              <div className="p-6 rounded-xl dark:bg-neutral-950 bg-stone-50 border dark:border-neutral-800 border-neutral-200 space-y-4">
                <div className="flex items-center gap-2 border-b dark:border-neutral-800 border-neutral-200 pb-3">
                  <Settings className="h-5 w-5 text-[#F2C94C]" />
                  <h3 className="font-black dark:text-white text-neutral-900 text-sm">تنظیمات بصری ظاهر سامانه مهندسی</h3>
                </div>

                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 text-xs">
                  <div>
                    <span className="font-bold block dark:text-white text-neutral-950">پوسته فعال تارنما</span>
                    <span className="dark:text-neutral-450 text-neutral-500 mt-1 block">تغییر وضعیت بین تم روشن و تم تیره صنعتی به صورت آنی.</span>
                  </div>

                  <button
                    onClick={onThemeToggle}
                    className="px-5 py-2.5 bg-neutral-100 dark:bg-neutral-800 dark:text-white text-neutral-950 rounded border dark:border-neutral-700 border-neutral-300 hover:border-[#F2C94C] dark:hover:border-[#F2C94C] transition-all flex items-center gap-2 font-bold select-none cursor-pointer text-xs"
                  >
                    {theme === 'dark' ? (
                      <>
                        <Sun className="h-4 w-4 text-amber-500" />
                        <span>تغییر به پوسته روشن (روزکار)</span>
                      </>
                    ) : (
                      <>
                        <Moon className="h-4 w-4 text-sky-500" />
                        <span>تغییر به پوسته تیره (شب‌کار)</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Safety guidelines notification block */}
              <div className="p-4 rounded-lg bg-yellow-500/10 border border-yellow-500/20 text-xs text-yellow-600 dark:text-yellow-500 flex items-start gap-2.5">
                <ShieldAlert className="h-5 w-5 shrink-0 mt-0.5" />
                <div>
                  <span className="font-black block text-amber-600 dark:text-[#F2C94C]">مقررات و پیوست‌های ایمنی سایتی (HSE):</span>
                  <p className="mt-1 leading-relaxed">
                    مطابق ضابطه ۱۲ مقررات ملی ساختمان کشور، در تمامی حوزه‌های گودبرداری‌های بحرانی بالای ۵ متر، حضور ممتد مسئول دفتر فنی یا مهندس ناظر معمار مجهز به کلاه و کفش ایمنی پنجه فولادی با رتبه صنف الزامی است. سوانح احتمالی ناشی از سهل‌انگاری در پورتال مرکزی ثبت می‌گردد.
                  </p>
                </div>
              </div>

            </div>
          )}

        </div>
      </div>

    </div>
  );
}
