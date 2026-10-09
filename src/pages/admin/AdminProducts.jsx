import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  Plus,
  Search,
  Filter,
  ArrowUpDown,
  MoreHorizontal,
  Edit,
  Eye,
  Trash2,
  Copy,
  Download,
  CheckSquare,
  Square,
  AlertCircle,
  CheckCircle2,
  XCircle,
  Package,
  Layers,
  ChevronLeft,
  ChevronRight,
  Sparkles
} from 'lucide-react';
import { useProducts } from '../../context/ProductContext.jsx';
import { useToast } from '../../context/ToastContext.jsx';
import { formatPrice } from '../../lib/utils.js';

export default function AdminProducts() {
  const { products, deleteProduct, addProduct, updateProduct } = useProducts();
  const { showToast } = useToast();

  // Search & Filters
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [stockFilter, setStockFilter] = useState('All');
  const [sortBy, setSortBy] = useState('Newest');

  // Multi-selection for bulk actions
  const [selectedIds, setSelectedIds] = useState([]);
  const [bulkModalAction, setBulkModalAction] = useState(null); // 'delete' | 'activate' | 'deactivate'

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  // Filter calculations
  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => {
        // Search by name, SKU, or category
        const matchesSearch =
          p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          (p.sku && p.sku.toLowerCase().includes(searchTerm.toLowerCase())) ||
          p.category.toLowerCase().includes(searchTerm.toLowerCase());

        // Category filter
        const matchesCategory =
          categoryFilter === 'All' || p.category.toLowerCase() === categoryFilter.toLowerCase();

        // Status filter
        const isOutOfStock = p.stock === 0;
        const matchesStatus =
          statusFilter === 'All' ||
          (statusFilter === 'Active' && !isOutOfStock) ||
          (statusFilter === 'Out of Stock' && isOutOfStock);

        // Stock filter
        const matchesStock =
          stockFilter === 'All' ||
          (stockFilter === 'Low Stock' && (p.stock || 0) <= 7 && (p.stock || 0) > 0) ||
          (stockFilter === 'Out of Stock' && (p.stock || 0) === 0) ||
          (stockFilter === 'In Stock' && (p.stock || 0) > 7);

        return matchesSearch && matchesCategory && matchesStatus && matchesStock;
      })
      .sort((a, b) => {
        if (sortBy === 'Newest') return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0);
        if (sortBy === 'Price low-high') return a.price - b.price;
        if (sortBy === 'Price high-low') return b.price - a.price;
        if (sortBy === 'Best selling') return (b.isBestSeller ? 1 : 0) - (a.isBestSeller ? 1 : 0);
        return 0;
      });
  }, [products, searchTerm, categoryFilter, statusFilter, stockFilter, sortBy]);

  // Derived stats
  const totalProductsCount = products.length;
  const activeCount = products.filter((p) => (p.stock || 0) > 0).length;
  const outOfStockCount = products.filter((p) => (p.stock || 0) === 0).length;
  const lowStockCount = products.filter((p) => (p.stock || 0) > 0 && (p.stock || 0) <= 7).length;

  // Pagination slicing
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage) || 1;
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Bulk selection toggles
  const handleSelectAll = () => {
    if (selectedIds.length === paginatedProducts.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(paginatedProducts.map((p) => p.id));
    }
  };

  const handleSelectOne = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleExecuteBulkAction = () => {
    if (!bulkModalAction) return;

    if (bulkModalAction === 'delete') {
      selectedIds.forEach((id) => deleteProduct(id));
      showToast(`Removed ${selectedIds.length} products`, 'info');
    } else if (bulkModalAction === 'activate') {
      selectedIds.forEach((id) => {
        updateProduct(id, { stock: 15 });
      });
      showToast(`Activated ${selectedIds.length} products`, 'success');
    } else if (bulkModalAction === 'deactivate') {
      selectedIds.forEach((id) => {
        updateProduct(id, { stock: 0 });
      });
      showToast(`Deactivated ${selectedIds.length} products`, 'info');
    }

    setSelectedIds([]);
    setBulkModalAction(null);
  };

  const handleDuplicate = (product) => {
    const duplicated = {
      ...product,
      name: `${product.name} (Copy)`,
      slug: `${product.slug}-copy-${Date.now().toString().slice(-4)}`,
      sku: `LUM-${Math.floor(1000 + Math.random() * 9000)}`
    };
    addProduct(duplicated);
    showToast(`Duplicated "${product.name}"`, 'success');
  };

  const handleExportCSV = () => {
    const headers = ['ID', 'Name', 'SKU', 'Category', 'Price', 'Stock', 'Status'];
    const rows = filteredProducts.map((p) => [
      p.id,
      `"${p.name.replace(/"/g, '""')}"`,
      p.sku || '',
      p.category,
      p.price,
      p.stock !== undefined ? p.stock : 15,
      p.stock === 0 ? 'Out of Stock' : 'Active'
    ]);
    const csvContent =
      'data:text/csv;charset=utf-8,' +
      [headers.join(','), ...rows.map((e) => e.join(','))]
        .join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', 'fillkart_catalog_export.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast('Catalog exported to CSV successfully', 'success');
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* 1. Header & Quick Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-[#E6E6EA]">
        <div>
          <span className="text-[10px] uppercase font-mono tracking-[0.22em] text-[#9A7B4F] font-semibold">
            CATALOG MANAGEMENT
          </span>
          <h1 className="font-serif-luxury text-3xl sm:text-4xl text-neutral-900 font-light tracking-tight">
            Products
          </h1>
          <p className="text-xs text-neutral-500 mt-0.5">
            Manage your atelier inventory, pricing, variants, and release schedules.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={handleExportCSV}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-white hover:bg-neutral-50 text-neutral-900 border border-neutral-300 text-xs font-medium rounded-md transition-colors shadow-2xs cursor-pointer"
          >
            <Download className="w-3.5 h-3.5 text-neutral-500" />
            <span>Export CSV</span>
          </button>
          <Link
            to="/admin/products/new"
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-neutral-900 hover:bg-black text-white text-xs font-semibold rounded-md transition-colors shadow-xs cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>+ Add Product</span>
          </Link>
        </div>
      </div>

      {/* 2. Stats Summary Strip */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="bg-white border border-[#E6E6EA] p-4 rounded-md shadow-xs">
          <span className="text-[10px] uppercase font-mono tracking-wider text-neutral-400">Total Products</span>
          <p className="font-mono text-2xl font-bold text-neutral-900 mt-1 tabular-nums">{totalProductsCount}</p>
        </div>
        <div className="bg-white border border-[#E6E6EA] p-4 rounded-md shadow-xs">
          <span className="text-[10px] uppercase font-mono tracking-wider text-emerald-700">Active Catalog</span>
          <p className="font-mono text-2xl font-bold text-emerald-800 mt-1 tabular-nums">{activeCount}</p>
        </div>
        <div className="bg-white border border-[#E6E6EA] p-4 rounded-md shadow-xs">
          <span className="text-[10px] uppercase font-mono tracking-wider text-amber-700">Low Stock</span>
          <p className="font-mono text-2xl font-bold text-amber-800 mt-1 tabular-nums">{lowStockCount}</p>
        </div>
        <div className="bg-white border border-[#E6E6EA] p-4 rounded-md shadow-xs">
          <span className="text-[10px] uppercase font-mono tracking-wider text-rose-700">Out of Stock</span>
          <p className="font-mono text-2xl font-bold text-rose-800 mt-1 tabular-nums">{outOfStockCount}</p>
        </div>
      </div>

      {/* 3. Search & Filter Bar */}
      <div className="bg-white border border-[#E6E6EA] p-4 rounded-md shadow-xs space-y-3">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          {/* Search Input */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              placeholder="Search by product title, SKU, or category..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full bg-neutral-50 border border-[#E2E2E8] rounded-md pl-9 pr-3 py-2 text-xs text-neutral-900 placeholder-neutral-400 focus:bg-white focus:outline-hidden transition-all"
            />
          </div>

          {/* Filter Dropdowns */}
          <div className="flex flex-wrap items-center gap-2">
            {/* Category */}
            <select
              value={categoryFilter}
              onChange={(e) => {
                setCategoryFilter(e.target.value);
                setCurrentPage(1);
              }}
              className="bg-neutral-50 border border-[#E2E2E8] rounded-md px-2.5 py-2 text-xs text-neutral-700 focus:outline-hidden"
            >
              <option value="All">All Categories</option>
              <option value="women">Women</option>
              <option value="men">Men</option>
              <option value="accessories">Accessories</option>
            </select>

            {/* Status */}
            <select
              value={statusFilter}
              onChange={(e) => {
                setStatusFilter(e.target.value);
                setCurrentPage(1);
              }}
              className="bg-neutral-50 border border-[#E2E2E8] rounded-md px-2.5 py-2 text-xs text-neutral-700 focus:outline-hidden"
            >
              <option value="All">All Statuses</option>
              <option value="Active">Active</option>
              <option value="Out of Stock">Out of Stock</option>
            </select>

            {/* Stock Level */}
            <select
              value={stockFilter}
              onChange={(e) => {
                setStockFilter(e.target.value);
                setCurrentPage(1);
              }}
              className="bg-neutral-50 border border-[#E2E2E8] rounded-md px-2.5 py-2 text-xs text-neutral-700 focus:outline-hidden"
            >
              <option value="All">All Stock Levels</option>
              <option value="In Stock">In Stock (&gt;7)</option>
              <option value="Low Stock">Low Stock (≤7)</option>
              <option value="Out of Stock">Out of Stock (0)</option>
            </select>

            {/* Sort */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-neutral-50 border border-[#E2E2E8] rounded-md px-2.5 py-2 text-xs text-neutral-700 focus:outline-hidden"
            >
              <option value="Newest">Sort: Newest</option>
              <option value="Price low-high">Price: Low to High</option>
              <option value="Price high-low">Price: High to Low</option>
              <option value="Best selling">Best Selling</option>
            </select>
          </div>
        </div>

        {/* Bulk Action Bar (When selected) */}
        {selectedIds.length > 0 && (
          <div className="flex items-center justify-between bg-neutral-900 text-white px-4 py-2 rounded-md text-xs">
            <span className="font-mono">
              {selectedIds.length} {selectedIds.length === 1 ? 'product' : 'products'} selected
            </span>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setBulkModalAction('activate')}
                className="px-2.5 py-1 bg-neutral-800 hover:bg-neutral-700 rounded-xs transition-colors cursor-pointer"
              >
                Activate
              </button>
              <button
                onClick={() => setBulkModalAction('deactivate')}
                className="px-2.5 py-1 bg-neutral-800 hover:bg-neutral-700 rounded-xs transition-colors cursor-pointer"
              >
                Deactivate
              </button>
              <button
                onClick={() => setBulkModalAction('delete')}
                className="px-2.5 py-1 bg-rose-600 hover:bg-rose-700 rounded-xs text-white transition-colors cursor-pointer"
              >
                Delete Selected
              </button>
              <button
                onClick={() => setSelectedIds([])}
                className="text-neutral-400 hover:text-white ml-2 cursor-pointer"
              >
                Clear
              </button>
            </div>
          </div>
        )}
      </div>

      {/* 4. Products Table */}
      <div className="bg-white border border-[#E6E6EA] rounded-md shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-[#E6E6EA] bg-[#FBFBFC] text-neutral-500 font-mono uppercase text-[10px] tracking-wider">
                <th className="py-3 px-3 w-8">
                  <button
                    onClick={handleSelectAll}
                    className="text-neutral-400 hover:text-black cursor-pointer"
                  >
                    {selectedIds.length > 0 && selectedIds.length === paginatedProducts.length ? (
                      <CheckSquare className="w-4 h-4 text-black" />
                    ) : (
                      <Square className="w-4 h-4" />
                    )}
                  </button>
                </th>
                <th className="py-3 px-3">Product</th>
                <th className="py-3 px-3">Category</th>
                <th className="py-3 px-3">Price</th>
                <th className="py-3 px-3">Stock</th>
                <th className="py-3 px-3">Status</th>
                <th className="py-3 px-3">Rating</th>
                <th className="py-3 px-3">SKU</th>
                <th className="py-3 px-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100">
              {paginatedProducts.length === 0 ? (
                <tr>
                  <td colSpan={9} className="py-12 text-center text-neutral-500">
                    <Package className="w-8 h-8 mx-auto text-neutral-300 mb-2" />
                    <p className="font-medium text-neutral-900">No products found</p>
                    <p className="text-[11px] text-neutral-400 mt-0.5">
                      Try clearing search terms or filter criteria.
                    </p>
                  </td>
                </tr>
              ) : (
                paginatedProducts.map((p) => {
                  const isSelected = selectedIds.includes(p.id);
                  const isLow = (p.stock || 0) <= 7 && (p.stock || 0) > 0;
                  const isOut = (p.stock || 0) === 0;

                  return (
                    <tr
                      key={p.id}
                      className={`hover:bg-neutral-50 transition-colors ${
                        isSelected ? 'bg-neutral-50/70' : ''
                      }`}
                    >
                      {/* Checkbox */}
                      <td className="py-3.5 px-3">
                        <button
                          onClick={() => handleSelectOne(p.id)}
                          className="text-neutral-400 hover:text-black cursor-pointer"
                        >
                          {isSelected ? (
                            <CheckSquare className="w-4 h-4 text-black" />
                          ) : (
                            <Square className="w-4 h-4" />
                          )}
                        </button>
                      </td>

                      {/* Image & Product Name */}
                      <td className="py-3.5 px-3">
                        <div className="flex items-center gap-3">
                          <img
                            src={p.images?.[0] || 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=100&q=80'}
                            alt={p.name}
                            className="w-10 h-10 rounded-xs object-cover border border-neutral-200 shrink-0"
                          />
                          <div className="min-w-0">
                            <Link
                              to={`/admin/products/${p.id}`}
                              className="font-medium text-neutral-900 hover:underline line-clamp-1"
                            >
                              {p.name}
                            </Link>
                            <span className="text-[10px] text-neutral-400 font-mono">
                              /{p.slug}
                            </span>
                          </div>
                        </div>
                      </td>

                      {/* Category */}
                      <td className="py-3.5 px-3 text-neutral-600 capitalize">
                        {p.category}
                      </td>

                      {/* Price */}
                      <td className="py-3.5 px-3 font-mono font-medium text-neutral-900 tabular-nums">
                        {formatPrice(p.price)}
                      </td>

                      {/* Stock */}
                      <td className="py-3.5 px-3">
                        <span
                          className={`font-mono tabular-nums font-semibold ${
                            isOut
                              ? 'text-rose-600'
                              : isLow
                              ? 'text-amber-600'
                              : 'text-neutral-900'
                          }`}
                        >
                          {p.stock !== undefined ? p.stock : 15}
                        </span>
                      </td>

                      {/* Status */}
                      <td className="py-3.5 px-3">
                        {isOut ? (
                          <span className="inline-block px-2 py-0.5 text-[10px] font-mono uppercase bg-rose-50 text-rose-800 border border-rose-200/80 rounded-xs">
                            Out of Stock
                          </span>
                        ) : isLow ? (
                          <span className="inline-block px-2 py-0.5 text-[10px] font-mono uppercase bg-amber-50 text-amber-800 border border-amber-200/80 rounded-xs">
                            Low Stock
                          </span>
                        ) : (
                          <span className="inline-block px-2 py-0.5 text-[10px] font-mono uppercase bg-emerald-50 text-emerald-800 border border-emerald-200/80 rounded-xs">
                            Active
                          </span>
                        )}
                      </td>

                      {/* Rating */}
                      <td className="py-3.5 px-3 font-mono text-neutral-600">
                        ★ {p.rating || 5.0}
                      </td>

                      {/* SKU */}
                      <td className="py-3.5 px-3 font-mono text-neutral-400">
                        {p.sku || `LUM-${p.id.slice(-4).toUpperCase()}`}
                      </td>

                      {/* Actions */}
                      <td className="py-3.5 px-3 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <Link
                            to={`/admin/products/${p.id}`}
                            title="View details"
                            className="p-1.5 text-neutral-500 hover:text-black hover:bg-neutral-100 rounded-xs transition-colors"
                          >
                            <Eye className="w-3.5 h-3.5" />
                          </Link>
                          <Link
                            to={`/admin/products/${p.id}/edit`}
                            title="Edit piece"
                            className="p-1.5 text-neutral-500 hover:text-black hover:bg-neutral-100 rounded-xs transition-colors"
                          >
                            <Edit className="w-3.5 h-3.5" />
                          </Link>
                          <button
                            onClick={() => handleDuplicate(p)}
                            title="Duplicate"
                            className="p-1.5 text-neutral-500 hover:text-black hover:bg-neutral-100 rounded-xs transition-colors cursor-pointer"
                          >
                            <Copy className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => deleteProduct(p.id)}
                            title="Delete"
                            className="p-1.5 text-rose-600 hover:bg-rose-50 rounded-xs transition-colors cursor-pointer"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* 5. Pagination Toolbar */}
        <div className="p-4 border-t border-[#E6E6EA] bg-[#FBFBFC] flex items-center justify-between text-xs text-neutral-500">
          <span>
            Showing{' '}
            <strong className="text-neutral-900">
              {filteredProducts.length > 0 ? (currentPage - 1) * itemsPerPage + 1 : 0}
            </strong>{' '}
            to{' '}
            <strong className="text-neutral-900">
              {Math.min(currentPage * itemsPerPage, filteredProducts.length)}
            </strong>{' '}
            of <strong className="text-neutral-900">{filteredProducts.length}</strong> items
          </span>

          <div className="flex items-center gap-1.5">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              className="p-1.5 rounded-md border border-neutral-300 bg-white disabled:opacity-40 hover:bg-neutral-100 text-neutral-900 transition-colors cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="font-mono text-xs px-2 font-medium text-neutral-900">
              {currentPage} / {totalPages}
            </span>
            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              className="p-1.5 rounded-md border border-neutral-300 bg-white disabled:opacity-40 hover:bg-neutral-100 text-neutral-900 transition-colors cursor-pointer"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Confirmation Modal for Bulk Actions */}
      {bulkModalAction && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <div className="bg-white max-w-md w-full p-6 rounded-md shadow-2xl border border-neutral-200 space-y-4">
            <h3 className="font-serif-luxury text-xl text-neutral-900 font-medium">
              Confirm Bulk Action
            </h3>
            <p className="text-xs text-neutral-600 leading-relaxed">
              Are you sure you want to perform &quot;<strong>{bulkModalAction}</strong>&quot; on{' '}
              <strong>{selectedIds.length}</strong> selected products? This action will take effect immediately across the storefront.
            </p>
            <div className="flex justify-end gap-2.5 pt-2">
              <button
                onClick={() => setBulkModalAction(null)}
                className="px-4 py-2 border border-neutral-300 rounded-md text-xs font-medium text-neutral-600 hover:bg-neutral-50 cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleExecuteBulkAction}
                className="px-4 py-2 bg-neutral-900 hover:bg-black text-white rounded-md text-xs font-semibold cursor-pointer"
              >
                Confirm &amp; Proceed
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
