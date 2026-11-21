import { Link } from 'react-router-dom';
import { ArrowRight, ArrowUpRight, CheckCircle2, Mail, MapPin, Play, Youtube } from 'lucide-react';
import { useCms } from '../../context/useCms';
import { artists, companyServices, ecosystem, journey, labelChannels, storePlatforms } from '../../data/company';
import ContactForm from './ContactForm';
import { EqBars, SectionHeading, btnLight, btnOutlineLight } from './ui';

export function PlatformsStrip() {
  return (
    <section className="border-y border-brand-line bg-white py-14">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <p className="mb-8 text-center text-xs font-bold uppercase tracking-[0.22em] text-muted">
          Your music, delivered where listeners already are
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          {storePlatforms.map(platform => (
            <span key={platform.name} className="inline-flex items-center gap-2 rounded-full border border-brand-line bg-white px-4 py-2 text-sm font-semibold text-navy shadow-card">
              <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: platform.color }} />
              {platform.name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ServicesGrid({ detailed = false }: { detailed?: boolean }) {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {companyServices.map(service => {
        const Icon = service.icon;
        return (
          <article key={service.id} id={service.id}
            className="group relative scroll-mt-28 overflow-hidden rounded-3xl border border-brand-line bg-white p-7 shadow-card transition hover:-translate-y-1 hover:border-brand/40 hover:shadow-soft">
            <span className="absolute right-6 top-5 font-display text-5xl font-extrabold text-brand/10 transition group-hover:text-brand/20">{service.number}</span>
            <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-brand to-brand-light text-white shadow-lg shadow-brand/25">
              <Icon className="h-6 w-6" />
            </span>
            <p className="mt-6 text-xs font-bold uppercase tracking-wider text-brand">{service.label}</p>
            <h3 className="mt-2 text-xl font-bold text-navy">{service.title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-muted">{service.summary}</p>
            {detailed && (
              <ul className="mt-5 space-y-2">
                {service.points.map(point => (
                  <li key={point} className="flex items-start gap-2 text-sm text-navy/80">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-brand" /> {point}
                  </li>
                ))}
              </ul>
            )}
          </article>
        );
      })}
    </div>
  );
}

export function ArtistsGrid() {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {artists.map(artist => (
        <article key={artist.slug} className="group overflow-hidden rounded-3xl border border-brand-line bg-white shadow-card transition hover:-translate-y-1 hover:shadow-soft">
          <div className="relative aspect-[4/3] overflow-hidden bg-navy">
            <img src={artist.image} alt={artist.name} loading="lazy" className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-t from-navy/80 via-navy/10 to-transparent" />
            <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-bold text-brand">{artist.role}</span>
            <span className="absolute bottom-4 right-4 flex h-10 w-10 items-center justify-center rounded-full bg-brand text-white opacity-0 shadow-lg transition group-hover:opacity-100">
              <Play className="h-4 w-4 fill-current" />
            </span>
          </div>
          <div className="p-6">
            <h3 className="text-lg font-bold text-navy">{artist.name}</h3>
            <p className="mt-1 text-xs font-bold uppercase tracking-wider text-brand">{artist.genre}</p>
            <p className="mt-3 text-sm leading-relaxed text-muted">{artist.bio}</p>
            {artist.youtube && (
              <a href={artist.youtube} target="_blank" rel="noreferrer" className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-brand hover:text-brand-dark">
                <Youtube className="h-4 w-4" /> Watch on YouTube
              </a>
            )}
          </div>
        </article>
      ))}
    </div>
  );
}

export function LabelChannels() {
  return (
    <div className="mt-10 rounded-3xl border border-brand-line bg-brand-pale p-6 sm:p-8">
      <p className="text-sm font-bold text-navy">Label channels & artist pages we manage</p>
      <div className="mt-4 flex flex-wrap gap-2">
        {labelChannels.map(channel => (
          <span key={channel} className="rounded-full border border-brand-line bg-white px-4 py-2 text-sm font-semibold text-navy/80">{channel}</span>
        ))}
      </div>
    </div>
  );
}

export function EcosystemGrid() {
  const featured = ecosystem.filter(product => product.featured);
  const others = ecosystem.filter(product => !product.featured);

  return (
    <>
      <div className="grid gap-6 md:grid-cols-2">
        {featured.map(product => {
          const Icon = product.icon;
          return (
            <a key={product.domain} href={product.url} target="_blank" rel="noreferrer"
              className="group relative flex flex-col overflow-hidden rounded-3xl border border-brand-line bg-white p-7 shadow-card transition hover:-translate-y-1 hover:border-brand/40 hover:shadow-soft sm:p-8">
              <div className="absolute -right-20 -top-20 h-48 w-48 rounded-full bg-brand/5 transition group-hover:bg-brand/10" />
              <div className="relative flex items-start justify-between gap-4">
                <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-navy text-brand-light">
                  <Icon className="h-6 w-6" />
                </span>
                <span className="rounded-full bg-brand-pale px-3 py-1 text-xs font-bold text-brand">{product.category}</span>
              </div>
              <h3 className="relative mt-6 text-2xl font-extrabold text-navy">{product.name}</h3>
              <p className="relative mt-1 text-sm font-semibold text-brand">{product.domain}</p>
              <p className="relative mt-4 flex-1 leading-relaxed text-muted">{product.description}</p>
              <div className="relative mt-5 flex flex-wrap gap-2">
                {product.highlights.map(item => (
                  <span key={item} className="rounded-lg border border-brand-line px-3 py-1 text-xs font-semibold text-navy/70">{item}</span>
                ))}
              </div>
              <span className="relative mt-6 inline-flex items-center gap-1.5 text-sm font-bold text-brand">
                Visit {product.name} <ArrowUpRight className="h-4 w-4 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </span>
            </a>
          );
        })}
      </div>

      <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {others.map(product => {
          const Icon = product.icon;
          return (
            <a key={product.domain} href={product.url} target="_blank" rel="noreferrer"
              className="group flex gap-4 rounded-2xl border border-brand-line bg-white p-5 shadow-card transition hover:border-brand/40 hover:shadow-soft">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-pale text-brand">
                <Icon className="h-5 w-5" />
              </span>
              <div className="min-w-0">
                <p className="text-xs font-bold uppercase tracking-wider text-muted">{product.category}</p>
                <h3 className="mt-1 flex items-center gap-1 font-bold text-navy">
                  {product.name} <ArrowUpRight className="h-3.5 w-3.5 text-brand opacity-0 transition group-hover:opacity-100" />
                </h3>
                <p className="mt-0.5 break-words text-xs font-semibold text-brand">{product.domain}</p>
                <p className="mt-2 text-sm leading-relaxed text-muted">{product.description}</p>
              </div>
            </a>
          );
        })}
      </div>
    </>
  );
}

export function JourneySection() {
  return (
    <section className="bg-white py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading eyebrow="How It Works" title="From first call" highlight="to first royalty." center
          text="A simple four-step path for artists, labels and creators joining the Intube Media network." />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {journey.map((step, index) => {
            const Icon = step.icon;
            return (
              <div key={step.title} className="relative rounded-3xl border border-brand-line bg-brand-pale/50 p-7">
                <span className="text-xs font-bold uppercase tracking-wider text-brand">Step {index + 1}</span>
                <span className="mt-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-brand shadow-card">
                  <Icon className="h-5 w-5" />
                </span>
                <h3 className="mt-5 text-lg font-bold text-navy">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{step.text}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export function CtaPanel() {
  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-navy via-navy-800 to-brand px-6 py-14 text-center sm:px-12 sm:py-20">
          <div className="site-grid-bg absolute inset-0 opacity-20" />
          <EqBars className="absolute bottom-0 left-6 opacity-30" bars={14} />
          <EqBars className="absolute bottom-0 right-6 opacity-30" bars={14} />
          <div className="relative mx-auto max-w-2xl">
            <h2 className="text-3xl font-extrabold leading-tight text-white sm:text-4xl lg:text-5xl">
              Ready to take your sound further?
            </h2>
            <p className="mt-5 text-lg text-blue-100/80">
              Whether you are an independent singer, a growing label or a creator brand — let&apos;s plan your next release together.
            </p>
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <Link to="/contact" className={btnLight}>Partner With Us <ArrowRight className="h-4 w-4" /></Link>
              <Link to="/platforms" className={btnOutlineLight}>Explore Our Platforms</Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function ContactSection() {
  const { theme } = useCms();
  return (
    <section id="contact" className="scroll-mt-20 bg-brand-pale py-20 sm:py-24">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-12 lg:px-8">
        <div className="lg:col-span-5">
          <SectionHeading eyebrow="Contact" title="Let's talk about" highlight="your music."
            text="Share a few details and our partnerships team will reach out with the right plan for your songs, channel or label." />
          <div className="space-y-4">
            <a href={`mailto:${theme.email}`} className="flex items-center gap-4 rounded-2xl border border-brand-line bg-white p-5 shadow-card transition hover:border-brand/40">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-pale text-brand"><Mail className="h-5 w-5" /></span>
              <span>
                <span className="block text-xs font-bold uppercase tracking-wider text-muted">Email us</span>
                <span className="font-semibold text-navy">{theme.email}</span>
              </span>
            </a>
            <div className="flex items-center gap-4 rounded-2xl border border-brand-line bg-white p-5 shadow-card">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-pale text-brand"><MapPin className="h-5 w-5" /></span>
              <span>
                <span className="block text-xs font-bold uppercase tracking-wider text-muted">Based in</span>
                <span className="font-semibold text-navy">{theme.address}</span>
              </span>
            </div>
          </div>
        </div>
        <div className="rounded-3xl border border-brand-line bg-white p-6 shadow-soft sm:p-10 lg:col-span-7">
          <ContactForm />
        </div>
      </div>
    </section>
  );
}
