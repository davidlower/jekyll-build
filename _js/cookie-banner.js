/* jshint esversion: 6 */

const cookie = document.getElementById('cookie');
const cookieBtn = document.getElementById('cookie__btn');

cookieBtn.addEventListener('click', closeCookie);

if (sessionStorage.getItem("cookie")) {
   cookie.style.display = 'none';
} else {
   cookie.style.transform = 'translateY(0)';
}

function closeCookie() {
   sessionStorage.setItem("cookie", true);
   cookie.style.transform = 'translateY(100%)';
}