import { Link } from 'react-router-dom';
import { CheckCircle2, Star } from 'lucide-react';
import SEO from '../components/SEO';
import Breadcrumbs from '../components/Breadcrumbs';
import { useCms } from '../context/useCms';

export default function PackagesPage() {
  const { packages } = useCms();

  return (
    <>
      <SEO
        title="Premium Packages - All-in-One Business Solutions | Intube Media"
        description="Choose from Startup, Business Growth, or Celebrity/Influencer packages. Comprehensive digital solutions tailored to your needs by Intube Media."
        path="/packages"
      />

      <section className="pt-28 pb-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-violet-900/20 via-transparent to-pink-900/20" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <Breadcrumbs />
          <div className="text-center mt-4">
            <p className="text-violet-400 font-semibold text-sm uppercase tracking-wider mb-2">Pricing</p>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Premium All-in-One Packages</h1>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              Choose a package designed for your stage — from startups launching their brand to established creators scaling their influence.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            {packages.map((pkg) => (
              <div
                key={pkg.name}
                className={`relative bg-white/5 border rounded-3xl p-8 flex flex-col ${
                  (pkg.is_popular ?? pkg.popular)
                    ? 'border-violet-500/50 scale-105 shadow-lg shadow-violet-500/10'
                    : 'border-white/10'
                }`}
              >
                {(pkg.is_popular ?? pkg.popular) && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <span className="inline-flex items-center gap-1 bg-gradient-to-r from-violet-600 to-pink-600 text-white text-sm font-semibold px-4 py-1.5 rounded-full">
                      <Star className="w-4 h-4" /> Most Popular
                    </span>
                  </div>
                )}

                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${pkg.color} flex items-center justify-center mb-4`}>
                  <Star className="w-7 h-7 text-white" />
                </div>

                <h3 className="text-2xl font-bold mb-1">{pkg.name}</h3>
                <p className="text-gray-400 mb-6">{pkg.tagline}</p>

                <ul className="space-y-3 mb-8 flex-1">
                  {pkg.features.map(feature => (
                    <li key={feature} className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-300 text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Link
                  to="/contact"
                  className={`w-full text-center py-3 rounded-full font-semibold transition-all ${
                    (pkg.is_popular ?? pkg.popular)
                      ? 'bg-gradient-to-r from-violet-600 to-pink-600 hover:opacity-90'
                      : 'border border-white/20 hover:bg-white/5'
                  }`}
                >
                  Get Started
                </Link>
              </div>
            ))}
          </div>

          <p className="text-center text-gray-500 mt-12">
            All packages are customizable. <Link to="/contact" className="text-violet-400 hover:text-violet-300">Contact us</Link> for a custom quote.
          </p>
        </div>
      </section>
    </>
  );
}
