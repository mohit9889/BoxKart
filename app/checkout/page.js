'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'motion/react';
import Link from 'next/link';
import { useCart } from '@/lib/cart';
import { EmptyState } from '@/components/ui';
import Icon from '@/components/common/Icon';
import { orderApi } from '@/lib/api/order';
import { addressApi } from '@/lib/api/address';
import { authApi } from '@/lib/api/auth';
import {
  validateEmail,
  validatePhone,
  validatePincode,
  validateRequired,
} from '@/lib/validation';
import { INDIAN_STATES } from '@/lib/constants';

const STEPS = [
  { id: 1, label: 'Contact', icon: 'User' },
  { id: 2, label: 'Delivery', icon: 'MapPin' },
  { id: 3, label: 'Summary', icon: 'ShoppingBag' },
  { id: 4, label: 'Payment', icon: 'CreditCard' },
];

/**
 * 4-step checkout flow: Contact → Address → Summary → Payment placeholder.
 */
export default function CheckoutPage() {
  const router = useRouter();
  const { items, subtotal, shipping, gst, totalPrice, clearCart } = useCart();
  const [step, setStep] = useState(1);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [orderId, setOrderId] = useState('');
  const [errors, setErrors] = useState({});

  const [contact, setContact] = useState({
    name: '',
    business: '',
    email: '',
    phone: '',
    gst: '',
  });

  const [address, setAddress] = useState({
    line1: '',
    line2: '',
    city: '',
    state: '',
    pincode: '',
    labelType: 'Home',
    customLabel: '',
  });

  const [savedAddresses, setSavedAddresses] = useState([]);
  const [selectedAddressId, setSelectedAddressId] = useState('');
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [loadingAddresses, setLoadingAddresses] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoadingAddresses(true);
        let userEmail = '';
        let userName = '';

        // Fetch current user details
        try {
          const user = await authApi.getCurrentUser();
          if (user && user.email) {
            userEmail = user.email;
            userName = `${user.firstName || ''} ${user.lastName || ''}`.trim();
          }
        } catch (e) {
          console.error('Failed to fetch user, redirecting to login', e);
          router.push('/login?redirect=/checkout');
          return;
        }

        // Fetch addresses
        const addrsRes = await addressApi.getAddresses();
        const addrs = addrsRes.data?.addresses || [];
        setSavedAddresses(addrs);

        let finalName = userName;
        let finalPhone = '';

        if (addrs.length > 0) {
          setSelectedAddressId(addrs[0].id);
          finalName = userName || addrs[0].fullName;
          finalPhone = addrs[0].phone;
        } else {
          setShowAddressForm(true);
        }

        setContact((prev) => ({
          ...prev,
          email: prev.email || userEmail,
          name: prev.name || finalName,
          phone: prev.phone || finalPhone,
        }));
      } catch (error) {
        console.error('Failed to fetch data', error);
        setShowAddressForm(true);
      } finally {
        setLoadingAddresses(false);
      }
    };
    fetchData();
  }, [router]);

  const formatPrice = (num) =>
    new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(num);

  const handleBlur = (field) => {
    let err = null;
    if (field === 'name') err = validateRequired(contact.name, 'Full Name');
    if (field === 'email') err = validateEmail(contact.email);
    if (field === 'phone') err = validatePhone(contact.phone);
    if (field === 'line1')
      err = validateRequired(address.line1, 'Address Line 1');
    if (field === 'city') err = validateRequired(address.city, 'City');
    if (field === 'state') err = validateRequired(address.state, 'State');
    if (field === 'pincode') err = validatePincode(address.pincode);

    setErrors((prev) => ({ ...prev, [field]: err }));
  };

  const handleNextStep1 = () => {
    const newErrors = {};
    newErrors.name = validateRequired(contact.name, 'Full Name');
    newErrors.email = validateEmail(contact.email);
    newErrors.phone = validatePhone(contact.phone);
    setErrors(newErrors);
    if (!Object.values(newErrors).some((err) => err !== null)) {
      setStep(2);
    }
  };

  const handleNextStep2 = async () => {
    if (selectedAddressId && !showAddressForm) {
      setStep(3);
      return;
    }

    const newErrors = {};
    newErrors.line1 = validateRequired(address.line1, 'Address Line 1');
    newErrors.city = validateRequired(address.city, 'City');
    newErrors.state = validateRequired(address.state, 'State');
    newErrors.pincode = validatePincode(address.pincode);
    setErrors(newErrors);

    if (!Object.values(newErrors).some((err) => err !== null)) {
      setSubmitting(true);
      try {
        const payload = {
          label:
            address.labelType === 'Other'
              ? address.customLabel || 'Other'
              : address.labelType,
          fullName: contact.name,
          phone: contact.phone,
          addressLine1: address.line1,
          addressLine2: address.line2,
          city: address.city,
          state: address.state,
          postalCode: address.pincode,
          isDefault: true,
        };
        const res = await addressApi.addAddress(payload);
        if (res.data && res.data.address) {
          const addrsRes = await addressApi.getAddresses();
          setSavedAddresses(addrsRes.data?.addresses || []);
          setSelectedAddressId(res.data.address.id);
          setShowAddressForm(false);
        }
      } catch (err) {
        console.error('Failed to save new address', err);
        // Continue anyway if the save failed but the data is valid
      } finally {
        setSubmitting(false);
        setStep(3);
      }
    }
  };

  const handlePlaceOrder = async () => {
    setSubmitting(true);
    try {
      let payload = {};
      if (selectedAddressId && !showAddressForm) {
        payload = { shippingAddressId: selectedAddressId };
      } else {
        payload = {
          shippingAddress: {
            fullName: contact.name,
            phone: contact.phone,
            email: contact.email,
            line1: address.line1,
            line2: address.line2,
            city: address.city,
            state: address.state,
            pincode: address.pincode,
            type: 'SHIPPING',
          },
        };
      }

      // Call API
      const response = await orderApi.createOrder(payload);

      setOrderId(
        response?.data?.orderNumber || response?.data?.id || 'Confirmed'
      );
      setOrderPlaced(true);
      clearCart();
    } catch (error) {
      console.error('Failed to place order', error);
      alert('Failed to place order. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  if (items.length === 0 && !orderPlaced) {
    return (
      <EmptyState
        icon="ShoppingBag"
        title="No items to checkout"
        description="Add products to your cart first."
        actions={[{ label: 'Browse Products', href: '/products' }]}
      />
    );
  }

  if (orderPlaced) {
    return (
      <div className="container-bk section-padding text-center max-w-lg mx-auto">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', delay: 0.2 }}
          className="w-20 h-20 bg-accent-light rounded-full flex items-center justify-center mx-auto mb-6"
        >
          <Icon name="CheckCircle" size={40} className="text-accent" />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <h1 className="text-3xl font-bold text-charcoal mb-3">
            Order Request Placed!
          </h1>
          <p className="text-text-secondary mb-2">
            Your order request <strong>{orderId}</strong> has been received.
          </p>
          <p className="text-text-secondary mb-8">
            Our team will confirm your order and share payment details within 24
            hours.
          </p>
          <div className="flex justify-center gap-3">
            <Link href="/account" className="btn-primary">
              View Orders
            </Link>
            <Link href="/" className="btn-outline">
              Back to Home
            </Link>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="container-bk section-padding">
      <h1 className="text-3xl font-bold text-charcoal mb-8">Checkout</h1>

      {/* Step Indicator */}
      <div className="flex items-center justify-center gap-2 mb-10">
        {STEPS.map((s, i) => (
          <div key={s.id} className="flex items-center gap-2">
            <button
              onClick={() => s.id < step && setStep(s.id)}
              disabled={s.id > step}
              className={`flex items-center gap-2 px-3 py-2 rounded-full text-sm font-medium transition-all ${
                step === s.id
                  ? 'bg-charcoal text-white'
                  : step > s.id
                    ? 'bg-accent-light text-accent-dark cursor-pointer'
                    : 'bg-warm-gray text-text-tertiary'
              }`}
            >
              <Icon name={s.icon} size={16} />
              <span className="hidden sm:inline">{s.label}</span>
            </button>
            {i < STEPS.length - 1 && (
              <div
                className={`w-8 h-0.5 ${
                  step > s.id ? 'bg-accent' : 'bg-border'
                }`}
              />
            )}
          </div>
        ))}
      </div>

      <div className="max-w-2xl mx-auto">
        <AnimatePresence mode="wait">
          {/* Step 1: Contact */}
          {step === 1 && (
            <motion.div
              key="contact"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              className="card-bk p-6"
            >
              <h2 className="text-xl font-bold text-charcoal mb-6">
                Contact Details
              </h2>
              <div className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="co-name"
                      className="block text-sm font-medium text-text-secondary mb-1"
                    >
                      Full Name *
                    </label>
                    <input
                      id="co-name"
                      className="input-bk"
                      value={contact.name}
                      onChange={(e) =>
                        setContact({ ...contact, name: e.target.value })
                      }
                      required
                      placeholder="Your full name"
                      onBlur={() => handleBlur('name')}
                    />
                    {errors.name && (
                      <p className="text-xs text-red-500 mt-1">{errors.name}</p>
                    )}
                  </div>
                  <div>
                    <label
                      htmlFor="co-business"
                      className="block text-sm font-medium text-text-secondary mb-1"
                    >
                      Business Name
                    </label>
                    <input
                      id="co-business"
                      className="input-bk"
                      value={contact.business}
                      onChange={(e) =>
                        setContact({ ...contact, business: e.target.value })
                      }
                      placeholder="Your company / brand name"
                    />
                  </div>
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="co-email"
                      className="block text-sm font-medium text-text-secondary mb-1"
                    >
                      Email *
                    </label>
                    <input
                      id="co-email"
                      type="email"
                      className="input-bk"
                      value={contact.email}
                      onChange={(e) =>
                        setContact({ ...contact, email: e.target.value })
                      }
                      required
                      placeholder="you@company.com"
                      onBlur={() => handleBlur('email')}
                    />
                    {errors.email && (
                      <p className="text-xs text-red-500 mt-1">
                        {errors.email}
                      </p>
                    )}
                  </div>
                  <div>
                    <label
                      htmlFor="co-phone"
                      className="block text-sm font-medium text-text-secondary mb-1"
                    >
                      Phone *
                    </label>
                    <input
                      id="co-phone"
                      type="tel"
                      className="input-bk w-full"
                      placeholder="10-digit mobile number"
                      value={contact.phone}
                      onChange={(e) => {
                        const val = e.target.value
                          .replace(/\D/g, '')
                          .slice(0, 10);
                        setContact({ ...contact, phone: val });
                        if (errors.phone) {
                          setErrors({ ...errors, phone: validatePhone(val) });
                        }
                      }}
                      onBlur={() => handleBlur('phone')}
                    />
                    {errors.phone && (
                      <p className="text-xs text-red-500 mt-1">
                        {errors.phone}
                      </p>
                    )}
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="co-gst"
                    className="block text-sm font-medium text-text-secondary mb-1"
                  >
                    GSTIN{' '}
                    <span className="text-xs text-text-tertiary">
                      (for GST invoice)
                    </span>
                  </label>
                  <input
                    id="co-gst"
                    className="input-bk"
                    value={contact.gst}
                    onChange={(e) =>
                      setContact({
                        ...contact,
                        gst: e.target.value.toUpperCase(),
                      })
                    }
                    placeholder="22AAAAA0000A1Z5"
                    maxLength={15}
                  />
                  <p className="text-xs text-text-tertiary mt-1">
                    15-character GST number. Leave blank to order as an
                    individual.
                  </p>
                </div>
              </div>
              <div className="flex justify-end mt-6">
                <button
                  onClick={handleNextStep1}
                  className="btn-accent flex items-center gap-2"
                >
                  Continue <Icon name="ArrowRight" size={16} />
                </button>
              </div>
            </motion.div>
          )}

          {/* Step 2: Address */}
          {step === 2 && (
            <motion.div
              key="address"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              className="card-bk p-6"
            >
              <h2 className="text-xl font-bold text-charcoal mb-6">
                Delivery Address
              </h2>
              <div className="space-y-4">
                {loadingAddresses ? (
                  <div className="flex justify-center p-8">
                    <Icon
                      name="Loader2"
                      size={24}
                      className="animate-spin text-kraft"
                    />
                  </div>
                ) : !showAddressForm && savedAddresses.length > 0 ? (
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {savedAddresses.map((addr) => (
                        <div
                          key={addr.id}
                          onClick={() => setSelectedAddressId(addr.id)}
                          className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${selectedAddressId === addr.id ? 'border-accent bg-accent/5' : 'border-border hover:border-kraft-muted bg-white'}`}
                        >
                          <div className="flex justify-between items-start mb-2">
                            <span className="font-semibold text-charcoal">
                              {addr.fullName}
                            </span>
                            {selectedAddressId === addr.id && (
                              <Icon
                                name="CheckCircle"
                                size={18}
                                className="text-accent"
                              />
                            )}
                          </div>
                          <p className="text-sm text-text-secondary">
                            {addr.addressLine1}
                          </p>
                          {addr.addressLine2 && (
                            <p className="text-sm text-text-secondary">
                              {addr.addressLine2}
                            </p>
                          )}
                          <p className="text-sm text-text-secondary">
                            {addr.city}, {addr.state} {addr.postalCode}
                          </p>
                          <p className="text-sm text-text-tertiary mt-2 flex items-center gap-1">
                            <Icon name="Phone" size={14} /> {addr.phone}
                          </p>
                        </div>
                      ))}
                    </div>
                    <button
                      onClick={() => setShowAddressForm(true)}
                      className="text-sm font-medium text-accent hover:text-accent-dark flex items-center gap-1 mt-2"
                    >
                      <Icon name="Plus" size={16} /> Add New Address
                    </button>
                  </div>
                ) : (
                  <>
                    {savedAddresses.length > 0 && (
                      <button
                        onClick={() => setShowAddressForm(false)}
                        className="text-sm font-medium text-text-tertiary hover:text-charcoal flex items-center gap-1 mb-4"
                      >
                        <Icon name="ArrowLeft" size={16} /> Use Saved Address
                      </button>
                    )}
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-text-secondary mb-2">
                        Save as (Label) *
                      </label>
                      <div className="flex gap-3 mb-3">
                        {['Home', 'Office', 'Other'].map((type) => (
                          <button
                            key={type}
                            type="button"
                            onClick={() =>
                              setAddress({ ...address, labelType: type })
                            }
                            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors border ${address.labelType === type ? 'bg-charcoal text-white border-charcoal' : 'bg-white text-text-secondary border-border hover:border-kraft'}`}
                          >
                            {type}
                          </button>
                        ))}
                      </div>
                      {address.labelType === 'Other' && (
                        <input
                          className="input-bk w-full"
                          placeholder="e.g. Friend's House"
                          value={address.customLabel}
                          onChange={(e) =>
                            setAddress({
                              ...address,
                              customLabel: e.target.value,
                            })
                          }
                        />
                      )}
                    </div>
                    <div>
                      <label
                        htmlFor="ad-line1"
                        className="block text-sm font-medium text-text-secondary mb-1"
                      >
                        Address Line 1 *
                      </label>
                      <input
                        id="ad-line1"
                        className="input-bk"
                        value={address.line1}
                        onChange={(e) =>
                          setAddress({ ...address, line1: e.target.value })
                        }
                        required
                        placeholder="Building, Street"
                        onBlur={() => handleBlur('line1')}
                      />
                      {errors.line1 && (
                        <p className="text-xs text-red-500 mt-1">
                          {errors.line1}
                        </p>
                      )}
                    </div>
                    <div>
                      <label
                        htmlFor="ad-line2"
                        className="block text-sm font-medium text-text-secondary mb-1"
                      >
                        Address Line 2
                      </label>
                      <input
                        id="ad-line2"
                        className="input-bk"
                        value={address.line2}
                        onChange={(e) =>
                          setAddress({ ...address, line2: e.target.value })
                        }
                        placeholder="Area, Landmark"
                      />
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                      <div>
                        <label
                          htmlFor="ad-city"
                          className="block text-sm font-medium text-text-secondary mb-1"
                        >
                          City *
                        </label>
                        <input
                          id="ad-city"
                          className="input-bk"
                          value={address.city}
                          onChange={(e) =>
                            setAddress({ ...address, city: e.target.value })
                          }
                          required
                          placeholder="Mumbai"
                          onBlur={() => handleBlur('city')}
                        />
                        {errors.city && (
                          <p className="text-xs text-red-500 mt-1">
                            {errors.city}
                          </p>
                        )}
                      </div>
                      <div>
                        <label
                          htmlFor="ad-state"
                          className="block text-sm font-medium text-text-secondary mb-1"
                        >
                          State *
                        </label>
                        <select
                          id="ad-state"
                          className="input-bk appearance-none w-full"
                          value={address.state}
                          onChange={(e) =>
                            setAddress({ ...address, state: e.target.value })
                          }
                          required
                          onBlur={() => handleBlur('state')}
                        >
                          <option value="">Select State</option>
                          {INDIAN_STATES.map((state) => (
                            <option key={state} value={state}>
                              {state}
                            </option>
                          ))}
                        </select>
                        {errors.state && (
                          <p className="text-xs text-red-500 mt-1">
                            {errors.state}
                          </p>
                        )}
                      </div>
                      <div>
                        <label
                          htmlFor="ad-pin"
                          className="block text-sm font-medium text-text-secondary mb-1"
                        >
                          Pincode *
                        </label>
                        <div className="relative">
                          <input
                            id="co-pincode"
                            type="text"
                            className="input-bk w-full pr-10"
                            value={address.pincode}
                            onChange={async (e) => {
                              const val = e.target.value
                                .replace(/\D/g, '')
                                .slice(0, 6);
                              setAddress({ ...address, pincode: val });
                              if (errors.pincode) {
                                setErrors({
                                  ...errors,
                                  pincode: validatePincode(val),
                                });
                              }
                              if (val.length === 6) {
                                try {
                                  const res = await fetch(
                                    `https://api.postalpincode.in/pincode/${val}`
                                  );
                                  const data = await res.json();
                                  if (data && data[0]?.Status === 'Success') {
                                    const postOffice = data[0].PostOffice[0];
                                    setAddress((prev) => ({
                                      ...prev,
                                      pincode: val,
                                      city: postOffice.District,
                                      state: postOffice.State,
                                    }));
                                  }
                                } catch (err) {
                                  console.error(
                                    'Failed to fetch pincode details',
                                    err
                                  );
                                }
                              }
                            }}
                            required
                            placeholder="400001"
                            maxLength={6}
                            onBlur={() => handleBlur('pincode')}
                          />
                          <button
                            type="button"
                            title="Detect My Location"
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-kraft hover:text-charcoal transition-colors"
                            onClick={() => {
                              if (!navigator.geolocation) {
                                alert(
                                  'Geolocation is not supported by your browser'
                                );
                                return;
                              }
                              navigator.geolocation.getCurrentPosition(
                                async (position) => {
                                  try {
                                    const { latitude, longitude } =
                                      position.coords;
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
                                      setAddress((prev) => ({
                                        ...prev,
                                        pincode: pin,
                                      }));

                                      // Also fetch city/state automatically
                                      if (pin.length === 6) {
                                        const res = await fetch(
                                          `https://api.postalpincode.in/pincode/${pin}`
                                        );
                                        const data = await res.json();
                                        if (
                                          data &&
                                          data[0]?.Status === 'Success'
                                        ) {
                                          const postOffice =
                                            data[0].PostOffice[0];
                                          setAddress((prev) => ({
                                            ...prev,
                                            pincode: pin,
                                            city: postOffice.District,
                                            state: postOffice.State,
                                          }));
                                        }
                                      }
                                    } else {
                                      alert(
                                        'Could not detect pincode for your location'
                                      );
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
                        {errors.pincode && (
                          <p className="text-xs text-red-500 mt-1">
                            {errors.pincode}
                          </p>
                        )}
                      </div>
                    </div>
                  </>
                )}
              </div>
              <div className="flex justify-between mt-6">
                <button
                  onClick={() => setStep(1)}
                  className="btn-outline flex items-center gap-2"
                >
                  <Icon name="ArrowLeft" size={16} /> Back
                </button>
                <button
                  onClick={handleNextStep2}
                  disabled={submitting}
                  className="btn-accent flex items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {submitting ? (
                    <>
                      Saving Address{' '}
                      <Icon name="Loader2" size={16} className="animate-spin" />
                    </>
                  ) : (
                    <>
                      Continue <Icon name="ArrowRight" size={16} />
                    </>
                  )}
                </button>
              </div>
            </motion.div>
          )}

          {/* Step 3: Summary */}
          {step === 3 && (
            <motion.div
              key="summary"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              className="card-bk p-6"
            >
              <h2 className="text-xl font-bold text-charcoal mb-6">
                Order Summary
              </h2>

              <div className="space-y-3 mb-6">
                {items.map((item) => {
                  const tier = item.product.pricingTiers?.find(
                    (t) => t.qty === item.quantity
                  );
                  const price = tier?.price ?? 0;
                  return (
                    <div
                      key={item.id}
                      className="flex items-center justify-between py-3 border-b border-border"
                    >
                      <div className="flex items-center gap-3">
                        <Icon name="Package" size={20} className="text-kraft" />
                        <div>
                          <p className="text-sm font-medium text-charcoal">
                            {item.product.name}
                          </p>
                          <p className="text-xs text-text-secondary">
                            {item.quantity.toLocaleString('en-IN')} pcs ×{' '}
                            {item.count}
                          </p>
                        </div>
                      </div>
                      <p className="font-medium text-charcoal">
                        {formatPrice(price * item.quantity * item.count)}
                      </p>
                    </div>
                  );
                })}
              </div>

              <div className="bg-warm-gray rounded-xl p-4 mb-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-text-secondary">Subtotal</span>
                  <span className="font-medium">{formatPrice(totalPrice)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-text-secondary">Delivery</span>
                  <span className="text-text-tertiary">To be confirmed</span>
                </div>
                <div className="border-t border-border pt-2 flex justify-between">
                  <span className="font-medium">Estimated Total</span>
                  <span className="font-bold text-xl text-charcoal">
                    {formatPrice(totalPrice)}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2 text-xs text-text-tertiary mb-4">
                <Icon name="Truck" size={14} />
                Estimated delivery: 3–5 business days
              </div>

              <div className="flex justify-between">
                <button
                  onClick={() => setStep(2)}
                  className="btn-outline flex items-center gap-2"
                >
                  <Icon name="ArrowLeft" size={16} /> Back
                </button>
                <button
                  onClick={() => setStep(4)}
                  className="btn-accent flex items-center gap-2"
                >
                  Continue <Icon name="ArrowRight" size={16} />
                </button>
              </div>
            </motion.div>
          )}

          {/* Step 4: Payment */}
          {step === 4 && (
            <motion.div
              key="payment"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              className="card-bk p-6"
            >
              <h2 className="text-xl font-bold text-charcoal mb-4">Payment</h2>

              <div className="bg-info/10 border border-info/20 rounded-xl p-4 mb-6 text-center">
                <Icon
                  name="CreditCard"
                  size={32}
                  className="text-info mx-auto mb-2"
                />
                <p className="text-sm font-medium text-charcoal mb-1">
                  Payment integration coming soon
                </p>
                <p className="text-xs text-text-secondary">
                  Place your order request and our team will share payment
                  details.
                </p>
              </div>

              <div className="bg-warm-gray rounded-xl p-4 mb-6">
                <div className="flex justify-between">
                  <span className="font-medium text-charcoal">Order Total</span>
                  <span className="font-bold text-xl text-charcoal">
                    {formatPrice(totalPrice)}
                  </span>
                </div>
              </div>

              <div className="flex justify-between">
                <button
                  onClick={() => setStep(3)}
                  className="btn-outline flex items-center gap-2"
                >
                  <Icon name="ArrowLeft" size={16} /> Back
                </button>
                <motion.button
                  whileTap={{ scale: 0.98 }}
                  onClick={handlePlaceOrder}
                  disabled={submitting}
                  className="btn-accent flex items-center gap-2"
                >
                  {submitting ? (
                    <>
                      <Icon name="Loader2" size={16} className="animate-spin" />
                      Placing Order...
                    </>
                  ) : (
                    'Request Order'
                  )}
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
