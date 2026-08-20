import Icon from '@/components/common/Icon';
import ContactForm from '@/components/contact/ContactForm';

export const metadata = {
  title: 'Contact Us | BoxKart',
  description:
    'Get in touch with BoxKart for custom quotes, shipping questions, or bulk orders.',
};

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-[#faf8f5] pt-24 pb-24">
      <div className="container-bk max-w-6xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-[var(--color-charcoal)] mb-6">
            Get in touch
          </h1>
          <p className="text-lg text-[var(--color-text-secondary)]">
            Whether you need a custom quote, have a question about shipping, or
            just want to say hello — we&apos;re here to help.
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-12 lg:gap-8 items-start">
          {/* Contact Info Cards */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white p-8 rounded-3xl border border-[#e8e4de] shadow-sm flex items-start gap-4">
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
            </div>

            <div className="bg-white p-8 rounded-3xl border border-[#e8e4de] shadow-sm flex items-start gap-4">
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
            </div>

            <div className="bg-white p-8 rounded-3xl border border-[#e8e4de] shadow-sm flex items-start gap-4">
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
            </div>
          </div>

          {/* Contact Form */}
          <ContactForm />
        </div>
      </div>
    </div>
  );
}
