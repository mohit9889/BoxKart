'use client';

import Icon from '@/components/common/Icon';

/**
 * Reusable Button component with variant, size, loading, and disabled support.
 *
 * @param {'primary'|'accent'|'outline'|'kraft'|'ghost'|'danger'} variant
 * @param {'sm'|'md'|'lg'} size
 * @param {boolean} loading
 * @param {boolean} fullWidth
 * @param {string} icon — Icon name (left side)
 * @param {string} iconRight — Icon name (right side)
 */
export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled = false,
  fullWidth = false,
  icon,
  iconRight,
  className = '',
  ...props
}) {
  const baseClass = `btn-${variant}`;

  const sizeClasses = {
    sm: 'text-sm px-3 py-1.5',
    md: '',
    lg: 'text-base px-6 py-3.5',
  };

  const iconSize = { sm: 14, md: 16, lg: 18 };

  return (
    <button
      className={`${baseClass} ${sizeClasses[size]} ${fullWidth ? 'w-full' : ''} ${
        disabled || loading
          ? 'opacity-50 cursor-not-allowed pointer-events-none'
          : ''
      } ${className}`}
      disabled={disabled || loading}
      aria-disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <Icon name="Loader2" size={iconSize[size]} className="animate-spin" />
      ) : icon ? (
        <Icon name={icon} size={iconSize[size]} />
      ) : null}
      {children}
      {!loading && iconRight && <Icon name={iconRight} size={iconSize[size]} />}
    </button>
  );
}
