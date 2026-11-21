import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { ArrowUpRight, ChevronDown, LogIn, Menu, X } from 'lucide-react';
import Logo from './site/Logo';
import { companyServices, ecosystem } from '../data/company';

type Item = { label: string; to: string; external?: boolean; note?: string };
type Group = { label: string; to: string; items?: Item[] };

const groups: Group[] = [
  { label: 'Home', to: '/' },
  {
    label: 'Company', to: '/about',
    items: [
      { label: 'About Us', to: '/about', note: 'Our story and mission' },
      { label: 'Artists', to: '/artists', note: 'Voices behind our network' },
      { label: 'Bainsla Music', to: '/network/bainsla-music', note: 'Our record label' },
      { label: 'FAQs', to: '/#faq', note: 'Common questions' },
    ],
  },
  { label: 'Services', to: '/services', items: companyServices.map((s) => ({ label: s.title, to: `/services/${s.id}`, note: s.group })) },
  { label: 'Platforms', to: '/platforms', items: ecosystem.map((p) => ({ label: p.name, to: p.url, external: true, note: p.domain })) },
  { label: 'Artists', to: '/artists' },
  { label: 'Contact', to: '/contact' },
];

function ItemLink({ item, className, onClick }: { item: Item; className: string; onClick?: () => void }) {
  if (item.external) return <a href={item.to} target="_blank" rel="noopener noreferrer" className={className} onClick={onClick}>{item.label}<ArrowUpRight className="ml-1 inline h-3 w-3 opacity-50" /></a>;
  return <Link to={item.to} className={className} onClick={onClick}>{item.label}</Link>;
}

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [expanded, setExpanded] = useState<string | null>(null);
  const [hover, setHover] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => { setOpen(false); setHover(null); }, [pathname]);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  const solid = scrolled || hover !== null;
  const tone = solid ? 'text-coal' : 'text-white';

  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${solid ? 'bg-white/95 shadow-[0_10px_40px_-20px_rgba(18,19,24,0.35)] backdrop-blur-xl' : 'bg-gradient-to-b from-black/50 to-transparent'}`}>
      <div className="h-[3px] w-full bg-gradient-to-r from-accent via-[#ff4d3d] to-[#ff8a3d]" />
      <nav className="mx-auto flex h-[76px] max-w-7xl items-center justify-between gap-6 px-5 sm:px-8" onMouseLeave={() => setHover(null)}>
        <Logo dark={solid} />
        <ul className="hidden items-center lg:flex">
          {groups.map((g) => (
            <li key={g.label} className="relative" onMouseEnter={() => setHover(g.items ? g.label : null)}>
              <NavLink
                to={g.to}
                end={g.to === '/'}
                onFocus={() => setHover(g.items ? g.label : null)}
                className={({ isActive }) => `group relative flex items-center gap-1 px-4 py-7 font-display text-[0.95rem] font-semibold uppercase tracking-[0.08em] transition-colors ${isActive ? 'text-accent' : `${tone} hover:text-accent`}`}
              >
                {({ isActive }) => (
                  <>
                    {g.label}
                    {g.items && <ChevronDown className={`h-3.5 w-3.5 transition-transform duration-300 ${hover === g.label ? 'rotate-180' : ''}`} />}
                    <span className={`absolute inset-x-4 bottom-5 h-[2px] origin-left rounded-full bg-accent transition-transform duration-300 ${isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}`} />
                  </>
                )}
              </NavLink>
              {g.items && hover === g.label && (
                <div className={`absolute left-1/2 top-full -translate-x-1/2 pt-1 ${g.items.length > 6 ? 'w-[620px]' : 'w-72'}`}>
                  <div className="animate-dropdown origin-top overflow-hidden rounded-2xl border border-coal-200 bg-white p-2 shadow-[0_30px_70px_-25px_rgba(18,19,24,0.45)]">
                    <div className="h-[3px] -mx-2 -mt-2 mb-2 bg-gradient-to-r from-accent to-[#ff8a3d]" />
                    <ul className={g.items.length > 6 ? 'grid grid-cols-2 gap-1' : 'space-y-1'}>
                      {g.items.map((item) => (
                        <li key={item.label}>
                          <ItemLink item={item} className="block rounded-xl px-4 py-3 text-sm font-semibold text-coal transition hover:translate-x-1 hover:bg-accent-soft hover:text-accent" />
                          {item.note && <span className="-mt-2.5 block px-4 pb-2 text-[0.7rem] text-coal-400">{item.note}</span>}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </li>
          ))}
        </ul>
        <div className="hidden items-center gap-2 lg:flex">
          <Link to="/partner/login" className={`inline-flex items-center gap-2 rounded-full border px-4 py-2.5 font-display text-sm font-semibold uppercase tracking-[0.08em] transition ${solid ? 'border-coal-200 text-coal hover:border-coal' : 'border-white/30 text-white hover:bg-white/10'}`}>
            <LogIn className="h-4 w-4" /> Sign In
          </Link>
          <Link to="/partner/apply" className="group inline-flex items-center gap-2 rounded-full bg-accent px-5 py-2.5 font-display text-sm font-semibold uppercase tracking-[0.08em] text-white shadow-[0_12px_26px_-12px_rgba(225,29,42,0.9)] transition hover:bg-accent-dark">
            Request Access <ArrowUpRight className="h-4 w-4 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </Link>
        </div>
        <button type="button" onClick={() => setOpen(true)} className={`grid h-11 w-11 place-items-center rounded-full border lg:hidden ${solid ? 'border-coal-200 text-coal' : 'border-white/30 text-white'}`} aria-label="Open menu" aria-expanded={open}>
          <Menu className="h-5 w-5" />
        </button>
      </nav>
      {open && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button type="button" aria-label="Close menu" onClick={() => setOpen(false)} className="absolute inset-0 animate-rise bg-coal/60 backdrop-blur-sm" />
          <aside className="absolute right-0 top-0 flex h-full w-[86%] max-w-sm animate-drawer flex-col overflow-y-auto bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-coal-200 px-5 py-4">
              <Logo dark />
              <button type="button" onClick={() => setOpen(false)} className="grid h-10 w-10 place-items-center rounded-full border border-coal-200 text-coal" aria-label="Close menu"><X className="h-5 w-5" /></button>
            </div>
            <ul className="flex-1 px-3 py-4">
              {groups.map((g) => (
                <li key={g.label} className="border-b border-coal-100">
                  <div className="flex items-center">
                    <NavLink to={g.to} end={g.to === '/'} className={({ isActive }) => `flex-1 px-3 py-4 font-display text-lg font-semibold uppercase tracking-[0.06em] ${isActive ? 'text-accent' : 'text-coal'}`}>{g.label}</NavLink>
                    {g.items && (
                      <button type="button" onClick={() => setExpanded(expanded === g.label ? null : g.label)} className="grid h-10 w-10 place-items-center text-coal-600" aria-label={`Show ${g.label}`} aria-expanded={expanded === g.label}>
                        <ChevronDown className={`h-5 w-5 transition-transform duration-300 ${expanded === g.label ? 'rotate-180 text-accent' : ''}`} />
                      </button>
                    )}
                  </div>
                  {g.items && (
                    <div className={`grid transition-all duration-500 ${expanded === g.label ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
                      <ul className="overflow-hidden">
                        {g.items.map((item) => (
                          <li key={item.label}><ItemLink item={item} onClick={() => setOpen(false)} className="block px-6 py-2.5 text-sm font-medium text-coal-600 hover:text-accent" /></li>
                        ))}
                        <li className="h-3" />
                      </ul>
                    </div>
                  )}
                </li>
              ))}
            </ul>
            <div className="grid gap-3 border-t border-coal-200 p-5">
              <Link to="/partner/apply" className="inline-flex items-center justify-center gap-2 rounded-full bg-accent px-6 py-4 font-display font-semibold uppercase tracking-[0.08em] text-white">Request Access <ArrowUpRight className="h-4 w-4" /></Link>
              <Link to="/partner/login" className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-coal px-6 py-3.5 font-display font-semibold uppercase tracking-[0.08em] text-coal"><LogIn className="h-4 w-4" /> Partner Sign In</Link>
            </div>
          </aside>
        </div>
      )}
    </header>
  );
}
