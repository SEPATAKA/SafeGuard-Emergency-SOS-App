import React, { useState } from 'react';
import {
  Mail, Database, Server,
  Globe, Bell, CheckCircle, Save, Eye, EyeOff
} from 'lucide-react';

const SettingsPanel: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [smtpHost, setSmtpHost] = useState('smtp.gmail.com');
  const [smtpPort, setSmtpPort] = useState('587');
  const [smtpUser, setSmtpUser] = useState('noreply@safeguard.lk');
  const [smtpPass, setSmtpPass] = useState('app_password_here');
  const [fromName, setFromName] = useState('SafeGuard System');
  const [saved, setSaved] = useState(false);

  const [sosTimeout, setSosTimeout] = useState('3');
  const [retryEmails, setRetryEmails] = useState(true);
  const [autoResolve, setAutoResolve] = useState(false);
  const [logRetention, setLogRetention] = useState('90');

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const Toggle = ({ val, onChange }: { val: boolean; onChange: (v: boolean) => void }) => (
    <button
      onClick={() => onChange(!val)}
      className={`relative w-10 h-5 rounded-full transition-colors ${val ? 'bg-emerald-500' : 'bg-slate-700'}`}
    >
      <div className={`absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white transition-transform ${val ? 'translate-x-5' : 'translate-x-0'}`} />
    </button>
  );

  return (
    <div className="p-6 animate-fade-in">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-black text-white" style={{ fontFamily: 'Space Grotesk' }}>System Settings</h1>
          <p className="text-slate-500 text-sm mt-0.5">Configure the SafeGuard backend and email system</p>
        </div>
        <button
          onClick={handleSave}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all ${
            saved ? 'bg-emerald-500/20 border border-emerald-500/30 text-emerald-400' : 'btn-primary text-white'
          }`}
        >
          {saved ? <><CheckCircle size={15} /> Saved!</> : <><Save size={15} /> Save Changes</>}
        </button>
      </div>

      <div className="grid lg:grid-cols-2 gap-5">
        {/* PHP Mail / SMTP Config */}
        <div className="glass-card rounded-2xl p-5">
          <div className="flex items-center gap-3 mb-5 pb-4 border-b border-white/5">
            <div className="w-9 h-9 rounded-xl bg-blue-500/15 flex items-center justify-center">
              <Mail size={16} className="text-blue-400" />
            </div>
            <div>
              <h3 className="font-bold text-white text-sm" style={{ fontFamily: 'Space Grotesk' }}>PHP Mail → Gmail SMTP</h3>
              <p className="text-xs text-slate-500">PHPMailer library configuration for Gmail alerts</p>
            </div>
          </div>

          <div className="space-y-4">
            {[
              { label: 'SMTP Host', val: smtpHost, set: setSmtpHost, placeholder: 'smtp.gmail.com' },
              { label: 'SMTP Port', val: smtpPort, set: setSmtpPort, placeholder: '587' },
              { label: 'SMTP Username', val: smtpUser, set: setSmtpUser, placeholder: 'your@gmail.com' },
              { label: 'From Name', val: fromName, set: setFromName, placeholder: 'SafeGuard System' },
            ].map(({ label, val, set, placeholder }) => (
              <div key={label}>
                <label className="text-xs text-slate-500 mb-1.5 block">{label}</label>
                <input
                  type="text"
                  value={val}
                  onChange={(e) => set(e.target.value)}
                  placeholder={placeholder}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2.5 text-sm text-white placeholder-slate-600 outline-none focus:border-blue-500/40 transition-colors"
                />
              </div>
            ))}

            {/* Password */}
            <div>
              <label className="text-xs text-slate-500 mb-1.5 block">Gmail App Password</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={smtpPass}
                  onChange={(e) => setSmtpPass(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2.5 pr-10 text-sm text-white outline-none focus:border-blue-500/40 transition-colors"
                />
                <button
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300"
                >
                  {showPassword ? <EyeOff size={14} /> : <Eye size={14} />}
                </button>
              </div>
              <p className="text-[10px] text-slate-600 mt-1">Use a Google App Password (not your Gmail password)</p>
            </div>

            <div className="flex items-center gap-2 p-3 rounded-xl bg-emerald-500/8 border border-emerald-500/15">
              <CheckCircle size={13} className="text-emerald-400" />
              <span className="text-xs text-emerald-400">TLS Encryption enabled · Port 587 · Laravel Mail configured</span>
            </div>
          </div>
        </div>

        {/* Laravel / System Config */}
        <div className="space-y-4">
          <div className="glass-card rounded-2xl p-5">
            <div className="flex items-center gap-3 mb-5 pb-4 border-b border-white/5">
              <div className="w-9 h-9 rounded-xl bg-red-500/15 flex items-center justify-center">
                <Server size={16} className="text-red-400" />
              </div>
              <div>
                <h3 className="font-bold text-white text-sm" style={{ fontFamily: 'Space Grotesk' }}>Laravel Backend</h3>
                <p className="text-xs text-slate-500">API and system configuration</p>
              </div>
            </div>
            <div className="space-y-3 text-xs">
              {[
                { label: 'Framework', val: 'Laravel 11.x (PHP 8.3)' },
                { label: 'Auth Driver', val: 'Laravel Sanctum' },
                { label: 'API Version', val: 'v1.0 · REST API' },
                { label: 'Cache', val: 'Redis' },
                { label: 'Queue', val: 'Database (Email Jobs)' },
                { label: 'Environment', val: 'Production' },
              ].map(({ label, val }) => (
                <div key={label} className="flex justify-between">
                  <span className="text-slate-500">{label}</span>
                  <span className="text-slate-200 font-medium">{val}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="glass-card rounded-2xl p-5">
            <div className="flex items-center gap-3 mb-5 pb-4 border-b border-white/5">
              <div className="w-9 h-9 rounded-xl bg-purple-500/15 flex items-center justify-center">
                <Bell size={16} className="text-purple-400" />
              </div>
              <div>
                <h3 className="font-bold text-white text-sm" style={{ fontFamily: 'Space Grotesk' }}>Alert Behavior</h3>
                <p className="text-xs text-slate-500">SOS trigger and notification settings</p>
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <label className="text-xs text-slate-500 mb-1.5 block">SOS Hold Duration (seconds)</label>
                <input
                  type="number"
                  value={sosTimeout}
                  onChange={(e) => setSosTimeout(e.target.value)}
                  min={1} max={10}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2.5 text-sm text-white outline-none focus:border-purple-500/40 transition-colors"
                />
              </div>
              <div>
                <label className="text-xs text-slate-500 mb-1.5 block">Log Retention (days)</label>
                <input
                  type="number"
                  value={logRetention}
                  onChange={(e) => setLogRetention(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2.5 text-sm text-white outline-none focus:border-purple-500/40 transition-colors"
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-white">Retry Failed Emails</p>
                  <p className="text-xs text-slate-500">Re-attempt email delivery on failure</p>
                </div>
                <Toggle val={retryEmails} onChange={setRetryEmails} />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-white">Auto-Resolve Alerts</p>
                  <p className="text-xs text-slate-500">Auto-close after 30 minutes of inactivity</p>
                </div>
                <Toggle val={autoResolve} onChange={setAutoResolve} />
              </div>
            </div>
          </div>
        </div>

        {/* Database Config */}
        <div className="glass-card rounded-2xl p-5">
          <div className="flex items-center gap-3 mb-5 pb-4 border-b border-white/5">
            <div className="w-9 h-9 rounded-xl bg-emerald-500/15 flex items-center justify-center">
              <Database size={16} className="text-emerald-400" />
            </div>
            <div>
              <h3 className="font-bold text-white text-sm" style={{ fontFamily: 'Space Grotesk' }}>MySQL Database</h3>
              <p className="text-xs text-slate-500">Database connection and schema info</p>
            </div>
          </div>
          <div className="space-y-3 text-xs">
            {[
              { label: 'Engine', val: 'MySQL 8.0' },
              { label: 'Host', val: 'localhost:3306' },
              { label: 'Database', val: 'safeguard_db' },
              { label: 'ORM', val: 'Eloquent (Laravel)' },
              { label: 'Tables', val: 'users, contacts, incidents, email_logs' },
              { label: 'Status', val: '● Connected', color: 'text-emerald-400' },
            ].map(({ label, val, color }) => (
              <div key={label} className="flex justify-between">
                <span className="text-slate-500">{label}</span>
                <span className={`font-medium ${color || 'text-slate-200'}`}>{val}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Google Maps API */}
        <div className="glass-card rounded-2xl p-5">
          <div className="flex items-center gap-3 mb-5 pb-4 border-b border-white/5">
            <div className="w-9 h-9 rounded-xl bg-amber-500/15 flex items-center justify-center">
              <Globe size={16} className="text-amber-400" />
            </div>
            <div>
              <h3 className="font-bold text-white text-sm" style={{ fontFamily: 'Space Grotesk' }}>Google Maps Platform</h3>
              <p className="text-xs text-slate-500">Geocoding API and Maps SDK configuration</p>
            </div>
          </div>
          <div className="space-y-3 text-xs">
            {[
              { label: 'Maps SDK', val: 'JavaScript v3 / iOS / Android' },
              { label: 'Geocoding API', val: 'Enabled' },
              { label: 'Places API', val: 'Enabled' },
              { label: 'Directions API', val: 'Enabled' },
              { label: 'Region', val: 'lk (Sri Lanka)' },
              { label: 'API Key Status', val: '● Active', color: 'text-emerald-400' },
            ].map(({ label, val, color }) => (
              <div key={label} className="flex justify-between">
                <span className="text-slate-500">{label}</span>
                <span className={`font-medium ${color || 'text-slate-200'}`}>{val}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPanel;
