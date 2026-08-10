import Icon from '@/components/common/Icon';

/**
 * Chip/Tag for filters, categories, and multi-select items.
 *
 * @param {boolean} selected
 * @param {boolean} removable
 * @param {Function} onRemove
 * @param {Function} onClick
 */
export default function Chip({
  children,
  selected = false,
  removable = false,
  onRemove,
  onClick,
  className = '',
  ...props
}) {
  const baseClasses =
    'inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium transition-colors';

  const stateClasses = selected
    ? 'bg-charcoal text-white'
    : 'bg-warm-gray text-text-secondary hover:bg-border hover:text-charcoal';

  const Component = onClick ? 'button' : 'span';

  return (
    <Component
      className={`${baseClasses} ${stateClasses} ${onClick ? 'cursor-pointer' : ''} ${className}`}
      onClick={onClick}
      {...props}
    >
      {children}
      {removable && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onRemove?.();
          }}
          className="ml-0.5 p-0.5 rounded-full hover:bg-white/20 transition-colors"
          aria-label={`Remove ${children}`}
        >
          <Icon name="X" size={12} />
        </button>
      )}
    </Component>
  );
}
