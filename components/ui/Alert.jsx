import Icon from '@/components/Icon';

/**
 * Alert banner for informational, success, warning, or error messages.
 *
 * @param {'info'|'success'|'warning'|'error'} variant
 * @param {string} icon — Optional custom icon name
 */
export default function Alert({
  children,
  variant = 'info',
  icon,
  className = '',
  ...props
}) {
  const config = {
    info: {
      bg: 'bg-info-light',
      border: 'border-info/20',
      text: 'text-info',
      icon: icon || 'Info',
    },
    success: {
      bg: 'bg-success-light',
      border: 'border-success/20',
      text: 'text-success',
      icon: icon || 'CheckCircle',
    },
    warning: {
      bg: 'bg-warning-light',
      border: 'border-warning/20',
      text: 'text-warning',
      icon: icon || 'AlertTriangle',
    },
    error: {
      bg: 'bg-danger-light',
      border: 'border-danger/20',
      text: 'text-danger',
      icon: icon || 'AlertCircle',
    },
  };

  const c = config[variant];

  return (
    <div
      role="alert"
      className={`flex items-start gap-3 p-4 rounded-xl border ${c.bg} ${c.border} ${className}`}
      {...props}
    >
      <Icon name={c.icon} size={18} className={`${c.text} shrink-0 mt-0.5`} />
      <div className="text-sm text-text-primary leading-relaxed">
        {children}
      </div>
    </div>
  );
}
