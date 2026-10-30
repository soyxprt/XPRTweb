# XPRT Group · Sitio web

Sitio estático de XPRT Group publicado con GitHub Pages (rama `main`, carpeta raíz).

## Páginas

| Archivo | Página |
|---|---|
| `index.html` | Inicio |
| `academy.html` | XPRT Academy |
| `clases.html` | Clases pregrabadas (serie “Finanzas empresariales para no financieros”) |
| `consulting.html` | XPRT Consulting · Diagnóstico 5D y planes |
| `capital.html` | XPRT Capital |
| `lo-que-viene.html` | Hoja de ruta: Mesa, Cátedra, Círculo, Podcast, Ruta de Socios, Financiera |
| `nosotros.html` | Nosotros |
| `recursos.html` | Tablero de 5 números (calculadora), datos del mercado y Carta XPRT |
| `registro.html` | Registro previo |
| `privacidad.html` | Política de tratamiento de datos (Ley 1581 de 2012) |
| `404.html` | Página no encontrada |

Páginas de campaña independientes (no usan la plantilla, no cambiar sus enlaces):

| Archivo | Para qué sirve |
|---|---|
| `unete.html` | Registro corto para el sticker de las historias de Instagram |
| `mesa.html` | Inscripción a la Mesa XPRT |

## Cómo se editan las páginas

Las 11 páginas de la tabla de arriba **se generan**. No se editan directamente:

1. Edita el contenido en `_src/pages/<página>.html`, o el menú y el pie en `_src/layout.html`.
2. Ejecuta `python3 _src/build.py`.
3. Sube los cambios.

## Otros archivos

| Archivo | Para qué sirve |
|---|---|
| `styles.css` | Estilos con la identidad de XPRT (Manual v1.0) |
| `app.js` | Menú del celular, formularios y calculadora del tablero |
| `config.js` | URL del Apps Script que guarda los registros y usuario de Instagram |
| `assets/` | Logos, sub-marcas, favicon e imagen para compartir |
| `google-apps-script/registro.gs` | Copia del código del Apps Script “XPRT Registro” (el que corre está en Google) |

## Formularios → Google Sheets

Todos envían a la hoja **“XPRT · Registro previo”**:
- Pestaña **Registros**: `registro.html`, la Carta XPRT de `recursos.html` y `unete.html`. La columna **Origen** dice de cuál vino.
- Pestaña **Mesa XPRT**: `mesa.html` (campo `formulario = mesa`).

El envío usa `fetch` en modo `no-cors`, así que la página siempre muestra “confirmado”.
Para verificar un registro hay que mirar la hoja.

Los botones pueden llegar con un interés ya marcado: `registro.html?interes=Diagnóstico 5D`.

## Medir campañas

Agrega parámetros UTM a los enlaces y quedan guardados en la hoja:

`/registro.html?utm_source=linkedin&utm_medium=post&utm_campaign=lanzamiento`
