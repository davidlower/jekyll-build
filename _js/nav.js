/* jshint esversion: 6 */

const burgerIcon = document.getElementById("burger-icon");
const nav = document.getElementById('nav');

burgerIcon.addEventListener("click", openNav);

function openNav() {
   nav.classList.toggle("open-nav-toggler");
   burgerIcon.classList.toggle("open");
}

document.addEventListener('click', (e) => {
   if (e.target.closest('.nav a')) {
      openNav();
   }
}, false);