import React, { useState } from 'react';
import {
  FolderTree,
  Plus,
  Edit,
  Trash2,
  ExternalLink,
  Layers,
  CheckCircle2,
  Image as ImageIcon
} from 'lucide-react';
import { categories as initialCatList } from '../../data/categories.js';
import { useToast } from '../../context/ToastContext.jsx';
import { storage } from '../../lib/storage.js';

export default function AdminCategories() {
  const { showToast } = useToast();

  const [categoriesList, setCategoriesList] = useState(() => {
    return storage.get('fillkart_admin_categories', initialCatList);
  });

  const [showAddModal, setShowAddModal] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [modalForm, setModalForm] = useState({
    name: '',
    slug: '',
    description: '',
    image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=800&q=80',
    itemCount: '12 Pieces',
    status: 'Active'
  });

  const handleOpenAdd = () => {
    setEditingCategory(null);
    setModalForm({
      name: '',
      slug: '',
      description: '',
      image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=800&q=80',
      itemCount: '10 Pieces',
      status: 'Active'
    });
    setShowAddModal(true);
  };

  const handleOpenEdit = (cat) => {
    setEditingCategory(cat);
    setModalForm({
      name: cat.name,
      slug: cat.slug,
      description: cat.description || '',
      image: cat.image,
      itemCount: cat.itemCount || '14 Pieces',
      status: 'Active'
    });
    setShowAddModal(true);
  };

  const handleSaveCategory = () => {
    if (!modalForm.name.trim()) {
      showToast('Please enter a category name', 'error');
      return;
    }

    const slug =
      modalForm.slug.trim() ||
      modalForm.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');

    if (editingCategory) {
      const updated = categoriesList.map((c) =>
        c.id === editingCategory.id ? { ...c, ...modalForm, slug } : c
      );
      setCategoriesList(updated);
      storage.set('fillkart_admin_categories', updated);
      showToast(`Updated category "${modalForm.name}"`, 'success');
    } else {
      const newCat = {
        id: `cat-${Date.now()}`,
        ...modalForm,
        slug
      };
      const updated = [...categoriesList, newCat];
      setCategoriesList(updated);
      storage.set('fillkart_admin_categories', updated);
      showToast(`Added category "${modalForm.name}"`, 'success');
    }

    setShowAddModal(false);
  };

  const handleDeleteCategory = (id) => {
    if (window.confirm('Are you sure you want to delete this category?')) {
      const updated = categoriesList.filter((c) => c.id !== id);
      setCategoriesList(updated);
      storage.set('fillkart_admin_categories', updated);
      showToast('Category removed', 'info');
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-[#E6E6EA]">
        <div>
          <span className="text-[10px] uppercase font-mono tracking-[0.22em] text-[#9A7B4F] font-semibold">
            CATALOG TAXONOMY
          </span>
          <h1 className="font-serif-luxury text-3xl sm:text-4xl text-neutral-900 font-light tracking-tight">
            Categories
          </h1>
          <p className="text-xs text-neutral-500 mt-0.5">
            Organize departments, capsule collections, and product navigation structures.
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="inline-flex items-center gap-1.5 px-4 py-2 bg-neutral-900 hover:bg-black text-white text-xs font-semibold rounded-md transition-colors shadow-xs cursor-pointer"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>+ Add Category</span>
        </button>
      </div>

      {/* Categories Table */}
      <div className="bg-white border border-[#E6E6EA] rounded-md shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-[#E6E6EA] bg-[#FBFBFC] text-neutral-500 font-mono uppercase text-[10px] tracking-wider">
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">Slug</th>
                <th className="py-3 px-4">Pieces in Catalog</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Created</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100">
              {categoriesList.map((cat) => (
                <tr key={cat.id} className="hover:bg-neutral-50 transition-colors">
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={cat.image}
                        alt={cat.name}
                        className="w-12 h-12 rounded-xs object-cover border border-neutral-200 shrink-0"
                      />
                      <div>
                        <p className="font-medium text-neutral-900">{cat.name}</p>
                        <p className="text-[11px] text-neutral-500 line-clamp-1 max-w-xs">
                          {cat.description || cat.tagline}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="py-3.5 px-4 font-mono text-neutral-400">
                    /{cat.slug}
                  </td>
                  <td className="py-3.5 px-4 font-mono text-neutral-900">
                    {cat.itemCount || '12 Pieces'}
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="inline-block px-2 py-0.5 text-[10px] font-mono uppercase bg-emerald-50 text-emerald-800 border border-emerald-200/80 rounded-xs">
                      Active
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-neutral-500">
                    Jan 2026
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => handleOpenEdit(cat)}
                        className="p-1.5 text-neutral-600 hover:text-black hover:bg-neutral-100 rounded-xs transition-colors cursor-pointer"
                        title="Edit category"
                      >
                        <Edit className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleDeleteCategory(cat.id)}
                        className="p-1.5 text-rose-600 hover:bg-rose-50 rounded-xs transition-colors cursor-pointer"
                        title="Delete category"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add / Edit Category Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <div className="bg-white max-w-md w-full p-6 rounded-md shadow-2xl border border-neutral-200 space-y-4">
            <h3 className="font-serif-luxury text-xl text-neutral-900 font-medium">
              {editingCategory ? 'Edit Category' : 'Create New Category'}
            </h3>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block text-neutral-600 mb-1 font-medium">Category Name</label>
                <input
                  type="text"
                  placeholder="e.g. Silk Loungewear"
                  value={modalForm.name}
                  onChange={(e) => setModalForm({ ...modalForm, name: e.target.value })}
                  className="w-full bg-neutral-50 border border-neutral-200 rounded-md p-2 text-neutral-900 focus:bg-white focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block text-neutral-600 mb-1 font-medium">Slug (URL)</label>
                <input
                  type="text"
                  placeholder="e.g. silk-loungewear"
                  value={modalForm.slug}
                  onChange={(e) => setModalForm({ ...modalForm, slug: e.target.value })}
                  className="w-full bg-neutral-50 border border-neutral-200 rounded-md p-2 text-neutral-900 font-mono text-[11px] focus:bg-white focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block text-neutral-600 mb-1 font-medium">Description</label>
                <textarea
                  rows={2}
                  placeholder="Brief editorial summary..."
                  value={modalForm.description}
                  onChange={(e) => setModalForm({ ...modalForm, description: e.target.value })}
                  className="w-full bg-neutral-50 border border-neutral-200 rounded-md p-2 text-neutral-900 focus:bg-white focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block text-neutral-600 mb-1 font-medium">Image URL Preview</label>
                <input
                  type="text"
                  value={modalForm.image}
                  onChange={(e) => setModalForm({ ...modalForm, image: e.target.value })}
                  className="w-full bg-neutral-50 border border-neutral-200 rounded-md p-2 text-neutral-900 font-mono text-[11px] focus:bg-white focus:outline-hidden"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2.5 pt-2">
              <button
                onClick={() => setShowAddModal(false)}
                className="px-4 py-2 border border-neutral-300 rounded-md text-xs font-medium text-neutral-600 hover:bg-neutral-50 cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveCategory}
                className="px-4 py-2 bg-neutral-900 hover:bg-black text-white rounded-md text-xs font-semibold cursor-pointer"
              >
                Save Category
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
