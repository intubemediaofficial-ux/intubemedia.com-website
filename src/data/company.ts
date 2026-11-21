import type { LucideIcon } from 'lucide-react';
import {
  AudioLines,
  BarChart3,
  Camera,
  Clapperboard,
  FileText,
  Globe2,
  Headphones,
  LayoutDashboard,
  Mic2,
  MonitorPlay,
  Music2,
  Radio,
  Rocket,
  ShieldCheck,
  Smartphone,
  Sparkles,
  Tags,
  Users,
  Video,
} from 'lucide-react';

export interface CompanyService {
  id: string;
  number: string;
  icon: LucideIcon;
  label: string;
  title: string;
  summary: string;
  points: string[];
}

export const companyServices: CompanyService[] = [
  {
    id: 'music-distribution',
    number: '01',
    icon: Globe2,
    label: 'Distribution',
    title: 'Worldwide Music Distribution',
    summary: 'We prepare every release — audio, artwork, credits and metadata — and deliver it to the streaming and social platforms listeners already use.',
    points: ['Release planning and scheduling', 'Metadata, ISRC and credit checks', 'Store, social and short-video delivery'],
  },
  {
    id: 'youtube-cms',
    number: '02',
    icon: ShieldCheck,
    label: 'YouTube CMS',
    title: 'YouTube CMS & Content ID',
    summary: 'Our own CMS platform protects partner catalogues on YouTube, manages claims and turns channel data into clear monthly revenue reports.',
    points: ['Content ID asset protection', 'Claim and dispute handling', 'Channel analytics and revenue reports'],
  },
  {
    id: 'artist-label',
    number: '03',
    icon: Users,
    label: 'Artists & Labels',
    title: 'Artist & Label Development',
    summary: 'From a first single to a full label catalogue, we help artists and channel owners shape their sound, schedule releases and build loyal audiences.',
    points: ['Artist onboarding and guidance', 'Label and channel management', 'Release strategy and promotion'],
  },
  {
    id: 'production',
    number: '04',
    icon: Clapperboard,
    label: 'Production',
    title: 'Music & Video Production',
    summary: 'Recording, mixing, music videos and shoots handled by a team that understands regional folk, Rasiya, devotional and modern pop audiences.',
    points: ['Song recording and mixing', 'Music video and shoot production', 'Thumbnails, posters and edits'],
  },
  {
    id: 'streaming',
    number: '05',
    icon: MonitorPlay,
    label: 'Streaming',
    title: 'OTT, Live & Streaming',
    summary: 'We run our own OTT, music streaming, micro-drama and 24/7 live broadcasting platforms, so partner content reaches viewers on every screen.',
    points: ['OTT and app publishing', 'Round-the-clock YouTube lives', 'Music and drama streaming'],
  },
  {
    id: 'technology',
    number: '06',
    icon: Rocket,
    label: 'Technology',
    title: 'Digital Growth & Technology',
    summary: 'Websites, apps, dashboards and AI-powered creator tools built in-house to help artists, labels and businesses grow online.',
    points: ['Websites, apps and dashboards', 'Creator and SEO tools', 'Digital marketing and growth'],
  },
];

export interface Artist {
  slug: string;
  name: string;
  role: string;
  genre: string;
  image: string;
  bio: string;
  youtube?: string;
}

export const artists: Artist[] = [
  {
    slug: 'dg-mawai',
    name: 'DG Mawai',
    role: 'Singer',
    genre: 'Rasiya • Folk',
    image: '/images/artists/dg-mawai.jpg',
    bio: 'A leading voice of modern Rasiya, known for high-energy wedding and celebration tracks that travel across Rajasthan and beyond.',
  },
  {
    slug: 'bhumika-sharma',
    name: 'Bhumika Sharma',
    role: 'Singer',
    genre: 'Devotional • Folk',
    image: '/images/artists/bhumika-sharma.jpg',
    bio: 'Brings warmth to devotional and folk songs, blending traditional melodies with a fresh, clear vocal style.',
  },
  {
    slug: 'rashmi-nishad',
    name: 'Rashmi Nishad',
    role: 'Singer',
    genre: 'Devotional • Bhajan',
    image: '/images/artists/rashmi-nishad.jpg',
    bio: 'A bhajan and devotional singer whose releases are loved by families looking for soulful, everyday prayer music.',
  },
  {
    slug: 'ajeet-bainsla',
    name: 'Ajeet Bainsla',
    role: 'Producer',
    genre: 'Music Producer • Founder',
    image: '/images/artists/ajeet-bainsla.jpg',
    bio: 'Producer and founder behind Bainsla Music, shaping hundreds of regional releases from studio session to screen.',
    youtube: 'https://www.youtube.com/@bainslaofficial',
  },
];

export const labelChannels = [
  'Bainsla Music',
  'DG Mawai Rasiya',
  'Bharti Choudhary',
  'PS Queen Rasiya',
  'Gurjar Rasiya Collection',
  'Bainsla Studio',
];

export interface StorePlatform {
  name: string;
  color: string;
}

