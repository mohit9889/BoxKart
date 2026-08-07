/**
 * Central pricing engine for BoxKart.
 * Provides utility functions for GST breakdown, savings calculation,
 * and upsell prompts based on product pricing tiers.
 */

const GST_RATE = 0.18;

/**
 * Get the detailed price breakdown for a product at a given quantity.
 * Uses the product's existing pricingTiers for the unit price.
 */
export function getProductPrice(product, quantity = 100) {
  if (!product?.pricingTiers?.length) {
    return {
      unitPrice: 0,
      totalPrice: 0,
      gst: 0,
      finalTotal: 0,
      savings: 0,
    };
  }

  // Find the best matching tier (highest qty tier that qty qualifies for)
  const tier = [...product.pricingTiers]
    .sort((a, b) => b.qty - a.qty)
    .find((t) => quantity >= t.qty);

  const unitPrice = tier?.price ?? product.pricingTiers[0].price;
  const basePrice = product.pricingTiers[0].price; // Price at MOQ
  const totalPrice = unitPrice * quantity;
  const gst = totalPrice * GST_RATE;
  const savings = (basePrice - unitPrice) * quantity;

  return {
    unitPrice: Number(unitPrice.toFixed(2)),
    totalPrice: Number(totalPrice.toFixed(2)),
    gst: Number(gst.toFixed(2)),
    finalTotal: Number((totalPrice + gst).toFixed(2)),
    savings: Number(Math.max(0, savings).toFixed(2)),
  };
}

/**
 * Get the "almost unlocked" upsell prompt for a given quantity.
 * Returns null if the user is already at the best tier.
 */
export function getUpsellPrompt(product, currentQty) {
  if (!product?.pricingTiers?.length) return null;

  const sorted = [...product.pricingTiers].sort((a, b) => a.qty - b.qty);
  const nextTier = sorted.find((t) => t.qty > currentQty);

  if (!nextTier) return null;

  const remaining = nextTier.qty - currentQty;
  return {
    remaining,
    nextQty: nextTier.qty,
    nextPrice: nextTier.price,
    message: `Add ${remaining.toLocaleString('en-IN')} more to unlock ₹${nextTier.price.toFixed(2)}/box`,
  };
}
