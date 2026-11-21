import { Link, useLocation } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

const routeLabels: Record<string, string> = {
  services: 'Services',
  artists: 'Artists',
  platforms: 'Platforms',
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
    <nav aria-label="Breadcrumb">
      <ol className="flex flex-wrap items-center gap-2 text-sm text-muted">
        <li>
          <Link to="/" className="flex items-center gap-1 transition-colors hover:text-brand">
            <Home className="h-4 w-4" />
            Home
          </Link>
        </li>
        {segments.map((segment, index) => {
          const path = '/' + segments.slice(0, index + 1).join('/');
          const isLast = index === segments.length - 1;
          const label = routeLabels[segment] || segment.replace(/-/g, ' ');

          return (
            <li key={path} className="flex items-center gap-2">
              <ChevronRight className="h-4 w-4 text-brand/40" />
              {isLast ? (
                <span className="font-semibold capitalize text-navy">{label}</span>
              ) : (
                <Link to={path === '/network' ? '/#our-network' : path} className="capitalize transition-colors hover:text-brand">
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
