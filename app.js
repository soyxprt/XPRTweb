(function () {
  var form = document.getElementById('reg-form');
  if (!form) return;
  var msg = document.getElementById('form-msg');
  var btn = document.getElementById('submit-btn');
  var endpoint = (window.XPRT_CONFIG && window.XPRT_CONFIG.REGISTRO_ENDPOINT) || '';

  function setMsg(text, type) {
    msg.textContent = text;
    msg.className = 'form-msg' + (type ? ' ' + type : '');
  }

  function validate() {
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

  form.addEventListener('input', function (e) { e.target.classList.remove('invalid'); });

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    if (!validate()) {
      setMsg('Revisa los campos marcados en rojo y acepta la política de datos.', 'err');
      return;
    }
    // Anti-spam: si el campo oculto viene lleno, ignoramos el envío.
    if (form.website.value) { setMsg('¡Listo! Tu registro quedó guardado.', 'ok'); return; }

    if (!endpoint) {
      setMsg('El registro aún no está conectado. Configura REGISTRO_ENDPOINT en config.js.', 'err');
      console.warn('XPRT: falta REGISTRO_ENDPOINT en config.js');
      return;
    }

    var data = new URLSearchParams();
    ['nombre', 'email', 'whatsapp', 'perfil', 'ciudad', 'negocio', 'reto'].forEach(function (k) {
      data.append(k, form[k].value.trim());
    });
    var intereses = Array.prototype.map.call(form.querySelectorAll('input[name="interes"]:checked'), function (c) { return c.value; });
    data.append('interes', intereses.join(', '));
    data.append('consentimiento', 'Sí');
    data.append('origen', document.referrer || 'directo');
    var params = new URLSearchParams(location.search);
    ['utm_source', 'utm_medium', 'utm_campaign'].forEach(function (k) { data.append(k, params.get(k) || ''); });

    btn.disabled = true;
    setMsg('Enviando…');

    fetch(endpoint, { method: 'POST', mode: 'no-cors', body: data })
      .then(function () {
        form.reset();
        setMsg('¡Listo! Ya eres parte del registro previo de XPRT. Pronto te escribimos.', 'ok');
      })
      .catch(function () {
        setMsg('No pudimos enviar tu registro. Revisa tu conexión e inténtalo de nuevo.', 'err');
      })
      .finally(function () { btn.disabled = false; });
  });
})();
