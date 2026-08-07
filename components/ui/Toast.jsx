'use client';

import { useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Icon from '@/components/Icon';

/**
 * Toast notification system.
 * Supports success, error, warning, and info variants.
 * Auto-dismisses after duration.
 *
 * @param {boolean} open
 * @param {Function} onClose
 * @param {'success'|'error'|'warning'|'info'} variant
 * @param {number} duration — auto-dismiss in ms (0 = no auto-dismiss)
 */
export default function Toast({
  open,
  onClose,
  message,
  variant = 'success',
  duration = 4000,
}) {
  const config = {
    success: {
      bg: 'bg-charcoal',
      icon: 'CheckCircle',
      iconColor: 'text-accent',
    },
    error: {
      bg: 'bg-charcoal',
      icon: 'AlertCircle',
      iconColor: 'text-danger',
    },
    warning: {
      bg: 'bg-charcoal',
      icon: 'AlertTriangle',
      iconColor: 'text-warning',
    },
    info: {
      bg: 'bg-charcoal',
      icon: 'Info',
      iconColor: 'text-info',
    },
  };

  const c = config[variant];

  /** Auto-dismiss timer. */
  useEffect(() => {
    if (open && duration > 0) {
      const timer = setTimeout(onClose, duration);
      return () => clearTimeout(timer);
    }
  }, [open, duration, onClose]);

  /** Dismiss on Escape. */
  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === 'Escape') onClose();
    },
    [onClose]
  );

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          role="alert"
          aria-live="polite"
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          transition={{ duration: 0.25 }}
          onKeyDown={handleKeyDown}
          className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-[var(--z-toast)] ${c.bg} text-white rounded-2xl shadow-xl px-5 py-3.5 flex items-center gap-3 min-w-[280px] max-w-md`}
        >
          <Icon name={c.icon} size={18} className={c.iconColor} />
          <p className="text-sm font-medium flex-1">{message}</p>
          <button
            onClick={onClose}
            className="p-1 rounded-full hover:bg-white/10 transition-colors shrink-0"
            aria-label="Dismiss"
          >
            <Icon name="X" size={14} />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
