/**
 * Admin service for Guest Inquiries.
 * Calls the real BE API (authenticated via admin JWT stored in cookie).
 */

const API_BASE =
  process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3005/api/v1';

/** Helper to get cookies as a string (for server-side calls) */
async function adminFetch(path, options = {}) {
  const res = await fetch(`${API_BASE}/admin${path}`, {
    ...options,
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers ?? {}),
    },
  });
  const json = await res.json();
  if (!res.ok || !json.success) {
    throw new Error(json.error?.message || `Request failed: ${res.status}`);
  }
  return json;
}

export const adminInquiryService = {
  /**
   * List all guest inquiries.
   * @param {{ page?: number, limit?: number, status?: string }} opts
   */
  getInquiries: async ({ page = 1, limit = 20, status } = {}) => {
    const params = new URLSearchParams({ page, limit });
    if (status && status !== 'ALL') params.set('status', status);
    const json = await adminFetch(`/guest-inquiries?${params}`);
    return { data: json.data ?? [], meta: json.meta ?? {} };
  },

  /**
   * Get a single guest inquiry by ID.
   * @param {string} id
   */
  getInquiry: async (id) => {
    const json = await adminFetch(`/guest-inquiries/${id}`);
    return json.data;
  },

  /**
   * Update the status of a guest inquiry.
   * @param {string} id
   * @param {'NEW'|'CONTACTED'|'CLOSED'} status
   */
  updateStatus: async (id, status) => {
    const json = await adminFetch(`/guest-inquiries/${id}/status`, {
      method: 'PATCH',
      body: JSON.stringify({ status }),
    });
    return json.data;
  },
};
