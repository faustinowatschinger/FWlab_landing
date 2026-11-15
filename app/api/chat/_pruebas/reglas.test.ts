/**
 * Prueba las guardas haciéndolas fallar a propósito: cada regla
 * tiene un caso que la tiene que disparar y uno que no.
 *
 *   npx tsx app/api/chat/_pruebas/reglas.test.ts
 */
import { fijarCotizacion, normalizar, normalizarWhatsapp, violaciones, type Salida } from "../reglas";
import { diceFrasePrecio, tramosDelRango } from "./frase-precio";

let fallas = 0;
function espero(nombre: string, ok: boolean) {
  if (!ok) fallas++;
  console.log(`${ok ? "ok   " : "FALLA"} ${nombre}`);
}

// Valores de prueba, no el rango real (este repo es público).
process.env.CHAT_PROMPT_PRECIO = "van desde trescientos dólares hasta novecientos. Montos permitidos: 300 y 900.";

// Precio
espero("dispara con un monto inventado", violaciones("Sale USD 500 por mes").includes("precio-no-autorizado"));
espero("dispara con $ y miles", violaciones("son $ 300.000 de setup").includes("precio-no-autorizado"));
espero("no dispara con el rango autorizado", violaciones("van de USD 300 a 900 dólares").length === 0);
espero("no dispara con un monto que trajo la persona", violaciones("con prendas de 40 dólares no se justifica", "la prenda sale 40 dólares").length === 0);
espero("dispara si el monto no lo trajo nadie", violaciones("con prendas de 40 dólares no se justifica", "vendo ropa").includes("precio-no-autorizado"));
espero("letras: dispara con un precio inventado", violaciones("El abono sale quinientos dólares", "tengo una inmobiliaria").includes("precio-en-letras-no-autorizado"));
espero("letras: no dispara si repite lo de la persona", !violaciones("Una venta ronda los tres mil dólares", "sale unos 3000 dólares").includes("precio-en-letras-no-autorizado"));
espero("letras: no dispara con el rango autorizado", !violaciones("Los proyectos salen desde trescientos dólares hasta novecientos", "cuanto sale").includes("precio-en-letras-no-autorizado"));
// El chequeo del simulador que mira si dijo la frase del rango (valores de prueba).
const rango = tramosDelRango('Si insiste: "Para que tengas una idea, los proyectos van desde trescientos dólares hasta novecientos, y llevan unas semanas. El número real te lo da Faustino después del diagnóstico."');
espero("frase: la reconoce", diceFrasePrecio("Mirá, los proyectos van desde trescientos dólares hasta novecientos.", rango));
espero("frase: no confunde la salida sin rango", !diceFrasePrecio("El número te lo da Faustino después del diagnóstico, que es gratis.", rango));
espero("frase: no la ve si no está", !diceFrasePrecio("Depende de lo que encontremos en el diagnóstico.", rango));
delete process.env.CHAT_PROMPT_PRECIO;
espero("sin CHAT_PROMPT_PRECIO, el rango también dispara", violaciones("van de USD 300 a 900").includes("precio-no-autorizado"));

// Resto de las reglas, una por una
const casos: [string, string, string][] = [
  ["link", "Entrá a https://calendly.com/x", "Abajo te aparece el botón"],
  ["mail", "Escribile a faustino@fwlabsllc.com", "Faustino te escribe"],
  ["lenguaje-venta", "Te lo puedo vender si querés contratarlo", "Estos negocios ayudamos"],
  ["te-entiendo", "Te entiendo, es difícil", "Entiendo, es difícil"],
  ["gestionar", "Para gestionar las consultas", "Para manejar las consultas"],
  ["markdown", "**Fawel** atiende", "Fawel atiende"],
  ["agenda-fantasma", "Listo, te agendé para el martes", "Abajo elegís el horario"],
  ["promete-resultados", "Vas a vender más seguro", "Contesta a cualquier hora"],
  ["dice-ser-humano", "No soy un bot, soy Faustino", "Sí, soy una IA"],
];
for (const [id, malo, bueno] of casos) {
  espero(`${id}: dispara`, violaciones(malo).includes(id));
  espero(`${id}: no dispara en el caso bueno`, !violaciones(bueno).includes(id));
}

