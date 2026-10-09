import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Sliders } from 'lucide-react';
import { Link } from 'react-router-dom';

const MESSAGES = [
  'FREE SHIPPING ON ORDERS OVER ₹2,999  •  COMPLIMENTARY 7-DAY RETURNS',
  'SPRING / SUMMER 2026 CAPSULE  •  FRENCH FLAX & GRADE-A CASHMERE',
  '✦ ATELIER MERCHANT CONSOLE ONLINE  •  MANAGE CATALOG, ORDERS & DISCOUNTS'
];

export default function AnnouncementBar() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % MESSAGES.length);
    }, 5500);
    return () => clearInterval(timer);
  }, []);

  const handlePrev = () => {
    setIndex((prev) => (prev - 1 + MESSAGES.length) % MESSAGES.length);
  };

  const handleNext = () => {
    setIndex((prev) => (prev + 1) % MESSAGES.length);
  };

  return (
    <div className="w-full bg-[#161514] text-[#FAF9F5] py-2 px-3 sm:px-6 text-[10px] sm:text-[10.5px] tracking-[0.22em] uppercase font-medium select-none z-50 border-b border-[#282624]">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-2">
        {/* Subtle Prev button */}
        <button
          onClick={handlePrev}
          className="text-[#888] hover:text-white transition-colors p-1 shrink-0"
          aria-label="Previous announcement"
        >
          <ChevronLeft className="w-3.5 h-3.5" />
        </button>

        {/* Message */}
        <div className="flex-1 text-center truncate px-2 transition-opacity duration-500">
          <span className="font-light tracking-[0.2em]">{MESSAGES[index]}</span>
        </div>

        {/* Subtle Next button */}
        <button
          onClick={handleNext}
          className="text-[#888] hover:text-white transition-colors p-1 shrink-0"
          aria-label="Next announcement"
        >
          <ChevronRight className="w-3.5 h-3.5" />
        </button>

        {/* Direct Admin Console Link */}
        <Link
          to="/admin"
          className="hidden md:inline-flex items-center gap-1.5 px-2 py-0.5 bg-[#FAF9F5]/10 hover:bg-[#FAF9F5]/20 text-[#FAF9F5] text-[9.5px] tracking-[0.16em] uppercase font-mono border border-white/20 transition-all shrink-0 ml-2"
          title="Open Atelier Admin Console"
        >
          <Sliders className="w-2.5 h-2.5 text-[#D4AF37]" />
          <span>Atelier Admin</span>
        </Link>
      </div>
    </div>
  );
}
