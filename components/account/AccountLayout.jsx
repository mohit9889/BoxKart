'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import Icon from '@/components/common/Icon';
import { authService } from '@/services/auth.service';

const TABS = [
  {
    id: 'overview',
    label: 'Overview',
    icon: 'LayoutDashboard',
    href: '/account',
  },
  { id: 'orders', label: 'Orders', icon: 'Package', href: '/account/orders' },
  { id: 'rfqs', label: 'Custom RFQs', icon: 'FileText', href: '/account/rfqs' },
  { id: 'quotes', label: 'Quotes', icon: 'FileText', href: '/account/quotes' },
  {
    id: 'addresses',
    label: 'Addresses',
    icon: 'MapPin',
    href: '/account/addresses',
  },
  {
    id: 'profile',
    label: 'Business Profile',
    icon: 'Building2',
    href: '/account/profile',
  },
];

export default function AccountLayout({ children }) {
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (!authService.isAuthenticated()) {
      router.push('/login');
    }
  }, [router]);

  const handleLogout = async () => {
    await authService.logout();
    window.dispatchEvent(new Event('storage'));
    router.push('/');
  };

  return (
    <div className="container-bk section-padding">
      <h1 className="text-3xl font-bold text-[var(--color-charcoal)] mb-8">
        My Account
      </h1>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar */}
        <div className="lg:w-64 shrink-0">
          <nav className="flex lg:flex-col gap-1 overflow-x-auto lg:overflow-visible pb-2 lg:pb-0 scrollbar-hide">
            {TABS.map((tab) => {
              // Exact match for overview, startsWith for others to catch nested routes like /account/orders/123
              const isActive =
                tab.href === '/account'
                  ? pathname === '/account'
                  : pathname.startsWith(tab.href);

              return (
                <Link
                  key={tab.id}
                  href={tab.href}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium whitespace-nowrap transition-all ${
                    isActive
                      ? 'bg-[var(--color-charcoal)] text-white shadow-md'
                      : 'text-[var(--color-text-secondary)] hover:bg-[#e8e4de] hover:text-[var(--color-charcoal)]'
                  }`}
                >
                  <Icon
                    name={tab.icon}
                    size={18}
                    className={
                      isActive
                        ? 'text-white'
                        : 'text-[var(--color-text-tertiary)]'
                    }
                  />
                  {tab.label}
                </Link>
              );
            })}

            <div className="hidden lg:block my-4 border-t border-[#e8e4de]"></div>

            <button
              onClick={handleLogout}
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium whitespace-nowrap transition-all text-[var(--color-danger)] hover:bg-[var(--color-danger-light)] text-left w-full"
            >
              <Icon
                name="LogOut"
                size={18}
                className="text-[var(--color-danger)]"
              />
              Logout
            </button>
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1 min-w-0">{children}</div>
      </div>
    </div>
  );
}
