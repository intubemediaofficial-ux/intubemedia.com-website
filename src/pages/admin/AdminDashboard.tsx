import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Settings, Package, Mail, FileText, Palette, BarChart3 } from 'lucide-react';
import { api } from '../../utils/api';

interface Stats {
  services: number;
  packages: number;
  submissions: number;
  unread_submissions: number;
  pages: number;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats | null>(null);

  useEffect(() => {
    api.get('/api/dashboard').then(setStats).catch(console.error);
  }, []);

  const cards = [
    { label: 'Services', value: stats?.services ?? '-', icon: Settings, href: '/admin/services', color: 'from-violet-600 to-violet-400' },
    { label: 'Packages', value: stats?.packages ?? '-', icon: Package, href: '/admin/packages', color: 'from-pink-600 to-pink-400' },
    { label: 'Messages', value: stats?.submissions ?? '-', icon: Mail, href: '/admin/messages', color: 'from-blue-600 to-blue-400', badge: stats?.unread_submissions },
    { label: 'Pages', value: stats?.pages ?? '-', icon: FileText, href: '/admin/pages', color: 'from-emerald-600 to-emerald-400' },
  ];

  return (
    <div>
      <div className="flex items-center gap-3 mb-8">
        <BarChart3 className="w-7 h-7 text-violet-400" />
        <h1 className="text-2xl font-bold">Dashboard</h1>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {cards.map(card => {
          const Icon = card.icon;
          return (
            <Link
              key={card.label}
              to={card.href}
              className="relative bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-colors"
            >
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${card.color} flex items-center justify-center mb-4`}>
                <Icon className="w-6 h-6 text-white" />
              </div>
              <p className="text-3xl font-bold">{card.value}</p>
              <p className="text-gray-400 text-sm mt-1">{card.label}</p>
              {card.badge ? (
                <span className="absolute top-4 right-4 bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
                  {card.badge} new
                </span>
              ) : null}
            </Link>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Link to="/admin/theme" className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-colors flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-600 to-yellow-400 flex items-center justify-center">
            <Palette className="w-6 h-6 text-white" />
          </div>
          <div>
            <p className="font-semibold">Theme Settings</p>
            <p className="text-gray-400 text-sm">Customize website colors, fonts & branding</p>
          </div>
        </Link>
        <Link to="/" target="_blank" className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-colors flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-600 to-teal-400 flex items-center justify-center">
            <BarChart3 className="w-6 h-6 text-white" />
          </div>
          <div>
            <p className="font-semibold">View Website</p>
            <p className="text-gray-400 text-sm">Open the live website in new tab</p>
          </div>
        </Link>
      </div>
    </div>
  );
}
