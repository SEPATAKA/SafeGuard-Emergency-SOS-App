import React, { useState } from 'react';
import {
  AlertTriangle, MapPin, Mail, Clock, CheckCircle,
  Search, Filter, Download, Eye, Navigation, Bell
} from 'lucide-react';
import { incidentLogs } from '../../data/mockData';
import { IncidentLog } from '../../types';

const IncidentsPanel: React.FC = () => {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<'all' | 'sos' | 'location_share' | 'false_alarm'>('all');
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'resolved' | 'false_alarm'>('all');
  const [selected, setSelected] = useState<IncidentLog | null>(null);

  const filtered = incidentLogs.filter((log) => {
    const matchSearch = log.userName.toLowerCase().includes(search.toLowerCase()) ||
      log.location.address.toLowerCase().includes(search.toLowerCase());
    const matchType = filter === 'all' || log.type === filter;
    const matchStatus = statusFilter === 'all' || log.status === statusFilter;
    return matchSearch && matchType && matchStatus;
  });

  const typeIcon = (type: string) => {
    if (type === 'sos') return <AlertTriangle size={14} className="text-red-400" />;
    if (type === 'location_share') return <Navigation size={14} className="text-blue-400" />;
    return <Bell size={14} className="text-amber-400" />;
  };

  const typeColor = (type: string) => {
    if (type === 'sos') return 'bg-red-500/15 text-red-400 border-red-500/20';
    if (type === 'location_share') return 'bg-blue-500/15 text-blue-400 border-blue-500/20';
    return 'bg-amber-500/15 text-amber-400 border-amber-500/20';
  };

  const statusColor = (status: string) => {
    if (status === 'resolved') return 'bg-emerald-500/15 text-emerald-400';
    if (status === 'active') return 'bg-red-500/15 text-red-400';
    return 'bg-amber-500/15 text-amber-400';
  };

  return (
    <div className="p-6 animate-fade-in">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-black text-white" style={{ fontFamily: 'Space Grotesk' }}>Incident Logs</h1>
          <p className="text-slate-500 text-sm mt-0.5">Full history of SOS events and location shares</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-slate-300 text-sm hover:bg-white/8 transition-colors">
          <Download size={15} />
          Export CSV
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3 mb-5">
        <div className="flex items-center gap-2 flex-1 min-w-48 glass-card rounded-xl px-3 py-2 border border-white/8">
          <Search size={14} className="text-slate-500" />
          <input
            type="text"
            placeholder="Search by user or location..."
            className="bg-transparent text-sm text-white placeholder-slate-600 outline-none flex-1"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="flex rounded-xl overflow-hidden border border-white/10 glass-card">
          {(['all', 'sos', 'location_share', 'false_alarm'] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3 py-2 text-xs font-medium transition-colors ${filter === f ? 'bg-red-500/20 text-red-300' : 'text-slate-500 hover:text-slate-300'}`}
            >
              {f === 'all' ? 'All' : f === 'location_share' ? 'Location' : f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>
        <div className="flex rounded-xl overflow-hidden border border-white/10 glass-card">
          {(['all', 'active', 'resolved', 'false_alarm'] as const).map((f) => (
            <button
              key={f}
              onClick={() => setStatusFilter(f)}
              className={`px-3 py-2 text-xs font-medium transition-colors ${statusFilter === f ? 'bg-indigo-500/20 text-indigo-300' : 'text-slate-500 hover:text-slate-300'}`}
            >
              {f.charAt(0).toUpperCase() + f.slice(1).replace('_', ' ')}
            </button>
          ))}
        </div>
      </div>

      <div className="grid lg:grid-cols-5 gap-4">
        {/* Table */}
        <div className="lg:col-span-3 glass-card rounded-2xl overflow-hidden">
          <div className="overflow-y-auto max-h-[600px] scrollbar-hide">
            {filtered.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-16 text-slate-600">
                <Filter size={32} className="mb-3" />
                <p className="text-sm">No incidents match your filters</p>
              </div>
            ) : (
              filtered.map((log) => (
                <div
                  key={log.id}
                  onClick={() => setSelected(selected?.id === log.id ? null : log)}
                  className={`flex items-center gap-4 p-4 cursor-pointer transition-all border-b border-white/4 hover:bg-white/3 ${
                    selected?.id === log.id ? 'bg-red-500/5 border-l-2 border-l-red-500' : ''
                  }`}
                >
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 ${
                    log.type === 'sos' ? 'bg-red-500/15' : log.type === 'location_share' ? 'bg-blue-500/15' : 'bg-amber-500/15'
                  }`}>
                    {typeIcon(log.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className="text-sm font-semibold text-white">{log.userName}</span>
                      <span className={`text-[10px] px-1.5 py-0.5 rounded-full border ${typeColor(log.type)}`}>
                        {log.type.replace('_', ' ').toUpperCase()}
                      </span>
                    </div>
                    <div className="flex items-center gap-3 text-xs text-slate-500">
                      <span className="flex items-center gap-1 truncate"><MapPin size={9} />{log.location.address.split(',')[0]}</span>
                      <span className="flex items-center gap-1"><Clock size={9} />{new Date(log.timestamp).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })}</span>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-semibold ${statusColor(log.status)}`}>
                      {log.status.toUpperCase()}
                    </span>
                    <span className="text-[10px] text-slate-600 flex items-center gap-0.5">
                      <Mail size={8} /> {log.contactsNotified}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Detail panel */}
        <div className="lg:col-span-2">
          {selected ? (
            <div className="glass-card rounded-2xl p-5 animate-fade-in">
              <div className="flex items-center gap-3 mb-5">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                  selected.type === 'sos' ? 'bg-red-500/20' : 'bg-blue-500/20'
                }`}>
                  {typeIcon(selected.type)}
                </div>
                <div>
                  <h3 className="font-bold text-white text-sm" style={{ fontFamily: 'Space Grotesk' }}>Incident Detail</h3>
                  <p className="text-xs text-slate-500 font-mono">{selected.id}</p>
                </div>
              </div>

              <div className="space-y-3 text-xs">
                {[
                  { label: 'User', value: selected.userName },
                  { label: 'Type', value: selected.type.replace('_', ' ').toUpperCase() },
                  { label: 'Status', value: selected.status.toUpperCase() },
                  { label: 'Timestamp', value: new Date(selected.timestamp).toLocaleString('en-GB') },
                  { label: 'Location', value: selected.location.address },
                  { label: 'Coordinates', value: `${selected.location.lat}°N, ${selected.location.lng}°E` },
                  { label: 'Emails Sent', value: `${selected.contactsNotified} contacts notified` },
                  ...(selected.respondedAt ? [{ label: 'Responded At', value: new Date(selected.respondedAt).toLocaleString('en-GB') }] : []),
                  ...(selected.notes ? [{ label: 'Notes', value: selected.notes }] : []),
                ].map(({ label, value }) => (
                  <div key={label} className="flex justify-between gap-4">
                    <span className="text-slate-500 flex-shrink-0">{label}</span>
                    <span className="text-slate-200 text-right">{value}</span>
                  </div>
                ))}
              </div>

              <div className="mt-5 pt-4 border-t border-white/5">
                <p className="text-xs text-slate-500 mb-2 font-medium">📧 PHP Mail → Gmail Alert</p>
                <div className="bg-black/30 rounded-xl p-3 font-mono text-[10px] text-slate-400 space-y-1">
                  <p className="text-slate-300">From: noreply@safeguard.lk</p>
                  <p>To: {selected.contactsNotified} emergency contact(s)</p>
                  <p>Subject: 🚨 SOS Alert — {selected.userName}</p>
                  <p className="text-blue-400">Maps: maps.google.com/?q={selected.location.lat},{selected.location.lng}</p>
                </div>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-2">
                <button className="py-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold flex items-center justify-center gap-1.5">
                  <CheckCircle size={12} /> Mark Resolved
                </button>
                <button className="py-2 rounded-xl bg-white/5 border border-white/10 text-slate-400 text-xs font-semibold flex items-center justify-center gap-1.5">
                  <Eye size={12} /> View Map
                </button>
              </div>
            </div>
          ) : (
            <div className="glass-card rounded-2xl p-5 flex flex-col items-center justify-center h-64 text-slate-600">
              <AlertTriangle size={32} className="mb-3 opacity-30" />
              <p className="text-sm">Select an incident to view details</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default IncidentsPanel;
