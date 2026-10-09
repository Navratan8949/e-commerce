import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#141414] text-[#FAF9F5] border-t border-[#262626] pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Brand Kicker & Manifesto Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pb-16 border-b border-[#2A2A2A]">
          <div className="lg:col-span-4 space-y-4">
            <Link
              to="/"
              className="font-serif-luxury text-3xl tracking-[0.24em] uppercase font-light text-[#FFFFFF] block"
            >
              FILLKART
            </Link>
            <p className="font-serif-luxury italic text-base text-[#D4CFC7] max-w-sm font-light">
              Elevate Your Everyday.
            </p>
            <p className="text-xs text-[#9E988F] leading-relaxed max-w-sm pt-2">
              Thoughtfully considered silhouettes, artisanal natural textiles, and architectural precision designed to endure beyond seasonal noise.
            </p>
          </div>

          {/* Navigation Columns */}
          <div className="lg:col-span-8 grid grid-cols-2 sm:grid-cols-4 gap-8">
            
            {/* Column 1: Shop */}
            <div>
              <h4 className="text-[11px] uppercase tracking-[0.2em] font-semibold text-[#E6E1D8] mb-5">
                Shop
              </h4>
              <ul className="space-y-3 text-xs tracking-wider text-[#A39E94]">
                <li>
                  <Link to="/shop/new-arrivals" className="hover:text-white transition-colors">
                    New Arrivals
                  </Link>
                </li>
                <li>
                  <Link to="/shop/women" className="hover:text-white transition-colors">
                    Women
                  </Link>
                </li>
                <li>
                  <Link to="/shop/men" className="hover:text-white transition-colors">
                    Men
                  </Link>
                </li>
                <li>
                  <Link to="/shop/accessories" className="hover:text-white transition-colors">
                    Accessories
                  </Link>
                </li>
                <li>
                  <Link to="/shop" className="hover:text-white transition-colors">
                    Best Sellers
                  </Link>
                </li>
                <li>
                  <Link to="/shop?sale=true" className="hover:text-white text-[#D6A284] transition-colors">
                    Archive Sale
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 2: Help */}
            <div>
              <h4 className="text-[11px] uppercase tracking-[0.2em] font-semibold text-[#E6E1D8] mb-5">
                Client Care
              </h4>
              <ul className="space-y-3 text-xs tracking-wider text-[#A39E94]">
                <li>
                  <Link to="/contact" className="hover:text-white transition-colors">
                    Contact Concierge
                  </Link>
                </li>
                <li>
                  <Link to="/faq" className="hover:text-white transition-colors">
                    FAQ & Shipping
                  </Link>
                </li>
                <li>
                  <Link to="/faq" className="hover:text-white transition-colors">
                    Complimentary Returns
                  </Link>
                </li>
                <li>
                  <Link to="/faq" className="hover:text-white transition-colors">
                    Size & Fit Guide
                  </Link>
                </li>
                <li>
                  <Link to="/account/orders" className="hover:text-white transition-colors">
                    Order Tracking
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 3: About */}
            <div>
              <h4 className="text-[11px] uppercase tracking-[0.2em] font-semibold text-[#E6E1D8] mb-5">
                Maison
              </h4>
              <ul className="space-y-3 text-xs tracking-wider text-[#A39E94]">
                <li>
                  <Link to="/about" className="hover:text-white transition-colors">
                    Our Story
                  </Link>
                </li>
                <li>
                  <Link to="/about" className="hover:text-white transition-colors">
                    The Journal
                  </Link>
                </li>
                <li>
                  <Link to="/about" className="hover:text-white transition-colors">
                    Material Provenance
                  </Link>
                </li>
                <li>
                  <Link to="/about" className="hover:text-white transition-colors">
                    Sustainability Charter
                  </Link>
                </li>
                <li>
                  <Link to="/contact" className="hover:text-white transition-colors">
                    Careers
                  </Link>
                </li>
                <li>
                  <Link to="/admin" className="hover:text-white text-[#D4CCC0] font-medium transition-colors flex items-center gap-1 pt-1">
                    Atelier Admin Console
                    <ArrowUpRight className="w-3 h-3 text-[#A69E8F]" />
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 4: Follow */}
            <div>
              <h4 className="text-[11px] uppercase tracking-[0.2em] font-semibold text-[#E6E1D8] mb-5">
                Follow
              </h4>
              <ul className="space-y-3 text-xs tracking-wider text-[#A39E94]">
                <li>
                  <a
                    href="https://instagram.com"
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-white transition-colors flex items-center gap-1"
                  >
                    Instagram
                    <ArrowUpRight className="w-3 h-3 opacity-60" />
                  </a>
                </li>
                <li>
                  <a
                    href="https://pinterest.com"
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-white transition-colors flex items-center gap-1"
                  >
                    Pinterest
                    <ArrowUpRight className="w-3 h-3 opacity-60" />
                  </a>
                </li>
                <li>
                  <a
                    href="https://facebook.com"
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-white transition-colors flex items-center gap-1"
                  >
                    Facebook
                    <ArrowUpRight className="w-3 h-3 opacity-60" />
                  </a>
                </li>
                <li>
                  <a
                    href="https://linkedin.com"
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-white transition-colors flex items-center gap-1"
                  >
                    LinkedIn
                    <ArrowUpRight className="w-3 h-3 opacity-60" />
                  </a>
                </li>
              </ul>
            </div>

          </div>
        </div>

        {/* Atelier Merchant Console Demo Banner in Footer */}
        <div className="my-10 p-5 bg-[#1B1917] border border-[#2E2A26] flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-2.5 h-2.5 rounded-full bg-[#10B981] animate-pulse" />
            <div>
              <span className="text-[10px] uppercase font-mono tracking-widest text-[#D4AF37] block">
                Store Administrator Portal
              </span>
              <h5 className="font-serif-luxury text-base sm:text-lg text-white font-normal">
                FILLKART Atelier Merchant Operating System
              </h5>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <Link
              to="/admin"
              className="px-3.5 py-1.5 bg-[#FAF9F5] text-[#191919] hover:bg-white text-[11px] uppercase tracking-wider font-semibold transition-colors flex items-center gap-1.5 shadow-xs"
            >
              <span>Launch Admin Console</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
            <Link
              to="/admin/products"
              className="px-3 py-1.5 bg-[#262320] text-[#D8D2C6] hover:text-white hover:bg-[#332E2A] text-[10.5px] uppercase tracking-wider font-mono transition-colors"
            >
              Catalog (28 SKUs)
            </Link>
            <Link
              to="/admin/orders"
              className="px-3 py-1.5 bg-[#262320] text-[#D8D2C6] hover:text-white hover:bg-[#332E2A] text-[10.5px] uppercase tracking-wider font-mono transition-colors"
            >
              Live Orders
            </Link>
          </div>
        </div>

        {/* Bottom Legal bar */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between text-[11px] text-[#736E66] gap-4">
          <p className="tracking-widest">
            © 2026 FILLKART. ALL RIGHTS RESERVED.
          </p>
          <div className="flex items-center gap-1.5 tracking-wider">
            <span>Designed by</span>
            <a
              href="https://www.codepecharcha.in"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#D4AF37] hover:text-[#FAF9F5] transition-colors font-medium hover:underline"
            >
              Code Pe Charcha
            </a>
          </div>
          <div className="flex items-center gap-6 uppercase tracking-wider">
            <Link to="/faq" className="hover:text-[#FAF9F5] transition-colors">
              Privacy Policy
            </Link>
            <span className="text-[#3A3834]">/</span>
            <Link to="/faq" className="hover:text-[#FAF9F5] transition-colors">
              Terms of Service
            </Link>
            <span className="text-[#3A3834]">/</span>
            <Link to="/faq" className="hover:text-[#FAF9F5] transition-colors">
              Shipping & Duties
            </Link>
          </div>
        </div>

      </div>
    </footer>
  );
}
