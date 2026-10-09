import React, { useState } from 'react';
import {
  Globe,
  FileText,
  HelpCircle,
  Edit,
  Plus,
  Trash2,
  CheckCircle2,
  Sparkles
} from 'lucide-react';
import { useToast } from '../../context/ToastContext.jsx';
import { storage } from '../../lib/storage.js';

export default function AdminContent() {
  const { showToast } = useToast();

  const [activeTab, setActiveTab] = useState('Homepage');

  const [announcements, setAnnouncements] = useState([
    'FREE SHIPPING ON ORDERS OVER ₹2,999 • COMPLIMENTARY 7-DAY RETURNS',
    'SPRING / SUMMER 2026 CAPSULE • FRENCH LINEN & ARCHITECTURAL SILKS',
    'VISIT OUR BANDRA FLAGSHIP ATELIER • PRIVATE CONSULTATIONS AVAILABLE'
  ]);

  const [faqs, setFaqs] = useState([
    {
      q: 'What is the provenance of your natural fibers?',
      a: 'We source master flax from Normandy, France and organic silk monofilaments from Mysore certified mills.'
    },
    {
      q: 'Do you offer bespoke tailoring or made-to-measure?',
      a: 'Yes, our atelier team provides private fittings in Mumbai and New Delhi showrooms.'
    },
    {
      q: 'What is the complimentary returns window?',
      a: 'We offer 7-day white-glove doorstep reverse pickup across all Indian metros.'
    }
  ]);

  const [blogs, setBlogs] = useState([
    {
      title: 'The Philosophy of Tactile Minimalism',
      date: 'Oct 02, 2026',
      readTime: '4 min read',
      status: 'Published'
    },
    {
      title: 'Behind the Weave: Normandy Flax to Mumbai Atelier',
      date: 'Sep 18, 2026',
      readTime: '6 min read',
      status: 'Published'
    }
  ]);

  const handleSaveAnnouncements = () => {
    showToast('Homepage ticker saved successfully', 'success');
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-[#E8E6E1]">
        <div>
          <span className="text-[10px] uppercase font-mono tracking-[0.25em] text-[#8C7A6B] font-semibold">
            EDITORIAL EDITORIAL CMS
          </span>
          <h1 className="font-serif-luxury text-3xl sm:text-4xl text-[#191919] font-light tracking-tight">
            Storefront Content
          </h1>
          <p className="text-xs text-[#6E6961] mt-0.5">
            Manage top announcement banners, brand stories, journal articles, and customer FAQs.
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-[#E8E6E1] flex items-center gap-6 text-xs font-medium">
        {['Homepage', 'Blog', 'FAQs'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`pb-3 transition-colors relative ${
              activeTab === tab
                ? 'text-[#191919] font-semibold border-b-2 border-[#191919]'
                : 'text-[#7A756D] hover:text-[#191919]'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Tab: Homepage */}
      {activeTab === 'Homepage' && (
        <div className="bg-white border border-[#E8E6E1] p-6 rounded-lg shadow-xs space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-[#F0ECE4]">
            <h3 className="font-serif-luxury text-xl text-[#191919]">
              Announcement Ticker Messages
            </h3>
            <button
              onClick={handleSaveAnnouncements}
              className="px-4 py-1.5 bg-[#191919] text-white rounded-md text-xs font-semibold"
            >
              Save Ticker
            </button>
          </div>

          <div className="space-y-3">
            {announcements.map((msg, i) => (
              <div key={i} className="flex items-center gap-2">
                <span className="font-mono text-xs text-[#8C7A6B] w-6">0{i + 1}.</span>
                <input
                  type="text"
                  value={msg}
                  onChange={(e) => {
                    const copy = [...announcements];
                    copy[i] = e.target.value;
                    setAnnouncements(copy);
                  }}
                  className="flex-1 bg-[#F8F7F4] border border-[#E2DED6] rounded-md px-3 py-2 text-xs text-[#191919]"
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab: Blog */}
      {activeTab === 'Blog' && (
        <div className="bg-white border border-[#E8E6E1] p-6 rounded-lg shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-[#F0ECE4]">
            <h3 className="font-serif-luxury text-xl text-[#191919]">
              Atelier Journal Articles
            </h3>
            <button
              onClick={() => showToast('New journal article draft created', 'success')}
              className="px-3.5 py-1.5 bg-[#191919] text-white rounded-md text-xs font-semibold"
            >
              + New Article
            </button>
          </div>

          <div className="divide-y divide-[#F2EFE9] text-xs">
            {blogs.map((b, i) => (
              <div key={i} className="py-3.5 flex items-center justify-between">
                <div>
                  <h4 className="font-medium text-[#191919]">{b.title}</h4>
                  <p className="text-[11px] text-[#7A756D]">{b.date} · {b.readTime}</p>
                </div>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-[#F0FDF4] text-[#166534]">
                  {b.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab: FAQs */}
      {activeTab === 'FAQs' && (
        <div className="bg-white border border-[#E8E6E1] p-6 rounded-lg shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-[#F0ECE4]">
            <h3 className="font-serif-luxury text-xl text-[#191919]">
              Frequently Asked Questions
            </h3>
            <button
              onClick={() => showToast('FAQ updated', 'success')}
              className="px-4 py-1.5 bg-[#191919] text-white rounded-md text-xs font-semibold"
            >
              Save FAQs
            </button>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <div key={i} className="p-4 bg-[#FAF9F5] border border-[#EAE6DD] rounded-md space-y-2 text-xs">
                <input
                  type="text"
                  value={faq.q}
                  onChange={(e) => {
                    const copy = [...faqs];
                    copy[i].q = e.target.value;
                    setFaqs(copy);
                  }}
                  className="w-full font-semibold text-[#191919] bg-white border border-[#E2DED6] rounded-md p-2"
                />
                <textarea
                  rows={2}
                  value={faq.a}
                  onChange={(e) => {
                    const copy = [...faqs];
                    copy[i].a = e.target.value;
                    setFaqs(copy);
                  }}
                  className="w-full text-[#4A4742] bg-white border border-[#E2DED6] rounded-md p-2"
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
