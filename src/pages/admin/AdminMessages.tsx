import { useEffect, useState } from 'react';
import { Mail, Trash2, Eye, EyeOff } from 'lucide-react';
import { api } from '../../utils/api';

interface Submission {
  id: number;
  name: string;
  phone: string;
  email: string;
  service: string;
  message: string;
  is_read: number;
  created_at: string;
}

export default function AdminMessages() {
  const [subs, setSubs] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<Submission | null>(null);
  const [msg, setMsg] = useState('');

  const load = () => {
    setLoading(true);
    api.get('/api/contact-submissions').then(d => { setSubs(d); setLoading(false); }).catch((error) => {
      setMsg(error instanceof Error ? error.message : 'Unable to load messages');
      setLoading(false);
    });
  };

  useEffect(() => { load(); }, []);

  const markRead = async (id: number) => {
    await api.put(`/api/contact-submissions/${id}/read`, {});
    load();
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Delete this message?')) return;
    try {
      await api.delete(`/api/contact-submissions/${id}`);
      if (selected?.id === id) setSelected(null);
      load();
      setMsg('Message deleted');
    } catch (err) {
      setMsg(err instanceof Error ? err.message : 'Delete failed');
    }
  };

  const handleView = (sub: Submission) => {
    setSelected(sub);
    if (!sub.is_read) markRead(sub.id);
  };

  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <Mail className="w-7 h-7 text-blue-400" />
        <h1 className="text-2xl font-bold">Messages</h1>
        <span className="text-gray-500 text-sm">({subs.length})</span>
        {subs.filter(s => !s.is_read).length > 0 && (
          <span className="bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
            {subs.filter(s => !s.is_read).length} unread
          </span>
        )}
      </div>

      {msg && <div className="bg-violet-500/10 border border-violet-500/30 text-violet-300 rounded-xl px-4 py-3 text-sm mb-4">{msg}</div>}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-1 space-y-2">
          {loading ? (
            <div className="text-center py-20 text-gray-500">Loading...</div>
          ) : subs.length === 0 ? (
            <div className="text-center py-20 text-gray-500">No messages yet.</div>
          ) : (
            subs.map(sub => (
              <button
                key={sub.id}
                onClick={() => handleView(sub)}
                className={`w-full text-left p-4 rounded-xl border transition-colors ${
                  selected?.id === sub.id
                    ? 'bg-violet-600/20 border-violet-500/30'
                    : 'bg-white/5 border-white/10 hover:bg-white/10'
                }`}
              >
                <div className="flex items-center gap-2 mb-1">
                  {!sub.is_read && <div className="w-2 h-2 rounded-full bg-blue-500" />}
                  <p className={`font-medium text-sm truncate ${!sub.is_read ? 'text-white' : 'text-gray-300'}`}>{sub.name}</p>
                </div>
                <p className="text-gray-500 text-xs truncate">{sub.service} • {sub.email}</p>
                <p className="text-gray-600 text-xs mt-1">{new Date(sub.created_at).toLocaleDateString()}</p>
              </button>
            ))
          )}
        </div>

        <div className="lg:col-span-2">
          {selected ? (
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h2 className="text-xl font-semibold">{selected.name}</h2>
                  <p className="text-gray-400 text-sm mt-1">{selected.email} • {selected.phone}</p>
                  <p className="text-gray-500 text-xs mt-1">{new Date(selected.created_at).toLocaleString()}</p>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => markRead(selected.id)} className="text-gray-400 hover:text-white p-2" title="Toggle read">
                    {selected.is_read ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                  <button onClick={() => handleDelete(selected.id)} className="text-gray-400 hover:text-red-400 p-2" title="Delete">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="mb-4">
                <span className="text-xs bg-violet-500/20 text-violet-300 px-2 py-0.5 rounded-full">{selected.service}</span>
              </div>

              <div className="bg-white/5 rounded-xl p-4">
                <p className="text-gray-300 whitespace-pre-wrap">{selected.message}</p>
              </div>
            </div>
          ) : (
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 flex items-center justify-center min-h-[300px]">
              <p className="text-gray-500">Select a message to view</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
