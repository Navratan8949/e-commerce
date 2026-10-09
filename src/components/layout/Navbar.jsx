import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, User, Heart, ShoppingBag, Menu, Sliders, Globe } from 'lucide-react';
import { useCart } from '../../context/CartContext.jsx';
import { useWishlist } from '../../context/WishlistContext.jsx';
import { useCurrency } from '../../context/CurrencyContext.jsx';
import MegaMenu from './MegaMenu.jsx';

export default function Navbar({ onOpenMobileMenu, onOpenSearch }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeMegaCategory, setActiveMegaCategory] = useState(null);
  const location = useLocation();

  const { cartCount, subtotal, openDrawer } = useCart();
  const { wishlistCount } = useWishlist();
  const { currency, setCurrency, formatPrice, currencies } = useCurrency();

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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-18 sm:h-20">
            
            {/* Mobile menu button & search */}
            <div className="flex items-center gap-3 lg:hidden">
              <button
                type="button"
                onClick={onOpenMobileMenu}
                className="p-2 -ml-2 text-[#191919] hover:opacity-70 transition-opacity focus-visible:outline-hidden cursor-pointer"
                aria-label="Open mobile menu"
              >
                <Menu className="w-5 h-5 stroke-[1.5]" />
              </button>
              <button
                type="button"
                onClick={onOpenSearch}
                className="p-2 text-[#191919] hover:opacity-70 transition-opacity focus-visible:outline-hidden cursor-pointer"
                aria-label="Search"
              >
                <Search className="w-5 h-5 stroke-[1.5]" />
              </button>
            </div>

            {/* Zone 1: Brand Wordmark */}
            <div className="flex-1 lg:flex-initial text-center lg:text-left">
              <Link
                to="/"
                className="inline-block font-serif-luxury text-2xl sm:text-3xl tracking-[0.22em] uppercase font-light text-[#191919] hover:opacity-85 transition-opacity"
              >
                LUMÉRA
              </Link>
            </div>

            {/* Zone 2: Navigation Links with MegaMenu hover */}
            <nav className="hidden lg:flex items-center space-x-8">
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
                      className={`text-xs uppercase tracking-[0.18em] font-medium transition-all relative py-1 hover:text-[#000000] ${
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

            {/* Zone 3: Actions (Currency Switcher, Admin, Search, Account, Wishlist, Bag) */}
            <div className="flex items-center space-x-3 sm:space-x-4">
              
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

              {/* Direct Admin Link - Unmistakable across all screens */}
              <Link
                to="/admin"
                className="inline-flex items-center gap-1.5 px-2.5 py-1 text-[10.5px] uppercase tracking-wider font-mono bg-[#0B0C0E] text-white hover:bg-black transition-all shadow-xs border border-neutral-800"
                title="Access LUMÉRA Admin Console"
              >
                <Sliders className="w-3 h-3 text-[#C5A265]" />
                <span className="font-semibold">Admin</span>
              </Link>

              {/* Live Search Trigger */}
              <button
                type="button"
                onClick={onOpenSearch}
                className="hidden lg:flex p-1.5 text-[#191919] hover:opacity-70 transition-opacity cursor-pointer"
                aria-label="Search catalog"
              >
                <Search className="w-5 h-5 stroke-[1.5]" />
              </button>

              <Link
                to="/account"
                className="p-1.5 text-[#191919] hover:opacity-70 transition-opacity"
                aria-label="My account"
              >
                <User className="w-5 h-5 stroke-[1.5]" />
              </Link>

              <Link
                to="/wishlist"
                className="relative p-1.5 text-[#191919] hover:opacity-70 transition-opacity"
                aria-label={`Wishlist, ${wishlistCount} items`}
              >
                <Heart className="w-5 h-5 stroke-[1.5]" />
                {wishlistCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full bg-[#191919] text-[#FAF9F5] text-[9px] font-semibold flex items-center justify-center tabular-nums">
                    {wishlistCount}
                  </span>
                )}
              </Link>

              <button
                type="button"
                onClick={openDrawer}
                className="relative p-1.5 text-[#191919] hover:opacity-70 transition-opacity cursor-pointer focus-visible:outline-hidden flex items-center gap-2"
                aria-label={`Shopping bag, ${cartCount} items`}
              >
                <div className="relative">
                  <ShoppingBag className="w-5 h-5 stroke-[1.5]" />
                  {cartCount > 0 && (
                    <span className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full bg-[#191919] text-[#FAF9F5] text-[9px] font-semibold flex items-center justify-center tabular-nums animate-scale-in">
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
