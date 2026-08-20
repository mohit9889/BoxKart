import CartClient from '@/components/cart/CartClient';

export const metadata = {
  title: 'Your Cart | BoxKart',
  description: 'Review your BoxKart packaging items before checkout.',
};

export default function CartPage() {
  return <CartClient />;
}
