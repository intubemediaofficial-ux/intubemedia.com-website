import { useState, type FormEvent } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import SEO from '../../components/SEO';
import { partnerApi } from '../../utils/partnerApi';
import PartnerAuthLayout, { Field, fieldClass, Notice } from './PartnerAuthLayout';

export default function PartnerResetPassword() {
  const [params] = useSearchParams();
  const token = params.get('token') || '';
  const setup = params.get('setup') === '1';
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<{ ok: boolean; text: string } | null>(null);

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    if (password !== confirm) { setStatus({ ok: false, text: 'Passwords do not match.' }); return; }
    setLoading(true);
    try {
      const data = await partnerApi.post('/api/partner/reset-password', { token, new_password: password });
      setStatus({ ok: true, text: data.message });
    } catch (err) {
      setStatus({ ok: false, text: err instanceof Error ? err.message : 'Could not save password' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <PartnerAuthLayout title={setup ? 'You’re approved.' : 'Set a new'} highlight={setup ? 'Create your password.' : 'password.'} text={setup ? 'Welcome to the Intube Media partner network. Choose a password to open your distribution dashboard.' : 'Choose a strong password you don’t use anywhere else.'}>
      <SEO title={setup ? 'Create Partner Password | Intube Media' : 'New Partner Password | Intube Media'} description="Set your Intube Media partner portal password." path="/partner/reset-password" />
      <form onSubmit={submit} className="border-gradient w-full rounded-3xl bg-ink-800/70 p-7 shadow-card sm:p-10">
        <h2 className="text-4xl font-bold">{setup ? 'Create password' : 'Reset password'}</h2>
        <p className="mt-2 text-sm text-mist">At least 8 characters with letters and numbers.</p>
        {!token ? (
          <div className="mt-8"><Notice ok={false}>This link is incomplete. <Link to="/partner/forgot-password" className="underline">Request a new link</Link>.</Notice></div>
        ) : status?.ok ? (
          <div className="mt-8 space-y-6"><Notice ok>{status.text}</Notice><Link to="/partner/login" className="inline-flex w-full justify-center rounded-full bg-aurora px-7 py-4 font-bold">Sign in now</Link></div>
        ) : (
          <>
            <div className="mt-8 space-y-4">
              <Field label="New password"><input required type="password" minLength={8} value={password} onChange={(e) => setPassword(e.target.value)} className={fieldClass} autoComplete="new-password" /></Field>
              <Field label="Confirm password"><input required type="password" minLength={8} value={confirm} onChange={(e) => setConfirm(e.target.value)} className={fieldClass} autoComplete="new-password" /></Field>
            </div>
            {status && <div className="mt-4"><Notice ok={false}>{status.text}</Notice></div>}
            <button type="submit" disabled={loading} className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-aurora px-7 py-4 font-bold text-white shadow-glow disabled:opacity-60">
              {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : 'Save password'}
            </button>
          </>
        )}
      </form>
    </PartnerAuthLayout>
  );
}
