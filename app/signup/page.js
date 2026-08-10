export const metadata = {
  title: 'Sign Up | BoxKart',
  description:
    'Create a BoxKart account to unlock bulk discounts, easy reordering, and custom packaging solutions.',
};

import AuthLayout from '@/components/auth/AuthLayout';

export default function SignupPage() {
  return <AuthLayout mode="signup" />;
}
