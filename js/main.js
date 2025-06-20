// main.js — AOS & smooth‑scroll

document.addEventListener('DOMContentLoaded', () => {
  // 1. Animate On Scroll
  if (window.AOS) {
    AOS.init({
      duration: 600,
      easing: 'ease-out-cubic',
      once: true
    });
  }

  // 2. Smooth scroll for internal anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
});
