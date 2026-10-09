import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Sliders,
  Package,
  ShoppingBag,
  Tag,
  Users,
  ArrowRight,
  TrendingUp,
  CheckCircle2,
  Clock,
  Sparkles,
  ExternalLink,
  ShieldCheck
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext.jsx';
import { useProducts } from '../../context/ProductContext.jsx';
import { formatPrice } from '../../lib/utils.js';

export default function AtelierConsoleShowcase() {
  const [activeTab, setActiveTab] = useState('inventory');
  const { orders } = useAuth();
  const { products } = useProducts();

  const totalGMV = orders.reduce((sum, o) => sum + (o.total || 0), 0);
  const pendingOrders = orders.filter((o) => o.status !== 'Delivered').length;

  return (
    <section className="py-20 lg:py-28 bg-[#161412] text-[#FAF9F5] border-t border-b border-[#2A2724]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-12 border-b border-[#2C2926] pb-6 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 text-[10.5px] uppercase font-mono tracking-[0.25em] text-[#D4AF37] mb-2">
              <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse" />
              <span>THE MERCHANT ATELIER BACKOFFICE</span>
            </div>
            <h2 className="font-serif-luxury text-3xl sm:text-5xl text-white font-light">
              Executive Store Administration
            </h2>
          </div>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <p className="text-xs text-[#A89F91] max-w-md font-light leading-relaxed">
              Every drop is backed by our full-featured merchant console for real-time inventory management, five-stage order fulfillment, and VIP patron clienteling.
            </p>
            <Link
              to="/admin"
              className="inline-flex items-center gap-2 px-5 py-3 bg-[#FAF9F5] text-[#191919] hover:bg-white text-xs uppercase tracking-[0.2em] font-semibold transition-all shadow-md shrink-0 cursor-pointer"
            >
              <span>Launch Admin Console</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* Console Preview Interactive Workspace */}
        <div className="bg-[#1C1A18] border border-[#332E29] shadow-2xl overflow-hidden">
          
          {/* Top Mock Window Bar */}
          <div className="bg-[#24211E] px-4 py-3 border-b border-[#332E29] flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-[#EF4444]/80" />
                <span className="w-3 h-3 rounded-full bg-[#F59E0B]/80" />
                <span className="w-3 h-3 rounded-full bg-[#10B981]/80" />
              </div>
              <span className="font-mono text-xs text-[#A89F91] tracking-wider hidden sm:inline">
                lumera.atelier/admin/console — v2.4 Live
              </span>
            </div>

            {/* Quick KPI pills */}
            <div className="flex items-center gap-3 text-xs font-mono">
              <span className="text-[#A89F91]">GMV: <strong className="text-white">{formatPrice(totalGMV)}</strong></span>
              <span className="text-[#332E29]">|</span>
              <span className="text-[#A89F91]">SKUs: <strong className="text-white">{products.length}</strong></span>
              <span className="text-[#332E29]">|</span>
              <span className="text-[#10B981]">{pendingOrders} Active Orders</span>
            </div>
          </div>

          {/* Interactive Navigation Tabs */}
          <div className="flex border-b border-[#2E2A26] bg-[#1F1C19] overflow-x-auto no-scrollbar">
            {[
              { id: 'inventory', label: 'Inventory & SKUs', icon: Package, count: `${products.length} Active` },
              { id: 'fulfillment', label: 'Order Dispatch Pipeline', icon: ShoppingBag, count: `${orders.length} Logged` },
              { id: 'coupons', label: 'Promotion Engine', icon: Tag, count: '3 Active' },
              { id: 'crm', label: 'VIP Patron Ledger', icon: Users, count: '5 Patrons' }
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-5 py-3.5 text-xs uppercase tracking-wider font-medium whitespace-nowrap transition-colors cursor-pointer border-b-2 ${
                    isActive
                      ? 'border-[#D4AF37] bg-[#282420] text-white'
                      : 'border-transparent text-[#999083] hover:text-white hover:bg-[#23201D]'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-[#D4AF37]' : 'text-[#888]'}`} />
                  <span>{tab.label}</span>
                  <span className="text-[10px] font-mono px-1.5 py-0.5 rounded-xs bg-[#181614] text-[#A89F91]">
                    {tab.count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Tab Content Display */}
          <div className="p-6 sm:p-8">
            {activeTab === 'inventory' && (
              <div className="space-y-6">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                  <div>
                    <h4 className="font-serif-luxury text-xl text-white font-normal">
                      Artisanal Catalog Orchestration
                    </h4>
                    <p className="text-xs text-[#A89F91]">
                      Real-time stock level synchronization, price thresholds, and small-batch inventory warnings.
                    </p>
                  </div>
                  <Link
                    to="/admin/products"
                    className="px-3 py-1.5 bg-[#2E2A25] hover:bg-[#38332D] text-xs uppercase tracking-wider font-mono text-[#D8D2C6] transition-colors flex items-center gap-1.5"
                  >
                    <span>Manage All {products.length} Products</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {products.slice(0, 3).map((item) => (
                    <div key={item.id} className="p-4 bg-[#23201D] border border-[#332E28] space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] uppercase font-mono text-[#A89F91] tracking-wider">{item.category}</span>
                        <span className="text-[10.5px] font-mono px-2 py-0.5 bg-[#181614] text-[#10B981]">
                          Stock: {item.stock || 24}
                        </span>
                      </div>
                      <div className="font-serif-luxury text-base text-white truncate">
                        {item.name}
                      </div>
                      <div className="flex items-center justify-between text-xs pt-1 border-t border-[#2E2A26]">
                        <span className="font-mono text-[#E6D5B8] font-semibold">{formatPrice(item.price)}</span>
                        <span className="text-[10.5px] text-[#A89F91]">{item.subcategory}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'fulfillment' && (
              <div className="space-y-6">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                  <div>
                    <h4 className="font-serif-luxury text-xl text-white font-normal">
                      Five-Stage Order Dispatch Pipeline
                    </h4>
                    <p className="text-xs text-[#A89F91]">
                      Direct status transitions with instant client account timeline synchronization.
                    </p>
                  </div>
                  <Link
                    to="/admin/orders"
                    className="px-3 py-1.5 bg-[#2E2A25] hover:bg-[#38332D] text-xs uppercase tracking-wider font-mono text-[#D8D2C6] transition-colors flex items-center gap-1.5"
                  >
                    <span>Open Live Order Ledger</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>

                <div className="space-y-3">
                  {orders.slice(0, 3).map((order) => (
                    <div key={order.id} className="p-4 bg-[#23201D] border border-[#332E28] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-mono text-xs font-semibold text-white">{order.id}</span>
                          <span className="text-[10px] font-mono px-2 py-0.5 bg-[#181614] text-[#D4AF37] border border-[#D4AF37]/30">
                            {order.status}
                          </span>
                        </div>
                        <div className="text-xs text-[#A89F91]">
                          {order.customer?.fullName || 'Eleanor Vance'} · {order.items?.length || 1} pieces · {order.date}
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="font-mono text-sm font-semibold text-white">{formatPrice(order.total)}</span>
                        <Link
                          to="/admin/orders"
                          className="text-[11px] uppercase tracking-wider text-[#D4AF37] hover:underline"
                        >
                          Update Status ➔
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'coupons' && (
              <div className="space-y-6">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                  <div>
                    <h4 className="font-serif-luxury text-xl text-white font-normal">
                      Campaign Privileges & Coupon Rules
                    </h4>
                    <p className="text-xs text-[#A89F91]">
                      Dynamic voucher validation verified instantly at client checkout.
                    </p>
                  </div>
                  <Link
                    to="/admin/coupons"
                    className="px-3 py-1.5 bg-[#2E2A25] hover:bg-[#38332D] text-xs uppercase tracking-wider font-mono text-[#D8D2C6] transition-colors flex items-center gap-1.5"
                  >
                    <span>Configure Coupon Codes</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {[
                    { code: 'LUMERA10', discount: '10% Off Orders', desc: 'Valid across entire catalog' },
                    { code: 'WELCOME500', discount: '₹500 Off', desc: 'On orders over ₹3,999' },
                    { code: 'ATELIERVIP', discount: '15% Off Private Salon', desc: 'High-value patron privilege' }
                  ].map((c) => (
                    <div key={c.code} className="p-4 bg-[#23201D] border border-[#332E28] space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-sm font-bold text-[#FAF9F5] tracking-wider">{c.code}</span>
                        <span className="w-2 h-2 rounded-full bg-[#10B981]" />
                      </div>
                      <div className="text-xs text-[#D4AF37] font-semibold">{c.discount}</div>
                      <div className="text-[11px] text-[#888]">{c.desc}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'crm' && (
              <div className="space-y-6">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                  <div>
                    <h4 className="font-serif-luxury text-xl text-white font-normal">
                      Clientele Relations & Patron Lifetime Value
                    </h4>
                    <p className="text-xs text-[#A89F91]">
                      Private patronage tiers, accumulated spend history, and bespoke concierge preferences.
                    </p>
                  </div>
                  <Link
                    to="/admin/customers"
                    className="px-3 py-1.5 bg-[#2E2A25] hover:bg-[#38332D] text-xs uppercase tracking-wider font-mono text-[#D8D2C6] transition-colors flex items-center gap-1.5"
                  >
                    <span>View All Patrons</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {[
                    { name: 'Eleanor Vance', tier: 'Platinum Patron', spend: 38440, orders: 4, city: 'Mumbai' },
                    { name: 'Aanya Sharma', tier: 'Gold Patron', spend: 24990, orders: 3, city: 'New Delhi' },
                    { name: 'Devika Singhania', tier: 'Platinum Patron', spend: 54990, orders: 5, city: 'Kolkata' }
                  ].map((p) => (
                    <div key={p.name} className="p-4 bg-[#23201D] border border-[#332E28] space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-serif-luxury text-base text-white">{p.name}</span>
                        <span className="text-[10px] font-mono px-2 py-0.5 bg-[#181614] text-[#D4AF37]">{p.tier}</span>
                      </div>
                      <div className="text-xs text-[#A89F91]">{p.city} · {p.orders} orders placed</div>
                      <div className="font-mono text-xs text-white font-semibold pt-1 border-t border-[#2E2A26]">
                        Lifetime GMV: {formatPrice(p.spend)}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>

          {/* Bottom Bar with CTA to Open Full Console */}
          <div className="bg-[#181614] px-6 py-4 border-t border-[#332E29] flex flex-col sm:flex-row items-center justify-between gap-4">
            <span className="text-xs text-[#888] font-mono">
              ✦ Ready to experience the administrative side? Switch roles anytime.
            </span>
            <Link
              to="/admin"
              className="w-full sm:w-auto px-6 py-2.5 bg-[#D4AF37] hover:bg-[#E5C158] text-[#141210] text-xs uppercase tracking-[0.2em] font-semibold transition-all flex items-center justify-center gap-2"
            >
              <Sliders className="w-3.5 h-3.5" />
              <span>Enter Atelier Admin Console</span>
            </Link>
          </div>

        </div>

      </div>
    </section>
  );
}
