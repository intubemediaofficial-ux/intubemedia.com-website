import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Building2, ExternalLink, Music2, Network, X } from 'lucide-react';
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
      <section id="our-network" className="relative scroll-mt-20 overflow-hidden bg-brand-pale py-20 sm:py-24">
        <div className="site-grid-bg absolute inset-0 opacity-60" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-12 lg:items-start">
            <div className="lg:col-span-5">
              <Eyebrow><Network className="h-3.5 w-3.5" /> Intube Media Network</Eyebrow>
              <h2 className="text-3xl font-extrabold leading-[1.1] text-navy sm:text-4xl lg:text-5xl">
                Building businesses across
                <span className="block text-brand">media, technology & entertainment.</span>
              </h2>
              <p className="mt-5 text-lg leading-relaxed text-muted">
                Intube Media brings together specialised businesses and brands across digital technology, creator services, media and entertainment.
              </p>
              <p className="mt-4 leading-relaxed text-muted">
                Each company operates with its own expertise while being connected through the wider Intube Media network.
              </p>

              <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
                <div className="rounded-2xl border border-brand-line bg-white p-5 shadow-card">
                  <p className="mb-2 text-xs font-bold uppercase tracking-wider text-brand">Digital & Technology</p>
                  <p className="font-display text-lg font-bold text-navy">Intube Media</p>
                </div>
                <div className="rounded-2xl border border-brand-line bg-white p-5 shadow-card">
                  <p className="mb-2 text-xs font-bold uppercase tracking-wider text-brand">Music & Entertainment</p>
                  <p className="font-display text-lg font-bold text-navy">Bainsla Music Private Limited</p>
                </div>
              </div>
            </div>

            <article className="overflow-hidden rounded-3xl border border-brand-line bg-white shadow-soft lg:col-span-7">
              <button
                type="button"
                onClick={() => setQuickViewOpen(true)}
                className="group block w-full text-left"
                aria-haspopup="dialog"
              >
                <div className="relative overflow-hidden bg-gradient-to-br from-navy via-navy-800 to-brand p-7 md:p-10">
                  <div className="absolute -right-16 -top-16 h-56 w-56 rounded-full bg-brand-light/30 blur-3xl transition group-hover:scale-110" />
                  <div className="relative flex flex-col gap-5 sm:flex-row sm:items-center">
                    <img
                      src="/images/bainsla-music-logo.png"
                      alt="Bainsla Music logo"
                      className="h-20 w-20 rounded-2xl border-4 border-white/20 shadow-xl"
                    />
                    <div>
                      <p className="mb-2 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-brand-light">
                        <Music2 className="h-4 w-4" /> Network Company
                      </p>
                      <h3 className="text-2xl font-extrabold text-white md:text-3xl">Bainsla Music Private Limited</h3>
                      <p className="mt-1 text-sm text-blue-100/80">Music & Entertainment</p>
                    </div>
                  </div>
                </div>
                <div className="p-7 md:p-10">
                  <p className="mb-3 text-lg font-semibold text-navy">
                    A dedicated music company within the Intube Media network, connecting artists, labels, music and audiences.
                  </p>
                  <p className="mb-3 text-sm leading-relaxed text-muted">
                    Bainsla Music Private Limited is a music and entertainment company focused on music distribution, music production, artist development, digital music platforms and original content.
                  </p>
                  <p className="mb-6 text-sm leading-relaxed text-muted">
                    The company works across regional, devotional and contemporary Indian music while building and managing artists, music labels and digital audiences.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {focusAreas.map(area => (
                      <span key={area} className="rounded-lg border border-brand-line bg-brand-pale px-3 py-1.5 text-xs font-semibold text-navy/80">
                        {area}
                      </span>
                    ))}
                  </div>
                </div>
              </button>

              <div className="flex flex-col gap-3 border-t border-brand-line bg-brand-pale/60 px-7 py-6 sm:flex-row sm:items-center md:px-10">
                <button
                  type="button"
                  onClick={() => setQuickViewOpen(true)}
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-brand px-6 py-3 text-sm font-semibold text-white transition hover:bg-brand-dark"
                >
                  Quick View <Building2 className="h-4 w-4" />
                </button>
                <a
                  href="https://bainslamusic.com/"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-brand-line bg-white px-6 py-3 text-sm font-semibold text-navy transition hover:border-brand hover:text-brand"
                >
                  Visit Website <ExternalLink className="h-4 w-4" />
                </a>
                <Link
                  to="/network/bainsla-music"
                  className="inline-flex items-center justify-center gap-2 px-3 py-2 text-sm font-semibold text-brand transition hover:text-brand-dark sm:ml-auto"
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
          className="fixed inset-0 z-[100] flex items-center justify-center bg-navy/70 p-4 backdrop-blur-md"
          onMouseDown={() => setQuickViewOpen(false)}
          role="presentation"
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="bainsla-quick-view-title"
            className="relative max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-3xl bg-white shadow-2xl"
            onMouseDown={event => event.stopPropagation()}
          >
            <div className="absolute inset-x-0 top-0 h-36 bg-gradient-to-br from-navy via-navy-800 to-brand" />
            <button
              type="button"
              onClick={() => setQuickViewOpen(false)}
              className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white transition hover:bg-white/25"
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
                  <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-brand sm:text-brand-light">Intube Media Network Company</p>
                  <h2 id="bainsla-quick-view-title" className="text-2xl font-extrabold text-navy sm:text-3xl">
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
                  <div key={label} className={`rounded-xl border border-brand-line bg-brand-pale p-4 ${span}`}>
                    <dt className="mb-1 text-xs font-bold uppercase tracking-wider text-muted">{label}</dt>
                    <dd className="font-semibold text-navy">{value}</dd>
                  </div>
                ))}
              </dl>

              <p className="mb-8 leading-relaxed text-muted">
                Bainsla Music is a dedicated music and entertainment company within the Intube Media network, focused on developing music, artists, labels and digital entertainment audiences.
              </p>

              <div className="flex flex-col gap-3 sm:flex-row">
                <a
                  href="https://bainslamusic.com/"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-brand px-7 py-3.5 font-semibold text-white transition hover:bg-brand-dark"
                >
                  Visit Bainsla Music <ExternalLink className="h-5 w-5" />
                </a>
                <Link
                  to="/network/bainsla-music"
                  onClick={() => setQuickViewOpen(false)}
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-brand-line px-7 py-3.5 font-semibold text-navy transition hover:border-brand hover:text-brand"
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
