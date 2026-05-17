import {
  Store, Users, Video, Music, GraduationCap, Tv, CalendarHeart,
  Gem, CreditCard
} from 'lucide-react';

const ideas = [
  { icon: <Store size={24} />, name: 'Influencer Marketplace', desc: 'Connect brands with verified creators' },
  { icon: <Users size={24} />, name: 'Brand x Creator Portal', desc: 'Seamless collaboration platform' },
  { icon: <Video size={24} />, name: 'AI Video SaaS Tool', desc: 'Create professional videos with AI' },
  { icon: <Music size={24} />, name: 'Music Distribution', desc: 'Distribute music to all platforms' },
  { icon: <GraduationCap size={24} />, name: 'Creator Academy', desc: 'Learn, grow, and master content creation' },
  { icon: <Tv size={24} />, name: 'OTT / Podcast Network', desc: 'Premium content network' },
  { icon: <CalendarHeart size={24} />, name: 'Event & Artist Management', desc: 'End-to-end event planning' },
  { icon: <Gem size={24} />, name: 'NFT / Digital Merchandise', desc: 'Digital assets and merch' },
  { icon: <CreditCard size={24} />, name: 'Creator Payment Dashboard', desc: 'Track and manage all revenue' },
];

export default function FutureIdeas() {
  return (
    <section id="about" className="py-20 sm:py-28 relative">
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-pink-500/50 to-transparent" />
        <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-indigo-600/10 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <span className="text-sm font-semibold text-pink-400 uppercase tracking-wider">
            Coming Soon
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mt-3 mb-4">
            Future Expansion
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            We're building the future of digital media. Here's what's coming next to Intube Media.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {ideas.map((idea) => (
            <div
              key={idea.name}
              className="relative p-6 rounded-2xl bg-gradient-to-br from-white/5 to-white/0 border border-white/10 hover:border-violet-500/30 transition-all group overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-violet-600/5 to-pink-600/5 opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative z-10">
                <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center text-violet-400 group-hover:text-pink-400 transition-colors mb-4">
                  {idea.icon}
                </div>
                <h3 className="text-lg font-semibold text-white mb-1">{idea.name}</h3>
                <p className="text-sm text-gray-400">{idea.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
