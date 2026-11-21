import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Building2, ExternalLink, Music2, X } from 'lucide-react';
import { Eyebrow } from './site/ui';

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
      <section id="our-network" className="relative scroll-mt-20 overflow-hidden bg-[#0e0f14] py-24 text-white sm:py-32">
        <div className="site-grid-bg absolute inset-0 opacity-50 [mask-image:radial-gradient(ellipse_at_center,#000,transparent_70%)]" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-12 lg:items-start">
            <div className="lg:col-span-5">
              <Eyebrow light>Intube Media Network</Eyebrow>
              <h2 className="mt-5 text-4xl font-bold leading-[1.05] text-white sm:text-5xl">
                Building businesses across
                <span className="block text-red-grad pb-1">media, technology & entertainment.</span>
              </h2>
              <p className="mt-5 text-lg leading-relaxed text-mist">
                Intube Media brings together specialised businesses and brands across digital technology, creator services, media and entertainment.
              </p>
              <p className="mt-4 leading-relaxed text-mist">
                Each company operates with its own expertise while being connected through the wider Intube Media network.
              </p>

              <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
                <div className="rounded-2xl border border-white/10 bg-ink-700/[0.04] p-5">
                  <p className="mb-2 text-xs font-bold uppercase tracking-wider text-[#ff6b6b]">Digital & Technology</p>
                  <p className="font-display text-lg font-bold text-white">Intube Media</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-ink-700/[0.04] p-5">
                  <p className="mb-2 text-xs font-bold uppercase tracking-wider text-[#ff6b6b]">Music & Entertainment</p>
                  <p className="font-display text-lg font-bold text-white">Bainsla Music Private Limited</p>
                </div>
              </div>
            </div>

            <article className="overflow-hidden rounded-3xl border border-white/10 bg-ink-800/80 shadow-card lg:col-span-7">
              <button
                type="button"
                onClick={() => setQuickViewOpen(true)}
                className="group block w-full text-left"
                aria-haspopup="dialog"
              >
                <div className="relative overflow-hidden bg-gradient-to-br from-accent/80 via-ink-700 to-[#ff7a3d]/50 p-7 md:p-10">
                  <div className="absolute -right-16 -top-16 h-56 w-56 rounded-full bg-[#ff6b6b]/30 blur-3xl transition group-hover:scale-110" />
                  <div className="relative flex flex-col gap-5 sm:flex-row sm:items-center">
                    <img
                      src="/images/bainsla-music-logo.png"
                      alt="Bainsla Music logo"
                      className="h-20 w-20 rounded-2xl border-4 border-white/20 shadow-xl"
                    />
                    <div>
                      <p className="mb-2 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-[#ff6b6b]">
                        <Music2 className="h-4 w-4" /> Network Company
                      </p>
                      <h3 className="text-2xl font-extrabold text-white md:text-3xl">Bainsla Music Private Limited</h3>
                      <p className="mt-1 text-sm text-white/70">Music & Entertainment</p>
                    </div>
                  </div>
                </div>
                <div className="p-7 md:p-10">
                  <p className="mb-3 text-lg font-semibold text-white">
                    A dedicated music company within the Intube Media network, connecting artists, labels, music and audiences.
                  </p>
                  <p className="mb-3 text-sm leading-relaxed text-mist">
                    Bainsla Music Private Limited is a music and entertainment company focused on music distribution, music production, artist development, digital music platforms and original content.
                  </p>
                  <p className="mb-6 text-sm leading-relaxed text-mist">
                    The company works across regional, devotional and contemporary Indian music while building and managing artists, music labels and digital audiences.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {focusAreas.map(area => (
                      <span key={area} className="rounded-lg border border-white/10 bg-ink-700/5 px-3 py-1.5 text-xs font-semibold text-white/80">
                        {area}
                      </span>
                    ))}
                  </div>
                </div>
              </button>

              <div className="flex flex-col gap-3 border-t border-white/10 bg-ink-700/[0.03] px-7 py-6 sm:flex-row sm:items-center md:px-10">
                <button
                  type="button"
                  onClick={() => setQuickViewOpen(true)}
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-aurora px-6 py-3 text-sm font-semibold text-white shadow-glow transition hover:brightness-110"
                >
                  Quick View <Building2 className="h-4 w-4" />
                </button>
                <a
                  href="https://bainslamusic.com/"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 bg-ink-700/5 px-6 py-3 text-sm font-semibold text-white transition hover:bg-ink-700/10"
                >
                  Visit Website <ExternalLink className="h-4 w-4" />
                </a>
                <Link
                  to="/network/bainsla-music"
                  className="inline-flex items-center justify-center gap-2 px-3 py-2 text-sm font-semibold text-[#ff6b6b] transition hover:text-white sm:ml-auto"
                >
                  View Company Details <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </article>
          </div>
        </div>
      </section>

      {quickViewOpen && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-ink/80 p-4 backdrop-blur-md"
          onMouseDown={() => setQuickViewOpen(false)}
          role="presentation"
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="bainsla-quick-view-title"
            className="relative max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-3xl border border-white/10 bg-ink-800 shadow-2xl"
            onMouseDown={event => event.stopPropagation()}
          >
            <div className="absolute inset-x-0 top-0 h-36 bg-gradient-to-br from-accent/80 via-ink-700 to-[#ff7a3d]/50" />
            <button
              type="button"
              onClick={() => setQuickViewOpen(false)}
              className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-ink-700/10 text-white transition hover:bg-ink-700/25"
              aria-label="Close quick view"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="relative p-6 sm:p-9">
              <div className="mb-8 flex flex-col gap-5 sm:flex-row sm:items-end">
                <img
                  src="/images/bainsla-music-logo.png"
                  alt="Bainsla Music logo"
                  className="h-24 w-24 rounded-2xl border-4 border-white shadow-xl"
                />
                <div>
                  <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-[#ff6b6b] sm:text-[#ff6b6b]">Intube Media Network Company</p>
                  <h2 id="bainsla-quick-view-title" className="text-2xl font-extrabold text-white sm:text-3xl">
                    Bainsla Music Private Limited
                  </h2>
                </div>
              </div>

              <dl className="mb-7 grid gap-4 sm:grid-cols-2">
                {[
                  ['Industry', 'Music & Entertainment', ''],
                  ['Network', 'Intube Media', ''],
                  ['Specialisation', 'Music Distribution, Production, Artists & Labels', 'sm:col-span-2'],
                  ['Website', 'bainslamusic.com', 'sm:col-span-2'],
                ].map(([label, value, span]) => (
                  <div key={label} className={`rounded-xl border border-white/10 bg-ink-700/5 p-4 ${span}`}>
                    <dt className="mb-1 text-xs font-bold uppercase tracking-wider text-mist">{label}</dt>
                    <dd className="font-semibold text-white">{value}</dd>
                  </div>
                ))}
              </dl>

              <p className="mb-8 leading-relaxed text-mist">
                Bainsla Music is a dedicated music and entertainment company within the Intube Media network, focused on developing music, artists, labels and digital entertainment audiences.
              </p>

              <div className="flex flex-col gap-3 sm:flex-row">
                <a
                  href="https://bainslamusic.com/"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-brand px-7 py-3.5 font-semibold text-white transition hover:brightness-110"
                >
                  Visit Bainsla Music <ExternalLink className="h-5 w-5" />
                </a>
                <Link
                  to="/network/bainsla-music"
                  onClick={() => setQuickViewOpen(false)}
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/10 px-7 py-3.5 font-semibold text-white transition hover:border-brand hover:text-[#ff6b6b]"
                >
                  Company Details <ArrowRight className="h-5 w-5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
