import React, { createContext, useContext, useState, useEffect } from 'react';
import { storage } from '../lib/storage.js';
import { initialOrders } from '../data/orders.js';
import { generateOrderId } from '../lib/utils.js';
import { ECOMMERCE_DEMO_USERS } from '../data/demoUsers.js';

const AuthContext = createContext(null);

const DEFAULT_USER = {
  fullName: 'Alexander Vance',
  email: 'admin@fillkart.com',
  phone: '+91 98201 44521',
  role: 'super_admin',
  roleName: 'Atelier Director / Super Admin',
  badge: 'Super Admin',
  avatar: 'AV',
  address: 'Penthouse 4B, The Imperial Heights, Worli Sea Face',
  city: 'Mumbai',
  state: 'Maharashtra',
  pincode: '400018',
  memberSince: 'January 2025'
};

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return storage.get('fillkart_auth_state', true);
  });

  const [user, setUser] = useState(() => {
    return storage.get('fillkart_user', DEFAULT_USER);
  });

  const [orders, setOrders] = useState(() => {
    return storage.get('fillkart_orders', initialOrders);
  });

  useEffect(() => {
    storage.set('fillkart_auth_state', isAuthenticated);
  }, [isAuthenticated]);

  useEffect(() => {
    storage.set('fillkart_user', user);
  }, [user]);

  useEffect(() => {
    storage.set('fillkart_orders', orders);
  }, [orders]);

  const login = (credentialsOrUser) => {
    let matchedUser = null;

    if (typeof credentialsOrUser === 'string') {
      matchedUser = ECOMMERCE_DEMO_USERS.find(
        (u) =>
          u.roleId === credentialsOrUser ||
          u.email.toLowerCase() === credentialsOrUser.toLowerCase()
      ) || ECOMMERCE_DEMO_USERS[0];
    } else if (credentialsOrUser && credentialsOrUser.roleId) {
      matchedUser = credentialsOrUser;
    } else if (credentialsOrUser && credentialsOrUser.email) {
      matchedUser = ECOMMERCE_DEMO_USERS.find(
        (u) => u.email.toLowerCase() === credentialsOrUser.email.toLowerCase()
      );
      if (!matchedUser) {
        matchedUser = {
          id: `user-${Date.now()}`,
          name: credentialsOrUser.email.split('@')[0],
          roleId: 'customer_vip',
          roleName: 'Patron Client',
          email: credentialsOrUser.email,
          badge: 'Verified Client',
          avatar: credentialsOrUser.email.slice(0, 2).toUpperCase(),
          targetRoute: '/account'
        };
      }
    } else {
      matchedUser = ECOMMERCE_DEMO_USERS[0];
    }

    const updatedUserObj = {
      ...user,
      fullName: matchedUser.name,
      email: matchedUser.email,
      role: matchedUser.roleId,
      roleName: matchedUser.roleName,
      badge: matchedUser.badge,
      avatar: matchedUser.avatar
    };

    setIsAuthenticated(true);
    setUser(updatedUserObj);
    return matchedUser;
  };

  const logout = () => {
    setIsAuthenticated(false);
  };

  const switchDemoUser = (userId) => {
    const target = ECOMMERCE_DEMO_USERS.find((u) => u.id === userId) || ECOMMERCE_DEMO_USERS[0];
    return login(target);
  };

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
        isAuthenticated,
        user,
        currentUser: user,
        login,
        logout,
        switchDemoUser,
        orders,
        updateProfile,
        createOrder,
        updateOrderStatus,
        deleteOrder,
        getOrderById,
        demoUsers: ECOMMERCE_DEMO_USERS
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
