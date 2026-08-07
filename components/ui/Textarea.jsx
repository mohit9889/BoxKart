'use client';

import { forwardRef } from 'react';

/**
 * Textarea with label, error, helper text, and all states.
 */
const Textarea = forwardRef(function Textarea(
  { label, error, helper, id, rows = 4, className = '', ...props },
  ref
) {
  const inputId = id || `textarea-${label?.replace(/\s+/g, '-').toLowerCase()}`;

  return (
    <div className={className}>
      {label && (
        <label htmlFor={inputId} className="text-label block mb-1.5">
          {label}
        </label>
      )}
      <textarea
        ref={ref}
        id={inputId}
        rows={rows}
        className={`input-bk resize-y ${error ? 'border-danger! focus:border-danger! focus:shadow-[0_0_0_3px_var(--color-danger-light)]!' : ''} ${
          props.disabled ? 'opacity-50 cursor-not-allowed bg-warm-gray' : ''
        }`}
        aria-invalid={!!error}
        aria-describedby={
          error ? `${inputId}-error` : helper ? `${inputId}-helper` : undefined
        }
        {...props}
      />
      {error && (
        <p
          id={`${inputId}-error`}
          className="text-xs text-danger mt-1.5"
          role="alert"
        >
          {error}
        </p>
      )}
      {!error && helper && (
        <p id={`${inputId}-helper`} className="text-caption mt-1.5">
          {helper}
        </p>
      )}
    </div>
  );
});

export default Textarea;
