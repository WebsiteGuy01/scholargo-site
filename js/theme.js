// Wait for DOM to load before initializing
document.addEventListener('DOMContentLoaded', () => {
  // 1. Initialize AOS (Animate On Scroll)
  if (AOS) {
    AOS.init({
      duration: 600,
      easing: 'ease-out-cubic',
      once: true
    });
  }

  // 2. Dark/Light Mode Toggle
  const themeToggle = document.getElementById('theme-toggle');
  themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    const icon = themeToggle.querySelector('i');
    icon.classList.toggle('fa-moon');
    icon.classList.toggle('fa-sun');
  });

  // 3. Header Shrink & Hide/Show on Scroll (mobile)
  let lastScroll = 0;
  const header = document.querySelector('.site-header');
  window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset || document.documentElement.scrollTop;

    // Shrink header after 50px
    if (currentScroll > 50) {
      header.classList.add('shrink');
    } else {
      header.classList.remove('shrink');
    }

    // Hide on scroll down, show on scroll up
    if (currentScroll > lastScroll) {
      header.classList.add('hide-header');
    } else {
      header.classList.remove('hide-header');
    }
    lastScroll = currentScroll <= 0 ? 0 : currentScroll;
  });

  // 4. Sidebar Toggle
  const sidebar = document.getElementById('sidebar');
  const overlay = document.getElementById('overlay');
  const openBtn = document.getElementById('sidebar-toggle');
  const closeBtn = document.getElementById('close-sidebar');

  function openSidebar() {
    sidebar.classList.add('active');
    overlay.classList.add('active');
  }
  function closeSidebar() {
    sidebar.classList.remove('active');
    overlay.classList.remove('active');
  }

  openBtn.addEventListener('click', openSidebar);
  closeBtn.addEventListener('click', closeSidebar);
  overlay.addEventListener('click', closeSidebar);
});
