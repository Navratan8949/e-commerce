import React, { useState } from 'react';

/**
 * High-performance image component with smooth fallback for luxury editorial storefront.
 * Prevents broken image icons and provides subtle shimmer and placeholder styling.
 */
export default function ImageWithFallback({
  src,
  alt = 'LUMÉRA Editorial',
  className = '',
  aspectRatio = '4/5',
  fallbackText = 'LUMÉRA'
}) {
  const [hasError, setHasError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  if (hasError || !src) {
    return (
      <div
        className={`bg-[#ECE7DF] flex flex-col items-center justify-center text-[#555048] p-4 text-center select-none relative overflow-hidden ${className}`}
        style={{ aspectRatio }}
      >
        <div className="absolute inset-0 bg-gradient-to-tr from-[#E6E0D6] to-[#F5F2EB] opacity-60" />
        <span className="font-serif-luxury tracking-widest text-lg font-medium text-[#2C2925] z-10">
          LUMÉRA
        </span>
        <span className="text-[11px] tracking-widest uppercase text-[#736C62] mt-1 z-10 truncate max-w-[85%]">
          {alt || fallbackText}
        </span>
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden bg-[#EFECE6] ${className}`}>
      {!isLoaded && (
        <div className="absolute inset-0 bg-[#EBE6DC] animate-pulse pointer-events-none" />
      )}
      <img
        src={src}
        alt={alt}
        loading="lazy"
        referrerPolicy="no-referrer"
        onLoad={() => setIsLoaded(true)}
        onError={() => setHasError(true)}
        className={`w-full h-full object-cover transition-opacity duration-500 ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        } ${className}`}
      />
    </div>
  );
}
