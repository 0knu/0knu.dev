// js/main.js
document.addEventListener('DOMContentLoaded', () => {
  // ========== Smooth scroll ==========
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
      e.preventDefault();
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) target.scrollIntoView({ behavior: 'smooth' });
    });
  });

  // ========== Back to top ==========
  const scrollTopBtn = document.getElementById('scroll-top-btn');
  if (scrollTopBtn) {
    scrollTopBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  }

  // ========== Contact form (Formspree + enhanced feedback) ==========
  const form = document.getElementById('contact-form');
  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const button = form.querySelector('button[type="submit"]');
      const originalText = button.innerHTML;
      button.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span>Sending...';
      button.disabled = true;

      try {
        const response = await fetch(form.action, {
          method: 'POST',
          body: new FormData(form),
          headers: { 'Accept': 'application/json' }
        });

        if (response.ok) {
          button.innerHTML = '✔ Sent!';
          form.reset();
          alert('Thanks! Your message has been transmitted.');
        } else {
          throw new Error('Failed');
        }
      } catch (error) {
        alert('Oops! Something went wrong. Please try again.');
      } finally {
        button.innerHTML = originalText;
        button.disabled = false;
      }
    });
  }

  // ========== 3D Tilt on project card ==========
  const tiltCard = document.querySelector('[data-tilt]');
  if (tiltCard) {
    tiltCard.addEventListener('mousemove', e => {
      const rect = tiltCard.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * -8;
      const rotateY = ((x - centerX) / centerX) * 8;
      tiltCard.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });
    tiltCard.addEventListener('mouseleave', () => {
      tiltCard.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
    });
  }

  // ========== Ripple effect on buttons ==========
  function createRipple(event) {
    const button = event.currentTarget;
    const circle = document.createElement('span');
    const diameter = Math.max(button.clientWidth, button.clientHeight);
    const radius = diameter / 2;
    circle.style.width = circle.style.height = `${diameter}px`;
    circle.style.left = `${event.clientX - button.getBoundingClientRect().left - radius}px`;
    circle.style.top = `${event.clientY - button.getBoundingClientRect().top - radius}px`;
    circle.classList.add('ripple');
    button.appendChild(circle);
    circle.addEventListener('animationend', () => circle.remove());
  }
  document.querySelectorAll('.btn-ripple').forEach(btn => {
    btn.addEventListener('click', createRipple);
  });

  // ========== Konami Code Easter Egg ==========
  const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
  let konamiIndex = 0;
  document.addEventListener('keydown', (e) => {
    if (e.key === konamiCode[konamiIndex]) {
      konamiIndex++;
      if (konamiIndex === konamiCode.length) {
        document.body.style.transition = 'filter 0.5s';
        document.body.style.filter = 'hue-rotate(90deg)';
        setTimeout(() => { document.body.style.filter = ''; }, 2000);
        konamiIndex = 0;
      }
    } else {
      konamiIndex = 0;
    }
  });

  // ========== Project Card Clickable (ολόκληρη η κάρτα οδηγεί στο trcfilm.com) ==========
  const projectCard = document.querySelector('.project-card');
  if (projectCard) {
    projectCard.addEventListener('click', (e) => {
      if (e.target.closest('.btn')) return;
      window.open('https://trcfilm.com', '_blank', 'noopener');
    });
  }
});