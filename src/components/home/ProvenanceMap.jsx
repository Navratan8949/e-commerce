import React, { useState } from 'react';
import { Compass, Sparkles } from 'lucide-react';
import ImageWithFallback from '../common/ImageWithFallback.jsx';

const PROVENANCE_STORIES = [
  {
    id: 'flax',
    region: 'Normandy, France',
    material: 'Flax & Pure Linen',
    description: 'Nurtured by temperate Atlantic breezes and fertile coastal soils. Our flax requires zero synthetic irrigation and yields ultra-long fibers with unmatched breathability and natural slub texture.',
    metric: '100% Certified European Flax',
    image: 'https://images.unsplash.com/photo-1598554747436-c9293d6a588f?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'cashmere',
    region: 'Mongolian Highlands',
    material: 'Grade-A 2-Ply Cashmere',
    description: 'Harvested exclusively during natural spring shedding. Hand-sorted fibers measuring under 15 microns yield weightless thermal insulation with silk-like softness against bare skin.',
    metric: '14.8 Micron Cloud Gauge',
    image: 'https://images.unsplash.com/photo-1576995853123-5a10305d93c0?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'leather',
    region: 'Tuscany, Italy',
    material: 'Vegetable-Tanned Calfskin',
    description: 'Tanned in Santa Croce sull’Arno using slow 40-day infusions of natural chestnut and mimosa tannins. Free of heavy metals; develops an irreplaceable golden patina over years of daily handling.',
    metric: 'Natural Chestnut Tanning',
    image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'wool',
    region: 'Biella, Northern Italy',
    material: 'Hopsack Virgin Wool',
    description: 'Woven with high-twist 2-ply yarns on heritage looms. Creates an open, aerated basketweave structure that breathes like linen while retaining sharp architectural drape.',
    metric: 'High-Twist 260 GSM',
    image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=800&q=80'
  }
];

export default function ProvenanceMap() {
  const [selectedId, setSelectedId] = useState('flax');
  const activeStory = PROVENANCE_STORIES.find((p) => p.id === selectedId) || PROVENANCE_STORIES[0];

  return (
    <section className="py-20 lg:py-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 border-b border-[#E8E4DC] pb-6">
        <div>
          <span className="text-[11px] uppercase tracking-[0.3em] text-[#8C857B] font-medium block mb-2">
            Material Lineage & Sourcing
          </span>
          <h2 className="font-serif-luxury text-3xl sm:text-5xl text-[#191919] font-light">
            Textile Provenance
          </h2>
        </div>
        <p className="text-xs text-[#736C62] uppercase tracking-[0.2em] mt-3 md:mt-0 font-medium">
          Heritage mills · Zero synthetic shortcuts
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
        {/* Left Column: Sourcing Selection List */}
        <div className="lg:col-span-5 space-y-3">
          {PROVENANCE_STORIES.map((p) => {
            const isSelected = selectedId === p.id;
            return (
              <button
                key={p.id}
                onClick={() => setSelectedId(p.id)}
                className={`w-full text-left p-5 transition-all border cursor-pointer ${
                  isSelected
                    ? 'bg-[#F2EFEB] border-[#191919] shadow-xs'
                    : 'bg-[#FAF9F5] border-[#E8E4DC] hover:border-[#B5AEA0]'
                }`}
              >
                <div className="flex justify-between items-baseline mb-1">
                  <span className="font-serif-luxury text-xl text-[#191919] font-medium">
                    {p.material}
                  </span>
                  <span className="text-[10.5px] uppercase tracking-wider text-[#8C857B] font-mono">
                    {p.region}
                  </span>
                </div>
                <p className="text-xs text-[#696359] line-clamp-2 font-light">
                  {p.description}
                </p>
              </button>
            );
          })}
        </div>

        {/* Right Column: Visual Feature Showcase */}
        <div className="lg:col-span-7 bg-[#F2EEE6] p-8 sm:p-12 border border-[#E0D9CC] shadow-xs grid grid-cols-1 sm:grid-cols-12 gap-8 items-center">
          <div className="sm:col-span-5 aspect-4/5 bg-[#E2DBD0] overflow-hidden shadow-md">
            <ImageWithFallback
              src={activeStory.image}
              alt={activeStory.material}
              aspectRatio="4/5"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="sm:col-span-7 space-y-4">
            <span className="text-[10.5px] uppercase tracking-[0.25em] text-[#8C857B] font-mono block">
              ORIGIN: {activeStory.region}
            </span>
            <h3 className="font-serif-luxury text-2xl sm:text-3xl text-[#191919] font-normal leading-tight">
              {activeStory.material}
            </h3>
            <p className="text-xs sm:text-sm text-[#555048] leading-relaxed font-light">
              {activeStory.description}
            </p>
            <div className="pt-2">
              <span className="inline-block px-3 py-1 bg-white border border-[#DCD5C9] text-[11px] uppercase tracking-wider text-[#191919] font-semibold">
                {activeStory.metric}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
