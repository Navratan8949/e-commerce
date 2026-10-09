import React, { useState } from 'react';
import { Package, ChevronDown, ChevronUp, Check, Clock, Truck, Home } from 'lucide-react';
import { useAuth } from '../../context/AuthContext.jsx';
import { formatPrice } from '../../lib/utils.js';
import ImageWithFallback from '../../components/common/ImageWithFallback.jsx';

const STATUS_STEPS = [
  'Order Placed',
  'Processing',
  'Shipped',
  'Out for Delivery',
  'Delivered'
];

export default function AccountOrders() {
  const { orders } = useAuth();
  const [expandedOrderId, setExpandedOrderId] = useState(orders[0]?.id || null);

  const toggleExpand = (id) => {
    setExpandedOrderId(expandedOrderId === id ? null : id);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-serif-luxury text-2xl sm:text-3xl text-[#191919]">
          Acquisition History & Tracking
        </h2>
        <p className="text-xs text-[#736C62] mt-1 font-light">
          Monitor dispatch progression and archival records of past deliveries.
        </p>
      </div>

      {orders.length === 0 ? (
        <div className="bg-[#FAF9F5] border border-[#E8E4DC] p-12 text-center text-xs text-[#736C62]">
          No orders found in your client ledger.
        </div>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => {
            const isExpanded = expandedOrderId === order.id;
            const currentStepIdx = STATUS_STEPS.indexOf(order.status);

            return (
              <div
                key={order.id}
                className="bg-[#FAF9F5] border border-[#E8E4DC] p-6 shadow-2xs space-y-6"
              >
                {/* Header Summary */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E8E4DC] pb-4">
                  <div>
                    <div className="flex flex-wrap items-center gap-3">
                      <span className="font-mono font-bold text-sm text-[#191919]">
                        {order.id}
                      </span>
                      <span className="px-2.5 py-0.5 text-[10px] uppercase tracking-widest font-medium bg-[#F2EFEB] text-[#191919] border border-[#DCD5C9]">
                        {order.status}
                      </span>
                      <a
                        href="/admin/orders"
                        className="text-[10px] uppercase font-mono tracking-wider text-[#997B28] hover:underline"
                        title="Open this order in Atelier Admin Console"
                      >
                        [⚙ Fulfill in Admin]
                      </a>
                    </div>
                    <span className="text-xs text-[#8C857B] block mt-1">
                      Registered on {order.date} · Estimated delivery: {order.estimatedDelivery}
                    </span>
                  </div>

                  <div className="flex items-center gap-4">
                    <span className="font-mono text-base font-semibold text-[#191919] tabular-nums">
                      {formatPrice(order.total)}
                    </span>
                    <button
                      type="button"
                      onClick={() => toggleExpand(order.id)}
                      className="p-1 text-[#736C62] hover:text-[#191919]"
                      aria-label="Toggle order details"
                    >
                      {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                {/* Status Timeline */}
                <div className="py-2">
                  <span className="text-[10px] uppercase tracking-[0.2em] text-[#8C857B] font-semibold block mb-4">
                    Dispatch Progression
                  </span>
                  <div className="grid grid-cols-5 text-center relative">
                    {/* Connecting line */}
                    <div className="absolute top-3.5 left-[10%] right-[10%] h-0.5 bg-[#E0D9CE] -z-0" />

                    {STATUS_STEPS.map((step, idx) => {
                      const isComplete = idx <= currentStepIdx;
                      const isCurrent = idx === currentStepIdx;

                      return (
                        <div key={step} className="flex flex-col items-center relative z-10">
                          <div
                            className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-mono mb-2 transition-all ${
                              isComplete
                                ? 'bg-[#191919] text-[#FAF9F5]'
                                : 'bg-[#E5DFD5] text-[#8C857B]'
                            } ${isCurrent ? 'ring-3 ring-[#191919]/20' : ''}`}
                          >
                            {isComplete ? <Check className="w-3.5 h-3.5" /> : idx + 1}
                          </div>
                          <span className={`text-[10px] uppercase tracking-wider font-medium max-w-[80px] leading-tight ${
                            isCurrent ? 'text-[#191919] font-bold' : isComplete ? 'text-[#444]' : 'text-[#A39E94]'
                          }`}>
                            {step}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Expanded Details */}
                {isExpanded && (
                  <div className="pt-6 border-t border-[#E8E4DC] space-y-6">
                    {/* Products list */}
                    <div>
                      <h4 className="text-xs uppercase tracking-wider font-semibold text-[#191919] mb-3">
                        Acquired Artifacts
                      </h4>
                      <div className="space-y-3">
                        {order.items?.map((item, idx) => (
                          <div key={idx} className="flex items-center justify-between text-xs bg-[#F5F2EB] p-3 border border-[#E8E4DC]">
                            <div className="flex items-center gap-3">
                              <div className="w-12 h-14 bg-[#E0D9CE] overflow-hidden shrink-0">
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
                                <span className="text-[11px] text-[#736C62]">
                                  Size: {item.size} · Color: {item.color} · Qty: {item.quantity}
                                </span>
                              </div>
                            </div>
                            <span className="font-mono font-medium text-[#191919] tabular-nums">
                              {formatPrice(item.price * item.quantity)}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Breakdown and metadata */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2 text-xs text-[#555048]">
                      <div className="space-y-1">
                        <span className="text-[10px] uppercase tracking-wider text-[#8C857B] font-semibold block">
                          Delivery Address
                        </span>
                        <p className="font-medium text-[#191919]">{order.customer?.fullName}</p>
                        <p>{order.customer?.address}</p>
                        <p>{order.customer?.city}, {order.customer?.state} — {order.customer?.pincode}</p>
                      </div>
                      <div className="space-y-1.5 border-t sm:border-t-0 sm:border-l border-[#E8E4DC] sm:pl-6">
                        <span className="text-[10px] uppercase tracking-wider text-[#8C857B] font-semibold block">
                          Settlement Summary
                        </span>
                        <div className="flex justify-between">
                          <span>Subtotal:</span>
                          <span className="font-mono text-[#191919]">{formatPrice(order.subtotal)}</span>
                        </div>
                        {order.discount > 0 && (
                          <div className="flex justify-between text-[#2C5234]">
                            <span>Discount:</span>
                            <span className="font-mono">-{formatPrice(order.discount)}</span>
                          </div>
                        )}
                        <div className="flex justify-between">
                          <span>Shipping:</span>
                          <span className="font-mono text-[#191919]">{order.shipping === 0 ? 'Complimentary' : formatPrice(order.shipping)}</span>
                        </div>
                        <div className="flex justify-between font-semibold text-[#191919] pt-1 border-t border-[#E8E4DC]">
                          <span>Total Paid:</span>
                          <span className="font-mono">{formatPrice(order.total)}</span>
                        </div>
                      </div>
                    </div>

                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
