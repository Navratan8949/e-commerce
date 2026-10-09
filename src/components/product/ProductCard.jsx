import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, Eye, ShoppingBag } from 'lucide-react';
import { useCart } from '../../context/CartContext.jsx';
import { useWishlist } from '../../context/WishlistContext.jsx';
import { useCurrency } from '../../context/CurrencyContext.jsx';
import ImageWithFallback from '../common/ImageWithFallback.jsx';

export default function ProductCard({ product, onQuickView }) {
  const [isHovered, setIsHovered] = useState(false);
  const [selectedColor, setSelectedColor] = useState(product?.colors?.[0] || null);
  const { addToCart, openDrawer } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const { formatPrice } = useCurrency();

  if (!product) return null;

  const isFavorited = isInWishlist(product.id);
  const hasSecondaryImage = product.images && product.images.length > 1;

  const handleQuickAdd = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const defaultSize = product.sizes?.[0] || 'Standard';
    const colorToAdd = selectedColor || product.colors?.[0] || { name: 'Noir', hex: '#111111' };
    addToCart(product, defaultSize, colorToAdd, 1);
    openDrawer();
  };

  const handleWishlistClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product);
  };

  const handleQuickViewClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (onQuickView) {
      onQuickView(product);
    }
  };

  return (
    <div
      className="group relative flex flex-col transition-all duration-300"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Container */}
      <div className="relative aspect-4/5 w-full bg-[#F3F3F5] overflow-hidden rounded-xs border border-neutral-100">
        
        {/* Primary and Secondary Images */}
        <Link to={`/product/${product.slug}`} className="block w-full h-full">
          <ImageWithFallback
            src={isHovered && hasSecondaryImage ? product.images[1] : product.images?.[0]}
            alt={product.name}
            aspectRatio="4/5"
            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-104"
          />
        </Link>

        {/* Minimal Badges (Zero-Pill: subtle text tag) */}
        <div className="absolute top-3 left-3 flex flex-col gap-1 pointer-events-none z-10">
          {product.isNew && (
            <span className="text-[10px] uppercase tracking-[0.2em] font-medium text-black bg-white/95 backdrop-blur-xs px-2 py-0.5 shadow-2xs">
              New
            </span>
          )}
          {product.discount && !product.isNew && (
            <span className="text-[10px] uppercase tracking-[0.2em] font-semibold text-rose-700 bg-white/95 backdrop-blur-xs px-2 py-0.5 shadow-2xs">
              -{product.discount}%
            </span>
          )}
        </div>

        {/* Wishlist Button (Top Right) */}
        <button
          type="button"
          onClick={handleWishlistClick}
          className="absolute top-3 right-3 z-10 p-2 text-black bg-white/90 hover:bg-white backdrop-blur-xs rounded-full shadow-2xs transition-all duration-200 cursor-pointer"
          aria-label={isFavorited ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          <Heart
            className={`w-4 h-4 transition-colors ${
              isFavorited ? 'fill-black text-black' : 'text-black'
            }`}
          />
        </button>

        {/* Quick Actions Bar (Slides up on desktop hover) */}
        <div className="absolute inset-x-3 bottom-3 z-10 flex gap-2 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
          <button
            type="button"
            onClick={handleQuickAdd}
            className="flex-1 py-2.5 px-3 bg-[#0B0C0E] text-white text-[11px] uppercase tracking-[0.18em] font-medium hover:bg-black transition-colors shadow-md flex items-center justify-center gap-1.5 cursor-pointer rounded-xs"
          >
            <ShoppingBag className="w-3.5 h-3.5 text-[#C5A265]" />
            Quick Add
          </button>
          {onQuickView && (
            <button
              type="button"
              onClick={handleQuickViewClick}
              className="p-2.5 bg-white text-black hover:bg-neutral-100 transition-colors shadow-md cursor-pointer rounded-xs"
              title="Quick View"
              aria-label="Quick View"
            >
              <Eye className="w-4 h-4" />
            </button>
          )}
        </div>

      </div>

      {/* Product Information */}
      <div className="pt-3 pb-2 flex flex-col justify-between flex-1">
        <div>
          {/* Category kicker */}
          <div className="text-[11px] uppercase tracking-[0.16em] text-[#9A7B4F] mb-1 font-mono font-medium">
            {product.category} · {product.subcategory}
          </div>

          {/* Product Name */}
          <Link
            to={`/product/${product.slug}`}
            className="font-serif-luxury text-base text-neutral-900 hover:underline transition-colors block font-normal leading-snug line-clamp-1"
          >
            {product.name}
          </Link>
        </div>

        {/* Price & Rating */}
        <div className="flex items-center justify-between mt-2 pt-1 border-t border-neutral-100">
          <div className="flex items-baseline gap-2">
            <span className="font-mono text-sm font-semibold text-neutral-900 tabular-nums">
              {formatPrice(product.price)}
            </span>
            {product.originalPrice && product.originalPrice > product.price && (
              <span className="font-mono text-xs text-neutral-400 line-through tabular-nums">
                {formatPrice(product.originalPrice)}
              </span>
            )}
          </div>

          {/* Interactive color swatches */}
          {product.colors?.length > 1 && (
            <div className="flex items-center gap-1.5" onClick={(e) => e.stopPropagation()}>
              {product.colors.slice(0, 4).map((c) => {
                const isSelected = selectedColor?.name === c.name;
                return (
                  <button
                    key={c.name}
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      setSelectedColor(c);
                    }}
                    className={`w-3 h-3 rounded-full border transition-transform cursor-pointer ${
                      isSelected
                        ? 'ring-1 ring-offset-1 ring-black scale-110 border-black'
                        : 'border-neutral-300 hover:scale-105'
                    }`}
                    style={{ backgroundColor: c.hex }}
                    title={c.name}
                    aria-label={`Select color ${c.name}`}
                  />
                );
              })}
              {product.colors.length > 4 && (
                <span className="text-[9.5px] text-neutral-400 font-mono">
                  +{product.colors.length - 4}
                </span>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
