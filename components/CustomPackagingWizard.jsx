'use client';

import { useState, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Link from 'next/link';
import Icon from '@/components/Icon';
import {
  Input,
  Select,
  Textarea,
  Radio,
  Alert,
  DimensionInput,
} from '@/components/ui';

const STEPS = [
  { id: 1, label: 'Dimensions', icon: 'Ruler' },
  { id: 2, label: 'Material', icon: 'Layers' },
  { id: 3, label: 'Printing', icon: 'Printer' },
  { id: 4, label: 'Quantity', icon: 'Package' },
  { id: 5, label: 'Contact', icon: 'User' },
  { id: 6, label: 'Quote', icon: 'CheckCircle' },
];

/* ── Option Definitions ── */

const BOX_TYPE_OPTIONS = [
  { value: 'shipping-box', label: 'Shipping Box (RSC)' },
  { value: 'mailer-box', label: 'Mailer Box (Tuck-end)' },
  { value: 'die-cut-box', label: 'Die-Cut Box' },
  { value: 'rigid-box', label: 'Rigid / Gift Box' },
  { value: 'display-box', label: 'Display / Counter Box' },
  { value: 'other', label: 'Other — describe in notes' },
];

const MATERIAL_OPTIONS = [
  {
    value: '3-ply-kraft',
    label: '3-Ply Kraft',
    description:
      'Lightweight, ideal for items up to 5 kg. Most economical option.',
    icon: 'Package',
  },
  {
    value: '5-ply-kraft',
    label: '5-Ply Kraft',
    description:
      'Strong and durable, suitable for items up to 15 kg. Best for heavier products.',
    icon: 'Shield',
  },
  {
    value: '3-ply-white',
    label: '3-Ply White Top',
    description:
      'Clean white exterior with kraft interior. Great for branded unboxing.',
    icon: 'Sparkles',
  },
  {
    value: '5-ply-white',
    label: '5-Ply White Top',
    description:
      'Premium white exterior with extra strength. Ideal for luxury D2C brands.',
    icon: 'Award',
  },
  {
    value: 'unsure',
    label: 'Not sure — recommend for me',
    description:
      'Our team will suggest the best material based on your product and budget.',
    icon: 'Info',
  },
];

const PRINTING_TYPE_OPTIONS = [
  {
    value: 'none',
    label: 'No Printing',
    description: 'Plain brown/white box. Lowest cost, fastest turnaround.',
    price: null,
  },
  {
    value: 'single-color',
    label: 'Single Colour',
    description:
      'Your logo in one colour. Clean, professional, and affordable.',
    price: 'From ₹0.50/box',
  },
  {
    value: 'two-color',
    label: 'Two Colour',
    description:
      'Logo and brand elements in two colours for more visual impact.',
    price: 'From ₹1.00/box',
  },
  {
    value: 'full-color',
    label: 'Full Colour (CMYK)',
    description:
      'Vibrant, photo-quality printing across the entire box surface.',
    price: 'From ₹2.50/box',
  },
];

const LOGO_ACCEPTED_TYPES = [
  'image/png',
  'image/jpeg',
  'image/svg+xml',
  'application/pdf',
];
const LOGO_MAX_SIZE = 10 * 1024 * 1024; // 10 MB

const INITIAL_FORM = {
  boxType: '',
  dimensions: { length: '', width: '', height: '' },
  unit: 'inch',
  material: '',
  printing: '',
  logoFile: null,
  logoState: 'empty', // empty | selected | uploading | uploaded | error
  logoPreview: null,
  quantity: '',
  contactName: '',
  businessName: '',
  email: '',
  phone: '',
  notes: '',
};

/* ── Validation ── */

function validateStep(step, data) {
  const errors = {};

  if (step === 1) {
    if (!data.boxType) errors.boxType = 'Select a box type';
    const d = data.dimensions;
    if (!d.length || Number(d.length) <= 0)
      errors.dimensions = 'All three dimensions are required';
    if (!d.width || Number(d.width) <= 0)
      errors.dimensions = 'All three dimensions are required';
    if (!d.height || Number(d.height) <= 0)
      errors.dimensions = 'All three dimensions are required';
  }

  if (step === 2) {
    if (!data.material) errors.material = 'Select a material';
  }

  if (step === 3) {
    if (!data.printing) errors.printing = 'Select a printing option';
  }

  if (step === 4) {
    if (!data.quantity || Number(data.quantity) < 200) {
      errors.quantity = 'Minimum order is 200 units for custom packaging';
    }
  }

  if (step === 5) {
    if (!data.contactName.trim()) errors.contactName = 'Name is required';
    if (!data.businessName.trim())
      errors.businessName = 'Business name is required';
    if (!data.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
      errors.email = 'Enter a valid email';
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
 * Multi-step Custom Packaging Wizard.
 * Steps: Dimensions → Material → Printing (with logo upload) → Quantity → Contact → Review/Quote
 */
export default function CustomPackagingWizard() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState(INITIAL_FORM);
  const [errors, setErrors] = useState({});
  const [formState, setFormState] = useState('idle');
  const [quoteRef, setQuoteRef] = useState('');
  const logoInputRef = useRef(null);

  const handleChange = useCallback((field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
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

  /* ── Logo Upload ── */

  const handleLogoSelect = useCallback((e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate type
    if (
      !LOGO_ACCEPTED_TYPES.includes(file.type) &&
      !file.name.match(/\.(png|jpe?g|svg|pdf)$/i)
    ) {
      setFormData((prev) => ({
        ...prev,
        logoFile: null,
        logoState: 'error',
        logoPreview: null,
      }));
      setErrors((prev) => ({
        ...prev,
        logo: 'Accepted formats: PNG, JPG, SVG, PDF',
      }));
      return;
    }

    // Validate size
    if (file.size > LOGO_MAX_SIZE) {
      setFormData((prev) => ({
        ...prev,
        logoFile: null,
        logoState: 'error',
        logoPreview: null,
      }));
      setErrors((prev) => ({ ...prev, logo: 'File size exceeds 10 MB limit' }));
      return;
    }

    // Generate preview for image types
    let preview = null;
    if (file.type.startsWith('image/') && file.type !== 'image/svg+xml') {
      preview = URL.createObjectURL(file);
    }

    setFormData((prev) => ({
      ...prev,
      logoFile: file,
      logoState: 'selected',
      logoPreview: preview,
    }));
    setErrors((prev) => {
      const next = { ...prev };
      delete next.logo;
      return next;
    });

    // Mock upload
    setTimeout(() => {
      setFormData((prev) => ({ ...prev, logoState: 'uploading' }));
      setTimeout(() => {
        setFormData((prev) => ({ ...prev, logoState: 'uploaded' }));
      }, 1500);
    }, 300);
  }, []);

  const handleLogoRemove = useCallback(() => {
    if (formData.logoPreview) URL.revokeObjectURL(formData.logoPreview);
    setFormData((prev) => ({
      ...prev,
      logoFile: null,
      logoState: 'empty',
      logoPreview: null,
    }));
    setErrors((prev) => {
      const next = { ...prev };
      delete next.logo;
      return next;
    });
    if (logoInputRef.current) logoInputRef.current.value = '';
  }, [formData.logoPreview]);

  /* ── Submit ── */

  const handleSubmit = useCallback(() => {
    const step5Errors = validateStep(5, formData);
    if (Object.keys(step5Errors).length > 0) {
      setErrors(step5Errors);
      setStep(5);
      return;
    }
    setFormState('submitting');
    setTimeout(() => {
      if (Math.random() > 0.1) {
        const ref = `CP-${Date.now().toString(36).toUpperCase().slice(-6)}`;
        setQuoteRef(ref);
        setFormState('success');
      } else {
        setFormState('error');
      }
    }, 2000);
  }, [formData]);

  const handleReset = useCallback(() => {
    if (formData.logoPreview) URL.revokeObjectURL(formData.logoPreview);
    setFormData(INITIAL_FORM);
    setErrors({});
    setStep(1);
    setFormState('idle');
    setQuoteRef('');
  }, [formData.logoPreview]);

  const isSubmitting = formState === 'submitting';

  // ── Success ──
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
            Custom Quote Submitted!
          </h2>
          <p className="text-text-secondary mb-2">
            Reference: <strong className="text-charcoal">{quoteRef}</strong>
          </p>
          <p className="text-text-secondary mb-8 max-w-md mx-auto">
            Our packaging experts will review your requirements and send a
            detailed quote with pricing within 24–48 hours.
          </p>
          <div className="flex justify-center gap-3 flex-wrap">
            <Link href="/products" className="btn-primary">
              Browse Products
            </Link>
            <button onClick={handleReset} className="btn-outline">
              Submit Another Request
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div>
      {/* Step Indicator */}
      <div className="flex items-center justify-center gap-1 sm:gap-2 mb-8 overflow-x-auto pb-2">
        {STEPS.map((s, i) => (
          <div key={s.id} className="flex items-center gap-1 sm:gap-2 shrink-0">
            <button
              type="button"
              onClick={() => s.id < step && goToStep(s.id)}
              disabled={s.id > step || isSubmitting}
              className={`flex items-center gap-1.5 px-2 sm:px-3 py-2 rounded-full text-xs sm:text-sm font-medium transition-all ${
                step === s.id
                  ? 'bg-charcoal text-white'
                  : step > s.id
                    ? 'bg-accent-light text-accent-dark cursor-pointer'
                    : 'bg-warm-gray text-text-tertiary'
              }`}
              aria-current={step === s.id ? 'step' : undefined}
            >
              <Icon name={s.icon} size={14} />
              <span className="hidden md:inline">{s.label}</span>
            </button>
            {i < STEPS.length - 1 && (
              <div
                className={`w-4 sm:w-8 h-0.5 ${
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
              <span>Something went wrong. Please try again.</span>
              <button
                onClick={() => setFormState('idle')}
                className="btn-outline text-sm px-3 py-1.5 shrink-0"
              >
                <Icon name="RefreshCw" size={14} className="inline mr-1" />
                Retry
              </button>
            </div>
          </Alert>
        </motion.div>
      )}

      <AnimatePresence mode="wait">
        {/* ── Step 1: Dimensions ── */}
        {step === 1 && (
          <motion.div
            key="dimensions"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            className="card-bk p-6"
          >
            <h2 className="text-xl font-bold text-charcoal mb-2">
              What are you packaging?
            </h2>
            <p className="text-body-sm mb-6">
              Tell us the box type and exact dimensions you need.
            </p>

            <div className="space-y-5">
              <Select
                label="Box Type *"
                name="boxType"
                value={formData.boxType}
                onChange={handleInputChange}
                options={BOX_TYPE_OPTIONS}
                placeholder="Select box type"
                error={errors.boxType}
              />

              <DimensionInput
                label="Inner Dimensions *"
                value={formData.dimensions}
                onChange={(dims) => handleChange('dimensions', dims)}
                unit={formData.unit}
                onUnitChange={(u) => handleChange('unit', u)}
                error={errors.dimensions}
              />

              <p className="text-caption">
                Measure the product you&apos;re packaging and add 5–10 mm
                clearance on each side for a snug fit.
              </p>
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

        {/* ── Step 2: Material ── */}
        {step === 2 && (
          <motion.div
            key="material"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            className="card-bk p-6"
          >
            <h2 className="text-xl font-bold text-charcoal mb-2">
              Choose Your Material
            </h2>
            <p className="text-body-sm mb-6">
              Select the strength and finish that best suits your product.
            </p>

            <div className="space-y-3">
              {MATERIAL_OPTIONS.map((opt) => (
                <label
                  key={opt.value}
                  htmlFor={`mat-${opt.value}`}
                  className={`flex items-start gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all ${
                    formData.material === opt.value
                      ? 'border-kraft bg-kraft-bg'
                      : 'border-border hover:border-border-hover'
                  }`}
                >
                  <input
                    type="radio"
                    id={`mat-${opt.value}`}
                    name="material"
                    value={opt.value}
                    checked={formData.material === opt.value}
                    onChange={handleInputChange}
                    className="mt-1 w-4 h-4 accent-kraft shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <Icon
                        name={opt.icon}
                        size={16}
                        className="text-kraft shrink-0"
                      />
                      <span className="font-semibold text-charcoal text-sm">
                        {opt.label}
                      </span>
                    </div>
                    <p className="text-xs text-text-secondary leading-relaxed">
                      {opt.description}
                    </p>
                  </div>
                </label>
              ))}
            </div>
            {errors.material && (
              <p className="text-xs text-danger mt-2" role="alert">
                {errors.material}
              </p>
            )}

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

        {/* ── Step 3: Printing + Logo Upload ── */}
        {step === 3 && (
          <motion.div
            key="printing"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            className="card-bk p-6"
          >
            <h2 className="text-xl font-bold text-charcoal mb-2">
              Printing &amp; Branding
            </h2>
            <p className="text-body-sm mb-6">
              Add your brand to the packaging or keep it plain.
            </p>

            {/* Printing Options */}
            <div className="space-y-3 mb-6">
              {PRINTING_TYPE_OPTIONS.map((opt) => (
                <label
                  key={opt.value}
                  htmlFor={`print-${opt.value}`}
                  className={`flex items-start gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all ${
                    formData.printing === opt.value
                      ? 'border-kraft bg-kraft-bg'
                      : 'border-border hover:border-border-hover'
                  }`}
                >
                  <input
                    type="radio"
                    id={`print-${opt.value}`}
                    name="printing"
                    value={opt.value}
                    checked={formData.printing === opt.value}
                    onChange={handleInputChange}
                    className="mt-1 w-4 h-4 accent-kraft shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-0.5">
                      <span className="font-semibold text-charcoal text-sm">
                        {opt.label}
                      </span>
                      {opt.price && (
                        <span className="text-xs text-accent font-medium">
                          {opt.price}
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-text-secondary leading-relaxed">
                      {opt.description}
                    </p>
                  </div>
                </label>
              ))}
            </div>
            {errors.printing && (
              <p className="text-xs text-danger mt-2 mb-4" role="alert">
                {errors.printing}
              </p>
            )}

            {/* Logo Upload (only if printing !== 'none') */}
            {formData.printing && formData.printing !== 'none' && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="mt-4"
              >
                <p className="text-label mb-2">Upload Your Logo</p>
                <p className="text-caption mb-3">
                  Optional. PNG, JPG, SVG or PDF up to 10 MB. We can work with
                  you on design if you don&apos;t have artwork ready.
                </p>

                {/* Logo States */}
                {formData.logoState === 'empty' && (
                  <div
                    className="border-2 border-dashed border-border rounded-xl p-6 text-center hover:border-border-hover transition-colors cursor-pointer"
                    onClick={() => logoInputRef.current?.click()}
                    onKeyDown={(e) =>
                      e.key === 'Enter' && logoInputRef.current?.click()
                    }
                    role="button"
                    tabIndex={0}
                    aria-label="Upload logo file"
                  >
                    <Icon
                      name="Image"
                      size={24}
                      className="text-text-tertiary mx-auto mb-2"
                    />
                    <p className="text-sm text-text-secondary mb-1">
                      Click or drag logo file here
                    </p>
                    <p className="text-xs text-text-tertiary">
                      PNG, JPG, SVG or PDF
                    </p>
                    <input
                      ref={logoInputRef}
                      type="file"
                      accept=".png,.jpg,.jpeg,.svg,.pdf"
                      onChange={handleLogoSelect}
                      className="hidden"
                      aria-label="Logo file upload"
                    />
                  </div>
                )}

                {formData.logoState === 'error' && (
                  <div className="border-2 border-dashed border-danger/30 rounded-xl p-6 text-center bg-danger-light/50">
                    <Icon
                      name="AlertCircle"
                      size={24}
                      className="text-danger mx-auto mb-2"
                    />
                    <p className="text-sm text-danger font-medium mb-1">
                      {errors.logo || 'Invalid file'}
                    </p>
                    <button
                      type="button"
                      onClick={() => {
                        handleLogoRemove();
                        logoInputRef.current?.click();
                      }}
                      className="text-xs text-kraft font-medium hover:underline mt-1"
                    >
                      Try another file
                    </button>
                    <input
                      ref={logoInputRef}
                      type="file"
                      accept=".png,.jpg,.jpeg,.svg,.pdf"
                      onChange={handleLogoSelect}
                      className="hidden"
                      aria-label="Logo file upload"
                    />
                  </div>
                )}

                {(formData.logoState === 'selected' ||
                  formData.logoState === 'uploading') && (
                  <div className="flex items-center gap-4 p-4 rounded-xl border border-border bg-warm-gray">
                    <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center shrink-0 overflow-hidden">
                      {formData.logoPreview ? (
                        <LogoThumbnail src={formData.logoPreview} />
                      ) : (
                        <Icon
                          name="FileText"
                          size={20}
                          className="text-kraft"
                        />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-charcoal truncate">
                        {formData.logoFile?.name}
                      </p>
                      <p className="text-xs text-text-tertiary">
                        {formData.logoState === 'uploading' ? (
                          <span className="text-kraft">
                            <Icon
                              name="Loader2"
                              size={12}
                              className="inline animate-spin mr-1"
                            />
                            Uploading…
                          </span>
                        ) : (
                          formatBytes(formData.logoFile?.size)
                        )}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={handleLogoRemove}
                      className="p-2 rounded-lg hover:bg-white transition-colors"
                      aria-label="Remove logo"
                    >
                      <Icon name="X" size={16} className="text-text-tertiary" />
                    </button>
                  </div>
                )}

                {formData.logoState === 'uploaded' && (
                  <div className="flex items-center gap-4 p-4 rounded-xl border border-accent/20 bg-accent-light">
                    <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center shrink-0 overflow-hidden">
                      {formData.logoPreview ? (
                        <LogoThumbnail src={formData.logoPreview} />
                      ) : (
                        <Icon
                          name="FileText"
                          size={20}
                          className="text-accent"
                        />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-charcoal truncate">
                        {formData.logoFile?.name}
                      </p>
                      <p className="text-xs text-accent font-medium">
                        <Icon
                          name="CheckCircle"
                          size={12}
                          className="inline mr-1"
                        />
                        Uploaded successfully
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={handleLogoRemove}
                      className="p-2 rounded-lg hover:bg-white transition-colors"
                      aria-label="Remove logo"
                    >
                      <Icon
                        name="Trash2"
                        size={16}
                        className="text-text-tertiary"
                      />
                    </button>
                  </div>
                )}
              </motion.div>
            )}

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
                Continue <Icon name="ArrowRight" size={16} />
              </button>
            </div>
          </motion.div>
        )}

        {/* ── Step 4: Quantity ── */}
        {step === 4 && (
          <motion.div
            key="quantity"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            className="card-bk p-6"
          >
            <h2 className="text-xl font-bold text-charcoal mb-2">
              How Many Do You Need?
            </h2>
            <p className="text-body-sm mb-6">
              Custom packaging starts at 200 units. Higher volumes unlock better
              pricing.
            </p>

            <div className="space-y-5">
              <Input
                label="Quantity *"
                name="quantity"
                type="number"
                min="200"
                step="100"
                value={formData.quantity}
                onChange={handleInputChange}
                placeholder="e.g. 1000"
                error={errors.quantity}
                helper="MOQ for custom packaging is 200 units."
              />

              {/* Quantity Guidance */}
              <div className="grid grid-cols-3 gap-3">
                {[
                  {
                    qty: '200–500',
                    label: 'Trial Run',
                    desc: 'Test your packaging design',
                  },
                  {
                    qty: '500–2,000',
                    label: 'Growing',
                    desc: 'Best price-to-quantity ratio',
                  },
                  {
                    qty: '2,000+',
                    label: 'Scale',
                    desc: 'Maximum volume discount',
                  },
                ].map((tier) => (
                  <div
                    key={tier.qty}
                    className="text-center p-3 rounded-xl bg-warm-gray"
                  >
                    <p className="font-bold text-charcoal text-sm">
                      {tier.qty}
                    </p>
                    <p className="text-xs font-medium text-kraft">
                      {tier.label}
                    </p>
                    <p className="text-xs text-text-tertiary mt-0.5">
                      {tier.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-between mt-6">
              <button
                type="button"
                onClick={() => goToStep(3)}
                className="btn-outline flex items-center gap-2"
              >
                <Icon name="ArrowLeft" size={16} /> Back
              </button>
              <button
                type="button"
                onClick={() => goToStep(5)}
                className="btn-accent flex items-center gap-2"
              >
                Continue <Icon name="ArrowRight" size={16} />
              </button>
            </div>
          </motion.div>
        )}

        {/* ── Step 5: Contact ── */}
        {step === 5 && (
          <motion.div
            key="contact"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            className="card-bk p-6"
          >
            <h2 className="text-xl font-bold text-charcoal mb-2">
              Contact Information
            </h2>
            <p className="text-body-sm mb-6">
              We&apos;ll use this to send your custom packaging quote.
            </p>

            <div className="space-y-5">
              <div className="grid sm:grid-cols-2 gap-4">
                <Input
                  label="Contact Name *"
                  name="contactName"
                  value={formData.contactName}
                  onChange={handleInputChange}
                  placeholder="Your full name"
                  error={errors.contactName}
                />
                <Input
                  label="Business Name *"
                  name="businessName"
                  value={formData.businessName}
                  onChange={handleInputChange}
                  placeholder="Company / Brand"
                  error={errors.businessName}
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
                label="Additional Notes"
                name="notes"
                value={formData.notes}
                onChange={handleInputChange}
                placeholder="Any specific requirements — inserts, inner coating, special finishes, delivery timeline…"
                rows={3}
                helper="Optional. Our team will discuss details after reviewing your request."
              />
            </div>

            <div className="flex justify-between mt-6">
              <button
                type="button"
                onClick={() => goToStep(4)}
                className="btn-outline flex items-center gap-2"
              >
                <Icon name="ArrowLeft" size={16} /> Back
              </button>
              <button
                type="button"
                onClick={() => goToStep(6)}
                className="btn-accent flex items-center gap-2"
              >
                Review Quote <Icon name="ArrowRight" size={16} />
              </button>
            </div>
          </motion.div>
        )}

        {/* ── Step 6: Review & Submit ── */}
        {step === 6 && (
          <motion.div
            key="review"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            className="card-bk p-6"
          >
            <h2 className="text-xl font-bold text-charcoal mb-6">
              Review Your Custom Packaging Request
            </h2>

            <ReviewSection
              title="Dimensions"
              icon="Ruler"
              onEdit={() => setStep(1)}
              disabled={isSubmitting}
            >
              <ReviewRow
                label="Box Type"
                value={getLabelFor(BOX_TYPE_OPTIONS, formData.boxType)}
              />
              <ReviewRow
                label="Size"
                value={`${formData.dimensions.length} × ${formData.dimensions.width} × ${formData.dimensions.height} ${formData.unit}`}
              />
            </ReviewSection>

            <ReviewSection
              title="Material"
              icon="Layers"
              onEdit={() => setStep(2)}
              disabled={isSubmitting}
            >
              <ReviewRow
                label="Material"
                value={getLabelFor(MATERIAL_OPTIONS, formData.material)}
              />
            </ReviewSection>

            <ReviewSection
              title="Printing"
              icon="Printer"
              onEdit={() => setStep(3)}
              disabled={isSubmitting}
            >
              <ReviewRow
                label="Printing"
                value={getLabelFor(PRINTING_TYPE_OPTIONS, formData.printing)}
              />
              {formData.logoFile && (
                <ReviewRow label="Logo" value={formData.logoFile.name} />
              )}
            </ReviewSection>

            <ReviewSection
              title="Quantity"
              icon="Package"
              onEdit={() => setStep(4)}
              disabled={isSubmitting}
            >
              <ReviewRow
                label="Quantity"
                value={`${Number(formData.quantity).toLocaleString('en-IN')} units`}
              />
            </ReviewSection>

            <ReviewSection
              title="Contact"
              icon="User"
              onEdit={() => setStep(5)}
              disabled={isSubmitting}
            >
              <ReviewRow label="Name" value={formData.contactName} />
              <ReviewRow label="Business" value={formData.businessName} />
              <ReviewRow label="Email" value={formData.email} />
              <ReviewRow label="Phone" value={formData.phone} />
              {formData.notes && (
                <ReviewRow label="Notes" value={formData.notes} />
              )}
            </ReviewSection>

            <div className="flex justify-between mt-6">
              <button
                type="button"
                onClick={() => goToStep(5)}
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

function getLabelFor(options, value) {
  return options.find((o) => o.value === value)?.label || value || '—';
}

function formatBytes(bytes) {
  if (!bytes) return '';
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

/** Renders a blob-URL logo thumbnail. Uses <img> because next/image doesn't support blob URLs. */
function LogoThumbnail({ src }) {
  // eslint-disable-next-line @next/next/no-img-element
  return (
    <img
      src={src}
      alt="Logo preview"
      className="w-full h-full object-contain"
    />
  );
}
