'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, X, ArrowRight } from 'lucide-react';
import { getSearchSuggestions, searchProducts } from '@/lib/search';
import Link from 'next/link';

/**
 * Full-screen search overlay with intelligent suggestions.
 */
export default function SearchBar({ open, onClose }) {
  const [query, setQuery] = useState('');
  const inputRef = useRef(null);

  const suggestions =
    query.trim().length >= 2 ? getSearchSuggestions(query) : [];
  const results = query.trim().length >= 2 ? searchProducts(query) : [];

  useEffect(() => {
    if (open && inputRef.current) {
      const timer = setTimeout(() => inputRef.current?.focus(), 100);
      return () => clearTimeout(timer);
    }
  }, [open]);

  const handleClose = () => {
    setQuery('');
    onClose();
  };

  const handleSuggestionClick = (suggestion) => {
    setQuery(suggestion);
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-[70]"
            onClick={handleClose}
          />

          {/* Search Panel */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed top-0 left-0 right-0 bg-white z-[71] shadow-xl"
          >
            <div className="container-bk py-4">
              {/* Input */}
              <div className="flex items-center gap-3">
                <Search size={20} className="text-text-tertiary shrink-0" />
                <input
                  ref={inputRef}
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder='Search boxes, packaging, "10x8x4"...'
                  className="flex-1 text-lg outline-none bg-transparent placeholder:text-text-tertiary"
                  aria-label="Search products"
                />
                <button
                  onClick={handleClose}
                  className="p-2 rounded-full hover:bg-warm-gray transition-colors"
                  aria-label="Close search"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Suggestions */}
              <AnimatePresence>
                {suggestions.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-3 border-t border-border pt-3"
                  >
                    <p className="text-xs font-medium text-text-tertiary uppercase tracking-wider mb-2">
                      Suggestions
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {suggestions.map((s) => (
                        <button
                          key={s}
                          onClick={() => handleSuggestionClick(s)}
                          className="px-3 py-1.5 text-sm bg-warm-gray rounded-full hover:bg-border transition-colors"
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Results */}
              <AnimatePresence>
                {results.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="mt-3 border-t border-border pt-3 max-h-80 overflow-y-auto"
                  >
                    <p className="text-xs font-medium text-text-tertiary uppercase tracking-wider mb-2">
                      Products ({results.length})
                    </p>
                    <div className="space-y-1">
                      {results.slice(0, 8).map((product) => (
                        <Link
                          key={product.id}
                          href={`/products/${product.slug}`}
                          onClick={onClose}
                          className="flex items-center justify-between p-3 rounded-xl hover:bg-warm-gray transition-colors group"
                        >
                          <div>
                            <p className="font-medium text-sm text-charcoal">
                              {product.name}
                            </p>
                            <p className="text-xs text-text-secondary mt-0.5">
                              {product.dimensions} · {product.ply} · From ₹
                              {product.pricingTiers[0].price}/pc
                            </p>
                          </div>
                          <ArrowRight
                            size={16}
                            className="text-text-tertiary group-hover:text-charcoal transition-colors"
                          />
                        </Link>
                      ))}
                    </div>
                    {results.length > 8 && (
                      <Link
                        href={`/products?search=${encodeURIComponent(query)}`}
                        onClick={onClose}
                        className="block text-center text-sm font-medium text-kraft hover:text-kraft-light py-3 transition-colors"
                      >
                        View all {results.length} results →
                      </Link>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>

              {/* No Results */}
              {query.length >= 2 &&
                results.length === 0 &&
                suggestions.length === 0 && (
                  <div className="mt-3 border-t border-border pt-4 pb-2 text-center">
                    <p className="text-text-secondary text-sm">
                      No products found for &quot;{query}&quot;
                    </p>
                    <p className="text-text-tertiary text-xs mt-1">
                      Try searching by size (e.g. &quot;10x8x4&quot;) or
                      category (e.g. &quot;courier bags&quot;)
                    </p>
                  </div>
                )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
