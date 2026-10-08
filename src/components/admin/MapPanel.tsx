import React, { useState } from 'react';
import {
  MapPin, Navigation, AlertTriangle, CheckCircle,
  Maximize2, Layers, ZoomIn, ZoomOut, Clock,
  Signal, Battery
} from 'lucide-react';
import { mapMarkers, registeredUsers } from '../../data/mockData';

const MapPanel: React.FC = () => {
  const [hoveredMarker, setHoveredMarker] = useState<number | null>(null);
  const [selectedUser, setSelectedUser] = useState<string | null>(null);

  const markerConfig = {
    safe: { color: '#10b981', ring: 'rgba(16,185,129,0.3)', icon: CheckCircle, bg: 'bg-emerald-500' },
    sos: { color: '#ef4444', ring: 'rgba(239,68,68,0.5)', icon: AlertTriangle, bg: 'bg-red-500' },
    warning: { color: '#f59e0b', ring: 'rgba(245,158,11,0.3)', icon: Clock, bg: 'bg-amber-500' },
  };

  // selected user detail reserved for future sidebar expansion

  return (
    <div className="p-6 animate-fade-in h-full flex flex-col">
      <div className="flex items-center justify-between mb-5">
        <div>
          <h1 className="text-2xl font-black text-white" style={{ fontFamily: 'Space Grotesk' }}>Live Tracking Map</h1>
          <p className="text-slate-500 text-sm mt-0.5">Real-time GPS locations via Google Maps Platform · Sri Lanka</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-4 text-xs">
            {[
              { color: 'bg-emerald-400', label: 'Safe' },
              { color: 'bg-red-400', label: 'SOS' },
              { color: 'bg-amber-400', label: 'Warning' },
            ].map(({ color, label }) => (
              <div key={label} className="flex items-center gap-1.5">
                <div className={`w-2 h-2 rounded-full ${color}`} />
                <span className="text-slate-400">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex-1 grid lg:grid-cols-4 gap-4">
        {/* Map */}
        <div className="lg:col-span-3 glass-card rounded-2xl overflow-hidden relative" style={{ minHeight: '480px' }}>
          {/* Map background */}
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: 'url(/images/sri-lanka-map.jpg)', filter: 'brightness(0.65) saturate(0.9)' }}
          />

          {/* Dark overlay grid */}
          <div className="absolute inset-0 bg-[#0a0f1e]/50" />
          <div
            className="absolute inset-0 opacity-15"
            style={{
              backgroundImage: `
                linear-gradient(rgba(99,102,241,0.15) 1px, transparent 1px),
                linear-gradient(90deg, rgba(99,102,241,0.15) 1px, transparent 1px)
              `,
              backgroundSize: '40px 40px',
            }}
          />

          {/* Country outline overlay */}
          <div className="absolute inset-0 flex items-center justify-center">
            <svg viewBox="0 0 300 500" className="w-48 opacity-10 fill-none stroke-blue-400" strokeWidth="1.5">
              <path d="M150,30 C160,30 200,60 210,100 C220,140 215,180 200,220 C190,250 195,290 185,330 C175,365 160,390 150,400 C140,390 125,365 115,330 C105,290 110,250 100,220 C85,180 80,140 90,100 C100,60 140,30 150,30 Z" />
            </svg>
          </div>

          {/* Map markers */}
          {mapMarkers.map((marker) => {
            const config = markerConfig[marker.status as keyof typeof markerConfig];
            const isHovered = hoveredMarker === marker.id;
            const isSelected = selectedUser === `usr_00${marker.id}`;
            return (
              <div
                key={marker.id}
                className="absolute cursor-pointer group"
                style={{ left: marker.x, top: marker.y, transform: 'translate(-50%, -100%)' }}
                onMouseEnter={() => setHoveredMarker(marker.id)}
                onMouseLeave={() => setHoveredMarker(null)}
                onClick={() => setSelectedUser(selectedUser === `usr_00${marker.id}` ? null : `usr_00${marker.id}`)}
              >
                {/* Pulse ring */}
                {marker.status === 'sos' && (
                  <div
                    className="absolute inset-0 rounded-full animate-ping"
                    style={{ background: config.ring, width: '40px', height: '40px', top: '-12px', left: '-12px' }}
                  />
                )}

                {/* Marker pin */}
                <div className="relative">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center border-2 border-white/30 transition-transform ${isHovered || isSelected ? 'scale-125' : ''}`}
                    style={{ background: config.color, boxShadow: `0 0 12px ${config.ring}` }}
                  >
                    <MapPin size={14} className="text-white" />
                  </div>
                  <div
                    className="absolute left-1/2 -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-6 border-l-transparent border-r-transparent"
                    style={{ borderTopColor: config.color, top: '30px', borderTopWidth: '6px' }}
                  />
                </div>

                {/* Tooltip */}
                {(isHovered || isSelected) && (
                  <div className="absolute bottom-12 left-1/2 -translate-x-1/2 glass-card rounded-xl px-3 py-2 text-xs whitespace-nowrap z-10 animate-fade-in">
                    <p className="font-semibold text-white">{marker.user}</p>
                    <p className="text-slate-400">{marker.label}</p>
                    <div className="flex items-center gap-1 mt-0.5">
                      <div className="w-1.5 h-1.5 rounded-full" style={{ background: config.color }} />
                      <span style={{ color: config.color }}>{marker.status.toUpperCase()}</span>
                    </div>
                  </div>
                )}
              </div>
            );
          })}

          {/* Map controls */}
          <div className="absolute right-4 top-4 flex flex-col gap-2">
            {[
              { icon: ZoomIn, label: 'Zoom in' },
              { icon: ZoomOut, label: 'Zoom out' },
              { icon: Layers, label: 'Layers' },
              { icon: Maximize2, label: 'Fullscreen' },
            ].map(({ icon: Icon, label }) => (
              <button
                key={label}
                className="w-9 h-9 glass rounded-xl flex items-center justify-center border border-white/10 hover:bg-white/10 transition-colors"
                title={label}
              >
                <Icon size={15} className="text-slate-400" />
              </button>
            ))}
          </div>

          {/* Bottom info bar */}
          <div className="absolute bottom-0 left-0 right-0 h-10 glass border-t border-white/5 flex items-center justify-between px-4 text-xs">
            <div className="flex items-center gap-4 text-slate-500">
              <span>Powered by Google Maps Platform</span>
              <span className="text-slate-700">|</span>
              <span>Lat: 7.8731° N, Lng: 80.6550° E</span>
            </div>
            <div className="flex items-center gap-2">
              <Navigation size={11} className="text-blue-400" />
              <span className="text-blue-400">{mapMarkers.length} active users</span>
            </div>
          </div>
        </div>

        {/* User list */}
        <div className="flex flex-col gap-3 overflow-y-auto max-h-[540px] scrollbar-hide">
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Active Users</p>
          {registeredUsers.map((user) => {
            const config = markerConfig[user.status as keyof typeof markerConfig];
            const StatusIcon = config.icon;
            const isSelected = selectedUser === user.id;
            return (
              <div
                key={user.id}
                onClick={() => setSelectedUser(isSelected ? null : user.id)}
                className={`glass-card rounded-2xl p-3 cursor-pointer transition-all border ${
                  isSelected ? 'border-indigo-500/30 bg-indigo-500/5' : 'border-white/5 hover:border-white/10'
                }`}
              >
                <div className="flex items-center gap-2.5 mb-2">
                  <div className="relative">
                    <div className="w-9 h-9 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold text-xs">
                      {user.name.charAt(0)}
                    </div>
                    <div
                      className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-[#0d1527] ${config.bg}`}
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold text-white truncate">{user.name.split(' ')[0]}</p>
                    <p className="text-[10px] text-slate-500">{user.lastSeen}</p>
                  </div>
                  <StatusIcon size={12} style={{ color: config.color }} />
                </div>
                <div className="flex items-center justify-between text-[10px] text-slate-600">
                  <span className="flex items-center gap-0.5"><Battery size={9} />{user.batteryLevel}%</span>
                  <span className="flex items-center gap-0.5"><Signal size={9} />{user.signalStrength}/5</span>
                  <span className="truncate max-w-16">{user.location.address.split(',')[0]}</span>
                </div>
                {user.status === 'sos' && (
                  <div className="mt-2 pt-2 border-t border-red-500/20">
                    <button className="w-full text-[10px] py-1 rounded-lg bg-red-500/15 text-red-400 font-semibold">
                      🚨 RESPOND NOW
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default MapPanel;
