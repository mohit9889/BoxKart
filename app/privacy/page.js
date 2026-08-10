import LegalLayout from '@/components/common/LegalLayout';

export const metadata = {
  title: 'Privacy Policy | BoxKart',
  description: 'Understand how BoxKart collects and protects your data.',
};

export default function PrivacyPage() {
  return (
    <LegalLayout title="Privacy Policy" lastUpdated="August 10, 2026">
      <h2>1. Information We Collect</h2>
      <p>
        At BoxKart, we prioritize your privacy. We collect the following types
        of information when you use our platform:
      </p>
      <ul>
        <li>
          <strong>Personal Information:</strong> Name, email address, phone
          number, and billing/shipping addresses.
        </li>
        <li>
          <strong>Business Information:</strong> Company name, GSTIN (if
          provided), and RFQ details.
        </li>
        <li>
          <strong>Usage Data:</strong> How you interact with our website,
          browser type, and IP address.
        </li>
      </ul>

      <h2>2. How We Use Your Information</h2>
      <p>We use the collected information to:</p>
      <ul>
        <li>Process and fulfill your orders and RFQs.</li>
        <li>
          Communicate with you regarding order updates, shipping, and support.
        </li>
        <li>Improve our website, product offerings, and user experience.</li>
        <li>Send marketing communications (only if you have opted in).</li>
      </ul>

      <h2>3. Data Security</h2>
      <p>
        We implement robust security measures to protect your personal and
        business data. Your payment information is processed through secure,
        PCI-DSS compliant payment gateways, and we do not store full credit card
        details on our servers.
      </p>

      <h2>4. Sharing of Information</h2>
      <p>
        We do not sell your personal data. We may share necessary information
        with trusted third-party service providers (like shipping partners and
        payment processors) strictly for the purpose of fulfilling our services
        to you.
      </p>

      <h2>5. Contact Us</h2>
      <p>
        If you have any questions about this Privacy Policy or your data, please
        contact us at <strong>privacy@boxkart.com</strong>.
      </p>
    </LegalLayout>
  );
}
