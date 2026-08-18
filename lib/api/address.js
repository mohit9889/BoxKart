import { apiClient } from './client';

export const addressApi = {
  /**
   * Get all saved addresses for the current user
   */
  getAddresses: async () => {
    return apiClient.get('/addresses');
  },

  /**
   * Add a new address
   * @param {Object} addressData
   */
  addAddress: async (addressData) => {
    return apiClient.post('/addresses', addressData);
  },

  /**
   * Delete an address
   * @param {string} id
   */
  deleteAddress: async (id) => {
    return apiClient.delete(`/addresses/${id}`);
  },

  /**
   * Update an address
   * @param {string} id
   * @param {Object} addressData
   */
  updateAddress: async (id, addressData) => {
    return apiClient.put(`/addresses/${id}`, addressData);
  },
};
