import React, { useState } from 'react';
import {
  BarChart3,
  TrendingUp,
  Users,
  ShoppingBag,
  DollarSign,
  ArrowUpRight,
  Filter,
  Calendar,
  Sparkles
} from 'lucide-react';
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { formatPrice } from '../../lib/utils.js';
import { analyticsData } from '../../data/adminMockData.js';

export default function AdminAnalytics() {
  const [timeRange, setTimeRange] = useState('30 Days');

  const chartData = analyticsData.revenueOverview[timeRange] || analyticsData.revenueOverview['30 Days'];

  // Conversion funnel data
  const funnelData = [
    { step: 'Sessions / Storefront Visits', visitors: 64200, percentage: '100%' },
    { step: 'Product Page Views', visitors: 38400, percentage: '59.8%' },
    { step: 'Added to Bag', visitors: 11200, percentage: '17.4%' },
    { step: 'Initiated Checkout', visitors: 4850, percentage: '7.5%' },
    { step: 'Completed Purchase', visitors: 3094, percentage: '4.82%' }
  ];

  // Device Breakdown
  const deviceData = [
    { name: 'Mobile (iOS & Android)', value: 68, color: '#C5A265' },
    { name: 'Desktop (Mac & PC)', value: 28, color: '#111319' },
    { name: 'Tablet / iPad', value: 4, color: '#8E9AA8' }
  ];

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-[#0B0C0E] text-white p-3 rounded-sm shadow-xl border border-neutral-800 text-xs font-sans">
          <p className="font-mono text-[10px] text-neutral-400 mb-1">{label}</p>
          <p className="font-medium flex items-center justify-between gap-4">
            <span className="text-neutral-400">Revenue:</span>
            <span className="font-mono font-semibold text-[#C5A265]">
              {formatPrice(payload[0]?.value)}
            </span>
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-[#E6E6EA]">
        <div>
          <span className="text-[10px] uppercase font-mono tracking-[0.22em] text-[#9A7B4F] font-semibold">
            EXECUTIVE INTELLIGENCE
          </span>
          <h1 className="font-serif-luxury text-3xl sm:text-4xl text-neutral-900 font-light tracking-tight">
            Sales &amp; Growth Analytics
          </h1>
          <p className="text-xs text-neutral-500 mt-0.5">
            Holistic view of gross merchandise value, conversion funnels, and customer retention.
          </p>
        </div>

        {/* Time Filter Tabs */}
        <div className="flex items-center bg-neutral-100 p-1 rounded-md border border-neutral-200 text-xs">
          {['7 Days', '30 Days', '3 Months', '6 Months', '1 Year'].map((t) => (
            <button
              key={t}
              onClick={() => setTimeRange(t)}
              className={`px-3 py-1 rounded-xs transition-colors cursor-pointer ${
                timeRange === t
                  ? 'bg-white text-neutral-900 font-semibold shadow-xs'
                  : 'text-neutral-500 hover:text-black'
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* 4 Performance Metric Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="bg-white border border-[#E6E6EA] p-4 rounded-md shadow-xs">
          <span className="text-[10px] uppercase font-mono tracking-wider text-neutral-400">
            Gross Sales
          </span>
          <p className="font-mono text-2xl font-bold text-neutral-900 mt-1 tabular-nums">
            ₹12,84,560
          </p>
          <span className="text-[10px] font-mono text-emerald-700 font-medium">+18.6% vs previous</span>
        </div>

        <div className="bg-white border border-[#E6E6EA] p-4 rounded-md shadow-xs">
          <span className="text-[10px] uppercase font-mono tracking-wider text-neutral-400">
            Average Order Value (AOV)
          </span>
          <p className="font-mono text-2xl font-bold text-neutral-900 mt-1 tabular-nums">
            ₹6,480
          </p>
          <span className="text-[10px] font-mono text-emerald-700 font-medium">+8.4% vs previous</span>
        </div>

        <div className="bg-white border border-[#E6E6EA] p-4 rounded-md shadow-xs">
          <span className="text-[10px] uppercase font-mono tracking-wider text-neutral-400">
            Store Conversion Rate
          </span>
          <p className="font-mono text-2xl font-bold text-neutral-900 mt-1 tabular-nums">
            4.82%
          </p>
          <span className="text-[10px] font-mono text-emerald-700 font-medium">+1.4% benchmark</span>
        </div>

        <div className="bg-white border border-[#E6E6EA] p-4 rounded-md shadow-xs">
          <span className="text-[10px] uppercase font-mono tracking-wider text-neutral-400">
            Patron Repeat Rate
          </span>
          <p className="font-mono text-2xl font-bold text-neutral-900 mt-1 tabular-nums">
            42.8%
          </p>
          <span className="text-[10px] font-mono text-[#9A7B4F] font-medium">High loyalty index</span>
        </div>
      </div>

      {/* Large Area Chart */}
      <div className="bg-white border border-[#E6E6EA] p-6 rounded-md shadow-xs space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-neutral-100">
          <h2 className="font-serif-luxury text-xl text-neutral-900">
            Gross Merchandise Value Trend
          </h2>
          <span className="text-xs font-mono text-[#9A7B4F]">Timeframe: {timeRange}</span>
        </div>

        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="analyticsGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#C5A265" stopOpacity={0.25} />
                  <stop offset="95%" stopColor="#C5A265" stopOpacity={0.0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="date" stroke="#8E9AA8" fontSize={11} tickLine={false} />
              <YAxis
                stroke="#8E9AA8"
                fontSize={11}
                tickLine={false}
                tickFormatter={(v) => `₹${(v / 1000).toFixed(0)}k`}
              />
              <Tooltip content={<CustomTooltip />} />
              <Area
                type="monotone"
                dataKey="revenue"
                stroke="#C5A265"
                strokeWidth={2.5}
                fill="url(#analyticsGradient)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Funnel & Device Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Conversion Funnel (8 cols) */}
        <div className="lg:col-span-8 bg-white border border-[#E6E6EA] p-6 rounded-md shadow-xs space-y-4">
          <h2 className="font-serif-luxury text-xl text-neutral-900 pb-3 border-b border-neutral-100">
            E-Commerce Funnel Performance
          </h2>

          <div className="space-y-3 pt-2">
            {funnelData.map((stage, idx) => (
              <div key={stage.step} className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="font-medium text-neutral-900">{stage.step}</span>
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-neutral-500 tabular-nums">
                      {stage.visitors.toLocaleString()} visitors
                    </span>
                    <span className="font-mono font-semibold text-neutral-900 tabular-nums">
                      {stage.percentage}
                    </span>
                  </div>
                </div>
                <div className="w-full h-2 bg-neutral-100 rounded-xs overflow-hidden">
                  <div
                    className="h-full bg-neutral-900 rounded-xs transition-all duration-500"
                    style={{
                      width: `${100 - idx * 22}%`
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Device Breakdown (4 cols) */}
        <div className="lg:col-span-4 bg-white border border-[#E6E6EA] p-6 rounded-md shadow-xs space-y-4 flex flex-col justify-between">
          <div>
            <h2 className="font-serif-luxury text-xl text-neutral-900 pb-3 border-b border-neutral-100">
              Sessions by Device
            </h2>

            <div className="h-44 relative my-2">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={deviceData}
                    cx="50%"
                    cy="50%"
                    innerRadius={45}
                    outerRadius={65}
                    paddingAngle={3}
                    dataKey="value"
                  >
                    {deviceData.map((d, i) => (
                      <Cell key={i} fill={d.color} stroke="#FFF" strokeWidth={2} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="space-y-2 border-t border-neutral-100 pt-3">
            {deviceData.map((d) => (
              <div key={d.name} className="flex justify-between text-xs">
                <div className="flex items-center gap-2">
                  <span
                    className="w-2.5 h-2.5 rounded-xs"
                    style={{ backgroundColor: d.color }}
                  />
                  <span className="text-neutral-700">{d.name}</span>
                </div>
                <span className="font-mono font-semibold text-neutral-900 tabular-nums">{d.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
