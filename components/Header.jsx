'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Link from 'next/link';
import { Search, ShoppingCart, User, Menu, X, Package } from 'lucide-react';
import { useCart } from '@/lib/cart';
import SearchBar from './SearchBar';
import MobileMenu from './MobileMenu';
import CartDrawer from './CartDrawer';

const NAV_LINKS = [
  { label: 'Boxes', href: '/products?category=corrugated-boxes' },
  { label: 'Packaging Supplies', href: '/products' },
  { label: 'Custom Packaging', href: '/#custom-packaging' },
  { label: 'Bulk Deals', href: '/#bundles' },
  { label: 'How It Works', href: '/#how-it-works' },
];

/**
 * Main site header with desktop/mobile layouts,
 * sticky compact state on scroll, and Motion transitions.
 */
export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const { totalItems } = useCart();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <motion.header
        className={`sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b transition-all duration-300 ${
          scrolled ? 'border-border shadow-sm py-2' : 'border-transparent py-3'
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
      >
        <div className="container-bk flex items-center justify-between gap-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <div className="w-8 h-8 bg-charcoal rounded-lg flex items-center justify-center">
              <Package size={18} className="text-white" />
            </div>
            <span className="text-xl font-bold tracking-tight text-charcoal">
              Box<span className="text-kraft">Kart</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav
            className="hidden lg:flex items-center gap-1"
            role="navigation"
            aria-label="Main navigation"
          >
            {NAV_LINKS.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="px-3 py-2 text-sm font-medium text-text-secondary hover:text-charcoal transition-colors rounded-lg hover:bg-warm-gray"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-1">
            {/* Search Toggle */}
            <button
              onClick={() => setSearchOpen(true)}
              className="p-2.5 rounded-full hover:bg-warm-gray transition-colors"
              aria-label="Search products"
            >
              <Search size={20} className="text-text-secondary" />
            </button>

            {/* Account */}
            <Link
              href="/account"
              className="hidden sm:flex p-2.5 rounded-full hover:bg-warm-gray transition-colors"
              aria-label="My account"
            >
              <User size={20} className="text-text-secondary" />
            </Link>

            {/* Cart */}
            <button
              onClick={() => setCartOpen(true)}
              className="relative p-2.5 rounded-full hover:bg-warm-gray transition-colors"
              aria-label={`Cart (${totalItems} items)`}
            >
              <ShoppingCart size={20} className="text-text-secondary" />
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
            >
              <Menu size={22} className="text-charcoal" />
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
