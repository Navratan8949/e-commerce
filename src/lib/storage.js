// Safe localStorage wrapper for FILLKART

const isBrowser = typeof window !== 'undefined';

export const storage = {
  get: (key, defaultValue = null) => {
    if (!isBrowser) return defaultValue;
    try {
      let item = window.localStorage.getItem(key);
      if (!item && key.startsWith('fillkart_')) {
        const legacyKey = key.replace('fillkart_', 'lumera_');
        item = window.localStorage.getItem(legacyKey);
      }
      return item ? JSON.parse(item) : defaultValue;
    } catch (error) {
      console.warn(`Error reading localStorage key "${key}":`, error);
      return defaultValue;
    }
  },

  set: (key, value) => {
    if (!isBrowser) return;
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.warn(`Error saving to localStorage key "${key}":`, error);
    }
  },

  remove: (key) => {
    if (!isBrowser) return;
    try {
      window.localStorage.removeItem(key);
    } catch (error) {
      console.warn(`Error removing localStorage key "${key}":`, error);
    }
  }
};
