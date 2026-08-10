'use client';

import Icon from '@/components/common/Icon';

/**
 * Circular icon button with consistent sizing and accessible label.
 *
 * @param {string} icon — Icon name from the Icon map
 * @param {string} label — Required aria-label for accessibility
 * @param {'sm'|'md'|'lg'} size
 */
export default function IconButton({
  icon,
  label,
  size = 'md',
  className = '',
  ...props
}) {
  const sizeMap = {
    sm: { btn: 'p-1.5', icon: 14 },
    md: { btn: 'p-2.5', icon: 20 },
    lg: { btn: 'p-3', icon: 24 },
  };

  const s = sizeMap[size];

  return (
    <button
      className={`${s.btn} rounded-full hover:bg-warm-gray transition-colors ${className}`}
      aria-label={label}
      {...props}
    >
      <Icon name={icon} size={s.icon} />
    </button>
  );
}
