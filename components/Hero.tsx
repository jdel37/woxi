"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { ArrowRight, Play, CheckCircle } from "lucide-react";

const highlights = [
  "Entrega en 7-14 días",
  "Diseño 100% personalizado",
  "SEO incluido desde el día 1",
];

export default function Hero() {
  const handleCTA = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="inicio"
      className="relative min-h-screen flex items-center overflow-hidden bg-white pt-20"
      aria-label="Sección principal"
    >
      {/* Background decoration */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
      >
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-bl from-orange-50 via-orange-50/30 to-transparent" />
        <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-orange-100/60 blur-3xl" />
        <div className="absolute top-1/2 left-1/4 w-64 h-64 rounded-full bg-orange-50/80 blur-3xl" />
        {/* Grid pattern */}
        <svg
          className="absolute inset-0 w-full h-full opacity-[0.03]"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <pattern
              id="hero-grid"
              width="60"
              height="60"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 60 0 L 0 0 0 60"
                fill="none"
                stroke="black"
                strokeWidth="1"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#hero-grid)" />
        </svg>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left — Text */}
          <div>
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 mb-6 rounded-full bg-orange-50 border border-orange-200 text-orange-600 text-sm font-medium"
            >
              <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
              Agencia de Diseño Web Profesional
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-neutral-900 leading-tight tracking-tight"
            >
              Creamos páginas web que{" "}
              <span className="gradient-text">convierten visitantes</span> en
              clientes
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-6 text-lg text-neutral-600 leading-relaxed max-w-lg"
            >
              Diseñamos y desarrollamos experiencias digitales de alto impacto
              que impulsan el crecimiento de tu negocio. Rápido, moderno y
              optimizado para resultados.
            </motion.p>

            {/* Highlights */}
            <motion.ul
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-6 flex flex-col sm:flex-row gap-3 sm:flex-wrap"
              aria-label="Características destacadas"
            >
              {highlights.map((h) => (
                <li key={h} className="flex items-center gap-2 text-sm text-neutral-600 font-medium">
                  <CheckCircle
                    className="w-4 h-4 text-orange-500 shrink-0"
                    aria-hidden="true"
                  />
                  {h}
                </li>
              ))}
            </motion.ul>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-10 flex flex-col sm:flex-row gap-4"
            >
              <button
                onClick={() => handleCTA("#contacto")}
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-xl text-base transition-all duration-200 shadow-lg hover:shadow-xl hover:shadow-orange-200 animate-pulse-orange group cursor-pointer"
                aria-label="Solicitar cotización gratuita"
              >
                Solicitar cotización gratis
                <ArrowRight
                  className="w-5 h-5 group-hover:translate-x-1 transition-transform"
                  aria-hidden="true"
                />
              </button>
              <button
                onClick={() => handleCTA("#portafolio")}
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white border-2 border-neutral-200 hover:border-orange-500 text-neutral-800 hover:text-orange-500 font-bold rounded-xl text-base transition-all duration-200 group cursor-pointer"
                aria-label="Ver nuestro portafolio de proyectos"
              >
                <Play
                  className="w-4 h-4 text-orange-500 group-hover:scale-110 transition-transform"
                  aria-hidden="true"
                />
                Ver portafolio
              </button>
            </motion.div>

          </div>

          {/* Right — Mockup image */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative flex justify-center lg:justify-end"
            aria-hidden="true"
          >
            <div className="relative w-full max-w-xl">
              {/* Glow ring */}
              <div className="absolute -inset-4 rounded-3xl bg-gradient-to-r from-orange-400/20 to-orange-600/20 blur-2xl" />
              <div className="relative animate-float">
                <Image
                  src="/hero-mockup.png"
                  alt="Mockup de diseño web profesional — WebAgencia"
                  width={600}
                  height={480}
                  className="w-full h-auto drop-shadow-2xl rounded-2xl"
                  priority
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
              {/* Floating stat card 1 */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.8 }}
                className="absolute -bottom-4 -left-4 sm:-left-8 bg-white rounded-2xl shadow-xl p-4 flex items-center gap-3 border border-neutral-100"
              >
                <div className="w-10 h-10 rounded-xl bg-orange-50 flex items-center justify-center">
                  <span className="text-xl" aria-hidden="true">🚀</span>
                </div>
                <div>
                  <p className="text-xs text-neutral-500">Velocidad</p>
                  <p className="text-sm font-bold text-neutral-900">Lighthouse 98+</p>
                </div>
              </motion.div>
              {/* Floating stat card 2 */}
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 1.0 }}
                className="absolute -top-4 -right-2 sm:-right-6 bg-white rounded-2xl shadow-xl p-4 flex items-center gap-3 border border-neutral-100"
              >
                <div className="w-10 h-10 rounded-xl bg-green-50 flex items-center justify-center">
                  <span className="text-xl" aria-hidden="true">📈</span>
                </div>
                <div>
                  <p className="text-xs text-neutral-500">Conversión</p>
                  <p className="text-sm font-bold text-neutral-900">+340% más leads</p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        aria-hidden="true"
      >
        <span className="text-xs text-neutral-400 font-medium tracking-widest uppercase">
          Scroll
        </span>
        <div className="w-5 h-9 rounded-full border-2 border-neutral-300 flex justify-center pt-1.5">
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            className="w-1 h-2 rounded-full bg-orange-500"
          />
        </div>
      </motion.div>
    </section>
  );
}
