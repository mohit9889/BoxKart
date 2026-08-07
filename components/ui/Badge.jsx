import Icon from '@/components/Icon';

/**
 * Badge component for labels, tags, and status indicators.
 *
 * @param {'accent'|'kraft'|'charcoal'|'danger'|'warning'|'info'} variant
 * @param {string} icon — Optional icon name
 */
export default function Badge({
  children,
  variant = 'accent',
  icon,
  className = '',
  ...props
}) {
  return (
    <span className={`badge badge-${variant} ${className}`} {...props}>
      {icon && <Icon name={icon} size={12} className="mr-1" />}
      {children}
    </span>
  );
}
