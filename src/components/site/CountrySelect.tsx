import { useEffect, useMemo, useRef, useState } from 'react';
import { Check, ChevronDown, Search } from 'lucide-react';

const CODES = 'AF AL DZ AD AO AG AR AM AU AT AZ BS BH BD BB BY BE BZ BJ BT BO BA BW BR BN BG BF BI CV KH CM CA CF TD CL CN CO KM CG CD CR CI HR CU CY CZ DK DJ DM DO EC EG SV GQ ER EE SZ ET FJ FI FR GA GM GE DE GH GR GD GT GN GW GY HT HN HK HU IS IN ID IR IQ IE IL IT JM JP JO KZ KE KI KW KG LA LV LB LS LR LY LI LT LU MO MG MW MY MV ML MT MH MR MU MX FM MD MC MN ME MA MZ MM NA NR NP NL NZ NI NE NG KP MK NO OM PK PW PS PA PG PY PE PH PL PT PR QA RO RU RW KN LC VC WS SM ST SA SN RS SC SL SG SK SI SB SO ZA KR SS ES LK SD SR SE CH SY TW TJ TZ TH TL TG TO TT TN TR TM TV UG UA AE GB US UY UZ VU VA VE VN YE ZM ZW'.split(' ');

function flag(code: string) {
  return String.fromCodePoint(...[...code].map((c) => 127397 + c.charCodeAt(0)));
}

export default function CountrySelect({ value, onChange, className = '' }: { value: string; onChange: (v: string) => void; className?: string }) {
  const countries = useMemo(() => {
    const names = typeof Intl !== 'undefined' && 'DisplayNames' in Intl ? new Intl.DisplayNames(['en'], { type: 'region' }) : null;
    const list = CODES.map((code) => ({ code, name: names?.of(code) || code })).sort((a, b) => a.name.localeCompare(b.name));
    const india = list.findIndex((c) => c.code === 'IN');
    return india > 0 ? [list[india], ...list.slice(0, india), ...list.slice(india + 1)] : list;
  }, []);
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState('');
  const [active, setActive] = useState(0);
  const box = useRef<HTMLDivElement>(null);
  const input = useRef<HTMLInputElement>(null);
  const filtered = q ? countries.filter((c) => c.name.toLowerCase().includes(q.toLowerCase()) || c.code.toLowerCase() === q.toLowerCase()) : countries;
  const current = countries.find((c) => c.name === value);

  useEffect(() => {
    const close = (e: MouseEvent) => { if (box.current && !box.current.contains(e.target as Node)) setOpen(false); };
    document.addEventListener('mousedown', close);
    return () => document.removeEventListener('mousedown', close);
  }, []);

  const pick = (name: string) => { onChange(name); setOpen(false); };
  const toggle = () => { setQ(''); setActive(0); setOpen((o) => !o); };

  return (
    <div ref={box} className="relative">
      <button type="button" onClick={toggle} aria-haspopup="listbox" aria-expanded={open} className={`${className} flex items-center justify-between text-left`}>
        <span className={value ? 'text-white' : 'text-white/35'}>{current ? `${flag(current.code)}  ${current.name}` : value || 'Select country'}</span>
        <ChevronDown className={`h-4 w-4 text-white/50 transition ${open ? 'rotate-180' : ''}`} />
      </button>
      <input tabIndex={-1} required value={value} onChange={() => undefined} className="pointer-events-none absolute inset-x-0 bottom-0 h-px opacity-0" aria-hidden="true" />
      {open && (
        <div className="absolute z-30 mt-2 w-full overflow-hidden rounded-2xl border border-white/10 bg-ink-800/95 shadow-card backdrop-blur-xl">
          <div className="flex items-center gap-2 border-b border-white/10 px-4">
            <Search className="h-4 w-4 text-white/40" />
            <input
              ref={input}
              autoFocus
              value={q}
              onChange={(e) => { setQ(e.target.value); setActive(0); }}
              onKeyDown={(e) => {
                if (e.key === 'ArrowDown') { e.preventDefault(); setActive((a) => Math.min(a + 1, filtered.length - 1)); }
                if (e.key === 'ArrowUp') { e.preventDefault(); setActive((a) => Math.max(a - 1, 0)); }
                if (e.key === 'Enter') { e.preventDefault(); if (filtered[active]) pick(filtered[active].name); }
                if (e.key === 'Escape') setOpen(false);
              }}
              placeholder="Search country…"
              className="w-full bg-transparent py-3 text-sm text-white outline-none placeholder:text-white/35"
            />
          </div>
          <ul role="listbox" className="max-h-64 overflow-y-auto py-1">
            {filtered.length === 0 && <li className="px-4 py-3 text-sm text-white/50">No country found</li>}
            {filtered.map((c, i) => (
              <li key={c.code} role="option" aria-selected={c.name === value}>
                <button type="button" onMouseEnter={() => setActive(i)} onClick={() => pick(c.name)} className={`flex w-full items-center gap-3 px-4 py-2.5 text-left text-sm transition ${i === active ? 'bg-white/10 text-white' : 'text-white/80'}`}>
                  <span className="text-base">{flag(c.code)}</span>
                  <span className="flex-1">{c.name}</span>
                  {c.name === value && <Check className="h-4 w-4 text-brand-cyan" />}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
