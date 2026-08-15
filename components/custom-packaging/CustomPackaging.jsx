'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Icon from '@/components/common/Icon';

const FEATURES = [
  { icon: 'Ruler', label: 'Custom dimensions' },
  { icon: 'Layers', label: '3-ply / 5-ply' },
  { icon: 'Printer', label: 'Custom printing' },
  { icon: 'Image', label: 'Brand logo' },
  { icon: 'FileText', label: 'Inserts' },
  { icon: 'Scissors', label: 'Die-cut packaging' },
];

/**
 * Custom packaging section with quote form.
 */
export default function CustomPackaging() {
  const [formState, setFormState] = useState('idle');
  const [formData, setFormData] = useState({
    name: '',
    business: '',
    phone: '',
    email: '',
    productType: '',
    length: '',
    width: '',
    height: '',
    quantity: '',
    printing: 'none',
    location: '',
  });

  const [errorMsg, setErrorMsg] = useState(null);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormState('loading');
    setErrorMsg(null);

    try {
      const res = await fetch('/api/custom-quote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          // Send unit as uppercase to match BE enum
          unit: 'INCH',
        }),
      });

      const json = await res.json();

      if (!res.ok || !json.success) {
        const msg =
          json.error?.details?.[0]?.message ||
          json.error?.message ||
          'Something went wrong. Please try again.';
        setErrorMsg(msg);
        setFormState('idle');
        return;
      }

      setFormState('success');
    } catch {
      setErrorMsg('Network error. Please check your connection and try again.');
      setFormState('idle');
    }
  };

  return (
    <section
      id="custom-packaging"
      className="section-padding bg-gradient-to-br from-charcoal to-charcoal-light text-white"
    >
      <div className="container-bk">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left: Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-3">
              Need packaging made for your brand?
            </h2>
            <p className="text-white/70 text-lg mb-8 leading-relaxed">
              Get custom-sized and custom-printed packaging without the usual
              complexity. Our team will help you design the perfect packaging.
            </p>

            <div className="grid grid-cols-2 gap-3 mb-8">
              {FEATURES.map((f) => (
                <div
                  key={f.label}
                  className="flex items-center gap-2.5 bg-white/5 rounded-xl p-3"
                >
                  <Icon
                    name={f.icon}
                    size={18}
                    className="text-kraft-light shrink-0"
                  />
                  <span className="text-sm font-medium text-white/90">
                    {f.label}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right: Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <AnimatePresence mode="wait">
              {formState === 'success' ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-white rounded-2xl p-8 text-center"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: 'spring' }}
                    className="w-16 h-16 bg-accent-light rounded-full flex items-center justify-center mx-auto mb-4"
                  >
                    <Icon
                      name="CheckCircle"
                      size={32}
                      className="text-accent"
                    />
                  </motion.div>
                  <h3 className="text-xl font-bold text-charcoal mb-2">
                    Quote request received!
                  </h3>
                  <p className="text-text-secondary mb-6">
                    We&apos;ll get back to you with pricing within 24 hours.
                  </p>
                  <button
                    onClick={() => {
                      setFormState('idle');
                      setFormData({
                        name: '',
                        business: '',
                        phone: '',
                        email: '',
                        productType: '',
                        length: '',
                        width: '',
                        height: '',
                        quantity: '',
                        printing: 'none',
                        location: '',
                      });
                    }}
                    className="btn-outline text-charcoal"
                  >
                    Submit Another Quote
                  </button>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  onSubmit={handleSubmit}
                  className="bg-white rounded-2xl p-6 shadow-xl"
                >
                  <h3 className="text-lg font-bold text-charcoal mb-4">
                    Get a Custom Quote
                  </h3>

                  <div className="grid sm:grid-cols-2 gap-3 mb-3">
                    <div>
                      <label
                        htmlFor="cq-name"
                        className="block text-xs font-medium text-text-secondary mb-1"
                      >
                        Name *
                      </label>
                      <input
                        id="cq-name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="input-bk"
                        placeholder="Your name"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="cq-business"
                        className="block text-xs font-medium text-text-secondary mb-1"
                      >
                        Business Name
                      </label>
                      <input
                        id="cq-business"
                        name="business"
                        value={formData.business}
                        onChange={handleChange}
                        className="input-bk"
                        placeholder="Company name"
                      />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-3 mb-3">
                    <div>
                      <label
                        htmlFor="cq-phone"
                        className="block text-xs font-medium text-text-secondary mb-1"
                      >
                        Phone *
                      </label>
                      <input
                        id="cq-phone"
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        className="input-bk"
                        placeholder="+91 98765 43210"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="cq-email"
                        className="block text-xs font-medium text-text-secondary mb-1"
                      >
                        Email *
                      </label>
                      <input
                        id="cq-email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="input-bk"
                        placeholder="you@company.com"
                      />
                    </div>
                  </div>

                  <div className="mb-3">
                    <label
                      htmlFor="cq-product"
                      className="block text-xs font-medium text-text-secondary mb-1"
                    >
                      Product Type
                    </label>
                    <input
                      id="cq-product"
                      name="productType"
                      value={formData.productType}
                      onChange={handleChange}
                      className="input-bk"
                      placeholder="e.g. Clothing, Cosmetics"
                    />
                  </div>

                  <div className="grid grid-cols-3 gap-3 mb-3">
                    <div>
                      <label
                        htmlFor="cq-length"
                        className="block text-xs font-medium text-text-secondary mb-1"
                      >
                        Length (in)
                      </label>
                      <input
                        id="cq-length"
                        name="length"
                        type="number"
                        value={formData.length}
                        onChange={handleChange}
                        className="input-bk text-center"
                        placeholder="0"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="cq-width"
                        className="block text-xs font-medium text-text-secondary mb-1"
                      >
                        Width (in)
                      </label>
                      <input
                        id="cq-width"
                        name="width"
                        type="number"
                        value={formData.width}
                        onChange={handleChange}
                        className="input-bk text-center"
                        placeholder="0"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="cq-height"
                        className="block text-xs font-medium text-text-secondary mb-1"
                      >
                        Height (in)
                      </label>
                      <input
                        id="cq-height"
                        name="height"
                        type="number"
                        value={formData.height}
                        onChange={handleChange}
                        className="input-bk text-center"
                        placeholder="0"
                      />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-3 mb-3">
                    <div>
                      <label
                        htmlFor="cq-quantity"
                        className="block text-xs font-medium text-text-secondary mb-1"
                      >
                        Quantity *
                      </label>
                      <input
                        id="cq-quantity"
                        name="quantity"
                        type="number"
                        value={formData.quantity}
                        onChange={handleChange}
                        required
                        className="input-bk"
                        placeholder="1000"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="cq-printing"
                        className="block text-xs font-medium text-text-secondary mb-1"
                      >
                        Printing
                      </label>
                      <select
                        id="cq-printing"
                        name="printing"
                        value={formData.printing}
                        onChange={handleChange}
                        className="input-bk"
                      >
                        <option value="none">No printing</option>
                        <option value="1-color">1-Color</option>
                        <option value="2-color">2-Color</option>
                        <option value="full-color">Full Color</option>
                      </select>
                    </div>
                  </div>

                  <div className="mb-4">
                    <label
                      htmlFor="cq-location"
                      className="block text-xs font-medium text-text-secondary mb-1"
                    >
                      Delivery Location
                    </label>
                    <input
                      id="cq-location"
                      name="location"
                      value={formData.location}
                      onChange={handleChange}
                      className="input-bk"
                      placeholder="City / Pincode"
                    />
                  </div>

                  {/* Error message */}
                  {errorMsg && (
                    <div className="mb-3 p-3 bg-red-50 border border-red-200 rounded-xl text-sm text-red-700">
                      {errorMsg}
                    </div>
                  )}

                  <motion.button
                    type="submit"
                    whileTap={{ scale: 0.98 }}
                    disabled={formState === 'loading'}
                    className="btn-accent w-full flex items-center justify-center gap-2"
                  >
                    {formState === 'loading' ? (
                      <>
                        <Icon
                          name="Loader2"
                          size={16}
                          className="animate-spin"
                        />
                        Submitting...
                      </>
                    ) : (
                      'Get a Custom Quote'
                    )}
                  </motion.button>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
