import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import SEO from '../components/SEO';
import Breadcrumbs from '../components/Breadcrumbs';
import { businessServices, influencerServices } from '../data/services';

export default function ServicesPage() {
  return (
    <>
      <SEO
        title="All Services - Business IT Solutions & Influencer Management | Intube Media"
        description="Explore all services by Intube Media including website development, digital marketing, branding, AI automation, account management, monetization, and more."
        path="/services"
      />

      <section className="pt-28 pb-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-violet-900/20 via-transparent to-pink-900/20" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <Breadcrumbs />
          <div className="text-center mt-4">
            <p className="text-violet-400 font-semibold text-sm uppercase tracking-wider mb-2">Our Services</p>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">What We Offer</h1>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              Comprehensive digital solutions for businesses and creators — from IT infrastructure to influencer growth.
            </p>
          </div>
        </div>
      </section>

      {/* Business Services */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold mb-2">Business IT Solutions</h2>
          <p className="text-gray-400 mb-8">End-to-end digital solutions for businesses of all sizes.</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {businessServices.map(service => {
              const Icon = service.icon;
              return (
                <Link
                  key={service.slug}
                  to={`/services/${service.slug}`}
                  className="group bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 hover:border-violet-500/30 transition-all duration-300"
                >
                  <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${service.color} flex items-center justify-center mb-4`}>
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2 group-hover:text-violet-300 transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-gray-400 text-sm mb-4 line-clamp-2">{service.description}</p>
                  <div className="flex items-center gap-2 text-violet-400 text-sm font-medium">
                    {service.items.length} services <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Influencer Services */}
      <section className="py-16 bg-white/[0.02]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold mb-2">Influencer & Creator Solutions</h2>
          <p className="text-gray-400 mb-8">Complete creator management from growth to monetization.</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {influencerServices.map(service => {
              const Icon = service.icon;
              return (
                <Link
                  key={service.slug}
                  to={`/services/${service.slug}`}
                  className="group bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 hover:border-pink-500/30 transition-all duration-300"
                >
                  <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${service.color} flex items-center justify-center mb-4`}>
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2 group-hover:text-pink-300 transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-gray-400 text-sm mb-4 line-clamp-2">{service.description}</p>
                  <div className="flex items-center gap-2 text-pink-400 text-sm font-medium">
                    {service.items.length} services <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
