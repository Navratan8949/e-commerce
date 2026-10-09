import React, { useState } from 'react';
import {
  Tag,
  Plus,
  Trash2,
  CheckCircle2,
  Calendar,
  Percent,
  Layers,
  Sparkles
} from 'lucide-react';
import { useToast } from '../../context/ToastContext.jsx';
import { storage } from '../../lib/storage.js';
import { formatPrice } from '../../lib/utils.js';

const INITIAL_COUPONS = [
  {
    id: 'c-1',
    code: 'LUMERA10',
    type: 'Percentage',
    discount: 10,
    minOrder: 2999,
    maxDiscount: 1500,
    usageCount: 84,
    usageLimit: 500,
    expiry: 'Dec 31, 2026',
    status: 'Active'
  },
  {
    id: 'c-2',
    code: 'ATELIER15',
    type: 'Percentage',
    discount: 15,
    minOrder: 4999,
    maxDiscount: 2500,
    usageCount: 38,
    usageLimit: 200,
    expiry: 'Nov 15, 2026',
    status: 'Active'
  },
  {
    id: 'c-3',
    code: 'WELCOME500',
    type: 'Fixed Amount',
    discount: 500,
    minOrder: 3500,
    maxDiscount: 500,
    usageCount: 142,
    usageLimit: 1000,
    expiry: 'Jan 01, 2027',
    status: 'Active'
  },
  {
    id: 'c-4',
    code: 'DIWALI20',
    type: 'Percentage',
    discount: 20,
    minOrder: 7999,
    maxDiscount: 4000,
    usageCount: 0,
    usageLimit: 150,
    expiry: 'Oct 31, 2026',
    status: 'Scheduled'
  }
];

