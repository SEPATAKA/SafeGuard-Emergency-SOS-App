import React, { useState } from 'react';
import {
  Mail, Send, CheckCircle, Clock, AlertTriangle,
  Settings, RefreshCw, Eye, Inbox
} from 'lucide-react';

interface EmailLog {
  id: string;
  to: string;
  subject: string;
  incident: string;
  sentAt: string;
  status: 'delivered' | 'pending' | 'failed';
  openedAt?: string;
}

const emailLogs: EmailLog[] = [
  { id: 'eml_001', to: 'priya.guna@gmail.com', subject: '🚨 SOS Alert — Deshani Gunathilaka', incident: 'inc_001', sentAt: '2025-05-28T14:32:05Z', status: 'delivered', openedAt: '2025-05-28T14:34:22Z' },
  { id: 'eml_002', to: 'kasun.perera@gmail.com', subject: '🚨 SOS Alert — Deshani Gunathilaka', incident: 'inc_001', sentAt: '2025-05-28T14:32:06Z', status: 'delivered', openedAt: '2025-05-28T14:35:10Z' },
  { id: 'eml_003', to: 'nimali.silva@gmail.com', subject: '🚨 SOS Alert — Deshani Gunathilaka', incident: 'inc_001', sentAt: '2025-05-28T14:32:07Z', status: 'delivered' },
  { id: 'eml_004', to: 'family@gmail.com', subject: '🚨 SOS Alert — Amali Fernando', incident: 'inc_002', sentAt: '2025-05-28T09:15:03Z', status: 'delivered', openedAt: '2025-05-28T09:16:45Z' },
  { id: 'eml_005', to: 'friend@gmail.com', subject: '🚨 SOS Alert — Amali Fernando', incident: 'inc_002', sentAt: '2025-05-28T09:15:04Z', status: 'failed' },
  { id: 'eml_006', to: 'contact1@gmail.com', subject: '📍 Location Share — Saman Wickramasinghe', incident: 'inc_003', sentAt: '2025-05-28T07:00:12Z', status: 'delivered' },
  { id: 'eml_007', to: 'rashmi.family@gmail.com', subject: '🚨 SOS Alert — Rashmi Jayawardena', incident: 'inc_004', sentAt: '2025-05-27T22:45:08Z', status: 'delivered', openedAt: '2025-05-27T22:47:30Z' },
  { id: 'eml_008', to: 'rashmi.contact2@gmail.com', subject: '🚨 SOS Alert — Rashmi Jayawardena', incident: 'inc_004', sentAt: '2025-05-27T22:45:09Z', status: 'pending' },
];

