/* jshint esversion: 6 */

var cookieBanner = $('.cookie-wrapper');

$('.agree-cookies').click(function() {
   sessionStorage.setItem("cookieBanner", true);
   cookieBanner.slideUp(500);
});

if (sessionStorage.getItem("cookieBanner")) {

} else {
   cookieBanner.slideDown(500);
}