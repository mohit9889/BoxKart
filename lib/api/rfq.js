import { apiClient } from './client';

export const rfqApi = {
  getRFQs: async (params) => {
    const res = await apiClient.get('/rfq', { params });
    return res.data?.data || [];
  },
  getRFQById: async (id) => {
    const res = await apiClient.get(`/rfq/${id}`);
    return res.data?.data;
  },
  createRFQ: async (data) => {
    const res = await apiClient.post('/rfq', data);
    return res.data?.data;
  },
};
