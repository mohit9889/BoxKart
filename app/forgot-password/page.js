'use client';

import { useState } from 'react';
import { motion } from 'motion/react';
import Link from 'next/link';
import Icon from '@/components/common/Icon';
import { validateEmail } from '@/lib/validation';
import { authApi } from '@/lib/api/auth';

export default function ForgotPasswordPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState(null);

  const handleBlur = () => {
    setEmailError(validateEmail(email));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const err = validateEmail(email);
    setEmailError(err);
    if (err) return;

    setIsSubmitting(true);

    try {
      await authApi.forgotPassword({ email });
      setIsSuccess(true);
    } catch (error) {
      setEmailError(error.message || 'Failed to send reset link');
    } finally {
      setIsSubmitting(false);
    }
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
        <Link
          href="/login"
          className="inline-flex items-center gap-2 text-sm font-medium text-[var(--color-text-secondary)] hover:text-[var(--color-charcoal)] transition-colors group mb-8"
        >
          <Icon
            name="ArrowLeft"
            size={16}
            className="transition-transform group-hover:-translate-x-1"
          />
          Back to Login
        </Link>

        {isSuccess ? (
          <div className="text-center py-6">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Icon name="Mail" size={32} className="text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-[var(--color-charcoal)] mb-3">
              Check your email
            </h2>
            <p className="text-[var(--color-text-secondary)] mb-8">
              We have sent a password reset link to your email address. Please
              check your inbox.
            </p>
            <Link
              href="/login"
              className="w-full py-3 block bg-[#faf8f5] text-[var(--color-charcoal)] font-semibold rounded-xl hover:bg-[#e8e4de] transition-colors border border-[#e8e4de]"
            >
              Return to Login
            </Link>
          </div>
        ) : (
          <>
            <div className="mb-8">
              <div className="w-12 h-12 bg-[var(--color-charcoal)] rounded-xl flex items-center justify-center mb-6 shadow-lg">
                <Icon name="Lock" size={24} className="text-white" />
              </div>
              <h1 className="text-2xl font-bold text-[var(--color-charcoal)] mb-2">
                Reset Password
              </h1>
              <p className="text-sm text-[var(--color-text-secondary)]">
                Enter the email associated with your account and we&apos;ll send
                you a link to reset your password.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label
                  htmlFor="email"
                  className="text-sm font-medium text-[var(--color-charcoal)] block"
                >
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[var(--color-text-tertiary)]">
                    <Icon name="Mail" size={18} />
                  </div>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onBlur={handleBlur}
                    className={`w-full pl-10 pr-4 py-3 bg-[#faf8f5] border ${emailError ? 'border-red-500 focus:ring-red-200 focus:border-red-500' : 'border-[#e8e4de] focus:border-[var(--color-kraft)] focus:ring-[var(--color-kraft-muted)]'} rounded-xl text-[0.9375rem] text-[var(--color-charcoal)] focus:bg-white focus:ring-2 transition-all outline-none`}
                    placeholder="you@company.com"
                  />
                </div>
                {emailError && (
                  <p className="text-xs text-red-500">{emailError}</p>
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
                  'Send Reset Link'
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
