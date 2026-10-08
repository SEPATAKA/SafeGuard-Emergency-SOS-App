export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar?: string;
  location: { lat: number; lng: number; address: string };
  status: 'safe' | 'sos' | 'warning';
  lastSeen: string;
  batteryLevel: number;
  signalStrength: number;
}

export interface EmergencyContact {
  id: string;
  name: string;
  email: string;
  phone: string;
  relation: string;
  avatar?: string;
  notifyEmail: boolean;
  priority: number;
}

export interface IncidentLog {
  id: string;
  userId: string;
  userName: string;
  type: 'sos' | 'location_share' | 'false_alarm' | 'resolved';
  timestamp: string;
  location: { lat: number; lng: number; address: string };
  status: 'active' | 'resolved' | 'false_alarm';
  respondedAt?: string;
  notes?: string;
  contactsNotified: number;
}

export interface SystemStats {
  totalUsers: number;
  activeAlerts: number;
  resolvedToday: number;
  emailsSentToday: number;
  avgResponseTime: string;
  systemUptime: string;
}

export interface ChartData {
  name: string;
  incidents: number;
  resolved: number;
  emails: number;
}

export interface NavItem {
  id: string;
  label: string;
  icon: string;
}

export type ViewType = 'landing' | 'auth' | 'mobile-app' | 'admin-dashboard';
export type AdminView = 'overview' | 'incidents' | 'users' | 'contacts' | 'notifications' | 'settings' | 'map';
export type MobileView = 'home' | 'contacts' | 'history' | 'settings' | 'sos-active';
