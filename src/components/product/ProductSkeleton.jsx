import React from 'react';

export function ProductCardSkeleton() {
  return (
    <div className="flex flex-col animate-pulse">
      <div className="aspect-4/5 w-full bg-[#E5DFD5]" />
      <div className="pt-3 space-y-2">
        <div className="h-2.5 w-1/3 bg-[#E5DFD5]" />
        <div className="h-4 w-4/5 bg-[#E0D9CE]" />
        <div className="flex justify-between items-center pt-1">
          <div className="h-3.5 w-1/4 bg-[#E5DFD5]" />
          <div className="h-3 w-8 bg-[#E5DFD5]" />
        </div>
      </div>
    </div>
  );
}

export function ProductGridSkeleton({ count = 8 }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 sm:gap-x-6 gap-y-10">
      {Array.from({ length: count }).map((_, idx) => (
        <ProductCardSkeleton key={idx} />
      ))}
    </div>
  );
}

export function ProductDetailSkeleton() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 animate-pulse">
      <div className="lg:col-span-7">
        <div className="aspect-4/5 w-full bg-[#E5DFD5]" />
      </div>
      <div className="lg:col-span-5 space-y-6 pt-4">
        <div className="h-3 w-1/4 bg-[#E5DFD5]" />
        <div className="h-8 w-3/4 bg-[#E0D9CE]" />
        <div className="h-6 w-1/3 bg-[#E5DFD5]" />
        <div className="h-20 w-full bg-[#E5DFD5]" />
        <div className="h-12 w-full bg-[#E0D9CE]" />
      </div>
    </div>
  );
}
