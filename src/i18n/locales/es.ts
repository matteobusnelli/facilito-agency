import type { Translations } from "./it";

export const es: Translations = {
  meta: {
    title: "Facilito Agency — Sitios Web, Gestores y Automatizaciones",
    description:
      "Creamos sitios web, gestores a medida y automatizaciones para freelancers y pequeños negocios. Presupuesto gratuito en 24h.",
  },
  nav: {
    services: "Servicios",
    process: "Cómo funciona",
    contact: "Contacto",
    cta: "Presupuesto gratis",
  },
  hero: {
    badge: "Solo 3 plazas disponibles este mes — respuesta en 24h",
    line1: "Tu sitio web",
    line2: "listo en 7 días,",
    line3: "desde €499.",
    description:
      "Hecho para ti, sin tecnicismos. Sitios web, gestores y automatizaciones para freelancers y pequeños negocios.",
    cta: "Obtén el presupuesto gratis",
    secondary: "Cómo funciona ↓",
    bookCall: "O reserva una llamada gratuita",
    trust: ["Presupuesto gratuito en 24h", "Precio fijo, sin sorpresas", "Online en 7 días"],
    stats: [
      { value: "50+", label: "Clientes satisfechos" },
      { value: "7d", label: "Entrega media" },
      { value: "€499", label: "Sitios web desde" },
    ],
  },
  services: {
    heading: "Lo que obtienes con nosotros",
    subheading: "Soluciones concretas. Precios fijos. Resultados en pocos días.",
    items: [
      {
        number: "01",
        title: "Sitio Web Profesional",
        tag: "Desde €499 · online en 7 días",
        description:
          "Un sitio que trabaja por ti: atrae clientes, comunica quién eres, funciona en cualquier dispositivo. Entregado en una semana.",
        highlights: ["Diseño a medida, nunca plantilla", "Optimizado para Google (SEO)", "CMS: actualízalo tú solo"],
        cta: "Quiero mi sitio web →",
      },
      {
        number: "02",
        title: "Gestor a Medida",
        tag: "Por presupuesto · desde €799",
        description:
          "Adiós hojas de cálculo. Clientes, pedidos, inventario — todo en un software pensado para tu forma de trabajar.",
        highlights: ["Acceso desde cualquier dispositivo", "Datos seguros en la nube", "Escalable en el tiempo"],
        cta: "Pedir presupuesto →",
      },
      {
        number: "03",
        title: "Automatizaciones",
        tag: "Ahorra 5+ horas a la semana",
        description:
          "Facturas automáticas, emails de seguimiento, informes. Deja de hacer manualmente lo que puede hacer un ordenador.",
        highlights: ["Se integra con tus herramientas", "Flujos completamente personalizados", "Soporte continuo"],
        cta: "Automatiza mi trabajo →",
      },
    ],
  },
  why: {
    heading: "Por qué elegir Facilito",
    subheading: "Un equipo pequeño, objetivos claros: resultados concretos en poco tiempo, sin estrés.",
    items: [
      {
        title: "Rápidos de verdad",
        description: "De la primera llamada al sitio online: menos de 7 días. No meses.",
      },
      {
        title: "Precios fijos",
        description: "€499 por el sitio base. Todo incluido. Cero costes ocultos.",
      },
      {
        title: "Hecho solo para ti",
        description: "Sin plantillas prefabricadas. Cada proyecto nace de tus necesidades reales.",
      },
      {
        title: "Siempre presentes",
        description: "No desaparecemos tras la entrega. Un contacto directo, siempre.",
      },
    ],
  },
  process: {
    heading: "Cómo funciona",
    subheading: "De la idea al lanzamiento en 3 pasos. Más sencillo de lo que crees.",
    steps: [
      {
        number: "01",
        title: "Cuéntanos tu proyecto",
        duration: "~15 min",
        description:
          "Una llamada rápida o un mensaje. Sin compromiso. Te enviamos un presupuesto gratuito en 24 horas.",
      },
      {
        number: "02",
        title: "Nosotros construimos todo",
        duration: "5–7 días",
        description:
          "Diseño, desarrollo, contenidos. Estamos en contacto en cada paso — sin tecnicismos, solo resultados.",
      },
      {
        number: "03",
        title: "Estás online",
        duration: "30 min setup",
        description:
          "Publicamos juntos. Te mostramos cómo gestionar el sitio en 30 minutos y seguimos disponibles.",
      },
    ],
  },
  testimonials: {
    heading: "Lo que dicen de nosotros",
    subheading: "Clientes reales. Resultados reales.",
    cta: "Únete a ellos — presupuesto gratis",
    items: [
      {
        name: "Marco R.",
        role: "Fotógrafo freelance",
        text: "En una semana estaba online con un sitio que me encanta. Rápidos, precisos, disponibles. No pedir más.",
        rating: 5,
      },
      {
        name: "Laura B.",
        role: "Dueña de centro de estética",
        text: "Automatizaron mis reservas y ahorro horas cada semana. Debería haberlo hecho antes.",
        rating: 5,
      },
      {
        name: "Alessandro T.",
        role: "Consultor financiero",
        text: "Por fin alguien que habla claro. El gestor es perfecto para mi forma de trabajar.",
        rating: 5,
      },
    ],
  },
  contact: {
    heading: "El presupuesto es gratis.",
    subheading:
      "Mándanos un mensaje — te responderemos en 24 horas con una oferta a medida. Sin spam, sin presión.",
    urgency: "Aceptando nuevos proyectos · plazas limitadas",
    guarantee: "Presupuesto gratuito en 24h",
    noSpam: "Cero spam, nunca",
    fastResponse: "Respuesta el mismo día",
    bookCall: "¿Prefieres hablar directamente?",
    bookCallCta: "Reserva una llamada",
    form: {
      name: "Nombre y apellido",
      namePlaceholder: "Juan García",
      email: "Email",
      emailPlaceholder: "juan@ejemplo.es",
      service: "¿Qué necesitas?",
      serviceOptions: [
        { value: "website", label: "Sitio web" },
        { value: "cms", label: "Gestor a medida" },
        { value: "automation", label: "Automatización" },
        { value: "other", label: "Otro / Todavía no lo sé" },
      ],
      message: "Cuéntanos el proyecto",
      messagePlaceholder: "Describe brevemente lo que buscas...",
      submit: "Envíame un presupuesto gratis",
      submitting: "Enviando...",
      successTitle: "¡Mensaje recibido!",
      successMessage:
        "Te responderemos en 24 horas. Revisa también tu carpeta de spam si no recibes noticias.",
      errorMessage: "Algo salió mal. Inténtalo de nuevo o escríbenos directamente.",
      sendAnother: "Enviar otra solicitud",
      errors: {
        nameRequired: "El nombre es obligatorio",
        emailInvalid: "Introduce un email válido",
        serviceRequired: "Selecciona un servicio",
        messageRequired: "Describe brevemente tu proyecto",
      },
    },
  },
  footer: {
    tagline: "Lo digital que realmente necesitas.",
    vatLabel: "IVA",
    vatNumber: "00000000000",
    rights: "Todos los derechos reservados.",
    email: "info@facilitoagency.it",
    links: {
      privacy: "Privacidad",
      terms: "Términos",
    },
  },
};
