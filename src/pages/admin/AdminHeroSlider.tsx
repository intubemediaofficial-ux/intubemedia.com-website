import { useEffect, useState } from 'react';
import { ArrowDown, ArrowUp, ImagePlus, Loader2, Plus, RotateCcw, Save, SlidersHorizontal, Trash2 } from 'lucide-react';
import { api, API_URL, uploadImage } from '../../utils/api';
import { defaultHeroSlides, parseHeroSlides, resolveImage, type HeroSlide } from '../../data/heroSlides';

const fields: { key: keyof HeroSlide; label: string; textarea?: boolean }[] = [
  { key: 'eyebrow', label: 'Small label' },
  { key: 'title', label: 'Title (white)' },
  { key: 'highlight', label: 'Highlight (gradient)' },
  { key: 'description', label: 'Description', textarea: true },
  { key: 'cta_label', label: 'Main button text' },
  { key: 'cta_link', label: 'Main button link' },
  { key: 'cta2_label', label: 'Second button text' },
  { key: 'cta2_link', label: 'Second button link' },
];

const input = 'w-full rounded-xl border border-white/10 bg-black/30 px-3 py-2.5 text-sm outline-none focus:border-violet-500';

export default function AdminHeroSlider() {
  const [slides, setSlides] = useState<HeroSlide[]>([]);
  const [turnstileKey, setTurnstileKey] = useState('');
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState<number | null>(null);
  const [msg, setMsg] = useState('');

  useEffect(() => {
    api.get('/api/theme').then((t) => {
      setSlides(parseHeroSlides(t.hero_slides));
      setTurnstileKey(t.turnstile_site_key || '');
    }).catch((e) => setMsg(e instanceof Error ? e.message : 'Unable to load'));
  }, []);

  const update = (i: number, key: keyof HeroSlide, value: string) => setSlides((s) => s.map((sl, j) => (j === i ? { ...sl, [key]: value } : sl)));
  const move = (i: number, d: number) => setSlides((s) => {
    const next = [...s];
    const [item] = next.splice(i, 1);
    next.splice(i + d, 0, item);
    return next;
  });

  const upload = async (i: number, file?: File) => {
    if (!file) return;
    setUploading(i); setMsg('');
    try {
      update(i, 'image', await uploadImage(file));
    } catch (e) {
      setMsg(e instanceof Error ? e.message : 'Upload failed');
    } finally {
      setUploading(null);
    }
  };

  const save = async () => {
    setSaving(true); setMsg('');
    try {
      await api.put('/api/theme', { settings: { hero_slides: JSON.stringify(slides.map((s, i) => ({ ...s, id: `slide-${i}` }))), turnstile_site_key: turnstileKey.trim() } });
      setMsg('Saved. The homepage slider is updated.');
    } catch (e) {
      setMsg(e instanceof Error ? e.message : 'Save failed');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-center gap-3">
        <SlidersHorizontal className="h-7 w-7 text-blue-400" />
        <h1 className="text-2xl font-bold">Hero Slider</h1>
        <div className="ml-auto flex gap-2">
          <button type="button" onClick={() => setSlides(defaultHeroSlides)} className="flex items-center gap-2 rounded-xl border border-white/10 px-4 py-2 text-sm hover:bg-white/10"><RotateCcw className="h-4 w-4" /> Defaults</button>
          <button type="button" onClick={() => setSlides((s) => [...s, { ...defaultHeroSlides[0], id: `new-${Date.now()}` }])} className="flex items-center gap-2 rounded-xl border border-white/10 px-4 py-2 text-sm hover:bg-white/10"><Plus className="h-4 w-4" /> Add slide</button>
          <button type="button" onClick={save} disabled={saving} className="flex items-center gap-2 rounded-xl bg-violet-600 px-5 py-2 text-sm font-semibold hover:bg-violet-500 disabled:opacity-50">{saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />} Save</button>
        </div>
      </div>
      {msg && <div className="mb-4 rounded-xl border border-violet-500/30 bg-violet-500/10 px-4 py-3 text-sm text-violet-300">{msg}</div>}
      <div className="space-y-5">
        {slides.map((slide, i) => (
          <div key={slide.id} className="grid gap-5 rounded-2xl border border-white/10 bg-white/5 p-5 lg:grid-cols-[280px_1fr]">
            <div>
              <div className="relative aspect-video overflow-hidden rounded-xl bg-black/40">
                {slide.image && <img src={resolveImage(slide.image, API_URL)} alt="" className="h-full w-full object-cover" />}
                <span className="absolute left-2 top-2 rounded-md bg-black/60 px-2 py-0.5 text-xs">Slide {i + 1}</span>
              </div>
              <label className="mt-3 flex cursor-pointer items-center justify-center gap-2 rounded-xl border border-dashed border-white/20 px-3 py-2 text-sm hover:bg-white/5">
                {uploading === i ? <Loader2 className="h-4 w-4 animate-spin" /> : <ImagePlus className="h-4 w-4" />} Upload background
                <input type="file" accept="image/jpeg,image/png,image/webp,image/gif" className="hidden" onChange={(e) => upload(i, e.target.files?.[0])} />
              </label>
              <input value={slide.image} onChange={(e) => update(i, 'image', e.target.value)} className={`${input} mt-2 text-xs`} placeholder="or image URL" />
              <div className="mt-3 flex gap-2">
                <button type="button" disabled={i === 0} onClick={() => move(i, -1)} className="rounded-lg border border-white/10 p-2 disabled:opacity-30" aria-label="Move up"><ArrowUp className="h-4 w-4" /></button>
                <button type="button" disabled={i === slides.length - 1} onClick={() => move(i, 1)} className="rounded-lg border border-white/10 p-2 disabled:opacity-30" aria-label="Move down"><ArrowDown className="h-4 w-4" /></button>
                <button type="button" disabled={slides.length < 2} onClick={() => setSlides((s) => s.filter((_, j) => j !== i))} className="ml-auto rounded-lg border border-red-500/30 p-2 text-red-400 disabled:opacity-30" aria-label="Delete slide"><Trash2 className="h-4 w-4" /></button>
              </div>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {fields.map((f) => (
                <label key={f.key} className={f.textarea ? 'sm:col-span-2' : ''}>
                  <span className="mb-1 block text-xs text-gray-400">{f.label}</span>
                  {f.textarea
                    ? <textarea rows={2} value={slide[f.key]} onChange={(e) => update(i, f.key, e.target.value)} className={input} />
                    : <input value={slide[f.key]} onChange={(e) => update(i, f.key, e.target.value)} className={input} />}
                </label>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="mt-8 rounded-2xl border border-white/10 bg-white/5 p-5">
        <h2 className="font-semibold">Cloudflare Turnstile site key</h2>
        <p className="mt-1 text-sm text-gray-400">Public key used on Request Access and Partner Sign In. Leave empty to use the Cloudflare test key. The secret key is set on the server.</p>
        <input value={turnstileKey} onChange={(e) => setTurnstileKey(e.target.value)} className={`${input} mt-3 max-w-md`} placeholder="0x4AAAA..." />
      </div>
    </div>
  );
}
