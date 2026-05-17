import { Instagram, Youtube, Facebook, Twitter, Linkedin, ArrowUp } from 'lucide-react';

const footerLinks = [
  {
    title: 'Services',
    links: [
      { label: 'Website Development', href: '#services' },
      { label: 'Digital Marketing', href: '#services' },
      { label: 'Branding & Creative', href: '#services' },
      { label: 'AI & Automation', href: '#services' },
      { label: 'IT Support', href: '#services' },
    ],
  },
  {
    title: 'Creator Solutions',
    links: [
      { label: 'Account Management', href: '#influencer' },
      { label: 'Monetization', href: '#influencer' },
      { label: 'Copyright Help', href: '#influencer' },
      { label: 'Content Production', href: '#influencer' },
      { label: 'Growth Services', href: '#influencer' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About Us', href: '#about' },
      { label: 'Packages', href: '#packages' },
      { label: 'Contact', href: '#contact' },
      { label: 'Careers', href: '#contact' },
      { label: 'Blog', href: '#' },
    ],
  },
];

const socials = [
  { icon: <Instagram size={18} />, href: '#', label: 'Instagram' },
  { icon: <Youtube size={18} />, href: '#', label: 'YouTube' },
  { icon: <Facebook size={18} />, href: '#', label: 'Facebook' },
  { icon: <Twitter size={18} />, href: '#', label: 'Twitter' },
  { icon: <Linkedin size={18} />, href: '#', label: 'LinkedIn' },
];

export default function Footer() {
  return (
    <footer className="relative border-t border-white/10 bg-black/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-violet-600 to-pink-500 flex items-center justify-center font-bold text-white text-lg">
                iM
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-violet-400 to-pink-400 bg-clip-text text-transparent">
                Intube Media
              </span>
            </div>
            <p className="text-gray-400 text-sm max-w-sm mb-6">
              Your one-stop digital partner for business IT solutions,
              influencer management, digital marketing, and creative services.
            </p>
            <div className="flex gap-3">
              {socials.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
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
                    <a
                      href={link.href}
                      className="text-sm text-gray-400 hover:text-white transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-500">
            &copy; {new Date().getFullYear()} Intube Media. All rights reserved.
          </p>
          <a
            href="#home"
            className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:border-violet-500/30 transition-all"
            aria-label="Back to top"
          >
            <ArrowUp size={18} />
          </a>
        </div>
      </div>
    </footer>
  );
}
