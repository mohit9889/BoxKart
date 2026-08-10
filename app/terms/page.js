import LegalLayout from '@/components/common/LegalLayout';

export const metadata = {
  title: 'Terms of Service | BoxKart',
  description: 'Read the terms and conditions for using BoxKart services.',
};

export default function TermsPage() {
  return (
    <LegalLayout title="Terms of Service" lastUpdated="August 10, 2026">
      <h2>1. Introduction</h2>
      <p>
        Welcome to BoxKart. By accessing our website, purchasing our products,
        or using our services, you agree to be bound by these Terms of Service.
        Please read them carefully.
      </p>

      <h2>2. Products and Orders</h2>
      <p>
        BoxKart specializes in B2B corrugated packaging. All orders are subject
        to acceptance and availability. We reserve the right to cancel any order
        if the requested products are out of stock or if there are issues with
        the provided payment or delivery details.
      </p>
      <ul>
        <li>
          <strong>Minimum Order Quantities (MOQ):</strong> Many of our products
          have specific MOQs which must be met for checkout.
        </li>
        <li>
          <strong>Custom Packaging:</strong> Custom orders require approval of
          artwork and dimensions before production begins.
        </li>
      </ul>

      <h2>3. Pricing and Payments</h2>
      <p>
        Prices are listed in INR and are exclusive of applicable taxes and
        shipping unless otherwise stated. Payment must be made in full prior to
        dispatch, except for pre-approved corporate accounts with Net-30 terms.
      </p>

      <h2>4. Limitation of Liability</h2>
      <p>
        BoxKart shall not be liable for any indirect, incidental, or
        consequential damages resulting from the use of our packaging products.
        It is the buyer&apos;s responsibility to ensure the packaging meets
        their specific requirements and industry standards.
      </p>

      <h2>5. Changes to Terms</h2>
      <p>
        We may update these terms occasionally. We will notify users of
        significant changes by updating the &quot;Last updated&quot; date on
        this page.
      </p>
    </LegalLayout>
  );
}
