import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Trash2, ShoppingBag, ArrowRight } from 'lucide-react';
import { useWishlist } from '../context/WishlistContext.jsx';
import { useCart } from '../context/CartContext.jsx';
import { formatPrice } from '../lib/utils.js';
import ImageWithFallback from '../components/common/ImageWithFallback.jsx';

export default function WishlistPage({ onQuickView }) {
  const { wishlist, removeFromWishlist } = useWishlist();
  const { addToCart, openDrawer } = useCart();

  const handleMoveToCart = (product) => {
    const defaultSize = product.sizes?.[0] || 'Standard';
    const defaultColor = product.colors?.[0] || { name: 'Standard', hex: '#111111' };
    addToCart(product, defaultSize, defaultColor, 1);
    removeFromWishlist(product.id);
    openDrawer();
  };

  if (wishlist.length === 0) {
    return (
      <div className="py-24 sm:py-32 max-w-xl mx-auto px-4 text-center">
        <div className="w-20 h-20 rounded-full bg-[#F2EFEB] flex items-center justify-center mx-auto mb-6 text-[#8C857B]">
          <Heart className="w-8 h-8 stroke-[1.2]" />
        </div>
        <h1 className="font-serif-luxury text-3xl sm:text-4xl text-[#191919] font-light mb-3">
          Your wishlist is waiting.
        </h1>
        <p className="text-xs sm:text-sm text-[#736C62] leading-relaxed mb-8 max-w-md mx-auto">
          Save your favourite pieces to review later or transfer to your bag when you're ready to complete your order.
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
      <div className="border-b border-[#E8E4DC] pb-6 mb-10 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <h1 className="font-serif-luxury text-3xl sm:text-5xl text-[#191919] font-light">
            My Wishlist
          </h1>
          <p className="text-xs text-[#736C62] uppercase tracking-[0.18em] mt-2 font-medium">
            {wishlist.length} {wishlist.length === 1 ? 'Curated Piece' : 'Curated Pieces'} Saved
          </p>
        </div>
        <Link
          to="/shop"
          className="text-xs uppercase tracking-[0.2em] text-[#191919] hover:underline"
        >
          Continue Shopping
        </Link>
      </div>

      {/* Grid of Wishlist Items */}
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 sm:gap-x-6 gap-y-12">
        {wishlist.map((product) => (
          <div key={product.id} className="group relative flex flex-col">
            {/* Image Box */}
            <div className="relative aspect-4/5 w-full bg-[#EBE7DF] overflow-hidden">
              <Link to={`/product/${product.slug}`} className="block w-full h-full">
                <ImageWithFallback
                  src={product.images?.[0]}
                  alt={product.name}
                  aspectRatio="4/5"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </Link>

              {/* Remove button */}
              <button
                type="button"
                onClick={() => removeFromWishlist(product.id)}
                className="absolute top-3 right-3 p-2 bg-[#FAF9F5]/90 hover:bg-white text-[#555] hover:text-[#991B1B] transition-colors rounded-full shadow-2xs"
                title="Remove from wishlist"
                aria-label="Remove from wishlist"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Info & Move to Bag */}
            <div className="pt-3 pb-2 flex-1 flex flex-col justify-between">
              <div>
                <span className="text-[11px] uppercase tracking-[0.16em] text-[#8C857B] block mb-1">
                  {product.category} · {product.subcategory}
                </span>
                <Link
                  to={`/product/${product.slug}`}
                  className="font-serif-luxury text-base text-[#191919] hover:underline block leading-snug line-clamp-1"
                >
                  {product.name}
                </Link>
                <div className="flex items-baseline gap-2 mt-2">
                  <span className="font-mono text-sm font-semibold text-[#191919] tabular-nums">
                    {formatPrice(product.price)}
                  </span>
                  {product.originalPrice && (
                    <span className="font-mono text-xs text-[#8C857B] line-through tabular-nums">
                      {formatPrice(product.originalPrice)}
                    </span>
                  )}
                </div>
              </div>

              <div className="pt-4 mt-2">
                <button
                  type="button"
                  onClick={() => handleMoveToCart(product)}
                  className="w-full py-2.5 bg-[#191919] text-[#FAF9F5] text-xs uppercase tracking-[0.18em] font-medium hover:bg-[#333333] transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <ShoppingBag className="w-3.5 h-3.5" />
                  Move to Bag
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
