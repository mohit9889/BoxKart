/**
 * Client-side search utility for BoxKart products.
 */

import { catalogApi } from './api/catalog';

/**
 * Search suggestions: maps common terms to product-relevant keywords.
 */
const SUGGESTION_MAP = {
  clothing: [
    'Clothing boxes',
    'Garment boxes',
    'Courier bags',
    'Apparel packaging',
  ],
  cosmetics: [
    'Cosmetics boxes',
    'Small shipping boxes',
    'Die-cut mailers',
    'Bubble mailers',
  ],
  electronics: [
    'Electronics boxes',
    '5-Ply heavy duty boxes',
    'Bubble wrap',
    'Foam sheets',
  ],
  books: ['Book mailer boxes', 'Flat shipping boxes'],
  shoes: ['Shoe boxes', 'Large shipping boxes'],
  food: ['Food packaging boxes', 'Corrugated boxes', 'Insulated packaging'],
  box: [
    'Small Shipping Box',
    'Medium Shipping Box',
    'Large Shipping Box',
    'Heavy Duty 5-Ply Box',
  ],
  tape: ['BOPP Tape', 'Brown Packing Tape', 'Custom Printed Tape'],
  courier: ['Courier Bag – Small', 'Courier Bag – Medium', 'Bubble Mailer'],
  mailer: ['Die-Cut Mailer Box', 'Book Mailer Box', 'Bubble Mailer'],
  bubble: ['Bubble Wrap Roll', 'Bubble Mailer'],
  label: ['Thermal Shipping Labels'],
  sticker: ['Brand Logo Stickers'],
  custom: ['Custom Printed Tape', 'Brand Logo Stickers', 'Thank You Cards'],
};

/**
 * Get search suggestions based on a query string.
 * Fetches products from API and combines with local semantic map.
 */
export async function getSearchSuggestions(query) {
  if (!query || query.trim().length < 2) return [];

  const lower = query.toLowerCase().trim();
  const suggestions = new Set();

  // Check suggestion map
  for (const [key, values] of Object.entries(SUGGESTION_MAP)) {
    if (key.includes(lower) || lower.includes(key)) {
      values.forEach((v) => suggestions.add(v));
    }
  }

  try {
    // Fetch top categories
    const catRes = await catalogApi.getCategories();
    const categories = catRes.data || [];
    categories.forEach((c) => {
      if (c.name.toLowerCase().includes(lower)) {
        suggestions.add(c.name);
      }
    });

    // Fetch products
    const prodRes = await catalogApi.getProducts({ q: query, limit: 5 });
    const products = prodRes.data || [];
    products.forEach((p) => {
      suggestions.add(p.name);
    });
  } catch (error) {
    console.error('Failed to fetch suggestions from API:', error);
  }

  return Array.from(suggestions).slice(0, 6);
}

/**
 * Search products by query hitting the backend API.
 */
export async function searchProducts(query) {
  if (!query || query.trim().length < 2) return [];

  try {
    const response = await catalogApi.getProducts({ q: query, limit: 12 });
    return response.data || [];
  } catch (error) {
    console.error('Failed to fetch search products:', error);
    return [];
  }
}
