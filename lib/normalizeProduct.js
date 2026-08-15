/**
 * Normalizes a BE product object into the shape expected by FE components.
 *
 * FE components (ProductCard, cart, pricing) expect:
 *   { id, name, slug, category, dimensions, length, width, height, unit,
 *     ply, material, color, useCases, moq, pricingTiers: [{qty, price}],
 *     stockStatus, deliveryEstimate, weightCapacity, image, description }
 *
 * BE returns:
 *   { id, name, slug, category: {slug, ...}, dimensions, color, useCases,
 *     moq, priceTiers: [{minimumQuantity, unitPriceMinor}],
 *     boxSpecification: {ply, material, internalLength, ...},
 *     images: [{url, ...}], ... }
 */

/**
 * Transform a single BE product into the FE shape.
 * @param {object} product - Raw BE product from API
 * @returns {object} FE-compatible product
 */
export function normalizeProduct(product) {
  if (!product) return null;

  const spec = product.boxSpecification;

  return {
    // Identity
    id: product.id,
    name: product.name,
    slug: product.slug,
    sku: product.sku,

    // Category — FE expects a string slug, BE returns an object
    category: product.category?.slug ?? product.categoryId ?? '',

    // Dimensions — FE expects top-level, BE has them in boxSpecification
    dimensions: product.dimensions || formatDimensions(spec),
    length: spec
      ? parseFloat(spec.internalLength?.toString?.() ?? spec.internalLength)
      : null,
    width: spec
      ? parseFloat(spec.internalWidth?.toString?.() ?? spec.internalWidth)
      : null,
    height: spec
      ? parseFloat(spec.internalHeight?.toString?.() ?? spec.internalHeight)
      : null,
    unit: spec?.dimensionUnit?.toLowerCase() || 'inch',

    // Specs — FE expects top-level strings
    ply: spec?.ply ? `${spec.ply}-Ply` : 'N/A',
    material: spec?.material || product.shortDescription || '',
    color: product.color || 'Brown Kraft',

    // Metadata
    useCases: product.useCases || [],
    moq: product.moq || 100,
    description: product.description || product.shortDescription || '',
    stockStatus: product.stockStatus || 'In Stock',
    deliveryEstimate: product.deliveryEstimate || '3–5 business days',

    // Weight — FE expects a formatted string like "2 kg"
    weightCapacity: formatWeight(spec),

    // Pricing — FE expects { qty, price } in rupees, BE stores paise
    pricingTiers: (product.priceTiers || [])
      .sort((a, b) => a.minimumQuantity - b.minimumQuantity)
      .map((tier) => ({
        qty: tier.minimumQuantity,
        price: tier.unitPriceMinor / 100,
      })),

    // Image — FE expects a single string URL, BE has an array
    image:
      product.images?.find((img) => img.isPrimary)?.url ||
      product.images?.[0]?.url ||
      '/images/box-medium.svg',

    // Extra fields the FE may use later
    notRecommendedFor: product.notRecommendedFor || [],
    supplier: product.supplier || null,
  };
}

/**
 * Normalize an array of BE products.
 * @param {Array} products - Raw BE products
 * @returns {Array} FE-compatible products
 */
export function normalizeProducts(products) {
  return (products || []).map(normalizeProduct).filter(Boolean);
}

/**
 * Normalize a BE category into the FE shape.
 * BE categories already have: name, slug, description, icon, color.
 * We add productCount from _count if available.
 */
export function normalizeCategory(category) {
  if (!category) return null;

  return {
    id: category.slug,
    name: category.name,
    slug: category.slug,
    description: category.description || '',
    longDescription: category.longDescription || '',
    icon: category.icon || 'Package',
    color: category.color || '#b8860b',
    productCount: category.productCount ?? category._count?.products ?? 0,
  };
}

/**
 * Normalize an array of BE categories.
 */
export function normalizeCategories(categories) {
  return (categories || []).map(normalizeCategory).filter(Boolean);
}

/* ── Helpers ── */

/** Format BoxSpecification dimensions into display string. */
function formatDimensions(spec) {
  if (!spec) return '';
  const l = parseFloat(
    spec.internalLength?.toString?.() ?? spec.internalLength
  );
  const w = parseFloat(spec.internalWidth?.toString?.() ?? spec.internalWidth);
  const h = parseFloat(
    spec.internalHeight?.toString?.() ?? spec.internalHeight
  );
  const unit =
    spec.dimensionUnit === 'INCH'
      ? '"'
      : ` ${spec.dimensionUnit?.toLowerCase() || ''}`;
  return `${l} × ${w} × ${h}${unit}`;
}

/** Format weight capacity from BoxSpecification. */
function formatWeight(spec) {
  if (!spec?.maxRecommendedWeight) return '';
  const weight = parseFloat(
    spec.maxRecommendedWeight.toString?.() ?? spec.maxRecommendedWeight
  );
  const unit = (spec.weightUnit || 'KG').toLowerCase();
  return `${weight} ${unit}`;
}
