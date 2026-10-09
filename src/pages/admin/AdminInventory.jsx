import React, { useState } from 'react';
import {
  Boxes,
  Search,
  Filter,
  Plus,
  Minus,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  RefreshCw,
  TrendingDown,
  Layers,
  Sparkles
} from 'lucide-react';
import { useProducts } from '../../context/ProductContext.jsx';
import { useToast } from '../../context/ToastContext.jsx';
import { formatPrice } from '../../lib/utils.js';

export default function AdminInventory() {
  const { products, updateStock } = useProducts();
  const { showToast } = useToast();

  const [searchTerm, setSearchTerm] = useState('');
  const [stockFilter, setStockFilter] = useState('All');

  // Interactive inline editing
  const [editingStockId, setEditingStockId] = useState(null);
  const [tempStockValue, setTempStockValue] = useState('');

  // Total metrics
  const totalStockUnits = products.reduce((sum, p) => sum + (p.stock || 0), 0);
  const lowStockItems = products.filter((p) => (p.stock || 0) <= 7 && (p.stock || 0) > 0);
  const outOfStockItems = products.filter((p) => (p.stock || 0) === 0);
  const totalInventoryValue = products.reduce((sum, p) => sum + p.price * (p.stock || 0), 0);

  // Filtered list
  const filteredProducts = products.filter((p) => {
    const matchesSearch =
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (p.sku && p.sku.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesStock =
      stockFilter === 'All' ||
      (stockFilter === 'In Stock' && (p.stock || 0) > 7) ||
      (stockFilter === 'Low Stock' && (p.stock || 0) <= 7 && (p.stock || 0) > 0) ||
      (stockFilter === 'Out of Stock' && (p.stock || 0) === 0);

    return matchesSearch && matchesStock;
  });

  const handleQuickAdjust = (id, delta) => {
    const prod = products.find((p) => p.id === id);
    if (!prod) return;
    const current = prod.stock !== undefined ? prod.stock : 15;
    const nextVal = Math.max(0, current + delta);
    updateStock(id, nextVal);
    showToast(`Stock updated to ${nextVal} units`, 'success');
  };

  const handleStartEdit = (p) => {
    setEditingStockId(p.id);
    setTempStockValue(String(p.stock !== undefined ? p.stock : 15));
  };

  const handleSaveEdit = (id) => {
    const nextVal = Math.max(0, Number(tempStockValue) || 0);
    updateStock(id, nextVal);
    setEditingStockId(null);
    showToast(`Inventory updated to ${nextVal} units`, 'success');
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-[#E6E6EA]">
        <div>
          <span className="text-[10px] uppercase font-mono tracking-[0.22em] text-[#9A7B4F] font-semibold">
            WAREHOUSE &amp; LOGISTICS
          </span>
          <h1 className="font-serif-luxury text-3xl sm:text-4xl text-neutral-900 font-light tracking-tight">
            Inventory Control
          </h1>
          <p className="text-xs text-neutral-500 mt-0.5">
            Monitor real-time warehouse counts, allocated reserves, and stock replenishment thresholds.
          </p>
        </div>
      </div>

      {/* 4 Stats Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="bg-white border border-[#E6E6EA] p-4 rounded-md shadow-xs">
          <span className="text-[10px] uppercase font-mono tracking-wider text-neutral-400">
            Total Stock
          </span>
          <p className="font-mono text-2xl font-bold text-neutral-900 mt-1 tabular-nums">
            {totalStockUnits} <span className="text-xs font-sans text-neutral-400 font-normal">units</span>
          </p>
        </div>

        <div className="bg-white border border-[#E6E6EA] p-4 rounded-md shadow-xs">
          <span className="text-[10px] uppercase font-mono tracking-wider text-amber-700">
            Low Stock Alert
          </span>
          <p className="font-mono text-2xl font-bold text-amber-800 mt-1 tabular-nums">
            {lowStockItems.length} <span className="text-xs font-sans text-neutral-400 font-normal">items</span>
          </p>
        </div>

        <div className="bg-white border border-[#E6E6EA] p-4 rounded-md shadow-xs">
          <span className="text-[10px] uppercase font-mono tracking-wider text-rose-700">
            Out of Stock
          </span>
          <p className="font-mono text-2xl font-bold text-rose-800 mt-1 tabular-nums">
            {outOfStockItems.length} <span className="text-xs font-sans text-neutral-400 font-normal">items</span>
          </p>
        </div>

        <div className="bg-white border border-[#E6E6EA] p-4 rounded-md shadow-xs">
          <span className="text-[10px] uppercase font-mono tracking-wider text-neutral-400">
            Inventory Value
          </span>
          <p className="font-mono text-2xl font-bold text-neutral-900 mt-1 tabular-nums">
            {formatPrice(totalInventoryValue)}
          </p>
        </div>
      </div>

      {/* Search & Filter */}
      <div className="bg-white border border-[#E6E6EA] p-4 rounded-md shadow-xs flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by product name or SKU..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-neutral-50 border border-[#E2E2E8] rounded-md pl-9 pr-3 py-2 text-xs text-neutral-900 focus:bg-white focus:outline-hidden"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <select
            value={stockFilter}
            onChange={(e) => setStockFilter(e.target.value)}
            className="bg-neutral-50 border border-[#E2E2E8] rounded-md px-3 py-2 text-xs text-neutral-700 focus:outline-hidden"
          >
            <option value="All">All Stock Levels</option>
            <option value="In Stock">In Stock (&gt;7)</option>
            <option value="Low Stock">Low Stock (≤7)</option>
            <option value="Out of Stock">Out of Stock (0)</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white border border-[#E6E6EA] rounded-md shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-[#E6E6EA] bg-[#FBFBFC] text-neutral-500 font-mono uppercase text-[10px] tracking-wider">
                <th className="py-3 px-4">Product</th>
                <th className="py-3 px-4">SKU</th>
                <th className="py-3 px-4">Total Stock</th>
                <th className="py-3 px-4">Reserved</th>
                <th className="py-3 px-4">Available</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Last Updated</th>
                <th className="py-3 px-4 text-right">Quick Adjust</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100">
              {filteredProducts.map((p) => {
                const stock = p.stock !== undefined ? p.stock : 15;
                const reserved = Math.min(stock, Math.floor(stock * 0.15));
                const available = Math.max(0, stock - reserved);
                const isOut = stock === 0;
                const isLow = stock <= 7 && stock > 0;

                return (
                  <tr key={p.id} className="hover:bg-neutral-50 transition-colors">
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={p.images?.[0] || 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=100&q=80'}
                          alt={p.name}
                          className="w-10 h-10 rounded-xs object-cover border border-neutral-200 shrink-0"
                        />
                        <div>
                          <p className="font-medium text-neutral-900">{p.name}</p>
                          <p className="text-[11px] text-neutral-400 capitalize">{p.category}</p>
                        </div>
                      </div>
                    </td>

                    <td className="py-3.5 px-4 font-mono text-neutral-500">
                      {p.sku || `LUM-${p.id.slice(-4).toUpperCase()}`}
                    </td>

                    {/* Stock with inline edit */}
                    <td className="py-3.5 px-4 font-mono tabular-nums">
                      {editingStockId === p.id ? (
                        <div className="flex items-center gap-1.5">
                          <input
                            type="number"
                            value={tempStockValue}
                            onChange={(e) => setTempStockValue(e.target.value)}
                            className="w-16 p-1 border border-black rounded-xs font-mono text-xs bg-white text-black"
                            autoFocus
                          />
                          <button
                            onClick={() => handleSaveEdit(p.id)}
                            className="px-2 py-1 bg-black text-white text-[10px] rounded-xs font-semibold cursor-pointer"
                          >
                            Save
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => handleStartEdit(p)}
                          className="font-semibold text-neutral-900 hover:underline cursor-pointer"
                          title="Click to direct edit"
                        >
                          {stock} units
                        </button>
                      )}
                    </td>

                    <td className="py-3.5 px-4 font-mono text-neutral-400 tabular-nums">{reserved}</td>

                    <td className="py-3.5 px-4 font-mono font-medium text-neutral-900 tabular-nums">
                      {available}
                    </td>

                    <td className="py-3.5 px-4">
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
                          In Stock
                        </span>
                      )}
                    </td>

                    <td className="py-3.5 px-4 text-neutral-400 text-[11px]">Today</td>

                    {/* Quick Adjust Buttons */}
                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          onClick={() => handleQuickAdjust(p.id, -1)}
                          disabled={stock === 0}
                          className="w-7 h-7 rounded-md border border-neutral-300 bg-white hover:bg-neutral-100 text-neutral-700 disabled:opacity-30 flex items-center justify-center transition-colors cursor-pointer"
                          title="Decrease 1"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <button
                          onClick={() => handleQuickAdjust(p.id, 5)}
                          className="px-2 h-7 rounded-md border border-neutral-300 bg-white hover:bg-neutral-100 text-neutral-700 font-mono text-[10px] flex items-center justify-center transition-colors cursor-pointer"
                          title="Restock +5"
                        >
                          +5
                        </button>
                        <button
                          onClick={() => handleQuickAdjust(p.id, 1)}
                          className="w-7 h-7 rounded-md border border-neutral-300 bg-white hover:bg-neutral-100 text-neutral-700 flex items-center justify-center transition-colors cursor-pointer"
                          title="Increase 1"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
