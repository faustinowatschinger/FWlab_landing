# Propuesta corporativa FW Labs — revisión local

Actualización: 2026-10-06. Textos escritos por Faustino e integrados con autorización explícita. **No publicada.**

Estado actual: las ocho partes están incorporadas en inicio y páginas de clientes. Las secciones de seguimiento fechadas más abajo conservan la historia de las iteraciones y sus pendientes anteriores; el estado actual y el último seguimiento los reemplazan.

## Alcance

Home de cinco bloques: presentación, empresas con las que trabajamos, método, founder y contacto. Cada cliente tiene una página estática propia con contexto y trabajos. Inter, fondo claro cálido, azul #20409a y logo original de FW Labs. La copia transparente `public/logo-fw-original.png` es idéntica al archivo de marca; el encuadre CSS sólo retira el espacio vacío de su lienzo cuadrado. La tarjeta social usa el archivo original blanco ya existente. CSS encapsulado en `app/corporate.module.css`; las rutas anteriores conservan su diseño. Home renderizada en servidor, salvo el formulario de contacto cliente pequeño; sin librerías nuevas, embeds ni seguimiento.

Contacto: mail directo y formulario propio hacia el destinatario configurado por `CONTACT_TO_EMAIL`, con respuesta al mail del visitante mediante `Reply-To`. Pide nombre, mail, teléfono y mensaje, dejando empresa como opcional. Calendly ya no aparece en el contacto de inicio. El endpoint valida datos, incluye honeypot y un límite básico en memoria; no usa CRM, tracking ni proveedores de formularios. Se conserva `/#agendar`, usado por otras rutas. La entrega SMTP se verificó contra un receptor local aislado, sin correo externo de prueba.

Metadata, JSON-LD y tarjetas sociales actualizados al posicionamiento corporativo. Claim 327 retirado del código, incluso del componente hero anterior que ya no se usa. Los documentos `Copy_Web_FWlabs*.md` son históricos para esta propuesta: contienen cifras y oferta anteriores que NO autorizan afirmaciones nuevas. `Copy_Web_FWlabs_v2.md` traía una edición ajena de ruta; se conserva íntegra.

## Evidencia editorial y permisos

- Identidad y método: instrucciones explícitas de Faustino en esta conversación; aclaración del 2026-10-01 en `../../CLAUDE.md`. Son prioritarias sobre las ofertas históricas.
- 3W: `../../memory/decisiones.md` §13 registra permiso público para el caso con nombre, capturas y demostraciones. §1 retira la métrica de bandera. El pedido actual confirma sistemas de gestión y operación implementados; se omiten cantidad de plantas, continuidad, ahorros y resultados cuantificados.
- Imágenes: Faustino entregó fotos propias y capturas de ambos clientes, autorizó incorporarlas a la propuesta local y después pidió expresamente verlas completas, sin censura. Todas están incorporadas; no se modificaron originales. No autoriza publicar la propuesta.
- Altaterra: nombre/logo autorizados por pedido explícito; agente en prueba en un solo loteo y ampliación pendiente. El relato actual de Faustino confirma que la relación empezó con una llamada en frío y después una reunión presencial; reemplaza el resumen anterior centrado en la demostración. Sin métricas ni agenda automática.
- PLC/HMI: `../plc-agentico/CLAUDE.md` registra desarrollo offline, sin aprobación de planta; `../plc-producto/CLAUDE.md` y el pedido actual mantienen el gate de prueba aislada. Aparece sólo como desarrollo, sin enlace o página de producto y sin oferta de contratación.
- Founder y relación3W: relato directo de Faustino del2026-10-06. Tiene18años, comenzó programación a los14, aprendió de familia/pueblo;3Wempresa familiar, primeraweb, propuestaControl a su padre y cerca de un año de desarrollo. No se inventan lugar, nombres de familiares, resultados ni tamaño de equipo.

## Pendientes actuales

1. **WhatsApp de contacto:** falta número o enlace elegido por Faustino. Se conserva el mail directo y el formulario propio, sin mostrar un acceso incompleto.
2. **SMTP de publicación:** antes de publicar, confirmar que `SMTP_*` y `CONTACT_*` estén configuradas en el hosting. La ruta y el transporte se probaron sólo contra SMTP local aislado; no se envió un correo a una casilla externa.
3. **3W Stock:** la captura suministrada muestra carga sin conexión y está incorporada/rotulada tal cual. Una captura con datos cargados mejoraría el caso. Confirmar qué otros módulos ya están en uso antes de ampliar el estado público; se conserva la validación documentada.
4. **Publicación:** propuesta pendiente de revisión y aprobación explícita de Faustino. Se conserva la franja de revisión.

Fotos, capturas e historia personal/familiar ya están entregadas e incorporadas. Origen y orden de la relación3W ya no están pendientes.

## Límites de la entrega

No deploy, push, commit ni cambios en VPS. Sin modificaciones a rutas `/mapa-operativo`, `/guia-claude-code` o al video existente de `/caso`. El sitemap anterior incluye `/mapa-operativo` aunque la documentación lo describe como diferido: pendiente de decisión antes de publicar, fuera del rediseño de home. Los archivos originales en `public/` siguen en el repo, y algunos podrían ser accesibles en una publicación futura; revisar su autorización por separado antes del deploy.

## Verificación

