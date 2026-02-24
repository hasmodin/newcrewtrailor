let hamburger = document.querySelector("#hamburger");
let navMenu = document.querySelector("#nav-menu");
hamburger.addEventListener("click", () => {
  navMenu.classList.toggle("active");
});

// hamburger.addEventListener("click", (event) => {
//   if (!hamburger.contains(event.target) && !navMenu.contains(event.target)) {
//     navMenu.classList.remove("active");
//   }
// });
const productToggle = document.querySelector(".dropdown-toggle");
const dropdownParent = document.querySelector(".has-dropdown");

productToggle.addEventListener("click", (e) => {
  // Only trigger toggle on mobile screens
  if (window.innerWidth <= 768) {
    e.preventDefault(); // Prevent navigating to #
    dropdownParent.classList.toggle("open");
  }
});
