'use client';

import { forwardRef } from 'react';
import Icon from '@/components/common/Icon';

/**
 * Select dropdown with label, error, helper text, and all states.
 *
 * @param {{ value: string, label: string }[]} options
 * @param {string} placeholder — First disabled option text
 */
const Select = forwardRef(function Select(
  {
    label,
    error,
    helper,
    id,
    options = [],
    placeholder = 'Select…',
    className = '',
    ...props
  },
  ref
) {
  const inputId = id || `select-${label?.replace(/\s+/g, '-').toLowerCase()}`;

  return (
    <div className={className}>
      {label && (
        <label htmlFor={inputId} className="text-label block mb-1.5">
          {label}
        </label>
      )}
      <div className="relative">
        <select
          ref={ref}
          id={inputId}
          className={`input-bk appearance-none pr-10 ${
            error
              ? 'border-danger! focus:border-danger! focus:shadow-[0_0_0_3px_var(--color-danger-light)]!'
              : ''
          } ${props.disabled ? 'opacity-50 cursor-not-allowed bg-warm-gray' : ''}`}
          aria-invalid={!!error}
          aria-describedby={
            error
              ? `${inputId}-error`
              : helper
                ? `${inputId}-helper`
                : undefined
          }
          {...props}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
          <Icon name="ChevronDown" size={16} className="text-text-tertiary" />
        </div>
      </div>
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

export default Select;
