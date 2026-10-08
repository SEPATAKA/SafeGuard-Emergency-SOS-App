import React, { useState } from 'react';
import { Shield, Mail, Lock, User, ArrowLeft } from 'lucide-react';
import { loginUser, registerUser } from '../api/api';
import { ViewType } from '../types';

interface AuthPageProps {
  onNavigate: (view: ViewType) => void;
}

const AuthPage: React.FC<AuthPageProps> = ({ onNavigate }) => {
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setError('');
    setLoading(true);

    try {
      const result =
        mode === 'login'
          ? await loginUser({ email, password })
          : await registerUser({ name, email, password });

      localStorage.setItem('safeguard_token', result.token);
      localStorage.setItem('safeguard_user', JSON.stringify(result.user));

      onNavigate(result.user.role === 'admin' ? 'admin-dashboard' : 'mobile-app');
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'Authentication failed'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#070b18] text-white flex items-center justify-center px-6">
      <div className="w-full max-w-md">

        <button
          onClick={() => onNavigate('landing')}
          className="flex items-center gap-2 text-slate-400 hover:text-white mb-8"
        >
          <ArrowLeft size={18} />
          Back
        </button>

        <div className="glass-card rounded-2xl p-8 border border-white/10">

          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-red-500 to-rose-700 flex items-center justify-center">
              <Shield size={32} />
            </div>
          </div>

          <h1 className="text-3xl font-black text-center mb-2">
            Safe<span className="text-red-400">Guard</span>
          </h1>

          <p className="text-center text-slate-400 text-sm mb-8">
            {mode === 'login'
              ? 'Sign in to your SafeGuard account'
              : 'Create your SafeGuard account'}
          </p>

          <div className="flex mb-6 bg-white/5 rounded-xl p-1">
            <button
              type="button"
              onClick={() => setMode('login')}
              className={`flex-1 py-2 rounded-lg text-sm font-semibold ${
                mode === 'login'
                  ? 'bg-red-500 text-white'
                  : 'text-slate-400'
              }`}
            >
              Login
            </button>

            <button
              type="button"
              onClick={() => setMode('register')}
              className={`flex-1 py-2 rounded-lg text-sm font-semibold ${
                mode === 'register'
                  ? 'bg-red-500 text-white'
                  : 'text-slate-400'
              }`}
            >
              Register
            </button>
          </div>

          {error && (
            <div className="mb-4 p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">

            {mode === 'register' && (
              <div>
                <label className="text-xs text-slate-400">
                  Full Name
                </label>

                <div className="relative mt-1">
                  <User
                    size={17}
                    className="absolute left-3 top-3 text-slate-500"
                  />

                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-10 pr-3 text-white outline-none focus:border-red-500/50"
                    placeholder="Your name"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="text-xs text-slate-400">
                Email
              </label>

              <div className="relative mt-1">
                <Mail
                  size={17}
                  className="absolute left-3 top-3 text-slate-500"
                />

                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-10 pr-3 text-white outline-none focus:border-red-500/50"
                  placeholder="you@example.com"
                />
              </div>
            </div>

            <div>
              <label className="text-xs text-slate-400">
                Password
              </label>

              <div className="relative mt-1">
                <Lock
                  size={17}
                  className="absolute left-3 top-3 text-slate-500"
                />

                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength={8}
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-10 pr-3 text-white outline-none focus:border-red-500/50"
                  placeholder="Minimum 8 characters"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-red-500 to-rose-600 font-bold hover:opacity-90 disabled:opacity-50"
            >
              {loading
                ? 'Please wait...'
                : mode === 'login'
                ? 'Login'
                : 'Create Account'}
            </button>

          </form>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;