// Seed mock orders for demo customer account

export const initialOrders = [
  {
    id: 'LUM-2026-94812',
    date: 'March 28, 2026',
    items: [
      {
        productId: 'w-1',
        name: 'Oversized Linen Shirt',
        image: 'https://images.unsplash.com/photo-1598554747436-c9293d6a588f?auto=format&fit=crop&w=600&q=80',
        size: 'S',
        color: 'Pure White',
        price: 3499,
        quantity: 1
      },
      {
        productId: 'a-1',
        name: 'Leather Tote',
        image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=600&q=80',
        size: 'One Size',
        color: 'Cognac Saddle',
        price: 7999,
        quantity: 1
      }
    ],
    subtotal: 11498,
    discount: 1150,
    shipping: 0,
    total: 10348,
    status: 'Shipped',
    estimatedDelivery: 'April 11, 2026',
    customer: {
      fullName: 'Eleanor Vance',
      email: 'eleanor.vance@fillkart.com',
      phone: '+91 98201 44521',
      address: 'Penthouse 4B, The Imperial Heights, Worli Sea Face',
      city: 'Mumbai',
      state: 'Maharashtra',
      pincode: '400018'
    },
    paymentMethod: 'Credit / Debit Card'
  },
  {
    id: 'LUM-2026-83190',
    date: 'February 14, 2026',
    items: [
      {
        productId: 'w-2',
        name: 'Satin Slip Dress',
        image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=600&q=80',
        size: 'M',
        color: 'Champagne Ivory',
        price: 5499,
        quantity: 1
      }
    ],
    subtotal: 5499,
    discount: 500,
    shipping: 0,
    total: 4999,
    status: 'Delivered',
    estimatedDelivery: 'February 19, 2026',
    customer: {
      fullName: 'Eleanor Vance',
      email: 'eleanor.vance@fillkart.com',
      phone: '+91 98201 44521',
      address: 'Penthouse 4B, The Imperial Heights, Worli Sea Face',
      city: 'Mumbai',
      state: 'Maharashtra',
      pincode: '400018'
    },
    paymentMethod: 'UPI'
  }
];
