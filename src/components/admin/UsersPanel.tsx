import React, { useState } from 'react';
import {
  Search, Battery, Signal, MapPin,
  AlertTriangle, CheckCircle, Clock
} from 'lucide-react';
import { registeredUsers } from '../../data/mockData';

const UsersPanel: React.FC = () => {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<'all' | 'safe' | 'sos' | 'warning'>('all');

  const filtered = registeredUsers.filter((u) => {
    const matchSearch = u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === 'all' || u.status === filter;
    return matchSearch && matchFilter;
  });

  const statusConfig = {
    safe: { color: 'text-emerald-400', bg: 'bg-emerald-500/15', icon: CheckCircle, dot: 'bg-emerald-400' },
    sos: { color: 'text-red-400', bg: 'bg-red-500/15', icon: AlertTriangle, dot: 'bg-red-400 animate-pulse' },
    warning: { color: 'text-amber-400', bg: 'bg-amber-500/15', icon: Clock, dot: 'bg-amber-400' },
  };

  const counts = {
    all: registeredUsers.length,
    safe: registeredUsers.filter(u => u.status === 'safe').length,
    sos: registeredUsers.filter(u => u.status === 'sos').length,
    warning: registeredUsers.filter(u => u.status === 'warning').length,
  };

  return (
    <div className="p-6 animate-fade-in">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-black text-white" style={{ fontFamily: 'Space Grotesk' }}>Registered Users</h1>
          <p className="text-slate-500 text-sm mt-0.5">Monitor all registered SafeGuard users</p>
        </div>
        <div className="glass-card rounded-xl px-4 py-2 text-center">
          <div className="text-2xl font-black text-white" style={{ fontFamily: 'Space Grotesk' }}>1,248</div>
          <div className="text-xs text-slate-500">Total Registered</div>
        </div>
      </div>

      {/* Quick stats */}
      <div className="grid grid-cols-4 gap-3 mb-5">
        {(['all', 'safe', 'sos', 'warning'] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`rounded-xl p-3 border transition-all text-left ${
              filter === f
                ? f === 'all' ? 'bg-indigo-500/15 border-indigo-500/30'
                  : f === 'sos' ? 'bg-red-500/15 border-red-500/30'
                  : f === 'warning' ? 'bg-amber-500/15 border-amber-500/30'
                  : 'bg-emerald-500/15 border-emerald-500/30'
                : 'glass-card border-white/8 hover:border-white/15'
            }`}
          >
            <div className={`text-xl font-black mb-0.5 ${
              filter === f
                ? f === 'all' ? 'text-indigo-300' : f === 'sos' ? 'text-red-300' : f === 'warning' ? 'text-amber-300' : 'text-emerald-300'
                : 'text-white'
            }`} style={{ fontFamily: 'Space Grotesk' }}>
              {counts[f]}
            </div>
            <div className={`text-xs capitalize ${
              f === 'all' ? 'text-slate-400' : f === 'sos' ? 'text-red-500' : f === 'warning' ? 'text-amber-500' : 'text-emerald-500'
            }`}>
              {f === 'all' ? 'All Users' : f.toUpperCase()}
            </div>
          </button>
        ))}
      </div>

      {/* Search */}
      <div className="flex items-center gap-2 glass-card rounded-xl px-4 py-2.5 mb-5 border border-white/8">
        <Search size={15} className="text-slate-500" />
        <input
          type="text"
          placeholder="Search users by name or email..."
          className="bg-transparent text-sm text-white placeholder-slate-600 outline-none flex-1"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* User cards */}
      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
        {filtered.map((user) => {
          const sc = statusConfig[user.status];
          const StatusIcon = sc.icon;
          return (
            <div key={user.id} className="glass-card rounded-2xl p-4 card-hover border border-white/5">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="w-11 h-11 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold text-sm">
                      {user.name.charAt(0)}
                    </div>
                    <div className={`absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full border-2 border-[#0d1527] ${sc.dot}`} />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white">{user.name.split(' ')[0]} {user.name.split(' ')[1]?.charAt(0)}.</p>
                    <p className="text-xs text-slate-500 truncate max-w-32">{user.email}</p>
                  </div>
                </div>
                <div className={`flex items-center gap-1 px-2 py-1 rounded-lg text-[10px] font-semibold ${sc.bg} ${sc.color}`}>
                  <StatusIcon size={10} />
                  {user.status.toUpperCase()}
                </div>
              </div>

              <div className="space-y-2 text-xs">
                <div className="flex items-center gap-1.5 text-slate-500">
                  <MapPin size={10} />
                  <span className="truncate">{user.location.address.split(',')[0]}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3 text-slate-500">
                    <span className="flex items-center gap-1">
                      <Battery size={10} className={user.batteryLevel < 30 ? 'text-red-400' : 'text-slate-500'} />
                      <span className={user.batteryLevel < 30 ? 'text-red-400' : ''}>{user.batteryLevel}%</span>
                    </span>
                    <span className="flex items-center gap-1">
                      <Signal size={10} />
                      {user.signalStrength}/5
                    </span>
                  </div>
                  <span className="text-slate-600">{user.lastSeen}</span>
                </div>
              </div>

              <div className="mt-3 pt-3 border-t border-white/5 flex gap-2">
                <button className="flex-1 py-1.5 rounded-lg bg-white/5 border border-white/10 text-slate-400 text-xs hover:bg-white/8 transition-colors">
                  View History
                </button>
                {user.status === 'sos' && (
                  <button className="flex-1 py-1.5 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-xs hover:bg-red-500/15 transition-colors">
                    Respond Now
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default UsersPanel;
