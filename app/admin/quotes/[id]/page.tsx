"use client";

import { useEffect, useState, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { ArrowLeft, Copy, Check, Zap, ExternalLink } from "lucide-react";
import Link from "next/link";

const SITE_LABELS: Record<string, string> = {
  landing: "Landing Page", corporate: "Sitio Corporativo",
  ecommerce: "Tienda Online / E-commerce", restaurant: "Restaurante", custom: "Personalizado",
};
const FEATURE_LABELS: Record<string, string> = {
  blog: "Blog", payments: "Pagos en línea", booking: "Reservas online",
  chat: "Chat en vivo", multilang: "Multilenguaje", portal: "Portal de clientes", seo: "SEO avanzado",
};
const STATUS_OPTS = [
  { value: "nuevo", label: "Nuevo" },
  { value: "en_proceso", label: "En proceso" },
  { value: "completado", label: "Completado" },
  { value: "cancelado", label: "Cancelado" },
];

function formatCOP(n: number) {
  return new Intl.NumberFormat("es-CO", { style: "currency", currency: "COP", maximumFractionDigits: 0 }).format(n);
}

function generatePrompt(q: Record<string, unknown>): string {
  const features = Array.isArray(q.features)
    ? q.features.map((f: string) => FEATURE_LABELS[f] ?? f).join(", ")
    : "Ninguna adicional";

  const colors = Array.isArray(q.brand_colors) && q.brand_colors.length
    ? q.brand_colors.join(", ")
    : "Por definir con el cliente";

  const urgencyMap: Record<string, string> = {
    urgent: "Urgente (menos de 1 semana)",
    normal: "Normal (2-3 semanas)",
    relaxed: "Sin prisa (más de 1 mes)",
  };

  return `# Brief de proyecto — ${q.business_name || "Sin nombre"}

Eres un experto en desarrollo web moderno. Crea una página web profesional completa con las siguientes especificaciones.

---

## CLIENTE
- **Empresa:** ${q.business_name || "—"}
- **Industria/Sector:** ${q.business_type || "—"}
- **Contacto:** ${q.contact_name || "—"} (${q.email || "—"})
- **WhatsApp:** ${q.whatsapp || "—"}

## PROYECTO
- **Tipo de sitio:** ${SITE_LABELS[q.site_type as string] ?? q.site_type ?? "—"}
- **Páginas / secciones:** ${q.page_count || "—"}
- **Funcionalidades requeridas:** ${features}
- **Urgencia:** ${urgencyMap[q.urgency as string] ?? q.urgency ?? "—"}
- **Contenido disponible:** ${q.content_status === "yes" ? "Sí, tiene textos y logo" : q.content_status === "partial" ? "Parcial" : "No — crear con IA"}

## DISEÑO Y MARCA
- **Colores de marca:** ${colors}
${q.logo_url ? `- **Logo:** ${q.logo_url}` : "- **Logo:** No proporcionado — generar placeholder"}
${Array.isArray(q.brand_images) && q.brand_images.length ? `- **Imágenes de referencia:** ${(q.brand_images as string[]).join(", ")}` : ""}

## NOTAS DEL CLIENTE
${q.notes || "Sin notas adicionales."}

## PRESUPUESTO ESTIMADO
${q.estimate_min ? `${formatCOP(q.estimate_min as number)} — ${formatCOP(q.estimate_max as number)} COP` : "No calculado"}

---

## INSTRUCCIONES TÉCNICAS

Implementa el sitio con:
- **Framework:** Next.js 15 con App Router y TypeScript
- **Estilos:** Tailwind CSS v4
- **Animaciones:** Framer Motion
- **Principios:** Mobile-first, accesibilidad WCAG AA, SEO técnico
- **Performance objetivo:** Lighthouse 95+ en todas las categorías
- **Imágenes:** Genera con IA (Midjourney / DALL-E prompts) o usa unsplash para placeholders
- **Tipografía:** Inter o similar sans-serif de Google Fonts

## ESTRUCTURA SUGERIDA
1. Navbar fijo con logo y CTA
2. Hero con headline impactante y valor propuesto
3. Sección de servicios/productos
4. Sección de beneficios o diferenciadores
5. Testimonios o social proof
6. CTA final con formulario de contacto
7. Footer con links y contacto

## ESTILO VISUAL
- Moderno, minimalista, profesional
- Colores: ${colors}
- Sin emojis genéricos en la UI
- Fondos limpios con acentos de color sutil
- Tipografía clara y jerarquía bien definida

Genera el código completo, funcional y listo para producción.`;
}

export default function QuoteDetail() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const [quote, setQuote] = useState<Record<string, unknown> | null>(null);
  const [status, setStatus] = useState("");
  const [adminNotes, setAdminNotes] = useState("");
  const [saving, setSaving] = useState(false);
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    const supabase = createClient();
    const { data } = await supabase.from("quotes").select("*").eq("id", id).single();
    if (data) {
      setQuote(data);
      setStatus(data.status ?? "nuevo");
      setAdminNotes(data.admin_notes ?? "");
    }
    setLoading(false);
  }, [id]);

  useEffect(() => { load(); }, [load]);

  const save = async () => {
    setSaving(true);
    const supabase = createClient();
    await supabase.from("quotes").update({ status, admin_notes: adminNotes }).eq("id", id);
    setSaving(false);
  };

  const copyPrompt = async () => {
    if (!quote) return;
    await navigator.clipboard.writeText(generatePrompt(quote));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (loading) return (
    <div className="min-h-screen bg-neutral-50 flex items-center justify-center">
      <div className="w-6 h-6 border-2 border-orange-500 border-t-transparent rounded-full animate-spin" />
    </div>
  );

  if (!quote) return (
    <div className="min-h-screen bg-neutral-50 flex items-center justify-center text-neutral-400">
      Cotización no encontrada
    </div>
  );

  const prompt = generatePrompt(quote);

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Header */}
      <header className="bg-white border-b border-neutral-100 px-6 py-4 flex items-center gap-4">
        <Link href="/admin" className="text-neutral-400 hover:text-neutral-900 transition-colors">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-orange-500 flex items-center justify-center">
            <Zap className="w-4 h-4 text-white" fill="white" />
          </div>
          <span className="font-bold text-neutral-900 text-sm">Wo<span className="text-orange-500">xi</span> <span className="font-normal text-neutral-400">/ {quote.business_name as string || "Cotización"}</span></span>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-6 py-8 grid lg:grid-cols-3 gap-6">
        {/* Left — Details */}
        <div className="lg:col-span-2 space-y-5">

          {/* Client card */}
          <div className="bg-white rounded-2xl border border-neutral-100 p-6">
            <h2 className="font-semibold text-neutral-900 mb-4 text-sm uppercase tracking-wider text-neutral-400">Cliente</h2>
            <div className="grid sm:grid-cols-2 gap-3">
              {[
                ["Empresa", quote.business_name],
                ["Sector", quote.business_type],
                ["Contacto", quote.contact_name],
                ["Email", quote.email],
                ["WhatsApp", quote.whatsapp || "—"],
                ["Fecha", new Date(quote.created_at as string).toLocaleDateString("es-CO", { day: "2-digit", month: "long", year: "numeric" })],
              ].map(([label, value]) => (
                <div key={label as string}>
                  <p className="text-xs text-neutral-400 mb-0.5">{label}</p>
                  <p className="text-sm font-medium text-neutral-900">{value as string || "—"}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Project card */}
          <div className="bg-white rounded-2xl border border-neutral-100 p-6">
            <h2 className="font-semibold text-neutral-900 mb-4 text-sm uppercase tracking-wider text-neutral-400">Proyecto</h2>
            <div className="grid sm:grid-cols-2 gap-3 mb-4">
              {[
                ["Tipo", SITE_LABELS[quote.site_type as string] ?? quote.site_type],
                ["Páginas", quote.page_count],
                ["Urgencia", quote.urgency],
                ["Contenido", quote.content_status],
              ].map(([label, value]) => (
                <div key={label as string}>
                  <p className="text-xs text-neutral-400 mb-0.5">{label}</p>
                  <p className="text-sm font-medium text-neutral-900">{value as string || "—"}</p>
                </div>
              ))}
            </div>
            {Array.isArray(quote.features) && quote.features.length > 0 && (
              <div>
                <p className="text-xs text-neutral-400 mb-2">Funcionalidades</p>
                <div className="flex flex-wrap gap-1.5">
                  {(quote.features as string[]).map((f) => (
                    <span key={f} className="px-2.5 py-1 bg-orange-50 text-orange-600 rounded-full text-xs font-medium border border-orange-100">
                      {FEATURE_LABELS[f] ?? f}
                    </span>
                  ))}
                </div>
              </div>
            )}
            {quote.notes && (
              <div className="mt-4 pt-4 border-t border-neutral-50">
                <p className="text-xs text-neutral-400 mb-1">Notas del cliente</p>
                <p className="text-sm text-neutral-700 leading-relaxed">{quote.notes as string}</p>
              </div>
            )}
          </div>

          {/* Brand assets */}
          <div className="bg-white rounded-2xl border border-neutral-100 p-6">
            <h2 className="font-semibold text-neutral-900 mb-4 text-sm uppercase tracking-wider text-neutral-400">Marca</h2>

            {/* Colors */}
            {Array.isArray(quote.brand_colors) && quote.brand_colors.length > 0 && (
              <div className="mb-4">
                <p className="text-xs text-neutral-400 mb-2">Colores</p>
                <div className="flex gap-2">
                  {(quote.brand_colors as string[]).map((c) => (
                    <div key={c} className="flex items-center gap-1.5">
                      <div className="w-6 h-6 rounded-md border border-neutral-200 shadow-sm" style={{ backgroundColor: c }} />
                      <span className="text-xs font-mono text-neutral-500">{c}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Logo */}
            {quote.logo_url && (
              <div className="mb-4">
                <p className="text-xs text-neutral-400 mb-2">Logo</p>
                <a href={quote.logo_url as string} target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-sm text-orange-500 hover:underline">
                  Ver logo <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            )}

            {/* Brand images */}
            {Array.isArray(quote.brand_images) && quote.brand_images.length > 0 && (
              <div>
                <p className="text-xs text-neutral-400 mb-2">Imágenes de referencia</p>
                <div className="flex flex-wrap gap-2">
                  {(quote.brand_images as string[]).map((url, i) => (
                    <a key={i} href={url} target="_blank" rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs text-orange-500 hover:underline">
                      Imagen {i + 1} <ExternalLink className="w-3 h-3" />
                    </a>
                  ))}
                </div>
              </div>
            )}

            {!quote.logo_url && (!Array.isArray(quote.brand_colors) || !quote.brand_colors.length) && (
              <p className="text-sm text-neutral-400">Sin activos de marca cargados</p>
            )}
          </div>

          {/* Estimate */}
          <div className="bg-orange-50 rounded-2xl border border-orange-100 p-6">
            <p className="text-xs font-semibold text-orange-600 uppercase tracking-wider mb-1">Estimado de precio</p>
            <p className="text-2xl font-extrabold text-neutral-900">
              {quote.estimate_min
                ? `${formatCOP(quote.estimate_min as number)} — ${formatCOP(quote.estimate_max as number)}`
                : "No calculado"}
            </p>
            {quote.currency && <p className="text-xs text-neutral-400 mt-1">Moneda cotizada: {quote.currency as string}</p>}
          </div>
        </div>

        {/* Right — Actions */}
        <div className="space-y-5">
          {/* Status */}
          <div className="bg-white rounded-2xl border border-neutral-100 p-6">
            <h2 className="font-semibold text-neutral-900 mb-4 text-sm uppercase tracking-wider text-neutral-400">Estado</h2>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full px-3 py-2.5 rounded-xl border border-neutral-200 text-sm text-neutral-900 focus:outline-none focus:ring-2 focus:ring-orange-400 mb-4"
            >
              {STATUS_OPTS.map((o) => (
                <option key={o.value} value={o.value}>{o.label}</option>
              ))}
            </select>

            <label className="block text-xs text-neutral-400 mb-1.5">Notas internas</label>
            <textarea
              value={adminNotes}
              onChange={(e) => setAdminNotes(e.target.value)}
              rows={3}
              className="w-full px-3 py-2 rounded-xl border border-neutral-200 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-orange-400 mb-3"
              placeholder="Notas privadas sobre este proyecto..."
            />

            <button
              onClick={save}
              disabled={saving}
              className="w-full py-2.5 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-xl text-sm transition-colors disabled:opacity-60 cursor-pointer"
            >
              {saving ? "Guardando..." : "Guardar cambios"}
            </button>
          </div>

          {/* Claude prompt */}
          <div className="bg-white rounded-2xl border border-neutral-100 p-6">
            <div className="flex items-center justify-between mb-3">
              <h2 className="font-semibold text-neutral-900 text-sm uppercase tracking-wider text-neutral-400">Prompt para Claude Code</h2>
              <button
                onClick={copyPrompt}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-neutral-950 hover:bg-neutral-800 text-white text-xs font-semibold transition-colors cursor-pointer"
              >
                {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                {copied ? "Copiado" : "Copiar"}
              </button>
            </div>
            <div className="bg-neutral-950 rounded-xl p-4 max-h-80 overflow-y-auto">
              <pre className="text-xs text-neutral-300 whitespace-pre-wrap font-mono leading-relaxed">{prompt}</pre>
            </div>
            <p className="text-xs text-neutral-400 mt-3">Pega este prompt en Claude Code para generar el sitio del cliente.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