- `npm run build`: exit 0, compilación + TypeScript + generación estática de 10 páginas. Build final probado con `next start` en `http://127.0.0.1:3101`.
- `npm run lint`: exit 0; warning previo en `app/guia-claude-code/page.tsx` por `DOWNLOAD_URL` sin uso. ESLint de archivos tocados y `npx tsc --noEmit`: exit 0 (verificador independiente).
- Playwright contra build optimizado: PASS en 1440×1000, 768×1024, 390×844 y 320×700. Sin overflow horizontal ni errores JS; anclas de header, `#agendar`, mailto, destino de Calendly, salto por teclado y presencia de targets validados.
- `/caso`, `/guia-claude-code`, `/mapa-operativo` y ambas imágenes sociales: HTTP 200.
- axe-core WCAG 2 A/AA y 2.1 AA: cero infracciones automáticas, 23 reglas aprobadas por viewport, en 1440, 390 y 320 px. Inspección visual de capturas escritorio/móvil realizada; la automatización no sustituye todas las verificaciones manuales de accesibilidad.
- Calendly: HTTP 200 y página real de Faustino con selector de fechas, por navegador. Muestra «Llamada gratuita» de 30 min; la nueva home no afirma duración ni diagnóstico gratuito. Sin reserva ni envío. No se modificó la configuración externa.
- `git diff --check`: exit 0. El diff ajeno de `Copy_Web_FWlabs_v2.md` coincide con el del arranque.
- Capturas y resultados locales: `/tmp/fw-redesign-preview/desktop-1440.png`, `desktop-390.png`, `checks.json`, `accessibility.json`. Las capturas son del build optimizado, sin panel de desarrollo.
- `../../.claude/verificar.sh`: ejecutado desde HQ; detecta inconsistencias anteriores de tareas ajenas T-346, T-353 y T-222 sin `verificacion`, y aviso sobre T-013. Terminó con «VERIFICACIÓN FALLIDA — 20 cosas rotas», incluyendo harness de otros proyectos; T-380 no aparece como inconsistente. No se corrigieron tareas ni harness ajenos. El log completo está en `/tmp/fw-workspace-verify.log`.
- Revisión independiente: `../../.claude/estado/resultados/T-380-verificacion-redesign.md`, aprobada con pendientes de material real. Hallazgos H1 (contraste del foco en contacto) y H2 (gate interno mostrado) corregidos y reverificados. Una agenda o un mailto correcto no demuestra entrega de mensajes ni disponibilidad de horarios; no se ejecuta una reserva real.

## Seguimiento: logo original y proyectos — 2026-10-05

Pedido explícito de Faustino: poner el logo real y revisar `/3W` y `/Altaterra` antes de ampliar las explicaciones. No se modificaron archivos de esos proyectos; lectura documental y de código local, sin APIs, VPS o mensajes.

Fuentes más específicas:

- `../3W/Proyectos/3W-Control/CLAUDE.md` y `AGENTS.md`: plataforma de ingesta industrial, backend y app, motor antiguo apagado. `docs/ia-analisis-alertas.md`: la capa vigente analiza alertas y recomienda al operador; no escribe a PLC. `docs/config-history.md`: registro de cambios. No se importa el claim ni la descripción de IA autónoma del inventario antiguo `../3W/ECOSISTEMA-3W.md`.
- Código contrastado: `../3W/Proyectos/3W-Stock/desktop/renderer/src/App.jsx` (secciones y refresco por archivos), `../3W/Proyectos/3W-Control/live-backend/src/ai/alertAnalyzer.js` (persistencia y emisión de análisis) y `src/utils/configHistoryCapture.js` (registro de configuración).
- `../3W/Proyectos/3W-Stock/CLAUDE.md` y `README.md`: modernización de FoxPro, CSV originales como fuente de datos, clientes de escritorio sincronizados. Productos/clientes implementados; pedidos, presupuestos, mano de obra y recibos en validación/uso, publicados aquí conservadoramente como en validación.
- `../Altaterra/README.md`: agente responde, califica y deriva con resumen; no agenda. La escritura de fichas fue desplegada, pero la documentación aún registra validaciones reales pendientes. El caso conserva el estado general de prueba indicado por Faustino.
- `../Altaterra/dashboard/README.md` y `dashboard/app/(panel)/clientes/page.tsx`: revisión de conversaciones, fichas de interesados y derivaciones, corrección de datos y control del agente. Tokko está pausado; no se promete esa integración, conversiones ni despliegue en otros loteos.
- Logo azul: `../../marketing/assets/logo/logo1-sinfondo.png`, copiado sin editar sus píxeles. Logo blanco: `public/logo-fw-white.png`, utilizado para las imágenes sociales. Nombre público de Altaterra sigue pendiente de autorización.

La explicación pública distingue los dos sistemas de 3W y los dos componentes del proyecto inmobiliario. El nombre de clientes de 3W, los datos del loteo y los datos personales encontrados durante la lectura no se trasladan al sitio.

Verificación del seguimiento:

- `npm run build`: exit 0; `npx tsc --noEmit` y ESLint de page/OG: exit 0 sin warnings, verificados independientemente.
- Playwright contra el build actualizado en `localhost:3101`: PASS navegación/contacto/teclado y ausencia de overflow/errores JS en 1440, 768, 390 y 320 px. Logo header cargado al inicio y footer cargado al entrar en pantalla (lazy), comprobado en 1440/390/320. La primera comprobación de carga del footer antes de hacer scroll falló correctamente por lazy loading; se ajustó la prueba para esperar su entrada en viewport y carga, sin alterar el producto.
- SHA-256 idéntico entre el logo copiado y el original: `b2c0cb3603457820f2ec5b836daa484b6cde40a6f7b7a70cc0781e4664e609c9`. La revisión independiente confirmó que el encuadre preserva completo su contenido visible.
- axe-core WCAG 2 A/AA + 2.1 AA: 0 infracciones, 25 reglas aprobadas en 1440/390/320. Inspección visual de logo, casos y tarjeta social realizada.
- Imágenes sociales: HTTP200, logo original blanco visible y render inspeccionado. `git diff --check`: exit0.
- Informe independiente: `../../.claude/estado/resultados/T-381-verificacion-proyectos-logo.md`, APROBADO. Las capturas de `/tmp/fw-redesign-preview/` se actualizaron; vista previa local `http://localhost:3101`.
- Sin cambios a proyectos fuente, permisos públicos, producción o integraciones. Cambio ajeno de Copy preservado.

Cierre del seguimiento: el chequeo global obligatorio volvió a fallar por estado/harness ajenos. También señaló el formato del veredicto T-381 y el límite de historial; ambos se corrigieron en los registros propios. El chequeo específico de tareas posterior ya no señala T-381, sólo T-346/T-353/T-222 sin verificación y el aviso histórico T-013. Historial: 120/120 líneas. Logs: `/tmp/fw-followup-workspace-verify.log` y `/tmp/fw-followup-task-check.log`.

## Seguimiento: empresas primero — 2026-10-05

Pedido de Faustino: organizar por relación con cliente; tarjetas cortas en inicio, detalle por empresa, Productos separado cuando haya uno listo.

