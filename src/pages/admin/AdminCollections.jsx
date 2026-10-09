import React, { useState } from 'react';
import {
  Layers,
  Plus,
  Edit,
  Trash2,
  CheckCircle2,
  Sparkles,
  ExternalLink,
  Power
} from 'lucide-react';
import { initialCollections } from '../../data/adminMockData.js';
import { useToast } from '../../context/ToastContext.jsx';
import { storage } from '../../lib/storage.js';

export default function AdminCollections() {
  const { showToast } = useToast();

  const [collections, setCollections] = useState(() => {
    return storage.get('lumera_admin_collections', initialCollections);
  });

  const [showModal, setShowModal] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [form, setForm] = useState({
    name: '',
    slug: '',
    description: '',
    image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=800&q=80',
    productsCount: 10,
    status: 'Active',
    featured: true
  });

  const handleOpenAdd = () => {
    setEditingItem(null);
    setForm({
      name: '',
      slug: '',
      description: '',
      image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=800&q=80',
      productsCount: 8,
      status: 'Active',
      featured: true
    });
    setShowModal(true);
  };

  const handleOpenEdit = (col) => {
    setEditingItem(col);
    setForm({
      name: col.name,
      slug: col.slug,
      description: col.description,
      image: col.image,
      productsCount: col.productsCount,
      status: col.status,
      featured: col.featured
    });
    setShowModal(true);
  };

  const handleToggleStatus = (id) => {
    const updated = collections.map((c) =>
      c.id === id ? { ...c, status: c.status === 'Active' ? 'Draft' : 'Active' } : c
    );
    setCollections(updated);
    storage.set('lumera_admin_collections', updated);
    showToast('Collection status updated', 'info');
  };

  const handleDelete = (id) => {
    if (window.confirm('Delete this collection?')) {
      const updated = collections.filter((c) => c.id !== id);
      setCollections(updated);
      storage.set('lumera_admin_collections', updated);
      showToast('Collection deleted', 'info');
    }
  };

  const handleSave = () => {
    if (!form.name.trim()) {
      showToast('Please enter a collection name', 'error');
      return;
    }
    const slug =
      form.slug.trim() ||
      form.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');

    if (editingItem) {
      const updated = collections.map((c) =>
        c.id === editingItem.id ? { ...c, ...form, slug } : c
      );
      setCollections(updated);
      storage.set('lumera_admin_collections', updated);
      showToast(`Updated "${form.name}"`, 'success');
    } else {
      const newCol = {
        id: `col-${Date.now()}`,
        ...form,
        slug,
        created: 'Oct 2026'
      };
      const updated = [...collections, newCol];
      setCollections(updated);
      storage.set('lumera_admin_collections', updated);
      showToast(`Created collection "${form.name}"`, 'success');
    }

    setShowModal(false);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-[#E6E6EA]">
        <div>
          <span className="text-[10px] uppercase font-mono tracking-[0.22em] text-[#9A7B4F] font-semibold">
            EDITORIAL CAPSULES
          </span>
          <h1 className="font-serif-luxury text-3xl sm:text-4xl text-neutral-900 font-light tracking-tight">
            Collections
          </h1>
          <p className="text-xs text-neutral-500 mt-0.5">
            Manage seasonal capsules, runway drops, and thematic lookbook stories.
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="inline-flex items-center gap-1.5 px-4 py-2 bg-neutral-900 hover:bg-black text-white text-xs font-semibold rounded-md transition-colors shadow-xs cursor-pointer"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>+ Add Collection</span>
        </button>
      </div>

      {/* Collections Grid Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {collections.map((col) => {
          const isActive = col.status === 'Active';
          return (
            <div
              key={col.id}
              className="bg-white border border-[#E6E6EA] rounded-md overflow-hidden shadow-xs flex flex-col justify-between group"
            >
              <div>
                <div className="relative h-44 overflow-hidden bg-neutral-100">
                  <img
                    src={col.image}
                    alt={col.name}
                    className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 flex items-center gap-2">
                    <span
                      className={`text-[10px] font-mono uppercase px-2 py-0.5 rounded-xs ${
                        isActive
                          ? 'bg-neutral-900 text-white'
                          : 'bg-white/95 text-neutral-600 backdrop-blur-xs'
                      }`}
                    >
                      {col.status}
                    </span>
                    {col.featured && (
                      <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded-xs bg-[#C5A265] text-white font-semibold">
                        Featured
                      </span>
                    )}
                  </div>
                </div>

                <div className="p-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <h3 className="font-serif-luxury text-lg text-neutral-900 font-medium">
                      {col.name}
                    </h3>
                    <span className="text-[11px] font-mono text-neutral-400">
                      {col.productsCount} Pieces
                    </span>
                  </div>
                  <p className="text-xs text-neutral-600 leading-relaxed line-clamp-2">
                    {col.description}
                  </p>
                </div>
              </div>

              <div className="p-4 border-t border-neutral-100 bg-[#FBFBFC] flex items-center justify-between text-xs">
                <span className="text-[10px] font-mono text-neutral-400">Created {col.created}</span>
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => handleToggleStatus(col.id)}
                    title={isActive ? 'Deactivate' : 'Activate'}
                    className="p-1.5 text-neutral-600 hover:text-black hover:bg-neutral-100 rounded-xs cursor-pointer"
                  >
                    <Power className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => handleOpenEdit(col)}
                    title="Edit"
                    className="p-1.5 text-neutral-600 hover:text-black hover:bg-neutral-100 rounded-xs cursor-pointer"
                  >
                    <Edit className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => handleDelete(col.id)}
                    title="Delete"
                    className="p-1.5 text-rose-600 hover:bg-rose-50 rounded-xs cursor-pointer"
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
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <div className="bg-white max-w-md w-full p-6 rounded-md shadow-2xl border border-neutral-200 space-y-4">
            <h3 className="font-serif-luxury text-xl text-neutral-900 font-medium">
              {editingItem ? 'Edit Collection' : 'Create Collection'}
            </h3>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block text-neutral-600 mb-1 font-medium">Collection Title</label>
                <input
                  type="text"
                  placeholder="e.g. Normandy Flax Edit"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full bg-neutral-50 border border-neutral-200 rounded-md p-2 text-neutral-900 focus:bg-white focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block text-neutral-600 mb-1 font-medium">Description</label>
                <textarea
                  rows={2}
                  placeholder="Seasonal editorial notes..."
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  className="w-full bg-neutral-50 border border-neutral-200 rounded-md p-2 text-neutral-900 focus:bg-white focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block text-neutral-600 mb-1 font-medium">Image URL</label>
                <input
                  type="text"
                  value={form.image}
                  onChange={(e) => setForm({ ...form, image: e.target.value })}
                  className="w-full bg-neutral-50 border border-neutral-200 rounded-md p-2 text-neutral-900 font-mono text-[11px] focus:bg-white focus:outline-hidden"
                />
              </div>

              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="featuredToggle"
                  checked={form.featured}
                  onChange={(e) => setForm({ ...form, featured: e.target.checked })}
                  className="rounded-xs"
                />
                <label htmlFor="featuredToggle" className="text-neutral-700 font-medium">
                  Feature in Homepage Capsules
                </label>
              </div>
            </div>

            <div className="flex justify-end gap-2.5 pt-2">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 border border-neutral-300 rounded-md text-xs font-medium text-neutral-600 hover:bg-neutral-50 cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-neutral-900 hover:bg-black text-white rounded-md text-xs font-semibold cursor-pointer"
              >
                Save Collection
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
