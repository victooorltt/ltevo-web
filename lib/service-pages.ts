export interface ServicePage {
  slug: string;
  title: string;
  description: string;
  heading: string;
  intro: string;
  image: string;
  audience: string[];
  inclusions: { title: string; text: string }[];
  decisions: { title: string; text: string }[];
  faqs: { question: string; answer: string }[];
  related: { title: string; href: string }[];
}

export const servicePages: Record<string, ServicePage> = {
  hosting: {
    slug: "hosting",
    title: "Hosting gestionado en Oviedo y Asturias",
    description: "Alojamiento web con gestión técnica en Oviedo y Asturias. Revisamos servidor, migración, copias y soporte según tu web. Solicita una propuesta a medida.",
    heading: "Hosting gestionado en Oviedo y Asturias",
    intro: "Alojamos tu web con una gestión técnica que puedas delegar: configuración, migración, copias y atención a incidencias con un alcance definido. Desde Oviedo, ayudamos a empresas de Asturias y España a elegir recursos adecuados para su web, tienda o aplicación.",
    image: "/Hero-servicios-hosting.webp",
    audience: ["Negocios que buscan alojamiento web y un interlocutor técnico.", "Empresas que necesitan migrar su web, dominio o correo.", "Tiendas y aplicaciones que necesitan revisar recursos y continuidad."],
    inclusions: [
      { title: "Elegir el alojamiento adecuado", text: "Revisamos tecnología, catálogo, tráfico y conexiones externas para dimensionar el alojamiento. La propuesta identifica proveedor, recursos y costes: sabrás qué contratas para tu web corporativa, tienda o aplicación." },
      { title: "Preparar una migración", text: "Inventariamos archivos, base de datos, dominio, DNS y correo. Preparamos la nueva ubicación, comprobamos la web y planificamos el cambio con una vía de recuperación. El alcance distingue traslado de la web y migración del correo." },
      { title: "Configuración y continuidad", text: "Configuramos HTTPS y concretamos copias, retención, restauración y revisión de disponibilidad. La propuesta especifica qué datos se protegen, con qué frecuencia y cómo se atiende una recuperación." },
      { title: "Soporte con un alcance claro", text: "Tendrás un contacto técnico para tramitar incidencias del alojamiento. Definimos canales y atención, y coordinamos lo necesario con el proveedor. Las actualizaciones de la web y nuevas funciones se identifican por separado." },
    ],
    decisions: [
      { title: "Hosting y mantenimiento: dos costes distintos", text: "El hosting paga la infraestructura. El mantenimiento cubre el trabajo técnico sobre la web. Puedes solicitarnos ambos en una propuesta unificada, pero los planes de mantenimiento publicados no incluyen automáticamente alojamiento ni dominio." },
      { title: "Tu dominio y tus accesos", text: "Documentamos titularidad del dominio, accesos y responsabilidades para que puedas gestionar tu servicio y recuperar archivos y datos. También concretamos renovación, licencias y qué necesitarías para cambiar de proveedor." },
      { title: "Presupuesto según necesidades", text: "Envíanos la URL, tecnología, proveedor actual y qué deseas trasladar. Si has sufrido lentitud o caídas, cuéntanos cuándo ocurren. Recibirás una propuesta que separa migración, infraestructura y gestión periódica." },
    ],
    faqs: [
      { question: "¿Puedo contratar hosting gestionado si mi empresa está fuera de Asturias?", answer: "Sí. La gestión se realiza desde Oviedo y podemos trabajar a distancia con empresas de toda España. La ubicación técnica del servidor se elige según las necesidades del proyecto y el proveedor acordado." },
      { question: "¿Qué incluyen alojamiento, dominio y correo?", answer: "Identificamos en la propuesta alojamiento, gestión técnica, dominio y correo, con sus precios y renovaciones. Así puedes contratar lo que necesitas y comparar el coste completo sin dar por incluidos servicios distintos." },
      { question: "¿Podéis trasladar una web que ya existe?", answer: "Revisamos primero su tecnología, los accesos y las condiciones del proveedor actual. Después definimos qué se puede trasladar y cómo probarlo antes de cambiar el dominio." },
      { question: "¿Cuánto cuesta el hosting gestionado?", answer: "El precio depende de recursos, tecnología, datos que haya que trasladar y gestión contratada. Tras revisar tu web, te detallamos puesta en marcha, importe periódico y condiciones antes de contratar." },
    ],
    related: [{ title: "Planes de mantenimiento web", href: "/servicios/mantenimiento-web" }, { title: "Desarrollo de una web a medida", href: "/servicios/desarrollo-web" }, { title: "Qué incluye un mantenimiento web", href: "/blog/que-incluye-mantenimiento-web" }],
  },
  "desarrollo-web": {
    slug: "desarrollo-web",
    title: "Desarrollo web a medida en Oviedo y Asturias",
    description: "Desarrollamos aplicaciones y webs a medida en Oviedo y Asturias: reservas, pagos e integraciones. Define alcance, fases y presupuesto con LTEvo.",
    heading: "Desarrollo web a medida en Oviedo y Asturias",
    intro: "Desarrollamos aplicaciones web y funcionalidades a medida para reservas, áreas de usuario, gestión de datos y conexiones con otras herramientas. Desde Oviedo, convertimos tu proceso de trabajo en una solución para empresas de Asturias y España, con funciones, fases y presupuesto definidos.",
    image: "/Hero-servicios-desarrollo-web.webp",
    audience: ["Empresas que necesitan reservas, formularios o procesos propios.", "Negocios que quieren conectar su web con otras herramientas.", "Proyectos que necesitan una aplicación con usuarios, datos o un panel de gestión."],
    inclusions: [
      { title: "Definición funcional", text: "Definimos usuarios, permisos, datos y recorridos antes de programar. Recibirás un alcance con las funciones necesarias y cómo comprobaremos su entrega: reservar, enviar una solicitud, consultar información o gestionar un proceso." },
      { title: "Diseño y programación", text: "Diseñamos pantallas y programamos su comportamiento, con Next.js, React y TypeScript cuando encajan con el proyecto. Priorizamos que cada usuario pueda completar su tarea y que el sistema sea comprensible para quien lo gestiona." },
      { title: "Integraciones", text: "Estudiamos conexiones con reservas, pagos, CRM y facturación. Revisamos APIs, permisos y licencias para definir qué información se intercambia, cómo se confirma cada operación y qué ocurre cuando una conexión falla." },
      { title: "Pruebas y lanzamiento", text: "Comprobamos funciones acordadas, formularios, permisos y uso en móvil antes del lanzamiento. Definimos despliegue, dominio y accesos, junto con la documentación y formación necesarias para las tareas de gestión incluidas." },
    ],
    decisions: [
      { title: "Diseño web o desarrollo a medida", text: "Si necesitas presentar tus servicios y recibir consultas, empieza por una web corporativa. Si necesitas resolver procesos, conectar sistemas o construir funciones propias, definiremos un proyecto de desarrollo. Ambas disciplinas pueden formar parte de la misma entrega." },
      { title: "Fases que puedas revisar", text: "Separamos definición, diseño, desarrollo y puesta en marcha. El plazo depende de las funciones y las dependencias externas. Los cambios de alcance se acuerdan antes de añadir trabajo, con su impacto en precio y calendario." },
      { title: "Después del lanzamiento", text: "La propuesta concreta entrega y uso del código, documentación, accesos y licencias de terceros. También definimos soporte y mantenimiento posterior para atender actualizaciones, incidencias y nuevas necesidades de la aplicación." },
    ],
    faqs: [
      { question: "¿Qué necesitáis para preparar un presupuesto de desarrollo web?", answer: "Una descripción del problema, los usuarios, las funciones imprescindibles y las herramientas que debe conectar. Si todavía no lo tienes definido, comenzamos por aclarar el alcance." },
      { question: "¿Qué recibo al terminar el desarrollo a medida?", answer: "Recibes la solución con las funciones acordadas y las condiciones de entrega del código, accesos, documentación y formación definidas en la propuesta. Los servicios externos y sus licencias se identifican para que sepas qué necesitas para operarla." },
      { question: "¿Podéis integrar pagos o reservas?", answer: "Estudiamos la integración concreta y las opciones del proveedor. El alcance incluye los flujos acordados y sus pruebas; las tarifas o licencias de terceros se detallan por separado." },
      { question: "¿Una aplicación a medida será autogestionable?", answer: "Las tareas que quieras gestionar deben incluirse en el alcance del panel. No todas las funcionalidades son editables por defecto: acordamos qué podrás cambiar y la formación necesaria." },
    ],
    related: [{ title: "Diseño de páginas web para empresas", href: "/servicios/diseno-web" }, { title: "Creación de tiendas online", href: "/servicios/tiendas-online" }, { title: "Ver proyectos web de LTEvo", href: "/proyectos" }],
  },
  "tiendas-online": {
    slug: "tiendas-online",
    title: "Diseño de tiendas online en Oviedo y Asturias",
    description: "Creamos tiendas online para empresas de Oviedo y Asturias. Catálogo, pagos, envíos y gestión con una plataforma elegida según tu negocio. Pide presupuesto.",
    heading: "Tiendas online en Oviedo y Asturias",
    intro: "Creamos tiendas online para vender y gestionar pedidos: catálogo, fichas de producto, pagos, envíos y administración. Desde Oviedo, definimos la plataforma y el recorrido de compra con comercios de Asturias y España antes de presupuestar el lanzamiento.",
    image: "/Hero-servicios-tiendas-online.webp",
    audience: ["Comercios que van a empezar a vender por internet.", "Empresas con una tienda que necesitan mejorar la compra o la gestión.", "Negocios que deben conectar catálogo, pagos y procesos externos."],
    inclusions: [
      { title: "Plataforma y catálogo", text: "Valoramos productos, variantes, idiomas y gestión diaria para elegir plataforma. La propuesta indica categorías, cantidad de productos a cargar, contenido necesario y funciones de administración, con sus licencias e integraciones." },
      { title: "Diseño del recorrido de compra", text: "Diseñamos categorías, fichas, carrito y checkout para que el comprador encuentre el producto, consulte variantes y conozca precio, entrega y condiciones. Revisamos el recorrido desde el móvil antes de publicar." },
      { title: "Pagos y envíos", text: "Acordamos pasarela, métodos de pago, zonas y reglas de envío. Probamos pagos aceptados y rechazados, notificaciones y estados de pedido. Las tarifas de la pasarela y del transporte se detallan como costes externos." },
      { title: "Base SEO y gestión", text: "Preparamos estructura de categorías, URLs y metadatos, y explicamos cómo gestionar productos y pedidos en las funciones incluidas. El presupuesto concreta formación, carga del catálogo y alcance SEO de lanzamiento." },
    ],
    decisions: [
      { title: "Comparar el coste completo", text: "Además del desarrollo, cuenta alojamiento, dominio, licencias, comisiones, mantenimiento y tiempo de gestionar el catálogo. La propuesta distingue el lanzamiento de los costes recurrentes para que no compares solo el precio inicial." },
      { title: "Migrar el catálogo con un plan", text: "Revisamos qué productos, clientes y pedidos se pueden trasladar y qué accesos necesitamos. Acordamos inventario, pruebas y redirecciones de las URLs que cambien, para conservar rutas útiles y comprobar el catálogo antes del cambio." },
      { title: "Lanzar con lo imprescindible", text: "Priorizamos funciones para empezar a operar y organizamos mejoras por fases. Cuéntanos qué vendes, productos y variantes, destinos de envío y cómo gestionas stock y pedidos. Con esa información definimos alcance, contenidos y calendario." },
    ],
    faqs: [
      { question: "¿Qué plataforma recomendáis para una tienda online?", answer: "Depende del catálogo, la operativa y el presupuesto. Revisamos opciones como WooCommerce, Shopify o un desarrollo a medida y explicamos por qué encaja la elegida y qué costes tiene." },
      { question: "¿Incluye carga de productos y formación para gestionar la tienda?", answer: "La propuesta identifica cuántos productos cargamos, qué datos e imágenes debes aportar y la formación incluida para administrar catálogo y pedidos. También acordamos quién proporciona condiciones de venta, privacidad y devoluciones adaptadas a tu actividad." },
      { question: "¿Qué se comprueba antes de publicar y cómo se mantiene la tienda?", answer: "Comprobamos navegación móvil, compra, pagos y notificaciones en los escenarios acordados. Después puedes contratar mantenimiento según la plataforma, dependencias y operativa; alojamiento y licencias se presupuestan por separado." },
      { question: "¿Podéis mejorar una tienda que ya tengo?", answer: "Sí. Empezamos por revisar su plataforma, catálogo y problemas concretos para valorar si conviene optimizarla o plantear una migración." },
    ],
    related: [{ title: "PrestaShop frente a WooCommerce", href: "/blog/prestashop-vs-woocommerce" }, { title: "Qué es un TPV virtual", href: "/blog/tpv-virtual-que-es" }, { title: "Mantenimiento de tiendas y webs", href: "/servicios/mantenimiento-web" }],
  },
};
