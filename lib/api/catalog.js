import { apiClient } from './client';

/**
 * Converts a dimension value to inches for frontend filtering logic.
 */
function toInches(value, unit) {
  if (!value) return 0;
  const num = parseFloat(value);
  switch (unit) {
    case 'MM':
      return num / 25.4;
    case 'CM':
      return num / 2.54;
    case 'INCH':
      return num;
    default:
      return num;
  }
}

/**
 * Maps the backend product model to the structure expected by the frontend components.
 */
export const mapProductFromApi = (product) => {
  if (!product) return null;

  const spec = product.boxSpecification || {};

  let dimensions = 'N/A';
  let length = 0,
    width = 0,
    height = 0;

  if (spec.internalLength) {
    length = toInches(spec.internalLength, spec.dimensionUnit);
    width = toInches(spec.internalWidth, spec.dimensionUnit);
    height = toInches(spec.internalHeight, spec.dimensionUnit);

    const unitStr =
      spec.dimensionUnit === 'INCH' ? '"' : spec.dimensionUnit.toLowerCase();
    dimensions = `${spec.internalLength} × ${spec.internalWidth} × ${spec.internalHeight} ${unitStr}`;
  } else if (product.productType === 'COURIER_BAG' && spec.internalLength) {
    dimensions = `${spec.internalLength} × ${spec.internalWidth} ${spec.dimensionUnit === 'INCH' ? '"' : spec.dimensionUnit.toLowerCase()}`;
  }

  // Map backend images or use placeholder based on product type
  let image = '/images/box-standard.svg';
  if (product.images && product.images.length > 0) {
    image = product.images[0].url;
  } else {
    // Fallbacks if no image provided by BE
    if (product.productType === 'COURIER_BAG')
      image = '/images/courier-bag-m.svg';
    if (product.productType === 'TAPE') image = '/images/brown-tape.svg';
    if (product.productType === 'MAILER') image = '/images/bubble-mailer.svg';
  }

  return {
    id: product.id,
    name: product.name,
    slug: product.slug,
    category: product.category?.slug || 'corrugated-boxes',
    dimensions,
    length,
    width,
    height,
    unit: 'inch', // Normalized for FE size filters
    ply: spec.ply || 'N/A',
    material: spec.paperType || 'Standard',
    color: spec.boardColor || 'Brown Kraft',
    useCases: product.useCases || [],
    notRecommendedFor: product.notRecommendedFor || [],
    moq: product.moq || 100,
    pricingTiers: (product.priceTiers || []).map((t) => ({
      qty: t.minimumQuantity,
      price: t.unitPriceMinor / 100,
    })),
    stockStatus:
      product.inventory?.status === 'IN_STOCK' ? 'In Stock' : 'Made to Order',
    deliveryEstimate: product.supplier?.leadTimeDays
      ? `${product.supplier.leadTimeDays - 1}–${product.supplier.leadTimeDays + 1} business days`
      : '3–5 business days',
    weightCapacity: spec.burstingStrength
      ? `${spec.burstingStrength} kg`
      : '5 kg',
    image,
    description: product.description,
  };
};

export const catalogApi = {
  /**
   * Get products with optional filters (category, ply, q, sort, size, page, limit)
   */
  getProducts: async (params) => {
    const query = new URLSearchParams(params).toString();
    const endpoint = query ? `/products?${query}` : '/products';
    const response = await apiClient.get(endpoint);
    return {
      ...response,
      data: (response?.data || []).map(mapProductFromApi),
    };
  },

  /**
   * Get a single product by slug
   */
  getProductBySlug: async (slug) => {
    const response = await apiClient.get(`/products/${slug}`);
    return {
      ...response,
      data: mapProductFromApi(response.data),
    };
  },

  /**
   * Get all categories
   */
  getCategories: async () => {
    return apiClient.get('/catalog/categories');
  },
};
