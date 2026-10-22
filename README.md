# XPRT Group · Landing page

Landing estática con contexto de XPRT y formulario de **registro previo** conectado a Google Sheets.

## Archivos

| Archivo | Para qué sirve |
|---|---|
| `index.html` | La landing |
| `privacidad.html` | Política de tratamiento de datos (Ley 1581 de 2012) |
| `styles.css` | Estilos con la identidad de XPRT |
| `app.js` | Validación y envío del formulario |
| `config.js` | **Aquí se pega la URL del formulario** (paso 2) |
| `assets/` | Logos, favicon e imagen para compartir en redes |
| `google-apps-script/registro.gs` | Código que guarda los registros en Google Sheets |

## Paso 1 · Publicar en GitHub Pages

1. Crea un repositorio en GitHub, por ejemplo `xprt-landing` (público).
2. Sube **todo el contenido de esta carpeta** a la raíz del repositorio (botón *Add file → Upload files*).
3. Ve a **Settings → Pages**.
4. En *Build and deployment*: Source = **Deploy from a branch**, Branch = **main** y carpeta **/(root)**. Guarda.
5. En uno o dos minutos la página queda en `https://TU-USUARIO.github.io/xprt-landing/`.

## Paso 2 · Conectar el registro a Google Sheets

1. En Google Drive crea una hoja de cálculo llamada **XPRT · Registro previo**.
2. Menú **Extensiones → Apps Script**. Borra el contenido y pega `google-apps-script/registro.gs`. Guarda.
3. (Opcional) Ejecuta la función `setup` una vez para crear la pestaña *Registros* con encabezados. Google te pedirá autorizar el acceso a tu hoja.
4. **Implementar → Nueva implementación** → tipo **Aplicación web**:
   - Ejecutar como: **Yo**
   - Quién tiene acceso: **Cualquier usuario**
5. Copia la URL que termina en `/exec`.
6. Abre `config.js` en GitHub (ícono del lápiz), pega la URL en `REGISTRO_ENDPOINT` y guarda (*Commit changes*).
7. Haz un registro de prueba en la landing y revisa que aparezca en la hoja.

> Si después cambias el código de Apps Script, usa **Implementar → Administrar implementaciones → Editar → Nueva versión** para que la URL siga funcionando.

## Paso 3 · Antes de compartir

- [ ] Reemplazar `[correo de contacto]` y `[pendiente]` (NIT) en `privacidad.html`.
- [ ] Revisar que los enlaces de LinkedIn e Instagram del pie de página sean los correctos.
- [ ] Que un abogado revise la política de tratamiento de datos.

## Cuando tengan dominio propio

1. En **Settings → Pages → Custom domain** escribe el dominio (por ejemplo `xprt.group`).
2. En tu proveedor de dominio crea los registros DNS que indica GitHub (un `CNAME` hacia `TU-USUARIO.github.io` para `www`, o los registros `A` para el dominio raíz).
3. Activa **Enforce HTTPS**.

## Medir campañas

Agrega parámetros UTM a los enlaces que compartas y quedarán guardados en la hoja. Ejemplo:

`https://TU-USUARIO.github.io/xprt-landing/?utm_source=linkedin&utm_medium=post&utm_campaign=lanzamiento`

---

## Registro para historias de Instagram (`unete.html`)

Página corta, pensada para el celular, para el sticker de enlace de las historias.
Pide: nombre, WhatsApp, usuario de Instagram, perfil (pyme / emprendedor / independiente),
mayor reto y autorización de datos. Al terminar muestra el botón **Seguir a @xprt.group**.

**Enlace para el sticker** (cambia `TU-USUARIO` y el nombre del repositorio por los tuyos):

    https://TU-USUARIO.github.io/xprt-landing/unete.html?utm_source=instagram&utm_medium=historias&utm_campaign=registro-oct

Los registros llegan a la misma hoja de Google Sheets del registro previo, con
Origen = "Instagram · historias" y una columna nueva **Instagram**.

### Qué hacer una sola vez
1. Sube `unete.html` y el `config.js` nuevo al repositorio (Add file → Upload files → Commit).
2. En Google Sheets → Extensiones → Apps Script, reemplaza el código por el nuevo `google-apps-script/registro.gs` y guarda.
3. **Deploy → Manage deployments** → lápiz (Edit) → Version: **New version** → **Deploy**.
   Así la URL `/exec` no cambia y no tienes que tocar `config.js`.
4. Abre el enlace en tu celular, haz un registro de prueba y revisa que aparezca en la hoja.
