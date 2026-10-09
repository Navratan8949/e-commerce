import React, { useState, useEffect, useRef } from 'react';
import { NavLink, Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  Package,
  FolderTree,
  Layers,
  Boxes,
  ShoppingBag,
  Clock,
  RefreshCw,
  Truck,
  CheckCircle2,
  XCircle,
  Users,
  MessageSquare,
  Tag,
  Image as ImageIcon,
  Send,
  BarChart3,
  Globe,
  FileText,
  HelpCircle,
  Settings,
  Store,
  ChevronDown,
  Search,
  Bell,
  Menu,
  X,
  ExternalLink,
  LogOut,
  User,
  Check,
  Sparkles,
  ArrowUpRight
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext.jsx';
import { useProducts } from '../../context/ProductContext.jsx';
import { formatPrice } from '../../lib/utils.js';
import { adminNotifications, initialCustomers } from '../../data/adminMockData.js';

export default function AdminLayout() {
  const { orders } = useAuth();
  const { products } = useProducts();
  const location = useLocation();
  const navigate = useNavigate();

  // Sidebar collapse state
  const [collapsed, setCollapsed] = useState(false);
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);

  // Global search state
  const [searchQuery, setSearchQuery] = useState('');
  const [searchOpen, setSearchOpen] = useState(false);
  const searchRef = useRef(null);

  // Dropdown states
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [notifications, setNotifications] = useState(adminNotifications);
  const [profileOpen, setProfileOpen] = useState(false);
  const [messagesOpen, setMessagesOpen] = useState(false);

  const notifRef = useRef(null);
  const profileRef = useRef(null);
  const messagesRef = useRef(null);

  // Close menus when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setSearchOpen(false);
      }
      if (notifRef.current && !notifRef.current.contains(event.target)) {
        setNotificationsOpen(false);
      }
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setProfileOpen(false);
      }
      if (messagesRef.current && !messagesRef.current.contains(event.target)) {
        setMessagesOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close mobile drawer on route change
  useEffect(() => {
    setMobileDrawerOpen(false);
  }, [location.pathname]);

  // Derived counts
  const pendingOrdersCount = orders.filter((o) => o.status === 'Pending' || o.status === 'Order Placed').length;
  const processingOrdersCount = orders.filter((o) => o.status === 'Processing').length;
  const shippedOrdersCount = orders.filter((o) => o.status === 'Shipped').length;
  const unreadNotifsCount = notifications.filter((n) => n.unread).length;

  // Filter global search results
  const trimmedQuery = searchQuery.trim().toLowerCase();
  const filteredProducts = trimmedQuery
    ? products.filter(
        (p) =>
          p.name.toLowerCase().includes(trimmedQuery) ||
          p.category.toLowerCase().includes(trimmedQuery) ||
          (p.slug && p.slug.toLowerCase().includes(trimmedQuery))
      ).slice(0, 4)
    : [];

  const filteredOrders = trimmedQuery
    ? orders.filter(
        (o) =>
          o.id.toLowerCase().includes(trimmedQuery) ||
          (o.customer?.fullName && o.customer.fullName.toLowerCase().includes(trimmedQuery))
      ).slice(0, 3)
    : [];

  const filteredCustomers = trimmedQuery
    ? initialCustomers.filter(
        (c) =>
          c.name.toLowerCase().includes(trimmedQuery) ||
          c.email.toLowerCase().includes(trimmedQuery) ||
          c.city.toLowerCase().includes(trimmedQuery)
      ).slice(0, 3)
    : [];

  const hasSearchResults =
    filteredProducts.length > 0 || filteredOrders.length > 0 || filteredCustomers.length > 0;

  // Navigation schema organized according to specification
  const navSections = [
    {
      title: 'Overview',
      items: [
        { label: 'Dashboard', path: '/admin', icon: LayoutDashboard, exact: true }
      ]
    },
    {
      title: 'Catalog',
      items: [
        { label: 'Products', path: '/admin/products', icon: Package, badge: products.length },
        { label: 'Categories', path: '/admin/categories', icon: FolderTree },
        { label: 'Collections', path: '/admin/collections', icon: Layers },
        { label: 'Inventory', path: '/admin/inventory', icon: Boxes }
      ]
    },
    {
      title: 'Orders',
      items: [
        { label: 'All Orders', path: '/admin/orders', icon: ShoppingBag, badge: orders.length },
        { label: 'Pending', path: '/admin/orders?status=Pending', icon: Clock, badge: pendingOrdersCount, badgeAlert: pendingOrdersCount > 0 },
        { label: 'Processing', path: '/admin/orders?status=Processing', icon: RefreshCw, badge: processingOrdersCount },
        { label: 'Shipped', path: '/admin/orders?status=Shipped', icon: Truck, badge: shippedOrdersCount },
        { label: 'Delivered', path: '/admin/orders?status=Delivered', icon: CheckCircle2 },
        { label: 'Cancelled', path: '/admin/orders?status=Cancelled', icon: XCircle }
      ]
    },
    {
      title: 'Customers',
      items: [
        { label: 'Customers', path: '/admin/customers', icon: Users },
        { label: 'Reviews', path: '/admin/reviews', icon: MessageSquare }
      ]
    },
    {
      title: 'Marketing',
      items: [
        { label: 'Coupons', path: '/admin/coupons', icon: Tag },
        { label: 'Banners', path: '/admin/banners', icon: ImageIcon },
        { label: 'Campaigns', path: '/admin/campaigns', icon: Send }
      ]
    },
    {
      title: 'Analytics',
      items: [
        { label: 'Sales Analytics', path: '/admin/analytics', icon: BarChart3 }
      ]
    },
    {
      title: 'Content',
      items: [
        { label: 'Homepage', path: '/admin/content', icon: Globe },
        { label: 'Blog', path: '/admin/blog', icon: FileText },
        { label: 'FAQs', path: '/admin/faqs', icon: HelpCircle }
      ]
    },
    {
      title: 'Settings',
      items: [
        { label: 'Settings', path: '/admin/settings', icon: Settings }
      ]
    }
  ];

  // Dynamic breadcrumb generation
  const pathParts = location.pathname.replace(/^\/admin/, '').split('/').filter(Boolean);
  const breadcrumbItems = [
    { label: 'Admin', path: '/admin' },
    ...pathParts.map((part, index) => {
      const subPath = '/admin/' + pathParts.slice(0, index + 1).join('/');
      const formatted = part
        .split('-')
        .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
        .join(' ');
      return { label: formatted, path: subPath };
    })
  ];

  const markAllNotifsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, unread: false })));
  };

  return (
    <div className="min-h-screen bg-[#F8F9FA] text-[#0F1115] flex flex-col font-sans selection:bg-[#0F1115] selection:text-white">
      {/* Top Header */}
      <header className="h-16 bg-white border-b border-[#E6E6EA] px-4 sm:px-6 lg:px-8 flex items-center justify-between sticky top-0 z-40 shrink-0 shadow-[0_1px_2px_rgba(0,0,0,0.02)]">
        {/* Left Section: Mobile Menu + Collapse Toggle + Breadcrumbs */}
        <div className="flex items-center gap-3 sm:gap-4">
          {/* Mobile Drawer Trigger */}
          <button
            onClick={() => setMobileDrawerOpen(true)}
            className="lg:hidden p-2 text-neutral-600 hover:text-black hover:bg-neutral-100 rounded-md transition-colors"
            aria-label="Open navigation drawer"
          >
            <Menu className="w-5 h-5" />
          </button>

          {/* Desktop Sidebar Collapse Toggle */}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="hidden lg:flex items-center justify-center p-2 text-neutral-500 hover:text-black hover:bg-neutral-100 rounded-md transition-colors"
            title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            <Menu className="w-5 h-5" />
          </button>

          {/* Breadcrumbs */}
          <nav className="hidden sm:flex items-center gap-1.5 text-xs text-neutral-500">
            {breadcrumbItems.map((crumb, idx) => (
              <React.Fragment key={crumb.path}>
                {idx > 0 && <span className="text-neutral-300">/</span>}
                {idx === breadcrumbItems.length - 1 ? (
                  <span className="font-semibold text-neutral-900">{crumb.label}</span>
                ) : (
                  <Link
                    to={crumb.path}
                    className="hover:text-black transition-colors"
                  >
                    {crumb.label}
                  </Link>
                )}
              </React.Fragment>
            ))}
          </nav>
        </div>

        {/* Center / Right Section */}
        <div className="flex items-center gap-2 sm:gap-4">
          {/* Global Search */}
          <div ref={searchRef} className="relative">
            <div className="flex items-center bg-[#F2F2F5] border border-[#E2E2E8] rounded-md px-3 py-1.5 w-44 sm:w-64 md:w-80 focus-within:border-black focus-within:bg-white transition-all">
              <Search className="w-4 h-4 text-neutral-400 shrink-0 mr-2" />
              <input
                type="text"
                placeholder="Search products, orders, customers..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setSearchOpen(true);
                }}
                onFocus={() => setSearchOpen(true)}
                className="w-full bg-transparent text-xs text-neutral-900 placeholder-neutral-400 focus:outline-hidden"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="text-neutral-400 hover:text-black"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Global Search Dropdown Suggestions */}
            {searchOpen && searchQuery.trim() && (
              <div className="absolute right-0 sm:left-0 sm:right-auto mt-2 w-80 sm:w-96 bg-white border border-[#E4E4E8] rounded-md shadow-xl py-2 z-50 max-h-96 overflow-y-auto">
                <div className="px-3 py-1.5 text-[10px] uppercase font-mono tracking-wider text-neutral-400 border-b border-neutral-100 flex justify-between items-center">
                  <span>Search Suggestions</span>
                  <span className="text-neutral-400">Click to inspect</span>
                </div>

                {!hasSearchResults && (
                  <div className="p-6 text-center text-xs text-neutral-500">
                    No results found for &quot;<span className="font-semibold text-black">{searchQuery}</span>&quot;
                  </div>
                )}

                {/* Products Group */}
                {filteredProducts.length > 0 && (
                  <div className="py-1">
                    <span className="px-3 py-1 text-[10px] font-mono uppercase tracking-wider text-[#9A7B4F] block font-semibold">
                      Products
                    </span>
                    {filteredProducts.map((p) => (
                      <Link
                        key={p.id}
                        to={`/admin/products/${p.id}`}
                        onClick={() => {
                          setSearchOpen(false);
                          setSearchQuery('');
                        }}
                        className="flex items-center gap-3 px-3 py-2 hover:bg-neutral-50 transition-colors"
                      >
                        <img
                          src={p.images?.[0] || 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=100'}
                          alt={p.name}
                          className="w-8 h-8 object-cover rounded-xs border border-neutral-200"
                        />
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-medium text-neutral-900 truncate">{p.name}</p>
                          <p className="text-[10px] text-neutral-400 font-mono">
                            {p.category} · {formatPrice(p.price)}
                          </p>
                        </div>
                      </Link>
                    ))}
                  </div>
                )}

                {/* Orders Group */}
                {filteredOrders.length > 0 && (
                  <div className="py-1 border-t border-neutral-100">
                    <span className="px-3 py-1 text-[10px] font-mono uppercase tracking-wider text-[#9A7B4F] block font-semibold">
                      Orders
                    </span>
                    {filteredOrders.map((o) => (
                      <Link
                        key={o.id}
                        to={`/admin/orders/${o.id}`}
                        onClick={() => {
                          setSearchOpen(false);
                          setSearchQuery('');
                        }}
                        className="flex items-center justify-between px-3 py-2 hover:bg-neutral-50 transition-colors"
                      >
                        <div>
                          <p className="text-xs font-mono font-medium text-neutral-900">{o.id}</p>
                          <p className="text-[10px] text-neutral-400">
                            {o.customer?.fullName || 'Customer'}
                          </p>
                        </div>
                        <span className="text-xs font-mono font-semibold text-neutral-900">
                          {formatPrice(o.total)}
                        </span>
                      </Link>
                    ))}
                  </div>
                )}

                {/* Customers Group */}
                {filteredCustomers.length > 0 && (
                  <div className="py-1 border-t border-neutral-100">
                    <span className="px-3 py-1 text-[10px] font-mono uppercase tracking-wider text-[#9A7B4F] block font-semibold">
                      Customers
                    </span>
                    {filteredCustomers.map((c) => (
                      <Link
                        key={c.id}
                        to={`/admin/customers/${c.id}`}
                        onClick={() => {
                          setSearchOpen(false);
                          setSearchQuery('');
                        }}
                        className="flex items-center gap-2.5 px-3 py-2 hover:bg-neutral-50 transition-colors"
                      >
                        <div className="w-6 h-6 rounded-full bg-neutral-900 text-white flex items-center justify-center text-[10px] font-mono font-medium">
                          {c.name.charAt(0)}
                        </div>
                        <div>
                          <p className="text-xs font-medium text-neutral-900">{c.name}</p>
                          <p className="text-[10px] text-neutral-400">{c.email}</p>
                        </div>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Notifications Dropdown */}
          <div ref={notifRef} className="relative">
            <button
              onClick={() => setNotificationsOpen(!notificationsOpen)}
              className="relative p-2 text-neutral-600 hover:text-black hover:bg-neutral-100 rounded-md transition-colors"
              aria-label="View notifications"
            >
              <Bell className="w-5 h-5" />
              {unreadNotifsCount > 0 && (
                <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-rose-500" />
              )}
            </button>

            {notificationsOpen && (
              <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white border border-[#E4E4E8] rounded-md shadow-xl py-2 z-50">
                <div className="px-4 py-2 border-b border-neutral-100 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold text-neutral-900">Notifications</span>
                    {unreadNotifsCount > 0 && (
                      <span className="text-[10px] font-mono px-1.5 py-0.2 bg-neutral-100 text-neutral-700 rounded-xs font-semibold">
                        {unreadNotifsCount} new
                      </span>
                    )}
                  </div>
                  {unreadNotifsCount > 0 && (
                    <button
                      onClick={markAllNotifsRead}
                      className="text-[10px] text-[#9A7B4F] hover:underline uppercase tracking-wider font-mono font-medium"
                    >
                      Mark all read
                    </button>
                  )}
                </div>

                <div className="max-h-80 overflow-y-auto divide-y divide-neutral-100">
                  {notifications.map((notif) => (
                    <Link
                      key={notif.id}
                      to={notif.link}
                      onClick={() => setNotificationsOpen(false)}
                      className={`block px-4 py-3 hover:bg-neutral-50 transition-colors ${
                        notif.unread ? 'bg-amber-50/40' : ''
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <span className="text-xs font-medium text-neutral-900 leading-snug">
                          {notif.title}
                        </span>
                        <span className="text-[10px] font-mono text-neutral-400 whitespace-nowrap">
                          {notif.time}
                        </span>
                      </div>
                      <p className="text-[11px] text-neutral-600 mt-0.5 leading-normal">
                        {notif.desc}
                      </p>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Patron Inquiries / Messages */}
          <div ref={messagesRef} className="relative">
            <button
              onClick={() => setMessagesOpen(!messagesOpen)}
              className="p-2 text-neutral-600 hover:text-black hover:bg-neutral-100 rounded-md transition-colors"
              aria-label="View messages"
            >
              <MessageSquare className="w-5 h-5" />
            </button>

            {messagesOpen && (
              <div className="absolute right-0 mt-2 w-72 sm:w-80 bg-white border border-[#E4E4E8] rounded-md shadow-xl p-3 z-50 space-y-2">
                <div className="flex items-center justify-between pb-2 border-b border-neutral-100">
                  <span className="text-xs font-semibold text-neutral-900">Customer Messages</span>
                  <span className="text-[10px] font-mono text-neutral-400">2 pending</span>
                </div>
                <div className="space-y-2 text-xs">
                  <div className="p-2 bg-neutral-50 rounded-xs border border-neutral-100">
                    <p className="font-medium text-neutral-900">Aanya Sharma</p>
                    <p className="text-[11px] text-neutral-600 line-clamp-1">
                      &quot;Inquiring about bespoke sizing for the Cashmere Overcoat...&quot;
                    </p>
                    <span className="text-[10px] text-neutral-400 font-mono">10m ago</span>
                  </div>
                  <div className="p-2 bg-neutral-50 rounded-xs border border-neutral-100">
                    <p className="font-medium text-neutral-900">Vikramaditya Rao</p>
                    <p className="text-[11px] text-neutral-600 line-clamp-1">
                      &quot;Can we schedule private atelier consultation this Friday?&quot;
                    </p>
                    <span className="text-[10px] text-neutral-400 font-mono">1h ago</span>
                  </div>
                </div>
                <Link
                  to="/admin/customers"
                  onClick={() => setMessagesOpen(false)}
                  className="block text-center text-[11px] text-[#9A7B4F] hover:text-black pt-2 border-t border-neutral-100 font-medium"
                >
                  View All Inquiries
                </Link>
              </div>
            )}
          </div>

          {/* View Storefront Pill Button */}
          <Link
            to="/"
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 bg-neutral-900 hover:bg-black text-white text-xs font-medium rounded-md transition-colors shadow-xs"
          >
            <Store className="w-3.5 h-3.5 text-[#C5A265]" />
            <span>Storefront</span>
            <ExternalLink className="w-3 h-3 text-neutral-400" />
          </Link>

          {/* Profile Dropdown */}
          <div ref={profileRef} className="relative">
            <button
              onClick={() => setProfileOpen(!profileOpen)}
              className="flex items-center gap-2 pl-2 pr-1 py-1 rounded-md hover:bg-neutral-100 transition-colors"
            >
              <div className="w-8 h-8 rounded-full bg-[#0B0C0E] text-[#C5A265] flex items-center justify-center text-xs font-serif font-bold ring-1 ring-neutral-300">
                LA
              </div>
              <div className="hidden md:block text-left text-xs leading-tight">
                <p className="font-semibold text-neutral-900">Admin</p>
                <p className="text-[10px] text-neutral-500 font-mono">Super Admin</p>
              </div>
              <ChevronDown className="w-3.5 h-3.5 text-neutral-400" />
            </button>

            {profileOpen && (
              <div className="absolute right-0 mt-2 w-56 bg-white border border-[#E4E4E8] rounded-md shadow-xl py-2 z-50">
                <div className="px-4 py-2 border-b border-neutral-100">
                  <p className="text-xs font-semibold text-neutral-900">Admin Console</p>
                  <p className="text-[11px] text-neutral-500">admin@fillkart.com</p>
                  <span className="inline-block mt-1 text-[9px] uppercase font-mono px-1.5 py-0.5 bg-neutral-100 text-neutral-800 rounded-xs font-semibold">
                    Super Admin
                  </span>
                </div>
                <div className="py-1">
                  <Link
                    to="/admin/settings"
                    onClick={() => setProfileOpen(false)}
                    className="flex items-center gap-2.5 px-4 py-2 text-xs text-neutral-700 hover:bg-neutral-50 hover:text-black transition-colors"
                  >
                    <User className="w-3.5 h-3.5" />
                    <span>Admin Profile</span>
                  </Link>
                  <Link
                    to="/admin/settings"
                    onClick={() => setProfileOpen(false)}
                    className="flex items-center gap-2.5 px-4 py-2 text-xs text-neutral-700 hover:bg-neutral-50 hover:text-black transition-colors"
                  >
                    <Settings className="w-3.5 h-3.5" />
                    <span>Store Settings</span>
                  </Link>
                  <Link
                    to="/"
                    onClick={() => setProfileOpen(false)}
                    className="flex items-center gap-2.5 px-4 py-2 text-xs text-neutral-700 hover:bg-neutral-50 hover:text-black transition-colors"
                  >
                    <Store className="w-3.5 h-3.5" />
                    <span>Switch to Storefront</span>
                  </Link>
                </div>
                <div className="pt-1 border-t border-neutral-100">
                  <Link
                    to="/"
                    onClick={() => setProfileOpen(false)}
                    className="flex items-center gap-2.5 px-4 py-2 text-xs text-rose-600 hover:bg-rose-50 transition-colors"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    <span>Log Out</span>
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Main Layout Container (Sidebar + Content) */}
      <div className="flex-1 flex overflow-hidden">
        {/* Desktop Sidebar: Architectural Obsidian */}
        <aside
          className={`hidden lg:flex flex-col bg-[#0B0C0E] border-r border-[#1B1D24] text-neutral-300 transition-all duration-300 z-30 shrink-0 ${
            collapsed ? 'w-20' : 'w-64'
          }`}
        >
          {/* Logo / Brand Header */}
          <div className="h-16 border-b border-[#1B1D24] px-4 flex items-center justify-between shrink-0">
            {!collapsed ? (
              <Link to="/admin" className="flex flex-col">
                <span className="font-serif-luxury text-xl tracking-[0.2em] uppercase font-light text-white">
                  FILLKART
                </span>
                <span className="text-[9px] font-mono tracking-widest text-[#C5A265] -mt-0.5 font-semibold">
                  ADMIN CONSOLE
                </span>
              </Link>
            ) : (
              <Link to="/admin" className="mx-auto font-serif-luxury text-lg tracking-widest font-bold text-white">
                L
              </Link>
            )}
          </div>

          {/* Navigation Links Scrollable */}
          <div className="flex-1 overflow-y-auto px-3 py-4 space-y-6">
            {navSections.map((section) => (
              <div key={section.title} className="space-y-1">
                {!collapsed && (
                  <h3 className="px-3 text-[9.5px] font-mono uppercase tracking-[0.22em] text-[#9A7B4F] font-semibold mb-1.5">
                    {section.title}
                  </h3>
                )}
                <div className="space-y-0.5">
                  {section.items.map((item) => {
                    const Icon = item.icon;
                    return (
                      <NavLink
                        key={item.label}
                        to={item.path}
                        end={item.exact}
                        title={collapsed ? item.label : undefined}
                        className={({ isActive }) =>
                          `flex items-center ${
                            collapsed ? 'justify-center py-2.5 px-0' : 'justify-between px-3 py-2'
                          } rounded-sm text-xs font-medium transition-all group ${
                            isActive
                              ? 'bg-[#181A22] text-white border-l-2 border-[#C5A265]'
                              : 'text-neutral-400 hover:bg-[#14161E] hover:text-neutral-100'
                          }`
                        }
                      >
                        <div className="flex items-center gap-2.5">
                          <Icon className="w-4 h-4 shrink-0 transition-transform group-hover:scale-105" />
                          {!collapsed && <span>{item.label}</span>}
                        </div>
                        {!collapsed && item.badge !== undefined && (
                          <span
                            className={`font-mono text-[10px] px-1.5 py-0.2 rounded-xs font-semibold tabular-nums ${
                              item.badgeAlert
                                ? 'bg-amber-900/60 text-amber-200 border border-amber-700/50'
                                : 'bg-neutral-800 text-neutral-300'
                            }`}
                          >
                            {item.badge}
                          </span>
                        )}
                      </NavLink>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          {/* Sidebar Bottom: Help & Support & Storefront switch */}
          <div className="p-3 border-t border-[#1B1D24] shrink-0 bg-[#0E1015]">
            {!collapsed ? (
              <div className="space-y-2">
                <Link
                  to="/"
                  className="flex items-center justify-between px-3 py-2 bg-[#171922] hover:bg-[#1F222E] text-neutral-200 rounded-sm text-xs font-medium transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <Store className="w-3.5 h-3.5 text-[#C5A265]" />
                    <span>View Storefront</span>
                  </div>
                  <ArrowUpRight className="w-3.5 h-3.5 text-neutral-400" />
                </Link>
              </div>
            ) : (
              <Link
                to="/"
                title="View Storefront"
                className="flex items-center justify-center p-2 text-neutral-400 hover:text-white hover:bg-[#171922] rounded-sm transition-colors"
              >
                <Store className="w-4 h-4" />
              </Link>
            )}
          </div>
        </aside>

        {/* Mobile Animated Drawer */}
        {mobileDrawerOpen && (
          <div className="lg:hidden fixed inset-0 z-50 flex">
            {/* Backdrop Scrim */}
            <div
              onClick={() => setMobileDrawerOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
            />

            {/* Drawer Content */}
            <div className="relative w-72 max-w-[85vw] bg-[#0B0C0E] text-neutral-300 h-full flex flex-col z-10 shadow-2xl border-r border-neutral-800">
              {/* Drawer Header */}
              <div className="h-16 px-5 border-b border-[#1B1D24] flex items-center justify-between shrink-0">
                <Link
                  to="/admin"
                  onClick={() => setMobileDrawerOpen(false)}
                  className="flex flex-col"
                >
                  <span className="font-serif-luxury text-xl tracking-[0.2em] uppercase font-light text-white">
                    FILLKART
                  </span>
                  <span className="text-[9px] font-mono tracking-widest text-[#C5A265] -mt-0.5 font-semibold">
                    ADMIN CONSOLE
                  </span>
                </Link>
                <button
                  onClick={() => setMobileDrawerOpen(false)}
                  className="p-1.5 text-neutral-400 hover:text-white rounded-md"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Scrollable Nav */}
              <div className="flex-1 overflow-y-auto px-4 py-4 space-y-5">
                {navSections.map((section) => (
                  <div key={section.title} className="space-y-1">
                    <h3 className="px-3 text-[9.5px] font-mono uppercase tracking-[0.22em] text-[#9A7B4F] font-semibold mb-1">
                      {section.title}
                    </h3>
                    <div className="space-y-0.5">
                      {section.items.map((item) => {
                        const Icon = item.icon;
                        return (
                          <NavLink
                            key={item.label}
                            to={item.path}
                            end={item.exact}
                            onClick={() => setMobileDrawerOpen(false)}
                            className={({ isActive }) =>
                              `flex items-center justify-between px-3 py-2 rounded-sm text-xs font-medium transition-all ${
                                isActive
                                  ? 'bg-[#181A22] text-white border-l-2 border-[#C5A265]'
                                  : 'text-neutral-400 hover:bg-[#14161E] hover:text-white'
                              }`
                            }
                          >
                            <div className="flex items-center gap-2.5">
                              <Icon className="w-4 h-4 shrink-0" />
                              <span>{item.label}</span>
                            </div>
                            {item.badge !== undefined && (
                              <span
                                className={`font-mono text-[10px] px-1.5 py-0.2 rounded-xs font-semibold tabular-nums ${
                                  item.badgeAlert
                                    ? 'bg-amber-900/60 text-amber-200 border border-amber-700/50'
                                    : 'bg-neutral-800 text-neutral-300'
                                }`}
                              >
                                {item.badge}
                              </span>
                            )}
                          </NavLink>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>

              {/* Mobile Drawer Footer */}
              <div className="p-4 border-t border-[#1B1D24] bg-[#0E1015] space-y-2 shrink-0">
                <Link
                  to="/"
                  onClick={() => setMobileDrawerOpen(false)}
                  className="flex items-center justify-between px-3 py-2 bg-white text-black rounded-sm text-xs font-medium"
                >
                  <div className="flex items-center gap-2">
                    <Store className="w-3.5 h-3.5" />
                    <span>View Storefront</span>
                  </div>
                  <ExternalLink className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* Main Content Pane */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 bg-[#F8F9FA]">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
