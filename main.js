// main.js for ScholarGo

document.addEventListener('DOMContentLoaded', () => {
  // Initialize AOS (Animate On Scroll)
  AOS.init({
    duration: 600,
    easing: 'ease-out-cubic',
    once: true
  });

  // Optional: smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      document.querySelector(this.getAttribute('href'))
              .scrollIntoView({ behavior: 'smooth' });
    });
  });
});
