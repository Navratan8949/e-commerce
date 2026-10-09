import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Plus, Eye } from 'lucide-react';
import ImageWithFallback from '../common/ImageWithFallback.jsx';
import { formatPrice } from '../../lib/utils.js';

const LOOKS = [
  {
    id: 1,
    title: 'Look 01: The Monochromatic Column',
    description: 'Normandy Flax Oversized Shirt styled with Relaxed Wide-Leg Pleated Trousers and the Minimal Nappa Shoulder Bag.',
    image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1200&q=80',
    pieces: [
      { name: 'Oversized Linen Shirt', price: 3499, slug: 'oversized-linen-shirt', top: '35%', left: '48%' },
      { name: 'Relaxed Wide-Leg Pants', price: 4499, slug: 'relaxed-wide-leg-pants', top: '65%', left: '52%' }
    ]
  },
  {
    id: 2,
    title: 'Look 02: The Fluid Silhouette',
    description: 'Heavyweight Silk-Blend Satin Slip Dress paired with the Tailored Double-Breasted Virgin Wool Blazer.',
    image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=1200&q=80',
    pieces: [
      { name: 'Satin Slip Dress', price: 5499, slug: 'satin-slip-dress', top: '45%', left: '50%' },
      { name: 'Tailored Blazer', price: 8999, slug: 'tailored-blazer', top: '30%', left: '35%' }
    ]
  },
  {
    id: 3,
    title: 'Look 03: The Mediterranean Tailoring',
    description: 'Pinpoint Oxford Supima Shirt complemented by High-Twist Wool Trousers and Tuscan Saddle Leather Tote.',
    image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1200&q=80',
    pieces: [
      { name: 'Premium Oxford Shirt', price: 3999, slug: 'premium-oxford-shirt', top: '38%', left: '46%' },
      { name: 'Tailored Trousers', price: 5499, slug: 'tailored-trousers', top: '70%', left: '54%' }
    ]
  }
];

export default function LookbookSection() {
  const [activeLookIdx, setActiveLookIdx] = useState(0);
  const [activePiece, setActivePiece] = useState(null);

  const currentLook = LOOKS[activeLookIdx];

  return (
    <section className="py-20 lg:py-28 bg-[#181614] text-[#FAF9F5] border-t border-b border-[#282624]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 border-b border-[#2A2826] pb-6">
          <div>
            <span className="text-[11px] uppercase tracking-[0.3em] text-[#C2B7A3] font-medium block mb-2">
              Atelier Curated Ensembles
            </span>
            <h2 className="font-serif-luxury text-3xl sm:text-5xl text-white font-light">
              The Lookbook
            </h2>
          </div>
          <p className="text-xs text-[#A69E8F] uppercase tracking-[0.2em] mt-3 md:mt-0 font-medium">
            Interactive styling studies & complete outfits
          </p>
        </div>

        {/* Main Lookbook Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
          
          {/* Left Column: Visual with Interactive Hotspots */}
          <div className="lg:col-span-7 relative aspect-3/4 sm:aspect-4/5 bg-[#201D1B] overflow-hidden shadow-2xl">
            <ImageWithFallback
              src={currentLook.image}
              alt={currentLook.title}
              aspectRatio="4/5"
              className="w-full h-full object-cover transition-opacity duration-700"
            />
            {/* Scrim */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#121110]/80 via-transparent to-transparent pointer-events-none" />

            {/* Interactive Hotspot Pins */}
            {currentLook.pieces.map((piece, i) => (
              <div
                key={piece.name}
                className="absolute z-20 group"
                style={{ top: piece.top, left: piece.left }}
              >
                <button
                  type="button"
                  onClick={() => setActivePiece(activePiece?.name === piece.name ? null : piece)}
                  className="relative flex items-center justify-center w-7 h-7 rounded-full bg-white/90 backdrop-blur-md text-[#191919] shadow-lg hover:scale-110 transition-transform cursor-pointer"
                  aria-label={`View ${piece.name}`}
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span className="absolute -inset-1 rounded-full bg-white/30 animate-ping pointer-events-none" />
                </button>

                {/* Hotspot Popover Tooltip */}
                <div className="absolute left-8 top-1/2 -translate-y-1/2 w-48 bg-[#FAF9F5] text-[#191919] p-3 shadow-2xl border border-[#DCD5C9] opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none group-hover:pointer-events-auto z-30">
                  <p className="font-serif-luxury text-xs font-semibold leading-tight mb-1">
                    {piece.name}
                  </p>
                  <p className="font-mono text-xs text-[#191919] font-medium mb-2">
                    {formatPrice(piece.price)}
                  </p>
                  <Link
                    to={`/product/${piece.slug}`}
                    className="inline-flex items-center gap-1 text-[10px] uppercase tracking-wider text-[#736C62] hover:text-[#191919] font-semibold"
                  >
                    View Piece
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* Right Column: Narrative & Piece Breakdown */}
          <div className="lg:col-span-5 space-y-8">
            {/* Look Selector tabs */}
            <div className="flex gap-4 border-b border-[#2A2826] pb-3 text-xs uppercase tracking-widest">
              {LOOKS.map((look, idx) => (
                <button
                  key={look.id}
                  onClick={() => {
                    setActiveLookIdx(idx);
                    setActivePiece(null);
                  }}
                  className={`pb-2 transition-all cursor-pointer ${
                    activeLookIdx === idx
                      ? 'text-white border-b-2 border-white font-medium'
                      : 'text-[#888] hover:text-white'
                  }`}
                >
                  Look 0{idx + 1}
                </button>
              ))}
            </div>

            {/* Look Details */}
            <div className="space-y-4">
              <span className="text-[10px] uppercase tracking-[0.25em] text-[#C2B7A3] font-mono">
                SPRING / SUMMER CAPSULE
              </span>
              <h3 className="font-serif-luxury text-3xl sm:text-4xl text-white font-light">
                {currentLook.title}
              </h3>
              <p className="text-xs sm:text-sm text-[#C4BDAF] leading-relaxed font-light">
                {currentLook.description}
              </p>
            </div>

            {/* Pieces in Look */}
            <div className="space-y-3 pt-2">
              <h4 className="text-[11px] uppercase tracking-[0.2em] text-[#A69E8F] font-semibold">
                Components In This Ensemble
              </h4>
              <div className="space-y-2.5">
                {currentLook.pieces.map((piece) => (
                  <div
                    key={piece.name}
                    className="flex items-center justify-between p-3.5 bg-[#201D1B] border border-[#2D2A27] text-xs hover:border-[#666] transition-colors"
                  >
                    <div>
                      <span className="font-serif-luxury text-sm font-medium text-white block">
                        {piece.name}
                      </span>
                      <span className="font-mono text-xs text-[#C2B7A3]">
                        {formatPrice(piece.price)}
                      </span>
                    </div>
                    <Link
                      to={`/product/${piece.slug}`}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#FAF9F5] text-[#191919] text-[10px] uppercase tracking-wider font-semibold hover:bg-white transition-colors"
                    >
                      Shop
                      <ArrowRight className="w-3 h-3" />
                    </Link>
                  </div>
                ))}
              </div>
            </div>

            {/* All looks link */}
            <div className="pt-2">
              <Link
                to="/shop"
                className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.22em] text-[#C2B7A3] hover:text-white transition-colors"
              >
                <span>Browse All Atelier Looks</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
