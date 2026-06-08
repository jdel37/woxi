"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { ArrowRight, Play, CheckCircle, Zap, TrendingUp } from "lucide-react";
import { useI18n } from "@/lib/i18n";

export default function Hero() {
  const { t } = useI18n();

  const highlights = [t.hero_feat1, t.hero_feat2, t.hero_feat3];

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
      {/* Abstract background */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        {/* Soft warm tint */}
        <div className="absolute top-0 right-0 w-2/3 h-full bg-gradient-to-bl from-orange-50/60 via-orange-50/20 to-transparent" />
        {/* Abstract SVG — rayones chic */}
        <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
          {/* Large arc — top right */}
          <circle cx="92%" cy="-5%" r="38%" fill="none" stroke="#f97316" strokeWidth="0.6" opacity="0.09" />
          {/* Second arc offset */}
          <circle cx="88%" cy="0%" r="52%" fill="none" stroke="#f97316" strokeWidth="0.4" opacity="0.05" />
          {/* Bottom left arc */}
          <circle cx="8%" cy="108%" r="34%" fill="none" stroke="#111" strokeWidth="0.5" opacity="0.04" />
          {/* Diagonal strokes */}
          <line x1="0%" y1="72%" x2="18%" y2="48%" stroke="#111" strokeWidth="0.7" opacity="0.05" />
          <line x1="5%" y1="78%" x2="22%" y2="55%" stroke="#f97316" strokeWidth="0.4" opacity="0.07" />
          <line x1="75%" y1="95%" x2="95%" y2="68%" stroke="#111" strokeWidth="0.6" opacity="0.04" />
          <line x1="78%" y1="100%" x2="100%" y2="72%" stroke="#f97316" strokeWidth="0.4" opacity="0.06" />
          {/* Short marks — scattered */}
          <line x1="38%" y1="8%" x2="44%" y2="6%" stroke="#111" strokeWidth="1" opacity="0.06" strokeLinecap="round" />
          <line x1="62%" y1="82%" x2="67%" y2="80%" stroke="#f97316" strokeWidth="1" opacity="0.08" strokeLinecap="round" />
          <line x1="20%" y1="22%" x2="22%" y2="28%" stroke="#111" strokeWidth="0.8" opacity="0.05" strokeLinecap="round" />
          <line x1="82%" y1="42%" x2="84%" y2="48%" stroke="#f97316" strokeWidth="0.8" opacity="0.07" strokeLinecap="round" />
          {/* Tiny dots */}
          <circle cx="52%" cy="18%" r="1.5" fill="#f97316" opacity="0.12" />
          <circle cx="14%" cy="44%" r="1" fill="#111" opacity="0.08" />
          <circle cx="88%" cy="78%" r="1.5" fill="#f97316" opacity="0.1" />
          <circle cx="30%" cy="88%" r="1" fill="#111" opacity="0.06" />
        </svg>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-32">
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
              {t.hero_badge}
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-neutral-900 leading-tight tracking-tight"
            >
              {t.hero_h1a}{" "}
              <span className="gradient-text">{t.hero_h1b}</span>{" "}
              {t.hero_h1c}
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-6 text-lg text-neutral-600 leading-relaxed max-w-lg"
            >
              {t.hero_sub}
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
                aria-label={t.hero_cta1}
              >
                {t.hero_cta1}
                <ArrowRight
                  className="w-5 h-5 group-hover:translate-x-1 transition-transform"
                  aria-hidden="true"
                />
              </button>
              <button
                onClick={() => handleCTA("#portafolio")}
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white border-2 border-neutral-200 hover:border-orange-500 text-neutral-800 hover:text-orange-500 font-bold rounded-xl text-base transition-all duration-200 group cursor-pointer"
                aria-label={t.hero_cta2}
              >
                <Play
                  className="w-4 h-4 text-orange-500 group-hover:scale-110 transition-transform"
                  aria-hidden="true"
                />
                {t.hero_cta2}
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
                className="absolute -bottom-4 -left-4 sm:-left-8 hidden sm:flex bg-white rounded-2xl shadow-xl p-4 items-center gap-3 border border-neutral-100"
              >
                <div className="w-10 h-10 rounded-xl bg-orange-50 flex items-center justify-center">
                  <Zap className="w-5 h-5 text-orange-500" />
                </div>
                <div>
                  <p className="text-xs text-neutral-500">{t.hero_speed}</p>
                  <p className="text-sm font-bold text-neutral-900">{t.hero_speed_val}</p>
                </div>
              </motion.div>
              {/* Floating stat card 2 */}
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 1.0 }}
                className="absolute -top-4 -right-2 sm:-right-6 hidden sm:flex bg-white rounded-2xl shadow-xl p-4 items-center gap-3 border border-neutral-100"
              >
                <div className="w-10 h-10 rounded-xl bg-orange-50 flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-orange-500" />
                </div>
                <div>
                  <p className="text-xs text-neutral-500">{t.hero_conv}</p>
                  <p className="text-sm font-bold text-neutral-900">{t.hero_conv_val}</p>
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
          {t.scroll}
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
