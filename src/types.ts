export interface ServiceStep {
  title: string;
  description: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface Service {
  id: string;
  slug: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  icon: string; // Lucide icon name
  image: string;
  process: ServiceStep[];
  faq: FAQItem[];
  benefits: string[];
  tags: string[];
}

export interface Project {
  id: string;
  title: string;
  category: string; // e.g. 'commercial', 'residential', 'industrial', 'infrastructure'
  size: string; // e.g., '45,000 sq ft' or '$5M Budget'
  location: string;
  year: number;
  description: string;
  challenge: string;
  solution: string;
  image: string; // Featured image
  gallery: string[]; // Additional gallery image URLs
  timeline: string; // e.g., '14 Months'
  client?: string;
  status: 'Completed' | 'In Progress' | 'Pre-Construction';
}

export interface Testimonial {
  id: string;
  author: string;
  role: string;
  company: string;
  content: string;
  rating: number; // 1-5
  projectId?: string;
  projectTitle?: string;
  avatar?: string;
}

export interface Stat {
  id: string;
  number: number;
  label: string;
  suffix: string; // e.g. '+', '%', ' yrs'
}

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  year: string;
}

export interface QuoteFormData {
  projectType: string;
  scopeSize: string;
  timeline: string;
  contactName: string;
  contactEmail: string;
  contactPhone: string;
  description: string;
  siteAddress?: string;
  hasPlans: 'yes' | 'no';
  attachments?: FileList;
}
