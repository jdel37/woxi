"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

export type Lang = "es" | "en" | "pt" | "fr" | "de";
export type Currency = "COP" | "USD" | "BRL" | "EUR";

// ─── Currency ─────────────────────────────────────────────────────────────────
export const LANG_CURRENCY: Record<Lang, Currency> = {
  es: "COP", en: "USD", pt: "BRL", fr: "EUR", de: "EUR",
};

// Rates relative to COP (1 COP = X currency)
const TO_CURRENCY: Record<Currency, number> = {
  COP: 1,
  USD: 1 / 4200,
  EUR: 1 / 4600,
  BRL: 1 / 820,
};

export function convertFromCOP(copAmount: number, currency: Currency) {
  return Math.round(copAmount * TO_CURRENCY[currency]);
}

export function formatMoney(amount: number, currency: Currency) {
  const locales: Record<Currency, string> = {
    COP: "es-CO", USD: "en-US", EUR: "fr-FR", BRL: "pt-BR",
  };
  return new Intl.NumberFormat(locales[currency], {
    style: "currency",
    currency,
    maximumFractionDigits: currency === "COP" ? 0 : 0,
  }).format(amount);
}

// ─── Language detection ────────────────────────────────────────────────────────
const SUPPORTED: Lang[] = ["es", "en", "pt", "fr", "de"];

function detectLang(): Lang {
  if (typeof window === "undefined") return "es";
  const saved = localStorage.getItem("woxi_lang") as Lang | null;
  if (saved && SUPPORTED.includes(saved)) return saved;
  const browser = navigator.language.split("-")[0] as Lang;
  return SUPPORTED.includes(browser) ? browser : "en";
}

// ─── Translations ──────────────────────────────────────────────────────────────
export type T = typeof translations.es;

