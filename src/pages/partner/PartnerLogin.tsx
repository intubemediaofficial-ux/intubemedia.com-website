import { useState, type FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Loader2, LogIn } from 'lucide-react';
import SEO from '../../components/SEO';
import Turnstile from '../../components/site/Turnstile';
import { partnerApi, PARTNER_TOKEN_KEY } from '../../utils/partnerApi';
import PartnerAuthLayout, { Field, fieldClass, Notice } from './PartnerAuthLayout';

export default function PartnerLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [token, setToken] = useState('');
  const [resetKey, setResetKey] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    if (!token) { setError('Please complete the security check.'); return; }
    setLoading(true);
    try {
      const data = await partnerApi.post('/api/partner/login', { email, password, turnstile_token: token });
      localStorage.setItem(PARTNER_TOKEN_KEY, data.token);
      navigate('/partner/dashboard');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Sign in failed');
      setToken('');
      setResetKey((k) => k + 1);
    } finally {
      setLoading(false);
    }
  };

  return (
    <PartnerAuthLayout title="Welcome back" highlight="to your workspace." text="Sign in to follow your releases, distribution status, channel reports and royalties — everything Intube Media manages for you, in one place.">
      <SEO title="Partner Sign In | Intube Media" description="Sign in to the Intube Media private partner portal." path="/partner/login" />
      <form onSubmit={submit} className="border-gradient w-full rounded-3xl bg-ink-800/70 p-7 shadow-card sm:p-10">
        <p className="text-xs font-bold uppercase tracking-[0.3em] text-brand-cyan">Private partner portal</p>
        <h2 className="mt-3 text-4xl font-bold">Partner sign in</h2>
        <p className="mt-2 text-sm text-mist">Use the email approved by our team.</p>
        <div className="mt-8 space-y-4">
          <Field label="Email address"><input required type="email" value={email} onChange={(e) => setEmail(e.target.value)} className={fieldClass} placeholder="you@label.com" autoComplete="email" /></Field>
          <Field label="Password"><input required type="password" value={password} onChange={(e) => setPassword(e.target.value)} className={fieldClass} placeholder="••••••••" autoComplete="current-password" /></Field>
        </div>
        <div className="mt-3 text-right"><Link to="/partner/forgot-password" className="text-sm font-semibold text-brand-light hover:text-white">Forgot password?</Link></div>
        <div className="mt-4"><Turnstile onToken={setToken} resetKey={resetKey} /></div>
        {error && <div className="mt-4"><Notice ok={false}>{error}</Notice></div>}
        <button type="submit" disabled={loading} className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-aurora px-7 py-4 font-bold text-white shadow-glow transition hover:brightness-110 disabled:opacity-60">
          {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : <><LogIn className="h-4 w-4" /> Sign in to workspace</>}
        </button>
        <p className="mt-6 text-center text-sm text-mist">New to Intube Media? <Link to="/partner/apply" className="font-bold text-white hover:underline">Request partner access</Link></p>
      </form>
    </PartnerAuthLayout>
  );
}
