import Icon from '@/components/common/Icon';
/**
 * Product categories for BoxKart.
 */

export const categories = [
  {
    id: 'corrugated-boxes',
    name: 'Corrugated Boxes',
    slug: 'corrugated-boxes',
    description: 'Shipping boxes, mailer boxes, book boxes, die-cut boxes.',
    longDescription:
      'High-quality corrugated cardboard boxes in all sizes. Available in 3-ply and 5-ply for light to heavy shipments.',
    icon: 'Package',
    color: '#b8860b',
    productCount: 10,
  },
  {
    id: 'courier-packaging',
    name: 'Courier Packaging',
    slug: 'courier-packaging',
    description: 'Courier bags, poly mailers, bubble mailers.',
    longDescription:
      'Tamper-proof courier bags and padded mailers for lightweight shipments. Water-resistant and cost-effective.',
    icon: 'Truck',
    color: '#3b82f6',
    productCount: 3,
  },
  {
    id: 'protection',
    name: 'Protection',
    slug: 'protection',
    description: 'Bubble wrap, foam, paper cushioning.',
    longDescription:
      'Cushioning and protective materials to keep products safe during transit. From bubble wrap to eco-friendly alternatives.',
    icon: 'Shield',
    color: '#16a34a',
    productCount: 3,
  },
  {
    id: 'sealing',
    name: 'Sealing',
    slug: 'sealing',
    description: 'BOPP tape, brown tape, printed tape, labels.',
    longDescription:
      'Industrial-grade packing tapes and thermal shipping labels. Everything you need to seal and label your packages.',
    icon: 'Lock',
    color: '#f59e0b',
    productCount: 3,
  },
  {
    id: 'branding',
    name: 'Branding',
    slug: 'branding',
    description: 'Stickers, inserts, thank-you cards, printed packaging.',
    longDescription:
      'Brand-building packaging materials including custom stickers, thank-you cards, and printed tape.',
    icon: 'Palette',
    color: '#8b5cf6',
    productCount: 3,
  },
];

/**
 * Get a category by slug.
 */
export function getCategoryBySlug(slug) {
  return categories.find((c) => c.slug === slug);
}
