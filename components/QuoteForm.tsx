"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Send,
  Calculator,
  CheckCircle,
  Loader2,
  ChevronRight,
  ChevronLeft,
} from "lucide-react";

// ─── Pricing tables ───────────────────────────────────────────────────────────
const SITE_PRICES: Record<string, number> = {
  landing: 1200000,
  corporate: 2800000,
  ecommerce: 4500000,
  restaurant: 2200000,
  custom: 2500000,
};

const PAGE_EXTRAS: Record<string, number> = {
  "1-3": 0,
  "4-6": 500000,
  "7-10": 1000000,
  "10+": 2000000,
};

const FEATURE_PRICES: Record<string, number> = {
  blog: 600000,
  payments: 1500000,
  booking: 900000,
  chat: 300000,
  multilang: 700000,
  portal: 1500000,
  seo: 500000,
};

function formatCOP(n: number) {
  return new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    maximumFractionDigits: 0,
  }).format(n);
}

// ─── Types ────────────────────────────────────────────────────────────────────
interface FormData {
  businessName: string;
  businessType: string;
  contactName: string;
  email: string;
  whatsapp: string;
  siteType: string;
  pageCount: string;
  features: string[];
  urgency: string;
  contentStatus: string;
  notes: string;
}

const INITIAL: FormData = {
  businessName: "",
  businessType: "",
  contactName: "",
  email: "",
  whatsapp: "",
  siteType: "",
  pageCount: "",
  features: [],
  urgency: "",
  contentStatus: "",
  notes: "",
};

// ─── Small helpers ────────────────────────────────────────────────────────────
function Chip({
  label,
  selected,
  onClick,
}: {
  label: string;
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`px-4 py-2 rounded-xl border text-sm font-medium transition-all duration-200 cursor-pointer ${
        selected
          ? "bg-orange-500 border-orange-500 text-white shadow-md shadow-orange-200"
          : "bg-white border-neutral-200 text-neutral-600 hover:border-orange-300 hover:text-orange-500"
      }`}
    >
      {label}
    </button>
  );
}

function Field({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="block text-sm font-semibold text-neutral-700 mb-1.5">
        {label}
        {required && <span className="text-orange-500 ml-0.5">*</span>}
      </label>
      {children}
    </div>
  );
}

const inputClass =
  "w-full px-4 py-3 rounded-xl border border-neutral-200 text-sm text-neutral-900 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all";

