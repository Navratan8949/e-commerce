import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowDown, ArrowRight, Sparkles } from 'lucide-react';
import ImageWithFallback from '../common/ImageWithFallback.jsx';

const CAMPAIGNS = [
  {
    id: 1,
    tag: 'CAMPAIGN 01 / SPRING 2026',
    title: 'Elevate Your Everyday.',
    subtitle: 'Curated essentials designed for modern living. Architectural silhouettes crafted with enduring natural textiles.',
    image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=2000&q=85',
    link: '/shop',
    label: 'The Silhouette'
  },
  {
    id: 2,
    tag: 'CAMPAIGN 02 / TEXTILES',
    title: 'Normandy Flax & Raw Silk.',
    subtitle: 'Weightless textures and breathable French flax. Fluid draping tailored to move effortlessly with the body.',
    image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=2000&q=85',
    link: '/shop/women',
    label: 'The Textile'
  },
  {
    id: 3,
    tag: 'CAMPAIGN 03 / ATELIER ARTIFACTS',
    title: 'Tuscan Leather & Timepieces.',
    subtitle: 'Sculpted from vegetable-tanned full-grain calf leather and surgical steel. Artifacts engineered to age with distinction.',
    image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=2000&q=85',
    link: '/shop/accessories',
    label: 'The Artifacts'
  }
];

export default function Hero() {
  const [activeIdx, setActiveIdx] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIdx((prev) => (prev + 1) % CAMPAIGNS.length);
    }, 7000);
    return () => clearInterval(timer);
  }, []);

  const current = CAMPAIGNS[activeIdx];

  const scrollToCollection = () => {
    const el = document.getElementById('featured-categories');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative w-full h-[92vh] sm:h-[96vh] flex items-center justify-center overflow-hidden bg-[#161412] text-[#FAF9F5]">
      {/* Background Hero Images with smooth crossfade */}
      {CAMPAIGNS.map((camp, idx) => (
        <div
          key={camp.id}
          className={`absolute inset-0 z-0 transition-opacity duration-1000 ease-in-out ${
            activeIdx === idx ? 'opacity-100 scale-100' : 'opacity-0 scale-103 pointer-events-none'
          }`}
        >
          <ImageWithFallback
            src={camp.image}
            alt={camp.title}
            aspectRatio="16/9"
            className="w-full h-full object-cover transition-transform duration-1000 ease-out"
          />
          {/* Subtle cinematic gradient overlays */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#121110]/95 via-[#121110]/45 to-[#121110]/35" />
          <div className="absolute inset-0 bg-radial from-transparent via-[#121110]/20 to-[#121110]/70" />
        </div>
      ))}

      {/* Center Content Container */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center flex flex-col items-center">
        
        {/* Editorial Sub-header badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 backdrop-blur-md border border-white/15 text-[10.5px] uppercase tracking-[0.3em] font-medium text-[#E3DDD1] mb-5">
          <span>THE NEW STANDARD</span>
          <span className="text-white/40">·</span>
          <span>{current.tag}</span>
        </div>

        {/* Primary Headline */}
        <h1 className="font-serif-luxury text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-light tracking-tight text-white mb-6 leading-[1.05] drop-shadow-xs transition-all duration-700">
          {current.title}
        </h1>

        {/* Subtitle */}
        <p className="font-sans text-xs sm:text-base md:text-lg text-[#E3DDD1] max-w-xl font-light leading-relaxed mb-10 tracking-wide transition-all duration-700">
          {current.subtitle}
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
          <Link
            to={current.link}
            className="w-full sm:w-auto px-9 py-4 bg-[#FAF9F5] text-[#191919] text-xs uppercase tracking-[0.24em] font-medium hover:bg-white hover:shadow-xl transition-all flex items-center justify-center gap-2 group cursor-pointer"
          >
            Shop Collection
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1.5 transition-transform" />
          </Link>
          <Link
            to="/shop/new-arrivals"
            className="w-full sm:w-auto px-9 py-4 bg-transparent border border-white/60 text-[#FAF9F5] text-xs uppercase tracking-[0.24em] font-medium hover:bg-white/10 hover:border-white transition-all flex items-center justify-center cursor-pointer"
          >
            Explore New Arrivals
          </Link>
        </div>
      </div>

      {/* Interactive Campaign Tab Switcher (Bottom Left Desktop) */}
      <div className="hidden lg:flex absolute bottom-8 left-10 z-20 items-center gap-6 text-xs text-[#DCD4C4]">
        {CAMPAIGNS.map((c, i) => (
          <button
            key={c.id}
            onClick={() => setActiveIdx(i)}
            className={`flex items-center gap-2.5 uppercase tracking-[0.2em] text-[11px] py-1 transition-all ${
              activeIdx === i
                ? 'text-white font-medium border-b-2 border-white'
                : 'text-white/50 hover:text-white'
            }`}
          >
            <span className="font-mono text-[10px]">0{i + 1}</span>
            <span>{c.label}</span>
          </button>
        ))}
      </div>

      {/* Floating editorial lookbook card (Bottom Right Desktop) */}
      <div className="hidden xl:block absolute bottom-8 right-10 z-20 bg-[#1A1816]/80 backdrop-blur-md border border-white/15 p-4 max-w-xs shadow-2xl text-left">
        <span className="text-[9.5px] uppercase tracking-[0.25em] text-[#C2B7A3] font-mono block mb-1">
          CAPSULE SPOTLIGHT
        </span>
        <h4 className="font-serif-luxury text-base text-white font-normal mb-1">
          French Flax & Hopsack Wool
        </h4>
        <p className="text-[11px] text-[#A69E8F] leading-snug mb-3 font-light">
          Limited batch produced at our Normandy partners.
        </p>
        <Link
          to="/shop"
          className="inline-flex items-center gap-1.5 text-[10.5px] uppercase tracking-[0.18em] text-[#FAF9F5] font-semibold hover:underline"
        >
          View Lookbook
          <ArrowRight className="w-3 h-3" />
        </Link>
      </div>

      {/* Scroll indicator */}
      <button
        type="button"
        onClick={scrollToCollection}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1.5 text-[#DCD4C4] hover:text-white transition-colors cursor-pointer"
        aria-label="Scroll down to featured categories"
      >
        <span className="text-[9px] uppercase tracking-[0.28em] text-white/70">Scroll</span>
        <ArrowDown className="w-3.5 h-3.5 animate-bounce" />
      </button>
    </section>
  );
}
