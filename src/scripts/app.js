$(document).foundation();

// date picker
$('#date').fdatepicker({
  format: 'dd/mm/yyyy'
});

$('body').imagesLoaded( function() {
  $('body').removeClass("no-scroll");
  $(".loading-screen").fadeOut();
  $('.wood-main').animateCSS("bounceInDown");
  $('.comp-sign').animateCSS("bounceInRight");
});

var enterbottle = (function(){
  var thisId = $(this).attr('id');
  $(".phase").removeClass("phase"); // for touch
  $(".wood-cover").hide(); // for touch

  $("."+thisId).show();
  $(".home-bottle").each(function(){
    if(!$(this).is($("#"+thisId))) {
      $(this).addClass("phase");
    }
  });
});
var leavebottle  = (function(){
  var thisId = $(this).attr('id');
  $("."+thisId).hide();
  $(".phase").removeClass("phase");
});
//////////////////
var entersparklingbottle = (function(){
  var thisId = $(this).attr('id');
  $(".phase").removeClass("phase"); // for touch
  $(".hover-lights").hide(); // for touch

  $("."+thisId).show();
  $(".sparkling-bottle").each(function(){
    if(!$(this).is($("#"+thisId))) {
      $(this).addClass("phase");
    }
  });
});
var leavesparklingbottle  = (function(){
  var thisId = $(this).attr('id');
  $("."+thisId).hide();
  $(".phase").removeClass("phase");
});
//////////////////
var enterbottledesc = (function(){
  $(".phase").removeClass("phase"); // for touch
  $(".bottle-desc").hide(); // for touch

  $(this).parent().find(".bottle-desc").show();
  $(".hover-tag").each(function(){
    if($(this).parent().find(".bottle-desc").css('display') == 'none') {

      $(this).addClass("phase");
    }
  });
});
var leavebottledesc = (function(){
  $(this).parent().find(".bottle-desc").hide();
  $(".phase").removeClass("phase");
});



// var lightflicker = (function () {
//   var lightnumber = 4000 + Math.floor(Math.random() * 8000);
//   $("#home .bottle-glow, #home .bottle-shadow").hide();
//   setTimeout(function() {
//     $("#home .bottle-glow, #home .bottle-shadow").show();
//   }, 50);
//   setTimeout(function() {
//     $("#home .bottle-glow, #home .bottle-shadow").hide();
//   }, 100);

//   setTimeout(function() {
//     $("#home .bottle-glow, #home .bottle-shadow").show();
//   }, 150);
//   setTimeout(function() {
//     $("#home .bottle-glow, #home .bottle-shadow").hide();
//   }, 200);

//   setTimeout(function() {
//     $("#home .bottle-glow, #home .bottle-shadow").show();
//   }, 300);
//   setTimeout(function() {
//     $("#home .bottle-glow, #home .bottle-shadow").hide();
//   }, 400);

//   setTimeout(function() {
//     $("#home .bottle-glow, #home .bottle-shadow").show();
//   }, 500);
//   setTimeout(function() {
//     $("#home .bottle-glow, #home .bottle-shadow").hide();
//   }, 600);

//   setTimeout(function() {
//     $("#home .bottle-glow, #home .bottle-shadow").show();
//   }, 700);
//   setTimeout(function() {
//     $("#home .bottle-glow, #home .bottle-shadow").hide();
//   }, 900);

//   setTimeout(function() {
//     $("#home .bottle-glow, #home .bottle-shadow").show();
//   }, 1100);
//   setTimeout(function() {
//     $("#home .bottle-glow, #home .bottle-shadow").hide();
//   }, 1300);

//   setTimeout(function() {
//     $("#home .bottle-glow, #home .bottle-shadow").show();
//   }, 1600);
//   setTimeout(function() {
//     $("#home .bottle-glow, #home .bottle-shadow").hide();
//   }, 1900);

//   setTimeout(function() {
//     $("#home .bottle-glow, #home .bottle-shadow").show();
//   }, 2200);
//   setTimeout(function() {
//     lightflicker();
//   }, lightnumber);
// });

$(document).ready(function(){

  $('body').addClass("no-scroll");

  $('.scroll').on('click', function(){
      $('html, body').animate({
      scrollTop: $( $(this).attr('data-link') ).offset().top - 50
    }, 500);
    return false;
  });

  if ($(window).width() > 720 && $("#home").length || $(window).width() > 720 && $("#movers").length) { // not mobile and on the homepage
    //lightflicker();
    new WOW().init();

    $('.hover-tag').on("mouseenter touchstart", enterbottledesc);
    $('.hover-tag').on("mouseleave", leavebottledesc);

    $('.home-bottle').on("mouseenter touchstart", enterbottle);
    $('.home-bottle').on("mouseleave", leavebottle);

    $('.sparkling-bottle').on("mouseenter touchstart", entersparklingbottle);
    $('.sparkling-bottle').on("mouseleave", leavesparklingbottle);

    var element1 = document.querySelector('.loading-screen .sprite');
    var sprite1 = new Motio(element1, {
        fps: 12,
        frames: 18
    });
    sprite1.play();

    var element2 = document.querySelector('.content-sprite.sprite');
    var sprite2 = new Motio(element2, {
        fps: 12,
        frames: 18
    });
    sprite2.play();
  }

  // $(".animsition").animsition({

  //   inClass               :   'fade-in',
  //   outClass              :   'fade-out',
  //   inDuration            :    500,
  //   outDuration           :    500,
  //   linkElement           :   '.animsition-link',
  //   // e.g. linkElement   :   'a:not([target="_blank"]):not([href^=#])'
  //   loading               :    true,
  //   loadingParentElement  :   'body', //animsition wrapper element
  //   loadingClass          :   'animsition-loading',
  //   unSupportCss          : [ 'animation-duration',
  //                             '-webkit-animation-duration',
  //                             '-o-animation-duration'
  //                           ],
  //   //"unSupportCss" option allows you to disable the "animsition" in case the css property in the array is not supported by your browser.
  //   //The default setting is to disable the "animsition" in a browser that does not support "animation-duration".

  //   overlay               :   false,

  //   overlayClass          :   'animsition-overlay-slide',
  //   overlayParentElement  :   'body'
  // });

});


$(".js-sippify-link").on('click', function(){
    ga('send', 'event', 'Sippify Redirect', 'link clicked'); // let google analytics know
});
