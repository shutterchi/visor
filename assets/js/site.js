// Shutterchi — shared behaviour for every page
(function () {
  document.documentElement.classList.add('js');

  // Reveal on scroll: each element animates in once, the first time it enters the view.
  var targets = document.querySelectorAll('.reveal-title, .reveal-item');

  // Items in a side-by-side row: the left one comes in from the left,
  // the right one from the right. In a single column they all come from the left.
  var setDirections = function () {
    document.querySelectorAll('[data-reveal-row]').forEach(function (row) {
      var mid = row.getBoundingClientRect().left + row.getBoundingClientRect().width / 2;
      row.querySelectorAll('.reveal-item').forEach(function (el) {
        if (el.classList.contains('is-in')) return;
        var r = el.getBoundingClientRect();
        var sideBySide = r.width < row.getBoundingClientRect().width * 0.75;
        if (sideBySide && r.left + r.width / 2 > mid) el.dataset.from = 'right';
        else delete el.dataset.from;
      });
    });
  };
  setDirections();
  window.addEventListener('resize', setDirections);

  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          e.target.classList.add('is-in');
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.15 });
    targets.forEach(function (el) { io.observe(el); });
  } else {
    targets.forEach(function (el) { el.classList.add('is-in'); });
  }

  // Mobile menu
  var nav = document.querySelector('.nav');
  var btn = nav && nav.querySelector('.nav__menu-btn');
  if (btn) {
    var setOpen = function (open) {
      nav.classList.toggle('is-open', open);
      btn.setAttribute('aria-expanded', String(open));
      btn.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    };
    btn.addEventListener('click', function (e) {
      e.stopPropagation();
      setOpen(!nav.classList.contains('is-open'));
    });
    document.addEventListener('click', function (e) {
      if (!nav.contains(e.target)) setOpen(false);
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') setOpen(false);
    });
  }
})();
