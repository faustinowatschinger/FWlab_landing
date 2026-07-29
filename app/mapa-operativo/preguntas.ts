export type TipoPregunta = "unica" | "multiple" | "texto";

/**
 * Topes de los campos abiertos. Es dato del usuario que entra a un prompt: se
 * acota siempre, en el cliente y revalidado en el servidor.
 *
 * `LARGO` es para la pregunta del flujo, que es la que sostiene todo el sistema:
 * con 200 caracteres no se puede describir cómo funciona una empresa, y ese era
 * exactamente el techo de la versión anterior.
 */
export const MAX_TEXTO_CORTO = 300;
export const MAX_TEXTO_MEDIO = 700;
export const MAX_TEXTO_LARGO = 1500;

export type Pregunta = {
  id: string;
  titulo: string;
  ayuda?: string;
  tipo: TipoPregunta;
  /** Vacío en las de tipo "texto". */
  opciones: readonly string[];
  /** Solo para "texto". */
  placeholder?: string;
  /** Solo para "texto". Default MAX_TEXTO_CORTO. */
  max?: number;
};

/**
 * ═══════════════════════════════════════════════════════════════════════════
 * EL DISEÑO DE LA ENTREVISTA (2026-07-29)
 * ═══════════════════════════════════════════════════════════════════════════
 *
 * Esto reemplaza al cuestionario único de 12 preguntas cerradas. El problema de
 * aquella versión no era el prompt: era que las preguntas eran LAS MISMAS PARA
 * TODOS. Un formulario fijo tiene que servirle a un taller, a una inmobiliaria y
 * a un service de frío al mismo tiempo, o sea que solo puede preguntar cosas
 * gruesas — y el informe salía genérico por más que el prompt fuera bueno.
 * Probándolo con 3W (service de refrigeración) toda la operación real se
 * comprimía a "Trabajamos en obra o a domicilio" + 200 caracteres de rubro.
 *
 * La salida no fue preguntar MÁS. Fue preguntar DESPUÉS DE ESCUCHAR:
 *
 *   RONDA_1 (fija)  →  CONTACTO  →  generadas + CIERRE (fijo)  →  informe
 *
 * 1. `RONDA_1` averigua lo mínimo para poder pensar: qué hacen, cómo circula un
 *    trabajo, qué tamaño tienen y con qué se manejan.
 * 2. El modelo lee eso y escribe 5 a 8 preguntas que SOLO tienen sentido para
 *    esa empresa (ver `generarRonda2` en acciones.ts).
 * 3. `CIERRE` son las que valen para cualquier empresa y no se le delegan al
 *    modelo, porque si no las genera se pierde señal que el informe necesita sí
 *    o sí.
 *
 * El contacto se pide ENTRE las dos rondas: es el punto de máximo compromiso
 * (ya escribió lo difícil) y mínima resistencia (todavía no vio el informe), y
 * si abandona la ronda 2 el lead igual quedó capturado con teléfono.
 */

/**
 * Ronda 1 — lo que hace falta para poder generar la ronda 2.
 *
 * Tres abiertas y tres de click. Las abiertas son el corazón y contestan cosas
 * distintas que no se reemplazan entre sí:
 *
 * - `rubro`   → a qué se dedica.
 * - `flujo`   → cómo circula un trabajo POR DENTRO de la empresa.
 * - `entrega` → qué hace la empresa DE VERDAD y qué queda vivo en el cliente.
 *
 * Si alguna vez hay que sacar una pregunta de acá, ninguna de esas tres es.
 */