- Inicio: «Empresas con las que trabajamos», dos tarjetas con actividad, resumen concreto y enlace «Conocé el trabajo». Las imágenes representativas siguen identificadas como pendientes de material real autorizado.
- `/clientes/3w`: contexto de empresa y relación, trabajos Control/Stock/web institucional, necesidad/solución/imagen/estado por trabajo. Control y Stock con la precisión de estados ya verificada; web institucional respaldada en `../3W/Proyectos/3W-Landing/README.md`, `CLAUDE.md` y `../3W/ECOSISTEMA-3W.md` §3 (sólo funciones, sin cifras).
- `/clientes/proyecto-inmobiliario`: caso breve con contexto, origen en demostración y trabajo agente/panel. Origen respaldado en `../../memory/decisiones.md` §35. Nombre real permanece anónimo en copy, URL y metadata salvo confirmación pública expresa; se pidió ese dato por consulta asíncrona.
- **Origen de 3W pendiente:** no se encontró una narración verificable del primer encargo ni de su orden. Se muestra una nota de revisión solicitando esos datos; el texto sólo describe cómo la relación abarca distintos sistemas, sin inventar fechas ni una secuencia.
- **Productos reservado:** no se crea sección, enlace o página de producto ahora. El generador PLC/HMI no aparece como oferta ni como trabajo implementado. Su futura página sigue pendiente de la primera prueba aislada exitosa.
- Componentes compartidos server-side para header/footer, logo y placeholders. Navegación conserva `#proyectos`, `#caso` y `#agendar`, y permite volver desde cada cliente al inicio y contacto. Páginas y metadata se generan estáticamente; slugs inexistentes deben dar 404. Sitemap incluye ambos casos (anónimo con slug neutro) y conserva las rutas previas, con su pendiente de publicación ya indicado.

Verificación del seguimiento empresas primero:

- Build final exit0: 12 páginas, dos nuevas páginas cliente SSG. TypeScript y ESLint de los cinco archivos TS/TSX tocados exit0, confirmados por verificador independiente.
- Playwright contra `localhost:3101`: PASS en home + 2 clientes × 4 tamaños (1440, 768, 390 y 320 px), sin overflow horizontal ni errores JS. Comprobó cards→cliente→home, CTA cliente→contacto, navegación header, salto por teclado, logos cargados, estados por trabajo y canonicals. Sin mensajes ni reservas.
- Sitemap HTTP200 incluye ambos clientes con identidad neutral para el inmobiliario. Cliente inexistente, `/clientes/altaterra` y `/productos` devuelven404; no se creó una oferta de producto ni una ruta que revele la marca sin permiso. Anclas anteriores `#caso`/`#agendar` conservadas y comprobadas.
- axe-core WCAG2 A/AA +2.1 AA en3páginas×3tamaños: cero infracciones automáticas. Capturas home y páginas cliente desktop/móvil inspeccionadas. Resultados `/tmp/fw-client-preview/navigation.json` y `accessibility.json`; capturas `home-1440.png`, `home-390.png`, `3w-1440.png`, `3w-390.png`, `proyecto-inmobiliario-1440.png` y `proyecto-inmobiliario-390.png`.
- Alto de home a1440px: 4056→3332px; a390px: 5827→4802px (aprox18%menos, sin cambiar hero/método/founder/contacto).
- Informe independiente `../../.claude/estado/resultados/T-382-verificacion-clientes.md`: APROBADO, con marcador compatible con checker de tareas. `git diff --check`: exit0. Checklist React aplicado: componentes server-side pequeños, datos tipados compartidos, sin hooks/effects/estado ni librerías nuevas; enlaces semánticos, foco visible y landmarks preservados.
- Permiso público de Altaterra no confirmado al cierre: se conserva caso anónimo. Imágenes y origen exacto de la relación 3W pendientes. Sin modificaciones a repos fuente, commits, push o deploy.

Chequeo global final del seguimiento: `../../.claude/verificar.sh` desde HQ terminó con 20 fallas fuera del rediseño, como el chequeo anterior. T-382 y su informe no aparecen como inconsistentes; historial 120/120 y sesión ajena intacta. Log `/tmp/fw-clients-workspace-verify.log`. No se modificaron esas tareas o harness.

## Seguimiento: Altaterra, titular y logos — 2026-10-05

Faustino indicó explícitamente nombrar Altaterra y colocar los logos que entregó en la raíz. Esa instrucción supera el anonimato previo para nombre y marca en esta propuesta; no extiende autorización a datos personales, conversaciones ni fotos de terceros. No hubo publicación.

- Nombre Altaterra en inicio, página, metadata y sitemap; nueva URL `/clientes/altaterra`. La URL neutra anterior redirige temporalmente (307) para preservar los enlaces de revisión.
- H1 exacto: «Tecnologia que resuelve problemas reales», con el texto escrito como pidió Faustino, sin tilde en «Tecnologia». Titular de tarjeta social alineado.
- Tarjetas de inicio: originales `3w-removebg-preview.webp` y `logo-Altaterra.png`, copiados sin alterar píxeles a `public/clientes/`. Se muestran con proporción original, sin editar sus formas ni inventar imágenes. Los archivos raíz aportados por Faustino se conservan intactos.
- Las imágenes interiores de cada cliente siguen pendientes: Faustino las entregará más adelante. Estado inmobiliario en prueba en un loteo, validaciones de Stock, gate PLC/HMI y contexto de 3W no cambiaron.

Verificación del seguimiento:

- Build exit0 con 12 páginas y clientes3w/altaterra estáticos. TypeScript y ESLint de los cuatro archivos TS/TSX afectados exit0 sin warnings, confirmados por revisión independiente.
- Playwright: home y2clientes×4tamaños (1440/768/390/320px) PASS. H1 normalizado exacto, logos cargados, links de tarjetas/retorno/contacto, canonicals, nombre en metadata/sitemap, anclas, 404 inválidos y redirect307 del slug previo comprobados. Sin errores JS, overflow o envíos.
- axe-core: cero infracciones automáticas WCAG2 A/AA +2.1AA en3páginas×3tamaños. Capturas home desktop/móvil, tarjetas y social inspeccionadas en `/tmp/fw-logos-preview/`.
- SHA-256 original/copia coinciden: 3W `341027978206b24746ca2d1c85c9655226d1d399cd5039ca3dc3be6d42c3583e`; Altaterra `684281af774fb8999dc8dc926ba7694f43d758ca9444ecb250ec986ae9c22b8c`. No se editaron ni movieron archivos raíz del usuario.
- Informe independiente `../../.claude/estado/resultados/T-383-verificacion-nombre-logos.md`: APROBADO. `git diff --check`: exit0. Vista previa `http://localhost:3101` y cliente `http://localhost:3101/clientes/altaterra`.
- Sin publicación. Pendientes interiores de fotos/capturas y origen3W conservados; no se extiende el permiso de marcas a conversaciones ni datos personales.

