import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2, MapPin } from 'lucide-react';
import SEO from '../components/SEO';
import { ContactSection, CtaPanel, PlatformsStrip } from '../components/site/sections';
import { PageHero, Reveal, SectionHeading, btnLight, btnPrimary } from '../components/site/ui';
import { companyServices } from '../data/company';
import locations from '../data/seo-locations.json';

export type SeoLocation = (typeof locations)[number];

export const locationTitle = (l: SeoLocation) => `Music Distribution Company in ${l.place}${l.region ? `, ${l.region}` : ''} | Intube Media`;
export const locationDescription = (l: SeoLocation) =>
  `Intube Media is a music distribution company serving ${l.place} — release songs on Spotify, JioSaavn, Apple Music, YouTube Music & 150+ stores, YouTube CMS, Content ID and 24/7 live streaming for artists and labels.`;

export default function LocationPage({ location: l }: { location: SeoLocation }) {
  const where = l.region ? `${l.place}, ${l.region}` : l.place;
  const faqs = [
    { q: `Which is the best music distribution company in ${l.place}?`, a: `Intube Media, a music, media and technology company from Jaipur, Rajasthan, distributes music for artists and labels in ${l.place}. We release songs on 150+ stores, protect them with YouTube Content ID and send clear monthly royalty reports.` },
    { q: `How can I release my song from ${l.place} on Spotify and JioSaavn?`, a: 'Send a partner request on intubemedia.com with your song links. Our team checks the audio, artwork and metadata, then delivers the release to Spotify, JioSaavn, Apple Music, Amazon Music, Gaana, Wynk, YouTube Music and Instagram.' },
    { q: `Do you handle ${l.local} music?`, a: `Yes. We work every day with ${l.local} songs, artists and YouTube channels, and know how these audiences listen and search.` },
    { q: 'Do you offer YouTube CMS and Content ID?', a: 'Yes. Our own YouTube CMS manages partner channels in one dashboard, registers songs in Content ID, handles claims and disputes and reports revenue every month.' },
  ];
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      { '@type': 'Service', name: `Music distribution in ${where}`, serviceType: 'Music distribution', provider: { '@id': 'https://intubemedia.com/#org' }, areaServed: [l.place, ...l.nearby].map((name) => ({ '@type': 'Place', name })), url: `https://intubemedia.com/${l.slug}/` },
      { '@type': 'FAQPage', mainEntity: faqs.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) },
      { '@type': 'BreadcrumbList', itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Intube Media', item: 'https://intubemedia.com/' }, { '@type': 'ListItem', position: 2, name: `Music distribution ${l.place}`, item: `https://intubemedia.com/${l.slug}/` }] },
    ],
  };
  return (
    <>
      <SEO title={locationTitle(l)} description={locationDescription(l)} path={`/${l.slug}`} jsonLd={jsonLd} />
      <PageHero eyebrow={`Music distribution • ${where}`} title="Music Distribution Company" highlight={`in ${l.place}.`} description={`Intube Media helps artists, singers and labels in ${where} release music worldwide — Spotify, JioSaavn, Apple Music, YouTube Music, Instagram and 150+ stores — with YouTube CMS, Content ID and 24/7 live streaming from one team.`} image="/images/hero/hero-global.jpg">
        <Link to="/partner/apply" className={btnPrimary}>Release your song <ArrowRight className="h-4 w-4" /></Link>
        <a href="#contact" className={btnLight}>Talk to our team</a>
      </PageHero>
      <section className="py-24">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 sm:px-8 lg:grid-cols-2">
          <SectionHeading align="left" eyebrow={`Why artists in ${l.place} choose us`} title="Your songs on" highlight="every platform." description={`From ${l.local} songs to modern Hindi pop, we deliver your music to listeners in ${l.place} and around the world, protect it on YouTube and pay royalties with clear monthly statements.`} />
          <ul className="grid gap-3 self-center">
            {['Release on 150+ stores & social apps', 'YouTube Content ID protection & claims', 'Multi-channel YouTube CMS dashboard', '24/7 YouTube live streaming with IntubeLive', 'Catalogue migration with existing ISRC codes', 'Monthly royalty and revenue reports'].map((p) => (
              <li key={p} className="flex items-center gap-3 rounded-2xl border border-coal-200 bg-white p-4 font-medium text-coal"><CheckCircle2 className="h-5 w-5 shrink-0 text-accent" />{p}</li>
            ))}
          </ul>
        </div>
      </section>
      <section className="bg-coal-100/70 py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <SectionHeading eyebrow="Our services" title={`Services in ${l.place}`} />
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {companyServices.map((s) => (
              <Link key={s.id} to={`/services/${s.id}`} className="card-lift rounded-2xl border border-coal-200 bg-white p-6 hover:border-accent/30">
                <p className="font-display text-lg font-bold uppercase text-coal">{s.title}</p>
                <p className="mt-2 text-sm text-coal-600">{s.summary}</p>
              </Link>
            ))}
          </div>
          <div className="mt-12 flex flex-wrap items-center justify-center gap-2">
            <span className="flex items-center gap-1 font-display text-sm font-semibold uppercase text-coal-600"><MapPin className="h-4 w-4 text-accent" /> Also serving:</span>
            {l.nearby.map((n) => <span key={n} className="rounded-full border border-coal-200 bg-white px-4 py-1.5 text-sm text-coal">{n}</span>)}
          </div>
        </div>
      </section>
      <PlatformsStrip />
      <section className="py-24">
        <div className="mx-auto max-w-4xl px-5 sm:px-8">
          <SectionHeading eyebrow="FAQs" title={`Music distribution in ${l.place}`} />
          <div className="mt-10 space-y-3">
            {faqs.map((f, i) => (
              <Reveal key={f.q} delay={i * 50}>
                <div className="rounded-2xl border border-coal-200 bg-white p-6">
                  <h3 className="font-display text-lg font-semibold text-coal">{f.q}</h3>
                  <p className="mt-2 leading-relaxed text-coal-600">{f.a}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <div className="mt-10 flex flex-wrap justify-center gap-2">
            {locations.filter((x) => x.slug !== l.slug).map((x) => <Link key={x.slug} to={`/${x.slug}`} className="rounded-full border border-coal-200 px-4 py-2 text-sm font-semibold text-coal hover:border-accent hover:text-accent">Music distribution {x.place}</Link>)}
          </div>
        </div>
      </section>
      <CtaPanel />
      <ContactSection />
    </>
  );
}
