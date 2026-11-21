import { Link } from 'react-router-dom';
import { ArrowLeft, Disc3, ExternalLink, Mic2, Music2, PlaySquare, Radio, Tags, Users } from 'lucide-react';
import SEO from '../components/SEO';
import Breadcrumbs from '../components/Breadcrumbs';

const capabilities = [
  { icon: Radio, title: 'Music Distribution', description: 'Releasing music across leading digital platforms and audiences.' },
  { icon: Disc3, title: 'Music Production', description: 'Developing original regional, devotional and contemporary music.' },
  { icon: Users, title: 'Artist Development', description: 'Supporting artists with creative direction, growth and audience building.' },
  { icon: Tags, title: 'Music Labels', description: 'Building and managing focused music labels and their catalogues.' },
  { icon: PlaySquare, title: 'Music Videos', description: 'Producing visual music content designed for digital discovery.' },
  { icon: Mic2, title: 'Digital Music Content', description: 'Creating entertainment formats for online and social audiences.' },
];

export default function BainslaMusicPage() {
  return (
    <>
      <SEO
        title="Bainsla Music Private Limited | Intube Media Network"
        description="Explore Bainsla Music Private Limited, the music and entertainment company in the Intube Media network focused on distribution, production, artists, labels and digital content."
        path="/network/bainsla-music"
      />

      <section className="relative overflow-hidden pb-20 pt-28 sm:pt-32">
        <div className="site-grid-bg absolute inset-0 opacity-70" />
        <div className="absolute -right-32 -top-32 h-96 w-96 rounded-full bg-brand/10 blur-3xl" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Breadcrumbs />
          <div className="mt-8 grid items-center gap-10 lg:grid-cols-[260px_1fr] lg:gap-14">
            <div className="flex min-h-64 items-center justify-center rounded-3xl bg-gradient-to-br from-brand/70 via-ink-700 to-brand-violet/60 p-10 shadow-glow">
              <img
                src="/images/bainsla-music-logo.png"
                alt="Bainsla Music logo"
                className="h-44 w-44 rounded-full border-4 border-white/20 shadow-2xl"
              />
            </div>
            <div>
              <div className="mb-4 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.22em] text-brand-cyan">
                <Music2 className="h-4 w-4" />
                Intube Media Network
              </div>
              <h1 className="mb-3 text-4xl font-extrabold leading-tight text-white md:text-6xl">Bainsla Music Private Limited</h1>
              <p className="mb-6 text-xl font-semibold text-brand-cyan md:text-2xl">Music & Entertainment</p>
              <p className="max-w-3xl text-lg leading-relaxed text-mist">
                Bainsla Music is a dedicated music and entertainment company within the Intube Media network. It develops music, artists, labels and digital audiences across regional, devotional and contemporary Indian music.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 max-w-3xl">
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.22em] text-brand-cyan">Capabilities</p>
            <h2 className="mb-4 text-3xl font-extrabold text-white md:text-4xl">What Bainsla Music Does</h2>
            <p className="text-mist">
              Specialized music operations built to connect creators, catalogues and original entertainment with digital audiences.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {capabilities.map(capability => {
              const Icon = capability.icon;
              return (
                <div key={capability.title} className="rounded-3xl border border-white/10 bg-ink-800/70 p-7 shadow-card transition hover:-translate-y-1 hover:shadow-glow">
                  <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-brand to-brand-light">
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="mb-2 text-xl font-bold text-white">{capability.title}</h3>
                  <p className="text-sm leading-relaxed text-mist">{capability.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="pb-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-[2rem] bg-gradient-to-br from-brand/70 via-ink-700 to-brand-violet/60 p-8 text-center md:p-14">
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.22em] text-white/80">Explore Bainsla Music</p>
            <h2 className="mb-5 text-3xl font-extrabold text-white md:text-4xl">Discover the Official Music Network</h2>
            <p className="mx-auto mb-8 max-w-2xl text-white/80">
              Visit Bainsla Music for its latest music, artists, labels, videos and entertainment releases.
            </p>
            <div className="flex flex-col justify-center gap-4 sm:flex-row">
              <a
                href="https://bainslamusic.com/"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-8 py-3.5 font-semibold text-ink transition hover:bg-white/90"
              >
                Visit Official Website <ExternalLink className="h-5 w-5" />
              </a>
              <Link
                to="/#our-network"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/30 px-8 py-3.5 font-semibold text-white transition hover:bg-white/10"
              >
                <ArrowLeft className="h-5 w-5" /> Back to Our Network
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
