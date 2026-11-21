import { Link } from 'react-router-dom';
import { useCms } from '../../context/useCms';

export default function Logo({ light = false }: { light?: boolean }) {
  const { theme } = useCms();
  return (
    <Link to="/" className="flex items-center gap-2.5" aria-label={`${theme.logo_text} home`}>
      <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-brand to-brand-light font-display text-lg font-extrabold text-white shadow-lg shadow-brand/30">
        {theme.logo_short}
      </span>
      <span className="leading-tight">
        <span className={`block font-display text-lg font-extrabold ${light ? 'text-white' : 'text-navy'}`}>{theme.logo_text}</span>
        <span className={`block text-[10px] font-bold uppercase tracking-[0.2em] ${light ? 'text-brand-light' : 'text-brand'}`}>
          Music • Media • Tech
        </span>
      </span>
    </Link>
  );
}
