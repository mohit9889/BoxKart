'use client';

import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Link from 'next/link';
import Icon from '@/components/common/Icon';
import {
  Input,
  Select,
  Textarea,
  Radio,
  NumberInput,
  Alert,
} from '@/components/ui';

const STEPS = [
  { id: 1, label: 'Product', icon: 'Package' },
  { id: 2, label: 'Order', icon: 'ShoppingBag' },
  { id: 3, label: 'Contact', icon: 'User' },
  { id: 4, label: 'Review', icon: 'CheckCircle' },
];

const PRODUCT_TYPE_OPTIONS = [
  { value: 'corrugated-boxes', label: 'Corrugated Boxes' },
  { value: 'courier-packaging', label: 'Courier Packaging' },
  { value: 'mailer-boxes', label: 'Mailer Boxes' },
  { value: 'die-cut-boxes', label: 'Die-Cut Boxes' },
  { value: 'custom-printed', label: 'Custom Printed Boxes' },
  { value: 'other', label: 'Other' },
];

const PRINTING_OPTIONS = [
  { value: 'none', label: 'No Printing' },
  { value: 'single-color', label: 'Single Colour' },
  { value: 'multi-color', label: 'Multi-Colour' },
  { value: 'full-color', label: 'Full Colour (CMYK)' },
  { value: 'custom', label: 'Custom — Need Guidance' },
];

const PLY_OPTIONS = [
  { value: '3-ply', label: '3-Ply — Lightweight items (up to 5 kg)' },
  { value: '5-ply', label: '5-Ply — Heavier items (up to 15 kg)' },
  { value: 'unsure', label: 'Not sure — Recommend for me' },
];

const INITIAL_FORM = {
  productType: '',
  length: '',
  width: '',
  height: '',
  ply: '',
  quantity: '',
  printing: '',
  deliveryDate: '',
  deliveryLocation: '',
  deliveryPincode: '',
  businessName: '',
  contactName: '',
  email: '',
  phone: '',
  requirements: '',
};

/**
 * Validate a specific step and return an error map.
 */
function validateStep(step, data) {
  const errors = {};

  if (step === 1) {
    if (!data.productType) errors.productType = 'Select a product type';
    if (!data.length || Number(data.length) <= 0) errors.length = 'Required';
    if (!data.width || Number(data.width) <= 0) errors.width = 'Required';
    if (!data.height || Number(data.height) <= 0) errors.height = 'Required';
    if (!data.ply) errors.ply = 'Select a ply type';
  }

  if (step === 2) {
    if (!data.quantity || Number(data.quantity) < 500) {
      errors.quantity = 'Minimum 500 units';
    }
    if (!data.printing) errors.printing = 'Select a printing option';
    if (!data.deliveryLocation)
      errors.deliveryLocation = 'Enter delivery city/area';
    if (!data.deliveryPincode || !/^\d{6}$/.test(data.deliveryPincode)) {
      errors.deliveryPincode = 'Enter a valid 6-digit pincode';
    }
  }

  if (step === 3) {
    if (!data.businessName.trim())
      errors.businessName = 'Business name is required';
    if (!data.contactName.trim())
      errors.contactName = 'Contact name is required';
    if (!data.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
      errors.email = 'Enter a valid email address';
    }
    if (
      !data.phone.trim() ||
      !/^\+?\d{10,13}$/.test(data.phone.replace(/\s/g, ''))
    ) {
      errors.phone = 'Enter a valid phone number';
    }
  }

  return errors;
}

/**
 * Multi-step Bulk Order RFQ form.
 * Handles all states: idle, validation, submitting, success, error, retry.
 */
