import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  Star,
  Heart,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  Truck,
  RotateCcw,
  Check,
  Share2,
  Gift,
  Sparkles,
  ShoppingBag,
  MapPin,
  MessageSquarePlus,
  X
} from 'lucide-react';
import { useCart } from '../context/CartContext.jsx';
import { useWishlist } from '../context/WishlistContext.jsx';
import { useToast } from '../context/ToastContext.jsx';
import { useProducts } from '../context/ProductContext.jsx';
import { useCurrency } from '../context/CurrencyContext.jsx';
import { useRecentlyViewed } from '../context/RecentlyViewedContext.jsx';
import { mockReviews, ratingBreakdown } from '../data/reviews.js';
import ProductCard from '../components/product/ProductCard.jsx';
import ImageWithFallback from '../components/common/ImageWithFallback.jsx';

export default function ProductDetailPage({ onQuickView, onOpenSizeGuide }) {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { products, getProductBySlug } = useProducts();
  const { formatPrice } = useCurrency();
  const { recentlyViewed, addRecentlyViewed } = useRecentlyViewed();

  const product = getProductBySlug(slug) || products[0];

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedSize, setSelectedSize] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('details');
  const [includeGiftWrap, setIncludeGiftWrap] = useState(false);

  // Delivery estimator state
  const [pincode, setPincode] = useState('400018');
  const [deliveryEstimate, setDeliveryEstimate] = useState('Delivery in 2–4 business days via Express Courier');
  const [pincodeChecked, setPincodeChecked] = useState(true);

  // Reviews state with new user reviews
  const [reviewsList, setReviewsList] = useState(mockReviews);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [showStickyBar, setShowStickyBar] = useState(false);
  const [isSwatchModalOpen, setIsSwatchModalOpen] = useState(false);
  const [newReview, setNewReview] = useState({
    name: '',
    rating: 5,
    fit: 'True to size',
    title: '',
    comment: ''
  });

  const { addToCart, openDrawer } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const { showToast } = useToast();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 500) {
        setShowStickyBar(true);
      } else {
        setShowStickyBar(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (product) {
      window.scrollTo(0, 0);
      setActiveImageIndex(0);
      setSelectedColor(product.colors?.[0] || null);
      setSelectedSize(product.sizes?.[0] || '');
      setQuantity(1);
      addRecentlyViewed(product);
    }
  }, [product, slug]);

  if (!product) {
    return (
      <div className="py-24 text-center">
        <h2 className="font-serif-luxury text-2xl text-[#191919] mb-4">
          Product Not Found
        </h2>
        <Link
          to="/shop"
          className="px-6 py-3 bg-[#191919] text-[#FAF9F5] text-xs uppercase tracking-widest"
        >
          Return to Shop
        </Link>
      </div>
    );
  }

  const isFavorited = isInWishlist(product.id);

  // Related products
  const relatedProducts = products
    .filter((p) => p.id !== product.id && p.category === product.category)
    .slice(0, 4);

  // Ensemble products for "Complete The Look"
  const ensemblePieces = products
    .filter((p) => p.id !== product.id)
    .slice(0, 2);

  // Filter recently viewed (exclude current product)
  const recentExcludingCurrent = recentlyViewed.filter((p) => p.id !== product.id).slice(0, 4);

  const handleAddToCart = () => {
    if (!selectedSize && product.sizes?.length > 0) {
      showToast('Please select a size.', 'error');
      return;
    }
    addToCart(product, selectedSize, selectedColor, quantity);
    if (includeGiftWrap) {
      showToast('Complimentary archival gift packaging noted.', 'info');
    }
    openDrawer();
  };

  const handleBuyNow = () => {
    if (!selectedSize && product.sizes?.length > 0) {
      showToast('Please select a size.', 'error');
      return;
    }
    addToCart(product, selectedSize, selectedColor, quantity);
    navigate('/checkout');
  };

  const handleAddEnsemble = () => {
    addToCart(product, selectedSize || product.sizes?.[0], selectedColor, 1);
    ensemblePieces.forEach((piece) => {
      addToCart(piece, piece.sizes?.[0] || 'Standard', piece.colors?.[0], 1);
    });
    showToast('Complete ensemble added to your bag!', 'success');
    openDrawer();
  };

  const handlePincodeCheck = (e) => {
    e.preventDefault();
    if (!pincode || pincode.length < 5) {
      showToast('Please enter a valid postal / PIN code.', 'error');
      return;
    }
    setPincodeChecked(true);
    setDeliveryEstimate(`Express transit verified for ${pincode}: Delivery in 2–3 business days with signature receipt.`);
    showToast(`Delivery verified for ${pincode}`, 'success');
  };

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    if (!newReview.name || !newReview.title || !newReview.comment) {
      showToast('Please complete all review fields.', 'error');
      return;
    }

    const created = {
      id: `rev-${Date.now()}`,
      userName: newReview.name,
      rating: newReview.rating,
      date: 'Just now',
      title: newReview.title,
      comment: newReview.comment,
      verified: true,
      fitRating: newReview.fit
    };

    setReviewsList([created, ...reviewsList]);
    setIsReviewModalOpen(false);
    setNewReview({ name: '', rating: 5, fit: 'True to size', title: '', comment: '' });
    showToast('Thank you for submitting your patron review!', 'success');
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: product.name,
        text: product.description,
        url: window.location.href
      });
    } else {
      navigator.clipboard?.writeText(window.location.href);
      showToast('Product link copied to clipboard.', 'info');
    }
  };

  const nextImage = () => {
    if (!product.images || product.images.length === 0) return;
    setActiveImageIndex((prev) => (prev + 1) % product.images.length);
  };

  const prevImage = () => {
    if (!product.images || product.images.length === 0) return;
    setActiveImageIndex((prev) => (prev - 1 + product.images.length) % product.images.length);
  };

  return (
    <div className="py-8 sm:py-14 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
      
      {/* Breadcrumb Navigation */}
      <nav className="text-[11px] uppercase tracking-[0.2em] text-[#8C857B] mb-8 flex items-center gap-2">
        <Link to="/" className="hover:text-[#191919]">Home</Link>
        <span>/</span>
        <Link to="/shop" className="hover:text-[#191919]">Shop</Link>
        <span>/</span>
        <Link to={`/shop/${product.category}`} className="hover:text-[#191919] capitalize">
          {product.category}
        </Link>
        <span>/</span>
        <span className="text-[#191919] truncate max-w-xs">{product.name}</span>
      </nav>

      {/* Main PDP Grid: Gallery (Left) + Purchase Module (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
        
        {/* Left Column: Gallery */}
        <div className="lg:col-span-7 flex flex-col gap-4">
          
          {/* Main Visual Frame with Controls */}
          <div className="relative aspect-4/5 w-full bg-[#EAE5DC] overflow-hidden shadow-2xs group">
            <ImageWithFallback
              src={product.images?.[activeImageIndex] || product.images?.[0]}
              alt={product.name}
              aspectRatio="4/5"
              className="w-full h-full object-cover transition-transform duration-500 hover:scale-103 cursor-zoom-in"
            />

            {/* Prev / Next Chevrons */}
            {product.images?.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={prevImage}
                  className="absolute left-3 top-1/2 -translate-y-1/2 p-2.5 bg-[#FAF9F5]/80 hover:bg-[#FAF9F5] backdrop-blur-xs rounded-full shadow-xs text-[#191919] transition-all opacity-0 group-hover:opacity-100 cursor-pointer"
                  aria-label="Previous image"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  type="button"
                  onClick={nextImage}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-2.5 bg-[#FAF9F5]/80 hover:bg-[#FAF9F5] backdrop-blur-xs rounded-full shadow-xs text-[#191919] transition-all opacity-0 group-hover:opacity-100 cursor-pointer"
                  aria-label="Next image"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </>
            )}

            {/* Subtle image counter */}
            {product.images?.length > 1 && (
              <span className="absolute bottom-4 right-4 bg-[#191919]/70 backdrop-blur-xs text-white text-[10px] font-mono px-2.5 py-1 tracking-widest tabular-nums">
                {activeImageIndex + 1} / {product.images.length}
              </span>
            )}
          </div>

          {/* Thumbnails row */}
          {product.images?.length > 1 && (
            <div className="flex gap-3 overflow-x-auto pb-2 no-scrollbar">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setActiveImageIndex(idx)}
                  className={`relative w-20 sm:w-24 aspect-4/5 shrink-0 overflow-hidden border transition-all cursor-pointer ${
                    activeImageIndex === idx
                      ? 'border-[#191919] ring-1 ring-[#191919]'
                      : 'border-transparent opacity-60 hover:opacity-100'
                  }`}
                >
                  <ImageWithFallback
                    src={img}
                    alt={`${product.name} angle ${idx + 1}`}
                    aspectRatio="4/5"
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}

        </div>

        {/* Right Column: Sticky Purchase Module */}
        <div className="lg:col-span-5 lg:sticky lg:top-24 space-y-6">
          
          <div>
            {/* Category kicker & Share */}
            <div className="flex items-center justify-between text-xs text-[#8C857B] uppercase tracking-[0.2em] mb-2 font-medium">
              <span>{product.category} · {product.subcategory}</span>
              <button
                type="button"
                onClick={handleShare}
                className="hover:text-[#191919] flex items-center gap-1 transition-colors cursor-pointer"
                title="Share link"
              >
                <Share2 className="w-3.5 h-3.5" />
                <span className="text-[10px]">Share</span>
              </button>
            </div>

            {/* Product Name */}
            <h1 className="font-serif-luxury text-3xl sm:text-4xl text-[#191919] font-light leading-tight">
              {product.name}
            </h1>

            {/* Rating summary */}
            <div className="flex items-center gap-2 mt-2.5">
              <div className="flex items-center text-[#191919]">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-3.5 h-3.5 ${
                      i < Math.floor(product.rating)
                        ? 'fill-current text-[#191919]'
                        : 'text-[#DCD5C9]'
                    }`}
                  />
                ))}
              </div>
              <span className="font-mono text-xs font-semibold text-[#191919] tabular-nums">
                {product.rating}
              </span>
              <span className="text-xs text-[#8C857B] font-light">
                · {reviewsList.length} Verified Reviews
              </span>
            </div>

            {/* Price section */}
            <div className="flex items-baseline gap-3 mt-4 pt-4 border-t border-[#E8E4DC]">
              <span className="font-mono text-2xl font-medium text-[#191919] tabular-nums">
                {formatPrice(product.price)}
              </span>
              {product.originalPrice && product.originalPrice > product.price && (
                <span className="font-mono text-base text-[#8C857B] line-through tabular-nums">
                  {formatPrice(product.originalPrice)}
                </span>
              )}
              {product.discount && (
                <span className="text-xs uppercase tracking-wider text-[#991B1B] font-semibold">
                  Save {product.discount}%
                </span>
              )}
            </div>
            
            {/* Scarcity notice */}
            <div className="flex items-center gap-2 text-[11px] text-[#555048] mt-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#2C5234]" />
              <span>Small-batch edition · Only {product.stock || 12} pieces remaining in current production</span>
            </div>
          </div>

          {/* Description */}
          <p className="text-xs sm:text-sm text-[#555048] font-light leading-relaxed">
            {product.description}
          </p>

          {/* Color Selector */}
          {product.colors?.length > 0 && (
            <div className="pt-2">
              <div className="flex justify-between items-center text-xs tracking-wider uppercase mb-2.5">
                <span className="text-[#696359]">
                  Color: <strong className="text-[#191919] font-semibold">{selectedColor?.name}</strong>
                </span>
              </div>
              <div className="flex items-center gap-3">
                {product.colors.map((color) => (
                  <button
                    key={color.name}
                    type="button"
                    onClick={() => setSelectedColor(color)}
                    className={`w-7 h-7 rounded-full border transition-all p-0.5 cursor-pointer ${
                      selectedColor?.name === color.name
                        ? 'border-[#191919] ring-2 ring-[#191919] ring-offset-2'
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

          {/* Size Selector */}
          {product.sizes?.length > 0 && (
            <div className="pt-2">
              <div className="flex justify-between items-center text-xs tracking-wider uppercase mb-2.5">
                <span className="text-[#696359]">
                  Size: <strong className="text-[#191919] font-semibold">{selectedSize || 'Choose size'}</strong>
                </span>
                {onOpenSizeGuide && (
                  <button
                    type="button"
                    onClick={onOpenSizeGuide}
                    className="text-[11px] underline uppercase tracking-wider text-[#736C62] hover:text-[#191919] cursor-pointer"
                  >
                    Size Guide
                  </button>
                )}
              </div>
              <div className="grid grid-cols-5 gap-2">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    type="button"
                    onClick={() => setSelectedSize(size)}
                    className={`py-3 text-xs font-mono tracking-wider transition-all border text-center cursor-pointer ${
                      selectedSize === size
                        ? 'bg-[#191919] text-[#FAF9F5] border-[#191919] font-medium'
                        : 'bg-white text-[#191919] border-[#DCD5C9] hover:border-[#191919]'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Quantity Selector */}
          <div className="flex items-center gap-4 pt-1">
            <span className="text-xs uppercase tracking-wider text-[#696359]">Quantity:</span>
            <div className="flex items-center border border-[#DCD5C9] bg-white">
              <button
                type="button"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="w-8 h-8 flex items-center justify-center text-sm text-[#555] hover:bg-[#F2EFEB] cursor-pointer"
              >
                -
              </button>
              <span className="w-10 text-center text-xs font-mono tabular-nums text-[#191919]">
                {quantity}
              </span>
              <button
                type="button"
                onClick={() => setQuantity(quantity + 1)}
                className="w-8 h-8 flex items-center justify-center text-sm text-[#555] hover:bg-[#F2EFEB] cursor-pointer"
              >
                +
              </button>
            </div>
          </div>

          {/* Postal / PIN Code Delivery Estimator */}
          <div className="p-4 bg-[#F5F2EB] border border-[#E0D9CC] space-y-2">
            <span className="text-[10.5px] uppercase tracking-wider font-semibold text-[#191919] flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5" />
              Check Estimated Delivery
            </span>
            <form onSubmit={handlePincodeCheck} className="flex gap-2">
              <input
                type="text"
                value={pincode}
                onChange={(e) => setPincode(e.target.value)}
                placeholder="Enter Postal / PIN code"
                className="flex-1 px-3 py-1.5 bg-white border border-[#DCD5C9] text-xs font-mono text-[#191919] focus:outline-hidden focus:border-[#191919]"
              />
              <button
                type="submit"
                className="px-3.5 py-1.5 bg-[#191919] text-white text-[10.5px] uppercase tracking-wider font-medium hover:bg-[#333333] transition-colors cursor-pointer"
              >
                Check
              </button>
            </form>
            {pincodeChecked && (
              <p className="text-[11px] text-[#2C5234] flex items-center gap-1 pt-1">
                <Check className="w-3 h-3 shrink-0" />
                <span>{deliveryEstimate}</span>
              </p>
            )}
          </div>

          {/* Complimentary Archival Packaging Toggle */}
          <div className="p-3.5 bg-[#F2EFEB] border border-[#E0D9CC] flex items-center justify-between text-xs">
            <div className="flex items-center gap-2.5">
              <Gift className="w-4 h-4 text-[#191919] shrink-0" />
              <div>
                <span className="font-semibold text-[#191919] block">
                  Complimentary Atelier Gift Packaging
                </span>
                <span className="text-[11px] text-[#736C62]">
                  Unbleached cotton dust bag with wax-sealed card
                </span>
              </div>
            </div>
            <input
              type="checkbox"
              checked={includeGiftWrap}
              onChange={(e) => setIncludeGiftWrap(e.target.checked)}
              className="accent-[#191919] w-4 h-4 cursor-pointer"
            />
          </div>

          {/* Action CTAs */}
          <div className="space-y-3 pt-2">
            <div className="flex gap-3">
              <button
                type="button"
                onClick={handleAddToCart}
                className="flex-1 py-4 bg-[#191919] text-[#FAF9F5] text-xs uppercase tracking-[0.2em] font-medium hover:bg-[#333333] transition-colors shadow-xs flex items-center justify-center gap-2 cursor-pointer"
              >
                Add to Bag
              </button>

              <button
                type="button"
                onClick={() => toggleWishlist(product)}
                className={`p-4 border transition-colors cursor-pointer ${
                  isFavorited
                    ? 'border-[#191919] bg-[#191919] text-[#FAF9F5]'
                    : 'border-[#DCD5C9] bg-white text-[#191919] hover:border-[#191919]'
                }`}
                aria-label={isFavorited ? 'Remove from wishlist' : 'Add to wishlist'}
              >
                <Heart className={`w-4 h-4 ${isFavorited ? 'fill-current' : ''}`} />
              </button>
            </div>

            <button
              type="button"
              onClick={handleBuyNow}
              className="w-full py-3.5 bg-transparent border border-[#191919] text-[#191919] text-xs uppercase tracking-[0.2em] font-medium hover:bg-[#191919] hover:text-[#FAF9F5] transition-colors cursor-pointer"
            >
              Buy Now
            </button>
          </div>

          {/* Trust Guarantees */}
          <div className="pt-6 border-t border-[#E8E4DC] space-y-3 text-xs text-[#555048]">
            <div className="flex items-center gap-3">
              <Truck className="w-4 h-4 text-[#191919] shrink-0 stroke-[1.5]" />
              <span>Free shipping over {formatPrice(2999)} with complimentary insured delivery</span>
            </div>
            <div className="flex items-center gap-3">
              <RotateCcw className="w-4 h-4 text-[#191919] shrink-0 stroke-[1.5]" />
              <span>Easy 7-day returns & home collection service</span>
            </div>
            <div className="flex items-center gap-3">
              <ShieldCheck className="w-4 h-4 text-[#191919] shrink-0 stroke-[1.5]" />
              <span>100% Certified organic monofilaments with atelier warranty</span>
            </div>
          </div>

          {/* Details / Fabric Tabs */}
          <div className="pt-4 border-t border-[#E8E4DC]">
            <div className="flex border-b border-[#E8E4DC] text-xs uppercase tracking-wider">
              <button
                onClick={() => setActiveTab('details')}
                className={`py-2.5 px-4 font-medium transition-colors cursor-pointer ${
                  activeTab === 'details'
                    ? 'border-b-2 border-[#191919] text-[#191919]'
                    : 'text-[#8C857B] hover:text-[#191919]'
                }`}
              >
                Atelier Details
              </button>
              <button
                onClick={() => setActiveTab('care')}
                className={`py-2.5 px-4 font-medium transition-colors cursor-pointer ${
                  activeTab === 'care'
                    ? 'border-b-2 border-[#191919] text-[#191919]'
                    : 'text-[#8C857B] hover:text-[#191919]'
                }`}
              >
                Care & Material
              </button>
            </div>

            <div className="py-4 text-xs text-[#555048] leading-relaxed">
              {activeTab === 'details' ? (
                <ul className="space-y-2 list-disc list-inside">
                  {product.details?.map((d, i) => (
                    <li key={i}>{d}</li>
                  ))}
                </ul>
              ) : (
                <ul className="space-y-2 list-disc list-inside">
                  {product.care?.map((c, i) => (
                    <li key={i}>{c}</li>
                  ))}
                </ul>
              )}
            </div>
          </div>

        </div>

      </div>

      {/* "Complete The Look" Curated Ensemble Section */}
      <section className="mt-20 pt-16 border-t border-[#E8E4DC] bg-[#F5F2EB] p-8 sm:p-12 border">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-4 border-b border-[#E0D9CC]">
          <div>
            <span className="text-[11px] uppercase tracking-[0.25em] text-[#8C857B] font-mono block mb-1">
              STYLED TOGETHER
            </span>
            <h3 className="font-serif-luxury text-3xl text-[#191919] font-light">
              Complete The Look
            </h3>
          </div>
          <button
            type="button"
            onClick={handleAddEnsemble}
            className="mt-4 md:mt-0 px-6 py-3 bg-[#191919] text-[#FAF9F5] text-xs uppercase tracking-widest font-medium hover:bg-[#333333] transition-colors inline-flex items-center gap-2 cursor-pointer"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            Add Complete Ensemble ({formatPrice(product.price + ensemblePieces.reduce((s, p) => s + p.price, 0))})
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="p-4 bg-white border border-[#DCD5C9] space-y-3">
            <div className="aspect-4/5 bg-[#EAE5DC] overflow-hidden">
              <ImageWithFallback
                src={product.images?.[0]}
                alt={product.name}
                aspectRatio="4/5"
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <span className="text-[10px] uppercase tracking-wider text-[#8C857B] block font-mono">Current Selection</span>
              <h4 className="font-serif-luxury text-base text-[#191919] font-medium">{product.name}</h4>
              <p className="font-mono text-xs font-semibold text-[#191919]">{formatPrice(product.price)}</p>
            </div>
          </div>

          {ensemblePieces.map((piece) => (
            <div key={piece.id} className="p-4 bg-white border border-[#DCD5C9] space-y-3">
              <Link to={`/product/${piece.slug}`} className="block aspect-4/5 bg-[#EAE5DC] overflow-hidden">
                <ImageWithFallback
                  src={piece.images?.[0]}
                  alt={piece.name}
                  aspectRatio="4/5"
                  className="w-full h-full object-cover hover:scale-105 transition-transform"
                />
              </Link>
              <div>
                <span className="text-[10px] uppercase tracking-wider text-[#8C857B] block font-mono">Matches With</span>
                <Link to={`/product/${piece.slug}`} className="font-serif-luxury text-base text-[#191919] font-medium hover:underline block truncate">
                  {piece.name}
                </Link>
                <p className="font-mono text-xs font-semibold text-[#191919]">{formatPrice(piece.price)}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Reviews Breakdown Section with "Write a Review" button */}
      <section className="mt-20 pt-16 border-t border-[#E8E4DC]">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 border-b border-[#E8E4DC] pb-6 gap-4">
            <div>
              <span className="text-[11px] uppercase tracking-[0.25em] text-[#8C857B] font-medium block mb-2">
                Verified Patron Feedback
              </span>
              <h3 className="font-serif-luxury text-3xl sm:text-4xl text-[#191919] font-light">
                Customer Reviews
              </h3>
            </div>
            <button
              type="button"
              onClick={() => setIsReviewModalOpen(true)}
              className="px-5 py-2.5 bg-[#191919] text-white text-xs uppercase tracking-wider font-semibold hover:bg-[#333333] transition-colors flex items-center gap-1.5 cursor-pointer self-start sm:self-auto"
            >
              <MessageSquarePlus className="w-4 h-4" />
              <span>Write a Review</span>
            </button>
          </div>

          {/* Score breakdown card */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 p-8 bg-[#F5F2EB] border border-[#E8E4DC] mb-12 items-center">
            <div className="md:col-span-4 text-center md:border-r border-[#DCD5C9] pr-0 md:pr-6">
              <div className="font-serif-luxury text-5xl text-[#191919] font-light">
                {product.rating}
              </div>
              <div className="flex justify-center text-[#191919] my-2">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>
              <p className="text-xs text-[#736C62]">
                Based on {reviewsList.length} verified purchases
              </p>
            </div>

            <div className="md:col-span-8 space-y-2">
              {ratingBreakdown.stars.map((s) => (
                <div key={s.star} className="flex items-center gap-3 text-xs">
                  <span className="w-12 font-mono text-[#555]">{s.star} Stars</span>
                  <div className="flex-1 bg-[#E0D9CE] h-1.5 rounded-full overflow-hidden">
                    <div
                      className="bg-[#191919] h-full"
                      style={{ width: `${s.percentage}%` }}
                    />
                  </div>
                  <span className="w-10 text-right font-mono text-[#8C857B] tabular-nums">
                    {s.percentage}%
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Individual Reviews */}
          <div className="space-y-8 divide-y divide-[#E8E4DC]">
            {reviewsList.map((rev) => (
              <div key={rev.id} className="pt-8 first:pt-0 space-y-2">
                <div className="flex justify-between items-baseline">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold text-[#191919] uppercase tracking-wider">
                      {rev.userName}
                    </span>
                    {rev.verified && (
                      <span className="text-[10px] text-[#2C5234] flex items-center gap-0.5">
                        <Check className="w-3 h-3" />
                        Verified Buyer
                      </span>
                    )}
                  </div>
                  <span className="text-[11px] text-[#8C857B] font-mono">{rev.date}</span>
                </div>

                <div className="flex items-center gap-1 text-[#191919]">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-current" />
                  ))}
                  {rev.fitRating && (
                    <span className="text-[11px] text-[#736C62] ml-2">
                      · Fit: {rev.fitRating}
                    </span>
                  )}
                </div>

                <h4 className="font-serif-luxury text-base text-[#191919] font-medium pt-1">
                  "{rev.title}"
                </h4>
                <p className="text-xs text-[#555048] leading-relaxed font-light">
                  {rev.comment}
                </p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Related Products Section */}
      {relatedProducts.length > 0 && (
        <section className="mt-20 pt-16 border-t border-[#E8E4DC]">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10">
            <div>
              <span className="text-[11px] uppercase tracking-[0.25em] text-[#8C857B] font-medium block mb-2">
                Complementary Curations
              </span>
              <h3 className="font-serif-luxury text-3xl text-[#191919] font-light">
                You May Also Like
              </h3>
            </div>
            <Link
              to={`/shop/${product.category}`}
              className="text-xs uppercase tracking-[0.18em] text-[#191919] hover:underline mt-2 md:mt-0"
            >
              View More in {product.category}
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            {relatedProducts.map((p) => (
              <ProductCard
                key={p.id}
                product={p}
                onQuickView={onQuickView}
              />
            ))}
          </div>
        </section>
      )}

      {/* Recently Viewed Products Section */}
      {recentExcludingCurrent.length > 0 && (
        <section className="mt-20 pt-16 border-t border-[#E8E4DC]">
          <div className="mb-8">
            <span className="text-[11px] uppercase tracking-[0.25em] text-[#8C857B] font-medium block mb-1">
              Browsing History
            </span>
            <h3 className="font-serif-luxury text-2xl text-[#191919] font-light">
              Recently Viewed Pieces
            </h3>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            {recentExcludingCurrent.map((p) => (
              <ProductCard
                key={p.id}
                product={p}
                onQuickView={onQuickView}
              />
            ))}
          </div>
        </section>
      )}

      {/* Mobile Sticky Bottom Action Bar */}
      <div className="lg:hidden fixed bottom-0 inset-x-0 bg-[#FAF9F5]/95 backdrop-blur-md border-t border-[#E8E4DC] p-3.5 px-4 z-40 flex items-center justify-between gap-3 shadow-2xl">
        <div className="min-w-0 flex-1">
          <p className="font-serif-luxury text-xs text-[#191919] truncate font-medium">
            {product.name}
          </p>
          <p className="font-mono text-xs font-semibold text-[#191919] tabular-nums">
            {formatPrice(product.price)}
          </p>
        </div>
        <button
          type="button"
          onClick={handleAddToCart}
          className="px-6 py-2.5 bg-[#191919] text-[#FAF9F5] text-xs uppercase tracking-widest font-medium hover:bg-[#333333] transition-colors shrink-0 cursor-pointer shadow-xs"
        >
          Add to Bag
        </button>
      </div>

      {/* Write a Review Modal */}
      {isReviewModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-black/70 backdrop-blur-xs"
            onClick={() => setIsReviewModalOpen(false)}
          />
          <div className="relative bg-[#FAF9F5] border border-[#DCD5C9] max-w-lg w-full p-6 sm:p-8 shadow-2xl z-10 space-y-4">
            <div className="flex justify-between items-center pb-4 border-b border-[#E8E4DC]">
              <div>
                <span className="text-[10px] uppercase tracking-widest text-[#888] font-mono">
                  PATRON PERSPECTIVE
                </span>
                <h3 className="font-serif-luxury text-2xl text-[#191919]">
                  Review: {product.name}
                </h3>
              </div>
              <button
                onClick={() => setIsReviewModalOpen(false)}
                className="text-[#888] hover:text-[#191919]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleReviewSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block text-[11px] uppercase tracking-wider text-[#696359] mb-1 font-medium">
                  Your Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Maya Sengupta"
                  value={newReview.name}
                  onChange={(e) => setNewReview({ ...newReview, name: e.target.value })}
                  className="w-full px-3 py-2.5 bg-white border border-[#DCD5C9] text-xs text-[#191919] focus:outline-hidden focus:border-[#191919]"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-[#696359] mb-1 font-medium">
                    Star Rating *
                  </label>
                  <select
                    value={newReview.rating}
                    onChange={(e) => setNewReview({ ...newReview, rating: Number(e.target.value) })}
                    className="w-full px-3 py-2.5 bg-white border border-[#DCD5C9] text-xs text-[#191919]"
                  >
                    <option value={5}>★★★★★ (5 Stars - Exceptional)</option>
                    <option value={4}>★★★★☆ (4 Stars - Commendable)</option>
                    <option value={3}>★★★☆☆ (3 Stars - Average)</option>
                    <option value={2}>★★☆☆☆ (2 Stars - Needs Work)</option>
                    <option value={1}>★☆☆☆☆ (1 Star - Poor)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-[#696359] mb-1 font-medium">
                    Fit Assessment
                  </label>
                  <select
                    value={newReview.fit}
                    onChange={(e) => setNewReview({ ...newReview, fit: e.target.value })}
                    className="w-full px-3 py-2.5 bg-white border border-[#DCD5C9] text-xs text-[#191919]"
                  >
                    <option value="Runs small">Runs slightly small</option>
                    <option value="True to size">True to size (Recommended)</option>
                    <option value="Runs large">Runs slightly oversized</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[11px] uppercase tracking-wider text-[#696359] mb-1 font-medium">
                  Review Headline *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Impeccable drape and natural hand-feel"
                  value={newReview.title}
                  onChange={(e) => setNewReview({ ...newReview, title: e.target.value })}
                  className="w-full px-3 py-2.5 bg-white border border-[#DCD5C9] text-xs text-[#191919] focus:outline-hidden focus:border-[#191919]"
                />
              </div>

              <div>
                <label className="block text-[11px] uppercase tracking-wider text-[#696359] mb-1 font-medium">
                  Your Thoughts & Experience *
                </label>
                <textarea
                  rows={4}
                  required
                  placeholder="Share details on the textile weight, styling versatility, and comfort..."
                  value={newReview.comment}
                  onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                  className="w-full px-3 py-2.5 bg-white border border-[#DCD5C9] text-xs text-[#191919] focus:outline-hidden focus:border-[#191919]"
                />
              </div>

              <div className="pt-4 border-t border-[#E8E4DC] flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsReviewModalOpen(false)}
                  className="px-4 py-2.5 text-xs uppercase tracking-wider text-[#736C62]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-[#191919] text-[#FAF9F5] text-xs uppercase tracking-wider font-semibold hover:bg-[#333333]"
                >
                  Publish Review
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Sticky Bottom Add-to-Bag Bar */}
      <div
        className={`fixed bottom-0 inset-x-0 bg-[#FAF9F5]/95 backdrop-blur-md border-t border-[#E8E4DC] p-3 sm:p-4 z-40 transition-transform duration-300 shadow-xl ${
          showStickyBar ? 'translate-y-0' : 'translate-y-full pointer-events-none'
        }`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 sm:w-12 aspect-4/5 bg-[#EAE5DC] overflow-hidden shrink-0">
              <ImageWithFallback
                src={product.images?.[0]}
                alt={product.name}
                aspectRatio="4/5"
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h4 className="font-serif-luxury text-sm font-medium text-[#191919] truncate max-w-xs sm:max-w-md">
                {product.name}
              </h4>
              <div className="flex items-center gap-2 text-xs font-mono">
                <span className="font-semibold text-[#191919]">{formatPrice(product.price)}</span>
                <span className="text-[#888]">·</span>
                <span className="text-[#696359]">{selectedColor?.name || 'Default'} / {selectedSize || 'Standard'}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={handleAddToCart}
              className="px-5 sm:px-8 py-3 bg-[#191919] text-[#FAF9F5] hover:bg-[#333333] text-xs uppercase tracking-[0.2em] font-medium transition-all shadow-md flex items-center gap-2 cursor-pointer"
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>Add to Bag</span>
            </button>
          </div>
        </div>
      </div>

    </div>
  );
}
