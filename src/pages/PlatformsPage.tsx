import SEO from '../components/SEO';
import NetworkSection from '../components/NetworkSection';
import { CtaPanel, EcosystemGrid } from '../components/site/sections';
import { PageHero } from '../components/site/ui';

export default function PlatformsPage() {
  return (
    <>
      <SEO
        title="Our Platforms — CMS, Intube Play, Intube Music, IntubeLive & More | Intube Media"
        description="Explore the platforms built and run by Intube Media: YouTube CMS, Intube Play OTT, Intube Music, IntubeLive 24/7 streaming, Intube Drama, Bainsla Music and creator tools."
        path="/platforms"
      />
      <PageHero
        eyebrow="Platforms & Ecosystem"
        title="The products that"
        highlight="power our network."
        text="Intube Media builds and operates its own technology — from a YouTube CMS for labels to OTT, music, drama and live streaming apps, plus free tools for creators."
      />
      <section className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <EcosystemGrid />
        </div>
      </section>
      <NetworkSection />
      <CtaPanel />
    </>
  );
}
