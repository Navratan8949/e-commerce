import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { X, Trash2, Heart, ArrowRight, ShoppingBag } from 'lucide-react';
import { useCart } from '../../context/CartContext.jsx';
import { useWishlist } from '../../context/WishlistContext.jsx';
import { formatPrice } from '../../lib/utils.js';
import ImageWithFallback from '../common/ImageWithFallback.jsx';

export default function CartDrawer() {
  const {
    cart,
    isDrawerOpen,
    closeDrawer,
    updateQuantity,
    removeFromCart,
    subtotal,
    isFreeShipping,
    freeShippingProgress,
    amountToFreeShipping
  } = useCart();

  const { toggleWishlist, isInWishlist } = useWishlist();
  const navigate = useNavigate();

  // Escape key handler
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isDrawerOpen) {
        closeDrawer();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isDrawerOpen, closeDrawer]);

  // Lock scroll
  useEffect(() => {
    if (isDrawerOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isDrawerOpen]);

  if (!isDrawerOpen) return null;

  const handleCheckout = () => {
    closeDrawer();
    navigate('/checkout');
  };

  const handleMoveToWishlist = (item) => {
    if (!isInWishlist(item.product.id)) {
      toggleWishlist(item.product);
    }
    removeFromCart(item.id);
  };

  return (
    <div className="fixed inset-0 z-50">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#111111]/50 backdrop-blur-xs transition-opacity duration-300"
        onClick={closeDrawer}
      />

      {/* Slide-over panel */}
      <div className="fixed inset-y-0 right-0 max-w-full flex pl-6 sm:pl-10">
        <div className="w-screen max-w-md bg-[#FAF9F5] shadow-2xl flex flex-col justify-between z-50 border-l border-[#E8E4DC]">
          
          {/* Header */}
          <div className="p-6 border-b border-[#E8E4DC]">
            <div className="flex items-center justify-between">
              <div className="flex items-baseline gap-2">
                <h2 className="font-serif-luxury text-xl sm:text-2xl font-normal tracking-wide text-[#191919]">
                  Shopping Bag
                </h2>
                <span className="text-xs text-[#736C62] uppercase tracking-wider font-mono tabular-nums">
                  ({cart.reduce((sum, i) => sum + i.quantity, 0)})
                </span>
              </div>
              <button
                type="button"
                onClick={closeDrawer}
                className="p-1.5 text-[#191919] hover:opacity-60 transition-opacity"
                aria-label="Close bag"
              >
                <X className="w-5 h-5 stroke-[1.5]" />
              </button>
            </div>

            {/* Free Shipping Progress Bar */}
            <div className="mt-4 pt-3 border-t border-[#F0ECE1]">
              <div className="flex justify-between items-center text-[11px] uppercase tracking-wider mb-2 font-medium">
                {isFreeShipping ? (
                  <span className="text-[#2C5234]">🎉 You've unlocked FREE SHIPPING</span>
                ) : (
                  <span className="text-[#696359]">
                    Add <strong className="text-[#191919] font-mono tabular-nums">{formatPrice(amountToFreeShipping)}</strong> for free shipping
                  </span>
                )}
                <span className="text-[10px] text-[#8C857B] font-mono tabular-nums">{freeShippingProgress}%</span>
              </div>
              <div className="w-full bg-[#E5DFD5] h-1 rounded-full overflow-hidden">
                <div
                  className="bg-[#191919] h-full transition-all duration-500 ease-out"
                  style={{ width: `${freeShippingProgress}%` }}
                />
              </div>
            </div>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12">
                <div className="w-16 h-16 rounded-full bg-[#F2EFEB] flex items-center justify-center mb-4 text-[#8C857B]">
                  <ShoppingBag className="w-7 h-7 stroke-[1.2]" />
                </div>
                <h3 className="font-serif-luxury text-xl text-[#191919] mb-1">
                  Your bag is empty
                </h3>
                <p className="text-xs text-[#736C62] max-w-xs mb-6 leading-relaxed">
                  Explore our curated essentials and find pieces designed to elevate your everyday.
                </p>
                <Link
                  to="/shop"
                  onClick={closeDrawer}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-[#191919] text-[#FAF9F5] text-xs uppercase tracking-[0.18em] font-medium hover:bg-[#333333] transition-colors"
                >
                  Explore Collection
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            ) : (
              cart.map((item) => (
                <div key={item.id} className="flex gap-4 pb-6 border-b border-[#F0ECE1]">
                  {/* Thumbnail */}
                  <Link
                    to={`/product/${item.product.slug}`}
                    onClick={closeDrawer}
                    className="w-20 h-26 bg-[#EBE7DF] shrink-0 overflow-hidden"
                  >
                    <ImageWithFallback
                      src={item.product.images?.[0]}
                      alt={item.product.name}
                      aspectRatio="4/5"
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </Link>

                  {/* Details */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start gap-2">
                        <Link
                          to={`/product/${item.product.slug}`}
                          onClick={closeDrawer}
                          className="font-serif-luxury text-base text-[#191919] hover:underline leading-snug"
                        >
                          {item.product.name}
                        </Link>
                        <span className="font-mono text-xs font-medium text-[#191919] tabular-nums shrink-0">
                          {formatPrice(item.product.price * item.quantity)}
                        </span>
                      </div>
                      
                      {/* Variant Specs */}
                      <div className="flex items-center gap-2 text-[11px] text-[#736C62] mt-1 uppercase tracking-wider">
                        <span>Size: <strong className="text-[#191919]">{item.size}</strong></span>
                        <span>·</span>
                        <span>{item.color?.name}</span>
                      </div>
                    </div>

                    {/* Quantity controls and actions */}
                    <div className="flex items-center justify-between mt-3 pt-2">
                      <div className="flex items-center border border-[#DCD5C9] bg-white">
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="w-7 h-7 flex items-center justify-center text-xs text-[#555] hover:bg-[#F5F2EB] transition-colors"
                          aria-label="Decrease quantity"
                        >
                          -
                        </button>
                        <span className="w-8 text-center text-xs font-mono tabular-nums text-[#191919]">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-7 h-7 flex items-center justify-center text-xs text-[#555] hover:bg-[#F5F2EB] transition-colors"
                          aria-label="Increase quantity"
                        >
                          +
                        </button>
                      </div>

                      <div className="flex items-center gap-3">
                        <button
                          type="button"
                          onClick={() => handleMoveToWishlist(item)}
                          className="text-[11px] text-[#736C62] hover:text-[#191919] uppercase tracking-wider flex items-center gap-1 transition-colors"
                          title="Save to wishlist"
                        >
                          <Heart className="w-3.5 h-3.5" />
                          <span className="hidden sm:inline">Save</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => removeFromCart(item.id)}
                          className="text-[#999] hover:text-[#B91C1C] transition-colors p-1"
                          aria-label="Remove item"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer Summary & Checkout */}
          {cart.length > 0 && (
            <div className="p-6 bg-[#F5F2EB] border-t border-[#E8E4DC] space-y-4">
              <div className="flex justify-between items-baseline text-sm">
                <span className="uppercase tracking-wider text-xs text-[#736C62] font-medium">Subtotal</span>
                <span className="font-mono text-base font-semibold text-[#191919] tabular-nums">
                  {formatPrice(subtotal)}
                </span>
              </div>
              <p className="text-[11px] text-[#8C857B]">
                Taxes calculated at checkout. Complimentary signature packaging included.
              </p>

              <div className="space-y-2 pt-2">
                <button
                  type="button"
                  onClick={handleCheckout}
                  className="w-full py-3.5 bg-[#191919] text-[#FAF9F5] text-xs uppercase tracking-[0.2em] font-medium hover:bg-[#333333] transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-xs"
                >
                  Proceed to Checkout
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
                <Link
                  to="/cart"
                  onClick={closeDrawer}
                  className="w-full py-2.5 text-center block text-xs uppercase tracking-[0.16em] text-[#504D47] hover:text-[#000000] transition-colors"
                >
                  View Full Bag & Promo Codes
                </Link>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
