'use client';

import { motion } from 'motion/react';
import Icon from '@/components/common/Icon';
import { useState } from 'react';

export default function ProfilePage() {
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleSave = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    setSaveSuccess(false);

    // Mock save delay
    await new Promise((r) => setTimeout(r, 1000));

    setIsSaving(false);
    setSaveSuccess(true);

    setTimeout(() => {
      setSaveSuccess(false);
    }, 3000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div className="card-bk overflow-hidden">
        <div className="p-6 border-b border-[#e8e4de] flex items-center justify-between">
          <div>
            <h2 className="font-bold text-lg text-[var(--color-charcoal)]">
              Business Profile
            </h2>
            <p className="text-sm text-[var(--color-text-secondary)]">
              Manage your personal and company information.
            </p>
          </div>
          {saveSuccess && (
            <motion.span
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="badge badge-accent flex items-center gap-1"
            >
              <Icon name="Check" size={14} /> Saved
            </motion.span>
          )}
        </div>

        <form onSubmit={handleSave} className="p-6 space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-1">
              <label
                htmlFor="fullName"
                className="text-sm font-medium text-[var(--color-charcoal)]"
              >
                Full Name
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[var(--color-text-tertiary)]">
                  <Icon name="User" size={18} />
                </div>
                <input
                  id="fullName"
                  type="text"
                  defaultValue="Mohit Rajput"
                  className="input-bk pl-10"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label
                htmlFor="email"
                className="text-sm font-medium text-[var(--color-charcoal)]"
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
                  defaultValue="mohit@example.com"
                  readOnly
                  className="input-bk pl-10 bg-gray-50 text-[var(--color-text-secondary)] cursor-not-allowed"
                />
              </div>
              <p className="text-xs text-[var(--color-text-tertiary)] mt-1">
                Contact support to change your email.
              </p>
            </div>

            <div className="space-y-1">
              <label
                htmlFor="phone"
                className="text-sm font-medium text-[var(--color-charcoal)]"
              >
                Phone Number
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[var(--color-text-tertiary)]">
                  <Icon name="Phone" size={18} />
                </div>
                <input
                  id="phone"
                  type="tel"
                  defaultValue="+91 98765 43210"
                  className="input-bk pl-10"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label
                htmlFor="company"
                className="text-sm font-medium text-[var(--color-charcoal)]"
              >
                Company Name
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[var(--color-text-tertiary)]">
                  <Icon name="Building2" size={18} />
                </div>
                <input
                  id="company"
                  type="text"
                  defaultValue="Acme Corp Logistics"
                  className="input-bk pl-10"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label
                htmlFor="gstin"
                className="text-sm font-medium text-[var(--color-charcoal)]"
              >
                GSTIN (Optional)
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[var(--color-text-tertiary)]">
                  <Icon name="FileText" size={18} />
                </div>
                <input
                  id="gstin"
                  type="text"
                  placeholder="27AADCB2230M1Z2"
                  className="input-bk pl-10 uppercase"
                />
              </div>
              <p className="text-xs text-[var(--color-text-tertiary)] mt-1">
                Required for B2B tax invoices.
              </p>
            </div>
          </div>

          <div className="pt-4 border-t border-[#e8e4de] flex justify-end">
            <button type="submit" disabled={isSaving} className="btn-primary">
              {isSaving ? (
                <>
                  <Icon name="Loader2" size={18} className="animate-spin" />{' '}
                  Saving...
                </>
              ) : (
                'Save Changes'
              )}
            </button>
          </div>
        </form>
      </div>

      <div className="card-bk overflow-hidden">
        <div className="p-6 border-b border-[#e8e4de]">
          <h2 className="font-bold text-lg text-[var(--color-charcoal)]">
            Security
          </h2>
          <p className="text-sm text-[var(--color-text-secondary)]">
            Update your password to keep your account secure.
          </p>
        </div>
        <form className="p-6 space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-1">
              <label
                htmlFor="currentPassword"
                className="text-sm font-medium text-[var(--color-charcoal)]"
              >
                Current Password
              </label>
              <input
                id="currentPassword"
                type="password"
                className="input-bk"
              />
            </div>
            <div className="space-y-1">
              <label
                htmlFor="newPassword"
                className="text-sm font-medium text-[var(--color-charcoal)]"
              >
                New Password
              </label>
              <input id="newPassword" type="password" className="input-bk" />
            </div>
          </div>
          <div className="pt-4 flex justify-end">
            <button type="button" className="btn-outline">
              Update Password
            </button>
          </div>
        </form>
      </div>
    </motion.div>
  );
}
