import React from 'react';
import { Instagram, ArrowUpRight } from 'lucide-react';
import ImageWithFallback from '../common/ImageWithFallback.jsx';

const instagramPosts = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=600&q=80',
    caption: 'Soft sunlight across double-faced virgin wool. Autumn in Florence.'
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=600&q=80',
    caption: 'The Palazzo drape in bone ivory. Movement without effort.'
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=600&q=80',
    caption: 'Tuscan vegetable-tanned leather. Developing patina through daily ritual.'
  },
  {
    id: 4,
    image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=600&q=80',
    caption: 'Unstructured tailoring crafted from hopsack wool.'
  },
  {
    id: 5,
    image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=600&q=80',
    caption: 'Fluid silk satin slip in champagne ivory.'
  },
  {
    id: 6,
    image: 'https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=600&q=80',
    caption: '38mm surgical steel and Horween leather.'
  }
];

export default function InstagramGrid() {
  return (
    <section className="py-20 lg:py-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="text-center mb-12">
        <span className="text-[11px] uppercase tracking-[0.25em] text-[#8C857B] font-medium block mb-2">
          Curated Visual Journal
        </span>
        <a
          href="https://instagram.com"
          target="_blank"
          rel="noreferrer"
          className="font-serif-luxury text-3xl sm:text-4xl text-[#191919] hover:opacity-80 transition-opacity inline-flex items-center gap-2"
        >
          <span>@fillkart.official</span>
          <ArrowUpRight className="w-5 h-5 text-[#8C857B]" />
        </a>
      </div>

      {/* 6 Image Tiles */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
        {instagramPosts.map((post) => (
          <a
            key={post.id}
            href="https://instagram.com"
            target="_blank"
            rel="noreferrer"
            className="group relative aspect-square bg-[#EBE7DF] overflow-hidden block"
            aria-label="View Instagram post"
          >
            <ImageWithFallback
              src={post.image}
              alt="FILLKART Instagram Editorial"
              aspectRatio="1/1"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-108"
            />
            {/* Overlay */}
            <div className="absolute inset-0 bg-[#141210]/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center p-3 text-center text-white">
              <Instagram className="w-6 h-6 mb-2 stroke-[1.5]" />
              <span className="text-[10px] uppercase tracking-[0.2em] font-medium">
                View Post
              </span>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
