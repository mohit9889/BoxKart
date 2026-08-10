// Mock Admin Product Service

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

let mockProducts = [
  {
    id: 'PROD-101',
    sku: 'BK-STD-01',
    name: 'Medium Corrugated Shipping Box',
    category: 'Standard Boxes',
    price: '₹12.50',
    moq: 100,
    stock: 15000,
    status: 'Active',
  },
  {
    id: 'PROD-102',
    sku: 'BK-MAIL-02',
    name: 'Small Courier Bag',
    category: 'Mailer Bags',
    price: '₹4.00',
    moq: 500,
    stock: 25000,
    status: 'Active',
  },
  {
    id: 'PROD-103',
    sku: 'BK-CUST-05',
    name: 'Premium Printed Box',
    category: 'Custom Boxes',
    price: '₹45.00',
    moq: 1000,
    stock: 5000,
    status: 'Active',
  },
  {
    id: 'PROD-104',
    sku: 'BK-TAPE-01',
    name: 'BOPP Packaging Tape',
    category: 'Accessories',
    price: '₹45.00',
    moq: 50,
    stock: 0,
    status: 'Out of Stock',
  },
];

export const adminProductService = {
  getProducts: async () => {
    await delay(500);
    return [...mockProducts];
  },

  getProductById: async (id) => {
    await delay(300);
    const product = mockProducts.find((p) => p.id === id);
    if (!product) throw new Error('Product not found');
    return { ...product };
  },

  createProduct: async (data) => {
    await delay(800);
    const newProduct = {
      id: `PROD-${Math.floor(Math.random() * 900 + 100)}`,
      status: 'Active',
      ...data,
    };
    mockProducts.push(newProduct);
    return newProduct;
  },

  updateProduct: async (id, data) => {
    await delay(600);
    const index = mockProducts.findIndex((p) => p.id === id);
    if (index === -1) throw new Error('Product not found');
    mockProducts[index] = { ...mockProducts[index], ...data };
    return mockProducts[index];
  },

  deleteProduct: async (id) => {
    await delay(500);
    mockProducts = mockProducts.filter((p) => p.id !== id);
    return { success: true };
  },

  getStats: async () => {
    await delay(300);
    return {
      total: mockProducts.length,
      active: mockProducts.filter((p) => p.status === 'Active').length,
      outOfStock: mockProducts.filter((p) => p.status === 'Out of Stock')
        .length,
    };
  },
};
