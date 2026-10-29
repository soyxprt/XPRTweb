# XPRT Group · Sitio web

Sitio estático de XPRT Group publicado con GitHub Pages (rama `main`, carpeta raíz).

## Páginas

| Archivo | Para qué sirve |
|---|---|
| `index.html` | Inicio y registro previo |
| `unete.html` | Registro corto para el sticker de las historias de Instagram |
| `mesa.html` | Inscripción a la Mesa XPRT |
| `privacidad.html` | Política de tratamiento de datos (Ley 1581 de 2012) |

## Otros archivos

| Archivo | Para qué sirve |
|---|---|
| `styles.css` | Estilos con la identidad de XPRT |
| `app.js` | Validación y envío de los formularios |
| `config.js` | URL del Apps Script que guarda los registros y usuario de Instagram |
| `assets/` | Logos, favicon e imagen para compartir en redes |
| `google-apps-script/registro.gs` | Copia del código del Apps Script "XPRT Registro" (el que corre está en Google) |

## Formularios → Google Sheets

Los formularios envían a la hoja **"XPRT · Registro previo"**:
- Pestaña **Registros**: landing (`index.html`) e historias (`unete.html`).
- Pestaña **Mesa XPRT**: `mesa.html` (campo `formulario = mesa`).

El envío usa `fetch` en modo `no-cors`, así que la página siempre muestra "confirmado".
Para verificar un registro hay que mirar la hoja.

Si se cambia el código del Apps Script: **Deploy → Manage deployments → Edit → New version → Deploy**
para que la URL `/exec` no cambie.

## Medir campañas

Agrega parámetros UTM a los enlaces y quedan guardados en la hoja:

`/unete.html?utm_source=instagram&utm_medium=historias&utm_campaign=registro`
