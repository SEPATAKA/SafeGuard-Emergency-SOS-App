import React, { useState } from 'react';
import {
  Users, AlertTriangle, CheckCircle, Mail,
  Clock, Activity, TrendingUp, TrendingDown,
  ArrowUpRight
} from 'lucide-react';
import {
  AreaChart, Area, XAxis, YAxis,
  CartesianGrid, Tooltip, ResponsiveContainer, PieChart,
  Pie, Cell
} from 'recharts';
import { weeklyChartData, monthlyChartData, incidentLogs } from '../../data/mockData';

const statCards = [
  {
    label: 'Total Users', value: '1,248', icon: Users,
    change: '+12%', up: true,
    color: 'from-blue-500/20 to-indigo-500/10', border: 'border-blue-500/20', icon_color: 'text-blue-400',
    glow: 'rgba(99,102,241,0.15)',
  },
  {
    label: 'Active Alerts', value: '3', icon: AlertTriangle,
    change: '-2 today', up: false,
    color: 'from-red-500/20 to-rose-500/10', border: 'border-red-500/20', icon_color: 'text-red-400',
    glow: 'rgba(239,68,68,0.15)',
  },
  {
    label: 'Resolved Today', value: '12', icon: CheckCircle,
    change: '+4 vs yesterday', up: true,
    color: 'from-emerald-500/20 to-teal-500/10', border: 'border-emerald-500/20', icon_color: 'text-emerald-400',
    glow: 'rgba(16,185,129,0.15)',
  },
  {
    label: 'Emails Sent Today', value: '47', icon: Mail,
    change: '+8%', up: true,
    color: 'from-purple-500/20 to-violet-500/10', border: 'border-purple-500/20', icon_color: 'text-purple-400',
    glow: 'rgba(139,92,246,0.15)',
  },
  {
    label: 'Avg. Response Time', value: '4m 32s', icon: Clock,
    change: '-18s improved', up: true,
    color: 'from-amber-500/20 to-orange-500/10', border: 'border-amber-500/20', icon_color: 'text-amber-400',
    glow: 'rgba(245,158,11,0.15)',
  },
  {
    label: 'System Uptime', value: '99.97%', icon: Activity,
    change: 'Last 30 days', up: true,
    color: 'from-cyan-500/20 to-sky-500/10', border: 'border-cyan-500/20', icon_color: 'text-cyan-400',
    glow: 'rgba(6,182,212,0.15)',
  },
];

const pieData = [
  { name: 'Resolved', value: 77, color: '#10b981' },
  { name: 'False Alarm', value: 12, color: '#f59e0b' },
  { name: 'Active', value: 3, color: '#ef4444' },
  { name: 'Pending', value: 8, color: '#6366f1' },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="glass-card rounded-xl px-4 py-3 text-xs">
        <p className="text-slate-300 font-semibold mb-2">{label}</p>
        {payload.map((entry: any) => (
          <p key={entry.name} style={{ color: entry.color }} className="mb-0.5">
            {entry.name}: <span className="font-bold">{entry.value}</span>
          </p>
        ))}
      </div>
    );
  }
  return null;
};