Chequeo global obligatorio de cierre: terminado con las 20 fallas previas de otros ámbitos; T-383 no aparece como inconsistente, historial120/120 y sesión ajena intacta. No se modificaron esas tareas ni harness. Log `/tmp/fw-logos-workspace-verify.log`.

## Seguimiento: material real suministrado — 2026-10-05

Faustino suministró una foto personal, cuatro fotos de trabajo para 3W y capturas de Control, Stock, web institucional y Altaterra. Los originales en raíz no se modifican. La autorización de uso en esta propuesta no se extiende a publicar datos de otras personas.

- `IMG_0780.HEIC` → `public/media/faustino.webp`: foto en sección founder.
- `IMG_1404 2.HEIC` → `public/media/3w-en-planta.webp`: foto en relación de trabajo de 3W. Los logos siguen en inicio.
- Stock `13.07.16.png` → `public/media/3w-stock.webp`: captura real, rotulada como interfaz en carga y sin conexión; no se usa como prueba de funcionamiento operativo. Falta una captura con datos cargados.
- Conversación Altaterra `13.11.52.png` → `public/media/altaterra-conversacion.webp`: intercambio suministrado, sin teléfonos o identidad del interesado visibles. No se afirma que pruebe resultados, derivaciones o agendas.
- Control: captura `13.00.49` muestra correo personal y nombre de planta; `13.02.15` correo personal; `13.03.09` correos de operadores y varias empresas. Pendiente autorización para anonimizar por código, solicitada asíncronamente. No se copian a public sin tratamiento.
- Panel Altaterra `13.08.21` muestra nombres y teléfonos de interesados. Pendiente anonimización autorizada; el placeholder lo identifica.
- Web 3W `13.07.46` contiene claim 24h/365 y otros números no verificados. Se mantiene pendiente una captura sin esos claims o autorización para recortar la parte pertinente.
- `IMG_1406 2.HEIC`: otras personas visibles; falta confirmar permiso de imagen. `IMG_1425 2.HEIC`: marca GLOBALFRESH visible; falta autorización del tercero o tratamiento autorizado. `IMG_0625 2.HEIC`: laptop con código y terminal; pendiente retirar contenido de pantalla antes de servirla como imagen ampliable.

Optimización no generativa: sips para leer HEIC, orientación EXIF aplicada, copias WebP comprimidas sin metadatos, originales intactos. Next Image, lazy loading y tamaños responsive; enlaces a versión completa en otra pestaña. Esta entrega no autoriza publicación. Sigue pendiente contar el origen y orden de la relación con 3W.

Verificación de la versión parcial de revisión: `npm run build` exit0 (12 páginas), `npx tsc --noEmit` exit0, ESLint de los cuatro TS/TSX tocados exit0, `git diff --check` exit0. Playwright home/3W/Altaterra en1440/768/390/320px: PASS, sin overflow ni errores JS; imágenes lazy cargadas, enlaces de ampliación HTTP200, navegación/contacto/redirect/404/sitemap intactos. Sin formularios/envíos/reservas. Axe-core en3páginas×3tamaños: cero infracciones. Capturas desktop/móvil inspeccionadas, foto en planta sin recorte. Evidencias en `/tmp/fw-media-preview/`, logs `/tmp/fw-media-build.log`, `/tmp/fw-media-browser.log`, `/tmp/fw-media-a11y.log`.

Material incorporado:4WebP, unos443KB en total (antes de versiones de Next Image), sin librerías, servicios externos ni tracking nuevos. El resto queda identificado arriba; no se cargó a public. La tarea queda en revisión hasta resolver la anonimización y capturas pendientes, además de la aprobación final de publicación. No hay hash previo a la recepción para certificar identidad histórica de originales; sólo se leyeron y convirtieron con salida a otro archivo.

Revisión independiente: `../../.claude/estado/resultados/T-384-verificacion-material-real.md`, APROBADO para el subconjunto local; TypeScript/ESLint/diff-check repetidos exit0 e imágenes inspeccionadas. No aprueba imágenes pendientes ni publicación.

Chequeo global obligatorio: exit1 por las20 fallas ajenas ya existentes, sin fallas nuevas atribuibles a T-384. Historial119/120 líneas después de archivar íntegramente sólo entradas propias en historial/2026-10.md. Sesión global ajena preservada. Log `/tmp/fw-media-workspace-verify.log`.

## Corrección: incorporar las12imágenes — 2026-10-05

Faustino respondió «incorpora todo» a la consulta explícita sobre incorporar las12imágenes, anonimizar por código y usar fotos con otras personas/marcas en la propuesta local, sin publicar y conservando originales. Esto resuelve los pendientes de incorporación del seguimiento anterior; las notas previas describen la entrega parcial histórica.

Material actual y ubicación:

| Original | Copia servida | Ubicación |
|---|---|---|
| IMG_0780.HEIC | faustino.webp | Founder en inicio |
| IMG_1404 2.HEIC | 3w-en-planta.webp | Galería relación3W |
| IMG_1406 2.HEIC | 3w-recorrido.webp | Galería relación3W |
| IMG_0625 2.HEIC | 3w-desarrollo-en-planta.webp | Galería relación3W |
| IMG_1425 2.HEIC | 3w-tablero.webp | Galería relación3W |
| Control13.00.49 | 3w-control-lecturas.webp | Caso3W Control |
| Control13.02.15 | 3w-control-equipo.webp | Caso3W Control |
| Control13.03.09 | 3w-control-alertas.webp | Caso3W Control |
| Stock13.07.16 | 3w-stock.webp | Caso3W Stock |
| Web13.07.46 | 3w-web.webp | Caso web institucional3W |
| Altaterra13.11.52 | altaterra-conversacion.webp | Caso Altaterra |
| Altaterra13.08.21 | altaterra-panel.webp | Caso Altaterra |

Todas las copias en `public/media/`. Tratamiento determinista, sin IA ni contenido inventado: recorte de encabezados con correo en Control y máscaras sólidas para nombres de plantas/operadores; pantalla de laptop anonimizada por reducción irreversible a6×4píxeles del área y reescalado en las tres fotos nuevas para retirar código/terminal; panel recortado a filtros y tabla, sin métricas y con nombres/teléfonos tapados; web recortada a navegación/titular, sin cifras/continuidad no verificadas. Las marcas y personas de las fotos permanecen según autorización para esta revisión. Los enlaces de ampliación sólo sirven estas copias, nunca los originales.

