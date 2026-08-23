import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Mail } from 'lucide-react';
import { api } from '../../utils/api';

export default function AdminForgotPassword() {
  const [identifier, setIdentifier] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    try {
      const response = await api.post('/api/auth/forgot-password', { identifier });
      setMessage(response.message);
    } catch {
      setMessage('Unable to request a reset link right now. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center px-4 text-white">
      <div className="w-full max-w-md">
        <Link to="/admin/login" className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-white mb-6">
          <ArrowLeft className="w-4 h-4" /> Back to login
        </Link>
        <form onSubmit={handleSubmit} className="bg-white/5 border border-white/10 rounded-2xl p-8 space-y-5">
          <div>
            <div className="w-12 h-12 rounded-xl bg-violet-600/20 flex items-center justify-center mb-4">
              <Mail className="w-6 h-6 text-violet-300" />
            </div>
            <h1 className="text-2xl font-bold">Reset admin password</h1>
            <p className="text-gray-400 text-sm mt-2">
              Enter your admin username or recovery email.
            </p>
          </div>
          {message && (
            <div className="bg-violet-500/10 border border-violet-500/30 text-violet-300 rounded-xl px-4 py-3 text-sm">
              {message}
            </div>
          )}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Username or email</label>
            <input
              value={identifier}
              onChange={(event) => setIdentifier(event.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-violet-500"
              autoComplete="username"
              required
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-violet-600 to-pink-600 py-3 rounded-xl font-semibold hover:opacity-90 disabled:opacity-50"
          >
            {loading ? 'Sending...' : 'Send reset link'}
          </button>
        </form>
      </div>
    </div>
  );
}
