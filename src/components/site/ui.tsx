import { useEffect, useRef, type ReactNode } from 'react';
import Breadcrumbs from '../Breadcrumbs';

export const btnPrimary =
  'group inline-flex items-center justify-center gap-2 rounded-full bg-accent px-7 py-3.5 font-display text-sm font-semibold uppercase tracking-[0.12em] text-white shadow-[0_14px_30px_-12px_rgba(225,29,42,0.8)] transition duration-300 hover:-translate-y-0.5 hover:bg-accent-dark';
export const btnGhost =
  'group inline-flex items-center justify-center gap-2 rounded-full border-2 border-coal px-7 py-3 font-display text-sm font-semibold uppercase tracking-[0.12em] text-coal transition duration-300 hover:-translate-y-0.5 hover:bg-coal hover:text-white';
export const btnLight =
  'group inline-flex items-center justify-center gap-2 rounded-full border border-white/40 bg-white/10 px-7 py-3.5 font-display text-sm font-semibold uppercase tracking-[0.12em] text-white backdrop-blur transition duration-300 hover:-translate-y-0.5 hover:bg-white hover:text-coal';

export function Confetti({ className = '' }: { className?: string }) {
  return (
    <span aria-hidden="true" className={`confetti ${className}`}>
      <i className="left-0 top-2 h-2 w-2 bg-navy" />
      <i className="left-2.5 top-0 h-1.5 w-1.5 bg-accent" />
      <i className="left-3 top-3 h-3 w-3 bg-accent" />
      <i className="left-[18px] top-1 h-1.5 w-1.5 bg-navy/60" />
      <i className="left-1 top-[15px] h-1 w-1 bg-accent/60" />
    </span>
  );
}

export function Eyebrow({ children, light = false }: { children: ReactNode; light?: boolean }) {
  return (
    <span className={`inline-flex items-center gap-2 font-display text-xs font-semibold uppercase tracking-[0.28em] ${light ? 'text-white/85' : 'text-accent'}`}>
      <Confetti />
      {children}
    </span>
  );
}

export function SectionHeading({
  eyebrow, title, highlight, description, align = 'center', light = false, children,
}: { eyebrow: string; title: string; highlight?: string; description?: string; align?: 'center' | 'left'; light?: boolean; children?: ReactNode }) {
  const centered = align === 'center';
  return (
    <Reveal className={centered ? 'mx-auto max-w-3xl text-center' : 'max-w-2xl'}>
      <Eyebrow light={light}>{eyebrow}</Eyebrow>
      <h2 className={`mt-4 font-display text-4xl font-bold uppercase leading-[1.02] sm:text-5xl lg:text-[3.4rem] ${light ? 'text-white' : 'text-coal'}`}>
        {title}
        {highlight && <span className="block text-red-grad pb-1">{highlight}</span>}
      </h2>
      <span className={`sec-bar mt-5 ${centered ? 'mx-auto' : ''}`} />
      {description && <p className={`mt-5 text-base leading-relaxed sm:text-lg ${light ? 'text-white/70' : 'text-coal-600'} ${centered ? 'mx-auto max-w-2xl' : ''}`}>{description}</p>}
      {children}
    </Reveal>
  );
}

export function Reveal({ children, className = '', delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (typeof IntersectionObserver === 'undefined') {
      node.classList.add('is-visible');
      return;
    }
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        node.classList.add('is-visible');
        observer.disconnect();
      }
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    observer.observe(node);
    return () => observer.disconnect();
  }, []);
  return <div ref={ref} className={`reveal ${className}`} style={{ transitionDelay: `${delay}ms` }}>{children}</div>;
}

export function Glow({ className = '' }: { className?: string }) {
  return <div aria-hidden="true" className={`pointer-events-none absolute rounded-full blur-[120px] ${className}`} />;
}

export function PageHero({
  eyebrow, title, highlight, description, image = '/images/hero/hero-control.jpg', children,
}: { eyebrow: string; title: string; highlight?: string; description: string; image?: string; children?: ReactNode }) {
  return (
    <section className="relative isolate overflow-hidden bg-coal pb-24 pt-36 sm:pt-44">
      <img src={image} alt="" className="absolute inset-0 -z-10 h-full w-full animate-kenburns object-cover opacity-45" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-coal via-coal/85 to-coal/40" />
      <div className="absolute inset-x-0 bottom-0 -z-10 h-24 bg-gradient-to-t from-coal to-transparent" />
      <div className="absolute -left-20 top-1/3 -z-10 h-72 w-72 rounded-full bg-accent/30 blur-[110px]" />
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <Breadcrumbs />
        <div className="mt-10 max-w-4xl animate-rise">
          <Eyebrow light>{eyebrow}</Eyebrow>
          <h1 className="mt-5 font-display text-5xl font-bold uppercase leading-[0.98] text-white sm:text-6xl lg:text-7xl">
            {title}
            {highlight && <span className="block text-red-grad pb-2">{highlight}</span>}
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/75">{description}</p>
          {children && <div className="mt-9 flex flex-wrap gap-3">{children}</div>}
        </div>
      </div>
    </section>
  );
}

export function EqBars({ className = '', bars = 18 }: { className?: string; bars?: number }) {
  return (
    <div className={`flex h-10 items-end gap-[3px] ${className}`} aria-hidden="true">
      {Array.from({ length: bars }).map((_, i) => (
        <span
          key={i}
          className="w-[3px] origin-bottom animate-eq rounded-full bg-gradient-to-t from-accent to-[#ff8a3d]"
          style={{ height: `${30 + ((i * 37) % 70)}%`, animationDelay: `${(i % 7) * 0.13}s` }}
        />
      ))}
    </div>
  );
}

export function BrowserFrame({ src, alt, url, className = '' }: { src: string; alt: string; url: string; className?: string }) {
  return (
    <div className={`overflow-hidden rounded-2xl border border-coal-200 bg-white shadow-[0_40px_80px_-40px_rgba(18,19,24,0.45)] ${className}`}>
      <div className="flex items-center gap-2 border-b border-coal-200 bg-coal-100 px-4 py-2.5">
        <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
        <span className="ml-3 truncate rounded-md bg-white px-3 py-1 text-[0.7rem] text-coal-400">{url}</span>
      </div>
      <img src={src} alt={alt} loading="lazy" className="block aspect-[16/10] w-full object-cover object-top" />
    </div>
  );
}
