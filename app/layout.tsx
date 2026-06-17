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
