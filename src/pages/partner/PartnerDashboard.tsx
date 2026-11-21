import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowUpRight, AudioLines, BarChart3, Disc3, LayoutDashboard, Loader2, LogOut, Mail, Radio, ShieldCheck, Upload, UserRound } from 'lucide-react';
import SEO from '../../components/SEO';
import Logo from '../../components/site/Logo';
import { EqBars } from '../../components/site/ui';
import { useCms } from '../../context/useCms';
import { partnerApi, PARTNER_TOKEN_KEY } from '../../utils/partnerApi';

interface PartnerProfile {
  name: string;
  business_name: string;
  email: string;
  created_at: string;
  last_login_at: string | null;
  application: { category: string; catalog_size: string; country: string; created_at: string } | null;
}

const tools = [
  { icon: Upload, title: 'Upload a release', text: 'Send audio, artwork and metadata for worldwide delivery.', href: 'https://song.bainslamusic.com/' },
  { icon: LayoutDashboard, title: 'YouTube CMS', text: 'Channels, Content ID claims, analytics and revenue.', href: 'https://cms.intubemedia.com/' },
  { icon: Radio, title: 'IntubeLive', text: 'Run 24/7 cloud live streams for your channels.', href: 'https://intubelive.com/' },
];

const steps = [
  { icon: Disc3, title: 'Releases', text: 'Your delivered releases and their store status will appear here.' },
  { icon: BarChart3, title: 'Royalty reports', text: 'Monthly statements and earnings by store and release.' },
  { icon: ShieldCheck, title: 'Content ID', text: 'Claims, disputes and protected assets across YouTube.' },
];

export default function PartnerDashboard() {
  const navigate = useNavigate();
  const { theme } = useCms();
  const [profile, setProfile] = useState<PartnerProfile | null>(null);

  useEffect(() => {
    if (!localStorage.getItem(PARTNER_TOKEN_KEY)) { navigate('/partner/login', { replace: true }); return; }
    partnerApi.get('/api/partner/me').then(setProfile).catch(() => {
      localStorage.removeItem(PARTNER_TOKEN_KEY);
      navigate('/partner/login', { replace: true });
    });
  }, [navigate]);

  const signOut = () => { localStorage.removeItem(PARTNER_TOKEN_KEY); navigate('/partner/login'); };

  if (!profile) {
    return <div className="grid min-h-screen place-items-center bg-ink text-white"><Loader2 className="h-8 w-8 animate-spin text-brand-light" /></div>;
  }

  const details = [
    { label: 'Account', value: profile.business_name || profile.name },
    { label: 'Category', value: profile.application?.category || '—' },
    { label: 'Catalog size', value: profile.application?.catalog_size || '—' },
    { label: 'Country', value: profile.application?.country || '—' },
  ];

  return (
    <div className="site min-h-screen bg-ink text-white antialiased">
      <SEO title="Partner Dashboard | Intube Media" description="Your Intube Media music distribution dashboard." path="/partner/dashboard" />
      <header className="sticky top-0 z-40 border-b border-white/10 bg-ink/80 backdrop-blur-xl">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 sm:px-8">
          <Logo to="/partner/dashboard" subtitle="Partner Portal" />
          <div className="flex items-center gap-3">
            <span className="hidden items-center gap-2 text-sm text-mist sm:flex"><UserRound className="h-4 w-4" />{profile.email}</span>
            <button type="button" onClick={signOut} className="inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-2 text-sm font-bold transition hover:bg-white/10"><LogOut className="h-4 w-4" /> Sign out</button>
          </div>
        </div>
      </header>
      <main className="mx-auto max-w-7xl px-5 py-10 sm:px-8">
        <section className="noise relative overflow-hidden rounded-[2rem] bg-aurora p-8 sm:p-12">
          <div className="absolute -right-16 -top-16 h-64 w-64 animate-spinslow rounded-full border-[32px] border-white/10" />
          <div className="relative flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.3em] text-white/80">Music distribution dashboard</p>
              <h1 className="mt-3 text-4xl font-extrabold sm:text-5xl">Welcome, {profile.name.split(' ')[0]}.</h1>
              <p className="mt-3 max-w-xl text-white/85">Your Intube Media partner workspace is active. Release, protect and track your music from here.</p>
            </div>
            <EqBars className="h-14" bars={20} />
          </div>
        </section>

        <section className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {details.map((d) => (
            <div key={d.label} className="glass rounded-2xl p-5">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-mist">{d.label}</p>
              <p className="mt-2 truncate text-lg font-bold">{d.value}</p>
            </div>
          ))}
        </section>

        <section className="mt-10">
          <h2 className="text-2xl font-bold">Your tools</h2>
          <div className="mt-5 grid gap-5 md:grid-cols-3">
            {tools.map(({ icon: Icon, title, text, href }) => (
              <a key={title} href={href} target="_blank" rel="noopener noreferrer" className="border-gradient group rounded-3xl bg-ink-800/80 p-7 transition hover:-translate-y-1 hover:shadow-glow">
                <span className="grid h-12 w-12 place-items-center rounded-xl bg-aurora"><Icon className="h-5 w-5" /></span>
                <h3 className="mt-5 text-lg font-bold">{title}</h3>
                <p className="mt-2 text-sm text-mist">{text}</p>
                <span className="mt-5 inline-flex items-center gap-1 text-sm font-bold">Open <ArrowUpRight className="h-4 w-4 transition group-hover:translate-x-0.5" /></span>
              </a>
            ))}
          </div>
        </section>

        <section className="mt-10 grid gap-5 lg:grid-cols-[2fr_1fr]">
          <div className="glass rounded-3xl p-7">
            <h2 className="flex items-center gap-2 text-xl font-bold"><AudioLines className="h-5 w-5 text-brand-cyan" /> Catalogue overview</h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-3">
              {steps.map(({ icon: Icon, title, text }) => (
                <div key={title} className="rounded-2xl border border-dashed border-white/15 p-5">
                  <Icon className="h-6 w-6 text-brand-light" />
                  <p className="mt-3 font-bold">{title}</p>
                  <p className="mt-1 text-sm text-mist">{text}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="glass rounded-3xl p-7">
            <h2 className="text-xl font-bold">Need help?</h2>
            <p className="mt-2 text-sm text-mist">Your partner manager is one email away.</p>
            <a href={`mailto:${theme.email}`} className="mt-5 flex items-center gap-2 rounded-xl bg-white/5 px-4 py-3 text-sm font-bold"><Mail className="h-4 w-4 text-brand-cyan" />{theme.email}</a>
            <Link to="/" className="mt-3 block rounded-xl bg-white/5 px-4 py-3 text-sm font-bold">Visit intubemedia.com</Link>
          </div>
        </section>
      </main>
    </div>
  );
}
