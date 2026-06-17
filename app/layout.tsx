import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Providers from "./providers";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const siteUrl = "https://woxi.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Woxi | Agencia de Diseño Web Profesional | Páginas Web que Convierten",
    template: "%s | Woxi",
  },
  description:
    "Agencia de diseño web profesional. Creamos páginas web, tiendas online, landing pages y SEO que convierten visitantes en clientes. Cotización gratis, entrega en 7-14 días.",
  keywords: [
    "agencia de diseño web",
    "diseño web profesional",
    "diseño de páginas web",
    "desarrollo web",
    "páginas web que convierten",
    "creación de sitios web",
    "tiendas online",
    "diseño de ecommerce",
    "landing pages de alta conversión",
    "posicionamiento SEO",
    "web design agency",
    "professional web design",
  ],
  authors: [{ name: "Woxi" }],
  creator: "Woxi",
  publisher: "Woxi",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "es_CO",
    alternateLocale: ["en_US", "pt_BR", "fr_FR", "de_DE"],
    url: siteUrl,
    siteName: "Woxi",
    title: "Woxi | Agencia de Diseño Web Profesional | Páginas Web que Convierten",
    description:
      "Agencia de diseño web profesional. Páginas web, tiendas online y SEO que convierten visitantes en clientes.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Woxi - Agencia de Diseño Web Profesional",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Woxi | Agencia de Diseño Web Profesional",
    description:
      "Páginas web profesionales que convierten visitantes en clientes. Diseño web, ecommerce y SEO.",
    images: ["/og-image.png"],
  },
  alternates: {
    canonical: siteUrl,
  },
  // Set GOOGLE_SITE_VERIFICATION in Vercel env vars to verify the site in
  // Google Search Console (the #1 step to get indexed/ranked). Omitted if unset.
  verification: process.env.GOOGLE_SITE_VERIFICATION
    ? { google: process.env.GOOGLE_SITE_VERIFICATION }
    : undefined,
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${siteUrl}/#organization`,
      name: "Woxi",
      url: siteUrl,
      logo: {
        "@type": "ImageObject",
        url: `${siteUrl}/logo.png`,
      },
      sameAs: ["https://www.instagram.com/woxi.dev/"],
      address: {
        "@type": "PostalAddress",
        addressLocality: "Bogotá",
        addressRegion: "Cundinamarca",
        addressCountry: "CO",
      },
      contactPoint: {
        "@type": "ContactPoint",
        telephone: "+57-322-362-4554",
        email: "foreromorenojuandavid79@gmail.com",
        contactType: "customer service",
        availableLanguage: ["Spanish", "English", "Portuguese", "French", "German"],
        areaServed: "Worldwide",
      },
    },
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      url: siteUrl,
      name: "Woxi",
      description: "Agencia de diseño web profesional en Bogotá, Colombia",
      publisher: { "@id": `${siteUrl}/#organization` },
    },
    {
      "@type": "FAQPage",
      "@id": `${siteUrl}/#faq`,
      mainEntity: [
        {
          "@type": "Question",
          name: "¿Cuánto cuesta una página web profesional?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "El precio depende del tipo de sitio (landing, corporativo, tienda online), número de secciones y funcionalidades. En Woxi calculamos un estimado en tiempo real y la primera consulta es gratis y sin compromiso.",
          },
        },
        {
          "@type": "Question",
          name: "¿En cuánto tiempo entregan una página web?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "La mayoría de proyectos se entregan en 7 a 14 días. Proyectos urgentes pueden estar listos en menos de una semana según el alcance.",
          },
        },
        {
          "@type": "Question",
          name: "¿El diseño web incluye SEO?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Sí. Todos nuestros sitios incluyen SEO técnico desde el día 1: estructura optimizada, metadatos, velocidad de carga, imágenes en WebP/AVIF y datos estructurados para posicionar en Google.",
          },
        },
        {
          "@type": "Question",
          name: "¿Trabajan con clientes fuera de Colombia?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Sí. Woxi trabaja de forma 100% remota con clientes de cualquier país y atiende en español, inglés, portugués, francés y alemán.",
          },
        },
        {
          "@type": "Question",
          name: "¿Incluye hosting y soporte?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Sí. Nos encargamos del hosting, el despliegue y el mantenimiento, con backups automáticos diarios y soporte prioritario para que tu sitio funcione desde el primer día.",
          },
        },
      ],
    },
    {
      "@type": "ProfessionalService",
      "@id": `${siteUrl}/#service`,
      name: "Woxi",
      image: `${siteUrl}/og-image.png`,
      url: siteUrl,
      description: "Creamos páginas web profesionales para tu negocio",
      priceRange: "$$",
      areaServed: "Worldwide",
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Servicios de Diseño Web",
        itemListElement: [
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Diseño Web Profesional" } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Tiendas Online (E-commerce)" } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "SEO y Posicionamiento" } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Landing Pages" } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Automatización Web" } },
        ],
      },
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es" className={inter.variable}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="font-inter antialiased bg-white text-neutral-900">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
