import Icon from '@/components/Icon';
import Link from 'next/link';

/**
 * Empty state placeholder for lists, search results, etc.
 *
 * @param {string} icon — Icon name
 * @param {string} title
 * @param {string} description
 * @param {{ label: string, href: string }[]} actions — CTA buttons
 */
export default function EmptyState({
  icon = 'Package',
  title = 'Nothing here yet',
  description,
  actions = [],
  className = '',
}) {
  return (
    <div
      className={`flex flex-col items-center justify-center text-center py-16 px-6 ${className}`}
    >
      <div className="w-16 h-16 bg-warm-gray rounded-2xl flex items-center justify-center mb-5">
        <Icon name={icon} size={28} className="text-text-tertiary" />
      </div>
      <h3 className="heading-4 mb-2">{title}</h3>
      {description && (
        <p className="text-body-sm max-w-sm mb-6">{description}</p>
      )}
      {actions.length > 0 && (
        <div className="flex flex-wrap gap-3 justify-center">
          {actions.map((action, i) => (
            <Link
              key={action.label}
              href={action.href}
              className={
                i === 0 ? 'btn-primary text-sm' : 'btn-outline text-sm'
              }
            >
              {action.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
