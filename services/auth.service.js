/**
 * Mock Authentication Service
 *
 * Replace these methods with real API calls (e.g., fetch/axios) when the backend is ready.
 * The current implementation uses localStorage and delays to simulate network requests.
 */

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const authService = {
  /**
   * Log in a user
   * @param {string} email
   * @param {string} password
   * @returns {Promise<Object>} user data
   */
  async login(email, password) {
    await delay(1500); // Simulate network latency

    // Basic mock validation
    if (!email || !password) {
      throw new Error('Email and password are required');
    }

    // Mock successful login response
    const mockUser = {
      id: 'usr_' + Math.random().toString(36).substr(2, 9),
      email: email,
      name: email.split('@')[0], // derived name for mock
      role: 'customer',
    };

    // Store auth state
    localStorage.setItem('isAuthenticated', 'true');
    localStorage.setItem('user', JSON.stringify(mockUser));

    return mockUser;
  },

  /**
   * Register a new user
   * @param {string} name
   * @param {string} email
   * @param {string} password
   * @returns {Promise<Object>} user data
   */
  async signup(name, email, password) {
    await delay(1500);

    if (!name || !email || !password) {
      throw new Error('All fields are required');
    }

    const mockUser = {
      id: 'usr_' + Math.random().toString(36).substr(2, 9),
      email: email,
      name: name,
      role: 'customer',
    };

    localStorage.setItem('isAuthenticated', 'true');
    localStorage.setItem('user', JSON.stringify(mockUser));

    return mockUser;
  },

  /**
   * Log out the current user
   */
  async logout() {
    await delay(500);
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('user');
  },

  /**
   * Check if a user is currently authenticated
   * @returns {boolean}
   */
  isAuthenticated() {
    if (typeof window === 'undefined') return false;
    return localStorage.getItem('isAuthenticated') === 'true';
  },

  /**
   * Get the current user data
   * @returns {Object|null}
   */
  getCurrentUser() {
    if (typeof window === 'undefined') return null;
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  },
};
