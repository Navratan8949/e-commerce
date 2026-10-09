import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  Printer,
  Truck,
  CheckCircle2,
  Clock,
  RefreshCw,
  XCircle,
  User,
  MapPin,
  CreditCard,
  Package,
  Calendar,
  Sparkles
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext.jsx';
import { useToast } from '../../context/ToastContext.jsx';
import { formatPrice } from '../../lib/utils.js';

const STATUS_STEPS = [
  'Pending',
  'Order Placed',
  'Processing',
  'Shipped',
  'Delivered'
];

export default function AdminOrderDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { orders, updateOrderStatus } = useAuth();
  const { showToast } = useToast();

  const order = orders.find((o) => o.id === id);

  if (!order) {
    return (
      <div className="max-w-4xl mx-auto py-16 text-center space-y-4">
        <Package className="w-12 h-12 mx-auto text-[#C2BDAF]" />
        <h2 className="font-serif-luxury text-2xl text-[#191919]">Order Not Found</h2>
        <p className="text-xs text-[#7A756D]">
          The order ID &quot;{id}&quot; was not found in current records.
        </p>
        <Link
          to="/admin/orders"
          className="inline-block px-4 py-2 bg-[#191919] text-white text-xs font-medium rounded-md"
        >
          Back to Orders
        </Link>
      </div>
    );
  }

  const handleUpdateStatus = (newStatus) => {
    updateOrderStatus(order.id, newStatus);
    showToast(`Order status updated to "${newStatus}"`, 'success');
  };

  const handlePrint = () => {
    window.print();
  };

  const currentStepIndex = STATUS_STEPS.indexOf(order.status);

  return (
    <div className="max-w-5xl mx-auto space-y-6 pb-12">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#E8E6E1]">
        <div>
          <Link
            to="/admin/orders"
            className="inline-flex items-center gap-1.5 text-xs text-[#8C7A6B] hover:text-[#191919] font-medium mb-1.5 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Orders</span>
          </Link>
          <div className="flex items-center gap-3">
            <h1 className="font-serif-luxury text-2xl sm:text-3xl text-[#191919] font-light">
              Order {order.id}
            </h1>
            <span className="text-xs font-mono px-2.5 py-0.5 rounded-full bg-[#EFECE6] text-[#4A4742] font-semibold">
              {order.status}
            </span>
          </div>
          <p className="text-xs text-[#7A756D] mt-0.5">
            Placed on {order.date} · Paid via {order.paymentMethod || 'Credit / Debit Card'}
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={handlePrint}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-white hover:bg-[#F4F1EA] text-[#191919] border border-[#DDD8CE] text-xs font-medium rounded-md transition-colors shadow-xs"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print Invoice / Slip</span>
          </button>
        </div>
      </div>

      {/* Interactive Order Timeline & Status Switcher */}
      <div className="bg-white border border-[#E8E6E1] p-6 rounded-lg shadow-xs space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-[#F0ECE4]">
          <h2 className="font-serif-luxury text-lg text-[#191919] font-medium">
            Fulfillment Timeline &amp; Status Controls
          </h2>
          <span className="text-xs text-[#8C7A6B] font-mono">
            Click any status to update immediately
          </span>
        </div>

        {/* Visual Stepper */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 pt-2">
          {STATUS_STEPS.map((step, idx) => {
            const isCompleted = currentStepIndex >= idx;
            const isCurrent = order.status === step;

            return (
              <button
                key={step}
                onClick={() => handleUpdateStatus(step)}
                className={`p-3 rounded-md text-left transition-all border ${
                  isCurrent
                    ? 'bg-[#191919] text-white border-[#191919] shadow-xs'
                    : isCompleted
                    ? 'bg-[#F4FDF6] border-[#BBF7D0] text-[#166534]'
                    : 'bg-[#F8F7F4] border-[#E8E6E1] text-[#7A756D] hover:border-[#191919]'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[10px] font-mono uppercase">Step {idx + 1}</span>
                  {isCompleted && <CheckCircle2 className="w-3.5 h-3.5" />}
                </div>
                <p className="text-xs font-semibold">{step}</p>
              </button>
            );
          })}
        </div>

        {/* Quick Cancel / Refund Buttons */}
        <div className="pt-2 border-t border-[#F5F2EC] flex items-center gap-2">
          <button
            onClick={() => handleUpdateStatus('Cancelled')}
            className="px-3 py-1.5 text-xs font-medium text-[#DC2626] hover:bg-[#FEF2F2] rounded-md transition-colors border border-transparent hover:border-[#FECACA]"
          >
            Mark as Cancelled
          </button>
          <button
            onClick={() => handleUpdateStatus('Refunded')}
            className="px-3 py-1.5 text-xs font-medium text-[#4A4742] hover:bg-[#F4F1EA] rounded-md transition-colors"
          >
            Process Full Refund
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Products & Summary (8 cols) */}
        <div className="lg:col-span-8 space-y-6">
          {/* Products List Table */}
          <div className="bg-white border border-[#E8E6E1] p-6 rounded-lg shadow-xs space-y-4">
            <h3 className="font-serif-luxury text-lg text-[#191919] font-medium pb-2 border-b border-[#F0ECE4]">
              Ordered Items ({order.items?.length || 1})
            </h3>

            <div className="divide-y divide-[#F2EFE9]">
              {(order.items || []).map((item, idx) => (
                <div key={idx} className="py-3.5 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3.5">
                    <img
                      src={
                        item.image ||
                        'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=150&q=80'
                      }
                      alt={item.name}
                      className="w-14 h-14 rounded-xs object-cover border border-[#E5E0D8]"
                    />
                    <div>
                      <h4 className="text-xs font-medium text-[#191919]">{item.name}</h4>
                      <div className="flex items-center gap-2 text-[11px] text-[#7A756D] font-mono mt-0.5">
                        {item.size && <span>Size: {item.size}</span>}
                        {item.color && <span>· Color: {item.color}</span>}
                      </div>
                      <p className="text-[11px] font-mono text-[#8C7A6B] mt-0.5">
                        {formatPrice(item.price)} × {item.quantity}
                      </p>
                    </div>
                  </div>

                  <div className="font-mono font-semibold text-xs text-[#191919]">
                    {formatPrice(item.price * item.quantity)}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Payment & Financial Breakdown */}
          <div className="bg-white border border-[#E8E6E1] p-6 rounded-lg shadow-xs space-y-3">
            <h3 className="font-serif-luxury text-lg text-[#191919] font-medium pb-2 border-b border-[#F0ECE4]">
              Payment Breakdown
            </h3>

            <div className="space-y-2 text-xs text-[#4A4742]">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-mono text-[#191919]">
                  {formatPrice(order.subtotal || order.total)}
                </span>
              </div>

              {order.discount > 0 && (
                <div className="flex justify-between text-[#166534]">
                  <span>Atelier Promo Discount</span>
                  <span className="font-mono">-{formatPrice(order.discount)}</span>
                </div>
              )}

              <div className="flex justify-between">
                <span>White-Glove Shipping</span>
                <span className="font-mono text-[#191919]">
                  {order.shipping ? formatPrice(order.shipping) : 'Complimentary'}
                </span>
              </div>

              <div className="flex justify-between">
                <span>Estimated GST / Tax (Included)</span>
                <span className="font-mono text-[#7A756D]">18% GST Included</span>
              </div>

              <div className="pt-3 border-t border-[#E8E6E1] flex justify-between text-sm font-semibold text-[#191919]">
                <span>Total Amount Paid</span>
                <span className="font-mono text-base">{formatPrice(order.total)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Customer & Shipping (4 cols) */}
        <div className="lg:col-span-4 space-y-6">
          {/* Customer Details */}
          <div className="bg-white border border-[#E8E6E1] p-5 rounded-lg shadow-xs space-y-3">
            <div className="flex items-center gap-2 pb-2 border-b border-[#F0ECE4]">
              <User className="w-4 h-4 text-[#8C7A6B]" />
              <h3 className="text-xs font-mono uppercase tracking-wider text-[#191919] font-semibold">
                Customer Details
              </h3>
            </div>
            <div className="text-xs space-y-1">
              <p className="font-semibold text-[#191919]">
                {order.customer?.fullName || 'Eleanor Vance'}
              </p>
              <p className="text-[#6E6961]">{order.customer?.email || 'eleanor.vance@lumera.studio'}</p>
              <p className="text-[#6E6961] font-mono">{order.customer?.phone || '+91 98201 44521'}</p>
              <span className="inline-block mt-2 text-[10px] uppercase font-mono px-2 py-0.5 bg-[#EFECE6] text-[#4A4742] rounded-xs font-semibold">
                VIP Patron
              </span>
            </div>
          </div>

          {/* Shipping Address */}
          <div className="bg-white border border-[#E8E6E1] p-5 rounded-lg shadow-xs space-y-3">
            <div className="flex items-center gap-2 pb-2 border-b border-[#F0ECE4]">
              <MapPin className="w-4 h-4 text-[#8C7A6B]" />
              <h3 className="text-xs font-mono uppercase tracking-wider text-[#191919] font-semibold">
                Shipping Destination
              </h3>
            </div>
            <div className="text-xs space-y-1 text-[#4A4742]">
              <p>{order.customer?.address || 'Penthouse 4B, The Imperial Heights, Worli Sea Face'}</p>
              <p>
                {order.customer?.city || 'Mumbai'}, {order.customer?.state || 'Maharashtra'} -{' '}
                <span className="font-mono">{order.customer?.pincode || '400018'}</span>
              </p>
              <p className="text-[#8C7A6B] text-[11px] pt-1">India (Domestic Express)</p>
            </div>
          </div>

          {/* Courier & Dispatch */}
          <div className="bg-white border border-[#E8E6E1] p-5 rounded-lg shadow-xs space-y-2 text-xs">
            <div className="flex items-center gap-2 pb-2 border-b border-[#F0ECE4]">
              <Truck className="w-4 h-4 text-[#8C7A6B]" />
              <h3 className="font-mono uppercase tracking-wider text-[#191919] font-semibold text-xs">
                Logistics Carrier
              </h3>
            </div>
            <p className="text-[#191919] font-medium">BlueDart Atelier Priority Air</p>
            <p className="font-mono text-[#8C7A6B] text-[11px]">AWB: 84920194821</p>
            <p className="text-[11px] text-[#7A756D]">
              Estimated Arrival: {order.estimatedDelivery || 'In 3 business days'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
