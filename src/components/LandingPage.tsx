import React, { useState, useEffect } from 'react';
import {
  Shield, MapPin, Users, Zap, Globe,
  ChevronRight, ArrowRight, CheckCircle, Lock,
  Smartphone, Server, Database, Mail, Star,
  AlertTriangle, Activity, Clock, BarChart2
} from 'lucide-react';
import { ViewType } from '../types';

interface LandingPageProps {
  onNavigate: (view: ViewType) => void;
}

const features = [
  {
    icon: Zap,
    title: 'One-Tap SOS',
    desc: 'Instantly sends distress alerts to all pre-configured emergency contacts with a single button press.',
    color: 'from-red-500 to-rose-600',
    glow: 'rgba(239,68,68,0.3)',
  },
  {
    icon: MapPin,
    title: 'Real-Time GPS Tracking',
    desc: 'Continuously streams live location via Google Maps API, giving responders pinpoint accuracy.',
    color: 'from-blue-500 to-indigo-600',
    glow: 'rgba(99,102,241,0.3)',
  },
  {
    icon: Mail,
    title: 'Gmail Email Alerts',
    desc: 'Immediate email notifications dispatched via PHP Mail with a Google Maps live-tracking link.',
    color: 'from-emerald-500 to-teal-600',
    glow: 'rgba(16,185,129,0.3)',
  },
  {
    icon: Users,
    title: 'Contact Management',
    desc: 'Securely add, edit, and prioritize trusted emergency contacts within a private profile.',
    color: 'from-purple-500 to-violet-600',
    glow: 'rgba(139,92,246,0.3)',
  },
  {
    icon: BarChart2,
    title: 'Admin Analytics',
    desc: 'Visual dashboards with incident graphs, response time stats, and email delivery reports.',
    color: 'from-amber-500 to-orange-600',
    glow: 'rgba(245,158,11,0.3)',
  },
  {
    icon: Lock,
    title: 'Laravel Sanctum Auth',
    desc: 'Enterprise-grade session security with encrypted tokens for all mobile API communications.',
    color: 'from-cyan-500 to-sky-600',
    glow: 'rgba(6,182,212,0.3)',
  },
];

const techStack = [
  { name: 'Laravel', role: 'Backend API', icon: Server, color: '#FF2D20' },
  { name: 'React Native', role: 'Mobile App', icon: Smartphone, color: '#61DAFB' },
  { name: 'MySQL', role: 'Database', icon: Database, color: '#4479A1' },
  { name: 'Google Maps', role: 'Location Services', icon: MapPin, color: '#34A853' },
  { name: 'PHP Mail', role: 'Email Alerts', icon: Mail, color: '#8892BF' },
  { name: 'Sanctum Auth', role: 'Security Layer', icon: Lock, color: '#F59E0B' },
];

const stats = [
  { label: 'Registered Users', value: '1,248', icon: Users },
  { label: 'Alerts Resolved', value: '99.2%', icon: CheckCircle },
  { label: 'Avg. Response Time', value: '4m 32s', icon: Clock },
  { label: 'System Uptime', value: '99.97%', icon: Activity },
];

const ParticleField: React.FC = () => {
  const particles = Array.from({ length: 30 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 3 + 1,
    delay: Math.random() * 5,
    duration: Math.random() * 10 + 8,
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute rounded-full bg-red-400/20"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            animation: `float ${p.duration}s ease-in-out ${p.delay}s infinite`,
          }}
        />
      ))}
    </div>
  );
};

