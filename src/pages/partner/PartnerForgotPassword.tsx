import { useState, type FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import SEO from '../../components/SEO';
import Turnstile from '../../components/site/Turnstile';
import { partnerApi } from '../../utils/partnerApi';
import PartnerAuthLayout, { Field, fieldClass, Notice } from './PartnerAuthLayout';

export default function PartnerForgotPassword() {
  const [email, setEmail] = useState('');
  const [token, setToken] = useState('');
  const [resetKey, setResetKey] = useState(0);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<{ ok: boolean; text: string } | null>(null);

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    if (!token) { setStatus({ ok: false, text: 'Please complete the security check.' }); return; }
    setLoading(true);
    try {
      const data = await partnerApi.post('/api/partner/forgot-password', { email, turnstile_token: token });
      setStatus({ ok: true, text: data.message || 'If this email has a partner account, a reset link is on its way.' });
    } catch (err) {
      setStatus({ ok: false, text: err instanceof Error ? err.message : 'Request failed' });
    } finally {
      setToken('');
      setResetKey((k) => k + 1);
      setLoading(false);
    }
  };

  return (
    <PartnerAuthLayout title="Locked out?" highlight="We’ve got you." text="Enter the email linked to your partner account and we’ll send a secure link to set a new password.">
      <SEO title="Reset Partner Password | Intube Media" description="Reset your Intube Media partner portal password." path="/partner/forgot-password" />
      <form onSubmit={submit} className="border-gradient w-full rounded-3xl bg-ink-800/70 p-7 shadow-card sm:p-10">
        <h2 className="text-4xl font-bold">Forgot password</h2>
        <p className="mt-2 text-sm text-mist">The link stays valid for 60 minutes.</p>
        <div className="mt-8"><Field label="Email address"><input required type="email" value={email} onChange={(e) => setEmail(e.target.value)} className={fieldClass} autoComplete="email" /></Field></div>
        <div className="mt-5"><Turnstile onToken={setToken} resetKey={resetKey} /></div>
        {status && <div className="mt-4"><Notice ok={status.ok}>{status.text}</Notice></div>}
        <button type="submit" disabled={loading} className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-aurora px-7 py-4 font-bold text-white shadow-glow disabled:opacity-60">
          {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : 'Send reset link'}
        </button>
        <p className="mt-6 text-center text-sm text-mist"><Link to="/partner/login" className="font-bold text-white hover:underline">Back to sign in</Link></p>
      </form>
    </PartnerAuthLayout>
  );
}
