export const ECOMMERCE_DEMO_USERS = [
  {
    id: 'user-admin',
    name: 'Alexander Vance',
    roleId: 'super_admin',
    roleName: 'Atelier Director / Super Admin',
    email: 'admin@fillkart.com',
    password: 'admin@fillkart',
    badge: 'Super Admin',
    avatar: 'AV',
    color: 'from-amber-600 to-yellow-600',
    description: 'Full administrative access to catalog, revenue analytics, customer profiles, and atelier settings.',
    targetRoute: '/admin'
  },
  {
    id: 'user-ops',
    name: 'Rhea Deshmukh',
    roleId: 'operations_manager',
    roleName: 'Operations & Dispatch Manager',
    email: 'operations@fillkart.com',
    password: 'ops@fillkart',
    badge: 'Logistics Hub',
    avatar: 'RD',
    color: 'from-blue-600 to-indigo-600',
    description: 'Manages incoming orders, dispatch schedules, courier partners, and order status transitions.',
    targetRoute: '/admin/orders'
  },
  {
    id: 'user-customer',
    name: 'Eleanor Vance',
    roleId: 'customer_vip',
    roleName: 'VIP Patron / Client',
    email: 'eleanor.vance@fillkart.com',
    password: 'shopper@fillkart',
    badge: 'Gold Tier VIP',
    avatar: 'EV',
    color: 'from-rose-500 to-pink-600',
    description: 'Shopper account with curated saved addresses, past luxury orders, and personal wishlist.',
    targetRoute: '/account'
  },
  {
    id: 'user-inventory',
    name: 'Karan Malhotra',
    roleId: 'inventory_lead',
    roleName: 'Inventory & Procurement Lead',
    email: 'warehouse@fillkart.com',
    password: 'inventory@fillkart',
    badge: 'Atelier Stock',
    avatar: 'KM',
    color: 'from-emerald-600 to-teal-600',
    description: 'Monitors real-time stock levels, low-stock warnings, batch replenishments, and SKU variants.',
    targetRoute: '/admin/inventory'
  },
  {
    id: 'user-support',
    name: 'Tara Singhania',
    roleId: 'support_lead',
    roleName: 'Client Concierge & Support',
    email: 'concierge@fillkart.com',
    password: 'support@fillkart',
    badge: 'Client Care',
    avatar: 'TS',
    color: 'from-purple-600 to-violet-600',
    description: 'Resolves customer inquiries, review moderations, styling consultations, and return requests.',
    targetRoute: '/admin/customers'
  }
];
