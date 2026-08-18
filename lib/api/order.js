import { apiClient } from './client';

export const orderApi = {
  createOrder: async (orderData) => {
    try {
      // Generate a random 16+ character idempotency key
      const idempotencyKey =
        Math.random().toString(36).substring(2, 15) +
        Math.random().toString(36).substring(2, 15);

      const response = await apiClient.post('/orders', orderData, {
        headers: {
          'Idempotency-Key': idempotencyKey,
        },
      });
      return response;
    } catch (error) {
      console.error('Error creating order:', error);
      throw error;
    }
  },

  getOrders: async (page = 1, limit = 20) => {
    try {
      const response = await apiClient.get('/orders', {
        params: { page, limit },
      });
      return response;
    } catch (error) {
      console.error('Error fetching orders:', error);
      throw error;
    }
  },

  getOrderById: async (id) => {
    try {
      const response = await apiClient.get(`/orders/${id}`);
      return response;
    } catch (error) {
      console.error('Error fetching order details:', error);
      throw error;
    }
  },
};
