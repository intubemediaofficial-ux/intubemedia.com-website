import { useState, type ChangeEvent, type FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, CheckCircle2, Loader2 } from 'lucide-react';
import SEO from '../../components/SEO';
import Turnstile from '../../components/site/Turnstile';
import { partnerApi } from '../../utils/partnerApi';
import PartnerAuthLayout, { Field, fieldClass, Notice } from './PartnerAuthLayout';

const categories = ['Independent artist', 'Record label', 'Music producer', 'YouTube channel / creator', 'Publisher', 'Distributor / aggregator', 'Other'];
const catalogSizes = ['Just starting (1-10 releases)', '11-50 releases', '51-200 releases', '201-1,000 releases', '1,000+ releases'];

const empty = {
  full_name: '', business_name: '', email: '', phone: '', whatsapp: '', country: 'India', category: '', catalog_size: '',
  music_links: '', about: '', distribution_needs: '', consent: false, website: '',
};

export default function PartnerApply() {
  const [form, setForm] = useState(empty);
  const [token, setToken] = useState('');
  const [resetKey, setResetKey] = useState(0);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState('');
  const [done, setDone] = useState(false);

  const update = (key: keyof typeof empty) => (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const value = e.target.type === 'checkbox' ? (e.target as HTMLInputElement).checked : e.target.value;
    setForm((f) => ({ ...f, [key]: value }));
  };

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    if (!token) { setError('Please complete the security check.'); return; }
    setSending(true);
    try {
      await partnerApi.post('/api/partner/apply', { ...form, turnstile_token: token });
      setDone(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
      setToken('');
      setResetKey((k) => k + 1);
    } finally {
      setSending(false);
    }
  };

  return (
    <PartnerAuthLayout title="Your music deserves" highlight="a bigger stage." text="Intube Media partners with selected artists, labels and channel owners. Tell us about your catalogue — our team reviews every application personally.">
      <SEO title="Request Partner Access | Intube Media" description="Apply to become an Intube Media partner for worldwide music distribution, YouTube CMS, Content ID and royalty reporting." path="/partner/apply" />
      {done ? (
        <div className="border-gradient w-full rounded-3xl bg-ink-800/80 p-10 text-center shadow-card">
          <span className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-emerald-500/15 text-emerald-300"><CheckCircle2 className="h-8 w-8" /></span>
          <h2 className="mt-6 text-3xl font-bold">Application received</h2>
          <p className="mt-3 text-mist">Thank you, {form.full_name.split(' ')[0] || 'partner'}. We have sent a confirmation to <b className="text-white">{form.email}</b>. Once approved, you will get an email to create your password and open your dashboard.</p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link to="/" className="rounded-full border border-white/15 px-6 py-3 text-sm font-bold">Back to site</Link>
            <Link to="/partner/login" className="rounded-full bg-aurora px-6 py-3 text-sm font-bold">Partner Sign In</Link>
          </div>
        </div>
      ) : (
        <form onSubmit={submit} className="w-full">
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-brand-cyan">Invitation-only partnerships</p>
          <h2 className="mt-3 text-4xl font-bold">Request partner access</h2>
          <p className="mt-2 text-sm text-mist">Already a partner? <Link to="/partner/login" className="font-bold text-white underline-offset-4 hover:underline">Sign in</Link></p>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <Field label="Full name" required><input required minLength={2} value={form.full_name} onChange={update('full_name')} className={fieldClass} placeholder="Your full name" autoComplete="name" /></Field>
            <Field label="Artist / label / business" required><input required value={form.business_name} onChange={update('business_name')} className={fieldClass} placeholder="Artist or label name" autoComplete="organization" /></Field>
            <Field label="Business email" required><input required type="email" value={form.email} onChange={update('email')} className={fieldClass} placeholder="you@label.com" autoComplete="email" /></Field>
            <Field label="Phone" required><input required type="tel" minLength={6} value={form.phone} onChange={update('phone')} className={fieldClass} placeholder="+91" autoComplete="tel" /></Field>
            <Field label="WhatsApp"><input type="tel" value={form.whatsapp} onChange={update('whatsapp')} className={fieldClass} placeholder="+91 (if different)" /></Field>
            <Field label="Country" required><input required value={form.country} onChange={update('country')} className={fieldClass} autoComplete="country-name" /></Field>
            <Field label="Category" required>
              <select required value={form.category} onChange={update('category')} className={fieldClass}>
                <option value="">Select account type</option>
                {categories.map((c) => <option key={c}>{c}</option>)}
              </select>
            </Field>
            <Field label="Catalog size" required>
              <select required value={form.catalog_size} onChange={update('catalog_size')} className={fieldClass}>
                <option value="">Approximate releases</option>
                {catalogSizes.map((c) => <option key={c}>{c}</option>)}
              </select>
            </Field>
            <Field label="Music links" className="sm:col-span-2"><textarea rows={2} value={form.music_links} onChange={update('music_links')} className={`${fieldClass} resize-none`} placeholder="YouTube, Spotify, Instagram or website links" /></Field>
            <Field label="About your music" className="sm:col-span-2"><textarea rows={3} value={form.about} onChange={update('about')} className={`${fieldClass} resize-none`} placeholder="Genre, language, artists and audience" /></Field>
            <Field label="Music distribution needs" className="sm:col-span-2"><textarea rows={3} value={form.distribution_needs} onChange={update('distribution_needs')} className={`${fieldClass} resize-none`} placeholder="Stores, YouTube CMS / Content ID, release plan, catalogue migration…" /></Field>
            <input type="text" tabIndex={-1} autoComplete="off" value={form.website} onChange={update('website')} className="hidden" aria-hidden="true" />
          </div>
          <label className="mt-5 flex items-start gap-3 text-sm text-mist">
            <input type="checkbox" required checked={form.consent} onChange={update('consent')} className="mt-1 h-4 w-4 accent-[#5b6cff]" />
            I confirm I own or control the rights to this music and agree to be contacted by Intube Media about this application.
          </label>
          <div className="mt-5"><Turnstile onToken={setToken} resetKey={resetKey} /></div>
          {error && <div className="mt-4"><Notice ok={false}>{error}</Notice></div>}
          <button type="submit" disabled={sending} className="group mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-aurora px-7 py-4 font-bold text-white shadow-glow transition hover:brightness-110 disabled:opacity-60">
            {sending ? <Loader2 className="h-5 w-5 animate-spin" /> : <>Submit Partner Application <ArrowUpRight className="h-4 w-4" /></>}
          </button>
        </form>
      )}
    </PartnerAuthLayout>
  );
}
