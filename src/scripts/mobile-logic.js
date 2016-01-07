var openMenu = function(){
  $('body').addClass('offcanvas-active');
  $('.click-mask').fadeIn(500);
  $(this).unbind();
  $(this).bind('click', closeMenu);
};
$('.mobile-menu-button').bind('click', openMenu);
var closeMenu = function(){
  $('body').removeClass('offcanvas-active');
  $('.click-mask').fadeOut(500);
  $('.mobile-menu-button').unbind();
  $('.mobile-menu-button').bind('click', openMenu);
};
$('.click-mask').bind('click', closeMenu);