export const RONDA_1: readonly Pregunta[] = [
  {
    // Abierta a propósito: un rubro elegido de una lista es un balde grueso
    // ("metalúrgica") y el análisis se vuelve genérico. Escrito en sus palabras
    // el informe habla con su vocabulario.
    id: "rubro",
    titulo: "¿A qué se dedica tu empresa?",
    ayuda: "Qué produce, vende o presta, y para quién. Cuanto más concreto, más específico sale todo lo que sigue.",
    tipo: "texto",
    placeholder: "Ej: instalamos y hacemos service de equipos de refrigeración industrial para supermercados y frigoríficos",
    max: MAX_TEXTO_CORTO,
    opciones: [],
  },
  {
    // LA pregunta del sistema. De acá sale el mapeo de procesos del informe y
    // casi toda la ronda 2. Es la única que justifica un campo largo.
    id: "flujo",
    titulo: "Contame cómo entra un trabajo, desde que te contacta un cliente hasta que cobrás.",
    ayuda: "Con tus palabras y sin ordenarlo. Quién lo recibe, quién lo hace, qué se anota en el camino y dónde suele trabarse. Esto es lo que más cambia el resultado.",
    tipo: "texto",
    placeholder:
      "Ej: nos llaman por teléfono o WhatsApp, alguien de oficina lo anota, se manda un técnico a ver el equipo, vuelve con lo que hay que cambiar, se arma el presupuesto en Excel...",
    max: MAX_TEXTO_LARGO,
    opciones: [],
  },
  {
    // La segunda pregunta que sostiene el sistema, agregada el 2026-07-29 después
    // de que el informe de 3W entrevistara a la empresa como si fuera una
    // oficina: mapeó presupuestos, obras y facturas, y nunca entendió que 3W
    // instala sistemas de control y automatización en frigoríficos.
    //
    // `flujo` cuenta cómo circula un trabajo POR LA EMPRESA. Esta cuenta qué
    // hace la empresa DE VERDAD y qué queda vivo en el cliente después. Sin
    // esto, el informe no puede ver el dato que el propio producto genera —que
    // suele ser el activo más grande que la empresa tiene sin usar— y termina
    // proponiendo ordenar carpetas.
    id: "entrega",
    titulo: "¿Qué es exactamente lo que le entregás al cliente, y qué pasa con eso después?",
    ayuda: "Si instalás, fabricás o montás algo: qué queda funcionando y si después lo seguís viendo, midiendo o manteniendo. Si prestás un servicio: qué recibe el cliente y qué pasa cuando termina.",
    tipo: "texto",
    placeholder:
      "Ej: dejamos el equipo andando con su tablero de control, queda midiendo temperatura solo, y si se sale de rango nos avisa; después volvemos cada tanto a hacerle mantenimiento",
    max: MAX_TEXTO_MEDIO,
    opciones: [],
  },
  {
    id: "gente",
    titulo: "¿Cuánta gente trabaja en la empresa?",
    tipo: "unica",
    opciones: ["Solo yo", "2 a 5", "6 a 15", "16 a 50", "51 a 200", "Más de 200"],
  },
  {
    id: "lugares",
    titulo: "¿En cuántos lugares opera?",
    ayuda: "Sucursales, plantas, depósitos u obras.",
    tipo: "unica",
    opciones: [
      "Un solo lugar",
      "2 o 3",
      "4 a 10",
      "Más de 10",
      "Trabajamos en obra o a domicilio, cambia todo el tiempo",
    ],
  },
  {
    id: "sistemas",
    titulo: "¿Con qué se maneja la empresa hoy?",
    ayuda: "Marcá todo lo que se use, aunque sea a medias.",
    tipo: "multiple",
    opciones: [
      "Un sistema de facturación o ERP",
      "Un CRM",
      "Planillas de Excel o Google Sheets",
      "WhatsApp",
      "Papel o cuaderno",
      "Un software propio que mandamos a hacer",
      "Correo electrónico",
      "Ninguno en particular",
    ],
  },
];

/**
 * Cierre — fijas, van al final de la ronda 2, después de las generadas.
 *
 * Son universales y cada una alimenta una sección concreta del informe. No se le
 * delegan al modelo justamente porque son las que no puede darse el lujo de no
 * preguntar:
 *
 * - `si_falta`      → la dependencia de personas de `riesgos`.
 * - `horas_carga`   → el único número que el informe tiene permitido citar.
 * - `tarea_pesada`  → el centro del informe: si no aparece en `oportunidades`,
 *                     el informe está mal.
 * - `intentos`      → alimenta `lo_que_no_haria` (no repetir lo que ya falló).
 */
