/* jshint esversion: 6 */

$(document).ready(function() {

   // Smooth scrolling
   $('.smooth').click(function(e) {
      e.preventDefault();
      $('body,html').animate({
         scrollTop: $(this.hash).offset().top
      }, 500);
   });

   // Active link switching
   $(window).scroll(function() {
      var scrollbarLocation = $(this).scrollTop();
      $('.smooth').each(function() {
         var offset = $(this.hash).offset();
         if (offset) {
            var sectionOffset = offset.top;
            if (sectionOffset <= scrollbarLocation) {
               $(".smooth").removeClass('active');
               $(this).addClass('active');
            }
         }
      });
   });

   // Maintaining urls
   function markLinkActive(event) {
      event.preventDefault();
      $("nav .active").removeClass("active");
      this.classList.add("active");
      window.location.href = this.getAttribute("href");
   }

   // Making links active
   $("nav").on("click", "a", markLinkActive);
   $(window).on("scroll", function() {
      // this part is to find the bottom of the page and activate last nav item (if it doesn't reach the top of the page)
      var scrollHeight = $(document).height();
      var scrollPosition = $(window).height() + $(window).scrollTop();
      if ((scrollHeight - scrollPosition) / scrollHeight === 0) {
         $(".nav__link").removeClass('active');
         $('.nav-contact').addClass('active');
      }
   });
});