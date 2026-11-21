import { useState, type FormEvent } from 'react';
import { CheckCircle2, Send } from 'lucide-react';
import { api } from '../../utils/api';
import { companyServices } from '../../data/company';

const emptyForm = { name: '', phone: '', email: '', service: '', message: '' };
const inputClass =
  'w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3.5 text-sm text-white placeholder:text-white/35 outline-none transition focus:border-brand-light focus:bg-white/[0.07] focus:ring-4 focus:ring-brand/20 [&>option]:bg-ink-800';

export default function ContactForm() {
  const [form, setForm] = useState(emptyForm);
  const [status, setStatus] = useState<{ ok: boolean; text: string } | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const update = (field: keyof typeof emptyForm) => (event: { target: { value: string } }) =>
    setForm(current => ({ ...current, [field]: event.target.value }));

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setStatus(null);
    setSubmitting(true);
    try {
      await api.post('/api/contact', form);
      setForm(emptyForm);
      setStatus({ ok: true, text: 'Thank you! Our team will get back to you soon.' });
    } catch (error) {
      setStatus({ ok: false, text: error instanceof Error ? error.message : 'Unable to send your message' });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="border-gradient space-y-4 rounded-3xl bg-ink-800/80 p-6 shadow-card sm:p-9">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block">
          <span className="mb-1.5 block text-sm font-semibold text-white/90">Full name *</span>
          <input required value={form.name} onChange={update('name')} className={inputClass} placeholder="Your name" autoComplete="name" />
        </label>
        <label className="block">
          <span className="mb-1.5 block text-sm font-semibold text-white/90">Phone *</span>
          <input required type="tel" value={form.phone} onChange={update('phone')} className={inputClass} placeholder="+91" autoComplete="tel" />
        </label>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block">
          <span className="mb-1.5 block text-sm font-semibold text-white/90">Email *</span>
          <input required type="email" value={form.email} onChange={update('email')} className={inputClass} placeholder="you@example.com" autoComplete="email" />
        </label>
        <label className="block">
          <span className="mb-1.5 block text-sm font-semibold text-white/90">I'm interested in</span>
          <select value={form.service} onChange={update('service')} className={inputClass}>
            <option value="">Choose a service</option>
            {companyServices.map(service => (
              <option key={service.id} value={service.title}>{service.title}</option>
            ))}
            <option value="Artist / Label Partnership">Artist / Label Partnership</option>
            <option value="General Enquiry">General Enquiry</option>
          </select>
        </label>
      </div>
      <label className="block">
        <span className="mb-1.5 block text-sm font-semibold text-white/90">Message</span>
        <textarea rows={5} value={form.message} onChange={update('message')} className={`${inputClass} resize-none`} placeholder="Tell us about your music, channel or project" />
      </label>

      {status && (
        <p role="status" className={`flex items-center gap-2 rounded-xl px-4 py-3 text-sm font-medium ${status.ok ? 'bg-emerald-500/10 text-emerald-300' : 'bg-red-500/10 text-red-300'}`}>
          {status.ok && <CheckCircle2 className="h-4 w-4" />} {status.text}
        </p>
      )}

      <button type="submit" disabled={submitting}
        className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-aurora px-7 py-3.5 font-bold text-white shadow-glow transition hover:brightness-110 disabled:opacity-60 sm:w-auto">
        <Send className="h-4 w-4" /> {submitting ? 'Sending...' : 'Send Message'}
      </button>
    </form>
  );
}
