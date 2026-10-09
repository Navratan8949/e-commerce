import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Users,
  Search,
  Filter,
  Eye,
  Mail,
  Phone,
  Sparkles,
  ArrowRight,
  UserCheck,
  ShieldCheck,
  Calendar
} from 'lucide-react';
import { initialCustomers } from '../../data/adminMockData.js';
import { formatPrice } from '../../lib/utils.js';

export default function AdminCustomers() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  const filteredCustomers = initialCustomers.filter((c) => {
    const matchesSearch =
      c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.city.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === 'All' || c.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-[#E6E6EA]">
        <div>
          <span className="text-[10px] uppercase font-mono tracking-[0.22em] text-[#9A7B4F] font-semibold">
            CLIENTELE &amp; CRM DIRECTORY
          </span>
          <h1 className="font-serif-luxury text-3xl sm:text-4xl text-neutral-900 font-light tracking-tight">
            Customers
          </h1>
          <p className="text-xs text-neutral-500 mt-0.5">
            Manage patrons, lifetime order values, private styling notes, and VIP status tiers.
          </p>
        </div>
      </div>

      {/* 4 Stats Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="bg-white border border-[#E6E6EA] p-4 rounded-md shadow-xs">
          <span className="text-[10px] uppercase font-mono tracking-wider text-neutral-400">
            Total Customers
          </span>
          <p className="font-mono text-2xl font-bold text-neutral-900 mt-1 tabular-nums">
            8,642
          </p>
        </div>
        <div className="bg-white border border-[#E6E6EA] p-4 rounded-md shadow-xs">
          <span className="text-[10px] uppercase font-mono tracking-wider text-emerald-700">
            Active Patrons
          </span>
          <p className="font-mono text-2xl font-bold text-emerald-800 mt-1 tabular-nums">
            6,420
          </p>
        </div>
        <div className="bg-white border border-[#E6E6EA] p-4 rounded-md shadow-xs">
          <span className="text-[10px] uppercase font-mono tracking-wider text-[#9A7B4F]">
            VIP Salon Patrons
          </span>
          <p className="font-mono text-2xl font-bold text-[#9A7B4F] mt-1 tabular-nums">
            486
          </p>
        </div>
        <div className="bg-white border border-[#E6E6EA] p-4 rounded-md shadow-xs">
          <span className="text-[10px] uppercase font-mono tracking-wider text-blue-700">
            New this Month
          </span>
          <p className="font-mono text-2xl font-bold text-blue-800 mt-1 tabular-nums">
            +312
          </p>
        </div>
      </div>

      {/* Search & Filter Bar */}
      <div className="bg-white border border-[#E6E6EA] p-4 rounded-md shadow-xs flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by patron name, email, or city..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-neutral-50 border border-[#E2E2E8] rounded-md pl-9 pr-3 py-2 text-xs text-neutral-900 focus:bg-white focus:outline-hidden"
          />
        </div>

        <div className="flex items-center gap-2">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-neutral-50 border border-[#E2E2E8] rounded-md px-3 py-2 text-xs text-neutral-700 focus:outline-hidden"
          >
            <option value="All">All Tiers</option>
            <option value="VIP">VIP</option>
            <option value="Active">Active</option>
            <option value="New">New</option>
          </select>
        </div>
      </div>

      {/* Customers Table */}
      <div className="bg-white border border-[#E6E6EA] rounded-md shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-[#E6E6EA] bg-[#FBFBFC] text-neutral-500 font-mono uppercase text-[10px] tracking-wider">
                <th className="py-3 px-4">Customer</th>
                <th className="py-3 px-4">City</th>
                <th className="py-3 px-4">Orders</th>
                <th className="py-3 px-4">Total Spent</th>
                <th className="py-3 px-4">Last Order</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Joined</th>
                <th className="py-3 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100">
              {filteredCustomers.map((cust) => (
                <tr key={cust.id} className="hover:bg-neutral-50 transition-colors">
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={cust.avatar}
                        alt={cust.name}
                        className="w-9 h-9 rounded-full object-cover border border-neutral-200 shrink-0"
                      />
                      <div>
                        <Link
                          to={`/admin/customers/${cust.id}`}
                          className="font-medium text-neutral-900 hover:underline"
                        >
                          {cust.name}
                        </Link>
                        <p className="text-[11px] text-neutral-400">{cust.email}</p>
                      </div>
                    </div>
                  </td>

                  <td className="py-3.5 px-4 text-neutral-600">{cust.city}</td>

                  <td className="py-3.5 px-4 font-mono font-medium text-neutral-900 tabular-nums">
                    {cust.ordersCount}
                  </td>

                  <td className="py-3.5 px-4 font-mono font-medium text-neutral-900 tabular-nums">
                    {formatPrice(cust.totalSpent)}
                  </td>

                  <td className="py-3.5 px-4 text-neutral-500 whitespace-nowrap">
                    {cust.lastOrder}
                  </td>

                  <td className="py-3.5 px-4">
                    <span
                      className={`inline-block px-2 py-0.5 text-[10px] font-mono uppercase rounded-xs border ${
                        cust.status === 'VIP'
                          ? 'bg-[#C5A265]/10 text-[#9A7B4F] border-[#C5A265]/40 font-semibold'
                          : cust.status === 'Active'
                          ? 'bg-emerald-50 text-emerald-800 border-emerald-200/80'
                          : 'bg-neutral-100 text-neutral-700 border-neutral-200'
                      }`}
                    >
                      {cust.status}
                    </span>
                  </td>

                  <td className="py-3.5 px-4 text-neutral-500">{cust.joined}</td>

                  <td className="py-3.5 px-4 text-right">
                    <Link
                      to={`/admin/customers/${cust.id}`}
                      className="inline-flex items-center gap-1 text-[11px] font-medium text-neutral-600 hover:text-black"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Profile</span>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
