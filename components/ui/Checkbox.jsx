'use client';

import { forwardRef } from 'react';

/**
 * Checkbox with label support and error state.
 */
const Checkbox = forwardRef(function Checkbox(
  { label, error, id, className = '', ...props },
  ref
) {
  const inputId = id || `checkbox-${label?.replace(/\s+/g, '-').toLowerCase()}`;

  return (
    <div className={className}>
      <label
        htmlFor={inputId}
        className={`inline-flex items-start gap-2.5 cursor-pointer ${
          props.disabled ? 'opacity-50 cursor-not-allowed' : ''
        }`}
      >
        <input
          ref={ref}
          type="checkbox"
          id={inputId}
          className="mt-0.5 w-4 h-4 rounded border-border text-accent accent-accent cursor-pointer shrink-0"
          aria-invalid={!!error}
          {...props}
        />
        {label && (
          <span className="text-sm text-text-primary leading-snug">
            {label}
          </span>
        )}
      </label>
      {error && (
        <p className="text-xs text-danger mt-1 ml-6.5" role="alert">
          {error}
        </p>
      )}
    </div>
  );
});

export default Checkbox;
