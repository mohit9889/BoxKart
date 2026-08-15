'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import Icon from '@/components/common/Icon';
import { useAuth } from '@/components/auth/AuthContext';
import { useEffect, useState } from 'react';

const ADMIN_TABS = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    icon: 'LayoutDashboard',
    href: '/admin',
  },
  {
    id: 'products',
    label: 'Products',
    icon: 'Package',
    href: '/admin/products',
  },
  { id: 'rfqs', label: 'RFQs', icon: 'FileText', href: '/admin/rfqs' },
  {
    id: 'inquiries',
    label: 'Inquiries',
    icon: 'Inbox',
    href: '/admin/inquiries',
  },
  { id: 'quotes', label: 'Quotes', icon: 'FileText', href: '/admin/quotes' },
  {
    id: 'orders',
    label: 'Orders',
    icon: 'ShoppingCart',
    href: '/admin/orders',
  },
];

export default function AdminLayout({ children }) {
  const pathname = usePathname();
  const router = useRouter();
  const { isAuthenticated, user, isLoading, logout } = useAuth();
  const isClientAuth = !isLoading
    ? isAuthenticated && user?.role === 'ADMIN'
    : null;

  useEffect(() => {
    if (!isLoading) {
      if (!isClientAuth && pathname !== '/admin/login') {
        router.replace('/admin/login');
      }
    }
  }, [isLoading, isClientAuth, pathname, router]);

  const handleLogout = async () => {
    await logout();
    router.push('/admin/login');
  };

  // Prevent flash of protected content before redirect
  if (
    isLoading ||
    isClientAuth === null ||
    (!isClientAuth && pathname !== '/admin/login')
  ) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Icon name="Loader2" size={32} className="animate-spin text-gray-400" />
      </div>
    );
  }

  // If on login page, don't show the layout sidebar
  if (pathname === '/admin/login') {
    return children;
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-[#1a1a1a] text-white flex-shrink-0 flex flex-col hidden md:flex">
        <div className="p-6 border-b border-white/10">
          <Link href="/admin" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-white/10 rounded flex items-center justify-center">
              <Icon name="Settings" size={18} className="text-white" />
            </div>
            <span className="font-bold text-xl tracking-tight">
              BoxKart Admin
            </span>
          </Link>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          {ADMIN_TABS.map((tab) => {
            const isActive =
              tab.href === '/admin'
                ? pathname === '/admin'
                : pathname.startsWith(tab.href);

            return (
              <Link
                key={tab.id}
                href={tab.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-white/10 text-white'
                    : 'text-white/60 hover:bg-white/5 hover:text-white'
                }`}
              >
                <Icon name={tab.icon} size={18} />
                {tab.label}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-white/10">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-white/60 hover:text-white hover:bg-white/5 transition-colors w-full text-left"
          >
            <Icon name="LogOut" size={18} />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 min-w-0 flex flex-col h-screen overflow-hidden">
        {/* Mobile Header (Only visible on small screens) */}
        <header className="md:hidden bg-[#1a1a1a] text-white p-4 flex items-center justify-between shrink-0">
          <span className="font-bold">BoxKart Admin</span>
          <button
            onClick={handleLogout}
            className="text-white/60 hover:text-white"
          >
            <Icon name="LogOut" size={20} />
          </button>
        </header>

        {/* Scrollable Content Area */}
        <div className="flex-1 overflow-y-auto p-4 md:p-8">{children}</div>
      </main>
    </div>
  );
}
