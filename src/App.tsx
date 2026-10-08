import React, { useState } from 'react';
import { ViewType } from './types';
import LandingPage from './components/LandingPage';
import AuthPage from './components/AuthPage';
import MobileApp from './components/MobileApp';
import AdminDashboard from './components/AdminDashboard';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewType>('landing');

  const handleNavigate = (view: ViewType) => {
    const token = localStorage.getItem('safeguard_token');
    const savedUser = localStorage.getItem('safeguard_user');

    let user = null;

    try {
      user = savedUser ? JSON.parse(savedUser) : null;
    } catch {
      user = null;
    }

    // Protect Mobile App
    if (view === 'mobile-app' && !token) {
      setCurrentView('auth');
      return;
    }

    // Protect Admin Dashboard
    if (view === 'admin-dashboard') {
      if (!token || !user) {
        setCurrentView('auth');
        return;
      }

      if (user.role !== 'admin') {
        alert('Access denied. Admin account required.');
        setCurrentView('auth');
        return;
      }
    }

    setCurrentView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#070b18]">
      {currentView === 'landing' && (
        <LandingPage onNavigate={handleNavigate} />
      )}

      {currentView === 'auth' && (
        <AuthPage onNavigate={handleNavigate} />
      )}

      {currentView === 'mobile-app' && (
        <MobileApp onNavigate={handleNavigate} />
      )}

      {currentView === 'admin-dashboard' && (
        <AdminDashboard onNavigate={handleNavigate} />
      )}
    </div>
  );
};

export default App;