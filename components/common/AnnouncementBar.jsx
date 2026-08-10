'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Icon from '@/components/common/Icon';

/**
 * Dismissible announcement bar with responsive layout.
 * Uses honest messaging (no unverifiable claims or promo codes).
 */
export default function AnnouncementBar() {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="bg-charcoal text-white text-center text-sm relative overflow-hidden"
          role="banner"
        >
          <div className="container-bk py-2.5 flex items-center justify-center gap-2">
            <span className="font-medium">
              📦 Now delivering packaging across North India
            </span>
            <span className="hidden sm:inline text-white/60">|</span>
            <span className="hidden sm:inline text-white/80">
              Order from just <strong>100 pieces</strong>
            </span>
            <button
              onClick={() => setVisible(false)}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-white/10 transition-colors"
              aria-label="Dismiss announcement"
            >
              <Icon name="X" size={14} />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
