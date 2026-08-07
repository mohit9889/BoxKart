'use client';

import { motion } from 'motion/react';
import Link from 'next/link';
import { Package } from 'lucide-react';

const SIZES = [
  {
    label: 'Small',
    desc: 'Up to 8 × 6 × 4"',
    subtitle: 'Cosmetics, jewellery, accessories',
    filter: 'small',
    gradient: 'from-amber-50 to-amber-100/50',
    boxSize: 'w-10 h-8',
  },
  {
    label: 'Medium',
    desc: 'Up to 12 × 10 × 6"',
    subtitle: 'Clothing, shoes, electronics',
    filter: 'medium',
    gradient: 'from-orange-50 to-orange-100/50',
    boxSize: 'w-14 h-11',
  },
  {
    label: 'Large',
    desc: '12 × 10 × 8" and above',
    subtitle: 'Appliances, bulk items',
    filter: 'large',
    gradient: 'from-yellow-50 to-yellow-100/50',
    boxSize: 'w-18 h-14',
  },
];

/**
 * Shop by Size section — three size cards that link to filtered product pages.
 */
export default function ShopBySize() {
  return (
    <section className="section-padding bg-warm-white">
      <div className="container-bk">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-8"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-charcoal mb-3">
            Shop by Size
          </h2>
          <p className="text-text-secondary max-w-lg mx-auto">
            Pick the right size range for your products.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-3 gap-4 max-w-3xl mx-auto">
          {SIZES.map((size, i) => (
            <motion.div
              key={size.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <Link
                href={`/products?size=${size.filter}`}
                className="card-bk p-6 text-center hover:border-kraft transition-colors block group"
              >
                <div
                  className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${size.gradient} flex items-center justify-center mx-auto mb-4`}
                >
                  <Package
                    size={32}
                    className="text-kraft group-hover:scale-110 transition-transform"
                  />
                </div>
                <h3 className="text-lg font-bold text-charcoal mb-1">
                  {size.label}
                </h3>
                <p className="text-sm font-medium text-kraft mb-1">
                  {size.desc}
                </p>
                <p className="text-xs text-text-secondary">{size.subtitle}</p>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
