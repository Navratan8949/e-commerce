import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { ToastProvider } from './context/ToastContext.jsx';
import { WishlistProvider } from './context/WishlistContext.jsx';
import { CartProvider } from './context/CartContext.jsx';
import { AuthProvider } from './context/AuthContext.jsx';
import { ProductProvider } from './context/ProductContext.jsx';
import { CurrencyProvider } from './context/CurrencyContext.jsx';
import { RecentlyViewedProvider } from './context/RecentlyViewedContext.jsx';
import Layout from './components/layout/Layout.jsx';
import DemoSwitcherDock from './components/common/DemoSwitcherDock.jsx';

import HomePage from './pages/HomePage.jsx';
import ShopPage from './pages/ShopPage.jsx';
import ProductDetailPage from './pages/ProductDetailPage.jsx';
import SearchPage from './pages/SearchPage.jsx';
import CartPage from './pages/CartPage.jsx';
import WishlistPage from './pages/WishlistPage.jsx';
import CheckoutPage from './pages/CheckoutPage.jsx';
import OrderSuccessPage from './pages/OrderSuccessPage.jsx';
import AboutPage from './pages/AboutPage.jsx';
import ContactPage from './pages/ContactPage.jsx';
import FaqPage from './pages/FaqPage.jsx';
import NotFoundPage from './pages/NotFoundPage.jsx';

import AccountLayout from './pages/account/AccountLayout.jsx';
import AccountDashboard from './pages/account/AccountDashboard.jsx';
import AccountOrders from './pages/account/AccountOrders.jsx';
import AccountProfile from './pages/account/AccountProfile.jsx';

// Admin Console Modules
import AdminLayout from './pages/admin/AdminLayout.jsx';
import AdminDashboard from './pages/admin/AdminDashboard.jsx';
import AdminProducts from './pages/admin/AdminProducts.jsx';
import AdminProductForm from './pages/admin/AdminProductForm.jsx';
import AdminProductDetail from './pages/admin/AdminProductDetail.jsx';
import AdminCategories from './pages/admin/AdminCategories.jsx';
import AdminCollections from './pages/admin/AdminCollections.jsx';
import AdminInventory from './pages/admin/AdminInventory.jsx';
import AdminOrders from './pages/admin/AdminOrders.jsx';
import AdminOrderDetail from './pages/admin/AdminOrderDetail.jsx';
import AdminCustomers from './pages/admin/AdminCustomers.jsx';
import AdminCustomerDetail from './pages/admin/AdminCustomerDetail.jsx';
import AdminReviews from './pages/admin/AdminReviews.jsx';
import AdminCoupons from './pages/admin/AdminCoupons.jsx';
import AdminBanners from './pages/admin/AdminBanners.jsx';
import AdminCampaigns from './pages/admin/AdminCampaigns.jsx';
import AdminAnalytics from './pages/admin/AdminAnalytics.jsx';
import AdminContent from './pages/admin/AdminContent.jsx';
import AdminSettings from './pages/admin/AdminSettings.jsx';

// Scroll to top on navigation
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <ToastProvider>
        <CurrencyProvider>
          <ProductProvider>
            <RecentlyViewedProvider>
              <WishlistProvider>
                <CartProvider>
                  <AuthProvider>
                    <Routes>
                  {/* Dedicated Atelier Admin Panel (Full Viewport) */}
                  <Route path="/admin" element={<AdminLayout />}>
                    <Route index element={<AdminDashboard />} />
                    <Route path="products" element={<AdminProducts />} />
                    <Route path="products/new" element={<AdminProductForm />} />
                    <Route path="products/:id/edit" element={<AdminProductForm />} />
                    <Route path="products/:id" element={<AdminProductDetail />} />
                    <Route path="categories" element={<AdminCategories />} />
                    <Route path="collections" element={<AdminCollections />} />
                    <Route path="inventory" element={<AdminInventory />} />
                    <Route path="orders" element={<AdminOrders />} />
                    <Route path="orders/:id" element={<AdminOrderDetail />} />
                    <Route path="customers" element={<AdminCustomers />} />
                    <Route path="customers/:id" element={<AdminCustomerDetail />} />
                    <Route path="reviews" element={<AdminReviews />} />
                    <Route path="coupons" element={<AdminCoupons />} />
                    <Route path="banners" element={<AdminBanners />} />
                    <Route path="campaigns" element={<AdminCampaigns />} />
                    <Route path="analytics" element={<AdminAnalytics />} />
                    <Route path="content" element={<AdminContent />} />
                    <Route path="blog" element={<AdminContent />} />
                    <Route path="faqs" element={<AdminContent />} />
                    <Route path="settings" element={<AdminSettings />} />
                  </Route>

                  {/* Client Storefront Experience (Wrapped in Client Layout) */}
                  <Route
                    path="/*"
                    element={
                      <Layout>
                        <Routes>
                          <Route path="/" element={<HomePage />} />
                          <Route path="/shop" element={<ShopPage />} />
                          <Route path="/shop/:category" element={<ShopPage />} />
                          <Route path="/product/:slug" element={<ProductDetailPage />} />
                          <Route path="/search" element={<SearchPage />} />
                          <Route path="/cart" element={<CartPage />} />
                          <Route path="/wishlist" element={<WishlistPage />} />
                          <Route path="/checkout" element={<CheckoutPage />} />
                          <Route path="/order-success" element={<OrderSuccessPage />} />
                          <Route path="/about" element={<AboutPage />} />
                          <Route path="/contact" element={<ContactPage />} />
                          <Route path="/faq" element={<FaqPage />} />

                          {/* Customer Account Sub-Routes */}
                          <Route path="/account" element={<AccountLayout />}>
                            <Route index element={<AccountDashboard />} />
                            <Route path="orders" element={<AccountOrders />} />
                            <Route path="profile" element={<AccountProfile />} />
                            <Route path="wishlist" element={<Navigate to="/wishlist" replace />} />
                          </Route>

                          {/* 404 Catch-All */}
                          <Route path="*" element={<NotFoundPage />} />
                        </Routes>
                      </Layout>
                    }
                  />
                </Routes>
                <DemoSwitcherDock />
              </AuthProvider>
            </CartProvider>
          </WishlistProvider>
        </RecentlyViewedProvider>
      </ProductProvider>
    </CurrencyProvider>
  </ToastProvider>
</BrowserRouter>
  );
}
