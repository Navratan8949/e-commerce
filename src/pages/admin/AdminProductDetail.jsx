import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  Edit,
  Trash2,
  Package,
  Layers,
  DollarSign,
  TrendingUp,
  MessageSquare,
  CheckCircle2,
  AlertTriangle,
  ExternalLink,
  Plus,
  Minus,
  Sparkles
} from 'lucide-react';
import { useProducts } from '../../context/ProductContext.jsx';
import { useToast } from '../../context/ToastContext.jsx';
import { formatPrice } from '../../lib/utils.js';
import { mockReviews } from '../../data/reviews.js';

export default function AdminProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { products, updateStock, deleteProduct } = useProducts();
  const { showToast } = useToast();

  const product = products.find((p) => p.id === id);

  const [activeTab, setActiveTab] = useState('Overview');
  const [stockAdjustment, setStockAdjustment] = useState('');
  const [showRestockModal, setShowRestockModal] = useState(false);

  if (!product) {
    return (
      <div className="max-w-4xl mx-auto py-16 text-center space-y-4">
        <Package className="w-12 h-12 mx-auto text-[#C2BDAF]" />
        <h2 className="font-serif-luxury text-2xl text-[#191919]">Piece Not Found</h2>
        <p className="text-xs text-[#7A756D]">
          The product ID requested could not be located in the current catalog.
        </p>
        <Link
          to="/admin/products"
          className="inline-block px-4 py-2 bg-[#191919] text-white text-xs font-medium rounded-md"
        >
          Back to Catalog
        </Link>
      </div>
    );
  }

  const handleApplyStock = () => {
    const newCount = Number(stockAdjustment);
    if (!isNaN(newCount) && newCount >= 0) {
      updateStock(product.id, newCount);
      showToast(`Updated stock level to ${newCount} units`, 'success');
      setShowRestockModal(false);
      setStockAdjustment('');
    }
  };

  const handleDelete = () => {
    if (window.confirm(`Are you sure you want to delete ${product.name}?`)) {
      deleteProduct(product.id);
      showToast('Product removed from catalog', 'info');
      navigate('/admin/products');
    }
  };

  const isLow = (product.stock || 0) <= 7 && (product.stock || 0) > 0;
  const isOut = (product.stock || 0) === 0;

  return (
    <div className="max-w-5xl mx-auto space-y-6 pb-12">
      {/* Top Breadcrumb & Action bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#E8E6E1]">
        <div>
          <Link
            to="/admin/products"
            className="inline-flex items-center gap-1.5 text-xs text-[#8C7A6B] hover:text-[#191919] font-medium mb-1.5 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Products</span>
          </Link>
          <div className="flex items-center gap-2">
            <h1 className="font-serif-luxury text-2xl sm:text-3xl text-[#191919] font-light">
              {product.name}
            </h1>
            <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-[#EFECE6] text-[#4A4742]">
              {product.sku || 'SKU-001'}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          <Link
            to={`/product/${product.slug}`}
            target="_blank"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white hover:bg-[#F4F1EA] text-[#191919] border border-[#DDD8CE] text-xs font-medium rounded-md transition-colors"
          >
            <span>View on Storefront</span>
            <ExternalLink className="w-3.5 h-3.5 text-[#8C7A6B]" />
          </Link>
          <Link
            to={`/admin/products/${product.id}/edit`}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#FAF9F5] hover:bg-[#F2EFE9] text-[#191919] border border-[#DDD8CE] text-xs font-medium rounded-md transition-colors"
          >
            <Edit className="w-3.5 h-3.5" />
            <span>Edit</span>
          </Link>
          <button
            onClick={handleDelete}
            className="p-2 text-[#DC2626] hover:bg-[#FEF2F2] rounded-md transition-colors"
            title="Delete product"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Quick Status Pill Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="bg-white border border-[#E8E6E1] p-3.5 rounded-lg shadow-xs">
          <span className="text-[10px] uppercase font-mono tracking-wider text-[#7A756D]">Retail Price</span>
          <p className="font-mono text-xl font-semibold text-[#191919] mt-0.5">
            {formatPrice(product.price)}
          </p>
        </div>
        <div className="bg-white border border-[#E8E6E1] p-3.5 rounded-lg shadow-xs">
          <span className="text-[10px] uppercase font-mono tracking-wider text-[#7A756D]">Stock Level</span>
          <p className="font-mono text-xl font-semibold text-[#191919] mt-0.5 flex items-center gap-2">
            <span>{product.stock !== undefined ? product.stock : 15} units</span>
            {isOut ? (
              <span className="text-[10px] font-mono text-[#DC2626] bg-[#FEF2F2] px-1.5 py-0.5 rounded-xs">
                Out of Stock
              </span>
            ) : isLow ? (
              <span className="text-[10px] font-mono text-[#D97706] bg-[#FFFBEB] px-1.5 py-0.5 rounded-xs">
                Low
              </span>
            ) : (
              <span className="text-[10px] font-mono text-[#3E8E41] bg-[#F0FDF4] px-1.5 py-0.5 rounded-xs">
                In Stock
              </span>
            )}
          </p>
        </div>
        <div className="bg-white border border-[#E8E6E1] p-3.5 rounded-lg shadow-xs">
          <span className="text-[10px] uppercase font-mono tracking-wider text-[#7A756D]">Units Sold</span>
          <p className="font-mono text-xl font-semibold text-[#191919] mt-0.5">
            {Math.floor(Math.random() * 80) + 40}
          </p>
        </div>
        <div className="bg-white border border-[#E8E6E1] p-3.5 rounded-lg shadow-xs">
          <span className="text-[10px] uppercase font-mono tracking-wider text-[#7A756D]">Patron Rating</span>
          <p className="font-mono text-xl font-semibold text-[#191919] mt-0.5">
            ★ {product.rating || 5.0} ({product.reviewCount || 12})
          </p>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="border-b border-[#E8E6E1] flex items-center gap-6 text-xs font-medium">
        {['Overview', 'Inventory', 'Sales', 'Reviews'].map((tab) => (
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

      {/* Tab 1: Overview */}
      {activeTab === 'Overview' && (
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Images Gallery */}
          <div className="md:col-span-5 space-y-3">
            <div className="border border-[#E2DED6] rounded-lg overflow-hidden bg-[#FAF9F5]">
              <img
                src={product.images?.[0] || 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=800&q=80'}
                alt={product.name}
                className="w-full h-80 object-cover"
              />
            </div>
            {product.images && product.images.length > 1 && (
              <div className="grid grid-cols-4 gap-2">
                {product.images.map((img, i) => (
                  <img
                    key={i}
                    src={img}
                    alt=""
                    className="w-full h-20 object-cover rounded-xs border border-[#E2DED6]"
                  />
                ))}
              </div>
            )}
          </div>

          {/* Details & Specs */}
          <div className="md:col-span-7 space-y-5">
            <div className="bg-white border border-[#E8E6E1] p-5 rounded-lg space-y-3">
              <h3 className="text-xs font-mono uppercase tracking-wider text-[#8C7A6B]">
                Product Description
              </h3>
              <p className="text-xs text-[#4A4742] leading-relaxed">
                {product.description || 'Artisanal piece tailored with natural monofilaments.'}
              </p>
            </div>

            <div className="bg-white border border-[#E8E6E1] p-5 rounded-lg space-y-3">
              <h3 className="text-xs font-mono uppercase tracking-wider text-[#8C7A6B]">
                Variants &amp; Options
              </h3>
              <div className="space-y-3 text-xs">
                <div>
                  <span className="text-[#7A756D] block mb-1">Available Colors:</span>
                  <div className="flex items-center gap-2">
                    {product.colors?.map((c) => (
                      <span
                        key={c.name}
                        className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-[#F4F1EA] rounded-full border border-[#E2DED6]"
                      >
                        <span
                          className="w-2.5 h-2.5 rounded-full"
                          style={{ backgroundColor: c.hex }}
                        />
                        <span className="font-mono text-[11px]">{c.name}</span>
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <span className="text-[#7A756D] block mb-1">Available Sizes:</span>
                  <div className="flex items-center gap-1.5">
                    {product.sizes?.map((sz) => (
                      <span
                        key={sz}
                        className="px-2 py-0.5 bg-[#FAF9F5] border border-[#DDD8CE] font-mono text-[11px] rounded-xs"
                      >
                        {sz}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white border border-[#E8E6E1] p-5 rounded-lg space-y-2">
              <h3 className="text-xs font-mono uppercase tracking-wider text-[#8C7A6B]">
                Craftsmanship Lineage
              </h3>
              <ul className="text-xs text-[#4A4742] space-y-1 list-disc list-inside">
                {product.details?.map((d, idx) => (
                  <li key={idx}>{d}</li>
                )) || <li>100% Certified organic monofilament weave</li>}
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Inventory */}
      {activeTab === 'Inventory' && (
        <div className="bg-white border border-[#E8E6E1] p-6 rounded-lg space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-[#F0ECE4]">
            <div>
              <h3 className="font-serif-luxury text-xl text-[#191919]">Warehouse Inventory Status</h3>
              <p className="text-xs text-[#7A756D]">
                Manage real-time reserves, available inventory, and reorder levels.
              </p>
            </div>
            <button
              onClick={() => {
                setStockAdjustment(String(product.stock || 15));
                setShowRestockModal(true);
              }}
              className="px-4 py-2 bg-[#191919] hover:bg-black text-white text-xs font-semibold rounded-md transition-colors"
            >
              Adjust Stock Level
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 bg-[#F8F7F4] rounded-md border border-[#EAE6DD]">
              <span className="text-xs text-[#7A756D]">Total On Hand</span>
              <p className="font-mono text-2xl font-semibold text-[#191919] mt-1">
                {product.stock !== undefined ? product.stock : 15}
              </p>
            </div>
            <div className="p-4 bg-[#F8F7F4] rounded-md border border-[#EAE6DD]">
              <span className="text-xs text-[#7A756D]">Reserved for Open Orders</span>
              <p className="font-mono text-2xl font-semibold text-[#191919] mt-1">2</p>
            </div>
            <div className="p-4 bg-[#F8F7F4] rounded-md border border-[#EAE6DD]">
              <span className="text-xs text-[#7A756D]">Available to Sell</span>
              <p className="font-mono text-2xl font-semibold text-[#3E8E41] mt-1">
                {Math.max(0, (product.stock || 15) - 2)}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Sales */}
      {activeTab === 'Sales' && (
        <div className="bg-white border border-[#E8E6E1] p-6 rounded-lg space-y-4">
          <h3 className="font-serif-luxury text-xl text-[#191919]">Piece Performance &amp; Orders</h3>
          <p className="text-xs text-[#7A756D]">
            Order fulfillment history for this individual SKU.
          </p>

          <div className="overflow-x-auto pt-2">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-[#E8E6E1] text-[#7A756D] font-mono uppercase text-[10px]">
                  <th className="py-2.5 px-3">Order ID</th>
                  <th className="py-2.5 px-3">Patron</th>
                  <th className="py-2.5 px-3">Qty</th>
                  <th className="py-2.5 px-3">Amount</th>
                  <th className="py-2.5 px-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#F2EFE9]">
                <tr>
                  <td className="py-3 px-3 font-mono font-medium text-[#191919]">#LUM-10231</td>
                  <td className="py-3 px-3 text-[#191919]">Rahul Sharma</td>
                  <td className="py-3 px-3 font-mono">1</td>
                  <td className="py-3 px-3 font-mono">{formatPrice(product.price)}</td>
                  <td className="py-3 px-3">
                    <span className="px-2 py-0.5 text-[10px] font-mono bg-[#F0FDF4] text-[#166534] rounded-xs">
                      Delivered
                    </span>
                  </td>
                </tr>
                <tr>
                  <td className="py-3 px-3 font-mono font-medium text-[#191919]">#LUM-94812</td>
                  <td className="py-3 px-3 text-[#191919]">Eleanor Vance</td>
                  <td className="py-3 px-3 font-mono">2</td>
                  <td className="py-3 px-3 font-mono">{formatPrice(product.price * 2)}</td>
                  <td className="py-3 px-3">
                    <span className="px-2 py-0.5 text-[10px] font-mono bg-[#EFF6FF] text-[#1E40AF] rounded-xs">
                      Shipped
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 4: Reviews */}
      {activeTab === 'Reviews' && (
        <div className="bg-white border border-[#E8E6E1] p-6 rounded-lg space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-[#F0ECE4]">
            <h3 className="font-serif-luxury text-xl text-[#191919]">Clientele Testimonials</h3>
            <span className="text-xs font-mono text-[#8C7A6B]">
              Average: ★ {product.rating || 5.0} / 5.0
            </span>
          </div>

          <div className="space-y-3">
            {mockReviews.slice(0, 3).map((rev) => (
              <div key={rev.id} className="p-4 bg-[#FAF9F5] border border-[#EAE6DD] rounded-md space-y-1.5 text-xs">
                <div className="flex items-center justify-between">
                  <span className="font-medium text-[#191919]">{rev.userName} ({rev.city})</span>
                  <span className="font-mono text-[11px] text-[#D97706]">{'★'.repeat(rev.rating)}</span>
                </div>
                <p className="font-semibold text-[#191919]">{rev.title}</p>
                <p className="text-[#6E6961] leading-relaxed">{rev.comment}</p>
                <div className="flex items-center justify-between pt-1 text-[10px] text-[#999] font-mono">
                  <span>Verified Purchase · {rev.date}</span>
                  <span className="text-[#3E8E41]">Approved</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Restock Modal */}
      {showRestockModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs">
          <div className="bg-white max-w-sm w-full p-6 rounded-lg shadow-2xl border border-[#E8E6E1] space-y-4">
            <h3 className="font-serif-luxury text-lg text-[#191919]">
              Adjust Stock: {product.name}
            </h3>
            <div className="space-y-1 text-xs">
              <label className="text-[#6E6961]">Enter new units count:</label>
              <input
                type="number"
                value={stockAdjustment}
                onChange={(e) => setStockAdjustment(e.target.value)}
                className="w-full bg-[#F8F7F4] border border-[#E2DED6] rounded-md p-2 font-mono text-[#191919]"
                autoFocus
              />
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setShowRestockModal(false)}
                className="px-3.5 py-1.5 border border-[#DDD8CE] rounded-md text-xs text-[#4A4742]"
              >
                Cancel
              </button>
              <button
                onClick={handleApplyStock}
                className="px-4 py-1.5 bg-[#191919] text-white rounded-md text-xs font-semibold"
              >
                Save Stock
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
