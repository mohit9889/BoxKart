import Icon from '@/components/common/Icon';

/**
 * Spinner loading indicator.
 *
 * @param {'sm'|'md'|'lg'} size
 */
export default function Spinner({
  size = 'md',
  className = '',
  label = 'Loading…',
}) {
  const sizeMap = { sm: 16, md: 24, lg: 32 };

  return (
    <div
      className={`inline-flex items-center justify-center ${className}`}
      role="status"
    >
      <Icon
        name="Loader2"
        size={sizeMap[size]}
        className="animate-spin text-text-tertiary"
      />
      <span className="sr-only">{label}</span>
    </div>
  );
}
