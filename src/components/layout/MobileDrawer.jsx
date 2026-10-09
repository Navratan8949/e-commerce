import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { X, Search, Heart, User, ArrowRight } from 'lucide-react';
import { useWishlist } from '../../context/WishlistContext.jsx';

export default function MobileDrawer({ isOpen, onClose }) {
  const { wishlistCount } = useWishlist();

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
              className="p-1.5 text-[#191919] hover:opacity-60 transition-opacity"
              aria-label="Close menu"
            >
              <X className="w-5 h-5 stroke-[1.5]" />
            </button>
          </div>

          {/* Search Shortcut */}
          <div className="mt-6 mb-8">
            <Link
              to="/search"
              onClick={onClose}
              className="flex items-center justify-between w-full px-4 py-3 bg-[#F2EFEB] text-xs uppercase tracking-wider text-[#736C62] hover:text-[#191919] transition-colors"
            >
              <span className="flex items-center gap-2">
                <Search className="w-4 h-4" />
                Search collection...
              </span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Navigation links */}
          <nav className="space-y-4">
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
          <div className="mt-8 pt-6 border-t border-[#E8E4DC] space-y-3">
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
            {/* Atelier Admin Console Highlight Card */}
            <div className="pt-2">
              <Link
                to="/admin"
                onClick={onClose}
                className="flex flex-col p-3.5 bg-[#191919] text-[#FAF9F5] hover:bg-black transition-all shadow-md border border-[#3E3933]"
              >
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-1.5 text-[10px] uppercase font-mono tracking-widest text-[#D4AF37]">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] animate-pulse" />
                    <span>Merchant Console</span>
                  </div>
                  <span className="text-[10px] font-mono text-[#A89F91]">Admin</span>
                </div>
                <div className="text-xs font-serif-luxury text-white font-medium mb-1">
                  Atelier Backoffice & ERP
                </div>
                <div className="text-[10.5px] text-[#A69E8F] flex items-center justify-between">
                  <span>Manage SKUs, Orders & Stock</span>
                  <span className="text-[#D4AF37] font-semibold">Open ➔</span>
                </div>
              </Link>
            </div>
          </div>
        </div>

        {/* Footer shortcuts */}
        <div className="pt-6 border-t border-[#E8E4DC] flex items-center justify-between text-xs tracking-wider uppercase text-[#504D47]">
          <Link
            to="/account"
            onClick={onClose}
            className="flex items-center gap-2 hover:text-[#191919]"
          >
            <User className="w-4 h-4" />
            Account
          </Link>
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
