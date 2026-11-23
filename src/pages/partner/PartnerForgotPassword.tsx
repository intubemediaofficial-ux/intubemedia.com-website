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
  const [step, setStep] = useState<'request' | 'verify' | 'done'>('request');
  const [otp, setOtp] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<{ ok: boolean; text: string } | null>(null);

  const requestCode = async (e: FormEvent) => {
    e.preventDefault();
    if (!token) { setStatus({ ok: false, text: 'Please complete the security check.' }); return; }
    setLoading(true);
    try {
      const data = await partnerApi.post('/api/partner/forgot-password', { email, turnstile_token: token });
      setStatus({ ok: true, text: data.message || 'If this email has a partner account, a 6-digit code is on its way.' });
      setStep('verify');
    } catch (err) {
      setStatus({ ok: false, text: err instanceof Error ? err.message : 'Request failed' });
    } finally {
      setToken('');
      setResetKey((k) => k + 1);
      setLoading(false);
    }
  };

  const resetPassword = async (e: FormEvent) => {
    e.preventDefault();
    if (password !== confirm) { setStatus({ ok: false, text: 'Passwords do not match.' }); return; }
    setLoading(true);
    try {
      const data = await partnerApi.post('/api/partner/reset-password', { email, otp: otp.trim(), new_password: password });
      setStatus({ ok: true, text: data.message });
      setStep('done');
    } catch (err) {
      setStatus({ ok: false, text: err instanceof Error ? err.message : 'Could not save password' });
    } finally {
      setLoading(false);
    }
  };

  const button = 'mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-aurora px-7 py-4 font-bold text-white shadow-glow disabled:opacity-60';

  return (
    <PartnerAuthLayout title="Locked out?" highlight="We’ve got you." text="Enter the email linked to your partner account and we’ll email you a 6-digit code to set a new password.">
      <SEO title="Reset Partner Password | Intube Media" description="Reset your Intube Media partner portal password." path="/partner/forgot-password" />
      <form onSubmit={step === 'request' ? requestCode : resetPassword} className="border-gradient w-full rounded-3xl bg-ink-800/70 p-7 shadow-card sm:p-10">
        <h2 className="text-4xl font-bold">Forgot password</h2>
        <p className="mt-2 text-sm text-mist">
          {step === 'request' ? 'The code stays valid for 10 minutes.' : `Code sent to ${email}. At least 8 characters with letters and numbers.`}
        </p>
        {step === 'request' && (
          <>
            <div className="mt-8"><Field label="Email address"><input required type="email" value={email} onChange={(e) => setEmail(e.target.value)} className={fieldClass} autoComplete="email" /></Field></div>
            <div className="mt-5"><Turnstile onToken={setToken} resetKey={resetKey} /></div>
          </>
        )}
        {step === 'verify' && (
          <div className="mt-8 space-y-4">
            <Field label="6-digit code"><input required inputMode="numeric" autoComplete="one-time-code" pattern="\d{6}" value={otp} onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))} className={`${fieldClass} text-center text-lg tracking-[0.5em]`} /></Field>
            <Field label="New password"><input required type="password" minLength={8} value={password} onChange={(e) => setPassword(e.target.value)} className={fieldClass} autoComplete="new-password" /></Field>
            <Field label="Confirm password"><input required type="password" minLength={8} value={confirm} onChange={(e) => setConfirm(e.target.value)} className={fieldClass} autoComplete="new-password" /></Field>
          </div>
        )}
        {status && <div className="mt-4"><Notice ok={status.ok}>{status.text}</Notice></div>}
        {step === 'done' ? (
          <Link to="/partner/login" className="mt-6 inline-flex w-full justify-center rounded-full bg-aurora px-7 py-4 font-bold">Sign in now</Link>
        ) : (
          <button type="submit" disabled={loading} className={button}>
            {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : step === 'request' ? 'Send code' : 'Save password'}
          </button>
        )}
        {step === 'verify' && (
          <button type="button" onClick={() => { setStep('request'); setStatus(null); setOtp(''); }} className="mt-4 w-full text-center text-sm text-mist hover:text-white">Send a new code</button>
        )}
        <p className="mt-6 text-center text-sm text-mist"><Link to="/partner/login" className="font-bold text-white hover:underline">Back to sign in</Link></p>
      </form>
    </PartnerAuthLayout>
  );
}
