import type { ReactNode } from 'react';
import Breadcrumbs from '../Breadcrumbs';

export const btnPrimary =
  'inline-flex items-center justify-center gap-2 rounded-xl bg-brand px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-brand/25 transition hover:bg-brand-dark';
export const btnGhost =
  'inline-flex items-center justify-center gap-2 rounded-xl border border-brand-line bg-white px-6 py-3.5 text-sm font-semibold text-navy transition hover:border-brand hover:text-brand';
export const btnLight =
  'inline-flex items-center justify-center gap-2 rounded-xl bg-white px-6 py-3.5 text-sm font-semibold text-navy transition hover:bg-brand-pale';
export const btnOutlineLight =
  'inline-flex items-center justify-center gap-2 rounded-xl border border-white/30 px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-white/10';

export function Eyebrow({ children, light = false }: { children: ReactNode; light?: boolean }) {
  return (
    <p className={`mb-4 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.22em] ${light ? 'text-brand-light' : 'text-brand'}`}>
      <span className={`h-px w-6 ${light ? 'bg-brand-light' : 'bg-brand'}`} />
      {children}
    </p>
  );
}

interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  highlight?: string;
  text?: string;
  center?: boolean;
  light?: boolean;
}

export function SectionHeading({ eyebrow, title, highlight, text, center = false, light = false }: SectionHeadingProps) {
  return (
    <div className={`mb-12 max-w-3xl ${center ? 'mx-auto text-center' : ''}`}>
      <Eyebrow light={light}>{eyebrow}</Eyebrow>
      <h2 className={`text-3xl font-extrabold leading-[1.1] sm:text-4xl lg:text-5xl ${light ? 'text-white' : 'text-navy'}`}>
        {title}
        {highlight && <span className={`block ${light ? 'text-brand-light' : 'text-brand'}`}>{highlight}</span>}
      </h2>
      {text && <p className={`mt-5 text-base leading-relaxed sm:text-lg ${light ? 'text-blue-100/80' : 'text-muted'}`}>{text}</p>}
    </div>
  );
}

interface PageHeroProps {
  eyebrow: string;
  title: string;
  highlight?: string;
  text: string;
  children?: ReactNode;
}

export function PageHero({ eyebrow, title, highlight, text, children }: PageHeroProps) {
  return (
    <section className="relative overflow-hidden bg-brand-pale pb-16 pt-28 sm:pt-32">
      <div className="site-grid-bg absolute inset-0 opacity-70" />
      <div className="absolute -right-32 -top-32 h-96 w-96 rounded-full bg-brand/10 blur-3xl" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Breadcrumbs />
        <div className="mt-6 max-w-3xl">
          <Eyebrow>{eyebrow}</Eyebrow>
          <h1 className="text-4xl font-extrabold leading-[1.05] text-navy sm:text-5xl lg:text-6xl">
            {title}
            {highlight && <span className="block text-brand">{highlight}</span>}
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-muted">{text}</p>
          {children && <div className="mt-8 flex flex-wrap gap-3">{children}</div>}
        </div>
      </div>
    </section>
  );
}

export function EqBars({ className = '', bars = 18 }: { className?: string; bars?: number }) {
  return (
    <div className={`flex h-12 items-end gap-1 ${className}`} aria-hidden="true">
      {Array.from({ length: bars }).map((_, index) => (
        <span
          key={index}
          className="w-1.5 origin-bottom animate-eq rounded-full bg-brand-light"
          style={{ height: `${30 + ((index * 37) % 70)}%`, animationDelay: `${(index % 6) * 0.15}s` }}
        />
      ))}
    </div>
  );
}
