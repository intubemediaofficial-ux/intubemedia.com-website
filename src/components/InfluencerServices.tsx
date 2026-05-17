import {
  Instagram, Youtube, Facebook, Smartphone, UserCircle,
  ShieldCheck, BadgeCheck, Copyright, Trash2, Lock, Users,
  Handshake, DollarSign, Megaphone, Link2, TrendingUp, LineChart,
  AlertTriangle, Music, FileCheck, Upload, FileSignature,
  Scissors, Flame, PenTool, Image, Mic, MonitorPlay, Clapperboard,
  Sparkles, Search, Hash, GitMerge, Network, BarChart3, Newspaper
} from 'lucide-react';

const categories = [
  {
    title: 'Account Management',
    icon: <UserCircle className="w-6 h-6" />,
    color: 'from-pink-500 to-rose-400',
    items: [
      { icon: <Instagram size={20} />, name: 'Instagram Account Management' },
      { icon: <Youtube size={20} />, name: 'YouTube Channel Management' },
      { icon: <Facebook size={20} />, name: 'Facebook Page Management' },
      { icon: <Smartphone size={20} />, name: 'Snapchat / Moj Management' },
      { icon: <UserCircle size={20} />, name: 'Personal Branding' },
    ],
  },
  {
    title: 'Account Protection',
    icon: <ShieldCheck className="w-6 h-6" />,
    color: 'from-red-500 to-orange-400',
    items: [
      { icon: <ShieldCheck size={20} />, name: 'Account Recovery Support' },
      { icon: <BadgeCheck size={20} />, name: 'Blue Tick Guidance' },
      { icon: <Copyright size={20} />, name: 'Copyright Protection' },
      { icon: <Trash2 size={20} />, name: 'Fake Account Removal' },
      { icon: <Lock size={20} />, name: 'Security Setup (2FA etc.)' },
      { icon: <Users size={20} />, name: 'Community Guideline Support' },
    ],
  },
  {
    title: 'Monetization Services',
    icon: <DollarSign className="w-6 h-6" />,
    color: 'from-emerald-500 to-green-400',
    items: [
      { icon: <Handshake size={20} />, name: 'Brand Deals' },
      { icon: <DollarSign size={20} />, name: 'Sponsorship Management' },
      { icon: <Megaphone size={20} />, name: 'Paid Promotions' },
      { icon: <Link2 size={20} />, name: 'Affiliate Marketing Setup' },
      { icon: <Youtube size={20} />, name: 'YouTube Monetization Help' },
      { icon: <Instagram size={20} />, name: 'Instagram Monetization Guidance' },
      { icon: <TrendingUp size={20} />, name: 'Revenue Growth Strategy' },
    ],
  },
  {
    title: 'Copyright & Claims',
    icon: <Copyright className="w-6 h-6" />,
    color: 'from-amber-500 to-yellow-400',
    items: [
      { icon: <AlertTriangle size={20} />, name: 'Video Copyright Claim Support' },
      { icon: <Music size={20} />, name: 'Audio Claim Removal' },
      { icon: <FileCheck size={20} />, name: 'Music Licensing' },
      { icon: <Copyright size={20} />, name: 'Copyright Strike Handling' },
      { icon: <Upload size={20} />, name: 'Re-upload Protection' },
      { icon: <FileSignature size={20} />, name: 'Content Ownership Registration' },
    ],
  },
  {
    title: 'Content Production',
    icon: <Clapperboard className="w-6 h-6" />,
    color: 'from-cyan-500 to-blue-400',
    items: [
      { icon: <Scissors size={20} />, name: 'Reel Editing' },
      { icon: <Flame size={20} />, name: 'Viral Content Planning' },
      { icon: <PenTool size={20} />, name: 'Script Writing' },
      { icon: <Image size={20} />, name: 'Thumbnail Designing' },
      { icon: <Mic size={20} />, name: 'Podcast Setup' },
      { icon: <MonitorPlay size={20} />, name: 'Studio Setup' },
      { icon: <Clapperboard size={20} />, name: 'Cinematic Shoots' },
      { icon: <Sparkles size={20} />, name: 'AI Voice & AI Video Creation' },
    ],
  },
  {
    title: 'Growth Services',
    icon: <LineChart className="w-6 h-6" />,
    color: 'from-violet-500 to-indigo-400',
    items: [
      { icon: <TrendingUp size={20} />, name: 'Organic Growth Strategy' },
      { icon: <Search size={20} />, name: 'Trend Research' },
      { icon: <Hash size={20} />, name: 'Hashtag Research' },
      { icon: <GitMerge size={20} />, name: 'Collaboration Management' },
      { icon: <Network size={20} />, name: 'Influencer Networking' },
      { icon: <BarChart3 size={20} />, name: 'Audience Analytics' },
      { icon: <Newspaper size={20} />, name: 'PR & Media Coverage' },
    ],
  },
];

export default function InfluencerServices() {
  return (
    <section id="influencer" className="py-20 sm:py-28 relative">
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-pink-500/50 to-transparent" />
        <div className="absolute top-1/3 right-0 w-72 h-72 bg-pink-600/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 left-0 w-72 h-72 bg-violet-600/10 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <span className="text-sm font-semibold text-pink-400 uppercase tracking-wider">
            Creator Economy
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mt-3 mb-4">
            Influencer & Creator Solutions
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Complete management, protection, monetization, and growth solutions for influencers and content creators.
          </p>
        </div>

        <div className="space-y-12">
          {categories.map((cat) => (
            <div key={cat.title}>
              <div className="flex items-center gap-3 mb-6">
                <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${cat.color} flex items-center justify-center text-white`}>
                  {cat.icon}
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-white">{cat.title}</h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {cat.items.map((item) => (
                  <div
                    key={item.name}
                    className="flex items-center gap-3 p-4 rounded-xl bg-white/5 border border-white/10 hover:border-pink-500/30 hover:bg-white/10 transition-all cursor-pointer group"
                  >
                    <span className="text-gray-400 group-hover:text-pink-400 transition-colors">
                      {item.icon}
                    </span>
                    <span className="text-sm text-gray-300 group-hover:text-white transition-colors">
                      {item.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
