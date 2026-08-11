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

  /**
   * Gets the currently authenticated user's profile.
   * @returns {Promise<any>}
   */
  async getCurrentUser() {
    const response = await apiClient.get('/auth/me');
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
