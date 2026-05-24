import { useParams, Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import SEO from '../../components/SEO';
import Breadcrumbs from '../../components/Breadcrumbs';
import { serviceCategories } from '../../data/services';

export default function ServicePage() {
  const { slug } = useParams<{ slug: string }>();
  const service = serviceCategories.find(s => s.slug === slug);

  if (!service) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Service Not Found</h1>
          <Link to="/" className="text-violet-400 hover:text-violet-300">Go back home</Link>
        </div>
      </div>
    );
  }

  const Icon = service.icon;
  const relatedServices = serviceCategories.filter(
    s => s.section === service.section && s.slug !== service.slug
  );

  return (
    <>
      <SEO
        title={service.metaTitle}
        description={service.metaDescription}
        path={`/services/${service.slug}`}
      />

      {/* Hero Banner */}
      <section className="pt-28 pb-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-violet-900/20 via-transparent to-pink-900/20" />
        <div className="absolute top-20 left-10 w-72 h-72 bg-violet-600/10 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-72 h-72 bg-pink-600/10 rounded-full blur-3xl" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <Breadcrumbs />

          <div className="flex items-center gap-4 mb-6 mt-4">
            <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${service.color} flex items-center justify-center`}>
              <Icon className="w-8 h-8 text-white" />
            </div>
            <div>
              <p className="text-sm font-medium text-violet-400 uppercase tracking-wider">{service.tagline}</p>
              <h1 className="text-4xl md:text-5xl font-bold">{service.title}</h1>
            </div>
          </div>

          <p className="text-lg text-gray-300 max-w-3xl leading-relaxed">
            {service.description}
          </p>
        </div>
      </section>

      {/* Service Items Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold mb-10">Our {service.title}</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {service.items.map((item, index) => {
              const ItemIcon = item.icon;
              return (
                <div
                  key={index}
                  className="group bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 hover:border-violet-500/30 transition-all duration-300"
                >
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${service.color} bg-opacity-20 flex items-center justify-center mb-4`}>
                    <ItemIcon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2 group-hover:text-violet-300 transition-colors">
                    {item.name}
                  </h3>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-violet-900/40 to-pink-900/40 border border-white/10 rounded-3xl p-8 md:p-12 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Get Started?
            </h2>
            <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
              Let us help you with {service.title.toLowerCase()}. Contact our team today for a free consultation.
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-violet-600 to-pink-600 px-8 py-3 rounded-full font-semibold hover:opacity-90 transition-opacity"
            >
              Contact Us <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Related Services */}
      <section className="py-16 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold mb-8">Related Services</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {relatedServices.map(related => {
              const RelatedIcon = related.icon;
              return (
                <Link
                  key={related.slug}
                  to={`/services/${related.slug}`}
                  className="group flex items-center gap-4 bg-white/5 border border-white/10 rounded-xl p-4 hover:bg-white/10 hover:border-violet-500/30 transition-all"
                >
                  <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${related.color} flex items-center justify-center flex-shrink-0`}>
                    <RelatedIcon className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold group-hover:text-violet-300 transition-colors">{related.title}</h3>
                    <p className="text-sm text-gray-400">{related.items.length} services</p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-gray-500 ml-auto group-hover:text-violet-400 transition-colors" />
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
