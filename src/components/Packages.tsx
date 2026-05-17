import { Rocket, TrendingUp, Crown, Check } from 'lucide-react';

const packages = [
  {
    name: 'Startup Package',
    icon: <Rocket className="w-8 h-8" />,
    tagline: 'Launch Your Business Online',
    color: 'from-blue-500 to-cyan-400',
    borderColor: 'border-blue-500/30',
    features: [
      'Logo Design',
      'Business Website',
      'Social Media Setup',
      'SEO Basics',
      'Google My Business Listing',
    ],
  },
  {
    name: 'Business Growth Package',
    icon: <TrendingUp className="w-8 h-8" />,
    tagline: 'Scale Your Business to New Heights',
    color: 'from-violet-500 to-purple-400',
    borderColor: 'border-violet-500/30',
    popular: true,
    features: [
      'Google & Meta Ads',
      'CRM Setup & Management',
      'Website Maintenance',
      'Social Media Management',
      'AI Automation Integration',
    ],
  },
  {
    name: 'Celebrity / Influencer Package',
    icon: <Crown className="w-8 h-8" />,
    tagline: 'Complete Creator Management',
    color: 'from-pink-500 to-rose-400',
    borderColor: 'border-pink-500/30',
    features: [
      'Full Account Handling',
      'Brand Deals & Sponsorships',
      'Copyright Protection',
      'Dedicated Content Team',
      'PR & Media Management',
    ],
  },
];

export default function Packages() {
  return (
    <section id="packages" className="py-20 sm:py-28 relative">
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-violet-500/50 to-transparent" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-violet-600/10 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <span className="text-sm font-semibold text-violet-400 uppercase tracking-wider">
            All-in-One Solutions
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mt-3 mb-4">
            Premium Business Packages
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Choose the perfect package for your needs. Every package is customizable to fit your goals.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {packages.map((pkg) => (
            <div
              key={pkg.name}
              className={`relative rounded-2xl border ${pkg.borderColor} bg-white/5 backdrop-blur-sm p-8 flex flex-col hover:bg-white/10 transition-all ${
                pkg.popular ? 'md:-translate-y-4 shadow-xl shadow-violet-500/10' : ''
              }`}
            >
              {pkg.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="px-4 py-1 bg-gradient-to-r from-violet-500 to-pink-500 rounded-full text-xs font-semibold text-white">
                    MOST POPULAR
                  </span>
                </div>
              )}

              <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${pkg.color} flex items-center justify-center text-white mb-5`}>
                {pkg.icon}
              </div>

              <h3 className="text-xl font-bold text-white mb-1">{pkg.name}</h3>
              <p className="text-gray-400 text-sm mb-6">{pkg.tagline}</p>

              <ul className="space-y-3 mb-8 flex-grow">
                {pkg.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-3 text-gray-300">
                    <Check size={16} className="text-green-400 flex-shrink-0" />
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>

              <a
                href="#contact"
                className={`w-full py-3 rounded-xl text-center font-semibold text-sm transition-all ${
                  pkg.popular
                    ? 'bg-gradient-to-r from-violet-600 to-pink-600 text-white hover:opacity-90'
                    : 'border border-white/20 text-white hover:bg-white/5'
                }`}
              >
                Get Started
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
