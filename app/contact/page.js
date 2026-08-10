'use client';

import { motion } from 'motion/react';
import Icon from '@/components/common/Icon';
import { useState } from 'react';

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Mock network delay
    await new Promise((r) => setTimeout(r, 1500));
    setIsSubmitting(false);
    setIsSuccess(true);
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
                      required
                      className="w-full px-4 py-3 bg-[#faf8f5] border border-[#e8e4de] rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--color-charcoal)]/10 focus:border-[var(--color-charcoal)] transition-colors"
                      placeholder="John"
                    />
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
                      required
                      className="w-full px-4 py-3 bg-[#faf8f5] border border-[#e8e4de] rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--color-charcoal)]/10 focus:border-[var(--color-charcoal)] transition-colors"
                      placeholder="Doe"
                    />
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
                    required
                    className="w-full px-4 py-3 bg-[#faf8f5] border border-[#e8e4de] rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--color-charcoal)]/10 focus:border-[var(--color-charcoal)] transition-colors"
                    placeholder="john@company.com"
                  />
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
                    required
                    rows={5}
                    className="w-full px-4 py-3 bg-[#faf8f5] border border-[#e8e4de] rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--color-charcoal)]/10 focus:border-[var(--color-charcoal)] transition-colors resize-none"
                    placeholder="How can we help you?"
                  ></textarea>
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
