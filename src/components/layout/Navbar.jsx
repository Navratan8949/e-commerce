import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, User, Heart, ShoppingBag, Menu, Sliders, Globe, LogOut, ChevronDown } from 'lucide-react';
import { useCart } from '../../context/CartContext.jsx';
import { useWishlist } from '../../context/WishlistContext.jsx';
import { useCurrency } from '../../context/CurrencyContext.jsx';
import { useAuth } from '../../context/AuthContext.jsx';
import MegaMenu from './MegaMenu.jsx';

export default function Navbar({ onOpenMobileMenu, onOpenSearch }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeMegaCategory, setActiveMegaCategory] = useState(null);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const userMenuRef = useRef(null);
  const location = useLocation();

  const { cartCount, subtotal, openDrawer } = useCart();
  const { wishlistCount } = useWishlist();
  const { currency, setCurrency, formatPrice } = useCurrency();
  const { user, isAuthenticated, logout } = useAuth();

  const isHome = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close user dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target)) {
        setUserDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const navLinks = [
    { label: 'New Arrivals', href: '/shop/new-arrivals', mega: null },
    { label: 'Women', href: '/shop/women', mega: 'women' },
    { label: 'Men', href: '/shop/men', mega: 'men' },
    { label: 'Accessories', href: '/shop/accessories', mega: 'accessories' },
    { label: 'Collections', href: '/shop', mega: null },
    { label: 'Sale', href: '/shop?sale=true', mega: null }
  ];

  const headerBgClass = isHome && !isScrolled
    ? 'bg-transparent text-[#0F1115] border-transparent'
    : 'bg-white/95 backdrop-blur-md text-[#0F1115] border-[#E6E6EB] shadow-xs';

  return (
    <div className="relative sticky top-0 z-40">
      <header
        className={`w-full transition-all duration-300 border-b ${headerBgClass}`}
      >
        <div className="w-full px-4 sm:px-8 lg:px-12 xl:px-16">
          <div className="flex items-center justify-between h-15 sm:h-18 lg:h-20 gap-4">
            
            {/* Zone 1: Mobile Hamburger & Brand Wordmark (Left, balanced flex-1) */}
            <div className="flex items-center gap-2 sm:gap-4 shrink-0 lg:flex-1 lg:justify-start">
              <button
                type="button"
                onClick={onOpenMobileMenu}
                className="p-1.5 -ml-1 text-[#191919] hover:opacity-70 transition-opacity lg:hidden cursor-pointer"
                aria-label="Open mobile menu"
              >
                <Menu className="w-5 h-5 stroke-[1.5]" />
              </button>

              <Link
                to="/"
                className="inline-block font-serif-luxury text-lg sm:text-2xl lg:text-3xl tracking-[0.16em] sm:tracking-[0.22em] uppercase font-light text-[#191919] hover:opacity-85 transition-opacity whitespace-nowrap"
              >
                FILLKART
              </Link>
            </div>

            {/* Zone 2: Navigation Links (Centered in flow, shrink-0, whitespace-nowrap, zero overlap) */}
            <nav className="hidden lg:flex items-center justify-center space-x-5 xl:space-x-8 shrink-0">
              {navLinks.map((link) => {
                const isActive = location.pathname === link.href;
                return (
                  <div
                    key={link.label}
                    onMouseEnter={() => {
                      if (link.mega) setActiveMegaCategory(link.mega);
                      else setActiveMegaCategory(null);
                    }}
                    className="relative py-2"
                  >
                    <Link
                      to={link.href}
                      className={`text-xs uppercase tracking-[0.16em] xl:tracking-[0.18em] font-medium transition-all relative py-1 whitespace-nowrap hover:text-[#000000] ${
                        isActive ? 'text-[#000000]' : 'text-[#504D47]'
                      }`}
                    >
                      {link.label}
                      {isActive && (
                        <span className="absolute bottom-0 left-0 w-full h-[1.5px] bg-[#191919]" />
                      )}
                    </Link>
                  </div>
                );
              })}
            </nav>

            {/* Zone 3: Actions (Right-aligned, balanced flex-1, zero cut-off) */}
            <div className="flex items-center justify-end gap-1 sm:gap-2 md:gap-3 lg:gap-3.5 xl:gap-4 shrink-0 lg:flex-1">
              
              {/* Currency Switcher */}
              <div className="hidden xl:flex items-center gap-1 text-[11px] font-mono text-[#696359] border-r border-[#E0D9CC] pr-3">
                <Globe className="w-3.5 h-3.5 text-[#888]" />
                <select
                  value={currency}
                  onChange={(e) => setCurrency(e.target.value)}
                  className="bg-transparent border-none text-[11px] font-mono text-[#191919] uppercase cursor-pointer focus:ring-0 p-0 pr-4"
                  title="Select Currency"
                >
                  <option value="INR">INR (₹)</option>
                  <option value="USD">USD ($)</option>
                  <option value="EUR">EUR (€)</option>
                  <option value="GBP">GBP (£)</option>
                </select>
              </div>

              {/* Live Search Trigger */}
              <button
                type="button"
                onClick={onOpenSearch}
                className="p-1.5 sm:p-2 text-[#191919] hover:opacity-70 transition-opacity cursor-pointer shrink-0"
                aria-label="Search catalog"
              >
                <Search className="w-4.5 h-4.5 sm:w-5 sm:h-5 stroke-[1.5]" />
              </button>

              {/* User Account / Sign In Dropdown */}
              <div className="relative" ref={userMenuRef}>
                {isAuthenticated ? (
                  <button
                    onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                    className="p-1 sm:p-1.5 flex items-center gap-1 text-[#191919] hover:opacity-80 transition-opacity cursor-pointer shrink-0"
                    title={user?.fullName || "Account"}
                  >
                    <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-[#191919] text-[#C5A265] text-[10px] sm:text-xs font-serif font-bold flex items-center justify-center shadow-xs">
                      {user?.avatar || (user?.fullName ? user.fullName.slice(0, 2).toUpperCase() : 'AV')}
                    </div>
                    <ChevronDown className="w-3 h-3 text-neutral-400 hidden sm:block" />
                  </button>
                ) : (
                  <Link
                    to="/login"
                    className="p-1.5 sm:px-2.5 sm:py-1 rounded text-[11px] uppercase tracking-wider font-medium text-[#191919] hover:text-black flex items-center gap-1 shrink-0"
                    title="Sign In to FILLKART"
                  >
                    <User className="w-4.5 h-4.5 sm:w-5 sm:h-5 stroke-[1.5]" />
                    <span className="hidden sm:inline font-sans">Sign In</span>
                  </Link>
                )}

                {/* Dropdown Menu */}
                {userDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-56 max-w-[calc(100vw-1.5rem)] bg-white border border-[#E6E6EB] rounded-lg shadow-xl py-2 z-50 text-xs animate-in fade-in duration-100">
                    <div className="px-3.5 py-2 border-b border-neutral-100">
                      <p className="font-semibold text-neutral-900 truncate">{user?.fullName || "VIP Patron"}</p>
                      <p className="text-[10px] text-neutral-500 font-mono truncate">{user?.email}</p>
                      <span className="inline-block mt-1 text-[9px] uppercase font-mono px-1.5 py-0.5 bg-neutral-100 text-neutral-800 rounded font-semibold">
                        {user?.roleName || user?.role || "Client"}
                      </span>
                    </div>
                    <div className="py-1">
                      <Link
                        to="/account"
                        onClick={() => setUserDropdownOpen(false)}
                        className="block px-3.5 py-1.5 hover:bg-neutral-50 text-neutral-700 font-medium"
                      >
                        My Account
                      </Link>
                      <Link
                        to="/account/orders"
                        onClick={() => setUserDropdownOpen(false)}
                        className="block px-3.5 py-1.5 hover:bg-neutral-50 text-neutral-700 font-medium"
                      >
                        Order History
                      </Link>
                      <Link
                        to="/admin"
                        onClick={() => setUserDropdownOpen(false)}
                        className="block px-3.5 py-1.5 hover:bg-neutral-50 text-neutral-700 font-medium text-[#9A7B4F]"
                      >
                        ✦ Atelier Admin Console
                      </Link>
                    </div>
                    <div className="pt-1 border-t border-neutral-100">
                      <button
                        onClick={() => {
                          logout();
                          setUserDropdownOpen(false);
                        }}
                        className="w-full text-left px-3.5 py-1.5 text-rose-600 hover:bg-rose-50 font-medium cursor-pointer"
                      >
                        Sign Out
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Wishlist Link */}
              <Link
                to="/wishlist"
                className="relative p-1.5 sm:p-2 text-[#191919] hover:opacity-70 transition-opacity shrink-0"
                aria-label={`Wishlist, ${wishlistCount} items`}
              >
                <Heart className="w-4.5 h-4.5 sm:w-5 sm:h-5 stroke-[1.5]" />
                {wishlistCount > 0 && (
                  <span className="absolute top-1 right-1 w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full bg-[#191919] text-[#FAF9F5] text-[8px] sm:text-[9px] font-semibold flex items-center justify-center tabular-nums">
                    {wishlistCount}
                  </span>
                )}
              </Link>

              {/* Shopping Bag Trigger */}
              <button
                type="button"
                onClick={openDrawer}
                className="relative p-1.5 sm:p-2 -mr-1 text-[#191919] hover:opacity-70 transition-opacity cursor-pointer focus-visible:outline-hidden flex items-center gap-2 shrink-0"
                aria-label={`Shopping bag, ${cartCount} items`}
              >
                <div className="relative">
                  <ShoppingBag className="w-4.5 h-4.5 sm:w-5 sm:h-5 stroke-[1.5]" />
                  {cartCount > 0 && (
                    <span className="absolute -top-1 -right-1 w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full bg-[#191919] text-[#FAF9F5] text-[8px] sm:text-[9px] font-semibold flex items-center justify-center tabular-nums animate-scale-in">
                      {cartCount}
                    </span>
                  )}
                </div>
                {cartCount > 0 && (
                  <span className="hidden xl:inline text-xs font-mono font-medium tabular-nums text-[#191919]">
                    {formatPrice(subtotal)}
                  </span>
                )}
              </button>
            </div>

          </div>
        </div>
      </header>

      {/* MegaMenu Dropdown */}
      <MegaMenu
        activeCategory={activeMegaCategory}
        onClose={() => setActiveMegaCategory(null)}
      />
    </div>
  );
}