const LandingPage: React.FC<LandingPageProps> = ({ onNavigate }) => {
  const [activeAlert, setActiveAlert] = useState(false);
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCounter((c) => (c + 1) % 3);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const alertMessages = [
    '🚨 SOS Alert from Amali Fernando — Kandy',
    '📧 Email dispatched to 3 emergency contacts',
    '📍 Live location shared: maps.google.com/?q=7.2906,80.6337',
  ];

  return (
    <div className="min-h-screen bg-[#070b18] text-white overflow-x-hidden">
      {/* Top nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-red-500 to-rose-700 flex items-center justify-center glow-red">
              <Shield size={18} className="text-white" />
            </div>
            <span className="font-bold text-xl tracking-tight" style={{ fontFamily: 'Space Grotesk' }}>
              Safe<span className="text-red-400">Guard</span>
            </span>
          </div>

          <div className="hidden md:flex items-center gap-8 text-sm text-slate-400">
            <a href="#features" className="hover:text-white transition-colors">Features</a>
            <a href="#tech" className="hover:text-white transition-colors">Technology</a>
            <a href="#system" className="hover:text-white transition-colors">Architecture</a>
            <a href="#about" className="hover:text-white transition-colors">About</a>
          </div>

          <div className="flex items-center gap-3">
  <button
    onClick={() => onNavigate('auth')}
    className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-lg text-sm text-slate-300 hover:text-white border border-white/10 hover:border-white/20 transition-all"
  >
    <Smartphone size={15} />
    Mobile App
  </button>

  <button
  onClick={() => onNavigate('auth')}
  className="btn-danger px-4 py-2 rounded-lg text-sm font-semibold flex items-center gap-2"
>
  <Shield size={15} />
  Admin Panel
</button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center pt-16 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: 'url(/images/hero-bg.jpg)', opacity: 0.25 }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#070b18]/60 via-[#070b18]/40 to-[#070b18]" />
        <ParticleField />

        {/* Radial glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-red-600/5 blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full bg-red-600/10 blur-2xl" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
          {/* Left content */}
          <div className="animate-slide-left">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 text-sm font-medium mb-6">
              <span className="w-2 h-2 rounded-full bg-red-400 animate-pulse" />
              SLIATE HND Project — TRI/IT/2324/F/80
            </div>

            <h1 className="text-5xl lg:text-7xl font-black leading-none mb-6 tracking-tight" style={{ fontFamily: 'Space Grotesk' }}>
              Emergency
              <br />
              <span className="gradient-text-red">SOS</span>
              <span className="text-slate-400"> &</span>
              <br />
              Location
              <br />
              <span className="text-slate-300">Sharing</span>
            </h1>

            <p className="text-lg text-slate-400 leading-relaxed mb-8 max-w-lg">
              A life-saving platform that leverages <span className="text-white font-medium">real-time GPS</span>,{' '}
              <span className="text-red-400 font-medium">one-tap SOS alerts</span>, and{' '}
              <span className="text-white font-medium">Gmail email notifications</span> via PHP Mail —
              built with <strong className="text-red-400">Laravel</strong> and <strong className="text-blue-400">React Native</strong>.
            </p>

            <div className="flex flex-wrap gap-4 mb-10">
              <button
                onClick={() => onNavigate('mobile-app')}
                className="flex items-center gap-2 px-6 py-3.5 rounded-xl bg-white/5 border border-white/15 text-white font-semibold hover:bg-white/10 transition-all hover:border-white/25"
              >
                <Smartphone size={18} />
                View Mobile App
                <ChevronRight size={16} className="text-slate-400" />
              </button>
              <button
                onClick={() => onNavigate('admin-dashboard')}
                className="btn-danger flex items-center gap-2 px-6 py-3.5 rounded-xl font-semibold"
              >
                <Shield size={18} />
                Admin Dashboard
                <ArrowRight size={16} />
              </button>
            </div>

            {/* Mini stats */}
            <div className="grid grid-cols-2 gap-4">
              {stats.slice(0, 2).map((s) => {
                const Icon = s.icon;
                return (
                  <div key={s.label} className="glass-card p-4 rounded-xl">
                    <div className="flex items-center gap-2 mb-1">
                      <Icon size={14} className="text-red-400" />
                      <span className="text-xs text-slate-500">{s.label}</span>
                    </div>
                    <div className="text-2xl font-bold text-white">{s.value}</div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right — animated phone mockup */}
          <div className="flex justify-center lg:justify-end animate-slide-right">
            <div className="relative">
              {/* Glow rings */}
              <div className="absolute inset-0 rounded-[48px] bg-red-600/20 blur-2xl scale-110" />
              <div className="absolute inset-0 rounded-[48px] bg-red-600/10 blur-3xl scale-125 pulse-ring" />

              {/* Phone frame */}
              <div className="relative phone-frame rounded-[44px] w-72 h-[580px] overflow-hidden">
                {/* Status bar */}
                <div className="h-10 bg-black/40 flex items-center justify-between px-6 pt-2">
                  <span className="text-xs text-white/70">9:41</span>
                  <div className="w-20 h-5 bg-black rounded-full" />
                  <div className="flex gap-1.5">
                    {[...Array(4)].map((_, i) => (
                      <div key={i} className={`w-1 rounded-sm bg-white/60`} style={{ height: `${6 + i * 2}px` }} />
                    ))}
                  </div>
                </div>

                {/* App content */}
                <div className="bg-[#0a0f1e] h-full p-4 flex flex-col">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <p className="text-xs text-slate-500">Welcome back</p>
                      <p className="text-white font-bold text-sm">Deshani G.</p>
                    </div>
                    <div className="w-8 h-8 rounded-full overflow-hidden border-2 border-red-500/50">
                      <img src="/images/avatar-female.jpg" alt="User" className="w-full h-full object-cover" />
                    </div>
                  </div>

                  {/* SOS Button */}
                  <div className="flex flex-col items-center justify-center py-6">
                    <div className="relative">
                      <div className="absolute inset-0 rounded-full bg-red-500/20 scale-125 ping-custom" />
                      <div className="absolute inset-0 rounded-full bg-red-500/15 scale-150 ping-custom" style={{ animationDelay: '0.5s' }} />
                      <button
                        onClick={() => setActiveAlert(!activeAlert)}
                        className={`relative w-32 h-32 rounded-full flex flex-col items-center justify-center font-black text-2xl text-white transition-all duration-300 ${
                          activeAlert
                            ? 'bg-gradient-to-br from-red-600 to-rose-800 shadow-[0_0_60px_rgba(239,68,68,0.8)]'
                            : 'bg-gradient-to-br from-red-500 to-rose-700 shadow-[0_0_40px_rgba(239,68,68,0.5)]'
                        }`}
                        style={{ fontFamily: 'Space Grotesk' }}
                      >
                        SOS
                        <span className="text-xs font-normal text-red-200 mt-1">HOLD 3s</span>
                      </button>
                    </div>
                    <p className="text-xs text-slate-500 mt-4 text-center">
                      {activeAlert ? '🚨 Alert Sent — Help is coming' : 'Tap to send emergency alert'}
                    </p>
                  </div>

                  {/* Live alert ticker */}
                  <div className="glass rounded-xl p-3 mb-3">
                    <div className="flex items-center gap-2 mb-2">
                      <AlertTriangle size={12} className="text-amber-400" />
                      <span className="text-xs text-amber-400 font-medium">LIVE STATUS</span>
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      {alertMessages[counter]}
                    </p>
                  </div>

                  {/* Location */}
                  <div className="glass rounded-xl p-3">
                    <div className="flex items-center gap-2 mb-1">
                      <MapPin size={11} className="text-blue-400" />
                      <span className="text-xs text-blue-400 font-medium">YOUR LOCATION</span>
                    </div>
                    <p className="text-xs text-slate-400">Colombo 03, Western Province</p>
                    <p className="text-xs text-slate-600 font-mono mt-0.5">6.9271°N, 79.8612°E</p>
                  </div>
                </div>
              </div>

              {/* Floating notification cards */}
              <div className="absolute -right-4 top-20 glass-card rounded-xl p-3 w-48 animate-slide-right" style={{ animationDelay: '0.3s' }}>
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-2 h-2 rounded-full bg-red-400 animate-pulse" />
                  <span className="text-xs font-semibold text-white">SOS Triggered</span>
                </div>
                <p className="text-xs text-slate-400">3 contacts notified via Gmail</p>
              </div>

              <div className="absolute -left-4 bottom-32 glass-card rounded-xl p-3 w-44 animate-slide-left" style={{ animationDelay: '0.5s' }}>
                <div className="flex items-center gap-2 mb-1">
                  <Mail size={10} className="text-emerald-400" />
                  <span className="text-xs font-semibold text-white">Email Sent</span>
                </div>
                <p className="text-xs text-slate-400">priya.guna@gmail.com</p>
                <p className="text-xs text-emerald-400 mt-0.5">✓ Delivered</p>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
          <span className="text-xs text-slate-600">Scroll to explore</span>
          <div className="w-5 h-8 rounded-full border border-slate-700 flex items-start justify-center pt-1.5">
            <div className="w-1 h-2 rounded-full bg-slate-500" />
          </div>
        </div>
      </section>

      {/* Stats Banner */}
      <section className="py-16 border-y border-white/5 bg-gradient-to-r from-red-950/20 via-transparent to-indigo-950/20">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((s) => {
            const Icon = s.icon;
            return (
              <div key={s.label} className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-red-500/10 border border-red-500/20 mb-3">
                  <Icon size={20} className="text-red-400" />
                </div>
                <div className="text-3xl font-black text-white mb-1" style={{ fontFamily: 'Space Grotesk' }}>{s.value}</div>
                <div className="text-sm text-slate-500">{s.label}</div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-24 max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-sm font-medium mb-4">
            <Star size={14} />
            KEY FEATURES
          </div>
          <h2 className="text-4xl lg:text-5xl font-black mb-4" style={{ fontFamily: 'Space Grotesk' }}>
            Everything you need for
            <br />
            <span className="gradient-text-red">emergency safety</span>
          </h2>
          <p className="text-slate-400 max-w-xl mx-auto text-lg">
            A comprehensive suite of tools designed to save lives through rapid response and real-time communication.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f, i) => {
            const Icon = f.icon;
            return (
              <div
                key={f.title}
                className="glass-card rounded-2xl p-6 card-hover cursor-default group"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <div
                  className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${f.color} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300`}
                  style={{ boxShadow: `0 0 20px ${f.glow}` }}
                >
                  <Icon size={22} className="text-white" />
                </div>
                <h3 className="font-bold text-lg text-white mb-2" style={{ fontFamily: 'Space Grotesk' }}>{f.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{f.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Tech Stack */}
      <section id="tech" className="py-24 bg-gradient-to-b from-transparent via-slate-900/30 to-transparent">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-medium mb-4">
              <Server size={14} />
              TECHNOLOGY STACK
            </div>
            <h2 className="text-4xl font-black mb-4" style={{ fontFamily: 'Space Grotesk' }}>
              Built with <span className="gradient-text-blue">industry-leading</span> technologies
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {techStack.map((tech) => {
              const Icon = tech.icon;
              return (
                <div key={tech.name} className="glass-card rounded-2xl p-5 flex items-center gap-4 card-hover">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background: `${tech.color}20`, border: `1px solid ${tech.color}40` }}
                  >
                    <Icon size={22} style={{ color: tech.color }} />
                  </div>
                  <div>
                    <div className="font-bold text-white" style={{ fontFamily: 'Space Grotesk' }}>{tech.name}</div>
                    <div className="text-sm text-slate-400">{tech.role}</div>
                  </div>
                  <CheckCircle size={16} className="ml-auto text-emerald-400/60" />
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* System Architecture */}
      <section id="system" className="py-24 max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm font-medium mb-4">
            <Activity size={14} />
            SYSTEM ARCHITECTURE
          </div>
          <h2 className="text-4xl font-black" style={{ fontFamily: 'Space Grotesk' }}>
            How <span className="gradient-text-red">SafeGuard</span> works
          </h2>
        </div>

        <div className="relative">
          <div className="grid md:grid-cols-4 gap-0 relative">
            {[
              { step: '01', icon: Smartphone, label: 'Mobile Client', desc: 'User taps SOS button on React Native app', color: 'from-red-500 to-rose-600' },
              { step: '02', icon: Server, label: 'Laravel API', desc: 'Receives secure request via Sanctum Auth, identifies user', color: 'from-orange-500 to-amber-600' },
              { step: '03', icon: Mail, label: 'PHP Mail Engine', desc: 'Dispatches Gmail alerts with Google Maps live-link', color: 'from-blue-500 to-indigo-600' },
              { step: '04', icon: Database, label: 'MySQL Database', desc: 'Logs full incident record for history & analytics', color: 'from-emerald-500 to-teal-600' },
            ].map((s, i) => {
              const Icon = s.icon;
              return (
                <div key={s.step} className="relative flex flex-col items-center">
                  {i < 3 && (
                    <div className="hidden md:block absolute top-12 left-1/2 w-full h-0.5 bg-gradient-to-r from-white/10 to-white/5 z-0">
                      <div className="absolute right-0 top-1/2 -translate-y-1/2 -translate-x-1">
                        <ChevronRight size={12} className="text-slate-600" />
                      </div>
                    </div>
                  )}
                  <div className={`relative z-10 w-24 h-24 rounded-3xl bg-gradient-to-br ${s.color} flex items-center justify-center mb-4 shadow-2xl`}>
                    <Icon size={32} className="text-white" />
                    <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-[#070b18] border border-white/10 flex items-center justify-center text-xs font-black text-white" style={{ fontFamily: 'Space Grotesk' }}>
                      {s.step}
                    </div>
                  </div>
                  <h3 className="font-bold text-white text-center mb-2" style={{ fontFamily: 'Space Grotesk' }}>{s.label}</h3>
                  <p className="text-xs text-slate-500 text-center px-4">{s.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* About section */}
      <section id="about" className="py-24 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-sm font-medium mb-6">
              <Globe size={14} />
              ABOUT THIS PROJECT
            </div>
            <h2 className="text-4xl font-black mb-6" style={{ fontFamily: 'Space Grotesk' }}>
              HND Research Project
              <br />
              <span className="text-slate-500">SLIATE · May 2026</span>
            </h2>
            <div className="space-y-4 text-slate-400">
              <p>
                This system was developed as a final project for the <strong className="text-white">Higher National Diploma in Information Technology</strong> at Sri Lanka Institute of Advanced Technological Education (SLIATE).
              </p>
              <p>
                The goal is to eliminate the delays inherent in manual emergency coordination by providing instant digital alerts, live GPS sharing, and a centralized admin control panel.
              </p>
            </div>
            <div className="mt-8 glass-card rounded-2xl p-5">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl overflow-hidden border-2 border-red-500/30">
                  <img src="/images/avatar-female.jpg" alt="Deshani" className="w-full h-full object-cover" />
                </div>
                <div>
                  <div className="font-bold text-white">Deshani Gunathilaka</div>
                  <div className="text-sm text-slate-400">TRI/IT/2324/F/80 · SLIATE</div>
                  <div className="text-xs text-red-400 mt-0.5">HND Information Technology</div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {[
              { label: 'Project Category', value: 'Emergency Tech', icon: Shield },
              { label: 'Backend', value: 'Laravel (PHP)', icon: Server },
              { label: 'Mobile', value: 'React Native', icon: Smartphone },
              { label: 'Notifications', value: 'PHP Mail → Gmail', icon: Mail },
              { label: 'Database', value: 'MySQL', icon: Database },
              { label: 'Maps', value: 'Google Maps API', icon: MapPin },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.label} className="glass-card rounded-xl p-4">
                  <Icon size={16} className="text-red-400 mb-2" />
                  <div className="text-xs text-slate-500 mb-1">{item.label}</div>
                  <div className="text-sm font-semibold text-white">{item.value}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-red-950/40 via-transparent to-indigo-950/30" />
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-5xl font-black mb-6" style={{ fontFamily: 'Space Grotesk' }}>
            Ready to explore?
          </h2>
          <p className="text-slate-400 text-lg mb-10">
            Experience the Mobile App interface or dive into the Admin Dashboard analytics.
          </p>
         <div className="flex flex-wrap justify-center gap-4">
  <button
    onClick={() => onNavigate('mobile-app')}
    className="flex items-center gap-2 px-8 py-4 rounded-xl bg-white/5 border border-white/15 text-white font-semibold hover:bg-white/10 transition-all text-lg hover:border-white/25"
  >
    <Smartphone size={20} />
    Mobile App Demo
  </button>

  <button
    onClick={() => {
      localStorage.removeItem('safeguard_token');
      localStorage.removeItem('safeguard_user');
      onNavigate('auth');
    }}
    className="btn-danger flex items-center gap-2 px-8 py-4 rounded-xl font-semibold text-lg"
  >
    <Shield size={20} />
    Admin Dashboard
    <ArrowRight size={18} />
  </button>
</div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/5 py-8 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-slate-600">
          <div className="flex items-center gap-2">
            <Shield size={14} className="text-red-500/50" />
            SafeGuard — Emergency SOS & Location Sharing System
          </div>
          <div>© 2026 Deshani Gunathilaka · SLIATE · TRI/IT/2324/F/80</div>
          <div className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            System Online
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
