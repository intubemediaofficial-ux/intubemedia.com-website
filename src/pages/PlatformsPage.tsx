import SEO from '../components/SEO';
import NetworkSection from '../components/NetworkSection';
import { CtaPanel, EcosystemGrid, ProductShowcases } from '../components/site/sections';
import { PageHero } from '../components/site/ui';

export default function PlatformsPage() {
  return (
    <>
      <SEO
        title="Our Platforms — CMS, Intube Play, Intube Music, IntubeLive & More | Intube Media"
        description="Explore the platforms built and run by Intube Media: YouTube CMS for multi-channel management, IntubeLive 24/7 live streaming, Intube Play OTT, Intube Music, Intube Drama, Bainsla Music and creator tools."
        path="/platforms"
      />
      <PageHero
        eyebrow="Platforms & Ecosystem"
        title="The products that"
        highlight="power our network."
        description="Intube Media builds and operates its own technology — from a YouTube CMS for labels to OTT, music, drama and live streaming apps, plus free tools for creators."
      />
      <ProductShowcases />
      <EcosystemGrid />
      <NetworkSection />
      <CtaPanel />
    </>
  );
}
