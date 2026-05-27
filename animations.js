// animations.js
document.addEventListener('DOMContentLoaded', () => {
  const preloader = document.getElementById('preloader');
  const main = document.getElementById('main-content');

  gsap.to(preloader, {
    opacity: 0,
    duration: 0.4,
    delay: 1.7,
    onComplete: () => {
      preloader.style.display = 'none';
      document.body.classList.remove('no-scroll');
      main.classList.remove('hidden');

      gsap.from('.hero-content > *', {
        opacity: 0, y: 40, duration: 1, stagger: 0.1, ease: 'power2.out'
      });

      initScrollAnimations();
      initCustomCursor();
    }
  });

  function initScrollAnimations() {
    gsap.registerPlugin(ScrollTrigger);
    gsap.utils.toArray('.tl-item').forEach(item => {
      gsap.from(item, {
        opacity: 0,
        x: item.classList.contains('right') ? 60 : -60,
        duration: 0.8,
        scrollTrigger: { trigger: item, start: 'top 85%', toggleActions: 'play none none none' }
      });
    });
    gsap.from('.project-card', {
      opacity: 0, y: 60, duration: 1,
      scrollTrigger: { trigger: '.project-card', start: 'top 85%' }
    });
    gsap.from('.terminal', {
      opacity: 0, scale: 0.95, duration: 1,
      scrollTrigger: { trigger: '.terminal', start: 'top 85%' }
    });
    gsap.from('.contact-form', {
      opacity: 0, x: -40, duration: 0.8,
      scrollTrigger: { trigger: '.contact-grid', start: 'top 85%' }
    });
    gsap.from('.contact-links', {
      opacity: 0, x: 40, duration: 0.8,
      scrollTrigger: { trigger: '.contact-grid', start: 'top 85%' }
    });
  }

  function initCustomCursor() {
    const cursor = document.querySelector('.custom-cursor');
    if (!cursor) return;
    document.addEventListener('mousemove', (e) => {
      gsap.to(cursor, { left: e.clientX, top: e.clientY, duration: 0.1 });
    });
    const interactives = document.querySelectorAll('a, button, .btn, input, textarea, .social-card');
    interactives.forEach(el => {
      el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
      el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
    });
  }

  const brand = document.querySelector('.hero-brand');
  if (brand) {
    brand.addEventListener('mouseenter', () => brand.style.animation = 'glitch 0.3s');
    brand.addEventListener('mouseleave', () => brand.style.animation = 'none');
  }
});
