import React from 'react';
import ProductCard from './ProductCard.jsx';
import { ProductGridSkeleton } from './ProductSkeleton.jsx';

export default function ProductGrid({
  products = [],
  loading = false,
  onQuickView,
  columns = 4,
  emptyMessage = 'No products match your criteria.'
}) {
  if (loading) {
    return <ProductGridSkeleton count={8} />;
  }

  if (!products || products.length === 0) {
    return (
      <div className="py-16 text-center">
        <p className="font-serif-luxury text-xl text-[#191919] mb-2">{emptyMessage}</p>
        <p className="text-xs text-[#736C62]">
          Try resetting your selected filters or search terms.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 sm:gap-x-6 gap-y-10">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onQuickView={onQuickView}
        />
      ))}
    </div>
  );
}