const OverviewPanel: React.FC = () => {
  const [chartPeriod, setChartPeriod] = useState<'weekly' | 'monthly'>('weekly');
  const chartData = chartPeriod === 'weekly' ? weeklyChartData : monthlyChartData;

  return (
    <div className="p-6 space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-white" style={{ fontFamily: 'Space Grotesk' }}>
            System Overview
          </h1>
          <p className="text-slate-500 text-sm mt-0.5">
            Real-time metrics · PHP Mail active · Laravel API running
          </p>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs text-emerald-400 font-medium">All Systems Operational</span>
          </div>
        </div>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 xl:grid-cols-3 gap-4">
        {statCards.map((card) => {
          const Icon = card.icon;
          return (
            <div
              key={card.label}
              className={`glass-card rounded-2xl p-5 border ${card.border} card-hover bg-gradient-to-br ${card.color}`}
              style={{ boxShadow: `0 4px 24px ${card.glow}` }}
            >
              <div className="flex items-start justify-between mb-4">
                <div className={`w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center`}>
                  <Icon size={20} className={card.icon_color} />
                </div>
                <div className={`flex items-center gap-1 text-xs ${card.up ? 'text-emerald-400' : 'text-red-400'}`}>
                  {card.up ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
                  {card.change}
                </div>
              </div>
              <div className="text-3xl font-black text-white mb-1" style={{ fontFamily: 'Space Grotesk' }}>
                {card.value}
              </div>
              <div className="text-xs text-slate-500">{card.label}</div>
            </div>
          );
        })}
      </div>

      {/* Charts row */}
      <div className="grid lg:grid-cols-3 gap-4">
        {/* Main chart */}
        <div className="lg:col-span-2 glass-card rounded-2xl p-5">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h3 className="font-bold text-white" style={{ fontFamily: 'Space Grotesk' }}>Incident & Email Analytics</h3>
              <p className="text-xs text-slate-500 mt-0.5">Incidents, resolutions, and PHP Mail dispatches</p>
            </div>
            <div className="flex rounded-lg overflow-hidden border border-white/10">
              <button
                onClick={() => setChartPeriod('weekly')}
                className={`px-3 py-1.5 text-xs font-medium transition-colors ${chartPeriod === 'weekly' ? 'bg-red-500/20 text-red-300' : 'text-slate-500 hover:text-slate-300'}`}
              >
                Weekly
              </button>
              <button
                onClick={() => setChartPeriod('monthly')}
                className={`px-3 py-1.5 text-xs font-medium transition-colors ${chartPeriod === 'monthly' ? 'bg-red-500/20 text-red-300' : 'text-slate-500 hover:text-slate-300'}`}
              >
                Monthly
              </button>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={chartData} margin={{ top: 5, right: 10, bottom: 5, left: -20 }}>
              <defs>
                <linearGradient id="incGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="resGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="emailGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#6366f1" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
              <XAxis dataKey="name" tick={{ fill: '#64748b', fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: '#64748b', fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Area type="monotone" dataKey="emails" name="Emails Sent" stroke="#6366f1" fill="url(#emailGrad)" strokeWidth={2} />
              <Area type="monotone" dataKey="incidents" name="Incidents" stroke="#ef4444" fill="url(#incGrad)" strokeWidth={2} />
              <Area type="monotone" dataKey="resolved" name="Resolved" stroke="#10b981" fill="url(#resGrad)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
          <div className="flex items-center gap-5 mt-2 justify-center">
            {[
              { color: '#ef4444', label: 'Incidents' },
              { color: '#10b981', label: 'Resolved' },
              { color: '#6366f1', label: 'Emails Sent' },
            ].map((l) => (
              <div key={l.label} className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full" style={{ background: l.color }} />
                <span className="text-xs text-slate-500">{l.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Pie chart */}
        <div className="glass-card rounded-2xl p-5">
          <h3 className="font-bold text-white mb-1" style={{ fontFamily: 'Space Grotesk' }}>Alert Breakdown</h3>
          <p className="text-xs text-slate-500 mb-4">By resolution status</p>
          <ResponsiveContainer width="100%" height={160}>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                innerRadius={45}
                outerRadius={70}
                dataKey="value"
                paddingAngle={3}
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip contentStyle={{ background: '#0d1527', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', fontSize: '12px' }} />
            </PieChart>
          </ResponsiveContainer>
          <div className="space-y-2 mt-2">
            {pieData.map((d) => (
              <div key={d.name} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full" style={{ background: d.color }} />
                  <span className="text-xs text-slate-400">{d.name}</span>
                </div>
                <span className="text-xs font-semibold text-white">{d.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent incidents */}
      <div className="glass-card rounded-2xl p-5">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold text-white" style={{ fontFamily: 'Space Grotesk' }}>Recent Incident Logs</h3>
          <button className="text-xs text-red-400 hover:text-red-300 flex items-center gap-1">
            View all <ArrowUpRight size={12} />
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-white/5">
                {['ID', 'User', 'Type', 'Location', 'Time', 'Emails', 'Status'].map((h) => (
                  <th key={h} className="pb-3 text-left text-slate-600 font-medium pr-4">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {incidentLogs.slice(0, 5).map((log) => (
                <tr key={log.id} className="border-b border-white/3 hover:bg-white/2 transition-colors">
                  <td className="py-3 pr-4 font-mono text-slate-500">{log.id}</td>
                  <td className="py-3 pr-4 text-white font-medium">{log.userName.split(' ')[0]}</td>
                  <td className="py-3 pr-4">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                      log.type === 'sos' ? 'bg-red-500/15 text-red-400' :
                      log.type === 'location_share' ? 'bg-blue-500/15 text-blue-400' :
                      'bg-amber-500/15 text-amber-400'
                    }`}>
                      {log.type.replace('_', ' ').toUpperCase()}
                    </span>
                  </td>
                  <td className="py-3 pr-4 text-slate-400 max-w-32 truncate">{log.location.address.split(',')[0]}</td>
                  <td className="py-3 pr-4 text-slate-500">
                    {new Date(log.timestamp).toLocaleDateString('en-GB', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                  </td>
                  <td className="py-3 pr-4 text-slate-400">{log.contactsNotified}</td>
                  <td className="py-3 pr-4">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                      log.status === 'resolved' ? 'bg-emerald-500/15 text-emerald-400' :
                      log.status === 'active' ? 'bg-red-500/15 text-red-400' :
                      'bg-amber-500/15 text-amber-400'
                    }`}>
                      {log.status.toUpperCase()}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default OverviewPanel;
