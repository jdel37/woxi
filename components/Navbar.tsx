"use client";

import { useState, useEffect, useRef } from "react";
import { Menu, X, Zap, ChevronDown, Globe } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useI18n, Lang, Currency } from "@/lib/i18n";

const LANG_OPTIONS: { code: Lang; label: string; name: string }[] = [
  { code: "es", label: "ES", name: "Español" },
  { code: "en", label: "EN", name: "English" },
  { code: "pt", label: "PT", name: "Português" },
  { code: "fr", label: "FR", name: "Français" },
  { code: "de", label: "DE", name: "Deutsch" },
];

const CURRENCY_OPTIONS: Currency[] = ["COP", "USD", "EUR", "BRL"];

export default function Navbar() {
  const { t, lang, setLang, currency, setCurrency } = useI18n();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [currOpen, setCurrOpen] = useState(false);
  const langRef = useRef<HTMLDivElement>(null);
  const currRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (langRef.current && !langRef.current.contains(e.target as Node)) setLangOpen(false);
      if (currRef.current && !currRef.current.contains(e.target as Node)) setCurrOpen(false);
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const handleNavClick = (href: string) => {
    setIsOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const navLinks = [
    { label: t.nav_inicio, href: "#inicio" },
    { label: t.nav_servicios, href: "#servicios" },
    { label: t.nav_portafolio, href: "#portafolio" },
    { label: t.nav_nosotros, href: "#nosotros" },
    { label: t.nav_contacto, href: "#contacto" },
  ];

  const currentLang = LANG_OPTIONS.find((l) => l.code === lang) ?? LANG_OPTIONS[0];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "nav-blur bg-white/90 shadow-sm border-b border-neutral-100"
          : "bg-transparent"
      }`}
      role="banner"
    >
      <nav
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
        aria-label="Navegación principal"
      >
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link
            href="#inicio"
            onClick={() => handleNavClick("#inicio")}
            className="flex items-center gap-2 group"
            aria-label="Woxi - Ir al inicio"
          >
            <div className="w-8 h-8 lg:w-9 lg:h-9 rounded-lg bg-orange-500 flex items-center justify-center group-hover:bg-orange-600 transition-colors">
              <Zap className="w-5 h-5 text-white" fill="white" />
            </div>
            <span className="text-xl lg:text-2xl font-bold text-neutral-900 tracking-tight">
              Wo<span className="text-orange-500">xi</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => handleNavClick(link.href)}
                className="px-4 py-2 text-sm font-medium text-neutral-600 hover:text-orange-500 transition-colors rounded-lg hover:bg-orange-50 cursor-pointer"
                aria-label={`Ir a ${link.label}`}
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* Desktop CTA + selectors */}
          <div className="hidden md:flex items-center gap-2">
            <button
              onClick={() => handleNavClick("#contacto")}
              className="btn-orange px-5 py-2.5 bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold rounded-lg transition-all duration-200 shadow-sm hover:shadow-md hover:shadow-orange-200 cursor-pointer"
              aria-label={t.nav_cta}
            >
              {t.nav_cta}
            </button>

            {/* Language selector */}
            <div className="relative" ref={langRef}>
              <button
                onClick={() => { setLangOpen((v) => !v); setCurrOpen(false); }}
                className="flex items-center gap-1.5 px-2.5 py-2 text-sm font-medium text-neutral-600 hover:text-orange-500 rounded-lg hover:bg-orange-50 transition-colors cursor-pointer"
                aria-label="Seleccionar idioma"
              >
                <Globe className="w-3.5 h-3.5" />
                <span>{currentLang.label}</span>
                <ChevronDown className="w-3 h-3" />
              </button>
              <AnimatePresence>
                {langOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.15 }}
                    className="absolute right-0 top-full mt-1 bg-white border border-neutral-100 rounded-xl shadow-lg overflow-hidden z-50 min-w-[140px]"
                  >
                    {LANG_OPTIONS.map((opt) => (
                      <button
                        key={opt.code}
                        onClick={() => { setLang(opt.code); setLangOpen(false); }}
                        className={`flex items-center gap-2 w-full px-3 py-2.5 text-sm text-left transition-colors cursor-pointer ${
                          lang === opt.code
                            ? "bg-orange-50 text-orange-600 font-semibold"
                            : "text-neutral-600 hover:bg-neutral-50"
                        }`}
                      >
                        <span className="text-xs font-bold tracking-wide w-6 shrink-0">{opt.label}</span>
                        <span className="text-neutral-400 text-xs">{opt.name}</span>
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Currency selector */}
            <div className="relative" ref={currRef}>
              <button
                onClick={() => { setCurrOpen((v) => !v); setLangOpen(false); }}
                className="flex items-center gap-1 px-2.5 py-2 text-sm font-medium text-neutral-600 hover:text-orange-500 rounded-lg hover:bg-orange-50 transition-colors cursor-pointer"
                aria-label="Seleccionar moneda"
              >
                <span>{currency}</span>
                <ChevronDown className="w-3 h-3" />
              </button>
              <AnimatePresence>
                {currOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.15 }}
                    className="absolute right-0 top-full mt-1 bg-white border border-neutral-100 rounded-xl shadow-lg overflow-hidden z-50 min-w-[80px]"
                  >
                    {CURRENCY_OPTIONS.map((c) => (
                      <button
                        key={c}
                        onClick={() => { setCurrency(c); setCurrOpen(false); }}
                        className={`flex items-center w-full px-3 py-2 text-sm text-left transition-colors cursor-pointer ${
                          currency === c
                            ? "bg-orange-50 text-orange-600 font-semibold"
                            : "text-neutral-600 hover:bg-neutral-50"
                        }`}
                      >
                        {c}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg text-neutral-700 hover:bg-neutral-100 transition-colors"
            aria-label={isOpen ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={isOpen}
            aria-controls="mobile-menu"
          >
            <AnimatePresence mode="wait" initial={false}>
              {isOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <X className="w-6 h-6" />
                </motion.div>
              ) : (
                <motion.div
                  key="open"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Menu className="w-6 h-6" />
                </motion.div>
              )}
            </AnimatePresence>
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              id="mobile-menu"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="md:hidden overflow-hidden"
              role="navigation"
              aria-label="Menú móvil"
            >
              <div className="pb-4 space-y-1 border-t border-neutral-100 mt-2 pt-3">
                {navLinks.map((link, i) => (
                  <motion.button
                    key={link.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    onClick={() => handleNavClick(link.href)}
                    className="w-full text-left px-4 py-3 text-base font-medium text-neutral-700 hover:text-orange-500 hover:bg-orange-50 rounded-lg transition-colors cursor-pointer"
                  >
                    {link.label}
                  </motion.button>
                ))}
                <motion.button
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: navLinks.length * 0.05 }}
                  onClick={() => handleNavClick("#contacto")}
                  className="w-full mt-2 px-4 py-3 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-lg transition-colors cursor-pointer"
                >
                  {t.nav_cta}
                </motion.button>

                {/* Mobile lang + currency row */}
                <div className="flex items-center gap-2 pt-2 px-1 flex-wrap">
                  {LANG_OPTIONS.map((opt) => (
                    <button
                      key={opt.code}
                      onClick={() => setLang(opt.code)}
                      className={`flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                        lang === opt.code
                          ? "bg-orange-100 text-orange-600"
                          : "text-neutral-500 hover:bg-neutral-100"
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                  <span className="text-neutral-200">|</span>
                  {CURRENCY_OPTIONS.map((c) => (
                    <button
                      key={c}
                      onClick={() => setCurrency(c)}
                      className={`px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                        currency === c
                          ? "bg-orange-100 text-orange-600"
                          : "text-neutral-500 hover:bg-neutral-100"
                      }`}
                    >
                      {c}
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
}
