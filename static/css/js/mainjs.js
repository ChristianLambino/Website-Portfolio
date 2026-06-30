<script>
(function(){
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* Mobile nav toggle */
  var navToggle = document.querySelector('.nav__toggle');
  var navLinks = document.querySelector('.nav__links');
  if (navToggle && navLinks) {
    navToggle.addEventListener('click', function(){
      var isOpen = navLinks.classList.toggle('is-open');
      navToggle.classList.toggle('is-open', isOpen);
      navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });
    navLinks.querySelectorAll('a').forEach(function(a){
      a.addEventListener('click', function(){
        navLinks.classList.remove('is-open');
        navToggle.classList.remove('is-open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* Reveal on scroll */
  var revealEls = document.querySelectorAll('.reveal');
  if (reduceMotion || !('IntersectionObserver' in window)) {
    revealEls.forEach(function(el){ el.classList.add('in-view'); });
  } else {
    var revealIO = new IntersectionObserver(function(entries){
      entries.forEach(function(entry){
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          revealIO.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });
    revealEls.forEach(function(el){ revealIO.observe(el); });
  }

  /* System demo */
  var demo = document.querySelector('[data-demo]');
  if (demo) {

    /* Tab switching */
    var navItems = demo.querySelectorAll('.system-demo__nav-item');
    var tabs = demo.querySelectorAll('.system-demo__tab');
    navItems.forEach(function(btn){
      btn.addEventListener('click', function(){
        var target = btn.getAttribute('data-tab');
        navItems.forEach(function(b){ b.classList.toggle('active', b === btn); });
        tabs.forEach(function(t){ t.classList.toggle('active', t.getAttribute('data-tab') === target); });
      });
    });

    /* Theme toggle */
    var themeBtn = demo.querySelector('.system-demo__themebtn');
    if (themeBtn) {
      themeBtn.addEventListener('click', function(){
        var isLight = demo.classList.toggle('is-light');
        themeBtn.textContent = isLight ? 'Switch to dark' : 'Switch to light';
      });
    }

    /* Animated stat counters */
    var counters = demo.querySelectorAll('[data-count-to]');
    function animateCounters(){
      counters.forEach(function(el){
        var target = parseFloat(el.getAttribute('data-count-to'));
        var suffix = el.getAttribute('data-suffix') || '';
        var decimals = el.getAttribute('data-decimals') ? parseInt(el.getAttribute('data-decimals'), 10) : 0;

        if (reduceMotion) {
          el.textContent = target.toFixed(decimals) + suffix;
          return;
        }

        var duration = 1100;
        var start = null;
        function step(ts){
          if (start === null) start = ts;
          var progress = Math.min((ts - start) / duration, 1);
          var value = target * progress;
          el.textContent = value.toFixed(decimals) + suffix;
          if (progress < 1) requestAnimationFrame(step);
        }
        requestAnimationFrame(step);
      });
    }

    if ('IntersectionObserver' in window) {
      var statIO = new IntersectionObserver(function(entries, obs){
        entries.forEach(function(entry){
          if (entry.isIntersecting) {
            animateCounters();
            obs.disconnect();
          }
        });
      }, { threshold: 0.3 });
      statIO.observe(demo);
    } else {
      animateCounters();
    }

    /* Live clock in the address bar */
    var timeEl = demo.querySelector('[data-live-time]');
    if (timeEl) {
      timeEl.textContent = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }
  }
})();
</script>