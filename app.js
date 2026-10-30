/* XPRT Group · Comportamiento del sitio
   1. Menú en celular
   2. Formularios → Google Sheets (Apps Script "XPRT Registro")
   3. Tablero de 5 números (recursos.html) */
(function () {
  'use strict';

  /* 1. Menú ------------------------------------------------------------ */
  var menuBtn = document.querySelector('.menu-btn');
  var menu = document.getElementById('menu');
  if (menuBtn && menu) {
    menuBtn.addEventListener('click', function () {
      var open = menu.classList.toggle('open');
      menuBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  }

  // Enlaces viejos a index.html#registro llevan a la página de registro.
  if (location.hash === '#registro' && !document.getElementById('registro')) {
    location.replace('registro.html' + location.search);
  }

  /* 2. Formularios ----------------------------------------------------- */
  var endpoint = (window.XPRT_CONFIG && window.XPRT_CONFIG.REGISTRO_ENDPOINT) || '';
  var params = new URLSearchParams(location.search);

  // ?interes=Diagnóstico 5D marca esa casilla al llegar desde un botón.
  var pre = params.get('interes');
  if (pre) {
    document.querySelectorAll('input[name="interes"]').forEach(function (c) {
      if (c.value === pre) c.checked = true;
    });
  }

  function validate(form) {
    var ok = true;
    form.querySelectorAll('[required]').forEach(function (el) {
      var bad = el.type === 'checkbox' ? !el.checked : !el.value.trim();
      if (el.type === 'email' && el.value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(el.value)) bad = true;
      if (el.type === 'tel' && el.value && el.value.replace(/\D/g, '').length < 7) bad = true;
      el.classList.toggle('invalid', bad);
      if (bad) ok = false;
    });
    return ok;
  }

  document.querySelectorAll('form[data-form]').forEach(function (form) {
    var msg = form.querySelector('.form-msg');
    var btn = form.querySelector('button[type=submit]');
    function setMsg(text, type) {
      msg.textContent = text;
      msg.className = 'form-msg' + (type ? ' ' + type : '');
    }

    form.addEventListener('input', function (e) { e.target.classList.remove('invalid'); });

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (!validate(form)) {
        setMsg('Revisa los campos marcados en rojo y acepta la política de datos.', 'err');
        return;
      }
      var okText = form.getAttribute('data-ok') || '¡Listo! Tu registro quedó guardado. Pronto te escribimos.';
      if (form.website && form.website.value) { setMsg(okText, 'ok'); return; } // anti-spam
      if (!endpoint) { setMsg('El formulario aún no está conectado.', 'err'); return; }

      var data = new URLSearchParams();
      var fd = new FormData(form);
      var multi = {};
      fd.forEach(function (v, k) {
        if (k === 'website' || k === 'consent') return;
        multi[k] = multi[k] ? multi[k] + ', ' + v : String(v).trim();
      });
      Object.keys(multi).forEach(function (k) { data.append(k, multi[k]); });
      data.append('consentimiento', 'Sí');
      data.append('origen', (form.getAttribute('data-form') || 'Web') + (document.referrer ? ' · ' + document.referrer : ''));
      ['utm_source', 'utm_medium', 'utm_campaign'].forEach(function (k) { data.append(k, params.get(k) || ''); });

      btn.disabled = true;
      setMsg('Enviando…');
      // no-cors: la respuesta no se puede leer; para confirmar hay que mirar la hoja.
      fetch(endpoint, { method: 'POST', mode: 'no-cors', body: data })
        .then(function () { form.reset(); setMsg(okText, 'ok'); })
        .catch(function () { setMsg('No pudimos enviar el formulario. Revisa tu conexión e inténtalo de nuevo.', 'err'); })
        .finally(function () { btn.disabled = false; });
    });
  });

  /* 3. Tablero de 5 números ------------------------------------------- */
  var calc = document.getElementById('tablero');
  if (calc) {
    var cop = new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 });
    var pct = new Intl.NumberFormat('es-CO', { maximumFractionDigits: 1 });
    var val = function (id) {
      var raw = String(document.getElementById(id).value || '').replace(/[^\d]/g, '');
      return raw ? Number(raw) : 0;
    };
    var set = function (id, text) { document.getElementById(id).textContent = text; };

    // Muestra miles con punto mientras escribes.
    calc.querySelectorAll('input[data-money]').forEach(function (el) {
      el.addEventListener('input', function () {
        var raw = el.value.replace(/[^\d]/g, '');
        el.value = raw ? Number(raw).toLocaleString('es-CO') : '';
      });
    });

    var run = function () {
      var ventas = val('c-ventas'), variables = val('c-variables'), fijos = val('c-fijos');
      var dCobro = val('c-cobro'), dInv = val('c-inventario'), dPago = val('c-pago');
      var mc = ventas - variables;
      var mcp = ventas > 0 ? mc / ventas : 0;
      var pe = mcp > 0 ? fijos / mcp : 0;
      var ciclo = dCobro + dInv - dPago;
      var util = mc - fijos;

      set('r-ventas', cop.format(ventas));
      set('r-margen', ventas > 0 ? pct.format(mcp * 100) + ' %' : '—');
      set('r-fijos', cop.format(fijos));
      set('r-pe', mcp > 0 ? cop.format(pe) : 'Sin margen');
      set('r-ciclo', ciclo + ' días');
      set('r-util', cop.format(util));

      var r = [];
      if (ventas <= 0) {
        r.push('Escribe tus ventas del mes para ver tu tablero.');
      } else if (mcp <= 0) {
        r.push('Cada venta te cuesta más de lo que te deja. Antes de vender más, revisa precios y costos variables.');
      } else {
        var holgura = ventas - pe;
        r.push(holgura >= 0
          ? 'Vendes ' + cop.format(holgura) + ' por encima de tu punto de equilibrio (' + pct.format(holgura / ventas * 100) + ' % de holgura).'
          : 'Te faltan ' + cop.format(-holgura) + ' en ventas al mes para cubrir tus costos fijos.');
        if (ciclo > 0) r.push('Tu caja espera ' + ciclo + ' días entre que pagas y que cobras: crecer va a exigir capital de trabajo.');
        else r.push('Cobras antes de pagar: tu ciclo de caja trabaja a tu favor.');
      }
      set('r-lectura', r.join(' '));
    };
    calc.addEventListener('input', run);
    run();
  }
})();
