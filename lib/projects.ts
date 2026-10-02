export const projects = [
  {
    slug: "autocaravanas-bahia", title: "Autocaravanas Bahía",
    description: "Una web bilingüe para presentar una flota de autocaravanas y facilitar solicitudes de reserva.",
    image: "/portfolio/Autocaravanasbahia.webp", url: "https://www.autocaravanasbahia.es/",
    sector: "Alquiler de autocaravanas · Alicante", services: ["Diseño web", "Desarrollo web", "Contenido multiidioma"],
    challenge: "El visitante necesita conocer los vehículos y las condiciones del servicio antes de consultar disponibilidad. El proyecto reúne la presentación de la flota, información de rutas y una vía para solicitar una reserva.",
    work: ["Presentación de los vehículos y la actividad de alquiler.", "Contenido bilingüe para atender a públicos distintos.", "Mapa interactivo de rutas y solicitud de reserva."],
    value: "El recorrido conecta la información que necesita el viajero con la solicitud de reserva. La presentación de la flota y las rutas permite valorar el servicio antes de realizar una consulta.",
    service: "desarrollo-web",
  },
  {
    slug: "jardineria-el-cuetu", title: "Jardinería El Cuetu",
    description: "Una web de jardinería con identidad visual propia, galería de trabajos y formulario de contacto.",
    image: "/portfolio/cuetu.webp", url: "https://jardineria-elcuetu.vercel.app/",
    sector: "Servicios de jardinería", services: ["Diseño web", "Galería de proyectos", "Formulario de contacto"],
    challenge: "En un servicio de jardinería, enseñar trabajos ayuda al visitante a valorar la oferta. El proyecto combina una presentación visual de la actividad con una galería y un canal para consultar un trabajo concreto.",
    work: ["Diseño visual con referencias al entorno natural de la actividad.", "Galería para presentar trabajos de jardinería.", "Formulario de contacto integrado en el recorrido de la web."],
    value: "La estructura permite pasar de conocer la actividad y ver ejemplos a realizar una consulta. La galería ayuda a valorar el tipo de trabajo y el formulario facilita iniciar una conversación sobre el proyecto.",
    service: "diseno-web",
  },
] as const;
