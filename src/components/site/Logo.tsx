import { Link } from 'react-router-dom';

export function LogoMark({ className = 'h-10 w-10' }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden="true">
      <defs>
        <linearGradient id="im-g" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#ff4d3d" />
          <stop offset="0.55" stopColor="#e11d2a" />
          <stop offset="1" stopColor="#9b0f1a" />
        </linearGradient>
      </defs>
      <rect width="48" height="48" rx="14" fill="url(#im-g)" />
      <rect x="1" y="1" width="46" height="46" rx="13" fill="none" stroke="rgba(255,255,255,.35)" />
      <path d="M17 14.5v19l15-9.5z" fill="#fff" />
      <rect x="11" y="19" width="2.6" height="10" rx="1.3" fill="#fff" opacity=".8" />
      <rect x="35" y="17" width="2.6" height="14" rx="1.3" fill="#fff" opacity=".8" />
    </svg>
  );
}

export default function Logo({ to = '/', subtitle = 'Music • Media • Tech', dark = false }: { to?: string; subtitle?: string; dark?: boolean }) {
  return (
    <Link to={to} className="group flex items-center gap-3" aria-label="Intube Media home">
      <LogoMark className="h-10 w-10 transition-transform duration-500 group-hover:rotate-[-8deg] group-hover:scale-105" />
      <span className="leading-none">
        <span className={`block font-display text-[1.3rem] font-bold uppercase tracking-wide transition-colors ${dark ? 'text-coal' : 'text-white'}`}>
          Intube<span className="text-accent"> Media</span>
        </span>
        <span className={`mt-0.5 block text-[0.58rem] font-semibold uppercase tracking-[0.3em] transition-colors ${dark ? 'text-coal-400' : 'text-white/60'}`}>{subtitle}</span>
      </span>
    </Link>
  );
}
