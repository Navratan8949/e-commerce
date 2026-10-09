import React, { useState } from 'react';
import {
  Settings,
  Store,
  Bell,
  User,
  ShieldCheck,
  Check,
  Sparkles
} from 'lucide-react';
import { useToast } from '../../context/ToastContext.jsx';
import { storage } from '../../lib/storage.js';

export default function AdminSettings() {
  const { showToast } = useToast();

  const [activeTab, setActiveTab] = useState('General');

  const [general, setGeneral] = useState({
    storeName: 'FILLKART Atelier',
    supportEmail: 'concierge@fillkart.com',
    currency: 'INR (₹)',
    timezone: 'Asia/Kolkata (IST +5:30)'
  });

  const [store, setStore] = useState({
    freeShippingThreshold: 2999,
    standardShippingFee: 250,
    returnWindowDays: 7,
    gstRate: 18
  });

  const [notifs, setNotifs] = useState({
    emailOnNewOrder: true,
    emailOnLowStock: true,
    lowStockAlertThreshold: 5,
    customerReviewAlerts: true
  });

  const [profile, setProfile] = useState({
    adminName: 'Super Admin',
    email: 'admin@fillkart.com',
    role: 'Owner & Atelier Director',
    phone: '+91 98200 00001'
  });

  const handleSave = () => {
    showToast('Settings saved successfully', 'success');
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-[#E8E6E1]">
        <div>
          <span className="text-[10px] uppercase font-mono tracking-[0.25em] text-[#8C7A6B] font-semibold">
            SYSTEM PREFERENCES
          </span>
          <h1 className="font-serif-luxury text-3xl sm:text-4xl text-[#191919] font-light tracking-tight">
            Settings
          </h1>
          <p className="text-xs text-[#6E6961] mt-0.5">
            Configure store metadata, shipping thresholds, tax rates, and administrative credentials.
          </p>
        </div>

        <button
          onClick={handleSave}
          className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#191919] hover:bg-black text-white text-xs font-semibold rounded-md transition-colors shadow-xs"
        >
          <Check className="w-3.5 h-3.5" />
          <span>Save Changes</span>
        </button>
      </div>

      {/* Tabs */}
      <div className="border-b border-[#E8E6E1] flex items-center gap-6 text-xs font-medium">
        {['General', 'Store', 'Notifications', 'Profile'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`pb-3 transition-colors relative ${
              activeTab === tab
                ? 'text-[#191919] font-semibold border-b-2 border-[#191919]'
                : 'text-[#7A756D] hover:text-[#191919]'
            }`}
          >
            {tab} Settings
          </button>
        ))}
      </div>

      {/* General Settings */}
      {activeTab === 'General' && (
        <div className="bg-white border border-[#E8E6E1] p-6 rounded-lg shadow-xs space-y-4">
          <h2 className="font-serif-luxury text-lg text-[#191919] pb-2 border-b border-[#F0ECE4]">
            Storefront Identity &amp; Region
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="text-[#4A4742] font-medium block mb-1">Brand Name</label>
              <input
                type="text"
                value={general.storeName}
                onChange={(e) => setGeneral({ ...general, storeName: e.target.value })}
                className="w-full bg-[#F8F7F4] border border-[#E2DED6] rounded-md p-2 text-[#191919]"
              />
            </div>
            <div>
              <label className="text-[#4A4742] font-medium block mb-1">Concierge Email</label>
              <input
                type="email"
                value={general.supportEmail}
                onChange={(e) => setGeneral({ ...general, supportEmail: e.target.value })}
                className="w-full bg-[#F8F7F4] border border-[#E2DED6] rounded-md p-2 text-[#191919]"
              />
            </div>
            <div>
              <label className="text-[#4A4742] font-medium block mb-1">Base Currency</label>
              <input
                type="text"
                disabled
                value={general.currency}
                className="w-full bg-[#F2EFE9] border border-[#DDD8CE] rounded-md p-2 text-[#777]"
              />
            </div>
            <div>
              <label className="text-[#4A4742] font-medium block mb-1">Timezone</label>
              <input
                type="text"
                disabled
                value={general.timezone}
                className="w-full bg-[#F2EFE9] border border-[#DDD8CE] rounded-md p-2 text-[#777]"
              />
            </div>
          </div>
        </div>
      )}

      {/* Store Settings */}
      {activeTab === 'Store' && (
        <div className="bg-white border border-[#E8E6E1] p-6 rounded-lg shadow-xs space-y-4">
          <h2 className="font-serif-luxury text-lg text-[#191919] pb-2 border-b border-[#F0ECE4]">
            Fulfillment Policies &amp; Taxes
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="text-[#4A4742] font-medium block mb-1">
                Complimentary Shipping Threshold (₹)
              </label>
              <input
                type="number"
                value={store.freeShippingThreshold}
                onChange={(e) =>
                  setStore({ ...store, freeShippingThreshold: Number(e.target.value) })
                }
                className="w-full bg-[#F8F7F4] border border-[#E2DED6] rounded-md p-2 text-[#191919] font-mono"
              />
            </div>
            <div>
              <label className="text-[#4A4742] font-medium block mb-1">
                Standard Shipping Fee (₹)
              </label>
              <input
                type="number"
                value={store.standardShippingFee}
                onChange={(e) =>
                  setStore({ ...store, standardShippingFee: Number(e.target.value) })
                }
                className="w-full bg-[#F8F7F4] border border-[#E2DED6] rounded-md p-2 text-[#191919] font-mono"
              />
            </div>
            <div>
              <label className="text-[#4A4742] font-medium block mb-1">Return Window (Days)</label>
              <input
                type="number"
                value={store.returnWindowDays}
                onChange={(e) =>
                  setStore({ ...store, returnWindowDays: Number(e.target.value) })
                }
                className="w-full bg-[#F8F7F4] border border-[#E2DED6] rounded-md p-2 text-[#191919] font-mono"
              />
            </div>
            <div>
              <label className="text-[#4A4742] font-medium block mb-1">Included GST Rate (%)</label>
              <input
                type="number"
                value={store.gstRate}
                onChange={(e) => setStore({ ...store, gstRate: Number(e.target.value) })}
                className="w-full bg-[#F8F7F4] border border-[#E2DED6] rounded-md p-2 text-[#191919] font-mono"
              />
            </div>
          </div>
        </div>
      )}

      {/* Notifications */}
      {activeTab === 'Notifications' && (
        <div className="bg-white border border-[#E8E6E1] p-6 rounded-lg shadow-xs space-y-4">
          <h2 className="font-serif-luxury text-lg text-[#191919] pb-2 border-b border-[#F0ECE4]">
            Alerts &amp; Warehouse Dispatch Notifications
          </h2>
          <div className="space-y-3 text-xs">
            <label className="flex items-center gap-3 p-3 bg-[#FAF9F5] rounded-md border border-[#EAE6DD] cursor-pointer">
              <input
                type="checkbox"
                checked={notifs.emailOnNewOrder}
                onChange={(e) => setNotifs({ ...notifs, emailOnNewOrder: e.target.checked })}
                className="accent-[#191919]"
              />
              <div>
                <p className="font-medium text-[#191919]">Instant Order Email Notifications</p>
                <p className="text-[11px] text-[#7A756D]">Send immediate alert upon customer checkout</p>
              </div>
            </label>
            <label className="flex items-center gap-3 p-3 bg-[#FAF9F5] rounded-md border border-[#EAE6DD] cursor-pointer">
              <input
                type="checkbox"
                checked={notifs.emailOnLowStock}
                onChange={(e) => setNotifs({ ...notifs, emailOnLowStock: e.target.checked })}
                className="accent-[#191919]"
              />
              <div>
                <p className="font-medium text-[#191919]">Automated Low-Stock Trigger</p>
                <p className="text-[11px] text-[#7A756D]">Notify atelier team when SKU count reaches threshold</p>
              </div>
            </label>
          </div>
        </div>
      )}

      {/* Profile */}
      {activeTab === 'Profile' && (
        <div className="bg-white border border-[#E8E6E1] p-6 rounded-lg shadow-xs space-y-4">
          <h2 className="font-serif-luxury text-lg text-[#191919] pb-2 border-b border-[#F0ECE4]">
            Super Admin Profile
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="text-[#4A4742] font-medium block mb-1">Display Name</label>
              <input
                type="text"
                value={profile.adminName}
                onChange={(e) => setProfile({ ...profile, adminName: e.target.value })}
                className="w-full bg-[#F8F7F4] border border-[#E2DED6] rounded-md p-2 text-[#191919]"
              />
            </div>
            <div>
              <label className="text-[#4A4742] font-medium block mb-1">Email</label>
              <input
                type="email"
                value={profile.email}
                onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                className="w-full bg-[#F8F7F4] border border-[#E2DED6] rounded-md p-2 text-[#191919]"
              />
            </div>
            <div>
              <label className="text-[#4A4742] font-medium block mb-1">Role &amp; Permissions</label>
              <input
                type="text"
                disabled
                value={profile.role}
                className="w-full bg-[#F2EFE9] border border-[#DDD8CE] rounded-md p-2 text-[#777]"
              />
            </div>
            <div>
              <label className="text-[#4A4742] font-medium block mb-1">Direct Phone</label>
              <input
                type="text"
                value={profile.phone}
                onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                className="w-full bg-[#F8F7F4] border border-[#E2DED6] rounded-md p-2 text-[#191919]"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
