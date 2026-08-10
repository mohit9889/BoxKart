'use client';

import { motion } from 'motion/react';
import Link from 'next/link';
import Icon from '@/components/common/Icon';

export default function LegalLayout({ title, lastUpdated, children }) {
  return (
    <div className="min-h-screen bg-[#faf8f5]">
      {/* Decorative Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[1000px] h-[400px] bg-gradient-to-b from-[#e8e4de]/50 to-transparent blur-3xl opacity-60" />
      </div>

      <div className="relative pt-24 pb-16 lg:pt-32 lg:pb-24">
        <div className="container-bk max-w-4xl mx-auto">
          {/* Breadcrumb / Back */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="mb-8"
          >
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-sm font-medium text-[var(--color-text-secondary)] hover:text-[var(--color-charcoal)] transition-colors group"
            >
              <Icon
                name="ArrowLeft"
                size={16}
                className="transition-transform group-hover:-translate-x-1"
              />
              Back to Home
            </Link>
          </motion.div>

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="mb-12 lg:mb-16 pb-8 border-b border-[#e8e4de]"
          >
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-[var(--color-charcoal)] mb-4">
              {title}
            </h1>
            {lastUpdated && (
              <p className="text-[var(--color-text-secondary)] text-sm md:text-base font-medium">
                Last updated: {lastUpdated}
              </p>
            )}
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: 'easeOut' }}
            className="prose prose-lg prose-slate max-w-none 
              prose-headings:text-[var(--color-charcoal)] prose-headings:font-bold
              prose-h2:text-2xl prose-h2:mt-12 prose-h2:mb-6
              prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-4
              prose-p:text-[var(--color-text-secondary)] prose-p:leading-relaxed prose-p:mb-6
              prose-li:text-[var(--color-text-secondary)] prose-li:marker:text-[var(--color-kraft)]
              prose-a:text-[var(--color-charcoal)] prose-a:font-semibold hover:prose-a:text-[var(--color-kraft)] prose-a:transition-colors
              prose-strong:text-[var(--color-charcoal)]
              bg-white/60 backdrop-blur-sm rounded-3xl p-8 md:p-12 shadow-sm border border-white/40"
          >
            {children}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
