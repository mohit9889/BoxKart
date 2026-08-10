'use client';

import { useState } from 'react';
import { motion } from 'motion/react';
import Link from 'next/link';
import Icon from '@/components/common/Icon';
import { useRouter } from 'next/navigation';

export default function ResetPasswordPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Mock network request
    await new Promise((r) => setTimeout(r, 1500));
    setIsSubmitting(false);
    setIsSuccess(true);

    // Redirect to login after 3 seconds
    setTimeout(() => {
      router.push('/login');
    }, 3000);
  };

  return (
    <div className="min-h-[calc(100vh-140px)] w-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-[#faf8f5]">
      {/* Decorative Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-b from-[#e8e4de]/50 to-transparent blur-[100px] opacity-60 rounded-full" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-white rounded-[2rem] shadow-xl border border-[#e8e4de] p-8 md:p-10 relative z-10"
      >
        {isSuccess ? (
          <div className="text-center py-6">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Icon name="Check" size={32} className="text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-[var(--color-charcoal)] mb-3">
              Password Updated!
            </h2>
            <p className="text-[var(--color-text-secondary)] mb-8">
              Your password has been successfully changed. Redirecting you to
              the login page...
            </p>
            <Icon
              name="Loader2"
              size={24}
              className="animate-spin text-[var(--color-kraft)] mx-auto"
            />
          </div>
        ) : (
          <>
            <div className="mb-8">
              <div className="w-12 h-12 bg-[var(--color-charcoal)] rounded-xl flex items-center justify-center mb-6 shadow-lg">
                <Icon name="ShieldCheck" size={24} className="text-white" />
              </div>
              <h1 className="text-2xl font-bold text-[var(--color-charcoal)] mb-2">
                Create New Password
              </h1>
              <p className="text-sm text-[var(--color-text-secondary)]">
                Your new password must be different from previous used
                passwords.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label
                  htmlFor="password"
                  className="text-sm font-medium text-[var(--color-charcoal)] block"
                >
                  New Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[var(--color-text-tertiary)]">
                    <Icon name="Lock" size={18} />
                  </div>
                  <input
                    id="password"
                    type="password"
                    required
                    minLength={8}
                    className="w-full pl-10 pr-4 py-3 bg-[#faf8f5] border border-[#e8e4de] rounded-xl text-[0.9375rem] text-[var(--color-charcoal)] focus:bg-white focus:border-[var(--color-kraft)] focus:ring-2 focus:ring-[var(--color-kraft-muted)] transition-all outline-none"
                    placeholder="••••••••"
                  />
                </div>
                <p className="text-xs text-[var(--color-text-tertiary)]">
                  Must be at least 8 characters long.
                </p>
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="confirmPassword"
                  className="text-sm font-medium text-[var(--color-charcoal)] block"
                >
                  Confirm Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[var(--color-text-tertiary)]">
                    <Icon name="Lock" size={18} />
                  </div>
                  <input
                    id="confirmPassword"
                    type="password"
                    required
                    minLength={8}
                    className="w-full pl-10 pr-4 py-3 bg-[#faf8f5] border border-[#e8e4de] rounded-xl text-[0.9375rem] text-[var(--color-charcoal)] focus:bg-white focus:border-[var(--color-kraft)] focus:ring-2 focus:ring-[var(--color-kraft-muted)] transition-all outline-none"
                    placeholder="••••••••"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="relative w-full flex items-center justify-center gap-2 py-3 px-4 bg-[var(--color-charcoal)] text-white font-semibold rounded-xl hover:bg-black active:scale-[0.98] transition-all disabled:opacity-70 disabled:cursor-not-allowed group overflow-hidden"
              >
                <div className="absolute inset-0 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                {isSubmitting ? (
                  <Icon name="Loader2" size={20} className="animate-spin" />
                ) : (
                  'Update Password'
                )}
              </button>
            </form>
          </>
        )}
      </motion.div>
      <style jsx global>{`
        @keyframes shimmer {
          100% {
            transform: translateX(100%);
          }
        }
      `}</style>
    </div>
  );
}
