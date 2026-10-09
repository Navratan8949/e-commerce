import React, { createContext, useContext, useState, useEffect } from 'react';
import { storage } from '../lib/storage.js';
import { initialOrders } from '../data/orders.js';
import { generateOrderId } from '../lib/utils.js';

const AuthContext = createContext(null);

const DEFAULT_USER = {
  fullName: 'Eleanor Vance',
  email: 'eleanor.vance@lumera.studio',
  phone: '+91 98201 44521',
  address: 'Penthouse 4B, The Imperial Heights, Worli Sea Face',
  city: 'Mumbai',
  state: 'Maharashtra',
  pincode: '400018',
  memberSince: 'January 2025'
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    return storage.get('lumera_user', DEFAULT_USER);
  });

  const [orders, setOrders] = useState(() => {
    return storage.get('lumera_orders', initialOrders);
  });

  useEffect(() => {
    storage.set('lumera_user', user);
  }, [user]);

  useEffect(() => {
    storage.set('lumera_orders', orders);
  }, [orders]);

  const updateProfile = (updatedFields) => {
    setUser((prev) => ({
      ...prev,
      ...updatedFields
    }));
  };

  const createOrder = ({ items, subtotal, discount, shipping, total, customer, paymentMethod }) => {
    const newOrderId = generateOrderId();
    const today = new Date();
    const deliveryDate = new Date();
    deliveryDate.setDate(today.getDate() + 5);

    const dateOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDate = today.toLocaleDateString('en-US', dateOptions);
    const formattedDelivery = deliveryDate.toLocaleDateString('en-US', dateOptions);

    const orderItems = items.map((item) => ({
      productId: item.product.id,
      name: item.product.name,
      image: item.product.images?.[0] || '',
      size: item.size,
      color: item.color?.name || 'Standard',
      price: item.product.price,
      quantity: item.quantity
    }));

    const newOrder = {
      id: newOrderId,
      date: formattedDate,
      items: orderItems,
      subtotal,
      discount,
      shipping,
      total,
      status: 'Order Placed',
      estimatedDelivery: formattedDelivery,
      customer: {
        ...user,
        ...customer
      },
      paymentMethod: paymentMethod || 'Credit / Debit Card'
    };

    setOrders((prev) => [newOrder, ...prev]);

    // Also update saved user defaults
    if (customer) {
      updateProfile(customer);
    }

    return newOrder;
  };

  const updateOrderStatus = (orderId, newStatus) => {
    setOrders((prev) =>
      prev.map((order) => (order.id === orderId ? { ...order, status: newStatus } : order))
    );
  };

  const deleteOrder = (orderId) => {
    setOrders((prev) => prev.filter((order) => order.id !== orderId));
  };

  const getOrderById = (orderId) => {
    return orders.find((o) => o.id === orderId) || null;
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        orders,
        updateProfile,
        createOrder,
        updateOrderStatus,
        deleteOrder,
        getOrderById
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
