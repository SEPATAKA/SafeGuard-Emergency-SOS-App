import React, { useState, useEffect } from 'react';
import {
  Shield,
  MapPin,
  Bell,
  Users,
  Settings,
  ChevronLeft,
  Plus,
  Trash2,
  Phone,
  Mail,
  Battery,
  Signal,
  AlertTriangle,
  CheckCircle,
  Home,
  History,
  ToggleLeft,
  ToggleRight,
  Navigation,
  Wifi,
  X,
  Check,
  User,
  Send,
  Edit3,
  Clock,
  Star,
} from 'lucide-react';

import { MobileView, ViewType } from '../types';
import {
  currentUser,
  emergencyContacts,
  incidentLogs,
} from '../data/mockData';

import {
  triggerSOS,
} from '../api/api';

interface MobileAppProps {
  onNavigate: (view: ViewType) => void;
}

const MobileApp: React.FC<MobileAppProps> = ({
  onNavigate,
}) => {
  const [currentView, setCurrentView] =
    useState<MobileView>('home');

  const [sosActive, setSosActive] =
    useState(false);

  const [_sosCountdown, setSosCountdown] =
    useState(3);

  const [sosHolding, setSosHolding] =
    useState(false);

  const [holdProgress, setHoldProgress] =
    useState(0);

  const [showEmailSent, setShowEmailSent] =
    useState(false);

  const [locationSharing, setLocationSharing] =
    useState(false);

  const [notifications, setNotifications] =
    useState(true);

  const [contacts, setContacts] =
    useState(emergencyContacts);

  const [showAddContact, setShowAddContact] =
    useState(false);

  const [newContact, setNewContact] = useState({
    name: '',
    email: '',
    phone: '',
    relation: '',
  });

  const [token, setToken] = useState<string | null>(
    localStorage.getItem('safeguard_token')
  );

  const [apiUser, setApiUser] = useState<any>(() => {
    const savedUser =
      localStorage.getItem('safeguard_user');

    try {
      return savedUser
        ? JSON.parse(savedUser)
        : null;
    } catch {
      return null;
    }
  });

  const [apiError, setApiError] =
    useState('');

  const [sosSending, setSosSending] =
    useState(false);

  /*
   * Keep authentication information
   * synchronized with localStorage.
   */
  useEffect(() => {
    const savedToken =
      localStorage.getItem('safeguard_token');

    const savedUser =
      localStorage.getItem('safeguard_user');

    setToken(savedToken);

    if (savedUser) {
      try {
        setApiUser(JSON.parse(savedUser));
      } catch {
        setApiUser(null);
      }
    }
  }, []);

  /*
   * SOS hold timer.
   */
  useEffect(() => {
    let progressTimer:
      ReturnType<typeof setInterval> | undefined;

    if (sosHolding) {
      let p = 0;

      progressTimer = setInterval(() => {
        p += 2;

        setHoldProgress(p);

        if (p >= 100) {
          if (progressTimer) {
            clearInterval(progressTimer);
          }

          setSosHolding(false);
          setHoldProgress(0);

          sendSOS();
        }
      }, 60);
    } else {
      setHoldProgress(0);
    }

    return () => {
      if (progressTimer) {
        clearInterval(progressTimer);
      }
    };
  }, [sosHolding]);

  /*
   * Send SOS to Laravel API.
   */
  const sendSOS = async () => {
    const currentToken =
      localStorage.getItem('safeguard_token');

    if (!currentToken) {
      setApiError('Please login first.');
      return;
    }

    setSosSending(true);
    setApiError('');

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          await triggerSOS(
            currentToken,
            position.coords.latitude,
            position.coords.longitude
          );

          setSosActive(true);
          setShowEmailSent(true);

          setTimeout(() => {
            setShowEmailSent(false);
          }, 4000);
        } catch (error) {
          setApiError(
            error instanceof Error
              ? error.message
              : 'Unable to send SOS'
          );
        } finally {
          setSosSending(false);
        }
      },
      () => {
        setApiError(
          'Unable to get your current location.'
        );

        setSosSending(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      }
    );
  };

  /*
   * Release SOS button.
   */
  const handleSOSRelease = () => {
    if (holdProgress < 100) {
      setSosHolding(false);
    }
  };

  /*
   * Deactivate SOS.
   */
  const deactivateSOS = () => {
    setSosActive(false);
    setSosCountdown(3);
  };

  /*
   * Sign out.
   */
  const handleSignOut = () => {
    localStorage.removeItem(
      'safeguard_token'
    );

    localStorage.removeItem(
      'safeguard_user'
    );

    setToken(null);
    setApiUser(null);
    setSosActive(false);
    setApiError('');

    onNavigate('auth');
  };

  /*
   * Mobile navigation.
   */
  const navItems: {
    id: MobileView;
    icon: React.ElementType;
    label: string;
  }[] = [
    {
      id: 'home',
      icon: Home,
      label: 'Home',
    },
    {
      id: 'contacts',
      icon: Users,
      label: 'Contacts',
    },
    {
      id: 'history',
      icon: History,
      label: 'History',
    },
    {
      id: 'settings',
      icon: Settings,
      label: 'Settings',
    },
  ];

  /*
   * HOME
   */
  const renderHome = () => (
    <div className="flex flex-col h-full">

      {/* Header */}
      <div className="px-4 pt-4 pb-3 flex items-center justify-between">

        <div>
          <p className="text-xs text-slate-500">
            Good morning,
          </p>

          <p className="text-white font-bold text-sm">
            {apiUser?.name || currentUser.name}
          </p>
        </div>

        <div className="flex items-center gap-2">

          <div className="relative">
            <Bell
              size={18}
              className="text-slate-400"
            />

            <div className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-red-500 border border-[#0a0f1e] text-[8px] flex items-center justify-center text-white font-bold">
              3
            </div>
          </div>

          <div className="w-8 h-8 rounded-full overflow-hidden border-2 border-red-500/40">
            <img
              src="/images/avatar-female.jpg"
              alt="User"
              className="w-full h-full object-cover"
            />
          </div>

        </div>
      </div>

      {/* Status Card */}
      <div className="px-4 mb-4">

        <div
          className={`rounded-2xl p-3 ${
            sosActive
              ? 'bg-gradient-to-r from-red-900/60 to-rose-900/40 border border-red-500/40'
              : 'bg-gradient-to-r from-emerald-900/30 to-teal-900/20 border border-emerald-500/20'
          }`}
        >

          <div className="flex items-center justify-between">

            <div className="flex items-center gap-2">

              <div
                className={`w-2.5 h-2.5 rounded-full ${
                  sosActive
                    ? 'bg-red-400 animate-pulse'
                    : 'bg-emerald-400'
                }`}
              />

              <span
                className={`text-xs font-semibold ${
                  sosActive
                    ? 'text-red-300'
                    : 'text-emerald-300'
                }`}
              >
                {sosActive
                  ? '🚨 SOS ACTIVE'
                  : '✓ SAFE'}
              </span>

            </div>

            <div className="flex items-center gap-3 text-xs text-slate-500">

              <span className="flex items-center gap-1">
                <Battery size={10} />
                {currentUser.batteryLevel}%
              </span>

              <span className="flex items-center gap-1">
                <Signal size={10} />
                4G
              </span>

            </div>

          </div>

          <div className="mt-2 flex items-center gap-1.5">

            <MapPin
              size={10}
              className="text-blue-400 flex-shrink-0"
            />

            <span className="text-xs text-slate-400 truncate">
              {currentUser.location.address}
            </span>

          </div>

        </div>
      </div>

      {/* SOS Button */}
      <div className="flex flex-col items-center justify-center py-4 flex-shrink-0">

        {!sosActive ? (
          <>
            <div className="relative mb-3">

              {/* Progress ring */}
              {sosHolding && (
                <svg
                  className="absolute inset-0 w-full h-full -rotate-90"
                  viewBox="0 0 136 136"
                >
                  <circle
                    cx="68"
                    cy="68"
                    r="62"
                    fill="none"
                    stroke="rgba(239,68,68,0.2)"
                    strokeWidth="4"
                  />

                  <circle
                    cx="68"
                    cy="68"
                    r="62"
                    fill="none"
                    stroke="#ef4444"
                    strokeWidth="4"
                    strokeDasharray={`${2 * Math.PI * 62}`}
                    strokeDashoffset={`${
                      2 *
                      Math.PI *
                      62 *
                      (1 - holdProgress / 100)
                    }`}
                    strokeLinecap="round"
                    className="transition-all duration-100"
                  />
                </svg>
              )}

              {!sosHolding && (
                <>
                  <div
                    className="absolute inset-[-16px] rounded-full border border-red-500/20 animate-ping"
                    style={{
                      animationDuration: '2s',
                    }}
                  />

                  <div className="absolute inset-[-8px] rounded-full border border-red-500/15" />
                </>
              )}

              <button
                type="button"
                disabled={sosSending}
                className="relative w-[136px] h-[136px] rounded-full bg-gradient-to-br from-red-500 to-rose-700 flex flex-col items-center justify-center text-white font-black text-2xl select-none disabled:opacity-70"
                style={{
                  fontFamily: 'Space Grotesk',
                  boxShadow: sosHolding
                    ? '0 0 60px rgba(239,68,68,0.8), 0 0 120px rgba(239,68,68,0.4)'
                    : '0 0 40px rgba(239,68,68,0.5), 0 0 80px rgba(239,68,68,0.2)',
                }}
                onMouseDown={() =>
                  setSosHolding(true)
                }
                onMouseUp={handleSOSRelease}
                onMouseLeave={handleSOSRelease}
                onTouchStart={() =>
                  setSosHolding(true)
                }
                onTouchEnd={handleSOSRelease}
              >
                {sosSending ? '...' : 'SOS'}

                <span className="text-[10px] font-normal text-red-200 mt-0.5">
                  HOLD 3s
                </span>
              </button>

            </div>

            <p className="text-xs text-slate-600 text-center px-6">
              {sosHolding
                ? `Sending alert... ${Math.round(
                    holdProgress
                  )}%`
                : 'Hold button for 3 seconds to trigger emergency alert'}
            </p>

          </>
        ) : (

          <div className="w-full px-4">

            <div className="bg-red-900/40 border border-red-500/40 rounded-2xl p-4 text-center">

              <div className="w-16 h-16 rounded-full bg-red-500/20 border-2 border-red-500 flex items-center justify-center mx-auto mb-3 animate-pulse">

                <AlertTriangle
                  size={28}
                  className="text-red-400"
                />

              </div>

              <h3
                className="text-red-300 font-bold text-base mb-1"
                style={{
                  fontFamily: 'Space Grotesk',
                }}
              >
                SOS ALERT ACTIVE
              </h3>

              <p className="text-xs text-slate-400 mb-3">
                3 contacts notified via Gmail
              </p>

              <div className="space-y-1.5 mb-4">

                {contacts
                  .slice(0, 3)
                  .map((contact) => (
                    <div
                      key={contact.id}
                      className="flex items-center justify-between text-xs bg-black/30 rounded-lg px-3 py-2"
                    >
                      <span className="text-slate-300">
                        {contact.name}
                      </span>

                      <span className="text-emerald-400 flex items-center gap-1">
                        <Check size={10} />
                        Email Sent
                      </span>
                    </div>
                  ))}

              </div>

              <button
                type="button"
                onClick={deactivateSOS}
                className="w-full py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-slate-300 text-sm font-semibold hover:bg-slate-700 transition-colors"
              >
                Cancel Alert — I'm Safe
              </button>

            </div>

          </div>
        )}

      </div>

      {/* API Error */}
      {apiError && (
        <div className="mx-4 mb-3 bg-red-900/30 border border-red-500/30 rounded-xl p-3">
          <p className="text-xs text-red-300">
            {apiError}
          </p>
        </div>
      )}

      {/* Email Sent */}
      {showEmailSent && (
        <div className="mx-4 mb-3 flex items-center gap-3 bg-emerald-900/40 border border-emerald-500/30 rounded-xl p-3 animate-fade-in">

          <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center flex-shrink-0">
            <Mail
              size={14}
              className="text-emerald-400"
            />
          </div>

          <div>
            <p className="text-xs font-semibold text-emerald-300">
              Emails Dispatched!
            </p>

            <p className="text-xs text-slate-400">
              3 contacts notified via Gmail
            </p>
          </div>

          <CheckCircle
            size={16}
            className="ml-auto text-emerald-400"
          />

        </div>
      )}

      {/* Quick Actions */}
      <div className="px-4 grid grid-cols-2 gap-3 mt-auto mb-2">

        <button
          type="button"
          onClick={() =>
            setLocationSharing(!locationSharing)
          }
          className={`flex items-center gap-2 p-3 rounded-xl border transition-all text-xs font-medium ${
            locationSharing
              ? 'bg-blue-900/30 border-blue-500/30 text-blue-300'
              : 'bg-white/5 border-white/10 text-slate-400'
          }`}
        >
          <Navigation
            size={14}
            className={
              locationSharing
                ? 'text-blue-400'
                : ''
            }
          />

          {locationSharing
            ? 'Sharing Location'
            : 'Share Location'}
        </button>

        <button
          type="button"
          onClick={() =>
            setCurrentView('contacts')
          }
          className="flex items-center gap-2 p-3 rounded-xl border border-white/10 bg-white/5 text-slate-400 text-xs font-medium"
        >
          <Users size={14} />

          {contacts.length} Emergency Contacts
        </button>

      </div>

    </div>
  );

  /*
   * CONTACTS
   */
  const renderContacts = () => (
    <div className="flex flex-col h-full">

      <div className="px-4 pt-4 pb-3 flex items-center justify-between flex-shrink-0">

        <h2
          className="font-bold text-white text-sm"
          style={{
            fontFamily: 'Space Grotesk',
          }}
        >
          Emergency Contacts
        </h2>

        <button
          type="button"
          onClick={() =>
            setShowAddContact(true)
          }
          className="w-7 h-7 rounded-lg bg-red-500/20 border border-red-500/30 flex items-center justify-center"
        >
          <Plus
            size={14}
            className="text-red-400"
          />
        </button>

      </div>

      {showAddContact && (
        <div className="mx-4 mb-3 glass-card rounded-2xl p-4 border border-white/10 flex-shrink-0">

          <div className="flex items-center justify-between mb-3">

            <span className="text-xs font-semibold text-white">
              Add New Contact
            </span>

            <button
              type="button"
              onClick={() =>
                setShowAddContact(false)
              }
            >
              <X
                size={14}
                className="text-slate-400"
              />
            </button>

          </div>

          <div className="space-y-2">

            {[
              {
                key: 'name',
                placeholder: 'Full Name',
                icon: User,
              },
              {
                key: 'email',
                placeholder: 'Gmail Address',
                icon: Mail,
              },
              {
                key: 'phone',
                placeholder: 'Phone Number',
                icon: Phone,
              },
              {
                key: 'relation',
                placeholder: 'Relation (e.g. Sister)',
                icon: Star,
              },
            ].map(
              ({
                key,
                placeholder,
                icon: Icon,
              }) => (
                <div
                  key={key}
                  className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-lg px-3 py-2"
                >

                  <Icon
                    size={12}
                    className="text-slate-500"
                  />

                  <input
                    type="text"
                    placeholder={placeholder}
                    className="bg-transparent text-xs text-white placeholder-slate-600 outline-none flex-1"
                    value={
                      (
                        newContact as Record<
                          string,
                          string
                        >
                      )[key]
                    }
                    onChange={(e) =>
                      setNewContact({
                        ...newContact,
                        [key]: e.target.value,
                      })
                    }
                  />

                </div>
              )
            )}

            <button
              type="button"
              onClick={() => {
                if (
                  newContact.name &&
                  newContact.email
                ) {
                  setContacts([
                    ...contacts,
                    {
                      id: `ec_${Date.now()}`,
                      ...newContact,
                      notifyEmail: true,
                      priority:
                        contacts.length + 1,
                    },
                  ]);

                  setNewContact({
                    name: '',
                    email: '',
                    phone: '',
                    relation: '',
                  });

                  setShowAddContact(false);
                }
              }}
              className="w-full py-2 rounded-lg bg-red-500/20 border border-red-500/30 text-red-300 text-xs font-semibold flex items-center justify-center gap-1.5"
            >
              <Send size={12} />
              Add Contact
            </button>

          </div>

        </div>
      )}

      <div className="flex-1 overflow-y-auto scrollbar-hide px-4 space-y-3 pb-4">

        {contacts.map((contact, i) => (
          <div
            key={contact.id}
            className="glass-card rounded-2xl p-3"
          >

            <div className="flex items-center gap-3">

              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                {contact.name.charAt(0)}
              </div>

              <div className="flex-1 min-w-0">

                <div className="flex items-center gap-2 mb-0.5">

                  <span className="text-white text-xs font-semibold truncate">
                    {contact.name}
                  </span>

                  <span className="px-1.5 py-0.5 rounded-full bg-slate-700/50 text-[9px] text-slate-400 flex-shrink-0">
                    P{contact.priority}
                  </span>

                </div>

                <p className="text-xs text-slate-500 truncate">
                  {contact.email}
                </p>

                <p className="text-[10px] text-indigo-400">
                  {contact.relation}
                </p>

              </div>

              <div className="flex items-center gap-2">

                <button
                  type="button"
                  onClick={() => {
                    const updated =
                      [...contacts];

                    updated[i] = {
                      ...contact,
                      notifyEmail:
                        !contact.notifyEmail,
                    };

                    setContacts(updated);
                  }}
                >
                  {contact.notifyEmail ? (
                    <ToggleRight
                      size={20}
                      className="text-emerald-400"
                    />
                  ) : (
                    <ToggleLeft
                      size={20}
                      className="text-slate-600"
                    />
                  )}
                </button>

                <button
                  type="button"
                  onClick={() =>
                    setContacts(
                      contacts.filter(
                        (_, idx) => idx !== i
                      )
                    )
                  }
                  className="w-6 h-6 rounded-lg bg-red-500/10 flex items-center justify-center"
                >
                  <Trash2
                    size={11}
                    className="text-red-400"
                  />
                </button>

              </div>

            </div>

          </div>
        ))}

      </div>

    </div>
  );

  /*
   * HISTORY
   */
  const renderHistory = () => (
    <div className="flex flex-col h-full">

      <div className="px-4 pt-4 pb-3 flex-shrink-0">

        <h2
          className="font-bold text-white text-sm"
          style={{
            fontFamily: 'Space Grotesk',
          }}
        >
          Incident History
        </h2>

        <p className="text-xs text-slate-500 mt-0.5">
          Your recent SOS and location events
        </p>

      </div>

      <div className="flex-1 overflow-y-auto scrollbar-hide px-4 space-y-3 pb-4">

        {incidentLogs
          .slice(0, 4)
          .map((log) => (
            <div
              key={log.id}
              className="glass-card rounded-2xl p-3"
            >

              <div className="flex items-start justify-between mb-2">

                <div className="flex items-center gap-2">

                  <div
                    className={`w-8 h-8 rounded-xl flex items-center justify-center ${
                      log.type === 'sos'
                        ? 'bg-red-500/20'
                        : log.type ===
                          'location_share'
                        ? 'bg-blue-500/20'
                        : 'bg-amber-500/20'
                    }`}
                  >

                    {log.type === 'sos' && (
                      <AlertTriangle
                        size={14}
                        className="text-red-400"
                      />
                    )}

                    {log.type ===
                      'location_share' && (
                      <Navigation
                        size={14}
                        className="text-blue-400"
                      />
                    )}

                    {log.type ===
                      'false_alarm' && (
                      <Bell
                        size={14}
                        className="text-amber-400"
                      />
                    )}

                  </div>

                  <div>

                    <p className="text-xs font-semibold text-white capitalize">
                      {log.type.replace(
                        '_',
                        ' '
                      )}
                    </p>

                    <p className="text-[10px] text-slate-500">
                      {new Date(
                        log.timestamp
                      ).toLocaleDateString(
                        'en-GB',
                        {
                          day: 'numeric',
                          month: 'short',
                          hour: '2-digit',
                          minute: '2-digit',
                        }
                      )}
                    </p>

                  </div>

                </div>

                <span
                  className={`text-[10px] px-2 py-0.5 rounded-full ${
                    log.status ===
                    'resolved'
                      ? 'bg-emerald-500/15 text-emerald-400'
                      : log.status === 'active'
                      ? 'bg-red-500/15 text-red-400'
                      : 'bg-amber-500/15 text-amber-400'
                  }`}
                >
                  {log.status}
                </span>

              </div>

              <div className="flex items-center gap-1.5 mb-1.5">

                <MapPin
                  size={9}
                  className="text-slate-500"
                />

                <span className="text-[10px] text-slate-500 truncate">
                  {log.location.address}
                </span>

              </div>

              <div className="flex items-center gap-3">

                <span className="text-[10px] text-slate-600 flex items-center gap-1">

                  <Mail size={9} />

                  {log.contactsNotified} emails sent

                </span>

                {log.respondedAt && (
                  <span className="text-[10px] text-slate-600 flex items-center gap-1">
                    <Clock size={9} />
                    Responded
                  </span>
                )}

              </div>

            </div>
          ))}

      </div>

    </div>
  );

  /*
   * SETTINGS
   */
  const renderSettings = () => (
    <div className="flex flex-col h-full">

      {/* Settings Header */}
      <div className="px-4 pt-4 pb-3 flex-shrink-0">

        <h2
          className="font-bold text-white text-sm"
          style={{
            fontFamily: 'Space Grotesk',
          }}
        >
          Settings
        </h2>

      </div>

      {/* Scrollable Settings */}
      <div className="flex-1 overflow-y-auto scrollbar-hide px-4 space-y-3 pb-4">

        {/* Profile */}
        <div className="glass-card rounded-2xl p-4">

          <div className="flex items-center gap-3">

            <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-red-500/30">

              <img
                src="/images/avatar-female.jpg"
                alt="User"
                className="w-full h-full object-cover"
              />

            </div>

            <div className="flex-1">

              <p className="text-white font-semibold text-sm">
                {apiUser?.name ||
                  currentUser.name}
              </p>

              <p className="text-xs text-slate-400">
                {apiUser?.email ||
                  'No email available'}
              </p>

              <p className="text-xs text-slate-500">
                SafeGuard User
              </p>

            </div>

            <Edit3
              size={14}
              className="text-slate-500"
            />

          </div>

        </div>

        {/* Toggles */}
        <div className="glass-card rounded-2xl overflow-hidden">

          {[
            {
              icon: Bell,
              label: 'Notifications',
              sub: 'Receive alert confirmations',
              val: notifications,
              set: setNotifications,
            },
            {
              icon: Navigation,
              label: 'Location Sharing',
              sub: 'Share live GPS with contacts',
              val: locationSharing,
              set: setLocationSharing,
            },
          ].map(
            ({
              icon: Icon,
              label,
              sub,
              val,
              set,
            }, i) => (
              <div
                key={label}
                className={`flex items-center gap-3 p-3.5 ${
                  i > 0
                    ? 'border-t border-white/5'
                    : ''
                }`}
              >

                <div className="w-8 h-8 rounded-xl bg-white/5 flex items-center justify-center">

                  <Icon
                    size={14}
                    className="text-slate-400"
                  />

                </div>

                <div className="flex-1">

                  <p className="text-xs font-medium text-white">
                    {label}
                  </p>

                  <p className="text-[10px] text-slate-500">
                    {sub}
                  </p>

                </div>

                <button
                  type="button"
                  onClick={() => set(!val)}
                >
                  {val ? (
                    <ToggleRight
                      size={22}
                      className="text-emerald-400"
                    />
                  ) : (
                    <ToggleLeft
                      size={22}
                      className="text-slate-600"
                    />
                  )}
                </button>

              </div>
            )
          )}

        </div>

        {/* Email Configuration */}
        <div className="glass-card rounded-2xl p-3.5">

          <div className="flex items-center gap-2 mb-3">

            <Mail
              size={14}
              className="text-blue-400"
            />

            <span className="text-xs font-semibold text-white">
              Email Alert Configuration
            </span>

          </div>

          <div className="space-y-2 text-xs">

            <div className="flex justify-between">

              <span className="text-slate-500">
                Mailer
              </span>

              <span className="text-white font-medium">
                PHP Mail → Gmail SMTP
              </span>

            </div>

            <div className="flex justify-between">

              <span className="text-slate-500">
                From Address
              </span>

              <span className="text-white font-medium">
                noreply@safeguard.lk
              </span>

            </div>

            <div className="flex justify-between">

              <span className="text-slate-500">
                Encryption
              </span>

              <span className="text-emerald-400 font-medium">
                TLS
              </span>

            </div>

            <div className="flex justify-between">

              <span className="text-slate-500">
                Port
              </span>

              <span className="text-white font-medium">
                587
              </span>

            </div>

          </div>

        </div>

        {/* System Information */}
        <div className="glass-card rounded-2xl p-3.5">

          <div className="flex items-center gap-2 mb-3">

            <Shield
              size={14}
              className="text-indigo-400"
            />

            <span className="text-xs font-semibold text-white">
              System Info
            </span>

          </div>

          <div className="space-y-2 text-xs">

            <div className="flex justify-between">

              <span className="text-slate-500">
                Backend
              </span>

              <span className="text-white font-medium">
                Laravel 12.x
              </span>

            </div>

            <div className="flex justify-between">

              <span className="text-slate-500">
                Auth
              </span>

              <span className="text-white font-medium">
                Sanctum Token
              </span>

            </div>

            <div className="flex justify-between">

              <span className="text-slate-500">
                Maps SDK
              </span>

              <span className="text-white font-medium">
                Google Maps API
              </span>

            </div>

            <div className="flex justify-between">

              <span className="text-slate-500">
                Version
              </span>

              <span className="text-emerald-400 font-medium">
                v1.0.0 · Live
              </span>

            </div>

          </div>

        </div>

        {/* Sign Out */}
        <button
          type="button"
          onClick={handleSignOut}
          className="w-full py-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-semibold hover:bg-red-500/20 transition-all"
        >
          Sign Out
        </button>

      </div>

    </div>
  );

  /*
   * MAIN RETURN
   */
  return (
    <div className="min-h-screen bg-[#070b18] flex flex-col items-center justify-center relative overflow-hidden py-8 px-4">

      {/* Back Button */}
      <div className="absolute top-6 left-6 z-50">

        <button
          type="button"
          onClick={() =>
            onNavigate('landing')
          }
          className="flex items-center gap-2 px-4 py-2 rounded-xl glass border border-white/10 text-slate-300 hover:text-white transition-colors text-sm"
        >
          <ChevronLeft size={16} />
          Back
        </button>

      </div>

      {/* Title */}
      <div className="text-center mb-8">

        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-medium mb-2">

          <Shield size={12} />

          SafeGuard Mobile Application

        </div>

        <h1
          className="text-2xl font-black text-white"
          style={{
            fontFamily: 'Space Grotesk',
          }}
        >
          React Native Interface Demo
        </h1>

        <p className="text-slate-500 text-sm mt-1">
          Simulated iOS/Android mobile experience
        </p>

      </div>

      {/* Phone */}
      <div className="relative">

        {/* Glow */}
        <div
          className={`absolute inset-0 rounded-[52px] blur-3xl scale-110 transition-all duration-500 ${
            sosActive
              ? 'bg-red-600/30'
              : 'bg-indigo-600/15'
          }`}
        />

        <div
          className="relative phone-frame rounded-[48px] w-[340px] overflow-hidden"
          style={{
            height: '700px',
          }}
        >

          {/* Status Bar */}
          <div className="h-12 bg-black/50 flex items-end justify-between px-7 pb-1.5">

            <span className="text-[11px] text-white/80 font-medium">
              9:41
            </span>

            <div className="w-24 h-6 bg-black rounded-b-2xl" />

            <div className="flex items-center gap-1.5">

              <Wifi
                size={11}
                className="text-white/60"
              />

              <Signal
                size={11}
                className="text-white/60"
              />

              <Battery
                size={11}
                className="text-white/60"
              />

            </div>

          </div>

          {/* App Content */}
          <div
            className="bg-[#0a0f1e] flex flex-col"
            style={{
              height:
                'calc(700px - 48px - 64px)',
            }}
          >

            {currentView === 'home' &&
              renderHome()}

            {currentView === 'contacts' &&
              renderContacts()}

            {currentView === 'history' &&
              renderHistory()}

            {currentView === 'settings' &&
              renderSettings()}

          </div>

          {/* Bottom Navigation */}
          <div className="h-16 glass border-t border-white/5 flex items-center justify-around px-2">

            {navItems.map(
              ({
                id,
                icon: Icon,
                label,
              }) => (
                <button
                  type="button"
                  key={id}
                  onClick={() =>
                    setCurrentView(id)
                  }
                  className={`flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-xl transition-all ${
                    currentView === id
                      ? 'text-red-400'
                      : 'text-slate-600 hover:text-slate-400'
                  }`}
                >

                  <Icon size={18} />

                  <span className="text-[9px] font-medium">
                    {label}
                  </span>

                  {currentView === id && (
                    <div className="w-1 h-1 rounded-full bg-red-400" />
                  )}

                </button>
              )
            )}

          </div>

          {/* SOS Overlay */}
          {sosActive && (
            <div className="absolute inset-0 bg-red-950/20 pointer-events-none">

              <div className="absolute top-14 left-0 right-0 flex justify-center">

                <div className="px-3 py-1 rounded-full bg-red-500/90 text-white text-[10px] font-bold animate-pulse">
                  🚨 SOS ACTIVE — HELP IS ON THE WAY
                </div>

              </div>

            </div>
          )}

        </div>

      </div>

      {/* Feature Callouts */}
      <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-3 max-w-2xl w-full">

        {[
          {
            icon: Shield,
            label: 'Laravel Sanctum',
            sub: 'Secure API Auth',
            color: 'text-indigo-400',
          },
          {
            icon: Mail,
            label: 'PHP Mail',
            sub: 'Gmail Alerts',
            color: 'text-emerald-400',
          },
          {
            icon: MapPin,
            label: 'Google Maps',
            sub: 'Real-time GPS',
            color: 'text-blue-400',
          },
          {
            icon: Bell,
            label: 'Instant SOS',
            sub: 'One-Tap Alert',
            color: 'text-red-400',
          },
        ].map(
          ({
            icon: Icon,
            label,
            sub,
            color,
          }) => (
            <div
              key={label}
              className="glass-card rounded-xl p-3 text-center"
            >

              <Icon
                size={16}
                className={`${color} mx-auto mb-1.5`}
              />

              <p className="text-xs font-semibold text-white">
                {label}
              </p>

              <p className="text-[10px] text-slate-500">
                {sub}
              </p>

            </div>
          )
        )}

      </div>

    </div>
  );
};

export default MobileApp;