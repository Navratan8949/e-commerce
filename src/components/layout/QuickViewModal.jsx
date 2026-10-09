import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { X, Star, Heart, ArrowRight } from 'lucide-react';
import { useCart } from '../../context/CartContext.jsx';
import { useWishlist } from '../../context/WishlistContext.jsx';
import { useToast } from '../../context/ToastContext.jsx';
import { formatPrice } from '../../lib/utils.js';
import ImageWithFallback from '../common/ImageWithFallback.jsx';

export default function QuickViewModal({ product, isOpen, onClose, onOpenSizeGuide }) {
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const { addToCart, openDrawer } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const { showToast } = useToast();

  useEffect(() => {
    if (product) {
      setSelectedColor(product.colors?.[0] || null);
      setSelectedSize(product.sizes?.[0] || 'Standard');
      setQuantity(1);
      setActiveImageIndex(0);
    }
  }, [product]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen || !product) return null;

  const isFavorited = isInWishlist(product.id);

  const handleAddToCart = () => {
    if (!selectedSize && product.sizes?.length > 0) {
      showToast('Please select a size.', 'error');
      return;
    }
    addToCart(product, selectedSize, selectedColor, quantity);
    onClose();
    openDrawer();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#111111]/60 backdrop-blur-xs transition-opacity duration-300"
        onClick={onClose}
      />

      {/* Modal Card */}
      <div className="relative bg-[#FAF9F5] border border-[#E8E4DC] max-w-4xl w-full shadow-2xl z-10 max-h-[92vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 text-[#191919] hover:opacity-60 bg-white/70 backdrop-blur-xs transition-opacity rounded-full"
          aria-label="Close preview"
        >
          <X className="w-5 h-5 stroke-[1.5]" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          
          {/* Gallery side */}
          <div className="relative bg-[#F0ECE1] flex flex-col justify-between">
            <div className="relative aspect-4/5 w-full overflow-hidden">
              <ImageWithFallback
                src={product.images?.[activeImageIndex] || product.images?.[0]}
                alt={product.name}
                aspectRatio="4/5"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Thumbnail selector */}
            {product.images?.length > 1 && (
              <div className="flex gap-2 p-3 bg-[#FAF9F5] border-t border-[#E8E4DC]">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setActiveImageIndex(idx)}
                    className={`w-14 h-16 border overflow-hidden transition-all ${
                      activeImageIndex === idx ? 'border-[#191919] ring-1 ring-[#191919]' : 'border-transparent opacity-60 hover:opacity-100'
                    }`}
                  >
                    <ImageWithFallback
                      src={img}
                      alt={`${product.name} thumbnail ${idx + 1}`}
                      aspectRatio="4/5"
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Details side */}
          <div className="p-6 sm:p-8 flex flex-col justify-between space-y-6">
            <div>
              {/* Category & Rating */}
              <div className="flex items-center justify-between text-xs text-[#736C62] uppercase tracking-[0.18em] mb-2">
                <span>{product.category} · {product.subcategory}</span>
                <div className="flex items-center gap-1 text-[#191919]">
                  <Star className="w-3.5 h-3.5 fill-current text-[#191919]" />
                  <span className="font-mono font-medium">{product.rating}</span>
                  <span className="text-[#8C857B]">({product.reviewCount})</span>
                </div>
              </div>

              {/* Title */}
              <h2 className="font-serif-luxury text-2xl sm:text-3xl font-light text-[#191919] leading-tight">
                {product.name}
              </h2>

              {/* Price & Discount */}
              <div className="flex items-baseline gap-3 mt-3">
                <span className="font-mono text-xl font-medium text-[#191919] tabular-nums">
                  {formatPrice(product.price)}
                </span>
                {product.originalPrice && product.originalPrice > product.price && (
                  <span className="font-mono text-sm text-[#8C857B] line-through tabular-nums">
                    {formatPrice(product.originalPrice)}
                  </span>
                )}
                {product.discount && (
                  <span className="text-xs uppercase tracking-wider text-[#991B1B] font-medium">
                    {product.discount}% OFF
                  </span>
                )}
              </div>

              {/* Description excerpt */}
              <p className="text-xs text-[#555048] leading-relaxed mt-4 line-clamp-3">
                {product.description}
              </p>

              {/* Color swatches */}
              {product.colors?.length > 0 && (
                <div className="mt-5">
                  <div className="flex justify-between items-center text-xs tracking-wider uppercase mb-2">
                    <span className="text-[#736C62]">
                      Color: <strong className="text-[#191919]">{selectedColor?.name}</strong>
                    </span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    {product.colors.map((color) => (
                      <button
                        key={color.name}
                        type="button"
                        onClick={() => setSelectedColor(color)}
                        className={`w-6 h-6 rounded-full border transition-all p-0.5 ${
                          selectedColor?.name === color.name
                            ? 'border-[#191919] ring-1 ring-[#191919]'
                            : 'border-[#DCD5C9] hover:border-[#888888]'
                        }`}
                        title={color.name}
                      >
                        <span
                          className="block w-full h-full rounded-full"
                          style={{ backgroundColor: color.hex }}
                        />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Size selector */}
              {product.sizes?.length > 0 && (
                <div className="mt-5">
                  <div className="flex justify-between items-center text-xs tracking-wider uppercase mb-2">
                    <span className="text-[#736C62]">
                      Size: <strong className="text-[#191919]">{selectedSize}</strong>
                    </span>
                    {onOpenSizeGuide && (
                      <button
                        type="button"
                        onClick={onOpenSizeGuide}
                        className="text-[11px] underline text-[#736C62] hover:text-[#191919]"
                      >
                        Size Guide
                      </button>
                    )}
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {product.sizes.map((size) => (
                      <button
                        key={size}
                        type="button"
                        onClick={() => setSelectedSize(size)}
                        className={`px-3 py-1.5 text-xs font-mono tracking-wider transition-all border ${
                          selectedSize === size
                            ? 'bg-[#191919] text-[#FAF9F5] border-[#191919]'
                            : 'bg-white text-[#191919] border-[#DCD5C9] hover:border-[#191919]'
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity selector */}
              <div className="mt-5 flex items-center gap-3">
                <span className="text-xs uppercase tracking-wider text-[#736C62]">Quantity:</span>
                <div className="flex items-center border border-[#DCD5C9] bg-white">
                  <button
                    type="button"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-8 h-8 flex items-center justify-center text-xs hover:bg-[#F2EFEB]"
                  >
                    -
                  </button>
                  <span className="w-9 text-center text-xs font-mono tabular-nums">
                    {quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-8 h-8 flex items-center justify-center text-xs hover:bg-[#F2EFEB]"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            {/* CTAs */}
            <div className="space-y-3 pt-4 border-t border-[#E8E4DC]">
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={handleAddToCart}
                  className="flex-1 py-3.5 bg-[#191919] text-[#FAF9F5] text-xs uppercase tracking-[0.2em] font-medium hover:bg-[#333333] transition-colors"
                >
                  Add to Bag
                </button>
                <button
                  type="button"
                  onClick={() => toggleWishlist(product)}
                  className={`p-3.5 border transition-colors ${
                    isFavorited
                      ? 'border-[#191919] bg-[#191919] text-[#FAF9F5]'
                      : 'border-[#DCD5C9] bg-white text-[#191919] hover:border-[#191919]'
                  }`}
                  aria-label="Toggle wishlist"
                >
                  <Heart className={`w-4 h-4 ${isFavorited ? 'fill-current' : ''}`} />
                </button>
              </div>

              <Link
                to={`/product/${product.slug}`}
                onClick={onClose}
                className="w-full py-2.5 text-center flex items-center justify-center gap-1.5 text-xs uppercase tracking-[0.16em] text-[#736C62] hover:text-[#191919] transition-colors"
              >
                View Complete Product Details
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}
