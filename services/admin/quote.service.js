// Mock Admin Quote Service

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

let mockQuotes = [
  {
    id: 'Q-205',
    rfqId: 'RFQ-1002',
    customer: 'Tech Store',
    amount: '₹1,25,000',
    date: '06 Aug 2026',
    expiry: '13 Aug 2026',
    status: 'PENDING',
  },
  {
    id: 'Q-204',
    rfqId: 'RFQ-1001',
    customer: 'Apparel Co',
    amount: '₹45,000',
    date: '02 Aug 2026',
    expiry: '09 Aug 2026',
    status: 'ACCEPTED',
  },
  {
    id: 'Q-203',
    rfqId: 'RFQ-0995',
    customer: 'Global Traders',
    amount: '₹88,000',
    date: '25 Jul 2026',
    expiry: '01 Aug 2026',
    status: 'EXPIRED',
  },
];

export const adminQuoteService = {
  getQuotes: async () => {
    await delay(500);
    return [...mockQuotes];
  },

  getQuoteById: async (id) => {
    await delay(300);
    const quote = mockQuotes.find((q) => q.id === id);
    if (!quote) throw new Error('Quote not found');

    // Add detailed mock data
    return {
      ...quote,
      items: [
        {
          id: '1',
          description: 'Laptop Shipper Box (15x12x4")',
          quantity: 2000,
          unitPrice: 50.0,
          total: 100000,
        },
        {
          id: '2',
          description: 'Custom Insert (Foam)',
          quantity: 2000,
          unitPrice: 12.5,
          total: 25000,
        },
      ],
      subtotal: 125000,
      tax: 22500, // 18% GST
      shipping: 1500,
      total: 149000,
      notes: 'Prices are valid for 7 days. Production time: 10-14 days.',
    };
  },

  createQuote: async (data) => {
    await delay(1000);
    const newQuote = {
      id: `Q-${Math.floor(Math.random() * 100 + 200)}`,
      date: new Date().toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      }),
      status: 'PENDING',
      ...data,
    };
    mockQuotes.unshift(newQuote);
    return newQuote;
  },

  updateQuoteStatus: async (id, status) => {
    await delay(500);
    const index = mockQuotes.findIndex((q) => q.id === id);
    if (index === -1) throw new Error('Quote not found');
    mockQuotes[index].status = status;
    return mockQuotes[index];
  },
};
