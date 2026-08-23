export interface CmsPackage {
  id?: number;
  name: string;
  tagline: string;
  color: string;
  is_popular?: boolean;
  popular?: boolean;
  features: string[];
  sort_order?: number;
  is_active?: boolean;
}

export const defaultPackages: CmsPackage[] = [
  {
    name: 'Startup Package',
    tagline: 'Perfect for New Businesses',
    color: 'from-blue-500 to-cyan-400',
    features: [
      'Professional Logo Design',
      'Business Website (5 Pages)',
      'Social Media Setup (3 Platforms)',
      'Basic SEO Optimization',
      'Google My Business Listing',
      'Business Email Setup',
      'Brand Identity Kit',
      '1 Month Free Support',
    ],
  },
  {
    name: 'Business Growth Package',
    tagline: 'Scale Your Business',
    color: 'from-violet-500 to-pink-500',
    popular: true,
    features: [
      'Google & Meta Ads Management',
      'Custom CRM Setup',
      'Website Maintenance & Updates',
      'Social Media Management',
      'AI Automation Integration',
      'Monthly Analytics Reports',
      'Content Strategy & Creation',
      'Priority Support',
      'SEO & Performance Optimization',
      'Email Marketing Campaigns',
    ],
  },
  {
    name: 'Celebrity / Influencer Package',
    tagline: 'For Top Creators & Celebrities',
    color: 'from-amber-500 to-orange-500',
    features: [
      'Full Account Handling (All Platforms)',
      'Brand Deals & Sponsorship Management',
      'Copyright & Content Protection',
      'Dedicated Content Production Team',
      'PR & Media Management',
      'Personal Branding Strategy',
      'Revenue Growth Planning',
      'Crisis Management',
      'Collaboration Management',
      'Monthly Growth Reports',
    ],
  },
];
