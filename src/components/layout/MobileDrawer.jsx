import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { X, Search, Heart, User, ArrowRight, LogIn, LogOut, Sliders } from 'lucide-react';
import { useWishlist } from '../../context/WishlistContext.jsx';
import { useAuth } from '../../context/AuthContext.jsx';

export default function MobileDrawer({ isOpen, onClose }) {
  const { wishlistCount } = useWishlist();
  const { user, isAuthenticated, logout } = useAuth();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const links = [
    { label: 'New Arrivals', href: '/shop/new-arrivals', count: '10' },
    { label: 'Women', href: '/shop/women', count: '18' },
    { label: 'Men', href: '/shop/men', count: '16' },
    { label: 'Accessories', href: '/shop/accessories', count: '12' },
    { label: 'All Collections', href: '/shop', count: '28' },
    { label: 'Private Sale', href: '/shop?sale=true', count: 'Sale' }
  ];

  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#111111]/50 backdrop-blur-xs transition-opacity duration-300"
        onClick={onClose}
      />

      {/* Drawer */}
      <div className="fixed inset-y-0 left-0 w-full max-w-xs bg-[#FAF9F5] shadow-2xl flex flex-col justify-between z-50 p-6 overflow-y-auto">
        <div>
          {/* Header */}
          <div className="flex items-center justify-between pb-6 border-b border-[#E8E4DC]">
            <Link
              to="/"
              onClick={onClose}
              className="font-serif-luxury text-2xl tracking-[0.22em] uppercase font-light text-[#191919]"
            >
              FILLKART
            </Link>
            <button
              onClick={onClose}
              className="p-1.5 text-[#191919] hover:opacity-60 transition-opacity cursor-pointer"
              aria-label="Close menu"
            >
              <X className="w-5 h-5 stroke-[1.5]" />
            </button>
          </div>

          {/* User Status / Login Banner */}
          <div className="mt-4 mb-4">
            {isAuthenticated ? (
              <div className="p-3 bg-white rounded-lg border border-[#E8E4DC] flex items-center justify-between">
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="w-8 h-8 rounded-full bg-[#191919] text-[#C5A265] text-xs font-serif font-bold flex items-center justify-center shrink-0">
                    {user?.avatar || (user?.fullName ? user.fullName.slice(0, 2).toUpperCase() : 'AV')}
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-bold text-[#191919] truncate">{user?.fullName || "VIP Patron"}</p>
                    <p className="text-[10px] text-[#8C857B] font-mono truncate">{user?.roleName || "Client"}</p>
                  </div>
                </div>
                <button
                  onClick={() => {
                    logout();
                    onClose();
                  }}
                  className="p-1.5 text-neutral-400 hover:text-rose-600 rounded cursor-pointer"
                  title="Sign Out"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                onClick={onClose}
                className="flex items-center justify-center gap-2 w-full py-2.5 px-3 bg-[#191919] hover:bg-black text-[#FAF9F5] text-xs uppercase tracking-wider font-semibold rounded-md shadow-xs transition-colors"
              >
                <LogIn className="w-3.5 h-3.5 text-[#C5A265]" />
                <span>Sign In to Experience</span>
              </Link>
            )}
          </div>

          {/* Search Shortcut */}
          <div className="mb-6">
            <Link
              to="/search"
              onClick={onClose}
              className="flex items-center justify-between w-full px-4 py-2.5 bg-[#F2EFEB] text-xs uppercase tracking-wider text-[#736C62] hover:text-[#191919] transition-colors rounded-sm"
            >
              <span className="flex items-center gap-2">
                <Search className="w-4 h-4" />
                Search collection...
              </span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Navigation links */}
          <nav className="space-y-3">
            {links.map((link) => (
              <Link
                key={link.label}
                to={link.href}
                onClick={onClose}
                className="flex items-center justify-between py-2 text-sm uppercase tracking-[0.18em] font-medium text-[#2C2925] hover:text-[#000000] border-b border-[#F0ECE1] transition-colors"
              >
                <span>{link.label}</span>
                <span className="text-[11px] text-[#8C857B] font-mono tabular-nums">
                  {link.count}
                </span>
              </Link>
            ))}
          </nav>

          {/* Editorial Links */}
          <div className="mt-6 pt-5 border-t border-[#E8E4DC] space-y-2.5">
            <Link
              to="/about"
              onClick={onClose}
              className="block text-xs uppercase tracking-[0.16em] text-[#736C62] hover:text-[#191919]"
            >
              Our Story & Philosophy
            </Link>
            <Link
              to="/contact"
              onClick={onClose}
              className="block text-xs uppercase tracking-[0.16em] text-[#736C62] hover:text-[#191919]"
            >
              Client Concierge
            </Link>
            <Link
              to="/faq"
              onClick={onClose}
              className="block text-xs uppercase tracking-[0.16em] text-[#736C62] hover:text-[#191919]"
            >
              Care, Sizing & FAQs
            </Link>

          </div>
        </div>

        {/* Footer shortcuts */}
        <div className="pt-6 border-t border-[#E8E4DC] flex items-center justify-between text-xs tracking-wider uppercase text-[#504D47]">
          {isAuthenticated ? (
            <Link
              to="/account"
              onClick={onClose}
              className="flex items-center gap-2 hover:text-[#191919]"
            >
              <User className="w-4 h-4" />
              Account
            </Link>
          ) : (
            <Link
              to="/login"
              onClick={onClose}
              className="flex items-center gap-2 text-[#9A7B4F] font-semibold hover:text-[#191919]"
            >
              <LogIn className="w-4 h-4" />
              Sign In
            </Link>
          )}

          <Link
            to="/wishlist"
            onClick={onClose}
            className="flex items-center gap-2 hover:text-[#191919]"
          >
            <Heart className="w-4 h-4" />
            Wishlist ({wishlistCount})
          </Link>
        </div>
      </div>
    </div>
  );
}
