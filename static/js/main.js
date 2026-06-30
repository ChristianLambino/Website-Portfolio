document.addEventListener('DOMContentLoaded', function(){
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

  /* Dashboard tab switching */
  var sbItems = document.querySelectorAll('.sb-item');
  var tabs = document.querySelectorAll('.tab');
  sbItems.forEach(function(btn){
    btn.addEventListener('click', function(){
      sbItems.forEach(function(b){ b.classList.remove('active'); });
      tabs.forEach(function(t){ t.classList.remove('active'); });
      btn.classList.add('active');
      var t = document.getElementById('tab-' + btn.getAttribute('data-tab'));
      if (t) t.classList.add('active');
    });
  });

});