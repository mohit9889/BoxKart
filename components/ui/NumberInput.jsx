'use client';

import Icon from '@/components/Icon';

/**
 * Number input with +/- stepper buttons, min/max, and step validation.
 * Supports label, error, helper, and disabled states.
 */
export default function NumberInput({
  label,
  value,
  onChange,
  min = 0,
  max,
  step = 1,
  error,
  helper,
  id,
  disabled = false,
  className = '',
}) {
  const inputId = id || `number-${label?.replace(/\s+/g, '-').toLowerCase()}`;

  /** Clamp a value within min/max bounds. */
  const clamp = (v) => {
    let n = Number(v);
    if (isNaN(n)) return min;
    if (min !== undefined) n = Math.max(min, n);
    if (max !== undefined) n = Math.min(max, n);
    return n;
  };

  const handleDecrement = () => {
    onChange(clamp(value - step));
  };

  const handleIncrement = () => {
    onChange(clamp(value + step));
  };

  const handleInputChange = (e) => {
    const raw = e.target.value;
    if (raw === '') {
      onChange(min);
      return;
    }
    onChange(clamp(raw));
  };

  const atMin = min !== undefined && value <= min;
  const atMax = max !== undefined && value >= max;

  return (
    <div className={className}>
      {label && (
        <label htmlFor={inputId} className="text-label block mb-1.5">
          {label}
        </label>
      )}
      <div
        className={`inline-flex items-center rounded-xl border ${
          error ? 'border-danger' : 'border-border'
        } ${disabled ? 'opacity-50' : ''}`}
      >
        <button
          type="button"
          onClick={handleDecrement}
          disabled={disabled || atMin}
          className="p-2.5 hover:bg-warm-gray transition-colors rounded-l-xl disabled:opacity-30 disabled:cursor-not-allowed"
          aria-label="Decrease"
        >
          <Icon name="Minus" size={14} />
        </button>
        <input
          id={inputId}
          type="number"
          value={value}
          onChange={handleInputChange}
          min={min}
          max={max}
          step={step}
          disabled={disabled}
          className="w-16 text-center text-sm font-semibold bg-transparent border-x border-border py-2 outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
          aria-invalid={!!error}
          aria-describedby={
            error
              ? `${inputId}-error`
              : helper
                ? `${inputId}-helper`
                : undefined
          }
        />
        <button
          type="button"
          onClick={handleIncrement}
          disabled={disabled || atMax}
          className="p-2.5 hover:bg-warm-gray transition-colors rounded-r-xl disabled:opacity-30 disabled:cursor-not-allowed"
          aria-label="Increase"
        >
          <Icon name="Plus" size={14} />
        </button>
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
}
