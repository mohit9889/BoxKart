'use client';

import Icon from '@/components/Icon';

/**
 * Dimension input group for Length × Width × Height with unit selector.
 *
 * @param {{ length: number, width: number, height: number }} value
 * @param {Function} onChange — Called with updated dimensions object
 * @param {'inch'|'cm'} unit
 * @param {Function} onUnitChange
 */
export default function DimensionInput({
  value = { length: '', width: '', height: '' },
  onChange,
  unit = 'inch',
  onUnitChange,
  error,
  label = 'Dimensions',
  className = '',
}) {
  const handleFieldChange = (field) => (e) => {
    const raw = e.target.value;
    // Allow empty or numeric input
    if (raw === '' || /^\d*\.?\d*$/.test(raw)) {
      onChange({ ...value, [field]: raw === '' ? '' : Number(raw) || raw });
    }
  };

  const fields = [
    { key: 'length', label: 'L', placeholder: 'Length' },
    { key: 'width', label: 'W', placeholder: 'Width' },
    { key: 'height', label: 'H', placeholder: 'Height' },
  ];

  return (
    <div className={className}>
      <div className="flex items-center justify-between mb-1.5">
        <label className="text-label">{label}</label>
        {onUnitChange && (
          <div className="flex bg-warm-gray rounded-lg p-0.5">
            {['inch', 'cm'].map((u) => (
              <button
                key={u}
                type="button"
                onClick={() => onUnitChange(u)}
                className={`px-2.5 py-1 text-xs font-medium rounded-md transition-colors ${
                  unit === u
                    ? 'bg-white text-charcoal shadow-sm'
                    : 'text-text-tertiary hover:text-text-secondary'
                }`}
              >
                {u}
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="flex items-center gap-2">
        {fields.map((field, i) => (
          <div key={field.key} className="flex items-center gap-2 flex-1">
            {i > 0 && (
              <span className="text-text-tertiary text-sm font-medium">×</span>
            )}
            <div className="relative flex-1">
              <input
                type="text"
                inputMode="decimal"
                value={value[field.key]}
                onChange={handleFieldChange(field.key)}
                placeholder={field.placeholder}
                className={`input-bk text-center text-sm ${
                  error ? 'border-danger!' : ''
                }`}
                aria-label={`${field.placeholder} in ${unit}`}
              />
              <span className="absolute right-2 top-1/2 -translate-y-1/2 text-xs text-text-tertiary pointer-events-none">
                {field.label}
              </span>
            </div>
          </div>
        ))}
      </div>

      {error && (
        <p className="text-xs text-danger mt-1.5" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
