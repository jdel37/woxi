"use client";

import { Zap, Mail, Phone, MapPin } from "lucide-react";
import { useI18n } from "@/lib/i18n";

const contactInfo = [
  { icon: Mail, text: "foreromorenojuandavid79@gmail.com", href: "mailto:foreromorenojuandavid79@gmail.com" },
  { icon: Phone, text: "+57 322 362 4554", href: "tel:+573223624554" },
  { icon: MapPin, text: "Bogotá, Colombia", href: "#" },
];

export default function Footer() {
  const { t } = useI18n();

  const footerLinks = {
    [t.footer_services]: [
      { label: "Diseño Web", href: "#servicios" },
      { label: "Tiendas Online", href: "#servicios" },
      { label: "SEO", href: "#servicios" },
      { label: "Landing Pages", href: "#servicios" },
      { label: "Automatización", href: "#servicios" },
    ],
    [t.footer_company]: [
      { label: t.footer_about, href: "#nosotros" },
      { label: t.footer_portfolio, href: "#portafolio" },
      { label: t.footer_testimonials, href: "#" },
      { label: t.footer_blog, href: "#" },
    ],
    [t.footer_legal]: [
      { label: t.footer_privacy, href: "#" },
      { label: t.footer_terms, href: "#" },
      { label: t.footer_cookies, href: "#" },
    ],
  };

  const handleNavClick = (href: string) => {
    if (href.startsWith("#")) {
      const el = document.querySelector(href);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer
      className="bg-neutral-950 border-t border-white/5"
      role="contentinfo"
      aria-label="Pie de página"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main footer */}
        <div className="py-16 grid sm:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand column */}
          <div className="sm:col-span-2 lg:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-orange-500 flex items-center justify-center" aria-hidden="true">
                <Zap className="w-5 h-5 text-white" fill="white" />
              </div>
              <span className="text-xl font-bold text-white">
                Wo<span className="text-orange-500">xi</span>
              </span>
            </div>
            <p className="text-neutral-500 text-sm leading-relaxed max-w-xs mb-6">
              {t.footer_desc}
            </p>

            {/* Contact info */}
            <address className="not-italic space-y-3" aria-label="Información de contacto">
              {contactInfo.map((c) => (
                <a
                  key={c.text}
                  href={c.href}
                  className="flex items-center gap-2 text-neutral-500 hover:text-orange-400 text-sm transition-colors group min-w-0"
                  aria-label={c.text}
                >
                  <c.icon
                    className="w-4 h-4 text-orange-500/60 group-hover:text-orange-400 transition-colors shrink-0"
                    aria-hidden="true"
                  />
                  <span className="break-all">{c.text}</span>
                </a>
              ))}
            </address>

          </div>

          {/* Links columns */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="text-white font-semibold text-sm mb-4 uppercase tracking-wider">
                {category}
              </h3>
              <ul className="space-y-2.5" aria-label={`Links de ${category}`}>
                {links.map((link) => (
                  <li key={link.label}>
                    <button
                      onClick={() => handleNavClick(link.href)}
                      className="text-neutral-500 hover:text-orange-400 text-sm transition-colors cursor-pointer hover:translate-x-0.5 transition-transform duration-200 block"
                      aria-label={link.label}
                    >
                      {link.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="py-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-neutral-600 text-xs text-center sm:text-left">
            &copy; {new Date().getFullYear()} Woxi. {t.footer_rights}
          </p>
          <p className="text-neutral-600 text-xs">
            {t.footer_made}{" "}
            <span className="text-orange-500" aria-label="amor">♥</span>{" "}
            {t.footer_in}
          </p>
        </div>
      </div>
    </footer>
  );
}
