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

      <section className="pt-28 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-red-950/40 via-transparent to-violet-950/40" />
        <div className="absolute top-20 right-10 w-80 h-80 bg-red-600/10 rounded-full blur-3xl" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <Breadcrumbs />
          <div className="mt-8 grid lg:grid-cols-[260px_1fr] gap-10 lg:gap-14 items-center">
            <div className="rounded-3xl min-h-64 flex items-center justify-center bg-gradient-to-br from-red-950/80 via-black to-emerald-950/60 border border-white/10 p-10">
              <img
                src="/images/bainsla-music-logo.png"
                alt="Bainsla Music logo"
                className="w-44 h-44 rounded-full border-4 border-white/20 shadow-2xl"
              />
            </div>
            <div>
              <div className="inline-flex items-center gap-2 text-red-300 font-semibold text-sm uppercase tracking-wider mb-4">
                <Music2 className="w-4 h-4" />
                Intube Media Network
              </div>
              <h1 className="text-4xl md:text-6xl font-bold mb-3">Bainsla Music Private Limited</h1>
              <p className="text-xl md:text-2xl text-red-300 font-semibold mb-6">Music & Entertainment</p>
              <p className="text-lg text-gray-300 leading-relaxed max-w-3xl">
                Bainsla Music is a dedicated music and entertainment company within the Intube Media network. It develops music, artists, labels and digital audiences across regional, devotional and contemporary Indian music.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 border-y border-white/5 bg-white/[0.02]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-12">
            <p className="text-violet-400 font-semibold text-sm uppercase tracking-wider mb-2">Capabilities</p>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">What Bainsla Music Does</h2>
            <p className="text-gray-400">
              Specialized music operations built to connect creators, catalogues and original entertainment with digital audiences.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {capabilities.map(capability => {
              const Icon = capability.icon;
              return (
                <div key={capability.title} className="rounded-2xl bg-white/5 border border-white/10 p-6 hover:border-red-500/30 hover:bg-white/[0.07] transition-colors">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-red-600 to-pink-600 flex items-center justify-center mb-5">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{capability.title}</h3>
                  <p className="text-sm text-gray-400 leading-relaxed">{capability.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-red-950/50 via-black/40 to-violet-950/40 p-8 md:p-14 text-center">
            <p className="text-red-300 font-semibold text-sm uppercase tracking-wider mb-3">Explore Bainsla Music</p>
            <h2 className="text-3xl md:text-4xl font-bold mb-5">Discover the Official Music Network</h2>
            <p className="text-gray-300 max-w-2xl mx-auto mb-8">
              Visit Bainsla Music for its latest music, artists, labels, videos and entertainment releases.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <a
                href="https://bainslamusic.com/"
                target="_blank"
                rel="noreferrer"
                className="inline-flex justify-center items-center gap-2 bg-gradient-to-r from-red-600 to-pink-600 px-8 py-3.5 rounded-full font-semibold hover:opacity-90 transition-opacity"
              >
                Visit Official Website <ExternalLink className="w-5 h-5" />
              </a>
              <Link
                to="/#our-network"
                className="inline-flex justify-center items-center gap-2 border border-white/20 px-8 py-3.5 rounded-full font-semibold hover:bg-white/5 transition-colors"
              >
                <ArrowLeft className="w-5 h-5" /> Back to Our Network
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
