import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, KeyRound, Mail } from 'lucide-react';
import { api } from '../../utils/api';

const inputClass =
  'w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-violet-500';

export default function AdminForgotPassword() {
  const [identifier, setIdentifier] = useState('');
  const [step, setStep] = useState<'request' | 'verify' | 'done'>('request');
  const [otp, setOtp] = useState('');
  const [password, setPassword] = useState('');
  const [confirmation, setConfirmation] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const requestCode = async (event?: React.FormEvent) => {
    event?.preventDefault();
    setLoading(true);
    setError(false);
    try {
      const response = await api.post('/api/auth/forgot-password', { identifier });
      setMessage(response.message);
      setStep('verify');
    } catch {
      setError(true);
      setMessage('Unable to send a code right now. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const resetPassword = async (event: React.FormEvent) => {
    event.preventDefault();
    setError(true);
    if (password !== confirmation) {
      setMessage('Passwords do not match');
      return;
    }
    setLoading(true);
    try {
      const response = await api.post('/api/auth/reset-password', {
        identifier,
        otp: otp.trim(),
        new_password: password,
      });
      setError(false);
      setMessage(response.message);
      setStep('done');
    } catch (err) {
      setMessage(err instanceof Error ? err.message : 'Password reset failed');
    } finally {
      setLoading(false);
    }
  };

  const Icon = step === 'request' ? Mail : KeyRound;

  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center px-4 text-white">
      <div className="w-full max-w-md">
        <Link to="/admin/login" className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-white mb-6">
          <ArrowLeft className="w-4 h-4" /> Back to login
        </Link>
        <form
          onSubmit={step === 'request' ? requestCode : resetPassword}
          className="bg-white/5 border border-white/10 rounded-2xl p-8 space-y-5"
        >
          <div>
            <div className="w-12 h-12 rounded-xl bg-violet-600/20 flex items-center justify-center mb-4">
              <Icon className="w-6 h-6 text-violet-300" />
            </div>
            <h1 className="text-2xl font-bold">Reset admin password</h1>
            <p className="text-gray-400 text-sm mt-2">
              {step === 'request'
                ? 'Enter your admin email. We will email you a 6-digit code.'
                : 'Enter the code from your email and choose a new password (12+ characters with uppercase, lowercase and a number).'}
            </p>
          </div>
          {message && (
            <div className={`${error ? 'bg-red-500/10 border-red-500/30 text-red-300' : 'bg-violet-500/10 border-violet-500/30 text-violet-300'} border rounded-xl px-4 py-3 text-sm`}>
              {message}
            </div>
          )}
          {step === 'request' && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Admin email or username</label>
                <input
                  value={identifier}
                  onChange={(event) => setIdentifier(event.target.value)}
                  className={inputClass}
                  autoComplete="username"
                  required
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-violet-600 to-pink-600 py-3 rounded-xl font-semibold hover:opacity-90 disabled:opacity-50"
              >
                {loading ? 'Sending...' : 'Send code'}
              </button>
            </>
          )}
          {step === 'verify' && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">6-digit code</label>
                <input
                  value={otp}
                  onChange={(event) => setOtp(event.target.value.replace(/\D/g, '').slice(0, 6))}
                  className={`${inputClass} tracking-[0.5em] text-center text-lg`}
                  inputMode="numeric"
                  autoComplete="one-time-code"
                  pattern="\d{6}"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">New password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  className={inputClass}
                  autoComplete="new-password"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Confirm password</label>
                <input
                  type="password"
                  value={confirmation}
                  onChange={(event) => setConfirmation(event.target.value)}
                  className={inputClass}
                  autoComplete="new-password"
                  required
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-violet-600 to-pink-600 py-3 rounded-xl font-semibold hover:opacity-90 disabled:opacity-50"
              >
                {loading ? 'Saving...' : 'Reset password'}
              </button>
              <button
                type="button"
                onClick={() => requestCode()}
                disabled={loading}
                className="w-full text-sm text-gray-400 hover:text-white disabled:opacity-50"
              >
                Didn’t get it? Send a new code
              </button>
            </>
          )}
          {step === 'done' && (
            <Link to="/admin/login" className="block text-center bg-violet-600 py-3 rounded-xl font-semibold hover:bg-violet-700">
              Continue to login
            </Link>
          )}
        </form>
      </div>
    </div>
  );
}
