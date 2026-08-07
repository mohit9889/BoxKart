'use client';

import { forwardRef } from 'react';

/**
 * Radio button with label support.
 * Group multiple Radio components by giving them the same `name` prop.
 */
const Radio = forwardRef(function Radio(
  { label, id, className = '', ...props },
  ref
) {
  const inputId =
    id || `radio-${label?.replace(/\s+/g, '-').toLowerCase()}-${props.value}`;

  return (
    <label
      htmlFor={inputId}
      className={`inline-flex items-center gap-2.5 cursor-pointer ${
        props.disabled ? 'opacity-50 cursor-not-allowed' : ''
      } ${className}`}
    >
      <input
        ref={ref}
        type="radio"
        id={inputId}
        className="w-4 h-4 border-border text-accent accent-accent cursor-pointer shrink-0"
        {...props}
      />
      {label && <span className="text-sm text-text-primary">{label}</span>}
    </label>
  );
});

export default Radio;
