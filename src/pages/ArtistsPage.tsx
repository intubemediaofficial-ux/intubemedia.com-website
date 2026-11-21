import { Link } from 'react-router-dom';
import { ArrowRight, Mic2 } from 'lucide-react';
import SEO from '../components/SEO';
import { ArtistsGrid, CtaPanel, LabelChannels } from '../components/site/sections';
import { PageHero, SectionHeading, btnPrimary } from '../components/site/ui';

const perks = [
  'Worldwide release on music stores and social apps',
  'Content ID protection for your songs and videos',
  'Promotion across our streaming and live platforms',
  'Monthly reports and a team you can actually reach',
];

export default function ArtistsPage() {
  return (
    <>
      <SEO
        title="Artists — Our Roster | Intube Media"
        description="Meet the folk, Rasiya and devotional artists releasing music through the Intube Media and Bainsla Music network."
        path="/artists"
      />
      <PageHero
        eyebrow="Artists"
        title="The voices behind"
        highlight="our network."
        description="Singers, producers and label channels who trust Intube Media and Bainsla Music to release, protect and grow their music."
      >
        <Link to="/partner/apply" className={btnPrimary}>Request Partner Access <ArrowRight className="h-4 w-4" /></Link>
      </PageHero>
      <ArtistsGrid />
      <LabelChannels />

      <section className="py-20">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <SectionHeading align="left" eyebrow="For Artists" title="Your talent." highlight="Our reach."
            description="Independent or signed, new or established — if you make music, we would love to hear it." />
          <ul className="grid gap-4">
            {perks.map(perk => (
              <li key={perk} className="flex items-center gap-4 rounded-2xl border border-white/10 bg-ink-800/70 p-5 font-semibold text-white shadow-card">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand/15 text-brand-light"><Mic2 className="h-5 w-5" /></span>
                {perk}
              </li>
            ))}
          </ul>
        </div>
      </section>
      <CtaPanel />
    </>
  );
}
