import type { CSSProperties } from 'react';
import { Disc3, Headphones, Mic2, Music2, Play, Radio, Youtube, type LucideIcon } from 'lucide-react';

type Bubble = { icon: LucideIcon; left: string; size: number; dur: number; delay: number; color: string; op?: number };

const SITE: Bubble[] = [
  { icon: Youtube, left: '6%', size: 46, dur: 34, delay: 0, color: '#ff3d3d', op: 0.45 },
  { icon: Music2, left: '22%', size: 34, dur: 40, delay: -12, color: '#8b9bff', op: 0.35 },
  { icon: Headphones, left: '41%', size: 40, dur: 46, delay: -26, color: '#22d3ee', op: 0.3 },
  { icon: Play, left: '63%', size: 30, dur: 38, delay: -6, color: '#ff3d7f', op: 0.35 },
  { icon: Radio, left: '78%', size: 44, dur: 44, delay: -20, color: '#a855f7', op: 0.35 },
  { icon: Disc3, left: '92%', size: 36, dur: 36, delay: -30, color: '#f5c76b', op: 0.3 },
];

const PORTAL: Bubble[] = [
  { icon: Youtube, left: '8%', size: 76, dur: 18, delay: 0, color: '#ff2d2d' },
  { icon: Music2, left: '26%', size: 46, dur: 22, delay: -7, color: '#1ed760' },
  { icon: Headphones, left: '48%', size: 62, dur: 20, delay: -13, color: '#22d3ee' },
  { icon: Mic2, left: '68%', size: 42, dur: 24, delay: -4, color: '#ff3d7f' },
  { icon: Disc3, left: '84%', size: 68, dur: 19, delay: -10, color: '#a855f7' },
  { icon: Play, left: '16%', size: 38, dur: 26, delay: -16, color: '#ff2d2d' },
  { icon: Radio, left: '58%', size: 40, dur: 23, delay: -19, color: '#f5c76b' },
  { icon: Youtube, left: '90%', size: 36, dur: 27, delay: -22, color: '#ff2d2d' },
];

export function Bubbles({ variant = 'site' }: { variant?: 'site' | 'portal' }) {
  const list = variant === 'portal' ? PORTAL : SITE;
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      {list.map(({ icon: Icon, left, size, dur, delay, color, op }, i) => (
        <span
          key={i}
          className="bubble-icon"
          style={{ left, width: size, height: size, '--dur': `${dur}s`, '--delay': `${delay}s`, '--glow': `${color}99`, '--op': op ?? 1 } as CSSProperties}
        >
          <Icon style={{ color, width: size * 0.46, height: size * 0.46, filter: `drop-shadow(0 0 10px ${color})` }} />
        </span>
      ))}
    </div>
  );
}

export default function Backdrop() {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <div className="absolute -left-[15%] -top-[20%] h-[70vh] w-[70vh] animate-drift1 rounded-full bg-brand/25 blur-[140px]" />
      <div className="absolute -right-[10%] top-[25%] h-[65vh] w-[65vh] animate-drift2 rounded-full bg-brand-violet/20 blur-[150px]" />
      <div className="absolute bottom-[-25%] left-[30%] h-[60vh] w-[60vh] animate-drift1 rounded-full bg-brand-hot/15 blur-[150px] [animation-delay:-12s]" />
      <div className="site-grid-bg absolute inset-0 opacity-60 [mask-image:radial-gradient(ellipse_at_center,#000_30%,transparent_75%)]" />
      <Bubbles />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,transparent_0%,rgba(5,6,13,0.55)_70%)]" />
    </div>
  );
}

const DOTS = [
  { l: '4%', t: '18%', s: 10, c: '#e11d2a', d: 13 }, { l: '9%', t: '62%', s: 6, c: '#1d2b6b', d: 17 },
  { l: '93%', t: '12%', s: 12, c: '#e11d2a', d: 15 }, { l: '88%', t: '48%', s: 7, c: '#1d2b6b', d: 19 },
  { l: '96%', t: '78%', s: 9, c: '#e11d2a', d: 16 }, { l: '2%', t: '88%', s: 8, c: '#e11d2a', d: 21 },
  { l: '50%', t: '96%', s: 6, c: '#1d2b6b', d: 18 }, { l: '72%', t: '30%', s: 5, c: '#ff8a3d', d: 14 },
];

export function LightBackdrop() {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <div className="absolute -left-40 top-[30%] h-[46vh] w-[46vh] animate-drift1 rounded-full bg-accent/[0.07] blur-[110px]" />
      <div className="absolute -right-40 top-[60%] h-[50vh] w-[50vh] animate-drift2 rounded-full bg-navy/[0.07] blur-[120px]" />
      {DOTS.map((d, i) => (
        <span key={i} className="float-dot" style={{ left: d.l, top: d.t, width: d.s, height: d.s, background: d.c, opacity: 0.55, '--dur': `${d.d}s`, '--delay': `${-i * 2}s` } as CSSProperties} />
      ))}
    </div>
  );
}
