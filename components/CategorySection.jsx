'use client';

import { motion } from 'motion/react';
import Link from 'next/link';
import { categories } from '@/data/categories';
import Icon from '@/components/Icon';

/**
 * Category browsing section with large visual cards.
 */
export default function CategorySection() {
  return (
    <section className="section-padding">
      <div className="container-bk">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-charcoal mb-3">
            Shop by Category
          </h2>
          <p className="text-text-secondary text-lg">
            Everything you need to package and ship your products.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
          {categories.map((cat, i) => (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
            >
              <Link href={`/products?category=${cat.slug}`}>
                <motion.div
                  whileHover={{ scale: 1.03, y: -4 }}
                  className="card-bk p-6 h-full group cursor-pointer"
                >
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                    style={{ backgroundColor: `${cat.color}15` }}
                  >
                    <Icon
                      name={cat.icon}
                      size={24}
                      style={{ color: cat.color }}
                    />
                  </div>
                  <h3 className="font-semibold text-charcoal mb-1.5 group-hover:text-kraft transition-colors">
                    {cat.name}
                  </h3>
                  <p className="text-sm text-text-secondary leading-relaxed mb-3">
                    {cat.description}
                  </p>
                  <span className="inline-flex items-center gap-1 text-sm font-medium text-kraft group-hover:gap-2 transition-all">
                    Browse
                    <Icon
                      name="ArrowRight"
                      size={14}
                      className="transition-transform group-hover:translate-x-0.5"
                    />
                  </span>
                </motion.div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
