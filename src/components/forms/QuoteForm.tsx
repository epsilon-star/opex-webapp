import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { 
  Building2, 
  Home, 
  HardHat, 
  Hammer, 
  ArrowRight, 
  ArrowLeft, 
  Check, 
  PhoneCall, 
  Upload, 
  ShieldCheck,
  AlertCircle
} from 'lucide-react';
import { QuoteFormData } from '../../types';
import { toPersianNumber } from '../../utils/persian';

// Schema localized to Persian validation constraints
const quoteSchema = z.object({
  projectType: z.string().min(1, { message: "لطفاً دپارتمان پروژه را انتخاب کنید" }),
  scopeSize: z.string().min(2, { message: "لطفاً ابعاد تقریبی یا مساحت زیربنا را مشخص کنید" }),
  timeline: z.string().min(1, { message: "لطفاً زمان‌بندی تقریبی مدنظر خود را انتخاب کنید" }),
  contactName: z.string().min(2, { message: "نام مخاطب باید حداقل شامل ۲ کاراکتر باشد" }),
  contactEmail: z.string().email({ message: "نشانی پست الکترونیک وارد شده صحیح نیست" }),
  contactPhone: z.string().min(8, { message: "شماره تماس معتبر وارد کنید (حداقل ۸ رقم)" }),
  description: z.string().min(10, { message: "لطفاً حداقل ۱۰ کاراکتر شرح خواسته بنویسید" }),
  siteAddress: z.string().optional(),
  hasPlans: z.enum(['yes', 'no']),
});

interface QuoteFormProps {
  initialServiceId?: string;
  onSuccess?: (data: any) => void;
}

