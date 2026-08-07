/**
 * Client-side search utility for BoxKart products.
 */

import { products } from '@/data/products';
import { categories } from '@/data/categories';

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
 */
export function getSearchSuggestions(query) {
  if (!query || query.trim().length < 2) return [];

  const lower = query.toLowerCase().trim();
  const suggestions = new Set();

  // Check suggestion map
  for (const [key, values] of Object.entries(SUGGESTION_MAP)) {
    if (key.includes(lower) || lower.includes(key)) {
      values.forEach((v) => suggestions.add(v));
    }
  }

  // Check product names
  products.forEach((p) => {
    if (p.name.toLowerCase().includes(lower)) {
      suggestions.add(p.name);
    }
  });

  // Check categories
  categories.forEach((c) => {
    if (c.name.toLowerCase().includes(lower)) {
      suggestions.add(c.name);
    }
  });

  // Check dimensions patterns like "10x8x4"
  const dimPattern = lower.replace(/\s/g, '').replace(/x/g, '×');
  products.forEach((p) => {
    const dims = p.dimensions.toLowerCase().replace(/\s/g, '');
    if (dims.includes(dimPattern) || dims.includes(lower.replace(/\s/g, ''))) {
      suggestions.add(p.name);
    }
  });

  return Array.from(suggestions).slice(0, 6);
}

/**
 * Search products by query.
 */
export function searchProducts(query) {
  if (!query || query.trim().length < 2) return [];

  const lower = query.toLowerCase().trim();
  const dimPattern = lower.replace(/\s/g, '').replace(/x/g, '×');

  return products
    .map((product) => {
      let score = 0;

      // Name match (highest weight)
      if (product.name.toLowerCase().includes(lower)) score += 10;

      // Category match
      if (product.category.toLowerCase().includes(lower)) score += 5;

      // Dimension match
      const dims = product.dimensions.toLowerCase().replace(/\s/g, '');
      if (dims.includes(dimPattern)) score += 8;

      // Use case match
      product.useCases.forEach((uc) => {
        if (uc.toLowerCase().includes(lower)) score += 3;
      });

      // Material/ply match
      if (product.material.toLowerCase().includes(lower)) score += 4;
      if (product.ply.toLowerCase().includes(lower)) score += 4;

      // Description match
      if (product.description.toLowerCase().includes(lower)) score += 2;

      return { ...product, score };
    })
    .filter((p) => p.score > 0)
    .sort((a, b) => b.score - a.score);
}
