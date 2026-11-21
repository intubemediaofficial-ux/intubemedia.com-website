import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, ChevronLeft, ChevronRight, Play } from 'lucide-react';
import { useCms } from '../../context/useCms';
import { API_URL } from '../../utils/api';
import { parseHeroSlides, resolveImage, type HeroSlide } from '../../data/heroSlides';
import { btnLight, btnPrimary, EqBars } from './ui';

const WALL = [
  '/images/platforms/intubeplay.jpg', '/images/artists/dg-mawai.jpg', '/images/platforms/cms.jpg', '/images/hero/hero-studio.jpg',
  '/images/platforms/intubemusic.jpg', '/images/artists/bhumika-sharma.jpg', '/images/platforms/intubelive.jpg', '/images/hero/hero-ott.jpg',
  '/images/platforms/intubedrama.jpg', '/images/artists/rashmi-nishad.jpg', '/images/platforms/bainslamusic.jpg', '/images/hero/hero-live.jpg',
  '/images/platforms/tags.jpg', '/images/artists/ajeet-bainsla.jpg', '/images/platforms/tools.jpg', '/images/hero/hero-global.jpg',
  '/images/platforms/meet.jpg', '/images/creative-studio.jpg', '/images/hero/hero-control.jpg', '/images/digital-marketing.jpg',
];

function VideoWall({ extra }: { extra: string[] }) {
  const pool = [...extra, ...WALL];
  const cols = Array.from({ length: 6 }, (_, c) => pool.filter((_, i) => i % 6 === c).concat(pool.filter((_, i) => (i + 3) % 6 === c)).slice(0, 6));
  return (
    <div aria-hidden="true" className="absolute inset-0 -z-10 grid grid-cols-3 gap-2 p-2 sm:grid-cols-4 lg:grid-cols-6">
      {cols.map((col, c) => (
        <div key={c} className={`overflow-hidden ${c > 2 ? 'hidden sm:block' : ''} ${c > 3 ? 'sm:hidden lg:block' : ''}`}>
          <div className={`flex flex-col gap-2 ${c % 2 ? 'animate-walldown' : 'animate-wallup'}`}>
            {[...col, ...col].map((src, i) => (
              <img key={i} src={src} alt="" loading={i < 3 ? 'eager' : 'lazy'} className="aspect-[4/3] w-full rounded-lg object-cover" />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

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
      className="relative isolate min-h-[100svh] overflow-hidden bg-black"
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
      <VideoWall extra={slides.map((item) => resolveImage(item.image, API_URL))} />
      {slides.map((item, i) => (
        <div key={item.id} className={`absolute inset-0 -z-10 transition-opacity duration-[1400ms] ${i === active ? 'opacity-35' : 'opacity-0'}`} aria-hidden="true">
          <img src={resolveImage(item.image, API_URL)} alt="" className={`h-full w-full object-cover ${i === active ? 'animate-kenburns' : ''}`} loading={i === 0 ? 'eager' : 'lazy'} />
        </div>
      ))}
      <div className="absolute inset-0 -z-10 bg-black/55" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-black/90 via-black/60 to-black/20" />
      <div className="absolute inset-x-0 bottom-0 -z-10 h-48 bg-gradient-to-t from-black to-transparent" />
      <div className="absolute -left-40 top-1/3 -z-10 h-[460px] w-[460px] rounded-full bg-accent/35 blur-[130px]" />

      <div className="relative mx-auto flex min-h-[100svh] max-w-7xl flex-col justify-center px-5 pb-36 pt-32 sm:px-8">
        <div key={slide.id} className="max-w-3xl">
          <span className="inline-flex animate-rise items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 font-display text-xs font-semibold uppercase tracking-[0.26em] text-white backdrop-blur">
            <span className="relative flex h-2 w-2"><span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-70" /><span className="relative h-2 w-2 rounded-full bg-accent" /></span>
            {slide.eyebrow}
          </span>
          <h1 className="mt-7 animate-rise font-display text-[3.2rem] font-bold uppercase leading-[0.95] text-white [animation-delay:120ms] sm:text-7xl lg:text-[6.4rem]">
            {slide.title}
            <span className="block text-red-grad pb-3">{slide.highlight}</span>
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
              <SmartLink to={slide.cta2_link || '/platforms'} className={btnLight}>
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
                      className="block h-full origin-left animate-progress bg-accent"
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
