import { normalizeApiError } from './error';

/**
 * Resolves the API base URL depending on the environment.
 * Works across Server and Client Components.
 */
function getBaseUrl() {
  if (typeof process !== 'undefined' && process.env.NEXT_PUBLIC_API_BASE_URL) {
    return process.env.NEXT_PUBLIC_API_BASE_URL;
  }
  // Fallback if environment variable is missing (mostly for client-side without NEXT_PUBLIC_)
  return 'http://localhost:3005/api/v1';
}

/**
 * Central API client wrapping native fetch.
 *
 * @param {string} endpoint - The API endpoint (e.g., '/auth/login'). Should start with a slash.
 * @param {RequestInit} options - Standard fetch options.
 * @returns {Promise<any>}
 */
export async function apiClient(endpoint, options = {}) {
  const baseUrl = getBaseUrl();
  // Ensure the endpoint starts with a slash
  const path = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
  const url = `${baseUrl}${path}`;

  const defaultHeaders = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  };

  const config = {
    ...options,
    headers: {
      ...defaultHeaders,
      ...options.headers,
    },
    // We agreed to Option B: backend HTTP-only cookies
    // This ensures cookies are sent for cross-origin requests
    credentials: options.credentials || 'include',
  };

  // Stringify the body if it's an object and not FormData
  if (
    config.body &&
    typeof config.body === 'object' &&
    !(config.body instanceof FormData)
  ) {
    config.body = JSON.stringify(config.body);
  }

  try {
    const response = await fetch(url, config);

    if (!response.ok) {
      const apiError = await normalizeApiError(response);
      throw apiError;
    }

    // Check for 204 No Content
    if (response.status === 204) {
      return null;
    }

    // Try parsing as JSON, fallback to text if parsing fails but request succeeded
    try {
      const data = await response.json();
      return data;
    } catch (e) {
      return await response.text();
    }
  } catch (error) {
    // If it's already an ApiError, re-throw it so caller can handle it gracefully
    if (error.name === 'ApiError') {
      throw error;
    }

    // Network errors (fetch failed entirely, CORS, timeout)
    throw {
      name: 'NetworkError',
      message:
        error.message ||
        'A network error occurred. Please check your connection.',
      code: 'NETWORK_ERROR',
      status: 0,
      originalError: error,
    };
  }
}

// Convenience methods for common HTTP verbs
apiClient.get = (endpoint, options = {}) =>
  apiClient(endpoint, { ...options, method: 'GET' });
apiClient.post = (endpoint, body, options = {}) =>
  apiClient(endpoint, { ...options, method: 'POST', body });
apiClient.put = (endpoint, body, options = {}) =>
  apiClient(endpoint, { ...options, method: 'PUT', body });
apiClient.patch = (endpoint, body, options = {}) =>
  apiClient(endpoint, { ...options, method: 'PATCH', body });
apiClient.delete = (endpoint, options = {}) =>
  apiClient(endpoint, { ...options, method: 'DELETE' });
