if (parseInt($(window).width()) > 640) { // masonry image loaded fix
  $(".all-brands").imagesLoaded( function(){
    $(".all-brands").masonry({
      // options...
      itemSelector: '.brand',
      columnWidth: 200,
    });
  });
};

if(parseInt($(window).width()) <= 1024) {
  $(".active-box").removeClass('active-box');
}

$(".brand").on('click', function() { // brand box activation
  if ($(".active-box").length) {
    $(".active-box").removeClass('active-box');
  }
  $(this).addClass('active-box');
  if (parseInt($(window).width()) > 640) {
    $(".all-brands").masonry({columnWidth: 200});
  };
});
