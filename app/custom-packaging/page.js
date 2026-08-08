'use client';

import { motion } from 'motion/react';
import Link from 'next/link';
import Icon from '@/components/Icon';
import CustomPackagingWizard from '@/components/CustomPackagingWizard';
import {
  fadeUp,
  staggerContainer,
  staggerChild,
  inViewConfig,
} from '@/lib/motion';

const FEATURES = [
  {
    icon: 'Ruler',
    title: 'Custom Dimensions',
    desc: 'Any size, any shape — made to fit your product.',
  },
  {
    icon: 'Layers',
    title: 'Multiple Materials',
    desc: '3-ply, 5-ply, kraft, white top — pick what works.',
  },
  {
    icon: 'Printer',
    title: 'Custom Printing',
    desc: 'Single colour to full CMYK for stunning branding.',
  },
  {
    icon: 'Image',
    title: 'Logo & Branding',
    desc: 'Upload your artwork and we handle the rest.',
  },
  {
    icon: 'Scissors',
    title: 'Die-Cut Options',
    desc: 'Unique shapes and windows for product visibility.',
  },
  {
    icon: 'Zap',
    title: 'Low MOQ: 200 Units',
    desc: 'No massive minimums — start small, scale fast.',
  },
];

/**
 * Custom Packaging page — dedicated route for the wizard flow.
 */
export default function CustomPackagingPage() {
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
              <li className="text-white/90 font-medium">Custom Packaging</li>
            </ol>
          </nav>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-2xl"
          >
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 leading-tight">
              Packaging Made for Your Brand
            </h1>
            <p className="text-white/70 text-lg leading-relaxed">
              Custom-sized, custom-printed packaging — designed around your
              product. Tell us what you need and get a quote within 24–48 hours.
            </p>
          </motion.div>

          {/* Feature Grid */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-2 lg:grid-cols-3 gap-3 mt-8"
          >
            {FEATURES.map((f) => (
              <motion.div
                key={f.title}
                variants={staggerChild}
                className="bg-white/5 rounded-xl p-3 border border-white/10"
              >
                <Icon
                  name={f.icon}
                  size={18}
                  className="text-kraft-light mb-1.5"
                />
                <p className="font-semibold text-white text-sm mb-0.5">
                  {f.title}
                </p>
                <p className="text-xs text-white/50 leading-relaxed">
                  {f.desc}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Wizard ── */}
      <section className="section-padding">
        <div className="container-bk max-w-3xl">
          <CustomPackagingWizard />
        </div>
      </section>

      {/* ── How Custom Packaging Works ── */}
      <section className="bg-warm-gray">
        <div className="container-bk section-padding">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={inViewConfig}
            className="text-center mb-10"
          >
            <h2 className="heading-2 mb-3">How It Works</h2>
            <p className="text-body max-w-lg mx-auto">
              From your dimensions to your doorstep — simple and transparent.
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={inViewConfig}
            className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto"
          >
            {[
              {
                step: '01',
                title: 'Share Your Specs',
                desc: 'Dimensions, material, printing, and quantity.',
                icon: 'FileText',
              },
              {
                step: '02',
                title: 'Get a Quote',
                desc: 'Our team reviews and sends pricing within 24–48 hours.',
                icon: 'Clock',
              },
              {
                step: '03',
                title: 'Approve & Produce',
                desc: 'We manufacture your custom packaging.',
                icon: 'CheckCircle',
              },
              {
                step: '04',
                title: 'Delivered to You',
                desc: 'Quality-checked and shipped to your warehouse.',
                icon: 'Truck',
              },
            ].map((item) => (
              <motion.div
                key={item.step}
                variants={staggerChild}
                className="text-center"
              >
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
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="section-padding">
        <div className="container-bk text-center max-w-xl">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={inViewConfig}
          >
            <h2 className="heading-3 mb-3">Not Sure Where to Start?</h2>
            <p className="text-body mb-6">
              Our packaging experts can recommend the right material, size, and
              printing for your product.
            </p>
            <div className="flex justify-center gap-3 flex-wrap">
              <Link href="/" className="btn-primary">
                <Icon name="Phone" size={16} className="mr-1" />
                Talk to Expert
              </Link>
              <Link href="/products" className="btn-outline">
                Browse Ready-Made Boxes
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
