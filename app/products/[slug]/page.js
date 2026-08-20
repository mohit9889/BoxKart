import { fetchProductBySlug } from '@/lib/api';
import { normalizeProduct } from '@/lib/normalizeProduct';
import ProductDetailClient from '@/components/product/ProductDetailClient';

export async function generateMetadata({ params }) {
  const p = await params;
  const rawProduct = await fetchProductBySlug(p.slug);
  if (!rawProduct) {
    return {
      title: 'Product Not Found | BoxKart',
    };
  }
  const product = normalizeProduct(rawProduct);
  return {
    title: `${product.name} | BoxKart`,
    description:
      product.description ||
      `Buy ${product.name} packaging supplies at BoxKart.`,
  };
}

export default async function ProductDetailPage({ params, searchParams }) {
  const p = await params;
  const sp = await searchParams;

  const rawProduct = await fetchProductBySlug(p.slug);
  const product = rawProduct ? normalizeProduct(rawProduct) : null;

  const qtyParam = parseInt(sp?.qty, 10);
  let initialQty = 100;

  if (
    product &&
    qtyParam &&
    product.pricingTiers?.find((t) => t.qty === qtyParam)
  ) {
    initialQty = qtyParam;
  } else if (product && product.pricingTiers?.length > 0) {
    initialQty = product.pricingTiers[0].qty;
  }

  return <ProductDetailClient product={product} initialQty={initialQty} />;
}
