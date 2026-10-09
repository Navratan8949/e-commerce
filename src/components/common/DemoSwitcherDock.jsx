import React, { useState } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import {
  Sliders,
  Store,
  ShoppingBag,
  Package,
  TrendingUp,
  Tag,
  ChevronUp,
  ChevronDown,
  X,
  ExternalLink,
  Users,
  Zap
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext.jsx';
import { useProducts } from '../../context/ProductContext.jsx';
import { useCart } from '../../context/CartContext.jsx';
import { useCurrency } from '../../context/CurrencyContext.jsx';

/**
 * DemoSwitcherDock
 * Sleek architectural floating dock allowing instant switching between
 * the Customer-Facing Storefront and the LUMÉRA Admin Console.
 */
export default function DemoSwitcherDock() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isExpanded, setIsExpanded] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  const { orders } = useAuth();
  const { products } = useProducts();
  const { cartCount, addToCart, openDrawer } = useCart();
  const { formatPrice } = useCurrency();

  const isAdminRoute = location.pathname.startsWith('/admin');
  const totalGMV = orders.reduce((sum, o) => sum + (o.total || 0), 0);
  const pendingOrders = orders.filter((o) => o.status !== 'Delivered').length;

  const handleQuickDemoCart = () => {
    if (products.length >= 2) {
      addToCart(products[0], products[0].sizes?.[0] || 'M', products[0].colors?.[0] || { name: 'Noir', hex: '#111' }, 1);
      addToCart(products[1], products[1].sizes?.[0] || 'L', products[1].colors?.[0] || { name: 'Crème', hex: '#F0ECE4' }, 1);
      openDrawer();
    }
  };

  if (isDismissed) {
    return (
      <button
        type="button"
        onClick={() => setIsDismissed(false)}
        className="fixed bottom-4 right-4 z-50 px-3 py-2 bg-[#0B0C0E] text-white border border-neutral-800 shadow-2xl hover:bg-black transition-all flex items-center gap-2 text-[11px] uppercase tracking-wider font-mono rounded-xs cursor-pointer"
        title="Open LUMÉRA Demo Controller"
      >
        <Sliders className="w-3.5 h-3.5 text-[#C5A265]" />
        <span>Switch Views</span>
      </button>
    );
  }

  return (
    <aside aria-label="Demo switcher controls" className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 max-w-sm w-auto font-sans select-none">
      <div className="bg-[#0B0C0E]/95 backdrop-blur-md text-white border border-neutral-800 shadow-2xl p-1 transition-all duration-300 rounded-sm">
        
        {/* Compact Dock Bar */}
        <div className="flex items-center gap-2 sm:gap-3 px-3 py-2">
          {/* Label */}
          <div className="flex flex-col text-left">
            <span className="text-[9px] uppercase tracking-[0.2em] text-[#C5A265] font-mono leading-none">
              {isAdminRoute ? 'Admin Console' : 'Storefront Mode'}
            </span>
            <span className="text-xs font-medium tracking-wide text-white leading-tight mt-0.5">
              {isAdminRoute ? 'LUMÉRA Admin' : 'LUMÉRA Storefront'}
            </span>
          </div>

          <div className="h-6 w-px bg-neutral-800 mx-1" />

          {/* Primary View Switch Button */}
          {isAdminRoute ? (
            <button
              type="button"
              onClick={() => navigate('/')}
              className="px-3 py-1.5 bg-white text-[#0B0C0E] hover:bg-neutral-100 text-[11px] uppercase tracking-wider font-semibold transition-all flex items-center gap-1.5 shadow-xs cursor-pointer rounded-xs"
            >
              <Store className="w-3.5 h-3.5" />
              <span>Storefront</span>
            </button>
          ) : (
            <button
              type="button"
              onClick={() => navigate('/admin')}
              className="px-3 py-1.5 bg-[#C5A265] text-[#0B0C0E] hover:bg-[#D4B276] text-[11px] uppercase tracking-wider font-semibold transition-all flex items-center gap-1.5 shadow-xs cursor-pointer rounded-xs"
            >
              <Sliders className="w-3.5 h-3.5" />
              <span>Admin Panel</span>
            </button>
          )}

          {/* Expand Details Toggle */}
          <button
            type="button"
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-1.5 text-neutral-400 hover:text-white transition-colors cursor-pointer"
            aria-label="Toggle details"
            title="Toggle Demo Details"
          >
            {isExpanded ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronUp className="w-3.5 h-3.5" />}
          </button>

          {/* Minimize / Dismiss */}
          <button
            type="button"
            onClick={() => setIsDismissed(true)}
            className="p-1 text-neutral-500 hover:text-neutral-300 transition-colors cursor-pointer"
            title="Minimize dock"
            aria-label="Minimize dock"
          >
            <X className="w-3 h-3" />
          </button>
        </div>

        {/* Expanded Drawer with Live Stats and Shortcuts */}
        {isExpanded && (
          <div className="border-t border-neutral-800 p-3 mt-1 bg-[#101216] space-y-3 text-xs">
            {/* Quick Live Stats */}
            <div className="grid grid-cols-3 gap-2 text-center py-2 bg-[#171920] border border-neutral-800 p-2 rounded-xs">
              <div>
                <span className="block text-[9px] uppercase tracking-wider text-neutral-400 font-mono">Catalog</span>
                <span className="font-mono text-xs font-semibold text-white tabular-nums">{products.length} Items</span>
              </div>
              <div>
                <span className="block text-[9px] uppercase tracking-wider text-neutral-400 font-mono">Orders</span>
                <span className="font-mono text-xs font-semibold text-emerald-400 tabular-nums">{orders.length} Total</span>
              </div>
              <div>
                <span className="block text-[9px] uppercase tracking-wider text-neutral-400 font-mono">Revenue</span>
                <span className="font-mono text-xs font-semibold text-[#C5A265] tabular-nums">{formatPrice(totalGMV)}</span>
              </div>
            </div>

            {/* Direct Admin Links */}
            <div className="space-y-1">
              <span className="text-[9.5px] uppercase tracking-[0.2em] text-neutral-400 font-mono block mb-1">
                Direct Navigation
              </span>
              <div className="grid grid-cols-2 gap-1.5">
                <Link
                  to="/admin/products"
                  className="flex items-center gap-1.5 px-2.5 py-1.5 bg-[#171920] hover:bg-neutral-800 text-neutral-200 text-[10.5px] uppercase tracking-wider transition-colors rounded-xs"
                >
                  <Package className="w-3 h-3 text-[#C5A265]" />
                  <span>Products ({products.length})</span>
                </Link>
                <Link
                  to="/admin/orders"
                  className="flex items-center gap-1.5 px-2.5 py-1.5 bg-[#171920] hover:bg-neutral-800 text-neutral-200 text-[10.5px] uppercase tracking-wider transition-colors rounded-xs"
                >
                  <ShoppingBag className="w-3 h-3 text-[#C5A265]" />
                  <span>Orders ({orders.length})</span>
                </Link>
                <Link
                  to="/admin/inventory"
                  className="flex items-center gap-1.5 px-2.5 py-1.5 bg-[#171920] hover:bg-neutral-800 text-neutral-200 text-[10.5px] uppercase tracking-wider transition-colors rounded-xs"
                >
                  <Sliders className="w-3 h-3 text-[#C5A265]" />
                  <span>Inventory</span>
                </Link>
                <Link
                  to="/admin/analytics"
                  className="flex items-center gap-1.5 px-2.5 py-1.5 bg-[#171920] hover:bg-neutral-800 text-neutral-200 text-[10.5px] uppercase tracking-wider transition-colors rounded-xs"
                >
                  <TrendingUp className="w-3 h-3 text-[#C5A265]" />
                  <span>Analytics</span>
                </Link>
                <Link
                  to="/admin/coupons"
                  className="flex items-center gap-1.5 px-2.5 py-1.5 bg-[#171920] hover:bg-neutral-800 text-neutral-200 text-[10.5px] uppercase tracking-wider transition-colors rounded-xs"
                >
                  <Tag className="w-3 h-3 text-[#C5A265]" />
                  <span>Coupons</span>
                </Link>
                <Link
                  to="/admin/customers"
                  className="flex items-center gap-1.5 px-2.5 py-1.5 bg-[#171920] hover:bg-neutral-800 text-neutral-200 text-[10.5px] uppercase tracking-wider transition-colors rounded-xs"
                >
                  <Users className="w-3 h-3 text-[#C5A265]" />
                  <span>Customers</span>
                </Link>
              </div>
            </div>

            {/* Quick action: Cart filler */}
            <div className="pt-2 border-t border-neutral-800 flex items-center justify-between">
              <button
                type="button"
                onClick={handleQuickDemoCart}
                className="text-[10px] uppercase tracking-wider text-neutral-300 hover:text-white flex items-center gap-1 font-mono cursor-pointer"
              >
                <Zap className="w-3 h-3 text-[#C5A265]" />
                <span>+ Load Sample Cart</span>
              </button>
              <span className="text-[9.5px] font-mono text-neutral-400">
                Code: <strong className="text-white">LUMERA10</strong>
              </span>
            </div>
          </div>
        )}

      </div>
    </aside>
  );
}
