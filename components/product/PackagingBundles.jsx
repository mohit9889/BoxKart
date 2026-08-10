'use client';

import { motion } from 'motion/react';
import { bundles } from '@/data/bundles';
import { useCart } from '@/lib/cart';
import Link from 'next/link';
import Icon from '@/components/common/Icon';

/**
 * Packaging bundles section with 3 bundle cards.
 */
export default function PackagingBundles() {
  return (
    <section id="bundles" className="section-padding">
      <div className="container-bk">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-charcoal mb-3">
            Ready-to-buy Packaging Bundles
          </h2>
          <p className="text-text-secondary text-lg max-w-xl mx-auto">
            Curated kits for every stage of your business. Save time and money.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {bundles.map((bundle, i) => (
            <motion.div
              key={bundle.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <motion.div
                whileHover={{ y: -6 }}
                className={`card-bk overflow-hidden h-full flex flex-col ${
                  bundle.popular ? 'border-accent border-2 relative' : ''
                }`}
              >
                {bundle.popular && (
                  <div className="bg-accent text-white text-center py-1.5 text-xs font-bold flex items-center justify-center gap-1">
                    <Icon name="Star" size={12} fill="white" />
                    Most Popular
                  </div>
                )}

                <div className="p-6 flex-1 flex flex-col">
                  <div className="mb-4">
                    <span className="badge badge-kraft mb-2">
                      {bundle.badge}
                    </span>
                    <h3 className="text-xl font-bold text-charcoal mt-2">
                      {bundle.name}
                    </h3>
                    <p className="text-sm text-text-secondary">
                      {bundle.tagline}
                    </p>
                  </div>

                  {bundle.price ? (
                    <div className="mb-4">
                      <div className="flex items-baseline gap-2">
                        <span className="text-3xl font-bold text-charcoal">
                          ₹{bundle.price.toLocaleString('en-IN')}
                        </span>
                        {bundle.originalPrice && (
                          <span className="text-sm text-text-tertiary line-through">
                            ₹{bundle.originalPrice.toLocaleString('en-IN')}
                          </span>
                        )}
                      </div>
                      {bundle.savings && (
                        <p className="text-sm font-medium text-accent mt-1">
                          Save ₹{bundle.savings.toLocaleString('en-IN')}
                        </p>
                      )}
                    </div>
                  ) : (
                    <div className="mb-4">
                      <span className="text-2xl font-bold text-charcoal">
                        Custom
                      </span>
                      <p className="text-sm text-text-secondary">
                        Talk to our team
                      </p>
                    </div>
                  )}

                  <p className="text-sm text-text-secondary mb-4 leading-relaxed">
                    {bundle.description}
                  </p>

                  <ul className="space-y-2 mb-6 flex-1">
                    {bundle.includes.map((item) => (
                      <li
                        key={item.item}
                        className="flex items-start gap-2 text-sm text-text-primary"
                      >
                        <Icon
                          name="Check"
                          size={16}
                          className="text-accent shrink-0 mt-0.5"
                        />
                        {item.item}
                      </li>
                    ))}
                  </ul>

                  {bundle.price ? (
                    <motion.button
                      whileTap={{ scale: 0.98 }}
                      className={`w-full py-3 rounded-xl text-sm font-semibold transition-all ${
                        bundle.popular
                          ? 'bg-accent text-white hover:bg-accent-dark'
                          : 'bg-charcoal text-white hover:bg-charcoal-light'
                      }`}
                    >
                      {bundle.cta}
                    </motion.button>
                  ) : (
                    <Link
                      href="/custom-packaging"
                      className="btn-outline w-full text-center flex items-center justify-center gap-2"
                    >
                      <Icon name="MessageSquare" size={16} />
                      {bundle.cta}
                    </Link>
                  )}
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
