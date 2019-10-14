/* jshint esversion: 6 */

var cookieBanner = document.querySelector('.cookie-wrapper');
var closeCookieBanner = document.getElementById('cookie__btn');
var cookie = readCookie('David Lower Designs Cookies'); // change companny name here

cookieBanner.style.transform = 'none';

if (cookie == "true") {
   cookieBanner.style.display = "none";
}

closeCookieBanner.addEventListener('click', function (e) {
   if (cookie != "true") {
      cookieBanner.style.transform = 'translateY(100%)';
      createCookie('David Lower Designs Cookies', "true", 21); // change companny name here
   }
   e.preventDefault();
});

function createCookie(name, value, days) {
   if (days) {
      var date = new Date();
      date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
      var expires = "; expires=" + date.toGMTString();
   } else var expires = "";
   document.cookie = name + "=" + value + expires + "; path=/"
}

function readCookie(name) {
   var nameEQ = name + "=";
   var ca = document.cookie.split(';');
   for (var i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == ' ') c = c.substring(1, c.length);
      if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);

   }
   return null;
}

function eraseCookie(name) {
   createCookie(name, "", -1);
}


// const cookie = document.getElementById('cookie');
// const cookieBtn = document.getElementById('cookie__btn');

// cookieBtn.addEventListener('click', closeCookie);

// if (sessionStorage.getItem("cookie")) {
//    cookie.style.display = 'none';
// } else {
//    cookie.style.transform = 'translateY(0)';
// }

// function closeCookie() {
//    sessionStorage.setItem("cookie", true);
//    cookie.style.transform = 'translateY(100%)';
// }
