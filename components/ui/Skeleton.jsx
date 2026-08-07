/**
 * Skeleton loading placeholder that pulses.
 * Matches common content shapes for shimmer loading states.
 *
 * @param {'text'|'circle'|'rect'|'card'} variant
 */
export default function Skeleton({
  variant = 'text',
  width,
  height,
  className = '',
  count = 1,
}) {
  const baseClass = 'bg-warm-gray animate-pulse rounded-md';

  const variantStyles = {
    text: 'h-4 rounded',
    circle: 'rounded-full',
    rect: 'rounded-lg',
    card: 'rounded-xl h-48',
  };

  const style = {};
  if (width) style.width = width;
  if (height) style.height = height;

  if (count > 1) {
    return (
      <div className={`space-y-3 ${className}`}>
        {Array.from({ length: count }).map((_, i) => (
          <div
            key={i}
            className={`${baseClass} ${variantStyles[variant]}`}
            style={style}
          />
        ))}
      </div>
    );
  }

  return (
    <div
      className={`${baseClass} ${variantStyles[variant]} ${className}`}
      style={style}
      aria-hidden="true"
    />
  );
}
