import { Link } from 'react-router-dom';
import { ArrowRight, Target, Eye, Heart, Users, Award, Briefcase, Clock, Zap } from 'lucide-react';
import SEO from '../components/SEO';
import Breadcrumbs from '../components/Breadcrumbs';

const values = [
  { icon: Target, title: 'Results-Driven', description: 'Every strategy is designed to deliver measurable results and ROI.' },
  { icon: Zap, title: 'Innovation First', description: 'We leverage the latest technology and AI to stay ahead of the curve.' },
  { icon: Heart, title: 'Client-Centric', description: 'Your success is our success. We treat every project as our own.' },
  { icon: Users, title: 'Team Excellence', description: 'A dedicated team of experts across every digital discipline.' },
];

const stats = [
  { icon: Briefcase, value: '500+', label: 'Projects Delivered' },
  { icon: Users, value: '200+', label: 'Happy Clients' },
  { icon: Award, value: '50+', label: 'Team Members' },
  { icon: Clock, value: '5+', label: 'Years Experience' },
];

const futureIdeas = [
  { title: 'Influencer Marketplace', description: 'A platform connecting brands with verified influencers for seamless collaborations.' },
  { title: 'Brand x Creator Portal', description: 'Collaboration portal for brands and creators to work together efficiently.' },
  { title: 'AI Video SaaS Tool', description: 'AI-powered video creation platform for marketers and content creators.' },
  { title: 'Music Distribution', description: 'Digital music distribution service to get your music on all major platforms.' },
  { title: 'Creator Academy', description: 'Online learning platform for aspiring creators and digital marketers.' },
  { title: 'OTT / Podcast Network', description: 'Original content network for podcasts and digital entertainment.' },
  { title: 'Event & Artist Management', description: 'Full-service event planning and artist management for the entertainment industry.' },
  { title: 'NFT / Digital Merchandise', description: 'Create and sell digital collectibles and branded merchandise.' },
  { title: 'Creator Payment Dashboard', description: 'Unified dashboard for creators to track earnings across all platforms.' },
];

export default function AboutPage() {
  return (
    <>
      <SEO
        title="About Intube Media - Digital, Technology & Media Network"
        description="Learn about Intube Media, the umbrella network for digital agency services, IT solutions, influencer management, media and entertainment businesses."
        path="/about"
      />

      <section className="pt-28 pb-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-violet-900/20 via-transparent to-pink-900/20" />
        <div className="absolute top-20 left-10 w-72 h-72 bg-violet-600/10 rounded-full blur-3xl" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <Breadcrumbs />
          <div className="mt-4 max-w-3xl">
            <p className="text-violet-400 font-semibold text-sm uppercase tracking-wider mb-2">About Us</p>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              We're Building the Future of
              <span className="bg-gradient-to-r from-violet-400 to-pink-400 bg-clip-text text-transparent"> Digital Growth</span>
            </h1>
            <p className="text-lg text-gray-300 leading-relaxed">
              Intube Media is a digital, technology and media network helping businesses and creators grow through digital agency services, IT solutions, influencer management and specialized entertainment companies.
            </p>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 border-y border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map(stat => {
              const Icon = stat.icon;
              return (
                <div key={stat.label} className="text-center">
                  <Icon className="w-8 h-8 text-violet-400 mx-auto mb-3" />
                  <p className="text-3xl font-bold">{stat.value}</p>
                  <p className="text-sm text-gray-400 mt-1">{stat.label}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-8">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-violet-500 to-purple-500 flex items-center justify-center mb-4">
                <Target className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
              <p className="text-gray-300 leading-relaxed">
                To empower businesses and creators with cutting-edge digital solutions that drive growth, build brands, and create lasting impact. We believe every business deserves access to world-class digital services.
              </p>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-2xl p-8">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-pink-500 to-rose-500 flex items-center justify-center mb-4">
                <Eye className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-2xl font-bold mb-4">Our Vision</h2>
              <p className="text-gray-300 leading-relaxed">
                To become India's leading digital agency by 2030, known for innovation, reliability, and transformative results. We envision a world where technology bridges the gap between ambition and achievement.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-white/[0.02]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Core Values</h2>
            <p className="text-gray-400 max-w-xl mx-auto">
              The principles that guide everything we do at Intube Media.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map(value => {
              const Icon = value.icon;
              return (
                <div key={value.title} className="bg-white/5 border border-white/10 rounded-2xl p-6 text-center">
                  <Icon className="w-10 h-10 text-violet-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">{value.title}</h3>
                  <p className="text-sm text-gray-400">{value.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Future Expansion */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-violet-400 font-semibold text-sm uppercase tracking-wider mb-2">What's Next</p>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Future Expansion Ideas</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              We're constantly innovating and expanding our services to meet the evolving needs of the digital world.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {futureIdeas.map(idea => (
              <div key={idea.title} className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-colors">
                <h3 className="text-lg font-semibold mb-2">{idea.title}</h3>
                <p className="text-sm text-gray-400">{idea.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-violet-900/40 to-pink-900/40 border border-white/10 rounded-3xl p-8 md:p-12 text-center">
            <h2 className="text-3xl font-bold mb-4">Want to Work With Us?</h2>
            <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
              Join hundreds of businesses and creators who trust Intube Media for their digital growth.
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-violet-600 to-pink-600 px-8 py-3 rounded-full font-semibold hover:opacity-90 transition-opacity"
            >
              Get in Touch <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
