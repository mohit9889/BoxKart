import AccountLayout from '@/components/account/AccountLayout';

export const metadata = {
  title: 'My Account | BoxKart',
  description: 'Manage your BoxKart orders, quotes, and profile.',
};

export default function Layout({ children }) {
  return <AccountLayout>{children}</AccountLayout>;
}
