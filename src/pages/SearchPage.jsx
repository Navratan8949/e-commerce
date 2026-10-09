import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Search, X, ArrowRight } from 'lucide-react';
import ProductGrid from '../components/product/ProductGrid.jsx';
import { useProducts } from '../context/ProductContext.jsx';

export default function SearchPage({ onQuickView }) {
  const { products } = useProducts();
  const [searchParams, setSearchParams] = useSearchParams();
  const initialQuery = searchParams.get('q') || '';
  const [searchTerm, setSearchTerm] = useState(initialQuery);

  useEffect(() => {
    setSearchTerm(searchParams.get('q') || '');
  }, [searchParams]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setSearchParams(searchTerm ? { q: searchTerm } : {});
  };

  const handleClear = () => {
    setSearchTerm('');
    setSearchParams({});
  };

  const searchResults = useMemo(() => {
    const q = searchTerm.trim().toLowerCase();
    if (!q) return products;

    return products.filter((p) => {
      const matchName = p.name.toLowerCase().includes(q);
      const matchCategory = p.category.toLowerCase().includes(q);
      const matchSubcategory = p.subcategory.toLowerCase().includes(q);
      const matchDescription = p.description.toLowerCase().includes(q);
      const matchTags = p.tags?.some((t) => t.toLowerCase().includes(q));

      return matchName || matchCategory || matchSubcategory || matchDescription || matchTags;
    });
  }, [searchTerm]);

  const queryKicker = searchTerm ? `Search results for "${searchTerm}"` : 'Explore the full FILLKART catalog';

  return (
    <div className="py-12 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Header and Search Bar */}
      <div className="max-w-3xl mx-auto text-center mb-12">
        <span className="text-[11px] uppercase tracking-[0.25em] text-[#8C857B] font-medium block mb-2">
          Atelier Search
        </span>
        <h1 className="font-serif-luxury text-3xl sm:text-4xl text-[#191919] font-light mb-6">
          Find Your Essential
        </h1>

        <form onSubmit={handleSearchSubmit} className="relative max-w-xl mx-auto">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by keyword, textile, dress, linen..."
            className="w-full pl-12 pr-10 py-4 bg-[#FAF9F5] border border-[#DCD5C9] text-sm text-[#191919] placeholder-[#9E988F] focus:outline-hidden focus:border-[#191919] shadow-xs transition-colors"
          />
          <Search className="w-5 h-5 text-[#8C857B] absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
          {searchTerm && (
            <button
              type="button"
              onClick={handleClear}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-[#8C857B] hover:text-[#191919]"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </form>

        {/* Popular searches suggestions */}
        <div className="flex flex-wrap items-center justify-center gap-2 mt-4 text-xs text-[#736C62]">
          <span className="uppercase tracking-widest text-[10px] text-[#A39E94]">Popular:</span>
          {['Linen', 'Blazer', 'Tote', 'Slip Dress', 'Silk', 'Trousers'].map((suggestion) => (
            <button
              key={suggestion}
              type="button"
              onClick={() => {
                setSearchTerm(suggestion);
                setSearchParams({ q: suggestion });
              }}
              className="px-2.5 py-1 bg-[#F2EFEB] hover:bg-[#E8E4DC] text-[#444] transition-colors"
            >
              {suggestion}
            </button>
          ))}
        </div>
      </div>

      {/* Results Header */}
      <div className="flex items-center justify-between border-b border-[#E8E4DC] pb-4 mb-8">
        <h2 className="text-xs uppercase tracking-[0.2em] font-medium text-[#191919]">
          {queryKicker}
        </h2>
        <span className="text-xs text-[#8C857B] font-mono tabular-nums">
          {searchResults.length} {searchResults.length === 1 ? 'Result' : 'Results'}
        </span>
      </div>

      {/* Results or Empty State */}
      {searchResults.length === 0 ? (
        <div className="text-center py-20 bg-[#F5F2EB] border border-[#E8E4DC] max-w-2xl mx-auto p-8">
          <h3 className="font-serif-luxury text-2xl text-[#191919] mb-2">
            No products found
          </h3>
          <p className="text-xs text-[#736C62] max-w-sm mx-auto mb-6 leading-relaxed">
            We couldn't find any designs matching "{searchTerm}". Please try a different search or explore our complete collections.
          </p>
          <Link
            to="/shop"
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#191919] text-[#FAF9F5] text-xs uppercase tracking-[0.2em] font-medium hover:bg-[#333333] transition-colors"
          >
            Continue Shopping
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      ) : (
        <ProductGrid
          products={searchResults}
          onQuickView={onQuickView}
        />
      )}

    </div>
  );
}
