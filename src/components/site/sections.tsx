import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Activity, ArrowRight, ArrowUpRight, CheckCircle2, ChevronLeft, ChevronRight, LayoutDashboard, Mail, MapPin, PlayCircle, Radio, Youtube } from 'lucide-react';
import { useCms } from '../../context/useCms';
import { artists, companyServices, ecosystem, journey, labelChannels, serviceGroups, storePlatforms } from '../../data/company';
import { platformShots } from '../../data/platformShots';
import ContactForm from './ContactForm';
import { BrowserFrame, btnGhost, btnLight, btnPrimary, Eyebrow, Reveal, SectionHeading } from './ui';

const tiles = [
  { id: 'intubelive-service', title: 'Live Streaming', text: '24/7 YouTube lives from the cloud — no PC needed.' },
  { id: 'music-distribution', title: 'Music Distribution', text: 'Your songs on Spotify, JioSaavn, Apple Music & 150+ stores.' },
  { id: 'youtube-cms', title: 'YouTube CMS', text: 'Every channel you manage, in one dashboard.' },
  { id: 'content-id', title: 'Content ID', text: 'Protect your catalogue, handle claims, collect revenue.' },
  { id: 'ott-apps', title: 'OTT & Apps', text: 'Intube Play, Intube Music and Intube Drama.' },
];

