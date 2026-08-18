import { apiClient } from './client';

export const cartApi = {
  getCart: async () => {
    try {
      const response = await apiClient.get('/cart');
      return response;
    } catch (error) {
      console.error('Error fetching cart:', error);
      throw error;
    }
  },

  addItem: async (productId, quantity) => {
    try {
      const response = await apiClient.post('/cart/items', {
        productId,
        quantity,
      });
      return response;
    } catch (error) {
      console.error('Error adding item to cart:', error);
      throw error;
    }
  },

  updateItem: async (itemId, quantity) => {
    try {
      const response = await apiClient.patch(`/cart/items/${itemId}`, {
        quantity,
      });
      return response;
    } catch (error) {
      console.error('Error updating cart item:', error);
      throw error;
    }
  },

  removeItem: async (itemId) => {
    try {
      const response = await apiClient.delete(`/cart/items/${itemId}`);
      return response;
    } catch (error) {
      console.error('Error removing item from cart:', error);
      throw error;
    }
  },

  clearCart: async () => {
    try {
      const response = await apiClient.delete('/cart');
      return response;
    } catch (error) {
      console.error('Error clearing cart:', error);
      throw error;
    }
  },
};