Galería de cuatro fotos en3W; tres capturas de Control encolumnas en escritorio y apiladas en móvil. WhatsApp y panel de Altaterra juntos. No hay imágenes suministradas pendientes de incorporación ni placeholders de imágenes visibles. Se conservan alt/caption/dimensiones, Next Image y carga lazy. Home sigue con logos de clientes.

Pendientes editoriales: contar cómo empezó la relación con3W y orden de trabajos; sustituir Stock por una captura con datos cargados cuando la tengas (la actual sigue incorporada y rotulada sin conexión). Aprobar la propuesta antes de publicar. No se presenta Altaterra como desplegado en varios loteos ni PLC/HMI como producción.

Antes de este tratamiento se registró SHA256 de los12originales en `/tmp/fw-media-originals-before.json` para comprobar su conservación en esta corrección. No certifica identidad histórica previa a su recepción.

Verificación de incorporación completa: build exit0 (12páginas); TypeScript/ESLint/diff-check exit0. Playwrighthome+3W+Altaterra×1440/768/390/320px:12PASS; asserts de1/9/2imágenes respectivamente, cero placeholders, carga lazy de todas, enlaces de ampliación HTTP200, sin overflow/erroresJS, navegación/contacto/307/404/sitemap preservados, cero envíos. Axe3páginas×1440/390/320px:9corridas, cero infracciones. Inspección visual de3W desktop/móvil yAltaterra desktop realizada. Datos ycapturas `/tmp/fw-all-media-preview/`, logs `/tmp/fw-all-media-build.log`, `/tmp/fw-all-media-browser.log`, `/tmp/fw-all-media-a11y.log`.

SHA256antes/después del tratamiento:12/12originales idénticos. Copias servidas12WebP,1109934bytes (~1,1MB total para las tres páginas antes de variantes de NextImage). ChecklistReact: componentes server-side, galerías semánticas, alt/dimensiones/sizes, sin hooks/JSextra ni librerías/servicios nuevos. Sin publicación, commits/push/mensajes ni cambios a fuentes de clientes o al Copy ajeno.

Revisión independiente completa leída: `../../.claude/estado/resultados/T-384-verificacion-material-completo.md`, APROBADO. Inspeccionó las8copias nuevas, confirmó12rutas=12WebP,12hash originales idénticos y TypeScript/ESLint/diff-check0. T-384 completa para la propuesta local; no autoriza publicación.

Chequeo global obligatorio tras completar T-384: exit1, mismas20fallas ajenas previas; T-384 sin inconsistencias e historial120/120. No se tocaron tareas/harness ajenos ni sesión actual. Log `/tmp/fw-all-media-workspace-verify.log`.

## Seguimiento: imágenes completas y carrusel 3W — 2026-10-05

Faustino pidió: «pone todas las imagenes completas como te las pase sin censurar» y un carrusel para las fotos trabajando con3W; después confirmó «ok» al plan. Esta instrucción reemplaza el tratamiento anterior para la propuesta local. No autoriza publicación.

Las12referencias ahora usan copias `*-completa.webp`, que evitan las URLs cacheadas de versiones censuradas. Las nuevas copias conservan todo el encuadre y contenido de las fuentes: sólo orientación y conversión/compresión responsive, sin máscaras ni recortes. Dimensiones de capturas actualizadas. Se corrigieron captions/alt que decían «identidades ocultas» o «recorte». Los originales permanecen intactos. Las capturas completas muestran su contenido original; no se agregan al texto del caso claims de resultados o disponibilidad. Altaterra sigue en prueba en un loteo, Stock conserva sus estados y PLC/HMI sigue en desarrollo.

Las4fotos de trabajo3W forman un carrusel manual: foto entera con `object-fit:contain`, flechas anterior/siguiente, contador, scroll nativo táctil, teclado ArrowLeft/ArrowRight/Home/End, sin autoplay. Componente client pequeño, sin librerías nuevas ni seguimiento. Los demás componentes siguen server-side. Las capturas por sistema siguen en su lugar y los enlaces de ampliación sirven las versiones completas.

Verificación de fuentes: SHA256 de12originales idéntico antes/después, registrado en `/tmp/fw-uncensored-originals-before.json`. Se regeneraron conversiones HEIC a JPEG desde los originales en `/tmp/fw-full-original-source/` y se compararon las12WebP con una conversión íntegra directa: byte a byte iguales. Esto demuestra ausencia de recortes, máscaras o sustitución de píxeles más allá de la compresión. Resultado `/tmp/fw-full-original-verification.json`. Las copias censuradas anteriores se conservan en disco como material de la iteración previa y no están referenciadas por estas páginas.

Pruebas finales T-385: build12páginas exit0, TypeScript/ESLint/diff-check exit0. Playwright3páginas×1440/768/390/320px:12PASS, todas12imágenes completas cargadas, enlaces HTTP200, botones/límites/contador, teclado/Home/End, scroll nativo y `object-fit:contain`, sin overflow/erroresJS. Swipe real mediante eventos táctiles de Chromium en390px: PASS, avanza deFoto1aFoto2. Axe3páginas×1440/390/320px:9corridas, cero infracciones. Capturas de carrusel primera/cuarta foto y páginas completas en `/tmp/fw-carousel-preview/`; scripts/logs `/tmp/fw-carousel-*`.

El primer test detectó un desborde horizontal causado por `srOnly` absoluto de diapositivas fuera de vista; se corrigió dando posición relativa al track. Prueba diagnóstica1440px: scrollWidth3717→1440. Se repitieron build, TypeScript, navegación/overflow/carrusel/axe/touch sobre la versión corregida.

Los archivos ajenos y los12originales permanecen sin cambios. No se agregaron librerías, servicios externos, tracking ni autoplay. Pendientes editoriales anteriores de origen3W/capturaStock siguen; no falta ninguna imagen suministrada. No se publica.

Revisión independiente leída: `../../.claude/estado/resultados/T-385-verificacion-carrusel-completas.md`, APROBADO. TypeScript/ESLint/diff-check propios0,12hash originales idénticos, catálogo/dimensiones/captions completos y comparación visual/pixel de fuentes enteras compatibles con compresión. Carrusel y pruebas finales revisados. No autoriza publicación.

