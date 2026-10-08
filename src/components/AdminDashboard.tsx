import React, { useState, useEffect } from 'react';
import {
  Shield,
  Bell,
  Search,
  ChevronDown,
  AlertTriangle,
} from 'lucide-react';

import AdminSidebar from './admin/AdminSidebar';
import OverviewPanel from './admin/OverviewPanel';
import IncidentsPanel from './admin/IncidentsPanel';
import UsersPanel from './admin/UsersPanel';
import ContactsPanel from './admin/ContactsPanel';
import NotificationsPanel from './admin/NotificationsPanel';
import MapPanel from './admin/MapPanel';
import SettingsPanel from './admin/SettingsPanel';

import { AdminView, ViewType } from '../types';

interface AdminDashboardProps {
  onNavigate: (view: ViewType) => void;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({
  onNavigate,
}) => {
  const [activeView, setActiveView] =
    useState<AdminView>('overview');

  const [time, setTime] = useState(new Date());

  const [showNotifDropdown, setShowNotifDropdown] =
    useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const liveAlerts = [
    {
      id: 1,
      user: 'Amali Fernando',
      type: 'SOS',
      location: 'Kandy',
      time: '2m ago',
      color: 'red',
    },
    {
      id: 2,
      user: 'Saman Wickramasinghe',
      type: 'Warning',
      location: 'Galle',
      time: '15m ago',
      color: 'amber',
    },
    {
      id: 3,
      user: 'System',
      type: 'Email',
      location: '3 emails sent',
      time: '2m ago',
      color: 'blue',
    },
  ];

  const renderPanel = () => {
    switch (activeView) {
      case 'overview':
        return <OverviewPanel />;

      case 'incidents':
        return <IncidentsPanel />;

      case 'users':
        return <UsersPanel />;

      case 'contacts':
        return <ContactsPanel />;

      case 'notifications':
        return <NotificationsPanel />;

      case 'map':
        return <MapPanel />;

      case 'settings':
        return <SettingsPanel />;

      default:
        return <OverviewPanel />;
    }
  };

  const handleSignOut = () => {
    localStorage.removeItem('safeguard_token');
    localStorage.removeItem('safeguard_user');

    setShowNotifDropdown(false);

    onNavigate('auth');
  };

  return (
    <div className="h-screen bg-[#070b18] flex flex-col overflow-hidden">

      {/* TOP HEADER */}
      <header className="glass border-b border-white/5 h-14 flex items-center justify-between px-6 flex-shrink-0 z-40">

        {/* LEFT SIDE */}
        <div className="flex items-center gap-4">

          <div className="flex items-center gap-2">

            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-red-500 to-rose-700 flex items-center justify-center">
              <Shield
                size={14}
                className="text-white"
              />
            </div>

            <span
              className="font-black text-sm text-white hidden sm:block"
              style={{ fontFamily: 'Space Grotesk' }}
            >
              Safe
              <span className="text-red-400">
                Guard
              </span>

              <span className="text-slate-600 font-normal ml-1.5 text-xs">
                Admin
              </span>
            </span>

          </div>

          {/* BREADCRUMB */}
          <div className="hidden md:flex items-center gap-1.5 text-xs">
            <span className="text-slate-600">
              /
            </span>

            <span className="text-slate-400 capitalize">
              {activeView.replace('-', ' ')}
            </span>
          </div>

        </div>

        {/* RIGHT SIDE */}
        <div className="flex items-center gap-3">

          {/* TIME */}
          <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/3 border border-white/6 text-xs text-slate-500 font-mono">

            <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />

            {time.toLocaleTimeString('en-US', {
              hour: '2-digit',
              minute: '2-digit',
              second: '2-digit',
            })}

          </div>

          {/* SEARCH */}
          <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/3 border border-white/6">

            <Search
              size={13}
              className="text-slate-500"
            />

            <input
              type="text"
              placeholder="Quick search..."
              className="bg-transparent text-xs text-white placeholder-slate-600 outline-none w-32"
            />

          </div>

          {/* NOTIFICATIONS */}
          <div className="relative">

            <button
              type="button"
              onClick={() =>
                setShowNotifDropdown(
                  !showNotifDropdown
                )
              }
              className="relative w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/8 transition-colors"
            >
              <Bell
                size={14}
                className="text-slate-400"
              />

              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-red-500 text-white text-[9px] flex items-center justify-center font-bold">
                3
              </span>

            </button>

            {showNotifDropdown && (
              <div className="absolute right-0 top-10 w-72 glass-card rounded-2xl overflow-hidden z-50 animate-fade-in">

                <div className="p-3 border-b border-white/5">
                  <p className="text-xs font-semibold text-white">
                    Live Alerts
                  </p>
                </div>

                {liveAlerts.map((alert) => (
                  <div
                    key={alert.id}
                    className="flex items-center gap-3 p-3 hover:bg-white/3 border-b border-white/3 last:border-0 transition-colors cursor-pointer"
                  >

                    <div
                      className={`w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 ${
                        alert.color === 'red'
                          ? 'bg-red-500/20'
                          : alert.color === 'amber'
                          ? 'bg-amber-500/20'
                          : 'bg-blue-500/20'
                      }`}
                    >

                      <AlertTriangle
                        size={12}
                        className={
                          alert.color === 'red'
                            ? 'text-red-400'
                            : alert.color === 'amber'
                            ? 'text-amber-400'
                            : 'text-blue-400'
                        }
                      />

                    </div>

                    <div className="flex-1 min-w-0">

                      <p className="text-xs font-medium text-white">
                        {alert.user}
                      </p>

                      <p className="text-[10px] text-slate-500">
                        {alert.type} · {alert.location}
                      </p>

                    </div>

                    <span className="text-[10px] text-slate-600">
                      {alert.time}
                    </span>

                  </div>
                ))}

              </div>
            )}

          </div>

          {/* ADMIN PROFILE */}
          <div className="flex items-center gap-3 pl-2 border-l border-white/8">

            <div className="flex items-center gap-2">

              <div className="w-7 h-7 rounded-full overflow-hidden border border-red-500/30">

                <img
                  src="/images/avatar-female.jpg"
                  alt="Admin"
                  className="w-full h-full object-cover"
                />

              </div>

              <div className="hidden md:block">

                <p className="text-xs font-semibold text-white leading-none">
                  SafeGuard Admin
                </p>

                <p className="text-[10px] text-slate-500">
                  Super Admin
                </p>

              </div>

              <ChevronDown
                size={13}
                className="text-slate-500 hidden md:block"
              />

            </div>

            {/* SIGN OUT */}
            <button
              type="button"
              onClick={handleSignOut}
              className="px-3 py-1.5 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-semibold hover:bg-red-500/20 transition-all"
            >
              Sign Out
            </button>

          </div>

        </div>

      </header>

      {/* BODY */}
      <div className="flex flex-1 overflow-hidden">

        <AdminSidebar
          activeView={activeView}
          onViewChange={setActiveView}
          onNavigate={onNavigate}
          activeAlerts={3}
        />

        {/* MAIN CONTENT */}
        <main className="flex-1 overflow-y-auto scrollbar-hide bg-[#070b18]">

          {/* ACTIVE ALERT */}
          <div className="mx-6 mt-4 flex items-center gap-3 px-4 py-2.5 rounded-xl bg-red-950/40 border border-red-500/25 animate-fade-in">

            <div className="w-2 h-2 rounded-full bg-red-400 animate-pulse flex-shrink-0" />

            <p className="text-xs text-red-300 flex-1">

              <span className="font-semibold">
                🚨 Active Alert:
              </span>{' '}

              Amali Fernando has triggered SOS from Kandy — 3 Gmail alerts dispatched via PHP Mail

            </p>

            <button
              type="button"
              onClick={() =>
                setActiveView('incidents')
              }
              className="text-xs text-red-400 hover:text-red-300 border border-red-500/30 px-2 py-1 rounded-lg transition-colors flex-shrink-0"
            >
              View →
            </button>

          </div>

          {renderPanel()}

        </main>

      </div>

      {/* CLICK OUTSIDE */}
      {showNotifDropdown && (
        <div
          className="fixed inset-0 z-30"
          onClick={() =>
            setShowNotifDropdown(false)
          }
        />
      )}

    </div>
  );
};

export default AdminDashboard;