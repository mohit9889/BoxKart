import Link from 'next/link';
import Icon from '@/components/common/Icon';

const PRODUCT_LINKS = [
  { label: 'Corrugated Boxes', href: '/products?category=corrugated-boxes' },
  { label: 'Courier Packaging', href: '/products?category=courier-packaging' },
  { label: 'Protection Materials', href: '/products?category=protection' },
  { label: 'Sealing & Labels', href: '/products?category=sealing' },
  { label: 'Branding Materials', href: '/products?category=branding' },
  { label: 'Packaging Bundles', href: '/#bundles' },
];

const COMPANY_LINKS = [
  { label: 'About Us', href: '/about' },
  { label: 'Contact Us', href: '/contact' },
  { label: 'Bulk Orders', href: '/bulk-orders' },
  { label: 'Custom Packaging', href: '/custom-packaging' },
];

const SUPPORT_LINKS = [
  { label: 'Help Centre / FAQ', href: '/faq' },
  { label: 'Shipping Policy', href: '/shipping-policy' },
  { label: 'Returns & Refunds', href: '/refund-policy' },
  { label: 'Terms of Service', href: '/terms' },
  { label: 'Privacy Policy', href: '/privacy' },
];

/**
 * Site footer with navigation links and contact information.
 * All links point to real routes (no placeholder #).
 */
export default function Footer() {
  return (
    <footer className="bg-charcoal text-white" role="contentinfo">
      <div className="container-bk py-16">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div>
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center">
                <Icon name="Package" size={18} className="text-kraft-light" />
              </div>
              <span className="text-xl font-bold">
                Box<span className="text-kraft-light">Kart</span>
              </span>
            </Link>
            <p className="text-sm text-white/60 leading-relaxed mb-6">
              Packaging made simple for your business. Boxes, mailers &
              packaging supplies for growing e-commerce businesses.
            </p>
            <div className="space-y-2">
              <a
                href="mailto:hello@boxkart.in"
                className="flex items-center gap-2 text-sm text-white/60 hover:text-white transition-colors"
              >
                <Icon name="Mail" size={14} />
                hello@boxkart.in
              </a>
              <a
                href="tel:+919876543210"
                className="flex items-center gap-2 text-sm text-white/60 hover:text-white transition-colors"
              >
                <Icon name="Phone" size={14} />
                +91 98765 43210
              </a>
              <p className="flex items-start gap-2 text-sm text-white/60">
                <Icon name="MapPin" size={14} className="shrink-0 mt-0.5" />
                Mumbai, Maharashtra, India
              </p>
            </div>
          </div>

          {/* Products */}
          <div>
            <h3 className="text-overline text-white/40 mb-4">Products</h3>
            <ul className="space-y-2.5">
              {PRODUCT_LINKS.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/60 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-overline text-white/40 mb-4">Company</h3>
            <ul className="space-y-2.5">
              {COMPANY_LINKS.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/60 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-overline text-white/40 mb-4">Support</h3>
            <ul className="space-y-2.5">
              {SUPPORT_LINKS.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/60 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-white/10 mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/40">
            © 2025 BoxKart. All rights reserved.
          </p>
          <p className="text-xs text-white/40">
            Made with ❤️ in India for Indian e-commerce sellers
          </p>
        </div>
      </div>
    </footer>
  );
}
