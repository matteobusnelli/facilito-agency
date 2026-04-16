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
    badge: "Respuesta en 24h — sin compromiso",
    line1: "Lo digital",
    line2: "que realmente",
    line3: "necesitas.",
    description:
      "Sitios web, gestores y automatizaciones a medida para freelancers y pequeños negocios. Sin burocracia, sin sorpresas.",
    cta: "Pide un presupuesto",
    secondary: "Ver servicios",
    trust: ["Presupuesto gratuito", "Respuesta en 24h", "Precios fijos y transparentes"],
    stats: [
      { value: "50+", label: "Clientes satisfechos" },
      { value: "7d", label: "Entrega media" },
      { value: "100%", label: "Proyectos completados" },
    ],
  },
  services: {
    heading: "Lo que hacemos por ti",
    subheading: "Tres soluciones concretas. Sin complicaciones.",
    items: [
      {
        number: "01",
        title: "Sitios Web",
        tag: "Desde €499",
        description:
          "Un sitio profesional que te representa y atrae nuevos clientes. Responsive, rápido y fácil de actualizar.",
        highlights: ["Diseño personalizado", "Optimizado para Google", "CMS incluido"],
      },
      {
        number: "02",
        title: "Gestores a Medida",
        tag: "Por presupuesto",
        description:
          "Software diseñado para tu flujo de trabajo. Gestiona clientes, pedidos, inventario — sin hojas de cálculo.",
        highlights: ["Acceso desde cualquier dispositivo", "Datos seguros", "Escalable en el tiempo"],
      },
      {
        number: "03",
        title: "Automatizaciones",
        tag: "Ahorra horas cada semana",
        description:
          "Facturas automáticas, emails de seguimiento, informes. Automatiza las tareas que te roban tiempo cada día.",
        highlights: ["Integración con tus herramientas", "Flujos personalizados", "Soporte continuo"],
      },
    ],
  },
  why: {
    heading: "Por qué elegir Facilito",
    subheading:
      "Somos un pequeño equipo con un objetivo claro: ayudarte a obtener resultados sin complicarte la vida.",
    items: [
      {
        title: "Rápidos",
        description: "Del presupuesto a la entrega en tiempo récord. Sin esperas de meses.",
      },
      {
        title: "Claros",
        description: "Precios fijos, comunicación directa. Siempre sabes lo que estás pagando.",
      },
      {
        title: "A medida",
        description: "Sin plantillas de copia y pega. Cada proyecto nace de tus necesidades reales.",
      },
      {
        title: "Cercanos",
        description: "No desaparecemos tras la entrega. Estamos disponibles cuando nos necesitas.",
      },
    ],
  },
  process: {
    heading: "Cómo funciona",
    subheading: "Tres pasos de la idea al producto terminado.",
    steps: [
      {
        number: "01",
        title: "Cuéntanos qué necesitas",
        description:
          "Una llamada de 15 minutos o un mensaje. Sin compromiso. Entendemos tu proyecto y te enviamos un presupuesto gratuito.",
      },
      {
        number: "02",
        title: "Construimos juntos",
        description:
          "Diseñamos y desarrollamos manteniéndote informado en cada fase. Sin tecnicismos, solo avances concretos.",
      },
      {
        number: "03",
        title: "Vas online",
        description:
          "Entregamos, te formamos si hace falta y seguimos disponibles. Tu proyecto está listo para trabajar por ti.",
      },
    ],
  },
  testimonials: {
    heading: "Quienes ya han trabajado con nosotros",
    subheading: "No son nuestras palabras. Son las suyas.",
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
    heading: "Hablemos.",
    subheading:
      "Cuéntanos tu proyecto. Recibe un presupuesto gratuito en 24 horas. Sin compromiso, sin presión.",
    guarantee: "Presupuesto gratuito en 24h",
    noSpam: "Cero spam, cero presión de ventas",
    fastResponse: "Respuesta rápida y directa",
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
      submit: "Enviar solicitud",
      submitting: "Enviando...",
      successTitle: "¡Solicitud enviada!",
      successMessage:
        "Te responderemos en 24 horas. Revisa también tu carpeta de spam si no recibes noticias.",
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
