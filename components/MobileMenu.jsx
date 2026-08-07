'use client';

import { motion, AnimatePresence } from 'motion/react';
import Link from 'next/link';
import Icon from '@/components/Icon';

/**
 * Slide-in mobile navigation menu with AnimatePresence.
 */
export default function MobileMenu({ open, onClose, links }) {
  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 z-[60]"
            onClick={onClose}
          />

          {/* Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed top-0 right-0 bottom-0 w-[85%] max-w-sm bg-white z-[61] shadow-xl flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-border">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 bg-charcoal rounded-lg flex items-center justify-center">
                  <Icon name="Package" size={14} className="text-white" />
                </div>
                <span className="font-bold text-lg text-charcoal">
                  Box<span className="text-kraft">Kart</span>
                </span>
              </div>
              <button
                onClick={onClose}
                className="p-2 rounded-full hover:bg-warm-gray transition-colors"
                aria-label="Close menu"
              >
                <Icon name="X" size={20} />
              </button>
            </div>

            {/* Nav Links */}
            <nav
              className="flex-1 overflow-y-auto py-4"
              aria-label="Mobile navigation"
            >
              {links.map((link, i) => (
                <motion.div
                  key={link.label}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <Link
                    href={link.href}
                    onClick={onClose}
                    className="flex items-center justify-between px-6 py-4 text-base font-medium text-text-primary hover:bg-warm-gray transition-colors"
                  >
                    {link.label}
                    <Icon
                      name="ChevronRight"
                      size={16}
                      className="text-text-tertiary"
                    />
                  </Link>
                </motion.div>
              ))}
            </nav>

            {/* Bottom CTA */}
            <div className="p-4 border-t border-border">
              <Link
                href="/#box-finder"
                onClick={onClose}
                className="btn-accent w-full text-center"
              >
                Find My Box
              </Link>
              <Link
                href="/account"
                onClick={onClose}
                className="btn-outline w-full text-center mt-3"
              >
                My Account
              </Link>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