export default function BulkOrderForm() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState(INITIAL_FORM);
  const [errors, setErrors] = useState({});
  const [formState, setFormState] = useState('idle'); // idle | submitting | success | error
  const [quoteRef, setQuoteRef] = useState('');

  const handleChange = useCallback((field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error on change
    setErrors((prev) => {
      if (!prev[field]) return prev;
      const next = { ...prev };
      delete next[field];
      return next;
    });
  }, []);

  const handleInputChange = useCallback(
    (e) => handleChange(e.target.name, e.target.value),
    [handleChange]
  );

  const goToStep = useCallback(
    (target) => {
      if (target < step) {
        setStep(target);
        return;
      }
      // Validate current step before advancing
      const stepErrors = validateStep(step, formData);
      if (Object.keys(stepErrors).length > 0) {
        setErrors(stepErrors);
        return;
      }
      setErrors({});
      setStep(target);
    },
    [step, formData]
  );

  const handleSubmit = useCallback(() => {
    // Validate step 3 one more time (current step when submitting from review)
    const step3Errors = validateStep(3, formData);
    if (Object.keys(step3Errors).length > 0) {
      setErrors(step3Errors);
      setStep(3);
      return;
    }

    setFormState('submitting');
    // Mock API call
    setTimeout(() => {
      // 90% success, 10% error for demo purposes
      if (Math.random() > 0.1) {
        const ref = `BQ-${Date.now().toString(36).toUpperCase().slice(-6)}`;
        setQuoteRef(ref);
        setFormState('success');
      } else {
        setFormState('error');
      }
    }, 2000);
  }, [formData]);

  const handleRetry = useCallback(() => {
    setFormState('idle');
  }, []);

  const handleReset = useCallback(() => {
    setFormData(INITIAL_FORM);
    setErrors({});
    setStep(1);
    setFormState('idle');
    setQuoteRef('');
  }, []);

  const isSubmitting = formState === 'submitting';

  // ── Success State ──
  if (formState === 'success') {
    return (
      <div className="text-center py-12">
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
          <h2 className="text-2xl md:text-3xl font-bold text-charcoal mb-3">
            Quote Request Submitted!
          </h2>
          <p className="text-text-secondary mb-2">
            Your quote reference is{' '}
            <strong className="text-charcoal">{quoteRef}</strong>
          </p>
          <p className="text-text-secondary mb-8 max-w-md mx-auto">
            Our packaging team will review your requirements and get back to you
            within 24 hours with pricing and recommendations.
          </p>
          <div className="flex justify-center gap-3 flex-wrap">
            <Link href="/products" className="btn-primary">
              Browse Products
            </Link>
            <button onClick={handleReset} className="btn-outline">
              Submit Another Quote
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div>
      {/* Step Indicator */}
      <div className="flex items-center justify-center gap-2 mb-8">
        {STEPS.map((s, i) => (
          <div key={s.id} className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => s.id < step && goToStep(s.id)}
              disabled={s.id > step || isSubmitting}
              className={`flex items-center gap-2 px-3 py-2 rounded-full text-sm font-medium transition-all ${
                step === s.id
                  ? 'bg-charcoal text-white'
                  : step > s.id
                    ? 'bg-accent-light text-accent-dark cursor-pointer'
                    : 'bg-warm-gray text-text-tertiary'
              }`}
              aria-current={step === s.id ? 'step' : undefined}
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

      {/* Error Banner */}
      {formState === 'error' && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <Alert variant="error">
            <div className="flex items-center justify-between gap-4 w-full">
              <span>
                Something went wrong while submitting your request. Please try
                again.
              </span>
              <button
                onClick={handleRetry}
                className="btn-outline text-sm px-3 py-1.5 shrink-0"
              >
                <Icon name="RefreshCw" size={14} className="inline mr-1" />
                Retry
              </button>
            </div>
          </Alert>
        </motion.div>
      )}

      {/* Form Steps */}
      <AnimatePresence mode="wait">
        {/* ── Step 1: Product Details ── */}
        {step === 1 && (
          <motion.div
            key="product"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            className="card-bk p-6"
          >
            <h2 className="text-xl font-bold text-charcoal mb-6">
              Product Details
            </h2>
            <div className="space-y-5">
              <Select
                label="Product Type *"
                name="productType"
                value={formData.productType}
                onChange={handleInputChange}
                options={PRODUCT_TYPE_OPTIONS}
                placeholder="What type of packaging?"
                error={errors.productType}
              />

              <div>
                <p className="text-label mb-2">Dimensions (inches) *</p>
                <div className="grid grid-cols-3 gap-3">
                  <Input
                    label="Length"
                    name="length"
                    type="number"
                    min="1"
                    step="0.5"
                    value={formData.length}
                    onChange={handleInputChange}
                    placeholder="L"
                    error={errors.length}
                  />
                  <Input
                    label="Width"
                    name="width"
                    type="number"
                    min="1"
                    step="0.5"
                    value={formData.width}
                    onChange={handleInputChange}
                    placeholder="W"
                    error={errors.width}
                  />
                  <Input
                    label="Height"
                    name="height"
                    type="number"
                    min="1"
                    step="0.5"
                    value={formData.height}
                    onChange={handleInputChange}
                    placeholder="H"
                    error={errors.height}
                  />
                </div>
              </div>

              <div>
                <p className="text-label mb-2">Material / Ply *</p>
                <div className="space-y-2">
                  {PLY_OPTIONS.map((opt) => (
                    <Radio
                      key={opt.value}
                      name="ply"
                      label={opt.label}
                      value={opt.value}
                      checked={formData.ply === opt.value}
                      onChange={handleInputChange}
                    />
                  ))}
                </div>
                {errors.ply && (
                  <p className="text-xs text-danger mt-1.5" role="alert">
                    {errors.ply}
                  </p>
                )}
              </div>
            </div>

            <div className="flex justify-end mt-6">
              <button
                type="button"
                onClick={() => goToStep(2)}
                className="btn-accent flex items-center gap-2"
              >
                Continue <Icon name="ArrowRight" size={16} />
              </button>
            </div>
          </motion.div>
        )}

        {/* ── Step 2: Order Details ── */}
        {step === 2 && (
          <motion.div
            key="order"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            className="card-bk p-6"
          >
            <h2 className="text-xl font-bold text-charcoal mb-6">
              Order Details
            </h2>
            <div className="space-y-5">
              <Input
                label="Quantity *"
                name="quantity"
                type="number"
                min="500"
                step="100"
                value={formData.quantity}
                onChange={handleInputChange}
                placeholder="Minimum 500 units"
                error={errors.quantity}
                helper="Bulk orders start at 500 units. Higher quantities unlock better pricing."
              />

              <Select
                label="Printing Requirements *"
                name="printing"
                value={formData.printing}
                onChange={handleInputChange}
                options={PRINTING_OPTIONS}
                placeholder="Select printing option"
                error={errors.printing}
              />

              <Input
                label="Expected Delivery Date"
                name="deliveryDate"
                type="date"
                value={formData.deliveryDate}
                onChange={handleInputChange}
                helper="Leave blank if flexible on timing."
              />

              <div className="grid sm:grid-cols-2 gap-4">
                <Input
                  label="Delivery City / Area *"
                  name="deliveryLocation"
                  value={formData.deliveryLocation}
                  onChange={handleInputChange}
                  placeholder="e.g. Mumbai, Andheri"
                  error={errors.deliveryLocation}
                />
                <Input
                  label="Delivery Pincode *"
                  name="deliveryPincode"
                  type="text"
                  inputMode="numeric"
                  maxLength={6}
                  value={formData.deliveryPincode}
                  onChange={handleInputChange}
                  placeholder="400001"
                  error={errors.deliveryPincode}
                />
              </div>
            </div>

            <div className="flex justify-between mt-6">
              <button
                type="button"
                onClick={() => goToStep(1)}
                className="btn-outline flex items-center gap-2"
              >
                <Icon name="ArrowLeft" size={16} /> Back
              </button>
              <button
                type="button"
                onClick={() => goToStep(3)}
                className="btn-accent flex items-center gap-2"
              >
                Continue <Icon name="ArrowRight" size={16} />
              </button>
            </div>
          </motion.div>
        )}

        {/* ── Step 3: Contact & Requirements ── */}
        {step === 3 && (
          <motion.div
            key="contact"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            className="card-bk p-6"
          >
            <h2 className="text-xl font-bold text-charcoal mb-6">
              Contact Information
            </h2>
            <div className="space-y-5">
              <div className="grid sm:grid-cols-2 gap-4">
                <Input
                  label="Business Name *"
                  name="businessName"
                  value={formData.businessName}
                  onChange={handleInputChange}
                  placeholder="Your company / brand"
                  error={errors.businessName}
                />
                <Input
                  label="Contact Name *"
                  name="contactName"
                  value={formData.contactName}
                  onChange={handleInputChange}
                  placeholder="Your full name"
                  error={errors.contactName}
                />
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <Input
                  label="Email *"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="you@company.com"
                  error={errors.email}
                />
                <Input
                  label="Phone *"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="+91 98765 43210"
                  error={errors.phone}
                />
              </div>
              <Textarea
                label="Additional Requirements"
                name="requirements"
                value={formData.requirements}
                onChange={handleInputChange}
                placeholder="Any special requirements — inserts, branding, specific materials, delivery schedule, etc."
                rows={4}
                helper="Optional. Share anything that helps us prepare a better quote."
              />
            </div>

            <div className="flex justify-between mt-6">
              <button
                type="button"
                onClick={() => goToStep(2)}
                className="btn-outline flex items-center gap-2"
              >
                <Icon name="ArrowLeft" size={16} /> Back
              </button>
              <button
                type="button"
                onClick={() => goToStep(4)}
                className="btn-accent flex items-center gap-2"
              >
                Review Quote <Icon name="ArrowRight" size={16} />
              </button>
            </div>
          </motion.div>
        )}

        {/* ── Step 4: Review & Submit ── */}
        {step === 4 && (
          <motion.div
            key="review"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            className="card-bk p-6"
          >
            <h2 className="text-xl font-bold text-charcoal mb-6">
              Review Your Quote Request
            </h2>

            {/* Product Summary */}
            <ReviewSection
              title="Product Details"
              icon="Package"
              onEdit={() => setStep(1)}
              disabled={isSubmitting}
            >
              <ReviewRow
                label="Type"
                value={getLabelFor(PRODUCT_TYPE_OPTIONS, formData.productType)}
              />
              <ReviewRow
                label="Dimensions"
                value={`${formData.length} × ${formData.width} × ${formData.height}″`}
              />
              <ReviewRow
                label="Material"
                value={getLabelFor(PLY_OPTIONS, formData.ply)}
              />
            </ReviewSection>

            {/* Order Summary */}
            <ReviewSection
              title="Order Details"
              icon="ShoppingBag"
              onEdit={() => setStep(2)}
              disabled={isSubmitting}
            >
              <ReviewRow
                label="Quantity"
                value={`${Number(formData.quantity).toLocaleString('en-IN')} units`}
              />
              <ReviewRow
                label="Printing"
                value={getLabelFor(PRINTING_OPTIONS, formData.printing)}
              />
              <ReviewRow
                label="Delivery"
                value={`${formData.deliveryLocation}, ${formData.deliveryPincode}`}
              />
              {formData.deliveryDate && (
                <ReviewRow
                  label="Expected Date"
                  value={new Date(formData.deliveryDate).toLocaleDateString(
                    'en-IN',
                    {
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric',
                    }
                  )}
                />
              )}
            </ReviewSection>

            {/* Contact Summary */}
            <ReviewSection
              title="Contact"
              icon="User"
              onEdit={() => setStep(3)}
              disabled={isSubmitting}
            >
              <ReviewRow label="Business" value={formData.businessName} />
              <ReviewRow label="Contact" value={formData.contactName} />
              <ReviewRow label="Email" value={formData.email} />
              <ReviewRow label="Phone" value={formData.phone} />
              {formData.requirements && (
                <ReviewRow label="Notes" value={formData.requirements} />
              )}
            </ReviewSection>

            <div className="flex justify-between mt-6">
              <button
                type="button"
                onClick={() => goToStep(3)}
                disabled={isSubmitting}
                className="btn-outline flex items-center gap-2"
              >
                <Icon name="ArrowLeft" size={16} /> Back
              </button>
              <motion.button
                whileTap={{ scale: 0.98 }}
                type="button"
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="btn-accent flex items-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <Icon name="Loader2" size={16} className="animate-spin" />
                    Submitting…
                  </>
                ) : (
                  <>
                    Submit Quote Request
                    <Icon name="ArrowRight" size={16} />
                  </>
                )}
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ── Helper Components ── */

/** Section in the review step with an Edit button. */
function ReviewSection({ title, icon, children, onEdit, disabled }) {
  return (
    <div className="mb-5">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Icon name={icon} size={18} className="text-kraft" />
          <h3 className="font-semibold text-charcoal text-sm">{title}</h3>
        </div>
        <button
          type="button"
          onClick={onEdit}
          disabled={disabled}
          className="text-xs text-kraft font-medium hover:underline disabled:opacity-50"
        >
          Edit
        </button>
      </div>
      <div className="bg-warm-gray rounded-xl p-4 space-y-2">{children}</div>
    </div>
  );
}

/** Single key → value row inside a ReviewSection. */
function ReviewRow({ label, value }) {
  return (
    <div className="flex justify-between text-sm">
      <span className="text-text-secondary">{label}</span>
      <span className="font-medium text-charcoal text-right max-w-[60%] break-words">
        {value}
      </span>
    </div>
  );
}

/** Get the display label from an options array by value. */
function getLabelFor(options, value) {
  return options.find((o) => o.value === value)?.label || value || '—';
}
