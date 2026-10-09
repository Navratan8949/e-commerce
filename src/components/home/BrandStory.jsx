import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import ImageWithFallback from '../common/ImageWithFallback.jsx';

export default function BrandStory() {
  return (
    <section className="py-20 lg:py-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
        
        {/* Left Column Large Image */}
        <div className="lg:col-span-6 relative aspect-4/5 bg-[#EBE7DF] overflow-hidden shadow-xs">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&w=1200&q=80"
            alt="LUMÉRA Craftsmanship and Philosophy"
            aspectRatio="4/5"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Right Column Text */}
        <div className="lg:col-span-6 space-y-6">
          <span className="text-[11px] uppercase tracking-[0.25em] text-[#8C857B] font-medium block">
            The LUMÉRA Philosophy
          </span>

          <h2 className="font-serif-luxury text-3xl sm:text-5xl text-[#191919] font-light leading-tight">
            Designed for the way you live.
          </h2>

          <div className="space-y-4 text-xs sm:text-sm text-[#555048] leading-relaxed font-light">
            <p className="text-base sm:text-lg text-[#262422] font-normal leading-relaxed">
              LUMÉRA is built around the belief that great design doesn't need to shout. Every piece is thoughtfully considered, balancing timeless silhouettes with modern details.
            </p>
            <p>
              We collaborate with historic spinning mills in Normandy, family-run ateliers in Tuscany, and master artisans to create garments that feel intimate and enduring from the first touch.
            </p>
            <p>
              By focusing on slow production cycles, transparent natural materials, and meticulous tailoring math, our garments integrate seamlessly into your morning ritual and age with character.
            </p>
          </div>

          <div className="pt-4">
            <Link
              to="/about"
              className="inline-flex items-center gap-2 px-8 py-4 bg-[#191919] text-[#FAF9F5] text-xs uppercase tracking-[0.2em] font-medium hover:bg-[#333333] transition-colors"
            >
              Our Story
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
}
