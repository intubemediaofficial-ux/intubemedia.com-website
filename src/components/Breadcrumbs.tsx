import { Link, useLocation } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

const routeLabels: Record<string, string> = {
  services: 'Services',
  'website-app': 'Website & App Services',
  'digital-marketing': 'Digital Marketing',
  'branding-creative': 'Branding & Creative',
  'it-support-security': 'IT Support & Security',
  'ai-automation': 'AI & Automation',
  'account-management': 'Account Management',
  'account-protection': 'Account Protection',
  monetization: 'Monetization Services',
  'copyright-claims': 'Copyright & Claims',
  'content-production': 'Content Production',
  'growth-services': 'Growth Services',
  packages: 'Packages',
  about: 'About Us',
  contact: 'Contact',
  network: 'Our Network',
  'bainsla-music': 'Bainsla Music',
  pages: 'Pages',
};

export default function Breadcrumbs() {
  const location = useLocation();
  const segments = location.pathname.split('/').filter(Boolean);

  if (segments.length === 0) return null;

  return (
    <nav aria-label="Breadcrumb" className="py-4">
      <ol className="flex items-center gap-2 text-sm text-gray-400 flex-wrap">
        <li>
          <Link to="/" className="hover:text-white transition-colors flex items-center gap-1">
            <Home className="w-4 h-4" />
            Home
          </Link>
        </li>
        {segments.map((segment, index) => {
          const path = '/' + segments.slice(0, index + 1).join('/');
          const isLast = index === segments.length - 1;
          const label = routeLabels[segment] || segment;

          return (
            <li key={path} className="flex items-center gap-2">
              <ChevronRight className="w-4 h-4 text-gray-600" />
              {isLast ? (
                <span className="text-white font-medium">{label}</span>
              ) : (
                <Link to={path === '/network' ? '/#our-network' : path} className="hover:text-white transition-colors">
                  {label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
