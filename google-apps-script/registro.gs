/**
 * XPRT Group · Registro previo → Google Sheets
 *
 * Cómo usarlo (resumen; detalle en README.md):
 * 1. Crea una hoja de cálculo en Google Sheets llamada "XPRT · Registro previo".
 * 2. Menú Extensiones → Apps Script. Borra lo que haya y pega este archivo.
 * 3. Guarda, luego Implementar → Nueva implementación → Tipo: Aplicación web.
 *    - Ejecutar como: Yo
 *    - Quién tiene acceso: Cualquier usuario
 * 4. Copia la URL que termina en /exec y pégala en config.js (REGISTRO_ENDPOINT).
 */

var SHEET_NAME = 'Registros';
var HEADERS = ['Fecha', 'Nombre', 'Correo', 'WhatsApp', 'Perfil', 'Ciudad', 'Negocio',
  'Mayor reto', 'Interés', 'Consentimiento', 'Origen', 'utm_source', 'utm_medium', 'utm_campaign', 'Instagram'];

// Inscripciones a eventos de XPRT (mesa.html) van a su propia pestaña.
var MESA_SHEET = 'Mesa XPRT';
var MESA_HEADERS = ['Fecha', 'Evento', 'Nombre', 'WhatsApp', 'Correo', 'Proyecto', 'Instagram',
  'Sector', 'Tiempo en el mercado', 'Qué quiere resolver', 'Consentimiento'];

function doPost(e) {
  var lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    var p = (e && e.parameter) || {};
    if (p.formulario === 'mesa') {
      var ms = getTab_(MESA_SHEET, MESA_HEADERS);
      ms.appendRow([new Date(), clean_(p.evento), clean_(p.nombre), clean_(p.whatsapp), clean_(p.email),
        clean_(p.negocio), clean_(p.instagram), clean_(p.sector), clean_(p.tiempo), clean_(p.reto),
        clean_(p.consentimiento)]);
      return ContentService.createTextOutput(JSON.stringify({ ok: true }))
        .setMimeType(ContentService.MimeType.JSON);
    }
    var sheet = getSheet_();
    sheet.appendRow([
      new Date(),
      clean_(p.nombre), clean_(p.email), clean_(p.whatsapp), clean_(p.perfil),
      clean_(p.ciudad), clean_(p.negocio), clean_(p.reto), clean_(p.interes),
      clean_(p.consentimiento), clean_(p.origen),
      clean_(p.utm_source), clean_(p.utm_medium), clean_(p.utm_campaign),
      clean_(p.instagram)
    ]);
    return ContentService.createTextOutput(JSON.stringify({ ok: true }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({ ok: false, error: String(err) }))
      .setMimeType(ContentService.MimeType.JSON);
  } finally {
    lock.releaseLock();
  }
}

function getSheet_() { return getTab_(SHEET_NAME, HEADERS); }

function getTab_(name, headers) {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(name) || ss.insertSheet(name);
  // Escribe (o actualiza) la fila de encabezados; así una hoja vieja gana las columnas nuevas.
  sheet.getRange(1, 1, 1, headers.length).setValues([headers]).setFontWeight('bold');
  sheet.setFrozenRows(1);
  return sheet;
}

// Evita fórmulas inyectadas en la hoja y limita el largo.
function clean_(v) {
  v = String(v || '').trim().slice(0, 300);
  return /^[=+\-@]/.test(v) ? "'" + v : v;
}

// Opcional: ejecuta esta función una vez para crear la hoja con encabezados.
function setup() { getSheet_(); getTab_(MESA_SHEET, MESA_HEADERS); }
