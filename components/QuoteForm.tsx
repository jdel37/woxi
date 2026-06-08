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
import { useI18n, convertFromCOP, formatMoney } from "@/lib/i18n";
import { createClient } from "@/lib/supabase/client";

// ─── Pricing tables (base COP) ────────────────────────────────────────────────
// Rates: ~$50,000 COP/h junior · ~$90,000 COP/h mid · market margin included
const SITE_PRICES: Record<string, number> = {
  landing:    1250000,
  corporate:  2500000,
  ecommerce:  4250000,
  restaurant: 2000000,
  custom:     2750000,
};

const PAGE_EXTRAS: Record<string, number> = {
  "1-3":  0,
  "4-6":  400000,
  "7-10": 900000,
  "10+":  1750000,
};

const FEATURE_PRICES: Record<string, number> = {
  blog:      450000,
  payments:  1100000,
  booking:   750000,
  chat:      200000,
  multilang: 600000,
  portal:    1500000,
  seo:       500000,
};

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
  brandColors: string[];
  logoFile: File | null;
  brandFiles: File[];
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
  brandColors: ["#f97316", "#111111", "#ffffff"],
  logoFile: null,
  brandFiles: [],
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
  const { t, currency } = useI18n();
  const [form, setForm] = useState<FormData>(INITIAL);
  const [step, setStep] = useState(1);
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const TOTAL_STEPS = 4;

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
    const content = form.contentStatus === "no" ? 750000 : 0;
    let total = base + pages + feats + content;
    if (form.urgency === "urgent") total = Math.round(total * 1.35);
    return { min: Math.round(total * 0.9), max: Math.round(total * 1.15) };
  }, [form]);

  const canNext1 = form.contactName.trim() && form.email.trim() && form.businessName.trim();
  const canNext2 = form.siteType && form.pageCount;
  const canNext3 = form.urgency && form.contentStatus;
  const canSubmit = canNext1 && canNext2 && canNext3;

  const uploadFile = async (file: File, path: string): Promise<string | null> => {
    try {
      const supabase = createClient();
      const { error } = await supabase.storage.from("brand-assets").upload(path, file, { upsert: true });
      if (error) return null;
      const { data } = supabase.storage.from("brand-assets").getPublicUrl(path);
      return data.publicUrl;
    } catch { return null; }
  };

  const handleSubmit = async () => {
    setStatus("sending");
    try {
      const uid = crypto.randomUUID();
      let logoUrl: string | null = null;
      const brandImages: string[] = [];

      if (form.logoFile) {
        const ext = form.logoFile.name.split(".").pop();
        logoUrl = await uploadFile(form.logoFile, `${uid}/logo.${ext}`);
      }
      for (let i = 0; i < form.brandFiles.length; i++) {
        const ext = form.brandFiles[i].name.split(".").pop();
        const url = await uploadFile(form.brandFiles[i], `${uid}/ref-${i}.${ext}`);
        if (url) brandImages.push(url);
      }

      const res = await fetch("/api/cotizacion", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          logoFile: undefined,
          brandFiles: undefined,
          logoUrl,
          brandImages,
          currency,
          estimate,
        }),
      });
      if (!res.ok) throw new Error();
      setStatus("success");
    } catch {
      setStatus("error");
    }
  };

  const formatPrice = (copAmount: number) =>
    formatMoney(convertFromCOP(copAmount, currency), currency);

  if (status === "success") {
    return (
      <section id="contacto" className="py-24 bg-neutral-50">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          className="max-w-lg mx-auto px-4 text-center"
        >
          {/* Animated checkmark */}
          <div className="flex justify-center mb-6">
            <motion.svg
              viewBox="0 0 52 52"
              className="w-24 h-24"
              initial="hidden"
              animate="visible"
            >
              <motion.circle
                cx="26" cy="26" r="24"
                fill="none"
                stroke="#f97316"
                strokeWidth="2.5"
                variants={{
                  hidden: { pathLength: 0, opacity: 0 },
                  visible: { pathLength: 1, opacity: 1, transition: { duration: 0.6, ease: "easeOut" } },
                }}
              />
              <motion.path
                d="M14 26.5 L22 34.5 L38 19"
                fill="none"
                stroke="#f97316"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
                variants={{
                  hidden: { pathLength: 0, opacity: 0 },
                  visible: { pathLength: 1, opacity: 1, transition: { duration: 0.4, delay: 0.55, ease: "easeOut" } },
                }}
              />
            </motion.svg>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
          >
            <h3 className="text-2xl font-extrabold text-neutral-900 mb-2">
              {t.quote_success_title}
            </h3>
            <p className="text-neutral-600 mb-6">
              {t.quote_success_sub}
            </p>

            {estimate && (
              <div className="p-5 bg-orange-50 rounded-2xl border border-orange-100 mb-6">
                <p className="text-xs font-semibold text-orange-600 uppercase tracking-wider mb-1">
                  {t.quote_success_estimate}
                </p>
                <p className="text-2xl font-extrabold text-neutral-900">
                  {formatPrice(estimate.min)} — {formatPrice(estimate.max)}
                </p>
              </div>
            )}

            <button
              onClick={() => {
                setStatus("idle");
                setForm(INITIAL);
                setStep(1);
              }}
              className="px-6 py-3 rounded-xl border border-orange-300 text-orange-500 font-semibold text-sm hover:bg-orange-50 transition-colors cursor-pointer"
            >
              {t.quote_send_another ?? "Enviar otra cotización"}
            </button>
          </motion.div>
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
            {t.quote_tag}
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-neutral-900">
            {t.quote_h2a}{" "}
            <span className="gradient-text">{t.quote_h2b}</span>
          </h2>
          <p className="mt-3 text-neutral-600">
            {t.quote_sub}
          </p>
        </motion.div>

        {/* Step indicators */}
        <div className="flex items-center justify-center gap-2 mb-8">
          {[1, 2, 3, 4].map((s) => (
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
              {s < 4 && (
                <div
                  className={`w-8 h-0.5 transition-all duration-300 ${
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
                  👤 {t.quote_step1}
                </h3>

                <div className="grid sm:grid-cols-2 gap-4">
                  <Field label={t.quote_name} required>
                    <input
                      className={inputClass}
                      placeholder="Juan Pérez"
                      value={form.contactName}
                      onChange={(e) => set("contactName", e.target.value)}
                    />
                  </Field>
                  <Field label={t.quote_company} required>
                    <input
                      className={inputClass}
                      placeholder="Mi Empresa SAS"
                      value={form.businessName}
                      onChange={(e) => set("businessName", e.target.value)}
                    />
                  </Field>
                </div>

                <Field label={t.quote_sector} required>
                  <input
                    className={inputClass}
                    placeholder={t.quote_sector_ph}
                    value={form.businessType}
                    onChange={(e) => set("businessType", e.target.value)}
                  />
                </Field>

                <div className="grid sm:grid-cols-2 gap-4">
                  <Field label={t.quote_email} required>
                    <input
                      className={inputClass}
                      type="email"
                      placeholder="tu@email.com"
                      value={form.email}
                      onChange={(e) => set("email", e.target.value)}
                    />
                  </Field>
                  <Field label={t.quote_whatsapp}>
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
                  🌐 {t.quote_step2}
                </h3>

                <Field label={t.quote_site_type} required>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {[
                      { v: "landing", l: t.quote_site_landing },
                      { v: "corporate", l: t.quote_site_corporate },
                      { v: "ecommerce", l: t.quote_site_ecommerce },
                      { v: "restaurant", l: t.quote_site_restaurant },
                      { v: "custom", l: t.quote_site_custom },
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

                <Field label={t.quote_pages} required>
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

                <Field label={t.quote_features}>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {[
                      { v: "blog", l: t.quote_feat_blog },
                      { v: "payments", l: t.quote_feat_payments },
                      { v: "booking", l: t.quote_feat_booking },
                      { v: "chat", l: t.quote_feat_chat },
                      { v: "multilang", l: t.quote_feat_multilang },
                      { v: "portal", l: t.quote_feat_portal },
                      { v: "seo", l: t.quote_feat_seo },
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
                  ⚙️ {t.quote_step3}
                </h3>

                <Field label={t.quote_urgency} required>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {[
                      { v: "urgent", l: t.quote_urg_urgent },
                      { v: "normal", l: t.quote_urg_normal },
                      { v: "relaxed", l: t.quote_urg_relaxed },
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

                <Field label={t.quote_content} required>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {[
                      { v: "yes", l: t.quote_cont_yes },
                      { v: "partial", l: t.quote_cont_partial },
                      { v: "no", l: t.quote_cont_no },
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

                <Field label={t.quote_notes}>
                  <textarea
                    className={`${inputClass} resize-none`}
                    rows={4}
                    placeholder={t.quote_notes_ph}
                    value={form.notes}
                    onChange={(e) => set("notes", e.target.value)}
                  />
                </Field>
              </motion.div>
            )}

            {/* ── Step 4: Brand ── */}
            {step === 4 && (
              <motion.div
                key="step4"
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                transition={{ duration: 0.25 }}
                className="p-6 sm:p-8 space-y-6"
              >
                <h3 className="text-lg font-bold text-neutral-900">Identidad de marca</h3>

                <Field label="Colores de tu marca">
                  <div className="flex gap-4 mt-1 flex-wrap">
                    {form.brandColors.map((color, i) => (
                      <div key={i} className="flex flex-col items-center gap-1.5">
                        <label
                          className="w-12 h-12 rounded-xl border-2 border-neutral-200 cursor-pointer overflow-hidden hover:border-orange-400 transition-colors"
                          style={{ backgroundColor: color }}
                        >
                          <input
                            type="color"
                            value={color}
                            onChange={(e) => {
                              const next = [...form.brandColors];
                              next[i] = e.target.value;
                              setForm((prev) => ({ ...prev, brandColors: next }));
                            }}
                            className="opacity-0 w-0 h-0"
                          />
                        </label>
                        <span className="text-xs font-mono text-neutral-400">{color}</span>
                      </div>
                    ))}
                  </div>
                  <p className="text-xs text-neutral-400 mt-2">Haz clic en cada color para cambiarlo</p>
                </Field>

                <Field label="Logo de tu empresa (opcional)">
                  <label className="flex flex-col items-center justify-center w-full h-28 border-2 border-dashed border-neutral-200 rounded-xl cursor-pointer hover:border-orange-400 hover:bg-orange-50/30 transition-all">
                    <input type="file" accept="image/*" className="hidden"
                      onChange={(e) => setForm((prev) => ({ ...prev, logoFile: e.target.files?.[0] ?? null }))}
                    />
                    {form.logoFile ? (
                      <div className="text-center">
                        <p className="text-sm font-medium text-orange-500">{form.logoFile.name}</p>
                        <p className="text-xs text-neutral-400 mt-1">{(form.logoFile.size / 1024).toFixed(0)} KB</p>
                      </div>
                    ) : (
                      <div className="text-center">
                        <p className="text-sm text-neutral-500">Arrastra tu logo o haz clic</p>
                        <p className="text-xs text-neutral-400 mt-1">PNG, JPG, SVG — máx 5MB</p>
                      </div>
                    )}
                  </label>
                </Field>

                <Field label="Imágenes de referencia / inspiración (opcional)">
                  <label className="flex flex-col items-center justify-center w-full h-24 border-2 border-dashed border-neutral-200 rounded-xl cursor-pointer hover:border-orange-400 hover:bg-orange-50/30 transition-all">
                    <input type="file" accept="image/*" multiple className="hidden"
                      onChange={(e) => setForm((prev) => ({ ...prev, brandFiles: Array.from(e.target.files ?? []).slice(0, 4) }))}
                    />
                    {form.brandFiles.length > 0 ? (
                      <p className="text-sm font-medium text-orange-500">{form.brandFiles.length} archivo(s) seleccionado(s)</p>
                    ) : (
                      <div className="text-center">
                        <p className="text-sm text-neutral-500">Hasta 4 imágenes de referencia</p>
                        <p className="text-xs text-neutral-400 mt-1">Sitios que te gustan, estilos, paletas...</p>
                      </div>
                    )}
                  </label>
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
                    {t.quote_estimate_label}
                  </span>
                </div>
                <p className="text-2xl font-extrabold text-neutral-900">
                  {formatPrice(estimate.min)}{" "}
                  <span className="text-neutral-400 font-normal">—</span>{" "}
                  {formatPrice(estimate.max)}
                </p>
                <p className="text-xs text-neutral-500 mt-1">
                  {t.quote_estimate_note}
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
                {t.quote_back}
              </button>
            ) : (
              <div />
            )}

            {step < TOTAL_STEPS ? (
              <button
                type="button"
                onClick={() => setStep((s) => s + 1)}
                disabled={step === 1 ? !canNext1 : step === 2 ? !canNext2 : step === 3 ? !canNext3 : false}
                className="flex items-center gap-1.5 px-6 py-3 rounded-xl bg-orange-500 hover:bg-orange-600 text-white text-sm font-bold transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer ml-auto"
              >
                {t.quote_next}
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
                    {t.quote_sending}
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    {t.quote_send}
                  </>
                )}
              </button>
            )}
          </div>

          {status === "error" && (
            <p className="px-6 sm:px-8 pb-6 text-sm text-red-500 text-center">
              {t.quote_error}{" "}
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
