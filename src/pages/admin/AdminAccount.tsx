import { useEffect, useState } from 'react';
import { KeyRound, Save } from 'lucide-react';
import { api } from '../../utils/api';

export default function AdminAccount() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmation, setConfirmation] = useState('');
  const [message, setMessage] = useState('');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    api.get('/api/auth/me').then((admin) => {
      setUsername(admin.username);
      setEmail(admin.email);
    }).catch(() => undefined);
  }, []);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (newPassword !== confirmation) {
      setMessage('New passwords do not match');
      return;
    }
    setSaving(true);
    setMessage('');
    try {
      const response = await api.post('/api/auth/change-password', {
        old_password: oldPassword,
        new_password: newPassword,
      });
      setOldPassword('');
      setNewPassword('');
      setConfirmation('');
      setMessage(response.message);
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'Password change failed');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="max-w-2xl">
      <div className="flex items-center gap-3 mb-6">
        <KeyRound className="w-7 h-7 text-violet-400" />
        <h1 className="text-2xl font-bold">Account & Security</h1>
      </div>
      <div className="bg-white/5 border border-white/10 rounded-2xl p-6 mb-6">
        <p className="text-sm text-gray-400">Admin username</p>
        <p className="font-semibold mt-1">{username || 'Loading...'}</p>
        <p className="text-sm text-gray-400 mt-4">Recovery email</p>
        <p className="font-semibold mt-1">{email || 'Not configured'}</p>
      </div>
      <form onSubmit={handleSubmit} className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-4">
        <h2 className="text-lg font-semibold">Change password</h2>
        {message && (
          <div className="bg-violet-500/10 border border-violet-500/30 text-violet-300 rounded-xl px-4 py-3 text-sm">
            {message}
          </div>
        )}
        <input
          type="password"
          value={oldPassword}
          onChange={(event) => setOldPassword(event.target.value)}
          placeholder="Current password"
          autoComplete="current-password"
          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-violet-500"
          required
        />
        <input
          type="password"
          value={newPassword}
          onChange={(event) => setNewPassword(event.target.value)}
          placeholder="New password"
          autoComplete="new-password"
          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-violet-500"
          required
        />
        <input
          type="password"
          value={confirmation}
          onChange={(event) => setConfirmation(event.target.value)}
          placeholder="Confirm new password"
          autoComplete="new-password"
          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-violet-500"
          required
        />
        <p className="text-xs text-gray-500">At least 12 characters with uppercase, lowercase and a number.</p>
        <button
          type="submit"
          disabled={saving}
          className="inline-flex items-center gap-2 bg-violet-600 hover:bg-violet-700 px-5 py-2.5 rounded-xl font-medium disabled:opacity-50"
        >
          <Save className="w-4 h-4" /> {saving ? 'Saving...' : 'Change password'}
        </button>
      </form>
    </div>
  );
}
