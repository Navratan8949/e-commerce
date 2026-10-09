import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { storage } from '../lib/storage.js';
import { useToast } from './ToastContext.jsx';

const CartContext = createContext(null);

const FREE_SHIPPING_THRESHOLD = 2999;
const STANDARD_SHIPPING_FEE = 250;

export function CartProvider({ children }) {
  const [cart, setCart] = useState(() => {
    return storage.get('fillkart_cart', []);
  });

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [appliedCoupon, setAppliedCoupon] = useState(() => {
    return storage.get('fillkart_coupon', null);
  });

  const { showToast } = useToast();

  useEffect(() => {
    storage.set('fillkart_cart', cart);
  }, [cart]);

  useEffect(() => {
    storage.set('fillkart_coupon', appliedCoupon);
  }, [appliedCoupon]);

  const openDrawer = () => setIsDrawerOpen(true);
  const closeDrawer = () => setIsDrawerOpen(false);

  const addToCart = (product, size, color, quantity = 1) => {
    if (!product) return;

    const chosenColor = color || product.colors?.[0] || { name: 'Standard', hex: '#111111' };
    const chosenSize = size || (product.sizes?.length ? product.sizes[0] : 'Standard');
    const itemId = `${product.id}-${chosenSize}-${chosenColor.name}`;

    setCart((prev) => {
      const existingIndex = prev.findIndex((item) => item.id === itemId);
      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: updated[existingIndex].quantity + quantity
        };
        return updated;
      } else {
        return [
          ...prev,
          {
            id: itemId,
            product,
            size: chosenSize,
            color: chosenColor,
            quantity
          }
        ];
      }
    });

    showToast(`Added to bag: ${product.name}`, 'success');
  };

  const removeFromCart = (itemId) => {
    setCart((prev) => prev.filter((item) => item.id !== itemId));
    showToast('Item removed from bag', 'info');
  };

  const updateQuantity = (itemId, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(itemId);
      return;
    }
    setCart((prev) =>
      prev.map((item) => (item.id === itemId ? { ...item, quantity: newQuantity } : item))
    );
  };

  const clearCart = () => {
    setCart([]);
    setAppliedCoupon(null);
  };

  // Calculations
  const subtotal = useMemo(() => {
    return cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  }, [cart]);

  const cartCount = useMemo(() => {
    return cart.reduce((acc, item) => acc + item.quantity, 0);
  }, [cart]);

  const discountAmount = useMemo(() => {
    if (!appliedCoupon || subtotal === 0) return 0;
    if (appliedCoupon.code === 'FILLKART10') {
      return Math.round(subtotal * 0.1);
    }
    if (appliedCoupon.code === 'WELCOME500') {
      return subtotal >= 3999 ? 500 : 0;
    }
    return 0;
  }, [appliedCoupon, subtotal]);

  const isFreeShipping = subtotal >= FREE_SHIPPING_THRESHOLD || subtotal === 0;
  const shippingFee = subtotal === 0 ? 0 : isFreeShipping ? 0 : STANDARD_SHIPPING_FEE;
  const freeShippingProgress = Math.min(100, Math.round((subtotal / FREE_SHIPPING_THRESHOLD) * 100));
  const amountToFreeShipping = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);

  const total = Math.max(0, subtotal - discountAmount + shippingFee);

  // Apply Coupon
  const applyCoupon = (rawCode) => {
    const code = (rawCode || '').trim().toUpperCase();

    if (!code) {
      showToast('Please enter a coupon code.', 'error');
      return { success: false, message: 'Please enter a coupon code.' };
    }

    if (appliedCoupon && appliedCoupon.code === code) {
      showToast('This promo code is already applied.', 'info');
      return { success: false, message: 'Promo code is already applied.' };
    }

    if (code === 'FILLKART10' || code === 'LUMERA10') {
      const couponObj = { code: 'FILLKART10', type: 'percentage', value: 10, description: '10% off entire order' };
      setAppliedCoupon(couponObj);
      showToast('10% discount applied!', 'success');
      return { success: true, message: 'Coupon FILLKART10 applied!' };
    }

    if (code === 'WELCOME500') {
      if (subtotal < 3999) {
        showToast('WELCOME500 requires a minimum order of ₹3,999.', 'error');
        return { success: false, message: 'Minimum order amount for WELCOME500 is ₹3,999.' };
      }
      const couponObj = { code: 'WELCOME500', type: 'fixed', value: 500, description: '₹500 off orders over ₹3,999' };
      setAppliedCoupon(couponObj);
      showToast('₹500 discount applied!', 'success');
      return { success: true, message: 'Coupon WELCOME500 applied!' };
    }

    showToast('Invalid promo code. Try FILLKART10 or WELCOME500.', 'error');
    return { success: false, message: 'Invalid promo code.' };
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    showToast('Coupon removed.', 'info');
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        cartCount,
        isDrawerOpen,
        openDrawer,
        closeDrawer,
        setIsDrawerOpen,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        subtotal,
        discountAmount,
        shippingFee,
        total,
        isFreeShipping,
        freeShippingProgress,
        amountToFreeShipping,
        FREE_SHIPPING_THRESHOLD,
        appliedCoupon,
        applyCoupon,
        removeCoupon
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
