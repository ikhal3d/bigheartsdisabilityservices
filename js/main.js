/* Big Hearts Disability Services — main.js */
(function () {
  'use strict';

  /* ── Sticky nav ── */
  var nav = document.getElementById('mainNav');
  if (nav) {
    function onScroll() {
      nav.classList.toggle('scrolled', window.scrollY > 60);
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* ── Mobile menu ── */
  var toggle   = document.getElementById('navToggle');
  var mobileM  = document.getElementById('mobileMenu');
  if (toggle && mobileM) {
    toggle.addEventListener('click', function () {
      var open = mobileM.classList.toggle('open');
      toggle.classList.toggle('open', open);
      document.body.style.overflow = open ? 'hidden' : '';
    });
    mobileM.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () {
        mobileM.classList.remove('open');
        toggle.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }

  /* ── Floating heart particles ── */
  var pc = document.getElementById('heroParticles');
  if (pc) {
    var symbols = ['♥', '♡', '❤'];
    for (var i = 0; i < 24; i++) {
      var el = document.createElement('span');
      el.className = 'hp';
      el.textContent = symbols[i % symbols.length];
      var size = 10 + Math.random() * 18;
      el.style.cssText = [
        'left:' + (Math.random() * 100) + '%',
        'font-size:' + size + 'px',
        'animation-duration:' + (7 + Math.random() * 9) + 's',
        'animation-delay:' + (Math.random() * 10) + 's'
      ].join(';');
      pc.appendChild(el);
    }
  }

  /* ── Scroll reveal ── */
  var revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && revealEls.length) {
    var ro = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          e.target.classList.add('in');
          ro.unobserve(e.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -36px 0px' });
    revealEls.forEach(function (el) { ro.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('in'); });
  }

  /* ── Number counter animation ── */
  function animateCount(el, target, suffix) {
    var start = performance.now();
    var dur = 2200;
    function tick(now) {
      var p = Math.min((now - start) / dur, 1);
      var eased = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.floor(eased * target) + suffix;
      if (p < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }

  var counters = document.querySelectorAll('[data-count]');
  if ('IntersectionObserver' in window && counters.length) {
    var co = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          var el  = e.target;
          var val = parseInt(el.getAttribute('data-count'), 10);
          var sfx = el.getAttribute('data-suffix') || '';
          animateCount(el, val, sfx);
          co.unobserve(el);
        }
      });
    }, { threshold: 0.5 });
    counters.forEach(function (el) { co.observe(el); });
  }

  /* ── Active nav links on scroll ── */
  var sections = document.querySelectorAll('section[id]');
  var navLinks = document.querySelectorAll('.nav-link[href*="#"]');
  if (sections.length && navLinks.length) {
    window.addEventListener('scroll', function () {
      var scrollY = window.scrollY + 120;
      var current = '';
      sections.forEach(function (s) {
        if (scrollY >= s.offsetTop) current = s.id;
      });
      navLinks.forEach(function (a) {
        var href = a.getAttribute('href') || '';
        a.classList.toggle('active', href.includes('#' + current) && current !== '');
      });
    }, { passive: true });
  }

  /* ── Marquee: duplicate items inside the same track for seamless loop ── */
  var track = document.querySelector('.marquee-track');
  if (track) {
    Array.from(track.querySelectorAll('.marquee-item')).forEach(function (item) {
      track.appendChild(item.cloneNode(true));
    });
  }

})();
