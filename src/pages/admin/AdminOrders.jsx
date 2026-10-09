import React, { useState, useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import {
  ShoppingBag,
  Search,
  Filter,
  Eye,
  CheckCircle2,
  Clock,
  RefreshCw,
  Truck,
  XCircle,
  ChevronLeft,
  ChevronRight,
  Download
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext.jsx';
import { useToast } from '../../context/ToastContext.jsx';
import { formatPrice } from '../../lib/utils.js';

export default function AdminOrders() {
  const { orders, updateOrderStatus } = useAuth();
  const { showToast } = useToast();
  const [searchParams] = useSearchParams();

  // Active status query param if provided
  const initialFilter = searchParams.get('status') || 'All';

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState(initialFilter);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  // Status counts
  const totalOrders = orders.length;
  const pendingOrders = orders.filter((o) => o.status === 'Pending' || o.status === 'Order Placed').length;
  const processingOrders = orders.filter((o) => o.status === 'Processing').length;
  const shippedOrders = orders.filter((o) => o.status === 'Shipped').length;
  const deliveredOrders = orders.filter((o) => o.status === 'Delivered').length;
  const cancelledOrders = orders.filter((o) => o.status === 'Cancelled').length;

  const filteredOrders = useMemo(() => {
    return orders.filter((o) => {
      const matchesSearch =
        o.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (o.customer?.fullName && o.customer.fullName.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (o.customer?.email && o.customer.email.toLowerCase().includes(searchTerm.toLowerCase()));

      let matchesStatus = true;
      if (statusFilter !== 'All') {
        if (statusFilter === 'Pending') {
          matchesStatus = o.status === 'Pending' || o.status === 'Order Placed';
        } else {
          matchesStatus = o.status === statusFilter;
        }
      }

      return matchesSearch && matchesStatus;
    });
  }, [orders, searchTerm, statusFilter]);

  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage) || 1;
  const paginatedOrders = filteredOrders.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleStatusChange = (orderId, newStatus) => {
    updateOrderStatus(orderId, newStatus);
    showToast(`Order ${orderId} updated to "${newStatus}"`, 'success');
  };

  const getBadgeStyle = (status) => {
    switch (status) {
      case 'Pending':
      case 'Order Placed':
        return 'bg-amber-50 text-amber-800 border-amber-200/80';
      case 'Processing':
        return 'bg-blue-50 text-blue-800 border-blue-200/80';
      case 'Shipped':
        return 'bg-indigo-50 text-indigo-800 border-indigo-200/80';
      case 'Delivered':
        return 'bg-emerald-50 text-emerald-800 border-emerald-200/80';
      case 'Cancelled':
        return 'bg-rose-50 text-rose-800 border-rose-200/80';
      default:
        return 'bg-neutral-100 text-neutral-800 border-neutral-200';
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-[#E6E6EA]">
        <div>
          <span className="text-[10px] uppercase font-mono tracking-[0.22em] text-[#9A7B4F] font-semibold">
            CLIENTELE ORDERS
          </span>
          <h1 className="font-serif-luxury text-3xl sm:text-4xl text-neutral-900 font-light tracking-tight">
            Orders
          </h1>
          <p className="text-xs text-neutral-500 mt-0.5">
            Track atelier orders, carrier dispatching, delivery fulfillment, and patron history.
          </p>
        </div>
      </div>

      {/* 6 Stats Filter Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        <div
          onClick={() => { setStatusFilter('All'); setCurrentPage(1); }}
          className={`p-3.5 rounded-md border cursor-pointer transition-all ${
            statusFilter === 'All'
              ? 'bg-white border-neutral-900 ring-1 ring-neutral-900 shadow-xs'
              : 'bg-white border-[#E6E6EA] hover:border-neutral-300 shadow-2xs'
          }`}
        >
          <span className="text-[10px] uppercase font-mono tracking-wider text-neutral-400">Total Orders</span>
          <p className="font-mono text-xl font-bold text-neutral-900 mt-1 tabular-nums">{totalOrders}</p>
        </div>

        <div
          onClick={() => { setStatusFilter('Pending'); setCurrentPage(1); }}
          className={`p-3.5 rounded-md border cursor-pointer transition-all ${
            statusFilter === 'Pending'
              ? 'bg-white border-amber-600 ring-1 ring-amber-600 shadow-xs'
              : 'bg-white border-[#E6E6EA] hover:border-neutral-300 shadow-2xs'
          }`}
        >
          <span className="text-[10px] uppercase font-mono tracking-wider text-amber-700">Pending</span>
          <p className="font-mono text-xl font-bold text-amber-800 mt-1 tabular-nums">{pendingOrders}</p>
        </div>

        <div
          onClick={() => { setStatusFilter('Processing'); setCurrentPage(1); }}
          className={`p-3.5 rounded-md border cursor-pointer transition-all ${
            statusFilter === 'Processing'
              ? 'bg-white border-blue-600 ring-1 ring-blue-600 shadow-xs'
              : 'bg-white border-[#E6E6EA] hover:border-neutral-300 shadow-2xs'
          }`}
        >
          <span className="text-[10px] uppercase font-mono tracking-wider text-blue-700">Processing</span>
          <p className="font-mono text-xl font-bold text-blue-800 mt-1 tabular-nums">{processingOrders}</p>
        </div>

        <div
          onClick={() => { setStatusFilter('Shipped'); setCurrentPage(1); }}
          className={`p-3.5 rounded-md border cursor-pointer transition-all ${
            statusFilter === 'Shipped'
              ? 'bg-white border-indigo-600 ring-1 ring-indigo-600 shadow-xs'
              : 'bg-white border-[#E6E6EA] hover:border-neutral-300 shadow-2xs'
          }`}
        >
          <span className="text-[10px] uppercase font-mono tracking-wider text-indigo-700">Shipped</span>
          <p className="font-mono text-xl font-bold text-indigo-800 mt-1 tabular-nums">{shippedOrders}</p>
        </div>

        <div
          onClick={() => { setStatusFilter('Delivered'); setCurrentPage(1); }}
          className={`p-3.5 rounded-md border cursor-pointer transition-all ${
            statusFilter === 'Delivered'
              ? 'bg-white border-emerald-600 ring-1 ring-emerald-600 shadow-xs'
              : 'bg-white border-[#E6E6EA] hover:border-neutral-300 shadow-2xs'
          }`}
        >
          <span className="text-[10px] uppercase font-mono tracking-wider text-emerald-700">Delivered</span>
          <p className="font-mono text-xl font-bold text-emerald-800 mt-1 tabular-nums">{deliveredOrders}</p>
        </div>

        <div
          onClick={() => { setStatusFilter('Cancelled'); setCurrentPage(1); }}
          className={`p-3.5 rounded-md border cursor-pointer transition-all ${
            statusFilter === 'Cancelled'
              ? 'bg-white border-rose-600 ring-1 ring-rose-600 shadow-xs'
              : 'bg-white border-[#E6E6EA] hover:border-neutral-300 shadow-2xs'
          }`}
        >
          <span className="text-[10px] uppercase font-mono tracking-wider text-rose-700">Cancelled</span>
          <p className="font-mono text-xl font-bold text-rose-800 mt-1 tabular-nums">{cancelledOrders}</p>
        </div>
      </div>

      {/* Search & Status Filter bar */}
      <div className="bg-white border border-[#E6E6EA] p-4 rounded-md shadow-xs flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by order ID or patron name..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full bg-neutral-50 border border-[#E2E2E8] rounded-md pl-9 pr-3 py-2 text-xs text-neutral-900 focus:bg-white focus:outline-hidden"
          />
        </div>

        <div className="flex items-center gap-2">
          <select
            value={statusFilter}
            onChange={(e) => {
              setStatusFilter(e.target.value);
              setCurrentPage(1);
            }}
            className="bg-neutral-50 border border-[#E2E2E8] rounded-md px-3 py-2 text-xs text-neutral-700 focus:outline-hidden"
          >
            <option value="All">All Statuses</option>
            <option value="Pending">Pending / Placed</option>
            <option value="Processing">Processing</option>
            <option value="Shipped">Shipped</option>
            <option value="Delivered">Delivered</option>
            <option value="Cancelled">Cancelled</option>
          </select>
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white border border-[#E6E6EA] rounded-md shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-[#E6E6EA] bg-[#FBFBFC] text-neutral-500 font-mono uppercase text-[10px] tracking-wider">
                <th className="py-3 px-4">Order ID</th>
                <th className="py-3 px-4">Customer</th>
                <th className="py-3 px-4">Date</th>
                <th className="py-3 px-4">Items</th>
                <th className="py-3 px-4">Total</th>
                <th className="py-3 px-4">Payment</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100">
              {paginatedOrders.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-12 text-center text-neutral-500">
                    <ShoppingBag className="w-8 h-8 mx-auto text-neutral-300 mb-2" />
                    <p className="font-medium text-neutral-900">No orders found</p>
                    <p className="text-[11px] text-neutral-400 mt-0.5">
                      No matching records for the current filter.
                    </p>
                  </td>
                </tr>
              ) : (
                paginatedOrders.map((order) => {
                  const badgeClass = getBadgeStyle(order.status);
                  return (
                    <tr key={order.id} className="hover:bg-neutral-50 transition-colors">
                      <td className="py-3.5 px-4 font-mono font-medium text-neutral-900">
                        <Link to={`/admin/orders/${order.id}`} className="hover:underline">
                          {order.id}
                        </Link>
                      </td>

                      <td className="py-3.5 px-4">
                        <p className="font-medium text-neutral-900">
                          {order.customer?.fullName || 'Eleanor Vance'}
                        </p>
                        <p className="text-[11px] text-neutral-400">
                          {order.customer?.email || 'patron@lumera.studio'}
                        </p>
                      </td>

                      <td className="py-3.5 px-4 text-neutral-500 whitespace-nowrap">
                        {order.date}
                      </td>

                      <td className="py-3.5 px-4 text-neutral-600">
                        {order.items?.length || 1} items
                      </td>

                      <td className="py-3.5 px-4 font-mono font-medium text-neutral-900 tabular-nums">
                        {formatPrice(order.total)}
                      </td>

                      <td className="py-3.5 px-4">
                        <span className="text-[11px] font-mono text-neutral-600">
                          {order.paymentMethod || 'Paid (Card)'}
                        </span>
                      </td>

                      {/* Status Dropdown in row */}
                      <td className="py-3.5 px-4">
                        <select
                          value={order.status}
                          onChange={(e) => handleStatusChange(order.id, e.target.value)}
                          className={`text-[10.5px] font-mono uppercase px-2 py-1 rounded-xs border cursor-pointer focus:outline-hidden ${badgeClass}`}
                        >
                          <option value="Pending">Pending</option>
                          <option value="Order Placed">Order Placed</option>
                          <option value="Processing">Processing</option>
                          <option value="Shipped">Shipped</option>
                          <option value="Delivered">Delivered</option>
                          <option value="Cancelled">Cancelled</option>
                        </select>
                      </td>

                      <td className="py-3.5 px-4 text-right">
                        <Link
                          to={`/admin/orders/${order.id}`}
                          className="inline-flex items-center gap-1 text-[11px] font-medium text-neutral-600 hover:text-black"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          <span>View</span>
                        </Link>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="p-4 border-t border-[#E6E6EA] bg-[#FBFBFC] flex items-center justify-between text-xs text-neutral-500">
          <span>
            Page <strong className="text-neutral-900">{currentPage}</strong> of{' '}
            <strong className="text-neutral-900">{totalPages}</strong> ({filteredOrders.length} orders)
          </span>

          <div className="flex items-center gap-1.5">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              className="p-1.5 rounded-md border border-neutral-300 bg-white disabled:opacity-40 hover:bg-neutral-100 text-neutral-900 cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              className="p-1.5 rounded-md border border-neutral-300 bg-white disabled:opacity-40 hover:bg-neutral-100 text-neutral-900 cursor-pointer"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
