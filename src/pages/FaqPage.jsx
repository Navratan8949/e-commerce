import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, ChevronUp, ArrowRight } from 'lucide-react';

const FAQ_ITEMS = [
  {
    q: 'How long does shipping take?',
    a: 'All orders are dispatched from our Mumbai atelier within 24–48 hours of authorization. Standard domestic metro delivery takes 2–4 business days. Regional and tier-2 locations typically arrive within 4–6 business days. Express next-day dispatch is available upon request through our concierge.'
  },
  {
    q: 'Do you offer returns?',
    a: 'Yes. We offer complimentary, hassle-free 7-day returns on all full-price items in original, unworn condition with intact atelier tags and packaging. We arrange a doorstep courier pickup at no cost to you. Once received, full refunds are processed to your original payment method within 3–5 business days.'
  },
  {
    q: 'How can I track my order?',
    a: 'Once your parcel is sealed and assigned to our courier partner, you will receive an SMS and email notification with an end-to-end tracking link. You can also view real-time delivery milestones anytime directly inside your Account Dashboard under "Orders & Shipments".'
  },
  {
    q: 'What payment methods are available?',
    a: 'We accept all major Visa, Mastercard, American Express, and RuPay credit and debit cards, instant UPI (Google Pay, PhonePe, Paytm, BHIM), Net Banking across 50+ financial institutions, and Cash on Delivery (COD) for domestic deliveries under ₹25,000.'
  },
  {
    q: 'How do I choose my size?',
    a: 'LUMÉRA garments are engineered with relaxed, architectural tailoring. Each product page features exact garment measurements in inches and centimeters, as well as an interactive Size Guide. If you are between sizes, we recommend sizing down for a tailored silhouette or taking your true size for our signature editorial drape.'
  },
  {
    q: 'Do you offer international shipping?',
    a: 'Yes, we ship globally via DHL Express to over 60 countries including the United States, United Kingdom, European Union, UAE, and Singapore. International delivery takes 4–7 business days, with all duties and taxes calculated transparently at checkout.'
  },
  {
    q: 'How can I contact support?',
    a: 'Our dedicated client concierge is available Monday through Saturday from 10:00 AM to 7:30 PM IST via email at concierge@lumera.studio or phone at +91 (022) 8401 9200. You may also submit inquiries through our online Contact Concierge form for priority response.'
  }
];

export default function FaqPage() {
  const [openIndices, setOpenIndices] = useState([0]); // First open by default

  const toggleIndex = (idx) => {
    if (openIndices.includes(idx)) {
      setOpenIndices(openIndices.filter((i) => i !== idx));
    } else {
      setOpenIndices([...openIndices, idx]);
    }
  };

  return (
    <div className="py-12 sm:py-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Header */}
      <div className="text-center mb-14">
        <span className="text-[11px] uppercase tracking-[0.3em] text-[#8C857B] font-medium block mb-2">
          Knowledge Base & Client Care
        </span>
        <h1 className="font-serif-luxury text-3xl sm:text-5xl text-[#191919] font-light mb-4">
          Frequently Asked Questions
        </h1>
        <p className="text-xs sm:text-sm text-[#736C62] max-w-md mx-auto font-light leading-relaxed">
          Comprehensive answers regarding our atelier practices, delivery, care, and bespoke fitting services.
        </p>
      </div>

      {/* Accordion List */}
      <div className="bg-[#FAF9F5] border border-[#E8E4DC] divide-y divide-[#E8E4DC]">
        {FAQ_ITEMS.map((item, idx) => {
          const isOpen = openIndices.includes(idx);

          return (
            <div key={idx} className="transition-colors">
              <button
                type="button"
                onClick={() => toggleIndex(idx)}
                className="w-full py-5 px-6 sm:px-8 text-left flex items-center justify-between gap-4 hover:bg-[#F5F2EB]/60 transition-colors cursor-pointer"
                aria-expanded={isOpen}
              >
                <span className="font-serif-luxury text-lg sm:text-xl text-[#191919] font-normal">
                  {item.q}
                </span>
                <span className="p-1 text-[#8C857B] shrink-0">
                  {isOpen ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                </span>
              </button>

              {isOpen && (
                <div className="px-6 sm:px-8 pb-6 pt-1 text-xs sm:text-sm text-[#555048] leading-relaxed font-light border-t border-[#F0ECE1] bg-[#FBF9F6]">
                  {item.a}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Concierge Banner */}
      <div className="mt-16 p-8 bg-[#F2EFEB] border border-[#E8E4DC] text-center space-y-3">
        <h3 className="font-serif-luxury text-2xl text-[#191919]">
          Still seeking guidance?
        </h3>
        <p className="text-xs text-[#696359] max-w-md mx-auto leading-relaxed">
          Our client concierge is pleased to assist with bespoke order adjustments, fabric advice, and styling queries.
        </p>
        <div className="pt-2">
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#191919] text-[#FAF9F5] text-xs uppercase tracking-widest font-medium hover:bg-[#333333] transition-colors"
          >
            Contact Concierge
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

    </div>
  );
}
