import { Link } from 'react-router-dom';
import { ArrowUp, ArrowUpRight, Facebook, Instagram, Linkedin, Mail, Twitter, Youtube } from 'lucide-react';
import { useCms } from '../context/useCms';
import { ecosystem } from '../data/company';
import Logo from './site/Logo';

const explore = [
  { label: 'Services', to: '/services' },
  { label: 'Platforms', to: '/platforms' },
  { label: 'Artists', to: '/artists' },
  { label: 'About Us', to: '/about' },
  { label: 'Bainsla Music', to: '/network/bainsla-music' },
  { label: 'Contact', to: '/contact' },
];

export default function Footer() {
  const { theme } = useCms();
  const socials = [
    { href: theme.youtube, icon: Youtube, label: 'YouTube' },
    { href: theme.instagram, icon: Instagram, label: 'Instagram' },
    { href: theme.facebook, icon: Facebook, label: 'Facebook' },
    { href: theme.twitter, icon: Twitter, label: 'X' },
    { href: theme.linkedin, icon: Linkedin, label: 'LinkedIn' },
  ].filter((s) => s.href);

  return (
    <footer className="noise relative overflow-hidden border-t border-white/10 bg-ink-900">
      <div className="absolute -top-40 left-1/2 h-80 w-[700px] -translate-x-1/2 rounded-full bg-brand/15 blur-[120px]" />
      <div className="relative mx-auto max-w-7xl px-5 pb-10 pt-20 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-[1.3fr_1fr_1fr_1.1fr]">
          <div>
            <Logo />
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-mist">Intube Media is an Indian music, media and technology network — distribution, YouTube CMS, OTT, 24/7 live streaming and creator tools, built and run in-house.</p>
            {socials.length > 0 && (
              <div className="mt-6 flex gap-2">
                {socials.map(({ href, icon: Icon, label }) => (
                  <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label} className="grid h-10 w-10 place-items-center rounded-full border border-white/10 text-white/70 transition hover:border-brand-light hover:text-white"><Icon className="h-4 w-4" /></a>
                ))}
              </div>
            )}
          </div>
          <div>
            <h3 className="text-xs font-bold uppercase tracking-[0.24em] text-white">Explore</h3>
            <ul className="mt-5 space-y-3">
              {explore.map((l) => <li key={l.to}><Link to={l.to} className="text-sm text-mist transition hover:text-white">{l.label}</Link></li>)}
              <li><Link to="/partner/login" className="text-sm text-mist transition hover:text-white">Partner Sign In</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-xs font-bold uppercase tracking-[0.24em] text-white">Our platforms</h3>
            <ul className="mt-5 space-y-3">
              {ecosystem.slice(0, 7).map((p) => (
                <li key={p.domain}><a href={p.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-sm text-mist transition hover:text-white">{p.name}<ArrowUpRight className="h-3 w-3" /></a></li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-xs font-bold uppercase tracking-[0.24em] text-white">Partner with us</h3>
            <p className="mt-5 text-sm leading-relaxed text-mist">Artists, labels and channel owners — apply for a private partnership.</p>
            <Link to="/partner/apply" className="mt-5 inline-flex items-center gap-2 rounded-full bg-aurora px-5 py-3 text-sm font-bold text-white shadow-glow">Request Access <ArrowUpRight className="h-4 w-4" /></Link>
            <a href={`mailto:${theme.email}`} className="mt-5 flex items-center gap-2 text-sm font-semibold text-white"><Mail className="h-4 w-4 text-brand-cyan" />{theme.email}</a>
          </div>
        </div>
        <div className="mt-16 flex flex-col items-start justify-between gap-4 border-t border-white/10 pt-8 text-xs text-mist sm:flex-row sm:items-center">
          <p>© {new Date().getFullYear()} Intube Media. All rights reserved.</p>
          <button type="button" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 font-semibold text-white transition hover:bg-white/10"><ArrowUp className="h-3.5 w-3.5" /> Back to top</button>
        </div>
      </div>
    </footer>
  );
}
