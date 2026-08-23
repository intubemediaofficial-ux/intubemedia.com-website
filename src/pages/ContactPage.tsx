import { useState } from 'react';
import { Phone, Mail, MapPin, Clock, Send } from 'lucide-react';
import SEO from '../components/SEO';
import Breadcrumbs from '../components/Breadcrumbs';
import { api } from '../utils/api';
import { useCms } from '../context/useCms';

export default function ContactPage() {
  const { services, theme } = useCms();
  const [status, setStatus] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    service: '',
    message: '',
  });

  const contactInfo = [
    { icon: Phone, label: 'Phone', value: theme.phone, href: `tel:${theme.phone.replace(/[^\d+]/g, '')}` },
    { icon: Mail, label: 'Email', value: theme.email, href: `mailto:${theme.email}` },
    { icon: MapPin, label: 'Office', value: theme.address, href: undefined },
    { icon: Clock, label: 'Hours', value: theme.working_hours, href: undefined },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('');
    setSubmitting(true);
    try {
      await api.post('/api/contact', formData);
      setFormData({ name: '', phone: '', email: '', service: '', message: '' });
      setStatus('Thank you! Your message has been sent.');
    } catch (error) {
      setStatus(error instanceof Error ? error.message : 'Unable to send your message');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <SEO
        title="Contact Intube Media - Get a Free Consultation"
        description="Get in touch with Intube Media for a free consultation. Contact us for business IT solutions, digital marketing, branding, and influencer management services."
        path="/contact"
      />

      <section className="pt-28 pb-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-violet-900/20 via-transparent to-pink-900/20" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <Breadcrumbs />
          <div className="text-center mt-4">
            <p className="text-violet-400 font-semibold text-sm uppercase tracking-wider mb-2">Get In Touch</p>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Contact Us</h1>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              Ready to start your project? Get a free consultation with our digital experts today.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Contact Form */}
            <div className="lg:col-span-2">
              <div className="bg-white/5 border border-white/10 rounded-2xl p-8">
                <h2 className="text-2xl font-bold mb-6">Send us a Message</h2>
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Full Name *</label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-violet-500 transition-colors"
                        placeholder="Your name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Phone Number *</label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-violet-500 transition-colors"
                        placeholder="+91 XXXXX XXXXX"
                      />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Email Address *</label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-violet-500 transition-colors"
                        placeholder="you@example.com"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Service Needed</label>
                      <select
                        value={formData.service}
                        onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-violet-500 transition-colors"
                      >
                        <option value="" className="bg-gray-900">Select a service</option>
                        {services.map(s => (
                          <option key={s.slug} value={s.title} className="bg-gray-900">{s.title}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Message</label>
                    <textarea
                      rows={5}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-violet-500 transition-colors resize-none"
                      placeholder="Tell us about your project..."
                    />
                  </div>

                  {status && (
                    <p role="status" className="text-sm text-violet-200">{status}</p>
                  )}

                  <button
                    type="submit"
                    disabled={submitting}
                    className="inline-flex items-center gap-2 bg-gradient-to-r from-violet-600 to-pink-600 px-8 py-3 rounded-full font-semibold hover:opacity-90 transition-opacity"
                  >
                    <Send className="w-5 h-5" /> {submitting ? 'Sending...' : 'Send Message'}
                  </button>
                </form>
              </div>
            </div>

            {/* Contact Info Sidebar */}
            <div className="space-y-6">
              {contactInfo.map(info => {
                const Icon = info.icon;
                return (
                  <a
                    key={info.label}
                    href={info.href}
                    className="flex items-start gap-4 bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-colors"
                  >
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-violet-600 to-pink-600 flex items-center justify-center flex-shrink-0">
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-400">{info.label}</p>
                      <p className="font-semibold">{info.value}</p>
                    </div>
                  </a>
                );
              })}

              <div className="bg-gradient-to-br from-violet-900/40 to-pink-900/40 border border-white/10 rounded-2xl p-6 text-center">
                <h3 className="text-lg font-bold mb-2">Free Consultation</h3>
                <p className="text-sm text-gray-300 mb-4">
                  Not sure what you need? Book a free consultation with our experts.
                </p>
                <a
                  href={`tel:${theme.phone.replace(/[^\d+]/g, '')}`}
                  className="inline-flex items-center gap-2 bg-white/10 border border-white/20 px-6 py-2 rounded-full text-sm font-semibold hover:bg-white/20 transition-colors"
                >
                  <Phone className="w-4 h-4" /> Call Now
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
