import React, { createContext, useContext, useState, useEffect } from 'react';
import initialProducts from '../data/products.js';
import { storage } from '../lib/storage.js';
import { useToast } from './ToastContext.jsx';

const ProductContext = createContext(null);

export function ProductProvider({ children }) {
  const [products, setProducts] = useState(() => {
    return storage.get('fillkart_products', initialProducts);
  });
  const { showToast } = useToast();

  useEffect(() => {
    storage.set('fillkart_products', products);
  }, [products]);

  const addProduct = (newProductData) => {
    const slug = newProductData.slug || newProductData.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
    const newProduct = {
      id: `prod-${Date.now()}`,
      slug,
      name: newProductData.name,
      category: newProductData.category || 'women',
      subcategory: newProductData.subcategory || 'Essentials',
      price: Number(newProductData.price) || 2999,
      originalPrice: newProductData.originalPrice ? Number(newProductData.originalPrice) : undefined,
      discount: newProductData.originalPrice && newProductData.originalPrice > newProductData.price
        ? Math.round(((newProductData.originalPrice - newProductData.price) / newProductData.originalPrice) * 100)
        : undefined,
      description: newProductData.description || 'Artisanal piece tailored with natural monofilaments.',
      details: newProductData.details || ['100% Certified organic materials', 'Handcrafted in limited atelier runs'],
      care: newProductData.care || ['Specialist clean only', 'Store in archival dust bag'],
      images: newProductData.images?.length > 0 ? newProductData.images : [
        'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1000&q=80'
      ],
      colors: newProductData.colors?.length > 0 ? newProductData.colors : [
        { name: 'Oatmeal', hex: '#D6C7B2' },
        { name: 'Noir', hex: '#191919' }
      ],
      sizes: newProductData.sizes?.length > 0 ? newProductData.sizes : ['XS', 'S', 'M', 'L'],
      rating: 5.0,
      reviewCount: 1,
      tags: ['new', 'atelier'],
      isNew: true,
      isFeatured: false,
      isBestSeller: false,
      stock: Number(newProductData.stock) || 15
    };

    setProducts((prev) => [newProduct, ...prev]);
    showToast(`Product added to catalog: ${newProduct.name}`, 'success');
    return newProduct;
  };

  const updateProduct = (id, updatedFields) => {
    setProducts((prev) =>
      prev.map((p) => {
        if (p.id === id) {
          const updated = { ...p, ...updatedFields };
          if (updatedFields.price && updated.originalPrice && updated.originalPrice > updatedFields.price) {
            updated.discount = Math.round(((updated.originalPrice - updatedFields.price) / updated.originalPrice) * 100);
          }
          return updated;
        }
        return p;
      })
    );
    showToast('Product updated successfully.', 'success');
  };

  const deleteProduct = (id) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
    showToast('Product removed from catalog.', 'info');
  };

  const updateStock = (id, newStock) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, stock: Math.max(0, Number(newStock)) } : p))
    );
  };

  const resetToDefaultCatalog = () => {
    setProducts(initialProducts);
    storage.set('fillkart_products', initialProducts);
    showToast('Catalog restored to default 28 atelier pieces.', 'info');
  };

  const getProductBySlug = (slug) => {
    return products.find((p) => p.slug === slug) || null;
  };

  const getProductById = (id) => {
    return products.find((p) => p.id === id) || null;
  };

  return (
    <ProductContext.Provider
      value={{
        products,
        addProduct,
        updateProduct,
        deleteProduct,
        updateStock,
        resetToDefaultCatalog,
        getProductBySlug,
        getProductById
      }}
    >
      {children}
    </ProductContext.Provider>
  );
}

export function useProducts() {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error('useProducts must be used within a ProductProvider');
  }
  return context;
}
