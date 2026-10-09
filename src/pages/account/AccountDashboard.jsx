import React from 'react';
import { Link } from 'react-router-dom';
import { Package, Heart, Clock, CheckCircle2, ArrowRight } from 'lucide-react';
import { useAuth } from '../../context/AuthContext.jsx';
import { useWishlist } from '../../context/WishlistContext.jsx';
import { formatPrice } from '../../lib/utils.js';
import ImageWithFallback from '../../components/common/ImageWithFallback.jsx';

export default function AccountDashboard() {
  const { user, orders } = useAuth();
  const { wishlistCount } = useWishlist();

  const totalOrders = orders.length;
  const deliveredOrders = orders.filter((o) => o.status === 'Delivered').length;
  const pendingOrders = totalOrders - deliveredOrders;

  const recentOrders = orders.slice(0, 2);

  return (
    <div className="space-y-10">
      
      {/* 4 Metric Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-[#FAF9F5] border border-[#E8E4DC] p-5 shadow-2xs">
          <div className="flex items-center justify-between text-[#8C857B] mb-2">
            <span className="text-[11px] uppercase tracking-wider">Total Orders</span>
            <Package className="w-4 h-4" />
          </div>
          <div className="font-mono text-2xl font-semibold text-[#191919] tabular-nums">
            {totalOrders}
          </div>
        </div>

        <div className="bg-[#FAF9F5] border border-[#E8E4DC] p-5 shadow-2xs">
          <div className="flex items-center justify-between text-[#8C857B] mb-2">
            <span className="text-[11px] uppercase tracking-wider">Saved Wishlist</span>
            <Heart className="w-4 h-4" />
          </div>
          <div className="font-mono text-2xl font-semibold text-[#191919] tabular-nums">
            {wishlistCount}
          </div>
        </div>

        <div className="bg-[#FAF9F5] border border-[#E8E4DC] p-5 shadow-2xs">
          <div className="flex items-center justify-between text-[#8C857B] mb-2">
            <span className="text-[11px] uppercase tracking-wider">In Transit</span>
            <Clock className="w-4 h-4" />
          </div>
          <div className="font-mono text-2xl font-semibold text-[#191919] tabular-nums">
            {pendingOrders}
          </div>
        </div>

        <div className="bg-[#FAF9F5] border border-[#E8E4DC] p-5 shadow-2xs">
          <div className="flex items-center justify-between text-[#8C857B] mb-2">
            <span className="text-[11px] uppercase tracking-wider">Delivered</span>
            <CheckCircle2 className="w-4 h-4" />
          </div>
          <div className="font-mono text-2xl font-semibold text-[#2C5234] tabular-nums">
            {deliveredOrders}
          </div>
        </div>
      </div>

      {/* Recent Orders Section */}
      <div className="bg-[#FAF9F5] border border-[#E8E4DC] p-6 sm:p-8 space-y-6">
        <div className="flex items-center justify-between border-b border-[#E8E4DC] pb-4">
          <h2 className="font-serif-luxury text-2xl text-[#191919]">
            Recent Acquisitions
          </h2>
          <Link
            to="/account/orders"
            className="text-xs uppercase tracking-wider text-[#191919] hover:underline flex items-center gap-1"
          >
            <span>View All</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {recentOrders.length === 0 ? (
          <p className="text-xs text-[#736C62] py-4">No order history recorded yet.</p>
        ) : (
          <div className="space-y-6 divide-y divide-[#E8E4DC]">
            {recentOrders.map((order) => (
              <div key={order.id} className="pt-6 first:pt-0 space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
                  <div>
                    <span className="font-mono font-semibold text-[#191919] block sm:inline mr-3">
                      {order.id}
                    </span>
                    <span className="text-[#8C857B]">{order.date}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="px-2.5 py-0.5 text-[10px] uppercase tracking-widest font-medium bg-[#F2EFEB] text-[#191919] border border-[#DCD5C9]">
                      {order.status}
                    </span>
                    <span className="font-mono font-medium text-[#191919] tabular-nums">
                      {formatPrice(order.total)}
                    </span>
                  </div>
                </div>

                <div className="flex gap-3 overflow-x-auto pb-2">
                  {order.items?.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs bg-[#F5F2EB] p-2 pr-4 border border-[#E8E4DC] shrink-0">
                      <div className="w-8 h-10 bg-[#E0D9CE] overflow-hidden">
                        <ImageWithFallback
                          src={item.image}
                          alt={item.name}
                          aspectRatio="4/5"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <span className="font-serif-luxury text-sm font-medium text-[#191919] block">
                          {item.name}
                        </span>
                        <span className="text-[10px] text-[#736C62]">
                          Qty: {item.quantity} · {item.size}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Profile Overview Card */}
      <div className="bg-[#FAF9F5] border border-[#E8E4DC] p-6 sm:p-8 space-y-4">
        <div className="flex items-center justify-between border-b border-[#E8E4DC] pb-4">
          <h2 className="font-serif-luxury text-2xl text-[#191919]">
            Client Credentials
          </h2>
          <Link
            to="/account/profile"
            className="text-xs uppercase tracking-wider text-[#191919] hover:underline"
          >
            Update Profile
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-[#555048]">
          <div>
            <span className="text-[10px] uppercase tracking-wider text-[#8C857B] block mb-1">
              Primary Contact
            </span>
            <p className="font-medium text-[#191919]">{user.fullName}</p>
            <p>{user.email}</p>
            <p>{user.phone}</p>
          </div>
          <div>
            <span className="text-[10px] uppercase tracking-wider text-[#8C857B] block mb-1">
              Registered Dispatch Destination
            </span>
            <p>{user.address}</p>
            <p>{user.city}, {user.state} — {user.pincode}</p>
          </div>
        </div>
      </div>

    </div>
  );
}
