"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { ArrowRight, TrendingUp, Clock, Shield } from "lucide-react";
import { useI18n } from "@/lib/i18n";

export default function Benefits() {
  const { t } = useI18n();

  const benefits = [
    {
      icon: TrendingUp,
      tag: t.ben1_tag,
      title: t.ben1_title,
      description: t.ben1_desc,
      points: [t.ben1_p1, t.ben1_p2, t.ben1_p3],
      image: "/benefits-illustration.png",
      imageAlt: "Equipo diseñando interfaces web de alta conversión",
      reverse: false,
    },
    {
      icon: Clock,
      tag: t.ben2_tag,
      title: t.ben2_title,
      description: t.ben2_desc,
      points: [t.ben2_p1, t.ben2_p2, t.ben2_p3],
      image: "/boost.png",
      imageAlt: "Panel de Lighthouse mostrando puntuaciones de rendimiento web",
      reverse: true,
    },
    {
      icon: Shield,
      tag: t.ben3_tag,
      title: t.ben3_title,
      description: t.ben3_desc,
      points: [t.ben3_p1, t.ben3_p2, t.ben3_p3],
      image: "/benefits-illustration.png",
      imageAlt: "Ilustración de seguridad y soporte web profesional",
      reverse: false,
    },
  ];

  return (
    <section
      id="nosotros"
      className="py-24 lg:py-32 bg-neutral-50"
      aria-label="Beneficios de trabajar con nosotros"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-orange-50 border border-orange-200 text-orange-600 text-sm font-medium mb-4">
            {t.benefits_tag}
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-neutral-900">
            {t.benefits_h2a}{" "}
            <span className="gradient-text">{t.benefits_h2b}</span>
          </h2>
        </motion.div>

        {/* Alternating rows */}
        <div className="space-y-16 lg:space-y-24">
          {benefits.map((b, i) => (
            <motion.div
              key={b.tag}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7 }}
              className={`flex flex-col ${
                b.reverse ? "lg:flex-row-reverse" : "lg:flex-row"
              } items-center gap-12 lg:gap-20`}
            >
              {/* Image side */}
              <div className="w-full lg:w-1/2">
                <div className="relative">
                  <div
                    className={`absolute -inset-4 rounded-3xl opacity-20 blur-2xl ${
                      b.reverse
                        ? "bg-gradient-to-br from-orange-300 to-orange-600"
                        : "bg-gradient-to-bl from-orange-300 to-orange-600"
                    }`}
                    aria-hidden="true"
                  />
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.3 }}
                    className="relative rounded-2xl overflow-hidden shadow-2xl bg-white"
                  >
                    <Image
                      src={b.image}
                      alt={b.imageAlt}
                      width={560}
                      height={420}
                      className="w-full h-auto"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                    />
                  </motion.div>
                  {/* Step counter */}
                  <div
                    className="absolute -top-5 -right-3 w-12 h-12 rounded-2xl bg-orange-500 flex items-center justify-center text-white font-extrabold text-xl shadow-lg shadow-orange-300"
                    aria-hidden="true"
                  >
                    {i + 1}
                  </div>
                </div>
              </div>

              {/* Text side */}
              <div className="w-full lg:w-1/2">
                {/* Tag */}
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-8 h-8 rounded-lg bg-orange-50 flex items-center justify-center" aria-hidden="true">
                    <b.icon className="w-4 h-4 text-orange-500" />
                  </div>
                  <span className="text-orange-500 text-sm font-semibold uppercase tracking-wider">
                    {b.tag}
                  </span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 leading-tight mb-4">
                  {b.title}
                </h3>

                <p className="text-neutral-600 text-base leading-relaxed mb-6">
                  {b.description}
                </p>

                {/* Points */}
                <ul className="space-y-3 mb-8" aria-label={`Puntos clave de ${b.tag}`}>
                  {b.points.map((point) => (
                    <li key={point} className="flex items-center gap-3">
                      <div className="w-5 h-5 rounded-full bg-orange-500 flex items-center justify-center shrink-0" aria-hidden="true">
                        <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                      <span className="text-neutral-700 font-medium">{point}</span>
                    </li>
                  ))}
                </ul>

                <button
                  onClick={() => {
                    const el = document.querySelector("#contacto");
                    if (el) el.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="inline-flex items-center gap-2 text-orange-500 font-semibold hover:gap-3 transition-all duration-200 group cursor-pointer"
                  aria-label={`Saber más sobre ${b.tag.toLowerCase()}`}
                >
                  {t.benefits_cta}
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