const translations = {
  es: {
    // Navbar
    nav_inicio: "Inicio",
    nav_servicios: "Servicios",
    nav_portafolio: "Portafolio",
    nav_nosotros: "Nosotros",
    nav_contacto: "Contacto",
    nav_cta: "Solicitar cotización",

    // Hero
    hero_badge: "Agencia de Diseño Web Profesional",
    hero_h1a: "Creamos páginas web que",
    hero_h1b: "convierten visitantes",
    hero_h1c: "en clientes",
    hero_sub: "Diseñamos y desarrollamos experiencias digitales de alto impacto que impulsan el crecimiento de tu negocio. Rápido, moderno y optimizado para resultados.",
    hero_feat1: "Entrega en 7-14 días",
    hero_feat2: "Diseño 100% personalizado",
    hero_feat3: "SEO incluido desde el día 1",
    hero_cta1: "Solicitar cotización gratis",
    hero_cta2: "Ver portafolio",
    hero_speed: "Velocidad",
    hero_speed_val: "Lighthouse 98+",
    hero_conv: "Conversión",
    hero_conv_val: "+340% más leads",

    // Portfolio
    portfolio_tag: "Nuestro trabajo",
    portfolio_h2a: "Proyectos que",
    portfolio_h2b: "hablan por sí solos",
    portfolio_sub: "Cada proyecto es una solución a medida, diseñada para maximizar resultados y superar expectativas.",
    portfolio_category: "Sitio Corporativo",
    portfolio_desc: "Presencia digital a la altura de una consultora estratégica con más de 20 años de experiencia. Sitio rápido, profesional y optimizado para captar clientes corporativos en Bogotá y Medellín.",

    // Services
    services_tag: "¿Qué hacemos?",
    services_h2a: "Servicios diseñados para",
    services_h2b: "hacer crecer",
    services_h2c: "tu negocio",
    services_sub: "Soluciones digitales end-to-end para que tu empresa destaque, convierta y escale en el mundo online.",
    svc1_title: "Diseño Web Profesional",
    svc1_desc: "Creamos sitios web modernos, rápidos y optimizados que reflejan la esencia de tu marca y generan resultados reales.",
    svc1_f1: "Mobile First", svc1_f2: "Ultra rápido", svc1_f3: "Diseño único",
    svc2_title: "Tiendas Online",
    svc2_desc: "E-commerce completo con gestión de inventario, pasarela de pagos segura y UX optimizada para maximizar tus ventas.",
    svc2_f1: "Pagos seguros", svc2_f2: "Panel admin", svc2_f3: "Multi-producto",
    svc3_title: "SEO Avanzado",
    svc3_desc: "Posicionamos tu negocio en los primeros resultados de Google con estrategias SEO técnicas y de contenido.",
    svc3_f1: "SEO técnico", svc3_f2: "Contenido", svc3_f3: "Analytics",
    svc4_title: "Automatización",
    svc4_desc: "Automatizamos procesos repetitivos de tu negocio con integraciones inteligentes que ahorran tiempo y dinero.",
    svc4_f1: "CRM integrado", svc4_f2: "IA incluida", svc4_f3: "Workflows",
    svc5_title: "Landing Pages",
    svc5_desc: "Páginas de aterrizaje de alta conversión diseñadas para captar leads y cerrar ventas de forma efectiva.",
    svc5_f1: "A/B Testing", svc5_f2: "Alta conversión", svc5_f3: "Remarketing",
    services_idea: "¿Tienes un proyecto en mente?",
    services_idea_sub: "Cuéntanos tu idea y te preparamos una propuesta personalizada sin costo ni compromiso.",
    services_idea_cta: "Iniciar conversación →",

    // Benefits
    benefits_tag: "¿Por qué nosotros?",
    benefits_h2a: "Todo lo que tu negocio",
    benefits_h2b: "necesita para crecer",
    ben1_tag: "Más clientes",
    ben1_title: "Diseño que convierte visitantes en compradores",
    ben1_desc: "Creamos experiencias web enfocadas en la conversión. Cada elemento, desde el copy hasta los botones CTA, está diseñado para guiar al usuario hacia la acción que tu negocio necesita.",
    ben1_p1: "UX optimizada para conversión",
    ben1_p2: "Llamadas a la acción estratégicas",
    ben1_p3: "Funnel de ventas integrado",
    ben2_tag: "Más rápido",
    ben2_title: "Velocidad de carga que supera tu competencia",
    ben2_desc: "El 53% de los usuarios abandona un sitio si tarda más de 3 segundos en cargar. Nuestros sitios alcanzan puntuaciones de 95+ en Google PageSpeed, manteniendo a tus visitantes y mejorando tu SEO.",
    ben2_p1: "Lighthouse score 95+",
    ben2_p2: "Imágenes optimizadas con WebP/AVIF",
    ben2_p3: "CDN global incluido",
    ben3_tag: "Más confianza",
    ben3_title: "Hosting, despliegue y soporte que te da tranquilidad",
    ben3_desc: "Tu sitio queda publicado y funcionando desde el día uno. Nos encargamos del hosting, el despliegue y el mantenimiento. Y cuando necesitas ayuda, estamos aquí.",
    ben3_p1: "Hosting y despliegue incluido",
    ben3_p2: "Backups automáticos diarios",
    ben3_p3: "Soporte prioritario 7 días",
    benefits_cta: "Saber más",

    // Testimonials
    testimonials_tag: "Testimonios",
    testimonials_h2a: "Lo que dicen nuestros",
    testimonials_h2b: "clientes",
    testimonials_sub: "Resultados reales de negocios reales. La historia de éxito de quien confió en nosotros.",
    testimonials_verified: "Cliente verificado",
    testimonials_highlight: "Presencia digital que genera confianza",
    testimonials_comment: "Llevábamos años con una web que no representaba para nada lo que somos como empresa. Desde el primer día el equipo entendió nuestra propuesta: consultoría estratégica seria, con presencia digital a la altura. El resultado superó lo que esperábamos: más visibilidad, más consultas de calidad y, sobre todo, una imagen que ahora sí transmite confianza a nuestros clientes corporativos. En menos de dos meses notamos el cambio. Totalmente recomendados.",

    // CTA
    cta_tag: "Primera consulta completamente gratis",
    cta_h2a: "¿Listo para llevar tu",
    cta_h2b: "negocio al siguiente nivel?",
    cta_sub: "Llevamos tu negocio al mundo digital con diseño profesional, velocidad y resultados reales. Tu primera consulta es completamente gratis.",
    cta_btn1: "Comenzar mi proyecto hoy",
    cta_btn2: "Chatear por WhatsApp",
    cta_trust1: "Sin contrato largo",
    cta_trust2: "Primera consulta gratis",
    cta_trust3: "Garantía de satisfacción",
    cta_trust4: "Soporte incluido",

    // Quote form
    quote_tag: "Cotización gratuita",
    quote_h2a: "Cuéntanos tu",
    quote_h2b: "proyecto",
    quote_sub: "Calculamos el precio en tiempo real según lo que necesitas.",
    quote_step1: "Sobre ti y tu empresa",
    quote_step2: "Tu sitio web",
    quote_step3: "Últimos detalles",
    quote_name: "Tu nombre",
    quote_company: "Nombre de tu empresa",
    quote_sector: "¿A qué se dedica tu empresa?",
    quote_sector_ph: "Ej: Consultoría, ropa, restaurante...",
    quote_email: "Email de contacto",
    quote_whatsapp: "WhatsApp (opcional)",
    quote_site_type: "¿Qué tipo de sitio necesitas?",
    quote_pages: "¿Cuántas páginas / secciones?",
    quote_features: "¿Qué funcionalidades extra necesitas?",
    quote_urgency: "¿Cuándo lo necesitas?",
    quote_content: "¿Tienes textos y logo listos? (Las imágenes las creamos con IA)",
    quote_notes: "Cuéntanos más sobre tu proyecto (opcional)",
    quote_notes_ph: "¿Tienes referentes de diseño? ¿Colores de tu marca? ¿Algo específico?",
    quote_next: "Siguiente",
    quote_back: "Atrás",
    quote_send: "Enviar cotización",
    quote_sending: "Enviando...",
    quote_estimate_label: "Estimado preliminar",
    quote_estimate_note: "La cotización final puede variar según los detalles específicos de tu proyecto.",
    quote_success_title: "¡Solicitud recibida!",
    quote_success_sub: "Te contactamos en menos de 24 horas por email o WhatsApp con tu propuesta personalizada.",
    quote_success_estimate: "Tu estimado",
    quote_error: "Error al enviar. Escríbenos directo a",
    quote_send_another: "Enviar otra cotización",
    quote_site_landing: "Landing Page",
    quote_site_corporate: "Sitio Corporativo",
    quote_site_ecommerce: "Tienda Online",
    quote_site_restaurant: "Restaurante",
    quote_site_custom: "Otro",
    quote_feat_blog: "Blog",
    quote_feat_payments: "Pagos en línea",
    quote_feat_booking: "Reservas online",
    quote_feat_chat: "Chat en vivo",
    quote_feat_multilang: "Multilenguaje",
    quote_feat_portal: "Portal de clientes",
    quote_feat_seo: "SEO avanzado",
    quote_urg_urgent: "Urgente — menos de 1 semana",
    quote_urg_normal: "Normal — 2 a 3 semanas",
    quote_urg_relaxed: "Sin prisa — más de 1 mes",
    quote_cont_yes: "Sí, tengo textos y logo",
    quote_cont_partial: "Tengo algo, falta texto o logo",
    quote_cont_no: "No, necesito ayuda con todo",

    // Footer
    footer_desc: "Creamos páginas web profesionales que convierten visitantes en clientes. Diseño, desarrollo y SEO para hacer crecer tu negocio.",
    footer_services: "Servicios",
    footer_company: "Empresa",
    footer_legal: "Legal",
    footer_about: "Nosotros",
    footer_portfolio: "Portafolio",
    footer_testimonials: "Testimonios",
    footer_blog: "Blog",
    footer_privacy: "Política de Privacidad",
    footer_terms: "Términos de Servicio",
    footer_cookies: "Cookies",
    footer_rights: "Todos los derechos reservados.",
    footer_made: "Hecho con",
    footer_in: "en Colombia 🇨🇴",
    scroll: "Scroll",
  },

  en: {
    nav_inicio: "Home", nav_servicios: "Services", nav_portafolio: "Portfolio",
    nav_nosotros: "About", nav_contacto: "Contact", nav_cta: "Get a quote",
    hero_badge: "Professional Web Design Agency",
    hero_h1a: "We build websites that", hero_h1b: "turn visitors", hero_h1c: "into customers",
    hero_sub: "We design and develop high-impact digital experiences that drive your business growth. Fast, modern and optimized for results.",
    hero_feat1: "Delivered in 7-14 days", hero_feat2: "100% custom design", hero_feat3: "SEO included from day 1",
    hero_cta1: "Get a free quote", hero_cta2: "View portfolio",
    hero_speed: "Speed", hero_speed_val: "Lighthouse 98+", hero_conv: "Conversion", hero_conv_val: "+340% more leads",
    portfolio_tag: "Our work", portfolio_h2a: "Projects that", portfolio_h2b: "speak for themselves",
    portfolio_sub: "Every project is a tailored solution designed to maximize results and exceed expectations.",
    portfolio_category: "Corporate Website",
    portfolio_desc: "Digital presence worthy of a strategic consultancy with 20+ years of experience. Fast, professional site optimized to attract corporate clients.",
    services_tag: "What we do?", services_h2a: "Services designed to", services_h2b: "grow", services_h2c: "your business",
    services_sub: "End-to-end digital solutions so your company stands out, converts and scales online.",
    svc1_title: "Professional Web Design", svc1_desc: "We create modern, fast, optimized websites that reflect your brand and generate real results.", svc1_f1: "Mobile First", svc1_f2: "Ultra fast", svc1_f3: "Unique design",
    svc2_title: "Online Stores", svc2_desc: "Complete e-commerce with inventory management, secure payment gateway and UX optimized to maximize your sales.", svc2_f1: "Secure payments", svc2_f2: "Admin panel", svc2_f3: "Multi-product",
    svc3_title: "Advanced SEO", svc3_desc: "We position your business at the top of Google results with technical and content SEO strategies.", svc3_f1: "Technical SEO", svc3_f2: "Content", svc3_f3: "Analytics",
    svc4_title: "Automation", svc4_desc: "We automate repetitive business processes with smart integrations that save time and money.", svc4_f1: "CRM integrated", svc4_f2: "AI included", svc4_f3: "Workflows",
    svc5_title: "Landing Pages", svc5_desc: "High-conversion landing pages designed to capture leads and close sales effectively.", svc5_f1: "A/B Testing", svc5_f2: "High conversion", svc5_f3: "Remarketing",
    services_idea: "Got a project in mind?", services_idea_sub: "Tell us your idea and we'll prepare a personalized proposal at no cost.", services_idea_cta: "Start a conversation →",
    benefits_tag: "Why us?", benefits_h2a: "Everything your business", benefits_h2b: "needs to grow",
    ben1_tag: "More clients", ben1_title: "Design that turns visitors into buyers", ben1_desc: "We create conversion-focused web experiences. Every element is designed to guide the user toward the action your business needs.", ben1_p1: "Conversion-optimized UX", ben1_p2: "Strategic calls to action", ben1_p3: "Integrated sales funnel",
    ben2_tag: "Faster", ben2_title: "Loading speed that beats your competition", ben2_desc: "53% of users abandon a site if it takes more than 3 seconds to load. Our sites score 95+ on Google PageSpeed.", ben2_p1: "Lighthouse score 95+", ben2_p2: "WebP/AVIF optimized images", ben2_p3: "Global CDN included",
    ben3_tag: "More trust", ben3_title: "Hosting, deployment and support that gives you peace of mind", ben3_desc: "Your site goes live from day one. We handle hosting, deployment and maintenance. And when you need help, we're here.", ben3_p1: "Hosting & deployment included", ben3_p2: "Daily automatic backups", ben3_p3: "Priority support 7 days",
    benefits_cta: "Learn more",
    testimonials_tag: "Testimonials", testimonials_h2a: "What our", testimonials_h2b: "clients say",
    testimonials_sub: "Real results from real businesses. The success story of those who trusted us.",
    testimonials_verified: "Verified client", testimonials_highlight: "Digital presence that builds trust",
    testimonials_comment: "We had a website for years that didn't represent what we are as a company at all. From day one the team understood our pitch: serious strategic consulting, with a digital presence to match. The result exceeded our expectations: more visibility, higher quality inquiries and above all, an image that now truly conveys trust to our corporate clients. We noticed the difference in less than two months. Highly recommended.",
    cta_tag: "First consultation completely free",
    cta_h2a: "Ready to take your", cta_h2b: "business to the next level?",
    cta_sub: "We bring your business to the digital world with professional design, speed and real results. Your first consultation is completely free.",
    cta_btn1: "Start my project today", cta_btn2: "Chat on WhatsApp",
    cta_trust1: "No long contract", cta_trust2: "First consultation free", cta_trust3: "Satisfaction guarantee", cta_trust4: "Support included",
    quote_tag: "Free quote", quote_h2a: "Tell us about your", quote_h2b: "project",
    quote_sub: "We calculate the price in real time based on what you need.",
    quote_step1: "About you and your company", quote_step2: "Your website", quote_step3: "Final details",
    quote_name: "Your name", quote_company: "Company name", quote_sector: "What does your company do?",
    quote_sector_ph: "E.g.: Consulting, clothing, restaurant...", quote_email: "Contact email", quote_whatsapp: "WhatsApp (optional)",
    quote_site_type: "What type of site do you need?", quote_pages: "How many pages / sections?",
    quote_features: "What extra features do you need?", quote_urgency: "When do you need it?",
    quote_content: "Do you have texts and logo ready? (Images are AI-generated)",
    quote_notes: "Tell us more about your project (optional)", quote_notes_ph: "Design references? Brand colors? Anything specific?",
    quote_next: "Next", quote_back: "Back", quote_send: "Send quote", quote_sending: "Sending...",
    quote_estimate_label: "Preliminary estimate", quote_estimate_note: "Final quote may vary based on specific project details.",
    quote_success_title: "Request received!", quote_success_sub: "We'll contact you within 24 hours by email or WhatsApp with your personalized proposal.",
    quote_success_estimate: "Your estimate", quote_error: "Error sending. Write to us directly at",
    quote_send_another: "Send another quote",
    quote_site_landing: "Landing Page", quote_site_corporate: "Corporate Site", quote_site_ecommerce: "Online Store", quote_site_restaurant: "Restaurant", quote_site_custom: "Other",
    quote_feat_blog: "Blog", quote_feat_payments: "Online payments", quote_feat_booking: "Online booking", quote_feat_chat: "Live chat", quote_feat_multilang: "Multilanguage", quote_feat_portal: "Client portal", quote_feat_seo: "Advanced SEO",
    quote_urg_urgent: "Urgent — less than 1 week", quote_urg_normal: "Normal — 2 to 3 weeks", quote_urg_relaxed: "No rush — over 1 month",
    quote_cont_yes: "Yes, I have texts and logo", quote_cont_partial: "I have some, missing text or logo", quote_cont_no: "No, I need help with everything",
    footer_desc: "We build professional websites that turn visitors into clients. Design, development and SEO to grow your business.",
    footer_services: "Services", footer_company: "Company", footer_legal: "Legal",
    footer_about: "About", footer_portfolio: "Portfolio", footer_testimonials: "Testimonials", footer_blog: "Blog",
    footer_privacy: "Privacy Policy", footer_terms: "Terms of Service", footer_cookies: "Cookies",
    footer_rights: "All rights reserved.", footer_made: "Made with", footer_in: "in Colombia 🇨🇴", scroll: "Scroll",
  },

  pt: {
    nav_inicio: "Início", nav_servicios: "Serviços", nav_portafolio: "Portfólio",
    nav_nosotros: "Sobre nós", nav_contacto: "Contato", nav_cta: "Solicitar orçamento",
    hero_badge: "Agência de Design Web Profissional",
    hero_h1a: "Criamos sites que", hero_h1b: "convertem visitantes", hero_h1c: "em clientes",
    hero_sub: "Desenvolvemos experiências digitais de alto impacto que impulsionam o crescimento do seu negócio. Rápido, moderno e otimizado para resultados.",
    hero_feat1: "Entrega em 7-14 dias", hero_feat2: "Design 100% personalizado", hero_feat3: "SEO incluído desde o dia 1",
    hero_cta1: "Solicitar orçamento grátis", hero_cta2: "Ver portfólio",
    hero_speed: "Velocidade", hero_speed_val: "Lighthouse 98+", hero_conv: "Conversão", hero_conv_val: "+340% mais leads",
    portfolio_tag: "Nosso trabalho", portfolio_h2a: "Projetos que", portfolio_h2b: "falam por si mesmos",
    portfolio_sub: "Cada projeto é uma solução sob medida, projetada para maximizar resultados.",
    portfolio_category: "Site Corporativo",
    portfolio_desc: "Presença digital à altura de uma consultoria estratégica com mais de 20 anos de experiência. Site rápido, profissional e otimizado.",
    services_tag: "O que fazemos?", services_h2a: "Serviços criados para", services_h2b: "crescer", services_h2c: "seu negócio",
    services_sub: "Soluções digitais completas para que sua empresa se destaque, converta e escale online.",
    svc1_title: "Design Web Profissional", svc1_desc: "Criamos sites modernos, rápidos e otimizados que refletem a essência da sua marca.", svc1_f1: "Mobile First", svc1_f2: "Ultra rápido", svc1_f3: "Design único",
    svc2_title: "Lojas Online", svc2_desc: "E-commerce completo com gestão de estoque, gateway de pagamento seguro e UX otimizada.", svc2_f1: "Pagamentos seguros", svc2_f2: "Painel admin", svc2_f3: "Multi-produto",
    svc3_title: "SEO Avançado", svc3_desc: "Posicionamos seu negócio nos primeiros resultados do Google com estratégias SEO técnicas.", svc3_f1: "SEO técnico", svc3_f2: "Conteúdo", svc3_f3: "Analytics",
    svc4_title: "Automação", svc4_desc: "Automatizamos processos repetitivos com integrações inteligentes que economizam tempo.", svc4_f1: "CRM integrado", svc4_f2: "IA incluída", svc4_f3: "Workflows",
    svc5_title: "Landing Pages", svc5_desc: "Páginas de alta conversão projetadas para capturar leads e fechar vendas efetivamente.", svc5_f1: "A/B Testing", svc5_f2: "Alta conversão", svc5_f3: "Remarketing",
    services_idea: "Tem um projeto em mente?", services_idea_sub: "Nos conte sua ideia e preparamos uma proposta personalizada sem custo.", services_idea_cta: "Iniciar conversa →",
    benefits_tag: "Por que nós?", benefits_h2a: "Tudo o que seu negócio", benefits_h2b: "precisa para crescer",
    ben1_tag: "Mais clientes", ben1_title: "Design que converte visitantes em compradores", ben1_desc: "Criamos experiências focadas em conversão. Cada elemento é projetado para guiar o usuário à ação.", ben1_p1: "UX otimizada para conversão", ben1_p2: "Chamadas à ação estratégicas", ben1_p3: "Funil de vendas integrado",
    ben2_tag: "Mais rápido", ben2_title: "Velocidade de carregamento que supera sua concorrência", ben2_desc: "53% dos usuários abandonam um site se demorar mais de 3 segundos. Nossos sites alcançam 95+ no PageSpeed.", ben2_p1: "Lighthouse score 95+", ben2_p2: "Imagens otimizadas WebP/AVIF", ben2_p3: "CDN global incluído",
    ben3_tag: "Mais confiança", ben3_title: "Hospedagem, deploy e suporte para sua tranquilidade", ben3_desc: "Seu site fica no ar desde o primeiro dia. Cuidamos da hospedagem, deploy e manutenção.", ben3_p1: "Hospedagem e deploy incluídos", ben3_p2: "Backups automáticos diários", ben3_p3: "Suporte prioritário 7 dias",
    benefits_cta: "Saiba mais",
    testimonials_tag: "Depoimentos", testimonials_h2a: "O que nossos", testimonials_h2b: "clientes dizem",
    testimonials_sub: "Resultados reais de negócios reais. A história de sucesso de quem confiou em nós.",
    testimonials_verified: "Cliente verificado", testimonials_highlight: "Presença digital que gera confiança",
    testimonials_comment: "Tínhamos um site que não representava o que somos como empresa. Desde o primeiro dia a equipe entendeu nossa proposta. O resultado superou o que esperávamos: mais visibilidade, mais consultas de qualidade e uma imagem que transmite confiança. Em menos de dois meses sentimos a diferença. Totalmente recomendados.",
    cta_tag: "Primeira consulta completamente gratuita",
    cta_h2a: "Pronto para levar seu", cta_h2b: "negócio ao próximo nível?",
    cta_sub: "Levamos seu negócio ao mundo digital com design profissional, velocidade e resultados reais.",
    cta_btn1: "Começar meu projeto hoje", cta_btn2: "Conversar no WhatsApp",
    cta_trust1: "Sem contrato longo", cta_trust2: "Primeira consulta grátis", cta_trust3: "Garantia de satisfação", cta_trust4: "Suporte incluído",
    quote_tag: "Orçamento gratuito", quote_h2a: "Nos conte sobre seu", quote_h2b: "projeto",
    quote_sub: "Calculamos o preço em tempo real com base no que você precisa.",
    quote_step1: "Sobre você e sua empresa", quote_step2: "Seu site", quote_step3: "Últimos detalhes",
    quote_name: "Seu nome", quote_company: "Nome da empresa", quote_sector: "O que sua empresa faz?",
    quote_sector_ph: "Ex: Consultoria, roupas, restaurante...", quote_email: "E-mail de contato", quote_whatsapp: "WhatsApp (opcional)",
    quote_site_type: "Que tipo de site você precisa?", quote_pages: "Quantas páginas / seções?",
    quote_features: "Quais funcionalidades extras você precisa?", quote_urgency: "Quando você precisa?",
    quote_content: "Você tem textos e logo prontos? (Imagens criadas com IA)",
    quote_notes: "Conte-nos mais sobre seu projeto (opcional)", quote_notes_ph: "Referências de design? Cores da marca? Algo específico?",
    quote_next: "Próximo", quote_back: "Voltar", quote_send: "Enviar orçamento", quote_sending: "Enviando...",
    quote_estimate_label: "Estimativa preliminar", quote_estimate_note: "O orçamento final pode variar conforme os detalhes específicos do projeto.",
    quote_success_title: "Solicitação recebida!", quote_success_sub: "Entraremos em contato em até 24 horas por e-mail ou WhatsApp com sua proposta personalizada.",
    quote_success_estimate: "Sua estimativa", quote_error: "Erro ao enviar. Escreva diretamente para",
    quote_send_another: "Enviar outro orçamento",
    quote_site_landing: "Landing Page", quote_site_corporate: "Site Corporativo", quote_site_ecommerce: "Loja Online", quote_site_restaurant: "Restaurante", quote_site_custom: "Outro",
    quote_feat_blog: "Blog", quote_feat_payments: "Pagamentos online", quote_feat_booking: "Reservas online", quote_feat_chat: "Chat ao vivo", quote_feat_multilang: "Multilíngue", quote_feat_portal: "Portal de clientes", quote_feat_seo: "SEO avançado",
    quote_urg_urgent: "Urgente — menos de 1 semana", quote_urg_normal: "Normal — 2 a 3 semanas", quote_urg_relaxed: "Sem pressa — mais de 1 mês",
    quote_cont_yes: "Sim, tenho textos e logo", quote_cont_partial: "Tenho algo, falta texto ou logo", quote_cont_no: "Não, preciso de ajuda com tudo",
    footer_desc: "Criamos sites profissionais que convertem visitantes em clientes. Design, desenvolvimento e SEO para crescer seu negócio.",
    footer_services: "Serviços", footer_company: "Empresa", footer_legal: "Legal",
    footer_about: "Sobre nós", footer_portfolio: "Portfólio", footer_testimonials: "Depoimentos", footer_blog: "Blog",
    footer_privacy: "Política de Privacidade", footer_terms: "Termos de Serviço", footer_cookies: "Cookies",
    footer_rights: "Todos os direitos reservados.", footer_made: "Feito com", footer_in: "na Colômbia 🇨🇴", scroll: "Scroll",
  },

  fr: {
    nav_inicio: "Accueil", nav_servicios: "Services", nav_portafolio: "Portfolio",
    nav_nosotros: "À propos", nav_contacto: "Contact", nav_cta: "Demander un devis",
    hero_badge: "Agence de Conception Web Professionnelle",
    hero_h1a: "Nous créons des sites web qui", hero_h1b: "convertissent les visiteurs", hero_h1c: "en clients",
    hero_sub: "Nous concevons des expériences numériques à fort impact qui stimulent la croissance de votre entreprise. Rapide, moderne et optimisé pour les résultats.",
    hero_feat1: "Livraison en 7-14 jours", hero_feat2: "Design 100% personnalisé", hero_feat3: "SEO inclus dès le jour 1",
    hero_cta1: "Demander un devis gratuit", hero_cta2: "Voir le portfolio",
    hero_speed: "Vitesse", hero_speed_val: "Lighthouse 98+", hero_conv: "Conversion", hero_conv_val: "+340% de leads",
    portfolio_tag: "Notre travail", portfolio_h2a: "Des projets qui", portfolio_h2b: "parlent d'eux-mêmes",
    portfolio_sub: "Chaque projet est une solution sur mesure, conçue pour maximiser les résultats.",
    portfolio_category: "Site d'entreprise",
    portfolio_desc: "Présence digitale à la hauteur d'un cabinet de conseil stratégique avec plus de 20 ans d'expérience. Site rapide, professionnel et optimisé.",
    services_tag: "Ce que nous faisons", services_h2a: "Services conçus pour", services_h2b: "développer", services_h2c: "votre entreprise",
    services_sub: "Solutions numériques complètes pour que votre entreprise se démarque et convertisse.",
    svc1_title: "Conception Web Pro", svc1_desc: "Nous créons des sites modernes, rapides et optimisés qui reflètent l'essence de votre marque.", svc1_f1: "Mobile First", svc1_f2: "Ultra rapide", svc1_f3: "Design unique",
    svc2_title: "Boutiques en ligne", svc2_desc: "E-commerce complet avec gestion des stocks, passerelle de paiement sécurisée et UX optimisée.", svc2_f1: "Paiements sécurisés", svc2_f2: "Panel admin", svc2_f3: "Multi-produit",
    svc3_title: "SEO Avancé", svc3_desc: "Nous positionnons votre entreprise en tête de Google avec des stratégies SEO techniques.", svc3_f1: "SEO technique", svc3_f2: "Contenu", svc3_f3: "Analytics",
    svc4_title: "Automatisation", svc4_desc: "Nous automatisons les processus répétitifs avec des intégrations intelligentes.", svc4_f1: "CRM intégré", svc4_f2: "IA incluse", svc4_f3: "Workflows",
    svc5_title: "Pages d'atterrissage", svc5_desc: "Pages haute conversion conçues pour capturer des leads et conclure des ventes.", svc5_f1: "A/B Testing", svc5_f2: "Haute conversion", svc5_f3: "Remarketing",
    services_idea: "Vous avez un projet?", services_idea_sub: "Partagez votre idée et nous préparons une proposition personnalisée sans engagement.", services_idea_cta: "Commencer la conversation →",
    benefits_tag: "Pourquoi nous?", benefits_h2a: "Tout ce dont votre entreprise", benefits_h2b: "a besoin pour croître",
    ben1_tag: "Plus de clients", ben1_title: "Design qui convertit les visiteurs en acheteurs", ben1_desc: "Nous créons des expériences web axées sur la conversion.", ben1_p1: "UX optimisée pour la conversion", ben1_p2: "Appels à l'action stratégiques", ben1_p3: "Entonnoir de vente intégré",
    ben2_tag: "Plus rapide", ben2_title: "Vitesse de chargement qui surpasse la concurrence", ben2_desc: "53% des utilisateurs quittent un site s'il met plus de 3 secondes à charger. Nos sites atteignent 95+ sur PageSpeed.", ben2_p1: "Lighthouse score 95+", ben2_p2: "Images optimisées WebP/AVIF", ben2_p3: "CDN mondial inclus",
    ben3_tag: "Plus de confiance", ben3_title: "Hébergement, déploiement et support pour votre tranquillité", ben3_desc: "Votre site est en ligne dès le premier jour. Nous gérons l'hébergement, le déploiement et la maintenance.", ben3_p1: "Hébergement et déploiement inclus", ben3_p2: "Sauvegardes automatiques quotidiennes", ben3_p3: "Support prioritaire 7 jours",
    benefits_cta: "En savoir plus",
    testimonials_tag: "Témoignages", testimonials_h2a: "Ce que disent nos", testimonials_h2b: "clients",
    testimonials_sub: "Résultats réels d'entreprises réelles. L'histoire de succès de ceux qui nous ont fait confiance.",
    testimonials_verified: "Client vérifié", testimonials_highlight: "Présence digitale qui inspire confiance",
    testimonials_comment: "Nous avions un site web qui ne représentait pas du tout ce que nous sommes. Dès le premier jour, l'équipe a compris notre proposition. Le résultat a dépassé nos attentes : plus de visibilité, des consultations de meilleure qualité et une image qui inspire confiance. En moins de deux mois, nous avons remarqué la différence. Totalement recommandés.",
    cta_tag: "Première consultation entièrement gratuite",
    cta_h2a: "Prêt à emmener votre", cta_h2b: "entreprise au niveau supérieur?",
    cta_sub: "Nous amenons votre entreprise dans le monde numérique avec un design professionnel, de la vitesse et de vrais résultats.",
    cta_btn1: "Commencer mon projet", cta_btn2: "Chatter sur WhatsApp",
    cta_trust1: "Sans contrat long", cta_trust2: "Première consultation gratuite", cta_trust3: "Garantie de satisfaction", cta_trust4: "Support inclus",
    quote_tag: "Devis gratuit", quote_h2a: "Parlez-nous de votre", quote_h2b: "projet",
    quote_sub: "Nous calculons le prix en temps réel selon vos besoins.",
    quote_step1: "À propos de vous", quote_step2: "Votre site web", quote_step3: "Derniers détails",
    quote_name: "Votre nom", quote_company: "Nom de l'entreprise", quote_sector: "Que fait votre entreprise?",
    quote_sector_ph: "Ex: Conseil, vêtements, restaurant...", quote_email: "Email de contact", quote_whatsapp: "WhatsApp (optionnel)",
    quote_site_type: "De quel type de site avez-vous besoin?", quote_pages: "Combien de pages / sections?",
    quote_features: "Quelles fonctionnalités supplémentaires?", quote_urgency: "Quand en avez-vous besoin?",
    quote_content: "Avez-vous les textes et le logo prêts ? (Les images sont générées par IA)",
    quote_notes: "Dites-nous en plus (optionnel)", quote_notes_ph: "Références de design? Couleurs de marque? Quelque chose de spécifique?",
    quote_next: "Suivant", quote_back: "Retour", quote_send: "Envoyer le devis", quote_sending: "Envoi...",
    quote_estimate_label: "Estimation préliminaire", quote_estimate_note: "Le devis final peut varier selon les détails spécifiques.",
    quote_success_title: "Demande reçue!", quote_success_sub: "Nous vous contacterons dans les 24 heures par email ou WhatsApp.",
    quote_success_estimate: "Votre estimation", quote_error: "Erreur d'envoi. Écrivez-nous directement à",
    quote_send_another: "Envoyer un autre devis",
    quote_site_landing: "Page d'atterrissage", quote_site_corporate: "Site d'entreprise", quote_site_ecommerce: "Boutique en ligne", quote_site_restaurant: "Restaurant", quote_site_custom: "Autre",
    quote_feat_blog: "Blog", quote_feat_payments: "Paiements en ligne", quote_feat_booking: "Réservations", quote_feat_chat: "Chat en direct", quote_feat_multilang: "Multilingue", quote_feat_portal: "Portail clients", quote_feat_seo: "SEO avancé",
    quote_urg_urgent: "Urgent — moins d'1 semaine", quote_urg_normal: "Normal — 2 à 3 semaines", quote_urg_relaxed: "Sans presse — plus d'1 mois",
    quote_cont_yes: "Oui, j'ai les textes et le logo", quote_cont_partial: "J'en ai une partie", quote_cont_no: "Non, j'ai besoin d'aide",
    footer_desc: "Nous créons des sites professionnels qui convertissent les visiteurs en clients.",
    footer_services: "Services", footer_company: "Entreprise", footer_legal: "Légal",
    footer_about: "À propos", footer_portfolio: "Portfolio", footer_testimonials: "Témoignages", footer_blog: "Blog",
    footer_privacy: "Politique de confidentialité", footer_terms: "Conditions d'utilisation", footer_cookies: "Cookies",
    footer_rights: "Tous droits réservés.", footer_made: "Fait avec", footer_in: "en Colombie 🇨🇴", scroll: "Défiler",
  },

  de: {
    nav_inicio: "Start", nav_servicios: "Leistungen", nav_portafolio: "Portfolio",
    nav_nosotros: "Über uns", nav_contacto: "Kontakt", nav_cta: "Angebot anfordern",
    hero_badge: "Professionelle Webdesign-Agentur",
    hero_h1a: "Wir bauen Websites, die", hero_h1b: "Besucher", hero_h1c: "in Kunden verwandeln",
    hero_sub: "Wir entwickeln digitale Erfahrungen mit hoher Wirkung, die das Wachstum Ihres Unternehmens antreiben. Schnell, modern und ergebnisorientiert.",
    hero_feat1: "Lieferung in 7-14 Tagen", hero_feat2: "100% individuelles Design", hero_feat3: "SEO ab Tag 1 inklusive",
    hero_cta1: "Kostenloses Angebot", hero_cta2: "Portfolio ansehen",
    hero_speed: "Geschwindigkeit", hero_speed_val: "Lighthouse 98+", hero_conv: "Konversion", hero_conv_val: "+340% mehr Leads",
    portfolio_tag: "Unsere Arbeit", portfolio_h2a: "Projekte, die", portfolio_h2b: "für sich sprechen",
    portfolio_sub: "Jedes Projekt ist eine maßgeschneiderte Lösung, die auf maximale Ergebnisse ausgelegt ist.",
    portfolio_category: "Unternehmenswebsite",
    portfolio_desc: "Digitale Präsenz für eine strategische Unternehmensberatung mit über 20 Jahren Erfahrung. Schnell, professionell und optimiert.",
    services_tag: "Was wir tun", services_h2a: "Leistungen für das", services_h2b: "Wachstum", services_h2c: "Ihres Unternehmens",
    services_sub: "End-to-End digitale Lösungen, damit Ihr Unternehmen heraussticht und skaliert.",
    svc1_title: "Professionelles Webdesign", svc1_desc: "Wir erstellen moderne, schnelle und optimierte Websites, die Ihre Marke widerspiegeln.", svc1_f1: "Mobile First", svc1_f2: "Ultraschnell", svc1_f3: "Einzigartiges Design",
    svc2_title: "Online-Shops", svc2_desc: "Vollständiger E-Commerce mit Lagerverwaltung, sicherem Zahlungsgateway und optimierter UX.", svc2_f1: "Sichere Zahlungen", svc2_f2: "Admin-Panel", svc2_f3: "Multi-Produkt",
    svc3_title: "Erweitertes SEO", svc3_desc: "Wir positionieren Ihr Unternehmen in den Top-Ergebnissen von Google.", svc3_f1: "Technisches SEO", svc3_f2: "Content", svc3_f3: "Analytics",
    svc4_title: "Automatisierung", svc4_desc: "Wir automatisieren repetitive Prozesse mit intelligenten Integrationen.", svc4_f1: "CRM integriert", svc4_f2: "KI inklusive", svc4_f3: "Workflows",
    svc5_title: "Landing Pages", svc5_desc: "Hochkonvertierende Landingpages für die Leadgenerierung und Verkaufsabschlüsse.", svc5_f1: "A/B Testing", svc5_f2: "Hohe Konversion", svc5_f3: "Remarketing",
    services_idea: "Haben Sie ein Projekt?", services_idea_sub: "Teilen Sie Ihre Idee mit und wir erstellen ein individuelles Angebot ohne Kosten.", services_idea_cta: "Gespräch starten →",
    benefits_tag: "Warum wir?", benefits_h2a: "Alles, was Ihr Unternehmen", benefits_h2b: "zum Wachsen braucht",
    ben1_tag: "Mehr Kunden", ben1_title: "Design, das Besucher in Käufer verwandelt", ben1_desc: "Wir schaffen konversionsorientierte Web-Erfahrungen.", ben1_p1: "Konversionsoptimierte UX", ben1_p2: "Strategische Handlungsaufforderungen", ben1_p3: "Integrierter Verkaufstrichter",
    ben2_tag: "Schneller", ben2_title: "Ladegeschwindigkeit, die Ihre Konkurrenz übertrifft", ben2_desc: "53% der Nutzer verlassen eine Seite, wenn sie länger als 3 Sekunden lädt. Unsere Sites erreichen 95+ beim PageSpeed.", ben2_p1: "Lighthouse Score 95+", ben2_p2: "WebP/AVIF optimierte Bilder", ben2_p3: "Globales CDN inklusive",
    ben3_tag: "Mehr Vertrauen", ben3_title: "Hosting, Deployment und Support für Ihre Sicherheit", ben3_desc: "Ihre Website ist ab dem ersten Tag live. Wir kümmern uns um Hosting, Deployment und Wartung.", ben3_p1: "Hosting & Deployment inklusive", ben3_p2: "Tägliche automatische Backups", ben3_p3: "Prioritäts-Support 7 Tage",
    benefits_cta: "Mehr erfahren",
    testimonials_tag: "Referenzen", testimonials_h2a: "Was unsere", testimonials_h2b: "Kunden sagen",
    testimonials_sub: "Echte Ergebnisse echter Unternehmen. Die Erfolgsgeschichte derer, die uns vertraut haben.",
    testimonials_verified: "Verifizierter Kunde", testimonials_highlight: "Digitale Präsenz, die Vertrauen weckt",
    testimonials_comment: "Wir hatten jahrelang eine Website, die uns überhaupt nicht repräsentierte. Vom ersten Tag an verstand das Team unsere Botschaft. Das Ergebnis übertraf unsere Erwartungen: mehr Sichtbarkeit, hochwertigere Anfragen und ein Image, das Vertrauen vermittelt. In weniger als zwei Monaten bemerkten wir den Unterschied. Absolut empfehlenswert.",
    cta_tag: "Erstes Gespräch vollständig kostenlos",
    cta_h2a: "Bereit, Ihr", cta_h2b: "Unternehmen auf die nächste Stufe zu bringen?",
    cta_sub: "Wir bringen Ihr Unternehmen in die digitale Welt mit professionellem Design, Geschwindigkeit und echten Ergebnissen.",
    cta_btn1: "Mein Projekt starten", cta_btn2: "Per WhatsApp chatten",
    cta_trust1: "Kein langer Vertrag", cta_trust2: "Erstgespräch kostenlos", cta_trust3: "Zufriedenheitsgarantie", cta_trust4: "Support inklusive",
    quote_tag: "Kostenloses Angebot", quote_h2a: "Erzählen Sie uns von Ihrem", quote_h2b: "Projekt",
    quote_sub: "Wir berechnen den Preis in Echtzeit basierend auf Ihren Anforderungen.",
    quote_step1: "Über Sie und Ihr Unternehmen", quote_step2: "Ihre Website", quote_step3: "Letzte Details",
    quote_name: "Ihr Name", quote_company: "Unternehmensname", quote_sector: "Was macht Ihr Unternehmen?",
    quote_sector_ph: "Z.B.: Beratung, Kleidung, Restaurant...", quote_email: "Kontakt-E-Mail", quote_whatsapp: "WhatsApp (optional)",
    quote_site_type: "Welche Art von Website brauchen Sie?", quote_pages: "Wie viele Seiten / Abschnitte?",
    quote_features: "Welche Zusatzfunktionen benötigen Sie?", quote_urgency: "Wann brauchen Sie es?",
    quote_content: "Haben Sie Texte und Logo bereit? (Bilder werden mit KI erstellt)",
    quote_notes: "Erzählen Sie uns mehr (optional)", quote_notes_ph: "Designreferenzen? Markenfarben? Etwas Bestimmtes?",
    quote_next: "Weiter", quote_back: "Zurück", quote_send: "Angebot senden", quote_sending: "Senden...",
    quote_estimate_label: "Vorläufige Schätzung", quote_estimate_note: "Das endgültige Angebot kann je nach spezifischen Projektdetails variieren.",
    quote_success_title: "Anfrage erhalten!", quote_success_sub: "Wir melden uns innerhalb von 24 Stunden per E-Mail oder WhatsApp mit Ihrem persönlichen Angebot.",
    quote_success_estimate: "Ihre Schätzung", quote_error: "Fehler beim Senden. Schreiben Sie uns direkt an",
    quote_send_another: "Weiteres Angebot senden",
    quote_site_landing: "Landing Page", quote_site_corporate: "Unternehmenswebsite", quote_site_ecommerce: "Online-Shop", quote_site_restaurant: "Restaurant", quote_site_custom: "Sonstiges",
    quote_feat_blog: "Blog", quote_feat_payments: "Online-Zahlungen", quote_feat_booking: "Online-Buchungen", quote_feat_chat: "Live-Chat", quote_feat_multilang: "Mehrsprachig", quote_feat_portal: "Kundenportal", quote_feat_seo: "Erweitertes SEO",
    quote_urg_urgent: "Dringend — weniger als 1 Woche", quote_urg_normal: "Normal — 2 bis 3 Wochen", quote_urg_relaxed: "Kein Stress — über 1 Monat",
    quote_cont_yes: "Ja, ich habe Texte und Logo", quote_cont_partial: "Ich habe einiges, fehlt Text oder Logo", quote_cont_no: "Nein, ich brauche Hilfe",
    footer_desc: "Wir erstellen professionelle Websites, die Besucher in Kunden verwandeln.",
    footer_services: "Leistungen", footer_company: "Unternehmen", footer_legal: "Rechtliches",
    footer_about: "Über uns", footer_portfolio: "Portfolio", footer_testimonials: "Referenzen", footer_blog: "Blog",
    footer_privacy: "Datenschutzrichtlinie", footer_terms: "Nutzungsbedingungen", footer_cookies: "Cookies",
    footer_rights: "Alle Rechte vorbehalten.", footer_made: "Gemacht mit", footer_in: "in Kolumbien 🇨🇴", scroll: "Scrollen",
  },
};

// ─── Context ───────────────────────────────────────────────────────────────────
interface I18nCtx {
  lang: Lang;
  setLang: (l: Lang) => void;
  currency: Currency;
  setCurrency: (c: Currency) => void;
  t: T;
}

const I18nContext = createContext<I18nCtx>({} as I18nCtx);

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("es");
  const [currency, setCurrencyState] = useState<Currency>("COP");
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const detected = detectLang();
    setLangState(detected);
    const savedCur = localStorage.getItem("woxi_currency") as Currency | null;
    setCurrencyState(savedCur ?? LANG_CURRENCY[detected]);
    setReady(true);
  }, []);

  const setLang = (l: Lang) => {
    setLangState(l);
    localStorage.setItem("woxi_lang", l);
    if (!localStorage.getItem("woxi_currency")) {
      setCurrencyState(LANG_CURRENCY[l]);
    }
  };

  const setCurrency = (c: Currency) => {
    setCurrencyState(c);
    localStorage.setItem("woxi_currency", c);
  };

  if (!ready) return null;

  return (
    <I18nContext.Provider
      value={{ lang, setLang, currency, setCurrency, t: translations[lang] as T }}
    >
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  return useContext(I18nContext);
}
