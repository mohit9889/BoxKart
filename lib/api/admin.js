import { apiClient } from './client';

export const adminApi = {
  // --- Orders ---
  getOrders: async (params) => {
    const res = await apiClient.get('/admin/orders', { params });
    return res.data?.data || [];
  },
  updateOrderStatus: async (id, status) => {
    const res = await apiClient.patch(`/admin/orders/${id}/status`, { status });
    return res.data?.data;
  },

  // --- RFQs ---
  getRfqs: async (params) => {
    const res = await apiClient.get('/admin/rfqs', { params });
    return res.data?.data || [];
  },
  updateRfqStatus: async (id, status) => {
    const res = await apiClient.patch(`/admin/rfqs/${id}/status`, { status });
    return res.data?.data;
  },

  // --- Quotes ---
  getQuotes: async (params) => {
    const res = await apiClient.get('/admin/quotes', { params });
    return res.data?.data || [];
  },
  // Note: in the new backend, quotes are created on an RFQ
  createQuote: async (rfqId, quoteData) => {
    const res = await apiClient.post(`/rfq/${rfqId}/quote`, quoteData);
    return res.data?.data;
  },

  // --- Products ---
  getProducts: async (params) => {
    const res = await apiClient.get('/admin/products', { params });
    return res.data?.data || [];
  },
  createProduct: async (data) => {
    const res = await apiClient.post(`/admin/products`, data);
    return res.data?.data;
  },
  updateProduct: async (id, data) => {
    const res = await apiClient.patch(`/admin/products/${id}`, data);
    return res.data?.data;
  },
  deleteProduct: async (id) => {
    const res = await apiClient.delete(`/admin/products/${id}`);
    return res.data?.data;
  },

  // --- Guest Inquiries ---
  getGuestInquiries: async (params) => {
    const res = await apiClient.get('/admin/guest-inquiries', { params });
    return res.data?.data || [];
  },
  getGuestInquiry: async (id) => {
    const res = await apiClient.get(`/admin/guest-inquiries/${id}`);
    return res.data?.data;
  },
  updateGuestInquiryStatus: async (id, status) => {
    const res = await apiClient.patch(`/admin/guest-inquiries/${id}/status`, {
      status,
    });
    return res.data?.data;
  },
};
