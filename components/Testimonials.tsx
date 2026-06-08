"use client";

import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";
import { useI18n } from "@/lib/i18n";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.12 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function Testimonials() {
  const { t } = useI18n();

  const testimonial = {
    name: "Diego Forero",
    company: "D2F Consulting Agency",
    role: "CEO & Fundador",
    comment: t.testimonials_comment,
    rating: 5,
    avatar: "DF",
    avatarColor: "from-orange-400 to-amber-600",
    highlight: t.testimonials_highlight,
    website: "d2fgestion.com",
  };

  return (
    <section
      className="py-24 lg:py-32 bg-white"
      aria-label="Testimonios de clientes"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-orange-50 border border-orange-200 text-orange-600 text-sm font-medium mb-4">
            {t.testimonials_tag}
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-neutral-900">
            {t.testimonials_h2a}{" "}
            <span className="gradient-text">{t.testimonials_h2b}</span>
          </h2>
          <p className="mt-4 text-neutral-600 text-lg max-w-2xl mx-auto">
            {t.testimonials_sub}
          </p>

          {/* Stars */}
          <div className="mt-6 inline-flex items-center gap-2">
            <div className="flex gap-0.5" aria-label="5 estrellas">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 star-filled" aria-hidden="true" />
              ))}
            </div>
            <span className="text-sm font-semibold text-neutral-800">5.0</span>
            <span className="text-sm text-neutral-500">· {t.testimonials_verified}</span>
          </div>
        </motion.div>

        {/* Featured testimonial card */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={containerVariants}
          className="flex justify-center"
        >
          <motion.article
            variants={cardVariants}
            className="relative bg-white border border-neutral-100 rounded-2xl p-8 sm:p-10 hover:shadow-xl hover:shadow-orange-50 hover:border-orange-200 transition-all duration-300 group max-w-2xl w-full"
            aria-label={`Testimonio de ${testimonial.name}, ${testimonial.role} en ${testimonial.company}`}
          >
            {/* Quote icon */}
            <Quote
              className="absolute top-6 right-6 w-10 h-10 text-orange-100 group-hover:text-orange-200 transition-colors"
              aria-hidden="true"
            />

            {/* Stars */}
            <div className="flex gap-0.5 mb-4" aria-label={`${testimonial.rating} estrellas`}>
              {[...Array(testimonial.rating)].map((_, i) => (
                <Star key={i} className="w-5 h-5 star-filled" aria-hidden="true" />
              ))}
            </div>

            {/* Highlight badge */}
            <div className="inline-block px-3 py-1 bg-orange-50 rounded-full text-orange-600 text-xs font-bold mb-5 border border-orange-100">
              {testimonial.highlight}
            </div>

            {/* Comment */}
            <blockquote className="text-neutral-700 text-base leading-relaxed mb-8">
              &ldquo;{testimonial.comment}&rdquo;
            </blockquote>

            {/* Author */}
            <div className="flex items-center gap-4">
              <div
                className={`w-12 h-12 rounded-full bg-gradient-to-br ${testimonial.avatarColor} flex items-center justify-center text-white font-bold text-sm shrink-0`}
                aria-hidden="true"
              >
                {testimonial.avatar}
              </div>
              <div>
                <p className="font-semibold text-neutral-900">{testimonial.name}</p>
                <p className="text-neutral-500 text-sm">
                  {testimonial.role} · {testimonial.company}
                </p>
                <a
                  href={`https://${testimonial.website}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-orange-500 text-xs hover:underline"
                >
                  {testimonial.website}
                </a>
              </div>
            </div>
          </motion.article>
        </motion.div>
      </div>
    </section>
  );
}
