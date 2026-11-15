# /chat — Fawel en la web

Página de destino de los anuncios de Meta. Habla un agente de IA que en pocas preguntas
le dice al dueño del negocio si Fawel le sirve; si le sirve, le pide el WhatsApp y le
muestra el botón para coordinar el diagnóstico gratis con Faustino (Calendly).

## Cómo está armado

```
app/chat/page.tsx        página (estática). Pinta el saludo sin llamar al modelo.
app/chat/Chat.tsx        el chat (cliente). Guarda la conversación en sessionStorage.
app/components/meta-pixel.tsx  píxel de Meta de toda la landing: <MetaPixel/> (init +
                         PageView, y PageView en cada navegación) y trackMeta().
app/api/chat/route.ts    POST /api/chat: un turno. Origen, límites, sesión, CRM.
app/api/chat/motor.ts    llamada al modelo + reglas duras + un reintento.
app/api/chat/prompt.ts   saludo, prompt y formato de salida (JSON estricto).
app/api/chat/reglas.ts   lo que el código no le deja decidir al modelo.
app/api/chat/sesion.ts   sesión firmada con HMAC (viaja en el navegador).
app/api/chat/crm.ts      alta en FW Central (apagada por defecto).
app/api/chat/_pruebas/   simulador de leads y prueba de las guardas.
```

- **El modelo devuelve JSON** (`mensaje`, `estado`, `mostrar_agenda` y lo que dijo la
  persona). La página nunca muestra un link escrito por el modelo: el botón de la agenda
  lo pone el código.
- **El filtro lo hace cumplir el código** (`reglas.ts`): no hay "califica" con menos de
  10 consultas por día ni sin ticket alto, y la agenda solo aparece con "califica".
- **Reglas duras por código** (`violaciones()`): links, mails, montos fuera del rango,
  lenguaje de venta, "te entiendo", "gestionar", markdown, reservas que no hizo,
  promesas de resultados, decir que es humano. Si una respuesta rompe una, se le pide
  otra al modelo una vez; si vuelve a romperla, se muestra un texto neutro y queda en el log.

## Variables de entorno

| Variable | Default | Qué hace |
|---|---|---|
| `OPENAI_API_KEY` | — (obligatoria) | La misma que usa `/mapa-operativo` |
| `OPENAI_CHAT_MODEL` | `gpt-5.6-luna` | Modelo del agente |
| `OPENAI_CHAT_ESFUERZO` | `low` | Razonamiento: `minimal`, `low` o `medium` |
| `CHAT_SESSION_SECRET` | — (obligatoria en producción, 32+ caracteres) | Firma de la sesión. Sin ella, en producción el chat responde 503 |
| `CHAT_PROMPT_PRECIO` | vacío | Qué dice si insiste con el precio. **Va por entorno porque este repo es público** y el rango no está publicado en la web. Sin ella, el agente nunca da un número. Los montos que aparezcan acá son los únicos que la regla de precio deja pasar |
| `NEXT_PUBLIC_CALENDLY_URL` | `https://calendly.com/fwlabs/llamada-gratuita` | Link del botón. Se le agrega `name` y `utm_source=fawel-chat` |
| `NEXT_PUBLIC_META_PIXEL_ID` | `2300484020732999` | ID del píxel (es público: va en el HTML) |
| `CHAT_CRM_ACTIVO` | apagado | `1` para cargar los leads en FW Central. Con cualquier otro valor no escribe nada |
| `CHAT_DOLAR_CASA` | `bolsa` (MEP) | qué dólar de dolarapi.com se usa en vivo para pasar a USD un ticket en pesos (`cotizacion.ts`, cacheado una hora) |
| `CHAT_ARS_POR_USD` | vacío | respaldo si dolarapi.com no contesta. Sin cotización viva ni respaldo, un ticket en pesos queda a juicio del modelo |
| `SMTP_*`, `CONTACT_TO_EMAIL`, `CONTACT_FROM_EMAIL` | los de `/api/contact` | mail a Faustino la primera vez que un lead deja WhatsApp (`aviso.ts`). Sin SMTP queda en el log |
| `FW_CENTRAL_API_TOKEN` | — | Token con alcance `crm` y escritura (el de la landing) |
| `FW_CENTRAL_URL` | `https://panel.fwlabsllc.com` | |
| `CHAT_MAX_MENSAJES` | 16 | Mensajes del usuario por conversación |
| `CHAT_MAX_LARGO` | 600 | Caracteres por mensaje |
| `CHAT_MAX_POR_IP` | 60 | Mensajes por IP por hora |
| `CHAT_MAX_SESIONES_POR_IP` | 8 | Conversaciones nuevas por IP por hora |
| `CHAT_MAX_GLOBAL` | 1200 | Mensajes por hora en total: es el techo del gasto |

