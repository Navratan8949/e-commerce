import React, { useState } from 'react';
import AnnouncementBar from './AnnouncementBar.jsx';
import Navbar from './Navbar.jsx';
import Footer from './Footer.jsx';
import MobileDrawer from './MobileDrawer.jsx';
import CartDrawer from './CartDrawer.jsx';
import ToastContainer from './ToastContainer.jsx';
import QuickViewModal from './QuickViewModal.jsx';
import SizeGuideModal from './SizeGuideModal.jsx';
import SearchModal from './SearchModal.jsx';

export default function Layout({ children }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF9F5] text-[#191919] relative">
      {/* Top Banner */}
      <AnnouncementBar />

      {/* Main Navbar */}
      <Navbar
        onOpenMobileMenu={() => setIsMobileMenuOpen(true)}
        onOpenSearch={() => setIsSearchOpen(true)}
      />

      {/* Page Content */}
      <main className="flex-1">
        {/* Pass down quick view & size guide opener via clone or context if needed */}
        {React.Children.map(children, (child) => {
          if (React.isValidElement(child)) {
            return React.cloneElement(child, {
              onQuickView: (product) => setQuickViewProduct(product),
              onOpenSizeGuide: () => setIsSizeGuideOpen(true)
            });
          }
          return child;
        })}
      </main>

      {/* Footer */}
      <Footer />

      {/* Drawers & Modals */}
      <MobileDrawer
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />
      <CartDrawer />
      <ToastContainer />
      <QuickViewModal
        product={quickViewProduct}
        isOpen={Boolean(quickViewProduct)}
        onClose={() => setQuickViewProduct(null)}
        onOpenSizeGuide={() => setIsSizeGuideOpen(true)}
      />
      <SizeGuideModal
        isOpen={isSizeGuideOpen}
        onClose={() => setIsSizeGuideOpen(false)}
      />
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />
    </div>
  );
}
