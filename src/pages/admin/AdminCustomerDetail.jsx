import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  ArrowLeft,
  Mail,
  Phone,
  MapPin,
  Calendar,
  ShoppingBag,
  Heart,
  Clock,
  Sparkles,
  CreditCard,
  User,
  ExternalLink
} from 'lucide-react';
import { initialCustomers } from '../../data/adminMockData.js';
import { formatPrice } from '../../lib/utils.js';

export default function AdminCustomerDetail() {
  const { id } = useParams();
  const customer = initialCustomers.find((c) => c.id === id) || initialCustomers[0];

  const [activeTab, setActiveTab] = useState('Overview');

  const avgOrderValue =
    customer.ordersCount > 0 ? Math.round(customer.totalSpent / customer.ordersCount) : 0;

  return (
    <div className="max-w-5xl mx-auto space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#E8E6E1]">
        <div>
          <Link
            to="/admin/customers"
            className="inline-flex items-center gap-1.5 text-xs text-[#8C7A6B] hover:text-[#191919] font-medium mb-1.5 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Customers</span>
          </Link>
          <div className="flex items-center gap-3">
            <h1 className="font-serif-luxury text-2xl sm:text-3xl text-[#191919] font-light">
              {customer.name}
            </h1>
            <span className="text-xs font-mono px-2 py-0.5 rounded-full bg-[#FAF8F5] text-[#8C7A6B] border border-[#DCD7CD] font-semibold">
              {customer.status} Patron
            </span>
          </div>
          <p className="text-xs text-[#7A756D] mt-0.5">
            Member since {customer.joined} · {customer.city}, India
          </p>
        </div>

        <div className="flex items-center gap-2">
          <a
            href={`mailto:${customer.email}`}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white hover:bg-[#F4F1EA] text-[#191919] border border-[#DDD8CE] text-xs font-medium rounded-md transition-colors"
          >
            <Mail className="w-3.5 h-3.5" />
            <span>Email Client</span>
          </a>
        </div>
      </div>

      {/* 4 Quick Stat Metric Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="bg-white border border-[#E8E6E1] p-3.5 rounded-lg shadow-xs">
          <span className="text-[10px] uppercase font-mono tracking-wider text-[#7A756D]">
            Lifetime Spend
          </span>
          <p className="font-mono text-xl font-semibold text-[#191919] mt-0.5">
            {formatPrice(customer.totalSpent)}
          </p>
        </div>
        <div className="bg-white border border-[#E8E6E1] p-3.5 rounded-lg shadow-xs">
          <span className="text-[10px] uppercase font-mono tracking-wider text-[#7A756D]">
            Total Orders
          </span>
          <p className="font-mono text-xl font-semibold text-[#191919] mt-0.5">
            {customer.ordersCount}
          </p>
        </div>
        <div className="bg-white border border-[#E8E6E1] p-3.5 rounded-lg shadow-xs">
          <span className="text-[10px] uppercase font-mono tracking-wider text-[#7A756D]">
            Average Order Value
          </span>
          <p className="font-mono text-xl font-semibold text-[#191919] mt-0.5">
            {formatPrice(avgOrderValue)}
          </p>
        </div>
        <div className="bg-white border border-[#E8E6E1] p-3.5 rounded-lg shadow-xs">
          <span className="text-[10px] uppercase font-mono tracking-wider text-[#7A756D]">
            Last Order
          </span>
          <p className="font-mono text-base font-semibold text-[#191919] mt-0.5">
            {customer.lastOrder}
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-[#E8E6E1] flex items-center gap-6 text-xs font-medium">
        {['Overview', 'Orders', 'Wishlist', 'Activity'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`pb-3 transition-colors relative ${
              activeTab === tab
                ? 'text-[#191919] font-semibold border-b-2 border-[#191919]'
                : 'text-[#7A756D] hover:text-[#191919]'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Tab: Overview */}
      {activeTab === 'Overview' && (
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          <div className="md:col-span-4 bg-white border border-[#E8E6E1] p-5 rounded-lg shadow-xs space-y-4">
            <div className="text-center pb-4 border-b border-[#F0ECE4]">
              <img
                src={customer.avatar}
                alt={customer.name}
                className="w-20 h-20 rounded-full mx-auto object-cover border-2 border-[#E5E0D8] mb-2"
              />
              <h3 className="font-medium text-sm text-[#191919]">{customer.name}</h3>
              <p className="text-xs text-[#7A756D]">{customer.email}</p>
            </div>

            <div className="space-y-3 text-xs text-[#4A4742]">
              <div>
                <span className="text-[#8C7A6B] font-mono text-[10px] uppercase block">Phone:</span>
                <span className="font-mono">{customer.phone}</span>
              </div>
              <div>
                <span className="text-[#8C7A6B] font-mono text-[10px] uppercase block">Shipping Address:</span>
                <span>{customer.address}</span>
              </div>
              <div>
                <span className="text-[#8C7A6B] font-mono text-[10px] uppercase block">Patron Preferences:</span>
                <span>{customer.notes}</span>
              </div>
            </div>
          </div>

          <div className="md:col-span-8 bg-white border border-[#E8E6E1] p-6 rounded-lg shadow-xs space-y-4">
            <h3 className="font-serif-luxury text-lg text-[#191919]">Patron Relationship Summary</h3>
            <p className="text-xs text-[#6E6961] leading-relaxed">
              This client is enrolled in LUMÉRA Private Atelier salon service. Has a zero-return rate across all 4 past orders. Prefers natural dyes, unbleached linens, and tailored suits.
            </p>

            <div className="pt-4 border-t border-[#F2EFE9] space-y-3">
              <h4 className="text-xs font-mono uppercase tracking-wider text-[#8C7A6B]">
                Recent Transactions
              </h4>
              <div className="divide-y divide-[#F2EFE9] text-xs">
                <div className="py-2.5 flex justify-between items-center">
                  <div>
                    <span className="font-mono font-medium text-[#191919]">#LUM-2026-94812</span>
                    <span className="text-[#7A756D] ml-2">2 pieces · Linen Shirt + Leather Tote</span>
                  </div>
                  <span className="font-mono font-semibold text-[#191919]">₹10,348</span>
                </div>
                <div className="py-2.5 flex justify-between items-center">
                  <div>
                    <span className="font-mono font-medium text-[#191919]">#LUM-2026-83190</span>
                    <span className="text-[#7A756D] ml-2">1 piece · Satin Slip Dress</span>
                  </div>
                  <span className="font-mono font-semibold text-[#191919]">₹4,999</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab: Orders */}
      {activeTab === 'Orders' && (
        <div className="bg-white border border-[#E8E6E1] p-6 rounded-lg shadow-xs space-y-4">
          <h3 className="font-serif-luxury text-lg text-[#191919]">Client Order History</h3>
          <div className="overflow-x-auto text-xs">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-[#E8E6E1] text-[#7A756D] font-mono uppercase text-[10px]">
                  <th className="py-2 px-3">Order ID</th>
                  <th className="py-2 px-3">Date</th>
                  <th className="py-2 px-3">Amount</th>
                  <th className="py-2 px-3">Status</th>
                  <th className="py-2 px-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#F2EFE9]">
                <tr>
                  <td className="py-3 px-3 font-mono font-medium text-[#191919]">#LUM-2026-94812</td>
                  <td className="py-3 px-3 text-[#7A756D]">March 28, 2026</td>
                  <td className="py-3 px-3 font-mono">₹10,348</td>
                  <td className="py-3 px-3">
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-[#EFF6FF] text-[#1E40AF]">
                      Shipped
                    </span>
                  </td>
                  <td className="py-3 px-3 text-right">
                    <Link to="/admin/orders" className="text-[#8C7A6B] hover:underline">
                      View
                    </Link>
                  </td>
                </tr>
                <tr>
                  <td className="py-3 px-3 font-mono font-medium text-[#191919]">#LUM-2026-83190</td>
                  <td className="py-3 px-3 text-[#7A756D]">February 14, 2026</td>
                  <td className="py-3 px-3 font-mono">₹4,999</td>
                  <td className="py-3 px-3">
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-[#F0FDF4] text-[#166534]">
                      Delivered
                    </span>
                  </td>
                  <td className="py-3 px-3 text-right">
                    <Link to="/admin/orders" className="text-[#8C7A6B] hover:underline">
                      View
                    </Link>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab: Wishlist */}
      {activeTab === 'Wishlist' && (
        <div className="bg-white border border-[#E8E6E1] p-6 rounded-lg shadow-xs space-y-4">
          <h3 className="font-serif-luxury text-lg text-[#191919]">Saved Curations &amp; Wishlist</h3>
          <p className="text-xs text-[#7A756D]">3 items currently bookmarked in client wardrobe.</p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
            <div className="p-3 border border-[#EAE6DD] rounded-md flex items-center gap-3">
              <img
                src="https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=150&q=80"
                alt=""
                className="w-12 h-12 object-cover rounded-xs"
              />
              <div className="text-xs">
                <p className="font-medium text-[#191919]">Leather Tote</p>
                <p className="font-mono text-[#7A756D]">₹7,999</p>
              </div>
            </div>
            <div className="p-3 border border-[#EAE6DD] rounded-md flex items-center gap-3">
              <img
                src="https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=150&q=80"
                alt=""
                className="w-12 h-12 object-cover rounded-xs"
              />
              <div className="text-xs">
                <p className="font-medium text-[#191919]">Hopsack Blazer</p>
                <p className="font-mono text-[#7A756D]">₹8,999</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab: Activity */}
      {activeTab === 'Activity' && (
        <div className="bg-white border border-[#E8E6E1] p-6 rounded-lg shadow-xs space-y-3">
          <h3 className="font-serif-luxury text-lg text-[#191919]">Audit Log &amp; Activity</h3>
          <div className="space-y-3 text-xs text-[#4A4742] pt-2">
            <div className="flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-[#3E8E41]" />
              <span className="font-mono text-[#8C7A6B]">Oct 06, 2026 14:22</span>
              <span>Browsed Autumn / Winter capsule on mobile device</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-[#191919]" />
              <span className="font-mono text-[#8C7A6B]">Sep 28, 2026 11:05</span>
              <span>Completed order #LUM-2026-94812 using UPI</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-[#8C7A6B]" />
              <span className="font-mono text-[#8C7A6B]">Jan 15, 2025</span>
              <span>Joined LUMÉRA Atelier Private Patron program</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
