'use client';

import Link from 'next/link';
import Icon from '@/components/Icon';

/**
 * Global error boundary — catches unhandled errors at the route level.
 */
export default function GlobalError({ error, reset }) {
  return (
    <div className="container-bk section-padding flex flex-col items-center justify-center text-center min-h-[60vh]">
      <div className="w-20 h-20 bg-danger-light rounded-2xl flex items-center justify-center mb-6">
        <Icon name="AlertTriangle" size={40} className="text-danger" />
      </div>

      <h1 className="heading-2 mb-3">Something went wrong</h1>

      <p className="text-body max-w-md mb-8">
        We encountered an unexpected error. This has been noted and we&apos;re
        working on a fix.
      </p>

      <div className="flex flex-wrap gap-3 justify-center">
        <button onClick={reset} className="btn-primary">
          Try Again
        </button>
        <Link href="/" className="btn-outline">
          Back to Home
        </Link>
      </div>

      {process.env.NODE_ENV === 'development' && error?.message && (
        <pre className="mt-8 text-left text-xs text-danger bg-danger-light p-4 rounded-xl max-w-2xl overflow-x-auto">
          {error.message}
        </pre>
      )}
    </div>
  );
}
