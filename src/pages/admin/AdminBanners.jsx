import React, { useState } from 'react';
import {
  Image as ImageIcon,
  Plus,
  Edit,
  Trash2,
  Power,
  ExternalLink,
  Eye,
  Sparkles
} from 'lucide-react';
import { initialBanners } from '../../data/adminMockData.js';
import { useToast } from '../../context/ToastContext.jsx';
import { storage } from '../../lib/storage.js';

export default function AdminBanners() {
  const { showToast } = useToast();

  const [banners, setBanners] = useState(() => {
    return storage.get('fillkart_admin_banners', initialBanners);
  });

  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({
    title: '',
    subtitle: '',
    cta: 'Explore Capsule',
    link: '/shop/women',
    image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1600&q=80',
    position: 'Homepage Hero Slide',
    status: 'Active'
  });

  const handleToggle = (id) => {
    const updated = banners.map((b) =>
      b.id === id ? { ...b, status: b.status === 'Active' ? 'Inactive' : 'Active' } : b
    );
    setBanners(updated);
    storage.set('fillkart_admin_banners', updated);
    showToast('Banner status updated', 'info');
  };

  const handleDelete = (id) => {
    if (window.confirm('Delete this banner?')) {
      const updated = banners.filter((b) => b.id !== id);
      setBanners(updated);
      storage.set('fillkart_admin_banners', updated);
      showToast('Banner removed', 'info');
    }
  };

  const handleSave = () => {
    if (!form.title.trim()) {
      showToast('Please enter a banner title', 'error');
      return;
    }
    const newBanner = {
      id: `ban-${Date.now()}`,
      ...form
    };
    const updated = [...banners, newBanner];
    setBanners(updated);
    storage.set('fillkart_admin_banners', updated);
    showToast('Banner saved', 'success');
    setShowModal(false);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-[#E8E6E1]">
        <div>
          <span className="text-[10px] uppercase font-mono tracking-[0.25em] text-[#8C7A6B] font-semibold">
            EDITORIAL MERCHANDISING
          </span>
          <h1 className="font-serif-luxury text-3xl sm:text-4xl text-[#191919] font-light tracking-tight">
            Marketing Banners
          </h1>
          <p className="text-xs text-[#6E6961] mt-0.5">
            Control storefront hero banners, seasonal editorial slides, and CTA landing links.
          </p>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#191919] hover:bg-black text-white text-xs font-semibold rounded-md transition-colors shadow-xs"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>+ Add Banner</span>
        </button>
      </div>

      {/* Banners Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {banners.map((b) => {
          const isActive = b.status === 'Active';
          return (
            <div
              key={b.id}
              className="bg-white border border-[#E8E6E1] rounded-lg overflow-hidden shadow-xs flex flex-col justify-between"
            >
              <div>
                <div className="relative h-44 bg-[#FAF9F5] overflow-hidden">
                  <img src={b.image} alt={b.title} className="w-full h-full object-cover" />
                  <div className="absolute top-3 left-3">
                    <span
                      className={`text-[10px] font-mono uppercase px-2 py-0.5 rounded-full ${
                        isActive ? 'bg-[#191919] text-white' : 'bg-white text-[#7A756D]'
                      }`}
                    >
                      {b.status}
                    </span>
                  </div>
                </div>

                <div className="p-4 space-y-1.5">
                  <span className="text-[10px] font-mono text-[#8C7A6B] uppercase tracking-wider block">
                    {b.position}
                  </span>
                  <h3 className="font-serif-luxury text-lg text-[#191919] font-medium">
                    {b.title}
                  </h3>
                  <p className="text-xs text-[#6E6961] line-clamp-2">{b.subtitle}</p>
                  <p className="text-[11px] font-mono text-[#191919] pt-1">CTA: &quot;{b.cta}&quot; ➔ {b.link}</p>
                </div>
              </div>

              <div className="p-4 border-t border-[#F2EFE9] bg-[#FCFBF9] flex items-center justify-between text-xs">
                <button
                  onClick={() => handleToggle(b.id)}
                  className="text-xs font-medium text-[#4A4742] hover:text-[#191919]"
                >
                  {isActive ? 'Deactivate' : 'Activate'}
                </button>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleDelete(b.id)}
                    className="p-1.5 text-[#DC2626] hover:bg-[#FEF2F2] rounded-xs"
                    title="Delete"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs">
          <div className="bg-white max-w-md w-full p-6 rounded-lg shadow-2xl border border-[#E8E6E1] space-y-4">
            <h3 className="font-serif-luxury text-xl text-[#191919]">Add Merchandising Banner</h3>
            <div className="space-y-3 text-xs">
              <div>
                <label className="text-[#4A4742] font-medium block mb-1">Title</label>
                <input
                  type="text"
                  placeholder="e.g. Autumn / Winter 2026"
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  className="w-full bg-[#F8F7F4] border border-[#E2DED6] rounded-md p-2 text-[#191919]"
                />
              </div>
              <div>
                <label className="text-[#4A4742] font-medium block mb-1">Subtitle</label>
                <input
                  type="text"
                  placeholder="Artisanal silhouettes..."
                  value={form.subtitle}
                  onChange={(e) => setForm({ ...form, subtitle: e.target.value })}
                  className="w-full bg-[#F8F7F4] border border-[#E2DED6] rounded-md p-2 text-[#191919]"
                />
              </div>
              <div>
                <label className="text-[#4A4742] font-medium block mb-1">Image URL</label>
                <input
                  type="text"
                  value={form.image}
                  onChange={(e) => setForm({ ...form, image: e.target.value })}
                  className="w-full bg-[#F8F7F4] border border-[#E2DED6] rounded-md p-2 text-[#191919]"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[#4A4742] font-medium block mb-1">Button CTA</label>
                  <input
                    type="text"
                    value={form.cta}
                    onChange={(e) => setForm({ ...form, cta: e.target.value })}
                    className="w-full bg-[#F8F7F4] border border-[#E2DED6] rounded-md p-2 text-[#191919]"
                  />
                </div>
                <div>
                  <label className="text-[#4A4742] font-medium block mb-1">Target Link</label>
                  <input
                    type="text"
                    value={form.link}
                    onChange={(e) => setForm({ ...form, link: e.target.value })}
                    className="w-full bg-[#F8F7F4] border border-[#E2DED6] rounded-md p-2 text-[#191919]"
                  />
                </div>
              </div>
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 border border-[#DDD8CE] rounded-md text-xs"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-[#191919] text-white rounded-md text-xs font-semibold"
              >
                Save Banner
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
