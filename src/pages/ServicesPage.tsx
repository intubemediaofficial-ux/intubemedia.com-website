import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import SEO from '../components/SEO';
import { CtaPanel, JourneySection, PlatformsStrip, ProductShowcases, ServicesGrid } from '../components/site/sections';
import { PageHero, btnPrimary } from '../components/site/ui';

export default function ServicesPage() {
  return (
    <>
      <SEO
        title="Services — Music Distribution, YouTube CMS & Streaming | Intube Media"
        description="Music distribution, YouTube CMS and Content ID, artist and label development, production, OTT and live streaming, and digital growth services from Intube Media."
        path="/services"
      />
      <PageHero
        eyebrow="Our Services"
        title="Everything your music needs,"
        highlight="handled by one team."
        description="From the first recording to the monthly revenue report, our services cover distribution, rights, production, streaming and growth for artists, labels and creators."
      >
        <Link to="/contact" className={btnPrimary}>Talk to Our Team <ArrowRight className="h-4 w-4" /></Link>
      </PageHero>
      <ServicesGrid detailed />
      <ProductShowcases />
      <PlatformsStrip />
      <JourneySection />
      <CtaPanel />
    </>
  );
}
