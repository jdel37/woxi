"use client";

import { motion } from "framer-motion";
import {
  Monitor,
  ShoppingCart,
  Search,
  Bot,
  LayoutTemplate,
} from "lucide-react";
import { useI18n } from "@/lib/i18n";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function Services() {
  const { t } = useI18n();

  const services = [
    {
      icon: Monitor,
      title: t.svc1_title,
      description: t.svc1_desc,
      features: [t.svc1_f1, t.svc1_f2, t.svc1_f3],
      color: "orange",
    },
    {
      icon: ShoppingCart,
      title: t.svc2_title,
      description: t.svc2_desc,
      features: [t.svc2_f1, t.svc2_f2, t.svc2_f3],
      color: "orange",
    },
    {
      icon: Search,
      title: t.svc3_title,
      description: t.svc3_desc,
      features: [t.svc3_f1, t.svc3_f2, t.svc3_f3],
      color: "orange",
    },
    {
      icon: Bot,
      title: t.svc4_title,
      description: t.svc4_desc,
      features: [t.svc4_f1, t.svc4_f2, t.svc4_f3],
      color: "orange",
    },
    {
      icon: LayoutTemplate,
      title: t.svc5_title,
      description: t.svc5_desc,
      features: [t.svc5_f1, t.svc5_f2, t.svc5_f3],
      color: "orange",
    },
  ];

  return (
    <section
      id="servicios"
      className="py-24 lg:py-32 bg-white"
      aria-label="Nuestros servicios"
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
            {t.services_tag}
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-neutral-900">
            {t.services_h2a}{" "}
            <span className="gradient-text">{t.services_h2b}</span>{" "}
            {t.services_h2c}
          </h2>
          <p className="mt-4 text-neutral-600 text-lg max-w-2xl mx-auto">
            {t.services_sub}
          </p>
        </motion.div>

        {/* Cards grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
          role="list"
          aria-label="Lista de servicios"
        >
          {services.map((service, i) => (
            <motion.article
              key={i}
              variants={cardVariants}
              role="listitem"
              className="group relative bg-white border border-neutral-100 rounded-2xl p-6 lg:p-8 hover:border-orange-200 hover:shadow-xl hover:shadow-orange-50 transition-all duration-300 cursor-default overflow-hidden"
              aria-label={`Servicio: ${service.title}`}
            >
              {/* Hover background */}
              <div className="absolute inset-0 bg-gradient-to-br from-orange-500/0 to-orange-500/0 group-hover:from-orange-500/5 group-hover:to-orange-500/0 transition-all duration-300 rounded-2xl" />

              {/* Orange accent top bar */}
              <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-orange-400 to-orange-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-t-2xl" />

              <div className="relative">
                {/* Icon */}
                <div
                  className="w-12 h-12 rounded-xl bg-orange-50 group-hover:bg-orange-500 flex items-center justify-center mb-6 transition-colors duration-300"
                  aria-hidden="true"
                >
                  <service.icon
                    className="w-6 h-6 text-orange-500 group-hover:text-white transition-colors duration-300"
                  />
                </div>

                {/* Title */}
                <h3 className="text-lg font-bold text-neutral-900 group-hover:text-orange-500 transition-colors duration-300 mb-2">
                  {service.title}
                </h3>

                {/* Description */}
                <p className="text-neutral-600 text-sm leading-relaxed mb-5">
                  {service.description}
                </p>

                {/* Features tags */}
                <ul className="flex flex-wrap gap-2" aria-label={`Características de ${service.title}`}>
                  {service.features.map((f, fi) => (
                    <li
                      key={fi}
                      className="px-3 py-1 text-xs font-medium rounded-full bg-neutral-100 text-neutral-600 group-hover:bg-orange-50 group-hover:text-orange-600 transition-colors duration-300"
                    >
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.article>
          ))}

          {/* CTA card */}
          <motion.div
            variants={cardVariants}
            className="sm:col-span-2 lg:col-span-1 relative bg-neutral-950 rounded-2xl p-6 lg:p-8 flex flex-col justify-between overflow-hidden group"
          >
            <div
              className="absolute inset-0 opacity-20"
              aria-hidden="true"
              style={{
                backgroundImage:
                  "radial-gradient(circle at 70% 30%, #f97316 0%, transparent 60%)",
              }}
            />
            <div className="relative">
              <span className="text-3xl" aria-hidden="true">💡</span>
              <h3 className="text-xl font-bold text-white mt-4 mb-2">
                {t.services_idea}
              </h3>
              <p className="text-neutral-400 text-sm leading-relaxed">
                {t.services_idea_sub}
              </p>
            </div>
            <button
              onClick={() => {
                const el = document.querySelector("#contacto");
                if (el) el.scrollIntoView({ behavior: "smooth" });
              }}
              className="relative mt-6 w-full py-3 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-xl transition-colors cursor-pointer"
              aria-label="Iniciar conversación sobre tu proyecto"
            >
              {t.services_idea_cta}
            </button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
