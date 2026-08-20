import { apiClient } from './client';

export const quotesApi = {
  getQuotes: async (params) => {
    const res = await apiClient.get('/quotes', { params });
    return res.data?.quotes || []; // Backend returns { quotes, pagination }
  },
  getQuoteById: async (id) => {
    const res = await apiClient.get(`/quotes/${id}`);
    return res.data?.data;
  },
  acceptQuote: async (id, data) => {
    const res = await apiClient.post(`/quotes/${id}/accept`, data);
    return res.data?.data;
  },
  rejectQuote: async (id) => {
    const res = await apiClient.post(`/quotes/${id}/reject`);
    return res.data?.data;
  },
};
