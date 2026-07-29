"use client";

import { useEffect, useRef, useState } from "react";
import {
  generarMapa,
  generarRonda2,
  registrarContacto,
  type ResultadoRonda2,
} from "./acciones";
import { Mapa } from "./mapa";
import {
  CIERRE,
  MAX_TEXTO_CORTO,
  RONDA_1,
  type Contacto,
  type MapaOperativo,
  type Pregunta,
  type PreguntaGenerada,
  type Respuestas,
} from "./preguntas";

/**
 * La entrevista, en cuatro fases:
 *
 *   ronda1 → contacto → ronda2 → informe
 *
 * El contacto va en el MEDIO a propósito: es el punto de máximo compromiso (ya
 * escribió lo difícil) y mínima resistencia (todavía no vio el informe).
 *
 * Mientras completa el contacto, las preguntas de la ronda 2 ya se están
 * generando en segundo plano. Son ~10 segundos de modelo contra ~25 de tipear
 * nombre, empresa, mail y teléfono: cuando termina, las preguntas casi siempre
 * están listas y no ve ninguna espera. Ese solapamiento es la razón de que el
 * contacto esté acá y no en otro lado.
 */
type Fase = "ronda1" | "contacto" | "ronda2";

/**
 * Para la barra de progreso, antes de saber cuántas preguntas va a escribir el
 * modelo (son entre 5 y 8). Se usa solo para que la barra avance de forma
 * monótona: si se usara el total real recién al llegar a la ronda 2, la barra
 * retrocedería a la mitad justo después del paso más costoso del formulario.
 */
const GENERADAS_ESTIMADAS = 7;

function IconoFlecha({ atras = false }: { atras?: boolean }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`h-4 w-4 ${atras ? "rotate-180" : ""}`}
      aria-hidden="true"
    >
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

