import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, ChevronLeft, ChevronRight, Play } from 'lucide-react';
import { useCms } from '../../context/useCms';
import { API_URL } from '../../utils/api';
import { parseHeroSlides, resolveImage, type HeroSlide } from '../../data/heroSlides';
import { btnGhost, btnPrimary, EqBars, Glow } from './ui';

const SLIDE_MS = 7000;

function SmartLink({ to, className, children }: { to: string; className: string; children: React.ReactNode }) {
  if (/^https?:\/\//.test(to)) {
    return <a href={to} target="_blank" rel="noopener noreferrer" className={className}>{children}</a>;
  }
  return <Link to={to} className={className}>{children}</Link>;
}

export default function HeroSlider() {
  const { theme } = useCms();
  const slides = useMemo<HeroSlide[]>(() => parseHeroSlides(theme.hero_slides), [theme.hero_slides]);
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const touchX = useRef<number | null>(null);
  const active = Math.min(index, slides.length - 1);

  const go = useCallback((next: number) => setIndex((next + slides.length) % slides.length), [slides.length]);

  useEffect(() => {
    if (paused || slides.length < 2) return;
    const timer = window.setTimeout(() => go(active + 1), SLIDE_MS);
    return () => window.clearTimeout(timer);
  }, [active, paused, go, slides.length]);

  const slide = slides[active];

  return (
    <section
      className="noise relative isolate min-h-[100svh] overflow-hidden bg-ink"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onTouchStart={(e) => { touchX.current = e.touches[0].clientX; }}
      onTouchEnd={(e) => {
        if (touchX.current === null) return;
        const delta = e.changedTouches[0].clientX - touchX.current;
        if (Math.abs(delta) > 50) go(active + (delta < 0 ? 1 : -1));
        touchX.current = null;
      }}
      aria-roledescription="carousel"
    >
      {slides.map((item, i) => (
        <div
          key={item.id}
          className={`absolute inset-0 -z-10 transition-opacity duration-[1400ms] ${i === active ? 'opacity-100' : 'opacity-0'}`}
          aria-hidden={i !== active}
        >
          <img
            src={resolveImage(item.image, API_URL)}
            alt=""
            className={`h-full w-full object-cover ${i === active ? 'animate-kenburns' : ''}`}
            loading={i === 0 ? 'eager' : 'lazy'}
          />
        </div>
      ))}
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-ink via-ink/85 to-ink/30" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-ink via-transparent to-ink/60" />
      <div className="site-grid-bg absolute inset-0 -z-10 opacity-60 [mask-image:linear-gradient(90deg,#000,transparent_70%)]" />
      <Glow className="-left-40 top-1/3 -z-10 h-[480px] w-[480px] bg-brand/35" />
      <Glow className="bottom-0 right-0 -z-10 h-80 w-80 bg-brand-violet/25" />

      <div className="relative mx-auto flex min-h-[100svh] max-w-7xl flex-col justify-center px-5 pb-36 pt-32 sm:px-8">
        <div key={slide.id} className="max-w-3xl">
          <span className="inline-flex animate-rise items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-[0.7rem] font-bold uppercase tracking-[0.26em] text-brand-light backdrop-blur">
            <span className="relative flex h-2 w-2"><span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-hot opacity-70" /><span className="relative h-2 w-2 rounded-full bg-brand-hot" /></span>
            {slide.eyebrow}
          </span>
          <h1 className="mt-7 animate-rise text-[3.1rem] font-extrabold leading-[0.98] text-white [animation-delay:120ms] sm:text-7xl lg:text-[6.2rem]">
            {slide.title}
            <span className="block text-aurora pb-3">{slide.highlight}</span>
          </h1>
          <p className="mt-6 max-w-xl animate-rise text-base leading-relaxed text-white/75 [animation-delay:240ms] sm:text-lg">{slide.description}</p>
          <div className="mt-10 flex animate-rise flex-wrap gap-3 [animation-delay:360ms]">
            {slide.cta_label && (
              <SmartLink to={slide.cta_link || '/partner/apply'} className={btnPrimary}>
                {slide.cta_label}
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </SmartLink>
            )}
            {slide.cta2_label && (
              <SmartLink to={slide.cta2_link || '/platforms'} className={btnGhost}>
                <Play className="h-4 w-4 fill-current" />
                {slide.cta2_label}
              </SmartLink>
            )}
          </div>
        </div>

        <EqBars className="absolute bottom-40 right-8 hidden h-16 opacity-70 lg:flex" bars={28} />

        <div className="absolute inset-x-5 bottom-10 flex items-end justify-between gap-6 sm:inset-x-8">
          <div className="flex flex-1 gap-3 sm:max-w-2xl">
            {slides.map((item, i) => (
              <button
                key={item.id}
                type="button"
                onClick={() => go(i)}
                className="group flex-1 text-left"
                aria-label={`Show slide ${i + 1}`}
                aria-current={i === active}
              >
                <span className="block h-[3px] overflow-hidden rounded-full bg-white/15">
                  {i === active ? (
                    <span
                      key={`${item.id}-${paused}`}
                      className="block h-full origin-left animate-progress bg-aurora"
                      style={{ animationDuration: `${SLIDE_MS}ms`, animationPlayState: paused ? 'paused' : 'running' }}
                    />
                  ) : (
                    <span className={`block h-full bg-white/40 ${i < active ? 'w-full' : 'w-0'}`} />
                  )}
                </span>
                <span className={`mt-3 hidden truncate text-xs font-semibold uppercase tracking-[0.18em] transition sm:block ${i === active ? 'text-white' : 'text-white/40 group-hover:text-white/70'}`}>
                  {String(i + 1).padStart(2, '0')} · {item.eyebrow.split('•')[0]}
                </span>
              </button>
            ))}
          </div>
          <div className="flex gap-2">
            <button type="button" onClick={() => go(active - 1)} className="grid h-12 w-12 place-items-center rounded-full border border-white/15 bg-white/5 text-white backdrop-blur transition hover:bg-white/15" aria-label="Previous slide">
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button type="button" onClick={() => go(active + 1)} className="grid h-12 w-12 place-items-center rounded-full border border-white/15 bg-white/5 text-white backdrop-blur transition hover:bg-white/15" aria-label="Next slide">
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