export const CIERRE: readonly Pregunta[] = [
  {
    id: "si_falta",
    titulo: "Si mañana no viene la persona que más sabe cómo funciona todo, ¿qué pasa?",
    tipo: "unica",
    opciones: [
      "No pasa nada, está todo documentado",
      "Se atrasa algo, pero se resuelve",
      "Se para un área entera",
      "No podríamos operar",
      "Nunca lo pensé",
    ],
  },
  {
    id: "horas_carga",
    titulo: "¿Cuántas horas por semana se van cargando datos a mano entre todos?",
    ayuda: "Pasar de una planilla a otra, copiar del papel al sistema, rearmar informes.",
    tipo: "unica",
    opciones: ["Menos de 5", "Entre 5 y 15", "Entre 15 y 40", "Más de 40", "No tengo idea"],
  },
  {
    id: "tarea_pesada",
    titulo: "¿Cuál de estas tareas te come más tiempo por semana?",
    ayuda: "La que si desapareciera mañana te cambiaría la semana.",
    tipo: "unica",
    opciones: [
      "Armar presupuestos y cotizaciones",
      "Pasar datos de un lado a otro",
      "Seguimiento de clientes y postventa",
      "Control de stock y compras",
      "Liquidar horas y sueldos",
      "Coordinar a la gente y los trabajos del día",
      "Responder las mismas consultas una y otra vez",
      "Facturación y cobranzas",
    ],
  },
  {
    id: "intentos",
    titulo: "¿Qué intentaron hasta ahora para ordenar esto?",
    tipo: "multiple",
    opciones: [
      "Nada todavía",
      "Probamos ChatGPT suelto",
      "Compramos un software que después nadie usó",
      "Mandamos a hacer un desarrollo a medida",
      "Contratamos una consultora",
      "Lo intentamos internamente y quedó a medias",
    ],
  },
];

/**
 * Una pregunta escrita por el modelo para esta empresa en particular.
 *
 * Ojo: sus `opciones` NO existen en el código, así que el servidor no puede
 * validar las respuestas contra una lista blanca como hace con las fijas. Se
 * tratan igual que un campo abierto: topes de largo y de cantidad, y el prompt
 * del informe declara todo el texto del usuario como dato y no como instrucción.
 */
export type PreguntaGenerada = {
  id: string;
  titulo: string;
  /** "" cuando no hace falta. En strict json_schema no hay campos opcionales. */
  ayuda: string;
  tipo: TipoPregunta;
  /** [] en las de tipo "texto". */
  opciones: string[];
};

/** Techo de preguntas generadas. Es también el límite que valida el servidor. */
export const MAX_GENERADAS = 8;

/** Tope de largo de cada texto que viene de una pregunta generada. */
export const MAX_TITULO_GENERADO = 300;

export type Respuestas = Record<string, string | string[]>;

export type Contacto = {
  nombre: string;
  empresa: string;
  email: string;
  telefono: string;
};

/**
 * El output.
 *
 * ⚠️ Esto REEMPLAZA (2026-07-29) la versión anterior, que devolvía solo el mapa
 * del problema para no canibalizar el diagnóstico pago. Se cayó por decisión de
 * Faustino, con un argumento mejor: hoy la información es commodity y el foso es
 * el criterio y la ejecución. Un análisis que solo le devuelve al visitante lo
 * que él mismo respondió no aporta valor y no prueba nada. Regalar el análisis
 * completo —incluido el orden y lo que NO haría— es justamente lo que demuestra
 * que hay criterio detrás, que es lo único que no se puede fingir.
 *
 * Las dos secciones que más importan son `criterio_ia` y `lo_que_no_haria`: son
 * las que separan esto de una lista genérica. Si alguna vez hay que recortar,
 * se recorta el diagnóstico, nunca el criterio.
 */
export type MapaOperativo = {
  titular: string;
  /**
   * El mapeo de procesos: cómo funciona hoy cada proceso de punta a punta y
   * dónde se corta. NO es "dónde vive el dato" — es el flujo. Todo lo demás
   * (riesgos y oportunidades) se ancla en un proceso de esta lista.
   */
  procesos: { proceso: string; como_funciona_hoy: string; donde_se_corta: string }[];
  /** Vulnerabilidades. Salen de los procesos mapeados, no del aire. */
  riesgos: { que: string; impacto: string }[];
  /** Qué se puede resolver, con qué y cuánto cuesta hacerlo. Concreto. */
  oportunidades: { que: string; como: string; esfuerzo: string; impacto: string }[];
  /**
   * Dónde entra la IA y cuándo. `veredicto` es Sí / No / Todavía no, y
   * "Todavía no" NO es un rechazo: es un paso posterior. `cuando` dice qué lo
   * desbloquea, y tiene que engancharse con un paso de `orden`.
   */
  criterio_ia: { caso: string; veredicto: string; por_que: string; cuando: string }[];
  /** Anti-recomendaciones. Lo más valioso y lo que nadie da. */
  lo_que_no_haria: { que: string; por_que: string }[];
  /**
   * El camino completo, no solo la parte de ordenar datos: los últimos pasos
   * son los de IA. Si hay "Todavía no" en criterio_ia que el orden no llega a
   * implementar, el informe está incompleto.
   */
  orden: { que: string; por_que: string }[];
  /** Cómo queda la empresa cuando el camino está hecho. El horizonte. */
  destino: string;
  cierre: string;
};
