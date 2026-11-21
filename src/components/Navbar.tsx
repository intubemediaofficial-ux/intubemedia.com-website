import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { ArrowUpRight, LogIn, Menu, X } from 'lucide-react';
import Logo from './site/Logo';

const links = [
  { label: 'Home', to: '/' },
  { label: 'Services', to: '/services' },
  { label: 'Platforms', to: '/platforms' },
  { label: 'Artists', to: '/artists' },
  { label: 'About', to: '/about' },
  { label: 'Contact', to: '/contact' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${scrolled || open ? 'border-b border-white/10 bg-ink/80 backdrop-blur-xl' : 'bg-transparent'}`}>
      <nav className="mx-auto flex h-20 max-w-7xl items-center justify-between gap-6 px-5 sm:px-8">
        <Logo />
        <ul className="hidden items-center gap-1 rounded-full border border-white/10 bg-white/[0.03] p-1 backdrop-blur lg:flex">
          {links.map((link) => (
            <li key={link.to}>
              <NavLink
                to={link.to}
                end={link.to === '/'}
                className={({ isActive }) => `block rounded-full px-4 py-2 text-sm font-semibold transition ${isActive ? 'bg-white/10 text-white' : 'text-white/65 hover:text-white'}`}
              >
                {link.label}
              </NavLink>
            </li>
          ))}
        </ul>
        <div className="hidden items-center gap-2 lg:flex">
          <Link to="/partner/login" className="inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-2.5 text-sm font-bold text-white transition hover:bg-white/10">
            <LogIn className="h-4 w-4" /> Partner Sign In
          </Link>
          <Link to="/partner/apply" className="group inline-flex items-center gap-2 rounded-full bg-aurora px-5 py-2.5 text-sm font-bold text-white shadow-glow transition hover:brightness-110">
            Request Access <ArrowUpRight className="h-4 w-4 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </Link>
        </div>
        <button type="button" onClick={() => setOpen((v) => !v)} className="grid h-11 w-11 place-items-center rounded-full border border-white/15 text-white lg:hidden" aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open}>
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>
      {open && (
        <div className="h-[calc(100svh-5rem)] overflow-y-auto border-t border-white/10 bg-ink px-5 pb-10 pt-6 lg:hidden">
          <ul className="space-y-1">
            {links.map((link) => (
              <li key={link.to}>
                <NavLink to={link.to} end={link.to === '/'} className={({ isActive }) => `block rounded-2xl px-4 py-4 font-display text-2xl font-bold ${isActive ? 'bg-white/10 text-white' : 'text-white/70'}`}>
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>
          <div className="mt-8 grid gap-3">
            <Link to="/partner/apply" className="inline-flex items-center justify-center gap-2 rounded-full bg-aurora px-6 py-4 font-bold text-white">Request Access <ArrowUpRight className="h-4 w-4" /></Link>
            <Link to="/partner/login" className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 px-6 py-4 font-bold text-white"><LogIn className="h-4 w-4" /> Partner Sign In</Link>
          </div>
        </div>
      )}
    </header>
  );
}
