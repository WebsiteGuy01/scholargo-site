const toggle = document.getElementById('theme-toggle');
toggle.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
});
// Mobile scroll behavior
let lastScrollTop = 0;
const header = document.querySelector(".site-header");

window.addEventListener("scroll", () => {
  let scrollTop = window.pageYOffset || document.documentElement.scrollTop;

  // Shrink header after scrolling 50px
  if (scrollTop > 50) {
    header.classList.add("shrink");
  } else {
    header.classList.remove("shrink");
  }

  // Hide/show header on scroll
  if (scrollTop > lastScrollTop) {
    // Scrolling down
    header.classList.add("hide-header");
  } else {
    // Scrolling up
    header.classList.remove("hide-header");
  }

  lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
});

