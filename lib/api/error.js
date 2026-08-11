/**
 * Custom error class for API failures
 */
export class ApiError extends Error {
  constructor(message, status, code, details) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.code = code;
    this.details = details;
  }
}

/**
 * Normalizes HTTP responses into standard ApiError objects.
 * Expects the box-engine standard error format:
 * { success: false, error: { code, message, details } }
 *
 * @param {Response} response
 * @returns {Promise<ApiError>}
 */
export const normalizeApiError = async (response) => {
  let message = 'An unexpected error occurred';
  let code = 'UNKNOWN_ERROR';
  let details = null;

  try {
    const data = await response.json();
    if (data && data.error) {
      message = data.error.message || message;
      code = data.error.code || code;
      details = data.error.details || null;
    } else if (data && data.message) {
      // Fallback if it's a non-standard JSON response
      message = data.message;
    }
  } catch (err) {
    // If parsing JSON fails, we'll try to get text, or just use defaults
    try {
      const text = await response.text();
      if (text) {
        message = text.slice(0, 200); // Limit length of text errors
      }
    } catch (textErr) {
      // Ignore
    }
  }

  // Fallback map based on status codes if no code was provided
  if (code === 'UNKNOWN_ERROR') {
    switch (response.status) {
      case 400:
        code = 'BAD_REQUEST';
        break;
      case 401:
        code = 'UNAUTHORIZED';
        break;
      case 403:
        code = 'FORBIDDEN';
        break;
      case 404:
        code = 'NOT_FOUND';
        break;
      case 409:
        code = 'CONFLICT';
        break;
      case 429:
        code = 'RATE_LIMIT_EXCEEDED';
        break;
      case 500:
        code = 'INTERNAL_SERVER_ERROR';
        break;
      default:
        code = `HTTP_${response.status}`;
    }
  }

  return new ApiError(message, response.status, code, details);
};
