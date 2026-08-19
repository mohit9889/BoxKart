'use client';

import { motion } from 'motion/react';
import Icon from '@/components/common/Icon';
import { useState } from 'react';
import { validateRequired, validateEmail } from '@/lib/validation';
import { contactApi } from '@/lib/api/contact';

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    subject: 'General Inquiry',
    message: '',
  });

  const [formErrors, setFormErrors] = useState({});

  const handleBlur = (field) => {
    let err = null;
    if (field === 'firstName')
      err = validateRequired(formData.firstName, 'First Name');
    if (field === 'lastName')
      err = validateRequired(formData.lastName, 'Last Name');
    if (field === 'email') err = validateEmail(formData.email);
    if (field === 'message')
      err = validateRequired(formData.message, 'Message');

    setFormErrors((prev) => ({ ...prev, [field]: err }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const errors = {};
    errors.firstName = validateRequired(formData.firstName, 'First Name');
    errors.lastName = validateRequired(formData.lastName, 'Last Name');
    errors.email = validateEmail(formData.email);
    errors.message = validateRequired(formData.message, 'Message');

    setFormErrors(errors);
    if (Object.values(errors).some((err) => err !== null)) return;

    setIsSubmitting(true);

    try {
      await contactApi.submitContactForm({
        fullName: `${formData.firstName} ${formData.lastName}`.trim(),
        email: formData.email,
        inquiryType: formData.subject,
        message: formData.message,
      });
      setIsSuccess(true);
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        subject: 'General Inquiry',
        message: '',
      });
    } catch (err) {
      console.error('Failed to submit contact form:', err);
      // We could set a global error state here if needed
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#faf8f5] pt-24 pb-24">
      <div className="container-bk max-w-6xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold tracking-tight text-[var(--color-charcoal)] mb-6"
          >
            Get in touch
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg text-[var(--color-text-secondary)]"
          >
            Whether you need a custom quote, have a question about shipping, or
            just want to say hello — we&apos;re here to help.
          </motion.p>
        </div>

        <div className="grid lg:grid-cols-5 gap-12 lg:gap-8 items-start">
          {/* Contact Info Cards */}
          <div className="lg:col-span-2 space-y-6">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white p-8 rounded-3xl border border-[#e8e4de] shadow-sm flex items-start gap-4"
            >
              <div className="w-12 h-12 bg-[#faf8f5] rounded-xl flex items-center justify-center shrink-0">
                <Icon
                  name="Mail"
                  size={24}
                  className="text-[var(--color-kraft)]"
                />
              </div>
              <div>
                <h3 className="text-lg font-bold text-[var(--color-charcoal)] mb-1">
                  Email Us
                </h3>
                <p className="text-[var(--color-text-secondary)] mb-2 text-sm">
                  We&apos;ll respond within 24 hours.
                </p>
                <a
                  href="mailto:support@boxkart.com"
                  className="font-medium text-[var(--color-charcoal)] hover:text-[var(--color-kraft)] transition-colors"
                >
                  support@boxkart.com
                </a>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white p-8 rounded-3xl border border-[#e8e4de] shadow-sm flex items-start gap-4"
            >
              <div className="w-12 h-12 bg-[#faf8f5] rounded-xl flex items-center justify-center shrink-0">
                <Icon
                  name="Phone"
                  size={24}
                  className="text-[var(--color-kraft)]"
                />
              </div>
              <div>
                <h3 className="text-lg font-bold text-[var(--color-charcoal)] mb-1">
                  Call Us
                </h3>
                <p className="text-[var(--color-text-secondary)] mb-2 text-sm">
                  Mon-Fri from 9am to 6pm IST.
                </p>
                <a
                  href="tel:+919876543210"
                  className="font-medium text-[var(--color-charcoal)] hover:text-[var(--color-kraft)] transition-colors"
                >
                  +91 98765 43210
                </a>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-white p-8 rounded-3xl border border-[#e8e4de] shadow-sm flex items-start gap-4"
            >
              <div className="w-12 h-12 bg-[#faf8f5] rounded-xl flex items-center justify-center shrink-0">
                <Icon
                  name="MapPin"
                  size={24}
                  className="text-[var(--color-kraft)]"
                />
              </div>
              <div>
                <h3 className="text-lg font-bold text-[var(--color-charcoal)] mb-1">
                  Headquarters
                </h3>
                <p className="text-[var(--color-text-secondary)] text-sm leading-relaxed">
                  123 Packaging Hub, Industrial Area Phase 1,
                  <br />
                  New Delhi, 110020, India
                </p>
              </div>
            </motion.div>
          </div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="lg:col-span-3 bg-white p-8 md:p-12 rounded-[2rem] border border-[#e8e4de] shadow-lg relative overflow-hidden"
          >
            {/* Subtle Gradient background for form */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-[#e8e4de]/50 to-transparent blur-3xl rounded-full translate-x-1/2 -translate-y-1/2 pointer-events-none" />

            {isSuccess ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6">
                  <Icon name="Check" size={40} className="text-green-600" />
                </div>
                <h3 className="text-2xl font-bold text-[var(--color-charcoal)] mb-4">
                  Message Sent!
                </h3>
                <p className="text-[var(--color-text-secondary)] mb-8 max-w-md mx-auto">
                  Thank you for reaching out. One of our packaging experts will
                  get back to you shortly.
                </p>
                <button
                  onClick={() => setIsSuccess(false)}
                  className="btn-primary"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2 col-span-2 md:col-span-1">
                    <label
                      htmlFor="firstName"
                      className="text-sm font-medium text-[var(--color-charcoal)]"
                    >
                      First Name
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      value={formData.firstName}
                      onChange={(e) =>
                        setFormData({ ...formData, firstName: e.target.value })
                      }
                      onBlur={() => handleBlur('firstName')}
                      className={`w-full px-4 py-3 bg-[#faf8f5] border ${formErrors.firstName ? 'border-red-500 focus:ring-red-200 focus:border-red-500' : 'border-[#e8e4de] focus:ring-[var(--color-charcoal)]/10 focus:border-[var(--color-charcoal)]'} rounded-xl focus:outline-none focus:ring-2 transition-colors`}
                      placeholder="John"
                    />
                    {formErrors.firstName && (
                      <p className="text-xs text-red-500">
                        {formErrors.firstName}
                      </p>
                    )}
                  </div>
                  <div className="space-y-2 col-span-2 md:col-span-1">
                    <label
                      htmlFor="lastName"
                      className="text-sm font-medium text-[var(--color-charcoal)]"
                    >
                      Last Name
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      value={formData.lastName}
                      onChange={(e) =>
                        setFormData({ ...formData, lastName: e.target.value })
                      }
                      onBlur={() => handleBlur('lastName')}
                      className={`w-full px-4 py-3 bg-[#faf8f5] border ${formErrors.lastName ? 'border-red-500 focus:ring-red-200 focus:border-red-500' : 'border-[#e8e4de] focus:ring-[var(--color-charcoal)]/10 focus:border-[var(--color-charcoal)]'} rounded-xl focus:outline-none focus:ring-2 transition-colors`}
                      placeholder="Doe"
                    />
                    {formErrors.lastName && (
                      <p className="text-xs text-red-500">
                        {formErrors.lastName}
                      </p>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="email"
                    className="text-sm font-medium text-[var(--color-charcoal)]"
                  >
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    onBlur={() => handleBlur('email')}
                    className={`w-full px-4 py-3 bg-[#faf8f5] border ${formErrors.email ? 'border-red-500 focus:ring-red-200 focus:border-red-500' : 'border-[#e8e4de] focus:ring-[var(--color-charcoal)]/10 focus:border-[var(--color-charcoal)]'} rounded-xl focus:outline-none focus:ring-2 transition-colors`}
                    placeholder="john@company.com"
                  />
                  {formErrors.email && (
                    <p className="text-xs text-red-500">{formErrors.email}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="subject"
                    className="text-sm font-medium text-[var(--color-charcoal)]"
                  >
                    Subject
                  </label>
                  <select
                    id="subject"
                    value={formData.subject}
                    onChange={(e) =>
                      setFormData({ ...formData, subject: e.target.value })
                    }
                    className="w-full px-4 py-3 bg-[#faf8f5] border border-[#e8e4de] rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--color-charcoal)]/10 focus:border-[var(--color-charcoal)] transition-colors appearance-none"
                  >
                    <option>General Inquiry</option>
                    <option>Bulk Order Quote</option>
                    <option>Custom Packaging</option>
                    <option>Order Support</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="message"
                    className="text-sm font-medium text-[var(--color-charcoal)]"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    rows={5}
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    onBlur={() => handleBlur('message')}
                    className={`w-full px-4 py-3 bg-[#faf8f5] border ${formErrors.message ? 'border-red-500 focus:ring-red-200 focus:border-red-500' : 'border-[#e8e4de] focus:ring-[var(--color-charcoal)]/10 focus:border-[var(--color-charcoal)]'} rounded-xl focus:outline-none focus:ring-2 transition-colors resize-none`}
                    placeholder="How can we help you?"
                  ></textarea>
                  {formErrors.message && (
                    <p className="text-xs text-red-500">{formErrors.message}</p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 bg-[var(--color-charcoal)] text-white font-semibold rounded-xl hover:bg-black transition-colors active:scale-[0.98] disabled:opacity-70 disabled:pointer-events-none flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <Icon name="Loader2" size={20} className="animate-spin" />
                  ) : (
                    'Send Message'
                  )}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
