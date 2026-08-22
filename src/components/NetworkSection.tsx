import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Building2, ExternalLink, Music2, Network, X } from 'lucide-react';

const focusAreas = [
  'Music Distribution',
  'Music Production',
  'Artists & Labels',
  'Digital Music',
  'Music Videos',
  'Entertainment',
];

export default function NetworkSection() {
  const [quickViewOpen, setQuickViewOpen] = useState(false);

  useEffect(() => {
    if (!quickViewOpen) return;

    const previousOverflow = document.body.style.overflow;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setQuickViewOpen(false);
    };

    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [quickViewOpen]);

  return (
    <>
      <section id="our-network" className="scroll-mt-20 py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-violet-950/40 via-transparent to-red-950/30" />
        <div className="absolute top-16 right-0 w-80 h-80 bg-red-600/10 rounded-full blur-3xl" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl mb-12">
            <div className="inline-flex items-center gap-2 text-violet-300 font-semibold text-sm uppercase tracking-wider mb-3">
              <Network className="w-4 h-4" />
              Our Network
            </div>
            <h2 className="text-3xl md:text-5xl font-bold mb-5">
              Building Businesses Across
              <span className="bg-gradient-to-r from-violet-400 via-pink-400 to-red-400 bg-clip-text text-transparent"> Media, Technology & Entertainment</span>
            </h2>
            <p className="text-gray-300 text-lg leading-relaxed mb-4">
              Intube Media brings together specialized businesses and brands across digital technology, creator services, media and entertainment.
            </p>
            <p className="text-gray-400 leading-relaxed">
              Each company operates with its own expertise while being connected through the wider Intube Media network.
            </p>
          </div>

          <div className="max-w-5xl grid sm:grid-cols-2 gap-4 mb-6">
            <div className="rounded-2xl border border-violet-500/20 bg-violet-500/[0.07] p-5">
              <p className="text-xs text-violet-300 uppercase tracking-wider mb-2">Digital & Technology</p>
              <p className="text-lg font-semibold">Intube Media</p>
            </div>
            <div className="rounded-2xl border border-red-500/20 bg-red-500/[0.07] p-5">
              <p className="text-xs text-red-300 uppercase tracking-wider mb-2">Music & Entertainment</p>
              <p className="text-lg font-semibold">Bainsla Music Private Limited</p>
            </div>
          </div>

          <article className="max-w-5xl rounded-3xl border border-white/10 bg-white/[0.04] overflow-hidden shadow-2xl shadow-red-950/20">
            <button
              type="button"
              onClick={() => setQuickViewOpen(true)}
              className="group w-full text-left grid lg:grid-cols-[280px_1fr] hover:bg-white/[0.03] transition-colors"
              aria-label="Quick view Bainsla Music Private Limited"
            >
              <div className="relative min-h-64 lg:min-h-full flex items-center justify-center p-10 bg-gradient-to-br from-red-950/80 via-black to-emerald-950/60 overflow-hidden">
                <div className="absolute inset-0 opacity-30 bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.16),_transparent_62%)]" />
                <img
                  src="/images/bainsla-music-logo.png"
                  alt="Bainsla Music logo"
                  className="relative w-40 h-40 rounded-full border-4 border-white/20 shadow-2xl group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              <div className="p-7 md:p-10">
                <div className="flex flex-wrap items-center gap-3 mb-4">
                  <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-red-300 text-xs font-semibold uppercase tracking-wider">
                    <Music2 className="w-3.5 h-3.5" />
                    Music & Entertainment
                  </span>
                  <span className="text-xs text-gray-500 uppercase tracking-wider">Intube Media Network</span>
                </div>
                <h3 className="text-2xl md:text-3xl font-bold mb-2">BAINSLA MUSIC</h3>
                <p className="text-sm text-red-300 font-semibold uppercase tracking-[0.2em] mb-5">Private Limited</p>
                <p className="text-gray-300 leading-relaxed mb-6">
                  A dedicated music company within the Intube Media network, connecting artists, labels, music and audiences.
                </p>
                <p className="text-sm text-gray-400 leading-relaxed mb-3">
                  Bainsla Music Private Limited is a music and entertainment company focused on music distribution, music production, artist development, digital music platforms and original content.
                </p>
                <p className="text-sm text-gray-400 leading-relaxed mb-6">
                  The company works across regional, devotional and contemporary Indian music while building and managing artists, music labels and digital audiences.
                </p>
                <div className="flex flex-wrap gap-2">
                  {focusAreas.map(area => (
                    <span key={area} className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-xs text-gray-300">
                      {area}
                    </span>
                  ))}
                </div>
              </div>
            </button>

            <div className="px-7 md:px-10 py-6 border-t border-white/10 bg-black/20 flex flex-col sm:flex-row sm:items-center gap-3">
              <button
                type="button"
                onClick={() => setQuickViewOpen(true)}
                className="inline-flex justify-center items-center gap-2 rounded-full bg-gradient-to-r from-violet-600 to-pink-600 px-6 py-3 text-sm font-semibold hover:opacity-90 transition-opacity"
              >
                Quick View <Building2 className="w-4 h-4" />
              </button>
              <a
                href="https://bainslamusic.com/"
                target="_blank"
                rel="noreferrer"
                className="inline-flex justify-center items-center gap-2 rounded-full border border-white/20 px-6 py-3 text-sm font-semibold hover:bg-white/5 transition-colors"
              >
                Visit Website <ExternalLink className="w-4 h-4" />
              </a>
              <Link
                to="/network/bainsla-music"
                className="sm:ml-auto inline-flex justify-center items-center gap-2 px-3 py-2 text-sm font-semibold text-violet-300 hover:text-white transition-colors"
              >
                View Company Details <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </article>
        </div>
      </section>

      {quickViewOpen && (
        <div
          className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-md flex items-center justify-center p-4"
          onMouseDown={() => setQuickViewOpen(false)}
          role="presentation"
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="bainsla-quick-view-title"
            className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl border border-white/15 bg-[#0b0b18] shadow-2xl"
            onMouseDown={event => event.stopPropagation()}
          >
            <div className="absolute top-0 left-0 right-0 h-40 bg-gradient-to-br from-red-900/50 via-violet-900/30 to-transparent" />
            <button
              type="button"
              onClick={() => setQuickViewOpen(false)}
              className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-black/40 border border-white/15 flex items-center justify-center text-gray-300 hover:text-white hover:bg-black/70 transition-colors"
              aria-label="Close quick view"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="relative p-6 sm:p-9">
              <div className="flex flex-col sm:flex-row sm:items-center gap-5 mb-8">
                <img
                  src="/images/bainsla-music-logo.png"
                  alt="Bainsla Music logo"
                  className="w-24 h-24 rounded-full border-4 border-white/20 shadow-xl"
                />
                <div>
                  <p className="text-xs text-red-300 font-semibold uppercase tracking-[0.2em] mb-2">Intube Media Network Company</p>
                  <h2 id="bainsla-quick-view-title" className="text-2xl sm:text-3xl font-bold">
                    Bainsla Music Private Limited
                  </h2>
                </div>
              </div>

              <dl className="grid sm:grid-cols-2 gap-4 mb-7">
                <div className="rounded-xl bg-white/5 border border-white/10 p-4">
                  <dt className="text-xs uppercase tracking-wider text-gray-500 mb-1">Industry</dt>
                  <dd className="text-gray-200 font-medium">Music & Entertainment</dd>
                </div>
                <div className="rounded-xl bg-white/5 border border-white/10 p-4">
                  <dt className="text-xs uppercase tracking-wider text-gray-500 mb-1">Network</dt>
                  <dd className="text-gray-200 font-medium">Intube Media</dd>
                </div>
                <div className="sm:col-span-2 rounded-xl bg-white/5 border border-white/10 p-4">
                  <dt className="text-xs uppercase tracking-wider text-gray-500 mb-1">Specialisation</dt>
                  <dd className="text-gray-200 font-medium">Music Distribution, Production, Artists & Labels</dd>
                </div>
                <div className="sm:col-span-2 rounded-xl bg-white/5 border border-white/10 p-4">
                  <dt className="text-xs uppercase tracking-wider text-gray-500 mb-1">Website</dt>
                  <dd className="text-gray-200 font-medium">bainslamusic.com</dd>
                </div>
              </dl>

              <p className="text-gray-300 leading-relaxed mb-8">
                Bainsla Music is a dedicated music and entertainment company within the Intube Media network, focused on developing music, artists, labels and digital entertainment audiences.
              </p>

              <div className="flex flex-col sm:flex-row gap-3">
                <a
                  href="https://bainslamusic.com/"
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 inline-flex justify-center items-center gap-2 rounded-full bg-gradient-to-r from-red-600 to-pink-600 px-7 py-3.5 font-semibold hover:opacity-90 transition-opacity"
                >
                  Visit Bainsla Music <ExternalLink className="w-5 h-5" />
                </a>
                <Link
                  to="/network/bainsla-music"
                  onClick={() => setQuickViewOpen(false)}
                  className="inline-flex justify-center items-center gap-2 rounded-full border border-white/20 px-7 py-3.5 font-semibold hover:bg-white/5 transition-colors"
                >
                  Company Details <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
