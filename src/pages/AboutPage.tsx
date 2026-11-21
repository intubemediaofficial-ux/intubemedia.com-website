import { Link } from 'react-router-dom';
import { ArrowRight, Eye, HeartHandshake, Layers, ShieldCheck, Target } from 'lucide-react';
import SEO from '../components/SEO';
import NetworkSection from '../components/NetworkSection';
import { JourneySection, CtaPanel } from '../components/site/sections';
import { PageHero, SectionHeading, btnPrimary, btnGhost } from '../components/site/ui';

const values = [
  { icon: HeartHandshake, title: 'Artist first', text: 'Every decision starts with what helps the artist and their catalogue grow over the long run.' },
  { icon: ShieldCheck, title: 'Clear & honest', text: 'Simple agreements, regular reports and a team that answers the phone when you call.' },
  { icon: Layers, title: 'Own technology', text: 'We build our own CMS, streaming and live tools, so we can move fast and fix things ourselves.' },
];

export default function AboutPage() {
  return (
    <>
      <SEO
        title="About Intube Media — Music, Media & Technology Network"
        description="Learn about Intube Media: an Indian network for music distribution, YouTube CMS, OTT and music streaming, live broadcasting and creator technology."
        path="/about"
      />
      <PageHero
        eyebrow="About Us"
        title="We help Indian music"
        highlight="reach every screen."
        text="Intube Media is a music, media and technology company. We distribute songs, protect rights on YouTube, run our own streaming platforms and build tools that make life easier for artists, labels and creators."
      >
        <Link to="/contact" className={btnPrimary}>Work With Us <ArrowRight className="h-4 w-4" /></Link>
        <Link to="/platforms" className={btnGhost}>See Our Platforms</Link>
      </PageHero>

      <section className="bg-white py-20 sm:py-24">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <div>
            <SectionHeading eyebrow="Our Story" title="From regional roots" highlight="to a full network." />
            <div className="-mt-4 space-y-4 leading-relaxed text-muted">
              <p>
                Our journey began with folk and Rasiya music — songs that families played at weddings and festivals but rarely found on global platforms. We set out to change that by putting regional artists on the same stores and channels as everyone else.
              </p>
              <p>
                As our catalogue grew, so did the work around it: Content ID claims, channel management, revenue reports, live streams and apps. Instead of depending on outside tools, we built our own — and Intube Media became a network of connected products.
              </p>
              <p>
                Today, our record label Bainsla Music, our YouTube CMS and our streaming platforms all work together, giving artists one partner from the studio to the screen.
              </p>
            </div>
          </div>
          <div className="grid gap-5 sm:grid-cols-2">
            <div className="rounded-3xl bg-navy p-8 text-white shadow-soft">
              <Target className="h-8 w-8 text-brand-light" />
              <h3 className="mt-5 text-xl font-bold">Our Mission</h3>
              <p className="mt-3 text-sm leading-relaxed text-blue-100/80">Give every artist the reach, protection and income that their music deserves — without the confusion.</p>
            </div>
            <div className="rounded-3xl border border-brand-line bg-brand-pale p-8 shadow-card">
              <Eye className="h-8 w-8 text-brand" />
              <h3 className="mt-5 text-xl font-bold text-navy">Our Vision</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted">A connected home for Indian music and entertainment, built on technology we own and run ourselves.</p>
            </div>
            {values.map(({ icon: Icon, title, text }) => (
              <div key={title} className="rounded-3xl border border-brand-line bg-white p-7 shadow-card sm:last:col-span-2">
                <Icon className="h-7 w-7 text-brand" />
                <h3 className="mt-4 text-lg font-bold text-navy">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <NetworkSection />
      <JourneySection />
      <CtaPanel />
    </>
  );
}
