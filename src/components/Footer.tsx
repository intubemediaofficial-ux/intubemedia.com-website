import { Link } from 'react-router-dom';
import { ArrowUp, ArrowUpRight, Facebook, Instagram, Linkedin, Mail, MapPin, Twitter, Youtube } from 'lucide-react';
import { useCms } from '../context/useCms';
import { ecosystem } from '../data/company';
import Logo from './site/Logo';

const explore = [
  { label: 'Our Services', to: '/services' },
  { label: 'Artists', to: '/artists' },
  { label: 'Platforms', to: '/platforms' },
  { label: 'About Us', to: '/about' },
  { label: 'Our Network', to: '/#our-network' },
  { label: 'Bainsla Music', to: '/network/bainsla-music' },
  { label: 'Contact', to: '/contact' },
];

export default function Footer() {
  const { theme } = useCms();
  const socials = [
    { icon: Instagram, href: theme.instagram, label: 'Instagram' },
    { icon: Youtube, href: theme.youtube, label: 'YouTube' },
    { icon: Facebook, href: theme.facebook, label: 'Facebook' },
    { icon: Twitter, href: theme.twitter, label: 'Twitter' },
    { icon: Linkedin, href: theme.linkedin, label: 'LinkedIn' },
  ].filter(social => social.href);

  return (
    <footer className="bg-navy text-white">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Logo light />
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-blue-100/70">
              Music distribution, YouTube CMS, streaming platforms and creator technology — built in India for artists, labels and creators everywhere.
            </p>
            {socials.length > 0 && (
              <div className="mt-6 flex gap-3">
                {socials.map(({ icon: Icon, href, label }) => (
                  <a key={label} href={href} target="_blank" rel="noreferrer" aria-label={label}
                    className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-blue-100 transition hover:border-brand-light hover:text-white">
                    <Icon size={18} />
                  </a>
                ))}
              </div>
            )}
          </div>

          <div className="lg:col-span-2">
            <h4 className="mb-4 text-sm font-bold uppercase tracking-wider text-white">Explore</h4>
            <ul className="space-y-3">
              {explore.map(link => (
                <li key={link.label}>
                  <Link to={link.to} className="text-sm text-blue-100/70 transition hover:text-white">{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3">
            <h4 className="mb-4 text-sm font-bold uppercase tracking-wider text-white">Our Platforms</h4>
            <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-1">
              {ecosystem.slice(0, 7).map(product => (
                <li key={product.domain}>
                  <a href={product.url} target="_blank" rel="noreferrer" className="group inline-flex items-center gap-1 text-sm text-blue-100/70 transition hover:text-white">
                    {product.name}
                    <ArrowUpRight className="h-3.5 w-3.5 opacity-0 transition group-hover:opacity-100" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3">
            <h4 className="mb-4 text-sm font-bold uppercase tracking-wider text-white">Contact</h4>
            <a href={`mailto:${theme.email}`} className="mb-4 flex items-start gap-3 text-sm text-blue-100/70 transition hover:text-white">
              <Mail className="mt-0.5 h-4 w-4 shrink-0 text-brand-light" /> {theme.email}
            </a>
            <p className="flex items-start gap-3 text-sm text-blue-100/70">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-brand-light" /> {theme.address}
            </p>
            <Link to="/contact" className="mt-6 inline-flex items-center gap-1.5 rounded-xl bg-brand px-5 py-3 text-sm font-semibold text-white transition hover:bg-brand-dark">
              Start a Conversation <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 sm:flex-row">
          <p className="text-center text-sm text-blue-100/60 sm:text-left">
            &copy; {new Date().getFullYear()} {theme.logo_text}. All rights reserved. Part of the Intube Media &amp; Bainsla Music network.
          </p>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-blue-100 transition hover:border-brand-light hover:text-white"
            aria-label="Back to top"
          >
            <ArrowUp size={18} />
          </button>
        </div>
      </div>
    </footer>
  );
}
