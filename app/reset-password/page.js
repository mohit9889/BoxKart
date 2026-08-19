'use client';

import { useState, Suspense } from 'react';
import { motion } from 'motion/react';
import Link from 'next/link';
import Icon from '@/components/common/Icon';
import { useRouter, useSearchParams } from 'next/navigation';
import { validatePasswordStrong } from '@/lib/validation';
import { authApi } from '@/lib/api/auth';

function ResetPasswordForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get('token');

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState(null);
  const [confirmError, setConfirmError] = useState(null);
  const [globalError, setGlobalError] = useState(null);

  const handlePasswordBlur = () => {
    setPasswordError(validatePasswordStrong(password));
  };

  const handleConfirmBlur = () => {
    if (confirmPassword !== password) {
      setConfirmError('Passwords do not match');
    } else {
      setConfirmError(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setGlobalError(null);

    const pErr = validatePasswordStrong(password);
    setPasswordError(pErr);

    let cErr = null;
    if (confirmPassword !== password) {
      cErr = 'Passwords do not match';
    }
    setConfirmError(cErr);

    if (pErr || cErr) return;

    if (!token) {
      setGlobalError(
        'Invalid or missing reset token. Please request a new link.'
      );
      return;
    }

    setIsSubmitting(true);

    try {
      await authApi.resetPassword({ token, newPassword: password });
      setIsSuccess(true);

      setTimeout(() => {
        router.push('/login');
      }, 3000);
    } catch (error) {
      setGlobalError(
        error.message || 'Failed to reset password. The link might be expired.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
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
            Your password has been successfully changed. Redirecting you to the
            login page...
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
              Your new password must be different from previous used passwords.
            </p>
          </div>

          {globalError && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl text-sm text-red-600 flex items-start gap-3">
              <Icon name="AlertCircle" size={18} className="shrink-0 mt-0.5" />
              <p>{globalError}</p>
            </div>
          )}

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
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onBlur={handlePasswordBlur}
                  className={`w-full pl-10 pr-4 py-3 bg-[#faf8f5] border ${passwordError ? 'border-red-500 focus:ring-red-200 focus:border-red-500' : 'border-[#e8e4de] focus:border-[var(--color-kraft)] focus:ring-[var(--color-kraft-muted)]'} rounded-xl text-[0.9375rem] text-[var(--color-charcoal)] focus:bg-white focus:ring-2 transition-all outline-none`}
                  placeholder="••••••••"
                />
              </div>
              {passwordError ? (
                <p className="text-xs text-red-500">{passwordError}</p>
              ) : (
                <p className="text-xs text-[var(--color-text-tertiary)]">
                  Must be at least 8 characters long.
                </p>
              )}
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
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  onBlur={handleConfirmBlur}
                  className={`w-full pl-10 pr-4 py-3 bg-[#faf8f5] border ${confirmError ? 'border-red-500 focus:ring-red-200 focus:border-red-500' : 'border-[#e8e4de] focus:border-[var(--color-kraft)] focus:ring-[var(--color-kraft-muted)]'} rounded-xl text-[0.9375rem] text-[var(--color-charcoal)] focus:bg-white focus:ring-2 transition-all outline-none`}
                  placeholder="••••••••"
                />
              </div>
              {confirmError && (
                <p className="text-xs text-red-500">{confirmError}</p>
              )}
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
  );
}

export default function ResetPasswordPage() {
  return (
    <div className="min-h-[calc(100vh-140px)] w-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-[#faf8f5]">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-b from-[#e8e4de]/50 to-transparent blur-[100px] opacity-60 rounded-full" />
      </div>

      <Suspense
        fallback={
          <div className="w-full max-w-md flex justify-center py-12">
            <Icon
              name="Loader2"
              size={32}
              className="animate-spin text-[var(--color-kraft)]"
            />
          </div>
        }
      >
        <ResetPasswordForm />
      </Suspense>

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
