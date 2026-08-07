'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import Icon from '@/components/Icon';

/**
 * Search input with debounced query, clear button, and loading indicator.
 *
 * @param {Function} onSearch — Called with debounced query string
 * @param {number} debounceMs — Debounce delay in ms
 */
export default function SearchInput({
  value: controlledValue,
  onChange,
  onSearch,
  placeholder = 'Search…',
  debounceMs = 300,
  loading = false,
  className = '',
  ...props
}) {
  const [internalValue, setInternalValue] = useState(controlledValue ?? '');
  const debounceRef = useRef(null);
  const inputRef = useRef(null);

  const query = controlledValue !== undefined ? controlledValue : internalValue;

  const handleChange = useCallback(
    (e) => {
      const val = e.target.value;

      if (onChange) {
        onChange(e);
      } else {
        setInternalValue(val);
      }

      if (onSearch) {
        clearTimeout(debounceRef.current);
        debounceRef.current = setTimeout(() => onSearch(val), debounceMs);
      }
    },
    [onChange, onSearch, debounceMs]
  );

  const handleClear = () => {
    if (onChange) {
      onChange({ target: { value: '' } });
    } else {
      setInternalValue('');
    }
    onSearch?.('');
    inputRef.current?.focus();
  };

  useEffect(() => {
    return () => clearTimeout(debounceRef.current);
  }, []);

  return (
    <div className={`relative ${className}`}>
      <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none">
        {loading ? (
          <Icon
            name="Loader2"
            size={16}
            className="text-text-tertiary animate-spin"
          />
        ) : (
          <Icon name="Search" size={16} className="text-text-tertiary" />
        )}
      </div>
      <input
        ref={inputRef}
        type="search"
        value={query}
        onChange={handleChange}
        placeholder={placeholder}
        className="input-bk pl-9 pr-9"
        aria-label={placeholder}
        {...props}
      />
      {query.length > 0 && (
        <button
          type="button"
          onClick={handleClear}
          className="absolute right-2 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-warm-gray transition-colors"
          aria-label="Clear search"
        >
          <Icon name="X" size={14} className="text-text-tertiary" />
        </button>
      )}
    </div>
  );
}
