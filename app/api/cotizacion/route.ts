import { Resend } from "resend";
import { NextRequest, NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);

function formatCOP(n: number) {
  return new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    maximumFractionDigits: 0,
  }).format(n);
}

const siteTypeLabels: Record<string, string> = {
  landing: "Landing Page",
  corporate: "Sitio Corporativo",
  ecommerce: "Tienda Online / E-commerce",
  restaurant: "Restaurante / Menú Digital",
  custom: "Otro / Personalizado",
};

const featureLabels: Record<string, string> = {
  blog: "Blog",
  payments: "Pagos en línea",
  booking: "Sistema de reservas",
  chat: "Chat en vivo",
  multilang: "Multilenguaje",
  portal: "Portal de clientes",
  seo: "SEO avanzado",
};

const urgencyLabels: Record<string, string> = {
  urgent: "Urgente (menos de 1 semana)",
  normal: "Normal (2-3 semanas)",
  relaxed: "Sin prisa (1 mes+)",
};

const contentLabels: Record<string, string> = {
  yes: "Sí, tengo todo el contenido",
  partial: "Tengo algo, necesito ayuda con el resto",
  no: "No, necesito ayuda con todo",
};

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      businessName,
      businessType,
      contactName,
      email,
      whatsapp,
      siteType,
      pageCount,
      features,
      urgency,
      contentStatus,
      notes,
      estimate,
    } = body;

    const featuresHtml = features?.length
      ? features.map((f: string) => `<li>${featureLabels[f] ?? f}</li>`).join("")
      : "<li>Ninguna adicional</li>";

    const estimateHtml = estimate
      ? `<p style="font-size:24px;font-weight:800;color:#f97316;margin:4px 0;">
          ${formatCOP(estimate.min)} — ${formatCOP(estimate.max)}
        </p>`
      : "<p>No calculado</p>";

    const html = `
<!DOCTYPE html>
<html lang="es">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="font-family:system-ui,sans-serif;background:#f5f5f5;margin:0;padding:24px;">
  <div style="max-width:600px;margin:0 auto;background:#fff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.08);">

    <!-- Header -->
    <div style="background:#111;padding:32px;text-align:center;">
      <span style="font-size:28px;font-weight:900;color:#fff;">Wo<span style="color:#f97316;">xi</span></span>
      <p style="color:#9ca3af;margin:8px 0 0;font-size:14px;">Nueva solicitud de cotización</p>
    </div>

    <!-- Estimate highlight -->
    <div style="background:#fff7ed;border-bottom:2px solid #fed7aa;padding:24px 32px;text-align:center;">
      <p style="margin:0;font-size:13px;font-weight:600;color:#ea580c;text-transform:uppercase;letter-spacing:0.05em;">Estimado de precio</p>
      ${estimateHtml}
      <p style="margin:4px 0 0;font-size:12px;color:#9ca3af;">Sujeto a revisión según detalles específicos</p>
    </div>

    <!-- Body -->
    <div style="padding:32px;">

      <h2 style="margin:0 0 20px;font-size:16px;font-weight:700;color:#111;border-bottom:1px solid #f3f4f6;padding-bottom:12px;">
        👤 Datos de contacto
      </h2>
      <table style="width:100%;border-collapse:collapse;margin-bottom:24px;">
        <tr><td style="padding:6px 0;color:#6b7280;font-size:13px;width:40%;">Nombre</td><td style="padding:6px 0;font-size:13px;font-weight:600;color:#111;">${contactName || "—"}</td></tr>
        <tr><td style="padding:6px 0;color:#6b7280;font-size:13px;">Empresa</td><td style="padding:6px 0;font-size:13px;font-weight:600;color:#111;">${businessName || "—"}</td></tr>
        <tr><td style="padding:6px 0;color:#6b7280;font-size:13px;">Sector</td><td style="padding:6px 0;font-size:13px;font-weight:600;color:#111;">${businessType || "—"}</td></tr>
        <tr><td style="padding:6px 0;color:#6b7280;font-size:13px;">Email</td><td style="padding:6px 0;font-size:13px;font-weight:600;color:#111;">${email || "—"}</td></tr>
        <tr><td style="padding:6px 0;color:#6b7280;font-size:13px;">WhatsApp</td><td style="padding:6px 0;font-size:13px;font-weight:600;color:#111;">${whatsapp || "—"}</td></tr>
      </table>

      <h2 style="margin:0 0 20px;font-size:16px;font-weight:700;color:#111;border-bottom:1px solid #f3f4f6;padding-bottom:12px;">
        🌐 Detalles del sitio
      </h2>
      <table style="width:100%;border-collapse:collapse;margin-bottom:24px;">
        <tr><td style="padding:6px 0;color:#6b7280;font-size:13px;width:40%;">Tipo de sitio</td><td style="padding:6px 0;font-size:13px;font-weight:600;color:#111;">${siteTypeLabels[siteType] ?? siteType ?? "—"}</td></tr>
        <tr><td style="padding:6px 0;color:#6b7280;font-size:13px;">Páginas/secciones</td><td style="padding:6px 0;font-size:13px;font-weight:600;color:#111;">${pageCount || "—"}</td></tr>
        <tr><td style="padding:6px 0;color:#6b7280;font-size:13px;">Urgencia</td><td style="padding:6px 0;font-size:13px;font-weight:600;color:#111;">${urgencyLabels[urgency] ?? urgency ?? "—"}</td></tr>
        <tr><td style="padding:6px 0;color:#6b7280;font-size:13px;">Contenido</td><td style="padding:6px 0;font-size:13px;font-weight:600;color:#111;">${contentLabels[contentStatus] ?? contentStatus ?? "—"}</td></tr>
      </table>

      <h2 style="margin:0 0 12px;font-size:16px;font-weight:700;color:#111;border-bottom:1px solid #f3f4f6;padding-bottom:12px;">
        ⚙️ Funcionalidades extra
      </h2>
      <ul style="margin:0 0 24px;padding-left:20px;color:#374151;font-size:13px;line-height:1.8;">
        ${featuresHtml}
      </ul>

      ${notes ? `
      <h2 style="margin:0 0 12px;font-size:16px;font-weight:700;color:#111;border-bottom:1px solid #f3f4f6;padding-bottom:12px;">
        📝 Notas adicionales
      </h2>
      <p style="margin:0 0 24px;font-size:13px;color:#374151;line-height:1.7;background:#f9fafb;border-radius:8px;padding:16px;">${notes}</p>
      ` : ""}

    </div>

    <!-- Footer -->
    <div style="background:#f9fafb;border-top:1px solid #f3f4f6;padding:20px 32px;text-align:center;">
      <p style="margin:0;font-size:12px;color:#9ca3af;">Enviado desde el formulario de cotización de <strong>Woxi</strong></p>
    </div>
  </div>
</body>
</html>`;

    await resend.emails.send({
      from: "Woxi Cotizaciones <onboarding@resend.dev>",
      to: ["foreromorenojuandavid79@gmail.com"],
      replyTo: email,
      subject: `🚀 Nueva cotización — ${businessName || contactName || "Sin nombre"} (${siteTypeLabels[siteType] ?? siteType ?? "Web"})`,
      html,
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Error enviando email" }, { status: 500 });
  }
}
