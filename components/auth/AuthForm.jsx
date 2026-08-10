'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Link from 'next/link';
import Icon from '@/components/common/Icon';
import { useRouter } from 'next/navigation';
import { authService } from '@/services/auth.service';

export default function AuthForm({ initialMode = 'login' }) {
  const [isLogin, setIsLogin] = useState(initialMode === 'login');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const toggleMode = () => {
    setIsLogin(!isLogin);
    // Optionally push to URL without full reload
    window.history.pushState(null, '', isLogin ? '/signup' : '/login');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const email = e.target.email.value;
      const password = e.target.password.value;

      if (isLogin) {
        await authService.login(email, password);
      } else {
        const name = e.target.name.value;
        await authService.signup(name, email, password);
      }

      // Refresh the page or dispatch an event if needed, then redirect
      // Dispatching a storage event helps components listening to localStorage update (like Header)
      window.dispatchEvent(new Event('storage'));
      router.push('/account');
    } catch (error) {
      console.error('Authentication failed:', error);
      // Here you would typically show a toast or error message
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <motion.div layout className="relative w-full">
        <div className="relative z-10">
          {/* Header */}
          <div className="text-center mb-8">
            <motion.div
              layout="position"
              className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-[var(--color-charcoal)] text-white mb-4 shadow-lg"
            >
              <Icon name="Box" size={24} />
            </motion.div>
            <motion.h1
              layout="position"
              className="text-2xl font-bold text-[var(--color-charcoal)] mb-2"
            >
              {isLogin ? 'Welcome back' : 'Create an account'}
            </motion.h1>
            <motion.p
              layout="position"
              className="text-sm text-[var(--color-text-secondary)]"
            >
              {isLogin
                ? 'Enter your details to access your account.'
                : 'Join BoxKart for bulk discounts and more.'}
            </motion.p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <AnimatePresence mode="popLayout" initial={false}>
              {!isLogin && (
                <motion.div
                  key="name-field"
                  initial={{ opacity: 0, height: 0, scale: 0.95 }}
                  animate={{ opacity: 1, height: 'auto', scale: 1 }}
                  exit={{ opacity: 0, height: 0, scale: 0.95 }}
                  transition={{ duration: 0.3, ease: 'easeInOut' }}
                  className="space-y-1"
                >
                  <label
                    htmlFor="name"
                    className="text-sm font-medium text-[var(--color-charcoal)] block"
                  >
                    Full Name
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[var(--color-text-tertiary)]">
                      <Icon name="User" size={18} />
                    </div>
                    <input
                      id="name"
                      type="text"
                      required={!isLogin}
                      className="w-full pl-10 pr-4 py-2.5 bg-[#faf8f5] border border-[#e8e4de] rounded-xl text-[0.9375rem] text-[var(--color-charcoal)] focus:bg-white focus:border-[var(--color-kraft)] focus:ring-2 focus:ring-[var(--color-kraft-muted)] transition-all outline-none"
                      placeholder="John Doe"
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <motion.div layout="position" className="space-y-1">
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
                  required
                  className="w-full pl-10 pr-4 py-2.5 bg-[#faf8f5] border border-[#e8e4de] rounded-xl text-[0.9375rem] text-[var(--color-charcoal)] focus:bg-white focus:border-[var(--color-kraft)] focus:ring-2 focus:ring-[var(--color-kraft-muted)] transition-all outline-none"
                  placeholder="you@company.com"
                />
              </div>
            </motion.div>

            <motion.div layout="position" className="space-y-1">
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="text-sm font-medium text-[var(--color-charcoal)] block"
                >
                  Password
                </label>
                {isLogin && (
                  <Link
                    href="/forgot-password"
                    className="text-xs font-semibold text-[var(--color-kraft)] hover:text-[var(--color-kraft-light)] transition-colors"
                  >
                    Forgot password?
                  </Link>
                )}
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[var(--color-text-tertiary)]">
                  <Icon name="Lock" size={18} />
                </div>
                <input
                  id="password"
                  type="password"
                  required
                  className="w-full pl-10 pr-4 py-2.5 bg-[#faf8f5] border border-[#e8e4de] rounded-xl text-[0.9375rem] text-[var(--color-charcoal)] focus:bg-white focus:border-[var(--color-kraft)] focus:ring-2 focus:ring-[var(--color-kraft-muted)] transition-all outline-none"
                  placeholder="••••••••"
                />
              </div>
            </motion.div>

            <motion.div layout="position" className="pt-2">
              <button
                type="submit"
                disabled={isLoading}
                className="relative w-full flex items-center justify-center gap-2 py-3 px-4 bg-[var(--color-charcoal)] text-white font-semibold rounded-xl hover:bg-[var(--color-charcoal-light)] active:scale-[0.98] transition-all disabled:opacity-70 disabled:cursor-not-allowed overflow-hidden group"
              >
                {/* Shine effect on hover */}
                <div className="absolute inset-0 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/10 to-transparent" />

                {isLoading ? (
                  <Icon name="Loader2" size={20} className="animate-spin" />
                ) : (
                  <>
                    <span>{isLogin ? 'Sign In' : 'Create Account'}</span>
                    <Icon
                      name="ArrowRight"
                      size={18}
                      className="transition-transform group-hover:translate-x-1"
                    />
                  </>
                )}
              </button>
            </motion.div>
          </form>

          {/* Divider */}
          <motion.div
            layout="position"
            className="flex items-center gap-3 my-8"
          >
            <div className="h-px bg-[#e8e4de] flex-1" />
            <span className="text-xs font-medium text-[var(--color-text-tertiary)] uppercase tracking-wider">
              Or continue with
            </span>
            <div className="h-px bg-[#e8e4de] flex-1" />
          </motion.div>

          {/* Social Logins */}
          <motion.div layout="position" className="w-full">
            <button
              type="button"
              className="w-full flex items-center justify-center gap-2 py-2.5 px-4 bg-white border border-[#e8e4de] rounded-xl hover:bg-[#faf8f5] hover:border-[#d4cfc7] transition-all active:scale-[0.98] text-sm font-medium text-[var(--color-charcoal)]"
            >
              <svg
                className="w-5 h-5"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  fill="#4285F4"
                />
                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="#34A853"
                />
                <path
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  fill="#FBBC05"
                />
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  fill="#EA4335"
                />
              </svg>
              Continue with Google
            </button>
          </motion.div>
        </div>
      </motion.div>

      {/* Toggle Link */}
      <motion.div layout className="mt-8 text-center">
        <p className="text-[var(--color-text-secondary)] text-sm">
          {isLogin ? "Don't have an account? " : 'Already have an account? '}
          <button
            onClick={toggleMode}
            className="font-semibold text-[var(--color-charcoal)] hover:text-[var(--color-kraft)] transition-colors inline-flex items-center gap-1"
          >
            {isLogin ? 'Sign up' : 'Log in'}
            <span aria-hidden="true">&rarr;</span>
          </button>
        </p>
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
