import LegalLayout from '@/components/common/LegalLayout';

export const metadata = {
  title: 'Refund Policy | BoxKart',
  description:
    'Learn about BoxKart returns and refund policies for packaging materials.',
};

export default function RefundPolicyPage() {
  return (
    <LegalLayout title="Refund Policy" lastUpdated="August 10, 2026">
      <h2>1. General Return Policy</h2>
      <p>
        Due to the bulky nature of corrugated boxes and packaging materials, we
        generally do not accept returns for &quot;change of mind&quot; or
        ordering the incorrect size. We strongly encourage all customers to
        double-check dimensions and specifications before placing an order.
      </p>

      <h2>2. Damaged or Defective Items</h2>
      <p>
        If you receive boxes that are damaged during transit or suffer from
        manufacturing defects (e.g., incorrect ply, poor gluing, or misaligned
        printing), you are eligible for a replacement or a full refund.
      </p>
      <ul>
        <li>
          You must report the issue within <strong>48 hours</strong> of
          delivery.
        </li>
        <li>
          Please provide clear photographs of the damaged products and the
          shipping label to <strong>support@boxkart.com</strong>.
        </li>
      </ul>

      <h2>3. Custom Packaging Returns</h2>
      <p>
        Custom-printed or custom-sized boxes are manufactured specifically for
        your business. As such,{' '}
        <strong>custom orders are strictly non-refundable</strong> unless there
        is a clear manufacturing defect that deviates from the approved proof.
      </p>

      <h2>4. Refund Processing</h2>
      <p>
        Once a return or defect claim is approved, refunds will be processed to
        the original method of payment within{' '}
        <strong>5 to 7 business days</strong>. If a replacement is requested, we
        will prioritize manufacturing and dispatching the replacement items at
        no additional cost to you.
      </p>
    </LegalLayout>
  );
}
