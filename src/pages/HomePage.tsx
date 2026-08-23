import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2, Users, Briefcase, Award, Clock } from 'lucide-react';
import SEO from '../components/SEO';
import NetworkSection from '../components/NetworkSection';
import CmsIcon from '../components/CmsIcon';
import { useCms } from '../context/useCms';

const trustedBrands = ['Google', 'Meta', 'YouTube', 'Amazon', 'Flipkart', 'Zomato', 'Swiggy', 'PhonePe'];

export default function HomePage() {
  const { services, theme } = useCms();
  const businessServices = services.filter(service => service.section === 'business');
  const influencerServices = services.filter(service => service.section === 'influencer');
  const stats = [
    { icon: Briefcase, value: theme.stat_projects, label: 'Projects Delivered' },
    { icon: Users, value: theme.stat_clients, label: 'Happy Clients' },
    { icon: Award, value: theme.stat_team, label: 'Team Members' },
    { icon: Clock, value: theme.stat_experience, label: 'Years Experience' },
  ];

  return (
    <>
      <SEO
        title="Intube Media — Digital Agency | IT Solutions | Influencer Management"
        description="Intube Media is a digital, technology and media network offering digital agency services, IT solutions, influencer management and entertainment businesses."
        path="/"
      />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-96 h-96 bg-violet-600/20 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-pink-600/20 rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-violet-500/10 border border-violet-500/20 rounded-full px-4 py-2 mb-6">
                <span className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: theme.accent_color }} />
                <span className="text-sm text-violet-300">{theme.hero_badge}</span>
              </div>
              <p className="text-sm font-semibold text-gray-300 uppercase tracking-[0.16em] mb-4">
                Digital Agency • IT Solutions • Influencer Management
              </p>

              <h1
                className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight bg-gradient-to-r from-white via-violet-300 to-pink-300 bg-clip-text text-transparent"
                style={{
                  fontFamily: theme.heading_font,
                  backgroundImage: `linear-gradient(90deg, #ffffff, ${theme.primary_color}, ${theme.secondary_color})`,
                }}
              >
                {theme.hero_title}
              </h1>

              <p className="text-lg text-gray-300 mb-8 max-w-xl leading-relaxed">
                {theme.hero_subtitle}
              </p>

              <div className="flex flex-wrap gap-4 mb-12">
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-violet-600 to-pink-600 px-8 py-3 rounded-full font-semibold hover:opacity-90 transition-opacity"
                >
                  Get Started <ArrowRight className="w-5 h-5" />
                </Link>
                <Link
                  to="/services/digital-marketing"
                  className="inline-flex items-center gap-2 border border-white/20 px-8 py-3 rounded-full font-semibold hover:bg-white/5 transition-colors"
                >
                  Explore Services
                </Link>
              </div>

              <div className="flex flex-wrap gap-6">
                {[
                  'Business IT Solutions',
                  'Digital Marketing',
                  'Influencer Management',
                  'AI Automation',
                ].map(item => (
                  <div key={item} className="flex items-center gap-2 text-sm text-gray-300">
                    <CheckCircle2 className="w-4 h-4 text-green-400" />
                    {item}
                  </div>
                ))}
              </div>
            </div>

            <div className="hidden lg:block relative">
              <div className="relative rounded-2xl overflow-hidden">
                <img
                  src="/images/hero-team.jpg"
                  alt="Intube Media Team"
                  className="w-full h-auto rounded-2xl"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&h=400&fit=crop';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#050510] via-transparent to-transparent" />
              </div>

              <div className="absolute -bottom-4 -left-4 bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl p-4">
                <p className="text-2xl font-bold">{theme.stat_projects}</p>
                <p className="text-sm text-gray-300">Projects Delivered</p>
              </div>
              <div className="absolute -top-4 -right-4 bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl p-4">
                <p className="text-2xl font-bold">{theme.stat_clients}</p>
                <p className="text-sm text-gray-300">Happy Clients</p>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-20 pt-12 border-t border-white/10">
            {stats.map(stat => {
              const StatIcon = stat.icon;
              return (
                <div key={stat.label} className="text-center">
                  <StatIcon className="w-8 h-8 text-violet-400 mx-auto mb-3" />
                  <p className="text-3xl font-bold">{stat.value}</p>
                  <p className="text-sm text-gray-400 mt-1">{stat.label}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Trusted By */}
      <section className="py-12 border-y border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-sm text-gray-500 uppercase tracking-widest mb-8">Trusted By Leading Brands</p>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
            {trustedBrands.map(brand => (
              <span key={brand} className="text-lg font-bold text-gray-600 hover:text-gray-400 transition-colors">
                {brand}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Business Services Overview */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-violet-400 font-semibold text-sm uppercase tracking-wider mb-2">What We Offer</p>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Business IT Solutions</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              End-to-end digital solutions for businesses — from website development to AI automation.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {businessServices.map(service => (
                <Link
                  key={service.slug}
                  to={`/services/${service.slug}`}
                  className="group bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 hover:border-violet-500/30 transition-all duration-300"
                >
                  <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${service.color} flex items-center justify-center mb-4`}>
                    <CmsIcon icon={service.icon} className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2 group-hover:text-violet-300 transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-gray-400 text-sm mb-4 line-clamp-2">{service.description}</p>
                  <div className="flex items-center gap-2 text-violet-400 text-sm font-medium">
                    {service.items.length} services <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Influencer Services Overview */}
      <section className="py-20 bg-white/[0.02]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-pink-400 font-semibold text-sm uppercase tracking-wider mb-2">For Creators & Influencers</p>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Influencer & Creator Solutions</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Complete creator management — from account growth to monetization and content production.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {influencerServices.map(service => (
                <Link
                  key={service.slug}
                  to={`/services/${service.slug}`}
                  className="group bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 hover:border-pink-500/30 transition-all duration-300"
                >
                  <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${service.color} flex items-center justify-center mb-4`}>
                    <CmsIcon icon={service.icon} className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2 group-hover:text-pink-300 transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-gray-400 text-sm mb-4 line-clamp-2">{service.description}</p>
                  <div className="flex items-center gap-2 text-pink-400 text-sm font-medium">
                    {service.items.length} services <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
            ))}
          </div>
        </div>
      </section>

      <NetworkSection />

      {/* Packages Preview */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-violet-400 font-semibold text-sm uppercase tracking-wider mb-2">Pricing</p>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Premium All-in-One Packages</h2>
          <p className="text-gray-400 max-w-2xl mx-auto mb-8">
            Choose a package that fits your needs — from startups to established businesses and top creators.
          </p>
          <Link
            to="/packages"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-violet-600 to-pink-600 px-8 py-3 rounded-full font-semibold hover:opacity-90 transition-opacity"
          >
            View Packages <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-white/[0.02]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-violet-900/40 to-pink-900/40 border border-white/10 rounded-3xl p-8 md:p-16 text-center">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Ready to Grow Your Business?
            </h2>
            <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
              Partner with India's fastest growing digital agency. Let us help you build, market, and scale your brand.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-violet-600 to-pink-600 px-8 py-3 rounded-full font-semibold hover:opacity-90 transition-opacity"
              >
                Start Your Project <ArrowRight className="w-5 h-5" />
              </Link>
              <a
                href={`tel:${theme.phone.replace(/[^\d+]/g, '')}`}
                className="inline-flex items-center gap-2 border border-white/20 px-8 py-3 rounded-full font-semibold hover:bg-white/5 transition-colors"
              >
                Call Us Now
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
