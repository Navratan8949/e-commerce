import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import ImageWithFallback from '../common/ImageWithFallback.jsx';

export default function PromoSplit() {
  return (
    <section className="py-16 lg:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 bg-[#F2EEE6] border border-[#E4DEC3]/40 shadow-xs overflow-hidden">
        
        {/* Left Column Text */}
        <div className="p-8 sm:p-14 lg:p-20 flex flex-col justify-center">
          <span className="text-[11px] uppercase tracking-[0.25em] text-[#8C857B] font-medium mb-4">
            Curated Wardrobe Foundation
          </span>

          <h2 className="font-serif-luxury text-3xl sm:text-5xl text-[#191919] font-light leading-tight mb-4">
            THE ESSENTIAL EDIT
          </h2>

          <p className="font-serif-luxury italic text-xl sm:text-2xl text-[#5A554D] mb-6 font-normal">
            Timeless pieces. Modern proportions.
          </p>

          <p className="text-xs sm:text-sm text-[#696359] leading-relaxed mb-8 max-w-md font-light">
            Foundational wardrobe items crafted in heavy French linens, combed Supima cotton, and unstructured hopsack wool. Designed to be mixed, matched, and relied upon day after day.
          </p>

          <div>
            <Link
              to="/shop"
              className="inline-flex items-center gap-2 px-8 py-4 bg-[#191919] text-[#FAF9F5] text-xs uppercase tracking-[0.2em] font-medium hover:bg-[#333333] transition-colors"
            >
              Shop Essentials
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* Right Column Image */}
        <div className="relative min-h-[380px] sm:min-h-[480px] bg-[#E8E3D8]">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1200&q=80"
            alt="The Essential Edit Editorial"
            aspectRatio="4/3"
            className="w-full h-full object-cover"
          />
        </div>

      </div>
    </section>
  );
}
