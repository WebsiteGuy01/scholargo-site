// === Theme Toggle with Persistence ===
const themeToggle = document.getElementById('theme-toggle');
if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    localStorage.setItem('theme', document.body.classList.contains('dark-mode') ? 'dark' : 'light');
  });

  // Apply saved theme on load
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'dark') {
    document.body.classList.add('dark-mode');
  }
}

// === Sidebar Toggle Function ===
function toggleSidebar() {
  document.body.classList.toggle('sidebar-open');
}

// === Scroll-Responsive Header ===
let lastScrollTop = 0;
const header = document.querySelector(".site-header");

window.addEventListener("scroll", throttle(() => {
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

  // Shrink header after scrolling 50px
  header.classList.toggle("shrink", scrollTop > 50);

  // Hide/show header based on scroll direction
  header.classList.toggle("hide-header", scrollTop > lastScrollTop);

  lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
}, 100)); // Throttle scroll for better performance

// === Throttle Function ===
function throttle(callback, limit) {
  let waiting = false;
  return function () {
    if (!waiting) {
      callback.apply(this, arguments);
      waiting = true;
      setTimeout(() => (waiting = false), limit);
    }
  };
}
