import { Send, Phone, Mail, MapPin } from 'lucide-react';

export default function Contact() {
  return (
    <section id="contact" className="py-20 sm:py-28 relative">
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-violet-500/50 to-transparent" />
        <div className="absolute top-1/3 left-1/4 w-72 h-72 bg-violet-600/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 right-1/4 w-72 h-72 bg-pink-600/10 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <span className="text-sm font-semibold text-violet-400 uppercase tracking-wider">
            Let's Talk
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mt-3 mb-4">
            Get In Touch
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Ready to take your business or creator journey to the next level?
            Contact us for a free consultation.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-8">
            <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Full Name</label>
                  <input
                    type="text"
                    placeholder="Your name"
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-violet-500/50 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Phone Number</label>
                  <input
                    type="tel"
                    placeholder="+91 XXXXX XXXXX"
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-violet-500/50 transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm text-gray-400 mb-2">Email Address</label>
                <input
                  type="email"
                  placeholder="you@example.com"
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-violet-500/50 transition-colors"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-400 mb-2">Service Interested In</label>
                <select className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-gray-400 focus:outline-none focus:border-violet-500/50 transition-colors appearance-none">
                  <option value="">Select a service</option>
                  <option value="website">Website & App Development</option>
                  <option value="marketing">Digital Marketing</option>
                  <option value="branding">Branding & Creative</option>
                  <option value="security">IT Support & Security</option>
                  <option value="ai">AI & Automation</option>
                  <option value="influencer">Influencer Management</option>
                  <option value="package">Business Package</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm text-gray-400 mb-2">Your Message</label>
                <textarea
                  rows={4}
                  placeholder="Tell us about your project..."
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-violet-500/50 transition-colors resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 bg-gradient-to-r from-violet-600 to-pink-600 rounded-xl text-white font-semibold flex items-center justify-center gap-2 hover:opacity-90 transition-opacity"
              >
                <Send size={18} />
                Send Message
              </button>
            </form>
          </div>

          {/* Contact Info */}
          <div className="space-y-8">
            <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-8">
              <h3 className="text-xl font-bold text-white mb-6">Contact Information</h3>
              <div className="space-y-5">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-violet-500/20 flex items-center justify-center text-violet-400 flex-shrink-0">
                    <Phone size={18} />
                  </div>
                  <div>
                    <div className="text-sm text-gray-400">Phone / WhatsApp</div>
                    <div className="text-white font-medium">+91 XXXXX XXXXX</div>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-pink-500/20 flex items-center justify-center text-pink-400 flex-shrink-0">
                    <Mail size={18} />
                  </div>
                  <div>
                    <div className="text-sm text-gray-400">Email</div>
                    <div className="text-white font-medium">hello@intubemedia.com</div>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-indigo-500/20 flex items-center justify-center text-indigo-400 flex-shrink-0">
                    <MapPin size={18} />
                  </div>
                  <div>
                    <div className="text-sm text-gray-400">Office</div>
                    <div className="text-white font-medium">India</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-violet-600/10 to-pink-600/10 p-8">
              <h3 className="text-xl font-bold text-white mb-3">Why Choose Intube Media?</h3>
              <ul className="space-y-3">
                {[
                  'Complete digital solutions under one roof',
                  'Dedicated team for every project',
                  'Transparent pricing, no hidden charges',
                  'India-based, serving clients worldwide',
                  '24/7 support & quick turnaround',
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-gray-300">
                    <div className="w-1.5 h-1.5 rounded-full bg-violet-400 flex-shrink-0" />
                    <span className="text-sm">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
