'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { getSearchSuggestions, searchProducts } from '@/lib/search';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Icon from '@/components/common/Icon';

/**
 * Modern Command-Palette Style Search Overlay
 */
export default function SearchBar({ open, onClose }) {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const inputRef = useRef(null);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setSelectedIndex(-1);
  }, [query, results, suggestions]);

  useEffect(() => {
    if (open && inputRef.current) {
      const timer = setTimeout(() => inputRef.current?.focus(), 100);
      return () => clearTimeout(timer);
    }
  }, [open]);

  // Handle Escape key to close
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && open) onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [open, onClose]);

  useEffect(() => {
    const fetchResults = async () => {
      const trimmed = query.trim();
      if (trimmed.length < 2) {
        setSuggestions([]);
        setResults([]);
        return;
      }

      setIsLoading(true);
      try {
        const [newSuggestions, newResults] = await Promise.all([
          getSearchSuggestions(trimmed),
          searchProducts(trimmed),
        ]);
        setSuggestions(newSuggestions);
        setResults(newResults);
      } catch (error) {
        console.error('Search error:', error);
      } finally {
        setIsLoading(false);
      }
    };

    const debounceTimer = setTimeout(fetchResults, 300);
    return () => clearTimeout(debounceTimer);
  }, [query]);

  const handleClose = () => {
    setQuery('');
    setSuggestions([]);
    setResults([]);
    onClose();
  };

  const handleKeyDown = (e) => {
    const items = results.length > 0 ? results.slice(0, 8) : suggestions;
    const maxIndex = items.length - 1;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev < maxIndex ? prev + 1 : prev));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev > 0 ? prev - 1 : -1));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (selectedIndex >= 0 && selectedIndex <= maxIndex) {
        if (results.length > 0) {
          router.push(`/products/${items[selectedIndex].slug}`);
          handleClose();
        } else if (suggestions.length > 0) {
          setQuery(items[selectedIndex]);
        }
      } else if (query.trim().length > 0) {
        router.push(`/products?search=${encodeURIComponent(query.trim())}`);
        handleClose();
      }
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[100] flex items-start justify-center pt-[10vh] px-4 sm:px-6">
          {/* Glassmorphic Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={handleClose}
          />

          {/* Search Palette */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="relative w-full max-w-2xl bg-white/95 backdrop-blur-xl shadow-2xl rounded-2xl overflow-hidden border border-white/20 flex flex-col max-h-[80vh]"
          >
            {/* Header / Input */}
            <div className="p-4 sm:px-6 sm:py-5 border-b border-border/50">
              <div className="flex items-center px-4 py-3 bg-[var(--color-warm-gray)] rounded-2xl transition-all">
                <Icon
                  name="Search"
                  size={24}
                  className="text-[var(--color-text-tertiary)] shrink-0"
                />
                <input
                  ref={inputRef}
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder='Search for boxes, packaging, "10x8x4"...'
                  className="flex-1 bg-transparent border-none outline-none focus:ring-0 focus:outline-none focus:border-transparent text-lg sm:text-xl text-[var(--color-charcoal)] placeholder:text-[var(--color-text-tertiary)] px-4 font-medium font-sans"
                  aria-label="Search products"
                />
                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={handleClose}
                    className="p-2 rounded-xl text-[var(--color-text-secondary)] hover:text-[var(--color-charcoal)] hover:bg-white/50 transition-colors hidden sm:block"
                    aria-label="Close search"
                  >
                    <kbd className="hidden sm:inline-block px-2 py-1 text-xs font-sans font-medium text-[var(--color-text-tertiary)] bg-white border border-border rounded-md shadow-sm">
                      ESC
                    </kbd>
                  </button>
                </div>
              </div>
            </div>

            {/* Scrollable Content Area */}
            <div className="overflow-y-auto flex-1 overscroll-contain min-h-[400px]">
              {/* Default State (Empty Query) */}
              {!query && (
                <div className="px-6 py-12 text-center">
                  <div className="w-16 h-16 bg-[var(--color-warm-gray)] rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Icon
                      name="Search"
                      size={32}
                      className="text-[var(--color-kraft)]"
                    />
                  </div>
                  <h3 className="text-lg font-medium text-[var(--color-charcoal)] mb-2">
                    What are you looking for?
                  </h3>
                  <p className="text-[var(--color-text-secondary)] text-sm">
                    Try searching for specific dimensions, categories, or box
                    types.
                  </p>
                </div>
              )}

              {/* Skeletons while loading */}
              {isLoading && (
                <div className="px-2 sm:px-4 py-4 space-y-2">
                  <p className="px-2 text-xs font-semibold text-[var(--color-text-tertiary)] uppercase tracking-wider mb-2">
                    Searching...
                  </p>
                  {[...Array(5)].map((_, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-4 p-3 rounded-2xl animate-pulse"
                    >
                      <div className="w-14 h-14 bg-[var(--color-warm-gray)] rounded-xl shrink-0" />
                      <div className="flex-1 space-y-3">
                        <div className="h-4 bg-[var(--color-warm-gray)] rounded w-2/3" />
                        <div className="h-3 bg-[var(--color-warm-gray)] rounded w-1/3" />
                      </div>
                      <div className="shrink-0 pr-2 flex flex-col items-end gap-2">
                        <div className="h-3 bg-[var(--color-warm-gray)] rounded w-8" />
                        <div className="h-4 bg-[var(--color-warm-gray)] rounded w-16" />
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Suggestions */}
              {!isLoading && suggestions.length > 0 && (
                <div className="px-4 sm:px-6 py-4 border-b border-border/30">
                  <p className="text-xs font-semibold text-[var(--color-text-tertiary)] uppercase tracking-wider mb-3">
                    Suggestions
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {suggestions.map((s, idx) => (
                      <button
                        key={s}
                        onClick={() => setQuery(s)}
                        className={`px-4 py-2 text-sm rounded-full transition-all duration-200 ${
                          selectedIndex === idx
                            ? 'bg-[var(--color-kraft)] text-white shadow-md'
                            : 'text-[var(--color-charcoal)] bg-[var(--color-warm-gray)] hover:bg-[var(--color-kraft)] hover:text-white hover:shadow-md'
                        }`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Results List */}
              {!isLoading && results.length > 0 && (
                <div className="px-2 sm:px-4 py-4">
                  <p className="px-2 text-xs font-semibold text-[var(--color-text-tertiary)] uppercase tracking-wider mb-2">
                    Products
                  </p>
                  <div className="space-y-1">
                    {results.slice(0, 8).map((product, idx) => (
                      <motion.div
                        key={product.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.03 }}
                      >
                        <Link
                          href={`/products/${product.slug}`}
                          onClick={handleClose}
                          className={`flex items-center gap-4 p-3 rounded-2xl group transition-colors ${
                            selectedIndex === idx
                              ? 'bg-[var(--color-warm-gray)]'
                              : 'hover:bg-[var(--color-warm-gray)]'
                          }`}
                        >
                          <div className="w-14 h-14 bg-white rounded-xl shadow-sm border border-border/50 shrink-0 flex items-center justify-center p-2 group-hover:scale-105 transition-transform">
                            <img
                              src={product.image}
                              alt={product.name}
                              className="w-full h-full object-contain"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="text-base font-medium text-[var(--color-charcoal)] truncate group-hover:text-[var(--color-kraft)] transition-colors">
                              {product.name}
                            </h4>
                            <p className="text-sm text-[var(--color-text-secondary)] truncate">
                              {product.dimensions}{' '}
                              <span className="mx-1.5 opacity-50">•</span>{' '}
                              {product.ply}
                            </p>
                          </div>
                          <div className="text-right shrink-0 pr-2">
                            <p className="text-sm text-[var(--color-text-tertiary)]">
                              From
                            </p>
                            <p className="text-base font-semibold text-[var(--color-charcoal)]">
                              ₹{product.pricingTiers?.[0]?.price ?? '--'}
                            </p>
                          </div>
                        </Link>
                      </motion.div>
                    ))}
                  </div>

                  {results.length > 8 && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="mt-4 px-2"
                    >
                      <Link
                        href={`/products?search=${encodeURIComponent(query)}`}
                        onClick={handleClose}
                        className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-[var(--color-charcoal)] text-white font-medium rounded-xl hover:bg-black transition-colors"
                      >
                        View all {results.length} results
                        <Icon name="ArrowRight" size={16} />
                      </Link>
                    </motion.div>
                  )}
                </div>
              )}

              {/* No Results State */}
              {!isLoading &&
                query.trim().length >= 2 &&
                results.length === 0 &&
                suggestions.length === 0 && (
                  <div className="px-6 py-12 text-center">
                    <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Icon
                        name="AlertCircle"
                        size={32}
                        className="text-red-400"
                      />
                    </div>
                    <h3 className="text-lg font-medium text-[var(--color-charcoal)] mb-2">
                      No results found
                    </h3>
                    <p className="text-[var(--color-text-secondary)] text-sm">
                      We couldn&apos;t find anything matching &quot;
                      <span className="font-medium">{query}</span>&quot;.
                      <br />
                      Try checking your spelling or using more general terms.
                    </p>
                  </div>
                )}
            </div>

            {/* Footer */}
            <div className="px-4 sm:px-6 py-3 border-t border-border/50 bg-[var(--color-warm-gray)]/50 hidden sm:flex items-center justify-between text-xs text-[var(--color-text-tertiary)]">
              <div className="flex items-center gap-4">
                <span className="flex items-center gap-1.5">
                  <kbd className="px-1.5 py-0.5 bg-white border border-border rounded shadow-sm">
                    ↑
                  </kbd>
                  <kbd className="px-1.5 py-0.5 bg-white border border-border rounded shadow-sm">
                    ↓
                  </kbd>{' '}
                  to navigate
                </span>
                <span className="flex items-center gap-1.5">
                  <kbd className="px-1.5 py-0.5 bg-white border border-border rounded shadow-sm">
                    ↵
                  </kbd>{' '}
                  to select
                </span>
              </div>
              <div className="flex items-center gap-1">
                <span>Search powered by</span>
                <strong className="text-[var(--color-charcoal)]">
                  BoxKart
                </strong>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
