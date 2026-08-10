// Mock Admin Order Service

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

let mockOrders = [
  {
    id: 'ORD-5034',
    customer: 'Apparel Co',
    amount: '₹53,100',
    items: 1,
    date: '10 Aug 2026',
    status: 'PROCESSING',
    payment: 'PAID',
  },
  {
    id: 'ORD-5033',
    customer: 'Rahul Sharma',
    amount: '₹2,500',
    items: 2,
    date: '08 Aug 2026',
    status: 'SHIPPED',
    payment: 'PAID',
  },
  {
    id: 'ORD-5032',
    customer: 'Tech Store',
    amount: '₹1,49,000',
    items: 2,
    date: '07 Aug 2026',
    status: 'DELIVERED',
    payment: 'PAID',
  },
  {
    id: 'ORD-5031',
    customer: 'Local Bakery',
    amount: '₹12,400',
    items: 1,
    date: '05 Aug 2026',
    status: 'PROCESSING',
    payment: 'PENDING',
  },
];

export const adminOrderService = {
  getOrders: async () => {
    await delay(700);
    return [...mockOrders];
  },

  getOrderById: async (id) => {
    await delay(400);
    const order = mockOrders.find((o) => o.id === id);
    if (!order) throw new Error('Order not found');

    return {
      ...order,
      customerDetails: {
        name: 'Contact Person',
        email: 'contact@example.com',
        phone: '+91 98765 43210',
      },
      shippingAddress:
        '123 Industrial Area, Phase 1, Mumbai, Maharashtra 400001',
      lineItems: [
        {
          name: 'Standard Shipping Box',
          sku: 'BK-STD-01',
          quantity: 1000,
          price: 12.5,
          total: 12500,
        },
      ],
      awb:
        order.status === 'SHIPPED' || order.status === 'DELIVERED'
          ? 'AWB123456789'
          : null,
      courier:
        order.status === 'SHIPPED' || order.status === 'DELIVERED'
          ? 'Delhivery'
          : null,
    };
  },

  updateOrderStatus: async (id, status, trackingData = null) => {
    await delay(800);
    const index = mockOrders.findIndex((o) => o.id === id);
    if (index === -1) throw new Error('Order not found');

    mockOrders[index].status = status;
    return { ...mockOrders[index], trackingData };
  },

  getStats: async () => {
    await delay(300);
    return {
      total: mockOrders.length,
      processing: mockOrders.filter((o) => o.status === 'PROCESSING').length,
      shipped: mockOrders.filter((o) => o.status === 'SHIPPED').length,
    };
  },
};
