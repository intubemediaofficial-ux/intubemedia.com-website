import { useEffect, useState } from 'react';
import { Check, Copy, Handshake, Trash2, X } from 'lucide-react';
import { api } from '../../utils/api';

interface Application {
  id: number;
  full_name: string;
  business_name: string;
  email: string;
  phone: string;
  whatsapp: string;
  country: string;
  category: string;
  catalog_size: string;
  music_links: string;
  about: string;
  distribution_needs: string;
  status: string;
  admin_note: string;
  created_at: string;
  reviewed_at: string | null;
  partner_active?: number | null;
}

const badge: Record<string, string> = {
  pending: 'bg-amber-500/15 text-amber-300',
  approved: 'bg-emerald-500/15 text-emerald-300',
  rejected: 'bg-red-500/15 text-red-300',
};

export default function AdminPartners() {
  const [apps, setApps] = useState<Application[]>([]);
  const [filter, setFilter] = useState('pending');
  const [selected, setSelected] = useState<Application | null>(null);
  const [note, setNote] = useState('');
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState('');
  const [setupUrl, setSetupUrl] = useState('');

  const load = () => api.get('/api/partner-applications').then((d: Application[]) => {
    setApps(d);
    setSelected((cur) => (cur ? d.find((a) => a.id === cur.id) || null : null));
  }).catch((e) => setMsg(e instanceof Error ? e.message : 'Unable to load applications'));

  useEffect(() => { load(); }, []);

  const act = async (action: 'approve' | 'reject') => {
    if (!selected) return;
    setBusy(true); setMsg(''); setSetupUrl('');
    try {
      const res = await api.post(`/api/partner-applications/${selected.id}/${action}`, { note });
      if (action === 'approve') {
        setSetupUrl(res.setup_url);
        setMsg(res.emailed ? `Approved. Setup email sent to ${selected.email}.` : 'Approved, but the email could not be sent — share the setup link below.');
      } else {
        setMsg('Application rejected and partner access disabled.');
      }
      setNote('');
      await load();
    } catch (e) {
      setMsg(e instanceof Error ? e.message : 'Action failed');
    } finally {
      setBusy(false);
    }
  };

  const remove = async (id: number) => {
    if (!confirm('Delete this application permanently?')) return;
    await api.delete(`/api/partner-applications/${id}`);
    setSelected(null);
    load();
  };

  const list = apps.filter((a) => filter === 'all' || a.status === filter);
  const rows: [string, string][] = selected ? [
    ['Business', selected.business_name], ['Email', selected.email], ['Phone', selected.phone], ['WhatsApp', selected.whatsapp],
    ['Country', selected.country], ['Category', selected.category], ['Catalog size', selected.catalog_size],
    ['Music links', selected.music_links], ['About', selected.about], ['Distribution needs', selected.distribution_needs],
  ] : [];

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-center gap-3">
        <Handshake className="h-7 w-7 text-blue-400" />
        <h1 className="text-2xl font-bold">Partner Applications</h1>
        <div className="ml-auto flex gap-1 rounded-xl bg-white/5 p-1 text-sm">
          {['pending', 'approved', 'rejected', 'all'].map((f) => (
            <button key={f} type="button" onClick={() => setFilter(f)} className={`rounded-lg px-3 py-1.5 capitalize ${filter === f ? 'bg-violet-600 text-white' : 'text-gray-400 hover:text-white'}`}>
              {f} ({f === 'all' ? apps.length : apps.filter((a) => a.status === f).length})
            </button>
          ))}
        </div>
      </div>
      {msg && <div className="mb-4 rounded-xl border border-violet-500/30 bg-violet-500/10 px-4 py-3 text-sm text-violet-300">{msg}</div>}
      {setupUrl && (
        <div className="mb-4 flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-xs">
          <span className="truncate text-gray-300">{setupUrl}</span>
          <button type="button" onClick={() => navigator.clipboard.writeText(setupUrl)} className="ml-auto flex shrink-0 items-center gap-1 rounded-lg bg-white/10 px-2 py-1"><Copy className="h-3.5 w-3.5" /> Copy</button>
        </div>
      )}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <div className="space-y-2">
          {list.length === 0 && <div className="py-20 text-center text-gray-500">No applications.</div>}
          {list.map((a) => (
            <button key={a.id} type="button" onClick={() => { setSelected(a); setSetupUrl(''); }} className={`w-full rounded-xl border p-4 text-left transition ${selected?.id === a.id ? 'border-violet-500 bg-violet-500/10' : 'border-white/10 bg-white/5 hover:bg-white/10'}`}>
              <div className="flex items-center justify-between gap-2">
                <span className="truncate font-semibold">{a.full_name}</span>
                <span className={`rounded-full px-2 py-0.5 text-xs capitalize ${badge[a.status] || ''}`}>{a.status}</span>
              </div>
              <p className="truncate text-sm text-gray-400">{a.business_name || a.email}</p>
              <p className="mt-1 text-xs text-gray-500">{new Date(a.created_at.replace(' ', 'T') + 'Z').toLocaleString()}</p>
            </button>
          ))}
        </div>
        <div className="lg:col-span-2">
          {selected ? (
            <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <h2 className="text-xl font-bold">{selected.full_name}</h2>
                  <span className={`mt-1 inline-block rounded-full px-2 py-0.5 text-xs capitalize ${badge[selected.status] || ''}`}>{selected.status}</span>
                </div>
                <button type="button" onClick={() => remove(selected.id)} className="rounded-lg p-2 text-red-400 hover:bg-red-500/10" aria-label="Delete application"><Trash2 className="h-5 w-5" /></button>
              </div>
              <dl className="mt-6 grid gap-4 sm:grid-cols-2">
                {rows.map(([k, v]) => (
                  <div key={k} className={k === 'About' || k === 'Distribution needs' || k === 'Music links' ? 'sm:col-span-2' : ''}>
                    <dt className="text-xs uppercase tracking-wider text-gray-500">{k}</dt>
                    <dd className="mt-1 whitespace-pre-wrap break-words text-sm text-gray-200">{v || '—'}</dd>
                  </div>
                ))}
              </dl>
              {selected.admin_note && <p className="mt-4 text-sm text-gray-400">Note: {selected.admin_note}</p>}
              <textarea value={note} onChange={(e) => setNote(e.target.value)} rows={2} placeholder="Internal note (optional)" className="mt-6 w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-sm outline-none focus:border-violet-500" />
              <div className="mt-4 flex flex-wrap gap-3">
                <button type="button" disabled={busy} onClick={() => act('approve')} className="flex items-center gap-2 rounded-xl bg-emerald-600 px-5 py-2.5 text-sm font-semibold hover:bg-emerald-500 disabled:opacity-50">
                  <Check className="h-4 w-4" /> {selected.status === 'approved' ? 'Resend setup link' : 'Approve & send login'}
                </button>
                {selected.status !== 'rejected' && (
                  <button type="button" disabled={busy} onClick={() => act('reject')} className="flex items-center gap-2 rounded-xl bg-red-600/80 px-5 py-2.5 text-sm font-semibold hover:bg-red-500 disabled:opacity-50"><X className="h-4 w-4" /> Reject</button>
                )}
                <a href={`mailto:${selected.email}`} className="rounded-xl border border-white/10 px-5 py-2.5 text-sm font-semibold hover:bg-white/10">Reply by email</a>
              </div>
            </div>
          ) : (
            <div className="rounded-2xl border border-dashed border-white/10 py-24 text-center text-gray-500">Select an application to review.</div>
          )}
        </div>
      </div>
    </div>
  );
}
