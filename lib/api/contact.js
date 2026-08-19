import { apiClient } from './client';

export const contactApi = {
  /**
   * Submit a new contact message
   * @param {Object} data - Form data containing fullName, email, inquiryType, message, etc.
   */
  submitContactForm: async (data) => {
    return apiClient.post('/contact', data);
  },
};
