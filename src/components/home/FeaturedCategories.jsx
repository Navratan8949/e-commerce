import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { categories } from '../../data/categories.js';
import ImageWithFallback from '../common/ImageWithFallback.jsx';

export default function FeaturedCategories() {
  return (
    <section id="featured-categories" className="py-20 lg:py-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 border-b border-[#E6E6EA] pb-6">
        <div>
          <span className="text-[11px] uppercase font-mono tracking-[0.22em] text-[#9A7B4F] block mb-2 font-medium">
            Atelier Disciplines
          </span>
          <h2 className="font-serif-luxury text-3xl sm:text-4xl text-neutral-900 font-light">
            Featured Collections
          </h2>
        </div>
        <p className="text-xs text-neutral-500 uppercase tracking-[0.16em] mt-3 md:mt-0 font-medium font-mono">
          Thoughtfully tailored for everyday movement
        </p>
      </div>

      {/* 4 Large Editorial Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {categories.map((cat) => (
          <Link
            key={cat.id}
            to={`/shop/${cat.slug}`}
            className="group relative flex flex-col overflow-hidden bg-[#ECE7DF] aspect-3/4 shadow-2xs"
          >
            {/* Image with zoom transition */}
            <div className="absolute inset-0 z-0">
              <ImageWithFallback
                src={cat.image}
                alt={cat.name}
                aspectRatio="3/4"
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-108"
              />
              {/* Scrim */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#141210]/85 via-[#141210]/30 to-transparent transition-opacity group-hover:opacity-90" />
            </div>

            {/* Content overlay */}
            <div className="relative z-10 mt-auto p-6 text-[#FAF9F5] flex flex-col justify-end">
              <span className="text-[10px] uppercase tracking-[0.25em] text-[#D8D2C6] font-medium mb-1">
                {cat.itemCount}
              </span>
              <h3 className="font-serif-luxury text-2xl sm:text-3xl text-white font-normal mb-2 leading-tight">
                {cat.name}
              </h3>
              <p className="text-xs text-[#C9C3B6] line-clamp-2 mb-4 font-light leading-relaxed hidden sm:block">
                {cat.description}
              </p>

              {/* Explore Button */}
              <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] font-medium text-white group-hover:translate-x-1 transition-transform">
                <span>Explore</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
