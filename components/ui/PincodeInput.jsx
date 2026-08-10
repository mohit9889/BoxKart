'use client';

import { useState } from 'react';
import Icon from '@/components/common/Icon';

/**
 * Indian pincode input with validation and delivery check.
 *
 * @param {Function} onCheck — Called with valid 6-digit pincode
 * @param {'idle'|'loading'|'success'|'error'|'unavailable'} status
 * @param {string} message — Status message (e.g. "3–5 business days")
 */
export default function PincodeInput({
  onCheck,
  status = 'idle',
  message,
  className = '',
}) {
  const [pincode, setPincode] = useState('');

  const isValid = /^[1-9][0-9]{5}$/.test(pincode);

  const handleChange = (e) => {
    const val = e.target.value.replace(/\D/g, '').slice(0, 6);
    setPincode(val);
  };

  const handleCheck = () => {
    if (isValid) {
      onCheck?.(pincode);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && isValid) {
      handleCheck();
    }
  };

  const statusConfig = {
    idle: null,
    loading: null,
    success: {
      icon: 'CheckCircle',
      color: 'text-accent',
      bg: 'bg-accent-light',
    },
    error: {
      icon: 'AlertCircle',
      color: 'text-danger',
      bg: 'bg-danger-light',
    },
    unavailable: {
      icon: 'Info',
      color: 'text-warning',
      bg: 'bg-warning-light',
    },
  };

  const cfg = statusConfig[status];

  return (
    <div className={className}>
      <label htmlFor="pincode-input" className="text-label block mb-1.5">
        Delivery Pincode
      </label>
      <div className="flex gap-2">
        <input
          id="pincode-input"
          type="text"
          inputMode="numeric"
          pattern="[0-9]*"
          value={pincode}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          placeholder="Enter 6-digit pincode"
          maxLength={6}
          className="input-bk flex-1"
          aria-describedby="pincode-status"
        />
        <button
          type="button"
          onClick={handleCheck}
          disabled={!isValid || status === 'loading'}
          className="btn-primary text-sm px-4 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {status === 'loading' ? (
            <Icon name="Loader2" size={16} className="animate-spin" />
          ) : (
            'Check'
          )}
        </button>
      </div>

      {/* Status message */}
      {cfg && message && (
        <div
          id="pincode-status"
          className={`flex items-center gap-2 mt-2 px-3 py-2 rounded-lg ${cfg.bg}`}
        >
          <Icon name={cfg.icon} size={14} className={cfg.color} />
          <p className={`text-xs font-medium ${cfg.color}`}>{message}</p>
        </div>
      )}
    </div>
  );
}
