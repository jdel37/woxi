"use client";

import { motion } from "framer-motion";
import {
  Monitor,
  ShoppingCart,
  Search,
  Bot,
  LayoutTemplate,
} from "lucide-react";

const services = [
  {
    icon: Monitor,
    title: "Diseño Web Profesional",
    description:
      "Creamos sitios web modernos, rápidos y optimizados que reflejan la esencia de tu marca y generan resultados reales.",
    features: ["Mobile First", "Ultra rápido", "Diseño único"],
    color: "orange",
  },
  {
    icon: ShoppingCart,
    title: "Tiendas Online",
    description:
      "E-commerce completo con gestión de inventario, pasarela de pagos segura y UX optimizada para maximizar tus ventas.",
    features: ["Pagos seguros", "Panel admin", "Multi-producto"],
    color: "orange",
  },
  {
    icon: Search,
    title: "SEO Avanzado",
    description:
      "Posicionamos tu negocio en los primeros resultados de Google con estrategias SEO técnicas y de contenido.",
    features: ["SEO técnico", "Contenido", "Analytics"],
    color: "orange",
  },
  {
    icon: Bot,
    title: "Automatización",
    description:
      "Automatizamos procesos repetitivos de tu negocio con integraciones inteligentes que ahorran tiempo y dinero.",
    features: ["CRM integrado", "IA incluida", "Workflows"],
    color: "orange",
  },
  {
    icon: LayoutTemplate,
    title: "Landing Pages",
    description:
      "Páginas de aterrizaje de alta conversión diseñadas para captar leads y cerrar ventas de forma efectiva.",
    features: ["A/B Testing", "Alta conversión", "Remarketing"],
    color: "orange",
  },
];

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
            ¿Qué hacemos?
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-neutral-900">
            Servicios diseñados para{" "}
            <span className="gradient-text">hacer crecer</span> tu negocio
          </h2>
          <p className="mt-4 text-neutral-600 text-lg max-w-2xl mx-auto">
            Soluciones digitales end-to-end para que tu empresa destaque,
            convierta y escale en el mundo online.
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
          {services.map((service) => (
            <motion.article
              key={service.title}
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
                  {service.features.map((f) => (
                    <li
                      key={f}
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
                ¿Tienes un proyecto en mente?
              </h3>
              <p className="text-neutral-400 text-sm leading-relaxed">
                Cuéntanos tu idea y te preparamos una propuesta personalizada sin
                costo ni compromiso.
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
              Iniciar conversación →
            </button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
