'use client';

import { motion, AnimatePresence } from 'motion/react';
import Icon from '@/components/common/Icon';

/**
 * Quantity selector with +/- buttons, direct input, MOQ/max validation,
 * and pricing tier awareness.
 *
 * @param {number} value — Current quantity
 * @param {Function} onChange — Called with new quantity
 * @param {number} min — Minimum order quantity (MOQ)
 * @param {number} max — Maximum quantity
 * @param {number} step — Increment step
 * @param {string} upsellMessage — "Add X more to unlock ₹Y/box"
 */
export default function QuantityInput({
  value,
  onChange,
  min = 100,
  max = 50000,
  step = 50,
  label = 'Quantity',
  error,
  disabled = false,
  upsellMessage,
  className = '',
}) {
  const clamp = (v) => {
    let n = Number(v);
    if (isNaN(n)) return min;
    n = Math.max(min, n);
    if (max) n = Math.min(max, n);
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

  /** Apply clamp on blur to handle intermediate input. */
  const handleBlur = () => {
    onChange(clamp(value));
  };

  const atMin = value <= min;
  const atMax = max && value >= max;

  return (
    <div className={className}>
      {label && <label className="text-label block mb-1.5">{label}</label>}

      <div
        className={`inline-flex items-center rounded-xl border ${
          error ? 'border-danger' : 'border-border'
        } ${disabled ? 'opacity-50' : ''}`}
      >
        <button
          type="button"
          onClick={handleDecrement}
          disabled={disabled || atMin}
          className="px-3 py-2.5 hover:bg-warm-gray transition-colors rounded-l-xl disabled:opacity-30 disabled:cursor-not-allowed"
          aria-label={`Decrease quantity by ${step}`}
        >
          <Icon name="Minus" size={16} />
        </button>

        <input
          type="number"
          value={value}
          onChange={handleInputChange}
          onBlur={handleBlur}
          min={min}
          max={max}
          step={step}
          disabled={disabled}
          className="w-24 text-center font-semibold bg-transparent border-x border-border py-2.5 outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
          aria-label={label}
          aria-invalid={!!error}
        />

        <button
          type="button"
          onClick={handleIncrement}
          disabled={disabled || atMax}
          className="px-3 py-2.5 hover:bg-warm-gray transition-colors rounded-r-xl disabled:opacity-30 disabled:cursor-not-allowed"
          aria-label={`Increase quantity by ${step}`}
        >
          <Icon name="Plus" size={16} />
        </button>
      </div>

      {/* MOQ hint */}
      {!error && (
        <p className="text-caption mt-1.5">
          Min. order: {min.toLocaleString('en-IN')} pcs
        </p>
      )}

      {error && (
        <p className="text-xs text-danger mt-1.5" role="alert">
          {error}
        </p>
      )}

      {/* Upsell message */}
      <AnimatePresence>
        {upsellMessage && !error && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-2"
          >
            <div className="flex items-center gap-2 px-3 py-2 bg-accent-light rounded-lg">
              <Icon name="Zap" size={14} className="text-accent shrink-0" />
              <p className="text-xs font-medium text-accent">{upsellMessage}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
