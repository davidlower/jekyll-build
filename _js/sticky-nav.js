/* jshint esversion: 6 */

$(document).ready(function() {

   var nav = $('nav');
   var placeholder = $('.placeholder');
   var placeholderMobile = $('.placeholder-mobile');
   var burger = $('#burger-icon');
   var list = $('.nav__list');
   var item = $('.nav__item');

   function sticky(desktop) {

      if (desktop.matches) {
         // this code hides the desktop and mobile version of the ul element with media query
         list.removeClass('nav__list-mobile');
         placeholderMobile.addClass('none');

         $(window).scroll(function() {

            var scroll = $(window).scrollTop();
            if (scroll >= 230) {
               placeholder.removeClass('none');
               nav.addClass('sticky');
            } else {
               nav.removeClass('sticky');
               placeholder.addClass('none');
            }

         });

      } else {
         // this code hides the desktop and mobile version of the ul element with media query
         list.removeClass('sticky');
         placeholderMobile.removeClass('none');
      }

   }
   // calling the media query function
   var desktop = window.matchMedia("(min-width: 765px)");
   sticky(desktop);
   desktop.addListener(sticky);

   // open and closes the burger icon
   burger.click(function() {
      if (burger.hasClass('open')) {
         nav.removeClass('nav-open');
         burger.removeClass('open');
         nav.removeClass('mobile-height');
      } else {
         nav.addClass('mobile-height');
         nav.addClass('nav-open');
         burger.addClass('open');
      }
   });
   // close the burger when clicking on nav item
   item.click(function() {
      nav.removeClass('nav-open');
      burger.removeClass('open');
      nav.removeClass('mobile-height');
   });
});