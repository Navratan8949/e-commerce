import React, { createContext, useContext, useState, useEffect } from 'react';
import { storage } from '../lib/storage.js';

const CurrencyContext = createContext(null);

export const CURRENCIES = {
  INR: { code: 'INR', symbol: '₹', rate: 1, label: 'INR (₹) · India' },
  USD: { code: 'USD', symbol: '$', rate: 0.012, label: 'USD ($) · United States' },
  EUR: { code: 'EUR', symbol: '€', rate: 0.011, label: 'EUR (€) · European Union' },
  GBP: { code: 'GBP', symbol: '£', rate: 0.0095, label: 'GBP (£) · United Kingdom' }
};

export function CurrencyProvider({ children }) {
  const [currency, setCurrency] = useState(() => {
    return storage.get('lumera_currency', 'INR');
  });

  useEffect(() => {
    storage.set('lumera_currency', currency);
  }, [currency]);

  const activeCurrency = CURRENCIES[currency] || CURRENCIES.INR;

  /**
   * Convert base INR price to active currency and format cleanly
   */
  const format = (amountInINR) => {
    if (amountInINR === undefined || amountInINR === null) return `${activeCurrency.symbol}0`;
    const converted = amountInINR * activeCurrency.rate;

    if (currency === 'INR') {
      return `₹${Math.round(amountInINR).toLocaleString('en-IN')}`;
    }

    return `${activeCurrency.symbol}${converted.toLocaleString('en-US', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    })}`;
  };

  return (
    <CurrencyContext.Provider
      value={{
        currency,
        setCurrency,
        activeCurrency,
        formatPrice: format,
        currencies: CURRENCIES
      }}
    >
      {children}
    </CurrencyContext.Provider>
  );
}

export function useCurrency() {
  const context = useContext(CurrencyContext);
  if (!context) {
    throw new Error('useCurrency must be used within a CurrencyProvider');
  }
  return context;
}
