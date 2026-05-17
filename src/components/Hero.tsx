import { ArrowRight, Play } from 'lucide-react';

export default function Hero() {
  return (
    <>
      <section
        id="home"
        className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20"
      >
        {/* Background gradient effects */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-violet-600/20 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-pink-600/20 rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl" />
        </div>

        {/* Grid pattern overlay */}
        <div
          className="absolute inset-0 z-0 opacity-10"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left - Text */}
            <div className="text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-violet-500/30 bg-violet-500/10 text-violet-300 text-sm mb-8">
                <Play size={14} fill="currentColor" />
                <span>India's Fastest Growing Digital Agency</span>
              </div>

              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight mb-6">
                <span className="text-white">We Build, Brand &</span>
                <br />
                <span className="bg-gradient-to-r from-violet-400 via-pink-400 to-orange-400 bg-clip-text text-transparent">
                  Scale Your Digital Empire
                </span>
              </h1>

              <p className="text-lg sm:text-xl text-gray-400 max-w-xl mb-10">
                From business IT solutions to influencer management — Intube Media is your
                one-stop destination for websites, apps, digital marketing, branding,
                AI automation, and creator growth.
              </p>

              <div className="flex flex-col sm:flex-row items-center lg:items-start gap-4">
                <a
                  href="#services"
                  className="group px-8 py-4 bg-gradient-to-r from-violet-600 to-pink-600 rounded-full text-white font-semibold text-lg flex items-center gap-2 hover:shadow-lg hover:shadow-violet-500/25 transition-all"
                >
                  Explore Services
                  <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </a>
                <a
                  href="#contact"
                  className="px-8 py-4 border border-white/20 rounded-full text-white font-semibold text-lg hover:bg-white/5 transition-all"
                >
                  Free Consultation
                </a>
              </div>
            </div>

            {/* Right - Image */}
            <div className="hidden lg:block relative">
              <div className="relative rounded-2xl overflow-hidden border border-white/10 shadow-2xl shadow-violet-500/10">
                <img
                  src="/images/hero-team.jpg"
                  alt="Professional digital agency team working together"
                  className="w-full h-auto object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'https://placehold.co/600x400/1a1a2e/7c3aed?text=Intube+Media';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              </div>
              <div className="absolute -bottom-4 -left-4 w-24 h-24 rounded-xl bg-gradient-to-br from-violet-600 to-pink-600 flex items-center justify-center shadow-xl">
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">5+</div>
                  <div className="text-xs text-white/80">Years</div>
                </div>
              </div>
              <div className="absolute -top-4 -right-4 w-20 h-20 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center shadow-xl">
                <div className="text-center">
                  <div className="text-xl font-bold text-white">500+</div>
                  <div className="text-xs text-white/80">Projects</div>
                </div>
              </div>
            </div>
          </div>

          {/* Stats - mobile/below hero */}
          <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto lg:mx-0">
            {[
              { value: '500+', label: 'Projects Delivered' },
              { value: '200+', label: 'Happy Clients' },
              { value: '50+', label: 'Team Members' },
              { value: '5+', label: 'Years Experience' },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-violet-400 to-pink-400 bg-clip-text text-transparent">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-400 mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trusted By Section */}
      <section className="py-12 border-y border-white/5 bg-black/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-sm text-gray-500 uppercase tracking-wider mb-8">
            Trusted by brands & creators across India
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-6 opacity-50">
            {['YouTube', 'Instagram', 'Google', 'Meta', 'Shopify', 'WordPress', 'AWS', 'Figma'].map(
              (brand) => (
                <span key={brand} className="text-lg sm:text-xl font-bold text-gray-400 tracking-wider">
                  {brand}
                </span>
              )
            )}
          </div>
        </div>
      </section>
    </>
  );
}
