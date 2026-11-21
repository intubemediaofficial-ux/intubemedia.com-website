export interface HeroSlide {
  id: string;
  eyebrow: string;
  title: string;
  highlight: string;
  description: string;
  image: string;
  cta_label: string;
  cta_link: string;
  cta2_label: string;
  cta2_link: string;
}

export const defaultHeroSlides: HeroSlide[] = [
  {
    id: 'network',
    eyebrow: 'Music • Media • Technology',
    title: 'Indian music.',
    highlight: 'Every screen.',
    description: 'Intube Media is the network behind artists, labels and channels — distribution, YouTube CMS, OTT, 24/7 live streaming and the technology that powers them.',
    image: '/images/hero/hero-studio.jpg',
    cta_label: 'Request Partner Access',
    cta_link: '/partner/apply',
    cta2_label: 'Explore Our Platforms',
    cta2_link: '/platforms',
  },
  {
    id: 'cms',
    eyebrow: 'YouTube CMS • Content ID',
    title: 'Every channel.',
    highlight: 'One dashboard.',
    description: 'Manage all your YouTube channels together — Content ID, claims, analytics and monthly revenue reports on cms.intubemedia.com.',
    image: '/images/hero/hero-control.jpg',
    cta_label: 'Open Intube CMS',
    cta_link: 'https://cms.intubemedia.com/',
    cta2_label: 'Our Services',
    cta2_link: '/services',
  },
  {
    id: 'live',
    eyebrow: 'IntubeLive • 24/7 Streaming',
    title: 'Go live 24/7.',
    highlight: 'No PC needed.',
    description: 'Our cloud studio keeps YouTube, Facebook and custom RTMP lives running round the clock — schedule playlists and run many channels at once.',
    image: '/images/hero/hero-live.jpg',
    cta_label: 'Start on IntubeLive',
    cta_link: 'https://intubelive.com/',
    cta2_label: 'See All Platforms',
    cta2_link: '/platforms',
  },
  {
    id: 'distribution',
    eyebrow: 'Worldwide Distribution',
    title: 'Your release.',
    highlight: 'Worldwide.',
    description: 'Spotify, Apple Music, JioSaavn, YouTube Music, Instagram and more — we deliver, protect and report on every release.',
    image: '/images/hero/hero-global.jpg',
    cta_label: 'Apply for Partnership',
    cta_link: '/partner/apply',
    cta2_label: 'How It Works',
    cta2_link: '/#journey',
  },
  {
    id: 'ott',
    eyebrow: 'Intube Play • OTT',
    title: 'Movies, bhakti & Rasiya.',
    highlight: 'Streaming now.',
    description: 'Intube Play brings films, music videos, devotional and live channels to the web and Android — our own OTT for regional India.',
    image: '/images/hero/hero-ott.jpg',
    cta_label: 'Watch on Intube Play',
    cta_link: 'https://intubeplay.com/',
    cta2_label: 'Meet Our Artists',
    cta2_link: '/artists',
  },
];

export function parseHeroSlides(raw: string | undefined): HeroSlide[] {
  if (!raw) return defaultHeroSlides;
  try {
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return defaultHeroSlides;
    const slides = parsed
      .filter((slide) => slide && typeof slide === 'object' && (slide.title || slide.highlight))
      .map((slide, index) => ({ ...defaultHeroSlides[0], id: `slide-${index}`, ...slide }) as HeroSlide);
    return slides.length ? slides : defaultHeroSlides;
  } catch {
    return defaultHeroSlides;
  }
}

export function resolveImage(src: string, apiUrl: string): string {
  if (src.startsWith('/uploads/')) return `${apiUrl}${src}`;
  return src;
}
