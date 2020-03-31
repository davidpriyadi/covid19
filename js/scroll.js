$(".full-list p")
.slice(0, 2)
.show();
$(".full-list p:hidden").css("opacity", 0);
$("#loadmore").on("click", function(e) {
$(".full-list p:hidden") // Added :hidden
  .slice(0, 5)
  .slideDown("slow")
  .animate(
    {
      opacity: 1
    },
    {
      queue: false,
      duration: "slow"
    }
  );
// We need to check the count of just the hidden items
if ($(".full-list p:hidden").length == 0) {
  $("#loadmore").fadeOut("slow");
}

$('#content').animate({
  scrollTop: $(this).offset().top
      }, 1700);
e.preventDefault();
});

if (! window.jQuery) {
 alert('No internet Connection !!');
  }
 else {
  alert('ada');
 }