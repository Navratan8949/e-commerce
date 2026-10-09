// Utility functions for FILLKART

/**
 * Format price in Indian Rupee format (e.g. ₹3,499)
 */
export function formatPrice(amount) {
  if (amount === undefined || amount === null) return '₹0';
  return `₹${Number(amount).toLocaleString('en-IN')}`;
}

/**
 * Calculate percentage discount
 */
export function calculateDiscount(price, originalPrice) {
  if (!originalPrice || originalPrice <= price) return 0;
  return Math.round(((originalPrice - price) / originalPrice) * 100);
}

/**
 * Class names helper
 */
export function cn(...classes) {
  return classes.filter(Boolean).join(' ');
}

/**
 * Generate unique order ID
 */
export function generateOrderId() {
  const randomNum = Math.floor(10000 + Math.random() * 90000);
  return `LUM-2026-${randomNum}`;
}

/**
 * Truncate text with ellipsis
 */
export function truncate(text, length = 100) {
  if (!text || text.length <= length) return text;
  return `${text.slice(0, length)}...`;
}
