export const metadata = {
  title: 'Login | BoxKart',
  description:
    'Log in to your BoxKart account to reorder supplies and manage your bulk orders.',
};

import { Suspense } from 'react';
import AuthLayout from '@/components/auth/AuthLayout';

export default function LoginPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AuthLayout mode="login" />
    </Suspense>
  );
}
