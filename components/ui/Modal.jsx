'use client';

import { useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { backdrop, modal as modalVariants } from '@/lib/motion';
import Icon from '@/components/common/Icon';

/**
 * Accessible modal dialog with focus trap, Escape-to-close,
 * and body scroll locking.
 *
 * @param {boolean} open
 * @param {Function} onClose
 * @param {string} title
 * @param {'sm'|'md'|'lg'} size
 */
export default function Modal({
  open,
  onClose,
  title,
  children,
  size = 'md',
  className = '',
}) {
  const dialogRef = useRef(null);
  const previousFocusRef = useRef(null);

  const sizeClasses = {
    sm: 'max-w-sm',
    md: 'max-w-lg',
    lg: 'max-w-2xl',
  };

  /** Lock body scroll when modal is open. */
  useEffect(() => {
    if (open) {
      previousFocusRef.current = document.activeElement;
      document.body.style.overflow = 'hidden';
      // Focus the dialog after animation
      const timer = setTimeout(() => dialogRef.current?.focus(), 100);
      return () => clearTimeout(timer);
    } else {
      document.body.style.overflow = '';
      previousFocusRef.current?.focus();
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  /** Handle Escape key. */
  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
      // Focus trap: Tab wrapping
      if (e.key === 'Tab' && dialogRef.current) {
        const focusable = dialogRef.current.querySelectorAll(
          'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'
        );
        if (focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    },
    [onClose]
  );

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            variants={backdrop}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed inset-0 bg-black/50 z-[var(--z-modal)]"
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Dialog */}
          <div className="fixed inset-0 z-[calc(var(--z-modal)+1)] flex items-center justify-center p-4">
            <motion.div
              ref={dialogRef}
              role="dialog"
              aria-modal="true"
              aria-label={title}
              tabIndex={-1}
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              onKeyDown={handleKeyDown}
              className={`bg-white rounded-2xl shadow-xl w-full ${sizeClasses[size]} max-h-[85vh] overflow-hidden flex flex-col outline-none ${className}`}
            >
              {/* Header */}
              {title && (
                <div className="flex items-center justify-between p-5 border-b border-border">
                  <h2 className="heading-4">{title}</h2>
                  <button
                    onClick={onClose}
                    className="p-2 rounded-full hover:bg-warm-gray transition-colors"
                    aria-label="Close dialog"
                  >
                    <Icon name="X" size={18} />
                  </button>
                </div>
              )}

              {/* Content */}
              <div className="flex-1 overflow-y-auto p-5">{children}</div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
