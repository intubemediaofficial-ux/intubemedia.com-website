import {
  AlertTriangle, BadgeCheck, BarChart3, Bot, Brush, CalendarCheck, Camera,
  Clapperboard, Cloud, Copyright, Cpu, Database, DollarSign, Facebook,
  FileCheck, FileSignature, FileText, Flame, GitMerge, Globe, HardDrive,
  Hash, Headphones, HeadphonesIcon, Image, Instagram, LineChart, Link2,
  Lock, Mail, MailCheck, MapPin, Megaphone, Mic, MonitorPlay, Network,
  Newspaper, Package, Palette, PenTool, Phone, Plane, QrCode, Scissors,
  Search, Server, Share2, Shield, ShieldCheck, ShoppingCart, Smartphone,
  Sparkles, Target, Trash2, TrendingUp, Upload, UserCircle, Users,
  UtensilsCrossed, Video, Workflow, Youtube, Zap, type LucideIcon,
} from 'lucide-react';

const iconMap: Record<string, LucideIcon> = {
  AlertTriangle, BadgeCheck, BarChart3, Bot, Brush, CalendarCheck, Camera,
  Clapperboard, Cloud, Copyright, Cpu, Database, DollarSign, Facebook,
  FileCheck, FileSignature, FileText, Flame, GitMerge, Globe, HardDrive,
  Hash, Headphones, HeadphonesIcon, Image, Instagram, LineChart, Link2,
  Lock, Mail, MailCheck, MapPin, Megaphone, Mic, MonitorPlay, Network,
  Newspaper, Package, Palette, PenTool, Phone, Plane, QrCode, Scissors,
  Search, Server, Share2, Shield, ShieldCheck, ShoppingCart, Smartphone,
  Sparkles, Target, Trash2, TrendingUp, Upload, UserCircle, Users,
  UtensilsCrossed, Video, Workflow, Youtube, Zap,
};

export default function CmsIcon({ icon, className }: { icon: string | LucideIcon; className?: string }) {
  if (typeof icon !== 'string') {
    const Icon = icon;
    return <Icon className={className} />;
  }

  const Icon = iconMap[icon];
  if (Icon) return <Icon className={className} />;
  return <span className={className} aria-hidden="true">{icon}</span>;
}
