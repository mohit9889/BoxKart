import Link from 'next/link';
import Icon from '@/components/common/Icon';
import BulkOrdersTabs from '@/components/bulk-orders/BulkOrdersTabs';

export const metadata = {
  title: 'Bulk Orders & Wholesale Packaging | BoxKart',
  description:
    'Get volume pricing on custom and standard packaging. Streamlined RFQ and bulk upload process for B2B buyers.',
};

const VALUE_PROPS = [
  {
    icon: 'Users',
    title: 'Dedicated Account Manager',
    description: 'A packaging expert assigned to your business.',
  },
  {
    icon: 'Ruler',
    title: 'Custom Sizing',
    description: 'Boxes made to your exact dimensions.',
  },
  {
    icon: 'TrendingDown',
    title: 'Volume Pricing',
    description: 'Better rates as your order quantity grows.',
  },
  {
    icon: 'Zap',
    title: 'Flexible MOQ',
    description: 'Bulk starts at just 500 units.',
  },
];

export default function BulkOrdersPage() {
  return (
    <>
      {/* ── Hero ── */}
      <section className="bg-gradient-to-br from-charcoal to-charcoal-light text-white">
        <div className="container-bk py-12 md:py-16">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="flex items-center gap-2 text-sm text-white/50">
              <li>
                <Link
                  href="/"
                  className="hover:text-white/80 transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <Icon name="ChevronRight" size={14} />
              </li>
              <li className="text-white/90 font-medium">Bulk Orders</li>
            </ol>
          </nav>

          <div className="max-w-2xl">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 leading-tight">
              Bulk Packaging for Your Business
            </h1>
            <p className="text-white/70 text-lg leading-relaxed mb-6">
              Get volume pricing on custom and standard packaging. Share your
              requirements and our team will prepare a detailed quote within 24
              hours.
            </p>
          </div>

          {/* Value Props */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mt-8">
            {VALUE_PROPS.map((vp) => (
              <div
                key={vp.title}
                className="bg-white/5 rounded-xl p-4 border border-white/10"
              >
                <Icon
                  name={vp.icon}
                  size={20}
                  className="text-kraft-light mb-2"
                />
                <p className="font-semibold text-white text-sm mb-0.5">
                  {vp.title}
                </p>
                <p className="text-xs text-white/50 leading-relaxed">
                  {vp.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Tabs + Form ── */}
      <BulkOrdersTabs />

      {/* ── How It Works ── */}
      <section className="bg-warm-gray">
        <div className="container-bk section-padding">
          <div className="text-center mb-10">
            <h2 className="heading-2 mb-3">How Bulk Orders Work</h2>
            <p className="text-body max-w-lg mx-auto">
              From request to delivery — a streamlined process designed for
              business buyers.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {[
              {
                step: '01',
                title: 'Share Requirements',
                desc: 'Fill out the quote form or upload your product list.',
                icon: 'FileText',
              },
              {
                step: '02',
                title: 'Get Your Quote',
                desc: 'Our team reviews and shares pricing within 24 hours.',
                icon: 'Clock',
              },
              {
                step: '03',
                title: 'Confirm Order',
                desc: 'Approve the quote and confirm payment terms.',
                icon: 'CheckCircle',
              },
              {
                step: '04',
                title: 'Receive Packaging',
                desc: 'We manufacture and deliver to your doorstep.',
                icon: 'Truck',
              },
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="w-14 h-14 bg-white rounded-2xl shadow-sm flex items-center justify-center mx-auto mb-4">
                  <Icon name={item.icon} size={24} className="text-kraft" />
                </div>
                <p className="text-xs font-bold text-kraft mb-1 tracking-wider">
                  STEP {item.step}
                </p>
                <h3 className="font-semibold text-charcoal mb-1 text-sm">
                  {item.title}
                </h3>
                <p className="text-xs text-text-secondary leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Contact CTA ── */}
      <section className="section-padding">
        <div className="container-bk text-center max-w-xl mx-auto">
          <div>
            <h2 className="heading-3 mb-3">Need Help with Your Order?</h2>
            <p className="text-body mb-6">
              Our packaging experts are ready to help you find the right
              solution for your business.
            </p>
            <div className="flex justify-center gap-3 flex-wrap">
              <Link href="/contact" className="btn-primary">
                <Icon name="Phone" size={16} className="mr-1" />
                Talk to Expert
              </Link>
              <Link href="/products" className="btn-outline">
                Browse Products
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
