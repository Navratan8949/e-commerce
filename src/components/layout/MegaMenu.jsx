import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import ImageWithFallback from '../common/ImageWithFallback.jsx';

const MEGA_DATA = {
  women: {
    title: "Women's Collection",
    subcategories: [
      { name: 'All Women', href: '/shop/women' },
      { name: 'Oversized Shirts & Tops', href: '/shop/women' },
      { name: 'Silk Slip & Column Dresses', href: '/shop/women' },
      { name: 'Virgin Wool Tailoring & Blazers', href: '/shop/women' },
      { name: 'Pleated Wide-Leg Trousers', href: '/shop/women' },
      { name: 'Merino & Cashmere Knitwear', href: '/shop/women' }
    ],
    editorialTitle: 'The Monochromatic Silhouette',
    editorialDesc: 'Architectural linen cut on the bias, pairing fluid movement with timeless structure.',
    editorialImage: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=600&q=80',
    link: '/shop/women'
  },
  men: {
    title: "Men's Collection",
    subcategories: [
      { name: 'All Men', href: '/shop/men' },
      { name: 'Pinpoint Supima Oxford Shirts', href: '/shop/men' },
      { name: 'European Relaxed Linen Shirts', href: '/shop/men' },
      { name: 'High-Twist Tailored Trousers', href: '/shop/men' },
      { name: 'Heavyweight Twill Overshirts', href: '/shop/men' },
      { name: 'Italian Hopsack Blazers', href: '/shop/men' }
    ],
    editorialTitle: 'Mediterranean Tailoring',
    editorialDesc: 'Unstructured shoulders crafted in hopsack wool for effortless European elegance.',
    editorialImage: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=600&q=80',
    link: '/shop/men'
  },
  accessories: {
    title: 'Leather & Accoutrements',
    subcategories: [
      { name: 'All Accessories', href: '/shop/accessories' },
      { name: 'Tuscan Full-Grain Leather Totes', href: '/shop/accessories' },
      { name: 'Sculptural Nappa Shoulder Bags', href: '/shop/accessories' },
      { name: 'Surgical Steel 38mm Timepieces', href: '/shop/accessories' },
      { name: 'Hand-Burnished Bridle Belts', href: '/shop/accessories' },
      { name: 'Plant-Based Cellulose Sunglasses', href: '/shop/accessories' }
    ],
    editorialTitle: 'Artifacts of Daily Ritual',
    editorialDesc: 'Vegetable-tanned in Florence with natural chestnut tannins to develop unique personal patina.',
    editorialImage: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=600&q=80',
    link: '/shop/accessories'
  }
};

export default function MegaMenu({ activeCategory, onClose }) {
  if (!activeCategory || !MEGA_DATA[activeCategory]) return null;

  const data = MEGA_DATA[activeCategory];

  return (
    <div
      onMouseLeave={onClose}
      className="absolute top-full inset-x-0 bg-[#FAF9F5] border-b border-[#E0D9CC] shadow-xl z-30 transition-all duration-300 animate-slide-up"
    >
      <div className="max-w-7xl mx-auto px-8 py-10 grid grid-cols-12 gap-10">
        
        {/* Subcategories list */}
        <div className="col-span-5 space-y-4 border-r border-[#E8E4DC] pr-8">
          <span className="text-[10px] uppercase tracking-[0.25em] text-[#8C857B] font-mono block">
            {data.title}
          </span>
          <div className="space-y-2.5">
            {data.subcategories.map((sub, i) => (
              <Link
                key={i}
                to={sub.href}
                onClick={onClose}
                className="block text-sm font-serif-luxury text-[#191919] hover:translate-x-1 transition-transform font-normal hover:text-[#555]"
              >
                {sub.name}
              </Link>
            ))}
          </div>
          <div className="pt-4">
            <Link
              to={data.link}
              onClick={onClose}
              className="inline-flex items-center gap-1.5 text-xs uppercase tracking-widest text-[#191919] font-semibold underline"
            >
              <span>Explore Complete Category</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* Editorial Feature Banner */}
        <div className="col-span-7 grid grid-cols-12 gap-6 bg-[#F2EEE6] p-6 border border-[#E0D9CC]">
          <div className="col-span-5 aspect-4/5 bg-[#E2DBD0] overflow-hidden">
            <ImageWithFallback
              src={data.editorialImage}
              alt={data.editorialTitle}
              aspectRatio="4/5"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="col-span-7 flex flex-col justify-between py-2">
            <div>
              <span className="text-[10px] uppercase tracking-[0.25em] text-[#8C857B] font-mono block mb-1">
                EDITORIAL STUDY
              </span>
              <h4 className="font-serif-luxury text-2xl text-[#191919] font-normal leading-tight mb-2">
                {data.editorialTitle}
              </h4>
              <p className="text-xs text-[#555048] leading-relaxed font-light">
                {data.editorialDesc}
              </p>
            </div>
            <div>
              <Link
                to={data.link}
                onClick={onClose}
                className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#191919] text-[#FAF9F5] text-[10.5px] uppercase tracking-wider font-semibold hover:bg-[#333333] transition-colors"
              >
                <span>View Capsule</span>
                <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
