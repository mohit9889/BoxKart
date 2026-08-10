// Mock Admin Auth Service

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const adminAuthService = {
  login: async (email, password) => {
    await delay(800);
    if (email === 'admin@boxkart.in' && password === 'admin123') {
      if (typeof window !== 'undefined') {
        localStorage.setItem('admin_token', 'mock_admin_jwt_token_123');
      }
      return { success: true, user: { name: 'Admin', role: 'admin' } };
    }
    throw new Error('Invalid admin credentials');
  },

  logout: async () => {
    await delay(300);
    if (typeof window !== 'undefined') {
      localStorage.removeItem('admin_token');
    }
    return { success: true };
  },

  isAuthenticated: () => {
    if (typeof window !== 'undefined') {
      return !!localStorage.getItem('admin_token');
    }
    return false;
  },
};