Chequeo global obligatorio T-385: exit1 con las mismas20fallas ajenas previas; T-385 sin inconsistencias, historial120/120 y sesión ajena intacta. No se alteró ese estado/harness. Log `/tmp/fw-carousel-workspace-verify.log`.

## Seguimiento: carrusel3W Control y histórico — 2026-10-05

Faustino pidió convertir también las capturas de3W Control en carrusel y sumar `Screenshot iPhone 17 05-10-2026 at14.36.43.png`; dio OK al plan. Se agrega como `public/media/3w-control-historico-completa.webp`,920×2000, conservando encuadre completo y contenido original. Alt/caption describen histórico de temperatura ambiente/pincha fruta y exportación de gráficas, sin resultados nuevos. Original verificado por SHA256antes/después; copia idéntica a conversión directa WebP, sin recortes/máscaras. Manifiesto `/tmp/fw-control-original-before.json`.

Control ahora muestra4capturas en carrusel manual. Se reutiliza el componente de fotos con título, etiqueta y término «Captura» configurables; cada instancia mantiene su propia referencia/estado/id de controles. Fotos3W conserva su carrusel de4. Ambos usan teclado, flechas, contador, scrolltáctil ycontain; no hay autoplay. Total13imágenes:1inicio,10en3W,2Altaterra. Resto de estados/casos/contacto intactos. Sin publicación.

Pruebas de integración: ambos carruseles tienen ids/estados independientes, conteo4/4, controles/límites/contador, teclado/Home/End y scrollnativo, más swipeControl390px. Primera corrida detectó overflow320px por mínimo intrínseco de cabecera deControl; `workVisual min-width:0` ywrapmóvil lo corrigen (340→320px). Para legibilidad, las capturas enmóvil usan su proporción natural completa, sin forzar marco3:4 de las fotos.

Verificación final T-386: build de12páginas, TypeScript/ESLint ydiff-check exit0. Playwright3páginas×1440/768/390/320px:12PASS, imágenes/enlaces/navegación/contacto y ambos carruseles independientes, sin overflow/erroresJS/envíos. Axe3páginas×1440/390/320px:9corridas sin infracciones. SwipeControl real390px:PASS, Captura2de4. Capturas finales completas en320/390/1440px inspeccionadas. Evidencia `/tmp/fw-control-preview/`, scripts/logs `/tmp/fw-control-*`.

Revisión independiente leída: T-386-verificacion-control-carrusel.md, APROBADO; checks propios después del build final exit0, original íntegro y carruseles/CSS revisados. No autoriza publicar.

Chequeo global obligatorio: exit1, mismas20fallas ajenas previas; no se modificaron. Historial119/120 y estado T-386 sin inconsistencia. Log /tmp/fw-control-workspace-verify.log.

## Seguimiento: marcos verticales de ambos carruseles — 2026-10-05

Faustino señaló que fotos y capturas verticales tenían marcos horizontales, y dio OK para corregir ambos. Se elimina altura fija560px y marco móvil3:4/max-height520px. Imágenes con width100%/heightauto ycontain respetan su proporción original. Fotos: carrusel centrado de máximo420px; Control: contenedor visual centrado de máximo352px (incluye padding), sin fondo extendido a toda la fila. Cabeceras permiten wrap y controles alineados a derecha. Sólo CSS: originales, catálogos, casos y comportamiento independientes intactos. Esta corrección reemplaza las dimensiones del marco descritas en iteraciones previas.

Build12páginas yTypeScript/diff-check exit0. Playwright12PASS (3páginas×1440/768/390/320), imágenes/enlaces/contacto/carruseles/teclado/scroll verificados, sin overflow/erroresJS/envíos. Axe9corridas sin infracciones. SwipeControl390PASS. Geometría32PASS: ocho imágenes×cuatro tamaños, marcos verticales, mismo ancho/alto que imagen, ratio original conservado. El primer assert contra naturalWidth/Height de la copia optimizada detectó redondeo Next; la comparación definitiva usa dimensiones fuente del catálogo. No requirió cambio de producto. Capturas desktop/móvil de ambos carruseles inspeccionadas completas. Evidencia /tmp/fw-vertical-preview/ y /tmp/fw-vertical-*.log. Sin publicar.

Revisión independiente leída: T-387-verificacion-marcos-verticales.md, APROBADO; visuales y32mediciones revisadas, sin bloqueantes.

Chequeo global obligatorio: exit1 por las mismas20fallas ajenas anteriores; historial120/120, sin tocar sesión ajena ni ampliar alcance. Log /tmp/fw-vertical-workspace-verify.log.

## Seguimiento: textos de Faustino — 2026-10-06

Pedido explícito «implementalo en la pagina» tras redactar las ocho partes de la web. Integrados en primera persona con correcciones de redacción: presentación/relación tecnológica, resúmenes de clientes, método completo (WhatsApp/reuniones/prueba acotada/acompañamiento), biografía real, contacto y relatos3W/Altaterra. Relación3W en párrafos legibles; retirada nota que pedía su origen. EstadosStock documentados, Altaterra un loteo en prueba y PLC/HMI en desarrollo conservados. Sin70%,327h, garantías de respuesta inmediata ni claim de revolucionar un sector. No se añadió enlaceWhatsApp sin número. Metadata/JSON-LD coherentes con propuesta. Ningún cambio de imágenes/carruseles/CSS, rutas o integraciones.

Ajuste CSS acotado al contacto: ambos párrafos reciben tipografía/espaciado de texto del bloque; el selector anterior sólo contemplaba el último. Marcos verticales/carruseles intactos.

Verificación finalT-388: build12páginas/TypeScript/ESLintdirigido/diff-check exit0. Browser12PASS (3páginas×4tamaños), Axe9corridas0infracciones, swipe390PASS,32medicionesmarcosverticalesPASS,6medicionescontactoPASS. Ningún envío/errorJS/overflow. Capturasdesktop/móvil yfounder/contacto inspeccionados. Evidencia /tmp/fw-copy-preview/ y/tmp/fw-copy-*.log. Páginas siguen servercomponents, sin nuevas dependencias/hooks ykeysestables.

Revisión independiente leída: T-388-verificacion-textos-faustino.md, APROBADO. Checks propios y evidencia final revisados; contacto/biografía móvil legibles. No autoriza publicar.