function Progreso({
  hechos,
  total,
  tramo,
  posicion,
  deTramo,
}: {
  hechos: number;
  total: number;
  tramo: string;
  posicion: number;
  deTramo: number;
}) {
  // (hechos + 1): en el primer paso la barra tiene que mostrar avance, no un 0%
  // que parece que la página está rota.
  const pct = Math.min(100, Math.round(((hechos + 1) / total) * 100));
  return (
    <div className="mb-8">
      <div className="mb-2 text-xs text-muted">
        <span className="font-medium text-text">{tramo}</span>
        <span> · {posicion} de {deTramo}</span>
      </div>
      <div
        className="h-1.5 w-full overflow-hidden rounded-full bg-border"
        role="progressbar"
        aria-valuenow={pct}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label="Progreso de la entrevista"
      >
        <div
          className="h-full rounded-full bg-primary transition-[width] duration-300 motion-reduce:transition-none"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}

function Opcion({
  tipo,
  nombre,
  valor,
  marcada,
  onChange,
}: {
  tipo: "unica" | "multiple";
  nombre: string;
  valor: string;
  marcada: boolean;
  onChange: () => void;
}) {
  return (
    <label
      className={`flex min-h-[52px] cursor-pointer items-center gap-3 rounded-xl border px-4 py-3 text-base transition-colors duration-200 has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-primary has-[:focus-visible]:ring-offset-2 ${
        marcada
          ? "border-primary bg-primary/5 text-text"
          : "border-border bg-surface text-text hover:border-primary/40 hover:bg-primary/[0.03]"
      }`}
    >
      <input
        type={tipo === "unica" ? "radio" : "checkbox"}
        name={nombre}
        value={valor}
        checked={marcada}
        onChange={onChange}
        className="sr-only"
      />
      <span
        aria-hidden="true"
        className={`flex h-5 w-5 shrink-0 items-center justify-center border-2 transition-colors duration-200 ${
          tipo === "unica" ? "rounded-full" : "rounded-md"
        } ${marcada ? "border-primary bg-primary" : "border-border bg-surface"}`}
      >
        {marcada && (
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="white"
            strokeWidth={3.5}
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-3 w-3"
          >
            <path d="M20 6 9 17l-5-5" />
          </svg>
        )}
      </span>
      <span className="leading-snug">{valor}</span>
    </label>
  );
}

/** Una pregunta, sea fija o escrita por el modelo: se renderizan igual. */
function BloquePregunta({
  pregunta,
  respuestas,
  setRespuestas,
  onEnter,
}: {
  pregunta: Pregunta | PreguntaGenerada;
  respuestas: Respuestas;
  setRespuestas: React.Dispatch<React.SetStateAction<Respuestas>>;
  onEnter: () => void;
}) {
  const max = ("max" in pregunta && pregunta.max) || MAX_TEXTO_CORTO;
  const largo = max > MAX_TEXTO_CORTO;
  const actual = respuestas[pregunta.id];

  function elegir(opcion: string) {
    setRespuestas((prev) => {
      if (pregunta.tipo === "unica") return { ...prev, [pregunta.id]: opcion };
      const actuales = (prev[pregunta.id] as string[] | undefined) ?? [];
      return {
        ...prev,
        [pregunta.id]: actuales.includes(opcion)
          ? actuales.filter((o) => o !== opcion)
          : [...actuales, opcion],
      };
    });
  }

  const comun = {
    id: pregunta.id,
    name: pregunta.id,
    autoFocus: true,
    maxLength: max,
    placeholder: "placeholder" in pregunta ? pregunta.placeholder : undefined,
    value: (actual as string) ?? "",
    "aria-label": pregunta.titulo,
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setRespuestas((prev) => ({ ...prev, [pregunta.id]: e.target.value })),
    className:
      "w-full rounded-xl border border-border bg-surface px-4 text-base text-text outline-none transition-colors duration-200 placeholder:text-muted focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-1",
  };

  return (
    <fieldset>
      <legend className="text-xl font-semibold leading-snug text-text sm:text-2xl">
        {pregunta.titulo}
      </legend>
      {pregunta.ayuda && <p className="mt-2 text-sm leading-relaxed text-muted">{pregunta.ayuda}</p>}
      {pregunta.tipo === "multiple" && (
        <p className="mt-1 text-xs text-muted">Podés marcar más de una.</p>
      )}

      {pregunta.tipo === "texto" ? (
        <div className="mt-5">
          {largo ? (
            // La pregunta del flujo necesita espacio de verdad: con un input de
            // una línea la gente escribe una línea, y esa respuesta es la que
            // sostiene todo el resto del sistema.
            <textarea {...comun} rows={7} className={`${comun.className} min-h-[168px] py-3 leading-relaxed`} />
          ) : (
            <input {...comun} type="text" className={`${comun.className} min-h-[52px]`} onKeyDown={(e) => {
              if (e.key === "Enter") onEnter();
            }} />
          )}
          {largo && (
            <p className="mt-2 text-right text-xs text-muted">
              {((actual as string) ?? "").length} / {max}
            </p>
          )}
        </div>
      ) : (
        <div className="mt-5 space-y-2.5">
          {pregunta.opciones.map((opcion) => {
            const marcada = Array.isArray(actual) ? actual.includes(opcion) : actual === opcion;
            return (
              <Opcion
                key={opcion}
                tipo={pregunta.tipo as "unica" | "multiple"}
                nombre={pregunta.id}
                valor={opcion}
                marcada={marcada}
                onChange={() => elegir(opcion)}
              />
            );
          })}
        </div>
      )}
    </fieldset>
  );
}

const PASOS_ESPERA = [
  "Leyendo lo que contaste",
  "Mapeando cómo circula un trabajo por tu empresa",
  "Armando las preguntas que faltan",
];

function Esperando() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((n) => Math.min(n + 1, PASOS_ESPERA.length - 1)), 3500);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="py-10 text-center" aria-live="polite">
      <svg viewBox="0 0 24 24" className="mx-auto h-6 w-6 animate-spin text-primary motion-reduce:animate-none" aria-hidden="true">
        <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth={3} strokeOpacity={0.25} />
        <path d="M12 2a10 10 0 0 1 10 10" fill="none" stroke="currentColor" strokeWidth={3} strokeLinecap="round" />
      </svg>
      <p className="mt-5 text-base font-medium text-text">{PASOS_ESPERA[i]}...</p>
      <p className="mt-2 text-sm text-muted">
        Las que siguen son para tu empresa, no un cuestionario armado de antes.
      </p>
    </div>
  );
}

const CONTACTO_VACIO: Contacto = { nombre: "", empresa: "", email: "", telefono: "" };

const CAMPOS = [
  { id: "nombre", label: "Tu nombre", type: "text", autoComplete: "name" },
  { id: "empresa", label: "Empresa", type: "text", autoComplete: "organization" },
  { id: "email", label: "Mail", type: "email", autoComplete: "email" },
  { id: "telefono", label: "Teléfono", type: "tel", autoComplete: "tel" },
] as const;

