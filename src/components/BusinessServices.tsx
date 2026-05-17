import {
  Globe, ShoppingCart, Database, Smartphone, CalendarCheck, UtensilsCrossed,
  Bot, QrCode, Search, Target, Facebook, Youtube, Share2, FileText, Mail,
  MapPin, Palette, Brush, Package, Video, Camera, Clapperboard, Plane,
  Sparkles, Shield, Server, HardDrive, Lock, MailCheck, Cloud, Headphones,
  HeadphonesIcon, Cpu, Phone, MonitorPlay, Zap, BarChart3, Workflow
} from 'lucide-react';

const categories = [
  {
    title: 'Website & App Services',
    icon: <Globe className="w-6 h-6" />,
    color: 'from-blue-500 to-cyan-400',
    items: [
      { icon: <Globe size={20} />, name: 'Business Website Development' },
      { icon: <ShoppingCart size={20} />, name: 'E-commerce Website' },
      { icon: <Database size={20} />, name: 'Custom CRM/ERP Software' },
      { icon: <Smartphone size={20} />, name: 'Android & iOS App Development' },
      { icon: <CalendarCheck size={20} />, name: 'Booking & Appointment Systems' },
      { icon: <UtensilsCrossed size={20} />, name: 'Restaurant / Hotel Management Software' },
      { icon: <Bot size={20} />, name: 'AI Chatbot Integration' },
      { icon: <QrCode size={20} />, name: 'QR Code & Billing Systems' },
    ],
  },
  {
    title: 'Digital Marketing',
    icon: <Target className="w-6 h-6" />,
    color: 'from-green-500 to-emerald-400',
    items: [
      { icon: <Search size={20} />, name: 'SEO (Google Ranking)' },
      { icon: <Target size={20} />, name: 'Google Ads Management' },
      { icon: <Facebook size={20} />, name: 'Meta Ads (Facebook/Instagram)' },
      { icon: <Youtube size={20} />, name: 'YouTube Marketing' },
      { icon: <Share2 size={20} />, name: 'Social Media Handling' },
      { icon: <FileText size={20} />, name: 'Content Strategy' },
      { icon: <Mail size={20} />, name: 'Email & WhatsApp Marketing' },
      { icon: <MapPin size={20} />, name: 'Local SEO & Google My Business' },
    ],
  },
  {
    title: 'Branding & Creative',
    icon: <Palette className="w-6 h-6" />,
    color: 'from-pink-500 to-rose-400',
    items: [
      { icon: <Palette size={20} />, name: 'Logo Design' },
      { icon: <Brush size={20} />, name: 'Brand Identity Kit' },
      { icon: <Package size={20} />, name: 'Product Packaging Design' },
      { icon: <Video size={20} />, name: 'Video Editing' },
      { icon: <Camera size={20} />, name: 'Ad Shoots' },
      { icon: <Clapperboard size={20} />, name: 'Commercial Video Production' },
      { icon: <Plane size={20} />, name: 'Drone Shoots' },
      { icon: <Sparkles size={20} />, name: 'Animation & Motion Graphics' },
    ],
  },
  {
    title: 'IT Support & Security',
    icon: <Shield className="w-6 h-6" />,
    color: 'from-orange-500 to-amber-400',
    items: [
      { icon: <Shield size={20} />, name: 'Website Security' },
      { icon: <Server size={20} />, name: 'Server Management' },
      { icon: <HardDrive size={20} />, name: 'Data Backup Solutions' },
      { icon: <Lock size={20} />, name: 'Cyber Security' },
      { icon: <MailCheck size={20} />, name: 'Business Email Setup' },
      { icon: <Cloud size={20} />, name: 'Domain & Hosting Services' },
      { icon: <HeadphonesIcon size={20} />, name: 'Cloud Storage Setup' },
      { icon: <Headphones size={20} />, name: 'Technical Support Team' },
    ],
  },
  {
    title: 'AI & Automation',
    icon: <Cpu className="w-6 h-6" />,
    color: 'from-violet-500 to-purple-400',
    items: [
      { icon: <Bot size={20} />, name: 'AI Customer Support' },
      { icon: <Phone size={20} />, name: 'AI Voice Calling' },
      { icon: <MonitorPlay size={20} />, name: 'AI Video Generation' },
      { icon: <Zap size={20} />, name: 'Business Automation' },
      { icon: <Sparkles size={20} />, name: 'AI Social Media Content' },
      { icon: <Workflow size={20} />, name: 'Workflow Automation' },
      { icon: <BarChart3 size={20} />, name: 'AI Analytics Dashboard' },
    ],
  },
];

export default function BusinessServices() {
  return (
    <section id="services" className="py-20 sm:py-28 relative">
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-violet-500/50 to-transparent" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <span className="text-sm font-semibold text-violet-400 uppercase tracking-wider">
            What We Offer
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mt-3 mb-4">
            Business IT Solutions
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            End-to-end technology solutions to launch, grow, and protect your business in the digital age.
          </p>
        </div>

        <div className="space-y-12">
          {categories.map((cat) => (
            <div key={cat.title} className="group">
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
                    className="flex items-center gap-3 p-4 rounded-xl bg-white/5 border border-white/10 hover:border-violet-500/30 hover:bg-white/10 transition-all cursor-pointer group/card"
                  >
                    <span className="text-gray-400 group-hover/card:text-violet-400 transition-colors">
                      {item.icon}
                    </span>
                    <span className="text-sm text-gray-300 group-hover/card:text-white transition-colors">
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