Las `NEXT_PUBLIC_*` se leen **al hacer el build** (la página es estática): si cambian,
hay que volver a construir.

Los contadores por IP y global viven en memoria: alcanzan con una sola instancia.

## Píxel de Meta

`<MetaPixel />` está montado **una sola vez en `app/layout.tsx`** (15-11), así mide la home
y `/chat`. No montarlo también en una página: el PageView de navegación saldría doble.

| Momento | Evento |
|---|---|
| Entra a `/chat` | `PageView` |
| Manda su primer mensaje | `PrimerMensajeChat` (custom) |
| Califica | `Lead`, una vez por conversación (lo decide el server) |
| Deja el WhatsApp sin calificar | `ContactoSinCalificar` (custom), una vez |
| Toca el botón de la agenda | `Schedule` |

Todos llevan los `utm_*` y `v` de la URL, para comparar variantes (`/chat?v=B`).

## FW Central

Con `CHAT_CRM_ACTIVO=1`, la primera vez que la persona deja un WhatsApp se hace
`POST /api/v1/empresas` (el mismo patrón que `/mapa-operativo`) con `segmento:
"inbound-meta-chat"`, el WhatsApp en `whatsapp` y `telefono`, el rubro y en `notas` el
estado, el volumen, el ticket, el origen y la conversación entera hasta ahí. Si FW
Central falla, el chat sigue y queda en el log.

Lo que no cubre la API de hoy: si el número ya existía en el CRM, el alta se descarta como
duplicada y lo del chat no se guarda; y lo que pase en la conversación después del alta no
se suma, porque el `PATCH` de notas busca por email y el chat no lo pide.

## Probar

```bash
npx tsx app/api/chat/_pruebas/reglas.test.ts     # las guardas, sin red
OPENAI_API_KEY=... CHAT_PROMPT_PRECIO="..." \
  npx tsx app/api/chat/_pruebas/simular.ts [id ...] --salida=/tmp/sim   # 13 leads simulados, cuesta plata
```

El simulador corre el mismo motor y prompt que la ruta, de a una conversación, con los
estímulos clave sembrados. Sale con 1 si algún escenario falla. Leé las conversaciones,
no solo el resumen: un rojo puede ser falso positivo y un verde puede no haber ejercitado nada.


## Decisiones (15-11)

- **Piso de ticket: USD 500.** El modelo anota `ticket_monto` y `ticket_moneda` tal cual; `reglas.ts` hace la cuenta y no deja calificar por debajo, diga lo que diga el modelo. Los pesos se pasan a dólares con el MEP en vivo (dolarapi.com). Sin monto, otra moneda o sin cotización, decide el juicio del modelo.
- **Umbral de volumen: 10 consultas por día.**
- **Aviso por mail** la primera vez que un lead deja su WhatsApp, con el estado en el asunto (`aviso.ts`).
- Quedan `noindex`, los `utm_*`/`v` en el píxel y el CRM, y el estado `pendiente`.
- Fawel atiende en cualquier canal y para cualquier rubro: el prompt no habla solo de WhatsApp.
