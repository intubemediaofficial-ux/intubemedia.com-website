import { createContext } from 'react';
import type { LucideIcon } from 'lucide-react';
import { serviceCategories } from '../data/services';
import { defaultPackages, type CmsPackage } from '../data/packages';

export interface CmsServiceItem {
  id?: number;
  icon: string | LucideIcon;
  name: string;
  description: string;
  sort_order?: number;
  is_active?: boolean | number;
}

export interface CmsService {
  id?: number;
  slug: string;
  title: string;
  icon: string | LucideIcon;
  color: string;
  section: 'business' | 'influencer';
  tagline: string;
  description: string;
  meta_title: string;
  meta_description: string;
  sort_order?: number;
  is_active?: boolean | number;
  items: CmsServiceItem[];
}

export interface CmsTheme {
  [key: string]: string;
}

export const defaultServices: CmsService[] = serviceCategories.map((service) => ({
  ...service,
  meta_title: service.metaTitle,
  meta_description: service.metaDescription,
}));

export const defaultTheme: CmsTheme = {
  primary_color: '#7c3aed',
  secondary_color: '#ec4899',
  accent_color: '#06b6d4',
  bg_color: '#050510',
  text_color: '#ffffff',
  heading_font: 'Inter',
  body_font: 'Inter',
  logo_text: 'Intube Media',
  logo_short: 'iM',
  tagline: 'Digital • Technology • Creators • Media • Entertainment',
  footer_text: 'The digital, technology and media network for business IT solutions, creator management, media and entertainment.',
  hero_badge: 'Digital • Technology • Creators • Media • Entertainment',
  hero_title: 'Transform Your Digital Presence With Us',
  hero_subtitle: 'Intube Media is the umbrella network for digital agency services, IT solutions, influencer management, media and entertainment businesses.',
  phone: '+91 XXXXX XXXXX',
  email: 'hello@intubemedia.com',
  address: 'India',
  working_hours: 'Mon - Sat, 10AM - 7PM IST',
  stat_projects: '500+',
  stat_clients: '200+',
  stat_team: '50+',
  stat_experience: '5+',
};

interface CmsContextValue {
  services: CmsService[];
  packages: CmsPackage[];
  theme: CmsTheme;
}

export const CmsContext = createContext<CmsContextValue>({
  services: defaultServices,
  packages: defaultPackages,
  theme: defaultTheme,
});
