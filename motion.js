/* XPRT Group · Movimiento del sitio
   1. Eslogan que rota la frase protagonista (y responde al cursor)
   2. Luz y diagonales que siguen al cursor en la portada
   3. Tarjetas de momentos que reaccionan al cursor
   4. Aparecer al hacer scroll
   Todo se desactiva si la persona pidió reducir el movimiento. */
(function () {
  'use strict';
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* 1. Eslogan ---------------------------------------------------------- */
  var slogan = document.getElementById('slogan');
  if (slogan) {
    var lines = Array.prototype.slice.call(slogan.querySelectorAll('.ln'));
    var DUR = 3200, idx = 0, timer = null;
    slogan.style.setProperty('--slogan-t', DUR + 'ms');
    var activate = function (i) {
      idx = i;
      lines.forEach(function (l, k) { l.classList.toggle('is-on', k === i); });
    };
    var play = function () {
    
  if (reduce) return;
      clearInterval(timer);
      slogan.classList.remove('paused');
      timer = setInterval(function () { activate((idx + 1) % lines.length); }, DUR);
    };
    lines.forEach(function (l, k) {
      l.addEventListener('mouseenter', function () { clearInterval(timer); slogan.classList.add('paused'); activate(k); });
    });
    slogan.addEventListener('mouseleave', play);
    if (reduce) { lines.forEach(function (l) { l.classList.add('is-on'); }); } else { play(); }
  }

  /* Escalera "Del emprendimiento al negocio": dibuja las líneas entre los puntos */
  var ladder = document.getElementById('ladder');
  if (ladder) {
    var svg = ladder.querySelector('.ladder-lines'), pl = svg.querySelector('polyline'), bl = svg.querySelector('line');
    var draw = function () {
      if (getComputedStyle(svg).display === 'none') return;
      var box = ladder.getBoundingClientRect();
      svg.setAttribute('viewBox', '0 0 ' + box.width + ' ' + box.height);
      var c = function (el) { var r = el.getBoundingClientRect(); return [r.left - box.left + r.width / 2, r.top - box.top + r.height / 2]; };
      var pts = Array.prototype.map.call(ladder.querySelectorAll('.lsteps .node'), c);
      pl.setAttribute('points', pts.map(function (p) { return p[0].toFixed(1) + ',' + p[1].toFixed(1); }).join(' '));
      var last = pts[pts.length - 1], nx = c(ladder.querySelector('.node-light'));
      bl.setAttribute('x1', last[0]); bl.setAttribute('y1', last[1]); bl.setAttribute('x2', nx[0]); bl.setAttribute('y2', nx[1]);
      var len = 0; for (var i = 1; i < pts.length; i++) len += Math.hypot(pts[i][0] - pts[i-1][0], pts[i][1] - pts[i-1][1]);
      pl.style.setProperty('--len', Math.ceil(len)); bl.style.setProperty('--len', Math.ceil(Math.hypot(nx[0] - last[0], nx[1] - last[1])));
    };
    draw();
    window.addEventListener('resize', draw);
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(draw);
    var panel = ladder.querySelector('.ladder-panel');
    panel.addEventListener('pointermove', function (e) {
      var r = panel.getBoundingClientRect();
      panel.style.setProperty('--mx', ((e.clientX - r.left) / r.width * 100).toFixed(1) + '%');
      panel.style.setProperty('--my', ((e.clientY - r.top) / r.height * 100).toFixed(1) + '%');
    });
    if (!reduce && 'IntersectionObserver' in window && getComputedStyle(svg).display !== 'none' && ladder.getBoundingClientRect().top > window.innerHeight * .6) {
      ladder.classList.add('anim');
      var lio = new IntersectionObserver(function (en) {
        if (en[0].isIntersecting) { draw(); ladder.classList.add('drawn'); lio.disconnect(); setTimeout(function () { ladder.classList.remove('anim', 'drawn'); }, 3200); }
      }, { threshold: .35 });
      lio.observe(ladder);
    }
  }

  if (reduce) return;

  /* 2. Luz y parallax en la portada ------------------------------------ */
  document.querySelectorAll('[data-glow]').forEach(function (hero) {
    var layers = hero.querySelectorAll('[data-parallax]');
    hero.addEventListener('pointermove', function (e) {
      var r = hero.getBoundingClientRect();
      var x = (e.clientX - r.left) / r.width, y = (e.clientY - r.top) / r.height;
      hero.style.setProperty('--mx', (x * 100).toFixed(1) + '%');
      hero.style.setProperty('--my', (y * 100).toFixed(1) + '%');
      layers.forEach(function (el) {
        var f = parseFloat(el.getAttribute('data-parallax')) || 10;
        el.style.translate = ((x - .5) * f).toFixed(1) + 'px ' + ((y - .5) * f).toFixed(1) + 'px';
      });
    });
  });

  /* 3. Tarjetas y detalles que siguen al cursor ------------------------ */
  document.querySelectorAll('.stages.fx .stage, .stage-detail').forEach(function (el) {
    el.addEventListener('pointermove', function (e) {
      var r = el.getBoundingClientRect();
      var x = (e.clientX - r.left) / r.width, y = (e.clientY - r.top) / r.height;
      el.style.setProperty('--x', (x * 100).toFixed(1) + '%');
      el.style.setProperty('--y', (y * 100).toFixed(1) + '%');
      el.style.setProperty('--dx', (x - .5).toFixed(3));
      el.style.setProperty('--dy', (y - .5).toFixed(3));
    });
    el.addEventListener('pointerleave', function () { el.style.setProperty('--dx', 0); el.style.setProperty('--dy', 0); });
  });

  /* 4. Aparecer al hacer scroll ---------------------------------------- */
  if ('IntersectionObserver' in window) {
    var targets = document.querySelectorAll('main .section .card, main .section .stat, .stage-detail, main .section .stages:not(.fx), main .section .stages.fx .stage, .qitem[data-step="0"]');
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { var t = en.target; t.classList.add('in'); io.unobserve(t); setTimeout(function () { t.style.transitionDelay = ''; t.classList.remove('will-reveal', 'in'); }, 1200); }
      });
    }, { threshold: .12 });
    targets.forEach(function (el, k) {
      var r = el.getBoundingClientRect();
      if (r.top > window.innerHeight) { // solo lo que aún no se ve: lo visible nunca se oculta
        el.classList.add('will-reveal');
        el.style.transitionDelay = ((k % 4) * 70) + 'ms';
        io.observe(el);
      }
    });
  }

  /* Diagnóstico: pequeño "pop" cuando cambia el resultado */
  var rt = document.getElementById('r-t');
  if (rt && 'MutationObserver' in window) {
    new MutationObserver(function () {
      rt.classList.remove('pop'); void rt.offsetWidth; rt.classList.add('pop');
    }).observe(rt, { childList: true });
  }
})();
