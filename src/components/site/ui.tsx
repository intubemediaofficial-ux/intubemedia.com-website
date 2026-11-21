import { useEffect, useRef, type ReactNode } from 'react';
import Breadcrumbs from '../Breadcrumbs';

export const btnPrimary =
  'group inline-flex items-center justify-center gap-2 rounded-full bg-aurora px-6 py-3.5 text-sm font-bold text-white shadow-glow transition duration-300 hover:-translate-y-0.5 hover:brightness-110';
export const btnGhost =
  'group inline-flex items-center justify-center gap-2 rounded-full border border-white/15 bg-white/5 px-6 py-3.5 text-sm font-bold text-white backdrop-blur transition duration-300 hover:-translate-y-0.5 hover:border-white/30 hover:bg-white/10';
export const btnLight =
  'group inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-bold text-ink transition duration-300 hover:-translate-y-0.5 hover:bg-white/90';

export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3.5 py-1.5 text-[0.68rem] font-bold uppercase tracking-[0.24em] text-brand-light">
      <span className="h-1.5 w-1.5 rounded-full bg-brand-cyan shadow-[0_0_12px_#22d3ee]" />
      {children}
    </span>
  );
}

export function SectionHeading({
  eyebrow, title, highlight, description, align = 'center', children,
}: { eyebrow: string; title: string; highlight?: string; description?: string; align?: 'center' | 'left'; children?: ReactNode }) {
  const centered = align === 'center';
  return (
    <Reveal className={centered ? 'mx-auto max-w-3xl text-center' : 'max-w-2xl'}>
      <Eyebrow>{eyebrow}</Eyebrow>
      <h2 className="mt-5 text-4xl font-bold leading-[1.05] text-white sm:text-5xl lg:text-[3.6rem]">
        {title}
        {highlight && <span className="block text-aurora pb-1">{highlight}</span>}
      </h2>
      {description && <p className={`mt-5 text-base leading-relaxed text-mist sm:text-lg ${centered ? 'mx-auto max-w-2xl' : ''}`}>{description}</p>}
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
  eyebrow, title, highlight, description, children,
}: { eyebrow: string; title: string; highlight?: string; description: string; children?: ReactNode }) {
  return (
    <section className="noise relative overflow-hidden pb-20 pt-32 sm:pt-40">
      <div className="site-grid-bg absolute inset-0 [mask-image:radial-gradient(ellipse_at_top,#000_30%,transparent_75%)]" />
      <Glow className="-top-40 left-1/2 h-[520px] w-[820px] -translate-x-1/2 bg-brand/30" />
      <Glow className="right-[-10%] top-20 h-72 w-72 bg-brand-violet/25" />
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <Breadcrumbs />
        <div className="mt-10 max-w-4xl animate-rise">
          <Eyebrow>{eyebrow}</Eyebrow>
          <h1 className="mt-6 text-5xl font-bold leading-[1.02] text-white sm:text-6xl lg:text-7xl">
            {title}
            {highlight && <span className="block text-aurora pb-2">{highlight}</span>}
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-mist">{description}</p>
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
          className="w-[3px] origin-bottom animate-eq rounded-full bg-gradient-to-t from-brand to-brand-cyan"
          style={{ height: `${30 + ((i * 37) % 70)}%`, animationDelay: `${(i % 7) * 0.13}s` }}
        />
      ))}
    </div>
  );
}

export function BrowserFrame({ src, alt, url, className = '' }: { src: string; alt: string; url: string; className?: string }) {
  return (
    <div className={`overflow-hidden rounded-2xl border border-white/10 bg-ink-800 shadow-card ${className}`}>
      <div className="flex items-center gap-2 border-b border-white/10 bg-white/[0.03] px-4 py-2.5">
        <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
        <span className="ml-3 truncate rounded-md bg-white/5 px-3 py-1 text-[0.7rem] text-mist">{url}</span>
      </div>
      <img src={src} alt={alt} loading="lazy" className="block aspect-[16/10] w-full object-cover object-top" />
    </div>
  );
}
