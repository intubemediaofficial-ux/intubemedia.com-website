import SEO from '../components/SEO';
import { ContactSection } from '../components/site/sections';
import { PageHero } from '../components/site/ui';

export default function ContactPage() {
  return (
    <>
      <SEO
        title="Contact Intube Media — Release, Partner or Get Support"
        description="Get in touch with Intube Media for music distribution, YouTube CMS, artist and label partnerships, streaming and creator services."
        path="/contact"
      />
      <PageHero
        eyebrow="Contact"
        title="Have a song, a channel"
        highlight="or an idea?"
        description="Tell us what you are working on. Our team replies to every message and will guide you to the right service or platform."
      />
      <ContactSection />
    </>
  );
}
