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
    intro: "Un alojamiento necesita algo más que espacio en un servidor. En LTEvo te ayudamos a elegirlo, configurarlo y mantenerlo para que tengas un interlocutor técnico cuando tu web necesita atención. Trabajamos desde Oviedo con empresas de Asturias y del resto de España.",
    image: "/Hero-servicios-mantenimiento.webp",
    audience: ["Negocios que quieren delegar la gestión técnica del alojamiento.", "Empresas que van a lanzar una web o cambiar de proveedor.", "Tiendas y webs con necesidades de recursos distintas de un hosting básico."],
    inclusions: [
      { title: "Elegir el alojamiento adecuado", text: "Revisamos la tecnología, el catálogo, las visitas y las integraciones. Una web corporativa, una aplicación y una tienda necesitan configuraciones distintas. La propuesta define proveedor, recursos y costes recurrentes." },
      { title: "Preparar una migración", text: "Inventariamos web, dominio, DNS y correo antes de mover nada. Acordamos pruebas, ventana de cambio y una forma de volver atrás si aparece una incidencia. La gestión del correo se concreta aparte cuando corresponda." },
      { title: "Configuración y continuidad", text: "Definimos HTTPS, copias, restauración y monitorización según el proyecto. La frecuencia de las copias y su retención deben quedar por escrito; no dependen solo del espacio contratado." },
      { title: "Soporte con un alcance claro", text: "Distinguimos una incidencia del servidor, una tarea de mantenimiento y una funcionalidad nueva. Sabrás qué gestiona LTEvo, qué atiende el proveedor y qué requiere un presupuesto adicional." },
    ],
    decisions: [
      { title: "Hosting y mantenimiento: dos costes distintos", text: "El hosting paga la infraestructura. El mantenimiento cubre el trabajo técnico sobre la web. Puedes solicitarnos ambos en una propuesta unificada, pero los planes de mantenimiento publicados no incluyen automáticamente alojamiento ni dominio." },
      { title: "Tu dominio y tus accesos", text: "Antes de contratar, comprueba quién es titular del dominio, qué acceso tendrás al proveedor y cómo recuperar tus archivos y datos. Documentamos el reparto de accesos y responsabilidades en el alcance del proyecto." },
      { title: "Presupuesto según necesidades", text: "Envíanos la URL, la tecnología y qué deseas trasladar. Revisaremos si necesitas mover la web, el correo o ambos y te presentaremos una propuesta con costes de puesta en marcha y costes periódicos separados." },
    ],
    faqs: [
      { question: "¿Ofrecéis hosting en Asturias aunque mi empresa esté en otra provincia?", answer: "Sí. La gestión se realiza desde Oviedo y podemos trabajar a distancia con empresas de toda España. La ubicación técnica del servidor se elige según las necesidades del proyecto y el proveedor acordado." },
      { question: "¿El hosting incluye el dominio y el correo?", answer: "Solo si la propuesta lo indica. Dominio, correo, infraestructura y gestión técnica se identifican por separado para que puedas comparar el coste completo." },
      { question: "¿Podéis trasladar una web que ya existe?", answer: "Revisamos primero su tecnología, los accesos y las condiciones del proveedor actual. Después definimos qué se puede trasladar y cómo probarlo antes de cambiar el dominio." },
      { question: "¿Publicáis una tarifa única?", answer: "No. Las necesidades de una web corporativa y una tienda pueden ser muy diferentes. Te enviamos el precio y las condiciones concretas antes de contratar." },
    ],
    related: [{ title: "Planes de mantenimiento web", href: "/servicios/mantenimiento-web" }, { title: "Desarrollo de una web a medida", href: "/servicios/desarrollo-web" }, { title: "Qué revisar si tu web no aparece en Google", href: "/blog/por-que-mi-web-no-aparece-en-google" }],
  },
  "desarrollo-web": {
    slug: "desarrollo-web",
    title: "Desarrollo web a medida en Oviedo y Asturias",
    description: "Desarrollamos aplicaciones y webs a medida en Oviedo y Asturias: reservas, pagos e integraciones. Define alcance, fases y presupuesto con LTEvo.",
    heading: "Desarrollo web a medida en Oviedo y Asturias",
    intro: "Cuando tu negocio necesita una función que una web estándar no resuelve, el desarrollo a medida permite construirla alrededor de tu forma de trabajar. En LTEvo diseñamos y programamos webs y aplicaciones desde Oviedo, con un alcance definido antes de empezar.",
    image: "/Hero-servicios-diseno-web.webp",
    audience: ["Empresas que necesitan reservas, formularios o procesos propios.", "Negocios que quieren conectar su web con otras herramientas.", "Proyectos que necesitan una aplicación con usuarios, datos o un panel de gestión."],
    inclusions: [
      { title: "Definición funcional", text: "Convertimos tu necesidad en recorridos y funcionalidades concretas. Acordamos qué personas usarán el sistema, qué datos necesitan y qué tareas deben poder completar. Así el presupuesto tiene límites verificables." },
      { title: "Diseño y programación", text: "Trabajamos con Next.js, React y TypeScript cuando encajan con el proyecto. Diseñamos la interfaz y desarrollamos las funciones necesarias, en lugar de añadir tecnología que no aporta valor a tu negocio." },
      { title: "Integraciones", text: "Estudiamos conexiones con reservas, pagos, CRM u otras APIs. Revisamos documentación, permisos y costes del proveedor antes de comprometer una integración; la disponibilidad de una API condiciona lo que se puede hacer." },
      { title: "Pruebas y lanzamiento", text: "La entrega se comprueba contra las funciones acordadas. Revisamos navegación, formularios y comportamiento en móvil. Acordamos el despliegue, la configuración del dominio y los accesos que necesitas para operar la solución." },
    ],
    decisions: [
      { title: "Diseño web o desarrollo a medida", text: "Si necesitas presentar tus servicios y recibir consultas, empieza por una web corporativa. Si necesitas resolver procesos, conectar sistemas o construir funciones propias, definiremos un proyecto de desarrollo. Ambas disciplinas pueden formar parte de la misma entrega." },
      { title: "Fases que puedas revisar", text: "Separamos definición, diseño, desarrollo y puesta en marcha. El plazo depende de las funciones y las dependencias externas. Los cambios de alcance se acuerdan antes de añadir trabajo, con su impacto en precio y calendario." },
      { title: "Después del lanzamiento", text: "Una aplicación sigue necesitando actualización y soporte. Antes de cerrar el proyecto concretamos documentación, accesos, dependencia de proveedores y opciones de mantenimiento, además de las condiciones de entrega y uso del código." },
    ],
    faqs: [
      { question: "¿Qué necesitáis para preparar un presupuesto de desarrollo web?", answer: "Una descripción del problema, los usuarios, las funciones imprescindibles y las herramientas que debe conectar. Si todavía no lo tienes definido, comenzamos por aclarar el alcance." },
      { question: "¿Trabajáis solo con empresas de Oviedo?", answer: "Trabajamos desde Oviedo para empresas de Asturias y de toda España. Las reuniones y revisiones pueden realizarse a distancia." },
      { question: "¿Podéis integrar pagos o reservas?", answer: "Estudiamos la integración concreta y las opciones del proveedor. El alcance incluye los flujos acordados y sus pruebas; las tarifas o licencias de terceros se detallan por separado." },
      { question: "¿Una aplicación a medida será autogestionable?", answer: "Las tareas que quieras gestionar deben incluirse en el alcance del panel. No todas las funcionalidades son editables por defecto: acordamos qué podrás cambiar y la formación necesaria." },
    ],
    related: [{ title: "Diseño de páginas web para empresas", href: "/servicios/diseno-web" }, { title: "Creación de tiendas online", href: "/servicios/tiendas-online" }, { title: "Proyectos de LTEvo", href: "/proyectos" }],
  },
  "tiendas-online": {
    slug: "tiendas-online",
    title: "Diseño de tiendas online en Oviedo y Asturias",
    description: "Creamos tiendas online para empresas de Oviedo y Asturias. Catálogo, pagos, envíos y gestión con una plataforma elegida según tu negocio. Pide presupuesto.",
    heading: "Tiendas online en Oviedo y Asturias",
    intro: "Una tienda online tiene que permitir comprar y también facilitar tu trabajo diario. En LTEvo definimos catálogo, pagos, envíos y gestión antes de elegir la plataforma. Creamos proyectos de comercio electrónico desde Oviedo para empresas de Asturias y España.",
    image: "/Hero-servicios-diseno-web.webp",
    audience: ["Comercios que van a empezar a vender por internet.", "Empresas con una tienda que necesitan mejorar la compra o la gestión.", "Negocios que deben conectar catálogo, pagos y procesos externos."],
    inclusions: [
      { title: "Plataforma y catálogo", text: "Valoramos número de productos, variantes, idiomas y necesidades de gestión. Comparamos una plataforma de comercio electrónico con una solución a medida según el alcance; no existe una herramienta mejor para todos los negocios." },
      { title: "Diseño del recorrido de compra", text: "Definimos categorías, fichas y navegación. El comprador debe poder identificar el producto, entender el precio y las condiciones y completar el pedido desde el móvil. Las páginas se organizan alrededor de esas tareas." },
      { title: "Pagos y envíos", text: "Acordamos pasarela, métodos de pago y reglas de envío. Comprobamos escenarios de pago aceptado y rechazado en pruebas, además del tratamiento de pedidos. Las comisiones de la pasarela y los contratos de transporte son costes externos." },
      { title: "Base SEO y gestión", text: "Preparamos títulos, URLs y estructura del catálogo, junto con las funciones de administración incluidas. El SEO continuo, la carga masiva de productos y las integraciones adicionales se presupuestan según el alcance." },
    ],
    decisions: [
      { title: "Comparar el coste completo", text: "Además del desarrollo, cuenta alojamiento, dominio, licencias, comisiones, mantenimiento y tiempo de gestionar el catálogo. La propuesta distingue el lanzamiento de los costes recurrentes para que no compares solo el precio inicial." },
      { title: "Migrar sin perder el catálogo", text: "Antes de cambiar de plataforma, revisamos productos, clientes, pedidos y URLs existentes. La migración necesita un inventario y un plan de redirecciones cuando cambian las rutas. No se decide solo por el aspecto de la tienda." },
      { title: "Lanzar con lo imprescindible", text: "Priorizamos las funciones necesarias para empezar a operar. Las mejoras posteriores pueden planificarse por fases. Para valorar tu proyecto, indícanos qué vendes, el tamaño del catálogo y cómo gestionas actualmente pedidos y stock." },
    ],
    faqs: [
      { question: "¿Qué plataforma recomendáis para una tienda online?", answer: "Depende del catálogo, la operativa y el presupuesto. Revisamos opciones como WooCommerce, Shopify o un desarrollo a medida y explicamos por qué encaja la elegida y qué costes tiene." },
      { question: "¿El presupuesto incluye productos y textos legales?", answer: "La propuesta indica cuántos productos y qué contenidos se cargarán. Las condiciones legales deben ajustarse a tu actividad y contar con revisión adecuada; el diseño de la tienda no sustituye ese asesoramiento." },
      { question: "¿Puedo contratar mantenimiento después?", answer: "Sí. Revisamos el volumen de cambios, las dependencias y la importancia operativa de la tienda para definir un mantenimiento adecuado. Hosting y costes de terceros se identifican por separado." },
      { question: "¿Podéis mejorar una tienda que ya tengo?", answer: "Sí. Empezamos por revisar su plataforma, catálogo y problemas concretos para valorar si conviene optimizarla o plantear una migración." },
    ],
    related: [{ title: "PrestaShop frente a WooCommerce", href: "/blog/prestashop-vs-woocommerce" }, { title: "Qué es un TPV virtual", href: "/blog/tpv-virtual-que-es" }, { title: "Mantenimiento de tiendas y webs", href: "/servicios/mantenimiento-web" }],
  },
};
