/* jshint esversion: 6 */

var cookieBanner = $('.cookie-banner');

$('.agree-cookies').click(function() {
   sessionStorage.setItem("cookieBanner", true);
});

if (sessionStorage.getItem("cookieBanner")) {

} else {
   cookieBanner.slideDown(500);
}