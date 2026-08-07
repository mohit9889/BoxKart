/**
 * Visual divider line. Wraps a styled <hr>.
 *
 * @param {'horizontal'|'vertical'} direction
 * @param {'sm'|'md'|'lg'} spacing — margin around the divider
 */
export default function Divider({
  direction = 'horizontal',
  spacing = 'md',
  className = '',
}) {
  const spacingMap = {
    sm: direction === 'horizontal' ? 'my-3' : 'mx-3',
    md: direction === 'horizontal' ? 'my-6' : 'mx-6',
    lg: direction === 'horizontal' ? 'my-10' : 'mx-10',
  };

  if (direction === 'vertical') {
    return (
      <div
        className={`w-px bg-border self-stretch ${spacingMap[spacing]} ${className}`}
        role="separator"
        aria-orientation="vertical"
      />
    );
  }

  return (
    <hr
      className={`border-t border-border ${spacingMap[spacing]} ${className}`}
    />
  );
}
