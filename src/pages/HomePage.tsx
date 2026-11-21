import { Link } from 'react-router-dom';
import { ArrowUpRight, Disc3, Globe2, LogIn, Radio, ShieldCheck } from 'lucide-react';
import SEO from '../components/SEO';
import NetworkSection from '../components/NetworkSection';
import HeroSlider from '../components/site/HeroSlider';
import { LogoMark } from '../components/site/Logo';
import {
  ArtistsGrid, ClaritySection, ContactSection, CtaPanel, EcosystemGrid, FaqSection, HighlightsBar, JourneySection, LabelChannels, PlatformsStrip, ProductShowcases, ServicesGrid,
} from '../components/site/sections';
import { btnGhost, btnPrimary, EqBars, Reveal, SectionHeading } from '../components/site/ui';
import { ecosystem } from '../data/company';

const pillars = [
  { icon: Globe2, title: 'Distribution', to: '/services/music-distribution' },
  { icon: ShieldCheck, title: 'YouTube CMS', to: '/services/youtube-cms' },
  { icon: Radio, title: 'Live & OTT', to: '/services/intubelive-service' },
  { icon: Disc3, title: 'Production', to: '/services/production' },
];

function AboutIntro() {
  const stats = [
    { value: `${ecosystem.length}+`, label: 'Live platforms we run' },
    { value: '24/7', label: 'Streaming & monitoring' },
    { value: '150+', label: 'Stores & apps worldwide' },
  ];
  return (
    <section id="about" className="relative py-24 sm:py-32">
      <div className="relative mx-auto grid max-w-7xl items-center gap-16 px-5 sm:px-8 lg:grid-cols-2">
        <Reveal className="relative">
          <div className="relative mx-auto aspect-square max-w-md">
            <div className="absolute inset-0 animate-spinslow rounded-full border-2 border-dashed border-accent/30" />
            <div className="absolute inset-8 rounded-full bg-[repeating-radial-gradient(circle_at_center,#1b1c22_0_2px,#0b0b0e_2px_5px)] shadow-[0_40px_100px_-30px_rgba(18,19,24,0.7)]" />
            <div className="absolute inset-[27%] grid place-items-center rounded-full bg-white shadow-inner">
              <div className="text-center">
                <LogoMark className="mx-auto h-14 w-14" />
                <p className="mt-2 font-display text-lg font-bold uppercase text-coal">Intube Media</p>
                <EqBars className="mx-auto mt-2 h-6 justify-center" bars={12} />
              </div>
            </div>
            {pillars.map(({ icon: Icon, title, to }, i) => (
              <Link key={title} to={to} className={`absolute flex items-center gap-2 rounded-full border border-coal-200 bg-white px-4 py-2.5 font-display text-sm font-semibold uppercase tracking-wide text-coal shadow-lg transition hover:-translate-y-1 hover:border-accent hover:text-accent ${['-left-2 top-6', '-right-2 top-20', '-left-4 bottom-20', 'bottom-2 right-4'][i]}`}>
                <Icon className="h-4 w-4 text-accent" />{title}
              </Link>
            ))}
          </div>
        </Reveal>
        <div>
          <SectionHeading align="left" eyebrow="About Intube Media" title="A music company" highlight="that builds its own tech." description="Intube Media started with regional Indian music and grew into a full network. We release songs worldwide, manage YouTube channels through our CMS, stream channels live 24/7 and run our own OTT, music and drama apps — with one team that knows both the art and the code." />
          <Reveal delay={120}>
            <div className="mt-10 grid grid-cols-3 divide-x divide-coal-200 rounded-2xl border border-coal-200 bg-white">
              {stats.map((s) => (
                <div key={s.label} className="p-5 text-center">
                  <p className="font-display text-4xl font-bold text-red-grad">{s.value}</p>
                  <p className="mt-1 text-xs leading-snug text-coal-600">{s.label}</p>
                </div>
              ))}
            </div>
            <div className="mt-9 flex flex-wrap gap-3">
              <Link to="/about" className={btnPrimary}>Our story <ArrowUpRight className="h-4 w-4" /></Link>
              <Link to="/services" className={btnGhost}>What we do</Link>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function PartnerPortalTeaser() {
  return (
    <section className="relative py-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal>
          <div className="relative grid overflow-hidden rounded-[2.5rem] bg-coal text-white lg:grid-cols-2">
            <div className="relative p-10 sm:p-14">
              <div className="absolute -left-20 -top-20 h-72 w-72 rounded-full bg-accent/40 blur-[110px]" />
              <div className="relative">
                <p className="font-display text-sm font-semibold uppercase tracking-[0.28em] text-[#ff6b6b]">Private partner portal</p>
                <h2 className="mt-4 font-display text-4xl font-bold uppercase leading-tight sm:text-5xl">Your catalogue.<span className="block text-red-grad">Your dashboard.</span></h2>
                <p className="mt-5 max-w-md text-white/70">Approved artists and labels get a personal workspace — releases, distribution status, channel reports and direct support, all behind one secure sign-in.</p>
                <div className="mt-9 flex flex-wrap gap-3">
                  <Link to="/partner/apply" className={btnPrimary}>Request Access <ArrowUpRight className="h-4 w-4" /></Link>
                  <Link to="/partner/login" className="inline-flex items-center gap-2 rounded-full border border-white/30 px-7 py-3.5 font-display text-sm font-semibold uppercase tracking-[0.12em] transition hover:bg-white hover:text-coal"><LogIn className="h-4 w-4" /> Partner Login</Link>
                </div>
              </div>
            </div>
            <div className="relative min-h-[320px]">
              <img src="/images/hero/partner-stage.jpg" alt="Partner portal" loading="lazy" className="absolute inset-0 h-full w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-r from-coal via-coal/30 to-transparent" />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export default function HomePage() {
  return (
    <>
      <SEO
        title="Intube Media | Music Distribution, YouTube CMS, Live Streaming & OTT"
        description="Intube Media is an Indian music, media and technology network — worldwide music distribution, YouTube CMS and Content ID, 24/7 live streaming with IntubeLive, OTT apps and creator tools."
        path="/"
      />
      <HeroSlider />
      <HighlightsBar />
      <AboutIntro />
      <ServicesGrid />
      <EcosystemGrid limit={6} />
      <ProductShowcases />
      <PlatformsStrip />
      <ArtistsGrid />
      <LabelChannels />
      <JourneySection />
      <ClaritySection />
      <NetworkSection />
      <PartnerPortalTeaser />
      <FaqSection />
      <CtaPanel />
      <ContactSection />
    </>
  );
}
