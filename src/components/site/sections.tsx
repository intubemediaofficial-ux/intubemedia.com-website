import { Link } from 'react-router-dom';
import { ArrowUpRight, CheckCircle2, Mail, MapPin, Radio, Youtube, LayoutDashboard, Activity, PlayCircle } from 'lucide-react';
import { useCms } from '../../context/useCms';
import { artists, companyServices, ecosystem, journey, labelChannels, storePlatforms, highlights } from '../../data/company';
import { platformShots } from '../../data/platformShots';
import ContactForm from './ContactForm';
import { BrowserFrame, btnGhost, btnLight, btnPrimary, Eyebrow, Glow, Reveal, SectionHeading } from './ui';


export function HighlightsBar() {
  return (
    <section className="relative z-10 -mt-px border-y border-white/10 bg-ink-900/80 backdrop-blur">
      <div className="mx-auto grid max-w-7xl grid-cols-2 divide-white/10 px-5 sm:px-8 lg:grid-cols-4 lg:divide-x">
        {highlights.map(({ icon: Icon, title, text }) => (
          <div key={title} className="flex items-center gap-4 py-6 lg:px-6">
            <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-brand/15 text-brand-light ring-1 ring-brand/30"><Icon className="h-5 w-5" /></span>
            <span>
              <span className="block text-sm font-bold text-white">{title}</span>
              <span className="block text-xs text-mist">{text}</span>
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}

export function PlatformsStrip() {
  const row = [...storePlatforms, ...storePlatforms];
  return (
    <section className="relative overflow-hidden py-16">
      <p className="text-center text-xs font-bold uppercase tracking-[0.3em] text-mist">Your music on the world’s listening platforms</p>
      <div className="mask-fade-x mt-8 overflow-hidden">
        <div className="flex w-max animate-marquee gap-4 hover:[animation-play-state:paused]">
          {row.map((platform, i) => (
            <span key={`${platform.name}-${i}`} className="glass flex items-center gap-3 rounded-full px-6 py-3 text-sm font-semibold text-white/90">
              <span className="h-2.5 w-2.5 rounded-full" style={{ background: platform.color, boxShadow: `0 0 14px ${platform.color}` }} />
              {platform.name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ServicesGrid({ detailed = false }: { detailed?: boolean }) {
  return (
    <section id="services" className="relative py-24 sm:py-32">
      <Glow className="left-[-10%] top-40 h-96 w-96 bg-brand/20" />
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading eyebrow="What we do" title="More than distribution." highlight="A full music & media company." description="Six connected services — run by one team, on our own platforms — so artists, labels and channels can grow without juggling vendors." />
        <div className="mt-16 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {companyServices.map((service, i) => {
            const Icon = service.icon;
            return (
              <Reveal key={service.id} delay={i * 70}>
                <article id={service.id} className="border-gradient group relative h-full overflow-hidden rounded-3xl bg-ink-800/70 p-8 transition duration-500 hover:-translate-y-1 hover:bg-ink-700/70">
                  <div className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-brand/0 blur-3xl transition duration-700 group-hover:bg-brand/30" />
                  <div className="flex items-start justify-between">
                    <span className="grid h-14 w-14 place-items-center rounded-2xl bg-aurora text-white shadow-glow"><Icon className="h-6 w-6" /></span>
                    <span className="font-display text-sm font-bold text-white/25">{service.number}</span>
                  </div>
                  <p className="mt-7 text-xs font-bold uppercase tracking-[0.22em] text-brand-cyan">{service.label}</p>
                  <h3 className="mt-2 text-2xl font-bold text-white">{service.title}</h3>
                  <p className="mt-4 text-sm leading-relaxed text-mist">{service.summary}</p>
                  {detailed && (
                    <ul className="mt-6 space-y-2.5">
                      {service.points.map((point) => (
                        <li key={point} className="flex items-center gap-2.5 text-sm text-white/85"><CheckCircle2 className="h-4 w-4 text-brand-cyan" />{point}</li>
                      ))}
                    </ul>
                  )}
                </article>
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
          <SectionHeading align="left" eyebrow="Our artists" title="The voices behind" highlight="our network." description="Singers and producers whose songs fill weddings, temples and playlists — released, protected and grown with Intube Media." />
          <Link to="/artists" className={btnGhost}>All artists <ArrowUpRight className="h-4 w-4" /></Link>
        </div>
        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {artists.map((artist, i) => (
            <Reveal key={artist.slug} delay={i * 80}>
              <article className="group relative aspect-[3/4] overflow-hidden rounded-3xl border border-white/10 bg-ink-800">
                <img src={artist.image} alt={artist.name} loading="lazy" className="absolute inset-0 h-full w-full object-cover transition duration-[1200ms] group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-transparent" />
                <span className="absolute left-5 top-5 rounded-full border border-white/20 bg-ink/50 px-3 py-1 text-[0.65rem] font-bold uppercase tracking-[0.2em] text-white backdrop-blur">{artist.role}</span>
                <div className="absolute inset-x-0 bottom-0 p-6">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-cyan">{artist.genre}</p>
                  <h3 className="mt-1.5 text-2xl font-bold text-white">{artist.name}</h3>
                  <p className="mt-2 max-h-0 overflow-hidden text-sm leading-relaxed text-white/75 opacity-0 transition-all duration-500 group-hover:max-h-40 group-hover:opacity-100">{artist.bio}</p>
                  {artist.youtube && (
                    <a href={artist.youtube} target="_blank" rel="noopener noreferrer" className="mt-3 inline-flex items-center gap-1.5 text-xs font-bold text-white hover:text-brand-cyan"><Youtube className="h-4 w-4" /> YouTube</a>
                  )}
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function LabelChannels() {
  return (
    <section className="py-16">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="glass rounded-3xl p-8 sm:p-12">
          <Eyebrow>Label channels we manage</Eyebrow>
          <div className="mt-8 flex flex-wrap gap-3">
            {labelChannels.map((channel) => (
              <span key={channel} className="rounded-full border border-white/10 bg-white/5 px-5 py-2.5 text-sm font-semibold text-white">{channel}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export function EcosystemGrid({ limit }: { limit?: number }) {
  const items = limit ? ecosystem.slice(0, limit) : ecosystem;
  return (
    <section id="platforms" className="relative py-24 sm:py-32">
      <Glow className="right-[-10%] top-20 h-[420px] w-[420px] bg-brand-violet/20" />
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading eyebrow="The Intube ecosystem" title="Our own platforms." highlight="Built and run in-house." description="Every product below is designed, hosted and operated by Intube Media. Click any card to open the live platform." />
        <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {items.map((product, i) => {
            const Icon = product.icon;
            const shot = platformShots[product.domain];
            return (
              <Reveal key={product.domain} delay={(i % 3) * 80} className={product.featured && i < 2 ? 'lg:col-span-1' : ''}>
                <a href={product.url} target="_blank" rel="noopener noreferrer" className="border-gradient group relative flex h-full flex-col overflow-hidden rounded-3xl bg-ink-800/80 transition duration-500 hover:-translate-y-1.5 hover:shadow-glow">
                  {shot && (
                    <div className="relative aspect-[16/10] overflow-hidden border-b border-white/10">
                      <img src={shot} alt={`${product.name} website`} loading="lazy" className="h-full w-full object-cover object-top transition duration-[1200ms] group-hover:scale-105" />
                      <div className="absolute inset-0 bg-gradient-to-t from-ink-800 via-transparent to-transparent" />
                      <span className="absolute left-4 top-4 rounded-full bg-ink/70 px-3 py-1 text-[0.65rem] font-bold uppercase tracking-[0.18em] text-brand-cyan backdrop-blur">{product.category}</span>
                    </div>
                  )}
                  <div className="flex flex-1 flex-col p-7">
                    <div className="flex items-center gap-3">
                      <span className="grid h-11 w-11 place-items-center rounded-xl bg-aurora text-white"><Icon className="h-5 w-5" /></span>
                      <div>
                        <h3 className="text-lg font-bold text-white">{product.name}</h3>
                        <p className="text-xs text-mist">{product.domain}</p>
                      </div>
                    </div>
                    <p className="mt-4 flex-1 text-sm leading-relaxed text-mist">{product.description}</p>
                    <div className="mt-5 flex flex-wrap gap-2">
                      {product.highlights.map((h) => <span key={h} className="rounded-full bg-white/5 px-3 py-1 text-[0.7rem] font-semibold text-white/80">{h}</span>)}
                    </div>
                    <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-bold text-white">Visit {product.domain} <ArrowUpRight className="h-4 w-4 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" /></span>
                  </div>
                </a>
              </Reveal>
            );
          })}
        </div>
        {limit && (
          <div className="mt-12 text-center"><Link to="/platforms" className={btnGhost}>See all {ecosystem.length} platforms <ArrowUpRight className="h-4 w-4" /></Link></div>
        )}
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
    <div className="glass absolute -bottom-10 -left-4 hidden w-72 rounded-2xl p-4 shadow-card sm:block lg:-left-6">
      <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-brand-cyan"><LayoutDashboard className="h-3.5 w-3.5" /> All channels</p>
      <ul className="mt-3 space-y-2">
        {channels.map((c) => (
          <li key={c.name} className="flex items-center justify-between rounded-xl bg-white/5 px-3 py-2 text-xs">
            <span className="flex items-center gap-2 text-white"><Youtube className="h-3.5 w-3.5 text-[#ff3d3d]" />{c.name}</span>
            <span className="text-mist">{c.status}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function LiveBoardMock() {
  return (
    <div className="glass absolute -bottom-10 -right-4 hidden w-64 rounded-2xl p-4 shadow-card sm:block lg:-right-6">
      <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-brand-hot"><Radio className="h-3.5 w-3.5" /> Live now</p>
      {['Bhajan Live 24/7', 'Rasiya Non-Stop', 'Music Mix 24/7'].map((name) => (
        <div key={name} className="mt-2 flex items-center justify-between rounded-xl bg-white/5 px-3 py-2 text-xs text-white">
          <span className="flex items-center gap-2"><span className="h-2 w-2 animate-pulse rounded-full bg-brand-hot" />{name}</span>
          <Activity className="h-3.5 w-3.5 text-brand-cyan" />
        </div>
      ))}
    </div>
  );
}

export function ProductShowcases() {
  const rows = [
    {
      id: 'channel-management',
      eyebrow: 'Channel management • cms.intubemedia.com',
      title: 'Every YouTube channel.',
      highlight: 'Managed in one place.',
      text: 'Our CMS brings all partner channels into a single dashboard. Labels and creators see analytics, Content ID claims, videos and monthly revenue for every channel together — while our team protects the catalogue and handles disputes.',
      points: ['All channels together in one login', 'Content ID protection & claim handling', 'Channel analytics, revenue & payment reports', 'Role-based access for labels, creators & teams'],
      shot: '/images/platforms/cms.jpg',
      url: 'cms.intubemedia.com',
      link: 'https://cms.intubemedia.com/',
      cta: 'Open Intube CMS',
      mock: <ChannelBoardMock />,
      reverse: false,
    },
    {
      id: 'live-streaming',
      eyebrow: 'Live streaming software • intubelive.com',
      title: 'Go live 24/7.',
      highlight: 'Without a PC running.',
      text: 'IntubeLive is our cloud live-streaming software. Upload videos once and stream them non-stop to YouTube, Facebook, Twitch or any RTMP destination — schedule daily playlists and run many channels from one panel.',
      points: ['24/7 cloud streaming, no hardware', 'YouTube, Facebook, Twitch & custom RTMP', 'Daily schedules, playlists & auto-live', 'Multiple channels and servers in one panel'],
      shot: '/images/platforms/intubelive.jpg',
      url: 'intubelive.com',
      link: 'https://intubelive.com/',
      cta: 'Start on IntubeLive',
      mock: <LiveBoardMock />,
      reverse: true,
    },
  ];
  return (
    <section className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl space-y-32 px-5 sm:px-8">
        {rows.map((row) => (
          <div key={row.id} id={row.id} className="grid items-center gap-14 lg:grid-cols-2">
            <Reveal className={row.reverse ? 'lg:order-2' : ''}>
              <Eyebrow>{row.eyebrow}</Eyebrow>
              <h2 className="mt-5 text-4xl font-bold leading-[1.05] text-white sm:text-5xl">{row.title}<span className="block text-aurora pb-1">{row.highlight}</span></h2>
              <p className="mt-5 text-base leading-relaxed text-mist sm:text-lg">{row.text}</p>
              <ul className="mt-7 grid gap-3 sm:grid-cols-2">
                {row.points.map((p) => <li key={p} className="flex items-start gap-2.5 text-sm text-white/85"><CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-brand-cyan" />{p}</li>)}
              </ul>
              <a href={row.link} target="_blank" rel="noopener noreferrer" className={`${btnPrimary} mt-9`}>{row.cta} <ArrowUpRight className="h-4 w-4" /></a>
            </Reveal>
            <Reveal delay={150} className={`relative ${row.reverse ? 'lg:order-1' : ''}`}>
              <div className="absolute -inset-8 rounded-[3rem] bg-brand/20 blur-3xl" />
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
  return (
    <section id="journey" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading eyebrow="How it works" title="From first conversation" highlight="to your next release." />
        <div className="relative mt-16 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          <div className="absolute left-0 right-0 top-12 hidden h-px bg-gradient-to-r from-transparent via-brand/50 to-transparent lg:block" />
          {journey.map(({ icon: Icon, title, text }, i) => (
            <Reveal key={title} delay={i * 100}>
              <div className="glass relative h-full rounded-3xl p-7">
                <div className="flex items-center justify-between">
                  <span className="grid h-14 w-14 place-items-center rounded-2xl bg-ink-700 text-brand-light ring-1 ring-white/10"><Icon className="h-6 w-6" /></span>
                  <span className="font-display text-4xl font-extrabold text-white/10">0{i + 1}</span>
                </div>
                <h3 className="mt-6 text-lg font-bold text-white">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-mist">{text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function CtaPanel({ title = 'Let’s build your next chapter together.', text = 'We work with selected artists, labels and channel owners. Apply for partner access and our team will reply personally.' }: { title?: string; text?: string }) {
  const { theme } = useCms();
  return (
    <section className="py-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal>
          <div className="noise relative overflow-hidden rounded-[2.5rem] bg-aurora p-10 sm:p-16">
            <div className="absolute -right-20 -top-20 h-80 w-80 animate-spinslow rounded-full border-[40px] border-white/10" />
            <div className="absolute -bottom-24 left-1/3 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
            <div className="relative max-w-2xl">
              <p className="text-xs font-bold uppercase tracking-[0.3em] text-white/80">Invitation-based partnerships</p>
              <h2 className="mt-4 text-4xl font-extrabold leading-tight text-white sm:text-5xl">{title}</h2>
              <p className="mt-5 text-lg text-white/85">{text}</p>
              <div className="mt-9 flex flex-wrap gap-3">
                <Link to="/partner/apply" className={btnLight}>Request Partner Access <ArrowUpRight className="h-4 w-4" /></Link>
                <a href={`mailto:${theme.email}`} className="inline-flex items-center gap-2 rounded-full border border-white/40 px-6 py-3.5 text-sm font-bold text-white transition hover:bg-white/10"><Mail className="h-4 w-4" /> {theme.email}</a>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export function ContactSection() {
  const { theme } = useCms();
  return (
    <section id="contact" className="relative py-24 sm:py-32">
      <Glow className="left-1/4 top-1/3 h-96 w-96 bg-brand/20" />
      <div className="relative mx-auto grid max-w-7xl gap-12 px-5 sm:px-8 lg:grid-cols-[0.9fr_1.1fr]">
        <Reveal>
          <SectionHeading align="left" eyebrow="Let’s connect" title="Have a song, a channel" highlight="or an idea?" description="Talk to our team about distribution, YouTube CMS, live streaming, OTT or a technology project." />
          <div className="mt-10 space-y-4">
            <a href={`mailto:${theme.email}`} className="glass flex items-center gap-4 rounded-2xl p-5 transition hover:bg-white/10">
              <span className="grid h-12 w-12 place-items-center rounded-xl bg-aurora text-white"><Mail className="h-5 w-5" /></span>
              <span><span className="block text-xs font-bold uppercase tracking-[0.2em] text-mist">Email us</span><span className="block text-lg font-bold text-white">{theme.email}</span></span>
            </a>
            <div className="glass flex items-center gap-4 rounded-2xl p-5">
              <span className="grid h-12 w-12 place-items-center rounded-xl bg-ink-700 text-brand-light ring-1 ring-white/10"><MapPin className="h-5 w-5" /></span>
              <span><span className="block text-xs font-bold uppercase tracking-[0.2em] text-mist">Based in</span><span className="block text-lg font-bold text-white">{theme.address}</span></span>
            </div>
            <Link to="/partner/login" className="glass flex items-center gap-4 rounded-2xl p-5 transition hover:bg-white/10">
              <span className="grid h-12 w-12 place-items-center rounded-xl bg-ink-700 text-brand-light ring-1 ring-white/10"><PlayCircle className="h-5 w-5" /></span>
              <span><span className="block text-xs font-bold uppercase tracking-[0.2em] text-mist">Already a partner?</span><span className="block text-lg font-bold text-white">Sign in to your workspace</span></span>
            </Link>
          </div>
        </Reveal>
        <Reveal delay={120}><ContactForm /></Reveal>
      </div>
    </section>
  );
}
