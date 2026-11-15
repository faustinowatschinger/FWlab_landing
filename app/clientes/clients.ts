export type StoryImage ={ src: string; width: number; height: number; alt: string; caption: string };

export type ClientWork = {
  title: string;
  category: string;
  status: "Implementado" | "En prueba" | "En validación" | "En desarrollo";
  need: string;
  solution: string;
  state: string;
  imageTitle: string;
  imageDetail: string;
  images?: StoryImage[];
  carousel?: boolean;
  imagePending?: string;
};

export type ClientStory = {
  slug: string;
  name: string;
  sector: string;
  summary: string;
  logo: { src: string; width: number; height: number };
  headline: string;
  description: string;
  context: string;
  relationship: string[];
  photos?: StoryImage[];
  works: ClientWork[];
  note?: string;
  noteLink?: { href: string; label: string };
};

// Names and supplied logos explicitly requested by Faustino for this review.
export const clients: ClientStory[] = [
  {
    slug: "3w",
    name: "3W",
    sector: "Refrigeración industrial y atmósfera controlada",
    summary: "Desarrollé 3W Control, la app con la que siguen sus plantas frigoríficas desde el teléfono, y su sistema de gestión interna. No es Fawel: muestra que lo que construyo funciona en una operación real.",
    logo: { src: "/clientes/logo-3w.webp", width: 960, height: 250 },
    headline: "Una relación que empezó en casa.\nY creció con cada desarrollo.",
    description: "El trabajo con 3W: monitoreo industrial, gestión interna y web institucional, con un alcance y estado propio para cada sistema.",
    context: "3W implementa y mantiene sistemas de refrigeración y atmósfera controlada para frigoríficos de manzana, pera y cereza. Es la empresa de mi familia y el lugar donde empecé a desarrollar soluciones para una operación real.",
    relationship: [
      "Mi primer trabajo para ellos fue una página web, cuando recién empezaba a programar. La hice con lo que sabía en ese momento; después, con más experiencia, pude mejorarla.",
      "El primer desafío grande llegó cuando mi padre me contó que quería una aplicación para consultar y gestionar los datos de las plantas frigoríficas desde el teléfono. Le dije: “Te lo hago yo”. Así empezó 3W Control.",
      "Me llevó cerca de un año de desarrollo, pruebas y muchos errores hasta conseguir que funcionara. Hoy sigo manteniendo la aplicación y acompañando su incorporación a nuevas plantas.",
      "Los demás trabajos aparecieron al conocer mejor la operación. Algunas necesidades las planteaban ellos y otras las encontraba yo. Hoy trabajo como socio tecnológico: mantengo lo construido y seguimos buscando qué conviene mejorar, automatizar o desarrollar.",
    ],
    photos: [
      { src: "/media/3w-en-planta-completa.webp", width: 1200, height: 1600, alt: "Faustino en una sala de equipos de refrigeración durante el trabajo para 3W.", caption: "El trabajo también pasa en planta." },
      { src: "/media/3w-recorrido-completa.webp", width: 1200, height: 1600, alt: "Recorrido por una instalación junto a personal de 3W, con una computadora de trabajo.", caption: "Conocer la instalación y trabajar con quienes la operan." },
      { src: "/media/3w-desarrollo-en-planta-completa.webp", width: 1200, height: 1600, alt: "Computadora y pantalla industrial en un puesto de trabajo en planta.", caption: "Desarrollo en el contexto donde se usa el sistema." },
      { src: "/media/3w-tablero-completa.webp", width: 1200, height: 1600, alt: "Faustino junto a un tablero industrial abierto y las computadoras de trabajo.", caption: "Software, equipos y trabajo en el lugar." },
      { src: "/media/3w-desarrollo-planta-0602.jpg", width: 1600, height: 1200, alt: "Computadora con código abierto frente a un equipo industrial durante una visita a planta de 3W.", caption: "Desarrollo junto a los equipos que se mantienen." },
      { src: "/media/3w-desarrollo-oficina-1547.jpg", width: 1600, height: 1200, alt: "Computadora con código abierto sobre una mesa de trabajo en las oficinas de 3W.", caption: "El trabajo sigue también fuera de planta." },
    ],
    works: [
      {
        title: "3W Control",
        carousel: true,
        category: "Monitoreo y operación industrial",
        status: "Implementado",
        need: "Los datos se consultaban desde las pantallas instaladas en cada frigorífico. Para revisar un problema había que ir a la planta o conectarse de forma remota desde una computadora, con un acceso que resultaba incómodo y se trababa.",
        solution: "Desarrollé una aplicación móvil para consultar los datos de las plantas, ajustar parámetros, revisar históricos y recibir alertas en el teléfono. Así pueden acceder a esa información sin estar físicamente en el frigorífico.",
        state: "Implementado. Sigo manteniendo la aplicación y acompañando su incorporación a las nuevas plantas con las que trabaja 3W.",
        imageTitle: "La operación, en pantalla.",
        imageDetail: "Capturas completas suministradas por Faustino.",
        images: [
          { src: "/media/3w-control-lecturas-completa.webp", width: 920, height: 2000, alt: "3W Control: temperaturas, humedad y presión de una cámara frigorífica.", caption: "Lecturas de la cámara en una misma vista." },
          { src: "/media/3w-control-historico-completa.webp", width: 920, height: 2000, alt: "3W Control: gráfico histórico de temperatura ambiente y pincha fruta de una cámara, con opción de exportación PDF.", caption: "Histórico de temperaturas y exportación de gráficas." },
          { src: "/media/3w-control-equipo-completa.webp", width: 920, height: 2000, alt: "3W Control: visualización de un compresor con presiones y temperaturas.", caption: "Variables del equipo y visualización de su funcionamiento." },
          { src: "/media/3w-control-alertas-completa.webp", width: 920, height: 2000, alt: "3W Control: historial de alertas activas y reconocidas.", caption: "Alertas e historial de reconocimiento." },
        ],
      },
      {
        title: "3W Stock",
        category: "Gestión interna",
        status: "Implementado",
        need: "3W utilizaba un sistema de gestión antiguo, difícil de usar y de actualizar. Cuando dejó de funcionar en Windows 11, necesitaban reemplazarlo para poder seguir trabajando.",
        solution: "Desarrollé un nuevo sistema de gestión interna con una interfaz más clara y simple de usar. Aunque se llama 3W Stock, su alcance incluye distintos procesos de la empresa, además del control de stock.",
        state: "Productos y clientes implementados. Pedidos, presupuestos, mano de obra y recibos siguen en validación.",
        imageTitle: "La gestión del día a día.",
        imageDetail: "Captura real de la interfaz durante la carga, sin conexión.",
        images: [{ src: "/media/3w-stock-completa.webp", width: 2000, height: 1191, alt: "Interfaz de 3W Stock: navegación de módulos y pantalla de repuestos, durante la carga y sin conexión al servidor.", caption: "Interfaz de Stock. Esta captura muestra la pantalla durante la carga, sin conexión al servidor." }],
      },
      {
        title: "Web institucional de 3W",
        category: "Presentación de la empresa",
        status: "Implementado",
        need: "La web anterior había quedado desactualizada y necesitaba una renovación en su diseño y navegación.",
        solution: "Rediseñé la página para presentar la empresa y sus servicios de una forma más clara, cuidando cómo se ve y cómo se recorre.",
        state: "Web institucional implementada.",
        imageTitle: "La empresa, hacia afuera.",
        imageDetail: "Captura completa de la web institucional suministrada por Faustino.",
        images: [{ src: "/media/3w-web-completa.webp", width: 2000, height: 1028, alt: "Web institucional de 3W: navegación, presentación y accesos de contacto.", caption: "Captura completa de la web institucional." }],
      },
    ],
    note: "Estos sistemas son de 3W y no son Fawel. Muestran cómo trabajo dentro de una operación real.",
  },
  {
    slug: "altaterra",
    name: "Altaterra",
    sector: "Comercialización de loteos",
    summary: "Fawel atiende las consultas de su loteo por WhatsApp, a cualquier hora, y le pasa al equipo los que muestran un interés concreto, con aviso.",
    logo: { src: "/clientes/logo-altaterra.png", width: 300, height: 183 },
    headline: "Consultas de un loteo.\nUna conversación que continúa.",
    description: "Fawel en Altaterra: agente de WhatsApp y panel para atender las consultas de un loteo, con el equipo coordinando las visitas.",
    context: "Altaterra es una empresa inmobiliaria que comercializa loteos en pozo y terminados. El trabajo actual se concentra en la atención de consultas por WhatsApp de un solo loteo.",
    relationship: [
      "La relación empezó con una llamada en frío. Aunque el comienzo fue difícil, al seguir conversando descubrimos varias conexiones en común y que estaban buscando a alguien que pudiera ayudarlos con tecnología.",
      "Coordinamos una reunión presencial y ahí empezamos a trabajar sobre una necesidad concreta: atender las consultas que recibían por sus loteos.",
    ],
    works: [
      {
        title: "Agente de consultas y panel comercial",
        category: "WhatsApp / Supervisión del equipo",
        status: "Implementado",
        need: "Les llegaban muchas consultas por WhatsApp. Parte de esas personas escribía una vez y después no respondía, pero atenderlas igualmente llevaba tiempo del equipo.",
        solution: "Desarrollé un agente de IA que atiende las consultas del loteo y deriva al equipo humano cuando identifica un interés concreto. Desde ese momento, el equipo continúa la conversación, coordina reuniones y acompaña el proceso comercial. También desarrollé un panel para revisar las conversaciones, consultar los contactos y seguir la actividad del agente.",
        state: "Funcionando en el loteo Rincón del Valle. Entre el 18 de septiembre y el 2 de noviembre de 2026 atendió a 224 interesados, con la primera respuesta en alrededor de un minuto y medio, a cualquier hora. De los que conversaron en serio, 3 de cada 4 llegaron al equipo calificados y con aviso.",
        imageTitle: "Una conversación y su contexto.",
        imageDetail: "Capturas completas suministradas de conversación y panel.",
        images: [
          { src: "/media/altaterra-conversacion-completa.webp", width: 1350, height: 1594, alt: "Intercambio inicial de WhatsApp con IA Altaterra: consulta e información del loteo.", caption: "Una consulta inicial por WhatsApp y la información que recibe el interesado." },
          { src: "/media/altaterra-panel-completa.png", width: 3024, height: 1562, alt: "Panel de Altaterra: conversaciones, filtros y seguimiento de consultas.", caption: "Panel para revisar y seguir las conversaciones." },
        ],
      },
    ],
  },
];

export function clientPath(client: ClientStory) {
  return `/clientes/${client.slug}`;
}
