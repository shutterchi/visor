// Shutterchi — shared behaviour for every page
(function () {
  document.documentElement.classList.add('js');

  // Reveal on scroll. Elements animate in when they enter the viewport and
  // reset once they have fully left it, so the animation replays next time.
  var targets = document.querySelectorAll('.reveal-title, .reveal-item');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting && e.intersectionRatio > 0.15) {
          e.target.classList.add('is-in');
        } else if (!e.isIntersecting) {
          e.target.classList.remove('is-in');
        }
      });
    }, { threshold: [0, 0.15] });
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
