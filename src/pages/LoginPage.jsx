import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  Sparkles,
  Lock,
  Mail,
  Eye,
  EyeOff,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  ChevronRight,
  HelpCircle,
  X,
  Store,
  Crown,
  Truck,
  Boxes,
  Headphones,
  KeyRound
} from 'lucide-react';
import { useAuth } from '../context/AuthContext.jsx';
import { useToast } from '../context/ToastContext.jsx';
import { ECOMMERCE_DEMO_USERS } from '../data/demoUsers.js';

export default function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const { addToast } = useToast();

  const [email, setEmail] = useState('admin@fillkart.com');
  const [password, setPassword] = useState('admin@fillkart');
  const [showPassword, setShowPassword] = useState(false);
  const [selectedUser, setSelectedUser] = useState(ECOMMERCE_DEMO_USERS[0]);
  const [rememberMe, setRememberMe] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingStep, setLoadingStep] = useState('');
  const [error, setError] = useState('');
  const [showGuideModal, setShowGuideModal] = useState(false);

  // Handle selecting a 1-click persona
  const handleSelectDemoUser = (user, autoLogin = false) => {
    setSelectedUser(user);
    setEmail(user.email);
    setPassword(user.password);
    setError('');

    if (autoLogin) {
      triggerLogin(user);
    }
  };

  const triggerLogin = async (userToAuth = null) => {
    setError('');
    setIsLoading(true);

    const targetUser =
      userToAuth ||
      ECOMMERCE_DEMO_USERS.find(
        (u) => u.email.toLowerCase() === email.trim().toLowerCase()
      ) || {
        id: `user-${Date.now()}`,
        name: email.split('@')[0],
        roleId: 'super_admin',
        roleName: 'Authorized Staff',
        email: email.trim(),
        badge: 'Staff Member',
        avatar: email.slice(0, 2).toUpperCase(),
        targetRoute: '/admin'
      };

    if (!email.trim()) {
      setError('Please provide your work email address or client ID.');
      setIsLoading(false);
      return;
    }

    if (!password) {
      setError('Please provide your security access password.');
      setIsLoading(false);
      return;
    }

    setLoadingStep('Verifying digital signature & session...');
    await new Promise((resolve) => setTimeout(resolve, 300));

    setLoadingStep(`Applying ${targetUser.roleName} access privileges...`);
    await new Promise((resolve) => setTimeout(resolve, 250));

    login(targetUser);
    setIsLoading(false);

    if (addToast) {
      addToast(`Welcome back, ${targetUser.name}! Signed in as ${targetUser.roleName}`, 'success');
    }

    // Direct routing based on persona
    if (targetUser.targetRoute) {
      navigate(targetUser.targetRoute);
    } else {
      navigate('/admin');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    triggerLogin();
  };

  const getPersonaIcon = (roleId) => {
    switch (roleId) {
      case 'super_admin':
        return Crown;
      case 'operations_manager':
        return Truck;
      case 'customer_vip':
        return Sparkles;
      case 'inventory_lead':
        return Boxes;
      case 'support_lead':
        return Headphones;
      default:
        return KeyRound;
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF9F5] text-[#191919] flex flex-col justify-between selection:bg-[#C5A265] selection:text-white relative overflow-hidden font-sans">
      {/* Subtle luxury ambient pattern */}
      <div
        className="absolute inset-0 pointer-events-none opacity-40"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(197, 162, 101, 0.08) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(197, 162, 101, 0.08) 1px, transparent 1px)
          `,
          backgroundSize: '48px 48px'
        }}
      />
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-amber-100/50 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-amber-50 rounded-full blur-3xl pointer-events-none" />

      {/* Top Header */}
      <header className="relative z-10 border-b border-[#E8E4DC] bg-white/90 backdrop-blur-md px-4 sm:px-8 py-3.5 flex items-center justify-between shadow-2xs">
        <div className="flex items-center gap-3">
          <Link
            to="/"
            className="font-serif-luxury text-xl sm:text-2xl tracking-[0.22em] uppercase font-light text-[#191919] hover:opacity-80 transition-opacity"
          >
            FILLKART
          </Link>
          <span className="hidden sm:inline-block px-2 py-0.5 rounded text-[10px] font-mono font-semibold uppercase tracking-wider bg-neutral-100 text-neutral-700 border border-neutral-200">
            Atelier Portal
          </span>
        </div>

        <div className="flex items-center gap-3">
          {/* Status pill */}
          <div className="hidden md:flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-50 border border-neutral-200 text-xs text-neutral-600 font-medium">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[11px] font-mono">Storefront & Console: Active</span>
          </div>

          {/* Return to storefront */}
          <Link
            to="/"
            className="px-3 py-1.5 text-xs font-semibold text-neutral-700 hover:text-black bg-white hover:bg-neutral-50 border border-neutral-200 rounded-lg transition-all flex items-center gap-1.5 shadow-xs"
          >
            <Store className="w-3.5 h-3.5 text-[#9A7B4F]" />
            <span>Storefront</span>
          </Link>
        </div>
      </header>

      {/* Main Login Workspace */}
      <main className="relative z-10 flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 flex items-center">
        <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Brand Story & Highlights */}
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-900 text-xs font-semibold">
              <ShieldCheck className="w-3.5 h-3.5 text-[#9A7B4F]" />
              <span>Unified E-Commerce & Atelier Management</span>
            </div>

            <div className="space-y-3">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif-luxury font-light text-neutral-900 tracking-tight leading-[1.15]">
                Haute Couture <br />
                <span className="font-normal italic text-transparent bg-clip-text bg-gradient-to-r from-[#9A7B4F] to-[#C5A265]">
                  & Precision Commerce.
                </span>
              </h1>
              <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed max-w-lg font-light">
                Sign in to manage product catalogs, real-time inventory matrices, order fulfillment, client concierge inquiries, and multi-currency revenue reports.
              </p>
            </div>

            {/* Quick Pillars Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              <div className="p-3.5 rounded-xl bg-white border border-[#E8E4DC] shadow-xs">
                <div className="w-7 h-7 rounded-lg bg-amber-50 text-[#9A7B4F] flex items-center justify-center mb-2 font-serif font-bold text-xs">
                  01
                </div>
                <h2 className="text-xs font-bold text-neutral-900 mb-0.5">Atelier ERP Console</h2>
                <p className="text-[11px] text-neutral-500 leading-normal">
                  Live metrics, SKU margins, coupon dispatch, and lookbook management.
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-white border border-[#E8E4DC] shadow-xs">
                <div className="w-7 h-7 rounded-lg bg-neutral-100 text-neutral-800 flex items-center justify-center mb-2 font-serif font-bold text-xs">
                  02
                </div>
                <h2 className="text-xs font-bold text-neutral-900 mb-0.5">Order Fulfillment</h2>
                <p className="text-[11px] text-neutral-500 leading-normal">
                  Live order pipeline, automated tracking IDs, and instant status updates.
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-white border border-[#E8E4DC] shadow-xs">
                <div className="w-7 h-7 rounded-lg bg-emerald-50 text-emerald-800 flex items-center justify-center mb-2 font-serif font-bold text-xs">
                  03
                </div>
                <h2 className="text-xs font-bold text-neutral-900 mb-0.5">Stock Auditing</h2>
                <p className="text-[11px] text-neutral-500 leading-normal">
                  Real-time stock variant thresholds, reorder points, and alerts.
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-white border border-[#E8E4DC] shadow-xs">
                <div className="w-7 h-7 rounded-lg bg-rose-50 text-rose-800 flex items-center justify-center mb-2 font-serif font-bold text-xs">
                  04
                </div>
                <h2 className="text-xs font-bold text-neutral-900 mb-0.5">VIP Client Experience</h2>
                <p className="text-[11px] text-neutral-500 leading-normal">
                  Saved addresses, concierge order review, and seamless one-click checkout.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Clean Light Theme Login Card */}
          <div className="lg:col-span-7">
            <div className="bg-white border border-[#E4E4E8] rounded-2xl p-6 sm:p-8 shadow-xl shadow-neutral-200/50 relative">
              {/* Card Header */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-6 pb-5 border-b border-neutral-100">
                <div>
                  <h2 className="text-xl sm:text-2xl font-serif-luxury font-normal text-neutral-900 tracking-tight flex items-center gap-2">
                    <span>Sign In to FILLKART</span>
                    <span className="px-2 py-0.5 rounded bg-amber-50 text-[#9A7B4F] text-[10px] font-mono font-bold border border-amber-200">
                      LIVE DEMO
                    </span>
                  </h2>
                  <p className="text-xs text-neutral-500 mt-1">
                    Select a 1-click demo persona below or enter account credentials.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setShowGuideModal(true)}
                  className="text-xs text-[#9A7B4F] hover:text-black font-semibold inline-flex items-center gap-1 self-start sm:self-center cursor-pointer"
                >
                  <HelpCircle className="w-3.5 h-3.5" />
                  <span>Credential Guide</span>
                </button>
              </div>

              {/* 1-Click Demo Personas */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-2.5">
                  <span className="text-xs font-bold uppercase tracking-wider text-neutral-700 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-[#C5A265]" />
                    <span>Quick 1-Click Demo Roles</span>
                  </span>
                  <span className="text-[11px] text-neutral-400">Click to autofill or login</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
                  {ECOMMERCE_DEMO_USERS.map((u) => {
                    const isSelected = selectedUser.id === u.id;
                    const IconComponent = getPersonaIcon(u.roleId);
                    return (
                      <div
                        key={u.id}
                        onClick={() => handleSelectDemoUser(u)}
                        className={`p-3 rounded-xl border text-left cursor-pointer transition-all relative group ${
                          isSelected
                            ? 'bg-amber-50/60 border-[#C5A265] shadow-xs ring-1 ring-[#C5A265]'
                            : 'bg-neutral-50/80 border-neutral-200 hover:border-neutral-300 hover:bg-white'
                        }`}
                      >
                        <div className="flex items-start justify-between gap-2 mb-1.5">
                          <div className="flex items-center gap-2 min-w-0">
                            <div className="w-7 h-7 rounded-lg bg-neutral-900 text-[#C5A265] flex items-center justify-center text-xs font-bold shrink-0">
                              <IconComponent className="w-3.5 h-3.5" />
                            </div>
                            <div className="min-w-0">
                              <div className="text-xs font-bold text-neutral-900 truncate group-hover:text-[#9A7B4F] transition-colors">
                                {u.name}
                              </div>
                              <div className="text-[10px] text-neutral-500 truncate">{u.badge}</div>
                            </div>
                          </div>
                          {isSelected && <CheckCircle2 className="w-4 h-4 text-[#9A7B4F] shrink-0" />}
                        </div>

                        <div className="text-[10px] text-neutral-600 truncate font-mono bg-white px-2 py-0.5 rounded border border-neutral-200 mb-2">
                          {u.email}
                        </div>

                        <div className="flex items-center justify-between pt-1 border-t border-neutral-200/60">
                          <span className="text-[9px] font-mono font-semibold text-neutral-400 uppercase">
                            {u.roleId.split('_')[0]}
                          </span>
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleSelectDemoUser(u, true);
                            }}
                            className="text-[10px] font-bold text-[#9A7B4F] hover:text-black flex items-center gap-0.5 cursor-pointer hover:underline"
                          >
                            <span>Quick In</span>
                            <ChevronRight className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Error Alert */}
              {error && (
                <div className="mb-5 p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2">
                  <span>{error}</span>
                </div>
              )}

              {/* Form Inputs */}
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-neutral-700 mb-1.5">
                    Account Email Address
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="e.g. admin@fillkart.com"
                      disabled={isLoading}
                      required
                      className="w-full bg-neutral-50 hover:bg-white focus:bg-white border border-neutral-200 focus:border-[#C5A265] focus:ring-2 focus:ring-amber-100 text-neutral-900 rounded-xl pl-10 pr-4 py-2.5 text-xs sm:text-sm font-medium transition-all outline-hidden"
                    />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="block text-xs font-bold text-neutral-700">Password</label>
                    <span className="text-[11px] text-neutral-500">
                      Demo password:{' '}
                      <code className="text-[#9A7B4F] font-mono font-bold bg-amber-50 px-1.5 py-0.5 rounded border border-amber-200">
                        {password || 'admin@fillkart'}
                      </code>
                    </span>
                  </div>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter password"
                      disabled={isLoading}
                      required
                      className="w-full bg-neutral-50 hover:bg-white focus:bg-white border border-neutral-200 focus:border-[#C5A265] focus:ring-2 focus:ring-amber-100 text-neutral-900 rounded-xl pl-10 pr-10 py-2.5 text-xs sm:text-sm font-medium transition-all outline-hidden"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-700 cursor-pointer"
                      tabIndex={-1}
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-1 text-xs">
                  <label className="flex items-center gap-2 cursor-pointer select-none text-neutral-600">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="rounded border-neutral-300 text-[#C5A265] focus:ring-[#C5A265]"
                    />
                    <span>Remember this session</span>
                  </label>

                  <div className="text-[11px] text-neutral-500">
                    Role:{' '}
                    <strong className="text-neutral-800">{selectedUser?.roleName || 'Admin'}</strong>
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full py-3 px-4 bg-[#191919] hover:bg-black text-white font-bold text-xs sm:text-sm rounded-xl shadow-md transition-all flex items-center justify-center gap-2 disabled:opacity-60 cursor-pointer group"
                  >
                    {isLoading ? (
                      <div className="flex items-center gap-2.5">
                        <svg
                          className="animate-spin h-4 w-4 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          />
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          />
                        </svg>
                        <span>{loadingStep || 'Verifying credentials...'}</span>
                      </div>
                    ) : (
                      <>
                        <span>Sign In to Experience</span>
                        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                      </>
                    )}
                  </button>
                </div>
              </form>

              {/* Security info */}
              <div className="mt-6 pt-4 border-t border-neutral-100 text-center">
                <p className="text-[11px] text-neutral-500 flex items-center justify-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#9A7B4F]" />
                  <span>Licensed to FILLKART Luxury Atelier & Omnichannel Retail</span>
                </p>
                <div className="flex items-center justify-center gap-3 mt-1 text-[10px] text-neutral-400">
                  <span>Mumbai Flagship · Nariman Point</span>
                  <span>•</span>
                  <span>256-Bit SSL Encrypted</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t border-[#E8E4DC] bg-white/80 px-4 sm:px-8 py-3.5 text-xs text-neutral-500 flex flex-col sm:flex-row items-center justify-between gap-2">
        <div>
          © {new Date().getFullYear()} FILLKART Luxury Lifestyle Inc. All Rights Reserved.
        </div>
        <div className="flex items-center gap-4 text-[11px]">
          <span>Client Concierge: concierge@fillkart.com</span>
          <span className="hidden sm:inline">•</span>
          <span className="font-semibold text-neutral-700">+91 22 6192 8800</span>
        </div>
      </footer>

      {/* Demo Credentials Guide Modal */}
      {showGuideModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white border border-neutral-200 rounded-2xl max-w-md w-full p-6 shadow-2xl relative">
            <button
              onClick={() => setShowGuideModal(false)}
              className="absolute top-4 right-4 text-neutral-400 hover:text-black p-1 rounded-lg cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div className="w-9 h-9 rounded-xl bg-amber-50 text-[#9A7B4F] flex items-center justify-center">
                <HelpCircle className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-neutral-900 text-base">Demo Account Credentials</h3>
                <p className="text-xs text-neutral-500">Preset demonstration credentials for FILLKART</p>
              </div>
            </div>

            <div className="space-y-2.5 text-xs mb-6">
              {ECOMMERCE_DEMO_USERS.map((u) => (
                <div
                  key={u.id}
                  onClick={() => {
                    handleSelectDemoUser(u);
                    setShowGuideModal(false);
                  }}
                  className="p-2.5 rounded-lg bg-neutral-50 hover:bg-amber-50/50 border border-neutral-200 cursor-pointer flex items-center justify-between transition-colors"
                >
                  <div>
                    <div className="font-bold text-neutral-900">{u.name} ({u.badge})</div>
                    <div className="text-[11px] text-neutral-500 font-mono">{u.email}</div>
                  </div>
                  <code className="text-[#9A7B4F] font-mono text-xs font-bold bg-white px-2 py-1 rounded border border-neutral-200">
                    {u.password}
                  </code>
                </div>
              ))}
            </div>

            <div className="flex justify-end">
              <button
                onClick={() => setShowGuideModal(false)}
                className="px-4 py-2 bg-neutral-900 hover:bg-black text-white text-xs font-bold rounded-lg cursor-pointer"
              >
                Got It, Return
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
