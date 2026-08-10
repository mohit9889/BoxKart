import LegalLayout from '@/components/common/LegalLayout';

export const metadata = {
  title: 'Shipping Policy | BoxKart',
  description:
    'Details about BoxKart shipping methods, delivery times, and costs.',
};

export default function ShippingPolicyPage() {
  return (
    <LegalLayout title="Shipping Policy" lastUpdated="August 10, 2026">
      <h2>1. Dispatch and Processing Times</h2>
      <p>
        We know that packaging is critical to your supply chain. We strive to
        dispatch all standard box orders within <strong>24 to 48 hours</strong>{' '}
        of order confirmation.
      </p>
      <p>
        For custom packaging and printed boxes, processing times vary based on
        design approval and production schedules. Typical lead times for custom
        orders range from <strong>5 to 10 business days</strong>.
      </p>

      <h2>2. Delivery Partners and Methods</h2>
      <p>
        We partner with reliable logistics providers to ensure your boxes arrive
        safely and on time. Depending on the volume of your order, shipments may
        be sent via standard courier services or dedicated freight trucks for
        large bulk orders.
      </p>

      <h2>3. Shipping Costs</h2>
      <p>
        Shipping costs are calculated at checkout based on the total volumetric
        weight of your order and the delivery pin code.
      </p>
      <ul>
        <li>
          <strong>Free Shipping:</strong> We occasionally offer free shipping on
          standard boxes for orders exceeding certain volume thresholds within
          metro regions.
        </li>
        <li>
          <strong>Bulk Freight:</strong> For very large orders (e.g., full
          truckloads), we will coordinate directly with you to provide a custom
          freight quote.
        </li>
      </ul>

      <h2>4. Delivery Tracking</h2>
      <p>
        Once your order is dispatched, you will receive a tracking link via
        email and SMS. You can also monitor the status of your shipment directly
        from your BoxKart Account Dashboard.
      </p>

      <h2>5. Delivery Issues</h2>
      <p>
        If you experience any delays or issues with your delivery, please
        contact our support team immediately at{' '}
        <strong>support@boxkart.com</strong>. We will work with our logistics
        partners to resolve the issue as quickly as possible.
      </p>
    </LegalLayout>
  );
}
