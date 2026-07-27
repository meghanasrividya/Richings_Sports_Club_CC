/**
 * RICHINGS PARK SPORTS CLUB — HERO SLIDER
 * ---------------------------------------------------------------
 * Crossfading photo stage for any section marked [data-slider].
 * No dependencies. Drop the script in once; every page that has a
 * marked hero picks it up.
 *
 *   <section class="hero" data-slider data-dwell="6500">
 *     <div class="hero__bg">
 *       <div class="hero__slide" data-caption="The Grounds">
 *         <img class="hero__bg-img" src="…" alt="…">
 *       </div>
 *       …
 *       <div class="hero__bg-overlay"></div>
 *     </div>
 *   </section>
 *
 * Timings live in one place: data-dwell here, and the matching
 * durations in hero-slider.css (tickFill + heroDrift).
 */
(function () {
  'use strict';

  var FADE = 1600;                                   // must match .hero__slide transition
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  document.querySelectorAll('[data-slider]').forEach(build);

  function build(root) {
    var slides = Array.prototype.slice.call(root.querySelectorAll('.hero__slide'));
    if (slides.length < 2) return;

    var dwell   = parseInt(root.getAttribute('data-dwell'), 10) || 6500;
    var caption = root.querySelector('.hero__caption');
    var ticksEl = root.querySelector('.hero__ticks');
    var ribbon  = root.querySelector('.hero__ribbon');

    var index   = 0;
    var timer   = null;
    var onScreen = true;
    var ticks   = [];

    /* ── Pagination rules, one per frame ───────────────────── */
    if (ticksEl) {
      slides.forEach(function (slide, i) {
        var b = document.createElement('button');
        b.className = 'hero__tick';
        b.type = 'button';
        b.setAttribute('aria-label', 'Show ' + (slide.getAttribute('data-caption') || 'image ' + (i + 1)));
        b.innerHTML = '<span class="hero__tick-fill"></span>';
        b.addEventListener('click', function () { go(i, true); });
        ticksEl.appendChild(b);
        ticks.push(b);
      });
    }

    /* ── Keep the controls clear of the stats ribbon ───────── */
    function measure() {
      if (!ribbon) return;
      root.style.setProperty('--ribbon-h', ribbon.offsetHeight + 'px');
    }
    measure();
    window.addEventListener('resize', debounce(measure, 150));

    /* ── Frame change ──────────────────────────────────────── */
    function go(next, byHand) {
      if (next === index) return;

      var out = slides[index];
      var into = slides[next];

      out.classList.remove('is-active');
      out.classList.add('is-leaving');
      setTimeout(function () { out.classList.remove('is-leaving'); }, FADE);

      into.classList.add('is-active');
      index = next;

      if (ticks.length) {
        ticks.forEach(function (t) { t.classList.remove('is-active'); });
        // Reflow so the fill animation restarts from zero.
        void ticks[index].offsetWidth;
        ticks[index].classList.add('is-active');
      }

      if (caption) {
        var text = into.getAttribute('data-caption') || '';
        caption.innerHTML = '<span class="hero__caption-text"></span>';
        caption.firstChild.textContent = text;
      }

      if (byHand) restart();
    }

    function advance() { go((index + 1) % slides.length); }
    function retreat() { go((index - 1 + slides.length) % slides.length); }

    /* ── Clock ─────────────────────────────────────────────── */
    function start() {
      if (timer || reduceMotion.matches || !onScreen || document.hidden) return;
      root.classList.remove('hero--paused');
      timer = setInterval(advance, dwell);
    }
    function stop() {
      clearInterval(timer);
      timer = null;
      root.classList.add('hero--paused');
    }
    function restart() { stop(); start(); }

    /* Don't animate off-screen or in a background tab. */
    if ('IntersectionObserver' in window) {
      new IntersectionObserver(function (entries) {
        onScreen = entries[0].isIntersecting;
        onScreen ? start() : stop();
      }, { threshold: 0.15 }).observe(root);
    }
    document.addEventListener('visibilitychange', function () {
      document.hidden ? stop() : start();
    });
    reduceMotion.addEventListener('change', function () {
      reduceMotion.matches ? stop() : start();
    });

    /* ── Swipe ─────────────────────────────────────────────── */
    var startX = null;
    root.addEventListener('touchstart', function (e) {
      startX = e.touches[0].clientX;
    }, { passive: true });
    root.addEventListener('touchend', function (e) {
      if (startX === null) return;
      var dx = e.changedTouches[0].clientX - startX;
      if (Math.abs(dx) > 50) (dx < 0 ? advance : retreat)(), restart();
      startX = null;
    }, { passive: true });

    /* ── Keyboard, once a rule has focus ───────────────────── */
    if (ticksEl) {
      ticksEl.addEventListener('keydown', function (e) {
        if (e.key === 'ArrowRight') { advance(); restart(); ticks[index].focus(); }
        if (e.key === 'ArrowLeft')  { retreat(); restart(); ticks[index].focus(); }
      });
    }

    /* ── Open on the first frame ───────────────────────────── */
    slides[0].classList.add('is-active');
    if (ticks.length) ticks[0].classList.add('is-active');
    if (caption) {
      caption.innerHTML = '<span class="hero__caption-text"></span>';
      caption.firstChild.textContent = slides[0].getAttribute('data-caption') || '';
    }
    start();
  }

  function debounce(fn, wait) {
    var t;
    return function () {
      clearTimeout(t);
      t = setTimeout(fn, wait);
    };
  }
}());
