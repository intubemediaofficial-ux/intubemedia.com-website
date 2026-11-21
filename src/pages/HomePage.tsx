import { Link } from 'react-router-dom';
import { ArrowRight, BadgeCheck, Headphones, Play, TrendingUp } from 'lucide-react';
import SEO from '../components/SEO';
import NetworkSection from '../components/NetworkSection';
import { EqBars, Eyebrow, SectionHeading, btnGhost, btnPrimary } from '../components/site/ui';
import {
  ArtistsGrid,
  ContactSection,
  CtaPanel,
  EcosystemGrid,
  JourneySection,
  PlatformsStrip,
  ServicesGrid,
} from '../components/site/sections';
import { artists, highlights } from '../data/company';

const stats = [
  { value: '10', label: 'Platforms we own & run' },
  { value: '24/7', label: 'Live streaming' },
  { value: '4', label: 'Streaming apps' },
  { value: '1', label: 'Team, end to end' },
];

function Hero() {
  const [lead, ...rest] = artists;
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-brand-pale to-white pb-20 pt-28 sm:pt-36">
      <div className="site-grid-bg absolute inset-0 opacity-70" />
      <div className="absolute -left-40 top-20 h-96 w-96 rounded-full bg-brand/10 blur-3xl" />
      <div className="absolute -right-40 bottom-0 h-96 w-96 rounded-full bg-brand-light/15 blur-3xl" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
        <div>
          <Eyebrow>India&apos;s Music, Media &amp; Tech Network</Eyebrow>
          <h1 className="text-4xl font-extrabold leading-[1.05] text-navy sm:text-5xl lg:text-6xl xl:text-[4.25rem]">
            Indian music,
            <span className="block bg-gradient-to-r from-brand to-brand-light bg-clip-text pb-1 text-transparent">on every screen.</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted">
            Intube Media distributes, protects and streams music for artists and labels — with our own YouTube CMS, OTT, music and live platforms working together under one roof.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link to="/contact" className={btnPrimary}>Release Your Music <ArrowRight className="h-4 w-4" /></Link>
            <Link to="/platforms" className={btnGhost}><Play className="h-4 w-4" /> Explore Our Platforms</Link>
          </div>
          <div className="mt-10 grid max-w-xl grid-cols-2 gap-4">
            {highlights.map(({ icon: Icon, title, text }) => (
              <div key={title} className="flex items-start gap-3">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white text-brand shadow-card">
                  <Icon className="h-4 w-4" />
                </span>
                <span>
                  <span className="block text-sm font-bold text-navy">{title}</span>
                  <span className="block text-xs text-muted">{text}</span>
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-lg">
          <div className="relative overflow-hidden rounded-[2rem] border-8 border-white bg-navy shadow-soft">
            <img src={lead.image} alt={`${lead.name} — ${lead.genre}`} className="aspect-[4/3] w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/30 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-6">
              <p className="inline-block rounded-full bg-brand px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white">Now trending</p>
              <p className="mt-1 font-display text-2xl font-extrabold text-white">{lead.name}</p>
              <p className="text-sm text-blue-100/80">{lead.genre}</p>
              <EqBars className="mt-4 h-8" bars={28} />
            </div>
          </div>

          <div className="absolute -left-4 top-8 hidden animate-floaty items-center gap-3 rounded-2xl bg-white p-3 pr-5 shadow-soft sm:flex">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600"><TrendingUp className="h-5 w-5" /></span>
            <span><span className="block text-xs text-muted">Monthly streams</span><span className="font-display font-extrabold text-navy">Growing fast</span></span>
          </div>
          <div className="absolute -right-4 bottom-24 hidden animate-floaty items-center gap-3 rounded-2xl bg-white p-3 pr-5 shadow-soft [animation-delay:1.5s] sm:flex">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-pale text-brand"><BadgeCheck className="h-5 w-5" /></span>
            <span><span className="block text-xs text-muted">Content ID</span><span className="font-display font-extrabold text-navy">Protected</span></span>
          </div>

          <div className="mt-5 flex items-center gap-3 rounded-2xl border border-brand-line bg-white p-3 shadow-card">
            <div className="flex shrink-0 -space-x-3">
              {rest.map(artist => (
                <img key={artist.slug} src={artist.image} alt={artist.name} className="h-10 w-10 rounded-full border-2 border-white object-cover" />
              ))}
            </div>
            <p className="text-sm text-muted"><span className="font-bold text-navy">Artists &amp; labels</span> already growing with us</p>
            <Headphones className="ml-auto hidden h-5 w-5 text-brand sm:block" />
          </div>
        </div>
      </div>
    </section>
  );
}

function About() {
  return (
    <section id="about" className="scroll-mt-20 bg-white py-20 sm:py-24">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
        <div>
          <SectionHeading eyebrow="About Intube Media" title="One network for music," highlight="media and technology."
            text="We started by helping regional artists get their songs online. Today Intube Media is a full network: a record label, a YouTube CMS, streaming apps, live broadcasting and creator tools — all built and run by our own team in India." />
          <p className="-mt-6 leading-relaxed text-muted">
            That means fewer middlemen, faster releases and clear reporting. Artists keep ownership of their work, while we handle delivery, rights protection and growth across every screen.
          </p>
          <Link to="/about" className={`${btnGhost} mt-8`}>More About Us <ArrowRight className="h-4 w-4" /></Link>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {stats.map((stat, index) => (
            <div key={stat.label} className={`rounded-3xl border border-brand-line p-7 shadow-card ${index === 0 || index === 3 ? 'bg-navy text-white' : 'bg-brand-pale'}`}>
              <p className={`font-display text-4xl font-extrabold sm:text-5xl ${index === 0 || index === 3 ? 'text-brand-light' : 'text-brand'}`}>{stat.value}</p>
              <p className={`mt-2 text-sm font-semibold ${index === 0 || index === 3 ? 'text-blue-100/80' : 'text-navy/70'}`}>{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function HomePage() {
  return (
    <>
      <SEO
        title="Intube Media — Music Distribution, YouTube CMS & Streaming Network"
        description="Intube Media is an Indian music, media and technology network: worldwide music distribution, YouTube CMS and Content ID, artist development, OTT streaming, live broadcasting and creator tools."
        path="/"
        jsonLd={{
          '@context': 'https://schema.org',
          '@type': 'Organization',
          name: 'Intube Media',
          url: 'https://intubemedia.com',
          description: 'Indian music, media and technology network.',
        }}
      />
      <Hero />
      <PlatformsStrip />
      <About />

      <section id="services" className="scroll-mt-20 bg-brand-pale py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
            <SectionHeading eyebrow="What We Do" title="Services built for" highlight="artists & labels." text="Everything a release needs — from studio to store, channel to royalty report." />
            <Link to="/services" className={`${btnGhost} mb-12 self-start lg:self-auto`}>All Services <ArrowRight className="h-4 w-4" /></Link>
          </div>
          <ServicesGrid />
        </div>
      </section>

      <section id="artists" className="scroll-mt-20 bg-white py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
            <SectionHeading eyebrow="Our Artists" title="Voices we are" highlight="proud to amplify." text="Folk, Rasiya and devotional artists releasing through the Intube Media and Bainsla Music network." />
            <Link to="/artists" className={`${btnGhost} mb-12 self-start lg:self-auto`}>View Roster <ArrowRight className="h-4 w-4" /></Link>
          </div>
          <ArtistsGrid />
        </div>
      </section>

      <section id="platforms" className="scroll-mt-20 bg-brand-pale py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading eyebrow="Our Ecosystem" title="Platforms we build" highlight="and run ourselves." center
            text="This is what Intube Media does every day — each product below is owned and operated by our team." />
          <EcosystemGrid />
        </div>
      </section>

      <JourneySection />
      <NetworkSection />
      <CtaPanel />
      <ContactSection />
    </>
  );
}
