import { useEffect, useState } from 'react';
import { Palette, Save } from 'lucide-react';
import { api } from '../../utils/api';

interface ThemeSettings {
  [key: string]: string;
}

const themeGroups = [
  {
    label: 'Colors',
    fields: [
      { key: 'primary_color', label: 'Primary Color', type: 'color' },
      { key: 'secondary_color', label: 'Secondary Color', type: 'color' },
      { key: 'accent_color', label: 'Accent Color', type: 'color' },
      { key: 'bg_color', label: 'Background Color', type: 'color' },
      { key: 'text_color', label: 'Text Color', type: 'color' },
    ],
  },
  {
    label: 'Typography',
    fields: [
      { key: 'heading_font', label: 'Heading Font', type: 'text' },
      { key: 'body_font', label: 'Body Font', type: 'text' },
    ],
  },
  {
    label: 'Branding',
    fields: [
      { key: 'logo_text', label: 'Logo Text', type: 'text' },
      { key: 'tagline', label: 'Tagline', type: 'text' },
      { key: 'footer_text', label: 'Footer Text', type: 'text' },
    ],
  },
  {
    label: 'Contact Info',
    fields: [
      { key: 'phone', label: 'Phone Number', type: 'text' },
      { key: 'email', label: 'Email Address', type: 'text' },
      { key: 'address', label: 'Address', type: 'text' },
    ],
  },
  {
    label: 'Social Media',
    fields: [
      { key: 'instagram', label: 'Instagram URL', type: 'text' },
      { key: 'youtube', label: 'YouTube URL', type: 'text' },
      { key: 'facebook', label: 'Facebook URL', type: 'text' },
    ],
  },
];

export default function AdminTheme() {
  const [settings, setSettings] = useState<ThemeSettings>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState('');

  useEffect(() => {
    api.get('/api/theme').then(d => {
      const obj: ThemeSettings = {};
      if (Array.isArray(d)) {
        d.forEach((item: { key: string; value: string }) => { obj[item.key] = item.value; });
      }
      setSettings(obj);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, []);

  const handleSave = async () => {
    setSaving(true);
    setMsg('');
    try {
      await api.put('/api/theme', { settings });
      setMsg('Theme settings saved!');
    } catch (err) {
      setMsg(err instanceof Error ? err.message : 'Save failed');
    } finally {
      setSaving(false);
    }
  };

  const updateSetting = (key: string, value: string) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  if (loading) return <div className="text-center py-20 text-gray-500">Loading...</div>;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <Palette className="w-7 h-7 text-orange-400" />
          <h1 className="text-2xl font-bold">Theme Settings</h1>
        </div>
        <button onClick={handleSave} disabled={saving}
          className="flex items-center gap-2 bg-violet-600 hover:bg-violet-700 px-6 py-2.5 rounded-xl font-medium transition-colors disabled:opacity-50">
          <Save className="w-4 h-4" /> {saving ? 'Saving...' : 'Save Changes'}
        </button>
      </div>

      {msg && <div className="bg-violet-500/10 border border-violet-500/30 text-violet-300 rounded-xl px-4 py-3 text-sm mb-4">{msg}</div>}

      <div className="space-y-6">
        {themeGroups.map(group => (
          <div key={group.label} className="bg-white/5 border border-white/10 rounded-2xl p-6">
            <h2 className="text-lg font-semibold mb-4">{group.label}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {group.fields.map(field => (
                <div key={field.key}>
                  <label className="block text-sm text-gray-400 mb-1">{field.label}</label>
                  <div className="flex gap-2">
                    {field.type === 'color' && (
                      <input
                        type="color"
                        value={settings[field.key] || '#8b5cf6'}
                        onChange={e => updateSetting(field.key, e.target.value)}
                        className="w-10 h-10 rounded-lg border border-white/10 bg-transparent cursor-pointer"
                      />
                    )}
                    <input
                      type="text"
                      value={settings[field.key] || ''}
                      onChange={e => updateSetting(field.key, e.target.value)}
                      className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-violet-500"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Preview Section */}
      <div className="mt-8 bg-white/5 border border-white/10 rounded-2xl p-6">
        <h2 className="text-lg font-semibold mb-4">Preview</h2>
        <div className="rounded-xl overflow-hidden" style={{ backgroundColor: settings.bg_color || '#030712' }}>
          <div className="p-6">
            <h3 style={{ color: settings.primary_color || '#8b5cf6', fontFamily: settings.heading_font || 'Inter' }}
              className="text-2xl font-bold mb-2">
              {settings.logo_text || 'Intube Media'}
            </h3>
            <p style={{ color: settings.text_color || '#ffffff', fontFamily: settings.body_font || 'Inter' }}
              className="mb-4">
              {settings.tagline || 'Your Digital Growth Partner'}
            </p>
            <div className="flex gap-3">
              <span className="px-4 py-2 rounded-lg text-white text-sm font-medium"
                style={{ backgroundColor: settings.primary_color || '#8b5cf6' }}>
                Primary Button
              </span>
              <span className="px-4 py-2 rounded-lg text-white text-sm font-medium"
                style={{ backgroundColor: settings.secondary_color || '#ec4899' }}>
                Secondary Button
              </span>
              <span className="px-4 py-2 rounded-lg text-white text-sm font-medium"
                style={{ backgroundColor: settings.accent_color || '#06b6d4' }}>
                Accent Button
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
