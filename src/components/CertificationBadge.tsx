import React from 'react';
import { Award, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { toPersianNumber } from '../utils/persian';

interface CertificationBadgeProps {
  id: string;
  name: string;
  issuer: string;
  year: string;
  key?: any;
}

export default function CertificationBadge({ id, name, issuer, year }: CertificationBadgeProps) {
  const renderIcon = () => {
    switch (id) {
      case 'safety':
        return <ShieldCheck className="h-6 w-6 text-[#F2C94C]" />;
      case 'leed':
        return <CheckCircle2 className="h-6 w-6 text-emerald-500" />;
      case 'agc':
        return <Award className="h-6 w-6 text-sky-400" />;
      default:
        return <Award className="h-6 w-6 text-[#F2C94C]" />;
    }
  };

  return (
    <div 
      className="flex items-center gap-4 p-4 rounded-lg dark:bg-neutral-900 bg-white border dark:border-neutral-800 border-neutral-200 hover:border-[#F2C94C] transition-colors"
      id={`cert-badge-${id}`}
    >
      <div className="flex-shrink-0 p-3 rounded-md dark:bg-neutral-800 bg-stone-100 dark:border-neutral-700 border-neutral-200">
        {renderIcon()}
      </div>
      <div>
        <h4 className="text-sm font-bold dark:text-white text-neutral-900 tracking-wide">{name}</h4>
        <p className="text-xs dark:text-neutral-400 text-neutral-500 mt-0.5">
          {issuer} • {toPersianNumber(year)}
        </p>
      </div>
    </div>
  );
}
