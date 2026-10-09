import React from 'react';
import { NavLink, Outlet, Link } from 'react-router-dom';
import { LayoutDashboard, Package, User, Heart, LogOut } from 'lucide-react';
import { useAuth } from '../../context/AuthContext.jsx';
import { useWishlist } from '../../context/WishlistContext.jsx';

export default function AccountLayout() {
  const { user } = useAuth();
  const { wishlistCount } = useWishlist();

  const navItems = [
    { label: 'Dashboard', path: '/account', icon: LayoutDashboard, exact: true },
    { label: 'Orders & Shipments', path: '/account/orders', icon: Package },
    { label: 'Profile & Addresses', path: '/account/profile', icon: User },
    { label: 'Saved Wishlist', path: '/wishlist', icon: Heart, badge: wishlistCount }
  ];

  return (
    <div className="py-12 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Header */}
      <div className="border-b border-[#E8E4DC] pb-6 mb-10 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <span className="text-[11px] uppercase tracking-[0.25em] text-[#8C857B] font-medium block mb-1">
            Private Client Portal
          </span>
          <h1 className="font-serif-luxury text-3xl sm:text-4xl text-[#191919] font-light">
            Welcome, {user.fullName}
          </h1>
          <p className="text-xs text-[#736C62] font-light mt-1">
            Member of the LUMÉRA Collective since {user.memberSince || '2025'}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
        
        {/* Sidebar Nav */}
        <aside className="lg:col-span-3">
          <nav className="bg-[#FAF9F5] border border-[#E8E4DC] p-4 space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.label}
                  to={item.path}
                  end={item.exact}
                  className={({ isActive }) =>
                    `flex items-center justify-between px-3.5 py-3 text-xs uppercase tracking-wider transition-colors ${
                      isActive
                        ? 'bg-[#191919] text-[#FAF9F5] font-medium'
                        : 'text-[#696359] hover:bg-[#F2EFEB] hover:text-[#191919]'
                    }`
                  }
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className="w-4 h-4" />
                    <span>{item.label}</span>
                  </div>
                  {item.badge !== undefined && item.badge > 0 && (
                    <span className="font-mono text-[10px] bg-[#FAF9F5] text-[#191919] px-1.5 py-0.5 rounded-full font-semibold">
                      {item.badge}
                    </span>
                  )}
                </NavLink>
              );
            })}
          </nav>

          <div className="mt-6 p-4 bg-[#F2EFEB] border border-[#E0D9CC] text-xs text-[#696359] space-y-1">
            <span className="text-[10px] uppercase tracking-wider text-[#191919] font-bold block">
              Concierge Service
            </span>
            <p className="leading-relaxed">
              Direct liaison available Monday – Saturday for bespoke fittings and dispatch queries: concierge@lumera.studio
            </p>
          </div>
        </aside>

        {/* Account Content Area */}
        <main className="lg:col-span-9">
          <Outlet />
        </main>

      </div>

    </div>
  );
}