export const storePlatforms: StorePlatform[] = [
  { name: 'Spotify', color: '#1db954' },
  { name: 'Apple Music', color: '#fa2d48' },
  { name: 'YouTube Music', color: '#ff0000' },
  { name: 'JioSaavn', color: '#2bc5b4' },
  { name: 'Amazon Music', color: '#25d1da' },
  { name: 'Gaana', color: '#e72c30' },
  { name: 'Wynk Music', color: '#ff3d3d' },
  { name: 'Instagram', color: '#e1306c' },
  { name: 'Facebook', color: '#1877f2' },
  { name: 'Snapchat', color: '#f7c600' },
];

export interface EcosystemProduct {
  name: string;
  domain: string;
  url: string;
  category: string;
  icon: LucideIcon;
  description: string;
  highlights: string[];
  featured?: boolean;
}

export const ecosystem: EcosystemProduct[] = [
  {
    name: 'Intube Media CMS',
    domain: 'cms.intubemedia.com',
    url: 'https://cms.intubemedia.com/',
    category: 'YouTube CMS & Content ID',
    icon: LayoutDashboard,
    description: 'Our YouTube content management system for partner channels and labels — Content ID protection, claim handling, channel analytics and monthly revenue reports in one dashboard.',
    highlights: ['Content ID', 'Revenue reports', 'Channel analytics'],
    featured: true,
  },
  {
    name: 'Intube Play',
    domain: 'intubeplay.com',
    url: 'https://intubeplay.com/',
    category: 'OTT Streaming',
    icon: Clapperboard,
    description: 'Our OTT platform for movies, music videos, bhakti, Rasiya and live channels — streaming on the web and on Android.',
    highlights: ['Movies & series', 'Bhakti & Rasiya', 'Android app'],
    featured: true,
  },
  {
    name: 'Intube Music',
    domain: 'intubemusic.com',
    url: 'https://www.intubemusic.com/',
    category: 'Music Streaming',
    icon: Headphones,
    description: 'A music streaming home for Bainsla Music and partner labels — albums, artists and new releases free to play online and in the app.',
    highlights: ['Albums & artists', 'New releases', 'Web & app'],
    featured: true,
  },
  {
    name: 'IntubeLive',
    domain: 'intubelive.com',
    url: 'https://intubelive.com/',
    category: '24/7 Live Streaming',
    icon: Radio,
    description: 'A cloud live-streaming platform that keeps YouTube lives running around the clock — schedule playlists and run many channels without a PC.',
    highlights: ['24/7 lives', 'Weekly planner', 'Multi-channel'],
    featured: true,
  },
  {
    name: 'Intube Drama',
    domain: 'intubedrama.com',
    url: 'https://intubedrama.com/',
    category: 'Micro Drama',
    icon: Smartphone,
    description: 'Short vertical drama series made for mobile, with fresh episodes and VIP plans.',
    highlights: ['Vertical series', 'Mobile first'],
  },
  {
    name: 'Bainsla Music',
    domain: 'bainslamusic.com',
    url: 'https://bainslamusic.com/',
    category: 'Record Label',
    icon: Music2,
    description: 'Our music company for Rajasthani folk, Rasiya and devotional music — artists, releases and label channels.',
    highlights: ['Folk & Rasiya', 'Devotional'],
  },
  {
    name: 'Bainsla Music Tags',
    domain: 'tag.bainslamusic.com',
    url: 'https://tag.bainslamusic.com/',
    category: 'Creator Tools',
    icon: Tags,
    description: 'A YouTube tag, title and trend studio that helps creators get discovered.',
    highlights: ['Tags & titles', 'Trends'],
  },
  {
    name: 'Creator & PDF Tools',
    domain: 'tools.bainslamusic.com',
    url: 'https://tools.bainslamusic.com/',
    category: 'Online Tools',
    icon: FileText,
    description: 'Free online PDF, image and creator tools that work right in the browser.',
    highlights: ['PDF tools', 'Creator tools'],
  },
  {
    name: 'Bainsla Meet',
    domain: 'meet.bainslamusic.com',
    url: 'https://meet.bainslamusic.com/',
    category: 'Video Meetings',
    icon: Video,
    description: 'Free HD video meetings for teams, artists and partners, hosted on our own servers.',
    highlights: ['HD calls', 'Self-hosted'],
  },
  {
    name: 'CamGuard',
    domain: 'camguard.intubemedia.com',
    url: 'https://camguard.intubemedia.com/',
    category: 'Safety App',
    icon: Camera,
    description: 'A free hidden-camera detector that scans with your phone’s lens, Wi-Fi and Bluetooth.',
    highlights: ['Lens & IR scan', 'Wi-Fi scan'],
  },
];

export const highlights = [
  { icon: Globe2, title: 'Worldwide Distribution', text: 'Songs on every major store' },
  { icon: ShieldCheck, title: 'YouTube CMS', text: 'Content ID & revenue reports' },
  { icon: MonitorPlay, title: 'Own Streaming Platforms', text: 'OTT, music, drama & live' },
  { icon: Sparkles, title: 'Personal Support', text: 'A real team behind you' },
];

export const journey = [
  { icon: Mic2, title: 'Start a Conversation', text: 'Tell us about your music, channel, label or business idea.' },
  { icon: ShieldCheck, title: 'Partnership Review', text: 'Our team checks rights, catalogue and goals, then shares a plan.' },
  { icon: AudioLines, title: 'Onboard & Release', text: 'Audio, video, artwork and metadata go live across our network.' },
  { icon: BarChart3, title: 'Track & Grow', text: 'Follow reports, revenue and audience growth with our team.' },
];
