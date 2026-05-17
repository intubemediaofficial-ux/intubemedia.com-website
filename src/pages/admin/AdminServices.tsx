import { useEffect, useState } from 'react';
import { Settings, Plus, Edit2, Trash2, Save, X, ChevronDown, ChevronUp } from 'lucide-react';
import { api } from '../../utils/api';

interface ServiceItem {
  id?: number;
  service_id?: number;
  icon: string;
  name: string;
  description: string;
  sort_order: number;
  is_active: number;
}

interface Service {
  id?: number;
  slug: string;
  title: string;
  icon: string;
  color: string;
  section: string;
  tagline: string;
  description: string;
  meta_title: string;
  meta_description: string;
  sort_order: number;
  is_active: number;
  items?: ServiceItem[];
}

const emptyService: Service = {
  slug: '', title: '', icon: '💼', color: 'violet', section: 'business',
  tagline: '', description: '', meta_title: '', meta_description: '',
  sort_order: 0, is_active: 1, items: [],
};

const emptyItem: ServiceItem = {
  icon: '✓', name: '', description: '', sort_order: 0, is_active: 1,
};

export default function AdminServices() {
  const [services, setServices] = useState<Service[]>([]);
  const [editing, setEditing] = useState<Service | null>(null);
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [msg, setMsg] = useState('');

  const load = () => {
    setLoading(true);
    api.get('/api/services').then(d => { setServices(d); setLoading(false); }).catch(() => setLoading(false));
  };

  useEffect(() => { load(); }, []);

  const handleSave = async () => {
    if (!editing) return;
    setMsg('');
    try {
      if (editing.id) {
        await api.put(`/api/services/${editing.id}`, editing);
      } else {
        await api.post('/api/services', editing);
      }
      setEditing(null);
      load();
      setMsg('Service saved!');
    } catch (err) {
      setMsg(err instanceof Error ? err.message : 'Save failed');
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Delete this service? This cannot be undone.')) return;
    try {
      await api.delete(`/api/services/${id}`);
      load();
      setMsg('Service deleted');
    } catch (err) {
      setMsg(err instanceof Error ? err.message : 'Delete failed');
    }
  };

  const handleSaveItem = async (item: ServiceItem, serviceId: number) => {
    try {
      if (item.id) {
        await api.put(`/api/service-items/${item.id}`, item);
      } else {
        await api.post('/api/service-items', { ...item, service_id: serviceId });
      }
      load();
      setMsg('Item saved!');
    } catch (err) {
      setMsg(err instanceof Error ? err.message : 'Save failed');
    }
  };

  const handleDeleteItem = async (itemId: number) => {
    if (!confirm('Delete this item?')) return;
    try {
      await api.delete(`/api/service-items/${itemId}`);
      load();
    } catch (err) {
      setMsg(err instanceof Error ? err.message : 'Delete failed');
    }
  };

  if (editing) {
    return (
      <div>
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">{editing.id ? 'Edit Service' : 'New Service'}</h1>
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
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-violet-500" />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1">Icon (emoji)</label>
              <input value={editing.icon} onChange={e => setEditing({ ...editing, icon: e.target.value })}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-violet-500" />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1">Color</label>
              <input value={editing.color} onChange={e => setEditing({ ...editing, color: e.target.value })}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-violet-500" />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1">Section</label>
              <select value={editing.section} onChange={e => setEditing({ ...editing, section: e.target.value })}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-violet-500">
                <option value="business">Business IT Solutions</option>
                <option value="influencer">Influencer & Creator</option>
              </select>
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1">Sort Order</label>
              <input type="number" value={editing.sort_order} onChange={e => setEditing({ ...editing, sort_order: parseInt(e.target.value) || 0 })}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-violet-500" />
            </div>
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-1">Tagline</label>
            <input value={editing.tagline} onChange={e => setEditing({ ...editing, tagline: e.target.value })}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-violet-500" />
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-1">Description</label>
            <textarea value={editing.description} onChange={e => setEditing({ ...editing, description: e.target.value })} rows={4}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-violet-500" />
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
              <Save className="w-4 h-4" /> Save Service
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
          <Settings className="w-7 h-7 text-violet-400" />
          <h1 className="text-2xl font-bold">Services</h1>
          <span className="text-gray-500 text-sm">({services.length})</span>
        </div>
        <button onClick={() => setEditing({ ...emptyService })}
          className="flex items-center gap-2 bg-violet-600 hover:bg-violet-700 px-4 py-2 rounded-xl text-sm font-medium transition-colors">
          <Plus className="w-4 h-4" /> Add Service
        </button>
      </div>

      {msg && <div className="bg-violet-500/10 border border-violet-500/30 text-violet-300 rounded-xl px-4 py-3 text-sm mb-4">{msg}</div>}

      {loading ? (
        <div className="text-center py-20 text-gray-500">Loading...</div>
      ) : services.length === 0 ? (
        <div className="text-center py-20 text-gray-500">No services yet. Click "Add Service" to create one.</div>
      ) : (
        <div className="space-y-3">
          {services.map(service => (
            <div key={service.id} className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
              <div className="flex items-center gap-4 p-4">
                <span className="text-2xl">{service.icon}</span>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold truncate">{service.title}</p>
                  <p className="text-gray-500 text-sm">{service.section} • {service.items?.length || 0} items • /{service.slug}</p>
                </div>
                <span className={`text-xs px-2 py-0.5 rounded-full ${service.is_active ? 'bg-green-500/20 text-green-400' : 'bg-gray-500/20 text-gray-400'}`}>
                  {service.is_active ? 'Active' : 'Inactive'}
                </span>
                <button onClick={() => setEditing(service)} className="text-gray-400 hover:text-white p-1"><Edit2 className="w-4 h-4" /></button>
                <button onClick={() => handleDelete(service.id!)} className="text-gray-400 hover:text-red-400 p-1"><Trash2 className="w-4 h-4" /></button>
                <button onClick={() => setExpandedId(expandedId === service.id ? null : service.id!)} className="text-gray-400 hover:text-white p-1">
                  {expandedId === service.id ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </button>
              </div>

              {expandedId === service.id && (
                <div className="border-t border-white/10 p-4">
                  <div className="flex items-center justify-between mb-3">
                    <p className="text-sm font-medium text-gray-300">Service Items</p>
                    <button
                      onClick={() => handleSaveItem({ ...emptyItem, sort_order: (service.items?.length || 0) + 1 }, service.id!)}
                      className="flex items-center gap-1 text-xs text-violet-400 hover:text-violet-300"
                    >
                      <Plus className="w-3 h-3" /> Add Item
                    </button>
                  </div>
                  {service.items && service.items.length > 0 ? (
                    <div className="space-y-2">
                      {service.items.map(item => (
                        <ServiceItemRow key={item.id} item={item} serviceId={service.id!} onSave={handleSaveItem} onDelete={handleDeleteItem} />
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-500 text-sm">No items. Click "Add Item" to create one.</p>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function ServiceItemRow({ item, serviceId, onSave, onDelete }: {
  item: ServiceItem; serviceId: number;
  onSave: (item: ServiceItem, serviceId: number) => void;
  onDelete: (id: number) => void;
}) {
  const [editing, setEditing] = useState(false);
  const [data, setData] = useState(item);

  if (editing) {
    return (
      <div className="bg-white/5 rounded-xl p-3 space-y-2">
        <div className="grid grid-cols-3 gap-2">
          <input value={data.icon} onChange={e => setData({ ...data, icon: e.target.value })} placeholder="Icon"
            className="bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 text-sm text-white focus:outline-none focus:border-violet-500" />
          <input value={data.name} onChange={e => setData({ ...data, name: e.target.value })} placeholder="Name"
            className="col-span-2 bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 text-sm text-white focus:outline-none focus:border-violet-500" />
        </div>
        <input value={data.description} onChange={e => setData({ ...data, description: e.target.value })} placeholder="Description"
          className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 text-sm text-white focus:outline-none focus:border-violet-500" />
        <div className="flex gap-2">
          <button onClick={() => { onSave(data, serviceId); setEditing(false); }}
            className="text-xs bg-violet-600 px-3 py-1 rounded-lg">Save</button>
          <button onClick={() => setEditing(false)} className="text-xs text-gray-400 px-3 py-1">Cancel</button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-white/5">
      <span>{item.icon}</span>
      <span className="flex-1 text-sm">{item.name}</span>
      <button onClick={() => setEditing(true)} className="text-gray-400 hover:text-white p-1"><Edit2 className="w-3 h-3" /></button>
      <button onClick={() => onDelete(item.id!)} className="text-gray-400 hover:text-red-400 p-1"><Trash2 className="w-3 h-3" /></button>
    </div>
  );
}
