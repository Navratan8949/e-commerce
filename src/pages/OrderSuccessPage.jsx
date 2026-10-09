import React, { useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Check, ArrowRight, Package, Calendar, MapPin, CreditCard } from 'lucide-react';
import { useAuth } from '../context/AuthContext.jsx';
import { formatPrice } from '../lib/utils.js';
import ImageWithFallback from '../components/common/ImageWithFallback.jsx';

export default function OrderSuccessPage() {
  const [searchParams] = useSearchParams();
  const orderId = searchParams.get('orderId');
  const { orders } = useAuth();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const order = orders.find((o) => o.id === orderId) || orders[0];

  return (
    <div className="py-16 sm:py-24 max-w-3xl mx-auto px-4 sm:px-6">
      
      {/* Success Card */}
      <div className="bg-[#FAF9F5] border border-[#E8E4DC] p-8 sm:p-12 shadow-sm text-center">
        {/* Large Check Icon */}
        <div className="w-16 h-16 rounded-full bg-[#191919] text-[#FAF9F5] flex items-center justify-center mx-auto mb-6">
          <Check className="w-8 h-8 stroke-[1.8]" />
        </div>

        <span className="text-[11px] uppercase tracking-[0.25em] text-[#8C857B] font-medium block mb-2">
          Confirmation of Acquisition
        </span>

        <h1 className="font-serif-luxury text-3xl sm:text-5xl text-[#191919] font-light mb-4">
          Order Confirmed
        </h1>

        <p className="text-sm text-[#555048] max-w-md mx-auto leading-relaxed mb-8">
          Thank you for shopping with FILLKART. Your order has been registered at our atelier and is being carefully prepared for transit.
        </p>

        {/* Order Details Badge */}
        {order && (
          <div className="bg-[#F5F2EB] p-6 border border-[#E8E4DC] text-left space-y-6 mb-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pb-4 border-b border-[#E8E4DC] text-xs">
              <div>
                <span className="text-[10px] uppercase tracking-wider text-[#8C857B] block">Order Identifier</span>
                <span className="font-mono text-sm font-semibold text-[#191919]">{order.id}</span>
              </div>
              <div>
                <span className="text-[10px] uppercase tracking-wider text-[#8C857B] block">Estimated Arrival</span>
                <span className="font-mono text-sm font-semibold text-[#191919]">{order.estimatedDelivery}</span>
              </div>
            </div>

            {/* Items */}
            <div>
              <h3 className="text-xs uppercase tracking-wider font-semibold text-[#191919] mb-3">
                Acquired Pieces
              </h3>
              <div className="space-y-3">
                {order.items?.map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-12 bg-[#EBE7DF] overflow-hidden shrink-0">
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
                          Size: {item.size} · {item.color} · Qty: {item.quantity}
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

            {/* Total breakdown */}
            <div className="pt-4 border-t border-[#E8E4DC] space-y-1.5 text-xs text-[#696359]">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-mono text-[#191919] tabular-nums">{formatPrice(order.subtotal)}</span>
              </div>
              {order.discount > 0 && (
                <div className="flex justify-between text-[#2C5234]">
                  <span>Promo Discount</span>
                  <span className="font-mono tabular-nums">-{formatPrice(order.discount)}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Shipping</span>
                <span className="font-mono text-[#191919] tabular-nums">{order.shipping === 0 ? 'Complimentary' : formatPrice(order.shipping)}</span>
              </div>
              <div className="flex justify-between text-sm font-semibold text-[#191919] pt-2 border-t border-[#E8E4DC]">
                <span>Total Paid</span>
                <span className="font-mono tabular-nums">{formatPrice(order.total)}</span>
              </div>
            </div>

            {/* Delivery address & payment */}
            <div className="pt-4 border-t border-[#E8E4DC] grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-[#555048]">
              <div>
                <span className="text-[10px] uppercase tracking-wider text-[#8C857B] block mb-1">
                  Destination
                </span>
                <p className="font-medium text-[#191919]">{order.customer?.fullName}</p>
                <p className="text-[11px] text-[#736C62]">{order.customer?.address}, {order.customer?.city}</p>
              </div>
              <div>
                <span className="text-[10px] uppercase tracking-wider text-[#8C857B] block mb-1">
                  Payment Method
                </span>
                <p className="font-medium text-[#191919]">{order.paymentMethod}</p>
                <p className="text-[11px] text-[#736C62]">Authorization verified</p>
              </div>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            to="/shop"
            className="w-full sm:w-auto px-7 py-3.5 bg-[#191919] text-[#FAF9F5] text-xs uppercase tracking-[0.2em] font-medium hover:bg-[#333333] transition-colors flex items-center justify-center gap-2 cursor-pointer"
          >
            Continue Shopping
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
          <Link
            to="/account/orders"
            className="w-full sm:w-auto px-7 py-3.5 bg-transparent border border-[#191919] text-[#191919] text-xs uppercase tracking-[0.2em] font-medium hover:bg-[#FAF9F5] transition-colors text-center cursor-pointer"
          >
            Track in Account
          </Link>
          <Link
            to="/admin/orders"
            className="w-full sm:w-auto px-7 py-3.5 bg-[#D4AF37] text-[#141210] hover:bg-[#E5C158] text-xs uppercase tracking-[0.2em] font-semibold transition-colors text-center cursor-pointer"
          >
            Fulfill in Admin ➔
          </Link>
        </div>

      </div>

    </div>
  );
}
