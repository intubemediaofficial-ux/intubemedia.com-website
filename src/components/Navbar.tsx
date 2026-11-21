import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { ArrowUpRight, Menu, X } from 'lucide-react';
import Logo from './site/Logo';

const links = [
  { label: 'Home', to: '/' },
  { label: 'Services', to: '/services' },
  { label: 'Artists', to: '/artists' },
  { label: 'Platforms', to: '/platforms' },
  { label: 'About Us', to: '/about' },
  { label: 'Contact', to: '/contact' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setOpen(false);
  }, [location.pathname, location.hash]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `rounded-lg px-3 py-2 text-sm font-semibold transition-colors ${isActive ? 'bg-brand-pale text-brand' : 'text-navy/80 hover:text-brand'}`;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b transition-all ${scrolled || open ? 'border-brand-line bg-white/95 shadow-sm backdrop-blur-lg' : 'border-transparent bg-white/70 backdrop-blur'}`}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:h-20 sm:px-6 lg:px-8">
        <Logo />

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Main">
          {links.map(link => (
            <NavLink key={link.to} to={link.to} end={link.to === '/'} className={linkClass}>
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <Link to="/#our-network" className="rounded-xl border border-brand-line px-4 py-2.5 text-sm font-semibold text-navy transition hover:border-brand hover:text-brand">
            Our Network
          </Link>
          <Link to="/contact" className="inline-flex items-center gap-1.5 rounded-xl bg-brand px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-brand/25 transition hover:bg-brand-dark">
            Partner With Us <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>

        <button
          className="rounded-lg p-2 text-navy lg:hidden"
          onClick={() => setOpen(!open)}
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {open && (
        <div className="max-h-[80vh] overflow-y-auto border-t border-brand-line bg-white lg:hidden">
          <nav className="space-y-1 px-4 py-4" aria-label="Mobile">
            {links.map(link => (
              <NavLink key={link.to} to={link.to} end={link.to === '/'} className={({ isActive }) => `block rounded-lg px-3 py-2.5 font-semibold ${isActive ? 'bg-brand-pale text-brand' : 'text-navy'}`}>
                {link.label}
              </NavLink>
            ))}
            <Link to="/#our-network" className="block rounded-lg px-3 py-2.5 font-semibold text-navy">
              Our Network
            </Link>
            <Link to="/contact" className="mt-3 flex items-center justify-center gap-1.5 rounded-xl bg-brand px-5 py-3 text-sm font-semibold text-white">
              Partner With Us <ArrowUpRight className="h-4 w-4" />
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