export default function QuoteForm({ initialServiceId = '', onSuccess }: QuoteFormProps) {
  const [step, setStep] = useState(1);
  const [selectedType, setSelectedType] = useState(initialServiceId);
  const [files, setFiles] = useState<{name: string, size: number}[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedData, setSubmittedData] = useState<QuoteFormData | null>(null);
  const [confirmationCode, setConfirmationCode] = useState('');

  const { 
    register, 
    handleSubmit, 
    setValue, 
    trigger, 
    watch,
    formState: { errors } 
  } = useForm<QuoteFormData>({
    resolver: zodResolver(quoteSchema),
    defaultValues: {
      projectType: initialServiceId,
      scopeSize: '',
      timeline: '',
      contactName: '',
      contactEmail: '',
      contactPhone: '',
      description: '',
      siteAddress: '',
      hasPlans: 'no'
    }
  });

  const watchAllFields = watch();

  const projectTypes = [
    { id: 'commercial-construction', title: 'دپارتمان تجاری و اداری', icon: <Building2 className="h-6 w-6" /> },
    { id: 'residential-construction', title: 'دپارتمان مسکونی و ویلایی', icon: <Home className="h-6 w-6" /> },
    { id: 'industrial-development', title: 'دپارتمان صنعتی و انبارداری', icon: <HardHat className="h-6 w-6" /> },
    { id: 'site-preparation', title: 'دپارتمان خاکبرداری و پایدارسازی', icon: <Hammer className="h-6 w-6" /> },
  ];

  const handleTypeSelect = (id: string) => {
    setSelectedType(id);
    setValue('projectType', id, { shouldValidate: true });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files).map((f: any) => ({
        name: f.name as string,
        size: f.size as number
      }));
      setFiles(selectedFiles);
    }
  };

  const nextStep = async () => {
    if (step === 1) {
      const isValid = await trigger('projectType');
      if (isValid) setStep(2);
    } else if (step === 2) {
      const isValid = await trigger(['scopeSize', 'timeline', 'hasPlans']);
      if (isValid) setStep(3);
    }
  };

  const prevStep = () => {
    if (step > 1) setStep(step - 1);
  };

  const onSubmitForm = async (data: QuoteFormData) => {
    setIsSubmitting(true);
    const code = `APX-${Math.floor(100000 + Math.random() * 900000)}`;

    setTimeout(() => {
      // Create local item to simulate database storage so CMS quotes section can render them
      const newQuote = {
        id: code,
        ...data,
        createdAt: new Date().toISOString(),
        status: 'Pending',
        filesCount: files.length
      };

      try {
        const stored = localStorage.getItem('apex_quotes');
        const quotesList = stored ? JSON.parse(stored) : [];
        quotesList.unshift(newQuote);
        localStorage.setItem('apex_quotes', JSON.stringify(quotesList));
      } catch (e) {
        console.error("Local storage sync error", e);
      }

      setIsSubmitting(false);
      setConfirmationCode(code);
      setSubmittedData(data);
      onSuccess?.(newQuote);
    }, 1200);
  };

  const resetForm = () => {
    setStep(1);
    setSelectedType('');
    setFiles([]);
    setSubmittedData(null);
  };

  if (submittedData) {
    return (
      <div className="dark:bg-neutral-900 bg-white border dark:border-neutral-850 border-neutral-200 rounded-xl p-8 text-center max-w-2xl mx-auto shadow-2xl animate-fadeIn text-right" id="quote-success">
        <div className="mx-auto w-16 h-16 bg-emerald-500/10 border border-emerald-500 rounded-full flex items-center justify-center text-emerald-500 mb-6">
          <ShieldCheck className="h-8 w-8" />
        </div>
        <h3 className="text-xl md:text-2xl font-black dark:text-white text-neutral-900 leading-snug">درخواست استعلام بها با موفقیت ثبت شد</h3>
        <p className="dark:text-neutral-400 text-neutral-500 mt-2 max-w-md mx-auto text-sm leading-relaxed">
          فرآیند اعتبارسنجی اولیه انجام شد. کد پیگیری شما: <span className="text-[#F2C94C] font-mono font-bold text-lg">{toPersianNumber(confirmationCode)}</span> است. کارشناسان فنی ارزش و برآورد ما حداکثر ظرف مدت ۲۴ ساعت کاری با شما تماس خواهند گرفت.
        </p>

        {/* Summarize values */}
        <div className="my-6 p-5 rounded-lg dark:bg-neutral-950 bg-stone-50 border dark:border-neutral-800 border-neutral-200 text-right text-xs space-y-3">
          <div className="flex justify-between border-b dark:border-neutral-800 border-neutral-200 pb-2 font-bold text-[#F2C94C]">
            <span>بخش مشخصات پروژه</span>
            <span>انتخاب کارفرما</span>
          </div>
          <div className="flex justify-between">
            <span className="dark:text-neutral-400 text-neutral-500">شاخه مهندسی:</span>
            <span className="dark:text-white text-neutral-900 font-bold">
              {projectTypes.find(t => t.id === submittedData.projectType)?.title || submittedData.projectType}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="dark:text-neutral-400 text-neutral-500">زیربنا / حجم کار:</span>
            <span className="dark:text-white text-neutral-900 font-bold">{toPersianNumber(submittedData.scopeSize)}</span>
          </div>
          <div className="flex justify-between">
            <span className="dark:text-neutral-400 text-neutral-500">نام متقاضی / شرکت:</span>
            <span className="dark:text-white text-neutral-900 font-bold">{submittedData.contactName}</span>
          </div>
          <div className="flex justify-between">
            <span className="dark:text-neutral-400 text-neutral-500">بازه زمانی اتمام پروژه:</span>
            <span className="dark:text-white text-neutral-900 font-bold">
              {submittedData.timeline === 'immediate' && 'فوری (کمتر از ۳ ماه)'}
              {submittedData.timeline === 'short' && 'کوتاه‌مدت (۳ تا ۶ ماه)'}
              {submittedData.timeline === 'medium' && 'میان‌مدت (۶ تا ۱۲ ماه)'}
              {submittedData.timeline === 'long' && 'بلندمدت (بیش از یک سال)'}
            </span>
          </div>
          {files.length > 0 && (
            <div className="flex justify-between">
              <span className="dark:text-neutral-400 text-neutral-500">فایل‌های پیوست:</span>
              <span className="text-emerald-500 font-bold">{toPersianNumber(files.length)} نقشه/سند بارگذاری شد</span>
            </div>
          )}
        </div>

        <div className="flex flex-col sm:flex-row justify-center gap-4 mt-8">
          <button
            onClick={resetForm}
            className="px-6 py-3 font-bold text-xs bg-stone-100 dark:bg-neutral-800 hover:bg-stone-200 dark:hover:bg-neutral-700 dark:text-white text-neutral-800 rounded transition-all cursor-pointer"
          >
            ثبت یک درخواست استعلام جدید
          </button>
          
          <a
            href="tel:02188223344"
            className="flex items-center justify-center gap-2 px-6 py-3 font-bold text-xs bg-[#F2C94C] hover:bg-yellow-500 text-neutral-950 rounded transition-all cursor-pointer"
          >
            <PhoneCall className="h-4 w-4" />
            <span>تماس مستقیم تلفنی با مدیر تخمین</span>
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-3xl mx-auto dark:bg-neutral-900 bg-white border dark:border-neutral-800 border-neutral-200 rounded-xl overflow-hidden shadow-2xl" id="quote-form-wizard">
      
      {/* Top Progress status block */}
      <div className="grid grid-cols-3 dark:bg-neutral-950 bg-stone-50 border-b dark:border-neutral-800 border-neutral-200 text-center text-xs">
        <div className={`p-4 font-bold flex items-center justify-center gap-2 transition-colors ${step >= 1 ? 'text-[#F2C94C] dark:bg-neutral-900 bg-[#fffbeb]' : 'text-stone-400'}`}>
          <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] border ${step > 1 ? 'bg-[#F2C94C] text-black border-transparent font-bold' : 'border-neutral-400'}`}>
            {step > 1 ? <Check className="h-3 w-3 stroke-[3]" /> : '۱'}
          </div>
          <span className="hidden sm:inline">انتخاب شاخه مهندسی</span>
        </div>
        <div className={`p-4 font-bold flex items-center justify-center gap-2 transition-colors border-r dark:border-neutral-800 border-neutral-200 ${step >= 2 ? 'text-[#F2C94C] dark:bg-neutral-900 bg-[#fffbeb]' : 'text-stone-400'}`}>
          <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] border ${step > 2 ? 'bg-[#F2C94C] text-black border-transparent font-bold' : 'border-neutral-400'}`}>
            {step > 2 ? <Check className="h-3 w-3 stroke-[3]" /> : '۲'}
          </div>
          <span className="hidden sm:inline">ابعاد و زمان‌بندی</span>
        </div>
        <div className={`p-4 font-bold flex items-center justify-center gap-2 transition-colors border-r dark:border-neutral-800 border-neutral-200 ${step >= 3 ? 'text-[#F2C94C] dark:bg-neutral-900 bg-[#fffbeb]' : 'text-stone-400'}`}>
          <div className="w-5 h-5 rounded-full flex items-center justify-center text-[10px] border border-neutral-400">
            ۳
          </div>
          <span className="hidden sm:inline">ثبت مشخصات تماس</span>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmitForm)} className="p-6 md:p-10 space-y-8 text-right">
        
        {/* STEP 1: PROJECT TYPE SELECTION */}
        {step === 1 && (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg md:text-xl font-black dark:text-white text-neutral-950 uppercase tracking-tight">انتخاب شاخه فعالیت پروژه</h3>
              <p className="dark:text-neutral-400 text-neutral-500 text-xs mt-1">گزینه زیرمجموعه متناسب با روند کارفرما را تعیین کنید تا مستقیماً به مهندس برآورد ارجاع داده شود.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {projectTypes.map((type) => {
                const isSelected = selectedType === type.id;
                return (
                  <button
                    key={type.id}
                    type="button"
                    onClick={() => handleTypeSelect(type.id)}
                    className={`flex items-center gap-4 p-5 rounded-lg border text-right transition-all cursor-pointer ${
                      isSelected 
                        ? 'dark:bg-[#1e1a11] bg-amber-50/50 border-[#F2C94C] shadow-[0_0_15px_rgba(242,201,76,0.1)]' 
                        : 'dark:bg-neutral-950 bg-stone-50 dark:border-neutral-805 border-neutral-200 hover:border-[#F2C94C] hover:bg-neutral-900/50'
                    }`}
                  >
                    <div className={`p-3 rounded-md transition-colors ${isSelected ? 'bg-[#F2C94C] text-black' : 'dark:bg-neutral-800 bg-stone-200 dark:text-neutral-300 text-neutral-700'}`}>
                      {type.icon}
                    </div>
                    <div>
                      <h4 className="font-bold dark:text-white text-neutral-900 text-xs md:text-sm tracking-wide">{type.title}</h4>
                      <p className="text-[10px] dark:text-neutral-400 text-neutral-500 mt-1">دارای تیم مهندسی اختصاصی ارشد متره</p>
                    </div>
                  </button>
                );
              })}
            </div>
            
            {errors.projectType && (
              <div className="flex items-center gap-2 text-rose-500 text-xs font-semibold dark:bg-rose-950/30 bg-rose-50 border dark:border-rose-900/50 border-rose-200 p-3 rounded">
                <AlertCircle className="h-4 w-4 shrink-0" />
                <span>{errors.projectType.message}</span>
              </div>
            )}
          </div>
        )}

        {/* STEP 2: SCOPE AND TIMELINE */}
        {step === 2 && (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg md:text-xl font-black dark:text-white text-neutral-900">ابعاد و زمان‌بندی مدنظر را وارد کنید</h3>
              <p className="dark:text-neutral-400 text-neutral-500 text-xs mt-1">توضیحاتی پیرامون متراژ تقریبی بنا یا بازه زمانی را برگزینید.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Sizing Field */}
              <div className="space-y-2">
                <label className="block text-xs font-bold dark:text-neutral-300 text-neutral-700 uppercase tracking-widest">
                  مساحت تقریبی یا حجم کار <span className="text-[#F2C94C]">*</span>
                </label>
                <div className="relative">
                  <input
                    type="text"
                    {...register('scopeSize')}
                    placeholder="مثال: ۵۰۰ متر مربع، ۵ طبقه، یا ۱ هکتار"
                    className="w-full dark:bg-neutral-950 bg-stone-50 border dark:border-neutral-800 border-neutral-200 rounded-md px-4 py-3 dark:text-white text-neutral-950 text-xs md:text-sm focus:border-[#F2C94C] focus:outline-none transition-colors"
                  />
                </div>
                {errors.scopeSize && (
                  <p className="text-rose-500 text-xs font-semibold mt-1">{errors.scopeSize.message}</p>
                )}
              </div>

              {/* Timeline dropdown select */}
              <div className="space-y-2">
                <label className="block text-xs font-bold dark:text-neutral-300 text-neutral-700 uppercase tracking-widest">
                  بازه زمانی تا اتمام پروژه <span className="text-[#F2C94C]">*</span>
                </label>
                <select
                  {...register('timeline')}
                  className="w-full dark:bg-neutral-950 bg-stone-50 border dark:border-neutral-800 border-neutral-200 rounded-md px-4 py-3 dark:text-white text-neutral-950 text-xs md:text-sm focus:border-[#F2C94C] focus:outline-none transition-colors cursor-pointer"
                >
                  <option value="" disabled>-- بازه زمانی مطلوب را انتخاب کنید --</option>
                  <option value="immediate">فوری (زیر ۳ ماه)</option>
                  <option value="short">کوتاه‌مدت (۳ تا ۶ ماه)</option>
                  <option value="medium">میان‌مدت (۶ تا ۱۲ ماه)</option>
                  <option value="long">بلندمدت (بیش از ۱۲ ماه)</option>
                </select>
                {errors.timeline && (
                  <p className="text-rose-500 text-xs font-semibold mt-1">{errors.timeline.message}</p>
                )}
              </div>

              {/* Site Address Option */}
              <div className="space-y-2 md:col-span-2">
                <label className="block text-xs font-bold dark:text-neutral-300 text-neutral-700 uppercase tracking-widest">
                  آدرس محدوده پروژه / زمین ساخت
                </label>
                <input
                  type="text"
                  {...register('siteAddress')}
                  placeholder="مثال: تهران، پاسداران، خیابان شهید بهشتی"
                  className="w-full dark:bg-neutral-950 bg-stone-50 border dark:border-neutral-800 border-neutral-200 rounded-md px-4 py-3 dark:text-white text-neutral-950 text-xs md:text-sm focus:border-[#F2C94C] focus:outline-none transition-colors"
                />
              </div>

              {/* Blueprint plans status */}
              <div className="md:col-span-2 space-y-3 p-4 rounded-lg dark:bg-neutral-950 bg-stone-50 border dark:border-neutral-800 border-neutral-200">
                <span className="block text-xs font-bold dark:text-gray-300 text-neutral-700">
                  آیا نقشه‌های تاییدشده معماری یا سازه دارید؟ <span className="text-[#F2C94C]">*</span>
                </span>
                <div className="flex flex-col md:flex-row gap-4">
                  <label className="flex items-center gap-2 cursor-pointer text-xs md:text-sm dark:text-neutral-300 text-neutral-750">
                    <input
                      type="radio"
                      value="yes"
                      {...register('hasPlans')}
                      className="accent-[#F2C94C] cursor-pointer"
                    />
                    <span>بله، فایل‌ها آماده ارسال و متره می‌باشند</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer text-xs md:text-sm dark:text-neutral-300 text-neutral-750">
                    <input
                      type="radio"
                      value="no"
                      {...register('hasPlans')}
                      className="accent-[#F2C94C] cursor-pointer"
                    />
                    <span>خیر، نیاز به اخذ نقشه فاز یک و دو و تایید مهندس معمار داریم</span>
                  </label>
                </div>
              </div>

            </div>
          </div>
        )}

        {/* STEP 3: CONTACTS & DETAILS */}
        {step === 3 && (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg md:text-xl font-black dark:text-white text-neutral-950 uppercase tracking-tight">اطلاعات تماس متقاضی و شرح مختصر</h3>
              <p className="dark:text-neutral-400 text-neutral-500 text-xs mt-1">مشخصات هویتی و فنی را مرقوم کنید تا اطلاعات به نام کارفرما ثبت شود.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              
              {/* Contact Name */}
              <div className="space-y-2">
                <label className="block text-xs font-bold dark:text-neutral-300 text-neutral-700 uppercase tracking-widest">
                  نام و نام خانوادگی / شرکت متقاضی <span className="text-[#F2C94C]">*</span>
                </label>
                <input
                  type="text"
                  {...register('contactName')}
                  placeholder="مثال: مهندس علیپور (شرکت مانا ابنیه)"
                  className="w-full dark:bg-neutral-950 bg-stone-50 border dark:border-neutral-800 border-neutral-200 rounded-md px-4 py-3 dark:text-white text-neutral-950 text-xs md:text-sm focus:border-[#F2C94C] focus:outline-none transition-colors"
                />
                {errors.contactName && (
                  <p className="text-rose-500 text-xs font-semibold mt-1">{errors.contactName.message}</p>
                )}
              </div>

              {/* Email Address */}
              <div className="space-y-2">
                <label className="block text-xs font-bold dark:text-neutral-300 text-neutral-700 uppercase tracking-widest">
                  نشانی پست الکترونیکی <span className="text-[#F2C94C]">*</span>
                </label>
                <input
                  type="email"
                  {...register('contactEmail')}
                  placeholder="e.g. name@company.com"
                  className="w-full dark:bg-neutral-950 bg-stone-50 border dark:border-neutral-800 border-neutral-200 rounded-md px-4 py-3 dark:text-white text-neutral-950 text-xs md:text-sm focus:border-[#F2C94C] focus:outline-none transition-colors"
                />
                {errors.contactEmail && (
                  <p className="text-rose-500 text-xs font-semibold mt-1">{errors.contactEmail.message}</p>
                )}
              </div>

              {/* Phone Num */}
              <div className="space-y-2 md:col-span-2">
                <label className="block text-xs font-bold dark:text-neutral-300 text-neutral-700 uppercase tracking-widest">
                  شماره مستقیم همراه کارفرما <span className="text-[#F2C94C]">*</span>
                </label>
                <input
                  type="text"
                  {...register('contactPhone')}
                  placeholder="مثال: 09121234567"
                  className="w-full dark:bg-neutral-950 bg-stone-50 border dark:border-neutral-800 border-neutral-200 rounded-md px-4 py-3 dark:text-white text-neutral-950 text-xs md:text-sm focus:border-[#F2C94C] focus:outline-none transition-colors"
                />
                {errors.contactPhone && (
                  <p className="text-rose-500 text-xs font-semibold mt-1">{errors.contactPhone.message}</p>
                )}
              </div>

              {/* Long Description Textarea */}
              <div className="space-y-2 md:col-span-2">
                <label className="block text-xs font-bold dark:text-neutral-300 text-neutral-700 uppercase tracking-widest">
                  شرح پروژه، چالش‌ها و مشخصات فنی مدنظر <span className="text-[#F2C94C]">*</span>
                </label>
                <textarea
                  rows={4}
                  {...register('description')}
                  placeholder="مواردی چون نوع خاک، دسترسی ملک، متریال دیوارکشی، نوع اسکلت بتنی یا فلزی و محدودیت‌های ترافیکی را بنویسید."
                  className="w-full dark:bg-neutral-950 bg-stone-50 border dark:border-neutral-800 border-neutral-200 rounded-md px-4 py-3 dark:text-white text-neutral-950 text-xs md:text-sm focus:border-[#F2C94C] focus:outline-none transition-colors resize-y leading-relaxed"
                ></textarea>
                {errors.description && (
                  <p className="text-rose-500 text-xs font-semibold mt-1">{errors.description.message}</p>
                )}
              </div>

              {/* Upload drag-and-drop placeholder */}
              <div className="space-y-2 md:col-span-2">
                <label className="block text-xs font-bold dark:text-neutral-300 text-neutral-700 uppercase tracking-widest">
                  بارگذاری نقشه‌ها یا طراح‌های سه بعدی CAD/PDF (اختیاری)
                </label>
                
                <div className="relative border-2 border-dashed dark:border-neutral-800 border-neutral-250 hover:border-[#F2C94C] dark:hover:border-[#F2C94C] transition-colors rounded-lg p-6 text-center cursor-pointer dark:bg-neutral-950 bg-stone-50">
                  <input
                    type="file"
                    multiple
                    onChange={handleFileChange}
                    className="absolute inset-0 opacity-0 cursor-pointer z-10"
                  />
                  <Upload className="mx-auto h-8 w-8 text-[#F2C94C] mb-2" />
                  <p className="text-sm font-bold dark:text-white text-neutral-900">فایل‌ها را به این قسمت بکشید یا برای انتخاب کلیک کنید</p>
                  <p className="text-xs dark:text-neutral-400 text-neutral-500 mt-1">فرمت‌های قابل پذیرش: PDF, DWG, DXF, PNG تا حداکثر ۲۵ مگابایت</p>
                  
                  {files.length > 0 && (
                    <div className="mt-4 p-2 bg-emerald-500/10 border border-emerald-500 rounded-md inline-block text-xs text-emerald-500 font-bold">
                      {toPersianNumber(files.length)} سند پیوست شد: {files.map(f => f.name).join('، ')}
                    </div>
                  )}
                </div>
              </div>

            </div>
          </div>
        )}

        {/* Buttons Controls footer */}
        <div className="flex items-center justify-between pt-6 border-t dark:border-neutral-800 border-neutral-200">
          <div className="text-xs dark:text-neutral-400 text-neutral-500 font-bold">
            {step < 3 ? (
              <span>گام {toPersianNumber(step)} از ۳</span>
            ) : (
              <span className="flex items-center gap-1.5 text-stone-500 dark:text-stone-300">
                <PhoneCall className="h-3.5 w-3.5 text-[#F2C94C]" />
                ارتباط تلفنی مستقیم ۲۴ ساعته فعال است
              </span>
            )}
          </div>

          <div className="flex gap-4">
            {step > 1 && (
              <button
                type="button"
                onClick={prevStep}
                disabled={isSubmitting}
                className="flex items-center gap-2 px-5 py-3 text-xs font-bold bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-750 dark:text-white text-neutral-800 rounded transition-colors disabled:opacity-50 cursor-pointer"
              >
                <ArrowRight className="h-3.5 w-3.5" />
                <span>قبلی</span>
              </button>
            )}

            {step < 3 ? (
              <button
                type="button"
                onClick={nextStep}
                className="flex items-center gap-2 px-6 py-3 text-xs font-bold bg-[#F2C94C] hover:bg-yellow-500 text-neutral-950 rounded transition-colors cursor-pointer"
              >
                <span>ادامه</span>
                <ArrowLeft className="h-3.5 w-3.5" />
              </button>
            ) : (
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex items-center gap-2 px-6 py-3 text-xs font-bold bg-[#F2C94C] hover:bg-yellow-500 text-neutral-950 rounded transition-colors disabled:opacity-50 cursor-pointer"
              >
                <span>{isSubmitting ? 'در حال برآورد ارزش ساختمانی...' : 'ثبت درخواست استعلام بها'}</span>
                <Check className="h-3.5 w-3.5 stroke-[3]" />
              </button>
            )}
          </div>
        </div>

      </form>

      {/* Alternative hotline visual block */}
      <div className="p-4 dark:bg-neutral-950 bg-stone-50 border-t dark:border-neutral-800 border-neutral-250 text-center text-xs dark:text-neutral-400 text-neutral-500 flex flex-col sm:flex-row items-center justify-center gap-2">
        <span>پروژه ضروری دارید یا نیاز به مشاوره تلفنی فوری حضور در کارگاه است؟</span>
        <a href="tel:02188223344" className="font-bold text-[#F2C94C] hover:underline flex items-center gap-1.5 direction-ltr">
          <PhoneCall className="h-3.5 w-3.5" />
          <span>۰۲۱-۸۸۲۲۳۳۴۴</span>
        </a>
      </div>
    </div>
  );
}
