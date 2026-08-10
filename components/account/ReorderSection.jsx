'use client';

import { motion } from 'motion/react';
import Link from 'next/link';
import Icon from '@/components/common/Icon';
import { fadeUp, hoverTap, inViewConfig } from '@/lib/motion';

/**
 * Reorder section — explains the reorder workflow and its benefits.
 * Does NOT show fake personal order data to logged-out users.
 * When authenticated users exist, this section will surface real history.
 */
export default function ReorderSection() {
  return (
    <section className="section-padding">
      <div className="container-bk">
        <div className="max-w-2xl mx-auto">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={inViewConfig}
            className="card-bk p-6 md:p-8 text-center"
          >
            <div className="w-14 h-14 bg-kraft-muted rounded-2xl flex items-center justify-center mx-auto mb-5">
              <Icon name="RefreshCw" size={24} className="text-kraft" />
            </div>

            <h2 className="heading-3 mb-3">Reorder in one click</h2>
            <p className="text-body mb-6 max-w-md mx-auto">
              Running low? Your order history stays saved so you can repeat any
              previous order instantly — same packaging, same quantity, same
              price.
            </p>

            <div className="grid sm:grid-cols-3 gap-4 mb-8">
              {[
                {
                  icon: 'Clock',
                  title: 'Order History',
                  desc: 'All past orders saved',
                },
                {
                  icon: 'MousePointerClick',
                  title: 'One-Click Reorder',
                  desc: 'Repeat any past order',
                },
                {
                  icon: 'Zap',
                  title: 'Same Pricing',
                  desc: 'Locked-in bulk rates',
                },
              ].map((item) => (
                <div key={item.title} className="p-4">
                  <Icon
                    name={item.icon}
                    size={22}
                    className="text-kraft mx-auto mb-2"
                  />
                  <p className="text-sm font-semibold text-charcoal">
                    {item.title}
                  </p>
                  <p className="text-xs text-text-secondary mt-1">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>

            <motion.div {...hoverTap}>
              <Link href="/products" className="btn-accent">
                Start Your First Order
                <Icon name="ArrowRight" size={16} />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
