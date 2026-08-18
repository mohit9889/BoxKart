'use client';

import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import Icon from '@/components/common/Icon';
import { addressApi } from '@/lib/api/address';
import {
  validatePhone,
  validatePincode,
  validateRequired,
} from '@/lib/validation';
import { INDIAN_STATES } from '@/lib/constants';

const INITIAL_FORM = {
  id: null,
  labelType: 'Home',
  customLabel: '',
  fullName: '',
  phone: '',
  addressLine1: '',
  addressLine2: '',
  city: '',
  state: '',
  postalCode: '',
  isDefault: false,
};

export default function AddressesPage() {
  const [addresses, setAddresses] = useState([]);
  const [loading, setLoading] = useState(true);

  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState(INITIAL_FORM);
  const [formErrors, setFormErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [addressToDelete, setAddressToDelete] = useState(null);

  const fetchAddresses = async () => {
    try {
      const response = await addressApi.getAddresses();
      setAddresses(response.data?.addresses || []);
    } catch (error) {
      console.error('Failed to fetch addresses', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchAddresses();
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  const handleDelete = (id) => {
    setAddressToDelete(id);
    setDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    if (!addressToDelete) return;
    try {
      await addressApi.deleteAddress(addressToDelete);
      setAddresses(addresses.filter((a) => a.id !== addressToDelete));
      setDeleteModalOpen(false);
      setAddressToDelete(null);
    } catch (err) {
      alert('Failed to delete address');
    }
  };

  const handleSetDefault = async (id) => {
    try {
      await addressApi.updateAddress(id, { isDefault: true });
      fetchAddresses();
    } catch (err) {
      alert('Failed to set default address');
    }
  };

  const handleEdit = (addr) => {
    let labelType = 'Other';
    let customLabel = addr.label || '';
    if (addr.label === 'Home' || addr.label === 'Office') {
      labelType = addr.label;
      customLabel = '';
    }

    setFormData({
      id: addr.id,
      labelType,
      customLabel,
      fullName: addr.fullName,
      phone: addr.phone,
      addressLine1: addr.addressLine1,
      addressLine2: addr.addressLine2 || '',
      city: addr.city,
      state: addr.state,
      postalCode: addr.postalCode,
      isDefault: addr.isDefault,
    });
    setFormErrors({});
    setShowForm(true);
  };

  const handleSave = async (e) => {
    e.preventDefault();

    // Validate
    const errors = {};
    errors.fullName = validateRequired(formData.fullName, 'Full Name');
    errors.phone = validatePhone(formData.phone);
    errors.addressLine1 = validateRequired(
      formData.addressLine1,
      'Address Line 1'
    );
    errors.city = validateRequired(formData.city, 'City');
    errors.state = validateRequired(formData.state, 'State');
    errors.postalCode = validatePincode(formData.postalCode);

    setFormErrors(errors);
    if (Object.values(errors).some((err) => err !== null)) return;

    setSubmitting(true);
    try {
      if (formData.id) {
        await addressApi.updateAddress(formData.id, formData);
      } else {
        await addressApi.addAddress(formData);
      }
      setShowForm(false);
      fetchAddresses();
    } catch (err) {
      alert('Failed to save address');
    } finally {
      setSubmitting(false);
    }
  };

  if (showForm) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="space-y-6"
      >
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-border/50">
          <h2 className="text-2xl font-bold text-[var(--color-charcoal)] flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-kraft/15 text-kraft-dark">
              <Icon name={formData.id ? 'Edit2' : 'Plus'} size={22} />
            </div>
            {formData.id ? 'Edit Address' : 'Add New Address'}
          </h2>
          <button
            onClick={() => setShowForm(false)}
            className="p-2 rounded-full hover:bg-warm-gray text-text-tertiary hover:text-charcoal transition-colors"
          >
            <Icon name="X" size={20} />
          </button>
        </div>

        <form
          onSubmit={handleSave}
          className="card-bk p-8 space-y-6 shadow-xl border border-kraft/20 rounded-2xl"
        >
          <div className="mb-4">
            <label className="block text-sm font-medium text-text-secondary mb-2">
              Save as (Label) *
            </label>
            <div className="flex gap-3 mb-3">
              {['Home', 'Office', 'Other'].map((type) => (
                <button
                  key={type}
                  type="button"
                  onClick={() => setFormData({ ...formData, labelType: type })}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors border ${formData.labelType === type ? 'bg-charcoal text-white border-charcoal' : 'bg-white text-text-secondary border-border hover:border-kraft'}`}
                >
                  {type}
                </button>
              ))}
            </div>
            {formData.labelType === 'Other' && (
              <input
                className="input-bk w-full"
                placeholder="e.g. Friend's House"
                value={formData.customLabel}
                onChange={(e) =>
                  setFormData({ ...formData, customLabel: e.target.value })
                }
              />
            )}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-1">
                Full Name *
              </label>
              <input
                className="input-bk"
                value={formData.fullName}
                onChange={(e) =>
                  setFormData({ ...formData, fullName: e.target.value })
                }
                onBlur={() =>
                  setFormErrors((prev) => ({
                    ...prev,
                    fullName: validateRequired(formData.fullName, 'Full Name'),
                  }))
                }
                placeholder="John Doe"
              />
              {formErrors.fullName && (
                <p className="text-xs text-red-500 mt-1">
                  {formErrors.fullName}
                </p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-1">
                Phone Number *
              </label>
              <input
                className="input-bk"
                value={formData.phone}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    phone: e.target.value.replace(/\D/g, '').slice(0, 10),
                  })
                }
                onBlur={() =>
                  setFormErrors((prev) => ({
                    ...prev,
                    phone: validatePhone(formData.phone),
                  }))
                }
                placeholder="9876543210"
              />
              {formErrors.phone && (
                <p className="text-xs text-red-500 mt-1">{formErrors.phone}</p>
              )}
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-text-secondary mb-1">
              Address Line 1 *
            </label>
            <input
              className="input-bk"
              value={formData.addressLine1}
              onChange={(e) =>
                setFormData({ ...formData, addressLine1: e.target.value })
              }
              onBlur={() =>
                setFormErrors((prev) => ({
                  ...prev,
                  addressLine1: validateRequired(
                    formData.addressLine1,
                    'Address Line 1'
                  ),
                }))
              }
              placeholder="123 Main St"
            />
            {formErrors.addressLine1 && (
              <p className="text-xs text-red-500 mt-1">
                {formErrors.addressLine1}
              </p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-text-secondary mb-1">
              Address Line 2
            </label>
            <input
              className="input-bk"
              value={formData.addressLine2}
              onChange={(e) =>
                setFormData({ ...formData, addressLine2: e.target.value })
              }
              placeholder="Apt 4B"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-1">
                Pincode *
              </label>
              <div className="relative">
                <input
                  className="input-bk w-full pr-10"
                  value={formData.postalCode}
                  onChange={async (e) => {
                    const pin = e.target.value.replace(/\D/g, '').slice(0, 6);
                    setFormData({ ...formData, postalCode: pin });
                    if (pin.length === 6) {
                      try {
                        const res = await fetch(
                          `https://api.postalpincode.in/pincode/${pin}`
                        );
                        const data = await res.json();
                        if (data && data[0]?.Status === 'Success') {
                          const postOffice = data[0].PostOffice[0];
                          setFormData((prev) => ({
                            ...prev,
                            postalCode: pin,
                            city: postOffice.District,
                            state: postOffice.State,
                          }));
                        }
                      } catch (err) {
                        console.error('Failed to fetch pincode details', err);
                      }
                    }
                  }}
                  onBlur={() =>
                    setFormErrors((prev) => ({
                      ...prev,
                      postalCode: validatePincode(formData.postalCode),
                    }))
                  }
                  placeholder="400001"
                />
                <button
                  type="button"
                  title="Detect My Location"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-kraft hover:text-charcoal transition-colors"
                  onClick={() => {
                    if (!navigator.geolocation) {
                      alert('Geolocation is not supported by your browser');
                      return;
                    }
                    navigator.geolocation.getCurrentPosition(
                      async (position) => {
                        try {
                          const { latitude, longitude } = position.coords;
                          const geoRes = await fetch(
                            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
                          );
                          const geoData = await geoRes.json();

                          if (
                            geoData &&
                            geoData.address &&
                            geoData.address.postcode
                          ) {
                            const pin = geoData.address.postcode
                              .replace(/\D/g, '')
                              .slice(0, 6);
                            setFormData((prev) => ({
                              ...prev,
                              postalCode: pin,
                            }));

                            // Also fetch city/state automatically
                            if (pin.length === 6) {
                              const res = await fetch(
                                `https://api.postalpincode.in/pincode/${pin}`
                              );
                              const data = await res.json();
                              if (data && data[0]?.Status === 'Success') {
                                const postOffice = data[0].PostOffice[0];
                                setFormData((prev) => ({
                                  ...prev,
                                  postalCode: pin,
                                  city: postOffice.District,
                                  state: postOffice.State,
                                }));
                              }
                            }
                          } else {
                            alert('Could not detect pincode for your location');
                          }
                        } catch (err) {
                          console.error(
                            'Failed to fetch location details',
                            err
                          );
                          alert('Failed to detect location details');
                        }
                      },
                      (error) => {
                        console.error('Geolocation error', error);
                        alert(
                          'Failed to access your location. Please check your browser permissions.'
                        );
                      }
                    );
                  }}
                >
                  <Icon name="MapPin" size={18} />
                </button>
              </div>
              {formErrors.postalCode && (
                <p className="text-xs text-red-500 mt-1">
                  {formErrors.postalCode}
                </p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-1">
                City *
              </label>
              <input
                className="input-bk"
                value={formData.city}
                onChange={(e) =>
                  setFormData({ ...formData, city: e.target.value })
                }
                onBlur={() =>
                  setFormErrors((prev) => ({
                    ...prev,
                    city: validateRequired(formData.city, 'City'),
                  }))
                }
                placeholder="Mumbai"
              />
              {formErrors.city && (
                <p className="text-xs text-red-500 mt-1">{formErrors.city}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-1">
                State *
              </label>
              <select
                className="input-bk appearance-none"
                value={formData.state}
                onChange={(e) =>
                  setFormData({ ...formData, state: e.target.value })
                }
                onBlur={() =>
                  setFormErrors((prev) => ({
                    ...prev,
                    state: validateRequired(formData.state, 'State'),
                  }))
                }
              >
                <option value="">Select State</option>
                {INDIAN_STATES.map((state) => (
                  <option key={state} value={state}>
                    {state}
                  </option>
                ))}
              </select>
              {formErrors.state && (
                <p className="text-xs text-red-500 mt-1">{formErrors.state}</p>
              )}
            </div>
          </div>
          <div className="flex items-center gap-2 pt-2">
            <input
              type="checkbox"
              id="default-chk"
              checked={formData.isDefault}
              onChange={(e) =>
                setFormData({ ...formData, isDefault: e.target.checked })
              }
              className="rounded border-border text-[var(--color-charcoal)] focus:ring-[var(--color-charcoal)] accent-[#111827] w-4 h-4 cursor-pointer"
            />
            <label
              htmlFor="default-chk"
              className="text-sm text-text-secondary cursor-pointer"
            >
              Set as default address
            </label>
          </div>
          <div className="flex justify-end gap-3 pt-6 border-t border-border mt-6">
            <button
              type="button"
              onClick={() => setShowForm(false)}
              className="btn-outline"
            >
              Cancel
            </button>
            <button type="submit" disabled={submitting} className="btn-accent">
              {submitting ? 'Saving...' : 'Save Address'}
            </button>
          </div>
        </form>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[var(--color-charcoal)]">
            Saved Addresses
          </h1>
          <p className="text-sm text-[var(--color-text-secondary)]">
            Manage your delivery locations for faster checkout.
          </p>
        </div>
        <button
          onClick={() => {
            setFormData(INITIAL_FORM);
            setShowForm(true);
          }}
          className="btn-primary shrink-0 w-full sm:w-auto"
        >
          <Icon name="Plus" size={18} />
          Add New Address
        </button>
      </div>

      {loading ? (
        <div className="grid md:grid-cols-2 gap-6">
          {[1, 2].map((n) => (
            <div key={n} className="card-bk p-6 animate-pulse">
              <div className="h-6 bg-warm-gray rounded w-1/3 mb-6"></div>
              <div className="space-y-3 mb-8">
                <div className="h-4 bg-warm-gray rounded w-1/2"></div>
                <div className="h-4 bg-warm-gray rounded w-3/4"></div>
                <div className="h-4 bg-warm-gray rounded w-2/3"></div>
              </div>
              <div className="pt-4 border-t border-border flex gap-3">
                <div className="h-4 bg-warm-gray rounded w-12"></div>
                <div className="h-4 bg-warm-gray rounded w-12"></div>
              </div>
            </div>
          ))}
        </div>
      ) : addresses.length === 0 ? (
        <div className="text-center py-12 border-2 border-dashed border-border rounded-xl">
          <div className="w-16 h-16 bg-warm-gray rounded-full flex items-center justify-center mx-auto mb-4 text-text-tertiary">
            <Icon name="MapPin" size={24} />
          </div>
          <h3 className="text-lg font-bold text-charcoal mb-2">
            No addresses saved
          </h3>
          <p className="text-text-secondary mb-6">
            You haven&apos;t saved any delivery addresses yet.
          </p>
        </div>
      ) : (
        <motion.div
          className="grid md:grid-cols-2 gap-6"
          initial="hidden"
          animate="show"
          variants={{
            hidden: { opacity: 0 },
            show: {
              opacity: 1,
              transition: { staggerChildren: 0.1 },
            },
          }}
        >
          {addresses.map((addr) => (
            <motion.div
              key={addr.id}
              variants={{
                hidden: { opacity: 0, y: 20 },
                show: { opacity: 1, y: 0 },
              }}
              className={`p-6 relative group flex flex-col rounded-2xl bg-white border ${
                addr.isDefault
                  ? 'border-kraft shadow-md bg-[#faf8f5]'
                  : 'border-border shadow-sm'
              }`}
            >
              {addr.isDefault && (
                <span className="absolute top-6 right-6 badge badge-kraft shadow-sm">
                  <Icon name="Star" size={12} className="mr-1 inline-block" />{' '}
                  Default
                </span>
              )}
              <div className="mb-4">
                <h3 className="font-bold text-[var(--color-charcoal)] flex items-center gap-2 text-lg">
                  <div
                    className={`p-2 rounded-full ${addr.isDefault ? 'bg-kraft/20 text-kraft-dark' : 'bg-warm-gray text-text-tertiary group-hover:bg-kraft/10 group-hover:text-kraft transition-colors'}`}
                  >
                    <Icon name="MapPin" size={18} />
                  </div>
                  {addr.label || 'Address'}
                </h3>
              </div>
              <div className="flex-1 space-y-1.5 text-sm text-[var(--color-text-secondary)] mb-6 ml-11">
                <p className="font-semibold text-[var(--color-charcoal)] text-base">
                  {addr.fullName}
                </p>
                <p className="pt-1">{addr.addressLine1}</p>
                {addr.addressLine2 && <p>{addr.addressLine2}</p>}
                <p>
                  {addr.city}, {addr.state} {addr.postalCode}
                </p>
                <p className="pt-3 flex items-center gap-2 font-medium">
                  <Icon
                    name="Phone"
                    size={14}
                    className="text-[var(--color-text-tertiary)]"
                  />
                  {addr.phone}
                </p>
              </div>

              <div className="flex items-center gap-4 pt-5 border-t border-border/60 mt-auto">
                <button
                  onClick={() => handleEdit(addr)}
                  className="text-sm font-semibold flex items-center gap-1.5 text-[var(--color-charcoal)] hover:text-[var(--color-kraft)] transition-colors"
                >
                  <Icon name="Edit2" size={14} /> Edit
                </button>
                <span className="text-border/60">|</span>
                <button
                  onClick={() => handleDelete(addr.id)}
                  className="text-sm font-semibold flex items-center gap-1.5 text-[var(--color-danger)] hover:text-[#b91c1c] transition-colors"
                >
                  <Icon name="Trash2" size={14} /> Delete
                </button>
                {!addr.isDefault && (
                  <>
                    <span className="text-border/60">|</span>
                    <button
                      onClick={() => handleSetDefault(addr.id)}
                      className="text-sm font-semibold flex items-center gap-1.5 text-[var(--color-text-secondary)] hover:text-[var(--color-charcoal)] transition-colors ml-auto"
                    >
                      <Icon name="CheckCircle" size={14} /> Set Default
                    </button>
                  </>
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}

      {deleteModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="card-bk w-full max-w-md p-6"
          >
            <h3 className="text-xl font-bold text-[var(--color-charcoal)] mb-2">
              Delete Address
            </h3>
            <p className="text-[var(--color-text-secondary)] mb-6">
              Are you sure you want to delete this address? This action cannot
              be undone.
            </p>
            <div className="flex justify-end gap-3">
              <button
                className="btn-outline"
                onClick={() => {
                  setDeleteModalOpen(false);
                  setAddressToDelete(null);
                }}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 rounded-lg font-medium transition-colors bg-red-600 text-white hover:bg-red-700"
                onClick={confirmDelete}
              >
                Delete
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </motion.div>
  );
}
