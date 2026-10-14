import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const MESSAGES = [
  {
    desktop: 'FREE SHIPPING ON ORDERS OVER ₹2,999  •  COMPLIMENTARY 7-DAY RETURNS',
    mobile: 'FREE SHIPPING ABOVE ₹2,999  •  7-DAY RETURNS'
  },
  {
    desktop: 'SPRING / SUMMER 2026 CAPSULE  •  FRENCH FLAX & GRADE-A CASHMERE',
    mobile: 'SPRING / SUMMER 2026  •  FRENCH FLAX & CASHMERE'
  },
  {
    desktop: 'COMPLIMENTARY BESPOKE GIFT BOX & SIGNATURE ATELIER PACKAGING ON ORDERS OVER ₹5,000',
    mobile: 'COMPLIMENTARY LUXURY PACKAGING ABOVE ₹5,000'
  }
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
    <div className="w-full bg-[#161514] text-[#FAF9F5] py-2 px-2 sm:px-6 text-[9.5px] sm:text-[10.5px] tracking-[0.14em] sm:tracking-[0.22em] uppercase font-medium select-none z-50 border-b border-[#282624]">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-1 sm:gap-2">
        {/* Subtle Prev button */}
        <button
          onClick={handlePrev}
          className="text-[#888] hover:text-white transition-colors p-1 shrink-0 cursor-pointer"
          aria-label="Previous announcement"
        >
          <ChevronLeft className="w-3.5 h-3.5" />
        </button>

        {/* Message */}
        <div className="flex-1 text-center truncate px-1 sm:px-2 transition-opacity duration-500">
          <span className="sm:hidden font-light tracking-[0.12em]">{MESSAGES[index].mobile}</span>
          <span className="hidden sm:inline font-light tracking-[0.2em]">{MESSAGES[index].desktop}</span>
        </div>

        {/* Subtle Next button */}
        <button
          onClick={handleNext}
          className="text-[#888] hover:text-white transition-colors p-1 shrink-0 cursor-pointer"
          aria-label="Next announcement"
        >
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
