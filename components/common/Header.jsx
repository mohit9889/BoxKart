'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useCart } from '@/lib/cart';
import { duration } from '@/lib/motion';
import SearchBar from '@/components/common/SearchBar';
import MobileMenu from '@/components/common/MobileMenu';
import CartDrawer from '@/components/common/CartDrawer';
import Icon from '@/components/common/Icon';

const NAV_LINKS = [
  {
    label: 'Boxes',
    href: '/products?category=corrugated-boxes',
    match: '/products',
  },
  { label: 'Packaging Supplies', href: '/products', match: '/products' },
  { label: 'Custom Packaging', href: '/custom-packaging' },
  { label: 'Bulk Deals', href: '/#bundles' },
  { label: 'How It Works', href: '/#how-it-works' },
];

/**
 * Main site header with desktop/mobile layouts,
 * sticky compact state on scroll, active route indicator,
 * and accessible keyboard support.
 */
export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const { totalItems } = useCart();
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  /** Global Escape handler — closes whichever overlay is on top. */
  const handleGlobalKeyDown = useCallback(
    (e) => {
      if (e.key === 'Escape') {
        if (searchOpen) setSearchOpen(false);
        else if (cartOpen) setCartOpen(false);
        else if (mobileMenuOpen) setMobileMenuOpen(false);
      }
    },
    [searchOpen, cartOpen, mobileMenuOpen]
  );

  useEffect(() => {
    document.addEventListener('keydown', handleGlobalKeyDown);
    return () => document.removeEventListener('keydown', handleGlobalKeyDown);
  }, [handleGlobalKeyDown]);

  /** Check if a nav link is active based on current pathname. */
  const isActive = (link) => {
    if (link.match) return pathname.startsWith(link.match);
    if (link.href.startsWith('/') && !link.href.includes('#')) {
      return pathname === link.href;
    }
    return false;
  };

  return (
    <>
      <motion.header
        className={`sticky top-0 z-[var(--z-header)] bg-white/95 backdrop-blur-md border-b transition-all duration-300 ${
          scrolled ? 'border-border shadow-sm py-2' : 'border-transparent py-3'
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: duration.slow, ease: 'easeOut' }}
      >
        <div className="container-bk flex items-center justify-between gap-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <div className="w-8 h-8 bg-charcoal rounded-lg flex items-center justify-center">
              <Icon name="Package" size={18} className="text-white" />
            </div>
            <span className="text-xl font-bold tracking-tight text-charcoal">
              Box<span className="text-kraft">Kart</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav
            className="hidden lg:flex items-center gap-1"
            aria-label="Main navigation"
          >
            {NAV_LINKS.map((link) => {
              const active = isActive(link);
              return (
                <Link
                  key={link.label}
                  href={link.href}
                  className={`px-3 py-2 text-sm font-medium transition-colors rounded-lg ${
                    active
                      ? 'text-charcoal bg-warm-gray'
                      : 'text-text-secondary hover:text-charcoal hover:bg-warm-gray'
                  }`}
                  aria-current={active ? 'page' : undefined}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-1">
            {/* Search Toggle */}
            <button
              onClick={() => setSearchOpen(true)}
              className="p-2.5 rounded-full hover:bg-warm-gray transition-colors"
              aria-label="Search products"
            >
              <Icon name="Search" size={20} className="text-text-secondary" />
            </button>

            {/* Account */}
            <Link
              href="/account"
              className={`hidden sm:flex p-2.5 rounded-full hover:bg-warm-gray transition-colors ${
                pathname === '/account' ? 'bg-warm-gray' : ''
              }`}
              aria-label="My account"
              aria-current={pathname === '/account' ? 'page' : undefined}
            >
              <Icon name="User" size={20} className="text-text-secondary" />
            </Link>

            {/* Cart */}
            <button
              onClick={() => setCartOpen(true)}
              className="relative p-2.5 rounded-full hover:bg-warm-gray transition-colors"
              aria-label={`Cart${totalItems > 0 ? ` (${totalItems} item${totalItems === 1 ? '' : 's'})` : ' (empty)'}`}
            >
              <Icon
                name="ShoppingCart"
                size={20}
                className="text-text-secondary"
              />
              <AnimatePresence>
                {totalItems > 0 && (
                  <motion.span
                    key={totalItems}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    className="absolute -top-0.5 -right-0.5 w-5 h-5 bg-accent text-white text-xs font-bold rounded-full flex items-center justify-center"
                  >
                    {totalItems > 9 ? '9+' : totalItems}
                  </motion.span>
                )}
              </AnimatePresence>
            </button>

            {/* Find My Box CTA */}
            <Link
              href="/#box-finder"
              className="hidden md:inline-flex btn-accent text-sm px-4 py-2 ml-2"
            >
              Find My Box
            </Link>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="lg:hidden p-2.5 rounded-full hover:bg-warm-gray transition-colors ml-1"
              aria-label="Open menu"
              aria-expanded={mobileMenuOpen}
            >
              <Icon name="Menu" size={22} className="text-charcoal" />
            </button>
          </div>
        </div>
      </motion.header>

      {/* Overlays */}
      <SearchBar open={searchOpen} onClose={() => setSearchOpen(false)} />
      <MobileMenu
        open={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        links={NAV_LINKS}
      />
      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
    </>
  );
}
