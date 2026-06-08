"use client";

import { motion } from "framer-motion";
import { ArrowRight, MessageCircle } from "lucide-react";
import { useI18n } from "@/lib/i18n";

const WHATSAPP_URL = "https://wa.me/573223624554?text=Hola%2C%20me%20interesa%20una%20cotizaci%C3%B3n%20para%20mi%20p%C3%A1gina%20web";

export default function CTA() {
  const { t } = useI18n();

  const handleContact = () => {
    const el = document.querySelector("#contacto");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const trustBadges = [t.cta_trust1, t.cta_trust2, t.cta_trust3, t.cta_trust4];

  return (
    <section
      className="py-24 lg:py-32 bg-neutral-950 relative overflow-hidden"
      aria-label="Llamada a la acción"
    >
      {/* Background decorations */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-px bg-gradient-to-r from-transparent via-orange-500/50 to-transparent" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-px bg-gradient-to-r from-transparent via-orange-500/20 to-transparent" />
        <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-orange-600/10 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full bg-orange-600/10 blur-3xl" />
        {/* Dot grid */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          {/* Tag */}
          <div className="inline-flex items-center gap-2 px-4 py-2 mb-8 rounded-full bg-orange-500/10 border border-orange-500/20">
            <span className="w-2 h-2 rounded-full bg-orange-400 animate-pulse" aria-hidden="true" />
            <span className="text-orange-400 text-sm font-semibold">
              {t.cta_tag}
            </span>
          </div>

          {/* Headline */}
          <h2 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold text-white leading-tight tracking-tight">
            {t.cta_h2a}{" "}
            <span className="gradient-text">{t.cta_h2b}</span>
          </h2>

          <p className="mt-6 text-lg sm:text-xl text-neutral-400 max-w-2xl mx-auto leading-relaxed">
            {t.cta_sub}
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={handleContact}
              className="inline-flex items-center justify-center gap-2 px-8 py-5 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-2xl text-lg transition-all duration-200 shadow-2xl shadow-orange-500/30 group cursor-pointer"
              aria-label={t.cta_btn1}
            >
              {t.cta_btn1}
              <ArrowRight
                className="w-5 h-5 group-hover:translate-x-1 transition-transform"
                aria-hidden="true"
              />
            </motion.button>
            <motion.a
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-8 py-5 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-orange-500/50 text-white font-bold rounded-2xl text-lg transition-all duration-200 group cursor-pointer"
              aria-label={t.cta_btn2}
            >
              <MessageCircle className="w-5 h-5 text-orange-400" aria-hidden="true" />
              {t.cta_btn2}
            </motion.a>
          </div>

          {/* Trust badges */}
          <div className="mt-10 flex flex-wrap items-center justify-center gap-6 text-neutral-500 text-sm">
            {trustBadges.map((badge) => (
              <span key={badge} className="flex items-center gap-1">
                {badge}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
