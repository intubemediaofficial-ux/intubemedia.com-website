import { Link, Navigate, useParams } from 'react-router-dom';
import { ArrowRight, ArrowUpRight, CheckCircle2 } from 'lucide-react';
import SEO from '../components/SEO';
import { ContactSection, CtaPanel } from '../components/site/sections';
import { PageHero, Reveal, SectionHeading, btnLight, btnPrimary } from '../components/site/ui';
import { companyServices } from '../data/company';

export default function ServiceDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const service = companyServices.find((s) => s.id === slug);
  if (!service) return <Navigate to="/services" replace />;
  const Icon = service.icon;
  const related = companyServices.filter((s) => s.id !== service.id && s.group === service.group).concat(companyServices.filter((s) => s.group !== service.group)).slice(0, 3);
  const product = service.product;
  const external = product && /^https?:/.test(product.url);
  return (
    <>
      <SEO title={`${service.title} | Intube Media`} description={service.summary} path={`/services/${service.id}`} />
      <PageHero eyebrow={service.group} title={service.title} description={service.intro} image={service.image}>
        {product && (external
          ? <a href={product.url} target="_blank" rel="noopener noreferrer" className={btnPrimary}>{product.name} <ArrowUpRight className="h-4 w-4" /></a>
          : <Link to={product.url} className={btnPrimary}>{product.name} <ArrowRight className="h-4 w-4" /></Link>)}
        <a href="#contact" className={btnLight}>Get a quote</a>
      </PageHero>

      <section className="py-24">
        <div className="mx-auto grid max-w-7xl gap-14 px-5 sm:px-8 lg:grid-cols-[1fr_1.1fr] lg:items-center">
          <Reveal className="relative">
            <img src={service.image} alt={service.title} className="aspect-[4/3] w-full rounded-[2rem] object-cover shadow-[0_40px_80px_-40px_rgba(18,19,24,0.6)]" />
            <span className="absolute -bottom-6 -right-4 grid h-24 w-24 place-items-center rounded-3xl bg-accent text-white shadow-xl sm:-right-6"><Icon className="h-10 w-10" /></span>
          </Reveal>
          <div>
            <SectionHeading align="left" eyebrow={service.label} title="What you get" highlight={`with ${service.label}.`} description={service.summary} />
            <ul className="mt-8 space-y-3">
              {service.points.map((p) => <li key={p} className="flex items-start gap-3 text-coal-700"><CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-accent" />{p}</li>)}
            </ul>
          </div>
        </div>
      </section>

      <section className="bg-coal-100/70 py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <SectionHeading eyebrow="Features" title={service.title} />
          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {service.features.map((f, i) => (
              <Reveal key={f.title} delay={i * 80}>
                <div className="card-lift h-full rounded-3xl border border-coal-200 bg-white p-7 hover:border-accent/30">
                  <span className="font-display text-4xl font-bold text-red-grad">0{i + 1}</span>
                  <h3 className="mt-3 font-display text-xl font-bold uppercase text-coal">{f.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-coal-600">{f.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <SectionHeading eyebrow="Explore more" title="Related services" />
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {related.map((r) => {
              const RIcon = r.icon;
              return (
                <Link key={r.id} to={`/services/${r.id}`} className="card-lift group flex items-center gap-4 rounded-2xl border border-coal-200 bg-white p-5 hover:border-accent/30">
                  <span className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-accent-soft text-accent transition group-hover:bg-accent group-hover:text-white"><RIcon className="h-6 w-6" /></span>
                  <span className="flex-1"><span className="block font-display text-lg font-bold uppercase text-coal">{r.title}</span><span className="text-xs text-coal-400">{r.group}</span></span>
                  <ArrowRight className="h-5 w-5 text-coal-400 transition group-hover:translate-x-1 group-hover:text-accent" />
                </Link>
              );
            })}
          </div>
        </div>
      </section>
      <CtaPanel />
      <ContactSection />
    </>
  );
}
