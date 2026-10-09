import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';
import Hero from '../components/home/Hero.jsx';
import FeaturedCategories from '../components/home/FeaturedCategories.jsx';
import LookbookSection from '../components/home/LookbookSection.jsx';
import EditorialBanner from '../components/home/EditorialBanner.jsx';
import PromoSplit from '../components/home/PromoSplit.jsx';
import ProvenanceMap from '../components/home/ProvenanceMap.jsx';
import BrandStory from '../components/home/BrandStory.jsx';
import AtelierConsoleShowcase from '../components/home/AtelierConsoleShowcase.jsx';
import InstagramGrid from '../components/home/InstagramGrid.jsx';
import Newsletter from '../components/home/Newsletter.jsx';
import ProductCard from '../components/product/ProductCard.jsx';
import { useProducts } from '../context/ProductContext.jsx';

export default function HomePage({ onQuickView }) {
  const { products } = useProducts();

  // New Arrivals: 8 products
  const newArrivals = products.filter((p) => p.isNew || p.category === 'new-arrivals').slice(0, 8);
  if (newArrivals.length < 8) {
    const extra = products.filter((p) => !newArrivals.find((na) => na.id === p.id)).slice(0, 8 - newArrivals.length);
    newArrivals.push(...extra);
  }

  // Best Sellers / Most Loved: 6 products
  const bestSellers = products.filter((p) => p.isBestSeller).slice(0, 6);

  return (
    <div className="w-full">
      {/* 1. Interactive Multi-Campaign Hero */}
      <Hero />

      {/* Luxury Editorial Marquee Ticker */}
      <div className="w-full bg-[#181614] text-[#E8E2D5] py-3.5 overflow-hidden border-b border-[#282624] select-none">
        <div className="animate-marquee whitespace-nowrap flex items-center gap-10 text-[11px] uppercase tracking-[0.3em] font-light">
          <span>SUMMER CAPSULE 2026</span>
          <span className="text-white/30">•</span>
          <span>NORMANDY FLAX & MONGOLIAN CASHMERE</span>
          <span className="text-white/30">•</span>
          <span>HANDCRAFTED IN LIMITED RUNS</span>
          <span className="text-white/30">•</span>
          <span>COMPLIMENTARY DOMESTIC DISPATCH ABOVE ₹2,999</span>
          <span className="text-white/30">•</span>
          <span>TUSCAN VEGETABLE-TANNED LEATHER</span>
          <span className="text-white/30">•</span>
          <span>SUMMER CAPSULE 2026</span>
          <span className="text-white/30">•</span>
          <span>NORMANDY FLAX & MONGOLIAN CASHMERE</span>
          <span className="text-white/30">•</span>
          <span>HANDCRAFTED IN LIMITED RUNS</span>
          <span className="text-white/30">•</span>
          <span>COMPLIMENTARY DOMESTIC DISPATCH ABOVE ₹2,999</span>
        </div>
      </div>

      {/* 2. Featured Categories */}
      <FeaturedCategories />

      {/* 3. New Arrivals (8 Products) */}
      <section className="py-20 lg:py-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 border-b border-[#E6E6EA] pb-6">
          <div>
            <span className="text-[11px] uppercase font-mono tracking-[0.22em] text-[#9A7B4F] block mb-2 font-medium">
              Curated Spring Edit
            </span>
            <h2 className="font-serif-luxury text-3xl sm:text-4xl text-neutral-900 font-light">
              New Arrivals
            </h2>
            <p className="text-xs text-neutral-500 uppercase tracking-[0.16em] mt-1 font-medium font-mono">
              Fresh silhouettes. Timeless essentials.
            </p>
          </div>
          <Link
            to="/shop/new-arrivals"
            className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] font-medium text-neutral-900 hover:opacity-70 transition-opacity mt-4 md:mt-0"
          >
            <span>View All New Pieces</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* 8 Product Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 sm:gap-x-6 gap-y-12">
          {newArrivals.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onQuickView={onQuickView}
            />
          ))}
        </div>
      </section>

      {/* 4. Interactive Haute-Couture Lookbook Section */}
      <LookbookSection />

      {/* 5. Editorial Banner (LESS, BUT BETTER.) */}
      <EditorialBanner />

      {/* 6. Best Sellers / Most Loved (6 Products) */}
      <section className="py-20 lg:py-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 bg-[#F8F9FA] rounded-md my-10 border border-[#E6E6EA]">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 border-b border-[#E6E6EA] pb-6">
          <div>
            <span className="text-[11px] uppercase font-mono tracking-[0.22em] text-[#9A7B4F] block mb-2 font-medium">
              Atelier Favorites
            </span>
            <h2 className="font-serif-luxury text-3xl sm:text-4xl text-neutral-900 font-light">
              Most Loved
            </h2>
            <p className="text-xs text-neutral-500 uppercase tracking-[0.16em] mt-1 font-medium font-mono">
              Enduring pieces repeatedly chosen by our patrons
            </p>
          </div>
          <Link
            to="/shop"
            className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] font-medium text-neutral-900 hover:opacity-70 transition-opacity mt-4 md:mt-0"
          >
            <span>Explore All Styles</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* 6 Product Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-x-4 sm:gap-x-8 gap-y-12">
          {bestSellers.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onQuickView={onQuickView}
            />
          ))}
        </div>
      </section>

      {/* 7. Promotional Split Banner (THE ESSENTIAL EDIT) */}
      <PromoSplit />

      {/* 8. Material Provenance Lineage */}
      <ProvenanceMap />

      {/* 9. Atelier Merchant OS Showcase */}
      <AtelierConsoleShowcase />

      {/* 10. Brand Story Section */}
      <BrandStory />

      {/* 10. Instagram Section */}
      <InstagramGrid />

      {/* 11. Newsletter Subscription */}
      <Newsletter />
    </div>
  );
}