Chequeo global obligatorio: exit1 por las mismas20fallas ajenas anteriores; historial120/120 y T-388 sin inconsistencia. No se modificaron tareas/harness ajenos ni sesión global. Log /tmp/fw-copy-workspace-verify.log.

## Seguimiento: texto y carruseles lado a lado — 2026-10-06

Pedido y OK explícitos de Faustino. Historia3W: contexto y relación juntos en columna izquierda, carrusel de fotos en derecha. Control: necesidad/solución/estado en izquierda y carrusel en derecha, evitando el layout de galería múltiple que antes ocupaba toda la fila. Ambos se apilan hasta740px. Marcos verticales, copy, fotos completas, interacciones y restantes galerías conservados. No publicado.

VerificaciónT-389: build12páginas/tsc/ESLintdirigido/diff-check0; Browser12PASS, Axe9corridas0violaciones, swipe390PASS,32medicionesverticalesPASS y8medicionescolumnas/stackPASS. Capturas estabilizadas sin superposición de header para inspección de layout. Evidencia /tmp/fw-columns-preview/ y/tmp/fw-columns-*.log. Sin cambios de texto/fuentes/contactos.

Revisión independiente leída: T-389-verificacion-columnas-3w.md, APROBADO. Checks propios,8layouts/32proporciones y visuales finales revisados, sin bloqueantes.

Chequeo global obligatorio: exit1 por las mismas20fallas ajenas anteriores; historial120/120 y T-389 sin inconsistencias. No se alteraron tareas/harness ajenos ni sesión global. Log /tmp/fw-columns-workspace-verify.log.

## Seguimiento: entrada de clientes y capturas ampliables — 2026-10-06

Pedido y OK explícitos de Faustino. Las páginas de clientes pasan de un contexto/historia largo a un contexto breve, una navegación interna de trabajos y los casos concretos. En 3W los accesos son Control, Stock y web institucional; el relato con fotos queda después. Altaterra muestra primero el agente y panel, y deja la llamada en frío/reunión después. La información y los estados de cada caso no cambian.

El inicio corrige `Tecnología` y reduce el subtítulo. La presentación empieza por qué hace Faustino y cómo trabaja, antes de su historia personal. En móvil, la cabecera usa el fondo opaco completo para evitar que el contenido se mezcle al desplazarse.

Stock y las dos capturas de Altaterra abren una vista ampliada dentro de la propuesta; la imagen se puede recorrer horizontalmente en móvil y conserva un enlace al archivo completo en otra pestaña. No se modifican los archivos de imagen, las fotos o los carruseles verticales. La vista ampliada es un componente cliente pequeño basado en `dialog` nativo, sin dependencias, formularios, tracking ni servicios externos. No publicado.

Verificación final T-390: build de 12 páginas, TypeScript, ESLint dirigido y `git diff --check` con exit 0. Navegación: 12 pruebas en 1440/768/390/320 px; comprueban accesos, orden caso→relación, fondo sólido de cabecera móvil, foco/ciclo/Escape y scroll horizontal de las capturas ampliadas, sin errores JS, overflow o envíos. Axe: 13 corridas sin infracciones, incluidas las vistas ampliadas de Stock y panel en 1440/320 px. Evidencia en `/tmp/fw-entry-preview/` y `/tmp/fw-entry-*.log`.

Revisión independiente leída: `T-390-verificacion-accesos-capturas.md`, APROBADO. La revisión confirma el foco del diálogo, la vista móvil ampliada y la coherencia de los accesos; no autoriza publicar.

Chequeo global obligatorio: exit 1 por las mismas 20 fallas ajenas previas; historial 120/120 y T-390 sin inconsistencias. No se tocaron tareas, harness ni sesión global ajenos. Log: `/tmp/fw-entry-workspace-verify.log`.

## Seguimiento: orden de 3W Control — 2026-10-06

Pedido y OK explícitos de Faustino. La captura de histórico de temperaturas y exportación de gráficas pasa de la cuarta a la segunda posición del carrusel de 3W Control. El orden final es: lecturas de cámara, histórico, variables del equipo y alertas. No se modificaron las imágenes, sus textos, proporciones verticales, controles ni el resto de la página. Sin publicar.

Verificación local T-391: build, TypeScript, ESLint dirigido y `git diff --check` con exit 0. El carrusel se comprobó en 1440, 390 y 320 px: orden de las cuatro fuentes, estado «Captura 2 de 4», texto del histórico, botón siguiente, teclado End y ausencia de overflow. Navegación general: 12 pruebas responsive; Axe: 13 corridas sin infracciones. Evidencia en `/tmp/fw-t391-preview/`, `/tmp/fw-entry-preview/` y `/tmp/fw-t391-build.log`.

Revisión independiente leída: `T-391-verificacion-orden-control.md`, APROBADO. Confirma orden, límites de botones, ArrowLeft/ArrowRight/Home/End, scroll nativo, móvil y ausencia de overflow/errores JavaScript. Sin publicación.

Chequeo global obligatorio: exit 1 por las mismas 20 fallas ajenas anteriores. Historial 120/120; no se tocaron tareas, harness ni sesión ajenos. Log: `/tmp/fw-t391-workspace-verify.log`.

## Seguimiento: nueva captura del panel Altaterra — 2026-10-06

Pedido y OK explícitos de Faustino. El panel del caso Altaterra y su visor ampliable usan el PNG original entregado (`3024×1562`), sin alterar la conversación, el texto ni el comportamiento del caso. La versión WebP anterior queda conservada en el proyecto y sin referencias. Sin publicar.

Verificación T-392: el hash de la copia coincide con el archivo entregado. Build de 12 páginas, TypeScript, ESLint dirigido y `git diff --check` con exit 0. En 1440 y 390 px se comprobó que la miniatura y el diálogo usan el PNG, que la imagen carga, que Escape cierra el visor y que no hay overflow. Navegación general: 12 pruebas responsive; Axe: 13 corridas sin infracciones. Visual móvil cargado: `/tmp/fw-t392-preview/panel-nuevo-cargado-390.png`.

## Seguimiento: dos fotos nuevas de trabajo con 3W — 2026-10-06

Pedido y OK explícitos de Faustino. Se añadieron al final del carrusel de trabajo con 3W dos imágenes reales suministradas: desarrollo junto a equipos de planta y desarrollo en la oficina. Los HEIC originales se preservan; las copias web son JPEG de `1600×1200`, sin recorte. No se altera el orden ni el contenido de las cuatro fotos existentes. Sin publicar.

