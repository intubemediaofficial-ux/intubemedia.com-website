import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, BarChart3, Globe2, Headphones, ShieldCheck } from 'lucide-react';
import Logo from '../../components/site/Logo';
import { EqBars } from '../../components/site/ui';
import { Bubbles } from '../../components/site/Backdrop';

const features = [
  { icon: Globe2, title: 'Worldwide delivery', text: 'Spotify, Apple Music, JioSaavn, YouTube Music, Instagram and more' },
  { icon: ShieldCheck, title: 'YouTube CMS & Content ID', text: 'Your catalogue protected and every channel managed in one place' },
  { icon: BarChart3, title: 'Royalties you can read', text: 'Clear release status, reports and revenue in your own dashboard' },
  { icon: Headphones, title: 'A team, not a ticket', text: 'Personal onboarding and support from real people' },
];

export default function PartnerAuthLayout({ children, title, highlight, text }: { children: ReactNode; title: string; highlight: string; text: string }) {
  return (
    <div className="site min-h-screen bg-ink text-white antialiased lg:grid lg:grid-cols-[1.05fr_1fr]">
      <aside className="noise relative hidden overflow-hidden lg:block">
        <img src="/images/hero/partner-stage.jpg" alt="" className="absolute inset-0 h-full w-full animate-kenburns object-cover opacity-45" />
        <div className="absolute inset-0 bg-gradient-to-br from-ink/95 via-ink/70 to-brand-violet/40" />
        <div className="absolute -left-32 top-1/4 h-[28rem] w-[28rem] animate-drift1 rounded-full bg-brand/40 blur-[130px]" />
        <div className="absolute -right-20 bottom-10 h-96 w-96 animate-drift2 rounded-full bg-[#ff2d2d]/25 blur-[130px]" />
        <Bubbles variant="portal" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/20 to-transparent" />
        <div className="relative flex h-full min-h-screen flex-col justify-between p-12 xl:p-16">
          <Logo subtitle="Partner Portal" />
          <div className="max-w-lg">
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-brand-cyan">For artists, labels & channels</p>
            <h1 className="mt-5 text-5xl font-semibold leading-[1.02] xl:text-6xl">{title}<span className="block text-shine pb-2">{highlight}</span></h1>
            <p className="mt-5 text-lg leading-relaxed text-white/75">{text}</p>
            <ul className="mt-10 space-y-5">
              {features.map(({ icon: Icon, title: t, text: d }) => (
                <li key={t} className="flex gap-4">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl border border-white/15 bg-white/10 shadow-[inset_0_0_14px_rgba(255,255,255,0.08)] backdrop-blur-md"><Icon className="h-5 w-5 text-brand-cyan" /></span>
                  <span><span className="block font-bold">{t}</span><span className="block text-sm text-white/65">{d}</span></span>
                </li>
              ))}
            </ul>
          </div>
          <div className="flex items-end justify-between">
            <p className="text-xs text-white/50">© {new Date().getFullYear()} Intube Media · business@intubemedia.com</p>
            <EqBars className="h-12" bars={22} />
          </div>
        </div>
      </aside>
      <main className="relative flex min-h-screen flex-col overflow-hidden px-5 py-8 sm:px-10">
        <div className="pointer-events-none absolute -right-40 -top-40 h-96 w-96 rounded-full bg-brand-violet/20 blur-[120px]" />
        <div className="relative flex items-center justify-between">
          <span className="lg:hidden"><Logo subtitle="Partner Portal" /></span>
          <Link to="/" className="ml-auto inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-sm font-semibold text-white/80 transition hover:bg-white/10"><ArrowLeft className="h-4 w-4" /> Back to site</Link>
        </div>
        <div className="relative mx-auto flex w-full max-w-xl flex-1 items-center py-10">{children}</div>
      </main>
    </div>
  );
}

export const fieldClass =
  'w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3.5 text-sm text-white placeholder:text-white/35 outline-none transition focus:border-brand-light focus:bg-white/[0.07] focus:ring-4 focus:ring-brand/20 [&>option]:bg-ink-800';

export function Field({ label, required, children, className = '' }: { label: string; required?: boolean; children: ReactNode; className?: string }) {
  return (
    <label className={`block ${className}`}>
      <span className="mb-1.5 block text-xs font-bold uppercase tracking-[0.14em] text-white/70">{label}{required && <span className="text-brand-hot"> *</span>}</span>
      {children}
    </label>
  );
}

export function Notice({ ok, children }: { ok: boolean; children: ReactNode }) {
  return <p role="status" className={`rounded-xl px-4 py-3 text-sm font-medium ${ok ? 'bg-emerald-500/10 text-emerald-300' : 'bg-red-500/10 text-red-300'}`}>{children}</p>;
}