const NotificationsPanel: React.FC = () => {
  const [testEmail, setTestEmail] = useState('');
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [selectedEmail, setSelectedEmail] = useState<EmailLog | null>(null);

  const handleTestSend = () => {
    if (!testEmail) return;
    setSending(true);
    setTimeout(() => {
      setSending(false);
      setSent(true);
      setTimeout(() => setSent(false), 4000);
    }, 2500);
  };

  const statusConfig = {
    delivered: { color: 'text-emerald-400', bg: 'bg-emerald-500/15', icon: CheckCircle, label: 'Delivered' },
    pending: { color: 'text-amber-400', bg: 'bg-amber-500/15', icon: Clock, label: 'Pending' },
    failed: { color: 'text-red-400', bg: 'bg-red-500/15', icon: AlertTriangle, label: 'Failed' },
  };

  const emailTemplate = `From: SafeGuard System <noreply@safeguard.lk>
To: [Emergency Contact Gmail]
Subject: 🚨 SOS ALERT — [User Name] needs help!

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
         🆘 EMERGENCY SOS ALERT
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

[User Name] has triggered an SOS alert
and may need immediate assistance.

📍 LIVE LOCATION:
https://maps.google.com/?q=[LAT],[LNG]

🕐 Triggered at: [TIMESTAMP]
📱 Device: React Native Mobile App

This alert was sent automatically via
SafeGuard Emergency SOS System.

Built with: Laravel + PHP Mail → Gmail
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`;

  return (
    <div className="p-6 animate-fade-in">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-black text-white" style={{ fontFamily: 'Space Grotesk' }}>Email Notifications</h1>
          <p className="text-slate-500 text-sm mt-0.5">PHP Mail → Gmail SMTP alert system management</p>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
          <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-xs text-emerald-400 font-medium">SMTP Active</span>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-5">
        {/* Left: Email logs */}
        <div className="lg:col-span-2 space-y-4">
          {/* Stats row */}
          <div className="grid grid-cols-3 gap-3">
            {[
              { label: 'Total Sent', value: '47', icon: Send, color: 'text-blue-400', bg: 'bg-blue-500/10' },
              { label: 'Delivered', value: '44', icon: CheckCircle, color: 'text-emerald-400', bg: 'bg-emerald-500/10' },
              { label: 'Failed', value: '3', icon: AlertTriangle, color: 'text-red-400', bg: 'bg-red-500/10' },
            ].map(({ label, value, icon: Icon, color, bg }) => (
              <div key={label} className="glass-card rounded-2xl p-4">
                <div className={`w-9 h-9 rounded-xl ${bg} flex items-center justify-center mb-3`}>
                  <Icon size={16} className={color} />
                </div>
                <div className="text-2xl font-black text-white mb-0.5" style={{ fontFamily: 'Space Grotesk' }}>{value}</div>
                <div className="text-xs text-slate-500">{label} today</div>
              </div>
            ))}
          </div>

          {/* Email log list */}
          <div className="glass-card rounded-2xl overflow-hidden">
            <div className="flex items-center justify-between p-4 border-b border-white/5">
              <h3 className="font-bold text-white text-sm" style={{ fontFamily: 'Space Grotesk' }}>Email Dispatch Log</h3>
              <button className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition-colors">
                <RefreshCw size={12} /> Refresh
              </button>
            </div>
            <div className="overflow-y-auto max-h-80 scrollbar-hide">
              {emailLogs.map((email) => {
                const sc = statusConfig[email.status];
                const StatusIcon = sc.icon;
                return (
                  <div
                    key={email.id}
                    onClick={() => setSelectedEmail(selectedEmail?.id === email.id ? null : email)}
                    className={`flex items-center gap-3 p-4 cursor-pointer border-b border-white/3 hover:bg-white/2 transition-all ${
                      selectedEmail?.id === email.id ? 'bg-indigo-500/5 border-l-2 border-l-indigo-500' : ''
                    }`}
                  >
                    <div className="w-8 h-8 rounded-xl bg-blue-500/10 flex items-center justify-center flex-shrink-0">
                      <Inbox size={14} className="text-blue-400" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-white truncate">{email.to}</p>
                      <p className="text-xs text-slate-500 truncate">{email.subject}</p>
                    </div>
                    <div className="flex flex-col items-end gap-1 flex-shrink-0">
                      <div className={`flex items-center gap-1 text-[10px] px-2 py-0.5 rounded-full ${sc.bg} ${sc.color}`}>
                        <StatusIcon size={9} />
                        {sc.label}
                      </div>
                      <span className="text-[10px] text-slate-600">
                        {new Date(email.sentAt).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right panel */}
        <div className="space-y-4">
          {/* Test email */}
          <div className="glass-card rounded-2xl p-5">
            <h3 className="font-bold text-white text-sm mb-4" style={{ fontFamily: 'Space Grotesk' }}>
              Send Test Email
            </h3>
            <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-xl px-3 py-2.5 mb-3">
              <Mail size={14} className="text-slate-500" />
              <input
                type="email"
                placeholder="target@gmail.com"
                className="bg-transparent text-sm text-white placeholder-slate-600 outline-none flex-1"
                value={testEmail}
                onChange={(e) => setTestEmail(e.target.value)}
              />
            </div>
            <button
              onClick={handleTestSend}
              disabled={sending || !testEmail}
              className={`w-full py-2.5 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 transition-all ${
                sent
                  ? 'bg-emerald-500/20 border border-emerald-500/30 text-emerald-400'
                  : 'btn-primary text-white disabled:opacity-50'
              }`}
            >
              {sending ? (
                <><RefreshCw size={14} className="animate-spin" /> Sending via PHP Mail...</>
              ) : sent ? (
                <><CheckCircle size={14} /> Email Delivered!</>
              ) : (
                <><Send size={14} /> Send Test Email</>
              )}
            </button>
            <p className="text-[10px] text-slate-600 mt-2 text-center">
              Uses PHP Mail → Gmail SMTP (TLS, Port 587)
            </p>
          </div>

          {/* SMTP Config */}
          <div className="glass-card rounded-2xl p-5">
            <div className="flex items-center gap-2 mb-4">
              <Settings size={14} className="text-indigo-400" />
              <h3 className="font-bold text-white text-sm" style={{ fontFamily: 'Space Grotesk' }}>SMTP Configuration</h3>
            </div>
            <div className="space-y-2.5 text-xs">
              {[
                { key: 'Driver', val: 'PHP Mail (PHPMailer)' },
                { key: 'Host', val: 'smtp.gmail.com' },
                { key: 'Port', val: '587' },
                { key: 'Encryption', val: 'TLS', highlight: true },
                { key: 'From Email', val: 'noreply@safeguard.lk' },
                { key: 'From Name', val: 'SafeGuard System' },
                { key: 'Auth', val: 'App Password (Google)' },
              ].map(({ key, val, highlight }) => (
                <div key={key} className="flex justify-between items-center">
                  <span className="text-slate-500">{key}</span>
                  <span className={`font-medium ${highlight ? 'text-emerald-400' : 'text-slate-300'}`}>{val}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Email template preview */}
          <div className="glass-card rounded-2xl p-4">
            <div className="flex items-center gap-2 mb-3">
              <Eye size={13} className="text-slate-400" />
              <h3 className="text-xs font-semibold text-white">Email Template</h3>
            </div>
            <pre className="text-[9px] text-slate-500 font-mono leading-relaxed overflow-x-auto whitespace-pre-wrap">
              {emailTemplate}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationsPanel;
