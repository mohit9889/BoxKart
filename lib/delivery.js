/**
 * Delivery estimation and shipping cost calculation engine.
 * Zone-based logic for North India MVP.
 */

/**
 * Calculate shipping cost and estimated delivery for a given pincode.
 * @param {Object} params
 * @param {string} params.pincode - 6-digit Indian pincode
 * @param {Object} params.product - Product object with length, width, height (inches)
 * @param {number} params.quantity - Number of boxes ordered
 * @returns {{ estimatedDays: string, shippingCost: number } | { error: string }}
 */
export function calculateShipping({ pincode, product, quantity }) {
  const code = String(pincode).trim();

  if (!/^[1-9][0-9]{5}$/.test(code)) {
    return { error: 'Please enter a valid 6-digit Indian pincode.' };
  }

  const isDelhi = code.startsWith('11');
  const isNorthIndia = /^(12|13|14|15|16|20|21|22|23|24|25|26|27|28)/.test(
    code
  );

  let baseRatePerKg;
  let estimatedDays;

  if (isDelhi) {
    baseRatePerKg = 5;
    estimatedDays = '1–2 business days';
  } else if (isNorthIndia) {
    baseRatePerKg = 12;
    estimatedDays = '3–4 business days';
  } else {
    baseRatePerKg = 25;
    estimatedDays = '5–7 business days';
  }

  // Calculate volumetric weight (L × W × H in cm / 5000)
  const lCm = (product.length || 10) * 2.54;
  const wCm = (product.width || 8) * 2.54;
  const hCm = (product.height || 4) * 2.54;

  const volumetricWeightPerBox = (lCm * wCm * hCm) / 5000;

  // Boxes ship flat — roughly 20% of assembled volumetric weight
  const foldedWeightPerBox = volumetricWeightPerBox * 0.2;
  const totalWeight = foldedWeightPerBox * quantity;

  let shippingCost = totalWeight * baseRatePerKg;

  // Bulk logistics discounts
  if (totalWeight > 500) {
    shippingCost *= 0.6;
  } else if (totalWeight > 100) {
    shippingCost *= 0.8;
  }

  return {
    estimatedDays,
    shippingCost: Number(Math.max(shippingCost, 100).toFixed(2)),
  };
}
