import { Link } from 'react-router-dom';
import { ArrowUpRight, Disc3, Globe2, LogIn, Radio, ShieldCheck } from 'lucide-react';
import SEO from '../components/SEO';
import NetworkSection from '../components/NetworkSection';
import HeroSlider from '../components/site/HeroSlider';
import { LogoMark } from '../components/site/Logo';
import {
  ArtistsGrid, ContactSection, CtaPanel, EcosystemGrid, HighlightsBar, JourneySection, LabelChannels, PlatformsStrip, ProductShowcases, ServicesGrid,
} from '../components/site/sections';
import { btnGhost, btnPrimary, EqBars, Glow, Reveal, SectionHeading } from '../components/site/ui';
import { ecosystem } from '../data/company';

const pillars = [
  { icon: Globe2, title: 'Distribution', text: 'Every major store and streaming app' },
  { icon: ShieldCheck, title: 'YouTube CMS', text: 'Content ID, claims and revenue' },
  { icon: Radio, title: 'Live & OTT', text: '24/7 streams and our own apps' },
  { icon: Disc3, title: 'Production', text: 'Audio, video and artist growth' },
];

function AboutIntro() {
  const stats = [
    { value: `${ecosystem.length}`, label: 'Live platforms we run' },
    { value: '24/7', label: 'Streaming & monitoring' },
    { value: '1', label: 'Team for every service' },
  ];
  return (
    <section id="about" className="relative py-24 sm:py-32">
      <Glow className="right-0 top-10 h-96 w-96 bg-brand-violet/20" />
      <div className="relative mx-auto grid max-w-7xl items-center gap-16 px-5 sm:px-8 lg:grid-cols-2">
        <Reveal className="relative">
          <div className="relative mx-auto aspect-square max-w-md">
            <div className="absolute inset-0 animate-spinslow rounded-full border border-dashed border-white/15" />
            <div className="absolute inset-10 rounded-full bg-gradient-to-br from-brand/40 via-ink-700 to-brand-violet/40 blur-[2px]" />
            <div className="absolute inset-16 grid place-items-center rounded-full border border-white/10 bg-ink-800/90 shadow-glow">
              <div className="text-center">
                <LogoMark className="mx-auto h-20 w-20" />
                <p className="mt-4 font-display text-2xl font-bold text-white">Intube Media</p>
                <p className="mt-1 text-xs uppercase tracking-[0.3em] text-mist">Since day one, independent</p>
                <EqBars className="mx-auto mt-5 h-8 justify-center" bars={14} />
              </div>
            </div>
            {pillars.map(({ icon: Icon, title }, i) => (
              <span key={title} className={`glass absolute flex items-center gap-2 rounded-full px-4 py-2 text-xs font-bold text-white ${['left-0 top-8', 'right-0 top-24', 'bottom-16 left-[-4%]', 'bottom-4 right-6'][i]}`}>
                <Icon className="h-4 w-4 text-brand-cyan" />{title}
              </span>
            ))}
          </div>
        </Reveal>
        <div>
          <SectionHeading align="left" eyebrow="About Intube Media" title="A music company" highlight="that builds its own tech." description="Intube Media started with regional Indian music and grew into a full network. We release songs worldwide, manage YouTube channels through our CMS, stream channels live 24/7 and run our own OTT, music and drama apps — with one team that knows both the art and the code." />
          <Reveal delay={120}>
            <div className="mt-10 grid grid-cols-3 gap-4">
              {stats.map((s) => (
                <div key={s.label} className="glass rounded-2xl p-5">
                  <p className="font-display text-3xl font-extrabold text-aurora">{s.value}</p>
                  <p className="mt-1 text-xs leading-snug text-mist">{s.label}</p>
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
          <div className="border-gradient noise relative grid overflow-hidden rounded-[2.5rem] bg-ink-800/80 lg:grid-cols-2">
            <div className="relative p-10 sm:p-14">
              <Glow className="-left-20 -top-20 h-72 w-72 bg-brand/30" />
              <div className="relative">
                <p className="text-xs font-bold uppercase tracking-[0.3em] text-brand-cyan">Private partner portal</p>
                <h2 className="mt-4 text-4xl font-bold leading-tight text-white sm:text-5xl">Your catalogue.<span className="block text-aurora">Your dashboard.</span></h2>
                <p className="mt-5 max-w-md text-mist">Approved artists and labels get a personal workspace — releases, distribution status, channel reports and direct support, all behind one secure sign-in.</p>
                <div className="mt-9 flex flex-wrap gap-3">
                  <Link to="/partner/login" className={btnGhost}><LogIn className="h-4 w-4" /> Artist / Partner Login</Link>
                  <Link to="/partner/apply" className={btnPrimary}>Request Access <ArrowUpRight className="h-4 w-4" /></Link>
                </div>
              </div>
            </div>
            <div className="relative min-h-[320px] border-t border-white/10 lg:border-l lg:border-t-0">
              <img src="/images/platforms/song.jpg" alt="Partner distribution dashboard" loading="lazy" className="absolute inset-0 h-full w-full object-cover object-left-top opacity-80" />
              <div className="absolute inset-0 bg-gradient-to-r from-ink-800 via-ink-800/30 to-transparent" />
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
      <PlatformsStrip />
      <AboutIntro />
      <ServicesGrid />
      <ProductShowcases />
      <EcosystemGrid limit={6} />
      <ArtistsGrid />
      <LabelChannels />
      <NetworkSection />
      <JourneySection />
      <PartnerPortalTeaser />
      <CtaPanel />
      <ContactSection />
    </>
  );
}
