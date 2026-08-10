import Icon from '@/components/common/Icon';

/**
 * Error state placeholder with retry action.
 *
 * @param {string} title
 * @param {string} description
 * @param {Function} onRetry
 */
export default function ErrorState({
  title = 'Something went wrong',
  description = 'We couldn\u2019t load this content. Please try again.',
  onRetry,
  className = '',
}) {
  return (
    <div
      className={`flex flex-col items-center justify-center text-center py-16 px-6 ${className}`}
    >
      <div className="w-16 h-16 bg-danger-light rounded-2xl flex items-center justify-center mb-5">
        <Icon name="AlertCircle" size={28} className="text-danger" />
      </div>
      <h3 className="heading-4 mb-2">{title}</h3>
      <p className="text-body-sm max-w-sm mb-6">{description}</p>
      {onRetry && (
        <button onClick={onRetry} className="btn-primary text-sm">
          <Icon name="RefreshCw" size={14} />
          Try Again
        </button>
      )}
    </div>
  );
}
