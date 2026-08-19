export const metadata = {
  title: 'Sign Up | BoxKart',
  description:
    'Create a BoxKart account to unlock bulk discounts, easy reordering, and custom packaging solutions.',
};

import { Suspense } from 'react';
import AuthLayout from '@/components/auth/AuthLayout';

export default function SignupPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AuthLayout mode="signup" />
    </Suspense>
  );
}
