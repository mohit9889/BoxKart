import { apiClient } from './client';

export const authApi = {
  /**
   * Fetches the CSRF token from the backend.
   * @returns {Promise<{ csrfToken: string }>}
   */
  async fetchCsrfToken() {
    const response = await apiClient.get('/auth/csrf-token');
    return response.data;
  },

  /**
   * Logs in a user.
   * @param {string} email
   * @param {string} password
   * @returns {Promise<any>}
   */
  async login(email, password) {
    const response = await apiClient.post('/auth/login', { email, password });
    return response.data;
  },

  /**
   * Signs up a new user.
   * @param {Object} data - { firstName, lastName, email, password }
   * @returns {Promise<any>}
   */
  async signup(data) {
    const response = await apiClient.post('/auth/signup', data);
    return response.data;
  },

  /**
   * Logs out the current user by clearing cookies on the backend.
   * @returns {Promise<void>}
   */
  async logout() {
    await apiClient.post('/auth/logout');
  },

  async forgotPassword(data) {
    return apiClient.post('/auth/forgot-password', data);
  },

  async resetPassword(data) {
    return apiClient.post('/auth/reset-password', data);
  },

  async updatePassword(data) {
    return apiClient.post('/auth/update-password', data);
  },

  /**
   * Gets the currently authenticated user's profile.
   * @returns {Promise<any>}
   */
  async getCurrentUser() {
    const response = await apiClient.get('/auth/me');
    return response.data;
  },

  /**
   * Updates the currently authenticated user's profile.
   * @param {Object} data - profile data (firstName, lastName, phone, company, gstin)
   * @returns {Promise<any>}
   */
  async updateProfile(data) {
    const response = await apiClient.put('/auth/profile', data);
    return response.data;
  },

  /**
   * Attempts to refresh the authentication session using the refresh token cookie.
   * @returns {Promise<void>}
   */
  async refreshSession() {
    await apiClient.post('/auth/refresh');
  },
};