export function HighlightsBar() {
  return (
    <section className="relative z-10 -mt-20 px-5 sm:px-8">
      <div className="mx-auto grid max-w-7xl gap-3 sm:grid-cols-2 lg:grid-cols-5">
        {tiles.map((t, i) => {
          const s = companyServices.find((x) => x.id === t.id)!;
          const Icon = s.icon;
          return (
            <Reveal key={s.id} delay={i * 70}>
              <Link to={`/services/${s.id}`} className="card-lift group relative flex h-full flex-col overflow-hidden rounded-2xl border border-coal-200 bg-white p-6 shadow-[0_24px_60px_-34px_rgba(18,19,24,0.5)] hover:border-accent/40">
                <span className="absolute inset-x-0 top-0 h-1 origin-left scale-x-0 bg-gradient-to-r from-accent to-[#ff8a3d] transition-transform duration-500 group-hover:scale-x-100" />
                <span className="grid h-12 w-12 place-items-center rounded-xl bg-accent-soft text-accent transition duration-500 group-hover:bg-accent group-hover:text-white"><Icon className="h-6 w-6" /></span>
                <span className="mt-5 font-display text-lg font-bold uppercase leading-tight text-coal">{t.title}</span>
                <span className="mt-1.5 flex-1 text-xs leading-relaxed text-coal-600">{t.text}</span>
                <span className="mt-4 inline-flex items-center gap-1.5 font-display text-xs font-semibold uppercase tracking-[0.14em] text-accent">Explore <ArrowRight className="h-3.5 w-3.5 transition group-hover:translate-x-1" /></span>
              </Link>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}

export function PlatformsStrip() {
  return (
    <section className="relative py-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading eyebrow="Our presence" title="Your music on" highlight="every major platform." />
        <div className="mt-14 grid grid-cols-2 gap-px overflow-hidden rounded-3xl border border-coal-200 bg-coal-200 sm:grid-cols-3 lg:grid-cols-5">
          {storePlatforms.map((p, i) => (
            <Reveal key={p.name} delay={(i % 5) * 60} className="bg-white">
              <div className="group flex h-28 items-center justify-center gap-3 px-4 transition duration-500 hover:bg-coal-100">
                <span className="h-3 w-3 rounded-full transition duration-500 group-hover:scale-150" style={{ background: p.color, boxShadow: `0 0 18px ${p.color}` }} />
                <span className="font-display text-xl font-bold tracking-wide text-coal transition group-hover:text-[color:var(--c)]" style={{ ['--c' as string]: p.color }}>{p.name}</span>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ServicesGrid({ detailed = false }: { detailed?: boolean }) {
  const [group, setGroup] = useState('All');
  const tabs = ['All', ...serviceGroups];
  const list = group === 'All' ? companyServices : companyServices.filter((s) => s.group === group);
  return (
    <section id="services" className="relative bg-coal-100/70 py-24 sm:py-32">
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading eyebrow="What we do" title="Our services" highlight="One music & media company." description="Distribution, YouTube CMS, live streaming, OTT apps and production — each run by its own specialist team. Click any service to see the details." />
        <div className="no-scrollbar mx-auto mt-12 flex max-w-full gap-2 overflow-x-auto rounded-full border border-coal-200 bg-white p-1.5 shadow-sm sm:w-fit">
          {tabs.map((t) => (
            <button key={t} type="button" onClick={() => setGroup(t)} className={`shrink-0 rounded-full px-5 py-2.5 font-display text-sm font-semibold uppercase tracking-[0.08em] transition duration-300 ${group === t ? 'bg-accent text-white shadow-[0_10px_24px_-10px_rgba(225,29,42,0.9)]' : 'text-coal-600 hover:bg-coal-100 hover:text-coal'}`}>{t}</button>
          ))}
        </div>
        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {list.map((service, i) => {
            const Icon = service.icon;
            return (
              <Reveal key={`${group}-${service.id}`} delay={i * 60}>
                <Link to={`/services/${service.id}`} id={service.id} className="card-lift group relative flex h-full flex-col overflow-hidden rounded-3xl border border-coal-200 bg-white hover:border-accent/30">
                  <div className="relative h-36 overflow-hidden">
                    <img src={service.image} alt="" loading="lazy" className="h-full w-full object-cover transition duration-[1200ms] group-hover:scale-110" />
                    <div className="absolute inset-0 bg-gradient-to-t from-coal/80 via-coal/20 to-transparent" />
                    <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 font-display text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-coal">{service.group}</span>
                    <span className="absolute -bottom-6 right-5 grid h-12 w-12 place-items-center rounded-2xl bg-accent text-white shadow-lg transition duration-500 group-hover:rotate-[-8deg]"><Icon className="h-5 w-5" /></span>
                  </div>
                  <div className="flex flex-1 flex-col p-6 pt-7">
                    <p className="font-display text-xs font-semibold uppercase tracking-[0.2em] text-accent">{service.number} · {service.label}</p>
                    <h3 className="mt-2 font-display text-xl font-bold uppercase leading-tight text-coal">{service.title}</h3>
                    <p className="mt-3 flex-1 text-sm leading-relaxed text-coal-600">{service.summary}</p>
                    {detailed && (
                      <ul className="mt-5 space-y-2">
                        {service.points.map((point) => <li key={point} className="flex items-start gap-2 text-sm text-coal-700"><CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-accent" />{point}</li>)}
                      </ul>
                    )}
                    <span className="mt-5 inline-flex items-center gap-1.5 font-display text-xs font-semibold uppercase tracking-[0.14em] text-coal transition group-hover:text-accent">Know more <ArrowRight className="h-3.5 w-3.5 transition group-hover:translate-x-1" /></span>
                  </div>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export function ArtistsGrid() {
  return (
    <section id="artists" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading align="left" eyebrow="Our artists" title="The voices behind" highlight="our network." />
          <Link to="/artists" className="font-display text-sm font-semibold uppercase tracking-[0.14em] text-accent underline-offset-8 hover:underline">View more →</Link>
        </div>
      </div>
      <div className="mt-14 grid grid-cols-2 lg:grid-cols-4">
        {artists.map((artist, i) => (
          <Reveal key={artist.slug} delay={i * 80}>
            <article className="group relative aspect-[3/4] overflow-hidden bg-coal">
              <img src={artist.image} alt={artist.name} loading="lazy" className="absolute inset-0 h-full w-full object-cover grayscale transition duration-[1200ms] group-hover:scale-105 group-hover:grayscale-0" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 translate-y-6 p-6 transition duration-500 group-hover:translate-y-0">
                <p className="font-display text-xs font-semibold uppercase tracking-[0.2em] text-[#ff6b6b]">{artist.genre}</p>
                <h3 className="mt-1 font-display text-2xl font-bold uppercase text-white sm:text-3xl">{artist.name}</h3>
                <p className="mt-2 max-h-0 overflow-hidden text-sm leading-relaxed text-white/75 opacity-0 transition-all duration-500 group-hover:max-h-40 group-hover:opacity-100">{artist.bio}</p>
                {artist.youtube && <a href={artist.youtube} target="_blank" rel="noopener noreferrer" className="mt-3 inline-flex items-center gap-1.5 text-xs font-bold text-white hover:text-[#ff6b6b]"><Youtube className="h-4 w-4" /> YouTube</a>}
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

export function LabelChannels() {
  const row = [...labelChannels, ...labelChannels, ...labelChannels];
  return (
    <section className="py-20">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading eyebrow="Our clients" title="Label channels" highlight="we manage." />
      </div>
      <div className="mask-fade-x mt-12 overflow-hidden bg-coal-100 py-8">
        <div className="flex w-max animate-marquee gap-5 hover:[animation-play-state:paused]">
          {row.map((channel, i) => (
            <span key={`${channel}-${i}`} className="flex items-center gap-3 rounded-full border border-coal-200 bg-white px-7 py-4 font-display text-lg font-semibold uppercase tracking-wide text-coal shadow-sm">
              <Youtube className="h-5 w-5 text-[#ff0000]" />{channel}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

export function EcosystemGrid({ limit }: { limit?: number }) {
  const items = limit ? ecosystem.slice(0, limit) : ecosystem;
  const track = useRef<HTMLDivElement>(null);
  const scroll = (dir: number) => track.current?.scrollBy({ left: dir * (track.current.clientWidth * 0.8), behavior: 'smooth' });
  const carousel = Boolean(limit);
  return (
    <section id="platforms" className="relative py-24 sm:py-32">
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading align="left" eyebrow="Our platforms" title="Built & run" highlight="by Intube Media." description="Every product below is designed, hosted and operated in-house. Click a card to open the live platform." />
          {carousel ? (
            <div className="flex items-center gap-2">
              <button type="button" onClick={() => scroll(-1)} className="grid h-12 w-12 place-items-center rounded-full border-2 border-coal text-coal transition hover:bg-coal hover:text-white" aria-label="Previous platforms"><ChevronLeft className="h-5 w-5" /></button>
              <button type="button" onClick={() => scroll(1)} className="grid h-12 w-12 place-items-center rounded-full bg-accent text-white transition hover:bg-accent-dark" aria-label="Next platforms"><ChevronRight className="h-5 w-5" /></button>
              <Link to="/platforms" className="ml-3 font-display text-sm font-semibold uppercase tracking-[0.14em] text-accent underline-offset-8 hover:underline">View all</Link>
            </div>
          ) : null}
        </div>
        <div ref={track} className={carousel ? 'no-scrollbar -mx-5 mt-14 flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth px-5 pb-6 sm:-mx-8 sm:px-8' : 'mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3'}>
          {items.map((product, i) => {
            const Icon = product.icon;
            const shot = platformShots[product.domain];
            return (
              <Reveal key={product.domain} delay={(i % 3) * 80} className={carousel ? 'w-[82%] shrink-0 snap-start sm:w-[46%] lg:w-[31%]' : ''}>
                <a href={product.url} target="_blank" rel="noopener noreferrer" className="card-lift group relative flex h-full flex-col overflow-hidden rounded-3xl border border-coal-200 bg-white hover:border-accent/30">
                  {shot && (
                    <div className="relative aspect-[16/10] overflow-hidden border-b border-coal-200">
                      <img src={shot} alt={`${product.name} website`} loading="lazy" className="h-full w-full object-cover object-top transition duration-[1200ms] group-hover:scale-105" />
                      <span className="absolute left-4 top-4 rounded-full bg-accent px-3 py-1 font-display text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-white">{product.category}</span>
                    </div>
                  )}
                  <div className="flex flex-1 flex-col p-7">
                    <div className="flex items-center gap-3">
                      <span className="grid h-11 w-11 place-items-center rounded-xl bg-accent-soft text-accent"><Icon className="h-5 w-5" /></span>
                      <div>
                        <h3 className="font-display text-xl font-bold uppercase text-coal">{product.name}</h3>
                        <p className="text-xs text-coal-400">{product.domain}</p>
                      </div>
                    </div>
                    <p className="mt-4 flex-1 text-sm leading-relaxed text-coal-600">{product.description}</p>
                    <div className="mt-5 flex flex-wrap gap-2">
                      {product.highlights.map((h) => <span key={h} className="rounded-full bg-coal-100 px-3 py-1 text-[0.7rem] font-semibold text-coal-700">{h}</span>)}
                    </div>
                    <span className="mt-6 inline-flex items-center gap-1.5 font-display text-sm font-semibold uppercase tracking-[0.1em] text-accent">Visit {product.domain} <ArrowUpRight className="h-4 w-4 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" /></span>
                  </div>
                </a>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function ChannelBoardMock() {
  const channels = [
    { name: 'Bainsla Music', status: 'Analytics' },
    { name: 'DG Mawai Rasiya', status: 'Content ID' },
    { name: 'Gurjar Rasiya Collection', status: 'Revenue' },
    { name: 'Bainsla Studio', status: 'Claims' },
  ];
  return (
    <div className="absolute -bottom-10 -left-4 hidden w-72 rounded-2xl border border-coal-200 bg-white p-4 shadow-[0_30px_60px_-30px_rgba(18,19,24,0.5)] sm:block lg:-left-6">
      <p className="flex items-center gap-2 font-display text-xs font-semibold uppercase tracking-[0.18em] text-accent"><LayoutDashboard className="h-3.5 w-3.5" /> All channels</p>
      <ul className="mt-3 space-y-2">
        {channels.map((c) => (
          <li key={c.name} className="flex items-center justify-between rounded-xl bg-coal-100 px-3 py-2 text-xs">
            <span className="flex items-center gap-2 font-semibold text-coal"><Youtube className="h-3.5 w-3.5 text-[#ff0000]" />{c.name}</span>
            <span className="text-coal-400">{c.status}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function LiveBoardMock() {
  return (
    <div className="absolute -bottom-10 -right-4 hidden w-64 rounded-2xl border border-coal-200 bg-white p-4 shadow-[0_30px_60px_-30px_rgba(18,19,24,0.5)] sm:block lg:-right-6">
      <p className="flex items-center gap-2 font-display text-xs font-semibold uppercase tracking-[0.18em] text-accent"><Radio className="h-3.5 w-3.5" /> Live now</p>
      {['Bhajan Live 24/7', 'Rasiya Non-Stop', 'Music Mix 24/7'].map((name) => (
        <div key={name} className="mt-2 flex items-center justify-between rounded-xl bg-coal-100 px-3 py-2 text-xs font-semibold text-coal">
          <span className="flex items-center gap-2"><span className="h-2 w-2 animate-pulse rounded-full bg-accent" />{name}</span>
          <Activity className="h-3.5 w-3.5 text-accent" />
        </div>
      ))}
    </div>
  );
}

export function ProductShowcases() {
  const rows = [
    {
      id: 'channel-management', eyebrow: 'YouTube CMS • cms.intubemedia.com', title: 'Every YouTube channel.', highlight: 'Managed in one place.',
      text: 'Our CMS brings all partner channels into a single dashboard. Labels and creators see analytics, Content ID claims, videos and monthly revenue for every channel together — while our team protects the catalogue and handles disputes.',
      points: ['All channels together in one login', 'Content ID protection & claim handling', 'Channel analytics, revenue & payment reports', 'Role-based access for labels, creators & teams'],
      shot: '/images/platforms/cms.jpg', url: 'cms.intubemedia.com', link: 'https://cms.intubemedia.com/', cta: 'Open Intube CMS', more: '/services/youtube-cms', mock: <ChannelBoardMock />, reverse: false,
    },
    {
      id: 'live-streaming', eyebrow: 'Live streaming software • intubelive.com', title: 'Go live 24/7.', highlight: 'Without a PC running.',
      text: 'IntubeLive is our cloud live-streaming software. Upload videos once and stream them non-stop to YouTube, Facebook, Twitch or any RTMP destination — schedule daily playlists and run many channels from one panel.',
      points: ['24/7 cloud streaming, no hardware', 'YouTube, Facebook, Twitch & custom RTMP', 'Weekly planner for 20+ channels', '₹1,000 / $10 per live channel a month'],
      shot: '/images/platforms/intubelive.jpg', url: 'intubelive.com', link: 'https://intubelive.com/', cta: 'Start on IntubeLive', more: '/services/intubelive-service', mock: <LiveBoardMock />, reverse: true,
    },
  ];
  return (
    <section className="relative overflow-hidden py-24 sm:py-32">
      <div className="absolute right-0 top-1/3 -z-10 h-[70%] w-[55%] -skew-y-6 bg-gradient-to-br from-accent to-[#ff7a3d] opacity-[0.07]" />
      <div className="mx-auto max-w-7xl space-y-32 px-5 sm:px-8">
        {rows.map((row) => (
          <div key={row.id} id={row.id} className="grid scroll-mt-28 items-center gap-14 lg:grid-cols-2">
            <Reveal className={row.reverse ? 'lg:order-2' : ''}>
              <Eyebrow>{row.eyebrow}</Eyebrow>
              <h2 className="mt-4 font-display text-4xl font-bold uppercase leading-[1.02] text-coal sm:text-5xl">{row.title}<span className="block text-red-grad pb-1">{row.highlight}</span></h2>
              <span className="sec-bar mt-5" />
              <p className="mt-5 text-base leading-relaxed text-coal-600 sm:text-lg">{row.text}</p>
              <ul className="mt-7 grid gap-3 sm:grid-cols-2">
                {row.points.map((p) => <li key={p} className="flex items-start gap-2.5 text-sm font-medium text-coal-700"><CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-accent" />{p}</li>)}
              </ul>
              <div className="mt-9 flex flex-wrap gap-3">
                <a href={row.link} target="_blank" rel="noopener noreferrer" className={btnPrimary}>{row.cta} <ArrowUpRight className="h-4 w-4" /></a>
                <Link to={row.more} className={btnGhost}>Know more</Link>
              </div>
            </Reveal>
            <Reveal delay={150} className={`relative ${row.reverse ? 'lg:order-1' : ''}`}>
              <a href={row.link} target="_blank" rel="noopener noreferrer" className="relative block transition duration-500 hover:-translate-y-1">
                <BrowserFrame src={row.shot} alt={`${row.url} screenshot`} url={`https://${row.url}`} />
              </a>
              {row.mock}
            </Reveal>
          </div>
        ))}
      </div>
    </section>
  );
}

export function JourneySection() {
  const [step, setStep] = useState(0);
  const current = journey[step];
  const Icon = current.icon;
  return (
    <section id="journey" className="relative overflow-hidden bg-coal py-24 text-white sm:py-32">
      <div className="absolute -left-32 top-10 h-96 w-96 rounded-full bg-accent/25 blur-[130px]" />
      <div className="relative mx-auto grid max-w-7xl items-center gap-16 px-5 sm:px-8 lg:grid-cols-2">
        <div>
          <SectionHeading align="left" light eyebrow="How it works" title="From first call" highlight="to your next release." />
          <div className="mt-10 space-y-3">
            {journey.map((j, i) => (
              <button key={j.title} type="button" onMouseEnter={() => setStep(i)} onClick={() => setStep(i)} className={`flex w-full items-center gap-5 rounded-2xl border px-5 py-4 text-left transition duration-500 ${i === step ? 'border-accent bg-accent/15 pl-7' : 'border-white/10 hover:border-white/30'}`}>
                <span className={`font-display text-3xl font-bold ${i === step ? 'text-accent' : 'text-white/25'}`}>0{i + 1}</span>
                <span>
                  <span className="block font-display text-lg font-semibold uppercase tracking-wide">{j.title}</span>
                  <span className={`block overflow-hidden text-sm text-white/65 transition-all duration-500 ${i === step ? 'max-h-20 opacity-100' : 'max-h-0 opacity-0'}`}>{j.text}</span>
                </span>
              </button>
            ))}
          </div>
        </div>
        <Reveal className="relative mx-auto aspect-square w-full max-w-md">
          <div className="absolute inset-0 animate-spinslow rounded-full bg-[repeating-radial-gradient(circle_at_center,#1b1c22_0_2px,#0b0b0e_2px_5px)] shadow-[0_40px_120px_-30px_rgba(225,29,42,0.6)]" />
          <div className="absolute inset-[30%] grid place-items-center rounded-full bg-gradient-to-br from-accent to-[#ff7a3d] shadow-inner">
            <div key={step} className="animate-rise text-center">
              <Icon className="mx-auto h-9 w-9 text-white" />
              <p className="mt-2 font-display text-sm font-bold uppercase tracking-[0.18em]">Step 0{step + 1}</p>
            </div>
          </div>
          <span className="absolute left-1/2 top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white" />
          {journey.map((j, i) => (
            <span key={j.title} className={`absolute rounded-full px-3 py-1 font-display text-xs font-semibold uppercase tracking-[0.14em] transition duration-500 ${i === step ? 'bg-white text-coal' : 'bg-white/10 text-white/70'} ${['left-1/2 top-2 -translate-x-1/2', 'right-0 top-1/2 -translate-y-1/2', 'bottom-2 left-1/2 -translate-x-1/2', 'left-0 top-1/2 -translate-y-1/2'][i % 4]}`}>{j.title.split(' ')[0]}</span>
          ))}
        </Reveal>
      </div>
    </section>
  );
}

export function CtaPanel({ title = 'Let’s build your next chapter together.', text = 'We work with selected artists, labels and channel owners. Apply for partner access and our team will reply personally.' }: { title?: string; text?: string }) {
  const { theme } = useCms();
  return (
    <section className="relative overflow-hidden bg-accent py-20 text-white">
      <div className="absolute inset-y-0 right-0 w-1/2 bg-[linear-gradient(115deg,transparent_0%,transparent_30%,rgba(0,0,0,0.18)_30%)]" />
      <div className="absolute -right-24 -top-24 h-80 w-80 animate-spinslow rounded-full border-[40px] border-white/10" />
      <div className="relative mx-auto flex max-w-7xl flex-col items-start justify-between gap-8 px-5 sm:px-8 lg:flex-row lg:items-center">
        <Reveal className="max-w-2xl">
          <p className="font-display text-sm font-semibold uppercase tracking-[0.28em] text-white/80">Invitation-based partnerships</p>
          <h2 className="mt-3 font-display text-4xl font-bold uppercase leading-tight sm:text-5xl">{title}</h2>
          <p className="mt-4 text-lg text-white/85">{text}</p>
        </Reveal>
        <Reveal delay={120} className="flex flex-wrap gap-3">
          <Link to="/partner/apply" className="inline-flex items-center gap-2 rounded-full bg-white px-7 py-4 font-display text-sm font-semibold uppercase tracking-[0.12em] text-accent transition hover:-translate-y-0.5">Request Partner Access <ArrowUpRight className="h-4 w-4" /></Link>
          <a href={`mailto:${theme.email}`} className={btnLight}><Mail className="h-4 w-4" /> Email us</a>
        </Reveal>
      </div>
    </section>
  );
}

export function ContactSection() {
  const { theme } = useCms();
  const card = 'card-lift flex items-center gap-4 rounded-2xl border border-coal-200 bg-white p-5';
  return (
    <section id="contact" className="relative py-24 sm:py-32">
      <div className="relative mx-auto grid max-w-7xl gap-12 px-5 sm:px-8 lg:grid-cols-[0.9fr_1.1fr]">
        <Reveal>
          <SectionHeading align="left" eyebrow="Let’s connect" title="Have a song," highlight="a channel or an idea?" description="Talk to our team about distribution, YouTube CMS, live streaming, OTT or a technology project." />
          <div className="mt-10 space-y-4">
            <a href={`mailto:${theme.email}`} className={card}>
              <span className="grid h-12 w-12 place-items-center rounded-xl bg-accent text-white"><Mail className="h-5 w-5" /></span>
              <span><span className="block font-display text-xs font-semibold uppercase tracking-[0.2em] text-coal-400">Email us</span><span className="block text-lg font-semibold text-coal">{theme.email}</span></span>
            </a>
            <div className={card}>
              <span className="grid h-12 w-12 place-items-center rounded-xl bg-accent-soft text-accent"><MapPin className="h-5 w-5" /></span>
              <span><span className="block font-display text-xs font-semibold uppercase tracking-[0.2em] text-coal-400">Based in</span><span className="block text-lg font-semibold text-coal">{theme.address}</span></span>
            </div>
            <Link to="/partner/login" className={card}>
              <span className="grid h-12 w-12 place-items-center rounded-xl bg-accent-soft text-accent"><PlayCircle className="h-5 w-5" /></span>
              <span><span className="block font-display text-xs font-semibold uppercase tracking-[0.2em] text-coal-400">Already a partner?</span><span className="block text-lg font-semibold text-coal">Sign in to your workspace</span></span>
            </Link>
          </div>
        </Reveal>
        <Reveal delay={120}><ContactForm /></Reveal>
      </div>
    </section>
  );
}

const faqs = [
  { q: 'Which stores do you deliver music to?', a: 'Spotify, Apple Music, JioSaavn, Amazon Music, YouTube Music, Instagram and Facebook, Wynk, Gaana and 150+ stores and social platforms worldwide.' },
  { q: 'Is Intube Media open to every artist?', a: 'We work with selected artists, labels and distributors. Send a partner request with your catalogue and links — our team reviews every application personally and replies by email.' },
  { q: 'What is the difference between YouTube CMS and IntubeLive?', a: 'YouTube CMS manages and protects your channels and catalogue — Content ID, claims, analytics and revenue. IntubeLive is our cloud software that keeps YouTube lives running 24/7 from pre-recorded videos.' },
  { q: 'Can I move my catalogue from another distributor?', a: 'Yes. We migrate releases with their existing ISRC/UPC codes so stream counts and history stay with your songs.' },
  { q: 'How do I see my royalties?', a: 'Approved partners sign in to a private dashboard with release status, channel reports and monthly revenue statements.' },
  { q: 'How much does IntubeLive cost?', a: '₹1,000 or $10 per live channel a month. 5 lives are ₹5,000 ($50) and 10 lives are ₹10,000 ($100), with a 3-day free trial.' },
];

export function FaqSection() {
  const [open, setOpen] = useState(0);
  return (
    <section id="faq" className="relative scroll-mt-24 bg-coal-100/70 py-24 sm:py-32">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 sm:px-8 lg:grid-cols-[0.8fr_1.2fr]">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <SectionHeading align="left" eyebrow="FAQs" title="Have a question?" highlight="We're listening." description="Everything artists, labels and channel owners usually ask before working with us." />
          <Link to="/contact" className={`${btnPrimary} mt-8`}>Ask our team <ArrowUpRight className="h-4 w-4" /></Link>
        </div>
        <div className="space-y-3">
          {faqs.map((f, i) => (
            <Reveal key={f.q} delay={i * 50}>
              <div className={`overflow-hidden rounded-2xl border bg-white transition duration-500 ${open === i ? 'border-accent/40 shadow-[0_24px_50px_-30px_rgba(225,29,42,0.5)]' : 'border-coal-200'}`}>
                <button type="button" onClick={() => setOpen(open === i ? -1 : i)} aria-expanded={open === i} className="flex w-full items-center justify-between gap-4 p-6 text-left font-display text-lg font-semibold text-coal">
                  {f.q}
                  <span className={`grid h-9 w-9 shrink-0 place-items-center rounded-full text-xl transition duration-500 ${open === i ? 'rotate-45 bg-accent text-white' : 'bg-coal-100 text-coal'}`}>+</span>
                </button>
                <div className={`grid transition-all duration-500 ${open === i ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}>
                  <p className="overflow-hidden px-6 text-coal-600"><span className="block pb-6 leading-relaxed">{f.a}</span></p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ClaritySection() {
  const items = [
    { k: 'Monthly', t: 'Revenue statements', d: 'Store, YouTube and Content ID earnings in one clear report.' },
    { k: 'Live', t: 'Release tracking', d: 'See when every song is delivered, live and claimed.' },
    { k: '1 login', t: 'All your channels', d: 'Every linked channel and asset in a single CMS view.' },
    { k: 'Real people', t: 'Partner support', d: 'A named team on email and WhatsApp — no ticket queues.' },
  ];
  return (
    <section className="relative py-24">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 sm:px-8 lg:grid-cols-2 lg:items-center">
        <SectionHeading align="left" eyebrow="Transparency" title="Clarity for the" highlight="business of music." description="Know what you earn, where your music is and who is handling it. Every partner gets the same reports our own label uses." />
        <div className="grid gap-4 sm:grid-cols-2">
          {items.map((x, i) => (
            <Reveal key={x.t} delay={i * 80}>
              <div className="card-lift h-full rounded-3xl border border-coal-200 bg-white p-6 hover:border-accent/30">
                <p className="font-display text-3xl font-bold uppercase text-red-grad">{x.k}</p>
                <p className="mt-2 font-semibold text-coal">{x.t}</p>
                <p className="mt-1 text-sm text-coal-600">{x.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
