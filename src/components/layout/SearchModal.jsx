import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Search, X, ArrowRight, Sparkles } from 'lucide-react';
import { useProducts } from '../../context/ProductContext.jsx';
import { useCurrency } from '../../context/CurrencyContext.jsx';
import ImageWithFallback from '../common/ImageWithFallback.jsx';

export default function SearchModal({ isOpen, onClose }) {
  const [query, setQuery] = useState('');
  const { products } = useProducts();
  const { formatPrice } = useCurrency();
  const navigate = useNavigate();
  const inputRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      document.body.style.overflow = '';
      setQuery('');
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const trimmed = query.trim().toLowerCase();

  const results = trimmed
    ? products
        .filter((p) => {
          const matchName = p.name.toLowerCase().includes(trimmed);
          const matchCat = p.category.toLowerCase().includes(trimmed);
          const matchSub = p.subcategory.toLowerCase().includes(trimmed);
          const matchDesc = p.description.toLowerCase().includes(trimmed);
          const matchTags = p.tags?.some((t) => t.toLowerCase().includes(trimmed));
          return matchName || matchCat || matchSub || matchDesc || matchTags;
        })
        .slice(0, 6)
    : [];

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (trimmed) {
      onClose();
      navigate(`/search?q=${encodeURIComponent(trimmed)}`);
    }
  };

  const trendingTags = ['Linen Shirt', 'Slip Dress', 'Tailored Blazer', 'Leather Tote', 'Cashmere', 'Palazzo'];

  return (
    <div className="fixed inset-0 z-50 flex flex-col justify-start">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#121110]/80 backdrop-blur-md transition-opacity duration-300"
        onClick={onClose}
      />

      {/* Main Search Panel */}
      <div className="relative z-10 w-full bg-[#FAF9F5] border-b border-[#E0D9CC] shadow-2xl py-8 px-4 sm:px-8 max-h-[90vh] overflow-y-auto">
        <div className="max-w-4xl mx-auto space-y-6">
          
          {/* Top Bar with Close */}
          <div className="flex items-center justify-between pb-4 border-b border-[#E8E4DC]">
            <span className="text-[10.5px] uppercase tracking-[0.25em] text-[#8C857B] font-mono">
              PREDICTIVE ATELIER SEARCH
            </span>
            <button
              type="button"
              onClick={onClose}
              className="p-1.5 text-[#191919] hover:opacity-60 transition-opacity cursor-pointer flex items-center gap-1.5 text-xs uppercase tracking-wider"
            >
              <span>Close</span>
              <X className="w-4 h-4 stroke-[1.5]" />
            </button>
          </div>

          {/* Search Input */}
          <form onSubmit={handleSearchSubmit} className="relative">
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by silhouette, material, category (e.g. Linen, Blazer, Silk)..."
              className="w-full pl-12 pr-12 py-4 bg-transparent border-b-2 border-[#191919] text-lg sm:text-2xl font-serif-luxury text-[#191919] placeholder-[#9E988F] focus:outline-hidden"
            />
            <Search className="w-6 h-6 text-[#191919] absolute left-2 top-1/2 -translate-y-1/2" />
            {query && (
              <button
                type="button"
                onClick={() => setQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#888] hover:text-[#191919]"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </form>

          {/* Trending keywords */}
          {!trimmed && (
            <div className="pt-2">
              <span className="text-[10px] uppercase tracking-widest text-[#8C857B] block mb-2 font-mono">
                TRENDING ATELIER INQUIRIES
              </span>
              <div className="flex flex-wrap gap-2">
                {trendingTags.map((tag) => (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => setQuery(tag)}
                    className="px-3 py-1.5 bg-[#F2EFEB] hover:bg-[#EAE5DC] text-xs text-[#2A2724] uppercase tracking-wider transition-colors cursor-pointer"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Live Matching Results Grid */}
          {trimmed && (
            <div className="pt-4 space-y-4">
              <div className="flex items-center justify-between text-xs text-[#736C62] uppercase tracking-wider">
                <span>Matching Pieces ({results.length})</span>
                {results.length > 0 && (
                  <button
                    type="button"
                    onClick={handleSearchSubmit}
                    className="text-[#191919] font-semibold underline flex items-center gap-1 cursor-pointer"
                  >
                    <span>View all matching results</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              {results.length === 0 ? (
                <div className="py-12 text-center text-xs text-[#736C62]">
                  No pieces found matching "{query}". Try checking your spelling or search by material like "linen" or "wool".
                </div>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3 pt-2">
                  {results.map((product) => (
                    <Link
                      key={product.id}
                      to={`/product/${product.slug}`}
                      onClick={onClose}
                      className="group flex flex-col p-2 bg-[#F5F2EB] hover:bg-white border border-[#E8E4DC] transition-all"
                    >
                      <div className="aspect-4/5 w-full bg-[#EAE5DC] overflow-hidden mb-2">
                        <ImageWithFallback
                          src={product.images?.[0]}
                          alt={product.name}
                          aspectRatio="4/5"
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                        />
                      </div>
                      <span className="text-[9.5px] uppercase tracking-wider text-[#8C857B] block truncate">
                        {product.category}
                      </span>
                      <h4 className="font-serif-luxury text-xs text-[#191919] truncate font-medium">
                        {product.name}
                      </h4>
                      <p className="font-mono text-xs text-[#191919] font-semibold mt-1">
                        {formatPrice(product.price)}
                      </p>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
