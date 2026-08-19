'use client';

import { motion } from 'motion/react';
import Link from 'next/link';
import Icon from '@/components/common/Icon';
import { useState, useEffect } from 'react';
import { useAuth } from '@/components/auth/AuthContext';
import { Skeleton } from '@/components/ui';
import {
  validateRequired,
  validatePhone,
  validateGSTIN,
  validatePasswordStrong,
} from '@/lib/validation';
import { authApi } from '@/lib/api/auth';

export default function ProfilePage() {
  const { user, isLoading, updateProfile } = useAuth();
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    company: '',
    gstin: '',
  });

  const [formErrors, setFormErrors] = useState({});

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
  });
  const [passwordErrors, setPasswordErrors] = useState({});

  useEffect(() => {
    let mounted = true;
    if (user && mounted) {
      setTimeout(() => {
        setFormData((prev) => ({
          ...prev,
          fullName:
            user.name ||
            (user.firstName
              ? user.firstName + ' ' + (user.lastName || '')
              : '') ||
            'Valued Customer',
          email: user.email || '',
          phone: user.phone || '',
          company: user.company || '',
          gstin: user.gstin || '',
        }));
      }, 0);
    }
    return () => {
      mounted = false;
    };
  }, [user]);

  const handleBlur = (field) => {
    let err = null;
    if (field === 'fullName')
      err = validateRequired(formData.fullName, 'Full Name');
    if (field === 'phone') err = validatePhone(formData.phone);
    if (field === 'gstin' && formData.gstin)
      err = validateGSTIN(formData.gstin);

    setFormErrors((prev) => ({ ...prev, [field]: err }));
  };

  const handleSave = async (e) => {
    e.preventDefault();

    const errors = {};
    errors.fullName = validateRequired(formData.fullName, 'Full Name');
    errors.phone = validatePhone(formData.phone);
    if (formData.gstin) {
      errors.gstin = validateGSTIN(formData.gstin);
    }

    setFormErrors(errors);
    if (Object.values(errors).some((err) => err !== null)) return;

    setIsSaving(true);
    setSaveSuccess(false);

    try {
      const parts = formData.fullName.trim().split(' ');
      const firstName = parts[0];
      const lastName = parts.length > 1 ? parts.slice(1).join(' ') : undefined;

      await updateProfile({
        firstName,
        lastName,
        phone: formData.phone,
        company: formData.company,
        gstin: formData.gstin,
      });
    } catch (error) {
      console.error('Failed to update profile', error);
      // Could show error here
    }

    setIsSaving(false);
    setSaveSuccess(true);

    setTimeout(() => {
      setSaveSuccess(false);
    }, 3000);
  };

  const handlePasswordBlur = (field) => {
    let err = null;
    if (field === 'currentPassword')
      err = validateRequired(passwordData.currentPassword, 'Current Password');
    if (field === 'newPassword')
      err = validatePasswordStrong(passwordData.newPassword);

    setPasswordErrors((prev) => ({ ...prev, [field]: err }));
  };

  const [isUpdatingPassword, setIsUpdatingPassword] = useState(false);
  const [passwordGlobalError, setPasswordGlobalError] = useState(null);
  const [passwordSuccess, setPasswordSuccess] = useState(false);

  const handleUpdatePassword = async (e) => {
    e.preventDefault();
    setPasswordGlobalError(null);
    setPasswordSuccess(false);

    const errors = {};
    errors.currentPassword = validateRequired(
      passwordData.currentPassword,
      'Current Password'
    );
    errors.newPassword = validatePasswordStrong(passwordData.newPassword);

    setPasswordErrors(errors);
    if (Object.values(errors).some((err) => err !== null)) return;

    setIsUpdatingPassword(true);
    try {
      await authApi.updatePassword({
        currentPassword: passwordData.currentPassword,
        newPassword: passwordData.newPassword,
      });
      setPasswordSuccess(true);
      setPasswordData({ currentPassword: '', newPassword: '' });
      setTimeout(() => setPasswordSuccess(false), 3000);
    } catch (error) {
      setPasswordGlobalError(error.message || 'Failed to update password');
    } finally {
      setIsUpdatingPassword(false);
    }
  };

  const getInitials = (name) => {
    if (!name) return 'BK';
    const parts = name.trim().split(' ');
    if (parts.length > 1) {
      return (parts[0][0] + parts[1][0]).toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className="space-y-8 max-w-4xl"
    >
      <div className="card-bk overflow-hidden shadow-sm">
        <div className="px-6 py-5 border-b border-[#e8e4de] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-[#faf8f5]/50">
          <div>
            <h2 className="font-bold text-lg text-[var(--color-charcoal)] flex items-center gap-2">
              <Icon
                name="User"
                size={18}
                className="text-[var(--color-kraft)]"
              />
              Profile Details
            </h2>
            <p className="text-sm text-[var(--color-text-secondary)] mt-0.5">
              Manage your personal and contact information.
            </p>
          </div>
          {saveSuccess && (
            <motion.div
              initial={{ opacity: 0, y: -5, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              className="bg-[#edfdf2] text-[var(--color-accent)] border border-[#a7f3d0] px-3 py-1.5 rounded-full text-xs font-medium flex items-center gap-1.5 shadow-sm"
            >
              <Icon name="CheckCircle" size={14} /> Profile updated
            </motion.div>
          )}
        </div>

        <form onSubmit={handleSave} className="p-6 space-y-6 sm:p-8">
          {isLoading ? (
            <div className="grid md:grid-cols-2 gap-6 gap-y-8">
              <Skeleton variant="text" height="50px" />
              <Skeleton variant="text" height="50px" />
              <Skeleton variant="text" height="50px" />
              <Skeleton variant="text" height="50px" />
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-6 gap-y-8">
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
                    value={formData.fullName}
                    onChange={(e) =>
                      setFormData({ ...formData, fullName: e.target.value })
                    }
                    onBlur={() => handleBlur('fullName')}
                    className={`input-bk !pl-10 h-11 ${formErrors.fullName ? 'border-red-500 focus:border-red-500 focus:ring-red-200' : ''}`}
                    placeholder="Full Name"
                  />
                </div>
                {formErrors.fullName && (
                  <p className="text-xs text-red-500">{formErrors.fullName}</p>
                )}
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
                    value={formData.email}
                    readOnly
                    className="input-bk !pl-10 h-11 bg-gray-50 border-transparent text-[var(--color-text-secondary)] cursor-not-allowed shadow-sm"
                    placeholder="Email Address"
                  />
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    <Icon
                      name="Lock"
                      size={14}
                      className="text-[var(--color-text-tertiary)]"
                    />
                  </div>
                </div>
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
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        phone: e.target.value.replace(/\D/g, '').slice(0, 10),
                      })
                    }
                    onBlur={() => handleBlur('phone')}
                    className={`input-bk !pl-10 h-11 ${formErrors.phone ? 'border-red-500 focus:border-red-500 focus:ring-red-200' : ''}`}
                    placeholder="10-digit Phone Number"
                  />
                </div>
                {formErrors.phone && (
                  <p className="text-xs text-red-500">{formErrors.phone}</p>
                )}
              </div>

              <div className="space-y-1">
                <label
                  htmlFor="company"
                  className="text-sm font-medium text-[var(--color-charcoal)]"
                >
                  Company Name{' '}
                  <span className="text-[var(--color-text-tertiary)] font-normal">
                    (Optional)
                  </span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[var(--color-text-tertiary)]">
                    <Icon name="Building2" size={18} />
                  </div>
                  <input
                    id="company"
                    type="text"
                    value={formData.company}
                    onChange={(e) =>
                      setFormData({ ...formData, company: e.target.value })
                    }
                    className="input-bk !pl-10 h-11"
                    placeholder="Company Name"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label
                  htmlFor="gstin"
                  className="text-sm font-medium text-[var(--color-charcoal)]"
                >
                  GSTIN{' '}
                  <span className="text-[var(--color-text-tertiary)] font-normal">
                    (Optional)
                  </span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[var(--color-text-tertiary)]">
                    <Icon name="FileText" size={18} />
                  </div>
                  <input
                    id="gstin"
                    type="text"
                    value={formData.gstin}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        gstin: e.target.value.toUpperCase(),
                      })
                    }
                    onBlur={() => handleBlur('gstin')}
                    className={`input-bk !pl-10 h-11 uppercase ${formErrors.gstin ? 'border-red-500 focus:border-red-500 focus:ring-red-200' : ''}`}
                    placeholder="15-char GSTIN"
                    maxLength={15}
                  />
                </div>
                {formErrors.gstin && (
                  <p className="text-xs text-red-500">{formErrors.gstin}</p>
                )}
              </div>
            </div>
          )}

          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between border-t border-[#e8e4de] gap-4">
            <p className="text-xs text-[var(--color-text-tertiary)] max-w-sm">
              Need to change your registered email address?{' '}
              <Link
                href="/contact"
                className="text-[var(--color-kraft)] hover:underline"
              >
                Contact Support
              </Link>
            </p>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={isSaving || isLoading}
              className="btn-primary px-8 h-11 w-full sm:w-auto shadow-sm"
            >
              <span className="relative flex items-center justify-center gap-2">
                {isSaving ? (
                  <>
                    <Icon name="Loader2" size={18} className="animate-spin" />{' '}
                    Saving
                  </>
                ) : (
                  <>Save Details</>
                )}
              </span>
            </motion.button>
          </div>
        </form>
      </div>

      <div className="card-bk overflow-hidden shadow-sm">
        <div className="px-6 py-5 border-b border-[#e8e4de] bg-[#faf8f5]/50">
          <h2 className="font-bold text-lg text-[var(--color-charcoal)] flex items-center gap-2">
            <Icon
              name="Shield"
              size={18}
              className="text-[var(--color-kraft)]"
            />
            Security & Authentication
          </h2>
          <p className="text-sm text-[var(--color-text-secondary)] mt-0.5 ml-6">
            Manage your password to keep your account highly secure.
          </p>
        </div>
        <form onSubmit={handleUpdatePassword} className="p-6 sm:p-8 space-y-6">
          <div className="grid md:grid-cols-2 gap-6 gap-y-8">
            <div className="space-y-1">
              <label
                htmlFor="currentPassword"
                className="text-sm font-medium text-[var(--color-charcoal)]"
              >
                Current Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[var(--color-text-tertiary)]">
                  <Icon name="Key" size={18} />
                </div>
                <input
                  id="currentPassword"
                  type="password"
                  value={passwordData.currentPassword}
                  onChange={(e) =>
                    setPasswordData({
                      ...passwordData,
                      currentPassword: e.target.value,
                    })
                  }
                  onBlur={() => handlePasswordBlur('currentPassword')}
                  className={`input-bk !pl-10 h-11 ${passwordErrors.currentPassword ? 'border-red-500 focus:border-red-500 focus:ring-red-200' : ''}`}
                  placeholder="Current Password"
                />
              </div>
              {passwordErrors.currentPassword && (
                <p className="text-xs text-red-500">
                  {passwordErrors.currentPassword}
                </p>
              )}
            </div>

            <div className="space-y-1">
              <label
                htmlFor="newPassword"
                className="text-sm font-medium text-[var(--color-charcoal)]"
              >
                New Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[var(--color-text-tertiary)]">
                  <Icon name="Lock" size={18} />
                </div>
                <input
                  id="newPassword"
                  type="password"
                  value={passwordData.newPassword}
                  onChange={(e) =>
                    setPasswordData({
                      ...passwordData,
                      newPassword: e.target.value,
                    })
                  }
                  onBlur={() => handlePasswordBlur('newPassword')}
                  className={`input-bk !pl-10 h-11 ${passwordErrors.newPassword ? 'border-red-500 focus:border-red-500 focus:ring-red-200' : ''}`}
                  placeholder="New Password"
                />
              </div>
              {passwordErrors.newPassword && (
                <p className="text-xs text-red-500">
                  {passwordErrors.newPassword}
                </p>
              )}
            </div>
          </div>
          {passwordGlobalError && (
            <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-xl text-sm text-red-600 flex items-start gap-3">
              <Icon name="AlertCircle" size={18} className="shrink-0 mt-0.5" />
              <p>{passwordGlobalError}</p>
            </div>
          )}
          {passwordSuccess && (
            <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-xl text-sm text-green-600 flex items-start gap-3">
              <Icon name="CheckCircle" size={18} className="shrink-0 mt-0.5" />
              <p>Password updated successfully.</p>
            </div>
          )}
          <div className="pt-6 flex justify-end">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={isUpdatingPassword}
              className="btn-outline px-6 h-11 flex items-center justify-center gap-2"
            >
              {isUpdatingPassword ? (
                <>
                  <Icon name="Loader2" size={18} className="animate-spin" />
                  Updating...
                </>
              ) : (
                'Update Password'
              )}
            </motion.button>
          </div>
        </form>
      </div>
    </motion.div>
  );
}
