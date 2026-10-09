// Comprehensive mock data for LUMÉRA Admin Console

export const initialCustomers = [
  {
    id: 'cust-1',
    name: 'Eleanor Vance',
    email: 'eleanor.vance@lumera.studio',
    phone: '+91 98201 44521',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    city: 'Mumbai',
    ordersCount: 4,
    totalSpent: 42800,
    lastOrder: 'Oct 06, 2026',
    status: 'VIP',
    joined: 'Jan 15, 2025',
    address: 'Penthouse 4B, The Imperial Heights, Worli Sea Face, Mumbai 400018',
    notes: 'Prefers archival silk garments in Oatmeal and Noir.'
  },
  {
    id: 'cust-2',
    name: 'Rahul Sharma',
    email: 'rahul.sharma@horizon.in',
    phone: '+91 98110 32490',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    city: 'New Delhi',
    ordersCount: 3,
    totalSpent: 28490,
    lastOrder: 'Oct 08, 2026',
    status: 'Active',
    joined: 'Mar 10, 2025',
    address: 'B-12 Anand Niketan, New Delhi 110021',
    notes: 'Regular patron of Belgian linen shirts and tailoring.'
  },
  {
    id: 'cust-3',
    name: 'Meera Singhania',
    email: 'meera.s@regency.org',
    phone: '+91 97412 88901',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=80',
    city: 'Bengaluru',
    ordersCount: 6,
    totalSpent: 64500,
    lastOrder: 'Sep 29, 2026',
    status: 'VIP',
    joined: 'Nov 02, 2024',
    address: 'Villa 14, Palm Meadows, Whitefield, Bengaluru 560066',
    notes: 'Private runway client, loves structured outerwear.'
  },
  {
    id: 'cust-4',
    name: 'Kabir Oberoi',
    email: 'kabir.oberoi@atelier.io',
    phone: '+91 99200 12874',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
    city: 'Hyderabad',
    ordersCount: 2,
    totalSpent: 16998,
    lastOrder: 'Sep 18, 2026',
    status: 'Active',
    joined: 'Jun 22, 2025',
    address: 'Road No 36, Jubilee Hills, Hyderabad 500033',
    notes: 'Collects timepieces and leather accessories.'
  },
  {
    id: 'cust-5',
    name: 'Ananya Deshmukh',
    email: 'ananya.d@studio.in',
    phone: '+91 98230 65112',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80',
    city: 'Pune',
    ordersCount: 1,
    totalSpent: 5499,
    lastOrder: 'Oct 02, 2026',
    status: 'New',
    joined: 'Oct 01, 2026',
    address: 'Koregaon Park North Main Rd, Pune 411001',
    notes: 'First purchase was the Satin Slip Dress.'
  },
  {
    id: 'cust-6',
    name: 'Zayn Merchant',
    email: 'zayn.m@capital.com',
    phone: '+91 98450 77219',
    avatar: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=200&q=80',
    city: 'Chennai',
    ordersCount: 0,
    totalSpent: 0,
    lastOrder: 'Never',
    status: 'Registered',
    joined: 'Sep 12, 2026',
    address: 'Boat Club Road, RA Puram, Chennai 600028',
    notes: 'Saved 4 items to wishlist.'
  }
];

export const initialCollections = [
  {
    id: 'col-1',
    name: 'Summer Edit',
    slug: 'summer-edit',
    description: 'Breezy French linens and sun-washed tones crafted for coastal heat.',
    image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=800&q=80',
    productsCount: 12,
    status: 'Active',
    featured: true,
    created: 'Apr 01, 2026'
  },
  {
    id: 'col-2',
    name: 'Essential Collection',
    slug: 'essential-collection',
    description: 'Foundational architectural pieces that outlast seasonal cycles.',
    image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=800&q=80',
    productsCount: 18,
    status: 'Active',
    featured: true,
    created: 'Jan 10, 2026'
  },
  {
    id: 'col-3',
    name: 'New Season',
    slug: 'new-season',
    description: 'Sculptural outerwear and artisanal knitwear from the Milan atelier.',
    image: 'https://images.unsplash.com/photo-1539533018447-63fcce2678e3?auto=format&fit=crop&w=800&q=80',
    productsCount: 10,
    status: 'Active',
    featured: false,
    created: 'Sep 15, 2026'
  },
  {
    id: 'col-4',
    name: 'Office Edit',
    slug: 'office-edit',
    description: 'Structured hopsack blazers and crisp poplin shirts for the boardroom.',
    image: 'https://images.unsplash.com/photo-1487222477894-8943e31ef7b2?auto=format&fit=crop&w=800&q=80',
    productsCount: 8,
    status: 'Active',
    featured: false,
    created: 'Feb 20, 2026'
  },
  {
    id: 'col-5',
    name: 'Weekend Capsule',
    slug: 'weekend-capsule',
    description: 'Relaxed organic cotton sweatwear, washed tees, and easy totes.',
    image: 'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=800&q=80',
    productsCount: 9,
    status: 'Draft',
    featured: false,
    created: 'Aug 14, 2026'
  }
];

