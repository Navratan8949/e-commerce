import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export default function NotFoundPage() {
  return (
    <div className="py-24 sm:py-36 max-w-xl mx-auto px-4 text-center">
      <span className="text-[11px] uppercase tracking-[0.3em] text-[#8C857B] font-medium block mb-3 font-mono">
        Error 404
      </span>
      <h1 className="font-serif-luxury text-3xl sm:text-5xl text-[#191919] font-light mb-4 leading-tight">
        Looks like you've wandered off the collection.
      </h1>
      <p className="text-xs sm:text-sm text-[#736C62] leading-relaxed mb-8 max-w-md mx-auto font-light">
        The destination you are seeking may have been archived, renamed, or temporarily withdrawn from our current seasonal presentation.
      </p>
      <Link
        to="/"
        className="inline-flex items-center gap-2 px-8 py-4 bg-[#191919] text-[#FAF9F5] text-xs uppercase tracking-[0.2em] font-medium hover:bg-[#333333] transition-colors"
      >
        Back to Home
        <ArrowRight className="w-3.5 h-3.5" />
      </Link>
    </div>
  );
}
