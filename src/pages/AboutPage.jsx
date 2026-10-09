import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import ImageWithFallback from '../components/common/ImageWithFallback.jsx';

export default function AboutPage() {
  return (
    <div className="py-12 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24">
      
      {/* 1. Hero Section */}
      <section className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-[11px] uppercase tracking-[0.3em] text-[#8C857B] font-medium block">
          The Maison LUMÉRA
        </span>
        <h1 className="font-serif-luxury text-4xl sm:text-6xl text-[#191919] font-light leading-tight">
          Quiet luxury. Architectural permanence.
        </h1>
        <p className="font-serif-luxury italic text-xl text-[#696359] font-normal pt-2">
          "Elevate Your Everyday."
        </p>
      </section>

      {/* Hero Image */}
      <div className="relative aspect-16/9 sm:aspect-21/9 w-full bg-[#EAE5DC] overflow-hidden shadow-xs">
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&w=1800&q=80"
          alt="LUMÉRA Atelier Workshop"
          aspectRatio="16/9"
          className="w-full h-full object-cover"
        />
      </div>

      {/* 2. Our Philosophy */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        <div className="lg:col-span-5 space-y-4">
          <span className="text-[11px] uppercase tracking-[0.25em] text-[#8C857B] font-medium block">
            01. Philosophy
          </span>
          <h2 className="font-serif-luxury text-3xl sm:text-4xl text-[#191919] font-light">
            Resisting the noise of the ephemeral.
          </h2>
        </div>
        <div className="lg:col-span-7 space-y-4 text-xs sm:text-sm text-[#555048] font-light leading-relaxed">
          <p className="text-base text-[#191919] font-normal leading-relaxed">
            LUMÉRA was conceived in 2024 to challenge the rapid obsolescence of contemporary fast fashion. We believe that genuine elegance is achieved not by adding more, but by paring down to what is mathematically essential.
          </p>
          <p>
            Every piece in our catalog begins as a study in proportion: where the sleeve naturally terminates against the wrist, how a collar frames the jawline without constricting, and how a drape moves with the momentum of an urban stride.
          </p>
        </div>
      </section>

      {/* 3. Design Process & Quality */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        <div className="lg:col-span-6 relative aspect-4/5 bg-[#EAE5DC] overflow-hidden order-2 lg:order-1">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&w=1200&q=80"
            alt="Handcrafting natural textiles"
            aspectRatio="4/5"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="lg:col-span-6 space-y-6 order-1 lg:order-2 lg:pl-6">
          <span className="text-[11px] uppercase tracking-[0.25em] text-[#8C857B] font-medium block">
            02. Sourcing & Ateliers
          </span>
          <h2 className="font-serif-luxury text-3xl sm:text-4xl text-[#191919] font-light">
            Material provenance above all.
          </h2>
          <div className="space-y-4 text-xs sm:text-sm text-[#555048] font-light leading-relaxed">
            <p>
              We bypass synthetic petroleum-based yarns entirely. Our flax is grown under the misty sea air of Normandy; our cashmere is harvested through gentle hand-combing in the Mongolian steppes; and our leathers are vegetable-tanned using organic chestnut and mimosa barks in Santa Croce sull'Arno.
            </p>
            <p>
              By producing in small, calibrated quantities alongside heritage multi-generational workshops, we uphold the dignity of the artisan while ensuring zero inventory waste.
            </p>
          </div>
          <div className="pt-2">
            <Link
              to="/shop"
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#191919] text-[#FAF9F5] text-xs uppercase tracking-[0.2em] font-medium hover:bg-[#333333] transition-colors"
            >
              Explore the Collection
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* 4. Sustainability Charter */}
      <section className="bg-[#F2EFEB] p-8 sm:p-14 border border-[#E8E4DC] grid grid-cols-1 md:grid-cols-3 gap-8 text-center sm:text-left">
        <div className="space-y-2">
          <span className="font-mono text-xl text-[#191919] font-light">100%</span>
          <h3 className="font-serif-luxury text-xl text-[#191919]">Natural Monofilaments</h3>
          <p className="text-xs text-[#696359] leading-relaxed">
            Pure linen, organic Supima cotton, and virgin merino wool engineered to be fully biodegradable at end-of-life.
          </p>
        </div>
        <div className="space-y-2">
          <span className="font-mono text-xl text-[#191919] font-light">Zero</span>
          <h3 className="font-serif-luxury text-xl text-[#191919]">Plastic Packaging</h3>
          <p className="text-xs text-[#696359] leading-relaxed">
            All shipments arrive in unbleached post-consumer cotton garment cases with archival paper sealants.
          </p>
        </div>
        <div className="space-y-2">
          <span className="font-mono text-xl text-[#191919] font-light">Enduring</span>
          <h3 className="font-serif-luxury text-xl text-[#191919]">Lifetime Seam Guarantee</h3>
          <p className="text-xs text-[#696359] leading-relaxed">
            Complimentary repair service offered on all bespoke horn buttons and architectural seam stitches.
          </p>
        </div>
      </section>

    </div>
  );
}
