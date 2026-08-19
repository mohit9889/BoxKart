/**
 * Server-side API client for BoxKart.
 * Used in Server Components for SSR data fetching.
 *
 * Uses plain fetch() — no external dependencies needed in Next.js.
 * All functions return empty arrays/null on error for graceful degradation.
 */

const API_BASE_URL =
  process.env.API_BASE_URL ||
  process.env.NEXT_PUBLIC_API_BASE_URL ||
  'http://localhost:3005/api/v1';

/**
 * Base fetch wrapper with error handling and JSON parsing.
 * @param {string} path - API path (e.g., '/categories')
 * @param {object} [options] - fetch options + custom { revalidate } for ISR
 * @returns {Promise<any>} parsed JSON data or null
 */
async function apiFetch(path, options = {}) {
  const { revalidate = 60, ...fetchOptions } = options;

  try {
    const res = await fetch(`${API_BASE_URL}${path}`, {
      ...fetchOptions,
      next: { revalidate },
      headers: {
        'Content-Type': 'application/json',
        ...fetchOptions.headers,
      },
    });

    if (!res.ok) {
      console.error(`[API] ${res.status} ${res.statusText} — ${path}`);
      return null;
    }

    const json = await res.json();
    return json.success ? json : null;
  } catch (error) {
    console.error(`[API] Fetch failed — ${path}:`, error.message);
    return null;
  }
}

/**
 * Fetch all active categories.
 * @returns {Promise<Array>} categories with productCount
 */
export async function fetchCategories() {
  const result = await apiFetch('/categories');
  return result?.data ?? [];
}

/**
 * Fetch popular products (first 8 corrugated boxes).
 * @returns {Promise<Array>} raw BE product objects
 */
export async function fetchPopularProducts() {
  const result = await apiFetch(
    '/products?category=corrugated-boxes&limit=8&sort=popular'
  );
  return result?.data ?? [];
}

/**
 * Fetch a single product by slug.
 * @param {string} slug
 * @returns {Promise<object|null>} raw BE product object
 */
export async function fetchProductBySlug(slug) {
  const result = await apiFetch(`/products/${encodeURIComponent(slug)}`);
  return result?.data ?? null;
}

/**
 * Fetch products with filters.
 * @param {object} params - query params
 * @returns {Promise<{ data: Array, meta: object }>}
 */
export async function fetchProducts(params = {}) {
  const query = new URLSearchParams(params).toString();
  const result = await apiFetch(`/products?${query}`);
  return {
    data: result?.data ?? [],
    meta: result?.meta ?? { total: 0, page: 1, limit: 20, totalPages: 0 },
  };
}

/**
 * Fetch corrugated box products for the bulk pricing section.
 * Picks products that have at least 3 pricing tiers — best for demonstrating
 * volume discount progression.
 * @returns {Promise<Array>} raw BE product objects
 */
export async function fetchBulkPricingProducts() {
  const result = await apiFetch(
    '/products?category=corrugated-boxes&limit=6&sort=popular'
  );
  return result?.data ?? [];
}

/**
 * Fetch all active bundles ordered by sortOrder.
 * @returns {Promise<Array>} bundle objects from the DB
 */
export async function fetchBundles() {
  const result = await apiFetch('/bundles', { revalidate: 300 });
  return result?.data ?? [];
}