export const initialBanners = [
  {
    id: 'ban-1',
    title: 'Autumn / Winter 2026 Capsule',
    subtitle: 'Quiet luxury crafted from organic European raw materials.',
    cta: 'Explore Collection',
    link: '/shop/women',
    image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1600&q=80',
    position: 'Homepage Hero Slide 1',
    status: 'Active'
  },
  {
    id: 'ban-2',
    title: 'The Artisanal Leather Series',
    subtitle: 'Full-grain Tuscan calfskin tanned with plant extracts.',
    cta: 'Discover Leather',
    link: '/shop/accessories',
    image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=1600&q=80',
    position: 'Homepage Hero Slide 2',
    status: 'Active'
  },
  {
    id: 'ban-3',
    title: 'Architectural Men’s Tailoring',
    subtitle: 'Structured shoulders and natural drape.',
    cta: 'View Tailoring',
    link: '/shop/men',
    image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1600&q=80',
    position: 'Mid-Page Feature Banner',
    status: 'Active'
  }
];

export const initialCampaigns = [
  {
    id: 'cmp-1',
    name: 'VIP Private Preview SS26',
    channel: 'Email Newsletter',
    audience: 'Top 500 VIP Clientele',
    sentDate: 'Oct 01, 2026',
    status: 'Completed',
    opens: '68.4%',
    clicks: '24.2%',
    revenueGenerated: '₹3,42,000'
  },
  {
    id: 'cmp-2',
    name: 'Festive Capsule Launch (Diwali)',
    channel: 'SMS + WhatsApp Concierge',
    audience: 'All Registered Patrons',
    sentDate: 'Scheduled Oct 15, 2026',
    status: 'Scheduled',
    opens: '--',
    clicks: '--',
    revenueGenerated: '--'
  },
  {
    id: 'cmp-3',
    name: 'Cart Abandonment Recovery 10%',
    channel: 'Automated Trigger',
    audience: 'Visitors with items in bag > 24h',
    sentDate: 'Ongoing (Active)',
    status: 'Active',
    opens: '52.1%',
    clicks: '19.8%',
    revenueGenerated: '₹1,18,500'
  }
];

export const adminNotifications = [
  {
    id: 'notif-1',
    title: 'New High-Value Order Placed',
    description: 'Rahul Sharma placed order #LUM-10231 worth ₹8,499',
    time: '5 minutes ago',
    unread: true,
    type: 'order',
    link: '/admin/orders'
  },
  {
    id: 'notif-2',
    title: 'Low Stock Alert',
    description: 'Leather Tote in Cognac Saddle has only 3 units left in warehouse.',
    time: '2 hours ago',
    unread: true,
    type: 'inventory',
    link: '/admin/inventory'
  },
  {
    id: 'notif-3',
    title: 'New 5-Star Patron Review',
    description: 'Aanya Sharma reviewed "Oversized Linen Shirt"',
    time: '4 hours ago',
    unread: false,
    type: 'review',
    link: '/admin/reviews'
  },
  {
    id: 'notif-4',
    title: 'Coupon Redemption Milestone',
    description: 'Promo code LUMERA10 has been redeemed 82 times this week.',
    time: '1 day ago',
    unread: false,
    type: 'marketing',
    link: '/admin/coupons'
  }
];