// ─── Main component ───────────────────────────────────────────────────────────
export default function QuoteForm() {
  const [form, setForm] = useState<FormData>(INITIAL);
  const [step, setStep] = useState(1);
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  const set = (k: keyof FormData, v: string) =>
    setForm((prev) => ({ ...prev, [k]: v }));

  const toggleFeature = (f: string) =>
    setForm((prev) => ({
      ...prev,
      features: prev.features.includes(f)
        ? prev.features.filter((x) => x !== f)
        : [...prev.features, f],
    }));

  const estimate = useMemo(() => {
    if (!form.siteType) return null;
    const base = SITE_PRICES[form.siteType] ?? 0;
    const pages = PAGE_EXTRAS[form.pageCount] ?? 0;
    const feats = form.features.reduce(
      (acc, f) => acc + (FEATURE_PRICES[f] ?? 0),
      0
    );
    const content = form.contentStatus === "no" ? 600000 : 0;
    let total = base + pages + feats + content;
    if (form.urgency === "urgent") total = Math.round(total * 1.3);
    return { min: Math.round(total * 0.9), max: Math.round(total * 1.15) };
  }, [form]);

  const canNext1 =
    form.contactName.trim() &&
    form.email.trim() &&
    form.businessName.trim();
  const canNext2 = form.siteType && form.pageCount;
  const canSubmit =
    canNext1 && canNext2 && form.urgency && form.contentStatus;

  const handleSubmit = async () => {
    setStatus("sending");
    try {
      const res = await fetch("/api/cotizacion", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, estimate }),
      });
      if (!res.ok) throw new Error();
      setStatus("success");
    } catch {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <section id="contacto" className="py-24 bg-white">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-lg mx-auto px-4 text-center"
        >
          <div className="w-20 h-20 rounded-full bg-orange-50 flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-orange-500" />
          </div>
          <h3 className="text-2xl font-extrabold text-neutral-900 mb-2">
            ¡Solicitud recibida!
          </h3>
          <p className="text-neutral-600 mb-6">
            Te contactamos en menos de 24 horas por email o WhatsApp con tu
            propuesta personalizada.
          </p>
          {estimate && (
            <div className="p-5 bg-orange-50 rounded-2xl border border-orange-100">
              <p className="text-xs font-semibold text-orange-600 uppercase tracking-wider mb-1">
                Tu estimado
              </p>
              <p className="text-2xl font-extrabold text-neutral-900">
                {formatCOP(estimate.min)} — {formatCOP(estimate.max)}
              </p>
            </div>
          )}
        </motion.div>
      </section>
    );
  }

  return (
    <section id="contacto" className="py-24 bg-neutral-50">
      <div className="max-w-2xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-orange-50 border border-orange-200 text-orange-600 text-sm font-medium mb-4">
            Cotización gratuita
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-neutral-900">
            Cuéntanos tu{" "}
            <span className="gradient-text">proyecto</span>
          </h2>
          <p className="mt-3 text-neutral-600">
            Calculamos el precio en tiempo real según lo que necesitas.
          </p>
        </motion.div>

        {/* Step indicators */}
        <div className="flex items-center justify-center gap-2 mb-8">
          {[1, 2, 3].map((s) => (
            <div key={s} className="flex items-center gap-2">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 ${
                  s === step
                    ? "bg-orange-500 text-white"
                    : s < step
                    ? "bg-orange-100 text-orange-500"
                    : "bg-neutral-200 text-neutral-400"
                }`}
              >
                {s < step ? "✓" : s}
              </div>
              {s < 3 && (
                <div
                  className={`w-12 h-0.5 transition-all duration-300 ${
                    s < step ? "bg-orange-400" : "bg-neutral-200"
                  }`}
                />
              )}
            </div>
          ))}
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl border border-neutral-100 shadow-lg overflow-hidden">
          <AnimatePresence mode="wait">
            {/* ── Step 1: Contact ── */}
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                transition={{ duration: 0.25 }}
                className="p-6 sm:p-8 space-y-5"
              >
                <h3 className="text-lg font-bold text-neutral-900">
                  👤 Sobre ti y tu empresa
                </h3>

                <div className="grid sm:grid-cols-2 gap-4">
                  <Field label="Tu nombre" required>
                    <input
                      className={inputClass}
                      placeholder="Juan Pérez"
                      value={form.contactName}
                      onChange={(e) => set("contactName", e.target.value)}
                    />
                  </Field>
                  <Field label="Nombre de tu empresa" required>
                    <input
                      className={inputClass}
                      placeholder="Mi Empresa SAS"
                      value={form.businessName}
                      onChange={(e) => set("businessName", e.target.value)}
                    />
                  </Field>
                </div>

                <Field label="¿A qué se dedica tu empresa?" required>
                  <input
                    className={inputClass}
                    placeholder="Ej: Consultoría de negocios, ropa, restaurante..."
                    value={form.businessType}
                    onChange={(e) => set("businessType", e.target.value)}
                  />
                </Field>

                <div className="grid sm:grid-cols-2 gap-4">
                  <Field label="Email de contacto" required>
                    <input
                      className={inputClass}
                      type="email"
                      placeholder="tu@email.com"
                      value={form.email}
                      onChange={(e) => set("email", e.target.value)}
                    />
                  </Field>
                  <Field label="WhatsApp (opcional)">
                    <input
                      className={inputClass}
                      placeholder="+57 300 000 0000"
                      value={form.whatsapp}
                      onChange={(e) => set("whatsapp", e.target.value)}
                    />
                  </Field>
                </div>
              </motion.div>
            )}

            {/* ── Step 2: Project ── */}
            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                transition={{ duration: 0.25 }}
                className="p-6 sm:p-8 space-y-6"
              >
                <h3 className="text-lg font-bold text-neutral-900">
                  🌐 Tu sitio web
                </h3>

                <Field label="¿Qué tipo de sitio necesitas?" required>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {[
                      { v: "landing", l: "Landing Page" },
                      { v: "corporate", l: "Sitio Corporativo" },
                      { v: "ecommerce", l: "Tienda Online" },
                      { v: "restaurant", l: "Restaurante" },
                      { v: "custom", l: "Otro" },
                    ].map(({ v, l }) => (
                      <Chip
                        key={v}
                        label={l}
                        selected={form.siteType === v}
                        onClick={() => set("siteType", v)}
                      />
                    ))}
                  </div>
                </Field>

                <Field label="¿Cuántas páginas / secciones?" required>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {["1-3", "4-6", "7-10", "10+"].map((v) => (
                      <Chip
                        key={v}
                        label={v}
                        selected={form.pageCount === v}
                        onClick={() => set("pageCount", v)}
                      />
                    ))}
                  </div>
                </Field>

                <Field label="¿Qué funcionalidades extra necesitas?">
                  <div className="flex flex-wrap gap-2 mt-1">
                    {[
                      { v: "blog", l: "Blog" },
                      { v: "payments", l: "Pagos en línea" },
                      { v: "booking", l: "Reservas online" },
                      { v: "chat", l: "Chat en vivo" },
                      { v: "multilang", l: "Multilenguaje" },
                      { v: "portal", l: "Portal de clientes" },
                      { v: "seo", l: "SEO avanzado" },
                    ].map(({ v, l }) => (
                      <Chip
                        key={v}
                        label={l}
                        selected={form.features.includes(v)}
                        onClick={() => toggleFeature(v)}
                      />
                    ))}
                  </div>
                </Field>
              </motion.div>
            )}

            {/* ── Step 3: Details ── */}
            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                transition={{ duration: 0.25 }}
                className="p-6 sm:p-8 space-y-6"
              >
                <h3 className="text-lg font-bold text-neutral-900">
                  ⚙️ Últimos detalles
                </h3>

                <Field label="¿Cuándo lo necesitas?" required>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {[
                      { v: "urgent", l: "🔥 Urgente (<1 semana)" },
                      { v: "normal", l: "✅ Normal (2-3 semanas)" },
                      { v: "relaxed", l: "🕐 Sin prisa (1 mes+)" },
                    ].map(({ v, l }) => (
                      <Chip
                        key={v}
                        label={l}
                        selected={form.urgency === v}
                        onClick={() => set("urgency", v)}
                      />
                    ))}
                  </div>
                </Field>

                <Field label="¿Tienes el contenido (textos, fotos, logo)?" required>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {[
                      { v: "yes", l: "✅ Sí, tengo todo" },
                      { v: "partial", l: "🔶 Tengo algo" },
                      { v: "no", l: "❌ No, necesito ayuda" },
                    ].map(({ v, l }) => (
                      <Chip
                        key={v}
                        label={l}
                        selected={form.contentStatus === v}
                        onClick={() => set("contentStatus", v)}
                      />
                    ))}
                  </div>
                </Field>

                <Field label="Cuéntanos más sobre tu proyecto (opcional)">
                  <textarea
                    className={`${inputClass} resize-none`}
                    rows={4}
                    placeholder="¿Tienes referentes de diseño? ¿Colores de tu marca? ¿Algo específico que quieras?"
                    value={form.notes}
                    onChange={(e) => set("notes", e.target.value)}
                  />
                </Field>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Price estimate */}
          <AnimatePresence>
            {estimate && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="mx-6 sm:mx-8 mb-6 p-4 bg-orange-50 rounded-xl border border-orange-100"
              >
                <div className="flex items-center gap-2 mb-1">
                  <Calculator className="w-4 h-4 text-orange-500" />
                  <span className="text-xs font-semibold text-orange-600 uppercase tracking-wider">
                    Estimado preliminar
                  </span>
                </div>
                <p className="text-2xl font-extrabold text-neutral-900">
                  {formatCOP(estimate.min)}{" "}
                  <span className="text-neutral-400 font-normal">—</span>{" "}
                  {formatCOP(estimate.max)}
                </p>
                <p className="text-xs text-neutral-500 mt-1">
                  La cotización final puede variar según los detalles específicos de tu proyecto.
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Navigation */}
          <div className="px-6 sm:px-8 pb-6 sm:pb-8 flex items-center justify-between gap-4">
            {step > 1 ? (
              <button
                type="button"
                onClick={() => setStep((s) => s - 1)}
                className="flex items-center gap-1.5 px-5 py-3 rounded-xl border border-neutral-200 text-sm font-semibold text-neutral-600 hover:border-neutral-300 transition-colors cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
                Atrás
              </button>
            ) : (
              <div />
            )}

            {step < 3 ? (
              <button
                type="button"
                onClick={() => setStep((s) => s + 1)}
                disabled={step === 1 ? !canNext1 : !canNext2}
                className="flex items-center gap-1.5 px-6 py-3 rounded-xl bg-orange-500 hover:bg-orange-600 text-white text-sm font-bold transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer ml-auto"
              >
                Siguiente
                <ChevronRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                type="button"
                onClick={handleSubmit}
                disabled={!canSubmit || status === "sending"}
                className="flex items-center gap-2 px-8 py-3 rounded-xl bg-orange-500 hover:bg-orange-600 text-white text-sm font-bold transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer shadow-lg shadow-orange-200 ml-auto"
              >
                {status === "sending" ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Enviando...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    Enviar cotización
                  </>
                )}
              </button>
            )}
          </div>

          {status === "error" && (
            <p className="px-6 sm:px-8 pb-6 text-sm text-red-500 text-center">
              Error al enviar. Escríbenos directo a{" "}
              <a
                href="mailto:foreromorenojuandavid79@gmail.com"
                className="underline"
              >
                foreromorenojuandavid79@gmail.com
              </a>
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
