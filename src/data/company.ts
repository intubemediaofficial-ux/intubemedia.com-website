import type { LucideIcon } from 'lucide-react';
import {
  AudioLines,
  BarChart3,
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
  group: string;
}

export const serviceGroups = ['Music & Distribution', 'YouTube CMS & Rights', 'Live Streaming', 'OTT & Apps', 'Production & Tech'];

export const companyServices: CompanyService[] = [
  {
    id: 'music-distribution', number: '01', icon: Globe2, group: 'Music & Distribution', label: 'Distribution', title: 'Worldwide Music Distribution',
    summary: 'We prepare every release — audio, artwork, credits and metadata — and deliver it to the streaming and social platforms listeners already use.',
    points: ['Spotify, Apple Music, JioSaavn, Amazon & 150+ stores', 'Metadata, ISRC/UPC and credit checks', 'Instagram, Facebook & short-video music'],
  },
  {
    id: 'artist-label', number: '02', icon: Users, group: 'Music & Distribution', label: 'Artists & Labels', title: 'Artist & Label Development',
    summary: 'From a first single to a full label catalogue, we help artists and labels plan releases, grow audiences and move catalogues safely.',
    points: ['Artist onboarding and release planning', 'Catalogue migration from other distributors', 'Playlist pitching and promotion'],
  },
  {
    id: 'youtube-cms', number: '03', icon: LayoutDashboard, group: 'YouTube CMS & Rights', label: 'YouTube CMS', title: 'Multi-Channel YouTube CMS',
    summary: 'Our own CMS links every partner channel to one dashboard — manage dozens of channels, assets and permissions from a single login.',
    points: ['All channels managed in one place', 'Channel linking and permissions', 'Channel analytics across the network'],
  },
  {
    id: 'content-id', number: '04', icon: ShieldCheck, group: 'YouTube CMS & Rights', label: 'Content ID', title: 'Content ID, Claims & Revenue',
    summary: 'We protect your catalogue on YouTube with Content ID, handle claims and disputes, and turn earnings into clear monthly reports.',
    points: ['Content ID asset protection', 'Claim and dispute handling', 'Revenue and payment reports'],
  },
  {
    id: 'live-streaming', number: '05', icon: Radio, group: 'Live Streaming', label: 'IntubeLive', title: '24/7 YouTube Live Streaming',
    summary: 'IntubeLive keeps YouTube lives running around the clock from the cloud — playlists, schedules and many channels, with no PC at home.',
    points: ['24/7 lives from pre-recorded videos', 'Weekly planner for 20+ channels', '₹1,000 / $10 per live channel a month'],
  },
  {
    id: 'ott-apps', number: '06', icon: MonitorPlay, group: 'OTT & Apps', label: 'OTT & Apps', title: 'OTT, Music & Drama Apps',
    summary: 'We run our own OTT, music streaming and micro-drama apps, so partner content reaches viewers on phones, TVs and the web.',
    points: ['Intube Play OTT publishing', 'Intube Music streaming', 'Intube Drama vertical series'],
  },
  {
    id: 'production', number: '07', icon: Clapperboard, group: 'Production & Tech', label: 'Production', title: 'Music & Video Production',
    summary: 'Recording, mixing, music videos and shoots by a team that knows folk, Rasiya, devotional and modern pop audiences.',
    points: ['Song recording and mixing', 'Music video and shoot production', 'Thumbnails, posters and edits'],
  },
  {
    id: 'technology', number: '08', icon: Rocket, group: 'Production & Tech', label: 'Technology', title: 'Digital Growth & Technology',
    summary: 'Websites, apps, dashboards and creator tools built in-house to help artists, labels and businesses grow online.',
    points: ['Websites, apps and dashboards', 'Creator, tag and SEO tools', 'Digital marketing and growth'],
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
