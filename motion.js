/* XPRT Group · Movimiento del sitio
   1. Eslogan que rota la frase protagonista (y responde al cursor)
   2. Luz y diagonales que siguen al cursor en la portada
   3. Tarjetas de momentos que reaccionan al cursor
   4. Aparecer al hacer scroll
   5. Cursor de marca: el punto cuadrado
   Todo se desactiva si la persona pidió reducir el movimiento. */
(function () {
  'use strict';
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var finePointer = window.matchMedia && window.matchMedia('(hover: hover) and (pointer: fine)').matches;

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

  /* 5. Cursor de marca -------------------------------------------------- */
  if (finePointer) {
    var dot = document.createElement('div');
    dot.className = 'cursor-dot';
    dot.setAttribute('aria-hidden', 'true');
    document.body.appendChild(dot);
    var tx = -100, ty = -100, cx = -100, cy = -100;
    window.addEventListener('pointermove', function (e) { tx = e.clientX; ty = e.clientY; }, { passive: true });
    var tick = function () {
      cx += (tx - cx) * .22; cy += (ty - cy) * .22;
      dot.style.transform = 'translate3d(' + cx.toFixed(1) + 'px,' + cy.toFixed(1) + 'px,0)';
      requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
    var hot = 'a, button, .stage, .qitem, .slogan .ln, input, select, label.chip';
    document.addEventListener('pointerover', function (e) { if (e.target.closest(hot)) dot.classList.add('big'); });
    document.addEventListener('pointerout', function (e) { if (e.target.closest(hot) && !(e.relatedTarget && e.relatedTarget.closest && e.relatedTarget.closest(hot))) dot.classList.remove('big'); });
    document.addEventListener('pointerdown', function () { dot.classList.add('down'); });
    document.addEventListener('pointerup', function () { dot.classList.remove('down'); });
    document.addEventListener('pointerleave', function () { tx = ty = -100; });
  }

  /* Diagnóstico: pequeño "pop" cuando cambia el resultado */
  var rt = document.getElementById('r-t');
  if (rt && 'MutationObserver' in window) {
    new MutationObserver(function () {
      rt.classList.remove('pop'); void rt.offsetWidth; rt.classList.add('pop');
    }).observe(rt, { childList: true });
  }
})();
