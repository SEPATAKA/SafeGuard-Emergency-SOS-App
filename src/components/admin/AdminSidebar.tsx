import React from 'react';
import {
  Shield, LayoutDashboard, AlertTriangle, Users,
  UserCheck, Bell, Settings, Map, LogOut,
  ChevronRight, Activity
} from 'lucide-react';
import { AdminView, ViewType } from '../../types';

interface AdminSidebarProps {
  activeView: AdminView;
  onViewChange: (view: AdminView) => void;
  onNavigate: (view: ViewType) => void;
  activeAlerts: number;
}

const navGroups = [
  {
    label: 'OVERVIEW',
    items: [
      { id: 'overview' as AdminView, icon: LayoutDashboard, label: 'Dashboard', badge: null },
      { id: 'map' as AdminView, icon: Map, label: 'Live Map', badge: null },
    ],
  },
  {
    label: 'INCIDENTS',
    items: [
      { id: 'incidents' as AdminView, icon: AlertTriangle, label: 'Incident Logs', badge: 'alerts' },
      { id: 'notifications' as AdminView, icon: Bell, label: 'Email Alerts', badge: null },
    ],
  },
  {
    label: 'MANAGEMENT',
    items: [
      { id: 'users' as AdminView, icon: Users, label: 'Users', badge: null },
      { id: 'contacts' as AdminView, icon: UserCheck, label: 'Contacts', badge: null },
    ],
  },
  {
    label: 'SYSTEM',
    items: [
      { id: 'settings' as AdminView, icon: Settings, label: 'Settings', badge: null },
    ],
  },
];

const AdminSidebar: React.FC<AdminSidebarProps> = ({ activeView, onViewChange, onNavigate, activeAlerts }) => {
  return (
    <aside className="glass-sidebar w-64 flex-shrink-0 flex flex-col h-full">
      {/* Logo */}
      <div className="p-6 border-b border-white/5">
        <div className="flex items-center gap-3 mb-1">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-red-500 to-rose-700 flex items-center justify-center glow-red flex-shrink-0">
            <Shield size={20} className="text-white" />
          </div>
          <div>
            <div className="font-black text-white text-lg leading-none" style={{ fontFamily: 'Space Grotesk' }}>
              Safe<span className="text-red-400">Guard</span>
            </div>
            <div className="text-[10px] text-slate-500 mt-0.5">Admin Control Panel</div>
          </div>
        </div>
      </div>

      {/* System status */}
      <div className="mx-4 mt-4 mb-2 px-3 py-2.5 rounded-xl bg-emerald-500/8 border border-emerald-500/15">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-xs text-emerald-400 font-medium">System Online</span>
        </div>
        <div className="flex items-center gap-1.5 mt-1">
          <Activity size={10} className="text-slate-500" />
          <span className="text-[10px] text-slate-500">Uptime: 99.97% · Laravel API Active</span>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto scrollbar-hide py-2 px-3">
        {navGroups.map((group) => (
          <div key={group.label} className="mb-4">
            <p className="text-[10px] text-slate-600 font-semibold tracking-widest mb-1 px-2">{group.label}</p>
            {group.items.map(({ id, icon: Icon, label, badge }) => {
              const isActive = activeView === id;
              return (
                <button
                  key={id}
                  onClick={() => onViewChange(id)}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all mb-0.5 group ${
                    isActive
                      ? 'bg-gradient-to-r from-red-500/15 to-transparent border border-red-500/20 text-red-300'
                      : 'text-slate-500 hover:text-slate-300 hover:bg-white/4'
                  }`}
                >
                  <Icon size={16} className={isActive ? 'text-red-400' : 'text-slate-500 group-hover:text-slate-400'} />
                  <span className="flex-1 text-left">{label}</span>
                  {badge === 'alerts' && activeAlerts > 0 && (
                    <span className="px-1.5 py-0.5 rounded-full bg-red-500 text-white text-[9px] font-bold">
                      {activeAlerts}
                    </span>
                  )}
                  {isActive && <ChevronRight size={14} className="text-red-400/60" />}
                </button>
              );
            })}
          </div>
        ))}
      </nav>

      {/* Bottom */}
      <div className="p-4 border-t border-white/5">
        <button
          onClick={() => onNavigate('landing')}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-slate-500 hover:text-slate-300 hover:bg-white/5 text-sm transition-all"
        >
          <LogOut size={16} />
          Back to Home
        </button>
      </div>
    </aside>
  );
};

export default AdminSidebar;
