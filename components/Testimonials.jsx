'use client';

import { useState } from 'react';
import { motion } from 'motion/react';
import { Quote, ChevronLeft, ChevronRight, Star } from 'lucide-react';

const TESTIMONIALS = [
  {
    name: 'Priya Sharma',
    role: 'Founder, NaturGlow Cosmetics',
    text: 'BoxKart solved our biggest headache. We used to waste hours finding the right box sizes for our skincare products. Now we order in 2 minutes.',
    rating: 5,
  },
  {
    name: 'Rajesh Menon',
    role: 'Operations, UrbanFeet Shoes',
    text: 'The bulk pricing is transparent and fair. We switched from our local supplier and saved almost 20% on packaging costs. Delivery is always on time.',
    rating: 5,
  },
  {
    name: 'Ananya Gupta',
    role: 'CEO, ThreadCraft Fashion',
    text: 'As a growing D2C brand, we needed reliable packaging without dealing with high MOQs. BoxKart lets us start small and scale up easily.',
    rating: 5,
  },
  {
    name: 'Vikram Patel',
    role: 'Amazon Seller',
    text: 'The reorder feature is brilliant. I reorder 500 boxes every month with one click. No more back-and-forth with suppliers.',
    rating: 5,
  },
];

/**
 * Customer testimonials with carousel navigation.
 */
export default function Testimonials() {
  const [current, setCurrent] = useState(0);

  const next = () => setCurrent((prev) => (prev + 1) % TESTIMONIALS.length);
  const prev = () =>
    setCurrent(
      (prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length
    );

  const testimonial = TESTIMONIALS[current];

  return (
    <section className="section-padding bg-white">
      <div className="container-bk">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-charcoal mb-3">
            Loved by sellers across India
          </h2>
        </motion.div>

        <div className="max-w-2xl mx-auto">
          <motion.div
            key={current}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            className="card-bk p-8 text-center"
          >
            <Quote size={32} className="text-kraft-muted mx-auto mb-4" />

            <div className="flex justify-center gap-1 mb-4">
              {Array.from({ length: testimonial.rating }).map((_, i) => (
                <Star
                  key={i}
                  size={16}
                  className="text-warning"
                  fill="currentColor"
                />
              ))}
            </div>

            <p className="text-lg text-charcoal leading-relaxed mb-6 italic">
              &quot;{testimonial.text}&quot;
            </p>

            <div>
              <p className="font-semibold text-charcoal">{testimonial.name}</p>
              <p className="text-sm text-text-secondary">{testimonial.role}</p>
            </div>
          </motion.div>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-4 mt-6">
            <button
              onClick={prev}
              className="p-2 rounded-full hover:bg-warm-gray transition-colors"
              aria-label="Previous testimonial"
            >
              <ChevronLeft size={20} className="text-text-secondary" />
            </button>

            <div className="flex gap-2">
              {TESTIMONIALS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    i === current ? 'bg-kraft w-6' : 'bg-border'
                  }`}
                  aria-label={`Go to testimonial ${i + 1}`}
                />
              ))}
            </div>

            <button
              onClick={next}
              className="p-2 rounded-full hover:bg-warm-gray transition-colors"
              aria-label="Next testimonial"
            >
              <ChevronRight size={20} className="text-text-secondary" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
