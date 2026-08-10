import Link from 'next/link';
import Icon from '@/components/common/Icon';

/**
 * Custom 404 page — polished, on-brand experience.
 */
export default function NotFound() {
  return (
    <div className="container-bk section-padding flex flex-col items-center justify-center text-center min-h-[60vh]">
      <div className="w-20 h-20 bg-kraft-muted rounded-2xl flex items-center justify-center mb-6">
        <Icon name="PackageX" size={40} className="text-kraft" />
      </div>

      <h1 className="heading-2 mb-3">
        Looks like this box doesn&apos;t exist.
      </h1>

      <p className="text-body max-w-md mb-8">
        The page you&apos;re looking for may have been moved, removed, or never
        existed. Let&apos;s get you back to the right packaging.
      </p>

      <div className="flex flex-wrap gap-3 justify-center">
        <Link href="/" className="btn-primary">
          Back to Home
        </Link>
        <Link href="/products" className="btn-outline">
          Browse Packaging
        </Link>
      </div>
    </div>
  );
}
