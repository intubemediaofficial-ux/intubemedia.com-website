import { Link } from 'react-router-dom';
import { ArrowUp, ArrowUpRight, Facebook, Instagram, Linkedin, Mail, MapPin, Twitter, Youtube } from 'lucide-react';
import { useCms } from '../context/useCms';
import { companyServices, ecosystem } from '../data/company';
import Logo from './site/Logo';
import seoLocations from '../data/seo-locations.json';

const company = [
  { label: 'About Us', to: '/about' },
  { label: 'Artists', to: '/artists' },
  { label: 'Platforms', to: '/platforms' },
  { label: 'Bainsla Music', to: '/network/bainsla-music' },
  { label: 'FAQs', to: '/#faq' },
  { label: 'Contact', to: '/contact' },
  { label: 'Partner Sign In', to: '/partner/login' },
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
  const head = 'font-display text-base font-semibold uppercase tracking-[0.12em] text-white after:mt-2 after:block after:h-[2px] after:w-10 after:bg-accent';
  const link = 'text-sm text-white/60 transition hover:translate-x-1 hover:text-white inline-block';

  return (
    <footer className="relative overflow-hidden bg-[#141414] text-white">
      <div className="h-[3px] bg-gradient-to-r from-accent via-[#ff4d3d] to-[#ff8a3d]" />
      <div className="relative mx-auto max-w-7xl px-5 pb-10 pt-20 sm:px-8">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1.2fr_1fr]">
          <div>
            <Logo />
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-white/60">Intube Media is an Indian music, media and technology network — worldwide distribution, YouTube CMS, 24/7 live streaming, OTT apps and production, run by one team.</p>
            <a href={`mailto:${theme.email}`} className="mt-6 flex items-center gap-3 text-sm font-semibold"><span className="grid h-9 w-9 place-items-center rounded-full bg-accent"><Mail className="h-4 w-4" /></span>{theme.email}</a>
            {theme.address && <p className="mt-3 flex items-center gap-3 text-sm text-white/60"><span className="grid h-9 w-9 place-items-center rounded-full bg-white/10"><MapPin className="h-4 w-4" /></span>{theme.address}</p>}
            {socials.length > 0 && (
              <div className="mt-6 flex gap-2">
                {socials.map(({ href, icon: Icon, label }) => (
                  <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label} className="grid h-10 w-10 place-items-center rounded-full bg-white text-coal transition hover:-translate-y-1 hover:bg-accent hover:text-white"><Icon className="h-4 w-4" /></a>
                ))}
              </div>
            )}
          </div>
          <div>
            <h3 className={head}>Company</h3>
            <ul className="mt-6 space-y-3">{company.map((l) => <li key={l.label}><Link to={l.to} className={link}>{l.label}</Link></li>)}</ul>
          </div>
          <div>
            <h3 className={head}>Our Services</h3>
            <ul className="mt-6 space-y-3">{companyServices.map((s) => <li key={s.id}><Link to={`/services/${s.id}`} className={link}>{s.title}</Link></li>)}</ul>
          </div>
          <div>
            <h3 className={head}>Our Platforms</h3>
            <ul className="mt-6 space-y-3">
              {ecosystem.map((p) => (
                <li key={p.domain}><a href={p.url} target="_blank" rel="noopener noreferrer" className={link}>{p.name}<ArrowUpRight className="ml-1 inline h-3 w-3" /></a></li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-x-4 gap-y-2 px-5 py-5 text-xs text-white/50 sm:px-8">
          <span className="font-display uppercase tracking-[0.14em] text-white/70">Music distribution company in:</span>
          {seoLocations.map((l) => <Link key={l.slug} to={`/${l.slug}`} className="hover:text-white">{l.place}</Link>)}
        </div>
      </div>
      <div className="border-t border-white/10 bg-black/40">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-4 px-5 py-6 text-xs text-white/50 sm:flex-row sm:items-center sm:px-8">
          <p>© {new Date().getFullYear()} Intube Media. All rights reserved.</p>
          <div className="flex items-center gap-5 font-display uppercase tracking-[0.12em]">
            <Link to="/about" className="hover:text-white">About</Link>
            <Link to="/contact" className="hover:text-white">Contact</Link>
            <Link to="/partner/apply" className="hover:text-white">Partner</Link>
            <button type="button" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="grid h-9 w-9 place-items-center rounded-full bg-accent text-white transition hover:-translate-y-1" aria-label="Back to top"><ArrowUp className="h-4 w-4" /></button>
          </div>
        </div>
      </div>
    </footer>
  );
}
