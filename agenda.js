/* XPRT Group · Agenda del ecosistema (agenda.html)
   Datos verificados el 29 de octubre de 2026 en los sitios oficiales.
   Para actualizar: edita la lista EVENTOS y la fecha VERIFICADO.
   estado: "fecha" (fecha confirmada) · "anunciar" (próxima edición por anunciar) · "abierta" (convocatoria abierta) · "continuo" */
(function () {
  'use strict';

  var VERIFICADO = '29 de octubre de 2026';

  var EVENTOS = [
    {
      t: 'StartCo 2027', org: 'StartCo', cat: 'Inversión y capital', ciudad: 'Medellín',
      fecha: '22 y 23 de abril de 2027', orden: '2027-04-22', estado: 'fecha', gratis: false,
      sede: 'Plaza Mayor, Pabellón Amarillo',
      acceso: 'General: $400.000 + IVA hasta el 31 dic 2026 · $550.000 ene–feb · $750.000 desde el 1 mar 2027. Startups: preinscripción gratis con prefiltro.',
      que: 'Rueda de startups e inversión de Medellín: pitches frente a fondos, corporativos e inversionistas.',
      url: 'https://startco.com.co/'
    },
    {
      t: 'Bogotá Fashion Week 2027', org: 'Cámara de Comercio de Bogotá', cat: 'Ferias y ruedas de negocio', ciudad: 'Bogotá',
      fecha: '18 al 20 de mayo de 2027', orden: '2027-05-18', estado: 'fecha', gratis: true,
      sede: 'Ágora Bogotá',
      acceso: 'Entrada gratis con registro previo hasta completar aforo (así fue en 2026). Las pasarelas son solo con invitación.',
      que: 'Plataforma de moda independiente con rueda de negocios para marcas colombianas.',
      url: 'https://www.bogotafashionweek.com.co/'
    },
    {
      t: 'Hotmart FIRE Sessions 2027', org: 'Hotmart', cat: 'Tecnología y comunidad', ciudad: 'Bogotá',
      fecha: '11 y 12 de junio de 2027', orden: '2027-06-11', estado: 'fecha', gratis: false,
      sede: 'Por confirmar',
      acceso: 'Con boleta. Precio de lanzamiento disponible en el sitio oficial.',
      que: 'Encuentro de economía de creadores, marketing digital y venta de productos digitales.',
      url: 'https://firesessions.hotmart.com/'
    },
    {
      t: 'Feria EVA · Christmas Edition', org: 'Feria EVA', cat: 'Ferias y ruedas de negocio', ciudad: 'Bogotá',
      fecha: 'Diciembre de 2026 (fechas por publicar)', orden: '2026-12-01', estado: 'anunciar', gratis: true,
      sede: 'Parque de la 93 · Pabellón 94',
      acceso: 'Entrada libre para visitantes. Expositores: por convocatoria de la feria.',
      que: 'Feria de marcas de moda, diseño y gastronomía. Tres ediciones al año.',
      url: 'https://www.feriaeva.com/'
    },
    {
      t: 'Fondo Emprender · Convocatoria 168 “Volver a Crecer”', org: 'SENA', cat: 'Programas públicos', ciudad: 'Nacional',
      fecha: 'Abierta hasta el 30 de diciembre de 2026, 6:00 p. m.', orden: '2026-12-30', estado: 'abierta', gratis: true,
      sede: 'Virtual · Caldas, Chocó, Quindío, Risaralda, Valle y Tolima',
      acceso: 'Postulación gratis. Capital semilla condonable si cumples las metas de empleo y sostenibilidad. Nadie puede cobrarte por postularte.',
      que: 'Convocatoria para emprendimientos afectados por el sismo del 10 de agosto de 2026 o por incendios en esos departamentos.',
      url: 'https://www.fondoemprender.com'
    },
    {
      t: 'COIN · Congreso de Inversión y Negocios', org: 'Club In · Universidad EAFIT', cat: 'Inversión y capital', ciudad: 'Medellín',
      fecha: 'Edición 2027 por anunciar (suele ser en octubre)', orden: '2027-10-01', estado: 'anunciar', gratis: false,
      sede: 'Universidad EAFIT',
      acceso: 'Con boleta. Referencia 2026: Silver $202.000 · Gold $265.000.',
      que: 'Congreso de inversión y negocios con conferencias, networking y retos de inversión.',
      url: 'https://coineafit.com/'
    },
    {
      t: 'Congreso ColCapital', org: 'ColCapital', cat: 'Inversión y capital', ciudad: 'Bogotá',
      fecha: '10.º Congreso · 2027, fechas por anunciar', orden: '2027-03-01', estado: 'anunciar', gratis: false,
      sede: 'Por confirmar',
      acceso: 'Con boleta. Referencia 2026 (+ IVA): afiliados $1,6 M (early bird) / $1,9 M; no afiliados $2,6 M / $3,1 M.',
      que: 'Encuentro de fondos de capital privado, inversionistas y empresas en etapa de crecimiento.',
      url: 'https://colcapital.org/ventas/en/congreso/'
    },
    {
      t: 'Latam Fintech Market', org: 'Colombia Fintech', cat: 'Inversión y capital', ciudad: 'Barranquilla',
      fecha: 'Edición 2027 por anunciar', orden: '2027-09-01', estado: 'anunciar', gratis: true,
      sede: 'Referencia 2026: Puerta de Oro',
      acceso: 'En 2026 la entrada fue gratuita. Condiciones de 2027 por confirmar.',
      que: 'Encuentro de innovación financiera con conferencias y rueda de negocios.',
      url: 'https://latamfintech.market/'
    },
    {
      t: 'GoFest', org: 'Cámara de Comercio de Bogotá', cat: 'Tecnología y comunidad', ciudad: 'Bogotá',
      fecha: 'Edición 2027 por anunciar (2026 fue en agosto)', orden: '2027-08-01', estado: 'anunciar', gratis: null,
      sede: 'Referencia 2026: Ágora Bogotá',
      acceso: 'Condiciones de acceso por confirmar en el sitio oficial.',
      que: 'Festival de emprendimiento e innovación con talleres y conexión con inversionistas.',
      url: 'https://gofest.com.co/'
    },
    {
      t: 'Colombia Tech Week', org: 'Colombia Tech Week', cat: 'Tecnología y comunidad', ciudad: 'Bogotá',
      fecha: 'Edición 2027 por anunciar (2026 fue en agosto)', orden: '2027-08-02', estado: 'anunciar', gratis: null,
      sede: 'Varias sedes',
      acceso: 'Los eventos paralelos suelen ser gratis con registro; el Tech Fest principal tiene boleta.',
      que: 'Semana de tecnología con cientos de eventos independientes en la ciudad.',
      url: 'https://colombiatechweek.co'
    },
    {
      t: 'Platzi Conf', org: 'Platzi', cat: 'Tecnología y comunidad', ciudad: 'Por anunciar',
      fecha: 'Edición 2027 por anunciar', orden: '2027-08-03', estado: 'anunciar', gratis: null,
      sede: 'Por anunciar',
      acceso: 'Condiciones por confirmar en el sitio oficial.',
      que: 'Conferencia de tecnología, IA y negocios digitales.',
      url: 'https://platzi.com/conf'
    },
    {
      t: 'Macrorrueda de las Américas', org: 'ProColombia', cat: 'Ferias y ruedas de negocio', ciudad: 'Bogotá',
      fecha: 'Próxima edición por anunciar (2026 fue en abril)', orden: '2027-04-01', estado: 'anunciar', gratis: false,
      sede: 'Referencia 2026: Corferias',
      acceso: 'Referencia 2026: $600.000 por empresa exportadora, o gratis para empresas de Bogotá y Cundinamarca con matrícula renovada en la CCB.',
      que: 'Rueda de negocios que conecta exportadores colombianos con compradores internacionales.',
      url: 'https://procolombia.co'
    },
    {
      t: 'Ferias Conecta Popular', org: 'MinCIT · iNNpulsa Colombia', cat: 'Programas públicos', ciudad: 'Nacional',
      fecha: 'Itinerantes · próximas fechas por anunciar', orden: '2027-02-01', estado: 'anunciar', gratis: true,
      sede: 'Varias ciudades del país',
      acceso: 'Entrada gratuita.',
      que: 'Vitrinas comerciales para unidades productivas de la economía popular: artesanías, textiles, agroindustria y gastronomía.',
      url: 'https://www.mincit.gov.co/prensa/noticias/industria'
    },
    {
      t: 'Expocamacol', org: 'Camacol', cat: 'Ferias y ruedas de negocio', ciudad: 'Medellín',
      fecha: 'Próxima edición por anunciar (la 26.ª fue en agosto de 2026)', orden: '2028-08-01', estado: 'anunciar', gratis: false,
      sede: 'Referencia 2026: Plaza Mayor',
      acceso: 'Condiciones por confirmar.',
      que: 'Feria de la construcción, la arquitectura y el diseño, con ruedas de negocio.',
      url: 'https://camacol.co'
    },
    {
      t: 'The AI Collective Colombia', org: 'Comunidad', cat: 'Tecnología y comunidad', ciudad: 'Bogotá',
      fecha: 'Trimestral', orden: '2099-01-01', estado: 'continuo', gratis: true,
      sede: 'Varía por evento',
      acceso: 'Gratis con registro y aprobación de cupo.',
      que: 'Comunidad de inteligencia artificial con charlas y networking.',
      url: 'https://lu.ma/iacollectivecolombia'
    },
    {
      t: 'GDG Bogotá', org: 'Google Developer Groups', cat: 'Tecnología y comunidad', ciudad: 'Bogotá',
      fecha: 'Cada dos semanas', orden: '2099-01-02', estado: 'continuo', gratis: true,
      sede: 'Varía por evento',
      acceso: 'Gratis con registro.',
      que: 'Comunidad de desarrolladores: talleres, charlas y eventos como DevFest.',
      url: 'https://gdg.community.dev/gdg-bogota/'
    },
    {
      t: 'AI Tinkerers Bogotá', org: 'Comunidad', cat: 'Tecnología y comunidad', ciudad: 'Bogotá',
      fecha: 'Varias veces al año', orden: '2099-01-03', estado: 'continuo', gratis: null,
      sede: 'Varía por evento',
      acceso: 'Con registro y selección de asistentes. Algunas ediciones han tenido costo.',
      que: 'Encuentros técnicos para quienes construyen con inteligencia artificial.',
      url: 'https://bogota.aitinkerers.org/'
    }
  ];

  var ESTADO = {
    fecha: ['Fecha confirmada', ''],
    abierta: ['Convocatoria abierta', ''],
    anunciar: ['Por anunciar', 'soon'],
    continuo: ['Recurrente', 'soon']
  };

  var grid = document.getElementById('ag-grid');
  if (!grid) return;
  var q = document.getElementById('ag-q');
  var cat = document.getElementById('ag-cat');
  var ciudad = document.getElementById('ag-ciudad');
  var acceso = document.getElementById('ag-acceso');
  var count = document.getElementById('ag-count');
  document.querySelectorAll('[data-verificado]').forEach(function (el) { el.textContent = VERIFICADO; });

  function esc(s) {
    return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; });
  }

  function render() {
    var term = q.value.trim().toLowerCase();
    var list = EVENTOS.filter(function (e) {
      var txt = (e.t + ' ' + e.org + ' ' + e.ciudad + ' ' + e.que).toLowerCase();
      if (term && txt.indexOf(term) < 0) return false;
      if (cat.value && e.cat !== cat.value) return false;
      if (ciudad.value && e.ciudad !== ciudad.value) return false;
      if (acceso.value === 'gratis' && e.gratis !== true) return false;
      if (acceso.value === 'pago' && e.gratis !== false) return false;
      return true;
    }).sort(function (a, b) {
      var w = { abierta: 0, fecha: 1, anunciar: 2, continuo: 3 };
      return (w[a.estado] - w[b.estado]) || (a.orden < b.orden ? -1 : 1);
    });

    count.textContent = list.length + (list.length === 1 ? ' evento' : ' eventos');
    if (!list.length) {
      grid.innerHTML = '<p class="muted">No hay eventos con esos filtros. Prueba con otra ciudad o categoría.</p>';
      return;
    }
    grid.innerHTML = list.map(function (e) {
      var st = ESTADO[e.estado];
      var acc = e.gratis === true ? '<span class="pill">Gratis</span>' : e.gratis === false ? '<span class="pill dark-pill">Con costo</span>' : '';
      return '<article class="card ev">' +
        '<div class="ev-top"><span class="tag">' + esc(e.cat) + '</span><span class="pill ' + st[1] + '">' + st[0] + '</span></div>' +
        '<h3>' + esc(e.t) + '</h3>' +
        '<p class="ev-org">' + esc(e.org) + ' · ' + esc(e.ciudad) + '</p>' +
        '<p class="ev-date">' + esc(e.fecha) + '</p>' +
        '<details><summary>Ver detalles ' + acc + '</summary>' +
        '<dl><dt>Qué es</dt><dd>' + esc(e.que) + '</dd>' +
        '<dt>Sede</dt><dd>' + esc(e.sede) + '</dd>' +
        '<dt>Acceso y precio</dt><dd>' + esc(e.acceso) + '</dd></dl>' +
        '</details>' +
        '<a class="arrow" href="' + esc(e.url) + '" target="_blank" rel="noopener">Sitio oficial →</a>' +
        '</article>';
    }).join('');
  }
  [q, cat, ciudad, acceso].forEach(function (el) { el.addEventListener('input', render); });
  render();

  /* Calculadora de preventa · StartCo 2027 (precios + IVA, verificados) */
  var tipo = document.getElementById('pv-tipo');
  if (tipo) {
    var PRECIOS = {
      general: { early: 400000, plena: 750000, etapa: 'Lanzamiento (hasta el 31 dic 2026)', tarde: 'Tarifa plena (desde el 1 mar 2027)' },
      startup: { early: 2000000, plena: 2650000, etapa: 'Etapa líderes (pago antes del 31 dic 2026)', tarde: 'Después del 31 dic 2026' }
    };
    var cant = document.getElementById('pv-cant');
    var cop = new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 });
    var calc = function () {
      var p = PRECIOS[tipo.value];
      var n = Math.max(1, Math.min(50, parseInt(cant.value, 10) || 1));
      var a = p.early * n, b = p.plena * n, ah = b - a;
      document.getElementById('pv-early').textContent = cop.format(a);
      document.getElementById('pv-early-l').textContent = p.etapa;
      document.getElementById('pv-plena').textContent = cop.format(b);
      document.getElementById('pv-plena-l').textContent = p.tarde;
      document.getElementById('pv-ahorro').textContent = cop.format(ah);
      document.getElementById('pv-pct').textContent = Math.round(ah / b * 100) + ' % menos que la tarifa plena';
      document.getElementById('pv-lectura').textContent =
        'Pagar tarde te cuesta ' + cop.format(ah) + ' + IVA más por ' + (n === 1 ? 'una entrada' : n + ' entradas') +
        '. Si el evento está en tu plan, decídelo antes del 31 de diciembre y págalo con caja que ya tengas, no con deuda.';
    };
    tipo.addEventListener('input', calc);
    cant.addEventListener('input', calc);
    calc();
  }
})();
