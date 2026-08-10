'use client';

import { useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { backdrop, slideInRight } from '@/lib/motion';
import Icon from '@/components/common/Icon';

/**
 * Accessible slide-in drawer with focus trap, Escape-to-close,
 * body scroll locking, and focus restoration.
 *
 * @param {boolean} open
 * @param {Function} onClose
 * @param {string} title
 * @param {'sm'|'md'|'lg'} size
 * @param {'left'|'right'} side
 */
export default function Drawer({
  open,
  onClose,
  title,
  children,
  footer,
  size = 'md',
  side = 'right',
  className = '',
}) {
  const drawerRef = useRef(null);
  const previousFocusRef = useRef(null);

  const sizeClasses = {
    sm: 'max-w-xs',
    md: 'max-w-md',
    lg: 'max-w-lg',
  };

  /** Lock body scroll when drawer is open. */
  useEffect(() => {
    if (open) {
      previousFocusRef.current = document.activeElement;
      document.body.style.overflow = 'hidden';
      const timer = setTimeout(() => drawerRef.current?.focus(), 100);
      return () => clearTimeout(timer);
    } else {
      document.body.style.overflow = '';
      previousFocusRef.current?.focus();
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  /** Handle Escape key + focus trap. */
  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
      if (e.key === 'Tab' && drawerRef.current) {
        const focusable = drawerRef.current.querySelectorAll(
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

  const positionClass = side === 'right' ? 'right-0' : 'left-0';
  const slideVariants =
    side === 'right'
      ? slideInRight
      : {
          hidden: { x: '-100%' },
          visible: {
            x: 0,
            transition: { type: 'spring', damping: 25, stiffness: 300 },
          },
          exit: { x: '-100%', transition: { duration: 0.25 } },
        };

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
            className="fixed inset-0 bg-black/40 z-[var(--z-drawer)]"
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Panel */}
          <motion.div
            ref={drawerRef}
            role="dialog"
            aria-modal="true"
            aria-label={title}
            tabIndex={-1}
            variants={slideVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onKeyDown={handleKeyDown}
            className={`fixed top-0 ${positionClass} bottom-0 w-full ${sizeClasses[size]} bg-white z-[calc(var(--z-drawer)+1)] shadow-xl flex flex-col outline-none ${className}`}
          >
            {/* Header */}
            {title && (
              <div className="flex items-center justify-between p-4 border-b border-border shrink-0">
                <h2 className="font-bold text-lg text-charcoal">{title}</h2>
                <button
                  onClick={onClose}
                  className="p-2 rounded-full hover:bg-warm-gray transition-colors"
                  aria-label="Close"
                >
                  <Icon name="X" size={20} />
                </button>
              </div>
            )}

            {/* Content */}
            <div className="flex-1 overflow-y-auto">{children}</div>

            {/* Footer */}
            {footer && (
              <div className="border-t border-border p-4 shrink-0">
                {footer}
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
