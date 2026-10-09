import React, { useState, useMemo, useEffect } from 'react';
import { useParams, useSearchParams, Link } from 'react-router-dom';
import { SlidersHorizontal, X, LayoutGrid, Grid2X2, Check, ArrowRight } from 'lucide-react';
import ProductGrid from '../components/product/ProductGrid.jsx';
import ProductCard from '../components/product/ProductCard.jsx';
import { useProducts } from '../context/ProductContext.jsx';
import { categories } from '../data/categories.js';

export default function ShopPage({ onQuickView }) {
  const { products } = useProducts();
  const { category: urlCategory } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();

  // Active filter states
  const [selectedCategory, setSelectedCategory] = useState(urlCategory || 'all');
  const [selectedSubcategory, setSelectedSubcategory] = useState('all');
  const [selectedSize, setSelectedSize] = useState('all');
  const [selectedColor, setSelectedColor] = useState('all');
  const [selectedPriceRange, setSelectedPriceRange] = useState('all');
  const [selectedMinRating, setSelectedMinRating] = useState(0);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [sortBy, setSortBy] = useState('featured');
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);

  // Grid layout view: 'catalog' (4-col) or 'editorial' (2-col large)
  const [gridView, setGridView] = useState('catalog');

  // Sync category when URL changes
  useEffect(() => {
    if (urlCategory) {
      setSelectedCategory(urlCategory);
    } else {
      setSelectedCategory('all');
    }
  }, [urlCategory]);

  // Sync sale param
  useEffect(() => {
    if (searchParams.get('sale') === 'true') {
      setSelectedPriceRange('sale');
    }
  }, [searchParams]);

  const availableSizes = ['XS', 'S', 'M', 'L', 'XL'];
  const availableColors = [
    { name: 'White / Cream', key: 'white' },
    { name: 'Black / Dark', key: 'black' },
    { name: 'Taupe / Sand', key: 'taupe' },
    { name: 'Navy / Blue', key: 'navy' },
    { name: 'Olive / Green', key: 'olive' }
  ];

  // Category title & description
  const categoryMeta = useMemo(() => {
    if (!selectedCategory || selectedCategory === 'all') {
      return {
        title: 'Complete Collection',
        subtitle: 'Discover the complete FILLKART catalog of modern essentials, architectural tailoring, and natural textiles.'
      };
    }
    const cat = categories.find((c) => c.slug === selectedCategory);
    if (cat) {
      return {
        title: cat.title,
        subtitle: cat.description
      };
    }
    return {
      title: 'Shop',
      subtitle: 'Discover the FILLKART collection.'
    };
  }, [selectedCategory]);

  const resetFilters = () => {
    setSelectedCategory(urlCategory || 'all');
    setSelectedSubcategory('all');
    setSelectedSize('all');
    setSelectedColor('all');
    setSelectedPriceRange('all');
    setSelectedMinRating(0);
    setInStockOnly(false);
    setSortBy('featured');
  };

  const filteredProducts = useMemo(() => {
    return products
      .filter((product) => {
        if (selectedCategory !== 'all') {
          if (selectedCategory === 'new-arrivals') {
            if (!product.isNew && product.category !== 'new-arrivals') return false;
          } else if (product.category !== selectedCategory) {
            return false;
          }
        }

        if (selectedSubcategory !== 'all' && product.subcategory !== selectedSubcategory) {
          return false;
        }

        if (selectedSize !== 'all') {
          if (!product.sizes?.includes(selectedSize)) return false;
        }

        if (selectedColor !== 'all') {
          const colorMatch = product.colors?.some((c) =>
            c.name.toLowerCase().includes(selectedColor)
          );
          if (!colorMatch) return false;
        }

        if (selectedPriceRange === 'under-4000' && product.price >= 4000) return false;
        if (
          selectedPriceRange === '4000-8000' &&
          (product.price < 4000 || product.price > 8000)
        )
          return false;
        if (selectedPriceRange === 'above-8000' && product.price <= 8000) return false;
        if (selectedPriceRange === 'sale' && !product.discount) return false;

        if (selectedMinRating > 0 && product.rating < selectedMinRating) return false;
        if (inStockOnly && product.stock <= 0) return false;

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'price-low') return a.price - b.price;
        if (sortBy === 'price-high') return b.price - a.price;
        if (sortBy === 'rating') return b.rating - a.rating;
        if (sortBy === 'newest') return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0);
        return 0;
      });
  }, [
    selectedCategory,
    selectedSubcategory,
    selectedSize,
    selectedColor,
    selectedPriceRange,
    selectedMinRating,
    inStockOnly,
    sortBy
  ]);

  return (
    <div className="py-10 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Page Header */}
      <div className="border-b border-[#E8E4DC] pb-8 mb-10">
        <nav className="text-[11px] uppercase tracking-[0.2em] text-[#8C857B] mb-3 flex items-center gap-2">
          <Link to="/" className="hover:text-[#191919]">Home</Link>
          <span>/</span>
          <Link to="/shop" className="hover:text-[#191919]">Shop</Link>
          {selectedCategory !== 'all' && (
            <>
              <span>/</span>
              <span className="text-[#191919] capitalize">{selectedCategory}</span>
            </>
          )}
        </nav>

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h1 className="font-serif-luxury text-3xl sm:text-5xl text-[#191919] font-light">
              {categoryMeta.title}
            </h1>
            <p className="text-xs sm:text-sm text-[#736C62] font-light mt-2 max-w-xl leading-relaxed">
              {categoryMeta.subtitle}
            </p>
          </div>
          <span className="text-xs text-[#8C857B] font-mono tabular-nums uppercase tracking-widest shrink-0">
            {filteredProducts.length} {filteredProducts.length === 1 ? 'Design' : 'Designs'}
          </span>
        </div>

        {/* Quick Department Shortcuts */}
        <div className="flex items-center gap-3 overflow-x-auto pt-6 no-scrollbar">
          {[
            { label: 'All Pieces', key: 'all' },
            { label: 'Women', key: 'women' },
            { label: 'Men', key: 'men' },
            { label: 'Accessories', key: 'accessories' },
            { label: 'New Arrivals', key: 'new-arrivals' }
          ].map((item) => (
            <button
              key={item.key}
              type="button"
              onClick={() => setSelectedCategory(item.key)}
              className={`px-4 py-2 text-xs uppercase tracking-wider whitespace-nowrap transition-all border cursor-pointer ${
                selectedCategory === item.key
                  ? 'bg-[#191919] text-[#FAF9F5] border-[#191919] font-medium'
                  : 'bg-white text-[#555048] border-[#DCD5C9] hover:border-[#191919]'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {/* Main Layout: Filters Sidebar + Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
        
        {/* Desktop Sidebar Filters */}
        <aside className="hidden lg:block lg:col-span-3 space-y-8 pr-6 border-r border-[#E8E4DC]">
          <div className="flex items-center justify-between pb-3 border-b border-[#E8E4DC]">
            <span className="text-xs uppercase tracking-[0.2em] font-semibold text-[#191919]">
              Filters
            </span>
            <button
              type="button"
              onClick={resetFilters}
              className="text-[11px] uppercase tracking-wider text-[#8C857B] hover:text-[#191919] underline cursor-pointer"
            >
              Reset All
            </button>
          </div>

          {/* Department Filter */}
          <div>
            <h4 className="text-xs uppercase tracking-[0.18em] font-medium text-[#191919] mb-3">
              Department
            </h4>
            <div className="space-y-2 text-xs">
              {[
                { label: 'All Collections', value: 'all' },
                { label: 'Women', value: 'women' },
                { label: 'Men', value: 'men' },
                { label: 'Accessories', value: 'accessories' },
                { label: 'New Arrivals', value: 'new-arrivals' }
              ].map((item) => (
                <button
                  key={item.value}
                  type="button"
                  onClick={() => setSelectedCategory(item.value)}
                  className={`block w-full text-left py-1 tracking-wider transition-colors cursor-pointer ${
                    selectedCategory === item.value
                      ? 'font-bold text-[#191919]'
                      : 'text-[#696359] hover:text-[#191919]'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          {/* Size Filter */}
          <div className="pt-6 border-t border-[#F0ECE1]">
            <h4 className="text-xs uppercase tracking-[0.18em] font-medium text-[#191919] mb-3">
              Size
            </h4>
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => setSelectedSize('all')}
                className={`px-2.5 py-1 text-xs border tracking-wider cursor-pointer ${
                  selectedSize === 'all'
                    ? 'bg-[#191919] text-[#FAF9F5] border-[#191919]'
                    : 'bg-white text-[#555] border-[#DCD5C9] hover:border-[#191919]'
                }`}
              >
                All
              </button>
              {availableSizes.map((sz) => (
                <button
                  key={sz}
                  type="button"
                  onClick={() => setSelectedSize(sz === selectedSize ? 'all' : sz)}
                  className={`px-2.5 py-1 text-xs border tracking-wider font-mono cursor-pointer ${
                    selectedSize === sz
                      ? 'bg-[#191919] text-[#FAF9F5] border-[#191919]'
                      : 'bg-white text-[#555] border-[#DCD5C9] hover:border-[#191919]'
                  }`}
                >
                  {sz}
                </button>
              ))}
            </div>
          </div>

          {/* Tonal Family */}
          <div className="pt-6 border-t border-[#F0ECE1]">
            <h4 className="text-xs uppercase tracking-[0.18em] font-medium text-[#191919] mb-3">
              Tonal Family
            </h4>
            <div className="space-y-1.5 text-xs">
              <button
                type="button"
                onClick={() => setSelectedColor('all')}
                className={`block w-full text-left py-1 tracking-wider cursor-pointer ${
                  selectedColor === 'all' ? 'font-bold text-[#191919]' : 'text-[#696359] hover:text-[#191919]'
                }`}
              >
                All Hues
              </button>
              {availableColors.map((c) => (
                <button
                  key={c.key}
                  type="button"
                  onClick={() => setSelectedColor(selectedColor === c.key ? 'all' : c.key)}
                  className={`block w-full text-left py-1 tracking-wider cursor-pointer ${
                    selectedColor === c.key
                      ? 'font-bold text-[#191919]'
                      : 'text-[#696359] hover:text-[#191919]'
                  }`}
                >
                  {c.name}
                </button>
              ))}
            </div>
          </div>

          {/* Price Range */}
          <div className="pt-6 border-t border-[#F0ECE1]">
            <h4 className="text-xs uppercase tracking-[0.18em] font-medium text-[#191919] mb-3">
              Price (INR)
            </h4>
            <div className="space-y-2 text-xs">
              {[
                { label: 'All Prices', value: 'all' },
                { label: 'Under ₹4,000', value: 'under-4000' },
                { label: '₹4,000 – ₹8,000', value: '4000-8000' },
                { label: 'Above ₹8,000', value: 'above-8000' },
                { label: 'Private Sale', value: 'sale' }
              ].map((p) => (
                <button
                  key={p.value}
                  type="button"
                  onClick={() => setSelectedPriceRange(p.value)}
                  className={`block w-full text-left py-1 tracking-wider cursor-pointer ${
                    selectedPriceRange === p.value
                      ? 'font-bold text-[#191919]'
                      : 'text-[#696359] hover:text-[#191919]'
                  }`}
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>

          {/* In Stock Toggle */}
          <div className="pt-6 border-t border-[#F0ECE1]">
            <label className="flex items-center gap-2 cursor-pointer text-xs text-[#191919] uppercase tracking-wider">
              <input
                type="checkbox"
                checked={inStockOnly}
                onChange={(e) => setInStockOnly(e.target.checked)}
                className="accent-[#191919] w-4 h-4 cursor-pointer"
              />
              <span>In Stock Only</span>
            </label>
          </div>
        </aside>

        {/* Product Grid Area */}
        <section className="lg:col-span-9 space-y-8">
          
          {/* Top Control Bar: View Switcher, Count, Sort */}
          <div className="flex items-center justify-between bg-[#F2EFEB] p-3 px-4 border border-[#E8E4DC]">
            {/* Mobile Filter Toggle */}
            <button
              type="button"
              onClick={() => setIsMobileFiltersOpen(true)}
              className="lg:hidden flex items-center gap-2 text-xs uppercase tracking-wider text-[#191919] font-medium"
            >
              <SlidersHorizontal className="w-4 h-4" />
              <span>Filters</span>
            </button>

            {/* Desktop View Switcher (Editorial 2-Col vs Catalog 4-Col) */}
            <div className="hidden lg:flex items-center gap-2 text-xs text-[#736C62]">
              <span className="uppercase tracking-wider text-[11px]">View:</span>
              <button
                type="button"
                onClick={() => setGridView('editorial')}
                className={`p-1.5 border transition-all ${
                  gridView === 'editorial'
                    ? 'bg-[#191919] text-white border-[#191919]'
                    : 'bg-white text-[#777] border-[#DCD5C9] hover:border-[#191919]'
                }`}
                title="Editorial 2-Column View"
              >
                <Grid2X2 className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => setGridView('catalog')}
                className={`p-1.5 border transition-all ${
                  gridView === 'catalog'
                    ? 'bg-[#191919] text-white border-[#191919]'
                    : 'bg-white text-[#777] border-[#DCD5C9] hover:border-[#191919]'
                }`}
                title="Catalog 4-Column View"
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
            </div>

            {/* Product Count Display */}
            <div className="hidden sm:block text-xs text-[#736C62] uppercase tracking-wider">
              Showing <strong className="text-[#191919] font-mono tabular-nums">{filteredProducts.length}</strong> items
            </div>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-[#696359]">
              <span className="hidden md:inline">Sort:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-transparent text-xs text-[#191919] font-medium uppercase tracking-wider border-none focus:ring-0 cursor-pointer py-1 pl-1 pr-6"
              >
                <option value="featured">Featured</option>
                <option value="newest">Newest</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Rating</option>
              </select>
            </div>
          </div>

          {/* Active Filter Chips */}
          {(selectedSize !== 'all' || selectedColor !== 'all' || selectedPriceRange !== 'all' || inStockOnly) && (
            <div className="flex flex-wrap items-center gap-2 pt-1 text-xs">
              <span className="text-[#8C857B] uppercase tracking-widest text-[11px]">Active:</span>
              {selectedSize !== 'all' && (
                <button
                  onClick={() => setSelectedSize('all')}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-white border border-[#DCD5C9] text-xs hover:border-[#191919]"
                >
                  Size: {selectedSize}
                  <X className="w-3 h-3" />
                </button>
              )}
              {selectedColor !== 'all' && (
                <button
                  onClick={() => setSelectedColor('all')}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-white border border-[#DCD5C9] text-xs hover:border-[#191919]"
                >
                  Color: {selectedColor}
                  <X className="w-3 h-3" />
                </button>
              )}
              {selectedPriceRange !== 'all' && (
                <button
                  onClick={() => setSelectedPriceRange('all')}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-white border border-[#DCD5C9] text-xs hover:border-[#191919]"
                >
                  Price Range
                  <X className="w-3 h-3" />
                </button>
              )}
              <button
                onClick={resetFilters}
                className="text-[11px] underline text-[#736C62] hover:text-[#191919] ml-2"
              >
                Clear all
              </button>
            </div>
          )}

          {/* Product Grid Render */}
          {filteredProducts.length === 0 ? (
            <div className="py-20 text-center bg-[#F5F2EB] border border-[#E8E4DC] p-8">
              <h3 className="font-serif-luxury text-2xl text-[#191919] mb-2">
                No designs match your criteria
              </h3>
              <p className="text-xs text-[#736C62] max-w-sm mx-auto mb-6">
                Try broadening your filter parameters or resetting your department choice.
              </p>
              <button
                onClick={resetFilters}
                className="px-6 py-3 bg-[#191919] text-[#FAF9F5] text-xs uppercase tracking-widest"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div
              className={`grid gap-x-4 sm:gap-x-6 gap-y-12 ${
                gridView === 'editorial'
                  ? 'grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-y-16'
                  : 'grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'
              }`}
            >
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onQuickView={onQuickView}
                />
              ))}
            </div>
          )}

        </section>

      </div>

      {/* Mobile Filter Drawer */}
      {isMobileFiltersOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          <div
            className="fixed inset-0 bg-[#111111]/50 backdrop-blur-xs"
            onClick={() => setIsMobileFiltersOpen(false)}
          />
          <div className="relative ml-auto w-full max-w-xs bg-[#FAF9F5] h-full shadow-2xl p-6 overflow-y-auto flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-[#E8E4DC]">
                <h3 className="font-serif-luxury text-xl text-[#191919]">Refine Collection</h3>
                <button
                  onClick={() => setIsMobileFiltersOpen(false)}
                  className="p-1 text-[#191919]"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="py-6 space-y-6 text-xs">
                <div>
                  <h4 className="uppercase tracking-wider font-semibold text-[#191919] mb-2">Department</h4>
                  <div className="space-y-1.5">
                    {['all', 'women', 'men', 'accessories', 'new-arrivals'].map((cat) => (
                      <button
                        key={cat}
                        onClick={() => setSelectedCategory(cat)}
                        className={`block w-full text-left py-1 uppercase tracking-wider ${
                          selectedCategory === cat ? 'font-bold text-[#191919]' : 'text-[#696359]'
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-[#F0ECE1]">
                  <h4 className="uppercase tracking-wider font-semibold text-[#191919] mb-2">Size</h4>
                  <div className="flex flex-wrap gap-2">
                    {availableSizes.map((sz) => (
                      <button
                        key={sz}
                        onClick={() => setSelectedSize(selectedSize === sz ? 'all' : sz)}
                        className={`px-3 py-1 border font-mono ${
                          selectedSize === sz ? 'bg-[#191919] text-white' : 'bg-white text-[#555]'
                        }`}
                      >
                        {sz}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-[#E8E4DC] space-y-2">
              <button
                type="button"
                onClick={() => setIsMobileFiltersOpen(false)}
                className="w-full py-3 bg-[#191919] text-white text-xs uppercase tracking-widest font-medium"
              >
                Apply Filters ({filteredProducts.length})
              </button>
              <button
                type="button"
                onClick={resetFilters}
                className="w-full py-2 text-center text-xs text-[#736C62] uppercase tracking-wider"
              >
                Reset All
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
