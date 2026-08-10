// Mock Admin RFQ Service

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

let mockRFQs = [
  {
    id: 'RFQ-1004',
    customer: 'Acme Corp',
    product: 'Printed Die-cut Box',
    quantity: 5000,
    date: '10 Aug 2026',
    status: 'NEW',
  },
  {
    id: 'RFQ-1003',
    customer: 'Fresh Foods',
    product: 'Food Grade Mailer',
    quantity: 10000,
    date: '09 Aug 2026',
    status: 'IN_REVIEW',
  },
  {
    id: 'RFQ-1002',
    customer: 'Tech Store',
    product: 'Laptop Shipper Box',
    quantity: 2000,
    date: '05 Aug 2026',
    status: 'QUOTED',
  },
  {
    id: 'RFQ-1001',
    customer: 'Apparel Co',
    product: 'Polybag 10x12',
    quantity: 50000,
    date: '01 Aug 2026',
    status: 'ACCEPTED',
  },
];

export const adminRFQService = {
  getRFQs: async () => {
    await delay(600);
    return [...mockRFQs];
  },

  getRFQById: async (id) => {
    await delay(400);
    const rfq = mockRFQs.find((r) => r.id === id);
    if (!rfq) throw new Error('RFQ not found');
    // Add detailed mock data for the single view
    return {
      ...rfq,
      customerDetails: {
        name: 'John Doe',
        email: 'john@example.com',
        phone: '+91 98765 43210',
      },
      requirements: {
        type: 'Corrugated Box',
        dimensions: '12 × 10 × 6 inch',
        material: 'Kraft Paper',
        ply: '3 Ply',
        printing: '2 Colors',
        notes:
          'Need a matte finish if possible. Artwork files will be shared upon quote approval.',
      },
      delivery: {
        pincode: '400001',
        city: 'Mumbai',
        state: 'Maharashtra',
      },
    };
  },

  updateRFQStatus: async (id, status) => {
    await delay(500);
    const index = mockRFQs.findIndex((r) => r.id === id);
    if (index === -1) throw new Error('RFQ not found');
    mockRFQs[index].status = status;
    return mockRFQs[index];
  },

  getStats: async () => {
    await delay(300);
    return {
      total: mockRFQs.length,
      new: mockRFQs.filter((r) => r.status === 'NEW').length,
      inReview: mockRFQs.filter((r) => r.status === 'IN_REVIEW').length,
    };
  },
};
