import { Link } from 'react-router-dom';
import { Instagram, Youtube, Facebook, Twitter, Linkedin, ArrowUp } from 'lucide-react';
import { useCms } from '../context/useCms';

export default function Footer() {
  const { services, theme } = useCms();
  const footerLinks = [
    {
      title: 'Services',
      links: services.filter(service => service.section === 'business').slice(0, 5)
        .map(service => ({ label: service.title, href: `/services/${service.slug}` })),
    },
    {
      title: 'Creator Solutions',
      links: services.filter(service => service.section === 'influencer').slice(0, 5)
        .map(service => ({ label: service.title, href: `/services/${service.slug}` })),
    },
    {
      title: 'Company',
      links: [
        { label: 'About Us', href: '/about' },
        { label: 'Packages', href: '/packages' },
        { label: 'Contact', href: '/contact' },
        { label: 'All Services', href: '/services' },
      ],
    },
  ];
  const socials = [
    { icon: <Instagram size={18} />, href: theme.instagram, label: 'Instagram' },
    { icon: <Youtube size={18} />, href: theme.youtube, label: 'YouTube' },
    { icon: <Facebook size={18} />, href: theme.facebook, label: 'Facebook' },
    { icon: <Twitter size={18} />, href: theme.twitter, label: 'Twitter' },
    { icon: <Linkedin size={18} />, href: theme.linkedin, label: 'LinkedIn' },
  ].filter(social => social.href);

  return (
    <footer className="relative border-t border-white/10 bg-black/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-10">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div
                className="w-9 h-9 rounded-lg flex items-center justify-center font-bold text-white text-lg"
                style={{ backgroundImage: `linear-gradient(135deg, ${theme.primary_color}, ${theme.secondary_color})` }}
              >
                {theme.logo_short}
              </div>
              <span
                className="text-xl font-bold bg-clip-text text-transparent"
                style={{ backgroundImage: `linear-gradient(90deg, ${theme.primary_color}, ${theme.secondary_color})` }}
              >
                {theme.logo_text}
              </span>
            </Link>
            <p className="text-gray-400 text-sm max-w-sm mb-6">
              {theme.footer_text}
            </p>
            <p className="text-xs text-violet-300 uppercase tracking-[0.16em] mb-6">
              {theme.tagline}
            </p>
            <div className="flex gap-3">
              {socials.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={social.label}
                  className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:border-violet-500/30 transition-all"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {footerLinks.map((section) => (
            <div key={section.title}>
              <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
                {section.title}
              </h4>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.href}
                      className="text-sm text-gray-400 hover:text-white transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Our Network
            </h4>
            <Link
              to="/network/bainsla-music"
              className="block text-sm text-gray-300 hover:text-white transition-colors mb-1"
            >
              Bainsla Music
            </Link>
            <p className="text-xs text-gray-500 mb-3">Music & Entertainment</p>
            <a
              href="https://bainslamusic.com/"
              target="_blank"
              rel="noreferrer"
              className="text-sm text-violet-400 hover:text-violet-300 transition-colors"
            >
              bainslamusic.com ↗
            </a>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-500">
            &copy; {new Date().getFullYear()} {theme.logo_text}. All rights reserved.
          </p>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:border-violet-500/30 transition-all"
            aria-label="Back to top"
          >
            <ArrowUp size={18} />
          </button>
        </div>
      </div>
    </footer>
  );
}
