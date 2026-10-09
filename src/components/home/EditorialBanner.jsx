import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import ImageWithFallback from '../common/ImageWithFallback.jsx';

export default function EditorialBanner() {
  return (
    <section className="py-12 lg:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="relative overflow-hidden bg-[#0B0C0E] text-white min-h-[480px] sm:min-h-[540px] flex items-center shadow-lg rounded-sm border border-neutral-900">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&w=2000&q=85"
            alt="Less, but better editorial"
            aspectRatio="16/9"
            className="w-full h-full object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/75 to-transparent" />
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-2xl px-8 sm:px-14 lg:px-20 py-16">
          <span className="text-[10px] uppercase font-mono tracking-[0.3em] text-[#C5A265] font-semibold block mb-4">
            MANIFESTO NO. 04
          </span>
          
          <h2 className="font-serif-luxury text-4xl sm:text-5xl lg:text-6xl text-white font-light leading-tight mb-6 tracking-tight">
            LESS, BUT BETTER.
          </h2>

          <p className="text-sm sm:text-base text-neutral-300 font-light leading-relaxed mb-8 max-w-lg">
            Thoughtfully designed pieces that move effortlessly through your everyday. We discard superfluous ornament in favour of superior textiles, flawless proportions, and meticulous cut.
          </p>

          <Link
            to="/shop"
            className="inline-flex items-center gap-3 px-8 py-4 bg-white text-black text-xs uppercase tracking-[0.22em] font-medium hover:bg-neutral-100 transition-all shadow-md group cursor-pointer rounded-xs"
          >
            <span>Discover the Collection</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
}
