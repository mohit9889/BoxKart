'use client';

import AuthForm from './AuthForm';
import Icon from '@/components/common/Icon';
import { motion } from 'motion/react';

export default function AuthLayout({ mode }) {
  return (
    <div className="min-h-[calc(100vh-140px)] w-full flex items-center justify-center py-8 px-4 sm:px-6 lg:px-8 bg-[#faf8f5]">
      {/* Container holding the split layout */}
      <div className="w-full max-w-6xl min-h-[600px] bg-white rounded-[2rem] shadow-2xl flex overflow-hidden border border-[#e8e4de]">
        {/* Left Side - Informational / Branding (Hidden on mobile) */}
        <div className="hidden lg:flex lg:w-1/2 relative bg-[var(--color-charcoal)] p-12 flex-col justify-between overflow-hidden">
          {/* Decorative background shapes */}
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
            <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-[var(--color-kraft)] opacity-20 blur-3xl" />
            <div className="absolute -bottom-32 -right-32 w-96 h-96 rounded-full bg-[var(--color-accent)] opacity-20 blur-3xl" />
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] mix-blend-overlay"></div>
          </div>

          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 text-white text-sm font-medium backdrop-blur-md border border-white/10 mb-8">
              <Icon
                name="Sparkles"
                size={16}
                className="text-[var(--color-kraft-light)]"
              />
              <span>Premium Packaging</span>
            </div>

            <h2 className="text-4xl lg:text-5xl font-bold text-white leading-tight tracking-tight mb-6">
              Empower your
              <br />
              e-commerce journey.
            </h2>

            <p className="text-lg text-white/70 max-w-md font-light leading-relaxed">
              Get access to factory-direct pricing on corrugated boxes, courier
              bags, and sustainable packaging supplies.
            </p>
          </div>

          {/* Feature List */}
          <div className="relative z-10 space-y-5">
            <div className="flex items-center gap-4 text-white">
              <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center border border-white/5">
                <Icon
                  name="Box"
                  size={20}
                  className="text-[var(--color-kraft-light)]"
                />
              </div>
              <div>
                <h4 className="font-semibold text-sm">Low MOQs</h4>
                <p className="text-white/60 text-xs">
                  Start with as little as 100 units.
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4 text-white">
              <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center border border-white/5">
                <Icon
                  name="Truck"
                  size={20}
                  className="text-[var(--color-kraft-light)]"
                />
              </div>
              <div>
                <h4 className="font-semibold text-sm">Fast Dispatch</h4>
                <p className="text-white/60 text-xs">
                  Ships within 24-48 hours across India.
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4 text-white">
              <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center border border-white/5">
                <Icon
                  name="Layers"
                  size={20}
                  className="text-[var(--color-kraft-light)]"
                />
              </div>
              <div>
                <h4 className="font-semibold text-sm">Bulk Discounts</h4>
                <p className="text-white/60 text-xs">
                  Unlock tiers up to 30% off.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Auth Form */}
        <div className="w-full lg:w-1/2 flex flex-col justify-center p-6 sm:p-12 relative bg-[#faf8f5]">
          {/* Decorative background grid for the form side */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(232,228,222,0.5)_1px,transparent_1px),linear-gradient(90deg,rgba(232,228,222,0.5)_1px,transparent_1px)] bg-[size:30px_30px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_20%,transparent_100%)] pointer-events-none" />

          <div className="relative z-10 w-full max-w-sm mx-auto">
            <AuthForm initialMode={mode} />
          </div>
        </div>
      </div>
    </div>
  );
}