export const analyticsData = {
  revenueOverview: {
    '7 Days': [
      { date: 'Oct 02', revenue: 142000, orders: 18 },
      { date: 'Oct 03', revenue: 168000, orders: 22 },
      { date: 'Oct 04', revenue: 195000, orders: 26 },
      { date: 'Oct 05', revenue: 154000, orders: 19 },
      { date: 'Oct 06', revenue: 210000, orders: 31 },
      { date: 'Oct 07', revenue: 185000, orders: 24 },
      { date: 'Oct 08', revenue: 230560, orders: 34 }
    ],
    '30 Days': [
      { date: 'Sep 10', revenue: 180000, orders: 24 },
      { date: 'Sep 15', revenue: 240000, orders: 32 },
      { date: 'Sep 20', revenue: 290000, orders: 38 },
      { date: 'Sep 25', revenue: 310000, orders: 42 },
      { date: 'Sep 30', revenue: 280000, orders: 36 },
      { date: 'Oct 05', revenue: 345000, orders: 48 },
      { date: 'Oct 08', revenue: 395000, orders: 54 }
    ],
    '3 Months': [
      { date: 'Aug', revenue: 840000, orders: 112 },
      { date: 'Sep', revenue: 1050000, orders: 146 },
      { date: 'Oct', revenue: 1284560, orders: 184 }
    ],
    '6 Months': [
      { date: 'May', revenue: 620000, orders: 84 },
      { date: 'Jun', revenue: 710000, orders: 98 },
      { date: 'Jul', revenue: 780000, orders: 104 },
      { date: 'Aug', revenue: 840000, orders: 112 },
      { date: 'Sep', revenue: 1050000, orders: 146 },
      { date: 'Oct', revenue: 1284560, orders: 184 }
    ],
    '1 Year': [
      { date: 'Q4 25', revenue: 1840000, orders: 260 },
      { date: 'Q1 26', revenue: 2410000, orders: 340 },
      { date: 'Q2 26', revenue: 2950000, orders: 410 },
      { date: 'Q3 26', revenue: 3620000, orders: 520 }
    ]
  },
  categoryBreakdown: [
    { name: 'Women', value: 46, amount: 590897, color: '#1A1A1A' },
    { name: 'Men', value: 28, amount: 359676, color: '#5A534B' },
    { name: 'Accessories', value: 18, amount: 231220, color: '#9C8E7D' },
    { name: 'New Arrivals', value: 8, amount: 102764, color: '#D4C9BC' }
  ],
  topSellingProducts: [
    {
      id: 'prod-top-1',
      name: 'Oversized Linen Shirt',
      category: 'Women',
      sold: 142,
      revenue: 496858,
      stock: 14,
      image: 'https://images.unsplash.com/photo-1598554747436-c9293d6a588f?auto=format&fit=crop&w=200&q=80'
    },
    {
      id: 'prod-top-2',
      name: 'Satin Slip Dress',
      category: 'Women',
      sold: 118,
      revenue: 648882,
      stock: 7,
      image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=200&q=80'
    },
    {
      id: 'prod-top-3',
      name: 'Premium Leather Tote',
      category: 'Accessories',
      sold: 86,
      revenue: 687914,
      stock: 4,
      image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=200&q=80'
    },
    {
      id: 'prod-top-4',
      name: 'Relaxed Hopsack Blazer',
      category: 'Men',
      sold: 74,
      revenue: 665926,
      stock: 12,
      image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=200&q=80'
    },
    {
      id: 'prod-top-5',
      name: 'Classic Minimalist Watch',
      category: 'Accessories',
      sold: 62,
      revenue: 557938,
      stock: 3,
      image: 'https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=200&q=80'
    }
  ],
  lowStockItems: [
    {
      name: 'Classic Minimalist Watch',
      sku: 'ACC-WAT-003',
      stock: 3,
      threshold: 5,
      category: 'Accessories',
      image: 'https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=200&q=80'
    },
    {
      name: 'Premium Leather Tote',
      sku: 'ACC-TOT-001',
      stock: 4,
      threshold: 6,
      category: 'Accessories',
      image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=200&q=80'
    },
    {
      name: 'Satin Slip Dress',
      sku: 'WOM-DRS-002',
      stock: 7,
      threshold: 10,
      category: 'Women',
      image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=200&q=80'
    }
  ]
};