export default function AdminCoupons() {
  const { showToast } = useToast();

  const [coupons, setCoupons] = useState(() => {
    return storage.get('lumera_admin_coupons', INITIAL_COUPONS);
  });

  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({
    code: '',
    type: 'Percentage',
    discount: 10,
    minOrder: 2999,
    maxDiscount: 1500,
    usageLimit: 250,
    expiry: 'Dec 31, 2026',
    status: 'Active'
  });

  const activeCount = coupons.filter((c) => c.status === 'Active').length;
  const totalRedemptions = coupons.reduce((sum, c) => sum + (c.usageCount || 0), 0);
  const totalDiscountGiven = 248600;

  const handleSaveCoupon = () => {
    if (!form.code.trim()) {
      showToast('Please enter a coupon code', 'error');
      return;
    }

    const newCoupon = {
      id: `c-${Date.now()}`,
      ...form,
      code: form.code.trim().toUpperCase(),
      usageCount: 0
    };

    const updated = [newCoupon, ...coupons];
    setCoupons(updated);
    storage.set('lumera_admin_coupons', updated);
    showToast(`Created promotion code "${newCoupon.code}"`, 'success');
    setShowModal(false);
  };

  const handleDeleteCoupon = (id) => {
    const updated = coupons.filter((c) => c.id !== id);
    setCoupons(updated);
    storage.set('lumera_admin_coupons', updated);
    showToast('Promotion code archived', 'info');
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-[#E6E6EA]">
        <div>
          <span className="text-[10px] uppercase font-mono tracking-[0.22em] text-[#9A7B4F] font-semibold">
            PROMOTIONS &amp; VIP OFFERS
          </span>
          <h1 className="font-serif-luxury text-3xl sm:text-4xl text-neutral-900 font-light tracking-tight">
            Coupons
          </h1>
          <p className="text-xs text-neutral-500 mt-0.5">
            Manage redemption codes, percentage incentives, threshold limits, and campaign expirations.
          </p>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="inline-flex items-center gap-1.5 px-4 py-2 bg-neutral-900 hover:bg-black text-white text-xs font-semibold rounded-md transition-colors shadow-xs cursor-pointer"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>+ Create Coupon</span>
        </button>
      </div>

      {/* 3 Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="bg-white border border-[#E6E6EA] p-4 rounded-md shadow-xs">
          <span className="text-[10px] uppercase font-mono tracking-wider text-emerald-700">Active Coupons</span>
          <p className="font-mono text-2xl font-bold text-neutral-900 mt-1 tabular-nums">{activeCount}</p>
        </div>
        <div className="bg-white border border-[#E6E6EA] p-4 rounded-md shadow-xs">
          <span className="text-[10px] uppercase font-mono tracking-wider text-neutral-400">Total Redemptions</span>
          <p className="font-mono text-2xl font-bold text-neutral-900 mt-1 tabular-nums">{totalRedemptions} uses</p>
        </div>
        <div className="bg-white border border-[#E6E6EA] p-4 rounded-md shadow-xs">
          <span className="text-[10px] uppercase font-mono tracking-wider text-[#9A7B4F]">Discount Given</span>
          <p className="font-mono text-2xl font-bold text-neutral-900 mt-1 tabular-nums">{formatPrice(totalDiscountGiven)}</p>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white border border-[#E6E6EA] rounded-md shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-[#E6E6EA] bg-[#FBFBFC] text-neutral-500 font-mono uppercase text-[10px] tracking-wider">
                <th className="py-3 px-4">Coupon Code</th>
                <th className="py-3 px-4">Discount Value</th>
                <th className="py-3 px-4">Type</th>
                <th className="py-3 px-4">Usage / Limit</th>
                <th className="py-3 px-4">Min. Order</th>
                <th className="py-3 px-4">Expiry Date</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100">
              {coupons.map((c) => (
                <tr key={c.id} className="hover:bg-neutral-50 transition-colors">
                  <td className="py-3.5 px-4 font-mono font-bold text-neutral-900">
                    <span className="bg-neutral-100 px-2 py-1 rounded-xs border border-neutral-200">
                      {c.code}
                    </span>
                  </td>

                  <td className="py-3.5 px-4 font-mono font-medium text-neutral-900 tabular-nums">
                    {c.type === 'Percentage' ? `${c.discount}% OFF` : `₹${c.discount} OFF`}
                  </td>

                  <td className="py-3.5 px-4 text-neutral-600">
                    {c.type}
                  </td>

                  <td className="py-3.5 px-4 font-mono text-neutral-600 tabular-nums">
                    {c.usageCount} / {c.usageLimit}
                  </td>

                  <td className="py-3.5 px-4 font-mono text-neutral-500 tabular-nums">
                    {formatPrice(c.minOrder)}
                  </td>

                  <td className="py-3.5 px-4 text-neutral-500 whitespace-nowrap">
                    {c.expiry}
                  </td>

                  <td className="py-3.5 px-4">
                    <span
                      className={`inline-block px-2 py-0.5 text-[10px] font-mono uppercase rounded-xs border ${
                        c.status === 'Active'
                          ? 'bg-emerald-50 text-emerald-800 border-emerald-200/80'
                          : 'bg-amber-50 text-amber-800 border-amber-200/80'
                      }`}
                    >
                      {c.status}
                    </span>
                  </td>

                  <td className="py-3.5 px-4 text-right">
                    <button
                      onClick={() => handleDeleteCoupon(c.id)}
                      className="p-1.5 text-rose-600 hover:bg-rose-50 rounded-xs transition-colors cursor-pointer"
                      title="Archive coupon"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Create Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <div className="bg-white max-w-md w-full p-6 rounded-md shadow-2xl border border-neutral-200 space-y-4">
            <h3 className="font-serif-luxury text-xl text-neutral-900 font-medium">
              Create Promotional Code
            </h3>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block text-neutral-600 mb-1 font-medium">Coupon Code</label>
                <input
                  type="text"
                  placeholder="e.g. SUMMER2026"
                  value={form.code}
                  onChange={(e) => setForm({ ...form, code: e.target.value })}
                  className="w-full bg-neutral-50 border border-neutral-200 rounded-md p-2 text-neutral-900 font-mono uppercase focus:bg-white focus:outline-hidden"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-neutral-600 mb-1 font-medium">Discount Type</label>
                  <select
                    value={form.type}
                    onChange={(e) => setForm({ ...form, type: e.target.value })}
                    className="w-full bg-neutral-50 border border-neutral-200 rounded-md p-2 text-neutral-900 focus:outline-hidden"
                  >
                    <option value="Percentage">Percentage (%)</option>
                    <option value="Fixed Amount">Fixed Amount (₹)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-neutral-600 mb-1 font-medium">Discount Value</label>
                  <input
                    type="number"
                    value={form.discount}
                    onChange={(e) => setForm({ ...form, discount: Number(e.target.value) })}
                    className="w-full bg-neutral-50 border border-neutral-200 rounded-md p-2 text-neutral-900 font-mono focus:bg-white focus:outline-hidden"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-neutral-600 mb-1 font-medium">Min. Order Value (₹)</label>
                  <input
                    type="number"
                    value={form.minOrder}
                    onChange={(e) => setForm({ ...form, minOrder: Number(e.target.value) })}
                    className="w-full bg-neutral-50 border border-neutral-200 rounded-md p-2 text-neutral-900 font-mono focus:bg-white focus:outline-hidden"
                  />
                </div>
                <div>
                  <label className="block text-neutral-600 mb-1 font-medium">Max Limit (Uses)</label>
                  <input
                    type="number"
                    value={form.usageLimit}
                    onChange={(e) => setForm({ ...form, usageLimit: Number(e.target.value) })}
                    className="w-full bg-neutral-50 border border-neutral-200 rounded-md p-2 text-neutral-900 font-mono focus:bg-white focus:outline-hidden"
                  />
                </div>
              </div>

              <div>
                <label className="block text-neutral-600 mb-1 font-medium">Expiry Date</label>
                <input
                  type="text"
                  value={form.expiry}
                  onChange={(e) => setForm({ ...form, expiry: e.target.value })}
                  className="w-full bg-neutral-50 border border-neutral-200 rounded-md p-2 text-neutral-900 font-mono focus:bg-white focus:outline-hidden"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2.5 pt-2">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 border border-neutral-300 rounded-md text-xs font-medium text-neutral-600 hover:bg-neutral-50 cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveCoupon}
                className="px-4 py-2 bg-neutral-900 hover:bg-black text-white rounded-md text-xs font-semibold cursor-pointer"
              >
                Create Coupon
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
