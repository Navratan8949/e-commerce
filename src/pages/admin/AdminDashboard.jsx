import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  TrendingUp,
  ShoppingBag,
  Users,
  Percent,
  Plus,
  Tag,
  Layers,
  ArrowRight,
  AlertTriangle,
  ChevronRight,
  Calendar,
  ArrowUpRight
} from 'lucide-react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line
} from 'recharts';
import { useAuth } from '../../context/AuthContext.jsx';
import { useProducts } from '../../context/ProductContext.jsx';
import { formatPrice } from '../../lib/utils.js';
import {
  analyticsData,
  initialCustomers
} from '../../data/adminMockData.js';

export default function AdminDashboard() {
  const { orders } = useAuth();
  const { products } = useProducts();

  // Time filter for main Revenue Overview chart
  const [activeTimeRange, setActiveTimeRange] = useState('7 Days');

  // Chart data source based on selection
  const revenueChartData = analyticsData.revenueOverview[activeTimeRange] || analyticsData.revenueOverview['7 Days'];

  // Curated category donut data with distinctive architectural colors
  const categoryData = [
    { name: 'Women', value: 46, amount: 590897, color: '#C5A265' },
    { name: 'Men', value: 28, amount: 359676, color: '#111319' },
    { name: 'Accessories', value: 16, amount: 205530, color: '#4B5565' },
    { name: 'New Arrivals', value: 10, amount: 128456, color: '#8E9AA8' }
  ];

  // Sparkline data for KPI cards
  const sparklineData = [
    { value: 65 }, { value: 72 }, { value: 68 }, { value: 85 },
    { value: 80 }, { value: 92 }, { value: 98 }
  ];

  // Quick low-stock products from live catalog or mock
  const lowStockItems = products
    .filter((p) => (p.stock !== undefined ? p.stock <= 7 : false))
    .slice(0, 3);

  const displayLowStock =
    lowStockItems.length > 0 ? lowStockItems : analyticsData.lowStockItems;

  // Custom luxury tooltip for Recharts
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-[#0B0C0E] text-white p-3 rounded-sm shadow-xl border border-neutral-800 text-xs font-sans">
          <p className="font-mono text-[10px] text-neutral-400 mb-1">{label}</p>
          <div className="space-y-1">
            <p className="font-medium flex items-center justify-between gap-4">
              <span className="text-neutral-400">Revenue:</span>
              <span className="font-mono font-semibold text-white">
                {formatPrice(payload[0]?.value)}
              </span>
            </p>
            {payload[1] && (
              <p className="font-medium flex items-center justify-between gap-4">
                <span className="text-neutral-400">Orders:</span>
                <span className="font-mono text-[#C5A265]">
                  {payload[1]?.value} units
                </span>
              </p>
            )}
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* 1. Dashboard Greeting Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#E6E6EA]">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] uppercase font-mono tracking-[0.22em] text-[#9A7B4F] font-semibold">
              EXECUTIVE ATELIER CONSOLE
            </span>
          </div>
          <h1 className="font-serif-luxury text-3xl sm:text-4xl text-neutral-900 font-light tracking-tight">
            Good morning, Admin
          </h1>
          <p className="text-xs sm:text-sm text-neutral-500 mt-0.5">
            Here&apos;s what&apos;s happening with your store today.
          </p>
        </div>

        {/* Date & Quick Action Group */}
        <div className="flex items-center gap-3">
          <div className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-white border border-[#E4E4E8] rounded-md text-xs text-neutral-600 shadow-2xs">
            <Calendar className="w-3.5 h-3.5 text-neutral-400" />
            <span className="font-mono text-[11px]">Today · Live Metrics</span>
          </div>
          <Link
            to="/admin/products/new"
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-neutral-900 hover:bg-black text-white text-xs font-medium rounded-md transition-colors shadow-xs"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Product</span>
          </Link>
        </div>
      </div>

      {/* 2. 4 KPI Statistics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Revenue */}
        <div className="bg-white border border-[#E6E6EA] p-5 rounded-md shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs uppercase font-mono tracking-wider text-neutral-500 font-medium">
              Total Revenue
            </span>
            <div className="w-8 h-8 rounded-md bg-neutral-50 flex items-center justify-center text-neutral-900 border border-neutral-200">
              <TrendingUp className="w-4 h-4 text-emerald-600" />
            </div>
          </div>
          <div>
            <div className="font-mono text-2xl sm:text-3xl font-bold text-neutral-900 tracking-tight tabular-nums">
              ₹12,84,560
            </div>
            <div className="flex items-center gap-1.5 mt-1.5 text-xs">
              <span className="font-mono font-semibold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded-xs">
                +18.6%
              </span>
              <span className="text-neutral-500 text-[11px]">vs last period</span>
            </div>
          </div>
          {/* Mini Sparkline Chart */}
          <div className="h-8 w-full pt-1">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={sparklineData}>
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="#10B981"
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Orders */}
        <div className="bg-white border border-[#E6E6EA] p-5 rounded-md shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs uppercase font-mono tracking-wider text-neutral-500 font-medium">
              Orders
            </span>
            <div className="w-8 h-8 rounded-md bg-neutral-50 flex items-center justify-center text-neutral-900 border border-neutral-200">
              <ShoppingBag className="w-4 h-4 text-neutral-800" />
            </div>
          </div>
          <div>
            <div className="font-mono text-2xl sm:text-3xl font-bold text-neutral-900 tracking-tight tabular-nums">
              1,284
            </div>
            <div className="flex items-center gap-1.5 mt-1.5 text-xs">
              <span className="font-mono font-semibold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded-xs">
                +12.4%
              </span>
              <span className="text-neutral-500 text-[11px]">vs last period</span>
            </div>
          </div>
          {/* Mini Sparkline Chart */}
          <div className="h-8 w-full pt-1">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={[{ value: 20 }, { value: 35 }, { value: 28 }, { value: 45 }, { value: 50 }, { value: 65 }]}>
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="#111319"
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Customers */}
        <div className="bg-white border border-[#E6E6EA] p-5 rounded-md shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs uppercase font-mono tracking-wider text-neutral-500 font-medium">
              Customers
            </span>
            <div className="w-8 h-8 rounded-md bg-neutral-50 flex items-center justify-center text-neutral-900 border border-neutral-200">
              <Users className="w-4 h-4 text-[#C5A265]" />
            </div>
          </div>
          <div>
            <div className="font-mono text-2xl sm:text-3xl font-bold text-neutral-900 tracking-tight tabular-nums">
              8,642
            </div>
            <div className="flex items-center gap-1.5 mt-1.5 text-xs">
              <span className="font-mono font-semibold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded-xs">
                +8.2%
              </span>
              <span className="text-neutral-500 text-[11px]">vs last period</span>
            </div>
          </div>
          {/* Mini Sparkline Chart */}
          <div className="h-8 w-full pt-1">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={[{ value: 40 }, { value: 42 }, { value: 48 }, { value: 54 }, { value: 62 }, { value: 70 }]}>
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="#C5A265"
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Conversion Rate */}
        <div className="bg-white border border-[#E6E6EA] p-5 rounded-md shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs uppercase font-mono tracking-wider text-neutral-500 font-medium">
              Conversion Rate
            </span>
            <div className="w-8 h-8 rounded-md bg-neutral-50 flex items-center justify-center text-neutral-900 border border-neutral-200">
              <Percent className="w-4 h-4 text-neutral-700" />
            </div>
          </div>
          <div>
            <div className="font-mono text-2xl sm:text-3xl font-bold text-neutral-900 tracking-tight tabular-nums">
              4.82%
            </div>
            <div className="flex items-center gap-1.5 mt-1.5 text-xs">
              <span className="font-mono font-semibold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded-xs">
                +1.4%
              </span>
              <span className="text-neutral-500 text-[11px]">vs last period</span>
            </div>
          </div>
          {/* Mini Sparkline Chart */}
          <div className="h-8 w-full pt-1">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={[{ value: 3.2 }, { value: 3.8 }, { value: 4.1 }, { value: 4.3 }, { value: 4.6 }, { value: 4.82 }]}>
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="#4B5565"
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* 3. Quick Actions Toolbar */}
      <div className="bg-white border border-[#E6E6EA] p-4 rounded-md flex flex-wrap items-center justify-between gap-3 shadow-xs">
        <span className="text-xs uppercase font-mono tracking-wider text-neutral-500 font-semibold">
          Quick Actions:
        </span>
        <div className="flex flex-wrap items-center gap-2.5">
          <Link
            to="/admin/products/new"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-neutral-50 hover:bg-neutral-100 text-neutral-900 border border-neutral-200 text-xs font-medium rounded-md transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Product</span>
          </Link>
          <Link
            to="/admin/coupons"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-neutral-50 hover:bg-neutral-100 text-neutral-900 border border-neutral-200 text-xs font-medium rounded-md transition-colors"
          >
            <Tag className="w-3.5 h-3.5 text-[#C5A265]" />
            <span>Create Coupon</span>
          </Link>
          <Link
            to="/admin/orders"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-neutral-50 hover:bg-neutral-100 text-neutral-900 border border-neutral-200 text-xs font-medium rounded-md transition-colors"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>View Orders</span>
          </Link>
          <Link
            to="/admin/collections"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-neutral-50 hover:bg-neutral-100 text-neutral-900 border border-neutral-200 text-xs font-medium rounded-md transition-colors"
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Add Collection</span>
          </Link>
        </div>
      </div>

      {/* 4. Large Charts Section: Revenue Overview & Sales by Category */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Sales Chart (8 Cols) */}
        <div className="lg:col-span-8 bg-white border border-[#E6E6EA] p-6 rounded-md shadow-xs space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-neutral-100">
            <div>
              <span className="text-[10px] uppercase font-mono tracking-widest text-[#9A7B4F] font-semibold block">
                ANALYTICS TRAJECTORY
              </span>
              <h2 className="font-serif-luxury text-xl sm:text-2xl text-neutral-900 font-normal mt-0.5">
                Revenue Overview
              </h2>
            </div>

            {/* Time Filter Tabs */}
            <div className="flex items-center bg-neutral-100 p-1 rounded-md border border-neutral-200 text-xs font-medium">
              {['7 Days', '30 Days', '3 Months', '6 Months', '1 Year'].map((filter) => (
                <button
                  key={filter}
                  onClick={() => setActiveTimeRange(filter)}
                  className={`px-2.5 py-1 rounded-xs transition-all cursor-pointer ${
                    activeTimeRange === filter
                      ? 'bg-white text-neutral-900 shadow-xs font-semibold'
                      : 'text-neutral-500 hover:text-neutral-900'
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>

          {/* Smooth Recharts Area Chart */}
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueChartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#C5A265" stopOpacity={0.25} />
                    <stop offset="95%" stopColor="#C5A265" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <XAxis
                  dataKey="date"
                  stroke="#8E9AA8"
                  fontSize={11}
                  tickLine={false}
                  axisLine={{ stroke: '#E6E6EA' }}
                />
                <YAxis
                  stroke="#8E9AA8"
                  fontSize={11}
                  tickLine={false}
                  axisLine={{ stroke: '#E6E6EA' }}
                  tickFormatter={(val) => `₹${(val / 1000).toFixed(0)}k`}
                />
                <Tooltip content={<CustomTooltip />} />
                <Area
                  type="monotone"
                  dataKey="revenue"
                  stroke="#C5A265"
                  strokeWidth={2.5}
                  fillOpacity={1}
                  fill="url(#revenueGradient)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          <div className="flex items-center justify-between text-xs text-neutral-500 pt-2 border-t border-neutral-100">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 bg-[#C5A265] rounded-xs" />
                <span>Gross Merchandise Value (GMV)</span>
              </span>
            </div>
            <Link
              to="/admin/analytics"
              className="text-[#9A7B4F] hover:text-neutral-900 font-medium flex items-center gap-1"
            >
              <span>Full Analytics</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* Sales by Category Donut Chart (4 Cols) */}
        <div className="lg:col-span-4 bg-white border border-[#E6E6EA] p-6 rounded-md shadow-xs space-y-6 flex flex-col justify-between">
          <div>
            <div className="pb-3 border-b border-neutral-100">
              <span className="text-[10px] uppercase font-mono tracking-widest text-[#9A7B4F] font-semibold block">
                DISTRIBUTION
              </span>
              <h2 className="font-serif-luxury text-xl text-neutral-900 font-normal mt-0.5">
                Sales by Category
              </h2>
            </div>

            {/* Recharts Donut Pie */}
            <div className="h-56 relative my-2">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    innerRadius={55}
                    outerRadius={80}
                    paddingAngle={4}
                    dataKey="value"
                  >
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} stroke="#FFF" strokeWidth={2} />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(val, name, props) => [`${val}% (${formatPrice(props.payload.amount)})`, name]}
                  />
                </PieChart>
              </ResponsiveContainer>
              {/* Center Label in Donut */}
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <span className="font-serif-luxury text-xl font-medium text-neutral-900">
                  100%
                </span>
                <span className="text-[10px] uppercase font-mono text-neutral-400">
                  Atelier
                </span>
              </div>
            </div>
          </div>

          {/* Category Legends */}
          <div className="space-y-2 border-t border-neutral-100 pt-4">
            {categoryData.map((cat) => (
              <div key={cat.name} className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <span
                    className="w-2.5 h-2.5 rounded-xs"
                    style={{ backgroundColor: cat.color }}
                  />
                  <span className="text-neutral-700 font-medium">{cat.name}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="font-mono text-neutral-400 tabular-nums">{formatPrice(cat.amount)}</span>
                  <span className="font-mono font-semibold text-neutral-900 tabular-nums">{cat.value}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 5. Recent Orders & Top Selling Products */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Recent Orders Table (8 Cols) */}
        <div className="lg:col-span-8 bg-white border border-[#E6E6EA] p-6 rounded-md shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-neutral-100">
            <div>
              <span className="text-[10px] uppercase font-mono tracking-widest text-[#9A7B4F] font-semibold block">
                LIVE FULFILLMENT
              </span>
              <h2 className="font-serif-luxury text-xl text-neutral-900 font-normal">
                Recent Orders
              </h2>
            </div>
            <Link
              to="/admin/orders"
              className="text-xs font-semibold text-neutral-900 hover:underline flex items-center gap-1"
            >
              <span>View All</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Orders Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-[#E6E6EA] text-neutral-500 font-mono uppercase text-[10px] tracking-wider">
                  <th className="py-2.5 px-3">Order</th>
                  <th className="py-2.5 px-3">Customer</th>
                  <th className="py-2.5 px-3">Date</th>
                  <th className="py-2.5 px-3">Items</th>
                  <th className="py-2.5 px-3">Amount</th>
                  <th className="py-2.5 px-3">Payment</th>
                  <th className="py-2.5 px-3">Status</th>
                  <th className="py-2.5 px-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100">
                {orders.slice(0, 5).map((order) => {
                  const statusColors = {
                    Pending: 'bg-amber-50 text-amber-800 border-amber-200/60',
                    'Order Placed': 'bg-amber-50 text-amber-800 border-amber-200/60',
                    Processing: 'bg-blue-50 text-blue-800 border-blue-200/60',
                    Shipped: 'bg-indigo-50 text-indigo-800 border-indigo-200/60',
                    Delivered: 'bg-emerald-50 text-emerald-800 border-emerald-200/60',
                    Cancelled: 'bg-rose-50 text-rose-800 border-rose-200/60',
                    Refunded: 'bg-neutral-100 text-neutral-700 border-neutral-200'
                  };
                  const badgeClass =
                    statusColors[order.status] || 'bg-neutral-100 text-neutral-700 border-neutral-200';

                  return (
                    <tr key={order.id} className="hover:bg-neutral-50 transition-colors group">
                      <td className="py-3 px-3 font-mono font-medium text-neutral-900">
                        <Link to={`/admin/orders/${order.id}`} className="hover:underline">
                          {order.id}
                        </Link>
                      </td>
                      <td className="py-3 px-3 font-medium text-neutral-900">
                        {order.customer?.fullName || 'Eleanor Vance'}
                      </td>
                      <td className="py-3 px-3 text-neutral-500 whitespace-nowrap">
                        {order.date}
                      </td>
                      <td className="py-3 px-3 text-neutral-500">
                        {order.items?.length || 1} items
                      </td>
                      <td className="py-3 px-3 font-mono font-medium text-neutral-900 tabular-nums">
                        {formatPrice(order.total)}
                      </td>
                      <td className="py-3 px-3 text-neutral-500">
                        <span className="text-[11px] font-mono">Paid</span>
                      </td>
                      <td className="py-3 px-3">
                        <span
                          className={`inline-block px-2 py-0.5 rounded-xs text-[10.5px] font-mono border ${badgeClass}`}
                        >
                          {order.status}
                        </span>
                      </td>
                      <td className="py-3 px-3 text-right">
                        <Link
                          to={`/admin/orders/${order.id}`}
                          className="inline-flex items-center gap-1 text-[11px] font-medium text-neutral-600 hover:text-black"
                        >
                          <span>Manage</span>
                          <ChevronRight className="w-3.5 h-3.5" />
                        </Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Top Selling Products (4 Cols) */}
        <div className="lg:col-span-4 bg-white border border-[#E6E6EA] p-6 rounded-md shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-neutral-100">
            <div>
              <span className="text-[10px] uppercase font-mono tracking-widest text-[#9A7B4F] font-semibold block">
                CURATED FAVORITES
              </span>
              <h2 className="font-serif-luxury text-xl text-neutral-900 font-normal">
                Top Selling Products
              </h2>
            </div>
            <Link
              to="/admin/products"
              className="text-xs font-semibold text-neutral-900 hover:underline"
            >
              All
            </Link>
          </div>

          <div className="space-y-3.5">
            {analyticsData.topSellingProducts.map((prod) => (
              <div
                key={prod.id}
                className="flex items-center gap-3 p-2 rounded-md hover:bg-neutral-50 transition-colors"
              >
                <img
                  src={prod.image}
                  alt={prod.name}
                  className="w-12 h-12 object-cover rounded-xs border border-neutral-200 shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium text-neutral-900 truncate">{prod.name}</p>
                  <p className="text-[11px] text-neutral-500">{prod.category} · {prod.sold} sold</p>
                  <p className="text-[11px] font-mono font-medium text-neutral-900 mt-0.5 tabular-nums">
                    {formatPrice(prod.revenue)}
                  </p>
                </div>
                <div className="text-right">
                  <span
                    className={`text-[10px] font-mono px-1.5 py-0.5 rounded-xs ${
                      prod.stock <= 5
                        ? 'bg-rose-50 text-rose-700 border border-rose-200/60'
                        : 'bg-neutral-100 text-neutral-700'
                    }`}
                  >
                    {prod.stock} in stock
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 6. Low Stock Alert Section */}
      <div className="bg-amber-50/50 border border-amber-200/80 p-6 rounded-md shadow-2xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-amber-200/60">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-md bg-amber-100 text-amber-800 flex items-center justify-center shrink-0 border border-amber-300/60">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-serif-luxury text-lg text-neutral-900 font-medium">
                Low Stock Alert
              </h3>
              <p className="text-xs text-neutral-600">
                These high-demand pieces are nearing replenishment thresholds.
              </p>
            </div>
          </div>
          <Link
            to="/admin/inventory"
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-neutral-900 text-white hover:bg-black rounded-md text-xs font-medium transition-colors"
          >
            <span>View Inventory</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
          {displayLowStock.map((item, idx) => (
            <div
              key={item.sku || item.name || idx}
              className="bg-white border border-amber-200/80 p-4 rounded-md flex items-center justify-between gap-3 shadow-2xs"
            >
              <div className="flex items-center gap-3">
                <img
                  src={
                    item.images?.[0] ||
                    item.image ||
                    'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=150&q=80'
                  }
                  alt={item.name}
                  className="w-12 h-12 rounded-xs object-cover border border-neutral-200"
                />
                <div>
                  <h4 className="text-xs font-medium text-neutral-900 line-clamp-1">{item.name}</h4>
                  <p className="text-[11px] font-mono text-neutral-400">{item.sku || 'SKU-00' + (idx + 1)}</p>
                  <p className="text-[11px] font-semibold text-rose-600 font-mono mt-0.5">
                    Only {item.stock} left
                  </p>
                </div>
              </div>
              <Link
                to="/admin/inventory"
                className="text-[11px] font-medium text-amber-900 hover:text-black underline shrink-0 font-mono"
              >
                Restock
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
