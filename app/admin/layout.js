import AdminLayout from '@/components/admin/AdminLayout';

export const metadata = {
  title: 'Admin Dashboard | BoxKart',
  description: 'Manage BoxKart products, orders, and RFQs.',
};

export default function Layout({ children }) {
  return <AdminLayout>{children}</AdminLayout>;
}
