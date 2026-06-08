"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { useI18n } from "@/lib/i18n";

export default function Carousel3D() {
  const { t } = useI18n();

  const project = {
    title: "D2F Consulting Agency",
    category: t.portfolio_category,
    image: "/project-landing.png",
    description: t.portfolio_desc,
    url: "https://www.d2fgestion.com",
    tags: ["Diseño Web", "SEO", "Rendimiento"],
  };

  return (
    <section
      id="portafolio"
      className="py-24 lg:py-32 bg-neutral-950 overflow-hidden"
      aria-label="Portafolio de proyectos"
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
          <span className="inline-block px-4 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-sm font-medium mb-4">
            {t.portfolio_tag}
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white">
            {t.portfolio_h2a}{" "}
            <span className="gradient-text">{t.portfolio_h2b}</span>
          </h2>
          <p className="mt-4 text-neutral-400 text-lg max-w-2xl mx-auto">
            {t.portfolio_sub}
          </p>
        </motion.div>

        {/* Featured project */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7 }}
          className="flex justify-center"
        >
          <div className="w-full max-w-2xl rounded-2xl overflow-hidden bg-neutral-900 border border-white/5 shadow-2xl group">
            {/* Image */}
            <div className="relative aspect-[4/3]">
              <Image
                src={project.image}
                alt={`Proyecto ${project.title}`}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
                sizes="(max-width: 768px) 100vw, 672px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/80 to-transparent" />
              {/* Category badge */}
              <div className="absolute top-4 left-4">
                <span className="px-3 py-1 rounded-full bg-orange-500/90 text-white text-xs font-semibold">
                  {project.category}
                </span>
              </div>
            </div>

            {/* Info */}
            <div className="p-6 sm:p-8">
              <div className="flex items-start justify-between gap-4 mb-3">
                <h3 className="text-white font-bold text-xl leading-tight">
                  {project.title}
                </h3>
                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="shrink-0 w-9 h-9 rounded-lg bg-white/5 hover:bg-orange-500 border border-white/10 hover:border-orange-500 flex items-center justify-center text-neutral-400 hover:text-white transition-all duration-200"
                  aria-label={`Ver sitio de ${project.title}`}
                >
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
              <p className="text-neutral-400 text-sm leading-relaxed mb-5">
                {project.description}
              </p>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 text-xs font-medium rounded-full bg-white/5 text-neutral-400 border border-white/5"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