Verificación T-393: build de 12 páginas, TypeScript, ESLint dirigido y `git diff --check` con exit 0. En 1440 y 390 px se comprobó el orden de las seis fotos, la sexta con teclado, sus textos, controles y ausencia de overflow. Navegación general: 12 pruebas responsive; Axe: 13 corridas sin infracciones. Visual móvil: `/tmp/fw-t393-preview/trabajo-3w-sexta-390.png`.

## Seguimiento: proceso de trabajo completo — 2026-10-06

Pedido y OK explícitos de Faustino. La sección «Cómo trabajamos» ahora expresa el recorrido completo con una empresa: conocerla, priorizar, entender el proceso elegido, construir, probar e implementar, y acompañar el uso real. Reemplaza la versión que describía solamente el ciclo de una mejora. No cambia casos, contacto ni integraciones. Sin publicar.

Verificación T-394: build de 12 páginas, TypeScript, ESLint dirigido y `git diff --check` con exit 0. Seis pasos, orden de contenido y ausencia de overflow comprobados en 1440 y 390 px. Navegación general: 12 pruebas responsive; Axe: 13 corridas sin infracciones. Visual móvil: `/tmp/fw-t394-preview/como-trabajamos-390.png`.

## Seguimiento: formulario de contacto por email — 2026-10-06

Pedido y OK explícitos de Faustino. Se retiró Calendly de la sección de contacto del inicio y se agregó un formulario propio con nombre, empresa opcional, mail y mensaje. Conserva el mail directo como alternativa. El formulario llama sólo a `/api/contact`; la ruta valida el cuerpo y sus límites, rechaza orígenes externos, incluye un honeypot y limita en producción tres envíos válidos por IP/hora en memoria. Envía texto plano al destinatario configurado mediante `CONTACT_TO_EMAIL`, usa el mail del visitante como `Reply-To` y no llama a CRM, analytics, Calendly ni otro servicio de formularios. Sin publicar.

La entrega SMTP final se comprobó contra un receptor local de loopback con remitente y destino `local.invalid`; se validaron asunto, cuerpo y `Reply-To` sin enviar un correo externo. Luego, con autorización explícita de Faustino, se hizo una única prueba real identificable a la casilla configurada. El endpoint respondió HTTP 200 y `ok:true`, por lo que el servidor SMTP aceptó la entrega; la recepción en la bandeja depende del proveedor y debe confirmarla Faustino. El límite por IP es protección básica: depende del proceso y proxy del hosting, no se comparte entre instancias ni reemplaza una capa antispam del proveedor. Antes de publicar, confirmar las variables SMTP en el hosting.

Verificación T-395: build de 12 páginas, TypeScript, ESLint dirigido y `git diff --check` con exit 0. Formulario en 1440/390/320, sin Calendly, con labels, validación nativa, estado accesible y sin overflow/errores JavaScript. Endpoint final: cuerpo vacío, `null`, array y mail inválido devuelven 400; Origin malformado/cruzado devuelve 403; honeypot devuelve 200 sin SMTP. Navegación general: 12 pruebas responsive; Axe: 13 corridas sin infracciones. Revisión independiente: `T-395-verificacion-formulario-contacto.md`, APROBADO. Sin correo externo de prueba.

Chequeo global obligatorio: exit 1 por las mismas 20 fallas ajenas anteriores. No se tocaron tareas, harness ni sesión ajenos. Log: `/tmp/fw-t395-workspace-verify.log`.

## Seguimiento: rediseño y teléfono en contacto — 2026-10-06

Pedido y OK explícitos de Faustino. El formulario de contacto ahora usa un panel azul profundo, campos con jerarquía y feedback visual alineados al bloque de contacto de la propuesta. El teléfono se agregó como campo obligatorio, con tipo `tel`, teclado/autocompletado adecuados y validación de al menos siete dígitos. Se incluye en el correo de texto plano; empresa continúa opcional. No hubo otro envío real.

Verificación T-397: build de 12 páginas, TypeScript, ESLint dirigido y `git diff --check` con exit 0. UI, foco, teléfono, errores de servidor, reset de éxito y ausencia de overflow comprobados en 1440/390/320 px; Axe: cero infracciones. El endpoint rechaza teléfono ausente, corto, sin dígitos, demasiado largo o que no sea texto; honeypot sigue sin SMTP. Correo de loopback confirma la línea de teléfono. Revisión independiente: `T-397-verificacion-formulario-telefono.md`, APROBADO. Sin publicación ni correo externo en esta iteración.

Chequeo global obligatorio: exit 1 por las mismas 20 fallas ajenas anteriores. No se tocaron tareas, harness ni sesión ajenos. Log: `/tmp/fw-t397-workspace-verify.log`.

## Seguimiento: íconos SVG y Control legible en iPhone — 2026-10-07

Pedido y OK explícitos de Faustino. Las flechas de los enlaces, CTAs, formulario, galerías y controles del carrusel corporativo dejan de ser caracteres de texto y ahora son SVG con el mismo trazo en todas las plataformas, incluido iPhone. Los textos accesibles no cambian. No se modificaron las rutas ajenas de guía, caso o mapa operativo.

El carrusel de 3W Control conserva las capturas completas, controles, teclado y desplazamiento nativo. Sólo en móvil su ancho se ajustó a 250 px para que una captura vertical entre mejor en pantalla; las fotos del carrusel de trabajo con 3W no cambian. Verificación propia: build de 12 páginas, TypeScript, ESLint dirigido y `git diff --check` con exit 0; controles y SVG comprobados en 1440/430/390/320 px, sin overflow. Navegación general: 12 pruebas responsive; Axe: 13 corridas sin infracciones. Visual móvil: `/tmp/fw-t398-preview/control-movil-ajustado-390.png`. Sin publicar.

Revisión independiente: `T-398-verificacion-iconos-control-movil.md`, APROBADO. Confirma SVG visibles y sin flechas de texto, Control a 250×543 px en 390, controles/límites/teclado y cero overflow o errores JavaScript. Sin publicación.

Chequeo global obligatorio: exit 1 por 21 fallas de estado y harness de otros proyectos; no menciona esta web ni T-398. No se tocaron esas tareas, harness ni sesión ajena. Log: `/tmp/fw-t398-workspace-verify.log`.
