import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Trash2, Heart, ArrowRight, ShoppingBag, Tag, Check, X } from 'lucide-react';
import { useCart } from '../context/CartContext.jsx';
import { useWishlist } from '../context/WishlistContext.jsx';
import { formatPrice } from '../lib/utils.js';
import ImageWithFallback from '../components/common/ImageWithFallback.jsx';

export default function CartPage() {
  const {
    cart,
    updateQuantity,
    removeFromCart,
    subtotal,
    discountAmount,
    shippingFee,
    total,
    isFreeShipping,
    freeShippingProgress,
    amountToFreeShipping,
    appliedCoupon,
    applyCoupon,
    removeCoupon
  } = useCart();

  const { toggleWishlist, isInWishlist } = useWishlist();
  const [couponCode, setCouponCode] = useState('');
  const navigate = useNavigate();

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    applyCoupon(couponCode);
    setCouponCode('');
  };

  const handleMoveToWishlist = (item) => {
    if (!isInWishlist(item.product.id)) {
      toggleWishlist(item.product);
    }
    removeFromCart(item.id);
  };

  if (cart.length === 0) {
    return (
      <div className="py-24 sm:py-32 max-w-xl mx-auto px-4 text-center">
        <div className="w-20 h-20 rounded-full bg-[#F2EFEB] flex items-center justify-center mx-auto mb-6 text-[#8C857B]">
          <ShoppingBag className="w-8 h-8 stroke-[1.2]" />
        </div>
        <h1 className="font-serif-luxury text-3xl sm:text-4xl text-[#191919] font-light mb-3">
          Your shopping bag is empty
        </h1>
        <p className="text-xs sm:text-sm text-[#736C62] leading-relaxed mb-8 max-w-md mx-auto">
          Explore our seasonal curation of refined silhouettes and tactile fabrics designed to elevate your everyday.
        </p>
        <Link
          to="/shop"
          className="inline-flex items-center gap-2 px-8 py-4 bg-[#191919] text-[#FAF9F5] text-xs uppercase tracking-[0.2em] font-medium hover:bg-[#333333] transition-colors"
        >
          Explore Collection
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    );
  }

  return (
    <div className="py-12 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Header */}
      <div className="border-b border-[#E8E4DC] pb-6 mb-10">
        <h1 className="font-serif-luxury text-3xl sm:text-5xl text-[#191919] font-light">
          Shopping Bag
        </h1>
        <p className="text-xs text-[#736C62] uppercase tracking-[0.18em] mt-2 font-medium">
          {cart.reduce((sum, item) => sum + item.quantity, 0)} Items Selected
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
        
        {/* Left Column: Cart Items & Free Shipping Progress */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* Free Shipping Progress Card */}
          <div className="p-4 bg-[#F2EFEB] border border-[#E8E4DC]">
            <div className="flex justify-between items-center text-xs uppercase tracking-wider mb-2 font-medium">
              {isFreeShipping ? (
                <span className="text-[#2C5234]">🎉 You've unlocked FREE COMPLIMENTARY SHIPPING</span>
              ) : (
                <span className="text-[#696359]">
                  Add <strong className="text-[#191919] font-mono tabular-nums">{formatPrice(amountToFreeShipping)}</strong> more to receive free shipping
                </span>
              )}
              <span className="text-xs text-[#8C857B] font-mono tabular-nums">{freeShippingProgress}%</span>
            </div>
            <div className="w-full bg-[#E5DFD5] h-1.5 rounded-full overflow-hidden">
              <div
                className="bg-[#191919] h-full transition-all duration-500 ease-out"
                style={{ width: `${freeShippingProgress}%` }}
              />
            </div>
          </div>

          {/* Table Header (Desktop) */}
          <div className="hidden sm:grid grid-cols-12 text-xs uppercase tracking-[0.2em] text-[#8C857B] pb-3 border-b border-[#E8E4DC]">
            <div className="col-span-6">Design</div>
            <div className="col-span-3 text-center">Quantity</div>
            <div className="col-span-3 text-right">Total</div>
          </div>

          {/* Item Rows */}
          <div className="divide-y divide-[#E8E4DC]">
            {cart.map((item) => (
              <div key={item.id} className="py-6 flex flex-col sm:grid sm:grid-cols-12 gap-4 items-center">
                
                {/* Product Info & Image */}
                <div className="w-full sm:col-span-6 flex gap-4">
                  <Link
                    to={`/product/${item.product.slug}`}
                    className="w-20 sm:w-24 aspect-4/5 bg-[#EBE7DF] shrink-0 overflow-hidden"
                  >
                    <ImageWithFallback
                      src={item.product.images?.[0]}
                      alt={item.product.name}
                      aspectRatio="4/5"
                      className="w-full h-full object-cover"
                    />
                  </Link>

                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <Link
                        to={`/product/${item.product.slug}`}
                        className="font-serif-luxury text-lg text-[#191919] hover:underline"
                      >
                        {item.product.name}
                      </Link>
                      <div className="text-xs text-[#736C62] uppercase tracking-wider mt-1 space-y-0.5">
                        <p>Size: <strong className="text-[#191919] font-semibold">{item.size}</strong></p>
                        <p>Color: <span className="text-[#191919]">{item.color?.name}</span></p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 pt-2">
                      <button
                        type="button"
                        onClick={() => handleMoveToWishlist(item)}
                        className="text-[11px] text-[#736C62] hover:text-[#191919] uppercase tracking-wider flex items-center gap-1 transition-colors"
                      >
                        <Heart className="w-3.5 h-3.5" />
                        <span>Save to Wishlist</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => removeFromCart(item.id)}
                        className="text-[11px] text-[#999] hover:text-[#B91C1C] uppercase tracking-wider flex items-center gap-1 transition-colors"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>Remove</span>
                      </button>
                    </div>
                  </div>
                </div>

                {/* Quantity Controls */}
                <div className="w-full sm:col-span-3 flex sm:justify-center justify-between items-center">
                  <span className="sm:hidden text-xs uppercase tracking-wider text-[#736C62]">Qty:</span>
                  <div className="flex items-center border border-[#DCD5C9] bg-white">
                    <button
                      type="button"
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="w-8 h-8 flex items-center justify-center text-sm text-[#555] hover:bg-[#F5F2EB]"
                    >
                      -
                    </button>
                    <span className="w-10 text-center text-xs font-mono tabular-nums text-[#191919]">
                      {item.quantity}
                    </span>
                    <button
                      type="button"
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="w-8 h-8 flex items-center justify-center text-sm text-[#555] hover:bg-[#F5F2EB]"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Subtotal */}
                <div className="w-full sm:col-span-3 flex sm:justify-end justify-between items-baseline">
                  <span className="sm:hidden text-xs uppercase tracking-wider text-[#736C62]">Price:</span>
                  <div className="text-right">
                    <span className="font-mono text-base font-semibold text-[#191919] tabular-nums">
                      {formatPrice(item.product.price * item.quantity)}
                    </span>
                    {item.quantity > 1 && (
                      <span className="block text-[11px] text-[#8C857B] font-mono tabular-nums">
                        {formatPrice(item.product.price)} each
                      </span>
                    )}
                  </div>
                </div>

              </div>
            ))}
          </div>

          <div className="pt-6">
            <Link
              to="/shop"
              className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] font-medium text-[#191919] hover:opacity-70 transition-opacity"
            >
              <span>← Continue Shopping</span>
            </Link>
          </div>
        </div>

        {/* Right Column: Order Summary & Coupon */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-[#F5F2EB] border border-[#E8E4DC] p-6 sm:p-8 space-y-6">
            <h3 className="font-serif-luxury text-2xl text-[#191919] font-light border-b border-[#E8E4DC] pb-4">
              Order Summary
            </h3>

            {/* Line items */}
            <div className="space-y-3 text-xs tracking-wider">
              <div className="flex justify-between text-[#696359]">
                <span>Bag Subtotal</span>
                <span className="font-mono text-[#191919] tabular-nums font-medium">
                  {formatPrice(subtotal)}
                </span>
              </div>

              {discountAmount > 0 && (
                <div className="flex justify-between text-[#2C5234]">
                  <span>Promo Discount ({appliedCoupon?.code})</span>
                  <span className="font-mono tabular-nums font-medium">
                    -{formatPrice(discountAmount)}
                  </span>
                </div>
              )}

              <div className="flex justify-between text-[#696359]">
                <span>Estimated Shipping</span>
                <span className="font-mono text-[#191919] tabular-nums font-medium">
                  {shippingFee === 0 ? 'Complimentary' : formatPrice(shippingFee)}
                </span>
              </div>

              <div className="pt-4 border-t border-[#E8E4DC] flex justify-between items-baseline text-sm">
                <span className="uppercase tracking-[0.16em] font-medium text-[#191919]">Total</span>
                <span className="font-mono text-xl font-bold text-[#191919] tabular-nums">
                  {formatPrice(total)}
                </span>
              </div>
            </div>

            {/* Coupon Code Input */}
            <div className="pt-4 border-t border-[#E8E4DC]">
              {appliedCoupon ? (
                <div className="flex items-center justify-between p-3 bg-white border border-[#2C5234]/30 text-xs">
                  <div className="flex items-center gap-2 text-[#2C5234]">
                    <Check className="w-4 h-4" />
                    <span><strong>{appliedCoupon.code}</strong> applied</span>
                  </div>
                  <button
                    type="button"
                    onClick={removeCoupon}
                    className="text-[#8C857B] hover:text-[#191919]"
                    title="Remove coupon"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <form onSubmit={handleApplyCoupon} className="space-y-2">
                  <div className="flex">
                    <input
                      type="text"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      placeholder="Enter promo code"
                      className="flex-1 px-3 py-2.5 bg-white border border-[#DCD5C9] text-xs uppercase text-[#191919] placeholder-[#9E988F] focus:outline-hidden focus:border-[#191919]"
                    />
                    <button
                      type="submit"
                      className="px-4 py-2.5 bg-[#191919] text-[#FAF9F5] text-xs uppercase tracking-wider font-medium hover:bg-[#333333] transition-colors"
                    >
                      Apply
                    </button>
                  </div>
                  <div className="text-[10px] text-[#8C857B] tracking-wider uppercase space-x-2">
                    <span>Try: <strong className="text-[#191919]">LUMERA10</strong> (10% off) or <strong className="text-[#191919]">WELCOME500</strong></span>
                  </div>
                </form>
              )}
            </div>

            {/* Checkout Action */}
            <div className="pt-2">
              <button
                type="button"
                onClick={() => navigate('/checkout')}
                className="w-full py-4 bg-[#191919] text-[#FAF9F5] text-xs uppercase tracking-[0.2em] font-medium hover:bg-[#333333] transition-colors shadow-xs flex items-center justify-center gap-2 cursor-pointer"
              >
                Proceed to Checkout
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <p className="text-[11px] text-[#8C857B] text-center leading-relaxed">
              All transactions protected with bank-grade encryption. Complimentary insurance on all shipments.
            </p>
          </div>
        </div>

      </div>

    </div>
  );
}