export function Formulario() {
  const [fase, setFase] = useState<Fase>("ronda1");
  const [paso, setPaso] = useState(0);
  const [respuestas1, setRespuestas1] = useState<Respuestas>({});
  const [respuestas2, setRespuestas2] = useState<Respuestas>({});
  const [generadas, setGeneradas] = useState<PreguntaGenerada[]>([]);
  const [contacto, setContacto] = useState<Contacto>(CONTACTO_VACIO);
  const [esperando, setEsperando] = useState(false);
  const [enviando, setEnviando] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [mapa, setMapa] = useState<MapaOperativo | null>(null);

  // La generación de la ronda 2, disparada al entrar al contacto y esperada
  // recién al salir. `firma` guarda con qué respuestas se disparó: si vuelve
  // atrás y cambia algo de la ronda 1, hay que volver a pedirlas — pero si va y
  // viene sin tocar nada, no se gasta otra llamada.
  const pedido = useRef<{ firma: string; promesa: Promise<ResultadoRonda2> } | null>(null);

  // El alta en el CRM se hace una sola vez, aunque vuelva atrás y avance de
  // nuevo: el endpoint deduplica, pero no hay razón para pegarle de más.
  const registrado = useRef(false);

  if (mapa) return <Mapa mapa={mapa} empresa={contacto.empresa} />;

  const preguntasRonda2: (Pregunta | PreguntaGenerada)[] = [...generadas, ...CIERRE];
  const totalEstimado = RONDA_1.length + 1 + GENERADAS_ESTIMADAS + CIERRE.length;
  const total = generadas.length
    ? RONDA_1.length + 1 + preguntasRonda2.length
    : totalEstimado;

  const preguntaActual =
    fase === "ronda1" ? RONDA_1[paso] : fase === "ronda2" ? preguntasRonda2[paso] : null;
  const respuestas = fase === "ronda1" ? respuestas1 : respuestas2;
  const setRespuestas = fase === "ronda1" ? setRespuestas1 : setRespuestas2;

  const hechos =
    fase === "ronda1" ? paso : fase === "contacto" ? RONDA_1.length : RONDA_1.length + 1 + paso;

  const r = preguntaActual ? respuestas[preguntaActual.id] : undefined;
  const puedeSeguir =
    fase === "contacto"
      ? CAMPOS.every((c) => contacto[c.id].trim().length > 0)
      : Array.isArray(r)
        ? r.length > 0
        : // espacios en blanco no cuentan como respuesta
          (r ?? "").trim().length > 0;

  function pedirRonda2() {
    const firma = JSON.stringify(respuestas1);
    if (pedido.current?.firma === firma) return;
    pedido.current = { firma, promesa: generarRonda2(respuestas1) };
  }

  async function pasarARonda2() {
    setError(null);

    // El lead entra al CRM acá, no al final: si abandona la ronda 2, el teléfono
    // ya está guardado. No se espera la respuesta a propósito — que el CRM esté
    // lento o caído no puede frenar la entrevista.
    if (!registrado.current) {
      registrado.current = true;
      void registrarContacto(respuestas1, contacto);
    }

    pedirRonda2();
    setEsperando(true);
    const resultado = await pedido.current!.promesa;
    setEsperando(false);
    if (!resultado.ok) {
      // La promesa quedó resuelta con error: se descarta para que reintentar
      // vuelva a pedirlas de verdad.
      pedido.current = null;
      setError(resultado.error);
      return;
    }
    setGeneradas(resultado.preguntas);
    setFase("ronda2");
    setPaso(0);
  }

  async function enviar() {
    setEnviando(true);
    setError(null);
    const resultado = await generarMapa({
      ronda1: respuestas1,
      generadas,
      ronda2: respuestas2,
      contacto,
    });
    setEnviando(false);
    if (resultado.ok) setMapa(resultado.mapa);
    else setError(resultado.error);
  }

  function siguiente() {
    if (!puedeSeguir) return;
    setError(null);
    if (fase === "ronda1") {
      if (paso === RONDA_1.length - 1) {
        pedirRonda2(); // arranca a generar mientras completa el contacto
        setFase("contacto");
        setPaso(0);
      } else {
        setPaso((p) => p + 1);
      }
      return;
    }
    if (fase === "contacto") return void pasarARonda2();
    if (paso === preguntasRonda2.length - 1) return void enviar();
    setPaso((p) => p + 1);
  }

  function atras() {
    setError(null);
    if (fase === "ronda1") return setPaso((p) => Math.max(0, p - 1));
    if (fase === "contacto") {
      setFase("ronda1");
      setPaso(RONDA_1.length - 1);
      return;
    }
    if (paso === 0) {
      setFase("contacto");
      setPaso(0);
      return;
    }
    setPaso((p) => p - 1);
  }

  const ocupado = esperando || enviando;

  if (esperando) {
    return (
      <div className="mx-auto max-w-2xl">
        <Esperando />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl">
      <Progreso
        hechos={hechos}
        total={total}
        tramo={
          fase === "ronda1" ? "Tu empresa" : fase === "contacto" ? "Tus datos" : "Tu operación"
        }
        posicion={fase === "contacto" ? 1 : paso + 1}
        deTramo={fase === "ronda1" ? RONDA_1.length : fase === "contacto" ? 1 : preguntasRonda2.length}
      />

      {preguntaActual && (
        <BloquePregunta
          key={preguntaActual.id}
          pregunta={preguntaActual}
          respuestas={respuestas}
          setRespuestas={setRespuestas}
          onEnter={siguiente}
        />
      )}

      {fase === "contacto" && (
        <div>
          <h2 className="text-xl font-semibold leading-snug text-text sm:text-2xl">
            ¿A dónde te mandamos el análisis?
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-muted">
            Con lo que contaste ya estamos armando las preguntas que faltan, hechas para tu
            empresa. Son unas pocas y después ves el análisis completo en pantalla. También
            te queda por mail.
          </p>
          <div className="mt-5 space-y-4">
            {CAMPOS.map((campo) => (
              <div key={campo.id}>
                <label htmlFor={campo.id} className="mb-1.5 block text-sm font-medium text-text">
                  {campo.label}
                </label>
                <input
                  id={campo.id}
                  name={campo.id}
                  type={campo.type}
                  required
                  autoComplete={campo.autoComplete}
                  value={contacto[campo.id]}
                  onChange={(e) => setContacto((prev) => ({ ...prev, [campo.id]: e.target.value }))}
                  className="min-h-[48px] w-full rounded-xl border border-border bg-surface px-4 text-base text-text outline-none transition-colors duration-200 placeholder:text-muted focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-1"
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {error && (
        <div
          role="alert"
          className="mt-5 rounded-xl border border-red-300 bg-red-50 px-4 py-3 text-sm text-red-800"
        >
          <p>{error}</p>
          <p className="mt-1 text-red-700">
            Si vuelve a pasar, escribime a{" "}
            <a
              href="mailto:faustino@fwlabsllc.com?subject=Mapa%20operativo"
              className="cursor-pointer font-medium underline focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
            >
              faustino@fwlabsllc.com
            </a>{" "}
            y lo hago a mano.
          </p>
        </div>
      )}

      <div className="mt-8 flex items-center justify-between gap-4">
        <button
          type="button"
          onClick={atras}
          disabled={(fase === "ronda1" && paso === 0) || ocupado}
          className="inline-flex min-h-[48px] cursor-pointer items-center gap-2 rounded-xl px-4 text-sm font-medium text-muted transition-colors duration-200 hover:text-text focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-0"
        >
          <IconoFlecha atras />
          Atrás
        </button>

        <button
          type="button"
          onClick={siguiente}
          disabled={!puedeSeguir || ocupado}
          className="inline-flex min-h-[48px] flex-1 cursor-pointer items-center justify-center gap-2 rounded-xl bg-primary px-6 text-base font-semibold text-white transition-[filter,opacity] duration-200 hover:brightness-110 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-40 sm:flex-none sm:px-8"
        >
          {enviando ? (
            <>
              <svg
                viewBox="0 0 24 24"
                className="h-4 w-4 animate-spin motion-reduce:animate-none"
                aria-hidden="true"
              >
                <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth={3} strokeOpacity={0.3} />
                <path d="M12 2a10 10 0 0 1 10 10" fill="none" stroke="currentColor" strokeWidth={3} strokeLinecap="round" />
              </svg>
              Armando tu análisis...
            </>
          ) : fase === "contacto" ? (
            <>
              Seguir
              <IconoFlecha />
            </>
          ) : fase === "ronda2" && paso === preguntasRonda2.length - 1 ? (
            "Ver mi análisis completo"
          ) : (
            <>
              Siguiente
              <IconoFlecha />
            </>
          )}
        </button>
      </div>

      {enviando && (
        <p aria-live="polite" className="mt-4 text-center text-sm text-muted">
          Esto tarda unos segundos. No cierres la pestaña.
        </p>
      )}
    </div>
  );
}
