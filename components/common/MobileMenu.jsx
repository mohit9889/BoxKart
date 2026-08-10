'use client';

import { useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { backdrop, slideInRight, duration } from '@/lib/motion';
import Icon from '@/components/common/Icon';

const MOBILE_NAV_LINKS = [
  {
    label: 'Boxes',
    href: '/products?category=corrugated-boxes',
    icon: 'Package',
  },
  { label: 'Packaging Supplies', href: '/products', icon: 'ShoppingBag' },
  { label: 'Custom Packaging', href: '/custom-packaging', icon: 'Scissors' },
  { label: 'Bulk Orders', href: '/#bundles', icon: 'Layers' },
  { label: 'How It Works', href: '/#how-it-works', icon: 'Info' },
  { label: 'Box Finder', href: '/#box-finder', icon: 'Search' },
];

/**
 * Slide-in mobile navigation menu with focus trap,
 * Escape-to-close, body scroll lock, and focus restoration.
 */
export default function MobileMenu({
  open,
  onClose,
  links,
  isAuthenticated,
  onLogout,
}) {
  const panelRef = useRef(null);
  const previousFocusRef = useRef(null);
  const pathname = usePathname();

  /** Use the custom links if provided, otherwise use defaults. */
  const navLinks = links || MOBILE_NAV_LINKS;

  /** Lock body scroll and manage focus when menu opens. */
  useEffect(() => {
    if (open) {
      previousFocusRef.current = document.activeElement;
      document.body.style.overflow = 'hidden';
      const timer = setTimeout(() => panelRef.current?.focus(), 100);
      return () => clearTimeout(timer);
    } else {
      document.body.style.overflow = '';
      previousFocusRef.current?.focus();
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  /** Handle Escape + focus trap. */
  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === 'Escape') {
        onClose();
        return;
      }
      if (e.key === 'Tab' && panelRef.current) {
        const focusable = panelRef.current.querySelectorAll(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
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
            className="fixed inset-0 bg-black/40 z-[var(--z-overlay)]"
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Panel */}
          <motion.div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation"
            tabIndex={-1}
            variants={slideInRight}
            initial="hidden"
            animate="visible"
            exit="exit"
            onKeyDown={handleKeyDown}
            className="fixed top-0 right-0 bottom-0 w-[85%] max-w-sm bg-white z-[calc(var(--z-overlay)+1)] shadow-xl flex flex-col outline-none"
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
              className="flex-1 overflow-y-auto py-2"
              aria-label="Mobile navigation"
            >
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.label}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.04, duration: duration.fast }}
                >
                  <Link
                    href={link.href}
                    onClick={onClose}
                    className="flex items-center justify-between px-5 py-3.5 text-base font-medium text-text-primary hover:bg-warm-gray transition-colors"
                  >
                    <span className="flex items-center gap-3">
                      {link.icon && (
                        <Icon
                          name={link.icon}
                          size={18}
                          className="text-text-tertiary"
                        />
                      )}
                      {link.label}
                    </span>
                    <Icon
                      name="ChevronRight"
                      size={16}
                      className="text-text-tertiary"
                    />
                  </Link>
                </motion.div>
              ))}

              {/* Account / Auth links for mobile */}
              <div className="border-t border-border mt-2 pt-2">
                {isAuthenticated ? (
                  <Link
                    href="/account"
                    onClick={onClose}
                    className="flex items-center gap-3 px-5 py-3.5 text-base font-medium text-text-primary hover:bg-warm-gray transition-colors"
                  >
                    <Icon
                      name="User"
                      size={18}
                      className="text-text-tertiary"
                    />
                    My Account
                  </Link>
                ) : (
                  <Link
                    href="/login"
                    onClick={onClose}
                    className="flex items-center gap-3 px-5 py-3.5 text-base font-medium text-text-primary hover:bg-warm-gray transition-colors"
                  >
                    <Icon
                      name="User"
                      size={18}
                      className="text-text-tertiary"
                    />
                    Log in / Sign up
                  </Link>
                )}
                <Link
                  href="/cart"
                  onClick={onClose}
                  className="flex items-center gap-3 px-5 py-3.5 text-base font-medium text-text-primary hover:bg-warm-gray transition-colors"
                >
                  <Icon
                    name="ShoppingCart"
                    size={18}
                    className="text-text-tertiary"
                  />
                  Cart
                </Link>
                {isAuthenticated && (
                  <button
                    onClick={() => {
                      if (onLogout) onLogout();
                      onClose();
                    }}
                    className="w-full flex items-center gap-3 px-5 py-3.5 text-base font-medium text-[var(--color-danger)] hover:bg-[var(--color-danger-light)] transition-colors text-left"
                  >
                    <Icon
                      name="LogOut"
                      size={18}
                      className="text-[var(--color-danger)]"
                    />
                    Logout
                  </button>
                )}
              </div>
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
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
