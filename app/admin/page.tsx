import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Zap, LogOut, Clock, CheckCircle2, Circle, XCircle } from "lucide-react";

const STATUS_STYLES: Record<string, { label: string; cls: string; icon: React.ReactNode }> = {
  nuevo:       { label: "Nuevo",       cls: "bg-blue-50 text-blue-600 border-blue-100",     icon: <Circle className="w-3 h-3" /> },
  en_proceso:  { label: "En proceso",  cls: "bg-orange-50 text-orange-600 border-orange-100", icon: <Clock className="w-3 h-3" /> },
  completado:  { label: "Completado",  cls: "bg-green-50 text-green-600 border-green-100",   icon: <CheckCircle2 className="w-3 h-3" /> },
  cancelado:   { label: "Cancelado",   cls: "bg-neutral-100 text-neutral-500 border-neutral-200", icon: <XCircle className="w-3 h-3" /> },
};

const SITE_LABELS: Record<string, string> = {
  landing: "Landing", corporate: "Corporativo", ecommerce: "E-commerce",
  restaurant: "Restaurante", custom: "Personalizado",
};

function formatCOP(n: number) {
  return new Intl.NumberFormat("es-CO", { style: "currency", currency: "COP", maximumFractionDigits: 0 }).format(n);
}

export default async function AdminDashboard() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/admin/login");

  const { data: quotes } = await supabase
    .from("quotes")
    .select("*")
    .order("created_at", { ascending: false });

  const counts = {
    nuevo: quotes?.filter(q => q.status === "nuevo").length ?? 0,
    en_proceso: quotes?.filter(q => q.status === "en_proceso").length ?? 0,
    completado: quotes?.filter(q => q.status === "completado").length ?? 0,
  };

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Top bar */}
      <header className="bg-white border-b border-neutral-100 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-orange-500 flex items-center justify-center">
            <Zap className="w-4 h-4 text-white" fill="white" />
          </div>
          <span className="font-bold text-neutral-900">Wo<span className="text-orange-500">xi</span> <span className="font-normal text-neutral-400 text-sm">/ Admin</span></span>
        </div>
        <form action="/api/admin/logout" method="POST">
          <button type="submit" className="flex items-center gap-1.5 text-sm text-neutral-500 hover:text-neutral-900 transition-colors cursor-pointer">
            <LogOut className="w-4 h-4" /> Salir
          </button>
        </form>
      </header>

      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          {[
            { label: "Nuevas", value: counts.nuevo, color: "text-blue-600" },
            { label: "En proceso", value: counts.en_proceso, color: "text-orange-500" },
            { label: "Completadas", value: counts.completado, color: "text-green-600" },
          ].map((s) => (
            <div key={s.label} className="bg-white rounded-2xl border border-neutral-100 p-5">
              <p className="text-xs text-neutral-500 font-medium uppercase tracking-wider mb-1">{s.label}</p>
              <p className={`text-3xl font-extrabold ${s.color}`}>{s.value}</p>
            </div>
          ))}
        </div>

        {/* Quotes table */}
        <div className="bg-white rounded-2xl border border-neutral-100 overflow-hidden">
          <div className="px-6 py-4 border-b border-neutral-50">
            <h2 className="font-semibold text-neutral-900">Cotizaciones recibidas</h2>
          </div>

          {!quotes?.length ? (
            <div className="py-16 text-center text-neutral-400 text-sm">Sin cotizaciones aún</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-neutral-50">
                    {["Empresa", "Tipo", "Estimado", "Contacto", "Fecha", "Estado", ""].map((h) => (
                      <th key={h} className="px-6 py-3 text-left text-xs font-semibold text-neutral-400 uppercase tracking-wider">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-50">
                  {quotes.map((q) => {
                    const s = STATUS_STYLES[q.status] ?? STATUS_STYLES.nuevo;
                    return (
                      <tr key={q.id} className="hover:bg-neutral-50/50 transition-colors">
                        <td className="px-6 py-4">
                          <p className="font-semibold text-neutral-900 text-sm">{q.business_name || "—"}</p>
                          <p className="text-xs text-neutral-400">{q.business_type || ""}</p>
                        </td>
                        <td className="px-6 py-4 text-sm text-neutral-600">{SITE_LABELS[q.site_type] ?? q.site_type ?? "—"}</td>
                        <td className="px-6 py-4 text-sm font-medium text-neutral-900">
                          {q.estimate_min ? `${formatCOP(q.estimate_min)} — ${formatCOP(q.estimate_max)}` : "—"}
                        </td>
                        <td className="px-6 py-4">
                          <p className="text-sm text-neutral-700">{q.contact_name}</p>
                          <p className="text-xs text-neutral-400">{q.email}</p>
                        </td>
                        <td className="px-6 py-4 text-xs text-neutral-400 whitespace-nowrap">
                          {new Date(q.created_at).toLocaleDateString("es-CO", { day: "2-digit", month: "short", year: "numeric" })}
                        </td>
                        <td className="px-6 py-4">
                          <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium border ${s.cls}`}>
                            {s.icon} {s.label}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <Link
                            href={`/admin/quotes/${q.id}`}
                            className="text-xs font-semibold text-orange-500 hover:text-orange-600 transition-colors"
                          >
                            Ver →
                          </Link>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
