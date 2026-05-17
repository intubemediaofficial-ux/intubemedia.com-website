import { useEffect, useState } from 'react';
import { FileText, Plus, Edit2, Trash2, Save, X } from 'lucide-react';
import { api } from '../../utils/api';

interface Page {
  id?: number;
  slug: string;
  title: string;
  content: string;
  meta_title: string;
  meta_description: string;
  is_active: number;
}

const emptyPage: Page = {
  slug: '', title: '', content: '', meta_title: '', meta_description: '', is_active: 1,
};

export default function AdminPages() {
  const [pages, setPages] = useState<Page[]>([]);
  const [editing, setEditing] = useState<Page | null>(null);
  const [loading, setLoading] = useState(true);
  const [msg, setMsg] = useState('');

  const load = () => {
    setLoading(true);
    api.get('/api/pages').then(d => { setPages(d); setLoading(false); }).catch(() => setLoading(false));
  };

  useEffect(() => { load(); }, []);

  const handleSave = async () => {
    if (!editing) return;
    setMsg('');
    try {
      if (editing.id) {
        await api.put(`/api/pages/${editing.id}`, editing);
      } else {
        await api.post('/api/pages', editing);
      }
      setEditing(null);
      load();
      setMsg('Page saved!');
    } catch (err) {
      setMsg(err instanceof Error ? err.message : 'Save failed');
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Delete this page?')) return;
    try {
      await api.delete(`/api/pages/${id}`);
      load();
      setMsg('Page deleted');
    } catch (err) {
      setMsg(err instanceof Error ? err.message : 'Delete failed');
    }
  };

  if (editing) {
    return (
      <div>
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">{editing.id ? 'Edit Page' : 'New Page'}</h1>
          <button onClick={() => setEditing(null)} className="text-gray-400 hover:text-white"><X className="w-6 h-6" /></button>
        </div>
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-gray-400 mb-1">Title *</label>
              <input value={editing.title} onChange={e => setEditing({ ...editing, title: e.target.value })}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-violet-500" />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1">Slug *</label>
              <input value={editing.slug} onChange={e => setEditing({ ...editing, slug: e.target.value })}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-violet-500"
                placeholder="about-us" />
            </div>
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-1">Content (HTML supported)</label>
            <textarea value={editing.content} onChange={e => setEditing({ ...editing, content: e.target.value })} rows={12}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white font-mono text-sm focus:outline-none focus:border-violet-500" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-gray-400 mb-1">Meta Title (SEO)</label>
              <input value={editing.meta_title} onChange={e => setEditing({ ...editing, meta_title: e.target.value })}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-violet-500" />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1">Meta Description (SEO)</label>
              <input value={editing.meta_description} onChange={e => setEditing({ ...editing, meta_description: e.target.value })}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-violet-500" />
            </div>
          </div>
          <div className="flex items-center gap-3">
            <label className="text-sm text-gray-400">Active</label>
            <button onClick={() => setEditing({ ...editing, is_active: editing.is_active ? 0 : 1 })}
              className={`w-12 h-6 rounded-full transition-colors ${editing.is_active ? 'bg-violet-600' : 'bg-gray-600'}`}>
              <div className={`w-5 h-5 bg-white rounded-full transition-transform ${editing.is_active ? 'translate-x-6' : 'translate-x-0.5'}`} />
            </button>
          </div>
          <div className="flex gap-3 pt-4">
            <button onClick={handleSave} className="flex items-center gap-2 bg-violet-600 hover:bg-violet-700 px-6 py-2.5 rounded-xl font-medium transition-colors">
              <Save className="w-4 h-4" /> Save Page
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
          <FileText className="w-7 h-7 text-emerald-400" />
          <h1 className="text-2xl font-bold">Pages</h1>
          <span className="text-gray-500 text-sm">({pages.length})</span>
        </div>
        <button onClick={() => setEditing({ ...emptyPage })}
          className="flex items-center gap-2 bg-violet-600 hover:bg-violet-700 px-4 py-2 rounded-xl text-sm font-medium transition-colors">
          <Plus className="w-4 h-4" /> Add Page
        </button>
      </div>

      {msg && <div className="bg-violet-500/10 border border-violet-500/30 text-violet-300 rounded-xl px-4 py-3 text-sm mb-4">{msg}</div>}

      {loading ? (
        <div className="text-center py-20 text-gray-500">Loading...</div>
      ) : pages.length === 0 ? (
        <div className="text-center py-20 text-gray-500">No pages yet.</div>
      ) : (
        <div className="space-y-3">
          {pages.map(page => (
            <div key={page.id} className="flex items-center gap-4 bg-white/5 border border-white/10 rounded-2xl p-4">
              <FileText className="w-5 h-5 text-emerald-400 flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="font-semibold truncate">{page.title}</p>
                <p className="text-gray-500 text-sm">/{page.slug}</p>
              </div>
              <span className={`text-xs px-2 py-0.5 rounded-full ${page.is_active ? 'bg-green-500/20 text-green-400' : 'bg-gray-500/20 text-gray-400'}`}>
                {page.is_active ? 'Active' : 'Inactive'}
              </span>
              <button onClick={() => setEditing(page)} className="text-gray-400 hover:text-white p-1"><Edit2 className="w-4 h-4" /></button>
              <button onClick={() => handleDelete(page.id!)} className="text-gray-400 hover:text-red-400 p-1"><Trash2 className="w-4 h-4" /></button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
