import FAQ from '@/components/home/FAQ';
import Link from 'next/link';

export const metadata = {
  title: 'Frequently Asked Questions | BoxKart',
  description:
    'Find answers to common questions about BoxKart packaging, shipping, and bulk orders.',
};

export default function FAQPage() {
  return (
    <div className="min-h-screen bg-[#faf8f5] pt-24 pb-16">
      <div className="container-bk max-w-4xl mx-auto mb-12 text-center">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-[var(--color-charcoal)] mb-4">
          Frequently Asked Questions
        </h1>
        <p className="text-lg text-[var(--color-text-secondary)]">
          Everything you need to know about our products, shipping, and bulk
          pricing.
        </p>
      </div>

      <FAQ hideTitle={true} />

      <div className="container-bk max-w-3xl mx-auto mt-16 text-center bg-white p-8 md:p-12 rounded-3xl border border-[#e8e4de] shadow-sm">
        <h3 className="text-2xl font-bold text-[var(--color-charcoal)] mb-4">
          Still have questions?
        </h3>
        <p className="text-[var(--color-text-secondary)] mb-8">
          Can&apos;t find the answer you&apos;re looking for? Please chat to our
          friendly team.
        </p>
        <Link href="/contact" className="inline-flex btn-primary">
          Get in Touch
        </Link>
      </div>
    </div>
  );
}
