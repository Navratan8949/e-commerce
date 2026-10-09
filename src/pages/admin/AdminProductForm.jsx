import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import {
  ArrowLeft,
  Upload,
  X,
  Plus,
  Trash2,
  Check,
  Sparkles,
  Image as ImageIcon,
  DollarSign,
  Layers,
  Star,
  CheckCircle2
} from 'lucide-react';
import { useProducts } from '../../context/ProductContext.jsx';
import { useToast } from '../../context/ToastContext.jsx';
import { formatPrice } from '../../lib/utils.js';

const SAMPLE_IMAGE_PRESETS = [
  'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1000&q=80',
  'https://images.unsplash.com/photo-1598554747436-c9293d6a588f?auto=format&fit=crop&w=1000&q=80',
  'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1000&q=80',
  'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=1000&q=80',
  'https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=1000&q=80'
];

export default function AdminProductForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { products, addProduct, updateProduct } = useProducts();
  const { showToast } = useToast();

  const isEditing = Boolean(id);
  const existingProduct = isEditing ? products.find((p) => p.id === id) : null;

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    sku: '',
    category: 'women',
    subcategory: 'Shirts & Tops',
    description: '',
    price: '',
    originalPrice: '',
    stock: 15,
    lowStockThreshold: 5,
    isNew: true,
    isFeatured: false,
    isBestSeller: false,
    isActive: true,
    images: [SAMPLE_IMAGE_PRESETS[0]],
    colors: [
      { name: 'Oatmeal', hex: '#D6C7B2' },
      { name: 'Noir', hex: '#191919' }
    ],
    sizes: ['XS', 'S', 'M', 'L']
  });

  // Custom swatch color adder
  const [newColorName, setNewColorName] = useState('');
  const [newColorHex, setNewColorHex] = useState('#4A4742');

  // Populate data when editing
  useEffect(() => {
    if (isEditing && existingProduct) {
      setFormData({
        name: existingProduct.name || '',
        slug: existingProduct.slug || '',
        sku: existingProduct.sku || `LUM-${existingProduct.id.slice(-4).toUpperCase()}`,
        category: existingProduct.category || 'women',
        subcategory: existingProduct.subcategory || 'Essentials',
        description: existingProduct.description || '',
        price: existingProduct.price || '',
        originalPrice: existingProduct.originalPrice || '',
        stock: existingProduct.stock !== undefined ? existingProduct.stock : 15,
        lowStockThreshold: existingProduct.lowStockThreshold || 5,
        isNew: Boolean(existingProduct.isNew),
        isFeatured: Boolean(existingProduct.isFeatured),
        isBestSeller: Boolean(existingProduct.isBestSeller),
        isActive: (existingProduct.stock || 0) > 0,
        images: existingProduct.images?.length > 0 ? existingProduct.images : [SAMPLE_IMAGE_PRESETS[0]],
        colors: existingProduct.colors?.length > 0 ? existingProduct.colors : [
          { name: 'Oatmeal', hex: '#D6C7B2' },
          { name: 'Noir', hex: '#191919' }
        ],
        sizes: existingProduct.sizes?.length > 0 ? existingProduct.sizes : ['XS', 'S', 'M', 'L']
      });
    }
  }, [isEditing, existingProduct]);

  // Handle name change and auto-slug
  const handleNameChange = (e) => {
    const val = e.target.value;
    const generatedSlug = val
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '');

    setFormData((prev) => ({
      ...prev,
      name: val,
      slug: !isEditing ? generatedSlug : prev.slug
    }));
  };

  // Add simulated uploaded image
  const handleAddPresetImage = (url) => {
    if (!formData.images.includes(url)) {
      setFormData((prev) => ({ ...prev, images: [...prev.images, url] }));
    }
  };

  const handleRemoveImage = (index) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
  };

  const handleSetCoverImage = (index) => {
    setFormData((prev) => {
      const copy = [...prev.images];
      const [item] = copy.splice(index, 1);
      copy.unshift(item);
      return { ...prev, images: copy };
    });
  };

  // Size toggle
  const toggleSize = (size) => {
    setFormData((prev) => ({
      ...prev,
      sizes: prev.sizes.includes(size)
        ? prev.sizes.filter((s) => s !== size)
        : [...prev.sizes, size]
    }));
  };

  // Color add
  const handleAddColor = () => {
    if (!newColorName.trim()) return;
    setFormData((prev) => ({
      ...prev,
      colors: [...prev.colors, { name: newColorName.trim(), hex: newColorHex }]
    }));
    setNewColorName('');
  };

  const handleRemoveColor = (index) => {
    setFormData((prev) => ({
      ...prev,
      colors: prev.colors.filter((_, i) => i !== index)
    }));
  };

  // Save handler
  const handleSave = (publish = true) => {
    if (!formData.name.trim()) {
      showToast('Please enter a product name', 'error');
      return;
    }
    if (!formData.price || Number(formData.price) <= 0) {
      showToast('Please enter a valid price', 'error');
      return;
    }

    const payload = {
      ...formData,
      price: Number(formData.price),
      originalPrice: formData.originalPrice ? Number(formData.originalPrice) : undefined,
      stock: publish ? Number(formData.stock) : 0
    };

    if (isEditing && existingProduct) {
      updateProduct(existingProduct.id, payload);
      showToast(`Updated piece "${formData.name}"`, 'success');
    } else {
      addProduct(payload);
      showToast(`Added piece "${formData.name}" to catalog`, 'success');
    }

    navigate('/admin/products');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-12">
      {/* Header & Back Link */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#E8E6E1]">
        <div>
          <Link
            to="/admin/products"
            className="inline-flex items-center gap-1.5 text-xs text-[#8C7A6B] hover:text-[#191919] font-medium mb-1.5 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Products</span>
          </Link>
          <h1 className="font-serif-luxury text-3xl text-[#191919] font-light">
            {isEditing ? `Edit: ${existingProduct?.name || 'Product'}` : 'Add New Atelier Piece'}
          </h1>
          <p className="text-xs text-[#7A756D] mt-0.5">
            Configure specifications, craftsmanship details, stock levels, and imagery.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={() => handleSave(false)}
            className="px-3.5 py-2 bg-white hover:bg-[#F4F1EA] text-[#4A4742] border border-[#DDD8CE] text-xs font-medium rounded-md transition-colors"
          >
            Save Draft
          </button>
          <button
            onClick={() => handleSave(true)}
            className="px-4 py-2 bg-[#191919] hover:bg-black text-white text-xs font-semibold rounded-md transition-colors shadow-xs"
          >
            {isEditing ? 'Save Changes' : 'Publish Product'}
          </button>
        </div>
      </div>

      <div className="space-y-6">
        {/* Section 1: Basic Information */}
        <div className="bg-white border border-[#E8E6E1] p-6 rounded-lg shadow-[0_1px_2px_rgba(0,0,0,0.02)] space-y-4">
          <h2 className="font-serif-luxury text-lg text-[#191919] font-medium pb-2 border-b border-[#F0ECE4]">
            1. Basic Information
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="sm:col-span-2 space-y-1">
              <label className="text-xs font-medium text-[#4A4742]">
                Product Title <span className="text-[#DC2626]">*</span>
              </label>
              <input
                type="text"
                placeholder="e.g. Belgian Linen Oversized Shirt"
                value={formData.name}
                onChange={handleNameChange}
                className="w-full bg-[#F8F7F4] border border-[#E2DED6] rounded-md px-3 py-2 text-xs text-[#191919] focus:bg-white focus:border-[#191919] focus:outline-hidden"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-medium text-[#4A4742]">Slug</label>
              <input
                type="text"
                placeholder="e.g. belgian-linen-oversized-shirt"
                value={formData.slug}
                onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                className="w-full bg-[#F8F7F4] border border-[#E2DED6] rounded-md px-3 py-2 text-xs font-mono text-[#191919] focus:bg-white focus:border-[#191919] focus:outline-hidden"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-medium text-[#4A4742]">SKU Code</label>
              <input
                type="text"
                placeholder="e.g. LUM-LIN-001"
                value={formData.sku}
                onChange={(e) => setFormData({ ...formData, sku: e.target.value })}
                className="w-full bg-[#F8F7F4] border border-[#E2DED6] rounded-md px-3 py-2 text-xs font-mono text-[#191919] focus:bg-white focus:border-[#191919] focus:outline-hidden"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-medium text-[#4A4742]">Category</label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full bg-[#F8F7F4] border border-[#E2DED6] rounded-md px-3 py-2 text-xs text-[#191919] focus:outline-hidden focus:border-[#191919]"
              >
                <option value="women">Women</option>
                <option value="men">Men</option>
                <option value="accessories">Accessories</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-medium text-[#4A4742]">Subcategory</label>
              <input
                type="text"
                placeholder="e.g. Outerwear, Silk Dresses, Leather Totes"
                value={formData.subcategory}
                onChange={(e) => setFormData({ ...formData, subcategory: e.target.value })}
                className="w-full bg-[#F8F7F4] border border-[#E2DED6] rounded-md px-3 py-2 text-xs text-[#191919] focus:bg-white focus:border-[#191919] focus:outline-hidden"
              />
            </div>

            <div className="sm:col-span-2 space-y-1">
              <label className="text-xs font-medium text-[#4A4742]">Description &amp; Provenance</label>
              <textarea
                rows={3}
                placeholder="Describe material origin, weave texture, craftsmanship details..."
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full bg-[#F8F7F4] border border-[#E2DED6] rounded-md p-3 text-xs text-[#191919] focus:bg-white focus:border-[#191919] focus:outline-hidden"
              />
            </div>
          </div>
        </div>

        {/* Section 2: Pricing */}
        <div className="bg-white border border-[#E8E6E1] p-6 rounded-lg shadow-[0_1px_2px_rgba(0,0,0,0.02)] space-y-4">
          <h2 className="font-serif-luxury text-lg text-[#191919] font-medium pb-2 border-b border-[#F0ECE4]">
            2. Pricing (INR ₹)
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-medium text-[#4A4742]">
                Retail Price (₹) <span className="text-[#DC2626]">*</span>
              </label>
              <input
                type="number"
                placeholder="2999"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                className="w-full bg-[#F8F7F4] border border-[#E2DED6] rounded-md px-3 py-2 text-xs font-mono text-[#191919] focus:bg-white focus:border-[#191919] focus:outline-hidden"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-medium text-[#4A4742]">Original / Strike Price (₹)</label>
              <input
                type="number"
                placeholder="3999"
                value={formData.originalPrice}
                onChange={(e) => setFormData({ ...formData, originalPrice: e.target.value })}
                className="w-full bg-[#F8F7F4] border border-[#E2DED6] rounded-md px-3 py-2 text-xs font-mono text-[#191919] focus:bg-white focus:border-[#191919] focus:outline-hidden"
              />
            </div>

            <div className="flex flex-col justify-end">
              <div className="p-2.5 bg-[#FAF9F5] border border-[#EAE6DD] rounded-md text-xs text-[#7A756D]">
                <span>Calculated Discount: </span>
                <span className="font-mono font-semibold text-[#191919]">
                  {formData.originalPrice && Number(formData.originalPrice) > Number(formData.price)
                    ? `${Math.round(
                        ((Number(formData.originalPrice) - Number(formData.price)) /
                          Number(formData.originalPrice)) *
                          100
                      )}% OFF`
                    : 'None'}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Section 3: Inventory */}
        <div className="bg-white border border-[#E8E6E1] p-6 rounded-lg shadow-[0_1px_2px_rgba(0,0,0,0.02)] space-y-4">
          <h2 className="font-serif-luxury text-lg text-[#191919] font-medium pb-2 border-b border-[#F0ECE4]">
            3. Inventory &amp; Stock Control
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-medium text-[#4A4742]">Stock Units in Warehouse</label>
              <input
                type="number"
                value={formData.stock}
                onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                className="w-full bg-[#F8F7F4] border border-[#E2DED6] rounded-md px-3 py-2 text-xs font-mono text-[#191919] focus:bg-white focus:border-[#191919] focus:outline-hidden"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-medium text-[#4A4742]">Low Stock Warning Threshold</label>
              <input
                type="number"
                value={formData.lowStockThreshold}
                onChange={(e) => setFormData({ ...formData, lowStockThreshold: e.target.value })}
                className="w-full bg-[#F8F7F4] border border-[#E2DED6] rounded-md px-3 py-2 text-xs font-mono text-[#191919] focus:bg-white focus:border-[#191919] focus:outline-hidden"
              />
            </div>
          </div>
        </div>

        {/* Section 4: Variants (Colors & Sizes) */}
        <div className="bg-white border border-[#E8E6E1] p-6 rounded-lg shadow-[0_1px_2px_rgba(0,0,0,0.02)] space-y-4">
          <h2 className="font-serif-luxury text-lg text-[#191919] font-medium pb-2 border-b border-[#F0ECE4]">
            4. Variants (Colors &amp; Sizes)
          </h2>

          {/* Sizes */}
          <div className="space-y-2">
            <label className="text-xs font-medium text-[#4A4742]">Available Sizes</label>
            <div className="flex flex-wrap gap-2">
              {['XS', 'S', 'M', 'L', 'XL', 'One Size'].map((sz) => {
                const isSelected = formData.sizes.includes(sz);
                return (
                  <button
                    key={sz}
                    type="button"
                    onClick={() => toggleSize(sz)}
                    className={`px-3 py-1.5 rounded-md text-xs font-mono transition-all ${
                      isSelected
                        ? 'bg-[#191919] text-white font-semibold'
                        : 'bg-[#F4F1EA] text-[#6E6961] hover:text-[#191919]'
                    }`}
                  >
                    {sz}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Colors */}
          <div className="space-y-2 pt-2 border-t border-[#F5F2EC]">
            <label className="text-xs font-medium text-[#4A4742]">Colorways &amp; Swatches</label>
            <div className="flex flex-wrap gap-2 mb-3">
              {formData.colors.map((c, idx) => (
                <div
                  key={c.name}
                  className="flex items-center gap-2 px-3 py-1 bg-[#F4F1EA] rounded-full text-xs text-[#191919] border border-[#E2DED6]"
                >
                  <span
                    className="w-3.5 h-3.5 rounded-full border border-black/20"
                    style={{ backgroundColor: c.hex }}
                  />
                  <span>{c.name}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveColor(idx)}
                    className="text-[#999] hover:text-[#DC2626]"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              ))}
            </div>

            {/* Add Color row */}
            <div className="flex items-center gap-2 max-w-sm">
              <input
                type="color"
                value={newColorHex}
                onChange={(e) => setNewColorHex(e.target.value)}
                className="w-8 h-8 rounded-md cursor-pointer border border-[#E2DED6] bg-transparent p-0.5"
              />
              <input
                type="text"
                placeholder="Color name (e.g. Sage, Bone)"
                value={newColorName}
                onChange={(e) => setNewColorName(e.target.value)}
                className="flex-1 bg-[#F8F7F4] border border-[#E2DED6] rounded-md px-3 py-1.5 text-xs text-[#191919] focus:outline-hidden"
              />
              <button
                type="button"
                onClick={handleAddColor}
                className="px-3 py-1.5 bg-[#191919] text-white rounded-md text-xs font-medium"
              >
                Add
              </button>
            </div>
          </div>
        </div>

        {/* Section 5: Simulated Image Upload UI */}
        <div className="bg-white border border-[#E8E6E1] p-6 rounded-lg shadow-[0_1px_2px_rgba(0,0,0,0.02)] space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-[#F0ECE4]">
            <h2 className="font-serif-luxury text-lg text-[#191919] font-medium">
              5. Product Imagery (Simulated Upload)
            </h2>
            <span className="text-[11px] font-mono text-[#8C7A6B]">
              {formData.images.length} images added
            </span>
          </div>

          {/* Drag & Drop Simulation Zone */}
          <div className="border-2 border-dashed border-[#DDD8CE] rounded-lg p-6 text-center hover:border-[#191919] transition-colors bg-[#FCFBF9]">
            <Upload className="w-8 h-8 mx-auto text-[#8C7A6B] mb-2" />
            <p className="text-xs font-medium text-[#191919]">
              Drag &amp; drop images here or select from atelier presets
            </p>
            <p className="text-[11px] text-[#8C857B] mt-1">
              Supports high-resolution PNG, JPG, WebP up to 10MB
            </p>

            {/* Presets Quick-Add */}
            <div className="mt-4 pt-3 border-t border-[#F0ECE4]">
              <span className="text-[10px] font-mono uppercase tracking-wider text-[#8C7A6B] block mb-2">
                Click any preset to add to product:
              </span>
              <div className="flex items-center justify-center gap-2 flex-wrap">
                {SAMPLE_IMAGE_PRESETS.map((preset, idx) => (
                  <button
                    key={preset}
                    type="button"
                    onClick={() => handleAddPresetImage(preset)}
                    className="relative group rounded-xs overflow-hidden border border-[#DDD8CE] hover:ring-2 hover:ring-[#191919]"
                  >
                    <img src={preset} alt="" className="w-12 h-12 object-cover" />
                    <span className="absolute inset-0 bg-black/40 text-white text-[9px] opacity-0 group-hover:opacity-100 flex items-center justify-center font-mono">
                      +Add
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Uploaded Thumbnails Preview */}
          {formData.images.length > 0 && (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
              {formData.images.map((imgUrl, idx) => (
                <div
                  key={imgUrl + idx}
                  className="relative group rounded-md overflow-hidden border border-[#E2DED6] bg-[#F4F1EA]"
                >
                  <img src={imgUrl} alt="" className="w-full h-32 object-cover" />
                  {idx === 0 && (
                    <span className="absolute top-2 left-2 bg-[#191919] text-white text-[9px] font-mono uppercase px-1.5 py-0.5 rounded-xs">
                      Cover
                    </span>
                  )}
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                    {idx !== 0 && (
                      <button
                        type="button"
                        onClick={() => handleSetCoverImage(idx)}
                        className="px-2 py-1 bg-white text-[#191919] text-[10px] rounded-xs font-medium"
                      >
                        Make Cover
                      </button>
                    )}
                    <button
                      type="button"
                      onClick={() => handleRemoveImage(idx)}
                      className="p-1 bg-[#DC2626] text-white rounded-xs"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Section 6: Product Settings & Visibility */}
        <div className="bg-white border border-[#E8E6E1] p-6 rounded-lg shadow-[0_1px_2px_rgba(0,0,0,0.02)] space-y-4">
          <h2 className="font-serif-luxury text-lg text-[#191919] font-medium pb-2 border-b border-[#F0ECE4]">
            6. Badges &amp; Catalog Placement
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <label className="flex items-center gap-3 p-3 bg-[#FAF9F5] border border-[#EAE6DD] rounded-md cursor-pointer">
              <input
                type="checkbox"
                checked={formData.isNew}
                onChange={(e) => setFormData({ ...formData, isNew: e.target.checked })}
                className="w-4 h-4 rounded-xs accent-[#191919]"
              />
              <div>
                <p className="text-xs font-medium text-[#191919]">New Capsule Arrival</p>
                <p className="text-[11px] text-[#7A756D]">Display &quot;NEW&quot; badge on storefront</p>
              </div>
            </label>

            <label className="flex items-center gap-3 p-3 bg-[#FAF9F5] border border-[#EAE6DD] rounded-md cursor-pointer">
              <input
                type="checkbox"
                checked={formData.isFeatured}
                onChange={(e) => setFormData({ ...formData, isFeatured: e.target.checked })}
                className="w-4 h-4 rounded-xs accent-[#191919]"
              />
              <div>
                <p className="text-xs font-medium text-[#191919]">Featured Piece</p>
                <p className="text-[11px] text-[#7A756D]">Spotlight in Curated Essentials homepage section</p>
              </div>
            </label>

            <label className="flex items-center gap-3 p-3 bg-[#FAF9F5] border border-[#EAE6DD] rounded-md cursor-pointer">
              <input
                type="checkbox"
                checked={formData.isBestSeller}
                onChange={(e) => setFormData({ ...formData, isBestSeller: e.target.checked })}
                className="w-4 h-4 rounded-xs accent-[#191919]"
              />
              <div>
                <p className="text-xs font-medium text-[#191919]">Best Seller</p>
                <p className="text-[11px] text-[#7A756D]">Mark with highest popularity rank</p>
              </div>
            </label>

            <label className="flex items-center gap-3 p-3 bg-[#FAF9F5] border border-[#EAE6DD] rounded-md cursor-pointer">
              <input
                type="checkbox"
                checked={formData.isActive}
                onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                className="w-4 h-4 rounded-xs accent-[#191919]"
              />
              <div>
                <p className="text-xs font-medium text-[#191919]">Active in Storefront</p>
                <p className="text-[11px] text-[#7A756D]">Visible to customers and available for checkout</p>
              </div>
            </label>
          </div>
        </div>

        {/* Bottom Save Bar */}
        <div className="flex items-center justify-between p-4 bg-white border border-[#E8E6E1] rounded-lg">
          <Link
            to="/admin/products"
            className="text-xs text-[#7A756D] hover:text-[#191919] font-medium"
          >
            Cancel and Discard
          </Link>
          <div className="flex items-center gap-3">
            <button
              onClick={() => handleSave(false)}
              className="px-4 py-2 bg-white hover:bg-[#F4F1EA] text-[#4A4742] border border-[#DDD8CE] text-xs font-medium rounded-md transition-colors"
            >
              Save Draft
            </button>
            <button
              onClick={() => handleSave(true)}
              className="px-5 py-2 bg-[#191919] hover:bg-black text-white text-xs font-semibold rounded-md transition-colors shadow-xs"
            >
              {isEditing ? 'Save Changes' : 'Publish Product'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