// Filtro por código
const base: Salida = {
  mensaje: "x", estado: "califica", mostrar_agenda: true, rubro: "x", negocio: null, nombre: null,
  whatsapp: null, consultas_por_dia: 9, ticket: "x", ticket_monto: null, ticket_moneda: null, ticket_alto: "si", dolor: null,
};
espero("no deja calificar con 9 por día", normalizar(base, "conversando").salida.estado === "conversando");
espero("no muestra agenda con 9 por día", normalizar(base, "conversando").salida.mostrar_agenda === false);
espero("no deja calificar con ticket bajo", normalizar({ ...base, consultas_por_dia: 50, ticket_alto: "no" }, "conversando").salida.estado === "conversando");
espero("deja calificar con 10 por día y ticket alto", normalizar({ ...base, consultas_por_dia: 10 }, "conversando").salida.estado === "califica");
espero("no muestra agenda si no califica", normalizar({ ...base, estado: "conversando", consultas_por_dia: 30 }, "conversando").salida.mostrar_agenda === false);
espero("piso: USD 300 no califica aunque el modelo diga alto", normalizar({ ...base, consultas_por_dia: 20, ticket_monto: 300, ticket_moneda: "USD" }, "conversando").salida.estado === "conversando");
espero("piso: USD 500 califica", normalizar({ ...base, consultas_por_dia: 20, ticket_monto: 500, ticket_moneda: "USD" }, "conversando").salida.estado === "califica");
espero("piso: USD 1.200 califica aunque el modelo dude", normalizar({ ...base, consultas_por_dia: 20, ticket_monto: 1200, ticket_moneda: "USD", ticket_alto: "no_se" }, "conversando").salida.estado === "califica");
espero("piso: pesos sin tipo de cambio queda al juicio del modelo", (delete process.env.CHAT_ARS_POR_USD, normalizar({ ...base, consultas_por_dia: 20, ticket_monto: 400000, ticket_moneda: "ARS" }, "conversando").salida.estado === "califica"));
process.env.CHAT_ARS_POR_USD = "1000";
espero("piso: 400 mil pesos a 1000 no califica", normalizar({ ...base, consultas_por_dia: 20, ticket_monto: 400000, ticket_moneda: "ARS" }, "conversando").salida.estado === "conversando");
espero("piso: 900 mil pesos a 1000 califica", normalizar({ ...base, consultas_por_dia: 20, ticket_monto: 900000, ticket_moneda: "ARS" }, "conversando").salida.estado === "califica");
delete process.env.CHAT_ARS_POR_USD;
fijarCotizacion(1580);
espero("cotización viva: 400 mil pesos a 1580 no califica", normalizar({ ...base, consultas_por_dia: 20, ticket_monto: 400000, ticket_moneda: "ARS" }, "conversando").salida.estado === "conversando");
process.env.CHAT_ARS_POR_USD = "100";
espero("cotización viva le gana a la variable", normalizar({ ...base, consultas_por_dia: 20, ticket_monto: 400000, ticket_moneda: "ARS" }, "conversando").salida.estado === "conversando");
delete process.env.CHAT_ARS_POR_USD;
fijarCotizacion(null);
espero("repetir '30 mil dólares' como 30.000 no es precio inventado", !violaciones("Un auto sale entre 12.000 y 30.000 dólares", "Un auto sale entre 12 y 30 mil dólares").includes("precio-no-autorizado"));
espero("un monto que nadie dijo sigue marcando", violaciones("Te sale 45.000 dólares", "Un auto sale entre 12 y 30 mil dólares").includes("precio-no-autorizado"));
espero("whatsapp válido", normalizarWhatsapp("+54 9 299 512-3456") === "+5492995123456");
espero("whatsapp inválido", normalizarWhatsapp("1234") === null);

console.log(fallas ? `\n${fallas} fallas` : "\ntodas las guardas disparan y callan donde deben");
process.exit(fallas ? 1 : 0);
