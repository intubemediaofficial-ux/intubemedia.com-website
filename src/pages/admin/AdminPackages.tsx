import { useEffect, useState } from 'react';
import { Package, Plus, Edit2, Trash2, Save, X } from 'lucide-react';
import { api } from '../../utils/api';

interface Pkg {
  id?: number;
  name: string;
  tagline: string;
  color: string;
  is_popular: number | boolean;
  features: string;
  sort_order: number;
  is_active: number | boolean;
}

const emptyPkg: Pkg = {
  name: '', tagline: '', color: 'from-blue-500 to-cyan-400', is_popular: 0,
  features: '', sort_order: 0, is_active: 1,
};

export default function AdminPackages() {
  const [packages, setPackages] = useState<Pkg[]>([]);
  const [editing, setEditing] = useState<Pkg | null>(null);
  const [loading, setLoading] = useState(true);
  const [msg, setMsg] = useState('');

  const load = () => {
    setLoading(true);
    api.get('/api/packages').then(data => {
      setPackages(data.map((pkg: Omit<Pkg, 'features'> & { features: string[] }) => ({
        ...pkg,
        features: pkg.features.join('\n'),
      })));
      setLoading(false);
    }).catch((error) => {
      setMsg(error instanceof Error ? error.message : 'Unable to load packages');
      setLoading(false);
    });
  };

  useEffect(() => { load(); }, []);

  const handleSave = async () => {
    if (!editing) return;
    setMsg('');
    try {
      const payload = {
        ...editing,
        features: editing.features.split('\n').map(feature => feature.trim()).filter(Boolean),
        is_popular: Boolean(editing.is_popular),
        is_active: Boolean(editing.is_active),
      };
      if (editing.id) {
        await api.put(`/api/packages/${editing.id}`, payload);
      } else {
        await api.post('/api/packages', payload);
      }
      setEditing(null);
      load();
      setMsg('Package saved!');
    } catch (err) {
      setMsg(err instanceof Error ? err.message : 'Save failed');
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Delete this package?')) return;
    try {
      await api.delete(`/api/packages/${id}`);
      load();
      setMsg('Package deleted');
    } catch (err) {
      setMsg(err instanceof Error ? err.message : 'Delete failed');
    }
  };

  if (editing) {
    return (
      <div>
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">{editing.id ? 'Edit Package' : 'New Package'}</h1>
          <button onClick={() => setEditing(null)} className="text-gray-400 hover:text-white"><X className="w-6 h-6" /></button>
        </div>
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-gray-400 mb-1">Name *</label>
              <input value={editing.name} onChange={e => setEditing({ ...editing, name: e.target.value })}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-violet-500" />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1">Color</label>
              <input value={editing.color} onChange={e => setEditing({ ...editing, color: e.target.value })}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-violet-500" />
            </div>
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-1">Tagline</label>
            <input value={editing.tagline} onChange={e => setEditing({ ...editing, tagline: e.target.value })}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-violet-500" />
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-1">Features (one per line)</label>
            <textarea value={editing.features} onChange={e => setEditing({ ...editing, features: e.target.value })} rows={6}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-violet-500"
              placeholder="Logo Design&#10;Website Development&#10;Social Media Setup" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-gray-400 mb-1">Sort Order</label>
              <input type="number" value={editing.sort_order} onChange={e => setEditing({ ...editing, sort_order: parseInt(e.target.value) || 0 })}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-violet-500" />
            </div>
            <div className="flex items-end gap-6">
              <div className="flex items-center gap-3">
                <label className="text-sm text-gray-400">Active</label>
                <button onClick={() => setEditing({ ...editing, is_active: editing.is_active ? 0 : 1 })}
                  className={`w-12 h-6 rounded-full transition-colors ${editing.is_active ? 'bg-violet-600' : 'bg-gray-600'}`}>
                  <div className={`w-5 h-5 bg-white rounded-full transition-transform ${editing.is_active ? 'translate-x-6' : 'translate-x-0.5'}`} />
                </button>
              </div>
              <div className="flex items-center gap-3">
                <label className="text-sm text-gray-400">Popular</label>
                <button onClick={() => setEditing({ ...editing, is_popular: editing.is_popular ? 0 : 1 })}
                  className={`w-12 h-6 rounded-full transition-colors ${editing.is_popular ? 'bg-pink-600' : 'bg-gray-600'}`}>
                  <div className={`w-5 h-5 bg-white rounded-full transition-transform ${editing.is_popular ? 'translate-x-6' : 'translate-x-0.5'}`} />
                </button>
              </div>
            </div>
          </div>
          <div className="flex gap-3 pt-4">
            <button onClick={handleSave} className="flex items-center gap-2 bg-violet-600 hover:bg-violet-700 px-6 py-2.5 rounded-xl font-medium transition-colors">
              <Save className="w-4 h-4" /> Save Package
            </button>
            <button onClick={() => setEditing(null)} className="px-6 py-2.5 rounded-xl border border-white/10 hover:bg-white/5 transition-colors">
              Cancel
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <Package className="w-7 h-7 text-pink-400" />
          <h1 className="text-2xl font-bold">Packages</h1>
          <span className="text-gray-500 text-sm">({packages.length})</span>
        </div>
        <button onClick={() => setEditing({ ...emptyPkg })}
          className="flex items-center gap-2 bg-violet-600 hover:bg-violet-700 px-4 py-2 rounded-xl text-sm font-medium transition-colors">
          <Plus className="w-4 h-4" /> Add Package
        </button>
      </div>

      {msg && <div className="bg-violet-500/10 border border-violet-500/30 text-violet-300 rounded-xl px-4 py-3 text-sm mb-4">{msg}</div>}

      {loading ? (
        <div className="text-center py-20 text-gray-500">Loading...</div>
      ) : packages.length === 0 ? (
        <div className="text-center py-20 text-gray-500">No packages yet.</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {packages.map(pkg => (
            <div key={pkg.id} className="bg-white/5 border border-white/10 rounded-2xl p-5">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <p className="font-semibold text-lg">{pkg.name}</p>
                  <p className="text-gray-500 text-sm">{pkg.tagline}</p>
                </div>
                {pkg.is_popular ? <span className="text-xs bg-pink-500/20 text-pink-400 px-2 py-0.5 rounded-full">Popular</span> : null}
              </div>
              <div className="space-y-1 mb-4">
                {pkg.features.split('\n').filter(Boolean).map((f, i) => (
                  <p key={i} className="text-gray-400 text-sm">• {f}</p>
                ))}
              </div>
              <div className="flex items-center justify-between pt-3 border-t border-white/10">
                <span className={`text-xs px-2 py-0.5 rounded-full ${pkg.is_active ? 'bg-green-500/20 text-green-400' : 'bg-gray-500/20 text-gray-400'}`}>
                  {pkg.is_active ? 'Active' : 'Inactive'}
                </span>
                <div className="flex gap-2">
                  <button onClick={() => setEditing(pkg)} className="text-gray-400 hover:text-white p-1"><Edit2 className="w-4 h-4" /></button>
                  <button onClick={() => handleDelete(pkg.id!)} className="text-gray-400 hover:text-red-400 p-1"><Trash2 className="w-4 h-4" /></button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
