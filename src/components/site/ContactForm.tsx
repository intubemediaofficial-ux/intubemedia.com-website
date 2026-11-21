import { useState, type FormEvent } from 'react';
import { CheckCircle2, Send } from 'lucide-react';
import { api } from '../../utils/api';
import { companyServices } from '../../data/company';

const emptyForm = { name: '', phone: '', email: '', service: '', message: '' };
const inputClass =
  'w-full rounded-xl border border-coal-200 bg-coal-100/60 px-4 py-3.5 text-sm text-coal placeholder:text-coal-400 outline-none transition focus:border-accent focus:bg-white focus:ring-4 focus:ring-accent/15';

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
    <form onSubmit={handleSubmit} className="space-y-4 rounded-3xl border border-coal-200 bg-white p-6 shadow-[0_40px_80px_-50px_rgba(18,19,24,0.5)] sm:p-9">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block">
          <span className="mb-1.5 block font-display text-sm font-semibold uppercase tracking-[0.08em] text-coal">Full name *</span>
          <input required value={form.name} onChange={update('name')} className={inputClass} placeholder="Your name" autoComplete="name" />
        </label>
        <label className="block">
          <span className="mb-1.5 block font-display text-sm font-semibold uppercase tracking-[0.08em] text-coal">Phone *</span>
          <input required type="tel" value={form.phone} onChange={update('phone')} className={inputClass} placeholder="+91" autoComplete="tel" />
        </label>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block">
          <span className="mb-1.5 block font-display text-sm font-semibold uppercase tracking-[0.08em] text-coal">Email *</span>
          <input required type="email" value={form.email} onChange={update('email')} className={inputClass} placeholder="you@example.com" autoComplete="email" />
        </label>
        <label className="block">
          <span className="mb-1.5 block font-display text-sm font-semibold uppercase tracking-[0.08em] text-coal">I'm interested in</span>
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
        <span className="mb-1.5 block font-display text-sm font-semibold uppercase tracking-[0.08em] text-coal">Message</span>
        <textarea rows={5} value={form.message} onChange={update('message')} className={`${inputClass} resize-none`} placeholder="Tell us about your music, channel or project" />
      </label>

      {status && (
        <p role="status" className={`flex items-center gap-2 rounded-xl px-4 py-3 text-sm font-medium ${status.ok ? 'bg-emerald-50 text-emerald-700' : 'bg-red-50 text-red-700'}`}>
          {status.ok && <CheckCircle2 className="h-4 w-4" />} {status.text}
        </p>
      )}

      <button type="submit" disabled={submitting}
        className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-accent px-8 py-4 font-display font-semibold uppercase tracking-[0.12em] text-white shadow-[0_14px_30px_-12px_rgba(225,29,42,0.8)] transition hover:bg-accent-dark disabled:opacity-60 sm:w-auto">
        <Send className="h-4 w-4" /> {submitting ? 'Sending...' : 'Send Message'}
      </button>
    </form>
  );
}
